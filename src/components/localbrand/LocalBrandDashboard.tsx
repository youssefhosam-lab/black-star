import React, { useState, useEffect } from 'react';
import { useApp } from '../../App';
import { motion } from 'motion/react';
import { TrendingUp, TrendingDown, Palette } from 'lucide-react';
import { LocalBrandHeader } from './LocalBrandHeader';

// Star Icon Component
const StarIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 224 184" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M143.719 110.121C156.233 101.407 171.96 95.7044 189.287 94.385L223.521 91.7763L189.287 89.1675C171.96 87.8479 156.243 82.1452 143.719 73.4316L190.782 26.8837L134.096 65.5295C123.485 55.2537 116.54 42.339 114.933 28.1123L111.756 4.76837e-07L108.579 28.1123C106.972 42.339 100.027 55.2461 89.416 65.5295L32.7299 26.8837L79.7927 73.4316C67.2789 82.1452 51.5514 87.8479 34.2351 89.1675L1.04308e-07 91.7763L34.2351 94.385C51.5607 95.7044 67.2789 101.415 79.7927 110.121L32.7299 156.669L89.416 118.023C100.027 128.299 106.972 141.214 108.579 155.433L111.756 183.545L114.933 155.433C116.54 141.206 123.494 128.299 134.096 118.023L190.782 156.669L143.719 110.121Z" 
      fill="currentColor"
    />
  </svg>
);

// Typing Animation Component (only first load)
const TypingText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasTyped, setHasTyped] = useState(false);

  useEffect(() => {
    // Check if already typed
    const typed = sessionStorage.getItem('brandNameTyped');
    if (typed) {
      setDisplayedText(text);
      setHasTyped(true);
      return;
    }

    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay + (currentIndex * 40));
      return () => clearTimeout(timeout);
    } else if (currentIndex === text.length) {
      sessionStorage.setItem('brandNameTyped', 'true');
      setHasTyped(true);
    }
  }, [currentIndex, text, delay]);

  return <>{displayedText}</>;
};

// Header Component
const Header = ({ brandName }: { brandName: string }) => {
  const { navigate, setUser } = useApp();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [notificationCount] = useState(3);

  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'studio', label: 'Studio' },
    { id: 'models', label: 'Models' },
    { id: 'process', label: 'Process' },
    { id: 'orders', label: 'Orders' },
    { id: 'analytics', label: 'Analytics' },
  ];

  return (
    <header className="bg-[#F7F7F5] border-b border-[#E6E6E3] sticky top-0 z-50">
      <div className="container mx-auto px-6 bg-[rgb(250,250,250)]">
        <div className="flex items-center justify-between h-16">
          {/* Left - Logo + Brand Name */}
          <div className="flex items-center gap-3 bg-[rgba(0,0,0,0)]">
            <StarIcon className="w-6 h-6 text-[#111111]" />
            <span className="text-sm uppercase tracking-wider font-['Inter_Tight'] text-[rgb(0,0,0)]">
              <TypingText text={brandName} delay={100} />
            </span>
          </div>

          {/* Center - Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  if (tab.id === 'studio') {
                    navigate('studio-select-garment');
                  } else if (tab.id !== 'dashboard') {
                    navigate(`localbrand-${tab.id}`);
                  }
                }}
                className={`px-4 py-2 text-sm uppercase tracking-wider transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'text-[#0B0B0B] border-b-2 border-[#111111]'
                    : 'text-[#6E6E6E] hover:text-[#0B0B0B]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Right - Notifications + Avatar */}
          <div className="flex items-center gap-4">
            {/* Notification Bell */}
            <button className="relative p-2 hover:bg-[#111111]/5 rounded-full transition-colors">
              <Bell className="w-5 h-5 text-[#111111]" />
              {notificationCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#0B0B0B] text-white text-xs flex items-center justify-center rounded-full font-['IBM_Plex_Mono']">
                  {notificationCount}
                </span>
              )}
            </button>

            {/* Avatar Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="w-8 h-8 rounded-full bg-[#111111] text-white flex items-center justify-center text-sm hover:opacity-80 transition-opacity"
              >
                BS
              </button>

              {showUserMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 top-12 w-48 bg-white border border-[#E6E6E3] shadow-lg"
                >
                  <button
                    onClick={() => navigate('localbrand-settings')}
                    className="w-full px-4 py-3 text-left hover:bg-[#F7F7F5] flex items-center gap-2 text-sm bg-[rgb(0,0,0)] text-[14px] text-[rgba(255,255,255,0.71)]"
                  >
                    <Settings className="w-4 h-4" />
                    Settings
                  </button>
                  <button
                    onClick={() => {
                      setUser(null);
                      navigate('welcome');
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-[#F7F7F5] flex items-center gap-2 text-sm border-t border-[#E6E6E3] text-[rgb(0,0,0)]"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

// Hero Section with Team Photo
const HeroSection = ({ brandName }: { brandName: string }) => {
  const [colorProgress, setColorProgress] = useState(100);

  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setColorProgress(prev => {
          if (prev <= 0) {
            clearInterval(interval);
            return 0;
          }
          return prev - 2;
        });
      }, 24);
      return () => clearInterval(interval);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-[500px]">
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center overflow-hidden"
        onMouseEnter={() => setColorProgress(100)}
        onMouseLeave={() => setColorProgress(0)}
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1758613654311-32525f489a0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwdGVhbSUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NjY4NzgwNTZ8MA&ixlib=rb-4.1.0&q=80&w=1080)',
          filter: `grayscale(${100 - colorProgress}%)`,
          transition: 'filter 800ms cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/70 via-[#0B0B0B]/40 to-transparent" />
      
      {/* Brand Name Overlaid on Photo */}
      <div className="absolute inset-0 flex items-end">
        <div className="container mx-auto px-6 py-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-5xl font-['Inter_Tight'] tracking-tight text-white"
          >
            <TypingText text={brandName} delay={500} />
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.5 }}
            className="text-white/80 mt-2 tracking-wide"
          >
            Fashion without illusion
          </motion.p>
        </div>
      </div>
    </div>
  );
};

// Stat Card Component
const StatCard = ({ 
  title, 
  value, 
  trend, 
  trendValue,
  delay = 0 
}: { 
  title: string; 
  value: number | string; 
  trend?: 'up' | 'down'; 
  trendValue?: string;
  delay?: number;
}) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (typeof value === 'number') {
      const duration = 1000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setDisplayValue(value);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.3 } }}
      className="bg-white p-6 border border-[#E6E6E3] hover:border-[#5B7C99] transition-all duration-300 cursor-pointer"
    >
      <p className="text-sm uppercase tracking-wider text-[#6E6E6E] mb-2">{title}</p>
      <div className="flex items-end justify-between">
        <p className="text-4xl font-['IBM_Plex_Mono'] text-[#0B0B0B]">
          {typeof value === 'number' ? displayValue : value}
        </p>
        {trend && trendValue && (
          <div className={`flex items-center gap-1 ${trend === 'up' ? 'text-[#0B0B0B]' : 'text-[#5B7C99]'}`}>
            {trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            <span className="text-sm font-['IBM_Plex_Mono']">{trendValue}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

// Quick Action Card Component
const QuickActionCard = ({ 
  icon: Icon, 
  title, 
  description, 
  onClick,
  delay = 0 
}: { 
  icon: any;
  title: string; 
  description: string; 
  onClick: () => void;
  delay?: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      onClick={onClick}
      className="bg-white border border-[#E6E6E3] p-8 hover:border-[#111111] transition-colors cursor-pointer group"
    >
      <Icon className="w-8 h-8 text-[#111111] mb-4" />
      <h3 className="text-xl font-['Inter_Tight'] text-[#0B0B0B] mb-2">{title}</h3>
      <p className="text-sm text-[#6E6E6E] leading-relaxed">{description}</p>
      <button className="mt-6 text-sm uppercase tracking-wider text-[#111111] group-hover:translate-x-2 transition-transform inline-block">
        →
      </button>
    </motion.div>
  );
};

// Community Panel Component
const CommunityPanel = () => {
  const posts = [
    { id: 1, pinned: true, author: 'Black Star Team', content: 'New manufacturer quality standards are now live. All active orders will be reviewed.', time: '2h ago' },
    { id: 2, author: 'Dark Matter Co', content: 'Looking for collaboration on winter collection. DM if interested.', time: '5h ago' },
    { id: 3, author: 'Steel Thread', content: 'Just completed 10th successful order. The process page is a game changer.', time: '1d ago' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="bg-white border border-[#E6E6E3] h-full"
    >
      <div className="p-6 border-b border-[#E6E6E3]">
        <p className="text-sm uppercase tracking-wider text-[#0B0B0B]">Community</p>
      </div>
      <div className="overflow-y-auto max-h-[600px]">
        {posts.map((post, index) => (
          <div
            key={post.id}
            className={`p-6 hover:bg-[#F7F7F5] transition-colors cursor-pointer ${
              index !== posts.length - 1 ? 'border-b border-[#E6E6E3]/50' : ''
            } ${post.pinned ? 'bg-[#F7F7F5]/50' : ''}`}
          >
            {post.pinned && (
              <span className="text-xs uppercase tracking-wider text-[#5B7C99] mb-2 block">Pinned</span>
            )}
            <p className="text-sm text-[#0B0B0B] mb-1">{post.author}</p>
            <p className="text-sm text-[#6E6E6E] leading-relaxed mb-2">{post.content}</p>
            <p className="text-xs text-[#6E6E6E]/70 font-['IBM_Plex_Mono']">{post.time}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

// Main Component
export function LocalBrandDashboard() {
  const { navigate, user } = useApp();
  const brandName = user?.brandName || user?.name || 'BLACKSTAR STUDIO';

  return (
    <div className="min-h-screen bg-[#F7F7F5]">
      <LocalBrandHeader activePage="dashboard" />
      <HeroSection brandName={brandName} />
      
      {/* Main Content */}
      <div className="container mx-auto px-6 py-12 bg-[rgb(250,250,250)]">
        <div className="max-w-7xl mx-auto">
          {/* Stats Row */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <StatCard title="New Orders" value={12} trend="up" trendValue="+3" delay={0} />
            <StatCard title="Active Orders" value={8} delay={0.1} />
          </div>

          {/* Production Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -4, transition: { duration: 0.3 } }}
            className="bg-white p-6 border border-[#E6E6E3] hover:border-[#5B7C99] transition-all duration-300 cursor-pointer mb-6"
          >
            <p className="text-sm uppercase tracking-wider text-[#6E6E6E] mb-4">Production Status</p>
            <div className="space-y-4">
              {[
                { manufacturer: 'Nova Textiles', progress: 75 },
                { manufacturer: 'Steel Thread Factory', progress: 45 },
                { manufacturer: 'Dark Matter Print', progress: 90 },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-[#0B0B0B]">{item.manufacturer}</span>
                    <span className="text-sm font-['IBM_Plex_Mono'] text-[#6E6E6E]">{item.progress}%</span>
                  </div>
                  <div className="w-full h-1 bg-[#E6E6E3]">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.progress}%` }}
                      transition={{ duration: 1, delay: 0.5 + (i * 0.1), ease: [0.22, 1, 0.36, 1] }}
                      className="h-full bg-[#5B7C99]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Analytics Snapshot */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -4, transition: { duration: 0.3 } }}
            className="bg-white p-6 border border-[#E6E6E3] hover:border-[#5B7C99] transition-all duration-300 cursor-pointer mb-6"
          >
            <p className="text-sm uppercase tracking-wider text-[#6E6E6E] mb-4">Analytics Snapshot</p>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-[#6E6E6E] mb-1">Revenue</p>
                <p className="text-3xl font-['IBM_Plex_Mono'] text-[#0B0B0B]">$24.5K</p>
              </div>
              <div>
                <p className="text-sm text-[#6E6E6E] mb-1">Completion Rate</p>
                <p className="text-3xl font-['IBM_Plex_Mono'] text-[#0B0B0B]">94%</p>
              </div>
            </div>
          </motion.div>

          {/* Quick Action Card */}
          <QuickActionCard
            icon={Palette}
            title="Design Studio"
            description="Create new garment designs"
            onClick={() => navigate('localbrand-studio')}
            delay={0.1}
          />
        </div>
      </div>
    </div>
  );
}