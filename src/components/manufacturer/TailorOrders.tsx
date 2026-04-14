import { useState } from 'react';
import { useApp } from '../../App';
import { Bell, ChevronDown, Search, Filter, Calendar } from 'lucide-react';
import Logo from '../../imports/Logo';

interface CustomOrder {
  id: string;
  orderId: string;
  client: string;
  garment: string;
  measurements: 'Completed' | 'Pending' | 'Scheduled';
  fitNotes: string;
  status: 'Awaiting Measurements' | 'In Progress' | 'Fitting Scheduled' | 'Completed' | 'Alterations Needed';
  orderDate: string;
  deadline: string;
  totalValue: number;
  fittingDate?: string;
}

export function TailorOrders() {
  const { navigate, user } = useApp();
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'active' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const orders: CustomOrder[] = [
    {
      id: '1',
      orderId: 'TLR-2024-0156',
      client: 'Marcus Johnson',
      garment: 'Custom Suit',
      measurements: 'Completed',
      fitNotes: 'Slim fit, narrow lapels, double-breasted',
      status: 'In Progress',
      orderDate: '2024-12-10',
      deadline: '2024-12-30',
      totalValue: 1850,
    },
    {
      id: '2',
      orderId: 'TLR-2024-0162',
      client: 'Emma Williams',
      garment: 'Evening Dress',
      measurements: 'Completed',
      fitNotes: 'A-line silhouette, floor length, fitted waist',
      status: 'Fitting Scheduled',
      orderDate: '2024-12-15',
      deadline: '2025-01-08',
      totalValue: 2400,
      fittingDate: '2024-12-28',
    },
    {
      id: '3',
      orderId: 'TLR-2024-0168',
      client: 'David Chen',
      garment: 'Bespoke Coat',
      measurements: 'Pending',
      fitNotes: 'Classic cut, cashmere blend, peak lapels',
      status: 'Awaiting Measurements',
      orderDate: '2024-12-18',
      deadline: '2025-01-15',
      totalValue: 3200,
    },
    {
      id: '4',
      orderId: 'TLR-2024-0148',
      client: 'Sarah Mitchell',
      garment: 'Tailored Blazer',
      measurements: 'Completed',
      fitNotes: 'Structured shoulders, single button, cropped',
      status: 'Alterations Needed',
      orderDate: '2024-12-05',
      deadline: '2024-12-25',
      totalValue: 980,
      fittingDate: '2024-12-22',
    },
    {
      id: '5',
      orderId: 'TLR-2024-0140',
      client: 'Robert Taylor',
      garment: 'Three-Piece Suit',
      measurements: 'Completed',
      fitNotes: 'Traditional fit, peak lapels, waistcoat included',
      status: 'Completed',
      orderDate: '2024-11-28',
      deadline: '2024-12-20',
      totalValue: 2650,
    },
  ];

  const filteredOrders = orders.filter((order) => {
    const matchesTab =
      activeTab === 'all' ||
      (activeTab === 'pending' && order.status === 'Awaiting Measurements') ||
      (activeTab === 'active' && (order.status === 'In Progress' || order.status === 'Fitting Scheduled' || order.status === 'Alterations Needed')) ||
      (activeTab === 'completed' && order.status === 'Completed');

    const matchesSearch =
      searchQuery === '' ||
      order.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.garment.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesSearch;
  });

  const getStatusColor = (status: CustomOrder['status']) => {
    switch (status) {
      case 'Awaiting Measurements':
        return 'bg-[#E5E7EB] text-[#0B0D10]';
      case 'In Progress':
        return 'bg-[#0B0D10] text-white';
      case 'Fitting Scheduled':
        return 'bg-[#E6C36A]/20 text-[#0B0D10]';
      case 'Alterations Needed':
        return 'bg-[#9CA3AF]/20 text-[#0B0D10]';
      case 'Completed':
        return 'bg-[#E6C36A]/40 text-[#0B0D10]';
      default:
        return 'bg-[#E5E7EB] text-[#0B0D10]';
    }
  };

  const getMeasurementColor = (status: CustomOrder['measurements']) => {
    switch (status) {
      case 'Completed':
        return 'text-[#E6C36A]';
      case 'Scheduled':
        return 'text-[#0B0D10]';
      case 'Pending':
        return 'text-[#9CA3AF]';
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
            {['Orders', 'Production', 'Materials', 'Community', 'Payments'].map((item) => (
              <button
                key={item}
                onClick={() => navigate(`tailor-${item.toLowerCase()}`)}
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
            Custom Orders
          </h1>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF]" />
            <input
              type="text"
              placeholder="Search by client, order ID, or garment..."
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
            { id: 'pending', label: 'Pending', count: orders.filter((o) => o.status === 'Awaiting Measurements').length },
            { id: 'active', label: 'Active', count: orders.filter((o) => o.status === 'In Progress' || o.status === 'Fitting Scheduled' || o.status === 'Alterations Needed').length },
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
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm mb-4">
                      <div>
                        <p className="text-[#9CA3AF] mb-1">Order ID</p>
                        <p className="text-[#0B0D10] font-medium">{order.orderId}</p>
                      </div>
                      <div>
                        <p className="text-[#9CA3AF] mb-1">Client</p>
                        <p className="text-[#0B0D10] font-medium">{order.client}</p>
                      </div>
                      <div>
                        <p className="text-[#9CA3AF] mb-1">Measurements</p>
                        <p className={`font-medium ${getMeasurementColor(order.measurements)}`}>
                          {order.measurements}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-[#9CA3AF] italic">
                      {order.fitNotes}
                    </p>
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

                {order.fittingDate && (
                  <div className="pb-4 mb-4 border-b border-[#E5E7EB] flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-[#E6C36A]" />
                    <span className="text-[#9CA3AF]">Fitting scheduled for:</span>
                    <span className="text-[#0B0D10] font-medium">
                      {new Date(order.fittingDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                )}

                <div className="flex gap-3">
                  {order.status === 'Awaiting Measurements' && (
                    <button className="px-4 py-2 bg-[#0B0D10] text-white text-sm font-medium hover:opacity-90 transition-opacity">
                      Schedule Measurements
                    </button>
                  )}
                  {order.status !== 'Awaiting Measurements' && order.status !== 'Completed' && (
                    <button
                      onClick={() => navigate('tailor-production', { orderId: order.id })}
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
