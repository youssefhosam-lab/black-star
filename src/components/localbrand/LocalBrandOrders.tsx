import React, { useState } from 'react';
import { useApp } from '../../App';
import { motion, AnimatePresence } from 'motion/react';
import { X, Package, Clock, CheckCircle, XCircle } from 'lucide-react';

// Order Card Component
const OrderCard = ({ order, onClick }: { order: any; onClick: () => void }) => {
  const statusColors = {
    new: 'bg-[#5B7C99]/10 text-[#5B7C99] border-[#5B7C99]/30',
    active: 'bg-[#0B0B0B]/10 text-[#0B0B0B] border-[#E6E6E3]',
    completed: 'bg-[#E6E6E3] text-[#111111] border-[#E6E6E3]',
    cancelled: 'bg-[#7A0F0F]/10 text-[#7A0F0F] border-[#7A0F0F]/30',
  };

  const StatusIcon = {
    new: Package,
    active: Clock,
    completed: CheckCircle,
    cancelled: XCircle,
  };

  const Icon = StatusIcon[order.status as keyof typeof StatusIcon];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      onClick={onClick}
      className="bg-white border border-[#E6E6E3] p-6 hover:border-[#5B7C99] transition-all duration-400 cursor-pointer"
    >
      <div className="flex items-start gap-6">
        {/* Thumbnail */}
        <div className="w-24 h-24 bg-[#F7F7F5] border border-[#E6E6E3] flex items-center justify-center flex-shrink-0">
          <span className="text-xs uppercase text-[#6E6E6E]/70">{order.product}</span>
        </div>

        {/* Details */}
        <div className="flex-1">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-lg text-[#0B0B0B] mb-1">Order #{order.id}</h3>
              <p className="text-sm text-[#6E6E6E]">{order.manufacturer}</p>
            </div>
            <span className={`px-3 py-1 border text-xs uppercase tracking-wider ${statusColors[order.status as keyof typeof statusColors]}`}>
              <Icon className="w-3 h-3 inline mr-1" />
              {order.status}
            </span>
          </div>

          <div className="flex items-center gap-6 text-sm text-[#6E6E6E] mb-4">
            <span>Qty: {order.quantity}</span>
            <span>•</span>
            <span>{order.date}</span>
          </div>

          {/* Progress Bar for Active Orders */}
          {order.status === 'active' && (
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-xs uppercase tracking-wider text-[#6E6E6E]">Progress</span>
                <span className="text-xs font-['IBM_Plex_Mono'] text-[#0B0B0B]">{order.progress}%</span>
              </div>
              <div className="w-full h-1.5 bg-[#E6E6E3]">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${order.progress}%` }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full bg-[#5B7C99]"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Order Detail Modal
const OrderDetailModal = ({ order, onClose }: { order: any; onClose: () => void }) => {
  const timeline = [
    { stage: 'Order Placed', date: 'Dec 15, 2025', completed: true },
    { stage: 'Manufacturer Approved', date: 'Dec 16, 2025', completed: true },
    { stage: 'Production Started', date: 'Dec 18, 2025', completed: order.status !== 'new' },
    { stage: 'Quality Check', date: order.status === 'completed' ? 'Dec 24, 2025' : 'Pending', completed: order.status === 'completed' },
    { stage: 'Shipped', date: order.status === 'completed' ? 'Dec 25, 2025' : 'Pending', completed: order.status === 'completed' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white max-w-3xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#E6E6E3] p-6 flex items-center justify-between z-10">
          <h2 className="text-2xl font-['Inter_Tight'] text-[#0B0B0B]">Order #{order.id}</h2>
          <button onClick={onClose} className="p-2 hover:bg-[#F7F7F5] transition-colors">
            <X className="w-6 h-6 text-[#0B0B0B]" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Order Info */}
          <div>
            <h3 className="text-sm uppercase tracking-wider text-[#0B0B0B] mb-4">Order Details</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-[#6E6E6E] mb-1">Product</p>
                <p className="text-lg text-[#0B0B0B]">{order.product}</p>
              </div>
              <div>
                <p className="text-sm text-[#6E6E6E] mb-1">Manufacturer</p>
                <p className="text-lg text-[#0B0B0B]">{order.manufacturer}</p>
              </div>
              <div>
                <p className="text-sm text-[#6E6E6E] mb-1">Quantity</p>
                <p className="text-lg font-['IBM_Plex_Mono'] text-[#0B0B0B]">{order.quantity}</p>
              </div>
              <div>
                <p className="text-sm text-[#6E6E6E] mb-1">Order Date</p>
                <p className="text-lg text-[#0B0B0B]">{order.date}</p>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="border-t border-[#E6E6E3] pt-8">
            <h3 className="text-sm uppercase tracking-wider text-[#0B0B0B] mb-6">Production Timeline</h3>
            <div className="space-y-6">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className={`w-4 h-4 rounded-full mt-1 flex-shrink-0 ${
                    item.completed ? 'bg-[#0B0B0B]' : 'bg-[#E6E6E3]'
                  }`} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className={`text-sm ${item.completed ? 'text-[#0B0B0B]' : 'text-[#6E6E6E]/70'}`}>
                        {item.stage}
                      </p>
                      <p className={`text-sm font-['IBM_Plex_Mono'] ${
                        item.completed ? 'text-[#6E6E6E]' : 'text-[#6E6E6E]/50'
                      }`}>
                        {item.date}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export function LocalBrandOrders() {
  const { navigate } = useApp();
  const [activeTab, setActiveTab] = useState<'new' | 'active' | 'completed' | 'cancelled'>('active');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const orders = {
    new: [
      { id: '1024', product: 'T-Shirt', manufacturer: 'Nova Textiles', quantity: 100, date: 'Dec 15, 2025', status: 'new' },
      { id: '1023', product: 'Hoodie', manufacturer: 'Steel Thread', quantity: 50, date: 'Dec 14, 2025', status: 'new' },
    ],
    active: [
      { id: '1022', product: 'Jacket', manufacturer: 'Dark Matter Print', quantity: 75, date: 'Dec 10, 2025', status: 'active', progress: 65 },
      { id: '1021', product: 'Pants', manufacturer: 'Precision Tailoring', quantity: 40, date: 'Dec 8, 2025', status: 'active', progress: 85 },
    ],
    completed: [
      { id: '1020', product: 'T-Shirt', manufacturer: 'Nova Textiles', quantity: 150, date: 'Nov 28, 2025', status: 'completed' },
      { id: '1019', product: 'Dress', manufacturer: 'Steel Thread', quantity: 30, date: 'Nov 20, 2025', status: 'completed' },
    ],
    cancelled: [
      { id: '1018', product: 'Hoodie', manufacturer: 'Dark Matter Print', quantity: 60, date: 'Nov 15, 2025', status: 'cancelled' },
    ],
  };

  const tabs = [
    { id: 'new', label: 'New', count: orders.new.length },
    { id: 'active', label: 'Active', count: orders.active.length },
    { id: 'completed', label: 'Completed', count: orders.completed.length },
    { id: 'cancelled', label: 'Cancelled', count: orders.cancelled.length },
  ];

  return (
    <div className="min-h-screen bg-[rgb(250,250,250)]">
      {/* Header */}
      <header className="bg-[#F7F7F5] border-b border-[#E6E6E3] sticky top-0 z-40">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-['Inter_Tight'] tracking-tight text-[#0B0B0B]">Orders</h1>
            <div className="w-20" />
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b border-[#E6E6E3]">
        <div className="container mx-auto px-6">
          <div className="flex gap-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-4 text-sm uppercase tracking-wider transition-all duration-300 border-b-2 ${
                  activeTab === tab.id
                    ? 'text-[#0B0B0B] border-[#111111]'
                    : 'text-[#6E6E6E]/70 border-transparent hover:text-[#6E6E6E]'
                }`}
              >
                {tab.label}
                <span className="ml-2 font-['IBM_Plex_Mono']">({tab.count})</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-12 bg-[#FAFAFA]">
        <div className="space-y-4">
          {orders[activeTab as keyof typeof orders].map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onClick={() => setSelectedOrder(order)}
            />
          ))}

          {orders[activeTab as keyof typeof orders].length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-[#6E6E6E]/70 text-lg">No {activeTab} orders</p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Order Detail Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <OrderDetailModal
            order={selectedOrder}
            onClose={() => setSelectedOrder(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}