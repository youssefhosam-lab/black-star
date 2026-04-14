import { useState } from 'react';
import { useApp } from '../../App';
import { Bell, ChevronDown, Search, Package, MessageSquare, TrendingUp } from 'lucide-react';
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

export function GarmentFactoryCommunity() {
  const { navigate, user } = useApp();
  const [activeTab, setActiveTab] = useState<'all' | 'needs' | 'surplus' | 'partners'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const posts: CommunityPost[] = [
    {
      id: '1',
      type: 'need',
      company: 'Metro Garments Ltd',
      title: 'Urgent: Need 500m Cotton Fleece',
      description: 'Looking for heavyweight cotton fleece (300gsm+) for hoodie production. Need by Dec 28. Black or dark gray preferred.',
      quantity: '500 meters',
      material: 'Cotton Fleece 300gsm',
      location: 'Istanbul, Turkey',
      postedDate: '2024-12-20',
      responses: 3,
    },
    {
      id: '2',
      type: 'surplus',
      company: 'Urban Manufacturing Co',
      title: 'Surplus: 800m Japanese Denim Available',
      description: 'High-quality 14oz Japanese selvedge denim. Indigo dye, slight irregularities but excellent for production. 40% below market price.',
      quantity: '800 meters',
      material: 'Japanese Denim 14oz',
      location: 'Osaka, Japan',
      postedDate: '2024-12-19',
      responses: 12,
    },
    {
      id: '3',
      type: 'partner',
      company: 'Precision Cut Factory',
      title: 'Looking for Long-term Production Partner',
      description: 'We specialize in pattern making and cutting. Seeking sewing factory for partnership on 5000+ unit monthly orders.',
      location: 'Dhaka, Bangladesh',
      postedDate: '2024-12-18',
      responses: 8,
    },
    {
      id: '4',
      type: 'need',
      company: 'Eco Textile Works',
      title: 'Need Organic Cotton Supplier',
      description: 'Searching for certified organic cotton jersey supplier. Regular monthly orders of 1000m+. GOTS certification required.',
      quantity: '1000+ meters/month',
      material: 'Organic Cotton Jersey',
      location: 'Berlin, Germany',
      postedDate: '2024-12-20',
      responses: 5,
    },
    {
      id: '5',
      type: 'surplus',
      company: 'FastTex Industries',
      title: 'Surplus: Polyester Lining Material',
      description: 'Overstock of polyester lining fabric. Multiple colors available. Perfect for jacket production. Must sell this month.',
      quantity: '1200 meters',
      material: 'Polyester Lining',
      location: 'Shanghai, China',
      postedDate: '2024-12-17',
      responses: 15,
    },
    {
      id: '6',
      type: 'partner',
      company: 'Green Garment Alliance',
      title: 'Join Sustainable Production Network',
      description: 'Building network of eco-conscious factories. Share resources, knowledge, and collaborate on sustainable practices.',
      location: 'Global',
      postedDate: '2024-12-21',
      responses: 24,
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
        return <Package className="w-5 h-5 text-[#7A0F0F]" />;
      case 'surplus':
        return <TrendingUp className="w-5 h-5 text-[#E6C36A]" />;
      case 'partner':
        return <MessageSquare className="w-5 h-5 text-[#0B0D10]" />;
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
                onClick={() => navigate(`garment-factory-${item.toLowerCase()}`)}
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
            Production Community
          </h1>
          <p className="text-[#9CA3AF] text-lg">
            B2B material exchange, surplus trading, and factory partnerships
          </p>
        </div>

        {/* Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF]" />
            <input
              type="text"
              placeholder="Search materials, companies, or locations..."
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
            { id: 'needs', label: 'Material Needs', count: posts.filter((p) => p.type === 'need').length },
            { id: 'surplus', label: 'Surplus Offers', count: posts.filter((p) => p.type === 'surplus').length },
            { id: 'partners', label: 'Partnerships', count: posts.filter((p) => p.type === 'partner').length },
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
                        <span className="text-sm text-[#9CA3AF]">{post.company}</span>
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
