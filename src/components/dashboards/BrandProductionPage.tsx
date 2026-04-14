import React, { useState, useEffect } from 'react';
import { useApp } from '../../App';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bell, ChevronDown, Package, Factory, Users, TrendingUp,
  Clock, AlertTriangle, CheckCircle, MessageSquare, Upload,
  Eye, Flag, Calendar, FileText, X, Search, ChevronRight
} from 'lucide-react';

// --- Mock Data ---
const productionOrders = [
  {
    id: 'ORD-2024-001',
    productName: 'Midnight Collection Blazer',
    manufacturer: 'Luxe Manufacture Co.',
    quantity: 150,
    currentStage: 'Sew',
    stages: {
      Design: { completed: true, startDate: '2024-12-01', endDate: '2024-12-03' },
      Pattern: { completed: true, startDate: '2024-12-03', endDate: '2024-12-05' },
      Fabric: { completed: true, startDate: '2024-12-05', endDate: '2024-12-08' },
      Cut: { completed: true, startDate: '2024-12-08', endDate: '2024-12-10' },
      Sew: { completed: false, startDate: '2024-12-10', endDate: null },
      Print: { completed: false, startDate: null, endDate: null },
      QC: { completed: false, startDate: null, endDate: null },
      Pack: { completed: false, startDate: null, endDate: null }
    },
    lastUpdate: '2 hours ago',
    estimatedCompletion: '2024-12-28',
    hasIssue: false
  },
  {
    id: 'ORD-2024-002',
    productName: 'Spring Essential Trousers',
    manufacturer: 'Cairo Textiles Ltd.',
    quantity: 200,
    currentStage: 'QC',
    stages: {
      Design: { completed: true, startDate: '2024-11-20', endDate: '2024-11-22' },
      Pattern: { completed: true, startDate: '2024-11-22', endDate: '2024-11-25' },
      Fabric: { completed: true, startDate: '2024-11-25', endDate: '2024-11-28' },
      Cut: { completed: true, startDate: '2024-11-28', endDate: '2024-12-01' },
      Sew: { completed: true, startDate: '2024-12-01', endDate: '2024-12-10' },
      Print: { completed: true, startDate: '2024-12-10', endDate: '2024-12-12' },
      QC: { completed: false, startDate: '2024-12-12', endDate: null },
      Pack: { completed: false, startDate: null, endDate: null }
    },
    lastUpdate: '5 hours ago',
    estimatedCompletion: '2024-12-20',
    hasIssue: false
  },
  {
    id: 'ORD-2024-003',
    productName: 'Minimal Linen Shirt',
    manufacturer: 'Alexandria Fabrics',
    quantity: 100,
    currentStage: 'Fabric',
    stages: {
      Design: { completed: true, startDate: '2024-12-08', endDate: '2024-12-10' },
      Pattern: { completed: true, startDate: '2024-12-10', endDate: '2024-12-12' },
      Fabric: { completed: false, startDate: '2024-12-12', endDate: null },
      Cut: { completed: false, startDate: null, endDate: null },
      Sew: { completed: false, startDate: null, endDate: null },
      Print: { completed: false, startDate: null, endDate: null },
      QC: { completed: false, startDate: null, endDate: null },
      Pack: { completed: false, startDate: null, endDate: null }
    },
    lastUpdate: '1 day ago',
    estimatedCompletion: '2025-01-05',
    hasIssue: true,
    issueDescription: 'Fabric shipment delayed by supplier'
  }
];

const manufacturers = [
  'All Manufacturers',
  'Luxe Manufacture Co.',
  'Cairo Textiles Ltd.',
  'Alexandria Fabrics',
  'Delta Fashion Factory'
];

const productionIssues = [
  {
    id: '1',
    orderId: 'ORD-2024-003',
    productName: 'Minimal Linen Shirt',
    stage: 'Fabric',
    description: 'Fabric shipment delayed by supplier. Expected to arrive 3 days late.',
    manufacturerResponse: 'We are coordinating with the supplier. Will update by EOD.',
    severity: 'medium',
    timestamp: '1 day ago'
  }
];

// --- Components ---

const Header = ({ currentPage }: { currentPage: string }) => {
  const { navigate } = useApp();
  const [animatedBrandName, setAnimatedBrandName] = useState('');
  const brandName = 'BLACK STAR';

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < brandName.length) {
        setAnimatedBrandName(brandName.substring(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 h-[72px] bg-[#0B0D10] border-b border-[#1E2230] z-50">
      <div className="h-full px-8 flex items-center justify-between">
        {/* Left - Brand Name */}
        <div className="flex items-center gap-6">
          <div className="text-[#E6C36A] text-xl">★</div>
          <h1 className="font-['Playfair_Display'] text-xl text-[#E6C36A] tracking-wide">
            {animatedBrandName}
          </h1>
        </div>

        {/* Center - Navigation */}
        <nav className="flex items-center gap-8">
          <button
            onClick={() => navigate('brand-dashboard')}
            className={`text-xs uppercase tracking-[0.1em] transition-all ${
              currentPage === 'dashboard' 
                ? 'text-white border-b-2 border-[#E6C36A] pb-1' 
                : 'text-white/70 hover:text-[#E6C36A]'
            }`}
          >
            Dashboard
          </button>
          <button
            className={`text-xs uppercase tracking-[0.1em] transition-all ${
              currentPage === 'production' 
                ? 'text-white border-b-2 border-[#E6C36A] pb-1' 
                : 'text-white/70 hover:text-[#E6C36A]'
            }`}
          >
            Production
          </button>
          <button
            onClick={() => navigate('brand-community')}
            className={`text-xs uppercase tracking-[0.1em] transition-all ${
              currentPage === 'community' 
                ? 'text-white border-b-2 border-[#E6C36A] pb-1' 
                : 'text-white/70 hover:text-[#E6C36A]'
            }`}
          >
            Community
          </button>
          <button
            className={`text-xs uppercase tracking-[0.1em] transition-all ${
              currentPage === 'analytics' 
                ? 'text-white border-b-2 border-[#E6C36A] pb-1' 
                : 'text-white/70 hover:text-[#E6C36A]'
            }`}
          >
            Analytics
          </button>
        </nav>

        {/* Right - Controls */}
        <div className="flex items-center gap-4">
          <button className="relative text-white hover:text-[#E6C36A] transition-colors">
            <Bell className="size-5" />
            <span className="absolute -top-1 -right-1 size-2 bg-[#B91C1C] rounded-full" />
          </button>
          <div className="size-8 rounded-full bg-[#E6C36A] flex items-center justify-center">
            <span className="text-[#0B0D10] text-xs font-medium">BS</span>
          </div>
          <button className="text-white hover:text-[#E6C36A] transition-colors">
            <ChevronDown className="size-4" />
          </button>
        </div>
      </div>
    </header>
  );
};

const LeftSidebar = ({ 
  activeFilter, 
  setActiveFilter,
  selectedManufacturer,
  setSelectedManufacturer,
  timelineFilter,
  setTimelineFilter
}: any) => {
  const filters = [
    { id: 'all', label: 'All Orders', count: 3 },
    { id: 'pending', label: 'Pending Approval', count: 0 },
    { id: 'production', label: 'In Production', count: 2 },
    { id: 'qc', label: 'Quality Check', count: 1 },
    { id: 'shipping', label: 'Ready for Shipping', count: 0 },
    { id: 'completed', label: 'Completed', count: 0 },
    { id: 'issues', label: 'Disputed / Issues', count: 1, hasWarning: true }
  ];

  return (
    <aside className="fixed left-0 top-[72px] bottom-0 w-[260px] bg-[#FAFAFA] border-r border-[#E5E5E5] overflow-y-auto">
      <div className="p-6 space-y-8">
        {/* Production Status Filters */}
        <div>
          <h3 className="text-xs uppercase tracking-wide text-[#6B7280] mb-4">Production Status</h3>
          <div className="space-y-1">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`w-full flex items-center justify-between px-4 py-3 transition-all ${
                  activeFilter === filter.id
                    ? 'bg-white border-l-4 border-[#E6C36A] text-[#0B0D10] font-medium shadow-sm'
                    : 'text-[#6B7280] hover:bg-white hover:text-[#0B0D10]'
                }`}
              >
                <div className="flex items-center gap-2">
                  {filter.hasWarning && <AlertTriangle className="size-4 text-[#B91C1C]" />}
                  <span className="text-sm">{filter.label}</span>
                </div>
                <span className="text-xs bg-[#E5E5E5] px-2 py-0.5 rounded">{filter.count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Manufacturer Filter */}
        <div>
          <h3 className="text-xs uppercase tracking-wide text-[#6B7280] mb-4">Manufacturer</h3>
          <div className="relative">
            <select
              value={selectedManufacturer}
              onChange={(e) => setSelectedManufacturer(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-[#E5E5E5] rounded text-sm text-[#0B0D10] appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#E6C36A]"
            >
              {manufacturers.map((mfg) => (
                <option key={mfg} value={mfg}>{mfg}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-[#6B7280] pointer-events-none" />
          </div>
        </div>

        {/* Timeline Filter */}
        <div>
          <h3 className="text-xs uppercase tracking-wide text-[#6B7280] mb-4">Timeline</h3>
          <div className="space-y-1">
            {['Last 7 days', 'Last 30 days', 'Custom range'].map((option) => (
              <button
                key={option}
                onClick={() => setTimelineFilter(option)}
                className={`w-full text-left px-4 py-2 text-sm transition-all ${
                  timelineFilter === option
                    ? 'bg-white text-[#0B0D10] font-medium'
                    : 'text-[#6B7280] hover:bg-white hover:text-[#0B0D10]'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};

const SummaryCard = ({ icon: Icon, label, value, trend, delay }: any) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let current = 0;
    const target = parseInt(value);
    const increment = Math.ceil(target / 20);
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, 50);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white p-6 rounded-xl shadow-sm border border-[#E5E5E5] hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-[#FAFAFA] rounded-lg">
          <Icon className="size-5 text-[#0B0D10]" />
        </div>
        {trend && (
          <span className={`text-xs px-2 py-1 rounded ${
            trend.includes('+') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
          }`}>
            {trend}
          </span>
        )}
      </div>
      <p className="text-3xl font-medium text-[#0B0D10] mb-1">{count}</p>
      <p className="text-xs uppercase tracking-wide text-[#6B7280]">{label}</p>
    </motion.div>
  );
};

const ProgressBar = ({ stages, currentStage }: any) => {
  const stageOrder = ['Design', 'Pattern', 'Fabric', 'Cut', 'Sew', 'Print', 'QC', 'Pack'];
  
  return (
    <div className="flex items-center gap-1">
      {stageOrder.map((stage, index) => {
        const isCompleted = stages[stage]?.completed;
        const isCurrent = currentStage === stage;
        
        return (
          <div
            key={stage}
            className={`h-2 flex-1 rounded-sm transition-all ${
              isCompleted 
                ? 'bg-[#0B0D10]' 
                : isCurrent 
                ? 'bg-[#E6C36A]' 
                : 'bg-[#E5E5E5]'
            }`}
            title={stage}
          />
        );
      })}
    </div>
  );
};

const ProductionTable = ({ orders, onViewDetails }: any) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-[#E5E5E5] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#FAFAFA] border-b border-[#E5E5E5]">
            <tr>
              <th className="text-left px-6 py-4 text-xs uppercase tracking-wide text-[#6B7280]">Order ID</th>
              <th className="text-left px-6 py-4 text-xs uppercase tracking-wide text-[#6B7280]">Product Name</th>
              <th className="text-left px-6 py-4 text-xs uppercase tracking-wide text-[#6B7280]">Manufacturer</th>
              <th className="text-left px-6 py-4 text-xs uppercase tracking-wide text-[#6B7280]">Quantity</th>
              <th className="text-left px-6 py-4 text-xs uppercase tracking-wide text-[#6B7280]">Stage</th>
              <th className="text-left px-6 py-4 text-xs uppercase tracking-wide text-[#6B7280]" style={{ minWidth: '200px' }}>Progress</th>
              <th className="text-left px-6 py-4 text-xs uppercase tracking-wide text-[#6B7280]">Last Update</th>
              <th className="text-left px-6 py-4 text-xs uppercase tracking-wide text-[#6B7280]">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order: any, index: number) => (
              <motion.tr
                key={order.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border-b border-[#E5E5E5] hover:bg-[#FAFAFA] transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-[#0B0D10]">{order.id}</span>
                    {order.hasIssue && <AlertTriangle className="size-4 text-[#B91C1C]" />}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-[#0B0D10]">{order.productName}</td>
                <td className="px-6 py-4 text-sm text-[#6B7280]">{order.manufacturer}</td>
                <td className="px-6 py-4 text-sm text-[#0B0D10]">{order.quantity}</td>
                <td className="px-6 py-4">
                  <span className="inline-block px-3 py-1 bg-[#E6C36A]/10 text-[#0B0D10] text-xs uppercase tracking-wide rounded">
                    {order.currentStage}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <ProgressBar stages={order.stages} currentStage={order.currentStage} />
                </td>
                <td className="px-6 py-4 text-sm text-[#6B7280]">{order.lastUpdate}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onViewDetails(order)}
                      className="p-2 hover:bg-white rounded transition-colors group"
                      title="View Details"
                    >
                      <Eye className="size-4 text-[#6B7280] group-hover:text-[#E6C36A]" />
                    </button>
                    <button className="p-2 hover:bg-white rounded transition-colors group" title="Message Manufacturer">
                      <MessageSquare className="size-4 text-[#6B7280] group-hover:text-[#E6C36A]" />
                    </button>
                    <button className="p-2 hover:bg-white rounded transition-colors group" title="Flag Issue">
                      <Flag className="size-4 text-[#6B7280] group-hover:text-[#B91C1C]" />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const OrderDetailPanel = ({ order, onClose }: any) => {
  const stageOrder = ['Design', 'Pattern', 'Fabric', 'Cut', 'Sew', 'Print', 'QC', 'Pack'];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-end"
      onClick={onClose}
    >
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl h-full bg-white shadow-2xl overflow-y-auto"
      >
        {/* Panel Header */}
        <div className="sticky top-0 bg-[#0B0D10] p-6 flex items-center justify-between border-b border-[#1E2230] z-10">
          <div>
            <h2 className="text-lg font-medium text-white mb-1">{order.productName}</h2>
            <p className="text-sm text-[#E6C36A]">{order.id}</p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-[#E6C36A] transition-colors"
          >
            <X className="size-6" />
          </button>
        </div>

        {/* Panel Content */}
        <div className="p-6 space-y-8">
          {/* Order Overview */}
          <div className="bg-[#FAFAFA] p-6 rounded-xl">
            <h3 className="text-xs uppercase tracking-wide text-[#6B7280] mb-4">Order Overview</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-[#6B7280] mb-1">Manufacturer</p>
                <p className="text-sm font-medium text-[#0B0D10]">{order.manufacturer}</p>
              </div>
              <div>
                <p className="text-xs text-[#6B7280] mb-1">Quantity</p>
                <p className="text-sm font-medium text-[#0B0D10]">{order.quantity} units</p>
              </div>
              <div>
                <p className="text-xs text-[#6B7280] mb-1">Current Stage</p>
                <p className="text-sm font-medium text-[#E6C36A]">{order.currentStage}</p>
              </div>
              <div>
                <p className="text-xs text-[#6B7280] mb-1">Est. Completion</p>
                <p className="text-sm font-medium text-[#0B0D10]">{order.estimatedCompletion}</p>
              </div>
            </div>
          </div>

          {/* Stage-by-Stage Breakdown */}
          <div>
            <h3 className="text-xs uppercase tracking-wide text-[#6B7280] mb-4">Production Timeline</h3>
            <div className="space-y-4">
              {stageOrder.map((stageName, index) => {
                const stage = order.stages[stageName];
                const isCompleted = stage?.completed;
                const isCurrent = order.currentStage === stageName;

                return (
                  <div key={stageName} className="relative pl-8">
                    {/* Timeline Line */}
                    {index < stageOrder.length - 1 && (
                      <div className={`absolute left-[11px] top-8 w-0.5 h-full ${
                        isCompleted ? 'bg-[#0B0D10]' : 'bg-[#E5E5E5]'
                      }`} />
                    )}
                    
                    {/* Timeline Dot */}
                    <div className={`absolute left-0 top-2 size-6 rounded-full border-2 flex items-center justify-center ${
                      isCompleted 
                        ? 'bg-[#0B0D10] border-[#0B0D10]' 
                        : isCurrent 
                        ? 'bg-[#E6C36A] border-[#E6C36A]' 
                        : 'bg-white border-[#E5E5E5]'
                    }`}>
                      {isCompleted && <CheckCircle className="size-3 text-white" />}
                    </div>

                    {/* Stage Content */}
                    <div className={`pb-4 ${isCurrent ? 'bg-[#E6C36A]/5 -ml-4 pl-4 -mr-4 pr-4 py-2 rounded' : ''}`}>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium text-[#0B0D10]">{stageName}</h4>
                        {isCompleted && (
                          <span className="text-xs text-green-700 bg-green-50 px-2 py-1 rounded">Completed</span>
                        )}
                        {isCurrent && (
                          <span className="text-xs text-[#E6C36A] bg-[#E6C36A]/10 px-2 py-1 rounded">In Progress</span>
                        )}
                      </div>
                      
                      {stage?.startDate && (
                        <div className="flex items-center gap-4 text-xs text-[#6B7280]">
                          <div className="flex items-center gap-1">
                            <Calendar className="size-3" />
                            <span>Started: {stage.startDate}</span>
                          </div>
                          {stage.endDate && (
                            <div className="flex items-center gap-1">
                              <CheckCircle className="size-3" />
                              <span>Completed: {stage.endDate}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Communication Area */}
          <div className="bg-[#FAFAFA] p-6 rounded-xl">
            <h3 className="text-xs uppercase tracking-wide text-[#6B7280] mb-4">Communication</h3>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded border border-[#E5E5E5]">
                <div className="flex items-start gap-3 mb-2">
                  <div className="size-8 rounded-full bg-[#0B0D10] flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs">MF</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium text-[#0B0D10]">{order.manufacturer}</p>
                      <span className="text-xs text-[#6B7280]">Yesterday</span>
                    </div>
                    <p className="text-sm text-[#6B7280]">Production is on track. We've completed the cutting phase and are moving to sewing.</p>
                  </div>
                </div>
              </div>

              {/* Message Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-3 bg-white border border-[#E5E5E5] rounded text-sm text-[#0B0D10] focus:outline-none focus:ring-2 focus:ring-[#E6C36A]"
                />
                <button className="px-4 py-3 bg-[#0B0D10] text-white rounded hover:bg-black transition-colors">
                  <MessageSquare className="size-4" />
                </button>
                <button className="px-4 py-3 bg-[#FAFAFA] border border-[#E5E5E5] text-[#6B7280] rounded hover:bg-white transition-colors">
                  <Upload className="size-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const IssuesSection = ({ issues }: any) => {
  if (issues.length === 0) {
    return (
      <div className="bg-white p-8 rounded-xl shadow-sm border border-[#E5E5E5] text-center">
        <CheckCircle className="size-12 text-green-600 mx-auto mb-3" />
        <p className="text-sm text-[#6B7280]">No production issues at this time.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {issues.map((issue: any) => (
        <motion.div
          key={issue.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white border-l-4 border-[#B91C1C] p-6 rounded-xl shadow-sm"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="size-5 text-[#B91C1C] flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-[#0B0D10] mb-1">
                  {issue.productName} - {issue.stage}
                </h4>
                <p className="text-xs text-[#6B7280]">{issue.orderId} • {issue.timestamp}</p>
              </div>
            </div>
            <span className="px-2 py-1 bg-orange-50 text-orange-700 text-xs uppercase tracking-wide rounded">
              Medium Priority
            </span>
          </div>

          <p className="text-sm text-[#0B0D10] mb-3">{issue.description}</p>

          {issue.manufacturerResponse && (
            <div className="bg-[#FAFAFA] p-4 rounded mb-4">
              <p className="text-xs uppercase tracking-wide text-[#6B7280] mb-1">Manufacturer Response</p>
              <p className="text-sm text-[#0B0D10]">{issue.manufacturerResponse}</p>
            </div>
          )}

          <div className="flex gap-2">
            <button className="px-4 py-2 bg-green-600 text-white text-xs uppercase tracking-wide rounded hover:bg-green-700 transition-colors">
              Approve Fix
            </button>
            <button className="px-4 py-2 bg-[#0B0D10] text-white text-xs uppercase tracking-wide rounded hover:bg-black transition-colors">
              Request Revision
            </button>
            <button className="px-4 py-2 bg-white border border-[#E5E5E5] text-[#6B7280] text-xs uppercase tracking-wide rounded hover:bg-[#FAFAFA] transition-colors">
              Escalate
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export function BrandProductionPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedManufacturer, setSelectedManufacturer] = useState('All Manufacturers');
  const [timelineFilter, setTimelineFilter] = useState('Last 30 days');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Header currentPage="production" />
      <LeftSidebar
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        selectedManufacturer={selectedManufacturer}
        setSelectedManufacturer={setSelectedManufacturer}
        timelineFilter={timelineFilter}
        setTimelineFilter={setTimelineFilter}
      />

      {/* Main Content */}
      <div className="pl-[260px] pt-[72px]">
        <div className="p-8 space-y-8">
          {/* Summary Cards */}
          <div className="grid grid-cols-4 gap-6">
            <SummaryCard
              icon={Package}
              label="Active Orders"
              value="3"
              trend="+2 this week"
              delay={0}
            />
            <SummaryCard
              icon={AlertTriangle}
              label="Delayed Orders"
              value="1"
              delay={0.1}
            />
            <SummaryCard
              icon={Clock}
              label="Avg Production Time"
              value="18"
              trend="-3 days"
              delay={0.2}
            />
            <SummaryCard
              icon={TrendingUp}
              label="Total Units in Production"
              value="450"
              delay={0.3}
            />
          </div>

          {/* Production Orders Table */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-[#0B0D10]">Production Orders</h2>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#6B7280]" />
                  <input
                    type="text"
                    placeholder="Search orders..."
                    className="pl-10 pr-4 py-2 bg-white border border-[#E5E5E5] rounded text-sm text-[#0B0D10] focus:outline-none focus:ring-2 focus:ring-[#E6C36A]"
                  />
                </div>
              </div>
            </div>
            <ProductionTable orders={productionOrders} onViewDetails={setSelectedOrder} />
          </div>

          {/* Issues & Quality Control */}
          <div>
            <h2 className="text-lg font-medium text-[#0B0D10] mb-4">Issues & Quality Control</h2>
            <IssuesSection issues={productionIssues} />
          </div>
        </div>
      </div>

      {/* Order Detail Panel */}
      <AnimatePresence>
        {selectedOrder && (
          <OrderDetailPanel order={selectedOrder} onClose={() => setSelectedOrder(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
