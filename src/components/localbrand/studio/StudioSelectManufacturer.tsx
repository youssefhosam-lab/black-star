import React, { useState } from 'react';
import { useApp } from '../../../App';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ArrowLeft, X, Send } from 'lucide-react';

const easing = [0.22, 1, 0.36, 1];

// Mock manufacturer data
const manufacturers = [
  {
    id: 1,
    name: 'Urban Thread Co.',
    type: 'Garment Manufacturing',
    capacity: '500-2000 units/month',
    deliveryTime: '14-21 days',
    rating: 4.8,
    image: 'factory',
    story: 'Family-owned garment manufacturer specializing in premium cotton goods. Operating since 1987.',
    certifications: ['ISO 9001', 'Fair Trade', 'GOTS'],
    qualityRating: 96,
    timeRating: 92,
    communicationRating: 94,
  },
  {
    id: 2,
    name: 'Heritage Mills',
    type: 'Print & Garment',
    capacity: '1000-5000 units/month',
    deliveryTime: '10-14 days',
    rating: 4.6,
    image: 'factory',
    story: 'Modern facility with traditional craftsmanship. Leading in sustainable textile production.',
    certifications: ['ISO 14001', 'OEKO-TEX'],
    qualityRating: 94,
    timeRating: 89,
    communicationRating: 91,
  },
  {
    id: 3,
    name: 'Metro Garments Ltd.',
    type: 'Garment Manufacturing',
    capacity: '300-1500 units/month',
    deliveryTime: '21-28 days',
    rating: 4.4,
    image: 'factory',
    story: 'Boutique manufacturer focused on small to medium batch production with attention to detail.',
    certifications: ['Fair Trade', 'SA8000'],
    qualityRating: 88,
    timeRating: 85,
    communicationRating: 90,
  },
  {
    id: 4,
    name: 'Precision Textile Co.',
    type: 'Tailor & Custom',
    capacity: '100-800 units/month',
    deliveryTime: '7-14 days',
    rating: 4.9,
    image: 'factory',
    story: 'Specialized in custom tailoring and small batch luxury production. Premium quality focus.',
    certifications: ['ISO 9001', 'GOTS', 'Fair Trade'],
    qualityRating: 98,
    timeRating: 95,
    communicationRating: 97,
  },
  {
    id: 5,
    name: 'Coastal Factory',
    type: 'Garment Manufacturing',
    capacity: '2000-10000 units/month',
    deliveryTime: '14-21 days',
    rating: 4.5,
    image: 'factory',
    story: 'Large-scale manufacturer with state-of-the-art equipment. Excellent for volume orders.',
    certifications: ['ISO 9001', 'ISO 14001'],
    qualityRating: 90,
    timeRating: 93,
    communicationRating: 88,
  },
  {
    id: 6,
    name: 'Artisan Collective',
    type: 'Tailor & Custom',
    capacity: '50-500 units/month',
    deliveryTime: '21-35 days',
    rating: 4.7,
    image: 'factory',
    story: 'Cooperative of skilled artisans creating handcrafted garments with ethical practices.',
    certifications: ['Fair Trade', 'B Corp', 'GOTS'],
    qualityRating: 95,
    timeRating: 82,
    communicationRating: 93,
  },
];

// Manufacturer Card
function ManufacturerCard({ manufacturer, onClick }: any) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: easing }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="text-left bg-white border border-[#E6E6E3] overflow-hidden hover:shadow-lg transition-all duration-500"
    >
      {/* Image */}
      <div className="aspect-[4/3] bg-gradient-to-br from-[#111111] to-[#5B7C99] overflow-hidden">
        <motion.div
          animate={{
            filter: isHovered ? 'grayscale(0%)' : 'grayscale(100%)',
          }}
          transition={{ duration: 0.5 }}
          className="w-full h-full bg-[#111111]/20 flex items-center justify-center"
        >
          <p className="text-white/60 text-sm uppercase tracking-wider">Factory Image</p>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-medium text-[#0B0B0B] mb-1">{manufacturer.name}</h3>
            <p className="text-xs uppercase tracking-wider text-[#6E6E6E]">{manufacturer.type}</p>
          </div>
          <div className="flex items-center gap-1">
            <Star size={14} className="fill-[#111111] text-[#111111]" strokeWidth={0} />
            <span className="text-sm font-['IBM_Plex_Mono'] text-[#0B0B0B]">{manufacturer.rating}</span>
          </div>
        </div>

        <div className="space-y-1 text-sm text-[#6E6E6E]">
          <div className="flex justify-between">
            <span className="text-[#6E6E6E]">Capacity</span>
            <span className="font-['IBM_Plex_Mono'] text-xs">{manufacturer.capacity}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#6E6E6E]">Delivery</span>
            <span className="font-['IBM_Plex_Mono'] text-xs">{manufacturer.deliveryTime}</span>
          </div>
        </div>

        <div className="pt-2 border-t border-[#E6E6E3]">
          <span className="text-xs uppercase tracking-wider text-[#0B0B0B]">View Details →</span>
        </div>
      </div>
    </motion.button>
  );
}

// Manufacturer Detail View
function ManufacturerDetail({ manufacturer, onClose, onSendOrder }: any) {
  const [quantity, setQuantity] = useState('');
  const [message, setMessage] = useState('');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-[#F7F7F5] z-50 overflow-y-auto"
    >
      <div className="min-h-screen bg-[rgb(250,250,250)]">
        {/* Header */}
        <div className="bg-white border-b border-[#E6E6E3] sticky top-0 z-10">
          <div className="container mx-auto px-8 py-6">
            <div className="flex items-center justify-between">
              <button
                onClick={onClose}
                className="flex items-center gap-2 text-sm uppercase tracking-wider text-[#6E6E6E] hover:text-[#0B0B0B] transition-colors"
              >
                <ArrowLeft size={18} />
                Back to Selection
              </button>
              <h1 className="text-xl font-['Inter_Tight'] tracking-tight text-[#0B0B0B]">
                {manufacturer.name}
              </h1>
              <div className="w-32" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-8 py-12 max-w-6xl bg-[rgb(250,250,250)]">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left Column - Info */}
            <div className="lg:col-span-2 space-y-12">
              {/* Hero Image */}
              <div className="aspect-[16/9] bg-gradient-to-br from-[#111111] to-[#5B7C99] flex items-center justify-center">
                <p className="text-white/60 text-sm uppercase tracking-wider">Factory Image</p>
              </div>

              {/* Story */}
              <div>
                <h2 className="text-sm uppercase tracking-wider text-[#6E6E6E] mb-4">About</h2>
                <p className="text-[#0B0B0B] leading-relaxed">{manufacturer.story}</p>
              </div>

              {/* Certifications */}
              <div>
                <h2 className="text-sm uppercase tracking-wider text-[#6E6E6E] mb-4">Certifications</h2>
                <div className="flex flex-wrap gap-2">
                  {manufacturer.certifications.map((cert: string) => (
                    <span
                      key={cert}
                      className="bg-white border border-[#E6E6E3] px-4 py-2 text-xs uppercase tracking-wider text-[#0B0B0B]"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              </div>

              {/* Ratings */}
              <div>
                <h2 className="text-sm uppercase tracking-wider text-[#6E6E6E] mb-6">Performance Ratings</h2>
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-[#0B0B0B]">Quality</span>
                      <span className="text-sm font-['IBM_Plex_Mono'] text-[#0B0B0B]">{manufacturer.qualityRating}/100</span>
                    </div>
                    <div className="h-2 bg-[#E6E6E3]">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${manufacturer.qualityRating}%` }}
                        transition={{ duration: 1, ease: easing }}
                        className="h-full bg-[#111111]"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-[#0B0B0B]">Timeliness</span>
                      <span className="text-sm font-['IBM_Plex_Mono'] text-[#0B0B0B]">{manufacturer.timeRating}/100</span>
                    </div>
                    <div className="h-2 bg-[#E6E6E3]">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${manufacturer.timeRating}%` }}
                        transition={{ duration: 1, delay: 0.1, ease: easing }}
                        className="h-full bg-[#5B7C99]"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-[#0B0B0B]">Communication</span>
                      <span className="text-sm font-['IBM_Plex_Mono'] text-[#0B0B0B]">{manufacturer.communicationRating}/100</span>
                    </div>
                    <div className="h-2 bg-[#E6E6E3]">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${manufacturer.communicationRating}%` }}
                        transition={{ duration: 1, delay: 0.2, ease: easing }}
                        className="h-full bg-[#0B0B0B]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Order Form */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-[#E6E6E3] p-6 sticky top-24">
                <h2 className="text-sm uppercase tracking-wider text-[#0B0B0B] mb-6">Place Order</h2>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#6E6E6E] mb-2">
                      Quantity
                    </label>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      placeholder="100"
                      className="w-full bg-white border border-[#E6E6E3] px-4 py-3 text-sm font-['IBM_Plex_Mono'] text-[#0B0B0B] focus:outline-none focus:border-[#111111]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#6E6E6E] mb-2">
                      Message (Optional)
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Special requirements or questions..."
                      rows={4}
                      className="w-full bg-white border border-[#E6E6E3] px-4 py-3 text-sm text-[#0B0B0B] focus:outline-none focus:border-[#111111] resize-none"
                    />
                  </div>
                </div>

                <div className="space-y-2 mb-6 pt-4 border-t border-[#E6E6E3]">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#6E6E6E]">Capacity</span>
                    <span className="font-['IBM_Plex_Mono'] text-xs text-[#0B0B0B]">{manufacturer.capacity}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#6E6E6E]">Est. Delivery</span>
                    <span className="font-['IBM_Plex_Mono'] text-xs text-[#0B0B0B]">{manufacturer.deliveryTime}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#6E6E6E]">Rating</span>
                    <div className="flex items-center gap-1">
                      <Star size={12} className="fill-[#111111] text-[#111111]" strokeWidth={0} />
                      <span className="font-['IBM_Plex_Mono'] text-xs text-[#0B0B0B]">{manufacturer.rating}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onSendOrder(manufacturer.id, quantity, message)}
                  disabled={!quantity}
                  className="w-full bg-[#111111] text-white py-4 flex items-center justify-center gap-2 uppercase tracking-wider text-sm hover:bg-[#0B0B0B] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Send size={16} />
                  Send Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function StudioSelectManufacturer() {
  const { navigate } = useApp();
  const [selectedManufacturer, setSelectedManufacturer] = useState<any>(null);

  const handleSendOrder = (manufacturerId: number, quantity: string, message: string) => {
    // Show confirmation
    alert(`Order sent to manufacturer!\nStatus: Waiting for manufacturer approval\n\nQuantity: ${quantity} units\nMessage: ${message || 'None'}`);
    
    // Navigate back to dashboard
    setTimeout(() => {
      navigate('localbrand-dashboard');
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#F7F7F5]">
      {/* Detail View */}
      <AnimatePresence>
        {selectedManufacturer && (
          <ManufacturerDetail
            manufacturer={selectedManufacturer}
            onClose={() => setSelectedManufacturer(null)}
            onSendOrder={handleSendOrder}
          />
        )}
      </AnimatePresence>

      {/* Grid View */}
      {!selectedManufacturer && (
        <>
          {/* Header */}
          <div className="bg-white border-b border-[#E6E6E3] sticky top-0 z-10">
            <div className="container mx-auto px-8 py-6">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => navigate('studio-design-garment')}
                  className="text-sm uppercase tracking-wider text-[#6E6E6E] hover:text-[#0B0B0B] transition-colors"
                >
                  ← Back
                </button>
                <h1 className="text-xl font-['Inter_Tight'] tracking-tight text-[#0B0B0B]">
                  Select Manufacturer
                </h1>
                <div className="w-20" />
              </div>
            </div>
          </div>

          {/* Manufacturer Grid */}
          <div className="container mx-auto px-8 py-12 bg-[#FAFAFA]">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {manufacturers.map((manufacturer) => (
                <ManufacturerCard
                  key={manufacturer.id}
                  manufacturer={manufacturer}
                  onClick={() => setSelectedManufacturer(manufacturer)}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}