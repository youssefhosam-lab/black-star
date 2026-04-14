import React, { useState } from 'react';
import { useApp } from '../../App';
import { motion } from 'motion/react';
import { Bell, ChevronDown, Calendar, MessageSquare, User, RefreshCw } from 'lucide-react';

// --- Mock Data ---
const jobsData = {
  active: [
    {
      id: 'job-001',
      modelName: 'Layla Mansour',
      modelImage: 'https://images.unsplash.com/photo-1725892604314-5d9c9f363757?w=80&h=80&fit=crop&q=80',
      jobTitle: 'Midnight Collection Editorial Shoot',
      dates: 'Jan 28, 2025',
      status: 'Confirmed',
      location: 'Studio Cairo',
      collection: 'Midnight Collection'
    },
    {
      id: 'job-002',
      modelName: 'Ahmed Hassan',
      modelImage: 'https://images.unsplash.com/photo-1618008797651-3eb256213400?w=80&h=80&fit=crop&q=80',
      jobTitle: 'Desert Series Campaign',
      dates: 'Feb 5-6, 2025',
      status: 'Pending Confirmation',
      location: 'White Desert',
      collection: 'Desert Series'
    },
    {
      id: 'job-003',
      modelName: 'Yasmin El-Sayed',
      modelImage: 'https://images.unsplash.com/photo-1669643783392-09d0a26c79e8?w=80&h=80&fit=crop&q=80',
      jobTitle: 'Urban Edge Lookbook',
      dates: 'Feb 12, 2025',
      status: 'In Progress',
      location: 'Downtown Cairo',
      collection: 'Urban Edge'
    }
  ],
  completed: [
    {
      id: 'job-004',
      modelName: 'Nour Ibrahim',
      modelImage: 'https://images.unsplash.com/photo-1612739980306-908bac4fc9fe?w=80&h=80&fit=crop&q=80',
      jobTitle: 'Autumn Collection Runway',
      dates: 'Nov 15, 2024',
      status: 'Completed',
      location: 'Cairo Fashion Week',
      collection: 'Autumn 2024',
      rating: 5
    },
    {
      id: 'job-005',
      modelName: 'Omar Khalil',
      modelImage: 'https://images.unsplash.com/photo-1643285740368-f7f1ba6b116f?w=80&h=80&fit=crop&q=80',
      jobTitle: 'Commercial Photoshoot',
      dates: 'Oct 20, 2024',
      status: 'Completed',
      location: 'Studio Alexandria',
      collection: 'Spring Preview',
      rating: 4
    }
  ],
  cancelled: [
    {
      id: 'job-006',
      modelName: 'Layla Mansour',
      modelImage: 'https://images.unsplash.com/photo-1725892604314-5d9c9f363757?w=80&h=80&fit=crop&q=80',
      jobTitle: 'Winter Campaign',
      dates: 'Dec 10, 2024',
      status: 'Cancelled',
      reason: 'Model unavailable',
      collection: 'Winter 2024'
    }
  ]
};

// --- Components ---

const Header = ({ currentPage }: { currentPage: string }) => {
  const { navigate, setUser } = useApp();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 h-[72px] bg-[#0B0D10] border-b border-[#1E2230] z-50">
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
            className="text-xs uppercase tracking-[0.1em] text-white hover:text-[#E6C36A] transition-all"
          >
            Models
          </button>
          <button
            onClick={() => navigate('model-jobs')}
            className="text-xs uppercase tracking-[0.1em] text-white border-b-2 border-[#E6C36A] pb-1"
          >
            Model Jobs
          </button>
          <button
            onClick={() => navigate('model-analytics')}
            className="text-xs uppercase tracking-[0.1em] text-white hover:text-[#E6C36A] transition-all"
          >
            Analytics
          </button>
          <button
            onClick={() => navigate('brand-community')}
            className="text-xs uppercase tracking-[0.1em] text-white hover:text-[#E6C36A] transition-all"
          >
            Community
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

const JobCard = ({ job, type }: { job: any; type: string }) => {
  const { navigate } = useApp();

  const getStatusColor = (status: string) => {
    const colors: any = {
      'Confirmed': 'bg-green-500/10 text-green-700 border-green-500/20',
      'Pending Confirmation': 'bg-yellow-500/10 text-yellow-700 border-yellow-500/20',
      'In Progress': 'bg-blue-500/10 text-blue-700 border-blue-500/20',
      'Completed': 'bg-gray-500/10 text-gray-700 border-gray-500/20',
      'Cancelled': 'bg-red-500/10 text-red-700 border-red-500/20'
    };
    return colors[status] || '';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-[#E5E7EB] p-6 hover:border-[#E6C36A] transition-all"
    >
      <div className="flex items-start gap-4">
        {/* Model Image */}
        <img
          src={job.modelImage}
          alt={job.modelName}
          className="size-16 rounded object-cover grayscale"
        />

        {/* Job Details */}
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-sm font-medium text-[#0B0D10] mb-1">{job.jobTitle}</h3>
              <button
                onClick={() => navigate('model-profile', { modelId: job.id })}
                className="text-xs text-[#6B7280] hover:text-[#E6C36A] transition-colors flex items-center gap-1"
              >
                <User className="size-3" />
                {job.modelName}
              </button>
            </div>

            <span className={`px-2 py-1 text-[10px] uppercase tracking-wide border ${getStatusColor(job.status)}`}>
              {job.status}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4 text-xs">
            <div>
              <span className="text-[#6B7280]">Dates:</span>
              <span className="text-[#0B0D10] ml-2 font-mono">{job.dates}</span>
            </div>
            <div>
              <span className="text-[#6B7280]">Location:</span>
              <span className="text-[#0B0D10] ml-2">{job.location}</span>
            </div>
            <div>
              <span className="text-[#6B7280]">Collection:</span>
              <span className="text-[#0B0D10] ml-2">{job.collection}</span>
            </div>
            {job.rating && (
              <div>
                <span className="text-[#6B7280]">Rating:</span>
                <span className="text-[#E6C36A] ml-2">{'★'.repeat(job.rating)}</span>
              </div>
            )}
            {job.reason && (
              <div className="col-span-2">
                <span className="text-[#6B7280]">Reason:</span>
                <span className="text-[#0B0D10] ml-2">{job.reason}</span>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-4 border-t border-[#E5E7EB]">
            <button className="text-xs uppercase tracking-wide text-[#0B0D10] hover:text-[#E6C36A] transition-colors flex items-center gap-1">
              <Calendar className="size-4" />
              View Details
            </button>
            <button className="text-xs uppercase tracking-wide text-[#0B0D10] hover:text-[#E6C36A] transition-colors flex items-center gap-1">
              <MessageSquare className="size-4" />
              Message
            </button>
            {type === 'active' && (
              <button className="text-xs uppercase tracking-wide text-[#6B7280] hover:text-red-600 transition-colors flex items-center gap-1">
                <RefreshCw className="size-4" />
                Replace Model
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export function ModelJobsPage() {
  const [activeTab, setActiveTab] = useState<'active' | 'completed' | 'cancelled'>('active');

  const tabs = [
    { id: 'active', label: 'Active', count: jobsData.active.length },
    { id: 'completed', label: 'Completed', count: jobsData.completed.length },
    { id: 'cancelled', label: 'Cancelled', count: jobsData.cancelled.length }
  ];

  const getCurrentJobs = () => {
    if (activeTab === 'active') return jobsData.active;
    if (activeTab === 'completed') return jobsData.completed;
    return jobsData.cancelled;
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Header currentPage="model-jobs" />

      <div className="pt-[72px]">
        <div className="max-w-[1400px] mx-auto px-8 py-12">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="font-['Playfair_Display'] text-4xl text-[#0B0D10] mb-2">
              Model Jobs
            </h1>
            <p className="text-sm text-[#6B7280]">
              Manage model assignments and track job status
            </p>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-8 border-b border-[#E5E7EB] mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-4 text-sm uppercase tracking-wide transition-all ${
                  activeTab === tab.id
                    ? 'text-[#0B0D10] border-b-2 border-[#E6C36A] font-medium'
                    : 'text-[#6B7280] hover:text-[#0B0D10]'
                }`}
              >
                {tab.label}
                <span className="ml-2 text-xs font-mono">({tab.count})</span>
              </button>
            ))}
          </div>

          {/* Jobs List */}
          <div className="space-y-4">
            {getCurrentJobs().length > 0 ? (
              getCurrentJobs().map((job) => (
                <JobCard key={job.id} job={job} type={activeTab} />
              ))
            ) : (
              <div className="text-center py-20">
                <p className="text-[#6B7280] text-sm uppercase tracking-wide">
                  No {activeTab} jobs
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}