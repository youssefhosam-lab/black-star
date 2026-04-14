import React, { useState } from 'react';
import { useApp } from '../../App';
import { Bell, ChevronDown, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Import the content components
import { LocalBrandModels } from './LocalBrandModels';
import { LocalBrandProcess } from './LocalBrandProcess';
import { LocalBrandOrders } from './LocalBrandOrders';
import { LocalBrandAnalytics } from './LocalBrandAnalytics';
import { LocalBrandProfileSettings } from './LocalBrandProfileSettings';

// Star Icon Component
const StarIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 224 184" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M143.719 110.121C156.233 101.407 171.96 95.7044 189.287 94.385L223.521 91.7763L189.287 89.1675C171.96 87.8479 156.243 82.1452 143.719 73.4316L190.782 26.8837L134.096 65.5295C123.485 55.2537 116.54 42.339 114.933 28.1123L111.756 4.76837e-07L108.579 28.1123C106.972 42.339 100.027 55.2461 89.416 65.5295L32.7299 26.8837L79.7927 73.4316C67.2789 82.1452 51.5514 87.8479 34.2351 89.1675L1.04308e-07 91.7763L34.2351 94.385C51.5607 95.7044 67.2789 101.415 79.7927 110.121L32.7299 156.669L89.416 118.023C100.027 128.299 106.972 141.214 108.579 155.433L111.756 183.545L114.933 155.433C116.54 141.206 123.494 128.299 134.096 118.023L190.782 156.669L143.719 110.121Z" 
      fill="currentColor"
    />
  </svg>
);

export function LocalBrandUnifiedDashboard() {
  const { navigate, setUser, user, currentPage } = useApp();
  
  // Determine active tab from currentPage
  const getActiveTab = (): 'dashboard' | 'models' | 'process' | 'orders' | 'analytics' => {
    if (currentPage === 'localbrand-models') return 'models';
    if (currentPage === 'localbrand-process') return 'process';
    if (currentPage === 'localbrand-orders') return 'orders';
    if (currentPage === 'localbrand-analytics') return 'analytics';
    return 'dashboard';
  };
  
  const [activeTab, setActiveTab] = useState<'dashboard' | 'models' | 'process' | 'orders' | 'analytics'>(getActiveTab());
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showProfileSettings, setShowProfileSettings] = useState(false);
  const [notificationCount] = useState(3);

  const brandName = user?.brandName || user?.name || 'BLACK STAR';

  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'studio', label: 'Studio' },
    { id: 'models', label: 'Models' },
    { id: 'process', label: 'Process' },
    { id: 'orders', label: 'Orders' },
    { id: 'analytics', label: 'Analytics' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'models':
        return <LocalBrandModels />;
      case 'process':
        return <LocalBrandProcess />;
      case 'orders':
        return <LocalBrandOrders />;
      case 'analytics':
        return <LocalBrandAnalytics />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F7F5]">
      {/* Header */}
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
                  onClick={() => {
                    if (tab.id === 'studio') {
                      navigate('localbrand-studio');
                    } else {
                      setActiveTab(tab.id as any);
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
                    <button 
                      onClick={() => {
                        setShowProfileSettings(true);
                        setShowUserMenu(false);
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-[#F7F7F5] flex items-center gap-2 text-sm text-[rgb(0,0,0)]"
                    >
                      <User size={16} />
                      My Profile
                    </button>
                    <button 
                      onClick={() => navigate('localbrand-settings')}
                      className="w-full px-4 py-3 text-left hover:bg-[#F7F7F5] flex items-center gap-2 text-sm text-[rgb(0,0,0)] border-t border-[#E6E6E3]"
                    >
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

      {/* Content Area */}
      <div className="bg-[#F7F7F5]">
        {renderContent()}
      </div>

      {/* Profile Settings Modal */}
      <AnimatePresence>
        {showProfileSettings && (
          <LocalBrandProfileSettings onClose={() => setShowProfileSettings(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

// Dashboard Content Component (Original Dashboard)
function DashboardContent() {
  const { navigate, user } = useApp();
  const brandName = user?.brandName || user?.name || 'BLACKSTAR STUDIO';

  return (
    <>
      {/* Hero Section */}
      <div className="relative w-full h-[500px]">
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center overflow-hidden"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1758613654311-32525f489a0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwdGVhbSUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NjY4NzgwNTZ8MA&ixlib=rb-4.1.0&q=80&w=1080)',
            filter: `grayscale(0%)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/70 via-[#0B0B0B]/40 to-transparent" />
        
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-6 py-12">
            <h1 className="text-5xl font-['Inter_Tight'] tracking-tight text-white">
              {brandName}
            </h1>
            <p className="text-white/80 mt-2 tracking-wide">
              Fashion without illusion
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="container mx-auto px-6 py-12 bg-[rgb(250,250,250)]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white p-6 border border-[#E6E6E3]">
              <p className="text-sm uppercase tracking-wider text-[#6E6E6E] mb-2">New Orders</p>
              <p className="text-4xl font-['IBM_Plex_Mono'] text-[#0B0B0B]">12</p>
            </div>
            <div className="bg-white p-6 border border-[#E6E6E3]">
              <p className="text-sm uppercase tracking-wider text-[#6E6E6E] mb-2">Active Orders</p>
              <p className="text-4xl font-['IBM_Plex_Mono'] text-[#0B0B0B]">8</p>
            </div>
          </div>

          {/* Production Status */}
          <div className="bg-white p-6 border border-[#E6E6E3] mb-6">
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
                    <div
                      className="h-full bg-[#5B7C99]"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Analytics Snapshot */}
          <div className="bg-white p-6 border border-[#E6E6E3] mb-6">
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
          </div>
        </div>
      </div>
    </>
  );
}