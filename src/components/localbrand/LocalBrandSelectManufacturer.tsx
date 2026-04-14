import React, { useState } from 'react';
import { useApp } from '../../App';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ArrowLeft, Send } from 'lucide-react';
import { LocalBrandHeader } from './LocalBrandHeader';

const easing = [0.22, 1, 0.36, 1];

// Mock manufacturer data
const manufacturers = [
  {
    id: 1,
    name: 'Elite Garment Factory',
    type: 'Garment Manufacturing',
    capacity: '500-2000 units/month',
    deliveryTime: '14-21 days',
    rating: 4.8,
    location: 'Cairo, Egypt',
    image: 'factory',
    story: 'Family-owned garment manufacturer specializing in premium cotton goods. Operating since 1987.',
    certifications: ['ISO 9001', 'Fair Trade', 'GOTS'],
    qualityRating: 96,
    timeRating: 92,
    communicationRating: 94,
    leadTime: '14-21 days',
  },
  {
    id: 2,
    name: 'Premium Textile Works',
    type: 'Print & Garment',
    capacity: '1000-5000 units/month',
    deliveryTime: '10-14 days',
    rating: 4.6,
    location: 'Alexandria, Egypt',
    image: 'factory',
    story: 'Modern facility with traditional craftsmanship. Leading in sustainable textile production.',
    certifications: ['ISO 14001', 'OEKO-TEX'],
    qualityRating: 94,
    timeRating: 89,
    communicationRating: 91,
    leadTime: '10-14 days',
  },
  {
    id: 3,
    name: 'Modern Fashion Manufacturing',
    type: 'Garment Manufacturing',
    capacity: '300-1500 units/month',
    deliveryTime: '21-28 days',
    rating: 4.4,
    location: 'Giza, Egypt',
    image: 'factory',
    story: 'Boutique manufacturer focused on small to medium batch production with attention to detail.',
    certifications: ['Fair Trade', 'SA8000'],
    qualityRating: 88,
    timeRating: 85,
    communicationRating: 90,
    leadTime: '21-28 days',
  },
  {
    id: 4,
    name: 'Precision Textile Co.',
    type: 'Tailor & Custom',
    capacity: '100-800 units/month',
    deliveryTime: '7-14 days',
    rating: 4.9,
    location: 'Cairo, Egypt',
    image: 'factory',
    story: 'Specialized in custom tailoring and small batch luxury production. Premium quality focus.',
    certifications: ['ISO 9001', 'GOTS', 'Fair Trade'],
    qualityRating: 98,
    timeRating: 95,
    communicationRating: 97,
    leadTime: '7-14 days',
  },
  {
    id: 5,
    name: 'Coastal Factory',
    type: 'Garment Manufacturing',
    capacity: '2000-10000 units/month',
    deliveryTime: '14-21 days',
    rating: 4.5,
    location: 'Port Said, Egypt',
    image: 'factory',
    story: 'Large-scale manufacturer with state-of-the-art equipment. Excellent for volume orders.',
    certifications: ['ISO 9001', 'ISO 14001'],
    qualityRating: 90,
    timeRating: 93,
    communicationRating: 88,
    leadTime: '14-21 days',
  },
  {
    id: 6,
    name: 'Artisan Collective',
    type: 'Tailor & Custom',
    capacity: '50-500 units/month',
    deliveryTime: '21-35 days',
    rating: 4.7,
    location: 'Luxor, Egypt',
    image: 'factory',
    story: 'Cooperative of skilled artisans creating handcrafted garments with ethical practices.',
    certifications: ['Fair Trade', 'B Corp', 'GOTS'],
    qualityRating: 95,
    timeRating: 82,
    communicationRating: 93,
    leadTime: '21-35 days',
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
      className="text-left bg-white border border-[#E5E7EB] overflow-hidden hover:shadow-lg transition-all duration-500"
    >
      {/* Image */}
      <div className="aspect-[4/3] bg-gradient-to-br from-[#0B0D10] to-[#5B7C99] overflow-hidden">
        <motion.div
          animate={{
            filter: isHovered ? 'grayscale(0%)' : 'grayscale(100%)',
          }}
          transition={{ duration: 0.5 }}
          className="w-full h-full bg-[#0B0D10]/20 flex items-center justify-center"
        >
          <p className="text-white/60 text-sm uppercase tracking-wider font-['Inter']">Factory Image</p>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-['Playfair_Display'] font-semibold text-[#0B0D10] mb-1">{manufacturer.name}</h3>
            <p className="text-xs uppercase tracking-wider text-[#9CA3AF] font-['Inter']">{manufacturer.type}</p>
          </div>
          <div className="flex items-center gap-1">
            <Star size={14} className="fill-[#E6C36A] text-[#E6C36A]" strokeWidth={0} />
            <span className="text-sm font-['Inter'] text-[#0B0D10]">{manufacturer.rating}</span>
          </div>
        </div>

        <div className="space-y-1 text-sm text-[#9CA3AF]">
          <div className="flex justify-between">
            <span className="text-[#9CA3AF] font-['Inter']">Location</span>
            <span className="font-['Inter'] text-xs text-[#0B0D10]">{manufacturer.location}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#9CA3AF] font-['Inter']">Delivery</span>
            <span className="font-['Inter'] text-xs">{manufacturer.deliveryTime}</span>
          </div>
        </div>

        <div className="pt-2 border-t border-[#E5E7EB]">
          <span className="text-xs uppercase tracking-wider text-[#0B0D10] font-['Inter']">View Details →</span>
        </div>
      </div>
    </motion.button>
  );
}

// Manufacturer Detail View
function ManufacturerDetail({ manufacturer, onClose, onProceedToCheckout }: any) {
  const [quantity, setQuantity] = useState('100');
  const [message, setMessage] = useState('');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-white z-50 overflow-y-auto"
    >
      <div className="min-h-screen bg-white">
        <LocalBrandHeader activePage="studio" />

        {/* Content */}
        <div className="container mx-auto px-8 py-12 max-w-6xl">
          {/* Back Button */}
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-sm uppercase tracking-wider text-[#9CA3AF] hover:text-[#0B0D10] transition-colors font-['Inter'] mb-8"
          >
            <ArrowLeft size={18} />
            Back to Selection
          </button>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left Column - Info */}
            <div className="lg:col-span-2 space-y-12">
              {/* Hero Image */}
              <div className="aspect-[16/9] bg-gradient-to-br from-[#0B0D10] to-[#5B7C99] flex items-center justify-center">
                <p className="text-white/60 text-sm uppercase tracking-wider font-['Inter']">Factory Image</p>
              </div>

              {/* Title */}
              <div>
                <h1 className="text-3xl font-['Playfair_Display'] font-bold text-[#0B0D10] mb-2">
                  {manufacturer.name}
                </h1>
                <p className="text-[#9CA3AF] font-['Inter']">{manufacturer.location}</p>
              </div>

              {/* Story */}
              <div>
                <h2 className="text-sm uppercase tracking-wider text-[#9CA3AF] mb-4 font-['Inter']">About</h2>
                <p className="text-[#0B0D10] leading-relaxed font-['Inter']">{manufacturer.story}</p>
              </div>

              {/* Certifications */}
              <div>
                <h2 className="text-sm uppercase tracking-wider text-[#9CA3AF] mb-4 font-['Inter']">Certifications</h2>
                <div className="flex flex-wrap gap-2">
                  {manufacturer.certifications.map((cert: string) => (
                    <span
                      key={cert}
                      className="bg-white border border-[#E5E7EB] px-4 py-2 text-xs uppercase tracking-wider text-[#0B0D10] font-['Inter']"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              </div>

              {/* Ratings */}
              <div>
                <h2 className="text-sm uppercase tracking-wider text-[#9CA3AF] mb-6 font-['Inter']">Performance Ratings</h2>
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-[#0B0D10] font-['Inter']">Quality</span>
                      <span className="text-sm font-['Inter'] text-[#0B0D10]">{manufacturer.qualityRating}/100</span>
                    </div>
                    <div className="h-2 bg-[#E5E7EB]">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${manufacturer.qualityRating}%` }}
                        transition={{ duration: 1, ease: easing }}
                        className="h-full bg-[#0B0D10]"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-[#0B0D10] font-['Inter']">Timeliness</span>
                      <span className="text-sm font-['Inter'] text-[#0B0D10]">{manufacturer.timeRating}/100</span>
                    </div>
                    <div className="h-2 bg-[#E5E7EB]">
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
                      <span className="text-sm text-[#0B0D10] font-['Inter']">Communication</span>
                      <span className="text-sm font-['Inter'] text-[#0B0D10]">{manufacturer.communicationRating}/100</span>
                    </div>
                    <div className="h-2 bg-[#E5E7EB]">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${manufacturer.communicationRating}%` }}
                        transition={{ duration: 1, delay: 0.2, ease: easing }}
                        className="h-full bg-[#0B0D10]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Order Form */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-[#E5E7EB] p-6 sticky top-24">
                <h2 className="text-sm uppercase tracking-wider text-[#0B0D10] mb-6 font-['Inter']">Place Order</h2>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#9CA3AF] mb-2 font-['Inter']">
                      Quantity
                    </label>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      placeholder="100"
                      min="1"
                      className="w-full bg-white border border-[#E5E7EB] px-4 py-3 text-sm font-['Inter'] text-[#0B0D10] focus:outline-none focus:border-[#0B0D10]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#9CA3AF] mb-2 font-['Inter']">
                      Special Requirements (Optional)
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Any special requirements for your order..."
                      rows={4}
                      className="w-full bg-white border border-[#E5E7EB] px-4 py-3 text-sm text-[#0B0D10] font-['Inter'] focus:outline-none focus:border-[#0B0D10] resize-none"
                    />
                  </div>
                </div>

                <div className="space-y-2 mb-6 pt-4 border-t border-[#E5E7EB]">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#9CA3AF] font-['Inter']">Quantity</span>
                    <span className="font-['Inter'] text-xs text-[#0B0D10]">{quantity || 0} units</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#9CA3AF] font-['Inter']">Est. Delivery</span>
                    <span className="font-['Inter'] text-xs text-[#0B0D10]">{manufacturer.leadTime}</span>
                  </div>
                </div>

                <button
                  onClick={() => onProceedToCheckout(manufacturer, quantity, message)}
                  disabled={!quantity || parseInt(quantity) < 1}
                  className="w-full bg-[#0B0D10] text-white py-4 flex items-center justify-center gap-2 uppercase tracking-wider text-sm font-['Inter'] hover:bg-[#E6C36A] hover:text-[#0B0D10] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Send size={16} />
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function LocalBrandSelectManufacturer() {
  const { navigate } = useApp();
  const [selectedManufacturer, setSelectedManufacturer] = useState<any>(null);

  const handleProceedToCheckout = (manufacturer: any, quantity: string, message: string) => {
    // Store order details in sessionStorage for checkout page
    sessionStorage.setItem('localBrandOrderDetails', JSON.stringify({
      manufacturer,
      quantity,
      message
    }));
    
    // Navigate to checkout
    navigate('localbrand-checkout');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Detail View */}
      <AnimatePresence>
        {selectedManufacturer && (
          <ManufacturerDetail
            manufacturer={selectedManufacturer}
            onClose={() => setSelectedManufacturer(null)}
            onProceedToCheckout={handleProceedToCheckout}
          />
        )}
      </AnimatePresence>

      {/* Grid View */}
      {!selectedManufacturer && (
        <>
          <LocalBrandHeader activePage="studio" />

          {/* Manufacturer Grid */}
          <div className="container mx-auto px-8 py-12 bg-white">
            {/* Header */}
            <div className="mb-12">
              <button
                onClick={() => navigate('localbrand-studio')}
                className="text-sm uppercase tracking-wider text-[#9CA3AF] hover:text-[#0B0D10] transition-colors font-['Inter'] mb-6 inline-block"
              >
                ← Back to Studio
              </button>
              <h1 className="text-4xl font-['Playfair_Display'] font-bold text-[#0B0D10] mb-4">
                Select Manufacturer
              </h1>
              <p className="text-[#9CA3AF] text-lg">
                Choose a trusted manufacturer to produce your design
              </p>
            </div>

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
