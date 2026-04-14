import { useState } from 'react';
import { useApp } from '../../App';
import { Bell, ChevronDown, Search, Filter } from 'lucide-react';
import Logo from '../../imports/Logo';

interface PrintJob {
  id: string;
  jobId: string;
  brand: string;
  printType: 'DTG' | 'Screen Print' | 'Embroidery' | 'Heat Press';
  colors: number;
  quantity: number;
  placement: string;
  status: 'Pending' | 'File Received' | 'Print Test' | 'Printing' | 'Completed' | 'Error';
  orderDate: string;
  deadline: string;
  totalValue: number;
}

export function PrintOnFactoryOrders() {
  const { navigate, user } = useApp();
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'active' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const jobs: PrintJob[] = [
    {
      id: '1',
      jobId: 'PRN-2024-0845',
      brand: 'Urban Collective',
      printType: 'DTG',
      colors: 4,
      quantity: 200,
      placement: 'Front Chest',
      status: 'Printing',
      orderDate: '2024-12-18',
      deadline: '2024-12-24',
      totalValue: 1800,
    },
    {
      id: '2',
      jobId: 'PRN-2024-0852',
      brand: 'Minimal Studio',
      printType: 'Screen Print',
      colors: 2,
      quantity: 500,
      placement: 'Back Full',
      status: 'Print Test',
      orderDate: '2024-12-19',
      deadline: '2024-12-26',
      totalValue: 2250,
    },
    {
      id: '3',
      jobId: 'PRN-2024-0860',
      brand: 'Heritage Co.',
      printType: 'Embroidery',
      colors: 3,
      quantity: 100,
      placement: 'Left Chest',
      status: 'Pending',
      orderDate: '2024-12-20',
      deadline: '2024-12-28',
      totalValue: 1200,
    },
    {
      id: '4',
      jobId: 'PRN-2024-0838',
      brand: 'Luxe Threads',
      printType: 'Heat Press',
      colors: 1,
      quantity: 300,
      placement: 'Front Center',
      status: 'Completed',
      orderDate: '2024-12-15',
      deadline: '2024-12-22',
      totalValue: 900,
    },
    {
      id: '5',
      jobId: 'PRN-2024-0848',
      brand: 'Street Culture',
      printType: 'DTG',
      colors: 6,
      quantity: 150,
      placement: 'Full Front + Back',
      status: 'Error',
      orderDate: '2024-12-17',
      deadline: '2024-12-25',
      totalValue: 1650,
    },
  ];

  const filteredJobs = jobs.filter((job) => {
    const matchesTab =
      activeTab === 'all' ||
      (activeTab === 'pending' && job.status === 'Pending') ||
      (activeTab === 'active' && (job.status === 'File Received' || job.status === 'Print Test' || job.status === 'Printing')) ||
      (activeTab === 'completed' && job.status === 'Completed');

    const matchesSearch =
      searchQuery === '' ||
      job.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.jobId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.printType.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesSearch;
  });

  const getStatusColor = (status: PrintJob['status']) => {
    switch (status) {
      case 'Pending':
        return 'bg-[#E5E7EB] text-[#0B0D10]';
      case 'File Received':
        return 'bg-[#9CA3AF]/20 text-[#0B0D10]';
      case 'Print Test':
        return 'bg-[#E6C36A]/20 text-[#0B0D10]';
      case 'Printing':
        return 'bg-[#0B0D10] text-white';
      case 'Completed':
        return 'bg-[#E6C36A]/40 text-[#0B0D10]';
      case 'Error':
        return 'bg-[#7A0F0F]/10 text-[#7A0F0F]';
      default:
        return 'bg-[#E5E7EB] text-[#0B0D10]';
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
                onClick={() => navigate(`print-on-factory-${item.toLowerCase()}`)}
                className={`text-sm font-medium transition-colors tracking-wide ${
                  item === 'Orders' ? 'text-[#0B0D10]' : 'text-[#9CA3AF] hover:text-[#0B0D10]'
                }`}
              >
                {item}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button className="relative p-2 hover:bg-[#E5E7EB]/50 rounded-full transition-colors">
              <Bell className="w-5 h-5 text-[#0B0D10]" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#E6C36A] rounded-full" />
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

      {/* Jobs Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-5xl font-['Playfair_Display'] font-bold text-[#0B0D10]">
            Print Jobs
          </h1>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF]" />
            <input
              type="text"
              placeholder="Search by brand, job ID, or print type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-[#E5E7EB] text-[#0B0D10] placeholder-[#9CA3AF] focus:border-[#0B0D10] focus:outline-none"
            />
          </div>
          <button className="px-6 py-3 border border-[#E5E7EB] text-[#0B0D10] hover:border-[#0B0D10] transition-colors flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filter
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-[#E5E7EB]">
          {[
            { id: 'all', label: 'All Jobs', count: jobs.length },
            { id: 'pending', label: 'Pending', count: jobs.filter((j) => j.status === 'Pending').length },
            { id: 'active', label: 'Active', count: jobs.filter((j) => j.status === 'File Received' || j.status === 'Print Test' || j.status === 'Printing').length },
            { id: 'completed', label: 'Completed', count: jobs.filter((j) => j.status === 'Completed').length },
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

        {/* Jobs List */}
        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="border border-[#E5E7EB] hover:border-[#0B0D10] transition-colors"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <h3 className="text-xl font-['Playfair_Display'] font-bold text-[#0B0D10]">
                        {job.printType}
                      </h3>
                      <span className={`px-3 py-1 text-xs font-medium ${getStatusColor(job.status)}`}>
                        {job.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                      <div>
                        <p className="text-[#9CA3AF] mb-1">Job ID</p>
                        <p className="text-[#0B0D10] font-medium">{job.jobId}</p>
                      </div>
                      <div>
                        <p className="text-[#9CA3AF] mb-1">Brand</p>
                        <p className="text-[#0B0D10] font-medium">{job.brand}</p>
                      </div>
                      <div>
                        <p className="text-[#9CA3AF] mb-1">Quantity</p>
                        <p className="text-[#0B0D10] font-medium">{job.quantity} units</p>
                      </div>
                      <div>
                        <p className="text-[#9CA3AF] mb-1">Colors</p>
                        <p className="text-[#0B0D10] font-medium">{job.colors} colors</p>
                      </div>
                      <div>
                        <p className="text-[#9CA3AF] mb-1">Placement</p>
                        <p className="text-[#0B0D10] font-medium">{job.placement}</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right ml-6">
                    <p className="text-sm text-[#9CA3AF] mb-1">Deadline</p>
                    <p className="text-lg font-medium text-[#0B0D10]">
                      {new Date(job.deadline).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>
                    <p className="text-xs text-[#9CA3AF] mt-2">${job.totalValue.toLocaleString()}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E5E7EB] flex gap-3">
                  {job.status === 'Pending' && (
                    <>
                      <button className="px-4 py-2 bg-[#0B0D10] text-white text-sm font-medium hover:opacity-90 transition-opacity">
                        Accept Job
                      </button>
                      <button className="px-4 py-2 border border-[#E5E7EB] text-[#0B0D10] text-sm font-medium hover:border-[#0B0D10] transition-colors">
                        Reject
                      </button>
                    </>
                  )}
                  {job.status !== 'Pending' && job.status !== 'Completed' && (
                    <button
                      onClick={() => navigate('print-on-factory-production', { jobId: job.id })}
                      className="px-4 py-2 bg-[#0B0D10] text-white text-sm font-medium hover:opacity-90 transition-opacity"
                    >
                      View Production →
                    </button>
                  )}
                  {job.status === 'Error' && (
                    <button className="px-4 py-2 bg-[#7A0F0F] text-white text-sm font-medium hover:opacity-90 transition-opacity">
                      Report Error
                    </button>
                  )}
                  <button className="px-4 py-2 border border-[#E5E7EB] text-[#0B0D10] text-sm font-medium hover:border-[#0B0D10] transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-16">
            <p className="text-[#9CA3AF] text-lg">No jobs found</p>
          </div>
        )}
      </div>
    </div>
  );
}
