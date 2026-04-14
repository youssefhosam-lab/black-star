import { useState, useEffect } from 'react';
import { useApp } from '../../App';
import { Bell, ChevronDown, Scissors, Calendar, Award, DollarSign } from 'lucide-react';
import Logo from '../../imports/Logo';

export function TailorDashboard() {
  const { navigate, user } = useApp();
  const [displayedName, setDisplayedName] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const tailorName = user?.name || 'Tailor';

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= tailorName.length) {
        setDisplayedName(tailorName.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTypingComplete(true);
      }
    }, 80);

    return () => clearInterval(typingInterval);
  }, [tailorName]);

  const kpis = [
    {
      label: 'Active Custom Orders',
      value: '8',
      icon: Scissors,
      color: '#0B0D10',
    },
    {
      label: 'Fittings Scheduled',
      value: '5',
      icon: Calendar,
      color: '#0B0D10',
    },
    {
      label: 'Completion Rate',
      value: '98%',
      icon: Award,
      color: '#E6C36A',
    },
    {
      label: 'Monthly Revenue',
      value: '$12,840',
      icon: DollarSign,
      color: '#E6C36A',
    },
  ];

  const customOrders = [
    {
      id: '1',
      client: 'Marcus Johnson',
      garment: 'Custom Suit',
      measurements: 'Completed',
      fitNotes: 'Slim fit, narrow lapels',
      status: 'In Progress',
      deadline: '2024-12-30',
    },
    {
      id: '2',
      client: 'Emma Williams',
      garment: 'Evening Dress',
      measurements: 'Completed',
      fitNotes: 'A-line silhouette, floor length',
      status: 'Fitting Scheduled',
      deadline: '2025-01-08',
    },
    {
      id: '3',
      client: 'David Chen',
      garment: 'Bespoke Coat',
      measurements: 'Pending',
      fitNotes: 'Classic cut, cashmere blend',
      status: 'Awaiting Measurements',
      deadline: '2025-01-15',
    },
  ];

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
                onClick={() => navigate(`tailor-${item.toLowerCase()}`)}
                className="text-sm font-medium text-[#9CA3AF] hover:text-[#0B0D10] transition-colors tracking-wide"
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

      {/* Welcome Section */}
      <section className="py-24 px-6 border-b border-[#E5E7EB]">
        <div className="container mx-auto">
          <p className="text-lg text-[#9CA3AF] mb-4 font-['Inter']">
            Welcome back,
          </p>

          <h1 className="text-6xl md:text-8xl font-['Playfair_Display'] font-bold text-[#0B0D10] mb-6">
            {displayedName}
            {!isTypingComplete && (
              <span className="inline-block w-1 h-16 md:h-24 bg-[#0B0D10] ml-2 animate-pulse" />
            )}
          </h1>

          <p className="text-lg text-[#9CA3AF] font-['Inter'] italic">
            "Craft. Precision. Human skill."
          </p>
        </div>
      </section>

      {/* KPI Cards */}
      <section className="py-16 px-6 border-b border-[#E5E7EB]">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {kpis.map((kpi) => {
              const Icon = kpi.icon;
              return (
                <div
                  key={kpi.label}
                  className="border border-[#E5E7EB] p-6 hover:border-[#0B0D10] transition-colors"
                >
                  <div className="flex items-start justify-between mb-4">
                    <Icon className="w-6 h-6" style={{ color: kpi.color }} />
                  </div>
                  <p className="text-3xl font-['Playfair_Display'] font-bold text-[#0B0D10] mb-2">
                    {kpi.value}
                  </p>
                  <p className="text-sm text-[#9CA3AF] uppercase tracking-wide">
                    {kpi.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Custom Orders Preview */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-['Playfair_Display'] font-bold text-[#0B0D10]">
              Custom Orders
            </h2>
            <button
              onClick={() => navigate('tailor-orders')}
              className="text-sm text-[#0B0D10] hover:text-[#E6C36A] transition-colors font-medium"
            >
              View All Orders →
            </button>
          </div>

          <div className="space-y-4">
            {customOrders.map((order) => (
              <div
                key={order.id}
                className="border border-[#E5E7EB] p-6 hover:border-[#0B0D10] transition-colors cursor-pointer"
                onClick={() => navigate('tailor-production', { orderId: order.id })}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <h3 className="text-xl font-['Playfair_Display'] font-bold text-[#0B0D10]">
                        {order.garment}
                      </h3>
                      <span
                        className={`px-3 py-1 text-xs font-medium ${
                          order.status === 'Awaiting Measurements'
                            ? 'bg-[#E5E7EB] text-[#0B0D10]'
                            : order.status === 'In Progress'
                            ? 'bg-[#0B0D10] text-white'
                            : 'bg-[#E6C36A]/20 text-[#0B0D10]'
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <p className="text-sm text-[#9CA3AF] mb-2">
                      Client: {order.client}
                    </p>
                    <p className="text-sm text-[#9CA3AF]">
                      {order.fitNotes}
                    </p>
                  </div>
                  <div className="text-right ml-6">
                    <p className="text-sm text-[#9CA3AF]">Deadline</p>
                    <p className="text-sm font-medium text-[#0B0D10]">
                      {new Date(order.deadline).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
                <div className="pt-4 border-t border-[#E5E7EB]">
                  <p className="text-xs text-[#9CA3AF]">
                    Measurements: <span className="text-[#0B0D10] font-medium">{order.measurements}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}