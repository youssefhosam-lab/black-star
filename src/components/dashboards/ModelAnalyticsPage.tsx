import React, { useState } from 'react';
import { useApp } from '../../App';
import { motion } from 'motion/react';
import { Bell, ChevronDown, TrendingUp, TrendingDown, Award, Star, CheckCircle, Clock } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// --- Mock Data ---
const summaryMetrics = {
  avgRating: 4.7,
  reliabilityRate: 96,
  jobCompletionRate: 94,
  avgResponseTime: '2.3 hours'
};

const performanceData = [
  { month: 'Jul', rating: 4.5, jobs: 8 },
  { month: 'Aug', rating: 4.6, jobs: 10 },
  { month: 'Sep', rating: 4.6, jobs: 12 },
  { month: 'Oct', rating: 4.7, jobs: 15 },
  { month: 'Nov', rating: 4.8, jobs: 14 },
  { month: 'Dec', rating: 4.7, jobs: 11 }
];

const rankingData = [
  {
    rank: 1,
    modelName: 'Yasmin El-Sayed',
    modelImage: 'https://images.unsplash.com/photo-1669643783392-09d0a26c79e8?w=80&h=80&fit=crop&q=80',
    score: 98,
    change: 2,
    status: 'Elite',
    rating: 4.9,
    jobs: 47
  },
  {
    rank: 2,
    modelName: 'Layla Mansour',
    modelImage: 'https://images.unsplash.com/photo-1725892604314-5d9c9f363757?w=80&h=80&fit=crop&q=80',
    score: 97,
    change: 0,
    status: 'Elite',
    rating: 4.9,
    jobs: 45
  },
  {
    rank: 3,
    modelName: 'Ahmed Hassan',
    modelImage: 'https://images.unsplash.com/photo-1618008797651-3eb256213400?w=80&h=80&fit=crop&q=80',
    score: 95,
    change: 1,
    status: 'Platinum',
    rating: 4.8,
    jobs: 42
  },
  {
    rank: 4,
    modelName: 'Nour Ibrahim',
    modelImage: 'https://images.unsplash.com/photo-1612739980306-908bac4fc9fe?w=80&h=80&fit=crop&q=80',
    score: 92,
    change: -1,
    status: 'Gold',
    rating: 4.7,
    jobs: 38
  },
  {
    rank: 5,
    modelName: 'Omar Khalil',
    modelImage: 'https://images.unsplash.com/photo-1643285740368-f7f1ba6b116f?w=80&h=80&fit=crop&q=80',
    score: 89,
    change: 3,
    status: 'Gold',
    rating: 4.6,
    jobs: 35
  },
  {
    rank: 6,
    modelName: 'Karim Nasser',
    modelImage: 'https://images.unsplash.com/photo-1646526802765-cdb3cd36d87d?w=80&h=80&fit=crop&q=80',
    score: 85,
    change: -2,
    status: 'Silver',
    rating: 4.5,
    jobs: 28
  }
];

// --- Components ---

const Header = ({ currentPage }: { currentPage: string }) => {
  const { navigate, setUser } = useApp();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 h-[72px] bg-[#0B0D10] border-b border-[#1E2230] z-50">
      <div className="h-full max-w-[1600px] mx-auto px-8 flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-3">
          <div className="size-8 bg-white flex items-center justify-center">
            <span className="text-[#0B0D10] text-xs font-semibold">★</span>
          </div>
          <span className="text-white text-sm tracking-wide">BLACK STAR</span>
        </div>

        {/* Center Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={() => navigate('brand-dashboard')}
            className="text-xs uppercase tracking-[0.1em] text-white hover:text-[#E6C36A] transition-all"
          >
            Dashboard
          </button>
          <button
            onClick={() => navigate('brand-production')}
            className="text-xs uppercase tracking-[0.1em] text-white hover:text-[#E6C36A] transition-all"
          >
            Production
          </button>
          <button
            onClick={() => navigate('models-directory')}
            className="text-xs uppercase tracking-[0.1em] text-white hover:text-[#E6C36A] transition-all"
          >
            Models
          </button>
          <button
            onClick={() => navigate('model-jobs')}
            className="text-xs uppercase tracking-[0.1em] text-white hover:text-[#E6C36A] transition-all"
          >
            Model Jobs
          </button>
          <button
            onClick={() => navigate('model-analytics')}
            className="text-xs uppercase tracking-[0.1em] text-white border-b-2 border-[#E6C36A] pb-1"
          >
            Analytics
          </button>
          <button
            onClick={() => navigate('brand-community')}
            className="text-xs uppercase tracking-[0.1em] text-white hover:text-[#E6C36A] transition-all"
          >
            Community
          </button>
        </nav>

        {/* Right */}
        <div className="flex items-center gap-6">
          <button className="relative text-white hover:text-[#E6C36A] transition-colors">
            <Bell className="size-5" />
            <span className="absolute -top-1 -right-1 size-2 bg-[#E6C36A] rounded-full" />
          </button>
          
          <div className="relative">
            <button 
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 text-white hover:text-[#E6C36A] transition-colors"
            >
              <div className="size-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-[#0B0D10] text-xs font-semibold">BS</span>
              </div>
              <ChevronDown className="size-4" />
            </button>

            {showProfileMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 top-12 w-48 bg-white border border-[#E5E7EB] shadow-lg"
              >
                <button className="w-full px-4 py-3 text-left text-xs uppercase tracking-wide hover:bg-[#FAFAFA] transition-colors">
                  Settings
                </button>
                <button 
                  onClick={() => {
                    setUser(null);
                    navigate('welcome');
                  }}
                  className="w-full px-4 py-3 text-left text-xs uppercase tracking-wide hover:bg-[#FAFAFA] transition-colors border-t border-[#E5E7EB]"
                >
                  Logout
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

const MetricCard = ({ icon: Icon, label, value, delay }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white border border-[#E5E7EB] p-6 text-center"
    >
      <Icon className="size-6 text-[#E6C36A] mx-auto mb-3" />
      <p className="text-3xl font-medium text-[#0B0D10] font-mono mb-2">{value}</p>
      <p className="text-xs uppercase tracking-wide text-[#6B7280]">{label}</p>
    </motion.div>
  );
};

const PerformanceChart = () => {
  return (
    <div className="bg-white border border-[#E5E7EB] p-6">
      <h3 className="text-sm uppercase tracking-wide text-[#6B7280] mb-6 font-medium">
        Performance Over Time
      </h3>
      <div style={{ width: '100%', height: '300px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
            <XAxis dataKey="month" stroke="#6B7280" style={{ fontSize: '12px' }} />
            <YAxis stroke="#6B7280" style={{ fontSize: '12px' }} domain={[4, 5]} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white',
                border: '1px solid #E5E7EB',
                borderRadius: '4px'
              }}
            />
            <Line 
              dataKey="rating" 
              stroke="#E6C36A" 
              strokeWidth={2}
              dot={{ fill: '#E6C36A', r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const JobSuccessChart = () => {
  return (
    <div className="bg-white border border-[#E5E7EB] p-6">
      <h3 className="text-sm uppercase tracking-wide text-[#6B7280] mb-6 font-medium">
        Jobs Completed (6 Months)
      </h3>
      <div style={{ width: '100%', height: '300px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
            <XAxis dataKey="month" stroke="#6B7280" style={{ fontSize: '12px' }} />
            <YAxis stroke="#6B7280" style={{ fontSize: '12px' }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff', 
                border: '1px solid #E5E7EB',
                borderRadius: '4px'
              }}
            />
            <Bar dataKey="jobs" fill="#0B0D10" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const RankingTable = () => {
  const { navigate } = useApp();

  const getRankColor = (status: string) => {
    const colors: any = {
      'Bronze': '#CD7F32',
      'Silver': '#C0C0C0',
      'Gold': '#E6C36A',
      'Platinum': '#E5E4E2',
      'Elite': '#E6C36A'
    };
    return colors[status] || '#6B7280';
  };

  return (
    <div className="bg-white border border-[#E5E7EB] overflow-hidden">
      <div className="p-6 border-b border-[#E5E7EB]">
        <h3 className="text-sm uppercase tracking-wide text-[#6B7280] font-medium">
          Model Rankings
        </h3>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-[60px_1fr_100px_100px_120px_100px] gap-4 px-6 py-3 bg-[#FAFAFA] border-b border-[#E5E7EB] text-xs uppercase tracking-wide text-[#6B7280]">
        <div>Rank</div>
        <div>Model</div>
        <div>Score</div>
        <div className="text-center">Change</div>
        <div>Status</div>
        <div className="text-right">Action</div>
      </div>

      {/* Table Rows */}
      {rankingData.map((model, index) => (
        <motion.div
          key={model.rank}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="grid grid-cols-[60px_1fr_100px_100px_120px_100px] gap-4 px-6 py-4 border-b border-[#E5E7EB] hover:bg-[#FAFAFA] transition-colors items-center"
        >
          {/* Rank */}
          <div className="text-2xl font-['Playfair_Display'] text-[#0B0D10]">
            {model.rank}
          </div>

          {/* Model */}
          <div className="flex items-center gap-3">
            <img
              src={model.modelImage}
              alt={model.modelName}
              className="size-12 rounded object-cover grayscale"
            />
            <div>
              <p className="text-sm font-medium text-[#0B0D10]">{model.modelName}</p>
              <div className="flex items-center gap-3 text-xs text-[#6B7280] mt-1">
                <span className="flex items-center gap-1">
                  <Star className="size-3 text-[#E6C36A] fill-[#E6C36A]" />
                  {model.rating}
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle className="size-3" />
                  {model.jobs} jobs
                </span>
              </div>
            </div>
          </div>

          {/* Score */}
          <div className="text-lg font-medium text-[#0B0D10] font-mono">
            {model.score}
          </div>

          {/* Change */}
          <div className="flex items-center justify-center">
            {model.change > 0 ? (
              <div className="flex items-center gap-1 text-green-600">
                <TrendingUp className="size-4" />
                <span className="text-sm font-mono">+{model.change}</span>
              </div>
            ) : model.change < 0 ? (
              <div className="flex items-center gap-1 text-red-600">
                <TrendingDown className="size-4" />
                <span className="text-sm font-mono">{model.change}</span>
              </div>
            ) : (
              <span className="text-sm text-[#6B7280] font-mono">—</span>
            )}
          </div>

          {/* Status */}
          <div>
            <span
              className="px-2 py-1 text-[10px] uppercase tracking-wide border inline-block"
              style={{ 
                borderColor: getRankColor(model.status),
                color: getRankColor(model.status)
              }}
            >
              {model.status}
            </span>
          </div>

          {/* Action */}
          <div className="text-right">
            <button
              onClick={() => navigate('model-profile', { modelId: model.rank })}
              className="text-xs uppercase tracking-wide text-[#0B0D10] hover:text-[#E6C36A] transition-colors"
            >
              View →
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export function ModelAnalyticsPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Header currentPage="analytics" />

      <div className="pt-[72px]">
        <div className="max-w-[1600px] mx-auto px-8 py-12">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="font-['Playfair_Display'] text-4xl text-[#0B0D10] mb-2">
              Model Analytics & Rankings
            </h1>
            <p className="text-sm text-[#6B7280]">
              Data-driven model selection and performance evaluation
            </p>
          </div>

          {/* Summary Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <MetricCard
              icon={Star}
              label="Average Rating"
              value={summaryMetrics.avgRating}
              delay={0.1}
            />
            <MetricCard
              icon={TrendingUp}
              label="Reliability Rate"
              value={`${summaryMetrics.reliabilityRate}%`}
              delay={0.2}
            />
            <MetricCard
              icon={CheckCircle}
              label="Job Completion"
              value={`${summaryMetrics.jobCompletionRate}%`}
              delay={0.3}
            />
            <MetricCard
              icon={Clock}
              label="Avg Response"
              value={summaryMetrics.avgResponseTime}
              delay={0.4}
            />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <PerformanceChart />
            <JobSuccessChart />
          </div>

          {/* Rankings Table */}
          <RankingTable />
        </div>
      </div>
    </div>
  );
}