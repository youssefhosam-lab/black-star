import React, { useState } from 'react';
import { useApp } from '../../App';
import { Sparkles, ShoppingBag, Users, TrendingUp, Heart, MessageCircle, Share2, Plus, Palette } from 'lucide-react';
import { DashboardNav } from '../DashboardNav';

interface Post {
  id: string;
  author: string;
  avatar: string;
  design: string;
  title: string;
  likes: number;
  comments: number;
  liked: boolean;
}

export function DesignerDashboard() {
  const { navigate } = useApp();
  const [activeTab, setActiveTab] = useState<'feed' | 'shop' | 'design'>('feed');
  
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      author: 'Marcus Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
      design: 'https://images.unsplash.com/photo-1558769132-cb1aea1c8861?w=600&h=800&fit=crop',
      title: 'Minimalist Black Blazer Concept',
      likes: 234,
      comments: 45,
      liked: false
    },
    {
      id: '2',
      author: 'Luna Park',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
      design: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&h=800&fit=crop',
      title: 'Gold Accent Evening Dress',
      likes: 567,
      comments: 89,
      liked: true
    },
    {
      id: '3',
      author: 'James Wilson',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
      design: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=800&fit=crop',
      title: 'Street Style Collection',
      likes: 892,
      comments: 123,
      liked: false
    }
  ]);

  const brands = [
    {
      name: 'Noir Atelier',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=300&fit=crop',
      products: 24,
      rating: 4.8
    },
    {
      name: 'Eclipse Fashion',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=300&h=300&fit=crop',
      products: 18,
      rating: 4.9
    },
    {
      name: 'Midnight Couture',
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=300&h=300&fit=crop',
      products: 31,
      rating: 4.7
    }
  ];

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  return (
    <div className="min-h-screen bg-[#0B0D10] fade-in">
      <DashboardNav />
      {/* Header */}
      <header className="bg-[#141720] border-b border-[#1E2230] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-[#F5F6F8]">Designer Studio</h1>
            <div className="flex items-center gap-4">
              <button className="text-[#8A8F98] hover:text-[#E6C36A] transition-colors">
                <Users className="size-5" />
              </button>
              <button className="bg-[#E6C36A] text-[#0B0D10] px-6 py-2 rounded-lg hover:brightness-110 transition-all flex items-center gap-2">
                <Plus className="size-4" />
                New Design
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-6 mt-4">
            <button
              onClick={() => setActiveTab('feed')}
              className={`pb-2 border-b-2 transition-colors ${
                activeTab === 'feed' 
                  ? 'border-[#E6C36A] text-[#E6C36A]' 
                  : 'border-transparent text-[#8A8F98] hover:text-[#F5F6F8]'
              }`}
            >
              Community Feed
            </button>
            <button
              onClick={() => setActiveTab('shop')}
              className={`pb-2 border-b-2 transition-colors ${
                activeTab === 'shop' 
                  ? 'border-[#E6C36A] text-[#E6C36A]' 
                  : 'border-transparent text-[#8A8F98] hover:text-[#F5F6F8]'
              }`}
            >
              Shop Brands
            </button>
            <button
              onClick={() => setActiveTab('design')}
              className={`pb-2 border-b-2 transition-colors ${
                activeTab === 'design' 
                  ? 'border-[#E6C36A] text-[#E6C36A]' 
                  : 'border-transparent text-[#8A8F98] hover:text-[#F5F6F8]'
              }`}
            >
              My Designs
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'feed' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Community Feed */}
            <div className="lg:col-span-2 space-y-6">
              {/* Create Post */}
              <div className="bg-[#141720] border border-[#1E2230] rounded-2xl p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#E6C36A] rounded-full flex items-center justify-center">
                    <Palette className="size-6 text-[#0B0D10]" />
                  </div>
                  <input
                    type="text"
                    placeholder="Share your latest design..."
                    className="flex-1 bg-[#1B1F2A] border border-[#1E2230] rounded-lg py-3 px-4 text-[#F5F6F8] placeholder-[#8A8F98] focus:outline-none focus:border-[#E6C36A]"
                  />
                  <button className="bg-[#E6C36A] text-[#0B0D10] px-6 py-3 rounded-lg hover:brightness-110 transition-all">
                    Post
                  </button>
                </div>
              </div>

              {/* Posts */}
              {posts.map((post) => (
                <div key={post.id} className="bg-[#141720] border border-[#1E2230] rounded-2xl overflow-hidden">
                  {/* Post Header */}
                  <div className="p-6 flex items-center gap-4">
                    <img src={post.avatar} alt={post.author} className="w-12 h-12 rounded-full object-cover" />
                    <div className="flex-1">
                      <h4 className="text-[#F5F6F8]">{post.author}</h4>
                      <p className="text-[#8A8F98] text-sm">2 hours ago</p>
                    </div>
                  </div>

                  {/* Post Image */}
                  <img src={post.design} alt={post.title} className="w-full h-96 object-cover" />

                  {/* Post Actions */}
                  <div className="p-6">
                    <h3 className="text-[#F5F6F8] mb-4">{post.title}</h3>
                    <div className="flex items-center gap-6">
                      <button
                        onClick={() => handleLike(post.id)}
                        className={`flex items-center gap-2 transition-colors ${
                          post.liked ? 'text-[#E6C36A]' : 'text-[#8A8F98] hover:text-[#E6C36A]'
                        }`}
                      >
                        <Heart className={`size-5 ${post.liked ? 'fill-current' : ''}`} />
                        {post.likes}
                      </button>
                      <button className="flex items-center gap-2 text-[#8A8F98] hover:text-[#E6C36A] transition-colors">
                        <MessageCircle className="size-5" />
                        {post.comments}
                      </button>
                      <button className="flex items-center gap-2 text-[#8A8F98] hover:text-[#E6C36A] transition-colors ml-auto">
                        <Share2 className="size-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Trending Designers */}
              <div className="bg-[#141720] border border-[#1E2230] rounded-2xl p-6">
                <h3 className="text-[#F5F6F8] mb-4 flex items-center gap-2">
                  <TrendingUp className="size-5 text-[#E6C36A]" />
                  Trending Designers
                </h3>
                <div className="space-y-4">
                  {['Sophia Martinez', 'David Kim', 'Emma Taylor'].map((name, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <img
                        src={`https://images.unsplash.com/photo-${1534528741775 + i * 100000}?w=50&h=50&fit=crop`}
                        alt={name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <p className="text-[#F5F6F8] text-sm">{name}</p>
                        <p className="text-[#8A8F98] text-xs">{234 + i * 100} designs</p>
                      </div>
                      <button className="text-[#E6C36A] hover:underline text-sm">Follow</button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-[#141720] border border-[#1E2230] rounded-2xl p-6">
                <h3 className="text-[#F5F6F8] mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button
                    onClick={() => navigate('design-studio')}
                    className="w-full bg-[#1B1F2A] border border-[#1E2230] rounded-lg p-3 text-[#F5F6F8] hover:border-[#E6C36A] transition-all flex items-center gap-3"
                  >
                    <Sparkles className="size-5 text-[#E6C36A]" />
                    Design Studio
                  </button>
                  <button
                    onClick={() => navigate('marketplace')}
                    className="w-full bg-[#1B1F2A] border border-[#1E2230] rounded-lg p-3 text-[#F5F6F8] hover:border-[#E6C36A] transition-all flex items-center gap-3"
                  >
                    <ShoppingBag className="size-5 text-[#E6C36A]" />
                    Marketplace
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'shop' && (
          <div>
            <h2 className="text-[#F5F6F8] mb-6">Featured Local Brands</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {brands.map((brand, i) => (
                <div key={i} className="bg-[#141720] border border-[#1E2230] rounded-2xl overflow-hidden hover:border-[#E6C36A] transition-all group cursor-pointer">
                  <img src={brand.image} alt={brand.name} className="w-full h-64 object-cover" />
                  <div className="p-6">
                    <h3 className="text-[#F5F6F8] mb-2">{brand.name}</h3>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#8A8F98]">{brand.products} products</span>
                      <span className="text-[#E6C36A]">★ {brand.rating}</span>
                    </div>
                    <button
                      onClick={() => navigate('marketplace')}
                      className="w-full mt-4 bg-[#E6C36A] text-[#0B0D10] py-2 rounded-lg hover:brightness-110 transition-all"
                    >
                      View Collection
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'design' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[#F5F6F8]">My Designs</h2>
              <button
                onClick={() => navigate('design-studio')}
                className="bg-[#E6C36A] text-[#0B0D10] px-6 py-2 rounded-lg hover:brightness-110 transition-all flex items-center gap-2"
              >
                <Plus className="size-4" />
                Create New
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-[#141720] border border-[#1E2230] rounded-2xl overflow-hidden hover:border-[#E6C36A] transition-all group">
                  <div className="relative">
                    <img
                      src={`https://images.unsplash.com/photo-${1558769132000 + i * 100000}?w=400&h=500&fit=crop`}
                      alt={`Design ${i}`}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-[#0B0D10]/80 backdrop-blur-sm px-3 py-1 rounded-lg text-[#E6C36A] text-sm">
                      Draft
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="text-[#F5F6F8] mb-2">Design #{i}</h4>
                    <p className="text-[#8A8F98] text-sm">Last edited 2 days ago</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
