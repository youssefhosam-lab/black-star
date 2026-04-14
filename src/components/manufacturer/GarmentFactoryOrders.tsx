import { useState } from 'react';
import { useApp } from '../../App';
import { Bell, ChevronDown, Search, Filter } from 'lucide-react';
import Logo from '../../imports/Logo';

interface Order {
  id: string;
  orderId: string;
  brand: string;
  garment: string;
  quantity: number;
  fabric: string;
  deadline: string;
  status: 'Pending' | 'In Production' | 'Quality Check' | 'Completed' | 'Delayed';
  orderDate: string;
  totalValue: number;
}

export function GarmentFactoryOrders() {
  const { navigate, user } = useApp();
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'active' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const orders: Order[] = [
    {
      id: '1',
      orderId: 'ORD-2024-1245',
      brand: 'Urban Collective',
      garment: 'Black Hoodies',
      quantity: 500,
      fabric: 'Cotton Fleece',
      deadline: '2024-12-28',
      status: 'In Production',
      orderDate: '2024-12-15',
      totalValue: 4250,
    },
    {
      id: '2',
      orderId: 'ORD-2024-1238',
      brand: 'Minimal Studio',
      garment: 'White T-Shirts',
      quantity: 1000,
      fabric: 'Organic Cotton',
      deadline: '2024-12-30',
      status: 'Quality Check',
      orderDate: '2024-12-12',
      totalValue: 3890,
    },
    {
      id: '3',
      orderId: 'ORD-2024-1250',
      brand: 'Heritage Co.',
      garment: 'Denim Jackets',
      quantity: 200,
      fabric: 'Japanese Denim',
      deadline: '2025-01-05',
      status: 'Pending',
      orderDate: '2024-12-20',
      totalValue: 5600,
    },
    {
      id: '4',
      orderId: 'ORD-2024-1232',
      brand: 'Luxe Threads',
      garment: 'Linen Shirts',
      quantity: 300,
      fabric: 'European Linen',
      deadline: '2024-12-25',
      status: 'Delayed',
      orderDate: '2024-12-10',
      totalValue: 3240,
    },
    {
      id: '5',
      orderId: 'ORD-2024-1220',
      brand: 'Urban Collective',
      garment: 'Black Joggers',
      quantity: 400,
      fabric: 'Cotton Terry',
      deadline: '2024-12-18',
      status: 'Completed',
      orderDate: '2024-12-05',
      totalValue: 2880,
    },
  ];

  const filteredOrders = orders.filter((order) => {
    const matchesTab =
      activeTab === 'all' ||
      (activeTab === 'pending' && order.status === 'Pending') ||
      (activeTab === 'active' && (order.status === 'In Production' || order.status === 'Quality Check')) ||
      (activeTab === 'completed' && order.status === 'Completed');

    const matchesSearch =
      searchQuery === '' ||
      order.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.garment.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesSearch;
  });

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'Pending':
        return 'bg-[#E5E7EB] text-[#0B0D10]';
      case 'In Production':
        return 'bg-[#0B0D10] text-white';
      case 'Quality Check':
        return 'bg-[#E6C36A]/20 text-[#0B0D10]';
      case 'Completed':
        return 'bg-[#E6C36A]/40 text-[#0B0D10]';
      case 'Delayed':
        return 'bg-[#7A0F0F]/10 text-[#7A0F0F]';
      default:
        return 'bg-[#E5E7EB] text-[#0B0D10]';
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#E5E7EB]">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="w-8 h-8 text-[#0B0D10] cursor-pointer" onClick={() => navigate('home')}>
            <Logo showText={false} />
          </div>

          <nav className="hidden md:flex items-center gap-12">
            {['Orders', 'Analytics', 'Materials', 'Community', 'Payments'].map((item) => (
              <button
                key={item}
                onClick={() => navigate(`garment-factory-${item.toLowerCase()}`)}
                className={`text-sm font-medium transition-colors tracking-wide ${
                  item === 'Orders' ? 'text-[#0B0D10]' : 'text-[#9CA3AF] hover:text-[#0B0D10]'
                }`}
              >
                {item}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button className="relative p-2 hover:bg-[#E5E7EB]/50 rounded-full transition-colors">
              <Bell className="w-5 h-5 text-[#0B0D10]" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#E6C36A] rounded-full" />
            </button>
            <div className="relative group">
              <button className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <div className="w-8 h-8 rounded-full bg-[#E5E7EB] overflow-hidden">
                  <img
                    src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <ChevronDown className="w-4 h-4 text-[#9CA3AF]" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Orders Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-5xl font-['Playfair_Display'] font-bold text-[#0B0D10]">
            Production Orders
          </h1>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF]" />
            <input
              type="text"
              placeholder="Search by brand, order ID, or garment..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-[#E5E7EB] text-[#0B0D10] placeholder-[#9CA3AF] focus:border-[#0B0D10] focus:outline-none"
            />
          </div>
          <button className="px-6 py-3 border border-[#E5E7EB] text-[#0B0D10] hover:border-[#0B0D10] transition-colors flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filter
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-[#E5E7EB]">
          {[
            { id: 'all', label: 'All Orders', count: orders.length },
            { id: 'pending', label: 'Pending', count: orders.filter((o) => o.status === 'Pending').length },
            { id: 'active', label: 'Active', count: orders.filter((o) => o.status === 'In Production' || o.status === 'Quality Check').length },
            { id: 'completed', label: 'Completed', count: orders.filter((o) => o.status === 'Completed').length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-4 px-2 text-sm font-medium transition-colors relative flex items-center gap-2 ${
                activeTab === tab.id ? 'text-[#0B0D10]' : 'text-[#9CA3AF] hover:text-[#0B0D10]'
              }`}
            >
              {tab.label}
              <span className="text-xs px-2 py-0.5 bg-[#E5E7EB] rounded-full">{tab.count}</span>
              {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0B0D10]" />}
            </button>
          ))}
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="border border-[#E5E7EB] hover:border-[#0B0D10] transition-colors"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <h3 className="text-xl font-['Playfair_Display'] font-bold text-[#0B0D10]">
                        {order.garment}
                      </h3>
                      <span className={`px-3 py-1 text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-[#9CA3AF] mb-1">Order ID</p>
                        <p className="text-[#0B0D10] font-medium">{order.orderId}</p>
                      </div>
                      <div>
                        <p className="text-[#9CA3AF] mb-1">Brand</p>
                        <p className="text-[#0B0D10] font-medium">{order.brand}</p>
                      </div>
                      <div>
                        <p className="text-[#9CA3AF] mb-1">Quantity</p>
                        <p className="text-[#0B0D10] font-medium">{order.quantity} units</p>
                      </div>
                      <div>
                        <p className="text-[#9CA3AF] mb-1">Fabric</p>
                        <p className="text-[#0B0D10] font-medium">{order.fabric}</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right ml-6">
                    <p className="text-sm text-[#9CA3AF] mb-1">Deadline</p>
                    <p className="text-lg font-medium text-[#0B0D10]">
                      {new Date(order.deadline).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>
                    <p className="text-xs text-[#9CA3AF] mt-2">${order.totalValue.toLocaleString()}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E5E7EB] flex gap-3">
                  {order.status === 'Pending' && (
                    <>
                      <button className="px-4 py-2 bg-[#0B0D10] text-white text-sm font-medium hover:opacity-90 transition-opacity">
                        Accept Order
                      </button>
                      <button className="px-4 py-2 border border-[#E5E7EB] text-[#0B0D10] text-sm font-medium hover:border-[#0B0D10] transition-colors">
                        Reject
                      </button>
                    </>
                  )}
                  {order.status !== 'Pending' && (
                    <button
                      onClick={() => navigate('garment-factory-production', { orderId: order.id })}
                      className="px-4 py-2 bg-[#0B0D10] text-white text-sm font-medium hover:opacity-90 transition-opacity"
                    >
                      View Production →
                    </button>
                  )}
                  <button className="px-4 py-2 border border-[#E5E7EB] text-[#0B0D10] text-sm font-medium hover:border-[#0B0D10] transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-16">
            <p className="text-[#9CA3AF] text-lg">No orders found</p>
          </div>
        )}
      </div>
    </div>
  );
}