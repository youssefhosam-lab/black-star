import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../App';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bell, 
  Search, 
  Filter, 
  Check, 
  ChevronRight, 
  MessageSquare, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Users,
  AlertTriangle,
  Clock,
  MapPin,
  Eye,
  Hand,
  CheckCircle2,
  ArrowUpRight,
  Plus,
  X
} from 'lucide-react';

// --- Header Component (Fixed) ---
const Header = ({ onOpenCreate }: { onOpenCreate: () => void }) => {
  const { navigate } = useApp();
  
  return (
    <motion.header 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 h-[72px] bg-[#05080D] z-50 flex items-center justify-between px-8 shadow-sm"
    >
      {/* Left: Logo & Create Button */}
      <div className="flex items-center gap-6 w-[200px]">
         <div 
           className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
           onClick={() => navigate('manufacturer-dashboard')}
         >
            {/* Placeholder Logo SVG */}
            <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center">
               <div className="w-2 h-2 bg-[#05080D] rounded-full" />
            </div>
            <span className="text-white font-serif tracking-wide text-[15px] hidden sm:block">Black Star</span>
         </div>

         {/* Add Post Button */}
         <button 
           onClick={onOpenCreate}
           className="w-8 h-8 rounded-full bg-[#FFFFFF]/10 hover:bg-[#FFFFFF]/20 border border-[#FFFFFF]/10 flex items-center justify-center text-white transition-all group"
           title="Create New Challenge"
         >
           <Plus className="w-4 h-4 group-hover:scale-110 transition-transform" />
         </button>
      </div>

      {/* Center: Page Title */}
      <div className="flex-1 flex justify-center">
        <h1 className="text-white font-medium text-[18px] tracking-wide">Community</h1>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center justify-end gap-6 w-[200px]">
        <button className="text-white/80 hover:text-white transition-colors relative group">
          <Bell className="w-5 h-5" />
          <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-[#D64545] rounded-full opacity-100 group-hover:animate-pulse" />
        </button>
        <button className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white text-xs font-medium hover:bg-white/20 transition-colors">
          M
        </button>
      </div>
    </motion.header>
  );
};

// --- Types & Mock Data ---

interface Solution {
  id: string;
  problem: string;
  contributor: string;
  isVerified: boolean;
  status: 'In progress' | 'Solved';
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  type: string;
  deadline: string;
  region: string;
  risk: 'low' | 'medium' | 'high';
  solutions: Solution[];
}

const mockChallenges: Challenge[] = [
  {
    id: 'CH-001',
    title: 'Cotton fabric shortage — 2,000 units blocked',
    description: 'Our primary supplier in Como has declared a force majeure due to raw material logistics. We are 2,000 units short for the upcoming FW24 release and need an immediate alternative for 400gsm heavyweight cotton fleece.',
    type: 'Material Shortage',
    deadline: '5 days left',
    region: 'Milan, IT',
    risk: 'high',
    solutions: [
      { id: 'SOL-1', problem: 'Surplus available at Como facility', contributor: 'Fabio T.', isVerified: true, status: 'In progress' },
      { id: 'SOL-2', problem: 'Alternative blend suggestion', contributor: 'Sarah J.', isVerified: true, status: 'Solved' },
      { id: 'SOL-3', problem: 'Logistics re-route option', contributor: 'DHL Logistics', isVerified: false, status: 'In progress' },
    ]
  },
  {
    id: 'CH-002',
    title: 'Dye house capacity overflow for FW24',
    description: 'Unexpected volume surge has overbooked our Lyon dye house. Looking for a partner with industrial garment dyeing capabilities who can take on 500 units of denim within the next 2 weeks.',
    type: 'Capacity Issue',
    deadline: '12 days left',
    region: 'Lyon, FR',
    risk: 'medium',
    solutions: [
      { id: 'SOL-4', problem: 'Sub-contracting offer', contributor: 'Atelier Noir', isVerified: true, status: 'In progress' }
    ]
  },
  {
    id: 'CH-003',
    title: 'Zipper supply chain delay',
    description: 'YKK custom pulls are stuck in customs. Production line B is stalled. Seeking local stock of #5 gunmetal zippers or a fast-track customs broker recommendation.',
    type: 'Component Delay',
    deadline: '2 weeks left',
    region: 'Tokyo, JP',
    risk: 'low',
    solutions: []
  },
  {
    id: 'CH-004',
    title: 'Pattern grading inconsistency check',
    description: 'We are seeing a 2cm variance in the XL grading for the "Structure Blazer". Need a pattern master to verify the CAD files against the tech pack before we cut the main bulk.',
    type: 'Quality Control',
    deadline: '3 days left',
    region: 'London, UK',
    risk: 'medium',
    solutions: []
  }
];

const additionalTemplates: Omit<Challenge, 'id' | 'solutions'>[] = [
  {
    title: 'Digital printer calibration drift',
    description: 'Our Kornit Atlas is showing magenta drift on 100% cotton blanks. Technicians are booked for 3 days. Does anyone have a workaround or an available printer for a 200 unit rush job?',
    type: 'Equipment Failure',
    deadline: '2 days left',
    region: 'Berlin, DE',
    risk: 'high'
  },
  {
    title: 'Merino wool certification pending',
    description: 'Shipment of 500kg Merino wool is held at port pending RWS certification verification. Need a contact at the certification body to expedite the document review.',
    type: 'Compliance',
    deadline: '1 week left',
    region: 'Sydney, AU',
    risk: 'medium'
  },
  {
    title: 'Seam sealer tape adhesive failure',
    description: 'The waterproof seam tape on our new shell jackets is delaminating after wash tests. Suspecting incorrect heat press temperature. Seeking advice from outerwear specialists.',
    type: 'Quality Control',
    deadline: '4 days left',
    region: 'Vancouver, CA',
    risk: 'high'
  },
  {
    title: 'Last-minute buttonhole machine breakdown',
    description: 'Reece 101 machine keyhole mechanism jammed during final assembly. 300 coats waiting for buttons. Need a mechanic or a rental unit in the NYC garment district immediately.',
    type: 'Equipment Failure',
    deadline: '24 hours left',
    region: 'New York, US',
    risk: 'high'
  },
  {
    title: 'Recycled poly blend pilling issue',
    description: 'The new sustainable polyester blend is pilling significantly after the abrasion test. We need a finishing treatment suggestion or a supplier for a higher twist yarn alternative.',
    type: 'Material Quality',
    deadline: '10 days left',
    region: 'Seoul, KR',
    risk: 'medium'
  },
  {
    title: 'Leather tannery effluent regulation',
    description: 'New local environmental regulations require an upgraded filtration system by next month. Looking for recommended engineering firms with experience in chrome tanning compliance.',
    type: 'Compliance',
    deadline: '3 weeks left',
    region: 'Florence, IT',
    risk: 'low'
  },
  {
    title: 'Embroidery thread color match specific',
    description: 'Cannot find an exact match for Pantone 19-4052 (Classic Blue) in rayon thread stock. Is there a supplier with custom dyeing capabilities for small batches (50 spools)?',
    type: 'Sourcing',
    deadline: '1 week left',
    region: 'Istanbul, TR',
    risk: 'low'
  },
  {
    title: 'Packaging supplier insolvency',
    description: 'Our main box supplier has ceased operations without notice. We have 5,000 units ready to ship. Need a packaging partner who can turn around custom rigid boxes in 5 days.',
    type: 'Logistics',
    deadline: '5 days left',
    region: 'Los Angeles, US',
    risk: 'high'
  }
];

// Helper to generate more content
const generateMoreChallenges = (count: number, startIndex: number): Challenge[] => {
  return Array.from({ length: count }).map((_, i) => {
    const templateIndex = (startIndex + i) % additionalTemplates.length;
    const template = additionalTemplates[templateIndex];
    
    return {
      ...template,
      id: `NEW-${startIndex + i}`,
      solutions: [] // Fresh posts start with no solutions
    };
  });
};

// --- Create Post Modal Component ---

const CreatePostModal = ({ 
  isOpen, 
  onClose, 
  onSubmit 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  onSubmit: (post: Omit<Challenge, 'id' | 'solutions'>) => void; 
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'Production Issue',
    deadline: '',
    region: '',
    risk: 'medium' as 'low' | 'medium' | 'high'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      title: '',
      description: '',
      type: 'Production Issue',
      deadline: '',
      region: '',
      risk: 'medium'
    });
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />

      {/* Modal Content */}
      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        className="relative w-full max-w-lg bg-white rounded-xl shadow-2xl overflow-hidden"
      >
        <div className="p-6 border-b border-[#E5E5E5] flex justify-between items-center bg-[#F9F9F9]">
          <h3 className="text-lg font-serif font-medium text-[#05080D]">Post New Challenge</h3>
          <button onClick={onClose} className="p-2 hover:bg-[#E5E5E5] rounded-full transition-colors text-[#5F6368]">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-medium text-[#5F6368] uppercase tracking-wider mb-1">Title</label>
            <input 
              required
              type="text" 
              value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}
              className="w-full p-3 bg-[#F6F6F4] border border-[#E5E5E5] rounded-lg focus:outline-none focus:border-[#05080D] transition-colors text-[#05080D]"
              placeholder="e.g. Fabric shortage for FW24"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#5F6368] uppercase tracking-wider mb-1">Description</label>
            <textarea 
              required
              rows={3}
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
              className="w-full p-3 bg-[#F6F6F4] border border-[#E5E5E5] rounded-lg focus:outline-none focus:border-[#05080D] transition-colors resize-none text-[#05080D]"
              placeholder="Describe the issue in detail..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#5F6368] uppercase tracking-wider mb-1">Type</label>
              <select 
                value={formData.type}
                onChange={e => setFormData({...formData, type: e.target.value})}
                className="w-full p-3 bg-[#F6F6F4] border border-[#E5E5E5] rounded-lg focus:outline-none focus:border-[#05080D] text-[#05080D]"
              >
                <option>Production Issue</option>
                <option>Material Shortage</option>
                <option>Quality Control</option>
                <option>Logistics</option>
                <option>Compliance</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-[#5F6368] uppercase tracking-wider mb-1">Risk Level</label>
              <select 
                value={formData.risk}
                onChange={e => setFormData({...formData, risk: e.target.value as any})}
                className="w-full p-3 bg-[#F6F6F4] border border-[#E5E5E5] rounded-lg focus:outline-none focus:border-[#05080D] text-[#05080D]"
              >
                <option value="low">Low Risk</option>
                <option value="medium">Medium Risk</option>
                <option value="high">High Risk</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#5F6368] uppercase tracking-wider mb-1">Deadline</label>
              <input 
                type="text" 
                value={formData.deadline}
                onChange={e => setFormData({...formData, deadline: e.target.value})}
                className="w-full p-3 bg-[#F6F6F4] border border-[#E5E5E5] rounded-lg focus:outline-none focus:border-[#05080D] text-[#05080D]"
                placeholder="e.g. 5 days left"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#5F6368] uppercase tracking-wider mb-1">Region</label>
              <input 
                type="text" 
                value={formData.region}
                onChange={e => setFormData({...formData, region: e.target.value})}
                className="w-full p-3 bg-[#F6F6F4] border border-[#E5E5E5] rounded-lg focus:outline-none focus:border-[#05080D] text-[#05080D]"
                placeholder="e.g. Milan, IT"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button 
              type="button" 
              onClick={onClose}
              className="px-6 py-3 text-sm font-medium text-[#5F6368] hover:bg-[#F6F6F4] rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-6 py-3 text-sm font-medium bg-[#05080D] text-white rounded-lg hover:bg-black transition-colors shadow-lg"
            >
              Publish Challenge
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

// --- Live Challenge Card Component ---

const LiveChallengeCard = ({ challenge, index }: { challenge: Challenge, index: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [isHovered, setIsHovered] = useState(false);
  const [solutionAccepted, setSolutionAccepted] = useState(false);
  const commentInputRef = useRef<HTMLInputElement>(null);

  // Risk Gradient Map
  const riskGradient = {
    low: 'from-amber-300 via-amber-400 to-amber-300',
    medium: 'from-orange-400 via-orange-500 to-orange-400',
    high: 'from-red-500 via-red-600 to-red-500'
  };

  useEffect(() => {
    if (showComment && commentInputRef.current) {
      commentInputRef.current.focus();
    }
  }, [showComment]);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    
    // Simulate system tagging
    setTimeout(() => {
      setActiveTags(['Resource Available', 'Risk Warning']);
    }, 120);
  };

  const handleAcceptSolution = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSolutionAccepted(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, delay: index * 0.08, ease: "easeOut" }}
      className={`relative w-full bg-white rounded-[14px] border transition-all duration-200 overflow-hidden group/card ${
        isHovered || isExpanded ? 'border-[#05080D]/20 shadow-md' : 'border-[#E5E5E5] shadow-sm'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => !isExpanded && setIsExpanded(true)}
    >
      {/* Risk Strip (Top) */}
      <div className={`h-[6px] w-full bg-gradient-to-r ${riskGradient[challenge.risk]} relative overflow-hidden`}>
         <motion.div 
           className="absolute inset-0 bg-white/30"
           animate={{ x: ['-100%', '100%'] }}
           transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
         />
      </div>

      <div className="p-5">
         {/* Title & Badge */}
         <div className="flex justify-between items-start mb-2">
             <h3 className="text-[18px] font-semibold text-[#05080D] font-serif leading-tight pr-4">
               {challenge.title}
             </h3>
             {solutionAccepted && (
                 <motion.span 
                   initial={{ scale: 0.95, opacity: 0 }}
                   animate={{ scale: 1, opacity: 1 }}
                   className="flex-shrink-0 px-2 py-1 bg-[#4CAF50]/10 text-[#4CAF50] text-[10px] font-bold uppercase tracking-wider rounded-full flex items-center gap-1"
                 >
                    <CheckCircle2 className="w-3 h-3" /> Stabilizing
                 </motion.span>
             )}
         </div>

         {/* Description */}
         <p className="text-sm text-[#05080D]/80 mb-4 line-clamp-2 font-light leading-relaxed">
            {challenge.description}
         </p>

         {/* Metadata Row */}
         <div className="flex items-center gap-4 text-[12px] text-[#05080D]/70 mb-4">
            <span className="font-medium bg-[#F6F6F4] px-2 py-1 rounded-md">{challenge.type}</span>
            <span className="w-1 h-1 rounded-full bg-[#E5E5E5]" />
            <span className={challenge.risk === 'high' ? 'text-[#D64545] font-medium flex items-center gap-1' : ''}>
              {challenge.risk === 'high' && <AlertTriangle className="w-3 h-3" />}
              {challenge.deadline}
            </span>
            <span className="w-1 h-1 rounded-full bg-[#E5E5E5]" />
            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {challenge.region}</span>
         </div>

         {/* Action Buttons (Hidden by default, shown on hover/expand) */}
         <motion.div 
           className="flex justify-end gap-2 mt-4"
           initial={{ opacity: 0, y: 8 }}
           animate={{ opacity: (isHovered || isExpanded) ? 1 : 0, y: (isHovered || isExpanded) ? 0 : 8 }}
           transition={{ duration: 0.12, ease: "easeOut" }}
         >
            <button 
              className="px-4 py-2 text-xs font-medium border border-[#E5E5E5] rounded-lg hover:bg-[#F6F6F4] transition-colors"
              onClick={(e) => { e.stopPropagation(); setIsExpanded(!isExpanded); }}
            >
              {isExpanded ? 'Collapse' : 'View Details'}
            </button>
            <button className="px-4 py-2 text-xs font-medium bg-[#05080D] text-white rounded-lg hover:bg-black/90 transition-colors flex items-center gap-2">
              <Hand className="w-3 h-3" /> Offer Solution
            </button>
            <button 
              className="px-4 py-2 text-xs font-medium border border-[#E5E5E5] rounded-lg hover:bg-[#F6F6F4] transition-colors flex items-center gap-2"
              onClick={(e) => { e.stopPropagation(); setShowComment(!showComment); }}
            >
              <MessageSquare className="w-3 h-3" /> Comment
            </button>
         </motion.div>

         {/* Expanded Content: Community Solutions */}
         <AnimatePresence>
           {isExpanded && (
             <motion.div
               initial={{ height: 0, opacity: 0 }}
               animate={{ height: 'auto', opacity: 1 }}
               exit={{ height: 0, opacity: 0 }}
               transition={{ duration: 0.26, ease: "easeInOut" }}
               className="overflow-hidden"
             >
                <div className="pt-6 mt-6 border-t border-[#E5E5E5]">
                   <h4 className="text-sm font-medium text-[#05080D] mb-4">Community solutions already in motion</h4>
                   
                   <div className="space-y-3">
                      {challenge.solutions.length > 0 ? challenge.solutions.map((sol) => (
                        <div 
                          key={sol.id} 
                          className="flex items-center justify-between p-3 bg-[#F9F9F9] rounded-lg border border-[#F0F0F0] hover:border-[#E5E5E5] cursor-pointer transition-colors group/sol"
                        >
                           <div>
                              <p className="text-sm text-[#05080D] mb-1">{sol.problem}</p>
                              <div className="flex items-center gap-2 text-xs text-[#5F6368]">
                                 <span className="font-medium">{sol.contributor}</span>
                                 {sol.isVerified && <ShieldCheck className="w-3 h-3 text-[#4CAF50]" />}
                              </div>
                           </div>
                           <div className="flex items-center gap-3">
                               <span className={`text-[10px] uppercase tracking-wider px-2 py-1 rounded-full ${
                                 sol.status === 'Solved' ? 'bg-[#4CAF50]/10 text-[#4CAF50]' : 'bg-[#F4B400]/10 text-[#F4B400]'
                               }`}>
                                 {sol.status}
                               </span>
                               {/* Accept Solution Button */}
                               <button 
                                 onClick={handleAcceptSolution}
                                 className="opacity-0 group-hover/sol:opacity-100 p-1 hover:bg-[#E5E5E5] rounded-full transition-all"
                                 title="Accept Solution"
                               >
                                  <Check className="w-4 h-4 text-[#05080D]" />
                               </button>
                           </div>
                        </div>
                      )) : (
                        <div className="text-center py-6 text-sm text-[#9AA0A6] italic bg-[#F9F9F9] rounded-lg">
                           No solutions yet. Be the first to help.
                        </div>
                      )}
                   </div>

                   {/* Escalation Option */}
                   <div className="mt-6 pt-4 border-t border-dashed border-[#E5E5E5] flex justify-center">
                      <button className="text-xs text-[#5F6368] hover:text-[#D64545] transition-colors flex items-center gap-2 group/escalate">
                         <AlertTriangle className="w-3 h-3 group-hover/escalate:scale-110 transition-transform" /> 
                         Suggest alternative manufacturer (Escalate)
                      </button>
                   </div>
                </div>
             </motion.div>
           )}
         </AnimatePresence>

         {/* Comment Panel (Slide Up) */}
         <AnimatePresence>
           {showComment && (
             <motion.div
               initial={{ y: 16, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               exit={{ y: 16, opacity: 0 }}
               transition={{ duration: 0.18 }}
               className="mt-4 relative"
               onClick={(e) => e.stopPropagation()}
             >
                {/* Local Blur Backdrop for Focus */}
                <div className="absolute inset-0 bg-white/50 backdrop-blur-[2px] -z-10 rounded-lg" />
                
                <form onSubmit={handleCommentSubmit} className="relative">
                   <input 
                     ref={commentInputRef}
                     type="text" 
                     placeholder="Propose a solution, resource, or verified insight..."
                     className="w-full p-4 pr-12 text-sm bg-[#F6F6F4] border-b-2 border-[#05080D] focus:outline-none placeholder:text-[#9AA0A6] rounded-t-lg"
                     value={commentText}
                     onChange={(e) => setCommentText(e.target.value)}
                   />
                   <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-[#05080D] text-white rounded-full hover:bg-black transition-colors">
                      <ArrowUpRight className="w-4 h-4" />
                   </button>
                </form>

                {/* System Tagging */}
                <AnimatePresence>
                  {activeTags.length > 0 && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      className="flex gap-2 mt-3 overflow-hidden"
                    >
                       {activeTags.map((tag, i) => (
                         <motion.span 
                           key={i}
                           initial={{ opacity: 0, scale: 0.9 }}
                           animate={{ opacity: 1, scale: 1 }}
                           transition={{ delay: i * 0.1 }}
                           className="px-2 py-1 text-[10px] uppercase tracking-wider bg-[#E5E5E5] text-[#05080D] rounded-md flex items-center gap-1"
                         >
                           <Zap className="w-3 h-3" /> {tag}
                         </motion.span>
                       ))}
                    </motion.div>
                  )}
                </AnimatePresence>
             </motion.div>
           )}
         </AnimatePresence>
      </div>
    </motion.div>
  );
};

// --- Main Page Component ---

export function ManufacturerCommunityPage() {
  const [challenges, setChallenges] = useState<Challenge[]>(mockChallenges);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const loadMore = () => {
    if (isLoading) return;
    setIsLoading(true);
    
    // 10 second delay as requested
    setTimeout(() => {
      const newItems = generateMoreChallenges(4, challenges.length); // Add 4 new items to push page down
      setChallenges(prev => [...prev, ...newItems]);
      setIsLoading(false);
    }, 10000);
  };

  const handleCreatePost = (data: Omit<Challenge, 'id' | 'solutions'>) => {
    const newChallenge: Challenge = {
      ...data,
      id: `NEW-POST-${Date.now()}`,
      solutions: []
    };
    setChallenges(prev => [newChallenge, ...prev]);
    setIsCreateOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F6F6F4] font-sans pb-32">
      <Header onOpenCreate={() => setIsCreateOpen(true)} />

      {/* Create Post Modal */}
      <AnimatePresence>
        {isCreateOpen && (
          <CreatePostModal 
            isOpen={isCreateOpen} 
            onClose={() => setIsCreateOpen(false)} 
            onSubmit={handleCreatePost} 
          />
        )}
      </AnimatePresence>

      <main className="pt-[100px] w-full max-w-[1120px] mx-auto px-6 grid grid-cols-12">
        {/* Main Content Column (Centered, 760px) */}
        <div className="col-start-1 lg:col-start-3 col-span-12 lg:col-span-8 w-full max-w-[760px] mx-auto">
           {/* Section Title */}
           <div className="mb-6 flex items-baseline gap-3">
              <h2 className="text-[22px] font-semibold text-[#05080D] font-serif">Live Challenges</h2>
              <div className="w-2 h-2 rounded-full bg-[#D64545] animate-pulse" />
           </div>

           {/* Feed */}
           <div className="space-y-6">
              {challenges.map((challenge, index) => (
                 <LiveChallengeCard key={challenge.id} challenge={challenge} index={index} />
              ))}
           </div>

           {/* Infinite Scroll Loader (Visual) */}
           <div className="py-12 flex justify-center min-h-[120px] items-center">
              <motion.div 
                 onViewportEnter={() => loadMore()}
                 className="w-full flex justify-center"
              >
                 <motion.div 
                    className="w-32 h-0.5 bg-[#E5E5E5] overflow-hidden rounded-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                 >
                    <motion.div 
                      className="w-full h-full bg-[#05080D]" 
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                 </motion.div>
              </motion.div>
           </div>
        </div>
      </main>
    </div>
  );
}
