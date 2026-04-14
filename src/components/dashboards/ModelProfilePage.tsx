import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../App';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bell, ChevronDown, ChevronLeft, ChevronRight, Star, Award, 
  Bookmark, MessageSquare, Calendar, MapPin, X, 
  CheckCircle, TrendingUp, Clock
} from 'lucide-react';

// --- Mock Data ---
const getModelData = (user: any) => ({
  id: 'model-001',
  name: user?.name || 'Model Name',
  location: 'Cairo, Egypt',
  heroImage: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&h=1200&fit=crop&q=80',
  rank: 'Elite',
  rating: 4.9,
  availability: 'Available',
  
  // Portfolio Images
  portfolio: [
    { id: '1', url: 'https://images.unsplash.com/photo-1725610147161-5caa05b3b156?w=800&h=1000&fit=crop&q=80', caption: 'Editorial — Vogue Arabia' },
    { id: '2', url: 'https://images.unsplash.com/photo-1741514377998-03d436155480?w=800&h=1000&fit=crop&q=80', caption: 'Campaign — Luxury Brand' },
    { id: '3', url: 'https://images.unsplash.com/photo-1717944105945-669b3dd77bfd?w=800&h=1000&fit=crop&q=80', caption: 'Runway — Cairo Fashion Week' },
    { id: '4', url: 'https://images.unsplash.com/photo-1758613654186-6ce234bf94ab?w=800&h=1000&fit=crop&q=80', caption: 'Studio — Desert Collection' },
    { id: '5', url: 'https://images.unsplash.com/photo-1758613655736-16757bdd953b?w=800&h=1000&fit=crop&q=80', caption: 'Commercial — Urban Edge' },
    { id: '6', url: 'https://images.unsplash.com/photo-1759646881002-33ce4a8bf3d6?w=800&h=1000&fit=crop&q=80', caption: 'High Fashion — Elle Magazine' }
  ],
  
  // Measurements
  measurements: {
    height: '175 cm',
    chest: '86 cm',
    waist: '61 cm',
    hips: '89 cm',
    shoeSize: '38 EU',
    dressSize: 'S'
  },
  
  // Professional Info
  professional: {
    experience: '8 years',
    pastCampaigns: ['Midnight Collection', 'Desert Rose', 'Cairo Fashion Week', 'Urban Edge', 'Luxe Magazine'],
    specialties: ['Editorial', 'Runway', 'Commercial'],
    languages: ['Arabic', 'English', 'French'],
    location: 'Cairo, Egypt'
  },
  
  // Performance & Ranking
  performance: {
    rankLevel: 'Elite',
    currentScore: 97,
    nextRankScore: 100,
    jobAcceptanceRate: 98,
    completionRate: 99,
    avgRating: 4.9,
    onTimeRate: 99,
    cancellationRate: 1
  },
  
  // Recent Jobs
  recentJobs: [
    { id: '1', brand: 'Midnight Collection', date: 'Nov 2024', type: 'Editorial' },
    { id: '2', brand: 'Desert Rose Campaign', date: 'Oct 2024', type: 'Commercial' },
    { id: '3', brand: 'Cairo Fashion Week', date: 'Sep 2024', type: 'Runway' }
  ],
  
  // Calendar Availability (next 14 days)
  calendar: [
    { date: '2025-01-20', available: true },
    { date: '2025-01-21', available: true },
    { date: '2025-01-22', available: false },
    { date: '2025-01-23', available: true },
    { date: '2025-01-24', available: true },
    { date: '2025-01-25', available: false },
    { date: '2025-01-26', available: true },
    { date: '2025-01-27', available: true },
    { date: '2025-01-28', available: true },
    { date: '2025-01-29', available: false },
    { date: '2025-01-30', available: true },
    { date: '2025-01-31', available: true },
    { date: '2025-02-01', available: true },
    { date: '2025-02-02', available: true }
  ]
});

// --- Components ---

const Header = () => {
  const { navigate, setUser } = useApp();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 h-[72px] bg-[#0B0D10] border-b border-[#1E2230] z-50">
      <div className="h-full max-w-[1800px] mx-auto px-8 flex items-center justify-between">
        {/* Back Button */}
        <button
          onClick={() => navigate('models-directory')}
          className="flex items-center gap-2 text-white hover:text-[#E6C36A] transition-colors"
        >
          <ChevronLeft className="size-5" />
          <span className="text-sm uppercase tracking-wide">Back to Models</span>
        </button>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={() => navigate('brand-dashboard')}
            className="text-xs uppercase tracking-[0.1em] text-white hover:text-[#E6C36A] transition-all"
          >
            Dashboard
          </button>
          <button
            onClick={() => navigate('brand-production')}
            className="text-xs uppercase tracking-[0.1em] text-white hover:text-[#E6C36A] transition-all"
          >
            Production
          </button>
          <button
            onClick={() => navigate('models-directory')}
            className="text-xs uppercase tracking-[0.1em] text-white border-b-2 border-[#E6C36A] pb-1"
          >
            Models
          </button>
          <button
            onClick={() => navigate('brand-community')}
            className="text-xs uppercase tracking-[0.1em] text-white hover:text-[#E6C36A] transition-all"
          >
            Community
          </button>
          <button
            onClick={() => navigate('model-analytics')}
            className="text-xs uppercase tracking-[0.1em] text-white hover:text-[#E6C36A] transition-all"
          >
            Analytics
          </button>
        </nav>

        {/* Profile Menu */}
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

const HeroProfile = () => {
  const { user } = useApp();
  const modelData = getModelData(user);
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const scrolled = -rect.top;
        setScrollY(scrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={heroRef} className="relative bg-white overflow-hidden">
      <div className="max-w-[1800px] mx-auto px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-12">
          {/* Left: Model Image with Parallax */}
          <div className="relative aspect-[3/4] overflow-hidden bg-[#F5F5F5]">
            <motion.img
              src={modelData.heroImage}
              alt={modelData.name}
              style={{ y: scrollY * 0.3 }}
              className="w-full h-full object-cover grayscale"
            />
          </div>

          {/* Right: Info Panel */}
          <div className="flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              {/* Name */}
              <h1 className="font-['Playfair_Display'] text-5xl text-[#0B0D10] mb-4">
                {modelData.name}
              </h1>

              {/* Location */}
              <div className="flex items-center gap-2 text-[#6B7280] mb-6">
                <MapPin className="size-4" />
                <span className="text-sm uppercase tracking-wide">{modelData.location}</span>
              </div>

              {/* Rating & Rank */}
              <div className="flex items-center gap-6 mb-8 pb-8 border-b border-[#E5E7EB]">
                {/* Rating */}
                <div className="flex items-center gap-2">
                  <Star className="size-6 text-[#E6C36A] fill-[#E6C36A]" />
                  <span className="text-3xl font-medium text-[#0B0D10] font-mono">{modelData.rating}</span>
                  <span className="text-sm text-[#6B7280]">Rating</span>
                </div>

                {/* Rank Badge */}
                <div className="px-4 py-2 border-2 border-[#E6C36A]">
                  <div className="flex items-center gap-2">
                    <Award className="size-5 text-[#E6C36A]" />
                    <span className="text-lg font-['Playfair_Display'] text-[#E6C36A]">
                      {modelData.rank}
                    </span>
                  </div>
                </div>
              </div>

              {/* Availability Status */}
              <div className="mb-8">
                <p className="text-xs uppercase tracking-wide text-[#6B7280] mb-2">Status</p>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20">
                  <div className="size-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm uppercase tracking-wide text-green-700">
                    {modelData.availability}
                  </span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-3">
                <button className="w-full py-4 bg-[#0B0D10] text-white text-sm uppercase tracking-wide hover:bg-black transition-colors flex items-center justify-center gap-2">
                  <Calendar className="size-5" />
                  Invite to Job
                </button>
                <div className="grid grid-cols-2 gap-3">
                  <button className="py-3 bg-white border border-[#E5E7EB] text-[#0B0D10] text-sm uppercase tracking-wide hover:bg-[#FAFAFA] transition-colors flex items-center justify-center gap-2">
                    <Bookmark className="size-4" />
                    Save Model
                  </button>
                  <button className="py-3 bg-white border border-[#E5E7EB] text-[#0B0D10] text-sm uppercase tracking-wide hover:bg-[#FAFAFA] transition-colors flex items-center justify-center gap-2">
                    <MessageSquare className="size-4" />
                    Message
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const PortfolioGrid = () => {
  const { user } = useApp();
  const modelData = getModelData(user);
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleImageClick = (image: any, index: number) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % modelData.portfolio.length;
    setCurrentIndex(nextIndex);
    setSelectedImage(modelData.portfolio[nextIndex]);
  };

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + modelData.portfolio.length) % modelData.portfolio.length;
    setCurrentIndex(prevIndex);
    setSelectedImage(modelData.portfolio[prevIndex]);
  };

  return (
    <section className="bg-[#FAFAFA] py-12">
      <div className="max-w-[1800px] mx-auto px-8">
        <h2 className="font-['Playfair_Display'] text-3xl text-[#0B0D10] mb-8">Portfolio</h2>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {modelData.portfolio.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, boxShadow: '0 8px 20px rgba(0,0,0,0.12)' }}
              onClick={() => handleImageClick(image, index)}
              className="relative aspect-[3/4] overflow-hidden bg-white border border-[#E5E7EB] cursor-pointer group"
            >
              <img
                src={image.url}
                alt={image.caption}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-400"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
            </motion.div>
          ))}
        </div>

        {/* Fullscreen Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-8 right-8 text-white hover:text-[#E6C36A] transition-colors"
              >
                <X className="size-8" />
              </button>

              {/* Left Arrow */}
              <button
                onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                className="absolute left-8 text-white hover:text-[#E6C36A] transition-colors"
              >
                <ChevronLeft className="size-12" />
              </button>

              {/* Image */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
                className="max-w-[80vw] max-h-[80vh]"
              >
                <img
                  src={selectedImage.url}
                  alt={selectedImage.caption}
                  className="max-w-full max-h-full object-contain"
                />
              </motion.div>

              {/* Right Arrow */}
              <button
                onClick={(e) => { e.stopPropagation(); handleNext(); }}
                className="absolute right-8 text-white hover:text-[#E6C36A] transition-colors"
              >
                <ChevronRight className="size-12" />
              </button>

              {/* Caption */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white text-sm">
                {selectedImage.caption}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

const StatsAndDetails = () => {
  const { user } = useApp();
  const modelData = getModelData(user);
  
  return (
    <section className="bg-white py-12">
      <div className="max-w-[1800px] mx-auto px-8">
        <h2 className="font-['Playfair_Display'] text-3xl text-[#0B0D10] mb-8">
          Details & Measurements
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column: Measurements */}
          <div>
            <h3 className="text-sm uppercase tracking-wide text-[#6B7280] mb-4 font-medium">
              Measurements
            </h3>
            <div className="bg-white border border-[#E5E7EB] p-6 space-y-3">
              {Object.entries(modelData.measurements).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between py-2 border-b border-[#FAFAFA] last:border-0">
                  <span className="text-xs uppercase tracking-wide text-[#6B7280]">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <span className="text-sm font-medium text-[#0B0D10] font-mono">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Professional Info */}
          <div>
            <h3 className="text-sm uppercase tracking-wide text-[#6B7280] mb-4 font-medium">
              Professional Information
            </h3>
            <div className="bg-white border border-[#E5E7EB] p-6 space-y-4">
              {/* Experience */}
              <div>
                <p className="text-xs uppercase tracking-wide text-[#6B7280] mb-1">Experience</p>
                <p className="text-sm text-[#0B0D10]">{modelData.professional.experience}</p>
              </div>

              {/* Past Campaigns */}
              <div>
                <p className="text-xs uppercase tracking-wide text-[#6B7280] mb-2">Past Campaigns</p>
                <div className="flex flex-wrap gap-2">
                  {modelData.professional.pastCampaigns.map((campaign, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-[10px] uppercase tracking-wide bg-[#FAFAFA] text-[#0B0D10] border border-[#E5E7EB]"
                    >
                      {campaign}
                    </span>
                  ))}
                </div>
              </div>

              {/* Specialties */}
              <div>
                <p className="text-xs uppercase tracking-wide text-[#6B7280] mb-2">Specialties</p>
                <div className="flex flex-wrap gap-2">
                  {modelData.professional.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-[10px] uppercase tracking-wide bg-[#E6C36A]/10 text-[#E6C36A] border border-[#E6C36A]/20"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              {/* Languages */}
              <div>
                <p className="text-xs uppercase tracking-wide text-[#6B7280] mb-1">Languages</p>
                <p className="text-sm text-[#0B0D10]">{modelData.professional.languages.join(', ')}</p>
              </div>

              {/* Location */}
              <div>
                <p className="text-xs uppercase tracking-wide text-[#6B7280] mb-1">Location</p>
                <p className="text-sm text-[#0B0D10]">{modelData.professional.location}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const RankingPerformance = () => {
  const { user } = useApp();
  const modelData = getModelData(user);
  const progressPercentage = (modelData.performance.currentScore / modelData.performance.nextRankScore) * 100;

  return (
    <section className="bg-[#FAFAFA] py-12">
      <div className="max-w-[1800px] mx-auto px-8">
        <h2 className="font-['Playfair_Display'] text-3xl text-[#0B0D10] mb-8">
          Ranking & Performance
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Rank Level Card */}
          <div className="bg-white border border-[#E5E7EB] p-6">
            <div className="flex items-center gap-3 mb-4">
              <Award className="size-8 text-[#E6C36A]" />
              <div>
                <p className="text-xs uppercase tracking-wide text-[#6B7280]">Current Rank</p>
                <p className="text-2xl font-['Playfair_Display'] text-[#E6C36A]">
                  {modelData.performance.rankLevel}
                </p>
              </div>
            </div>

            {/* Progress to Next Rank */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-wide text-[#6B7280]">Progress</span>
                <span className="text-sm font-mono text-[#0B0D10]">
                  {modelData.performance.currentScore} / {modelData.performance.nextRankScore}
                </span>
              </div>
              <div className="w-full h-2 bg-[#FAFAFA] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="h-full bg-[#E6C36A] rounded-full"
                />
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="lg:col-span-2 bg-white border border-[#E5E7EB] p-6">
            <p className="text-xs uppercase tracking-wide text-[#6B7280] mb-4">Performance Metrics</p>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="size-5 text-[#0B0D10] mt-0.5" />
                <div>
                  <p className="text-2xl font-medium text-[#0B0D10] font-mono mb-1">
                    {modelData.performance.jobAcceptanceRate}%
                  </p>
                  <p className="text-xs uppercase tracking-wide text-[#6B7280]">Job Acceptance Rate</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <TrendingUp className="size-5 text-[#0B0D10] mt-0.5" />
                <div>
                  <p className="text-2xl font-medium text-[#0B0D10] font-mono mb-1">
                    {modelData.performance.completionRate}%
                  </p>
                  <p className="text-xs uppercase tracking-wide text-[#6B7280]">Completion Rate</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Star className="size-5 text-[#E6C36A] fill-[#E6C36A] mt-0.5" />
                <div>
                  <p className="text-2xl font-medium text-[#0B0D10] font-mono mb-1">
                    {modelData.performance.avgRating}
                  </p>
                  <p className="text-xs uppercase tracking-wide text-[#6B7280]">Average Rating</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="size-5 text-[#0B0D10] mt-0.5" />
                <div>
                  <p className="text-2xl font-medium text-[#0B0D10] font-mono mb-1">
                    {modelData.performance.onTimeRate}%
                  </p>
                  <p className="text-xs uppercase tracking-wide text-[#6B7280]">On-Time Rate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const AvailabilityActions = () => {
  const { user } = useApp();
  const modelData = getModelData(user);
  
  return (
    <section className="bg-white py-12">
      <div className="max-w-[1800px] mx-auto px-8">
        <h2 className="font-['Playfair_Display'] text-3xl text-[#0B0D10] mb-8">
          Availability & Recent Work
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-12">
          {/* Left: Calendar Availability */}
          <div>
            <h3 className="text-sm uppercase tracking-wide text-[#6B7280] mb-4 font-medium">
              Calendar Availability (Next 14 Days)
            </h3>
            <div className="bg-white border border-[#E5E7EB] p-6">
              <div className="grid grid-cols-7 gap-3">
                {modelData.calendar.map((day, index) => {
                  const date = new Date(day.date);
                  const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
                  const dayNumber = date.getDate();

                  return (
                    <div
                      key={index}
                      className={`p-3 text-center border transition-all ${
                        day.available
                          ? 'border-[#E5E7EB] hover:border-[#E6C36A] cursor-pointer'
                          : 'border-[#E5E7EB] bg-[#FAFAFA] opacity-50 cursor-not-allowed'
                      }`}
                    >
                      <div className="text-[10px] uppercase tracking-wide text-[#6B7280] mb-1">
                        {dayName}
                      </div>
                      <div className="text-lg font-medium font-mono text-[#0B0D10]">
                        {dayNumber}
                      </div>
                      {!day.available && (
                        <div className="text-[8px] uppercase text-red-600 mt-1">Booked</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recent Jobs */}
            <div className="mt-8">
              <h3 className="text-sm uppercase tracking-wide text-[#6B7280] mb-4 font-medium">
                Recent Jobs
              </h3>
              <div className="space-y-3">
                {modelData.recentJobs.map((job) => (
                  <div key={job.id} className="bg-white border border-[#E5E7EB] p-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-[#0B0D10]">{job.brand}</p>
                      <p className="text-xs text-[#6B7280]">{job.type}</p>
                    </div>
                    <span className="text-xs text-[#6B7280]">{job.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: CTA */}
          <div>
            <h3 className="text-sm uppercase tracking-wide text-[#6B7280] mb-4 font-medium">
              Take Action
            </h3>
            <div className="bg-[#FAFAFA] border border-[#E5E7EB] p-8">
              <p className="text-sm text-[#6B7280] mb-6 leading-relaxed">
                Invite this model to your next production. Response time is typically within 2 hours.
              </p>
              <button className="w-full py-4 bg-[#0B0D10] text-white text-sm uppercase tracking-wide hover:bg-black transition-colors mb-4">
                Invite to Production
              </button>
              <p className="text-xs text-center text-[#6B7280]">
                By inviting, you'll start a conversation thread
              </p>
            </div>

            {/* Quick Stats */}
            <div className="mt-6 bg-white border border-[#E5E7EB] p-6 space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-[#FAFAFA]">
                <span className="text-xs uppercase tracking-wide text-[#6B7280]">Response Time</span>
                <span className="text-sm font-medium text-[#0B0D10]">~2 hours</span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-[#FAFAFA]">
                <span className="text-xs uppercase tracking-wide text-[#6B7280]">Jobs This Year</span>
                <span className="text-sm font-medium text-[#0B0D10] font-mono">47</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wide text-[#6B7280]">Cancellation Rate</span>
                <span className="text-sm font-medium text-green-600 font-mono">
                  {modelData.performance.cancellationRate}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export function ModelProfilePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="pt-[72px]">
        <HeroProfile />
        <PortfolioGrid />
        <StatsAndDetails />
        <RankingPerformance />
        <AvailabilityActions />
      </div>
    </div>
  );
}