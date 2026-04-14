import React, { useState } from 'react';
import { useApp } from '../../App';
import { motion } from 'motion/react';
import { Send, Pin, MessageSquare } from 'lucide-react';

// Post Component
const Post = ({ post, isPinned = false }: { post: any; isPinned?: boolean }) => {
  const [likes, setLikes] = useState(post.likes || 0);
  const [showReply, setShowReply] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`bg-white border border-[#0F0F12]/10 p-6 ${
        isPinned ? 'bg-[#F7F7F5]/50' : ''
      }`}
    >
      {/* Pinned Badge */}
      {isPinned && (
        <div className="flex items-center gap-2 mb-4">
          <Pin className="w-4 h-4 text-[#5B7C99]" />
          <span className="text-xs uppercase tracking-wider text-[#5B7C99]">Pinned</span>
        </div>
      )}

      {/* Author & Time */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#0F0F12] text-white flex items-center justify-center text-sm">
            {post.author.charAt(0)}
          </div>
          <div>
            <p className="text-sm text-[#0F0F12]">{post.author}</p>
            <p className="text-xs text-[#0F0F12]/40 font-['IBM_Plex_Mono']">{post.time}</p>
          </div>
        </div>
        {post.category && (
          <span className="px-2 py-1 bg-[#0E1A2B]/10 text-[#0E1A2B] text-xs uppercase tracking-wider">
            {post.category}
          </span>
        )}
      </div>

      {/* Content */}
      <p className="text-[#0F0F12]/80 leading-relaxed mb-4">{post.content}</p>

      {/* Actions */}
      <div className="flex items-center gap-6 text-sm text-[#0F0F12]/60">
        <button
          onClick={() => setLikes(likes + 1)}
          className="hover:text-[#0F0F12] transition-colors"
        >
          <span className="font-['IBM_Plex_Mono']">{likes}</span> Likes
        </button>
        <button
          onClick={() => setShowReply(!showReply)}
          className="hover:text-[#0F0F12] transition-colors flex items-center gap-1"
        >
          <MessageSquare className="w-4 h-4" />
          Reply
        </button>
      </div>

      {/* Reply Box */}
      {showReply && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-4 pt-4 border-t border-[#0F0F12]/10"
        >
          <textarea
            placeholder="Write a reply..."
            className="w-full px-4 py-3 border border-[#0F0F12]/20 focus:border-[#5B7C99] outline-none resize-none text-sm"
            rows={3}
          />
          <button className="mt-2 px-4 py-2 bg-[#0F0F12] text-white hover:bg-[#0E1A2B] transition-all duration-300 text-xs uppercase tracking-wider">
            Post Reply
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};

export function LocalBrandCommunity() {
  const { navigate } = useApp();
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostCategory, setNewPostCategory] = useState('general');
  const [activeFilter, setActiveFilter] = useState('all');

  const categories = ['all', 'announcement', 'collaboration', 'question', 'showcase'];

  const posts = [
    {
      id: 1,
      author: 'Black Star Team',
      time: '2h ago',
      category: 'announcement',
      content: 'New manufacturer quality standards are now live. All active orders will be reviewed under the updated criteria. Check your process dashboard for details.',
      likes: 24,
      pinned: true,
    },
    {
      id: 2,
      author: 'Dark Matter Co',
      time: '5h ago',
      category: 'collaboration',
      content: 'Looking for collaboration on winter collection. Focused on sustainable materials and minimal waste production. DM if interested.',
      likes: 12,
    },
    {
      id: 3,
      author: 'Steel Thread',
      time: '1d ago',
      category: 'showcase',
      content: 'Just completed our 10th successful order on the platform. The process page is a game changer for tracking production. Highly recommend connecting with Nova Textiles.',
      likes: 18,
    },
    {
      id: 4,
      author: 'Midnight Atelier',
      time: '2d ago',
      category: 'question',
      content: 'Has anyone worked with manufacturers in Portugal? Looking for recommendations for small-batch garment production.',
      likes: 7,
    },
    {
      id: 5,
      author: 'Void Collective',
      time: '3d ago',
      category: 'showcase',
      content: 'New editorial lookbook featuring our latest collection. Shot entirely with models from the Black Star platform. Quality and professionalism exceeded expectations.',
      likes: 32,
    },
  ];

  const filteredPosts = activeFilter === 'all' 
    ? posts 
    : posts.filter(post => post.category === activeFilter);

  const handlePostSubmit = () => {
    if (newPostContent.trim()) {
      // Post submission logic here
      setNewPostContent('');
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F7F5]">
      {/* Header */}
      <header className="bg-[#F7F7F5] border-b border-[#0F0F12]/10 sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4 bg-[rgb(250,250,250)]">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('localbrand-dashboard')}
              className="text-sm uppercase tracking-wider text-[#0F0F12]/60 hover:text-[#0F0F12] transition-colors"
            >
              ← Back
            </button>
            <h1 className="text-xl font-['Inter_Tight'] tracking-tight text-[#0F0F12]">Community</h1>
            <div className="w-20" />
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-6 py-12 bg-[#FAFAFA]">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* New Post Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white border border-[#0F0F12]/10 p-6"
          >
            <h2 className="text-sm uppercase tracking-wider text-[#0F0F12] mb-4">New Post</h2>
            <textarea
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              placeholder="Share an announcement, collaboration idea, or question..."
              className="w-full px-4 py-3 border border-[#0F0F12]/20 focus:border-[#5B7C99] outline-none resize-none mb-4"
              rows={4}
            />
            <div className="flex items-center justify-between">
              <select
                value={newPostCategory}
                onChange={(e) => setNewPostCategory(e.target.value)}
                className="px-3 py-2 border border-[#0F0F12]/20 focus:border-[#5B7C99] outline-none text-sm uppercase tracking-wider bg-white"
              >
                <option value="announcement">Announcement</option>
                <option value="collaboration">Collaboration</option>
                <option value="question">Question</option>
                <option value="showcase">Showcase</option>
              </select>
              <button
                onClick={handlePostSubmit}
                className="flex items-center gap-2 px-6 py-3 bg-[#0F0F12] text-white hover:bg-[#0E1A2B] transition-all duration-300 text-sm uppercase tracking-wider"
              >
                <Send className="w-4 h-4" />
                Post
              </button>
            </div>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex gap-3 overflow-x-auto pb-2"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-4 py-2 text-xs uppercase tracking-wider transition-all duration-300 whitespace-nowrap ${
                  activeFilter === category
                    ? 'bg-[#0F0F12] text-white'
                    : 'bg-white border border-[#0F0F12]/20 text-[#0F0F12] hover:border-[#5B7C99]'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {/* Posts Feed */}
          <div className="space-y-4">
            {filteredPosts.map((post, index) => (
              <Post key={post.id} post={post} isPinned={post.pinned} />
            ))}
          </div>

          {/* Empty State */}
          {filteredPosts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-[#0F0F12]/40 text-lg">No posts in this category</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}