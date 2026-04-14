import React from 'react';
import { useApp } from '../App';
import { Layout } from './Layout';
import { TrendingUp, Palette, ShoppingBag, Users, Heart, MessageCircle, Share2, Sparkles, Factory, ArrowRight } from 'lucide-react';

export function HomePage() {
  const { user, navigate } = useApp();

  const trendingProducts = [
    {
      id: '1',
      name: 'Urban Streetwear Hoodie',
      brand: 'StreetVibe',
      price: 1800,
      image: 'https://images.unsplash.com/photo-1599012307530-d163bd04ecab?w=400',
      likes: 234,
    },
    {
      id: '2',
      name: 'Minimalist Cotton Tee',
      brand: 'CleanCut',
      price: 700,
      image: 'https://images.unsplash.com/photo-1628068311627-0f5abce65050?w=400',
      likes: 189,
    },
    {
      id: '3',
      name: 'Classic Denim Jacket',
      brand: 'Vintage Co',
      price: 2600,
      image: 'https://images.unsplash.com/photo-1599012307530-d163bd04ecab?w=400',
      likes: 312,
    },
  ];

  const communityPosts = [
    {
      id: '1',
      author: 'FashionForward',
      role: 'Brand',
      content: 'Just launched our new sustainable collection! 100% organic cotton with eco-friendly dyes. What do you think?',
      image: 'https://images.unsplash.com/photo-1615652142324-274f2bfbc88d?w=600',
      likes: 156,
      comments: 23,
      time: '2h ago',
    },
    {
      id: '2',
      author: 'UrbanManufacturing',
      role: 'Manufacturer',
      content: 'Proud to announce our new digital printing technology - 40% faster production with zero waste!',
      image: 'https://images.unsplash.com/photo-1606053929013-311c13f97b5f?w=600',
      likes: 89,
      comments: 12,
      time: '5h ago',
    },
  ];

  return (
    <Layout mainClassName="bg-gradient-to-b from-[#ffffff] to-[#4a5565] via-50% via-[#e5e7eb]">
      <div className="px-4 sm:px-6 lg:px-8 py-8 lg:py-12 max-w-7xl mx-auto">
        {/* Welcome Banner */}
        <div className="bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl p-6 sm:p-8 lg:p-10 mb-12 relative overflow-hidden group shadow-sm">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#E6C36A] opacity-10 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <div className="relative z-10">
            <h1 className="text-3xl sm:text-4xl font-['Playfair_Display'] font-bold text-[#0B0D10] mb-3">
              Welcome back, <span className="text-[#E6C36A]">{user?.name}</span>
            </h1>
            <p className="text-gray-700 mb-6 max-w-2xl leading-relaxed">
              {user?.role === 'customer' && 'Ready to design your next custom piece? The studio awaits your creativity.'}
              {user?.role === 'brand' && 'Your brand dashboard is active. Check your latest analytics and sales.'}
              {user?.role === 'manufacturer' && 'Production lines are running. You have 5 new orders waiting for approval.'}
              {user?.role === 'model' && 'Your portfolio is getting noticed. You have 2 new collaboration requests.'}
              {!user?.role && 'Explore the world of Black Star fashion.'}
            </p>
            
            <div className="flex flex-wrap gap-3">
              {user?.role === 'customer' && (
                <>
                  <button
                    onClick={() => navigate('design-studio')}
                    className="bg-[#0B0D10] text-[#F5F6F8] px-6 py-3 rounded-lg hover:bg-[#E6C36A] hover:text-[#0B0D10] transition-all font-medium flex items-center gap-2 shadow-sm"
                  >
                    <Palette className="size-5" />
                    Start Designing
                  </button>
                  <button
                    onClick={() => navigate('marketplace')}
                    className="bg-transparent border border-[#0B0D10] text-[#0B0D10] px-6 py-3 rounded-lg hover:bg-[#0B0D10] hover:text-[#F5F6F8] transition-all font-medium flex items-center gap-2"
                  >
                    <ShoppingBag className="size-5" />
                    Browse Marketplace
                  </button>
                </>
              )}
              
              {user?.role === 'brand' && (
                <>
                  <button
                    onClick={() => navigate('design-studio')}
                    className="bg-[#0B0D10] text-[#F5F6F8] px-6 py-3 rounded-lg hover:bg-[#E6C36A] hover:text-[#0B0D10] transition-all font-medium flex items-center gap-2 shadow-sm"
                  >
                    <Palette className="size-5" />
                    Create Collection
                  </button>
                  <button
                    onClick={() => navigate('analytics')}
                    className="bg-transparent border border-[#0B0D10] text-[#0B0D10] px-6 py-3 rounded-lg hover:bg-[#0B0D10] hover:text-[#F5F6F8] transition-all font-medium flex items-center gap-2"
                  >
                    <TrendingUp className="size-5" />
                    View Analytics
                  </button>
                </>
              )}

              {user?.role === 'manufacturer' && (
                <button
                  onClick={() => navigate('production-dashboard')}
                  className="bg-[#0B0D10] text-[#F5F6F8] px-6 py-3 rounded-lg hover:bg-[#E6C36A] hover:text-[#0B0D10] transition-all font-medium flex items-center gap-2 shadow-sm"
                >
                  <Factory className="size-5" />
                  View Production Dashboard
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-16">
          <div className="bg-white border border-gray-200 rounded-xl p-5 lg:p-6 hover:border-[#E6C36A] transition-colors group shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-500">Orders</span>
              <ShoppingBag className="size-5 text-[#E6C36A] group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-3xl lg:text-4xl text-[#0B0D10] font-['Playfair_Display'] font-bold mb-2">12</div>
            <p className="text-[#2ECC71] text-sm flex items-center gap-1">
              <TrendingUp className="size-3" />
              +3 this week
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5 lg:p-6 hover:border-[#E6C36A] transition-colors group shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-500">Designs</span>
              <Palette className="size-5 text-[#E6C36A] group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-3xl lg:text-4xl text-[#0B0D10] font-['Playfair_Display'] font-bold mb-2">8</div>
            <p className="text-[#E6C36A] text-sm">2 in progress</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5 lg:p-6 hover:border-[#E6C36A] transition-colors group shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-500">Following</span>
              <Users className="size-5 text-[#E6C36A] group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-3xl lg:text-4xl text-[#0B0D10] font-['Playfair_Display'] font-bold mb-2">24</div>
            <p className="text-gray-500 text-sm">Brands & Makers</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5 lg:p-6 hover:border-[#E6C36A] transition-colors group shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-500">Saved</span>
              <Heart className="size-5 text-[#E6C36A] group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-3xl lg:text-4xl text-[#0B0D10] font-['Playfair_Display'] font-bold mb-2">31</div>
            <p className="text-gray-500 text-sm">Products</p>
          </div>
        </div>

        {/* Trending Products */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-['Playfair_Display'] font-bold text-[#0B0D10] mb-1">Trending Now</h2>
              <p className="text-gray-600 text-sm">Discover the most popular designs</p>
            </div>
            <button
              onClick={() => navigate('marketplace')}
              className="text-[#0B0D10] hover:text-[#E6C36A] transition-colors flex items-center gap-2 font-medium"
            >
              View All <ArrowRight className="size-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {trendingProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-[#E6C36A] transition-all cursor-pointer group shadow-sm"
                onClick={() => navigate('product-details')}
              >
                <div className="aspect-square bg-gray-100 relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                </div>
                <div className="p-5">
                  <p className="text-xs text-gray-500 mb-1.5">{product.brand}</p>
                  <h3 className="text-[#0B0D10] font-medium mb-3 leading-snug">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-[#E6C36A] font-bold">EGP {product.price}</span>
                    <div className="flex items-center gap-1.5 text-gray-500">
                      <Heart className="size-4" />
                      <span className="text-sm">{product.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Community Feed */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-['Playfair_Display'] font-bold text-[#0B0D10] mb-1">Community Updates</h2>
              <p className="text-gray-600 text-sm">See what's happening in the community</p>
            </div>
            <button
              onClick={() => navigate('community')}
              className="text-[#0B0D10] hover:text-[#E6C36A] transition-colors flex items-center gap-2 font-medium"
            >
              View All <ArrowRight className="size-4" />
            </button>
          </div>

          <div className="space-y-4 lg:space-y-6">
            {communityPosts.map((post) => (
              <div key={post.id} className="bg-white border border-gray-200 rounded-xl p-5 lg:p-6 shadow-sm">
                <div className="flex items-start gap-3 lg:gap-4 mb-5">
                  <div className="size-12 rounded-full bg-gray-100 border border-[#E6C36A] flex items-center justify-center text-[#E6C36A] font-bold flex-shrink-0">
                    {post.author[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="text-[#0B0D10] font-medium">{post.author}</span>
                      <span className="text-sm text-gray-500">• {post.role}</span>
                      <span className="text-sm text-gray-500">• {post.time}</span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{post.content}</p>
                  </div>
                </div>

                {post.image && (
                  <div className="mb-5 rounded-lg overflow-hidden border border-gray-200">
                    <img
                      src={post.image}
                      alt="Post"
                      className="w-full h-64 lg:h-80 object-cover"
                    />
                  </div>
                )}

                <div className="flex items-center gap-6 text-gray-500 pt-1">
                  <button className="flex items-center gap-2 hover:text-[#E6C36A] transition-colors">
                    <Heart className="size-5" />
                    <span className="text-sm">{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-2 hover:text-[#E6C36A] transition-colors">
                    <MessageCircle className="size-5" />
                    <span className="text-sm">{post.comments}</span>
                  </button>
                  <button className="flex items-center gap-2 hover:text-[#E6C36A] transition-colors">
                    <Share2 className="size-5" />
                    <span className="text-sm">Share</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}