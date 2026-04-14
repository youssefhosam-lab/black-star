import React, { useState, useEffect } from 'react';
import { useApp } from '../../App';
import { motion } from 'motion/react';
import { Bell, ChevronDown, Package, Factory, Users, TrendingUp, FileText } from 'lucide-react';
import brandTeamImage from 'figma:asset/0508c27cda538fbd1bc932cec7d21db02e825591.png';

// --- Brand Data ---
const brandData = {
  name: 'BLACK STAR',
  subline: 'Local Brand • Black Star Platform',
  collections: {
    active: 8,
    draft: 3
  },
  production: {
    activeManufacturers: 4,
    jobsInProgress: 12
  },
  models: {
    hired: 6,
    pendingRequests: 2
  }
};

const activeProductions = [
  {
    id: '1',
    manufacturer: 'Luxe Manufacture Cairo',
    status: 'Sewing',
    progress: 75,
    collection: 'Midnight Collection'
  },
  {
    id: '2',
    manufacturer: 'Artisan Textiles',
    status: 'Cutting',
    progress: 45,
    collection: 'Desert Series'
  },
  {
    id: '3',
    manufacturer: 'Elite Garments Co.',
    status: 'Printing',
    progress: 60,
    collection: 'Urban Edge'
  }
];

const pendingDecisions = [
  {
    id: '1',
    type: 'model',
    title: 'Model Request: Ahmed K.',
    details: 'For Midnight Collection shoot - Jan 28',
    urgent: true
  },
  {
    id: '2',
    type: 'quote',
    title: 'Manufacturer Quote',
    details: 'Fabric Innovations - 500 units @ EGP 42/unit',
    urgent: false
  },
  {
    id: '3',
    type: 'model',
    title: 'Model Request: Layla M.',
    details: 'For Desert Series campaign',
    urgent: false
  }
];

const communityFeed = [
  {
    id: '1',
    type: 'update',
    author: 'Production Team',
    content: 'Midnight Collection samples approved. Moving to full production.',
    timestamp: '2 hours ago',
    hasFile: true
  },
  {
    id: '2',
    type: 'design',
    author: 'Design Lead',
    content: 'New color palette uploaded for Spring 2025. Review needed.',
    timestamp: '5 hours ago',
    hasFile: true
  },
  {
    id: '3',
    type: 'production',
    author: 'Quality Assurance',
    content: 'Minor adjustments needed on sleeve lengths. Call scheduled tomorrow 10am.',
    timestamp: '1 day ago',
    hasFile: false
  }
];

// --- Components ---

const Header = ({ currentPage }: { currentPage: string }) => {
  const { navigate, setUser } = useApp();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 h-[72px] bg-[#0B0D10] z-50">
      <div className="h-full max-w-[1600px] mx-auto px-8 flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-3">
          <div className="size-8 bg-white flex items-center justify-center">
            <span className="text-[#0B0D10] text-xs font-semibold">★</span>
          </div>
          <span className="text-white text-sm tracking-wide">BLACK STAR</span>
        </div>

        {/* Center Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={() => navigate('brand-dashboard')}
            className={`text-xs uppercase tracking-[0.1em] text-white transition-all ${
              currentPage === 'dashboard' 
                ? 'border-b-2 border-[#E6C36A] pb-1' 
                : 'hover:text-[#E6C36A]'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => navigate('studio-entry')}
            className={`text-xs uppercase tracking-[0.1em] text-white transition-all ${
              currentPage === 'collections' 
                ? 'border-b-2 border-[#E6C36A] pb-1' 
                : 'hover:text-[#E6C36A]'
            }`}
          >
            Studio
          </button>
          <button
            onClick={() => navigate('brand-community')}
            className={`text-xs uppercase tracking-[0.1em] text-white transition-all ${
              currentPage === 'community' 
                ? 'border-b-2 border-[#E6C36A] pb-1' 
                : 'hover:text-[#E6C36A]'
            }`}
          >
            Community
          </button>
          <button
            onClick={() => navigate('brand-production')}
            className={`text-xs uppercase tracking-[0.1em] text-white transition-all ${
              currentPage === 'production' 
                ? 'border-b-2 border-[#E6C36A] pb-1' 
                : 'hover:text-[#E6C36A]'
            }`}
          >
            Production
          </button>
          <button
            onClick={() => navigate('models-directory')}
            className={`text-xs uppercase tracking-[0.1em] text-white transition-all ${
              currentPage === 'models' 
                ? 'border-b-2 border-[#E6C36A] pb-1' 
                : 'hover:text-[#E6C36A]'
            }`}
          >
            Models
          </button>
        </nav>

        {/* Right */}
        <div className="flex items-center gap-6">
          <button className="relative text-white hover:text-[#E6C36A] transition-colors">
            <Bell className="size-5" />
            <span className="absolute -top-1 -right-1 size-2 bg-[#E6C36A] rounded-full" />
          </button>
          
          <div className="relative">
            <button 
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 text-white hover:text-[#E6C36A] transition-colors"
            >
              <div className="size-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-[#0B0D10] text-xs font-semibold">BS</span>
              </div>
              <ChevronDown className="size-4" />
            </button>

            {showProfileMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 top-12 w-48 bg-white border border-[#E5E7EB] shadow-lg"
              >
                <button className="w-full px-4 py-3 text-left text-xs uppercase tracking-wide hover:bg-[#FAFAFA] transition-colors">
                  Settings
                </button>
                <button 
                  onClick={() => {
                    setUser(null);
                    navigate('welcome');
                  }}
                  className="w-full px-4 py-3 text-left text-xs uppercase tracking-wide hover:bg-[#FAFAFA] transition-colors border-t border-[#E5E7EB]"
                >
                  Logout
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

const BrandIdentityHero = () => {
  const [typedText, setTypedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [showSubline, setShowSubline] = useState(false);
  const fullText = brandData.name;

  useEffect(() => {
    let currentIndex = 0;
    
    const typeInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setTypedText(fullText.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => {
          setShowCursor(false);
          setShowSubline(true);
        }, 300);
      }
    }, 120);

    return () => clearInterval(typeInterval);
  }, []);

  return (
    <section 
      className="relative bg-white flex items-center justify-center overflow-hidden" 
      style={{ height: '100vh' }}
    >
      {/* Full-width brand team image with blur animation */}
      <motion.div 
        className="absolute inset-0 w-full h-full"
        initial={{ opacity: 0, filter: 'blur(40px)' }}
        animate={{ 
          opacity: [0, 1, 1],
          filter: ['blur(40px)', 'blur(40px)', 'blur(0px)']
        }}
        transition={{ 
          duration: 2.4,
          times: [0, 0.3, 1],
          ease: 'easeOut'
        }}
      >
        <img 
          src={brandTeamImage}
          alt="Brand Team"
          className="w-full h-full object-cover object-center grayscale contrast-125 brightness-110"
        />
      </motion.div>

      {/* Stillness pause (400ms) before text appears */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0 }}
        className="relative z-10 text-center"
      >
        {/* Handwritten brand name with ink-style animation */}
        <div className="flex items-center justify-center gap-2">
          <h1 
            className="font-['Playfair_Display'] text-[clamp(4rem,10vw,7.5rem)] tracking-tight text-white"
            style={{ 
              textShadow: '0 0 40px rgba(0, 0, 0, 0.9), 0 0 20px rgba(0, 0, 0, 0.7), 2px 2px 8px rgba(0, 0, 0, 0.5)'
            }}
          >
            {typedText.split('').map((letter, index) => (
              <motion.span
                key={index}
                initial={{ 
                  opacity: 0,
                  y: -8,
                  scaleY: 0.3,
                  scaleX: 1.1,
                  filter: 'blur(4px) brightness(1.3) saturate(0.8)'
                }}
                animate={{ 
                  opacity: [0, 0.4, 0.7, 1, 1],
                  y: [-8, -4, 0, 0, 0],
                  scaleY: [0.3, 0.6, 0.9, 1.05, 1],
                  scaleX: [1.1, 1.05, 1, 0.98, 1],
                  filter: [
                    'blur(4px) brightness(1.3) saturate(0.8)',
                    'blur(2px) brightness(1.2) saturate(0.9)',
                    'blur(1px) brightness(1.1) saturate(1)',
                    'blur(0.5px) brightness(1.05) saturate(1)',
                    'blur(0px) brightness(1) saturate(1)'
                  ]
                }}
                transition={{ 
                  duration: 0.45,
                  delay: index * 0.12,
                  times: [0, 0.25, 0.5, 0.75, 1],
                  ease: [0.22, 0.61, 0.36, 1]
                }}
                className="inline-block origin-bottom"
                style={{
                  filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.15))',
                  transformOrigin: 'bottom center'
                }}
              >
                {letter === ' ' ? '\u00A0' : letter}
              </motion.span>
            ))}
          </h1>
          {showCursor && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
              className="inline-block w-1 h-24 bg-[#0B0B0B] ml-2"
              style={{ 
                textShadow: '0 0 20px rgba(255, 255, 255, 0.6)'
              }}
            />
          )}
        </div>

        {showSubline && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mt-6"
          >
            <p 
              className="text-sm uppercase tracking-[0.2em] text-[#0B0B0B]"
              style={{ 
                textShadow: '0 0 30px rgba(255, 255, 255, 0.8), 0 0 15px rgba(255, 255, 255, 0.6)'
              }}
            >
              {brandData.subline}
            </p>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};

const BrandControlPanel = () => {
  const { navigate } = useApp();

  const cards = [
    {
      title: 'Collections',
      icon: Package,
      stats: [
        { label: 'Active Collections', value: brandData.collections.active },
        { label: 'Drafts', value: brandData.collections.draft }
      ],
      cta: 'View Collections',
      ctaAction: () => navigate('brand-collections')
    },
    {
      title: 'Production',
      icon: Factory,
      stats: [
        { label: 'Active Manufacturers', value: brandData.production.activeManufacturers },
        { label: 'Jobs in Progress', value: brandData.production.jobsInProgress }
      ],
      cta: 'View Production',
      ctaAction: () => navigate('brand-production')
    },
    {
      title: 'Models',
      icon: Users,
      stats: [
        { label: 'Models Hired', value: brandData.models.hired },
        { label: 'Pending Requests', value: brandData.models.pendingRequests }
      ],
      cta: 'View Models',
      ctaAction: () => navigate('models-directory')
    }
  ];

  return (
    <div className="space-y-4">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            whileHover={{ y: -4, boxShadow: '0 8px 20px rgba(0,0,0,0.08)' }}
            className="bg-white border border-[#E5E7EB] p-6 transition-all cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-['Playfair_Display'] text-[#0B0D10] mb-4">{card.title}</h3>
                <div className="space-y-2">
                  {card.stats.map((stat) => (
                    <div key={stat.label} className="flex items-center justify-between">
                      <span className="text-xs uppercase tracking-wide text-[#6B7280]">{stat.label}</span>
                      <span className="text-2xl font-semibold text-[#0B0D10] text-left px-[30px] py-[0px]">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <Icon className="size-8 text-[#6B7280] group-hover:text-[#E6C36A] transition-colors" />
            </div>
            
            <div className="pt-4 border-t border-[#E5E7EB]">
              <button 
                onClick={card.ctaAction}
                className="text-xs uppercase tracking-wide text-[#0B0D10] hover:text-[#E6C36A] transition-colors flex items-center gap-2"
              >
                {card.cta}
                <span>→</span>
              </button>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

const ActivityStatus = () => {
  return (
    <div className="space-y-6">
      {/* Active Productions */}
      <div>
        <h3 className="text-xl font-['Playfair_Display'] text-[#0B0D10] mb-4">Active Productions</h3>
        <div className="space-y-4">
          {activeProductions.map((prod) => (
            <motion.div
              key={prod.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white border border-[#E5E7EB] p-4"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-sm font-medium text-[#0B0D10]">{prod.manufacturer}</p>
                  <p className="text-xs text-[#6B7280] mt-1">{prod.collection}</p>
                </div>
                <span className="px-2 py-1 text-[9px] uppercase tracking-wide bg-[#E6C36A]/10 text-[#E6C36A] border border-[#E6C36A]/20">
                  {prod.status}
                </span>
              </div>
              <div className="relative">
                <div className="w-full h-1.5 bg-[#E5E7EB] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${prod.progress}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="h-full bg-[#0B0D10] rounded-full"
                  />
                </div>
                <span className="text-xs text-[#6B7280] mt-1 block">{prod.progress}% Complete</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Pending Decisions */}
      <div>
        <h3 className="text-xl font-['Playfair_Display'] text-[#0B0D10] mb-4">Pending Decisions</h3>
        <div className="space-y-3">
          {pendingDecisions.map((decision) => (
            <motion.div
              key={decision.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white border border-[#E5E7EB] p-4 hover:border-[#E6C36A] transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-[#0B0D10] mb-1">{decision.title}</p>
                  <p className="text-xs text-[#6B7280]">{decision.details}</p>
                </div>
                {decision.urgent && (
                  <span className="size-2 bg-red-500 rounded-full flex-shrink-0 mt-1.5 ml-2" />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const PrivateCommunity = () => {
  const { navigate } = useApp();

  return (
    <section className="bg-[#FAFAFA] border-t border-[#E5E7EB] py-12">
      <div className="max-w-[1600px] mx-auto px-8">
        <div className="mb-8">
          <h2 className="text-3xl font-['Playfair_Display'] text-[#0B0D10] mb-2">Brand Community</h2>
          <p className="text-sm text-[#6B7280]">Internal coordination • Private to your team only</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {communityFeed.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-[#E5E7EB] p-6"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-xs uppercase tracking-wide text-[#6B7280] mb-1">{post.type}</p>
                  <p className="text-sm font-medium text-[#0B0D10]">{post.author}</p>
                </div>
                {post.hasFile && (
                  <FileText className="size-4 text-[#6B7280]" />
                )}
              </div>
              <p className="text-sm text-[#0B0D10] mb-3 leading-relaxed">{post.content}</p>
              <p className="text-xs text-[#6B7280]">{post.timestamp}</p>
            </motion.div>
          ))}
        </div>

        <button
          onClick={() => navigate('brand-community')}
          className="w-full bg-[#0B0D10] text-white py-4 text-xs uppercase tracking-[0.15em] hover:bg-black transition-colors"
        >
          Enter Community
        </button>
      </div>
    </section>
  );
};

export function BrandDashboard() {
  return (
    <div className="min-h-screen bg-white">
      <Header currentPage="dashboard" />
      
      <div className="pt-[72px]">
        <BrandIdentityHero />
        
        <main className="max-w-[1600px] mx-auto px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-[35%_65%] gap-8 mb-12">
            {/* Left Column - Brand Control Panel */}
            <div>
              <h2 className="text-2xl font-['Playfair_Display'] text-[#0B0D10] mb-6">Brand Controls</h2>
              <BrandControlPanel />
            </div>

            {/* Right Column - Activity Status */}
            <div>
              <h2 className="text-2xl font-['Playfair_Display'] text-[#0B0D10] mb-6">Activity Status</h2>
              <ActivityStatus />
            </div>
          </div>
        </main>

        <PrivateCommunity />
      </div>
    </div>
  );
}