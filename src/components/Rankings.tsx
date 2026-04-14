import React, { useState } from 'react';
import { Layout } from './Layout';
import { Trophy, Star, TrendingUp, Medal, Award } from 'lucide-react';

export function Rankings() {
  const [category, setCategory] = useState('brands');

  const categories = [
    { id: 'brands', label: 'Top Brands' },
    { id: 'manufacturers', label: 'Top Manufacturers' },
    { id: 'models', label: 'Top Models' },
  ];

  const brandRankings = [
    { rank: 1, name: 'UrbanStyle Collective', rating: 4.9, sales: 2340, revenue: 234000, trend: '+12%' },
    { rank: 2, name: 'Eco Fashion Forward', rating: 4.8, sales: 1890, revenue: 189000, trend: '+18%' },
    { rank: 3, name: 'Street Vibes Co.', rating: 4.7, sales: 1560, revenue: 156000, trend: '+8%' },
    { rank: 4, name: 'Minimal Wear', rating: 4.7, sales: 1340, revenue: 134000, trend: '+15%' },
    { rank: 5, name: 'Vintage Revival', rating: 4.6, sales: 1120, revenue: 112000, trend: '+5%' },
    { rank: 6, name: 'Athletic Edge', rating: 4.6, sales: 980, revenue: 98000, trend: '+10%' },
    { rank: 7, name: 'Custom Threads', rating: 4.5, sales: 850, revenue: 85000, trend: '+7%' },
    { rank: 8, name: 'Bold & Bright', rating: 4.5, sales: 720, revenue: 72000, trend: '+12%' },
  ];

  const manufacturerRankings = [
    { rank: 1, name: 'Premium Textile Co.', rating: 4.9, orders: 1250, efficiency: 98, trend: '+15%' },
    { rank: 2, name: 'Urban Stitch Factory', rating: 4.7, orders: 850, efficiency: 96, trend: '+12%' },
    { rank: 3, name: 'Eco Fashion Makers', rating: 4.8, orders: 620, efficiency: 94, trend: '+18%' },
    { rank: 4, name: 'Quick Print Studios', rating: 4.5, orders: 2100, efficiency: 92, trend: '+8%' },
    { rank: 5, name: 'Artisan Garments', rating: 4.6, orders: 540, efficiency: 95, trend: '+10%' },
  ];

  const modelRankings = [
    { rank: 1, name: 'Alexandria Moore', rating: 4.9, bookings: 145, portfolio: 89, trend: '+20%' },
    { rank: 2, name: 'Jordan Blake', rating: 4.8, bookings: 132, portfolio: 76, trend: '+15%' },
    { rank: 3, name: 'Sam Chen', rating: 4.7, bookings: 118, portfolio: 82, trend: '+18%' },
    { rank: 4, name: 'Taylor Swift', rating: 4.7, bookings: 105, portfolio: 71, trend: '+12%' },
    { rank: 5, name: 'Morgan Lee', rating: 4.6, bookings: 98, portfolio: 65, trend: '+10%' },
  ];

  const getRankingData = () => {
    switch (category) {
      case 'brands':
        return brandRankings;
      case 'manufacturers':
        return manufacturerRankings;
      case 'models':
        return modelRankings;
      default:
        return brandRankings;
    }
  };

  const getMedalColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'from-yellow-400 to-yellow-500';
      case 2:
        return 'from-gray-300 to-gray-400';
      case 3:
        return 'from-orange-400 to-orange-500';
      default:
        return 'from-purple-400 to-purple-500';
    }
  };

  const rankings = getRankingData();

  return (
    <Layout>
      <div className="p-6 max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-gray-900 mb-2">Rankings & Leaderboards</h1>
          <p className="text-gray-600">Discover top performers in the Black Star community</p>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`px-6 py-3 rounded-lg transition-all ${
                category === cat.id
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:border-purple-500'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Top 3 Podium */}
        <div className="grid grid-cols-3 gap-6 mb-8 items-end">
          {/* Second Place */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 order-1">
            <div className={`size-16 rounded-full bg-gradient-to-br ${getMedalColor(2)} flex items-center justify-center text-white text-2xl mx-auto mb-4`}>
              2
            </div>
            <h3 className="text-gray-900 text-center mb-2">{rankings[1]?.name}</h3>
            <div className="flex items-center justify-center gap-1 mb-4">
              <Star className="size-5 text-yellow-400 fill-yellow-400" />
              <span className="text-gray-700">{rankings[1]?.rating}</span>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600 mb-1">
                {category === 'brands' && 'Sales'}
                {category === 'manufacturers' && 'Orders'}
                {category === 'models' && 'Bookings'}
              </div>
              <div className="text-xl text-gray-900">
                {category === 'brands' && rankings[1]?.sales}
                {category === 'manufacturers' && rankings[1]?.orders}
                {category === 'models' && rankings[1]?.bookings}
              </div>
            </div>
          </div>

          {/* First Place */}
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 shadow-xl border-4 border-yellow-400 order-2 transform scale-105">
            <div className="flex items-center justify-center mb-4">
              <Trophy className="size-20 text-yellow-300" />
            </div>
            <h3 className="text-white text-center mb-2">{rankings[0]?.name}</h3>
            <div className="flex items-center justify-center gap-1 mb-4">
              <Star className="size-5 text-yellow-300 fill-yellow-300" />
              <span className="text-white">{rankings[0]?.rating}</span>
            </div>
            <div className="text-center">
              <div className="text-sm text-purple-100 mb-1">
                {category === 'brands' && 'Sales'}
                {category === 'manufacturers' && 'Orders'}
                {category === 'models' && 'Bookings'}
              </div>
              <div className="text-2xl text-white">
                {category === 'brands' && rankings[0]?.sales}
                {category === 'manufacturers' && rankings[0]?.orders}
                {category === 'models' && rankings[0]?.bookings}
              </div>
            </div>
          </div>

          {/* Third Place */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 order-3">
            <div className={`size-16 rounded-full bg-gradient-to-br ${getMedalColor(3)} flex items-center justify-center text-white text-2xl mx-auto mb-4`}>
              3
            </div>
            <h3 className="text-gray-900 text-center mb-2">{rankings[2]?.name}</h3>
            <div className="flex items-center justify-center gap-1 mb-4">
              <Star className="size-5 text-yellow-400 fill-yellow-400" />
              <span className="text-gray-700">{rankings[2]?.rating}</span>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600 mb-1">
                {category === 'brands' && 'Sales'}
                {category === 'manufacturers' && 'Orders'}
                {category === 'models' && 'Bookings'}
              </div>
              <div className="text-xl text-gray-900">
                {category === 'brands' && rankings[2]?.sales}
                {category === 'manufacturers' && rankings[2]?.orders}
                {category === 'models' && rankings[2]?.bookings}
              </div>
            </div>
          </div>
        </div>

        {/* Full Rankings Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-gray-900">Rank</th>
                <th className="px-6 py-4 text-left text-gray-900">Name</th>
                <th className="px-6 py-4 text-left text-gray-900">Rating</th>
                {category === 'brands' && (
                  <>
                    <th className="px-6 py-4 text-left text-gray-900">Sales</th>
                    <th className="px-6 py-4 text-left text-gray-900">Revenue</th>
                  </>
                )}
                {category === 'manufacturers' && (
                  <>
                    <th className="px-6 py-4 text-left text-gray-900">Orders</th>
                    <th className="px-6 py-4 text-left text-gray-900">Efficiency</th>
                  </>
                )}
                {category === 'models' && (
                  <>
                    <th className="px-6 py-4 text-left text-gray-900">Bookings</th>
                    <th className="px-6 py-4 text-left text-gray-900">Portfolio</th>
                  </>
                )}
                <th className="px-6 py-4 text-left text-gray-900">Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {rankings.map((item) => (
                <tr key={item.rank} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    {item.rank <= 3 ? (
                      <div className={`size-10 rounded-full bg-gradient-to-br ${getMedalColor(item.rank)} flex items-center justify-center text-white`}>
                        {item.rank}
                      </div>
                    ) : (
                      <div className="size-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-700">
                        {item.rank}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-900">{item.name}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <Star className="size-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-gray-700">{item.rating}</span>
                    </div>
                  </td>
                  {category === 'brands' && (
                    <>
                      <td className="px-6 py-4 text-gray-700">{item.sales}</td>
                      <td className="px-6 py-4 text-gray-900">${(item.revenue / 1000).toFixed(0)}k</td>
                    </>
                  )}
                  {category === 'manufacturers' && (
                    <>
                      <td className="px-6 py-4 text-gray-700">{item.orders}</td>
                      <td className="px-6 py-4 text-gray-700">{item.efficiency}%</td>
                    </>
                  )}
                  {category === 'models' && (
                    <>
                      <td className="px-6 py-4 text-gray-700">{item.bookings}</td>
                      <td className="px-6 py-4 text-gray-700">{item.portfolio}</td>
                    </>
                  )}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-green-600">
                      <TrendingUp className="size-4" />
                      {item.trend}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
