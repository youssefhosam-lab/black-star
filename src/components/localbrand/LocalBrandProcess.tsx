import React, { useState } from 'react';
import { useApp } from '../../App';
import { motion } from 'motion/react';
import { AlertCircle, Clock, CheckCircle, MessageSquare } from 'lucide-react';

// Star Icon Component for Rating
const StarIcon = ({ className = "w-6 h-6", fillPercent = 0 }: { className?: string; fillPercent?: number }) => (
  <svg className={className} viewBox="0 0 224 184" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id={`starFill-${fillPercent}`}>
        <stop offset={`${fillPercent}%`} stopColor="currentColor" />
        <stop offset={`${fillPercent}%`} stopColor="transparent" />
      </linearGradient>
    </defs>
    <path 
      d="M143.719 110.121C156.233 101.407 171.96 95.7044 189.287 94.385L223.521 91.7763L189.287 89.1675C171.96 87.8479 156.243 82.1452 143.719 73.4316L190.782 26.8837L134.096 65.5295C123.485 55.2537 116.54 42.339 114.933 28.1123L111.756 4.76837e-07L108.579 28.1123C106.972 42.339 100.027 55.2461 89.416 65.5295L32.7299 26.8837L79.7927 73.4316C67.2789 82.1452 51.5514 87.8479 34.2351 89.1675L1.04308e-07 91.7763L34.2351 94.385C51.5607 95.7044 67.2789 101.415 79.7927 110.121L32.7299 156.669L89.416 118.023C100.027 128.299 106.972 141.214 108.579 155.433L111.756 183.545L114.933 155.433C116.54 141.206 123.494 128.299 134.096 118.023L190.782 156.669L143.719 110.121Z" 
      fill={fillPercent > 0 ? `url(#starFill-${fillPercent})` : "currentColor"}
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);

// Header Component
const ProcessHeader = () => {
  const { navigate } = useApp();

  return (
    <header className="bg-[#F7F7F5] border-b border-[#0F0F12]/10 sticky top-0 z-40">
      <div className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-['Inter_Tight'] tracking-tight text-[#0F0F12]">Process</h1>
          <div className="w-20" /> {/* Spacer for centering */}
        </div>
      </div>
    </header>
  );
};

// Pending Production Section
const PendingProduction = () => {
  const orders = [
    { id: 1, manufacturer: 'Nova Textiles', type: 'Garment', product: 'T-Shirt', quantity: 100, estimatedResponse: '2-3 hours' },
    { id: 2, manufacturer: 'Dark Matter Print', type: 'Print', product: 'Hoodie', quantity: 50, estimatedResponse: '4-6 hours' },
  ];

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-['Inter_Tight'] text-[#0F0F12] mb-6">Pending Production</h2>
      <div className="space-y-4">
        {orders.map((order, index) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white border border-[#0F0F12]/10 p-6 hover:border-[#5B7C99] transition-all duration-400 cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <div className="flex gap-6 flex-1">
                {/* Product Thumbnail */}
                <div className="w-20 h-20 bg-[#F7F7F5] border border-[#0F0F12]/10 flex items-center justify-center">
                  <span className="text-xs uppercase text-[#0F0F12]/40">{order.product}</span>
                </div>

                {/* Details */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg text-[#0F0F12]">{order.manufacturer}</h3>
                    <span className="px-2 py-1 bg-[#0E1A2B]/10 text-[#0E1A2B] text-xs uppercase tracking-wider">
                      {order.type}
                    </span>
                  </div>
                  <p className="text-sm text-[#0F0F12]/60 mb-3">Quantity: {order.quantity}</p>
                  <div className="flex items-center gap-2 text-sm text-[#0F0F12]/60">
                    <Clock className="w-4 h-4" />
                    <span>Est. response: {order.estimatedResponse}</span>
                  </div>
                </div>

                {/* Status Badge */}
                <motion.div
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="px-4 py-2 bg-[#5B7C99]/10 border border-[#5B7C99]/30 text-[#5B7C99] text-xs uppercase tracking-wider self-start"
                >
                  Waiting Approval
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

// Active Production Section
const ActiveProduction = () => {
  const orders = [
    { 
      id: 1, 
      manufacturer: 'Steel Thread Factory', 
      location: 'Istanbul', 
      progress: 60,
      steps: [
        { name: 'Materials', completed: true, timestamp: '2 days ago' },
        { name: 'Cutting', completed: true, timestamp: '1 day ago' },
        { name: 'Sewing', completed: false, timestamp: null },
        { name: 'Finishing', completed: false, timestamp: null },
        { name: 'Quality Check', completed: false, timestamp: null },
      ],
      status: 'on-track',
      completion: 'Expected in 4 days'
    },
    { 
      id: 2, 
      manufacturer: 'Nova Textiles', 
      location: 'Porto', 
      progress: 85,
      steps: [
        { name: 'Materials', completed: true, timestamp: '5 days ago' },
        { name: 'Cutting', completed: true, timestamp: '4 days ago' },
        { name: 'Printing', completed: true, timestamp: '2 days ago' },
        { name: 'Finishing', completed: true, timestamp: '1 day ago' },
        { name: 'Quality Check', completed: false, timestamp: null },
      ],
      status: 'on-track',
      completion: 'Expected in 2 days'
    },
  ];

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-['Inter_Tight'] text-[#0F0F12] mb-6">Active Production</h2>
      <div className="space-y-6">
        {orders.map((order, index) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white border border-[#0F0F12]/10 p-6 hover:border-[#5B7C99] transition-all duration-400"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-lg text-[#0F0F12]">{order.manufacturer}</h3>
                  <span className="text-sm text-[#0F0F12]/40">{order.location}</span>
                </div>
                <p className="text-sm text-[#0F0F12]/60">{order.completion}</p>
              </div>
              <motion.div
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className={`w-3 h-3 rounded-full ${
                  order.status === 'on-track' ? 'bg-[#0E1A2B]' : 'bg-[#5B7C99]'
                }`}
              />
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-[#0F0F12]/60">Overall Progress</span>
                <span className="text-sm font-['IBM_Plex_Mono'] text-[#0F0F12]">{order.progress}%</span>
              </div>
              <div className="w-full h-2 bg-[#0F0F12]/10">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${order.progress}%` }}
                  transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full bg-[#5B7C99]"
                />
              </div>
            </div>

            {/* Production Timeline */}
            <div className="border-t border-[#0F0F12]/10 pt-4">
              <p className="text-xs uppercase tracking-wider text-[#0F0F12]/60 mb-4">Production Timeline</p>
              <div className="flex items-center gap-2">
                {order.steps.map((step, i) => (
                  <div key={i} className="contents">
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.5 + (i * 0.1), ease: [0.22, 1, 0.36, 1] }}
                      className="relative group"
                    >
                      <div className={`w-3 h-3 rounded-full cursor-pointer ${
                        step.completed ? 'bg-[#0E1A2B]' : 'bg-[#0F0F12]/20'
                      }`} />
                      
                      {/* Tooltip */}
                      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-[#0F0F12] text-white px-3 py-2 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        <p className="font-medium">{step.name}</p>
                        {step.timestamp && <p className="text-[#F7F7F5]/60 mt-1">{step.timestamp}</p>}
                      </div>
                    </motion.div>
                    {i < order.steps.length - 1 && (
                      <div className={`flex-1 h-[2px] ${
                        step.completed ? 'bg-[#0E1A2B]' : 'bg-[#0F0F12]/20'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

// Problem / Blocked Production Section
const ProblematicProduction = () => {
  const [showImpact, setShowImpact] = useState<number | null>(null);

  const issues = [
    {
      id: 1,
      manufacturer: 'Dark Matter Print',
      problem: 'Fabric color not matching specification',
      action: 'Approve alternative or modify design',
      impact: {
        delay: '+3 days',
        cost: '+$120',
      }
    },
  ];

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-['Inter_Tight'] text-[#0F0F12] mb-6">Problem / Blocked</h2>
      <div className="space-y-4">
        {issues.map((issue, index) => (
          <motion.div
            key={issue.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            onAnimationComplete={() => {
              setTimeout(() => {
                const element = document.getElementById(`issue-${issue.id}`);
                if (element) {
                  element.style.transform = 'translateX(2px)';
                  setTimeout(() => {
                    element.style.transform = 'translateX(-2px)';
                    setTimeout(() => {
                      element.style.transform = 'translateX(0)';
                    }, 50);
                  }, 50);
                }
              }, 100);
            }}
            id={`issue-${issue.id}`}
            className="bg-white border-l-4 border-l-[#7A0F0F] border-r border-r-[#0F0F12]/10 border-y border-y-[#0F0F12]/10 p-6 transition-all duration-300"
          >
            <div className="flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-[#7A0F0F] flex-shrink-0 mt-1" />
              
              <div className="flex-1">
                <h3 className="text-lg text-[#0F0F12] mb-1">{issue.manufacturer}</h3>
                <p className="text-[#0F0F12]/70 mb-4">{issue.problem}</p>
                
                <div className="flex items-center gap-2 text-sm text-[#0F0F12]/60 mb-4">
                  <MessageSquare className="w-4 h-4" />
                  <span>Required: {issue.action}</span>
                </div>

                {/* Impact Preview */}
                <div className="bg-[rgb(250,250,250)] border border-[#0F0F12]/10 p-4 mb-4">
                  <p className="text-xs uppercase tracking-wider text-[#0F0F12]/60 mb-3">Impact Preview</p>
                  <div className="flex gap-6">
                    <div>
                      <p className="text-sm text-[#0F0F12]/60 mb-1">Delay</p>
                      <p className="text-lg font-['IBM_Plex_Mono'] text-[#0F0F12]">{issue.impact.delay}</p>
                    </div>
                    <div>
                      <p className="text-sm text-[#0F0F12]/60 mb-1">Cost Change</p>
                      <p className="text-lg font-['IBM_Plex_Mono'] text-[#0F0F12]">{issue.impact.cost}</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button className="px-6 py-3 bg-[#0F0F12] text-white hover:bg-[#0E1A2B] transition-all duration-300 text-sm uppercase tracking-wider">
                    Approve Change
                  </button>
                  <button className="px-6 py-3 border border-[#0F0F12] text-[#0F0F12] hover:bg-[#0F0F12]/5 transition-all duration-300 text-sm uppercase tracking-wider">
                    Modify Design
                  </button>
                  <button className="px-6 py-3 border border-[#0F0F12]/30 text-[#0F0F12]/60 hover:border-[#0F0F12] hover:text-[#0F0F12] transition-all duration-300 text-sm uppercase tracking-wider">
                    Contact Manufacturer
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

// Rating System Component
const RatingSystem = ({ onRate }: { onRate: (ratings: any) => void }) => {
  const [ratings, setRatings] = useState({
    time: 0,
    quality: 0,
    communication: 0,
    accuracy: 0,
  });

  const [hoveredSegment, setHoveredSegment] = useState<string | null>(null);

  const segments = [
    { id: 'time', label: 'Time', angle: 0 },
    { id: 'quality', label: 'Quality', angle: 90 },
    { id: 'communication', label: 'Communication', angle: 180 },
    { id: 'accuracy', label: 'Accuracy', angle: 270 },
  ];

  const handleSegmentClick = (segmentId: string, value: number) => {
    const newRatings = { ...ratings, [segmentId]: value };
    setRatings(newRatings);
    onRate(newRatings);
  };

  return (
    <div className="flex flex-col items-center gap-8">
      {/* Star Rating */}
      <div className="relative">
        <StarIcon className="w-32 h-32 text-[#0F0F12]/20" fillPercent={0} />
        
        {/* Clickable segments overlay */}
        {segments.map((segment) => (
          <div
            key={segment.id}
            className="absolute inset-0 cursor-pointer"
            onMouseEnter={() => setHoveredSegment(segment.id)}
            onMouseLeave={() => setHoveredSegment(null)}
            onClick={() => handleSegmentClick(segment.id, 100)}
          >
            {/* Segment areas would be defined here */}
          </div>
        ))}
      </div>

      {/* Segment Controls */}
      <div className="w-full max-w-md space-y-4">
        {segments.map((segment) => (
          <div key={segment.id}>
            <div className="flex justify-between mb-2">
              <span className="text-sm uppercase tracking-wider text-[#0F0F12]">{segment.label}</span>
              <span className="text-sm font-['IBM_Plex_Mono'] text-[#0F0F12]">{ratings[segment.id as keyof typeof ratings]}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="25"
              value={ratings[segment.id as keyof typeof ratings]}
              onChange={(e) => handleSegmentClick(segment.id, parseInt(e.target.value))}
              className="w-full h-2 bg-[#0F0F12]/10 appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #5B7C99 0%, #5B7C99 ${ratings[segment.id as keyof typeof ratings]}%, #0F0F1210 ${ratings[segment.id as keyof typeof ratings]}%, #0F0F1210 100%)`
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

// Completed Production Section
const CompletedProduction = () => {
  const [showRating, setShowRating] = useState<number | null>(null);
  const [showImprovements, setShowImprovements] = useState<number | null>(null);

  const completed = [
    {
      id: 1,
      manufacturer: 'Steel Thread Factory',
      product: 'T-Shirt',
      quantity: 100,
      completedDate: 'Dec 20, 2025',
      rated: false,
    },
  ];

  const handleRate = (orderId: number, ratings: any) => {
    console.log('Ratings for order', orderId, ratings);
    setShowRating(null);
    setShowImprovements(orderId);
  };

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-['Inter_Tight'] text-[#0F0F12] mb-6">Completed Production</h2>
      <div className="space-y-4">
        {completed.map((order, index) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white border border-[#0F0F12]/10 p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex gap-6 flex-1">
                {/* Product Thumbnail */}
                <div className="w-20 h-20 bg-[#F7F7F5] border border-[#0F0F12]/10 flex items-center justify-center">
                  <span className="text-xs uppercase text-[#0F0F12]/40">{order.product}</span>
                </div>

                {/* Details */}
                <div className="flex-1">
                  <h3 className="text-lg text-[#0F0F12] mb-1">{order.manufacturer}</h3>
                  <p className="text-sm text-[#0F0F12]/60 mb-2">Quantity: {order.quantity}</p>
                  <div className="flex items-center gap-2 text-sm text-[#0F0F12]/60">
                    <CheckCircle className="w-4 h-4" />
                    <span>Completed: {order.completedDate}</span>
                  </div>
                </div>

                <button
                  onClick={() => setShowRating(showRating === order.id ? null : order.id)}
                  className="px-6 py-3 border border-[#0F0F12] text-[#0F0F12] hover:bg-[#0F0F12] hover:text-white transition-all duration-300 text-sm uppercase tracking-wider"
                >
                  {showRating === order.id ? 'Close Rating' : 'Rate Production'}
                </button>
              </div>
            </div>

            {/* Rating Interface */}
            {showRating === order.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="border-t border-[#0F0F12]/10 pt-6 mt-6"
              >
                <RatingSystem onRate={(ratings) => handleRate(order.id, ratings)} />
              </motion.div>
            )}

            {/* Improvements Log */}
            {showImprovements === order.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="border-t border-[#0F0F12]/10 pt-6 mt-6"
              >
                <h4 className="text-sm uppercase tracking-wider text-[#0F0F12] mb-4">Production Improvements Log</h4>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-[#0F0F12]/60 block mb-2">What went well</label>
                    <textarea
                      className="w-full px-4 py-3 border border-[#0F0F12]/20 focus:border-[#5B7C99] outline-none resize-none"
                      rows={3}
                      placeholder="Communication was clear, delivery was on time..."
                    />
                  </div>
                  <div>
                    <label className="text-sm text-[#0F0F12]/60 block mb-2">What should improve next run</label>
                    <textarea
                      className="w-full px-4 py-3 border border-[#0F0F12]/20 focus:border-[#5B7C99] outline-none resize-none"
                      rows={3}
                      placeholder="Quality check could be more thorough, stitching on collars..."
                    />
                  </div>
                  <button className="px-6 py-3 bg-[#0F0F12] text-white hover:bg-[#0E1A2B] transition-all duration-300 text-sm uppercase tracking-wider">
                    Save Improvements
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export function LocalBrandProcess() {
  return (
    <div className="min-h-screen bg-[#F7F7F5]">
      <ProcessHeader />
      
      <div className="container mx-auto px-6 py-12 bg-[#FAFAFA]">
        <PendingProduction />
        <ActiveProduction />
        <ProblematicProduction />
        <CompletedProduction />
      </div>
    </div>
  );
}