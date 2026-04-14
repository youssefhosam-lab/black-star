import { useState } from 'react';
import { useApp } from '../../App';
import { Bell, ChevronDown, Search, Scissors, Sparkles, Users } from 'lucide-react';
import Logo from '../../imports/Logo';

interface CommunityPost {
  id: string;
  type: 'need' | 'surplus' | 'partner';
  company: string;
  title: string;
  description: string;
  quantity?: string;
  material?: string;
  location: string;
  postedDate: string;
  responses: number;
}

export function TailorCommunity() {
  const { navigate, user } = useApp();
  const [activeTab, setActiveTab] = useState<'all' | 'needs' | 'surplus' | 'partners'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const posts: CommunityPost[] = [
    {
      id: '1',
      type: 'need',
      company: 'Bespoke London Tailors',
      title: 'Need Premium Cashmere Wool',
      description: 'High-end client commission requires finest cashmere wool blend. Small quantity, exceptional quality. Color: charcoal gray.',
      quantity: '3 meters',
      material: 'Cashmere Wool Blend',
      location: 'London, UK',
      postedDate: '2024-12-20',
      responses: 5,
    },
    {
      id: '2',
      type: 'surplus',
      company: 'Atelier Milano',
      title: 'Surplus: Luxury Silk Lining',
      description: 'Leftover from exclusive collection. Premium Italian silk lining in champagne. Perfect for custom jackets or vests.',
      quantity: '8 meters',
      material: 'Italian Silk Lining',
      location: 'Milan, Italy',
      postedDate: '2024-12-19',
      responses: 18,
    },
    {
      id: '3',
      type: 'partner',
      company: 'Heritage Tailoring Guild',
      title: 'Seeking Pattern Making Collaboration',
      description: 'Master tailor offering traditional pattern making services. Looking for tailors who need complex pattern work for bespoke suits.',
      location: 'Paris, France',
      postedDate: '2024-12-18',
      responses: 12,
    },
    {
      id: '4',
      type: 'need',
      company: 'Modern Atelier NYC',
      title: 'Seeking Horn Buttons - Custom Size',
      description: 'Need genuine horn buttons, 18mm diameter, for bespoke blazer. Matching set of 8 required. Quality paramount.',
      quantity: '8 buttons',
      material: 'Genuine Horn Buttons',
      location: 'New York, USA',
      postedDate: '2024-12-21',
      responses: 3,
    },
    {
      id: '5',
      type: 'surplus',
      company: 'Traditional Craft Studio',
      title: 'Surplus: Japanese Wool Suiting',
      description: 'Exceptional quality Japanese super 150s wool. Client changed mind. Navy blue, perfect for custom suits. Below cost.',
      quantity: '4.5 meters',
      material: 'Super 150s Wool',
      location: 'Tokyo, Japan',
      postedDate: '2024-12-17',
      responses: 24,
    },
    {
      id: '6',
      type: 'partner',
      company: 'Artisan Tailors Network',
      title: 'Join Bespoke Tailoring Community',
      description: 'Building network of independent tailors. Share techniques, source rare materials together, collaborate on complex commissions.',
      location: 'Global',
      postedDate: '2024-12-20',
      responses: 42,
    },
    {
      id: '7',
      type: 'need',
      company: 'Elite Custom Suits',
      title: 'Need Savile Row Canvas',
      description: 'Authentic horsehair canvas for traditional suit construction. Need small quantity for single bespoke suit.',
      quantity: '2 meters',
      material: 'Horsehair Canvas',
      location: 'Sydney, Australia',
      postedDate: '2024-12-19',
      responses: 7,
    },
  ];

  const filteredPosts = posts.filter((post) => {
    const matchesTab =
      activeTab === 'all' ||
      (activeTab === 'needs' && post.type === 'need') ||
      (activeTab === 'surplus' && post.type === 'surplus') ||
      (activeTab === 'partners' && post.type === 'partner');

    const matchesSearch =
      searchQuery === '' ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (post.material && post.material.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesTab && matchesSearch;
  });

  const getTypeIcon = (type: CommunityPost['type']) => {
    switch (type) {
      case 'need':
        return <Scissors className="w-5 h-5 text-[#7A0F0F]" />;
      case 'surplus':
        return <Sparkles className="w-5 h-5 text-[#E6C36A]" />;
      case 'partner':
        return <Users className="w-5 h-5 text-[#0B0D10]" />;
    }
  };

  const getTypeBadge = (type: CommunityPost['type']) => {
    switch (type) {
      case 'need':
        return 'bg-[#7A0F0F]/10 text-[#7A0F0F]';
      case 'surplus':
        return 'bg-[#E6C36A]/20 text-[#0B0D10]';
      case 'partner':
        return 'bg-[#0B0D10]/10 text-[#0B0D10]';
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#E5E7EB]">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="w-8 h-8 text-[#0B0D10] cursor-pointer" onClick={() => navigate('home')}>
            <Logo showText={false} />
          </div>

          <nav className="hidden md:flex items-center gap-12">
            {['Orders', 'Production', 'Materials', 'Community', 'Payments'].map((item) => (
              <button
                key={item}
                onClick={() => navigate(`tailor-${item.toLowerCase()}`)}
                className={`text-sm font-medium transition-colors tracking-wide ${
                  item === 'Community' ? 'text-[#0B0D10]' : 'text-[#9CA3AF] hover:text-[#0B0D10]'
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
        <div className="mb-12">
          <h1 className="text-5xl font-['Playfair_Display'] font-bold text-[#0B0D10] mb-4">
            Artisan Community
          </h1>
          <p className="text-[#9CA3AF] text-lg">
            Premium fabric exchange, bespoke partnerships, and craft collaboration
          </p>
        </div>

        {/* Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF]" />
            <input
              type="text"
              placeholder="Search luxury fabrics, artisan materials..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-[#E5E7EB] text-[#0B0D10] placeholder-[#9CA3AF] focus:border-[#0B0D10] focus:outline-none"
            />
          </div>
          <button className="px-6 py-3 bg-[#0B0D10] text-white hover:opacity-90 transition-opacity">
            + Post Request
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-[#E5E7EB]">
          {[
            { id: 'all', label: 'All Posts', count: posts.length },
            { id: 'needs', label: 'Material Requests', count: posts.filter((p) => p.type === 'need').length },
            { id: 'surplus', label: 'Surplus Offers', count: posts.filter((p) => p.type === 'surplus').length },
            { id: 'partners', label: 'Collaborations', count: posts.filter((p) => p.type === 'partner').length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-4 px-2 text-sm font-medium transition-colors relative flex items-center gap-2 ${
                activeTab === tab.id ? 'text-[#0B0D10]' : 'text-[#9CA3AF] hover:text-[#0B0D10]'
              }`}
            >
              {tab.label}
              <span className="text-xs px-2 py-0.5 bg-[#E5E7EB] rounded-full">{tab.count}</span>
              {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0B0D10]" />}
            </button>
          ))}
        </div>

        {/* Posts List */}
        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="border border-[#E5E7EB] hover:border-[#0B0D10] transition-colors p-6"
            >
              <div className="flex items-start gap-4">
                <div className="mt-1">{getTypeIcon(post.type)}</div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`px-3 py-1 text-xs font-medium ${getTypeBadge(post.type)}`}>
                          {post.type.toUpperCase()}
                        </span>
                        <span className="text-sm text-[#9CA3AF] italic">{post.company}</span>
                      </div>
                      <h3 className="text-xl font-['Playfair_Display'] font-bold text-[#0B0D10] mb-2">
                        {post.title}
                      </h3>
                      <p className="text-[#9CA3AF] mb-4">{post.description}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                    {post.material && (
                      <div>
                        <p className="text-[#9CA3AF] mb-1">Material</p>
                        <p className="text-[#0B0D10] font-medium">{post.material}</p>
                      </div>
                    )}
                    {post.quantity && (
                      <div>
                        <p className="text-[#9CA3AF] mb-1">Quantity</p>
                        <p className="text-[#0B0D10] font-medium">{post.quantity}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-[#9CA3AF] mb-1">Location</p>
                      <p className="text-[#0B0D10] font-medium">{post.location}</p>
                    </div>
                    <div>
                      <p className="text-[#9CA3AF] mb-1">Posted</p>
                      <p className="text-[#0B0D10] font-medium">
                        {new Date(post.postedDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-[#E5E7EB]">
                    <p className="text-sm text-[#9CA3AF]">{post.responses} responses</p>
                    <div className="flex gap-3">
                      <button className="px-4 py-2 bg-[#0B0D10] text-white text-sm font-medium hover:opacity-90 transition-opacity">
                        Respond
                      </button>
                      <button className="px-4 py-2 border border-[#E5E7EB] text-[#0B0D10] text-sm font-medium hover:border-[#0B0D10] transition-colors">
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-[#9CA3AF] text-lg">No posts found</p>
          </div>
        )}
      </div>
    </div>
  );
}
