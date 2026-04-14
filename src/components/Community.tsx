import React, { useState } from 'react';
import { useApp } from '../App';
import { Layout } from './Layout';
import { 
  Heart, MessageSquare, Flag, Share2, Plus, Image as ImageIcon, 
  Link as LinkIcon, Type, Filter, Search, MoreHorizontal, Users, X, Palette
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Mock Data for Customer Community
const MOCK_POSTS = [
  {
    id: '1',
    author: { name: 'Alice Chen', avatar: '' },
    content: 'Just finished my new summer collection design! What do you think about the color palette?',
    type: 'image',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=60',
    likes: 124,
    comments: 18,
    timestamp: '2 hours ago',
    tags: ['Summer', 'Design']
  },
  {
    id: '2',
    author: { name: 'Marcus Johnson', avatar: '' },
    content: 'Looking for feedback on this hoodie layout. Is the logo too big?',
    type: 'design-link',
    designId: 'design-123',
    designPreview: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=60',
    likes: 45,
    comments: 12,
    timestamp: '5 hours ago',
    tags: ['Streetwear', 'Feedback']
  },
  {
    id: '3',
    author: { name: 'Sarah Miller', avatar: '' },
    content: 'Has anyone ordered from "Elite Stitching"? How was the fabric quality?',
    type: 'text',
    likes: 89,
    comments: 34,
    timestamp: '1 day ago',
    tags: ['Question', 'Quality']
  }
];

export function Community() {
  const { user } = useApp();
  const [filter, setFilter] = useState<'latest' | 'popular'>('latest');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [posts, setPosts] = useState(MOCK_POSTS);

  // If not a customer, show a different view or restricted message
  // For this task, we focus on the Customer Community
  if (user?.role !== 'customer') {
    return (
      <Layout>
        <div className="p-8 flex items-center justify-center h-full">
          <div className="text-center max-w-md">
            <h2 className="text-2xl font-bold text-[#F5F6F8] mb-4">Community Access Restricted</h2>
            <p className="text-[#8A8F98]">
              The Customer Community is exclusive to customers to share designs and get feedback. 
              {user?.role === 'brand' ? ' Brand communities are coming soon.' : ''}
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  const sortedPosts = [...posts].sort((a, b) => {
    if (filter === 'latest') return 0; // In a real app, sort by timestamp
    return b.likes - a.likes;
  });

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-['Playfair_Display'] font-bold text-[#F5F6F8] mb-2">
              Customer Community
            </h1>
            <p className="text-[#8A8F98]">
              Share designs, ask questions, and connect with other creators.
            </p>
          </div>
          <button 
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2 bg-[#E6C36A] text-[#0B0D10] px-6 py-3 rounded-lg font-medium hover:brightness-110 transition-all shadow-[0_0_15px_rgba(230,195,106,0.3)]"
          >
            <Plus className="size-5" />
            Create Post
          </button>
        </div>

        {/* Guidelines Banner */}
        <div className="bg-[#141720] border border-[#1E2230] rounded-lg p-4 mb-8 flex items-start gap-4">
          <div className="p-2 bg-[#1B1F2A] rounded-lg text-[#E6C36A]">
            <Users className="size-5" />
          </div>
          <div>
            <h3 className="text-[#F5F6F8] font-medium mb-1">Community Guidelines</h3>
            <p className="text-sm text-[#8A8F98]">
              This is a space for creativity and feedback. No selling, brand promotion, or manufacturer solicitation allowed.
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between mb-6 sticky top-20 z-30 bg-[#0B0D10]/95 backdrop-blur py-4 border-b border-[#1E2230]">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilter('latest')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'latest' 
                  ? 'bg-[#1E2230] text-[#E6C36A] border border-[#E6C36A]/30' 
                  : 'text-[#8A8F98] hover:bg-[#141720] hover:text-[#F5F6F8]'
              }`}
            >
              Latest
            </button>
            <button
              onClick={() => setFilter('popular')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'popular' 
                  ? 'bg-[#1E2230] text-[#E6C36A] border border-[#E6C36A]/30' 
                  : 'text-[#8A8F98] hover:bg-[#141720] hover:text-[#F5F6F8]'
              }`}
            >
              Most Liked
            </button>
          </div>
          <div className="relative w-64 hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#8A8F98]" />
            <input 
              type="text"
              placeholder="Search posts..."
              className="w-full bg-[#141720] border border-[#1E2230] rounded-lg pl-10 pr-4 py-2 text-sm text-[#F5F6F8] focus:border-[#E6C36A] focus:outline-none"
            />
          </div>
        </div>

        {/* Feed */}
        <div className="space-y-6">
          {sortedPosts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#141720] border border-[#1E2230] rounded-xl overflow-hidden hover:border-[#E6C36A]/30 transition-colors"
            >
              {/* Post Header */}
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full bg-[#1B1F2A] flex items-center justify-center text-[#E6C36A] font-bold border border-[#1E2230]">
                    {post.author.name[0]}
                  </div>
                  <div>
                    <h3 className="text-[#F5F6F8] font-medium">{post.author.name}</h3>
                    <span className="text-xs text-[#8A8F98]">{post.timestamp}</span>
                  </div>
                </div>
                <button className="text-[#8A8F98] hover:text-[#F5F6F8]">
                  <MoreHorizontal className="size-5" />
                </button>
              </div>

              {/* Post Content */}
              <div className="px-4 pb-4">
                <p className="text-[#D1D5DB] mb-4 whitespace-pre-wrap">{post.content}</p>
                
                {post.type === 'image' && (
                  <div className="rounded-lg overflow-hidden border border-[#1E2230]">
                    <img src={post.image} alt="Post content" className="w-full h-auto object-cover max-h-[500px]" />
                  </div>
                )}

                {post.type === 'design-link' && (
                  <div className="rounded-lg overflow-hidden border border-[#1E2230] bg-[#0B0D10] group cursor-pointer">
                    <div className="aspect-video relative">
                      <img src={post.designPreview} alt="Design preview" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="bg-[#0B0D10]/80 backdrop-blur px-4 py-2 rounded-full text-[#E6C36A] text-sm font-medium flex items-center gap-2">
                          <Palette className="size-4" />
                          View Design
                        </span>
                      </div>
                    </div>
                    <div className="p-3">
                      <p className="text-xs text-[#8A8F98] uppercase tracking-wider">Shared Design</p>
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-2 mt-4">
                  {post.tags?.map(tag => (
                    <span key={tag} className="text-xs text-[#E6C36A] bg-[#E6C36A]/10 px-2 py-1 rounded-full border border-[#E6C36A]/20">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Post Actions */}
              <div className="px-4 py-3 bg-[#1B1F2A]/50 border-t border-[#1E2230] flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <button className="flex items-center gap-2 text-[#8A8F98] hover:text-[#E74C3C] transition-colors group">
                    <Heart className="size-5 group-hover:scale-110 transition-transform" />
                    <span className="text-sm">{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-2 text-[#8A8F98] hover:text-[#E6C36A] transition-colors group">
                    <MessageSquare className="size-5 group-hover:scale-110 transition-transform" />
                    <span className="text-sm">{post.comments}</span>
                  </button>
                  <button className="flex items-center gap-2 text-[#8A8F98] hover:text-[#F5F6F8] transition-colors group">
                    <Share2 className="size-5 group-hover:scale-110 transition-transform" />
                  </button>
                </div>
                <button className="text-[#8A8F98] hover:text-red-500 text-sm flex items-center gap-1" title="Report Post">
                  <Flag className="size-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Create Post Modal */}
      <AnimatePresence>
        {isCreateModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#141720] border border-[#1E2230] rounded-xl w-full max-w-lg overflow-hidden shadow-2xl"
            >
              <div className="p-6 border-b border-[#1E2230] flex items-center justify-between">
                <h2 className="text-xl font-['Playfair_Display'] font-bold text-[#F5F6F8]">Create New Post</h2>
                <button 
                  onClick={() => setIsCreateModalOpen(false)}
                  className="text-[#8A8F98] hover:text-[#F5F6F8]"
                >
                  <X className="size-6" />
                </button>
              </div>
              
              <div className="p-6 space-y-4">
                <textarea
                  placeholder="What are you working on?"
                  className="w-full bg-[#0B0D10] border border-[#1E2230] rounded-lg p-4 text-[#F5F6F8] min-h-[120px] focus:border-[#E6C36A] focus:outline-none resize-none"
                />
                
                <div className="flex gap-4">
                  <button className="flex-1 flex flex-col items-center justify-center gap-2 h-24 bg-[#1B1F2A] border border-[#1E2230] rounded-lg hover:border-[#E6C36A] hover:bg-[#1E2230] transition-all text-[#8A8F98] hover:text-[#E6C36A]">
                    <ImageIcon className="size-6" />
                    <span className="text-sm font-medium">Add Image</span>
                  </button>
                  <button className="flex-1 flex flex-col items-center justify-center gap-2 h-24 bg-[#1B1F2A] border border-[#1E2230] rounded-lg hover:border-[#E6C36A] hover:bg-[#1E2230] transition-all text-[#8A8F98] hover:text-[#E6C36A]">
                    <LinkIcon className="size-6" />
                    <span className="text-sm font-medium">Link Design</span>
                  </button>
                </div>

                <div className="bg-[#1B1F2A]/50 p-3 rounded-lg border border-[#1E2230]">
                  <p className="text-xs text-[#8A8F98] flex items-center gap-2">
                    <Flag className="size-3 text-[#E6C36A]" />
                    Remember: No selling, ads, or manufacturer promotion.
                  </p>
                </div>
              </div>

              <div className="p-6 border-t border-[#1E2230] flex justify-end gap-3">
                <button 
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-[#8A8F98] hover:text-[#F5F6F8]"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-6 py-2 rounded-lg bg-[#E6C36A] text-[#0B0D10] font-medium hover:brightness-110"
                >
                  Post
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </Layout>
  );
}
