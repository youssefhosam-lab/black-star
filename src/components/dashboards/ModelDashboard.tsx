import React, { useState, useEffect } from 'react';
import { useApp } from '../../App';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bell, User, ChevronDown, Star, TrendingUp
} from 'lucide-react';
import Logo from '../../imports/Logo';

// --- Types ---
interface JobOffer {
  id: string;
  brand: string;
  jobType: string;
  payment: number;
  deadline: string;
  status: 'pending' | 'active';
}

// --- Header Component ---
const ModelHeader = ({ activePage }: { activePage: string }) => {
  const { navigate, user, setUser } = useApp();
  const [showDropdown, setShowDropdown] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    setHeaderVisible(true);
  }, []);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', route: 'home' },
    { id: 'portfolio', label: 'Portfolio', route: 'model-portfolio' },
    { id: 'orders', label: 'Orders', route: 'model-orders' },
    { id: 'analytics', label: 'Analytics', route: 'model-analytics' },
    { id: 'ranking', label: 'Ranking', route: 'model-ranking' },
  ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: headerVisible ? 1 : 0, y: headerVisible ? 0 : -20 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 h-20 bg-white/95 backdrop-blur-sm z-50 border-b border-gray-200"
    >
      <div className="h-full px-12 flex items-center justify-between max-w-[2000px] mx-auto">
        {/* Left: Logo */}
        <div className="w-10 h-10 text-black">
          <Logo showText={false} />
        </div>

        {/* Center: Navigation */}
        <nav className="hidden md:flex items-center gap-12">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => navigate(item.route)}
              className="relative group"
            >
              <span className="text-xs uppercase tracking-[0.15em] text-black transition-colors">
                {item.label}
              </span>
              <motion.div
                className="absolute -bottom-1 left-0 right-0 h-[1px] bg-black"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: activePage === item.id ? 1 : 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              />
            </button>
          ))}
        </nav>

        {/* Right: Notifications & Profile */}
        <div className="flex items-center gap-6">
          {/* Notification */}
          <button className="relative group">
            <Bell className="size-5 text-black transition-transform group-hover:scale-110" />
            <span className="absolute -top-1 -right-1 size-2 bg-black rounded-full" />
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-3 group"
            >
              <div className="size-10 rounded-full bg-gray-200 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1643743323468-1e018b621231?w=100&h=100&fit=crop"
                  alt="Profile"
                  className="w-full h-full object-cover filter grayscale"
                />
              </div>
              <ChevronDown className="size-4 text-gray-400 transition-transform group-hover:translate-y-0.5" />
            </button>

            {showDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 top-14 w-48 bg-white border border-gray-200 shadow-xl"
              >
                <button className="w-full px-6 py-4 text-left text-xs uppercase tracking-wide hover:bg-gray-50 transition-colors">
                  Settings
                </button>
                <button
                  onClick={() => {
                    setUser(null);
                    navigate('welcome');
                    setShowDropdown(false);
                  }}
                  className="w-full px-6 py-4 text-left text-xs uppercase tracking-wide hover:bg-gray-50 transition-colors border-t border-gray-100"
                >
                  Logout
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
};

// --- Hero Image Section with Color Transition ---
const HeroImageSection = () => {
  const { user } = useApp();
  const [isHovered, setIsHovered] = useState(false);
  const modelName = user?.name || "Model Name";
  const [displayedName, setDisplayedName] = useState("");
  const [nameComplete, setNameComplete] = useState(false);

  // Typing animation effect
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= modelName.length) {
        setDisplayedName(modelName.slice(0, index));
        index++;
      } else {
        setNameComplete(true);
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[40vh] overflow-hidden mt-20">
      <motion.div
        className="w-full h-full relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.img
          src="https://images.unsplash.com/photo-1643743323468-1e018b621231?w=2000&h=1000&fit=crop"
          alt="Model Hero"
          className="w-full h-full object-cover object-center transition-all duration-[600ms] ease-in-out"
          style={{
            filter: isHovered ? 'grayscale(0%)' : 'grayscale(100%)',
          }}
        />

        {/* Name Overlay - Bottom Left */}
        <div className="absolute bottom-12 left-12 z-10">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-['Playfair_Display'] text-white mb-2"
              style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.3)' }}>
            {displayedName}
            {!nameComplete && <span className="animate-pulse">|</span>}
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: nameComplete ? 1 : 0 }}
            transition={{ duration: 0.6 }}
            className="text-sm uppercase tracking-[0.2em] text-white/90"
            style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.5)' }}
          >
            Black Star Model
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};

// --- Ranking Card (Right Sidebar) ---
const BlackStarRankingCard = () => {
  const currentRank = 12;
  const starFillLevel = 0.72; // 72% filled

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
      className="bg-white border border-gray-200 p-8 sticky top-28"
    >
      {/* Title */}
      <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-8">
        Black Star Ranking
      </p>

      {/* Rank Number */}
      <div className="mb-8">
        <div className="flex items-baseline gap-3 mb-2">
          <span className="text-7xl font-['Playfair_Display'] text-black">#{currentRank}</span>
        </div>
        <p className="text-sm text-gray-500">Current Position</p>
      </div>

      {/* Star Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-2">
          <div className="relative w-16 h-16">
            {/* Background star (empty) */}
            <Star className="absolute inset-0 w-full h-full text-gray-200" />
            {/* Filled star (clipped) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - starFillLevel * 100}% 0 0)` }}
            >
              <Star className="w-full h-full text-black fill-black" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-['Playfair_Display']">{Math.round(starFillLevel * 100)}%</p>
            <p className="text-xs text-gray-400 uppercase tracking-wide">Progress</p>
          </div>
        </div>
      </div>

      {/* Motivational Line */}
      <div className="pt-6 border-t border-gray-200">
        <p className="text-sm italic font-['Playfair_Display'] text-gray-600">
          You're rising. Keep moving.
        </p>
      </div>

      {/* View Full Ranking Button */}
      <button className="w-full mt-6 py-3 border border-black text-xs uppercase tracking-[0.15em] hover:bg-black hover:text-white transition-all duration-300">
        View Full Ranking
      </button>
    </motion.div>
  );
};

// --- Active Jobs Brief ---
const ActiveJobsBrief = () => {
  const jobs: JobOffer[] = [
    { id: '1', brand: 'Vogue Arabia', jobType: 'Editorial Shoot', payment: 45000, deadline: 'Jan 15, 2025', status: 'active' },
    { id: '2', brand: 'Dior Men', jobType: 'Campaign', payment: 38000, deadline: 'Jan 22, 2025', status: 'active' },
  ];

  return (
    <section className="mb-[140px]">
      <h2 className="text-3xl font-['Playfair_Display'] mb-8 text-black">Active Jobs</h2>
      
      <div className="space-y-4">
        {jobs.map((job, index) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="bg-white border border-gray-200 p-6 hover:border-black transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-['Playfair_Display'] mb-1">{job.brand}</h3>
                <p className="text-sm text-gray-500">{job.jobType}</p>
              </div>
              <span className="text-xs uppercase tracking-wide px-3 py-1 bg-black text-white">
                {job.status}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-400 mb-1">Payment</p>
                <p className="text-black">EGP {job.payment.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-400 mb-1">Deadline</p>
                <p className="text-black">{job.deadline}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <button className="w-full mt-6 py-4 border border-gray-300 text-xs uppercase tracking-[0.15em] hover:border-black transition-all duration-300">
        View All Orders
      </button>
    </section>
  );
};

// --- New Orders ---
const NewOrders = () => {
  const [orders, setOrders] = useState<JobOffer[]>([
    { id: '3', brand: 'GQ Middle East', jobType: 'Cover Shoot', payment: 52000, deadline: 'Feb 5, 2025', status: 'pending' },
  ]);

  const handleAccept = (id: string) => {
    setOrders(prev => prev.filter(o => o.id !== id));
  };

  const handleReject = (id: string) => {
    setOrders(prev => prev.filter(o => o.id !== id));
  };

  return (
    <section className="mb-[140px]">
      <h2 className="text-3xl font-['Playfair_Display'] mb-8 text-black">New Orders</h2>
      
      <div className="space-y-4">
        <AnimatePresence>
          {orders.length > 0 ? (
            orders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="bg-white border-2 border-black p-6"
              >
                <div className="mb-6">
                  <h3 className="text-2xl font-['Playfair_Display'] mb-1">{order.brand}</h3>
                  <p className="text-sm text-gray-500">{order.jobType}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-gray-200 text-sm">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-gray-400 mb-1">Payment</p>
                    <p className="text-black">EGP {order.payment.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-gray-400 mb-1">Deadline</p>
                    <p className="text-black">{order.deadline}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAccept(order.id)}
                    className="flex-1 bg-black text-white py-4 text-xs uppercase tracking-[0.15em] transition-all duration-300"
                  >
                    Accept
                  </motion.button>
                  <button
                    onClick={() => handleReject(order.id)}
                    className="px-8 text-xs uppercase tracking-[0.15em] text-gray-500 hover:text-black transition-colors"
                  >
                    Reject
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="p-16 border border-dashed border-gray-300 text-center">
              <p className="text-gray-400 text-sm uppercase tracking-wide">No new orders</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

// --- Analytics Preview ---
const AnalyticsPreview = () => {
  const stats = [
    { label: 'Total Earnings', value: 'EGP 485,000', subtext: 'This year' },
    { label: 'Completed Jobs', value: '24', subtext: 'Last 6 months' },
    { label: 'Average Rating', value: '4.8/5', subtext: 'From brands' },
  ];

  return (
    <section className="mb-[140px]">
      <h2 className="text-3xl font-['Playfair_Display'] mb-8 text-black">Analytics Preview</h2>
      
      <div className="grid grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="bg-white border border-gray-200 p-6"
          >
            <p className="text-xs uppercase tracking-wide text-gray-400 mb-3">{stat.label}</p>
            <p className="text-4xl font-['Playfair_Display'] mb-1">{stat.value}</p>
            <p className="text-xs text-gray-500">{stat.subtext}</p>
          </motion.div>
        ))}
      </div>

      <button className="w-full py-4 border border-gray-300 text-xs uppercase tracking-[0.15em] hover:border-black transition-all duration-300">
        View Full Analytics
      </button>
    </section>
  );
};

// --- Main Dashboard ---
export function ModelDashboard() {
  return (
    <div className="min-h-screen bg-white text-black">
      <ModelHeader activePage="dashboard" />
      <HeroImageSection />
      
      <main className="max-w-[1800px] mx-auto px-12 py-[140px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left Column - Main Content */}
          <div className="lg:col-span-8">
            <ActiveJobsBrief />
            <NewOrders />
            <AnalyticsPreview />
          </div>

          {/* Right Column - Ranking */}
          <div className="hidden lg:block lg:col-span-4">
            <BlackStarRankingCard />
          </div>

        </div>
      </main>
    </div>
  );
}