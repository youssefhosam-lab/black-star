import React, { useState, useEffect } from 'react';
import { useApp } from '../../App';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, Settings, LogOut,
  Image as ImageIcon, Paperclip, AtSign, Pin, CheckCircle,
  FileText, Clock
} from 'lucide-react';

// --- Mock Data ---
const brandMembers = [
  { id: '1', name: 'Sarah Mitchell', role: 'Brand Owner', avatar: 'SM', online: true },
  { id: '2', name: 'Ahmed Hassan', role: 'Creative Director', avatar: 'AH', online: true },
  { id: '3', name: 'Layla Khalil', role: 'Designer', avatar: 'LK', online: false },
  { id: '4', name: 'Omar Farouk', role: 'Production Manager', avatar: 'OF', online: true },
  { id: '5', name: 'Yasmin Ali', role: 'Marketing Lead', avatar: 'YA', online: false }
];

const communityPosts = [
  {
    id: '1',
    author: 'Ahmed Hassan',
    role: 'Creative Director',
    avatar: 'AH',
    timestamp: '2 hours ago',
    content: 'Sample approval needed for Midnight Collection. I\'ve uploaded high-resolution fabric photos and pattern details. Team, please review by EOD and provide feedback.',
    attachments: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1558769132-cb1aea1c8861?w=400&h=300&fit=crop' },
      { type: 'file', name: 'pattern-specs.pdf' }
    ],
    comments: 3,
    isPinned: true
  },
  {
    id: '2',
    author: 'Layla Khalil',
    role: 'Designer',
    avatar: 'LK',
    timestamp: '5 hours ago',
    content: 'New mood board for Spring 2025 collection ready. Focusing on minimalist silhouettes with Egyptian cotton. Looking for input on color direction.',
    attachments: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=300&fit=crop' }
    ],
    comments: 7,
    isPinned: false
  },
  {
    id: '3',
    author: 'Omar Farouk',
    role: 'Production Manager',
    avatar: 'OF',
    timestamp: '1 day ago',
    content: 'Luxe Manufacture has completed the first batch. Minor adjustments needed on sleeve length. I\'ve documented everything and scheduled a call for tomorrow 10am.',
    attachments: [],
    comments: 2,
    isPinned: false
  },
  {
    id: '4',
    author: 'Sarah Mitchell',
    role: 'Brand Owner',
    avatar: 'SM',
    timestamp: '2 days ago',
    content: 'Team meeting scheduled for Friday 3pm. We\'ll discuss Q1 production timeline, new manufacturer partnerships, and the upcoming campaign shoot.',
    attachments: [],
    comments: 5,
    isPinned: false
  }
];

const activeTopics = [
  { id: '1', title: 'Finalize Winter Collection Fabric', postId: '1' },
  { id: '2', title: 'Model Selection for Campaign A', postId: '2' },
  { id: '3', title: 'Manufacturer Delay Discussion', postId: '3' }
];

const brandGuidelines = {
  colors: ['#0B0D10', '#E6C36A', '#FFFFFF'],
  typography: ['Playfair Display', 'Inter'],
  logo: '★ BLACK STAR'
};

// --- Components ---

const Header = () => {
  const { navigate } = useApp();
  const [animatedBrandName, setAnimatedBrandName] = useState('');
  const brandName = 'BLACK STAR';

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < brandName.length) {
        setAnimatedBrandName(brandName.substring(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 h-[80px] bg-[#0B0D10] border-b border-[#1E2230] z-50">
      <div className="h-full px-8 flex items-center justify-between">
        {/* Left - Animated Brand Name */}
        <div>
          <h1 
            onClick={() => navigate('brand-dashboard')}
            className="font-['Playfair_Display'] text-2xl text-[#E6C36A] tracking-wide cursor-pointer hover:opacity-80 transition-opacity"
          >
            {animatedBrandName}
          </h1>
        </div>

        {/* Center - Page Title */}
        <div>
          <h2 className="text-sm uppercase tracking-[0.15em] text-white">Community</h2>
        </div>

        {/* Right - Controls */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-white">
            <Users className="size-4" />
            <span className="text-sm">{brandMembers.length}</span>
          </div>
          <button className="text-white hover:text-[#E6C36A] transition-colors">
            <Settings className="size-5" />
          </button>
          <button 
            onClick={() => navigate('login')}
            className="text-white hover:text-[#E6C36A] transition-colors"
          >
            <LogOut className="size-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

const LeftSidebar = ({ activePage }: { activePage: string }) => {
  const { navigate } = useApp();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, route: 'brand-dashboard' },
    { id: 'community', label: 'Community', icon: MessageSquare, route: 'brand-community' },
    { id: 'designs', label: 'Designs', icon: Package, route: 'brand-designs' },
    { id: 'manufacturers', label: 'Manufacturers', icon: Factory, route: 'brand-manufacturers' },
    { id: 'models', label: 'Models', icon: Camera, route: 'brand-models' },
    { id: 'orders', label: 'Orders', icon: ShoppingBag, route: 'brand-orders' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, route: 'brand-analytics' }
  ];

  return (
    <aside className="fixed left-0 top-[80px] bottom-0 w-[280px] bg-[#FAFAFA] border-r border-[#E5E7EB] p-6">
      <nav className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.route)}
              className={`w-full flex items-center gap-3 px-4 py-3 transition-all ${
                isActive 
                  ? 'bg-white border-l-4 border-[#E6C36A] text-[#0B0D10] font-medium' 
                  : 'text-[#364153] hover:bg-white hover:shadow-sm'
              }`}
            >
              <Icon className="size-5" />
              <span className="text-sm">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

const CreatePostModule = () => {
  const [expanded, setExpanded] = useState(false);
  const [content, setContent] = useState('');

  return (
    <motion.div
      animate={{ height: expanded ? 'auto' : '80px' }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] p-6 mb-6"
    >
      <div className="flex gap-4">
        <div className="size-10 rounded-full bg-[#0B0D10] flex items-center justify-center flex-shrink-0">
          <span className="text-white text-sm font-medium">BS</span>
        </div>
        
        <div className="flex-1">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onFocus={() => setExpanded(true)}
            placeholder="Share an update with your brand team…"
            className="w-full bg-transparent text-[#0B0D10] placeholder-[#6B7280] text-sm resize-none focus:outline-none"
            rows={expanded ? 4 : 1}
          />
          
          {expanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-between mt-4 pt-4 border-t border-[#E5E7EB]"
            >
              <div className="flex gap-2">
                <button className="p-2 hover:bg-[#FAFAFA] rounded transition-colors">
                  <ImageIcon className="size-5 text-[#6B7280]" />
                </button>
                <button className="p-2 hover:bg-[#FAFAFA] rounded transition-colors">
                  <Paperclip className="size-5 text-[#6B7280]" />
                </button>
                <button className="p-2 hover:bg-[#FAFAFA] rounded transition-colors">
                  <AtSign className="size-5 text-[#6B7280]" />
                </button>
              </div>
              
              <button 
                disabled={!content.trim()}
                className={`px-6 py-2 text-xs uppercase tracking-wide rounded transition-all ${
                  content.trim() 
                    ? 'bg-[#0B0D10] text-white hover:bg-black' 
                    : 'bg-[#E5E7EB] text-[#6B7280] cursor-not-allowed'
                }`}
              >
                Post
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const CommunityPost = ({ post, index }: { post: any; index: number }) => {
  const [showComments, setShowComments] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      whileHover={{ y: -2, boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}
      className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] p-6 mb-4 transition-all"
    >
      {/* Post Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex gap-3">
          <div className="size-12 rounded-full bg-[#0B0D10] flex items-center justify-center flex-shrink-0">
            <span className="text-white text-sm font-medium">{post.avatar}</span>
          </div>
          <div>
            <p className="text-sm font-medium text-[#0B0D10]">{post.author}</p>
            <p className="text-xs uppercase tracking-wide text-[#6B7280]">{post.role}</p>
            <p className="text-xs text-[#6B7280] mt-1">{post.timestamp}</p>
          </div>
        </div>
        
        {post.isPinned && (
          <div className="flex items-center gap-1 px-2 py-1 bg-[#E6C36A]/10 rounded">
            <Pin className="size-3 text-[#E6C36A]" />
            <span className="text-[9px] uppercase tracking-wide text-[#E6C36A]">Pinned</span>
          </div>
        )}
      </div>

      {/* Post Content */}
      <p className="text-sm text-[#0B0D10] leading-relaxed mb-4">{post.content}</p>

      {/* Attachments */}
      {post.attachments.length > 0 && (
        <div className="mb-4 space-y-2">
          {post.attachments.map((attachment: any, i: number) => (
            <div key={i}>
              {attachment.type === 'image' ? (
                <img 
                  src={attachment.url} 
                  alt="Attachment" 
                  className="w-full max-w-md h-48 object-cover rounded grayscale hover:grayscale-0 transition-all cursor-pointer"
                />
              ) : (
                <div className="flex items-center gap-3 px-4 py-3 bg-[#FAFAFA] rounded border border-[#E5E7EB]">
                  <FileText className="size-5 text-[#6B7280]" />
                  <span className="text-sm text-[#0B0D10]">{attachment.name}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-4 pt-4 border-t border-[#E5E7EB]">
        <button 
          onClick={() => setShowComments(!showComments)}
          className="text-xs uppercase tracking-wide text-[#6B7280] hover:text-[#E6C36A] transition-colors"
        >
          Comment ({post.comments})
        </button>
        <button className="text-xs uppercase tracking-wide text-[#6B7280] hover:text-[#E6C36A] transition-colors flex items-center gap-1">
          <Pin className="size-3" />
          Pin
        </button>
        <button className="text-xs uppercase tracking-wide text-[#6B7280] hover:text-[#E6C36A] transition-colors flex items-center gap-1">
          <CheckCircle className="size-3" />
          Resolve
        </button>
      </div>

      {/* Comments Section */}
      <AnimatePresence>
        {showComments && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 pl-8 pt-4 border-t border-[#E5E7EB] space-y-3"
          >
            <p className="text-xs text-[#6B7280] italic">Comments thread would appear here</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const MainFeed = () => {
  const hasPosts = communityPosts.length > 0;

  return (
    <div className="w-full max-w-[900px]">
      <CreatePostModule />
      
      {hasPosts ? (
        communityPosts.map((post, index) => (
          <CommunityPost key={post.id} post={post} index={index} />
        ))
      ) : (
        <div className="text-center py-20">
          <p className="text-[#6B7280] text-sm leading-relaxed">
            This is your private brand space.<br />
            Start the conversation.
          </p>
        </div>
      )}
    </div>
  );
};

const RightPanel = () => {
  return (
    <aside className="w-[340px] flex-shrink-0 space-y-6">
      {/* Brand Members */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] p-6">
        <h3 className="text-sm uppercase tracking-wide text-[#0B0D10] mb-4">Brand Members</h3>
        <div className="space-y-3">
          {brandMembers.map((member) => (
            <div key={member.id} className="flex items-center gap-3">
              <div className="relative">
                <div className="size-8 rounded-full bg-[#0B0D10] flex items-center justify-center">
                  <span className="text-white text-xs font-medium">{member.avatar}</span>
                </div>
                {member.online && (
                  <span className="absolute bottom-0 right-0 size-2 bg-green-500 rounded-full border-2 border-white" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-[#0B0D10] truncate">{member.name}</p>
                <p className="text-[10px] uppercase tracking-wide text-[#6B7280]">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Topics */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] p-6">
        <h3 className="text-sm uppercase tracking-wide text-[#0B0D10] mb-4">Active Topics</h3>
        <div className="space-y-3">
          {activeTopics.map((topic) => (
            <button
              key={topic.id}
              className="w-full text-left px-3 py-2 bg-[#FAFAFA] hover:bg-[#E6C36A]/10 rounded transition-colors"
            >
              <div className="flex items-start gap-2">
                <Clock className="size-4 text-[#E6C36A] flex-shrink-0 mt-0.5" />
                <p className="text-xs text-[#0B0D10] leading-relaxed">{topic.title}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Brand Guidelines */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] p-6">
        <h3 className="text-sm uppercase tracking-wide text-[#0B0D10] mb-4">Brand Guidelines</h3>
        
        {/* Color Palette */}
        <div className="mb-4">
          <p className="text-[10px] uppercase tracking-wide text-[#6B7280] mb-2">Colors</p>
          <div className="flex gap-2">
            {brandGuidelines.colors.map((color, i) => (
              <div
                key={i}
                className="size-8 rounded border border-[#E5E7EB]"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        {/* Typography */}
        <div className="mb-4">
          <p className="text-[10px] uppercase tracking-wide text-[#6B7280] mb-2">Typography</p>
          <div className="space-y-1">
            {brandGuidelines.typography.map((font, i) => (
              <p key={i} className="text-xs text-[#0B0D10]">{font}</p>
            ))}
          </div>
        </div>

        {/* Logo */}
        <div>
          <p className="text-[10px] uppercase tracking-wide text-[#6B7280] mb-2">Logo</p>
          <div className="px-3 py-2 bg-[#0B0D10] rounded text-center">
            <p className="text-[#E6C36A] font-['Playfair_Display'] text-sm">{brandGuidelines.logo}</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export function BrandCommunityPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Header />
      
      <div className="pt-[80px]">
        <div className="max-w-[1400px] mx-auto flex gap-10 p-10">
          <MainFeed />
          <RightPanel />
        </div>
      </div>
    </div>
  );
}