import React, { useState } from 'react';
import { Layout } from './Layout';
import { Package, CheckCircle, Clock, AlertCircle, TrendingUp, Eye } from 'lucide-react';

export function ProductionDashboard() {
  const [filter, setFilter] = useState('all');

  const stats = [
    { label: 'Active Orders', value: 24, icon: Package, color: 'text-blue-600 bg-blue-50' },
    { label: 'In Progress', value: 12, icon: Clock, color: 'text-yellow-600 bg-yellow-50' },
    { label: 'Completed Today', value: 8, icon: CheckCircle, color: 'text-green-600 bg-green-50' },
    { label: 'Quality Issues', value: 2, icon: AlertCircle, color: 'text-red-600 bg-red-50' },
  ];

  const orders = [
    {
      id: 'PRD-001',
      customer: 'UrbanStyle Collective',
      product: 'Custom Hoodie',
      quantity: 50,
      stage: 'Printing',
      priority: 'high',
      dueDate: 'Dec 15, 2025',
      progress: 60,
      assignedTo: 'Line A',
    },
    {
      id: 'PRD-002',
      customer: 'Street Vibes Co.',
      product: 'Graphic T-Shirts',
      quantity: 100,
      stage: 'Cutting',
      priority: 'medium',
      dueDate: 'Dec 16, 2025',
      progress: 30,
      assignedTo: 'Line B',
    },
    {
      id: 'PRD-003',
      customer: 'Eco Fashion Brand',
      product: 'Organic Cotton Tees',
      quantity: 75,
      stage: 'Quality Check',
      priority: 'low',
      dueDate: 'Dec 18, 2025',
      progress: 90,
      assignedTo: 'QC Team',
    },
    {
      id: 'PRD-004',
      customer: 'Minimal Wear',
      product: 'Premium Sweatshirts',
      quantity: 30,
      stage: 'Tailoring',
      priority: 'high',
      dueDate: 'Dec 14, 2025',
      progress: 75,
      assignedTo: 'Line C',
    },
  ];

  const stages = [
    { id: 'all', label: 'All Orders', count: orders.length },
    { id: 'cutting', label: 'Cutting', count: 1 },
    { id: 'printing', label: 'Printing', count: 1 },
    { id: 'tailoring', label: 'Tailoring', count: 1 },
    { id: 'quality-check', label: 'Quality Check', count: 1 },
  ];

  const priorityColors = {
    high: 'bg-red-100 text-red-700',
    medium: 'bg-yellow-100 text-yellow-700',
    low: 'bg-green-100 text-green-700',
  };

  return (
    <Layout>
      <div className="p-6 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-gray-900 mb-2">Production Dashboard</h1>
          <p className="text-gray-600">Manage and track your manufacturing orders</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className={`inline-flex p-3 rounded-lg ${stat.color} mb-4`}>
                  <Icon className="size-6" />
                </div>
                <div className="text-3xl text-gray-900 mb-1">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Stage Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {stages.map((stage) => (
            <button
              key={stage.id}
              onClick={() => setFilter(stage.id)}
              className={`px-4 py-2 rounded-lg transition-all ${
                filter === stage.id
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:border-purple-500'
              }`}
            >
              {stage.label} ({stage.count})
            </button>
          ))}
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-gray-900">Order ID</th>
                  <th className="px-6 py-4 text-left text-gray-900">Customer</th>
                  <th className="px-6 py-4 text-left text-gray-900">Product</th>
                  <th className="px-6 py-4 text-left text-gray-900">Quantity</th>
                  <th className="px-6 py-4 text-left text-gray-900">Stage</th>
                  <th className="px-6 py-4 text-left text-gray-900">Progress</th>
                  <th className="px-6 py-4 text-left text-gray-900">Priority</th>
                  <th className="px-6 py-4 text-left text-gray-900">Due Date</th>
                  <th className="px-6 py-4 text-left text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-900">{order.id}</td>
                    <td className="px-6 py-4 text-gray-700">{order.customer}</td>
                    <td className="px-6 py-4 text-gray-700">{order.product}</td>
                    <td className="px-6 py-4 text-gray-700">{order.quantity} units</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                        {order.stage}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[100px]">
                          <div
                            className="bg-purple-600 h-2 rounded-full"
                            style={{ width: `${order.progress}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600">{order.progress}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm capitalize ${priorityColors[order.priority as keyof typeof priorityColors]}`}>
                        {order.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-700">{order.dueDate}</td>
                    <td className="px-6 py-4">
                      <button className="text-purple-600 hover:text-purple-700">
                        <Eye className="size-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Production Lines */}
        <div className="mt-8">
          <h2 className="text-gray-900 mb-6">Production Lines Status</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {['Line A', 'Line B', 'Line C'].map((line, index) => (
              <div key={line} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-900">{line}</h3>
                  <span className="size-3 bg-green-500 rounded-full" title="Active" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Current Order</span>
                    <span className="text-gray-900">PRD-00{index + 1}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Efficiency</span>
                    <span className="text-green-600">{95 - index * 5}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Units Today</span>
                    <span className="text-gray-900">{120 - index * 20}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
