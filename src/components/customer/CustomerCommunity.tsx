import { useState } from 'react';
import { useApp } from '../../App';
import { Bell, ChevronDown, Heart, MessageCircle, Star } from 'lucide-react';
import Logo from '../../imports/Logo';

interface Post {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  image: string;
  caption: string;
  likes: number;
  comments: Comment[];
  timestamp: string;
}

interface Comment {
  id: string;
  author: string;
  text: string;
  timestamp: string;
}

export function CustomerCommunity() {
  const { navigate, user } = useApp();
  
  // Mock data
  const posts: Post[] = [
    {
      id: '1',
      author: {
        name: 'Sarah M.',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
      },
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600',
      caption: 'Just finished my hoodie design — thoughts?',
      likes: 24,
      comments: [
        {
          id: '1',
          author: 'Alex K.',
          text: 'Great cut — want to collaborate and turn this into a brand?',
          timestamp: '2h ago',
        },
        {
          id: '2',
          author: 'Jordan P.',
          text: 'Love the minimal aesthetic. Would definitely buy this!',
          timestamp: '1h ago',
        },
      ],
      timestamp: '3 hours ago',
    },
    {
      id: '2',
      author: {
        name: 'Marcus L.',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      },
      image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600',
      caption: 'First time using the studio. Loving the process!',
      likes: 18,
      comments: [
        {
          id: '3',
          author: 'Emma W.',
          text: 'The fabric choice is perfect for this design.',
          timestamp: '30m ago',
        },
      ],
      timestamp: '5 hours ago',
    },
    {
      id: '3',
      author: {
        name: 'Nina R.',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
      },
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600',
      caption: 'My denim jacket just arrived. The quality is incredible!',
      likes: 42,
      comments: [],
      timestamp: '1 day ago',
    },
  ];

  const trendingDesigns = [
    'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=200',
    'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=200',
    'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=200',
  ];

  const topRatedCustomers = [
    { name: 'Alex K.', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100', rating: 0.95 },
    { name: 'Jordan P.', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100', rating: 0.92 },
    { name: 'Emma W.', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100', rating: 0.89 },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#E5E7EB]">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="w-8 h-8 text-[#0B0D10] cursor-pointer" onClick={() => navigate('home')}>
            <Logo showText={false} />
          </div>

          <nav className="hidden md:flex items-center gap-12">
            {['Studio', 'Orders', 'Community', 'Shop'].map((item) => (
              <button
                key={item}
                onClick={() => navigate(`customer-${item.toLowerCase()}`)}
                className={`text-sm font-medium transition-colors tracking-wide ${
                  item === 'Community' ? 'text-[#0B0D10]' : 'text-[#9CA3AF] hover:text-[#E6C36A]'
                }`}
              >
                {item}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button className="relative p-2 hover:bg-[#E5E7EB]/50 rounded-full transition-colors">
              <Bell className="w-5 h-5 text-[#0B0D10]" />
            </button>
            <div className="relative group">
              <button className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <div className="w-8 h-8 rounded-full bg-[#E5E7EB] overflow-hidden">
                  <img
                    src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <ChevronDown className="w-4 h-4 text-[#9CA3AF]" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Community Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Feed - Centered */}
          <div className="lg:col-span-2">
            <h1 className="text-4xl font-['Playfair_Display'] font-bold text-[#0B0D10] mb-12">
              Customer Community
            </h1>

            <div className="space-y-12">
              {posts.map((post) => (
                <div key={post.id} className="border border-[#E5E7EB] overflow-hidden hover:border-[#0B0D10] transition-colors">
                  {/* Post Header */}
                  <div className="p-6 flex items-center gap-4 border-b border-[#E5E7EB]">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-[#0B0D10]">{post.author.name}</p>
                      <p className="text-xs text-[#9CA3AF]">{post.timestamp}</p>
                    </div>
                  </div>

                  {/* Post Image */}
                  <img
                    src={post.image}
                    alt="Post"
                    className="w-full h-96 object-cover"
                  />

                  {/* Post Actions */}
                  <div className="p-6 border-b border-[#E5E7EB]">
                    <div className="flex items-center gap-6 mb-4">
                      <button className="flex items-center gap-2 text-[#0B0D10] hover:text-[#E6C36A] transition-colors">
                        <Heart className="w-5 h-5" />
                        <span className="text-sm font-medium">{post.likes}</span>
                      </button>
                      <button className="flex items-center gap-2 text-[#0B0D10] hover:text-[#E6C36A] transition-colors">
                        <MessageCircle className="w-5 h-5" />
                        <span className="text-sm font-medium">{post.comments.length}</span>
                      </button>
                    </div>
                    <p className="text-sm text-[#0B0D10]">
                      <span className="font-medium">{post.author.name}</span> {post.caption}
                    </p>
                  </div>

                  {/* Comments */}
                  {post.comments.length > 0 && (
                    <div className="p-6 space-y-4">
                      {post.comments.map((comment) => (
                        <div key={comment.id}>
                          <p className="text-sm text-[#0B0D10]">
                            <span className="font-medium">{comment.author}</span> {comment.text}
                          </p>
                          <p className="text-xs text-[#9CA3AF] mt-1">{comment.timestamp}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Side Panel */}
          <div className="space-y-8">
            {/* Trending Designs */}
            <div className="border border-[#E5E7EB] p-6">
              <h3 className="text-lg font-['Playfair_Display'] font-bold text-[#0B0D10] mb-6">
                Trending Designs
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {trendingDesigns.map((image, idx) => (
                  <img
                    key={idx}
                    src={image}
                    alt="Trending"
                    className="w-full aspect-square object-cover cursor-pointer hover:opacity-80 transition-opacity"
                  />
                ))}
              </div>
            </div>

            {/* Top-Rated Customers */}
            <div className="border border-[#E5E7EB] p-6">
              <h3 className="text-lg font-['Playfair_Display'] font-bold text-[#0B0D10] mb-6">
                Highlighted Customers
              </h3>
              <div className="space-y-4">
                {topRatedCustomers.map((customer, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <img
                      src={customer.avatar}
                      alt={customer.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-[#0B0D10]">{customer.name}</p>
                      <div className="flex items-center gap-1">
                        <div className="relative w-4 h-4">
                          <Star className="w-4 h-4 text-[#E5E7EB] absolute" />
                          <div 
                            className="overflow-hidden absolute inset-0"
                            style={{ width: `${customer.rating * 100}%` }}
                          >
                            <Star className="w-4 h-4 text-[#E6C36A] fill-[#E6C36A]" />
                          </div>
                        </div>
                        <span className="text-xs text-[#9CA3AF]">{(customer.rating * 100).toFixed(0)}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Notice */}
            <div className="bg-[#E5E7EB]/30 p-6">
              <p className="text-xs text-[#0B0D10] leading-relaxed">
                <span className="font-bold">Note:</span> You can only see the Customer Community. Brand and Manufacturer communities are separate.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
