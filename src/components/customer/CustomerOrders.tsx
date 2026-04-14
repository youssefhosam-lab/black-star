import { useState, useEffect } from 'react';
import { useApp } from '../../App';
import { Bell, ChevronDown, Star, Package } from 'lucide-react';
import Logo from '../../imports/Logo';
import { getUserOrders } from '../../lib/supabase';

type OrderStatus = 'Designing' | 'In Production' | 'Shipped' | 'Delivered' | 'Cancelled';
type FilterStatus = 'All' | 'Active' | 'Completed' | 'Cancelled';

interface Rating { quality: number; deliveryTime: number; communication: number; }

interface Order {
  id: string;
  productName: string;
  image: string;
  manufacturer: string;
  date: string;
  status: OrderStatus;
  progress: number;
  total?: number;
  quantity?: number;
  rating?: Rating;
}

export function CustomerOrders() {
  const { navigate, user } = useApp();
  const [filter, setFilter] = useState<FilterStatus>('All');
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [hoverRating, setHoverRating] = useState<{ orderId: string; dimension: string; value: number } | null>(null);
  const [ratings, setRatings] = useState<{ [orderId: string]: Rating }>({});

  // ✅ جلب الأوردرز الحقيقية من Supabase
  useEffect(() => {
    if (!user?.id) return;
    getUserOrders(user.id).then(data => {
      const mapped: Order[] = data.map((o: any) => ({
        id: o.id,
        productName: o.product_name || 'Order',
        image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400',
        manufacturer: o.manufacturer || 'Unknown',
        date: o.created_at,
        status: (o.status as OrderStatus) || 'In Production',
        progress: o.progress || 20,
        total: o.total,
        quantity: o.quantity,
      }));
      setOrders(mapped);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [user?.id]);

  const filteredOrders = orders.filter(order => {
    if (filter === 'All') return true;
    if (filter === 'Active') return ['Designing', 'In Production', 'Shipped'].includes(order.status);
    if (filter === 'Completed') return order.status === 'Delivered';
    if (filter === 'Cancelled') return order.status === 'Cancelled';
    return true;
  });

  const handleRatingClick = (orderId: string, dimension: keyof Rating, value: number) => {
    setRatings(prev => ({ ...prev, [orderId]: { ...prev[orderId], [dimension]: value } }));
  };

  const StarRating = ({ orderId, dimension, value }: { orderId: string; dimension: keyof Rating; value: number }) => {
    const currentRating = ratings[orderId]?.[dimension] || 0;
    const displayValue = hoverRating?.orderId === orderId && hoverRating.dimension === dimension ? hoverRating.value : currentRating;
    return (
      <div className="flex items-center gap-2">
        <div className="relative w-8 h-8">
          <Star className="w-8 h-8 text-[#E5E7EB] absolute" />
          <div className="overflow-hidden absolute inset-0 transition-all duration-200" style={{ width: `${displayValue * 100}%` }}>
            <Star className="w-8 h-8 text-[#E6C36A] fill-[#E6C36A]" />
          </div>
          <div className="absolute inset-0 flex">
            {[0.25, 0.5, 0.75, 1].map(fillValue => (
              <button key={fillValue} className="flex-1 cursor-pointer"
                onMouseEnter={() => setHoverRating({ orderId, dimension, value: fillValue })}
                onMouseLeave={() => setHoverRating(null)}
                onClick={() => handleRatingClick(orderId, dimension, fillValue)} />
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#E5E7EB]">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="w-8 h-8 text-[#0B0D10]"><Logo showText={false} /></div>
          <nav className="hidden md:flex items-center gap-12">
            {['Home', 'Studio', 'Orders', 'Shop'].map(item => {
              const route = item === 'Home' ? 'home' : `customer-${item.toLowerCase()}`;
              const isActive = item === 'Orders';
              return (
                <button key={item} onClick={() => navigate(route)}
                  className={`text-sm font-medium transition-colors tracking-wide ${isActive ? 'text-[#0B0D10]' : 'text-[#9CA3AF] hover:text-[#E6C36A]'}`}>
                  {item}
                </button>
              );
            })}
          </nav>
          <div className="flex items-center gap-4">
            <button className="relative p-2 hover:bg-[#E5E7EB]/50 rounded-full transition-colors">
              <Bell className="w-5 h-5 text-[#0B0D10]" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#E6C36A] rounded-full animate-pulse" />
            </button>
            <div className="relative group">
              <button className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <div className="w-8 h-8 rounded-full bg-[#E5E7EB] overflow-hidden">
                  <img src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'} alt="Profile" className="w-full h-full object-cover" />
                </div>
                <ChevronDown className="w-4 h-4 text-[#9CA3AF]" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <section className="container mx-auto px-6 py-16">
        <h1 className="text-5xl font-['Playfair_Display'] font-bold text-[#0B0D10] mb-12">Your Orders</h1>

        {/* Filter Bar */}
        <div className="flex gap-4 mb-12 border-b border-[#E5E7EB]">
          {(['All', 'Active', 'Completed', 'Cancelled'] as FilterStatus[]).map(status => (
            <button key={status} onClick={() => setFilter(status)}
              className={`pb-4 px-2 text-sm font-medium transition-colors relative ${filter === status ? 'text-[#0B0D10]' : 'text-[#9CA3AF] hover:text-[#0B0D10]'}`}>
              {status}
              {filter === status && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0B0D10]" />}
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <div className="space-y-4">
            {[1, 2].map(i => (
              <div key={i} className="border border-[#E5E7EB] p-6 animate-pulse">
                <div className="flex gap-6">
                  <div className="w-24 h-24 bg-[#E5E7EB] rounded"></div>
                  <div className="flex-1 space-y-3">
                    <div className="h-4 bg-[#E5E7EB] rounded w-1/3"></div>
                    <div className="h-3 bg-[#E5E7EB] rounded w-1/2"></div>
                    <div className="h-3 bg-[#E5E7EB] rounded w-1/4"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredOrders.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <Package className="w-16 h-16 text-[#E5E7EB] mb-4" />
            <h3 className="text-xl font-['Playfair_Display'] font-bold text-[#0B0D10] mb-2">No orders yet</h3>
            <p className="text-[#9CA3AF] text-sm mb-6">Once you place an order, it will appear here.</p>
            <button onClick={() => navigate('customer-shop')}
              className="px-6 py-3 bg-[#0B0D10] text-white text-sm font-bold rounded-lg hover:bg-[#1a1d23] transition-colors">
              Start Shopping
            </button>
          </div>
        )}

        {/* Orders List */}
        {!loading && (
          <div className="space-y-6">
            {filteredOrders.map(order => (
              <div key={order.id} className="border border-[#E5E7EB] overflow-hidden hover:border-[#0B0D10] transition-colors">
                <div className="p-6 cursor-pointer flex items-center gap-6"
                  onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}>
                  <img src={order.image} alt={order.productName} className="w-24 h-24 object-cover" />
                  <div className="flex-1">
                    <h3 className="text-xl font-['Playfair_Display'] font-bold text-[#0B0D10] mb-2">{order.productName}</h3>
                    <p className="text-sm text-[#9CA3AF] mb-1">Manufacturer: {order.manufacturer}</p>
                    {order.quantity && <p className="text-sm text-[#9CA3AF] mb-1">Quantity: {order.quantity} units</p>}
                    <p className="text-sm text-[#9CA3AF]">
                      Ordered: {new Date(order.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                  <div className="text-right">
                    {order.total && <p className="text-[#E6C36A] font-bold text-lg mb-2">EGP {order.total.toFixed(2)}</p>}
                    <div className="inline-block px-4 py-2 bg-[#E5E7EB] text-[#0B0D10] text-sm font-medium mb-2">{order.status}</div>
                    <div className="w-48 h-1 bg-[#E5E7EB] rounded-full overflow-hidden">
                      <div className="h-full bg-[#0B0D10] transition-all duration-500" style={{ width: `${order.progress}%` }} />
                    </div>
                  </div>
                </div>

                {expandedOrder === order.id && (
                  <div className="border-t border-[#E5E7EB] p-6 bg-[#FAFAFA]">
                    <div className="mb-8">
                      <h4 className="text-sm font-medium text-[#0B0D10] mb-4 uppercase tracking-wide">Status Timeline</h4>
                      <div className="flex items-center gap-2">
                        {(['Designing', 'In Production', 'Shipped', 'Delivered'] as OrderStatus[]).map((status, idx) => (
                          <div key={status} className="flex items-center flex-1">
                            <div className={`w-3 h-3 rounded-full ${['Designing', 'In Production', 'Shipped', 'Delivered'].indexOf(order.status) >= idx ? 'bg-[#0B0D10]' : 'bg-[#E5E7EB]'}`} />
                            {idx < 3 && <div className={`flex-1 h-0.5 ${['Designing', 'In Production', 'Shipped', 'Delivered'].indexOf(order.status) > idx ? 'bg-[#0B0D10]' : 'bg-[#E5E7EB]'}`} />}
                          </div>
                        ))}
                      </div>
                    </div>

                    {order.status === 'Delivered' && (
                      <div className="bg-white border border-[#E5E7EB] p-6">
                        <h4 className="text-sm font-medium text-[#0B0D10] mb-2 uppercase tracking-wide">Rate This Order</h4>
                        <p className="text-xs text-[#9CA3AF] mb-6">Your rating shapes the platform.</p>
                        <div className="space-y-6">
                          {(['quality', 'deliveryTime', 'communication'] as (keyof Rating)[]).map(dim => (
                            <div key={dim} className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium text-[#0B0D10] mb-1 capitalize">{dim === 'deliveryTime' ? 'Delivery Time' : dim}</p>
                                <p className="text-xs text-[#9CA3AF]">{dim === 'quality' ? 'Product craftsmanship and materials' : dim === 'deliveryTime' ? 'Speed and reliability' : 'Responsiveness and updates'}</p>
                              </div>
                              <StarRating orderId={order.id} dimension={dim} value={ratings[order.id]?.[dim] || 0} />
                            </div>
                          ))}
                        </div>
                        {ratings[order.id] && Object.values(ratings[order.id]).some(v => v > 0) && (
                          <div className="mt-6 p-4 bg-[#E6C36A]/10 border border-[#E6C36A]/20">
                            <p className="text-xs text-[#0B0D10]">This brand gained <span className="font-bold">+0.12 influence</span> from your rating</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}