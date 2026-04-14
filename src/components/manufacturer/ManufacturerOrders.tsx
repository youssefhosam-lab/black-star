import React, { useState, useEffect } from 'react';
import { useApp } from '../../App';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  Package, 
  Layers, 
  BarChart3, 
  Users, 
  Settings, 
  Search, 
  Filter, 
  Calendar,
  X,
  Bell,
  Check,
  AlertTriangle,
  ArrowRight,
  MessageSquare,
  Clock,
  Activity,
  FileText,
  ChevronRight,
  AlertCircle,
  ThumbsUp,
  TrendingUp,
  ShieldCheck,
  Zap
} from 'lucide-react';

// --- Top Navigation Bar ---
const TopNavigation = () => {
  const { navigate, currentPage } = useApp();

  return (
    <div className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-[#E5E5E5] flex items-center justify-between px-6 z-50">
      {/* Left: Logo & Factory Name */}
      <div className="flex items-center gap-4 w-1/3">
        <div 
          className="flex items-center gap-4 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => navigate('manufacturer-dashboard')}
        >
          <div className="w-8 h-8 bg-[#05080D] rounded-full flex items-center justify-center flex-shrink-0">
            <div className="w-2 h-2 bg-[#D4B062] rounded-full" />
          </div>
          <span className="text-sm font-semibold text-[#05080D] tracking-wide whitespace-nowrap">
            Black Star
          </span>
        </div>
      </div>

      {/* Middle: Page Name */}
      <div className="flex justify-center w-1/3">
        <h1 className="text-base font-serif font-medium text-[#05080D]">Orders</h1>
      </div>

      {/* Right: Navigation, Notifications, Avatar */}
      <div className="flex items-center justify-end gap-6 w-1/3">
        {/* Navigation Icons Removed as per user request */}

        {/* Separator */}
        <div className="h-6 w-px bg-[#E5E5E5]" />

        {/* Notification & Avatar */}
        <div className="flex items-center gap-4">
          <button className="relative">
            <Bell className="w-5 h-5 text-[#5E6F7A]" />
            <div className="absolute top-0 right-0 w-2 h-2 rounded-full bg-[#D9534F] border-2 border-white" />
          </button>
          <button className="w-8 h-8 rounded-full bg-[#05080D] text-white text-xs flex items-center justify-center font-medium">
            M
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Mock Data ---

type MaterialStatus = 'Available' | 'Partial' | 'Missing';
type ProductionSlot = 'Fits' | 'Tight' | 'No Slot';
type OrderState = 'New' | 'Active' | 'Risk' | 'Finished';

interface Order {
  id: string;
  brand: string;
  product: string;
  deadline: string;
  isDeadlineUrgent: boolean;
  materialStatus: MaterialStatus;
  productionSlot: ProductionSlot;
  state: OrderState;
  actionHint: string;
}

const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    brand: 'Urban Revolt',
    product: 'Heavyweight Hoodie',
    deadline: 'Oct 24',
    isDeadlineUrgent: true,
    materialStatus: 'Available',
    productionSlot: 'Tight',
    state: 'Risk',
    actionHint: 'Resolve'
  },
  {
    id: 'ORD-002',
    brand: 'Aesthete',
    product: 'Linen Trousers',
    deadline: 'Oct 28',
    isDeadlineUrgent: false,
    materialStatus: 'Partial',
    productionSlot: 'Fits',
    state: 'New',
    actionHint: 'Review'
  },
  {
    id: 'ORD-003',
    brand: 'Noir Et Blanc',
    product: 'Structure Blazer',
    deadline: 'Nov 02',
    isDeadlineUrgent: false,
    materialStatus: 'Available',
    productionSlot: 'Fits',
    state: 'Active',
    actionHint: 'Track'
  },
  {
    id: 'ORD-004',
    brand: 'Off-Culture',
    product: 'Graphic Tee',
    deadline: 'Oct 22',
    isDeadlineUrgent: true,
    materialStatus: 'Missing',
    productionSlot: 'No Slot',
    state: 'Risk',
    actionHint: 'Resolve'
  },
  {
    id: 'ORD-005',
    brand: 'Silence',
    product: 'Basic Tee',
    deadline: 'Nov 10',
    isDeadlineUrgent: false,
    materialStatus: 'Available',
    productionSlot: 'Fits',
    state: 'New',
    actionHint: 'Review'
  },
  {
    id: 'ORD-006',
    brand: 'Vanguard',
    product: 'Cargo Pants',
    deadline: 'Nov 05',
    isDeadlineUrgent: false,
    materialStatus: 'Available',
    productionSlot: 'Fits',
    state: 'Finished',
    actionHint: 'Archive'
  }
];

// --- Detail View Logic ---

interface DetailedOrder extends Order {
    specifications: {
      fabric: string;
      color: string;
      sizes: string;
      notes: string;
      image: string; 
    };
    inventoryImpact: {
      fabric: string;
      available: number;
      required: number;
      unit: string;
      status: 'safe' | 'tight' | 'insufficient';
    }[];
    machineStatus: {
      machine: string;
      load: string;
      required: string;
      status: 'available' | 'busy' | 'maintenance';
    }[];
    timeline: {
      step: string;
      date: string;
      status: 'completed' | 'active' | 'pending';
    }[];
    journey?: {
      stage: string;
      status: 'completed' | 'active' | 'pending';
      date: string;
      responsible: string;
    }[];
    metrics?: {
      efficiency: number;
      timeAccuracy: number;
      quality: number;
    };
}

const getOrderDetails = (baseOrder: Order): DetailedOrder => {
    const isRisk = baseOrder.state === 'Risk';
    const isNew = baseOrder.state === 'New';
    
    return {
      ...baseOrder,
      specifications: {
        fabric: 'Heavyweight Cotton Fleece 400gsm',
        color: 'Carbon Black',
        sizes: 'S: 50, M: 150, L: 100, XL: 50',
        notes: 'Double-needle stitching required. Puff print on back.',
        image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=600&h=800'
      },
      inventoryImpact: [
        { fabric: 'Cotton Fleece 400gsm', available: 1200, required: 850, unit: 'm', status: 'safe' },
        { fabric: 'Ribbing 1x1', available: 200, required: 180, unit: 'm', status: 'tight' },
        ...(isRisk || baseOrder.materialStatus === 'Missing' ? [{ fabric: 'Specialty Thread', available: 20, required: 50, unit: 'spools', status: 'insufficient' as const }] : [])
      ],
      machineStatus: [
        { machine: 'Cutter GF-01', load: '85%', required: '6h', status: 'available' },
        { machine: 'Sewing Line A', load: '92%', required: '18h', status: 'busy' }
      ],
      timeline: [
          { step: 'Order Received', date: 'Oct 20', status: 'completed' },
          { step: 'Material Check', date: 'Oct 21', status: 'completed' },
          { step: 'Production', date: 'Oct 24', status: 'active' },
          { step: 'QC & Pack', date: 'Oct 28', status: 'pending' }
      ],
      journey: (baseOrder.state === 'Active' || baseOrder.state === 'Finished' || baseOrder.state === 'Risk') ? [
          { stage: 'Design Approved', status: 'completed', date: 'Oct 18', responsible: 'Brand' },
          { stage: 'Materials Prepared', status: 'completed', date: 'Oct 20', responsible: 'Warehouse' },
          { stage: 'Cutting', status: 'active', date: 'Oct 22', responsible: 'Unit A' },
          { stage: 'Sewing', status: 'pending', date: 'Oct 24', responsible: 'Unit B' },
          { stage: 'Quality Control', status: 'pending', date: '-', responsible: 'QC Team' }
      ] : undefined,
      metrics: baseOrder.state === 'Finished' ? {
          efficiency: 94,
          timeAccuracy: 98,
          quality: 99
      } : undefined
    };
};

const OrderDetailPanel = ({ orderId, onClose }: { orderId: string, onClose: () => void }) => {
    const baseOrder = mockOrders.find(o => o.id === orderId);
    if (!baseOrder) return null;
    
    const order = getOrderDetails(baseOrder);
    const [actionState, setActionState] = useState<'view' | 'resolving' | 'accepting'>('view');

    return (
        <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-[900px] bg-[#F4F4F2] shadow-2xl z-[60] overflow-y-auto border-l border-[#E5E5E5] flex flex-col"
        >
             {/* 1️⃣ ORDER IDENTITY SECTION (TOP HEADER) */}
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ duration: 0.2 }}
               className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-[#E5E5E5] p-6 z-10 flex items-center justify-between"
             >
                 <div className="flex items-center gap-8">
                     <div>
                         <p className="text-[10px] uppercase tracking-wider text-[#9AA0A6] mb-1">Order ID</p>
                         <h2 className="text-xl font-serif text-[#05080D]">{order.id}</h2>
                     </div>
                     <div className="h-8 w-px bg-[#E5E5E5]" />
                     <div className="cursor-pointer hover:opacity-70 transition-opacity">
                         <p className="text-[10px] uppercase tracking-wider text-[#9AA0A6] mb-1">Brand</p>
                         <h2 className="text-sm font-medium text-[#05080D] underline decoration-dotted">{order.brand}</h2>
                     </div>
                     <div>
                         <p className="text-[10px] uppercase tracking-wider text-[#9AA0A6] mb-1">Product</p>
                         <h2 className="text-sm text-[#05080D]">{order.product}</h2>
                     </div>
                     <div>
                         <p className="text-[10px] uppercase tracking-wider text-[#9AA0A6] mb-1">Deadline</p>
                         <h2 className="text-sm text-[#05080D]">{order.deadline}</h2>
                     </div>
                     
                     <motion.div
                       animate={order.state === 'Risk' ? { opacity: [1, 0.7, 1], scale: [1, 1.02, 1] } : {}}
                       transition={{ duration: 2, repeat: 0 }} // Pulse once
                     >
                         <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                             order.state === 'New' ? 'bg-[#4CAF50]/10 text-[#4CAF50]' :
                             order.state === 'Risk' ? 'bg-[#D64545]/10 text-[#D64545]' :
                             'bg-[#9AA0A6]/10 text-[#5F6368]'
                         }`}>
                             {order.state}
                         </span>
                     </motion.div>
                 </div>
                 
                 <button onClick={onClose} className="p-2 hover:bg-[#F4F4F2] rounded-full transition-colors text-[#5F6368]">
                    <X className="w-5 h-5" />
                 </button>
             </motion.div>

             <div className="p-8 space-y-8 pb-32">
                 {/* 2️⃣ DESIGN & SPECIFICATION SECTION */}
                 <section className="bg-white rounded-lg border border-[#E5E5E5] overflow-hidden flex">
                     <motion.div 
                        className="w-1/3 bg-[#F6F6F4] relative group cursor-pointer overflow-hidden"
                        whileHover={{ scale: 1.02 }}
                     >
                         <img src={order.specifications.image} alt="Design Preview" className="w-full h-full object-cover" />
                         <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                     </motion.div>
                     <div className="w-2/3 p-6">
                         <h3 className="text-xs uppercase tracking-wider text-[#5F6368] mb-4">Specifications</h3>
                         <table className="w-full text-sm">
                             <tbody className="divide-y divide-[#F6F6F4]">
                                 <tr className="group hover:bg-[#F9F9F9] transition-colors">
                                     <td className="py-3 text-[#9AA0A6] w-32">Fabric</td>
                                     <td className="py-3 text-[#05080D]">{order.specifications.fabric}</td>
                                 </tr>
                                 <tr className="group hover:bg-[#F9F9F9] transition-colors">
                                     <td className="py-3 text-[#9AA0A6]">Colors</td>
                                     <td className="py-3 text-[#05080D]">{order.specifications.color}</td>
                                 </tr>
                                 <tr className="group hover:bg-[#F9F9F9] transition-colors">
                                     <td className="py-3 text-[#9AA0A6]">Breakdown</td>
                                     <td className="py-3 text-[#05080D] font-mono text-xs">{order.specifications.sizes}</td>
                                 </tr>
                                 <tr className="group hover:bg-[#F9F9F9] transition-colors">
                                     <td className="py-3 text-[#9AA0A6]">Notes</td>
                                     <td className="py-3 text-[#05080D] italic">{order.specifications.notes}</td>
                                 </tr>
                             </tbody>
                         </table>
                     </div>
                 </section>

                 {/* 3️⃣ IMPACT CHECK SECTION */}
                 <div className="grid grid-cols-2 gap-8">
                     {/* 3A — FABRIC INVENTORY IMPACT */}
                     <section className="space-y-4">
                         <h3 className="text-sm font-medium text-[#05080D]">Fabric Inventory Impact</h3>
                         <div className="bg-white rounded-lg border border-[#E5E5E5] p-1">
                             <table className="w-full text-sm">
                                 <thead className="bg-[#F6F6F4] text-xs uppercase text-[#9AA0A6]">
                                     <tr>
                                         <th className="py-2 px-3 text-left font-normal">Material</th>
                                         <th className="py-2 px-3 text-center font-normal">Avail / Req</th>
                                         <th className="py-2 px-3 text-right font-normal">Status</th>
                                     </tr>
                                 </thead>
                                 <tbody className="divide-y divide-[#F6F6F4]">
                                     {order.inventoryImpact.map((item, i) => (
                                         <motion.tr 
                                            key={i}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                         >
                                             <td className="py-3 px-3 text-[#05080D]">{item.fabric}</td>
                                             <td className="py-3 px-3 text-center text-[#5F6368]">{item.available} / {item.required} <span className="text-[10px]">{item.unit}</span></td>
                                             <td className="py-3 px-3 text-right">
                                                 <span className={`inline-block w-2 h-2 rounded-full ${
                                                     item.status === 'safe' ? 'bg-[#4CAF50]' :
                                                     item.status === 'tight' ? 'bg-[#F4B400]' : 'bg-[#D64545]'
                                                 }`} />
                                             </td>
                                         </motion.tr>
                                     ))}
                                 </tbody>
                             </table>
                         </div>

                         {/* COMMUNITY HELP BLOCK */}
                         {order.inventoryImpact.some(i => i.status === 'insufficient') && (
                             <motion.div 
                               initial={{ opacity: 0, y: 10 }}
                               animate={{ opacity: 1, y: 0 }}
                               className="bg-[#F8F8F7] rounded-lg border border-[#E5E5E5] p-4"
                             >
                                 <h4 className="text-xs font-medium text-[#05080D] mb-3 flex items-center gap-2">
                                     <Users className="w-3 h-3" /> Community may help you solve this
                                 </h4>
                                 <div className="space-y-2">
                                     {['Supplier "TextileCo" has surplus', 'Nearby Manufacturer exchange', 'Alternative fabric discussion'].map((post, i) => (
                                         <div key={i} className="group flex items-center justify-between cursor-pointer py-1">
                                             <span className="text-xs text-[#5F6368] group-hover:underline group-hover:text-[#05080D] transition-colors">{post}</span>
                                             <ArrowRight className="w-3 h-3 text-[#9AA0A6] opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all" />
                                         </div>
                                     ))}
                                 </div>
                             </motion.div>
                         )}
                     </section>

                     {/* 3B & 3C Combined Column */}
                     <div className="space-y-8">
                         {/* 3B — MACHINE & CAPACITY */}
                         <section className="space-y-4">
                             <h3 className="text-sm font-medium text-[#05080D]">Machine Capacity</h3>
                             <div className="bg-white rounded-lg border border-[#E5E5E5] p-4 space-y-3">
                                 {order.machineStatus.map((m, i) => (
                                     <div key={i} className="flex items-center justify-between text-sm group cursor-default">
                                         <div className="flex items-center gap-2">
                                             <div className={`w-1.5 h-1.5 rounded-full ${m.status === 'available' ? 'bg-[#4CAF50]' : 'bg-[#F4B400]'}`} />
                                             <span className="text-[#05080D]">{m.machine}</span>
                                         </div>
                                         <div className="flex items-center gap-4 text-[#5F6368]">
                                             <span>Load: {m.load}</span>
                                             <span>Req: {m.required}</span>
                                         </div>
                                     </div>
                                 ))}
                             </div>
                         </section>

                         {/* 3C — TIMELINE FIT */}
                         <section className="space-y-4">
                             <h3 className="text-sm font-medium text-[#05080D]">Timeline Preview</h3>
                             <div className="relative pl-4 border-l border-[#E5E5E5] space-y-6 py-2">
                                 {order.timeline.map((step, i) => (
                                     <motion.div 
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3 + (i * 0.1) }}
                                        className="relative"
                                     >
                                         <div className={`absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-[#F4F4F2] ${
                                             step.status === 'active' ? 'bg-[#05080D] ring-2 ring-[#05080D]/20' : 
                                             step.status === 'completed' ? 'bg-[#9AA0A6]' : 'bg-[#E5E5E5]'
                                         }`} />
                                         <div className="flex justify-between items-baseline">
                                             <span className={`text-sm ${step.status === 'active' ? 'text-[#05080D] font-medium' : 'text-[#5F6368]'}`}>{step.step}</span>
                                             <span className="text-xs text-[#9AA0A6]">{step.date}</span>
                                         </div>
                                     </motion.div>
                                 ))}
                             </div>
                         </section>
                     </div>
                 </div>

                 {/* 4️⃣ PRODUCTION JOURNEY (Active Only) */}
                 {order.journey && (
                     <section>
                         <h3 className="text-sm font-medium text-[#05080D] mb-4">Production Journey</h3>
                         <div className="bg-white rounded-lg border border-[#E5E5E5] p-6 overflow-x-auto">
                             <div className="flex items-start min-w-[600px]">
                                 {order.journey.map((step, i) => (
                                     <div key={i} className="flex-1 relative last:flex-none">
                                         {/* Line */}
                                         {i < order.journey!.length - 1 && (
                                             <div className="absolute left-4 top-4 w-full h-0.5 bg-[#F6F6F4]">
                                                 <motion.div 
                                                   initial={{ width: 0 }}
                                                   animate={{ width: step.status === 'completed' ? '100%' : '0%' }}
                                                   transition={{ duration: 0.5 }}
                                                   className="h-full bg-[#05080D]"
                                                 />
                                             </div>
                                         )}
                                         
                                         <div className="relative z-10 flex flex-col items-center text-center pr-8 last:pr-0">
                                             <motion.div 
                                                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mb-3 bg-white ${
                                                   step.status === 'completed' ? 'border-[#05080D] text-[#05080D]' :
                                                   step.status === 'active' ? 'border-[#05080D] text-[#05080D]' :
                                                   'border-[#E5E5E5] text-[#E5E5E5]'
                                                }`}
                                             >
                                                 {step.status === 'completed' ? <Check className="w-4 h-4" /> : 
                                                  step.status === 'active' ? <Activity className="w-4 h-4" /> :
                                                  <span className="w-2 h-2 rounded-full bg-[#E5E5E5]" />}
                                             </motion.div>
                                             <span className={`text-xs font-medium ${step.status === 'pending' ? 'text-[#9AA0A6]' : 'text-[#05080D]'}`}>
                                                 {step.stage}
                                             </span>
                                             <span className="text-[10px] text-[#9AA0A6] mt-1">{step.date}</span>
                                         </div>
                                     </div>
                                 ))}
                             </div>
                         </div>
                     </section>
                 )}

                 {/* 6️⃣ TRUST & ANALYTICS (Finished Only) */}
                 {order.metrics && (
                     <section className="bg-[#F8F8F7] rounded-lg border border-[#E5E5E5] p-6 grid grid-cols-3 gap-8">
                         <div className="text-center">
                             <p className="text-[10px] uppercase tracking-wider text-[#9AA0A6] mb-2">Efficiency</p>
                             <div className="text-2xl font-serif text-[#05080D]">{order.metrics.efficiency}%</div>
                             <div className="text-[10px] text-[#4CAF50] flex items-center justify-center gap-1 mt-1"><TrendingUp className="w-3 h-3" /> Excellent</div>
                         </div>
                         <div className="text-center border-l border-[#E5E5E5]">
                             <p className="text-[10px] uppercase tracking-wider text-[#9AA0A6] mb-2">Time Accuracy</p>
                             <div className="text-2xl font-serif text-[#05080D]">{order.metrics.timeAccuracy}%</div>
                         </div>
                         <div className="text-center border-l border-[#E5E5E5]">
                             <p className="text-[10px] uppercase tracking-wider text-[#9AA0A6] mb-2">Quality Score</p>
                             <div className="text-2xl font-serif text-[#05080D]">{order.metrics.quality}/100</div>
                         </div>
                     </section>
                 )}

                 {/* 7️⃣ ADDITIONAL LOGS */}
                 <div className="grid grid-cols-2 gap-8 pt-8 border-t border-[#E5E5E5]">
                     <div>
                         <h4 className="text-xs uppercase tracking-wider text-[#9AA0A6] mb-4">Communication Thread</h4>
                         <div className="space-y-4">
                             <div className="flex gap-3 text-sm">
                                 <div className="w-6 h-6 rounded-full bg-[#E5E5E5] flex-shrink-0" />
                                 <div>
                                     <p className="text-[#05080D] font-medium text-xs">Brand Manager</p>
                                     <p className="text-[#5F6368]">Please confirm if the sleeve adjustment is possible within the deadline.</p>
                                 </div>
                             </div>
                         </div>
                     </div>
                     <div>
                         <h4 className="text-xs uppercase tracking-wider text-[#9AA0A6] mb-4">Responsibility Log</h4>
                         <div className="text-xs text-[#5F6368] space-y-2">
                             <p>• Order viewed by Production Manager (Today, 9:41 AM)</p>
                             <p>• Material availability check completed (Today, 9:42 AM)</p>
                         </div>
                     </div>
                 </div>
             </div>

             {/* 5️⃣ DECISION & RESPONSIBILITY FOOTER */}
             <div className="sticky bottom-0 bg-white border-t border-[#E5E5E5] p-6 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
                 {order.state === 'New' && (
                     <div className="flex gap-4">
                         <button className="flex-1 bg-[#05080D] text-white h-12 rounded-lg font-medium hover:bg-black transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2">
                             <Check className="w-4 h-4" /> Accept Order
                         </button>
                         <button className="flex-1 border border-[#E5E5E5] text-[#05080D] h-12 rounded-lg font-medium hover:bg-[#F6F6F4] transition-colors">
                             Request Adjustment
                         </button>
                         <button className="px-6 text-[#D64545] text-sm font-medium hover:bg-[#D64545]/5 rounded-lg transition-colors">
                             Decline
                         </button>
                     </div>
                 )}

                 {order.state === 'Risk' && (
                     <div className="space-y-4">
                         <div className="flex items-center gap-4 text-sm bg-[#FFF8F0] border border-[#FFE0B2] p-3 rounded-lg text-[#E65100]">
                             <AlertTriangle className="w-4 h-4" />
                             <span className="font-medium">Risk Detected: Material Shortage</span>
                         </div>
                         <div className="flex gap-4">
                             <button className="flex-1 bg-[#05080D] text-white h-12 rounded-lg font-medium hover:bg-black transition-all">
                                 Resolve Internally (ETA +2 days)
                             </button>
                             <button className="flex-1 border border-[#E5E5E5] text-[#05080D] h-12 rounded-lg font-medium hover:bg-[#F6F6F4] transition-colors flex items-center justify-center gap-2">
                                 <Users className="w-4 h-4" /> Suggest Partner
                             </button>
                         </div>
                     </div>
                 )}
                 
                 {/* Default close for active/finished if no actions needed */}
                 {(order.state === 'Active' || order.state === 'Finished') && (
                     <button onClick={onClose} className="w-full border border-[#E5E5E5] text-[#05080D] h-12 rounded-lg font-medium hover:bg-[#F6F6F4] transition-colors">
                         Close Details
                     </button>
                 )}
             </div>
        </motion.div>
    );
};

// --- Components ---

export function ManufacturerOrders() {
  const { navigate } = useApp();
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [hoveredOrder, setHoveredOrder] = useState<string | null>(null);

  // Status Color Logic
  const getStatusColor = (status: MaterialStatus | OrderState | 'Urgent') => {
    switch (status) {
      case 'Available':
      case 'New':
        return '#4CAF50';
      case 'Partial':
      case 'Tight':
        return '#F4B400';
      case 'Missing':
      case 'Risk':
      case 'No Slot':
      case 'Urgent':
        return '#D64545';
      case 'Active':
      case 'Finished':
      case 'Fits':
        return '#9AA0A6';
      default:
        return '#9AA0A6';
    }
  };

  const getRowColor = (order: Order) => {
    if (order.state === 'New' && order.productionSlot === 'Tight') return '#F4B400';
    if (order.state === 'New') return '#4CAF50';
    if (order.state === 'Risk') return '#D64545';
    return '#9AA0A6';
  };

  const getRowWashColor = (order: Order, isAlert: boolean) => {
     const color = getRowColor(order);
     if (isAlert || order.state === 'New') {
        return `${color}0D`;
     }
     return '#FFFFFF';
  };

  return (
    <div className="w-full min-h-screen bg-[#F7F7F5] p-8">
      {/* Sub Header (Toolbar) */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <p className="text-[#0F0F12]/60 text-sm font-['Inter_Tight']">Orders that require your attention</p>
        </div>
        
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0F0F12]/40" />
            <input 
              type="text" 
              placeholder="Search orders..." 
              className="pl-9 pr-4 py-2 bg-white border border-[#E6E6E3] hover:border-[#0F0F12] focus:border-[#0F0F12] rounded-md text-sm font-['Inter_Tight'] w-64 transition-all outline-none shadow-sm placeholder:text-[#0F0F12]/40"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-[#F7F7F5] border border-[#E6E6E3] rounded-md text-sm font-['Inter_Tight'] font-medium transition-colors shadow-sm text-[#0F0F12]">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Table Card */}
      {mockOrders.length > 0 ? (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-[#E6E6E3] overflow-hidden"
        >
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-[#000000]/[0.06]">
                <th className="pl-8 pr-4 py-6 text-left text-xs font-semibold text-[#5F6368] uppercase tracking-wider w-[25%]">Order / Brand</th>
                <th className="px-4 py-6 text-center text-xs font-semibold text-[#5F6368] uppercase tracking-wider w-[15%]">Deadline</th>
                <th className="px-4 py-6 text-center text-xs font-semibold text-[#5F6368] uppercase tracking-wider w-[15%]">Material Status</th>
                <th className="px-4 py-6 text-center text-xs font-semibold text-[#5F6368] uppercase tracking-wider w-[15%]">Production Slot</th>
                <th className="px-4 py-6 text-left text-xs font-semibold text-[#5F6368] uppercase tracking-wider w-[15%]">State</th>
                <th className="pl-4 pr-8 py-6 text-right text-xs font-semibold text-[#5F6368] uppercase tracking-wider w-[15%]">Action</th>
              </tr>
            </thead>
            <tbody>
              {mockOrders.map((order) => {
                const rowColor = getRowColor(order);
                const isAlert = order.state === 'Risk' || (order.state === 'New' && order.productionSlot === 'Tight');
                const washColor = getRowWashColor(order, isAlert);
                const isHovered = hoveredOrder === order.id;
                
                return (
                  <motion.tr 
                    key={order.id}
                    initial={{ backgroundColor: washColor }}
                    whileHover={{ 
                      backgroundColor: isAlert || order.state === 'New' ? `${rowColor}14` : '#FAFAFA', 
                      y: -1,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                      zIndex: 10
                    }}
                    className="relative group border-b border-[#000000]/[0.06] last:border-b-0 cursor-pointer h-20 transition-all"
                    onClick={() => setSelectedOrder(order.id)}
                    onMouseEnter={() => setHoveredOrder(order.id)}
                    onMouseLeave={() => setHoveredOrder(null)}
                  >
                    {/* Vertical Color Strip (Inside first cell) */}
                    <td className="pl-8 pr-4 py-4 relative">
                       <div className="absolute left-0 top-0 bottom-0 w-[3px]">
                         <motion.div 
                           className="w-full h-full"
                           style={{ backgroundColor: rowColor }}
                           animate={isAlert && !isHovered ? { opacity: [1, 0.7, 1] } : { opacity: 1 }}
                           transition={{ duration: 3.5, ease: "easeInOut", repeat: Infinity }}
                         />
                       </div>
                       
                       <div className="relative z-10">
                         <div className="text-[#0F1115] font-medium text-base">{order.brand}</div>
                         <div className="text-[#5F6368] text-sm mt-0.5">{order.product}</div>
                       </div>
                    </td>

                    {/* Deadline */}
                    <td className="px-4 py-4 relative">
                       <div className="relative z-10 flex items-center gap-2">
                         <span className="text-[#0F1115] text-sm">{order.deadline}</span>
                         {order.isDeadlineUrgent && (
                           <div className="w-1.5 h-1.5 rounded-full bg-[#D64545]" />
                         )}
                       </div>
                    </td>

                    {/* Material Status */}
                    <td className="px-4 py-4 relative">
                       <div className="relative z-10 flex items-center gap-2 justify-center">
                         <div 
                           className="w-2 h-2 rounded-full mr-2" 
                           style={{ backgroundColor: getStatusColor(order.materialStatus) }} 
                         />
                         <span className="text-[#0F1115] text-sm">{order.materialStatus}</span>
                       </div>
                    </td>

                    {/* Production Slot */}
                    <td className="px-4 py-4 relative text-center">
                       <div className="relative z-10 text-[#0F1115] text-sm">
                         {order.productionSlot}
                       </div>
                    </td>

                    {/* Order State */}
                    <td className="px-4 py-4 relative text-center">
                       <div className="relative z-10">
                         <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-[#F4F4F2] text-[#0F1115]">
                           {order.state}
                         </span>
                       </div>
                    </td>

                    {/* Action Hint */}
                    <td className="pl-4 pr-8 py-4 text-right relative">
                       <div className="relative z-10 text-[#9AA0A6] text-sm font-medium group-hover:text-[#0F1115] transition-colors">
                         {order.actionHint}
                       </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </motion.div>
      ) : (
        <div className="h-64 flex flex-col items-center justify-center text-center">
           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
             <p className="text-[#0F1115] font-serif text-lg">No orders require action right now.</p>
           </motion.div>
        </div>
      )}
      
      {/* Detail Panel */}
      <AnimatePresence>
        {selectedOrder && (
          <div className="fixed inset-0 z-[60] flex justify-end">
             <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setSelectedOrder(null)} />
             <OrderDetailPanel orderId={selectedOrder} onClose={() => setSelectedOrder(null)} />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}