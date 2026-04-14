import React, { useState } from 'react';
import { useApp } from '../../App';
import { motion } from 'motion/react';
import { Bell, User, ChevronDown, ArrowLeft, Calendar, MapPin, Clock, DollarSign, Download, CheckCircle2 } from 'lucide-react';
import Logo from '../../imports/Logo';

// --- Types ---
interface OrderDetail {
  id: string;
  brand: string;
  jobType: string;
  payment: number;
  status: 'new' | 'active' | 'finished' | 'cancelled';
  date: string;
  statusBadge: string;
  location: string;
  time: string;
  duration: string;
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
  description: string;
  requirements: string[];
  deliverables: string[];
  timeline: { label: string; date: string; completed: boolean }[];
}

// --- Header Component ---
const ModelHeader = ({ activePage }: { activePage: string }) => {
  const { navigate } = useApp();
  const [showDropdown, setShowDropdown] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', route: 'home' },
    { id: 'portfolio', label: 'Portfolio', route: 'model-portfolio' },
    { id: 'orders', label: 'Orders', route: 'model-orders' },
    { id: 'analytics', label: 'Analytics', route: 'model-analytics' },
    { id: 'ranking', label: 'Ranking', route: 'model-ranking' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 h-20 bg-white/95 backdrop-blur-sm z-50 border-b border-gray-200">
      <div className="h-full px-12 flex items-center justify-between max-w-[2000px] mx-auto">
        <div className="w-10 h-10 text-black">
          <Logo showText={false} />
        </div>

        <nav className="hidden md:flex items-center gap-12">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => navigate(item.route)}
              className="relative group"
            >
              <span className="text-xs uppercase tracking-[0.15em] text-black transition-colors">
                {item.label}
              </span>
              <motion.div
                className="absolute -bottom-1 left-0 right-0 h-[1px] bg-black"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: activePage === item.id ? 1 : 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              />
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-6">
          <button className="relative group">
            <Bell className="size-5 text-black transition-transform group-hover:scale-110" />
            <span className="absolute -top-1 -right-1 size-2 bg-black rounded-full" />
          </button>

          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-3 group"
            >
              <div className="size-10 rounded-full bg-gray-200 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1643743323468-1e018b621231?w=100&h=100&fit=crop"
                  alt="Profile"
                  className="w-full h-full object-cover filter grayscale"
                />
              </div>
              <ChevronDown className="size-4 text-gray-400 transition-transform group-hover:translate-y-0.5" />
            </button>

            {showDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 top-14 w-48 bg-white border border-gray-200 shadow-xl"
              >
                <button className="w-full px-6 py-4 text-left text-xs uppercase tracking-wide hover:bg-gray-50 transition-colors">
                  Settings
                </button>
                <button
                  onClick={() => {
                    setUser(null);
                    navigate('welcome');
                  }}
                  className="w-full px-6 py-4 text-left text-xs uppercase tracking-wide hover:bg-gray-50 transition-colors border-t border-gray-100"
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

// --- Order Details Page ---
export function ModelOrderDetails() {
  const { navigate, routeParams } = useApp();
  
  // Get basic order info from routeParams
  const basicOrder = routeParams?.order;
  
  // Full order details database (in real app, this would be fetched from API)
  const orderDetailsDatabase: Record<string, OrderDetail> = {
    '1': {
      id: '1',
      brand: 'GQ Middle East',
      jobType: 'Cover Shoot',
      payment: 52000,
      status: 'new',
      date: 'Feb 5, 2025',
      statusBadge: 'New',
      location: 'Dubai, UAE - Studio 7, DIFC',
      time: '9:00 AM',
      duration: '8 hours',
      contactPerson: 'Ahmed Hassan',
      contactEmail: 'ahmed.hassan@gqme.com',
      contactPhone: '+971 50 123 4567',
      description: 'Cover shoot for the February 2025 edition of GQ Middle East. The shoot will focus on formal menswear with a modern twist, featuring luxury brands. The creative direction aims to capture sophistication with edge.',
      requirements: [
        'Professional modeling experience',
        'Height: 185cm+',
        'Available for full day shoot',
        'Comfortable with studio lighting',
        'Must bring personal grooming kit'
      ],
      deliverables: [
        '10-15 final edited images',
        'Full usage rights for print and digital',
        'Behind-the-scenes content',
        'Social media promotion'
      ],
      timeline: [
        { label: 'Contract Signed', date: 'Jan 28, 2025', completed: true },
        { label: 'Pre-production Meeting', date: 'Jan 30, 2025', completed: true },
        { label: 'Shoot Day', date: 'Feb 5, 2025', completed: false },
        { label: 'Photo Review', date: 'Feb 8, 2025', completed: false },
        { label: 'Final Delivery', date: 'Feb 12, 2025', completed: false },
      ]
    },
    '2': {
      id: '2',
      brand: 'Hermès',
      jobType: 'Campaign',
      payment: 68000,
      status: 'new',
      date: 'Feb 12, 2025',
      statusBadge: 'New',
      location: 'Paris, France - Hermès Headquarters',
      time: '10:00 AM',
      duration: '2 days',
      contactPerson: 'Marie Dubois',
      contactEmail: 'marie.dubois@hermes.com',
      contactPhone: '+33 1 40 17 47 17',
      description: 'Luxury campaign shoot for Hermès Spring/Summer 2025 collection. The shoot will showcase leather goods and ready-to-wear pieces in iconic Parisian locations.',
      requirements: [
        'International modeling experience',
        'Available for 2 consecutive days',
        'Valid passport and EU work permit',
        'Experience with luxury brands',
        'French language skills (preferred)'
      ],
      deliverables: [
        '20+ campaign images',
        'Worldwide usage rights',
        'Video content for social media',
        'Exclusive 6-month contract'
      ],
      timeline: [
        { label: 'Contract Negotiation', date: 'Feb 1, 2025', completed: true },
        { label: 'Location Scouting', date: 'Feb 8, 2025', completed: false },
        { label: 'Shoot Day 1', date: 'Feb 12, 2025', completed: false },
        { label: 'Shoot Day 2', date: 'Feb 13, 2025', completed: false },
        { label: 'Post-production', date: 'Feb 20, 2025', completed: false },
      ]
    },
    '3': {
      id: '3',
      brand: 'Vogue Arabia',
      jobType: 'Editorial Shoot',
      payment: 45000,
      status: 'active',
      date: 'Jan 15, 2025',
      statusBadge: 'In Progress',
      location: 'Riyadh, Saudi Arabia - Desert Location',
      time: '6:00 AM',
      duration: '12 hours',
      contactPerson: 'Fatima Al-Rashid',
      contactEmail: 'fatima@voguearabia.com',
      contactPhone: '+966 11 234 5678',
      description: 'High-fashion editorial shoot in the Saudi Arabian desert. The theme explores modern Middle Eastern fashion with traditional influences.',
      requirements: [
        'Experience with outdoor shoots',
        'Early morning availability',
        'Heat tolerance',
        'Professional portfolio required'
      ],
      deliverables: [
        '8-page editorial spread',
        'Digital and print rights',
        'Cover consideration',
        'Social media features'
      ],
      timeline: [
        { label: 'Concept Approval', date: 'Jan 8, 2025', completed: true },
        { label: 'Wardrobe Fitting', date: 'Jan 12, 2025', completed: true },
        { label: 'Shoot Day', date: 'Jan 15, 2025', completed: true },
        { label: 'Image Selection', date: 'Jan 20, 2025', completed: false },
        { label: 'Publication', date: 'Feb 1, 2025', completed: false },
      ]
    },
    '4': {
      id: '4',
      brand: 'Dior Men',
      jobType: 'Spring Campaign',
      payment: 38000,
      status: 'active',
      date: 'Jan 22, 2025',
      statusBadge: 'In Progress',
      location: 'Milan, Italy - Studio & Streets',
      time: '8:00 AM',
      duration: '10 hours',
      contactPerson: 'Marco Benedetti',
      contactEmail: 'marco.b@dior.com',
      contactPhone: '+39 02 777 271',
      description: 'Spring 2025 campaign for Dior Men featuring tailored suits and accessories in Milan\'s iconic fashion district.',
      requirements: [
        'High-fashion editorial experience',
        'Height: 183cm minimum',
        'Tailored fit experience',
        'Available for full day'
      ],
      deliverables: [
        'Campaign imagery',
        'European usage rights',
        'Lookbook participation',
        'Brand ambassador consideration'
      ],
      timeline: [
        { label: 'Casting', date: 'Jan 10, 2025', completed: true },
        { label: 'Fitting', date: 'Jan 18, 2025', completed: true },
        { label: 'Campaign Shoot', date: 'Jan 22, 2025', completed: true },
        { label: 'Final Edits', date: 'Jan 28, 2025', completed: false },
        { label: 'Campaign Launch', date: 'Mar 1, 2025', completed: false },
      ]
    },
  };
  
  // Get full order details by ID, or use default
  const orderData = basicOrder 
    ? (orderDetailsDatabase[basicOrder.id] || {
        ...basicOrder,
        location: 'TBD',
        time: 'TBD',
        duration: 'TBD',
        contactPerson: 'TBD',
        contactEmail: 'contact@brand.com',
        contactPhone: 'TBD',
        description: 'Order details will be updated soon.',
        requirements: [],
        deliverables: [],
        timeline: []
      })
    : orderDetailsDatabase['1'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-black text-white';
      case 'active':
        return 'bg-white text-black border border-black';
      case 'finished':
        return 'bg-gray-100 text-gray-600 border border-gray-300';
      case 'cancelled':
        return 'bg-white text-gray-400 border border-gray-300';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <ModelHeader activePage="orders" />
      
      <main className="max-w-[1400px] mx-auto px-12 pt-20">
        <div className="mt-[140px] mb-[140px]">
          {/* Back Button */}
          <button
            onClick={() => navigate('model-orders')}
            className="mb-12 flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-gray-500 hover:text-black transition-colors group"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            Back to Orders
          </button>

          {/* Order Header */}
          <div className="mb-16 pb-12 border-b border-gray-200">
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-3">Order #{orderData.id}</p>
                <h1 className="text-6xl font-['Playfair_Display'] mb-4">{orderData.brand}</h1>
                <p className="text-xl text-gray-600">{orderData.jobType}</p>
              </div>
              <span className={`text-xs uppercase tracking-wide px-6 py-3 ${getStatusColor(orderData.status)}`}>
                {orderData.statusBadge}
              </span>
            </div>

            <div className="grid grid-cols-4 gap-8 mt-12">
              <div>
                <p className="text-xs uppercase tracking-[0.15em] text-gray-400 mb-2">Payment</p>
                <p className="text-2xl">EGP {orderData.payment.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.15em] text-gray-400 mb-2">Date</p>
                <p className="text-2xl">{orderData.date}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.15em] text-gray-400 mb-2">Time</p>
                <p className="text-2xl">{orderData.time}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.15em] text-gray-400 mb-2">Duration</p>
                <p className="text-2xl">{orderData.duration}</p>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-3 gap-12">
            {/* Left Column - Main Details */}
            <div className="col-span-2 space-y-12">
              {/* Description */}
              <section>
                <h2 className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-4">Description</h2>
                <p className="text-lg leading-relaxed text-gray-700">{orderData.description}</p>
              </section>

              {/* Location */}
              <section>
                <h2 className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-4">Location</h2>
                <div className="flex items-start gap-3">
                  <MapPin className="size-5 text-gray-400 mt-1" />
                  <p className="text-lg">{orderData.location}</p>
                </div>
              </section>

              {/* Requirements */}
              <section>
                <h2 className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-4">Requirements</h2>
                <ul className="space-y-3">
                  {orderData.requirements.map((req, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-start gap-3"
                    >
                      <div className="size-1.5 bg-black rounded-full mt-2.5" />
                      <span className="text-gray-700">{req}</span>
                    </motion.li>
                  ))}
                </ul>
              </section>

              {/* Deliverables */}
              <section>
                <h2 className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-4">Deliverables</h2>
                <ul className="space-y-3">
                  {orderData.deliverables.map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-start gap-3"
                    >
                      <div className="size-1.5 bg-black rounded-full mt-2.5" />
                      <span className="text-gray-700">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </section>

              {/* Timeline */}
              <section>
                <h2 className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-6">Timeline</h2>
                <div className="space-y-6">
                  {orderData.timeline.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-6"
                    >
                      <div className={`size-8 rounded-full border-2 flex items-center justify-center ${
                        item.completed ? 'bg-black border-black' : 'border-gray-300'
                      }`}>
                        {item.completed && <CheckCircle2 className="size-4 text-white" />}
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm ${item.completed ? 'text-black' : 'text-gray-500'}`}>
                          {item.label}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">{item.date}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            </div>

            {/* Right Column - Contact & Actions */}
            <div className="space-y-8">
              {/* Contact Information */}
              <section className="bg-gray-50 p-8 border border-gray-200">
                <h2 className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-6">Contact</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-gray-400 mb-1">Name</p>
                    <p className="text-black">{orderData.contactPerson}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-gray-400 mb-1">Email</p>
                    <a href={`mailto:${orderData.contactEmail}`} className="text-black hover:underline">
                      {orderData.contactEmail}
                    </a>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-gray-400 mb-1">Phone</p>
                    <a href={`tel:${orderData.contactPhone}`} className="text-black hover:underline">
                      {orderData.contactPhone}
                    </a>
                  </div>
                </div>
              </section>

              {/* Action Buttons */}
              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-black text-white py-4 text-xs uppercase tracking-[0.15em] hover:bg-gray-900 transition-colors"
                >
                  Accept Order
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full border border-black text-black py-4 text-xs uppercase tracking-[0.15em] hover:bg-gray-50 transition-colors"
                >
                  Download Contract
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full border border-gray-300 text-gray-600 py-4 text-xs uppercase tracking-[0.15em] hover:bg-gray-50 transition-colors"
                >
                  Decline Order
                </motion.button>
              </div>

              {/* Additional Info */}
              <section className="pt-8 border-t border-gray-200">
                <p className="text-xs text-gray-400 leading-relaxed">
                  By accepting this order, you agree to the terms and conditions outlined in the contract. 
                  All details can be reviewed in the downloadable contract document.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}