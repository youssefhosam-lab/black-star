import React, { useState } from 'react';
import { useApp } from '../../App';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, User, ChevronDown, Star, X, TrendingUp, Award } from 'lucide-react';
import Logo from '../../imports/Logo';

// --- Types ---
interface ModelProfile {
  rank: number;
  id: string;
  name: string;
  photo: string;
  starRating: number; // 0 to 1 (fractional fill)
  jobsCompleted: number;
  location: string;
}

// --- Header Component ---
const ModelHeader = ({ activePage }: { activePage: string }) => {
  const { navigate } = useApp();
  const [showDropdown, setShowDropdown] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', route: 'home' },
    { id: 'portfolio', label: 'Portfolio', route: 'model-portfolio' },
    { id: 'orders', label: 'Orders', route: 'model-orders' },
    { id: 'analytics', label: 'Analytics', route: 'model-analytics' },
    { id: 'ranking', label: 'Ranking', route: 'model-ranking' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 h-20 bg-white/95 backdrop-blur-sm z-50 border-b border-gray-200">
      <div className="h-full px-12 flex items-center justify-between max-w-[2000px] mx-auto">
        <div className="w-10 h-10 text-black">
          <Logo showText={false} />
        </div>

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

        <div className="flex items-center gap-6">
          <button className="relative group">
            <Bell className="size-5 text-black transition-transform group-hover:scale-110" />
            <span className="absolute -top-1 -right-1 size-2 bg-black rounded-full" />
          </button>

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
    </header>
  );
};

// --- Profile Preview Modal ---
const ProfilePreviewModal = ({ model, onClose }: { model: ModelProfile; onClose: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-12"
      onClick={onClose}
    >
      {/* Blurred Background */}
      <motion.div
        initial={{ backdropFilter: 'blur(0px)' }}
        animate={{ backdropFilter: 'blur(12px)' }}
        exit={{ backdropFilter: 'blur(0px)' }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-black/60"
      />

      {/* Modal Content */}
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="relative bg-white max-w-2xl w-full p-12"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 size-10 bg-white border border-gray-300 flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all duration-300"
        >
          <X className="size-5" />
        </button>

        {/* Content */}
        <div className="flex gap-12">
          {/* Photo */}
          <div className="w-48 h-64 bg-gray-100 overflow-hidden">
            <img
              src={model.photo}
              alt={model.name}
              className="w-full h-full object-cover filter grayscale"
            />
          </div>

          {/* Info */}
          <div className="flex-1">
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-2">
                <h2 className="text-4xl font-['Playfair_Display']">{model.name}</h2>
                <span className="text-2xl font-['Playfair_Display'] text-gray-400">#{model.rank}</span>
              </div>
              <p className="text-sm text-gray-500 uppercase tracking-wide">{model.location}</p>
            </div>

            {/* Star Rating */}
            <div className="mb-8">
              <p className="text-xs uppercase tracking-wide text-gray-400 mb-3">Black Star Rating</p>
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12">
                  <Star className="absolute inset-0 w-full h-full text-gray-200" />
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{ clipPath: `inset(0 ${100 - model.starRating * 100}% 0 0)` }}
                  >
                    <Star className="w-full h-full text-black fill-black" />
                  </div>
                </div>
                <p className="text-xl font-['Playfair_Display']">{Math.round(model.starRating * 100)}%</p>
              </div>
            </div>

            {/* Stats */}
            <div className="space-y-4 border-t border-gray-200 pt-6">
              <div className="flex justify-between">
                <span className="text-xs uppercase tracking-wide text-gray-400">Jobs Completed</span>
                <span className="text-sm">{model.jobsCompleted}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs uppercase tracking-wide text-gray-400">Acceptance Rate</span>
                <span className="text-sm">94%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs uppercase tracking-wide text-gray-400">Average Rating</span>
                <span className="text-sm">4.7/5</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- Leaderboard Row ---
const LeaderboardRow = ({ model, isCurrentUser, onClick }: { 
  model: ModelProfile; 
  isCurrentUser: boolean;
  onClick: () => void;
}) => {
  const getRankStyle = (rank: number) => {
    if (rank === 1) return 'text-5xl';
    if (rank <= 3) return 'text-4xl';
    return 'text-3xl';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ x: 4 }}
      onClick={onClick}
      className={`grid grid-cols-12 gap-6 items-center p-6 cursor-pointer transition-all duration-300 ${
        isCurrentUser 
          ? 'bg-black text-white border-2 border-black' 
          : 'bg-white border border-gray-200 hover:border-black'
      }`}
    >
      {/* Rank */}
      <div className="col-span-2">
        <p className={`font-['Playfair_Display'] ${getRankStyle(model.rank)} ${
          isCurrentUser ? 'text-white' : 'text-black'
        }`}>
          #{model.rank}
        </p>
        {model.rank <= 3 && (
          <Award className={`size-5 mt-1 ${isCurrentUser ? 'text-white' : 'text-gray-400'}`} />
        )}
      </div>

      {/* Photo */}
      <div className="col-span-2">
        <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-200">
          <img
            src={model.photo}
            alt={model.name}
            className="w-full h-full object-cover filter grayscale"
          />
        </div>
      </div>

      {/* Name & Location */}
      <div className="col-span-3">
        <h3 className={`text-xl font-['Playfair_Display'] mb-1 ${
          isCurrentUser ? 'text-white' : 'text-black'
        }`}>
          {model.name}
        </h3>
        <p className={`text-xs uppercase tracking-wide ${
          isCurrentUser ? 'text-white/70' : 'text-gray-500'
        }`}>
          {model.location}
        </p>
      </div>

      {/* Star Rating */}
      <div className="col-span-3 flex items-center gap-4">
        <div className="relative w-10 h-10">
          <Star className={`absolute inset-0 w-full h-full ${
            isCurrentUser ? 'text-white/30' : 'text-gray-200'
          }`} />
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - model.starRating * 100}% 0 0)` }}
          >
            <Star className={`w-full h-full ${
              isCurrentUser ? 'text-white fill-white' : 'text-black fill-black'
            }`} />
          </div>
        </div>
        <p className={`text-lg font-['Playfair_Display'] ${
          isCurrentUser ? 'text-white' : 'text-black'
        }`}>
          {Math.round(model.starRating * 100)}%
        </p>
      </div>

      {/* Jobs */}
      <div className="col-span-2 text-right">
        <p className={`text-2xl font-['Playfair_Display'] ${
          isCurrentUser ? 'text-white' : 'text-black'
        }`}>
          {model.jobsCompleted}
        </p>
        <p className={`text-xs uppercase tracking-wide ${
          isCurrentUser ? 'text-white/70' : 'text-gray-400'
        }`}>
          Jobs
        </p>
      </div>
    </motion.div>
  );
};

// --- Ranking Page ---
export function ModelRanking() {
  const [selectedModel, setSelectedModel] = useState<ModelProfile | null>(null);
  const currentUserId = '12';

  const models: ModelProfile[] = [
    { rank: 1, id: '1', name: 'Karim Mansour', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop', starRating: 0.96, jobsCompleted: 47, location: 'Cairo, Egypt' },
    { rank: 2, id: '2', name: 'Omar El-Sayed', photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&h=200&fit=crop', starRating: 0.94, jobsCompleted: 43, location: 'Dubai, UAE' },
    { rank: 3, id: '3', name: 'Hassan Ali', photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop', starRating: 0.91, jobsCompleted: 41, location: 'Beirut, Lebanon' },
    { rank: 4, id: '4', name: 'Youssef Ibrahim', photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop', starRating: 0.88, jobsCompleted: 38, location: 'Riyadh, Saudi Arabia' },
    { rank: 5, id: '5', name: 'Mahmoud Farid', photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop', starRating: 0.85, jobsCompleted: 36, location: 'Amman, Jordan' },
    { rank: 6, id: '6', name: 'Tariq Nasser', photo: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=200&h=200&fit=crop', starRating: 0.83, jobsCompleted: 34, location: 'Cairo, Egypt' },
    { rank: 7, id: '7', name: 'Rami Khalil', photo: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200&h=200&fit=crop', starRating: 0.81, jobsCompleted: 32, location: 'Dubai, UAE' },
    { rank: 8, id: '8', name: 'Samir Younes', photo: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=200&h=200&fit=crop', starRating: 0.79, jobsCompleted: 31, location: 'Kuwait City, Kuwait' },
    { rank: 9, id: '9', name: 'Adel Hamza', photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop', starRating: 0.77, jobsCompleted: 29, location: 'Doha, Qatar' },
    { rank: 10, id: '10', name: 'Ziad Farah', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop', starRating: 0.75, jobsCompleted: 28, location: 'Manama, Bahrain' },
    { rank: 11, id: '11', name: 'Faisal Aziz', photo: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=200&h=200&fit=crop', starRating: 0.73, jobsCompleted: 26, location: 'Alexandria, Egypt' },
    { rank: 12, id: '12', name: 'Ahmed Hassan', photo: 'https://images.unsplash.com/photo-1643743323468-1e018b621231?w=200&h=200&fit=crop', starRating: 0.72, jobsCompleted: 24, location: 'Cairo, Egypt' },
    { rank: 13, id: '13', name: 'Nabil Jamal', photo: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=200&h=200&fit=crop', starRating: 0.70, jobsCompleted: 23, location: 'Jeddah, Saudi Arabia' },
    { rank: 14, id: '14', name: 'Waleed Salah', photo: 'https://images.unsplash.com/photo-1489980557514-251d61e3eeb6?w=200&h=200&fit=crop', starRating: 0.68, jobsCompleted: 22, location: 'Dubai, UAE' },
    { rank: 15, id: '15', name: 'Amir Rashid', photo: 'https://images.unsplash.com/photo-1508341591423-4347099e1f19?w=200&h=200&fit=crop', starRating: 0.66, jobsCompleted: 20, location: 'Abu Dhabi, UAE' },
  ];

  return (
    <div className="min-h-screen bg-white text-black">
      <ModelHeader activePage="ranking" />
      
      <main className="max-w-[1800px] mx-auto px-12 pt-20">
        <div className="mt-[140px] mb-[140px]">
          {/* Page Title */}
          <div className="mb-16">
            <h1 className="text-6xl font-['Playfair_Display'] mb-4">Ranking</h1>
            <p className="text-sm uppercase tracking-[0.2em] text-gray-500">Competition core — Motivation & ambition</p>
          </div>

          {/* Your Position Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gray-50 border border-gray-200 p-12 mb-[140px]"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-400 mb-3">Your Current Position</p>
                <p className="text-7xl font-['Playfair_Display'] mb-2">#12</p>
                <p className="text-sm text-gray-600 italic font-['Playfair_Display']">You're rising. Keep moving.</p>
              </div>
              <div className="flex items-center gap-8">
                <div className="text-center">
                  <div className="relative w-24 h-24 mb-3">
                    <Star className="absolute inset-0 w-full h-full text-gray-200" />
                    <div
                      className="absolute inset-0 overflow-hidden"
                      style={{ clipPath: `inset(0 ${100 - 72}% 0 0)` }}
                    >
                      <Star className="w-full h-full text-black fill-black" />
                    </div>
                  </div>
                  <p className="text-2xl font-['Playfair_Display']">72%</p>
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="size-5 text-black" />
                    <p className="text-2xl font-['Playfair_Display']">+3</p>
                  </div>
                  <p className="text-xs uppercase tracking-wide text-gray-500">Positions this month</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Leaderboard */}
          <div className="space-y-3">
            {models.map((model, index) => (
              <div key={model.id} style={{ transitionDelay: `${index * 30}ms` }}>
                <LeaderboardRow 
                  model={model} 
                  isCurrentUser={model.id === currentUserId}
                  onClick={() => setSelectedModel(model)}
                />
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Profile Preview Modal */}
      <AnimatePresence>
        {selectedModel && (
          <ProfilePreviewModal 
            model={selectedModel} 
            onClose={() => setSelectedModel(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}