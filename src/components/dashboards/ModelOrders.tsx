import React, { useState } from 'react';
import { useApp } from '../../App';
import { motion } from 'motion/react';
import { Bell, User, ChevronDown, ArrowRight } from 'lucide-react';
import Logo from '../../imports/Logo';

// --- Types ---
interface Order {
  id: string;
  brand: string;
  jobType: string;
  payment: number;
  status: 'new' | 'active' | 'finished' | 'cancelled';
  date: string;
  statusBadge: string;
}

// --- Header Component ---
const ModelHeader = ({ activePage }: { activePage: string }) => {
  const { navigate, setUser } = useApp();
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

// --- Order Card ---
const OrderCard = ({ order }: { order: Order }) => {
  const { navigate } = useApp();
  
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
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className="bg-white border border-gray-200 p-6 cursor-pointer hover:border-black hover:shadow-lg transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-2xl font-['Playfair_Display'] mb-1">{order.brand}</h3>
          <p className="text-sm text-gray-500">{order.jobType}</p>
        </div>
        <span className={`text-xs uppercase tracking-wide px-4 py-2 ${getStatusColor(order.status)}`}>
          {order.statusBadge}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-6 pb-6 border-b border-gray-200">
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-400 mb-1">Payment</p>
          <p className="text-lg text-black">EGP {order.payment.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-400 mb-1">Date</p>
          <p className="text-lg text-black">{order.date}</p>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <button 
          onClick={() => navigate('model-order-details', { order })}
          className="text-xs uppercase tracking-[0.15em] text-black hover:underline underline-offset-4 flex items-center gap-2 group"
        >
          View Details
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </motion.div>
  );
};

// --- Orders Page ---
export function ModelOrders() {
  const [activeTab, setActiveTab] = useState<'new' | 'active' | 'finished' | 'cancelled'>('new');

  const allOrders: Order[] = [
    { id: '1', brand: 'GQ Middle East', jobType: 'Cover Shoot', payment: 52000, status: 'new', date: 'Feb 5, 2025', statusBadge: 'New' },
    { id: '2', brand: 'Hermès', jobType: 'Campaign', payment: 68000, status: 'new', date: 'Feb 12, 2025', statusBadge: 'New' },
    { id: '3', brand: 'Vogue Arabia', jobType: 'Editorial Shoot', payment: 45000, status: 'active', date: 'Jan 15, 2025', statusBadge: 'In Progress' },
    { id: '4', brand: 'Dior Men', jobType: 'Spring Campaign', payment: 38000, status: 'active', date: 'Jan 22, 2025', statusBadge: 'In Progress' },
    { id: '5', brand: 'Zara', jobType: 'Lookbook', payment: 28000, status: 'finished', date: 'Dec 10, 2024', statusBadge: 'Completed' },
    { id: '6', brand: 'Harper\'s Bazaar', jobType: 'Editorial', payment: 42000, status: 'finished', date: 'Nov 22, 2024', statusBadge: 'Completed' },
    { id: '7', brand: 'Massimo Dutti', jobType: 'Campaign', payment: 35000, status: 'cancelled', date: 'Oct 5, 2024', statusBadge: 'Cancelled' },
  ];

  const filteredOrders = allOrders.filter(order => order.status === activeTab);

  const tabs: Array<{ id: 'new' | 'active' | 'finished' | 'cancelled'; label: string; count: number }> = [
    { id: 'new', label: 'New', count: allOrders.filter(o => o.status === 'new').length },
    { id: 'active', label: 'Active', count: allOrders.filter(o => o.status === 'active').length },
    { id: 'finished', label: 'Finished', count: allOrders.filter(o => o.status === 'finished').length },
    { id: 'cancelled', label: 'Cancelled', count: allOrders.filter(o => o.status === 'cancelled').length },
  ];

  return (
    <div className="min-h-screen bg-white text-black">
      <ModelHeader activePage="orders" />
      
      <main className="max-w-[1800px] mx-auto px-12 pt-20">
        <div className="mt-[140px] mb-[140px]">
          {/* Page Title */}
          <div className="mb-16">
            <h1 className="text-6xl font-['Playfair_Display'] mb-4">Orders</h1>
            <p className="text-sm uppercase tracking-[0.2em] text-gray-500">Professional overview</p>
          </div>

          {/* Tabs */}
          <div className="flex gap-8 mb-12 border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="relative pb-4"
              >
                <div className="flex items-center gap-3">
                  <span className={`text-sm uppercase tracking-[0.15em] transition-colors ${
                    activeTab === tab.id ? 'text-black' : 'text-gray-400'
                  }`}>
                    {tab.label}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    activeTab === tab.id ? 'bg-black text-white' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {tab.count}
                  </span>
                </div>
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-black"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: activeTab === tab.id ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                />
              </button>
            ))}
          </div>

          {/* Order List */}
          <div className="grid grid-cols-1 gap-6">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                >
                  <OrderCard order={order} />
                </motion.div>
              ))
            ) : (
              <div className="p-24 border border-dashed border-gray-300 text-center">
                <p className="text-gray-400 text-sm uppercase tracking-wide">No orders in this category</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}