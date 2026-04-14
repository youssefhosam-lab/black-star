import React, { useState } from 'react';
import { useApp } from '../../App';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, Star, MapPin, Clock, Award, CheckCircle, 
  FileText, Send, Package, Users, Settings
} from 'lucide-react';

// Mock manufacturer profile data
const manufacturerProfile = {
  id: 'mfr-001',
  name: 'Luxe Manufacture Cairo',
  logo: 'https://images.unsplash.com/photo-1717386255893-59c0846cdef0?w=800&h=600&fit=crop&q=80',
  location: 'Cairo, Egypt',
  established: '2015',
  rating: 4.9,
  reviewCount: 127,
  
  overview: 'Luxe Manufacture Cairo specializes in premium garment production with a focus on quality craftsmanship and ethical manufacturing. Our facility features state-of-the-art equipment and a team of experienced artisans.',
  
  specialties: ['Premium Garments', 'Small Batch', 'Custom Printing', 'Embroidery'],
  
  equipment: [
    'Industrial Sewing Machines (50 units)',
    'Automated Cutting Tables',
    'Digital Printing Systems',
    'Embroidery Machines',
    'Quality Control Stations',
    'Fabric Inspection Systems'
  ],
  
  certifications: [
    { name: 'ISO 9001:2015', type: 'Quality Management' },
    { name: 'GOTS', type: 'Organic Textile Standard' },
    { name: 'Fair Trade', type: 'Ethical Production' },
    { name: 'Oeko-Tex', type: 'Textile Safety' }
  ],
  
  production: {
    timeline: '14-21 days',
    minOrder: 50,
    capacity: 'High (5000 units/month)',
    rush: 'Available (+30% fee)'
  },
  
  pricing: {
    base: 'EGP 42-65/unit',
    sampling: 'EGP 200/sample',
    setup: 'EGP 1,500 (one-time)'
  },
  
  reviews: [
    {
      id: '1',
      author: 'Desert Rose Collective',
      rating: 5.0,
      date: 'Nov 2024',
      comment: 'Exceptional quality and attention to detail. Communication was excellent throughout the entire production process.',
      project: '250 Premium T-Shirts'
    },
    {
      id: '2',
      author: 'Urban Edge',
      rating: 4.8,
      date: 'Oct 2024',
      comment: 'Great work on our custom hoodies. Minor delay but quality made up for it. Would work with them again.',
      project: '150 Custom Hoodies'
    },
    {
      id: '3',
      author: 'Midnight Collection',
      rating: 5.0,
      date: 'Sep 2024',
      comment: 'Outstanding craftsmanship. The embroidery work exceeded our expectations. Highly recommend for premium projects.',
      project: '100 Embroidered Jackets'
    }
  ],
  
  previousWork: [
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1467043237213-65f2da53396f?w=600&h=600&fit=crop&q=80'
  ]
};

export function StudioManufacturerProfilePage() {
  const { navigate, routeParams } = useApp();
  const garmentType = routeParams?.garmentType || 't-shirt';
  const fabricId = routeParams?.fabricId || '';
  const manufacturerId = routeParams?.manufacturerId || '';
  
  const [showSendModal, setShowSendModal] = useState(false);
  const [quantity, setQuantity] = useState(100);
  const [notes, setNotes] = useState('');

  const handleSendToManufacturer = () => {
    // Send design logic here
    setShowSendModal(false);
    navigate('brand-dashboard');
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-[60px] bg-white border-b border-[#E5E7EB] z-40">
        <div className="h-full px-6 flex items-center justify-between">
          <button
            onClick={() => navigate('studio-manufacturer-matching', { garmentType, fabricId })}
            className="flex items-center gap-2 text-[#6B7280] hover:text-[#0B0D10] transition-colors"
          >
            <ChevronLeft className="size-5" />
            <span className="text-xs uppercase tracking-wide">Back to Manufacturers</span>
          </button>

          <div className="text-center">
            <h1 className="text-sm uppercase tracking-wide font-medium text-[#0B0D10]">
              Manufacturer Profile
            </h1>
          </div>

          <div className="w-32" />
        </div>
      </header>

      <main className="pt-[60px]">
        {/* Hero Section */}
        <section className="bg-white border-b border-[#E5E7EB]">
          <div className="max-w-[1400px] mx-auto px-8 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-12">
              {/* Left: Factory Image */}
              <div className="aspect-[4/3] overflow-hidden bg-[#F5F5F5]">
                <img
                  src={manufacturerProfile.logo}
                  alt={manufacturerProfile.name}
                  className="w-full h-full object-cover grayscale"
                />
              </div>

              {/* Right: Overview */}
              <div>
                <h1 className="font-['Playfair_Display'] text-4xl text-[#0B0D10] mb-3">
                  {manufacturerProfile.name}
                </h1>
                
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-[#E5E7EB]">
                  <div className="flex items-center gap-2">
                    <MapPin className="size-4 text-[#6B7280]" />
                    <span className="text-sm text-[#6B7280]">{manufacturerProfile.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="size-5 text-[#E6C36A] fill-[#E6C36A]" />
                    <span className="text-lg font-medium font-mono text-[#0B0D10]">
                      {manufacturerProfile.rating}
                    </span>
                    <span className="text-sm text-[#6B7280]">
                      ({manufacturerProfile.reviewCount} reviews)
                    </span>
                  </div>
                </div>

                <p className="text-sm text-[#0B0D10] leading-relaxed mb-6">
                  {manufacturerProfile.overview}
                </p>

                <div className="mb-6">
                  <p className="text-xs uppercase tracking-wide text-[#6B7280] mb-2">
                    Specialties
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {manufacturerProfile.specialties.map((specialty) => (
                      <span
                        key={specialty}
                        className="px-3 py-1 text-xs uppercase tracking-wide bg-[#E6C36A]/10 text-[#E6C36A] border border-[#E6C36A]/20"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setShowSendModal(true)}
                  className="w-full py-4 bg-[#0B0D10] text-white text-sm uppercase tracking-wide hover:bg-black transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="size-5" />
                  Send Design to Manufacturer
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Equipment & Certifications */}
        <section className="py-12 border-b border-[#E5E7EB]">
          <div className="max-w-[1400px] mx-auto px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Equipment */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <Settings className="size-6 text-[#0B0D10]" />
                  <h2 className="text-2xl font-['Playfair_Display'] text-[#0B0D10]">
                    Equipment
                  </h2>
                </div>
                <div className="bg-white border border-[#E5E7EB] p-6">
                  <ul className="space-y-3">
                    {manufacturerProfile.equipment.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="size-4 text-[#E6C36A] mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-[#0B0D10]">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Certifications */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <Award className="size-6 text-[#0B0D10]" />
                  <h2 className="text-2xl font-['Playfair_Display'] text-[#0B0D10]">
                    Certifications
                  </h2>
                </div>
                <div className="space-y-3">
                  {manufacturerProfile.certifications.map((cert) => (
                    <div
                      key={cert.name}
                      className="bg-white border border-[#E5E7EB] p-4"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm font-medium text-[#0B0D10] mb-1">
                            {cert.name}
                          </p>
                          <p className="text-xs text-[#6B7280]">{cert.type}</p>
                        </div>
                        <CheckCircle className="size-5 text-[#E6C36A]" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Production & Pricing */}
        <section className="bg-white py-12 border-b border-[#E5E7EB]">
          <div className="max-w-[1400px] mx-auto px-8">
            <h2 className="text-2xl font-['Playfair_Display'] text-[#0B0D10] mb-8">
              Production & Pricing
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Timeline */}
              <div className="bg-[#FAFAFA] border border-[#E5E7EB] p-6">
                <Clock className="size-8 text-[#0B0D10] mb-3" />
                <p className="text-xs uppercase tracking-wide text-[#6B7280] mb-1">Timeline</p>
                <p className="text-lg font-medium text-[#0B0D10]">
                  {manufacturerProfile.production.timeline}
                </p>
              </div>

              {/* Min Order */}
              <div className="bg-[#FAFAFA] border border-[#E5E7EB] p-6">
                <Package className="size-8 text-[#0B0D10] mb-3" />
                <p className="text-xs uppercase tracking-wide text-[#6B7280] mb-1">Min. Order</p>
                <p className="text-lg font-medium text-[#0B0D10] font-mono">
                  {manufacturerProfile.production.minOrder} units
                </p>
              </div>

              {/* Capacity */}
              <div className="bg-[#FAFAFA] border border-[#E5E7EB] p-6">
                <Users className="size-8 text-[#0B0D10] mb-3" />
                <p className="text-xs uppercase tracking-wide text-[#6B7280] mb-1">Capacity</p>
                <p className="text-lg font-medium text-[#0B0D10]">
                  {manufacturerProfile.production.capacity}
                </p>
              </div>

              {/* Base Price */}
              <div className="bg-[#FAFAFA] border border-[#E5E7EB] p-6">
                <FileText className="size-8 text-[#0B0D10] mb-3" />
                <p className="text-xs uppercase tracking-wide text-[#6B7280] mb-1">Base Price</p>
                <p className="text-lg font-medium text-[#0B0D10]">
                  {manufacturerProfile.pricing.base}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews */}
        <section className="py-12 border-b border-[#E5E7EB]">
          <div className="max-w-[1400px] mx-auto px-8">
            <h2 className="text-2xl font-['Playfair_Display'] text-[#0B0D10] mb-8">
              Client Reviews
            </h2>
            <div className="space-y-4">
              {manufacturerProfile.reviews.map((review) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white border border-[#E5E7EB] p-6"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-sm font-medium text-[#0B0D10] mb-1">
                        {review.author}
                      </p>
                      <p className="text-xs text-[#6B7280]">{review.project}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="size-4 text-[#E6C36A] fill-[#E6C36A]" />
                      <span className="text-sm font-mono text-[#0B0D10]">{review.rating}</span>
                      <span className="text-xs text-[#6B7280]">• {review.date}</span>
                    </div>
                  </div>
                  <p className="text-sm text-[#0B0D10] leading-relaxed">
                    {review.comment}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Previous Work Gallery */}
        <section className="py-12">
          <div className="max-w-[1400px] mx-auto px-8">
            <h2 className="text-2xl font-['Playfair_Display'] text-[#0B0D10] mb-8">
              Previous Work
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {manufacturerProfile.previousWork.map((img, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  className="aspect-square overflow-hidden bg-[#F5F5F5] border border-[#E5E7EB]"
                >
                  <img
                    src={img}
                    alt={`Previous work ${index + 1}`}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Fixed CTA */}
        <div className="fixed bottom-8 right-8 z-30">
          <button
            onClick={() => setShowSendModal(true)}
            className="px-8 py-4 bg-[#E6C36A] text-[#0B0D10] text-sm uppercase tracking-wide font-medium hover:bg-[#D4AF37] transition-colors shadow-xl flex items-center gap-2"
          >
            <Send className="size-5" />
            Send Design to Production
          </button>
        </div>
      </main>

      {/* Send Modal */}
      <AnimatePresence>
        {showSendModal && (
          <>
            {/* Blur Background */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setShowSendModal(false)}
            />

            {/* Modal */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border-2 border-[#0B0D10] shadow-2xl p-8 w-[540px] z-50"
            >
              <h2 className="font-['Playfair_Display'] text-2xl text-[#0B0D10] mb-2">
                Send to {manufacturerProfile.name}
              </h2>
              <p className="text-sm text-[#6B7280] mb-6">
                Your design will be sent with all specifications
              </p>

              <div className="space-y-4 mb-6">
                {/* Quantity */}
                <div>
                  <label className="text-xs uppercase tracking-wide text-[#6B7280] mb-2 block">
                    Quantity
                  </label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    min={manufacturerProfile.production.minOrder}
                    className="w-full px-4 py-3 border border-[#E5E7EB] text-sm text-[#0B0D10] font-mono focus:outline-none focus:border-[#E6C36A]"
                  />
                  <p className="text-xs text-[#6B7280] mt-1">
                    Minimum order: {manufacturerProfile.production.minOrder} units
                  </p>
                </div>

                {/* Notes */}
                <div>
                  <label className="text-xs uppercase tracking-wide text-[#6B7280] mb-2 block">
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={4}
                    placeholder="Special requirements, timeline preferences, etc."
                    className="w-full px-4 py-3 border border-[#E5E7EB] text-sm text-[#0B0D10] focus:outline-none focus:border-[#E6C36A] resize-none"
                  />
                </div>

                {/* What's Included */}
                <div className="bg-[#FAFAFA] border border-[#E5E7EB] p-4">
                  <p className="text-xs uppercase tracking-wide text-[#6B7280] mb-3">
                    Included in Submission
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-xs text-[#0B0D10]">
                      <CheckCircle className="size-4 text-[#E6C36A]" />
                      3D Garment Model
                    </li>
                    <li className="flex items-center gap-2 text-xs text-[#0B0D10]">
                      <CheckCircle className="size-4 text-[#E6C36A]" />
                      Measurements & Fit Data
                    </li>
                    <li className="flex items-center gap-2 text-xs text-[#0B0D10]">
                      <CheckCircle className="size-4 text-[#E6C36A]" />
                      Fabric Selection
                    </li>
                    <li className="flex items-center gap-2 text-xs text-[#0B0D10]">
                      <CheckCircle className="size-4 text-[#E6C36A]" />
                      Print/Embroidery Layers
                    </li>
                    <li className="flex items-center gap-2 text-xs text-[#0B0D10]">
                      <CheckCircle className="size-4 text-[#E6C36A]" />
                      Cut Data & Patterns
                    </li>
                  </ul>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleSendToManufacturer}
                  className="w-full py-4 bg-[#0B0D10] text-white text-sm uppercase tracking-wide hover:bg-black transition-colors"
                >
                  Confirm & Send Design
                </button>
                <button
                  onClick={() => setShowSendModal(false)}
                  className="w-full py-3 border border-[#E5E7EB] text-sm uppercase tracking-wide text-[#6B7280] hover:text-[#0B0D10] transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}