import React, { useState } from 'react';
import { useApp } from '../../App';
import { Bell, ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';

// Star Icon Component
const StarIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 224 184" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M143.719 110.121C156.233 101.407 171.96 95.7044 189.287 94.385L223.521 91.7763L189.287 89.1675C171.96 87.8479 156.243 82.1452 143.719 73.4316L190.782 26.8837L134.096 65.5295C123.485 55.2537 116.54 42.339 114.933 28.1123L111.756 4.76837e-07L108.579 28.1123C106.972 42.339 100.027 55.2461 89.416 65.5295L32.7299 26.8837L79.7927 73.4316C67.2789 82.1452 51.5514 87.8479 34.2351 89.1675L1.04308e-07 91.7763L34.2351 94.385C51.5607 95.7044 67.2789 101.415 79.7927 110.121L32.7299 156.669L89.416 118.023C100.027 128.299 106.972 141.214 108.579 155.433L111.756 183.545L114.933 155.433C116.54 141.206 123.494 128.299 134.096 118.023L190.782 156.669L143.719 110.121Z" 
      fill="currentColor"
    />
  </svg>
);

interface LocalBrandHeaderProps {
  activePage: 'dashboard' | 'studio' | 'models' | 'process' | 'orders' | 'analytics';
}

export function LocalBrandHeader({ activePage }: LocalBrandHeaderProps) {
  const { navigate, setUser, user } = useApp();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [notificationCount] = useState(3);

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', route: 'localbrand-dashboard' },
    { id: 'studio', label: 'Studio', route: 'localbrand-studio' },
    { id: 'models', label: 'Models', route: 'localbrand-models' },
    { id: 'process', label: 'Process', route: 'localbrand-process' },
    { id: 'orders', label: 'Orders', route: 'localbrand-orders' },
    { id: 'analytics', label: 'Analytics', route: 'localbrand-analytics' },
  ];

  // Get brand name from user object or use default
  const brandName = user?.brandName || user?.name || 'BLACK STAR';

  return (
    <header className="bg-[#F7F7F5] border-b border-[#E6E6E3] sticky top-0 z-50">
      <div className="container mx-auto px-6 bg-[rgb(250,250,250)]">
        <div className="flex items-center justify-between h-16">
          {/* Left - Logo + Brand Name */}
          <div className="flex items-center gap-3 bg-[rgba(0,0,0,0)]">
            <StarIcon className="w-6 h-6 text-[#111111]" />
            <span className="text-sm uppercase tracking-wider font-['Inter_Tight'] text-[rgb(0,0,0)]">
              {brandName}
            </span>
          </div>

          {/* Center - Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => navigate(tab.route)}
                className={`px-4 py-2 text-sm uppercase tracking-wider transition-all duration-300 ${
                  activePage === tab.id
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
            {/* Notifications */}
            <button className="relative p-2 hover:bg-[#E6E6E3] rounded-md transition-colors">
              <Bell className="w-5 h-5 text-[rgb(0,0,0)]" />
              {notificationCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#E63946] rounded-full"></span>
              )}
            </button>

            {/* User Menu */}
            <div className="relative">
              <button 
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <div className="w-8 h-8 rounded-full bg-[#D9D9D9] flex items-center justify-center">
                  <span className="text-xs font-medium text-[rgb(0,0,0)]">
                    {brandName.substring(0, 2).toUpperCase()}
                  </span>
                </div>
                <ChevronDown className="w-4 h-4 text-[rgb(0,0,0)]" />
              </button>

              {showUserMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 mt-2 w-48 bg-white border border-[#E6E6E3] shadow-lg"
                >
                  <button className="w-full px-4 py-3 text-left hover:bg-[#F7F7F5] flex items-center gap-2 text-sm text-[rgb(0,0,0)]">
                    Settings
                  </button>
                  <button
                    onClick={() => {
                      setUser(null);
                      navigate('welcome');
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-[#F7F7F5] flex items-center gap-2 text-sm border-t border-[#E6E6E3] text-[rgb(0,0,0)]"
                  >
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
}
