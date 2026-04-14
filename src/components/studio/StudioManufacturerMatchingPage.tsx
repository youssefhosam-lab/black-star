import React, { useState } from 'react';
import { useApp } from '../../App';
import { motion } from 'motion/react';
import { ChevronLeft, Star, MapPin, Clock, Award } from 'lucide-react';

// Mock manufacturer data
const manufacturersData = [
  {
    id: 'mfr-001',
    name: 'Luxe Manufacture Cairo',
    location: 'Cairo, Egypt',
    rating: 4.9,
    reviews: 127,
    specialties: ['Premium Garments', 'Small Batch', 'Custom Printing'],
    productionTime: '14-21 days',
    minOrder: 50,
    capacity: 'High',
    previousWork: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop&q=80'
    ],
    fabricCompatibility: ['Cotton', 'Denim', 'Silk'],
    certifications: ['ISO 9001', 'GOTS', 'Fair Trade']
  },
  {
    id: 'mfr-002',
    name: 'Artisan Textiles',
    location: 'Alexandria, Egypt',
    rating: 4.7,
    reviews: 89,
    specialties: ['Embroidery', 'Natural Fabrics', 'Ethical Production'],
    productionTime: '21-28 days',
    minOrder: 30,
    capacity: 'Medium',
    previousWork: [
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1467043237213-65f2da53396f?w=400&h=400&fit=crop&q=80'
    ],
    fabricCompatibility: ['Cotton', 'Linen', 'Wool'],
    certifications: ['GOTS', 'Fair Trade']
  },
  {
    id: 'mfr-003',
    name: 'Elite Garments Co.',
    location: 'Giza, Egypt',
    rating: 4.8,
    reviews: 156,
    specialties: ['Large Scale', 'Fast Turnaround', 'Quality Control'],
    productionTime: '10-14 days',
    minOrder: 100,
    capacity: 'Very High',
    previousWork: [
      'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400&h=400&fit=crop&q=80'
    ],
    fabricCompatibility: ['Cotton', 'Denim', 'Synthetic'],
    certifications: ['ISO 9001']
  },
  {
    id: 'mfr-004',
    name: 'Fabric Innovations',
    location: 'Cairo, Egypt',
    rating: 4.6,
    reviews: 73,
    specialties: ['Tech Fabrics', 'Performance Wear', 'Innovation'],
    productionTime: '18-25 days',
    minOrder: 75,
    capacity: 'Medium',
    previousWork: [
      'https://images.unsplash.com/photo-1558769132-cb1aea4c4f8a?w=400&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=400&fit=crop&q=80'
    ],
    fabricCompatibility: ['Synthetic', 'Cotton', 'Wool'],
    certifications: ['ISO 9001', 'Oeko-Tex']
  }
];

export function StudioManufacturerMatchingPage() {
  const { navigate, routeParams } = useApp();
  const garmentType = routeParams?.garmentType || 't-shirt';
  const fabricId = routeParams?.fabricId || '';

  const [selectedManufacturer, setSelectedManufacturer] = useState<string | null>(null);

  const handleSelectManufacturer = (mfrId: string) => {
    navigate('studio-manufacturer-profile', {
      garmentType,
      fabricId,
      manufacturerId: mfrId
    });
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-[60px] bg-white border-b border-[#E5E7EB] z-40">
        <div className="h-full px-6 flex items-center justify-between">
          <button
            onClick={() => navigate('studio-fabric-selection', { garmentType })}
            className="flex items-center gap-2 text-[#6B7280] hover:text-[#0B0D10] transition-colors"
          >
            <ChevronLeft className="size-5" />
            <span className="text-xs uppercase tracking-wide">Back to Fabric</span>
          </button>

          <div className="text-center">
            <h1 className="text-sm uppercase tracking-wide font-medium text-[#0B0D10]">
              Manufacturer Selection
            </h1>
          </div>

          <div className="w-32" />
        </div>
      </header>

      <main className="pt-[60px] p-8">
        <div className="max-w-[1400px] mx-auto">
          {/* Page Title */}
          <div className="mb-8">
            <h1 className="font-['Playfair_Display'] text-4xl text-[#0B0D10] mb-2">
              Select Manufacturer
            </h1>
            <p className="text-sm text-[#6B7280]">
              {manufacturersData.length} manufacturer{manufacturersData.length !== 1 ? 's' : ''} matched for your project
            </p>
          </div>

          {/* Manufacturer Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {manufacturersData.map((mfr, index) => (
              <motion.div
                key={mfr.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                onClick={() => handleSelectManufacturer(mfr.id)}
                className="bg-white border-2 border-[#E5E7EB] hover:border-[#0B0D10] overflow-hidden cursor-pointer transition-all"
              >
                {/* Previous Work Thumbnails */}
                <div className="grid grid-cols-3 gap-px bg-[#E5E7EB]">
                  {mfr.previousWork.map((img, idx) => (
                    <div key={idx} className="aspect-square overflow-hidden bg-[#F5F5F5]">
                      <img
                        src={img}
                        alt={`Previous work ${idx + 1}`}
                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all"
                      />
                    </div>
                  ))}
                </div>

                {/* Info */}
                <div className="p-6">
                  {/* Name & Location */}
                  <div className="mb-4">
                    <h3 className="text-xl font-['Playfair_Display'] text-[#0B0D10] mb-2">
                      {mfr.name}
                    </h3>
                    <div className="flex items-center gap-2 text-[#6B7280]">
                      <MapPin className="size-4" />
                      <span className="text-xs uppercase tracking-wide">{mfr.location}</span>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4 pb-4 border-b border-[#E5E7EB]">
                    <Star className="size-5 text-[#E6C36A] fill-[#E6C36A]" />
                    <span className="text-lg font-medium font-mono text-[#0B0D10]">{mfr.rating}</span>
                    <span className="text-xs text-[#6B7280]">({mfr.reviews} reviews)</span>
                  </div>

                  {/* Specialties */}
                  <div className="mb-4">
                    <p className="text-[10px] uppercase tracking-wide text-[#6B7280] mb-2">
                      Specialties
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {mfr.specialties.map((specialty) => (
                        <span
                          key={specialty}
                          className="px-2 py-1 text-[9px] uppercase tracking-wide bg-[#FAFAFA] text-[#0B0D10] border border-[#E5E7EB]"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Production Details */}
                  <div className="grid grid-cols-2 gap-4 mb-4 text-xs">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Clock className="size-4 text-[#6B7280]" />
                        <span className="text-[#6B7280]">Timeline</span>
                      </div>
                      <p className="text-[#0B0D10] font-medium">{mfr.productionTime}</p>
                    </div>
                    <div>
                      <p className="text-[#6B7280] mb-1">Min. Order</p>
                      <p className="text-[#0B0D10] font-medium font-mono">{mfr.minOrder} units</p>
                    </div>
                    <div>
                      <p className="text-[#6B7280] mb-1">Capacity</p>
                      <p className="text-[#0B0D10] font-medium">{mfr.capacity}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Award className="size-4 text-[#6B7280]" />
                        <span className="text-[#6B7280]">Certified</span>
                      </div>
                      <p className="text-[#0B0D10] font-medium">{mfr.certifications.length} cert{mfr.certifications.length !== 1 ? 's' : ''}</p>
                    </div>
                  </div>

                  {/* CTA */}
                  <button className="w-full py-3 bg-[#0B0D10] text-white text-xs uppercase tracking-wide hover:bg-black transition-colors mt-2">
                    View Full Profile →
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
