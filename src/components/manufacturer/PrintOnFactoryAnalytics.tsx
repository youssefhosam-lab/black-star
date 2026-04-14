import { useState, useEffect } from 'react';
import { useApp } from '../../App';
import { Bell, ChevronDown, TrendingUp, TrendingDown, AlertTriangle, CheckCircle } from 'lucide-react';
import Logo from '../../imports/Logo';

export function PrintOnFactoryAnalytics() {
  const { navigate, user } = useApp();
  const [activeTimeframe, setActiveTimeframe] = useState<'week' | 'month' | 'year'>('month');
  const [countersAnimated, setCountersAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setCountersAnimated(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const kpis = [
    { label: 'Active Jobs', value: 18, change: '+15%', trend: 'up' },
    { label: 'Completed Jobs', value: 156, change: '+12%', trend: 'up' },
    { label: 'Avg Completion Time', value: '2.8 Days', change: '-0.4 Days', trend: 'down' },
    { label: 'Black Star Rating', value: '★ 0.86', change: '+0.06', trend: 'up' },
  ];

  const qualityMetrics = [
    { label: 'Print Quality Score', value: 94, unit: '%' },
    { label: 'Rework Rate', value: 2.1, unit: '%' },
    { label: 'Color Match Accuracy', value: 97, unit: '%' },
  ];

  const ratingDimensions = [
    { label: 'Print Quality', value: 0.92, percentage: 92 },
    { label: 'Delivery Time', value: 0.84, percentage: 84 },
    { label: 'Communication', value: 0.87, percentage: 87 },
    { label: 'Technical Precision', value: 0.91, percentage: 91 },
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
                className={`text-sm font-medium transition-colors tracking-wide ${
                  item === 'Analytics' ? 'text-[#0B0D10]' : 'text-[#9CA3AF] hover:text-[#0B0D10]'
                }`}
              >
                {item}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button className="relative p-2 hover:bg-[#E5E7EB]/50 rounded-full transition-colors">
              <Bell className="w-5 h-5 text-[#0B0D10]" />
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

      {/* Analytics Content */}
      <div className="container mx-auto px-6 py-16">
        {/* Page Header */}
        <div className="mb-16 animate-[fadeInUp_400ms_ease-out]">
          <h1 className="text-6xl font-['Playfair_Display'] font-bold text-[#0B0D10] mb-3">
            ANALYTICS
          </h1>
          <p className="text-sm text-[#9CA3AF] tracking-[0.2em] uppercase">
            PERFORMANCE • QUALITY • TRUST
          </p>
        </div>

        {/* Section 1: Core KPIs */}
        <div className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {kpis.map((kpi, index) => (
              <div
                key={kpi.label}
                className="border border-[#0B0D10] p-8 bg-white animate-[scaleIn_400ms_ease-out] hover:shadow-lg transition-shadow"
                style={{ animationDelay: `${index * 120}ms` }}
              >
                <p className="text-xs uppercase tracking-wider text-[#9CA3AF] mb-4">
                  {kpi.label}
                </p>
                <p className="text-5xl font-bold text-[#0B0D10] mb-3">
                  {kpi.value}
                </p>
                <div className="flex items-center gap-2">
                  {kpi.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4 text-[#16a34a]" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-[#16a34a]" />
                  )}
                  <span className="text-sm text-[#16a34a]">{kpi.change} this month</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Performance Over Time */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-['Playfair_Display'] font-bold text-[#0B0D10]">
              Print Performance
            </h2>
            <div className="flex gap-2">
              {['week', 'month', 'year'].map((timeframe) => (
                <button
                  key={timeframe}
                  onClick={() => setActiveTimeframe(timeframe as any)}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    activeTimeframe === timeframe
                      ? 'bg-[#0B0D10] text-white'
                      : 'bg-white text-[#9CA3AF] border border-[#E5E7EB] hover:border-[#0B0D10]'
                  }`}
                >
                  This {timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Chart 1: Print Jobs Over Time */}
          <div className="border border-[#E5E7EB] p-8 mb-8">
            <h3 className="text-lg font-medium text-[#0B0D10] mb-6">Print Jobs Over Time</h3>
            <div className="h-64 flex items-end justify-between gap-2">
              {[52, 48, 61, 58, 67, 64, 71, 68, 75, 82, 78, 85].map((height, i) => (
                <div key={i} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-full bg-[#0B0D10] transition-all duration-500 hover:bg-[#E6C36A]"
                    style={{ height: `${height}%` }}
                  />
                  <span className="text-xs text-[#9CA3AF] mt-2">
                    {activeTimeframe === 'week' ? `D${i + 1}` : `W${i + 1}`}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Chart 2: On-Time Delivery Rate */}
          <div className="border border-[#E5E7EB] p-8">
            <h3 className="text-lg font-medium text-[#0B0D10] mb-4">On-Time Delivery Rate</h3>
            <div className="flex items-center gap-6 mb-4">
              <div className="text-5xl font-bold text-[#0B0D10]">95%</div>
              <div className="flex items-center gap-2 text-[#16a34a]">
                <TrendingUp className="w-5 h-5" />
                <span className="text-sm">+4% from last period</span>
              </div>
            </div>
            <div className="h-4 bg-[#E5E7EB] rounded-full overflow-hidden">
              <div className="h-full bg-[#16a34a] transition-all duration-1000" style={{ width: '95%' }} />
            </div>
            <p className="text-xs text-[#9CA3AF] mt-3">
              Tracks print batch completion and rework frequency across all print types
            </p>
          </div>
        </div>

        {/* Section 3: Quality & Trust */}
        <div className="mb-20">
          <h2 className="text-3xl font-['Playfair_Display'] font-bold text-[#0B0D10] mb-8">
            Quality & Trust Metrics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {qualityMetrics.map((metric, index) => (
              <div
                key={metric.label}
                className="border border-[#E5E7EB] p-8 hover:border-[#0B0D10] transition-colors"
              >
                <p className="text-xs uppercase tracking-wider text-[#9CA3AF] mb-4">
                  {metric.label}
                </p>
                <div className="flex items-baseline gap-2">
                  <p className="text-4xl font-bold text-[#0B0D10]">
                    {countersAnimated ? metric.value : 0}
                  </p>
                  <span className="text-xl text-[#9CA3AF]">{metric.unit}</span>
                </div>
                {metric.label === 'Rework Rate' && (
                  <p className="text-xs text-[#9CA3AF] mt-3">Lower = better technical precision</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Rating Breakdown */}
        <div className="mb-20">
          <h2 className="text-3xl font-['Playfair_Display'] font-bold text-[#0B0D10] mb-8">
            How You Are Rated
          </h2>
          <div className="border border-[#E5E7EB] p-8">
            <div className="space-y-6">
              {ratingDimensions.map((dimension) => (
                <div key={dimension.label}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-[#0B0D10]">{dimension.label}</span>
                    <span className="text-sm text-[#9CA3AF]">★ {dimension.value.toFixed(2)}</span>
                  </div>
                  <div className="h-2 bg-[#E5E7EB] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#0B0D10] transition-all duration-1000"
                      style={{ width: `${dimension.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section 5: Material & Capacity Insights */}
        <div className="mb-20">
          <h2 className="text-3xl font-['Playfair_Display'] font-bold text-[#0B0D10] mb-8">
            Material & Equipment Insights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-[#E5E7EB] p-8">
              <p className="text-xs uppercase tracking-wider text-[#9CA3AF] mb-4">
                Equipment Usage
              </p>
              <div className="text-5xl font-bold text-[#0B0D10] mb-4">82%</div>
              <div className="h-4 bg-[#E5E7EB] rounded-full overflow-hidden mb-3">
                <div className="h-full bg-[#16a34a] transition-all duration-1000" style={{ width: '82%' }} />
              </div>
              <p className="text-xs text-[#9CA3AF]">
                Optimal range: 70-90% • Current status: <span className="text-[#16a34a]">Optimal</span>
              </p>
            </div>

            <div className="border border-[#E5E7EB] p-8">
              <p className="text-xs uppercase tracking-wider text-[#9CA3AF] mb-4">
                Print Type Distribution
              </p>
              <div className="space-y-3">
                {[
                  { name: 'DTG (Direct-to-Garment)', percentage: 62 },
                  { name: 'Screen Print', percentage: 28 },
                  { name: 'Heat Press', percentage: 10 },
                ].map((type) => (
                  <div key={type.name}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-[#0B0D10]">{type.name}</span>
                      <span className="text-xs text-[#9CA3AF]">{type.percentage}%</span>
                    </div>
                    <div className="h-1 bg-[#E5E7EB] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#0B0D10]"
                        style={{ width: `${type.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Section 6: Revenue Overview */}
        <div className="mb-20">
          <h2 className="text-3xl font-['Playfair_Display'] font-bold text-[#0B0D10] mb-8">
            Revenue Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-[#E5E7EB] p-8">
              <p className="text-xs uppercase tracking-wider text-[#9CA3AF] mb-3">This Month</p>
              <p className="text-4xl font-bold text-[#0B0D10]">$38,750</p>
            </div>
            <div className="border border-[#E5E7EB] p-8">
              <p className="text-xs uppercase tracking-wider text-[#9CA3AF] mb-3">Last Month</p>
              <p className="text-4xl font-bold text-[#0B0D10]">$34,200</p>
            </div>
            <div className="border border-[#E5E7EB] p-8">
              <p className="text-xs uppercase tracking-wider text-[#9CA3AF] mb-3">Growth</p>
              <div className="flex items-center gap-3">
                <p className="text-4xl font-bold text-[#16a34a]">+13.3%</p>
                <TrendingUp className="w-6 h-6 text-[#16a34a]" />
              </div>
            </div>
          </div>
        </div>

        {/* Section 7: System Insights */}
        <div className="mb-20">
          <h2 className="text-3xl font-['Playfair_Display'] font-bold text-[#0B0D10] mb-8">
            System Insights
          </h2>
          <div className="space-y-4">
            <div className="border-l-4 border-[#E6C36A] bg-[#E6C36A]/5 p-6 flex items-start gap-4">
              <CheckCircle className="w-5 h-5 text-[#16a34a] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-[#0B0D10] font-medium mb-1">
                  Color match accuracy improved to 97%.
                </p>
                <p className="text-sm text-[#9CA3AF]">
                  Your technical precision is driving client satisfaction and repeat orders.
                </p>
              </div>
            </div>

            <div className="border-l-4 border-[#7A0F0F] bg-[#7A0F0F]/5 p-6 flex items-start gap-4">
              <AlertTriangle className="w-5 h-5 text-[#7A0F0F] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-[#0B0D10] font-medium mb-1">
                  DTG white ink running low in inventory.
                </p>
                <p className="text-sm text-[#9CA3AF]">
                  Check materials page to avoid print delays on upcoming jobs.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center pt-8 border-t border-[#E5E7EB]">
          <p className="text-xs text-[#9CA3AF] tracking-wider">
            Black Star Analytics — Built for precision, not noise.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.96);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
