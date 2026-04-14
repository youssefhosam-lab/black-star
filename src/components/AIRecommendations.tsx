import React from 'react';
import { Layout } from './Layout';
import { useApp } from '../App';
import { Sparkles, TrendingUp, Users, Palette, Star, ShoppingBag } from 'lucide-react';

export function AIRecommendations() {
  const { navigate } = useApp();

  const recommendations = [
    {
      id: '1',
      name: 'Urban Minimalist Hoodie',
      brand: 'CleanCut',
      price: 1800,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1599012307530-d163bd04ecab?w=400',
      reason: 'Based on your recent purchases',
      confidence: 95,
    },
    {
      id: '2',
      name: 'Eco-Friendly Cotton Tee',
      brand: 'GreenThreads',
      price: 800,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1628068311627-0f5abce65050?w=400',
      reason: 'Matches your sustainable preferences',
      confidence: 88,
    },
    {
      id: '3',
      name: 'Vintage Denim Jacket',
      brand: 'RetroFit',
      price: 2600,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1599012307530-d163bd04ecab?w=400',
      reason: 'Trending in your area',
      confidence: 82,
    },
  ];

  const designSuggestions = [
    {
      id: '1',
      title: 'Minimalist Typography',
      description: 'Clean, modern text designs are trending this season',
      tags: ['Typography', 'Minimal', 'Modern'],
      popularity: 92,
    },
    {
      id: '2',
      title: 'Abstract Geometric Patterns',
      description: 'Bold shapes and colors are gaining popularity',
      tags: ['Geometric', 'Abstract', 'Bold'],
      popularity: 87,
    },
    {
      id: '3',
      title: 'Nature-Inspired Graphics',
      description: 'Eco-conscious designs resonate with your audience',
      tags: ['Nature', 'Eco', 'Organic'],
      popularity: 85,
    },
  ];

  const recommendedBrands = [
    {
      id: '1',
      name: 'Sustainable Style Co.',
      category: 'Eco-Fashion',
      rating: 4.9,
      match: 94,
      followers: 2340,
    },
    {
      id: '2',
      name: 'Urban Edge',
      category: 'Streetwear',
      rating: 4.7,
      match: 89,
      followers: 1890,
    },
    {
      id: '3',
      name: 'Minimalist Wardrobe',
      category: 'Basics',
      rating: 4.8,
      match: 86,
      followers: 1560,
    },
  ];

  const trendInsights = [
    {
      trend: 'Oversized Silhouettes',
      growth: '+35%',
      category: 'Style',
      impact: 'High',
    },
    {
      trend: 'Sustainable Materials',
      growth: '+42%',
      category: 'Fabric',
      impact: 'High',
    },
    {
      trend: 'Vintage Revival',
      growth: '+28%',
      category: 'Design',
      impact: 'Medium',
    },
    {
      trend: 'Bold Color Blocking',
      growth: '+31%',
      category: 'Color',
      impact: 'Medium',
    },
  ];

  return (
    <Layout>
      <div className="p-6 max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="size-8 text-purple-600" />
            <h1 className="text-gray-900">AI Recommendations</h1>
          </div>
          <p className="text-gray-600">Personalized suggestions powered by artificial intelligence</p>
        </div>

        {/* Personalized Products */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <ShoppingBag className="size-6 text-purple-600" />
            <h2 className="text-gray-900">Recommended For You</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {recommendations.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all cursor-pointer group"
                onClick={() => navigate('product-details')}
              >
                <div className="relative">
                  <div className="aspect-square bg-gray-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="absolute top-3 left-3 bg-purple-600 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
                    <Sparkles className="size-3" />
                    {product.confidence}% match
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-500 mb-1">{product.brand}</p>
                  <h3 className="text-gray-900 mb-2">{product.name}</h3>
                  <div className="flex items-center gap-1 mb-3">
                    <Star className="size-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm text-gray-700">{product.rating}</span>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-purple-600">EGP {product.price}</span>
                  </div>
                  <p className="text-sm text-gray-600 italic">{product.reason}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Design Suggestions */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Palette className="size-6 text-purple-600" />
            <h2 className="text-gray-900">Design Inspiration</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {designSuggestions.map((suggestion) => (
              <div
                key={suggestion.id}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-gray-900">{suggestion.title}</h3>
                    <div className="flex items-center gap-1 text-green-600 text-sm">
                      <TrendingUp className="size-4" />
                      {suggestion.popularity}%
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">{suggestion.description}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {suggestion.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-purple-50 text-purple-700 text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Brands */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Users className="size-6 text-purple-600" />
            <h2 className="text-gray-900">Brands You Might Like</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {recommendedBrands.map((brand) => (
              <div
                key={brand.id}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="size-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xl">
                    {brand.name[0]}
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 mb-1">
                      <Star className="size-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-gray-900">{brand.rating}</span>
                    </div>
                    <p className="text-sm text-purple-600">{brand.match}% match</p>
                  </div>
                </div>
                <h3 className="text-gray-900 mb-1">{brand.name}</h3>
                <p className="text-sm text-gray-500 mb-4">{brand.category}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{brand.followers.toLocaleString()} followers</span>
                  <button className="px-4 py-2 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition-colors">
                    Follow
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trend Insights */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="size-6 text-purple-600" />
            <h2 className="text-gray-900">Trending Now</h2>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-gray-900">Trend</th>
                  <th className="px-6 py-4 text-left text-gray-900">Category</th>
                  <th className="px-6 py-4 text-left text-gray-900">Growth</th>
                  <th className="px-6 py-4 text-left text-gray-900">Impact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {trendInsights.map((insight, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-900">{insight.trend}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-purple-50 text-purple-700 text-sm rounded-full">
                        {insight.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-green-600">
                        <TrendingUp className="size-4" />
                        {insight.growth}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        insight.impact === 'High' 
                          ? 'bg-red-50 text-red-700'
                          : 'bg-yellow-50 text-yellow-700'
                      }`}>
                        {insight.impact}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}