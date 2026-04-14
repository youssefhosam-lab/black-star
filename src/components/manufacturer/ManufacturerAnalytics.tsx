import React, { useState } from 'react';
import { useApp } from '../../App';
import { motion } from 'motion/react';
import { 
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  Package,
  DollarSign,
  Clock,
  Percent
} from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const ordersCompletedData = [
  { id: '1', month: 'Jul', orders: 42 },
  { id: '2', month: 'Aug', orders: 58 },
  { id: '3', month: 'Sep', orders: 51 },
  { id: '4', month: 'Oct', orders: 67 },
  { id: '5', month: 'Nov', orders: 73 },
  { id: '6', month: 'Dec', orders: 64 },
];

const revenueByBranch = [
  { branch: 'Garment', revenue: 145000, orders: 45 },
  { branch: 'Print-On', revenue: 89000, orders: 32 },
  { branch: 'Tailor', revenue: 67000, orders: 18 },
];

const delayReasons = [
  { reason: 'Material shortage', count: 12, percentage: 38 },
  { reason: 'Machine breakdown', count: 7, percentage: 22 },
  { reason: 'Worker absence', count: 5, percentage: 16 },
  { reason: 'Design changes', count: 4, percentage: 13 },
  { reason: 'Quality issues', count: 3, percentage: 9 },
  { reason: 'Other', count: 1, percentage: 2 },
];

const machineEfficiency = [
  { machine: 'GF-01', efficiency: 94, uptime: 98 },
  { machine: 'GF-02', efficiency: 89, uptime: 96 },
  { machine: 'GF-03', efficiency: 92, uptime: 100 },
  { machine: 'PF-01', efficiency: 87, uptime: 94 },
  { machine: 'PF-02', efficiency: 78, uptime: 89 },
  { machine: 'TL-01', efficiency: 96, uptime: 100 },
];

const MetricCard = ({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  trend 
}: { 
  title: string; 
  value: string; 
  change: string; 
  icon: any; 
  trend: 'up' | 'down' | 'neutral';
}) => {
  const trendColors = {
    up: 'text-[#2F4F2F]',
    down: 'text-[#8B0000]',
    neutral: 'text-[#6E6E6E]'
  };

  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : null;

  return (
    <div className="bg-[#FFFFFF] border border-[#E6E6E3] p-6">
      <div className="flex items-start justify-between mb-4">
        <p className="text-xs uppercase tracking-wider text-[#6E6E6E]">{title}</p>
        <Icon className="w-4 h-4 text-[#6E6E6E]" />
      </div>
      <p className="text-3xl tracking-tight text-[#0B0B0B] mb-2">{value}</p>
      <div className="flex items-center gap-2">
        {TrendIcon && <TrendIcon className={`w-3 h-3 ${trendColors[trend]}`} />}
        <span className={`text-xs ${trendColors[trend]}`}>{change}</span>
      </div>
    </div>
  );
};

export function ManufacturerAnalytics() {
  const { navigate } = useApp();
  const [timeRange, setTimeRange] = useState<'month' | 'quarter' | 'year'>('month');

  return (
    <div className="min-h-screen bg-[#F7F7F5] p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl tracking-tight text-[#0F0F12] font-['Inter_Tight']">Analytics</h1>

        {/* Time Range Selector */}
        <div className="flex gap-2">
          {(['month', 'quarter', 'year'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`
                px-4 py-2 text-xs uppercase tracking-wider font-['Inter_Tight'] transition-all duration-200 rounded-md
                ${timeRange === range
                  ? 'bg-[#0F0F12] text-white'
                  : 'border border-[#E6E6E3] text-[#0F0F12]/60 hover:border-[#0F0F12]'
                }
              `}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <MetricCard
            title="Orders Completed"
            value="64"
            change="+12% vs last month"
            icon={Package}
            trend="up"
          />
          <MetricCard
            title="Total Revenue"
            value="$301K"
            change="+8% vs last month"
            icon={DollarSign}
            trend="up"
          />
          <MetricCard
            title="Avg Delivery Time"
            value="8.2 days"
            change="-1.3 days improvement"
            icon={Clock}
            trend="up"
          />
          <MetricCard
            title="Material Waste"
            value="4.2%"
            change="+1.1% vs last month"
            icon={Percent}
            trend="down"
          />
        </div>

        {/* Orders Completed Trend */}
        <div className="bg-[#FFFFFF] border border-[#E6E6E3] p-6 mb-8">
          <h3 className="text-xs uppercase tracking-wider text-[#6E6E6E] mb-6">
            Orders Completed (Last 6 Months)
          </h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={ordersCompletedData}>
              <CartesianGrid strokeDasharray="0" stroke="#E6E6E3" vertical={false} />
              <XAxis
                dataKey="month"
                axisLine={{ stroke: '#E6E6E3' }}
                tickLine={false}
                tick={{ fill: '#6E6E6E', fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#6E6E6E', fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E6E6E3',
                  borderRadius: 0,
                  fontSize: 12,
                }}
                cursor={{ fill: '#F7F7F5' }}
              />
              <Bar dataKey="orders" fill="#111111" radius={0} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          {/* Revenue by Branch */}
          <div className="bg-[#FFFFFF] border border-[#E6E6E3] p-6">
            <h3 className="text-xs uppercase tracking-wider text-[#6E6E6E] mb-6">
              Revenue by Branch
            </h3>
            <div className="space-y-4">
              {revenueByBranch.map((branch) => {
                const totalRevenue = revenueByBranch.reduce((sum, b) => sum + b.revenue, 0);
                const percentage = (branch.revenue / totalRevenue) * 100;

                return (
                  <div key={branch.branch}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-[#0B0B0B]">{branch.branch}</span>
                      <span className="text-sm text-[#0B0B0B]">
                        ${(branch.revenue / 1000).toFixed(0)}K
                      </span>
                    </div>
                    <div className="h-2 bg-[#E6E6E3] mb-1">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                        className="h-full bg-[#111111]"
                      />
                    </div>
                    <p className="text-xs text-[#6E6E6E]">{branch.orders} orders · {percentage.toFixed(1)}%</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Delay Reasons */}
          <div className="bg-[#FFFFFF] border border-[#E6E6E3] p-6">
            <h3 className="text-xs uppercase tracking-wider text-[#6E6E6E] mb-6">
              Delay Reasons (32 total delays)
            </h3>
            <div className="space-y-3">
              {delayReasons.map((reason, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-2 border-b border-[#E6E6E3] last:border-0"
                >
                  <div className="flex-1">
                    <p className="text-sm text-[#0B0B0B] mb-1">{reason.reason}</p>
                    <div className="h-1 bg-[#E6E6E3] max-w-xs">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${reason.percentage}%` }}
                        transition={{ duration: 0.6, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                        className="h-full bg-[#8B0000]"
                      />
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <p className="text-sm text-[#0B0B0B]">{reason.count}</p>
                    <p className="text-xs text-[#6E6E6E]">{reason.percentage}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Machine Efficiency */}
        <div className="bg-[#FFFFFF] border border-[#E6E6E3] p-6 mb-8">
          <h3 className="text-xs uppercase tracking-wider text-[#6E6E6E] mb-6">
            Machine Efficiency
          </h3>
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#E6E6E3]">
                <th className="text-left pb-3 text-xs uppercase tracking-wider text-[#6E6E6E]">
                  Machine
                </th>
                <th className="text-right pb-3 text-xs uppercase tracking-wider text-[#6E6E6E]">
                  Efficiency
                </th>
                <th className="text-right pb-3 text-xs uppercase tracking-wider text-[#6E6E6E]">
                  Uptime
                </th>
                <th className="pb-3"></th>
              </tr>
            </thead>
            <tbody>
              {machineEfficiency.map((machine, index) => {
                const isLowEfficiency = machine.efficiency < 85;

                return (
                  <tr key={machine.machine} className="border-b border-[#E6E6E3] last:border-0">
                    <td className="py-4 text-sm text-[#0B0B0B]">{machine.machine}</td>
                    <td className="py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <span className={`text-sm ${isLowEfficiency ? 'text-[#B8860B]' : 'text-[#0B0B0B]'}`}>
                          {machine.efficiency}%
                        </span>
                        {isLowEfficiency && <AlertCircle className="w-4 h-4 text-[#B8860B]" />}
                      </div>
                    </td>
                    <td className="py-4 text-right text-sm text-[#6E6E6E]">
                      {machine.uptime}%
                    </td>
                    <td className="py-4 w-1/3">
                      <div className="h-2 bg-[#E6E6E3]">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${machine.efficiency}%` }}
                          transition={{ duration: 0.8, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                          className={`h-full ${isLowEfficiency ? 'bg-[#B8860B]' : 'bg-[#111111]'}`}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Connected Insight */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-[#B8860B]/10 border border-[#B8860B] p-6"
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-[#B8860B] flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm text-[#0B0B0B] mb-2">Connected Insight</h4>
              <p className="text-sm text-[#0B0B0B] leading-relaxed mb-3">
                38% of delays are caused by material shortages. Low inventory accuracy is contributing to 12% of production delays.
              </p>
              <p className="text-xs text-[#6E6E6E]">
                Recommendation: Implement automated inventory tracking and increase minimum thresholds for high-demand materials.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}