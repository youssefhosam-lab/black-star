import React, { useState, useEffect, useMemo } from 'react';
import { useApp } from '../../App';
import { motion, AnimatePresence } from 'motion/react';
import {
  Settings,
  ChevronDown,
  User,
  ArrowUpRight,
  ArrowRight,
  LogOut,
} from 'lucide-react';
import svgPaths from '../../imports/svg-ba4sac7c1z';

// Import content components
import { ManufacturerOrders } from './ManufacturerOrders';
import { ManufacturerPlanning } from './ManufacturerPlanning';
import { ManufacturerInventory } from './ManufacturerInventory';
import { ManufacturerAnalytics } from './ManufacturerAnalytics';

// --- Types ---

interface Order {
  id: string;
  brand: string;
  qty: number;
  status: 'normal' | 'risk' | 'delayed';
  date: string;
  branch: string;
}

interface Bottleneck {
  id: string;
  issue: string;
  orderId: string;
  action: string;
  targetTab: string;
}

interface MaterialDependency {
  id: string;
  material: string;
  linkedOrders: number;
  eta: string;
  isLate: boolean;
}

// --- Mock Data ---

const BRANCHES = ['Milan Central (Hybrid)', 'Paris Atelier', 'Tokyo Lab'];

const generateMockOrders = (): Order[] => {
  const today = new Date();
  const orders: Order[] = [];
  
  const formatDate = (d: Date) => d.toISOString().split('T')[0];
  
  for (let i = -3; i <= 3; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const dateStr = formatDate(d);

    BRANCHES.forEach(branch => {
       orders.push({
         id: `ORD-${800 + Math.floor(Math.random() * 1000)}`,
         brand: ['Urban Revolt', 'Aesthete', 'Noir Et Blanc', 'Off-Culture'][Math.floor(Math.random() * 4)],
         qty: Math.floor(Math.random() * 2000) + 100,
         status: Math.random() > 0.8 ? 'delayed' : Math.random() > 0.8 ? 'risk' : 'normal',
         date: dateStr,
         branch: branch
       });
       
       if (Math.random() > 0.5) {
         orders.push({
            id: `ORD-${200 + Math.floor(Math.random() * 1000)}`,
            brand: 'Silence',
            qty: Math.floor(Math.random() * 500) + 50,
            status: 'normal',
            date: dateStr,
            branch: branch
         });
       }
    });
  }
  return orders;
};

const MOCK_ORDERS = generateMockOrders();

const MOCK_BOTTLENECKS: Bottleneck[] = [
  { id: 'BN-01', issue: 'Dye House Capacity', orderId: 'ORD-904', action: 'Re-route to Line B', targetTab: 'orders' },
  { id: 'BN-02', issue: 'Zipper Shortage', orderId: 'ORD-895', action: 'Approve Substitute', targetTab: 'inventory' },
];

const MOCK_DEPENDENCIES: MaterialDependency[] = [
  { id: 'MD-01', material: 'Heavyweight Cotton 400gsm', linkedOrders: 3, eta: 'Oct 28', isLate: false },
  { id: 'MD-02', material: 'YKK Silver Zippers', linkedOrders: 1, eta: 'Nov 02', isLate: true },
  { id: 'MD-03', material: 'Ecru Thread Spools', linkedOrders: 5, eta: 'Oct 25', isLate: false },
];

// --- Components ---

const StatusDot = ({ status, pulse = false }: { status: 'normal' | 'risk' | 'delayed' | 'success', pulse?: boolean }) => {
  const colors = {
    normal: 'bg-neutral-400',
    risk: 'bg-amber-500',
    delayed: 'bg-red-700',
    success: 'bg-emerald-600/80',
  };

  return (
    <div className="relative flex items-center justify-center w-3 h-3">
      {pulse && (
        <motion.div
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute w-full h-full rounded-full ${colors[status]}`}
        />
      )}
      <div className={`w-2 h-2 rounded-full ${colors[status]}`} />
    </div>
  );
};

const TopStrip = () => {
  const [capacity, setCapacity] = useState(78);
  const [activeOrders, setActiveOrders] = useState(42);
  const [onTimeRate, setOnTimeRate] = useState(98.5);

  useEffect(() => {
    const interval = setInterval(() => {
      setCapacity(prev => {
        const change = Math.random() > 0.6 ? (Math.random() > 0.5 ? 1 : -1) : 0;
        const next = prev + change;
        return Math.min(Math.max(next, 75), 85);
      });

      if (Math.random() > 0.95) {
        setActiveOrders(prev => prev + (Math.random() > 0.5 ? 1 : -1));
      }

      if (Math.random() > 0.8) {
        setOnTimeRate(prev => {
             const val = prev + (Math.random() - 0.5) * 0.1;
             return Number(val.toFixed(1));
        });
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-24 flex items-center px-0">
      <div className="grid grid-cols-4 w-full h-full divide-x divide-[#E6E6E3]">
        <div className="flex flex-col justify-center px-6 pl-0">
          <div className="flex items-center gap-2 mb-1">
             <StatusDot status="success" pulse />
             <span className="text-xs uppercase tracking-wider text-[#0F0F12]/60 font-['Inter_Tight']">System Status</span>
          </div>
          <span className="text-lg text-[#0F0F12] font-['Inter_Tight'] tracking-tight">Operating Normally</span>
        </div>

        <div className="flex flex-col justify-center px-6">
          <span className="text-xs uppercase tracking-wider text-[#0F0F12]/60 font-['Inter_Tight'] mb-1">Orders in Production</span>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl text-[#0F0F12] font-['Inter_Tight'] transition-all duration-500">{activeOrders}</span>
            <span className="text-xs text-[#0F0F12]/40">active</span>
          </div>
        </div>

        <div className="flex flex-col justify-center px-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs uppercase tracking-wider text-[#0F0F12]/60 font-['Inter_Tight']">Capacity Utilization</span>
            <span className="text-xs text-[#0F0F12] font-['IBM_Plex_Mono']">{capacity}%</span>
          </div>
          <div className="h-0.5 w-full bg-[#E6E6E3] overflow-hidden">
            <motion.div 
               initial={{ width: "78%" }}
               animate={{ width: `${capacity}%` }}
               transition={{ duration: 0.8, ease: "easeInOut" }}
               className="h-full bg-[#0F0F12]" 
            />
          </div>
        </div>

        <div className="flex flex-col justify-center px-6">
          <span className="text-xs uppercase tracking-wider text-[#0F0F12]/60 font-['Inter_Tight'] mb-1">On-Time Rate</span>
          <div className="flex items-center gap-2">
             <span className="text-2xl text-[#0F0F12] font-['Inter_Tight'] transition-all duration-500">{onTimeRate}%</span>
             <ArrowUpRight className="w-4 h-4 text-emerald-600" />
          </div>
        </div>
      </div>
    </div>
  );
};

const BranchSelector = ({ 
  selected, 
  onSelect 
}: { 
  selected: string; 
  onSelect: (branch: string) => void;
}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative z-40">
            <div 
                className="flex items-center gap-2 cursor-pointer group"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="text-right">
                    <div className="text-xs text-[#0F0F12]/60 uppercase tracking-wider font-['Inter_Tight']">Current Branch</div>
                    <div className="text-sm text-[#0F0F12] font-medium font-['Inter_Tight']">{selected}</div>
                </div>
                <div className={`w-8 h-8 border border-[#E6E6E3] flex items-center justify-center rounded-sm bg-white group-hover:border-[#0F0F12] transition-colors ${isOpen ? 'bg-[#0F0F12] border-[#0F0F12]' : ''}`}>
                    <ChevronDown className={`w-4 h-4 ${isOpen ? 'text-white' : 'text-[#0F0F12]'}`} />
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 top-full mt-2 w-56 bg-white border border-[#E6E6E3] rounded-lg shadow-xl overflow-hidden py-1"
                    >
                        {BRANCHES.map((branch) => (
                            <button
                                key={branch}
                                onClick={() => {
                                    onSelect(branch);
                                    setIsOpen(false);
                                }}
                                className={`w-full text-left px-4 py-3 text-sm font-['Inter_Tight'] hover:bg-[#F7F7F5] transition-colors ${
                                    selected === branch ? 'text-[#0F0F12] font-medium' : 'text-[#0F0F12]/60'
                                }`}
                            >
                                {branch}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

const HeroTimeline = ({ orders }: { orders: Order[] }) => {
    const days = useMemo(() => {
        const d = [];
        const today = new Date();
        for (let i = -3; i <= 3; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            d.push({
                dateObj: date,
                label: i === 0 ? 'Today' : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                isToday: i === 0,
                isoDate: date.toISOString().split('T')[0]
            });
        }
        return d;
    }, []);
    
    return (
        <div className="w-full bg-white border border-[#E6E6E3] p-6 rounded-lg mb-6">
             <div className="flex justify-between items-center mb-6">
                 <h2 className="text-lg font-['Inter_Tight'] text-[#0F0F12]">Production Timeline</h2>
                 <div className="flex gap-4">
                     <div className="flex items-center gap-2 text-xs text-[#0F0F12]/60 font-['Inter_Tight']">
                         <div className="w-2 h-2 rounded-full bg-neutral-400" /> Normal
                     </div>
                     <div className="flex items-center gap-2 text-xs text-[#0F0F12]/60 font-['Inter_Tight']">
                         <div className="w-2 h-2 rounded-full bg-amber-500" /> At Risk
                     </div>
                      <div className="flex items-center gap-2 text-xs text-[#0F0F12]/60 font-['Inter_Tight']">
                         <div className="w-2 h-2 rounded-full bg-red-700" /> Delayed
                     </div>
                 </div>
             </div>
             
             <div className="grid grid-cols-7 gap-4">
                 {days.map((day, i) => {
                     const dayOrders = orders.filter(o => o.date === day.isoDate);

                     return (
                         <div key={i} className={`flex flex-col gap-3 ${day.isToday ? 'opacity-100' : 'opacity-85'}`}>
                             <div className={`text-xs uppercase tracking-wider font-['Inter_Tight'] text-center py-2 border-b ${day.isToday ? 'border-[#0F0F12] text-[#0F0F12] font-bold' : 'border-[#E6E6E3] text-[#0F0F12]/40'}`}>
                                 {day.label}
                             </div>
                             
                             {dayOrders.length > 0 ? (
                                 dayOrders.map((order) => (
                                     <motion.div
                                        key={order.id}
                                        whileHover={{ y: -2, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}
                                        className="bg-[#F7F7F5] p-3 rounded-lg border border-transparent hover:border-[#E6E6E3] hover:bg-white transition-all cursor-pointer group"
                                     >
                                         <div className="flex justify-between items-start mb-2">
                                             <span className="text-[10px] text-[#0F0F12]/40 font-['IBM_Plex_Mono']">{order.id}</span>
                                             <StatusDot status={order.status} />
                                         </div>
                                         <div className="text-xs font-medium font-['Inter_Tight'] text-[#0F0F12] mb-1">{order.brand}</div>
                                         <div className="text-[10px] text-[#0F0F12]/60 font-['Inter_Tight']">{order.qty} units</div>
                                     </motion.div>
                                 ))
                             ) : (
                                 <div className="h-16 border border-dashed border-[#E6E6E3] rounded-lg flex items-center justify-center">
                                     <span className="text-[10px] text-[#0F0F12]/30 font-['Inter_Tight']">Free Slot</span>
                                 </div>
                             )}
                         </div>
                     );
                 })}
             </div>
        </div>
    )
}

const BottlenecksPanel = ({ onNavigate }: { onNavigate: (tab: string) => void }) => {
    return (
        <div className="h-full bg-white border border-[#E6E6E3] rounded-lg p-6">
            <h3 className="text-sm font-medium font-['Inter_Tight'] text-[#0F0F12] mb-6 flex items-center gap-2">
                Production Bottlenecks
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-amber-100 text-amber-700 text-[10px] font-bold">2</span>
            </h3>
            <div className="flex flex-col gap-4">
                {MOCK_BOTTLENECKS.map(bn => (
                    <motion.div 
                        key={bn.id}
                        onClick={() => onNavigate(bn.targetTab)}
                        whileHover={{ x: 4 }}
                        className="p-4 bg-[#FDFBF7] border-l-2 border-amber-500 rounded-r-lg cursor-pointer group transition-all hover:bg-[#FEF5E6]"
                    >
                        <div className="flex justify-between items-start">
                             <div className="text-xs text-amber-700 font-medium font-['Inter_Tight'] mb-1 uppercase tracking-wide">{bn.issue}</div>
                             <ArrowRight className="w-3 h-3 text-amber-700 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="text-sm text-[#0F0F12] mb-2 font-['Inter_Tight'] group-hover:underline">{bn.orderId}</div>
                        <div className="text-xs text-[#0F0F12]/60 font-['Inter_Tight']">Suggested: <span className="text-[#0F0F12] underline decoration-dotted">{bn.action}</span></div>
                    </motion.div>
                ))}
                <div className="p-4 border border-dashed border-[#E6E6E3] rounded-lg text-center py-8">
                    <span className="text-xs text-[#0F0F12]/40 font-['Inter_Tight']">No other critical issues detected</span>
                </div>
            </div>
        </div>
    )
}

const DependencyTracker = () => {
    return (
        <div className="bg-white border border-[#E6E6E3] rounded-lg p-6 mb-6">
            <h3 className="text-sm font-medium font-['Inter_Tight'] text-[#0F0F12] mb-4">Material Dependencies</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-[#E6E6E3]">
                            <th className="pb-2 text-[10px] uppercase text-[#0F0F12]/60 font-['Inter_Tight'] font-normal w-1/2">Material</th>
                            <th className="pb-2 text-[10px] uppercase text-[#0F0F12]/60 font-['Inter_Tight'] font-normal text-center">Orders</th>
                            <th className="pb-2 text-[10px] uppercase text-[#0F0F12]/60 font-['Inter_Tight'] font-normal text-right">ETA</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F7F7F5]">
                        {MOCK_DEPENDENCIES.map(dep => (
                            <tr key={dep.id} className={dep.isLate ? "bg-red-50/50" : ""}>
                                <td className="py-3 text-xs text-[#0F0F12] font-['Inter_Tight'] font-medium">{dep.material}</td>
                                <td className="py-3 text-xs text-[#0F0F12]/60 font-['Inter_Tight'] text-center">{dep.linkedOrders}</td>
                                <td className={`py-3 text-xs text-right font-['IBM_Plex_Mono'] ${dep.isLate ? 'text-red-700 font-medium' : 'text-[#0F0F12]/60'}`}>
                                    {dep.eta}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

const PerformanceMetrics = () => {
    const metrics = [
        { label: 'Weekly Output', value: '4,250', unit: 'units' },
        { label: 'Defect Rate', value: '0.8%', unit: 'of total' },
        { label: 'Rework Count', value: '12', unit: 'items' },
        { label: 'Avg Prod Time', value: '3.2', unit: 'days' },
    ];

    return (
        <div className="w-full bg-[#0F0F12] text-white p-6 rounded-xl flex justify-between items-center shadow-lg">
            <div className="mr-6 shrink-0">
                <h3 className="text-lg font-['Inter_Tight'] mb-1">Weekly Performance</h3>
                <p className="text-xs text-white/50 font-['Inter_Tight']">Updated 2h ago</p>
            </div>
            <div className="flex flex-1 justify-between divide-x divide-white/10">
                {metrics.map((m, i) => (
                    <div key={i} className="px-8 first:pl-0 last:pr-0 flex flex-col">
                        <div className="text-[10px] uppercase tracking-widest text-white/40 font-['Inter_Tight'] mb-2">{m.label}</div>
                        <div className="text-3xl font-['Inter_Tight'] mb-1 flex items-baseline gap-2">
                            {m.value}
                        </div>
                        <div className="text-[10px] text-white/30 font-['Inter_Tight']">{m.unit}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

// Dashboard Content Component
const DashboardContent = ({ selectedBranch, onTabChange }: { selectedBranch: string; onTabChange: (tab: string) => void }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const filteredOrders = useMemo(() => {
    return MOCK_ORDERS.filter(order => order.branch === selectedBranch);
  }, [selectedBranch]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      className="flex-1 flex flex-col"
    >
      {/* Top Strip - Metrics */}
      <div className="bg-white border-b border-[#E6E6E3]">
        <div className="max-w-[1600px] mx-auto px-8">
          <TopStrip />
        </div>
      </div>

      {/* Main Grid */}
      <div className="max-w-[1600px] mx-auto px-8 py-8">
        <div className="grid grid-cols-12 gap-6">
          
          {/* LEFT COLUMN (8) */}
          <div className="col-span-8 flex flex-col gap-6">
            <HeroTimeline orders={filteredOrders} />
            <PerformanceMetrics />
          </div>

          {/* RIGHT COLUMN (4) */}
          <div className="col-span-4 flex flex-col gap-6">
            <BottlenecksPanel onNavigate={onTabChange} />
            <DependencyTracker />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Main Component
export function UnifiedManufacturerDashboard() {
  const { navigate, setUser, user } = useApp();
  
  const [activeTab, setActiveTab] = useState<'dashboard' | 'orders' | 'planning' | 'inventory' | 'analytics'>('dashboard');
  const [selectedBranch, setSelectedBranch] = useState(BRANCHES[0]);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const manufacturerName = user?.name || 'BLACK STAR';

  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'orders', label: 'Orders' },
    { id: 'planning', label: 'Planning' },
    { id: 'inventory', label: 'Inventory' },
    { id: 'analytics', label: 'Analytics' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'orders':
        return <ManufacturerOrders />;
      case 'planning':
        return <ManufacturerPlanning />;
      case 'inventory':
        return <ManufacturerInventory />;
      case 'analytics':
        return <ManufacturerAnalytics />;
      default:
        return <DashboardContent selectedBranch={selectedBranch} onTabChange={(tab) => setActiveTab(tab as any)} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F7F5]">
      {/* Header */}
      <header className="bg-[#F7F7F5] border-b border-[#E6E6E3] sticky top-0 z-50">
        <div className="container mx-auto px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left - Logo + Manufacturer Name */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 text-[#0F0F12]">
                <svg className="w-full h-full block" fill="none" preserveAspectRatio="none" viewBox="0 0 202.174 168.474">
                  <path d={svgPaths.p10843180} fill="currentColor" id="Vector" />
                </svg>
              </div>
              <span className="text-sm uppercase tracking-wider font-['Inter_Tight'] text-[#0F0F12]">
                {manufacturerName}
              </span>
            </div>

            {/* Center - Navigation Tabs */}
            <nav className="hidden lg:flex items-center gap-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2 text-sm uppercase tracking-wider font-['Inter_Tight'] transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'text-[#0F0F12] border-b-2 border-[#0F0F12]'
                      : 'text-[#0F0F12]/60 hover:text-[#0F0F12]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>

            {/* Right - Branch Selector + User Menu */}
            <div className="flex items-center gap-4">
              <div className="h-8 w-px bg-[#E6E6E3]" />
              <BranchSelector 
                selected={selectedBranch} 
                onSelect={setSelectedBranch} 
              />
              
              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="w-10 h-10 rounded-full bg-[#0F0F12] flex items-center justify-center hover:opacity-80 transition-opacity"
                >
                  <User className="w-5 h-5 text-white" />
                </button>

                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 top-12 w-48 bg-white border border-[#E6E6E3] shadow-lg rounded-lg overflow-hidden"
                    >
                      <button
                        onClick={() => {
                          setShowUserMenu(false);
                          navigate('manufacturer-settings');
                        }}
                        className="w-full px-4 py-3 text-left hover:bg-[#F7F7F5] flex items-center gap-2 text-sm font-['Inter_Tight'] text-[#0F0F12] border-b border-[#E6E6E3]"
                      >
                        <User className="w-4 h-4" />
                        My Profile
                      </button>
                      <button
                        onClick={() => {
                          setShowUserMenu(false);
                          navigate('manufacturer-settings');
                        }}
                        className="w-full px-4 py-3 text-left hover:bg-[#F7F7F5] flex items-center gap-2 text-sm font-['Inter_Tight'] text-[#0F0F12] border-b border-[#E6E6E3]"
                      >
                        <Settings className="w-4 h-4" />
                        Settings
                      </button>
                      <button
                        onClick={() => {
                          setUser(null);
                          navigate('welcome');
                        }}
                        className="w-full px-4 py-3 text-left hover:bg-[#F7F7F5] flex items-center gap-2 text-sm font-['Inter_Tight'] text-red-600"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="w-full min-h-screen flex flex-col">
        {renderContent()}
      </div>
    </div>
  );
}