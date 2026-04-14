import React from 'react';
import { Layout } from './Layout';
import { useApp } from '../App';
import { TrendingUp, TrendingDown, DollarSign, ShoppingBag, Users, Star, Package, BarChart3 } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export function Analytics() {
  const { user } = useApp();

  const monthlyRevenue = [
    { month: 'Jul', revenue: 4500 },
    { month: 'Aug', revenue: 5200 },
    { month: 'Sep', revenue: 4800 },
    { month: 'Oct', revenue: 6100 },
    { month: 'Nov', revenue: 7300 },
    { month: 'Dec', revenue: 8900 },
  ];

  const salesByCategory = [
    { name: 'T-Shirts', value: 45, color: '#8B5CF6' },
    { name: 'Hoodies', value: 30, color: '#EC4899' },
    { name: 'Pants', value: 15, color: '#3B82F6' },
    { name: 'Accessories', value: 10, color: '#10B981' },
  ];

  const topProducts = [
    { name: 'Urban Hoodie', sales: 234, revenue: 20946, trend: 'up' },
    { name: 'Minimalist Tee', sales: 189, revenue: 6606, trend: 'up' },
    { name: 'Classic Denim', sales: 156, revenue: 20264, trend: 'down' },
    { name: 'Graphic Tee', sales: 134, revenue: 6159, trend: 'up' },
  ];

  const stats = [
    { label: 'Total Revenue', value: 'EGP 178,000', change: '+23%', icon: DollarSign, trend: 'up', color: 'text-green-600 bg-green-50' },
    { label: 'Total Orders', value: '234', change: '+18%', icon: ShoppingBag, trend: 'up', color: 'text-blue-600 bg-blue-50' },
    { label: 'Customers', value: '1,245', change: '+12%', icon: Users, trend: 'up', color: 'text-purple-600 bg-purple-50' },
    { label: 'Avg Rating', value: '4.8', change: '+0.2', icon: Star, trend: 'up', color: 'text-yellow-600 bg-yellow-50' },
  ];

  return (
    <Layout>
      <div className="p-6 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-gray-900 mb-2">Analytics Dashboard</h1>
          <p className="text-gray-600">
            {user?.role === 'brand' && 'Track your brand\'s performance and growth'}
            {user?.role === 'manufacturer' && 'Monitor production efficiency and output'}
            {user?.role === 'customer' && 'Your shopping insights and statistics'}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const TrendIcon = stat.trend === 'up' ? TrendingUp : TrendingDown;
            return (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${stat.color}`}>
                    <Icon className="size-6" />
                  </div>
                  <div className={`flex items-center gap-1 text-sm ${
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    <TrendIcon className="size-4" />
                    {stat.change}
                  </div>
                </div>
                <div className="text-3xl text-gray-900 mb-1">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Revenue Chart */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-gray-900 mb-6">Monthly Revenue</h2>
            <div style={{ width: '100%', height: '300px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyRevenue}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="month" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#8B5CF6"
                    strokeWidth={3}
                    dot={{ fill: '#8B5CF6', r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Sales by Category */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-gray-900 mb-6">Sales by Category</h2>
            <div style={{ width: '100%', height: '300px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={salesByCategory}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {salesByCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
          <h2 className="text-gray-900 mb-6">Top Performing Products</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-gray-900">Product</th>
                  <th className="px-6 py-3 text-left text-gray-900">Sales</th>
                  <th className="px-6 py-3 text-left text-gray-900">Revenue</th>
                  <th className="px-6 py-3 text-left text-gray-900">Trend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {topProducts.map((product, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="size-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">
                          {index + 1}
                        </div>
                        <span className="text-gray-900">{product.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-700">{product.sales} units</td>
                    <td className="px-6 py-4 text-gray-900">EGP {product.revenue.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <div className={`inline-flex items-center gap-1 ${
                        product.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {product.trend === 'up' ? (
                          <TrendingUp className="size-4" />
                        ) : (
                          <TrendingDown className="size-4" />
                        )}
                        {product.trend === 'up' ? 'Rising' : 'Falling'}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Insights */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
            <Package className="size-12 mb-4 opacity-80" />
            <div className="text-3xl mb-2">156</div>
            <div className="text-purple-100">Products Sold This Week</div>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
            <Users className="size-12 mb-4 opacity-80" />
            <div className="text-3xl mb-2">89</div>
            <div className="text-blue-100">New Customers This Month</div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
            <Star className="size-12 mb-4 opacity-80" />
            <div className="text-3xl mb-2">4.8</div>
            <div className="text-green-100">Average Customer Rating</div>
          </div>
        </div>
      </div>
    </Layout>
  );
}