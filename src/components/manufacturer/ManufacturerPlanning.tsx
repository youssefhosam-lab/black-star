import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../App';
import { motion, AnimatePresence } from 'motion/react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { 
  ChevronLeft, 
  RotateCcw, 
  X, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  ArrowRight,
  Maximize2,
  Minimize2,
  Scale,
  Plus,
  Zap,
  Link as LinkIcon,
  MoreHorizontal,
  Lightbulb,
  Scissors,
  Truck,
  Shirt,
  Search,
  Moon,
  Sun,
  ChevronRight,
  Calendar,
  BarChart3,
  TrendingUp,
  AlertCircle,
  Leaf,
  DollarSign,
  Users,
  Timer,
  Layers,
  History,
  FileText
} from 'lucide-react';

// --- Types ---

type ViewLevel = 'months' | 'weeks' | 'days' | 'hourly';
type OrderStatus = 'pending' | 'in-progress' | 'completed';

interface Order {
  id: string;
  name: string;
  client: string;
  progress: number; // 0-100
  status: OrderStatus;
  machineId?: string;
  day?: string; // ISO date or day ID like 'mon', 'tue'
  weekId?: string;
  monthId?: string;
  startTime?: number; // 0-24
  duration?: number;
}

interface ConflictData {
  sourceOrder: Order;
  targetOrder: Order;
  day: string;
  hour: number;
}

// --- Sticky Note Types ---
type NoteVariant = 'idea' | 'risk' | 'decision' | 'experiment';

interface StickyNoteData {
  id: string;
  x: number;
  y: number;
  title: string;
  content: string;
  variant: NoteVariant;
  rotation: number;
  connections: string[]; // IDs of connected notes
}

// --- Mock Data ---

const MONTHS = [
  { id: 'jan', label: 'JANUARY' }, { id: 'feb', label: 'FEBRUARY' }, 
  { id: 'mar', label: 'MARCH' }, { id: 'apr', label: 'APRIL' },
  { id: 'may', label: 'MAY' }, { id: 'jun', label: 'JUNE' },
  { id: 'jul', label: 'JULY' }, { id: 'aug', label: 'AUGUST' },
  { id: 'sep', label: 'SEPTEMBER' }, { id: 'oct', label: 'OCTOBER' },
  { id: 'nov', label: 'NOVEMBER' }, { id: 'dec', label: 'DECEMBER' }
];

const WEEKS = [
  { id: 'w1', label: 'WEEK 1' },
  { id: 'w2', label: 'WEEK 2' },
  { id: 'w3', label: 'WEEK 3' },
  { id: 'w4', label: 'WEEK 4' }
];

const DAYS = [
  { id: 'mon', label: 'MON', fullLabel: 'MONDAY', date: 12 },
  { id: 'tue', label: 'TUE', fullLabel: 'TUESDAY', date: 13 },
  { id: 'wed', label: 'WED', fullLabel: 'WEDNESDAY', date: 14 },
  { id: 'thu', label: 'THU', fullLabel: 'THURSDAY', date: 15 },
  { id: 'fri', label: 'FRI', fullLabel: 'FRIDAY', date: 16 },
  { id: 'sat', label: 'SAT', fullLabel: 'SATURDAY', date: 17 },
  { id: 'sun', label: 'SUN', fullLabel: 'SUNDAY', date: 18 },
];

const MOCK_ORDERS: Order[] = [
  // Monday (Week 1, May)
  { id: 'ORD-8821', name: 'FW24 SHELL', client: 'Acme', progress: 15, status: 'in-progress', day: 'mon', weekId: 'w1', monthId: 'may', startTime: 8, duration: 4 },
  { id: 'ORD-8830', name: 'LINEN BLAZER', client: 'Vogue', progress: 60, status: 'in-progress', day: 'mon', weekId: 'w1', monthId: 'may', startTime: 13, duration: 3 },
  { id: 'ORD-8841', name: 'COTTON TEES', client: 'Basics', progress: 90, status: 'completed', day: 'mon', weekId: 'w1', monthId: 'may', startTime: 16, duration: 2 },
  
  // Tuesday
  { id: 'ORD-8822', name: 'SUMMER KNIT', client: 'Luxe', progress: 50, status: 'in-progress', day: 'tue', weekId: 'w1', monthId: 'may', startTime: 9, duration: 5 },
  { id: 'ORD-8842', name: 'SILK SCARVES', client: 'Hermes', progress: 30, status: 'in-progress', day: 'tue', weekId: 'w1', monthId: 'may', startTime: 14, duration: 2 },
  
  // Wednesday
  { id: 'ORD-8823', name: 'DENIM BATCH', client: 'Rebel', progress: 85, status: 'in-progress', day: 'wed', weekId: 'w1', monthId: 'may', startTime: 8, duration: 4 },
  { id: 'ORD-8833', name: 'LEATHER JACKET', client: 'Moto', progress: 10, status: 'in-progress', day: 'wed', weekId: 'w1', monthId: 'may', startTime: 13, duration: 3 },
  { id: 'ORD-8834', name: 'VELVET SUIT', client: 'Royal', progress: 45, status: 'in-progress', day: 'wed', weekId: 'w1', monthId: 'may', startTime: 17, duration: 3 },
  
  // Thursday
  { id: 'ORD-8850', name: 'CARGO PANTS', client: 'Street', progress: 5, status: 'pending', day: 'thu', weekId: 'w1', monthId: 'may', startTime: 8, duration: 6 },
  { id: 'ORD-8851', name: 'NYLON BOMBER', client: 'Alpha', progress: 20, status: 'in-progress', day: 'thu', weekId: 'w1', monthId: 'may', startTime: 14, duration: 4 },
  
  // Friday
  { id: 'ORD-8852', name: 'EVENING GOWN', client: 'Gala', progress: 75, status: 'in-progress', day: 'fri', weekId: 'w1', monthId: 'may', startTime: 9, duration: 8 },
  { id: 'ORD-8853', name: 'BOW TIES', client: 'Gent', progress: 95, status: 'completed', day: 'fri', weekId: 'w1', monthId: 'may', startTime: 17, duration: 1 },

  // Saturday (Rush)
  { id: 'ORD-8855', name: 'RUSH SAMPLE', client: 'Vogue', progress: 10, status: 'pending', day: 'sat', weekId: 'w1', monthId: 'may', startTime: 10, duration: 4 },

  // Week 2 (Future)
  { id: 'ORD-9001', name: 'WINTER COAT', client: 'North', progress: 0, status: 'pending', weekId: 'w2', monthId: 'may', duration: 10 },
  { id: 'ORD-9005', name: 'WOOL SOCKS', client: 'Warm', progress: 0, status: 'pending', weekId: 'w2', monthId: 'may', duration: 2 },
  { id: 'ORD-9006', name: 'CASHMERE', client: 'Luxe', progress: 0, status: 'pending', weekId: 'w2', monthId: 'may', duration: 8 },

  // Week 3
  { id: 'ORD-9002', name: 'SPRING DRESS', client: 'Flower', progress: 0, status: 'pending', weekId: 'w3', monthId: 'may', duration: 5 },
  { id: 'ORD-9007', name: 'FLORAL TOP', client: 'Bloom', progress: 0, status: 'pending', weekId: 'w3', monthId: 'may', duration: 3 },

  // Week 4
  { id: 'ORD-9008', name: 'SWIMWEAR', client: 'Coast', progress: 0, status: 'pending', weekId: 'w4', monthId: 'may', duration: 12 },

  // Future Months
  { id: 'ORD-9003', name: 'FALL BOOTS', client: 'Step', progress: 0, status: 'pending', monthId: 'jun', duration: 20 },
  { id: 'ORD-9009', name: 'RAIN COATS', client: 'Drip', progress: 0, status: 'pending', monthId: 'jun', duration: 15 },
  { id: 'ORD-9004', name: 'SUMMER HAT', client: 'Sun', progress: 0, status: 'pending', monthId: 'jul', duration: 15 },
  { id: 'ORD-9010', name: 'BEACH BAGS', client: 'Sand', progress: 0, status: 'pending', monthId: 'jul', duration: 8 },
  { id: 'ORD-9011', name: 'SCARVES', client: 'Wind', progress: 0, status: 'pending', monthId: 'aug', duration: 10 },
  { id: 'ORD-9012', name: 'GLOVES', client: 'Hand', progress: 0, status: 'pending', monthId: 'sep', duration: 5 },
];

const ITEM_TYPE = {
  ORDER: 'order'
};

// --- Components ---

const StickyNote = ({ 
  note, 
  isSelected, 
  isSource,
  onPointerDown, 
  isFocusMode 
}: { 
  note: StickyNoteData; 
  isSelected: boolean; 
  isSource: boolean;
  onPointerDown: (e: React.PointerEvent) => void;
  isFocusMode: boolean;
}) => {
  const getColors = (v: NoteVariant) => {
    switch (v) {
      case 'risk': return 'bg-[#E8C6C6]';
      case 'idea': return 'bg-[#DFF1E8]';
      case 'decision': return 'bg-[#F7F7F5]';
      case 'experiment': return 'bg-[#E3ECF7]';
      default: return 'bg-[#F3E6A4]';
    }
  };

  return (
    <motion.div
      onPointerDown={onPointerDown}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: isFocusMode && !isSelected && !isSource ? 0.3 : 1, 
        scale: isSelected || isSource ? 1.05 : 1,
        rotate: isSelected || isSource ? 0 : note.rotation,
        borderWidth: isSource ? 2 : 0,
        borderColor: isSource ? '#000' : 'transparent',
        x: note.x,
        y: note.y
      }}
      // Use animate for positioning instead of style.left/top to prevent conflict
      transition={{ type: "spring", bounce: 0, duration: 0.2 }}
      className={`absolute w-[220px] h-[160px] p-4 rounded-lg shadow-lg cursor-grab active:cursor-grabbing flex flex-col top-0 left-0 ${getColors(note.variant)}`}
    >
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-white/40 rotate-1" />
      <input 
        className="bg-transparent font-serif font-bold text-[#1A1A1A] text-lg focus:outline-none placeholder:text-black/30 mb-2 cursor-text"
        defaultValue={note.title}
        placeholder="Title..."
        onPointerDown={(e) => e.stopPropagation()} // Allow text selection without dragging note
      />
      <textarea 
        className="bg-transparent flex-1 resize-none text-sm text-[#2A2A2A] leading-relaxed font-medium focus:outline-none placeholder:text-black/30 cursor-text"
        defaultValue={note.content}
        placeholder="Write a note..."
        onPointerDown={(e) => e.stopPropagation()} // Allow text selection
      />
      <div className="flex justify-between items-center mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
         <div className="flex -space-x-1">
            <div className="w-5 h-5 rounded-full bg-black/10 flex items-center justify-center text-[10px]">A</div>
         </div>
         <button className="p-1 hover:bg-black/5 rounded-full text-black/60">
            <MoreHorizontal size={14} />
         </button>
      </div>
    </motion.div>
  );
};

// 1. Order Block
const OrderBlock = ({ order, onClick, isDragging, simple = false }: { order: Order; onClick?: () => void; isDragging?: boolean; simple?: boolean }) => {
  const getGlowStyles = () => {
    if (order.status === 'completed' || order.progress === 100) return "border border-[#05080D] shadow-[0_0_0_1px_rgba(5,8,13,0.1)]";
    if (order.progress >= 70) return "border border-[#05080D]/30 shadow-md";
    if (order.progress >= 30) return "border-l-2 border-l-white/40 border-t border-t-white/10 shadow-sm";
    return "border-l-2 border-l-white/20 shadow-sm";
  };

  if (simple) {
      return (
        <div 
            onClick={onClick}
            className="bg-[#05080D] h-6 rounded px-2 flex items-center justify-between text-[10px] text-white cursor-pointer hover:bg-black/80 transition-colors mb-1"
        >
            <span className="truncate max-w-[80%]">{order.name}</span>
            <span className="opacity-50">{order.progress}%</span>
        </div>
      );
  }

  return (
    <motion.div
      layoutId={order.id}
      whileHover={{ scale: 1.02 }}
      onClick={(e) => { if (!isDragging && onClick) onClick(); }}
      className={`
        relative rounded-[6px] bg-[#05080D] p-3 cursor-pointer active:cursor-grabbing group overflow-hidden
        transition-all duration-300
        ${getGlowStyles()}
        ${isDragging ? 'scale-105 shadow-2xl z-50 rotate-1' : ''}
      `}
      style={{ height: order.duration ? `${order.duration * 40}px` : '60px' }} 
    >
      <div className="h-full flex flex-col items-center justify-center text-center relative z-10">
        <span className="text-[13px] font-medium text-white tracking-wide uppercase transition-opacity duration-300 opacity-90 group-hover:opacity-100">
          {order.name}
        </span>
        {order.client && (
          <span className="text-[10px] text-white/50 uppercase tracking-wider mt-1">
            {order.client}
          </span>
        )}
      </div>
      {order.progress === 100 && (
        <motion.div
          initial={{ opacity: 0.6, scale: 0.9 }}
          animate={{ opacity: 0, scale: 1.4 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute inset-0 border-2 border-[#05080D] rounded-[6px]"
        />
      )}
    </motion.div>
  );
};

const DraggableOrder = ({ order, onClick, simple = false }: { order: Order; onClick?: () => void; simple?: boolean }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ITEM_TYPE.ORDER,
    item: { ...order },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  }), [order]);

  return (
    <div ref={drag} className={`${isDragging ? 'opacity-0' : 'opacity-100'}`}>
       <OrderBlock order={order} isDragging={isDragging} onClick={onClick} simple={simple} />
    </div>
  );
};

// 2. Universal Slot Component
const CalendarSlot = ({ 
  id, 
  title,
  subTitle,
  orders, 
  onDrop,
  onOrderClick,
  onHeaderClick,
  isExpanded,
  type = 'day',
  hour
}: { 
  id: string; 
  title?: string;
  subTitle?: string;
  orders: Order[]; 
  onDrop: (item: Order, targetId: string, type: string, hour?: number) => void;
  onOrderClick: (order: Order) => void;
  onHeaderClick?: () => void;
  isExpanded?: boolean;
  type?: 'day' | 'week' | 'month' | 'hour';
  hour?: number;
}) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ITEM_TYPE.ORDER,
    drop: (item: Order) => onDrop(item, id, type, hour),
    collect: (monitor) => ({ isOver: monitor.isOver() }),
  }), [id, orders, type, hour]);
  
  const getBgClass = () => {
    if (isOver) return "bg-[#05080D]/5 shadow-[inset_0_0_0_1px_rgba(5,8,13,0.1)]";
    if (type === 'week' || type === 'month') return "bg-white hover:border-[#05080D] cursor-pointer";
    return "bg-transparent";
  };

  // --- RENDER: HOURLY SLOT (Day Expanded) ---
  if (type === 'hour') {
      return (
        <div ref={drop} className={`relative border-b border-[#E5E5E5] transition-all duration-300 ${getBgClass()} ${isExpanded ? 'h-[40px] w-full' : 'h-full min-h-[120px] p-2'}`}>
            {hour !== undefined && (
                <div className="absolute left-[-40px] top-2 text-[10px] text-[#5F6368] font-mono w-8 text-right">
                {hour.toString().padStart(2, '0')}:00
                </div>
            )}
            <div className="relative z-10 pl-2 w-full h-full">
                {orders.map(order => (
                    <DraggableOrder key={order.id} order={order} onClick={() => onOrderClick(order)} />
                ))}
            </div>
        </div>
      );
  }

  // --- RENDER: COLUMN SLOT (Day/Week/Month) ---
  return (
    <div className="flex flex-col h-full min-h-[600px]">
        {/* Header */}
        <div className="sticky top-20 z-10 bg-[#F6F6F4] pb-2 pt-2 -mt-2 mb-4 border-b border-[#E5E5E5]/50">
            <button onClick={onHeaderClick} className="text-left group w-full">
                <span className="text-sm font-medium text-[#05080D]/60 group-hover:text-[#05080D] transition-colors block mb-1 uppercase tracking-wider">
                {title} <span className="text-xs text-[#999] ml-1">{subTitle}</span>
                </span>
                <div className="h-px w-full bg-[#E5E5E5] group-hover:bg-[#05080D] transition-colors" />
            </button>
        </div>

        {/* Droppable Area */}
        <div 
            ref={drop}
            onClick={onHeaderClick}
            className={`flex-1 rounded-xl border border-[#E5E5E5] p-2 space-y-2 shadow-sm transition-all duration-200 ${getBgClass()}`}
        >
            {/* Show Summary for aggregated views */}
            {(type === 'week' || type === 'month') && orders.length === 0 && (
                <div className="h-full flex items-center justify-center text-[#E5E5E5]">
                    <Plus size={24} />
                </div>
            )}

            {/* Render Items */}
            {orders.map(order => (
                <DraggableOrder 
                    key={order.id} 
                    order={order} 
                    onClick={(e) => { 
                         // Stop propagation so we don't trigger the "expand" on click 
                         // unless we want to. But draggable handles its own click.
                         if(onOrderClick) onOrderClick(order);
                    }} 
                    simple={type === 'week' || type === 'month'} 
                />
            ))}
            
            {/* Stats Overlay for High Level Views */}
            {(type === 'week' || type === 'month') && orders.length > 0 && (
                <div className="mt-4 pt-4 border-t border-[#E5E5E5] text-xs text-[#5F6368] flex items-center justify-between">
                    <span>{orders.length} Orders</span>
                    <BarChart3 size={12} />
                </div>
            )}
        </div>
    </div>
  );
};

// 4. Comparison Panel
const ComparisonPanel = ({ 
  conflict, 
  onResolve, 
  onCancel 
}: { 
  conflict: ConflictData; 
  onResolve: (decision: 'proceed' | 'cancel') => void; 
  onCancel: () => void; 
}) => {
  const metrics = [
    { label: "Deadline Impact", icon: <Clock size={12} />, left: { val: "+2 Days Delay", status: 'bad' }, right: { val: "On Track", status: 'good' } },
    { label: "Machine Fit", icon: <Zap size={12} />, left: { val: "Perfect (98%)", status: 'good' }, right: { val: "Standard (85%)", status: 'neutral' } },
    { label: "Revenue Impact", icon: <DollarSign size={12} />, left: { val: "$12,500", status: 'good' }, right: { val: "$8,200", status: 'neutral' } },
    { label: "Fabric Availability", icon: <Scissors size={12} />, left: { val: "In Stock", status: 'good' }, right: { val: "Backordered (2d)", status: 'bad' } },
    { label: "Client Priority", icon: <Users size={12} />, left: { val: "Tier 1 (VIP)", status: 'good' }, right: { val: "Tier 3", status: 'neutral' } },
    { label: "Production Cost", icon: <TrendingUp size={12} />, left: { val: "$1,200 (High)", status: 'bad' }, right: { val: "$850 (Opt.)", status: 'good' } },
    { label: "Risk Score", icon: <AlertCircle size={12} />, left: { val: "Low (12%)", status: 'good' }, right: { val: "Med (45%)", status: 'bad' } },
    { label: "Eco Efficiency", icon: <Leaf size={12} />, left: { val: "A+ Rating", status: 'good' }, right: { val: "B Rating", status: 'neutral' } },
    { label: "Setup Time", icon: <Timer size={12} />, left: { val: "15 min", status: 'good' }, right: { val: "45 min", status: 'bad' } }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      className="h-full bg-white flex flex-col border-l border-[#E5E5E5] shadow-[-20px_0_40px_rgba(0,0,0,0.05)]"
    >
      <div className="flex justify-between items-center p-8 border-b border-[#E5E5E5]">
        <h2 className="text-xl font-medium font-serif text-[#05080D]">Conflict Analysis</h2>
        <button onClick={onCancel} className="p-2 rounded-full hover:bg-gray-100"><X className="w-5 h-5" /></button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-8">
        <div className="flex gap-4 mb-10">
            <div className="flex-1 bg-[#F6F6F4] p-5 rounded-lg text-center border border-[#E5E5E5] relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-[#05080D]" />
                <div className="text-[10px] uppercase tracking-widest text-[#5F6368] mb-2 font-medium">Incoming</div>
                <div className="font-serif text-lg font-medium text-[#05080D]">{conflict.sourceOrder.name}</div>
                <div className="text-xs text-[#5F6368] mt-1">{conflict.sourceOrder.client}</div>
            </div>
            <div className="flex items-center text-[#E5E5E5] font-serif italic text-lg px-2">vs</div>
            <div className="flex-1 bg-white p-5 rounded-lg text-center border border-[#E5E5E5] shadow-sm relative overflow-hidden opacity-80">
                <div className="text-[10px] uppercase tracking-widest text-[#5F6368] mb-2 font-medium">Existing</div>
                <div className="font-serif text-lg font-medium text-[#05080D]">{conflict.targetOrder.name}</div>
                <div className="text-xs text-[#5F6368] mt-1">{conflict.targetOrder.client}</div>
            </div>
        </div>

        <div className="space-y-0">
           {metrics.map((row, i) => (
             <div key={i} className="py-5 border-b border-[#E5E5E5] last:border-0 flex items-center hover:bg-[#FAFAFA] -mx-4 px-4 transition-colors group">
                <div className={`w-1/3 text-sm font-medium text-left transition-colors ${row.left.status === 'good' ? 'text-green-600' : ''} ${row.left.status === 'bad' ? 'text-[#D64545]' : ''} ${row.left.status === 'neutral' ? 'text-[#05080D]' : ''}`}>{row.left.val}</div>
                <div className="w-1/3 flex flex-col items-center justify-center">
                    <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-[#999] bg-[#F6F6F4] px-3 py-1.5 rounded-full group-hover:bg-white group-hover:shadow-sm transition-all border border-transparent group-hover:border-[#E5E5E5]">
                        <span className="opacity-50">{row.icon}</span><span>{row.label}</span>
                    </div>
                </div>
                <div className={`w-1/3 text-sm font-medium text-right transition-colors ${row.right.status === 'good' ? 'text-green-600' : ''} ${row.right.status === 'bad' ? 'text-[#D64545]' : ''} ${row.right.status === 'neutral' ? 'text-[#05080D]' : ''}`}>{row.right.val}</div>
             </div>
           ))}
        </div>
      </div>

      <div className="p-8 border-t border-[#E5E5E5] bg-[#FAFAFA]">
          <div className="bg-[#05080D] text-white rounded-xl p-6 shadow-xl flex items-center justify-between gap-8">
              <div className="flex-1">
                  <div className="text-xs font-bold text-white/50 uppercase tracking-widest mb-1">Black Star AI Insight</div>
                  <p className="text-sm text-white/90 leading-relaxed font-light">Switching minimizes setup time by <strong className="text-white">30 mins</strong> and boosts revenue, but risks a <strong className="text-[#D64545]">2-day delay</strong> for the Tier 1 client.</p>
              </div>
          </div>
         <div className="flex gap-4 mt-6">
            <button onClick={onCancel} className="flex-1 border border-[#E5E5E5] bg-white py-3 rounded-lg uppercase text-xs font-bold tracking-widest hover:bg-gray-50 text-[#05080D] transition-colors">Cancel</button>
            <button onClick={() => onResolve('proceed')} className="flex-1 bg-[#05080D] text-white py-3 rounded-lg uppercase text-xs font-bold tracking-widest hover:bg-black/90 shadow-lg transition-all hover:scale-[1.02]">Resolve & Move</button>
         </div>
      </div>
    </motion.div>
  );
};

// 5. Thinking View
const OrderThinkingView = ({ order, onClose }: { order: Order; onClose: () => void }) => {
  const [notes, setNotes] = useState<StickyNoteData[]>([
    { id: '1', x: 100, y: 100, title: 'Fabric Delay', content: 'Velvet supplier mentioned a 2-day delay on shipment.', variant: 'risk', rotation: -1.2, connections: [] },
    { id: '2', x: 400, y: 120, title: 'Alternative', content: 'Check Local Supplier B for similar texture.', variant: 'idea', rotation: 2, connections: ['1'] },
    { id: '3', x: 250, y: 350, title: 'Budget Impact', content: 'Local sourcing increases cost by 15%.', variant: 'decision', rotation: -1, connections: ['2'] },
    { id: '4', x: 600, y: 200, title: 'Client Call', content: 'Schedule review with Vogue for approval.', variant: 'experiment', rotation: 1.5, connections: [] },
  ]);
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const [isFocusMode, setIsFocusMode] = useState(false);
  
  // -- LINKING LOGIC --
  const [isLinkingMode, setIsLinkingMode] = useState(false);
  const [linkSourceId, setLinkSourceId] = useState<string | null>(null);

  // -- MANUAL DRAG LOGIC --
  const [dragState, setDragState] = useState<{ id: string, startX: number, startY: number, initialNoteX: number, initialNoteY: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const addNote = () => {
    const newNote: StickyNoteData = {
      id: Date.now().toString(),
      x: 350,
      y: 250,
      title: '',
      content: '',
      variant: 'decision',
      rotation: Math.random() * 4 - 2,
      connections: []
    };
    setNotes(prev => [...prev, newNote]);
    setSelectedNoteId(newNote.id);
  };

  const handlePointerDown = (e: React.PointerEvent, id: string) => {
      e.stopPropagation();
      e.preventDefault(); // Prevent text selection/scrolling if dragging
      
      const note = notes.find(n => n.id === id);
      if (!note) return;

      // START DRAG
      setDragState({
          id,
          startX: e.clientX,
          startY: e.clientY,
          initialNoteX: note.x,
          initialNoteY: note.y
      });
      setSelectedNoteId(id);
  };

  const handleContainerPointerMove = (e: React.PointerEvent) => {
      if (!dragState) return;
      e.preventDefault();

      const dx = e.clientX - dragState.startX;
      const dy = e.clientY - dragState.startY;

      setNotes(prev => prev.map(n => 
          n.id === dragState.id 
          ? { ...n, x: dragState.initialNoteX + dx, y: dragState.initialNoteY + dy }
          : n
      ));
  };

  const handleContainerPointerUp = (e: React.PointerEvent) => {
      if (dragState) {
          // Check if it was a click (negligible move)
          const dist = Math.sqrt(Math.pow(e.clientX - dragState.startX, 2) + Math.pow(e.clientY - dragState.startY, 2));
          if (dist < 5) {
              handleNoteClick(dragState.id);
          }
          setDragState(null);
      }
  };

  const handleNoteClick = (id: string) => {
      if (isLinkingMode) {
          if (!linkSourceId) {
              setLinkSourceId(id); // Select source
          } else {
              if (linkSourceId === id) {
                  setLinkSourceId(null); // Deselect if same
              } else {
                  // Create Link
                  setNotes(prev => prev.map(n => 
                      n.id === linkSourceId 
                      ? { ...n, connections: [...n.connections, id] } 
                      : n
                  ));
                  setLinkSourceId(null);
                  setIsLinkingMode(false); // Exit mode after link
              }
          }
      }
  };

  const theme = {
    container: isFocusMode ? 'bg-[#0F0F0F]' : 'bg-[#F6F6F4]',
    leftPanel: isFocusMode ? 'bg-[#111111] border-white/10 text-white' : 'bg-white border-[#E5E5E5] text-[#05080D]',
    textP: isFocusMode ? 'text-white' : 'text-[#05080D]',
    textS: isFocusMode ? 'text-[#B3B3B3]' : 'text-[#5F6368]',
    border: isFocusMode ? 'border-white/10' : 'border-[#E5E5E5]',
    canvas: isFocusMode ? 'bg-[#161616]' : 'bg-[#F0F0F0]',
    connector: isFocusMode ? 'stroke-white stroke-opacity-10' : 'stroke-black stroke-opacity-10',
    grid: isFocusMode ? 'radial-gradient(#333 1px, transparent 1px)' : 'radial-gradient(#CCC 1px, transparent 1px)',
    resCard: isFocusMode ? 'bg-white/5 border-white/5' : 'bg-[#F9F9F9] border-[#E5E5E5]',
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`fixed inset-0 z-[100] flex transition-colors duration-500 ${theme.container}`}
    >
      <div className={`${isFocusMode ? 'w-[20%]' : 'w-[40%]'} h-full border-r flex flex-col relative z-20 shadow-[20px_0_40px_rgba(0,0,0,0.05)] transition-all duration-500 ease-in-out ${theme.leftPanel}`}>
        <div className="p-12 flex-1 overflow-y-auto">
          <button onClick={onClose} className={`flex items-center gap-2 mb-8 uppercase text-xs tracking-widest ${theme.textS}`}>
            <ChevronLeft size={16} /> Back to Planning
          </button>
          <h1 className={`text-4xl font-serif mb-2 ${theme.textP}`}>{order.name}</h1>
          <div className={`flex items-center gap-4 ${theme.textS}`}>
            <span className="uppercase text-xs tracking-widest">{order.client}</span>
            <span className={`w-1 h-1 rounded-full ${isFocusMode ? 'bg-white/20' : 'bg-black/20'}`} />
            <span className="uppercase text-xs tracking-widest">{order.id}</span>
          </div>
          
          <div className="mt-12 space-y-8">
              {/* Status */}
              <div className={`p-4 rounded-lg border ${theme.resCard}`}>
                  <div className={`${theme.textS} text-xs mb-1 flex items-center gap-2`}>Status</div>
                  <div className={`${theme.textP} font-medium uppercase`}>{order.status}</div>
              </div>

              {/* Material Specs */}
              <div>
                  <h3 className={`text-xs uppercase tracking-widest font-bold mb-4 ${theme.textS}`}>Material Bill of Materials</h3>
                  <div className="space-y-2">
                      <div className={`flex justify-between p-3 rounded border ${theme.resCard}`}>
                          <div className="flex items-center gap-3">
                              <Layers size={14} className={theme.textS} />
                              <span className={`text-sm ${theme.textP}`}>Italian Velvet (Black)</span>
                          </div>
                          <span className={`text-xs ${theme.textS}`}>240m Req.</span>
                      </div>
                      <div className={`flex justify-between p-3 rounded border ${theme.resCard}`}>
                          <div className="flex items-center gap-3">
                              <Layers size={14} className={theme.textS} />
                              <span className={`text-sm ${theme.textP}`}>Silk Lining (Gold)</span>
                          </div>
                          <span className={`text-xs ${theme.textS}`}>120m Req.</span>
                      </div>
                      <div className={`flex justify-between p-3 rounded border ${theme.resCard}`}>
                          <div className="flex items-center gap-3">
                              <Layers size={14} className={theme.textS} />
                              <span className={`text-sm ${theme.textP}`}>Brass Buttons (12mm)</span>
                          </div>
                          <span className={`text-xs ${theme.textS}`}>500 Units</span>
                      </div>
                  </div>
              </div>

              {/* Client History */}
              <div>
                  <h3 className={`text-xs uppercase tracking-widest font-bold mb-4 ${theme.textS}`}>Client Context</h3>
                  <div className={`p-4 rounded border ${theme.resCard} space-y-4`}>
                      <div className="flex items-start gap-3">
                          <History size={14} className={`mt-1 ${theme.textS}`} />
                          <div>
                              <div className={`text-sm font-medium ${theme.textP}`}>Last Order: Spring Collection</div>
                              <div className={`text-xs ${theme.textS} mt-1`}>Delivered 2 days late. Client sensitive to delays.</div>
                          </div>
                      </div>
                      <div className="flex items-start gap-3">
                          <FileText size={14} className={`mt-1 ${theme.textS}`} />
                          <div>
                              <div className={`text-sm font-medium ${theme.textP}`}>Special Instructions</div>
                              <div className={`text-xs ${theme.textS} mt-1`}>Double stitching required on all seams.</div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
        </div>
        <div className={`p-8 border-t ${theme.border} ${isFocusMode ? 'bg-[#111111]' : 'bg-[#F9F9F9]'}`}>
           <button onClick={() => setIsFocusMode(!isFocusMode)} className={`flex items-center justify-center gap-2 w-full py-4 rounded-lg border transition-all duration-300 ${isFocusMode ? 'bg-[#E9B855] text-black border-[#E9B855]' : 'bg-white border-[#E5E5E5]'}`}>
              {isFocusMode ? <Sun size={16} /> : <Moon size={16} />}
              <span className="uppercase text-xs tracking-widest font-bold">{isFocusMode ? 'Exit Focus Mode' : 'Enter Focus Mode'}</span>
           </button>
        </div>
      </div>

      {/* RIGHT PANEL - THINKING CANVAS */}
      <div 
        ref={containerRef}
        className={`flex-1 relative overflow-hidden cursor-crosshair transition-colors duration-500 ${theme.canvas}`} 
        // We use pointer events for Manual Drag handling to fix the "disappearing" issue
        onPointerMove={handleContainerPointerMove}
        onPointerUp={handleContainerPointerUp}
        // Click on background to deselect
        onPointerDown={(e) => { 
           if (e.target === e.currentTarget) {
              setSelectedNoteId(null); 
              setLinkSourceId(null); 
              setIsLinkingMode(false); 
           }
        }}
      >
        <div className="absolute inset-0 opacity-20 transition-all duration-500" style={{ backgroundImage: theme.grid, backgroundSize: '20px 20px' }} />
        
        {/* Connections */}
        <svg className="absolute inset-0 pointer-events-none w-full h-full z-0">
           {notes.map(note => note.connections.map(targetId => {
                 const target = notes.find(n => n.id === targetId);
                 if (!target) return null;
                 return <path key={`${note.id}-${targetId}`} d={`M${note.x+110},${note.y+80} Q${(note.x+target.x)/2+110},${(note.y+target.y)/2+130} ${target.x+110},${target.y+80}`} className={`transition-colors duration-500 ${theme.connector}`} strokeWidth="2" fill="none" strokeDasharray="4 4"/>;
           }))}
        </svg>

        {/* Notes */}
        {notes.map(note => (
            <StickyNote 
                key={note.id} 
                note={note} 
                isSelected={selectedNoteId === note.id} 
                isSource={linkSourceId === note.id}
                onPointerDown={(e) => handlePointerDown(e, note.id)}
                isFocusMode={isFocusMode} 
            />
        ))}

        {/* Floating Actions */}
        <div className="absolute bottom-12 right-12 flex flex-col gap-4 items-center z-50">
            {/* Link Toggle */}
            <motion.button 
                whileHover={{ scale: 1.1 }} 
                whileTap={{ scale: 0.9 }} 
                onClick={(e) => { e.stopPropagation(); setIsLinkingMode(!isLinkingMode); setLinkSourceId(null); }} 
                className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-colors ${isLinkingMode ? 'bg-black text-white' : 'bg-white text-black'}`}
                title="Link Notes"
            >
                <LinkIcon size={20} />
            </motion.button>

            {/* Add Note */}
            <motion.button 
                whileHover={{ scale: 1.1, rotate: 90 }} 
                whileTap={{ scale: 0.9 }} 
                onClick={(e) => { e.stopPropagation(); addNote(); }} 
                className="w-16 h-16 bg-[#E9B855] rounded-full flex items-center justify-center text-black shadow-lg"
            >
                <Plus size={32} />
            </motion.button>
        </div>
        
        {/* Mode Indicator Toast */}
        <AnimatePresence>
            {isLinkingMode && (
                <motion.div 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0, y: 20 }} 
                    className="absolute bottom-32 right-12 bg-black text-white px-4 py-2 rounded-full text-xs font-medium shadow-lg pointer-events-none"
                >
                    {linkSourceId ? "Select target note to connect" : "Select source note"}
                </motion.div>
            )}
        </AnimatePresence>

      </div>
    </motion.div>
  );
};

// --- Main Page Component ---

export function ManufacturerPlanning() {
  const { navigate } = useApp();
  
  // State for Navigation Hierarchy
  const [viewLevel, setViewLevel] = useState<ViewLevel>('days'); // 'months', 'weeks', 'days', 'hourly'
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [selectedWeek, setSelectedWeek] = useState<string | null>(null);
  const [expandedDay, setExpandedDay] = useState<string | null>(null); // 'hourly' view

  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  const [conflict, setConflict] = useState<ConflictData | null>(null);
  const [showUndo, setShowUndo] = useState(false);
  const [thinkingOrder, setThinkingOrder] = useState<Order | null>(null);

  // -- Filters --
  const getOrdersFor = (id: string, type: 'day' | 'week' | 'month') => {
      if (type === 'day') return orders.filter(o => o.day === id);
      if (type === 'week') return orders.filter(o => o.weekId === id);
      if (type === 'month') return orders.filter(o => o.monthId === id);
      return [];
  };

  const getOrdersForSlot = (dayId: string, hour: number) => 
    orders.filter(o => o.day === dayId && o.startTime === hour);

  // -- Navigation Actions --
  const handleLevelChange = (level: ViewLevel) => {
      setViewLevel(level);
      // Reset specific selections when moving up levels
      if (level === 'months') { setSelectedMonth(null); setSelectedWeek(null); setExpandedDay(null); }
      if (level === 'weeks') { setSelectedWeek(null); setExpandedDay(null); }
      if (level === 'days') { setExpandedDay(null); }
  };

  const handleDrillDown = (id: string, currentLevel: ViewLevel) => {
      if (currentLevel === 'months') {
          setSelectedMonth(id);
          setViewLevel('weeks');
      } else if (currentLevel === 'weeks') {
          setSelectedWeek(id);
          setViewLevel('days');
      } else if (currentLevel === 'days') {
          setExpandedDay(id);
      }
  };

  // -- Logic: Handle Drop (Conflict Detection) --
  const handleDrop = (item: Order, targetId: string, type: string, hour?: number) => {
     let existingOrders: Order[] = [];

     // 1. Identify Existing Orders in Target
     if (type === 'hour' && hour !== undefined) {
         // Detailed Conflict: Same Day + Same Hour
         existingOrders = getOrdersForSlot(expandedDay || targetId, hour);
     } else if (type === 'day') {
         // High Level Conflict: Same Day
         existingOrders = getOrdersFor(targetId, 'day');
     } else {
         // Allow free movement in Month/Week views without conflict modal for now
         // OR trigger a simpler move
         moveOrder(item, targetId, type, hour);
         return;
     }

     // 2. Conflict?
     if (existingOrders.length > 0) {
        setConflict({
            sourceOrder: item,
            targetOrder: existingOrders[0],
            day: targetId,
            hour: hour || 9
        });
        return;
     }

     // 3. No Conflict -> Move
     moveOrder(item, targetId, type, hour);
  };

  const moveOrder = (item: Order, targetId: string, type: string, hour?: number) => {
    setOrders(prev => prev.map(o => {
        if (o.id !== item.id) return o;
        
        // Update Order Location
        const updates: Partial<Order> = {};
        if (type === 'day') updates.day = targetId;
        if (type === 'week') updates.weekId = targetId;
        if (type === 'month') updates.monthId = targetId;
        if (type === 'hour') {
            updates.startTime = hour;
            updates.day = expandedDay || targetId; // ensure day is set if in expanded mode
        }
        
        return { ...o, ...updates, status: 'in-progress' };
    }));
    triggerUndo();
  };

  const triggerUndo = () => {
    setShowUndo(true);
    setTimeout(() => setShowUndo(false), 5000);
  };

  const resolveConflict = (decision: 'proceed' | 'cancel') => {
    if (decision === 'proceed' && conflict) {
       // Force Move
       moveOrder(conflict.sourceOrder, conflict.day, 'hour', conflict.hour);
    }
    setConflict(null);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-[#F7F7F5] text-[#0F0F12] overflow-x-hidden relative">
        
        {/* Main Content with Tab Selector */}
        <div className="w-full px-8 lg:px-12 py-6">
          
          {/* View Level Selector */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 text-sm font-['Inter_Tight'] font-medium uppercase tracking-wider text-[#0F0F12]/60">
              {selectedMonth && <><span className="text-[#0F0F12]">{MONTHS.find(m => m.id === selectedMonth)?.label}</span> <ChevronRight size={14}/></>}
              {selectedWeek && <><span className="text-[#0F0F12]">{WEEKS.find(w => w.id === selectedWeek)?.label}</span> <ChevronRight size={14}/></>}
            </div>

            <div className={`flex bg-[#E6E6E3] rounded-full p-1 relative transition-all duration-300 ${conflict ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
              {['Days', 'Weeks', 'Months'].map((mode) => (
                <button
                  key={mode}
                  onClick={() => handleLevelChange(mode.toLowerCase() as ViewLevel)}
                  className={`relative px-6 py-2 text-xs font-['Inter_Tight'] font-medium uppercase tracking-wider transition-all duration-300 z-10 ${viewLevel === mode.toLowerCase() ? 'text-[#0F0F12]' : 'text-[#0F0F12]/60 hover:text-[#0F0F12]'}`}
                >
                  {mode}
                  {viewLevel === mode.toLowerCase() && <motion.div layoutId="activeTab" className="absolute inset-0 bg-white rounded-full shadow-sm z-[-1]" />}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 transition-all duration-500 
                ${expandedDay ? 'grid-cols-[100px_1fr]' : ''} 
                ${viewLevel === 'days' && !expandedDay ? 'grid-cols-7' : ''}
                ${viewLevel === 'weeks' ? 'grid-cols-4' : ''}
                ${viewLevel === 'months' ? 'grid-cols-6 lg:grid-cols-12' : ''}
            ">
            
            {/* --- LEVEL 1: MONTHS (12 Cols) --- */}
            {viewLevel === 'months' && MONTHS.map(month => (
                <CalendarSlot 
                  key={month.id} 
                  id={month.id} 
                  title={month.label}
                  orders={getOrdersFor(month.id, 'month')}
                  onDrop={handleDrop}
                  onOrderClick={(o) => setThinkingOrder(o)}
                  onHeaderClick={() => handleDrillDown(month.id, 'months')}
                  type="month"
                />
            ))}

            {/* --- LEVEL 2: WEEKS (4 Cols) --- */}
            {viewLevel === 'weeks' && WEEKS.map(week => (
                <CalendarSlot 
                  key={week.id} 
                  id={week.id} 
                  title={week.label}
                  orders={getOrdersFor(week.id, 'week')}
                  onDrop={handleDrop}
                  onOrderClick={(o) => setThinkingOrder(o)}
                  onHeaderClick={() => handleDrillDown(week.id, 'weeks')}
                  type="week"
                />
            ))}

            {/* --- LEVEL 3: DAYS (7 Cols) --- */}
            {viewLevel === 'days' && !expandedDay && DAYS.map(day => (
                <CalendarSlot 
                  key={day.id} 
                  id={day.id} 
                  title={day.label}
                  subTitle={day.date.toString()}
                  orders={getOrdersFor(day.id, 'day')}
                  onDrop={handleDrop}
                  onOrderClick={(o) => setThinkingOrder(o)}
                  onHeaderClick={() => handleDrillDown(day.id, 'days')}
                  type="day"
                />
            ))}

            {/* --- LEVEL 4: EXPANDED HOURLY (List) --- */}
            {expandedDay && (
              <>
                 {/* Axis */}
                 <div className="flex flex-col justify-between pt-12 pb-4 pr-4 border-r border-[#E5E5E5]">
                    {DAYS.find(d => d.id === expandedDay)?.fullLabel.split('').map((char, i) => (
                      <span key={i} className="text-center text-sm font-serif font-bold text-[#05080D] block">{char}</span>
                    ))}
                 </div>
                 {/* Slots */}
                 <div className="space-y-0">
                    {Array.from({ length: 14 }).map((_, i) => { 
                      const hour = 8 + i;
                      return (
                        <CalendarSlot 
                          key={hour}
                          id={`hour-${hour}`}
                          hour={hour}
                          isExpanded={true}
                          type="hour"
                          orders={getOrdersForSlot(expandedDay, hour)}
                          onDrop={handleDrop}
                          onOrderClick={(o) => setThinkingOrder(o)}
                        />
                      );
                    })}
                 </div>
              </>
            )}
          </div>
          
          {!expandedDay && (
            <div className="mt-12 pt-8 border-t border-[#E5E5E5]">
              <h3 className="text-xs uppercase tracking-widest text-[#5F6368] mb-6 font-medium">Unscheduled Orders</h3>
              <div className="flex gap-4 flex-wrap">
                {orders.filter(o => !o.day && !o.weekId && !o.monthId).map(order => (
                  <div key={order.id} className="w-[200px]">
                     <DraggableOrder order={order} onClick={() => setThinkingOrder(order)} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <AnimatePresence>
          {conflict && (
            <motion.div className="fixed top-0 right-0 bottom-0 w-1/2 z-40 shadow-[-20px_0_50px_rgba(0,0,0,0.1)]" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}>
              <ComparisonPanel conflict={conflict} onResolve={resolveConflict} onCancel={() => setConflict(null)} />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showUndo && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="fixed bottom-12 left-12 flex items-center gap-4 bg-[#05080D] text-white px-6 py-3 rounded-full shadow-lg z-50">
              <CheckCircle2 className="w-4 h-4 text-[#4CAF50]" />
              <div className="text-sm">Change applied.</div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
           {thinkingOrder && <OrderThinkingView order={thinkingOrder} onClose={() => setThinkingOrder(null)} />}
        </AnimatePresence>

      </div>
    </DndProvider>
  );
}