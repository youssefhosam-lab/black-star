import { useState, useEffect } from 'react';
import { useApp } from '../../App';
import { Bell, ChevronDown, Zap, Target, AlertCircle, DollarSign } from 'lucide-react';
import Logo from '../../imports/Logo';

export function PrintOnFactoryDashboard() {
  const { navigate, user } = useApp();
  const [displayedName, setDisplayedName] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const factoryName = user?.name || 'Print Factory';

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= factoryName.length) {
        setDisplayedName(factoryName.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTypingComplete(true);
      }
    }, 80);

    return () => clearInterval(typingInterval);
  }, [factoryName]);

  const kpis = [
    {
      label: 'Print Jobs Active',
      value: '18',
      icon: Zap,
      color: '#0B0D10',
    },
    {
      label: 'Print Type Usage',
      value: 'DTG 62%',
      icon: Target,
      color: '#0B0D10',
    },
    {
      label: 'Error Rate',
      value: '2.1%',
      icon: AlertCircle,
      color: '#7A0F0F',
    },
    {
      label: 'Monthly Throughput',
      value: '$28,420',
      icon: DollarSign,
      color: '#E6C36A',
    },
  ];

  const recentJobs = [
    {
      id: '1',
      brand: 'Urban Collective',
      printType: 'DTG',
      colors: 4,
      quantity: 200,
      placement: 'Front Chest',
      status: 'Printing',
    },
    {
      id: '2',
      brand: 'Minimal Studio',
      printType: 'Screen Print',
      colors: 2,
      quantity: 500,
      placement: 'Back Full',
      status: 'Print Test',
    },
    {
      id: '3',
      brand: 'Heritage Co.',
      printType: 'Embroidery',
      colors: 3,
      quantity: 100,
      placement: 'Left Chest',
      status: 'Pending',
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
                onClick={() => navigate(`print-on-factory-${item.toLowerCase()}`)}
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
            "Precision. Speed. Technical mastery."
          </p>
        </div>
      </section>

      {/* KPI Strip */}
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

      {/* Recent Jobs Preview */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-['Playfair_Display'] font-bold text-[#0B0D10]">
              Active Print Jobs
            </h2>
            <button
              onClick={() => navigate('print-on-factory-orders')}
              className="text-sm text-[#0B0D10] hover:text-[#E6C36A] transition-colors font-medium"
            >
              View All Jobs →
            </button>
          </div>

          <div className="space-y-4">
            {recentJobs.map((job) => (
              <div
                key={job.id}
                className="border border-[#E5E7EB] p-6 hover:border-[#0B0D10] transition-colors cursor-pointer"
                onClick={() => navigate('print-on-factory-production', { jobId: job.id })}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <h3 className="text-xl font-['Playfair_Display'] font-bold text-[#0B0D10]">
                        {job.printType}
                      </h3>
                      <span
                        className={`px-3 py-1 text-xs font-medium ${
                          job.status === 'Pending'
                            ? 'bg-[#E5E7EB] text-[#0B0D10]'
                            : job.status === 'Printing'
                            ? 'bg-[#0B0D10] text-white'
                            : 'bg-[#E6C36A]/20 text-[#0B0D10]'
                        }`}
                      >
                        {job.status}
                      </span>
                    </div>
                    <p className="text-sm text-[#9CA3AF]">
                      {job.brand} • {job.quantity} units • {job.colors} colors • {job.placement}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}