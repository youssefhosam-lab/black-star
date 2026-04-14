import React, { useState } from 'react';
import { useApp } from '../../App';
import { motion } from 'motion/react';
import { ChevronLeft, SlidersHorizontal, Search } from 'lucide-react';

// Mock fabric data
const fabricsData = [
  {
    id: 'fabric-001',
    name: 'Premium Cotton',
    image: 'https://images.unsplash.com/photo-1647418426445-78d256171093?w=600&h=600&fit=crop&q=80',
    composition: '100% Organic Cotton',
    gsm: 180,
    stretch: 'Low',
    suitable: ['T-Shirt', 'Dress'],
    priceRange: 'EGP 25-30/meter',
    category: 'Cotton'
  },
  {
    id: 'fabric-002',
    name: 'Stretch Denim',
    image: 'https://images.unsplash.com/photo-1645859724073-d9bff094b1c7?w=600&h=600&fit=crop&q=80',
    composition: '98% Cotton, 2% Elastane',
    gsm: 320,
    stretch: 'Medium',
    suitable: ['Pants', 'Jacket'],
    priceRange: 'EGP 45-55/meter',
    category: 'Denim'
  },
  {
    id: 'fabric-003',
    name: 'Luxury Silk',
    image: 'https://images.unsplash.com/photo-1744502671648-7cd2358a193f?w=600&h=600&fit=crop&q=80',
    composition: '100% Mulberry Silk',
    gsm: 90,
    stretch: 'None',
    suitable: ['Dress', 'Accessories'],
    priceRange: 'EGP 120-150/meter',
    category: 'Silk'
  },
  {
    id: 'fabric-004',
    name: 'Merino Wool',
    image: 'https://images.unsplash.com/photo-1563136192-a4b2b5f977e1?w=600&h=600&fit=crop&q=80',
    composition: '100% Merino Wool',
    gsm: 240,
    stretch: 'Low',
    suitable: ['Hoodie', 'Jacket'],
    priceRange: 'EGP 80-95/meter',
    category: 'Wool'
  },
  {
    id: 'fabric-005',
    name: 'Performance Blend',
    image: 'https://images.unsplash.com/photo-1612863234179-7e51d74c28a4?w=600&h=600&fit=crop&q=80',
    composition: '85% Polyester, 15% Spandex',
    gsm: 200,
    stretch: 'High',
    suitable: ['T-Shirt', 'Pants', 'Hoodie'],
    priceRange: 'EGP 35-40/meter',
    category: 'Synthetic'
  },
  {
    id: 'fabric-006',
    name: 'Linen Blend',
    image: 'https://images.unsplash.com/photo-1612863234179-7e51d74c28a4?w=600&h=600&fit=crop&q=80',
    composition: '70% Linen, 30% Cotton',
    gsm: 150,
    stretch: 'None',
    suitable: ['T-Shirt', 'Dress'],
    priceRange: 'EGP 40-50/meter',
    category: 'Linen'
  }
];

export function StudioFabricSelectionPage() {
  const { navigate, routeParams } = useApp();
  const garmentType = routeParams?.garmentType || 't-shirt';
  
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    stretch: '',
    gsmMin: '',
    gsmMax: ''
  });

  const [selectedFabric, setSelectedFabric] = useState<string | null>(null);

  // Filter fabrics
  const filteredFabrics = fabricsData.filter(fabric => {
    if (filters.search && !fabric.name.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    if (filters.category && fabric.category !== filters.category) return false;
    if (filters.stretch && fabric.stretch !== filters.stretch) return false;
    if (filters.gsmMin && fabric.gsm < parseInt(filters.gsmMin)) return false;
    if (filters.gsmMax && fabric.gsm > parseInt(filters.gsmMax)) return false;
    return true;
  });

  const handleSelectFabric = (fabricId: string) => {
    setSelectedFabric(fabricId);
  };

  const handleContinue = () => {
    if (selectedFabric) {
      navigate('studio-manufacturer-matching', { 
        garmentType, 
        fabricId: selectedFabric 
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-[60px] bg-white border-b border-[#E5E7EB] z-40">
        <div className="h-full px-6 flex items-center justify-between">
          <button
            onClick={() => navigate('studio-design', { garmentType })}
            className="flex items-center gap-2 text-[#6B7280] hover:text-[#0B0D10] transition-colors"
          >
            <ChevronLeft className="size-5" />
            <span className="text-xs uppercase tracking-wide">Back to Design</span>
          </button>

          <div className="text-center">
            <h1 className="text-sm uppercase tracking-wide font-medium text-[#0B0D10]">
              Fabric Selection
            </h1>
          </div>

          <div className="w-32" />
        </div>
      </header>

      <div className="pt-[60px] flex">
        {/* Filter Sidebar */}
        <aside className="sticky top-[60px] h-[calc(100vh-60px)] overflow-y-auto bg-white border-r border-[#E5E7EB] p-6 w-[280px]">
          <div className="flex items-center gap-2 mb-6">
            <SlidersHorizontal className="size-5 text-[#6B7280]" />
            <h3 className="text-sm uppercase tracking-wide text-[#0B0D10] font-medium">Filters</h3>
          </div>

          <div className="space-y-6">
            {/* Search */}
            <div>
              <label className="text-xs uppercase tracking-wide text-[#6B7280] mb-2 block">
                Search
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#6B7280]" />
                <input
                  type="text"
                  placeholder="Fabric name"
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                  className="w-full pl-10 pr-3 py-2 border border-[#E5E7EB] text-sm text-[#0B0D10] focus:outline-none focus:border-[#E6C36A]"
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="text-xs uppercase tracking-wide text-[#6B7280] mb-2 block">
                Category
              </label>
              <select
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                className="w-full px-3 py-2 border border-[#E5E7EB] text-sm text-[#0B0D10] focus:outline-none focus:border-[#E6C36A]"
              >
                <option value="">All</option>
                <option value="Cotton">Cotton</option>
                <option value="Denim">Denim</option>
                <option value="Silk">Silk</option>
                <option value="Wool">Wool</option>
                <option value="Synthetic">Synthetic</option>
                <option value="Linen">Linen</option>
              </select>
            </div>

            {/* Stretch */}
            <div>
              <label className="text-xs uppercase tracking-wide text-[#6B7280] mb-2 block">
                Stretch Level
              </label>
              <select
                value={filters.stretch}
                onChange={(e) => setFilters({ ...filters, stretch: e.target.value })}
                className="w-full px-3 py-2 border border-[#E5E7EB] text-sm text-[#0B0D10] focus:outline-none focus:border-[#E6C36A]"
              >
                <option value="">All</option>
                <option value="None">None</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            {/* GSM Range */}
            <div>
              <label className="text-xs uppercase tracking-wide text-[#6B7280] mb-2 block">
                GSM Range
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.gsmMin}
                  onChange={(e) => setFilters({ ...filters, gsmMin: e.target.value })}
                  className="px-3 py-2 border border-[#E5E7EB] text-sm text-[#0B0D10] focus:outline-none focus:border-[#E6C36A]"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.gsmMax}
                  onChange={(e) => setFilters({ ...filters, gsmMax: e.target.value })}
                  className="px-3 py-2 border border-[#E5E7EB] text-sm text-[#0B0D10] focus:outline-none focus:border-[#E6C36A]"
                />
              </div>
            </div>

            {/* Reset */}
            <button
              onClick={() => setFilters({ search: '', category: '', stretch: '', gsmMin: '', gsmMax: '' })}
              className="w-full py-2 text-xs uppercase tracking-wide text-[#6B7280] hover:text-[#0B0D10] transition-colors border border-[#E5E7EB] hover:border-[#0B0D10]"
            >
              Reset
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="max-w-[1400px] mx-auto">
            {/* Page Title */}
            <div className="mb-8">
              <h1 className="font-['Playfair_Display'] text-4xl text-[#0B0D10] mb-2">
                Select Fabric
              </h1>
              <p className="text-sm text-[#6B7280]">
                {filteredFabrics.length} fabric{filteredFabrics.length !== 1 ? 's' : ''} available for {garmentType.replace('-', ' ')}
              </p>
            </div>

            {/* Fabric Grid */}
            {filteredFabrics.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {filteredFabrics.map((fabric) => (
                  <motion.div
                    key={fabric.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -4 }}
                    onClick={() => handleSelectFabric(fabric.id)}
                    className={`bg-white border-2 overflow-hidden cursor-pointer transition-all ${
                      selectedFabric === fabric.id 
                        ? 'border-[#E6C36A] shadow-lg' 
                        : 'border-[#E5E7EB] hover:border-[#0B0D10]'
                    }`}
                  >
                    {/* Fabric Image */}
                    <div className="relative aspect-square overflow-hidden bg-[#F5F5F5] group">
                      <motion.img
                        src={fabric.image}
                        alt={fabric.name}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.4 }}
                      />
                      {selectedFabric === fabric.id && (
                        <div className="absolute inset-0 bg-[#E6C36A]/20 flex items-center justify-center">
                          <div className="size-16 rounded-full bg-white flex items-center justify-center">
                            <span className="text-2xl">✓</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Fabric Info */}
                    <div className="p-5">
                      <h3 className="text-lg font-['Playfair_Display'] text-[#0B0D10] mb-3">
                        {fabric.name}
                      </h3>

                      <div className="space-y-2 text-xs mb-4">
                        <div className="flex items-center justify-between">
                          <span className="text-[#6B7280]">Composition</span>
                          <span className="text-[#0B0D10]">{fabric.composition}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[#6B7280]">GSM</span>
                          <span className="text-[#0B0D10] font-mono">{fabric.gsm}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[#6B7280]">Stretch</span>
                          <span className="text-[#0B0D10]">{fabric.stretch}</span>
                        </div>
                      </div>

                      <div className="mb-3">
                        <p className="text-[10px] uppercase tracking-wide text-[#6B7280] mb-1">
                          Suitable For
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {fabric.suitable.map((item) => (
                            <span
                              key={item}
                              className="px-2 py-1 text-[9px] uppercase tracking-wide bg-[#FAFAFA] text-[#0B0D10] border border-[#E5E7EB]"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-[#E5E7EB]">
                        <p className="text-sm font-medium text-[#0B0D10]">{fabric.priceRange}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-[#6B7280] text-sm uppercase tracking-wide">
                  No fabrics match your filters
                </p>
              </div>
            )}

            {/* Continue Button */}
            {selectedFabric && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="fixed bottom-8 right-8"
              >
                <button
                  onClick={handleContinue}
                  className="px-8 py-4 bg-[#0B0D10] text-white text-sm uppercase tracking-wide hover:bg-black transition-colors shadow-xl"
                >
                  Continue to Manufacturer Selection →
                </button>
              </motion.div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
