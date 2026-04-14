import React, { useState } from 'react';
import { useApp } from '../../App';
import { motion, AnimatePresence } from 'motion/react';
import { X, MessageSquare, Factory } from 'lucide-react';

// Star Rating Component
const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating / 25);
  const partialStar = (rating % 25) / 25;

  return (
    <div className="flex items-center gap-1">
      {[...Array(4)].map((_, i) => {
        const fill = i < fullStars ? 100 : i === fullStars ? partialStar * 100 : 0;
        return (
          <svg key={i} className="w-4 h-4" viewBox="0 0 24 24" fill="none">
            <defs>
              <linearGradient id={`fill-${i}-${rating}`}>
                <stop offset={`${fill}%`} stopColor="#0F0F12" />
                <stop offset={`${fill}%`} stopColor="#0F0F1220" />
              </linearGradient>
            </defs>
            <polygon
              points="12,2 15,8.5 22,9.5 17,14.5 18,21.5 12,18 6,21.5 7,14.5 2,9.5 9,8.5"
              fill={`url(#fill-${i}-${rating})`}
              stroke="#0F0F12"
              strokeWidth="1"
            />
          </svg>
        );
      })}
      <span className="ml-2 text-sm font-['IBM_Plex_Mono'] text-[#0F0F12]">{rating}/100</span>
    </div>
  );
};

// Manufacturer Card Component
const ManufacturerCard = ({ manufacturer, onClick }: { manufacturer: any; onClick: () => void }) => {
  const [colorProgress, setColorProgress] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      onClick={onClick}
      onMouseEnter={() => setColorProgress(100)}
      onMouseLeave={() => setColorProgress(0)}
      className="bg-white border border-[#0F0F12]/10 hover:border-[#5B7C99] transition-all duration-400 cursor-pointer overflow-hidden"
    >
      {/* Factory Photo */}
      <div className="aspect-video overflow-hidden relative">
        <div
          className="w-full h-full bg-cover bg-center transition-all duration-700"
          style={{
            backgroundImage: `url(${manufacturer.image})`,
            filter: `grayscale(${100 - colorProgress}%)`,
          }}
        />
      </div>

      {/* Details */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-lg text-[#0F0F12] mb-1">{manufacturer.name}</h3>
            <p className="text-sm text-[#0F0F12]/60">{manufacturer.location}</p>
          </div>
          <span className="px-2 py-1 bg-[#0E1A2B]/10 text-[#0E1A2B] text-xs uppercase tracking-wider">
            {manufacturer.type}
          </span>
        </div>

        <div className="mb-4">
          <StarRating rating={manufacturer.rating} />
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm font-['IBM_Plex_Mono']">
          <div>
            <p className="text-[#0F0F12]/60 text-xs mb-1">Capacity</p>
            <p className="text-[#0F0F12]">{manufacturer.capacity}</p>
          </div>
          <div>
            <p className="text-[#0F0F12]/60 text-xs mb-1">Delivery</p>
            <p className="text-[#0F0F12]">{manufacturer.delivery}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Manufacturer Profile Modal
const ManufacturerModal = ({ 
  manufacturer, 
  onClose, 
  onSelect 
}: { 
  manufacturer: any; 
  onClose: () => void; 
  onSelect: () => void;
}) => {
  const [quantity, setQuantity] = useState('');
  const [message, setMessage] = useState('');

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
        className="bg-white max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#0F0F12]/10 p-6 flex items-center justify-between z-10">
          <h2 className="text-2xl font-['Inter_Tight'] text-[#0F0F12]">Manufacturer Profile</h2>
          <button onClick={onClose} className="p-2 hover:bg-[#F7F7F5] transition-colors">
            <X className="w-6 h-6 text-[#0F0F12]" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Factory Photo */}
            <div className="aspect-video bg-cover bg-center" style={{ backgroundImage: `url(${manufacturer.image})` }} />

            {/* Details */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-3xl font-['Inter_Tight'] text-[#0F0F12]">{manufacturer.name}</h3>
                  <span className="px-2 py-1 bg-[#0E1A2B]/10 text-[#0E1A2B] text-xs uppercase tracking-wider">
                    {manufacturer.type}
                  </span>
                </div>
                <p className="text-[#0F0F12]/60">{manufacturer.location}</p>
              </div>

              {/* Rating */}
              <div className="border-t border-[#0F0F12]/10 pt-6">
                <p className="text-xs uppercase tracking-wider text-[#0F0F12]/60 mb-2">Rating</p>
                <StarRating rating={manufacturer.rating} />
              </div>

              {/* Specs */}
              <div className="border-t border-[#0F0F12]/10 pt-6">
                <div className="grid grid-cols-2 gap-4 font-['IBM_Plex_Mono'] mb-4">
                  <div>
                    <p className="text-xs text-[#0F0F12]/60 mb-1">Capacity</p>
                    <p className="text-lg text-[#0F0F12]">{manufacturer.capacity}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#0F0F12]/60 mb-1">Delivery Time</p>
                    <p className="text-lg text-[#0F0F12]">{manufacturer.delivery}</p>
                  </div>
                </div>
              </div>

              {/* About */}
              <div className="border-t border-[#0F0F12]/10 pt-6">
                <p className="text-sm uppercase tracking-wider text-[#0F0F12] mb-3">About</p>
                <p className="text-[#0F0F12]/70 leading-relaxed">{manufacturer.about}</p>
              </div>
            </div>
          </div>

          {/* Order Form */}
          <div className="border-t border-[#0F0F12]/10 mt-8 pt-8">
            <h3 className="text-xl font-['Inter_Tight'] text-[#0F0F12] mb-6">Place Order</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm uppercase tracking-wider text-[#0F0F12] block mb-2">Quantity</label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="100"
                  className="w-full px-4 py-3 border border-[#0F0F12]/20 focus:border-[#5B7C99] outline-none font-['IBM_Plex_Mono']"
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm uppercase tracking-wider text-[#0F0F12] block mb-2">Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Additional requirements or questions..."
                  rows={4}
                  className="w-full px-4 py-3 border border-[#0F0F12]/20 focus:border-[#5B7C99] outline-none resize-none"
                />
              </div>
            </div>
            <button
              onClick={onSelect}
              className="mt-6 w-full px-6 py-4 bg-[#0F0F12] text-white hover:bg-[#0E1A2B] transition-all duration-300 text-sm uppercase tracking-wider"
            >
              Select Manufacturer & Send Order
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export function LocalBrandManufacturers() {
  const { navigate } = useApp();
  const [selectedManufacturer, setSelectedManufacturer] = useState<number | null>(null);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [orderQuantity, setOrderQuantity] = useState('100');
  const [orderMessage, setOrderMessage] = useState('');

  const manufacturers = [
    {
      id: 1,
      name: 'Nova Textiles',
      type: 'Garment',
      location: 'Porto, Portugal',
      image: 'https://images.unsplash.com/photo-1758269664127-1f744a56e06c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZXh0aWxlJTIwZmFjdG9yeSUyMGludGVyaW9yfGVufDF8fHx8MTc2Njg3ODA1N3ww&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 94,
      capacity: '500/week',
      delivery: '14-21 days',
      about: 'Family-owned textile manufacturer specializing in high-quality garment production. 30 years of experience in the industry with sustainable practices.',
    },
    {
      id: 2,
      name: 'Steel Thread Factory',
      type: 'Garment',
      location: 'Istanbul, Turkey',
      image: 'https://images.unsplash.com/photo-1565689157206-0fddef7589a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      rating: 88,
      capacity: '1000/week',
      delivery: '10-14 days',
      about: 'Modern facility with advanced machinery. Specializes in contemporary streetwear and technical garments. Fast turnaround times.',
    },
    {
      id: 3,
      name: 'Dark Matter Print',
      type: 'Print',
      location: 'Berlin, Germany',
      image: 'https://images.unsplash.com/photo-1611602132416-da2c2e5c84c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      rating: 96,
      capacity: '800/week',
      delivery: '7-10 days',
      about: 'Premium screen printing and digital print services. Works with water-based and eco-friendly inks. Known for precise color matching.',
    },
    {
      id: 4,
      name: 'Precision Tailoring Co.',
      type: 'Tailor',
      location: 'Milano, Italy',
      image: 'https://images.unsplash.com/photo-1558008258-3256797b43f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      rating: 98,
      capacity: '200/week',
      delivery: '21-28 days',
      about: 'Artisanal tailoring with attention to detail. Specializes in custom fits and complex constructions. Premium quality control.',
    },
  ];

  const handleSelect = (manufacturer: any) => {
    setSelectedManufacturer(null);
    setShowOrderForm(true);
  };

  return (
    <div className="min-h-screen bg-[#F7F7F5]">
      {/* Header */}
      <header className="bg-[#F7F7F5] border-b border-[#0F0F12]/10 sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('localbrand-dashboard')}
              className="text-sm uppercase tracking-wider text-[#0F0F12]/60 hover:text-[#0F0F12] transition-colors"
            >
              ← Back
            </button>
            <h1 className="text-xl font-['Inter_Tight'] tracking-tight text-[#0F0F12]">Manufacturers</h1>
            <div className="w-20" />
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-6 py-12 bg-[#FAFAFA]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-['Inter_Tight'] text-[#0F0F12] mb-2">Select Manufacturer</h2>
          <p className="text-[#0F0F12]/60">Choose the right partner for your production</p>
        </motion.div>

        {/* Manufacturer Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {manufacturers.map((manufacturer) => (
            <ManufacturerCard
              key={manufacturer.id}
              manufacturer={manufacturer}
              onClick={() => setSelectedManufacturer(manufacturer)}
            />
          ))}
        </div>
      </div>

      {/* Manufacturer Modal */}
      <AnimatePresence>
        {selectedManufacturer && (
          <ManufacturerModal
            manufacturer={selectedManufacturer}
            onClose={() => setSelectedManufacturer(null)}
            onSelect={() => handleSelect(selectedManufacturer)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}