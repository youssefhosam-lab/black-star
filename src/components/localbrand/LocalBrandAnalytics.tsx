import React, { useState } from 'react';
import { useApp } from '../../App';
import { motion } from 'motion/react';
import { Download, TrendingUp, TrendingDown } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Data for charts
const revenueData = [
  { month: 'Jan', revenue: 85000 },
  { month: 'Feb', revenue: 92000 },
  { month: 'Mar', revenue: 78000 },
  { month: 'Apr', revenue: 98000 },
  { month: 'May', revenue: 110000 },
  { month: 'Jun', revenue: 124500 },
];

const efficiencyData = [
  { month: 'Jan', efficiency: 88 },
  { month: 'Feb', efficiency: 91 },
  { month: 'Mar', efficiency: 86 },
  { month: 'Apr', efficiency: 93 },
  { month: 'May', efficiency: 92 },
  { month: 'Jun', efficiency: 94 },
];

const manufacturerData = [
  { id: 'mfr-1', name: 'Urban Thread Co.', rating: 96 },
  { id: 'mfr-2', name: 'Heritage Mills', rating: 94 },
  { id: 'mfr-3', name: 'Metro Garments', rating: 88 },
  { id: 'mfr-4', name: 'Coastal Factory', rating: 85 },
];

const modelData = [
  { id: 'model-1', name: 'Alex Chen', rating: 98 },
  { id: 'model-2', name: 'Jordan Lee', rating: 95 },
  { id: 'model-3', name: 'Sam Taylor', rating: 92 },
  { id: 'model-4', name: 'Riley Park', rating: 90 },
];

// Metric Card Component
const MetricCard = ({ 
  title, 
  value, 
  change, 
  trend,
  delay = 0 
}: { 
  title: string; 
  value: string | number; 
  change?: string;
  trend?: 'up' | 'down';
  delay?: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white border border-[#0F0F12]/10 p-6"
    >
      <p className="text-sm uppercase tracking-wider text-[#0F0F12]/60 mb-3">{title}</p>
      <div className="flex items-end justify-between">
        <p className="text-4xl font-['IBM_Plex_Mono'] text-[#0F0F12]">{value}</p>
        {change && trend && (
          <div className={`flex items-center gap-1 ${
            trend === 'up' ? 'text-[#0E1A2B]' : 'text-[#5B7C99]'
          }`}>
            {trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            <span className="text-sm font-['IBM_Plex_Mono']">{change}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export function LocalBrandAnalytics() {
  const { navigate } = useApp();

  return (
    <div className="min-h-screen bg-[#F7F7F5]">
      {/* Header */}
      <header className="bg-[#F7F7F5] border-b border-[#0F0F12]/10 sticky top-0 z-40">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-['Inter_Tight'] tracking-tight text-[#0F0F12]">Analytics</h1>
            <button className="flex items-center gap-2 px-4 py-2 border border-[#0F0F12] text-[#0F0F12] hover:bg-[#0F0F12] hover:text-white transition-all duration-300 text-sm uppercase tracking-wider">
              <Download className="w-4 h-4" />
              Download Report
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-6 py-12 space-y-12 bg-[#FAFAFA]">
        {/* Key Metrics */}
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl font-['Inter_Tight'] text-[#0F0F12] mb-6"
          >
            Key Metrics
          </motion.h2>
          <div className="grid md:grid-cols-4 gap-6">
            <MetricCard title="Total Revenue" value="$124.5K" change="+18%" trend="up" delay={0} />
            <MetricCard title="Orders Completed" value="247" change="+12%" trend="up" delay={0.1} />
            <MetricCard title="Avg. Completion Rate" value="94%" change="+3%" trend="up" delay={0.2} />
            <MetricCard title="Active Orders" value="18" delay={0.3} />
          </div>
        </div>

        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white border border-[#0F0F12]/10 p-6"
        >
          <h3 className="text-sm uppercase tracking-wider text-[#0F0F12] mb-6">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#0F0F1210" />
              <XAxis 
                dataKey="month" 
                stroke="#0F0F1260" 
                style={{ fontFamily: 'IBM Plex Mono', fontSize: 12 }}
              />
              <YAxis 
                stroke="#0F0F1260" 
                style={{ fontFamily: 'IBM Plex Mono', fontSize: 12 }}
                tickFormatter={(value) => `$${value / 1000}K`}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#FFFFFF', 
                  border: '1px solid #0F0F1220',
                  fontFamily: 'IBM Plex Mono',
                  fontSize: 12
                }}
                formatter={(value: any) => [`$${value}`, 'Revenue']}
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#5B7C99" 
                strokeWidth={2}
                dot={{ fill: '#5B7C99', r: 4 }}
                animationDuration={1500}
                animationEasing="ease-out"
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Production Efficiency */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white border border-[#0F0F12]/10 p-6"
        >
          <h3 className="text-sm uppercase tracking-wider text-[#0F0F12] mb-6">Production Efficiency</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={efficiencyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#0F0F1210" />
              <XAxis 
                dataKey="month" 
                stroke="#0F0F1260" 
                style={{ fontFamily: 'IBM Plex Mono', fontSize: 12 }}
              />
              <YAxis 
                stroke="#0F0F1260" 
                style={{ fontFamily: 'IBM Plex Mono', fontSize: 12 }}
                domain={[0, 100]}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#FFFFFF', 
                  border: '1px solid #0F0F1220',
                  fontFamily: 'IBM Plex Mono',
                  fontSize: 12
                }}
                formatter={(value: any) => [`${value}%`, 'Efficiency']}
              />
              <Line 
                type="monotone" 
                dataKey="efficiency" 
                stroke="#0E1A2B" 
                strokeWidth={2}
                dot={{ fill: '#0E1A2B', r: 4 }}
                animationDuration={1500}
                animationEasing="ease-out"
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Manufacturer & Model Performance */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Manufacturer Reliability */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white border border-[#0F0F12]/10 p-6"
          >
            <h3 className="text-sm uppercase tracking-wider text-[#0F0F12] mb-6">Manufacturer Reliability</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={manufacturerData} layout="vertical" id="manufacturer-chart">
                <CartesianGrid strokeDasharray="3 3" stroke="#0F0F1210" />
                <XAxis 
                  type="number" 
                  domain={[0, 100]}
                  stroke="#0F0F1260"
                  style={{ fontFamily: 'IBM Plex Mono', fontSize: 12 }}
                />
                <YAxis 
                  type="category" 
                  dataKey="name"
                  stroke="#0F0F1260"
                  style={{ fontFamily: 'Inter', fontSize: 12 }}
                  width={100}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#FFFFFF', 
                    border: '1px solid #0F0F1220',
                    fontFamily: 'IBM Plex Mono',
                    fontSize: 12
                  }}
                  formatter={(value: any) => [`${value}/100`, 'Rating']}
                />
                <Bar 
                  dataKey="rating" 
                  fill="#5B7C99"
                  animationDuration={1500}
                  animationEasing="ease-out"
                />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Model Performance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white border border-[#0F0F12]/10 p-6"
          >
            <h3 className="text-sm uppercase tracking-wider text-[#0F0F12] mb-6">Model Performance</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={modelData} layout="vertical" id="model-chart">
                <CartesianGrid strokeDasharray="3 3" stroke="#0F0F1210" />
                <XAxis 
                  type="number" 
                  domain={[0, 100]}
                  stroke="#0F0F1260"
                  style={{ fontFamily: 'IBM Plex Mono', fontSize: 12 }}
                />
                <YAxis 
                  type="category" 
                  dataKey="name"
                  stroke="#0F0F1260"
                  style={{ fontFamily: 'Inter', fontSize: 12 }}
                  width={80}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#FFFFFF', 
                    border: '1px solid #0F0F1220',
                    fontFamily: 'IBM Plex Mono',
                    fontSize: 12
                  }}
                  formatter={(value: any) => [`${value}/100`, 'Rating']}
                />
                <Bar 
                  dataKey="rating" 
                  fill="#0E1A2B"
                  animationDuration={1500}
                  animationEasing="ease-out"
                />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </div>
    </div>
  );
}