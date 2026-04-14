import React, { useState } from 'react';
import { useApp } from '../../App';
import { motion } from 'motion/react';
import { Bell, User, ChevronDown, Download, TrendingUp, TrendingDown } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import Logo from '../../imports/Logo';

// --- Header Component ---
const ModelHeader = ({ activePage }: { activePage: string }) => {
  const { navigate, setUser } = useApp();
  const [showDropdown, setShowDropdown] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', route: 'home' },
    { id: 'portfolio', label: 'Portfolio', route: 'model-portfolio' },
    { id: 'orders', label: 'Orders', route: 'model-orders' },
    { id: 'analytics', label: 'Analytics', route: 'model-analytics' },
    { id: 'ranking', label: 'Ranking', route: 'model-ranking' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 h-20 bg-white/95 backdrop-blur-sm z-50 border-b border-gray-200">
      <div className="h-full px-12 flex items-center justify-between max-w-[2000px] mx-auto">
        <div className="w-10 h-10 text-black">
          <Logo showText={false} />
        </div>

        <nav className="hidden md:flex items-center gap-12">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => navigate(item.route)}
              className="relative group"
            >
              <span className="text-xs uppercase tracking-[0.15em] text-black transition-colors">
                {item.label}
              </span>
              <motion.div
                className="absolute -bottom-1 left-0 right-0 h-[1px] bg-black"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: activePage === item.id ? 1 : 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              />
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-6">
          <button className="relative group">
            <Bell className="size-5 text-black transition-transform group-hover:scale-110" />
            <span className="absolute -top-1 -right-1 size-2 bg-black rounded-full" />
          </button>

          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-3 group"
            >
              <div className="size-10 rounded-full bg-gray-200 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1643743323468-1e018b621231?w=100&h=100&fit=crop"
                  alt="Profile"
                  className="w-full h-full object-cover filter grayscale"
                />
              </div>
              <ChevronDown className="size-4 text-gray-400 transition-transform group-hover:translate-y-0.5" />
            </button>

            {showDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 top-14 w-48 bg-white border border-gray-200 shadow-xl"
              >
                <button className="w-full px-6 py-4 text-left text-xs uppercase tracking-wide hover:bg-gray-50 transition-colors">
                  Settings
                </button>
                <button
                  onClick={() => {
                    setUser(null);
                    navigate('welcome');
                  }}
                  className="w-full px-6 py-4 text-left text-xs uppercase tracking-wide hover:bg-gray-50 transition-colors border-t border-gray-100"
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

// --- Analytics Page ---
export function ModelAnalytics() {
  const earningsData = [
    { month: 'Jul', earnings: 125000 },
    { month: 'Aug', earnings: 145000 },
    { month: 'Sep', earnings: 165000 },
    { month: 'Oct', earnings: 152000 },
    { month: 'Nov', earnings: 178000 },
    { month: 'Dec', earnings: 195000 },
  ];

  const jobsData = [
    { month: 'Jul', jobs: 3 },
    { month: 'Aug', jobs: 4 },
    { month: 'Sep', jobs: 5 },
    { month: 'Oct', jobs: 4 },
    { month: 'Nov', jobs: 6 },
    { month: 'Dec', jobs: 8 },
  ];

  const ratingBreakdown = [
    { category: 'Professionalism', score: 4.9 },
    { category: 'Punctuality', score: 4.8 },
    { category: 'Versatility', score: 4.7 },
    { category: 'Collaboration', score: 4.9 },
    { category: 'Overall', score: 4.8 },
  ];

  return (
    <div className="min-h-screen bg-white text-black">
      <ModelHeader activePage="analytics" />
      
      <main className="max-w-[1800px] mx-auto px-12 pt-20">
        <div className="mt-[140px] mb-[140px]">
          {/* Page Title */}
          <div className="mb-16 flex items-end justify-between">
            <div>
              <h1 className="text-6xl font-['Playfair_Display'] mb-4">Analytics</h1>
              <p className="text-sm uppercase tracking-[0.2em] text-gray-500">Clarity, transparency, confidence</p>
            </div>
            <button className="px-8 py-4 border border-black text-xs uppercase tracking-[0.15em] hover:bg-black hover:text-white transition-all duration-300 flex items-center gap-3">
              <Download className="size-4" />
              Download PDF
            </button>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-4 gap-6 mb-[140px]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="bg-white border border-gray-200 p-8"
            >
              <p className="text-xs uppercase tracking-wide text-gray-400 mb-4">Total Earnings</p>
              <p className="text-5xl font-['Playfair_Display'] mb-2">EGP 960K</p>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <TrendingUp className="size-4 text-black" />
                <span>+18% from last period</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="bg-white border border-gray-200 p-8"
            >
              <p className="text-xs uppercase tracking-wide text-gray-400 mb-4">Jobs Completed</p>
              <p className="text-5xl font-['Playfair_Display'] mb-2">30</p>
              <p className="text-xs text-gray-500">Last 6 months</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="bg-white border border-gray-200 p-8"
            >
              <p className="text-xs uppercase tracking-wide text-gray-400 mb-4">Average Rating</p>
              <p className="text-5xl font-['Playfair_Display'] mb-2">4.8</p>
              <p className="text-xs text-gray-500">Out of 5.0</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="bg-white border border-gray-200 p-8"
            >
              <p className="text-xs uppercase tracking-wide text-gray-400 mb-4">Acceptance Rate</p>
              <p className="text-5xl font-['Playfair_Display'] mb-2">92%</p>
              <p className="text-xs text-gray-500">Job offers accepted</p>
            </motion.div>
          </div>

          {/* Earnings Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="bg-white border border-gray-200 p-12 mb-[140px]"
          >
            <div className="mb-8">
              <h2 className="text-3xl font-['Playfair_Display'] mb-2">Earnings Over Time</h2>
              <p className="text-xs uppercase tracking-wide text-gray-400">Last 6 months</p>
            </div>
            <div style={{ width: '100%', height: 350, minHeight: 350 }}>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={earningsData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E5E5" />
                  <XAxis 
                    dataKey="month" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#9CA3AF', fontSize: 11, fontFamily: 'sans-serif' }} 
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#9CA3AF', fontSize: 11, fontFamily: 'sans-serif' }}
                    tickFormatter={(value) => `${value / 1000}K`}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#0B0D10', 
                      color: '#fff', 
                      border: 'none', 
                      fontSize: '12px',
                      padding: '12px 16px'
                    }}
                    formatter={(value) => [`EGP ${Number(value).toLocaleString()}`, 'Earnings']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="earnings" 
                    stroke="#0B0D10" 
                    strokeWidth={3}
                    dot={{ fill: '#0B0D10', r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Jobs Completed Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="bg-white border border-gray-200 p-12 mb-[140px]"
          >
            <div className="mb-8">
              <h2 className="text-3xl font-['Playfair_Display'] mb-2">Jobs Completed</h2>
              <p className="text-xs uppercase tracking-wide text-gray-400">Monthly performance</p>
            </div>
            <div style={{ width: '100%', height: 300, minHeight: 300 }}>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={jobsData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E5E5" />
                  <XAxis 
                    dataKey="month" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#9CA3AF', fontSize: 11, fontFamily: 'sans-serif' }} 
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#9CA3AF', fontSize: 11, fontFamily: 'sans-serif' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#0B0D10', 
                      color: '#fff', 
                      border: 'none', 
                      fontSize: '12px',
                      padding: '12px 16px'
                    }}
                    formatter={(value) => [`${value} jobs`, '']}
                  />
                  <Bar dataKey="jobs" fill="#0B0D10" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Rating Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="bg-white border border-gray-200 p-12"
          >
            <div className="mb-8">
              <h2 className="text-3xl font-['Playfair_Display'] mb-2">Ratings Summary</h2>
              <p className="text-xs uppercase tracking-wide text-gray-400">Brand feedback breakdown</p>
            </div>
            <div className="space-y-6">
              {ratingBreakdown.map((item, index) => (
                <div key={index} className="flex items-center gap-6">
                  <div className="w-40">
                    <p className="text-sm uppercase tracking-wide text-gray-600">{item.category}</p>
                  </div>
                  <div className="flex-1 h-2 bg-gray-200 relative">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(item.score / 5) * 100}%` }}
                      transition={{ delay: 0.8 + index * 0.1, duration: 0.8, ease: 'easeOut' }}
                      className="h-full bg-black"
                    />
                  </div>
                  <div className="w-16 text-right">
                    <p className="text-xl font-['Playfair_Display']">{item.score}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}