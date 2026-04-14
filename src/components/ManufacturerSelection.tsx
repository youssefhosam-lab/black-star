import React, { useState } from 'react';
import { useApp } from '../App';
import { Layout } from './Layout';
import { 
  Factory, Clock, Star, DollarSign, Info, Check, ArrowRight,
  Filter, ArrowLeft
} from 'lucide-react';
import { motion } from 'motion/react';

interface Manufacturer {
  id: string;
  name: string;
  type: 'Factory' | 'Print-on-Demand' | 'Tailor';
  rating: number;
  leadTime: number; // days
  minOrder: number;
  costs: {
    fabric: number;
    printing: number;
    manufacturing: number;
  };
  services: string[];
  fabricCompatibility: string[];
}

const MOCK_MANUFACTURERS: Manufacturer[] = [
  {
    id: 'm1',
    name: 'Elite Garments Co.',
    type: 'Factory',
    rating: 4.8,
    leadTime: 14,
    minOrder: 50,
    costs: { fabric: 240, printing: 100, manufacturing: 300 },
    services: ['Bulk Production', 'Custom Labels'],
    fabricCompatibility: ['Cotton', 'Polyester']
  },
  {
    id: 'm2',
    name: 'QuickPrint Studio',
    type: 'Print-on-Demand',
    rating: 4.5,
    leadTime: 3,
    minOrder: 1,
    costs: { fabric: 300, printing: 160, manufacturing: 200 },
    services: ['DTG Printing', 'Fast Shipping'],
    fabricCompatibility: ['Cotton']
  },
  {
    id: 'm3',
    name: 'Artisan Tailors',
    type: 'Tailor',
    rating: 4.9,
    leadTime: 7,
    minOrder: 1,
    costs: { fabric: 400, printing: 0, manufacturing: 800 },
    services: ['Handmade', 'Custom Fit'],
    fabricCompatibility: ['Cotton', 'Silk', 'Linen', 'Wool']
  }
];

const PLATFORM_FEE = 5;

export function ManufacturerSelection() {
  const { navigate } = useApp();
  const [sortBy, setSortBy] = useState<'price' | 'time' | 'rating'>('rating');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const calculateTotal = (costs: Manufacturer['costs']) => {
    return costs.fabric + costs.printing + costs.manufacturing + PLATFORM_FEE;
  };

  const sortedManufacturers = [...MOCK_MANUFACTURERS].sort((a, b) => {
    if (sortBy === 'price') return calculateTotal(a.costs) - calculateTotal(b.costs);
    if (sortBy === 'time') return a.leadTime - b.leadTime;
    return b.rating - a.rating;
  });

  const handleProceed = () => {
    if (selectedId) {
      // Pass the selected manufacturer to the checkout page via state or context
      // For now, we assume the checkout page can read 'selectedManufacturer' from somewhere
      // Or we just navigate.
      navigate('checkout'); 
    }
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={() => navigate('design-studio')}
            className="p-2 hover:bg-[#1E2230] rounded-lg text-[#8A8F98] hover:text-[#E6C36A] transition-colors"
          >
            <ArrowLeft className="size-6" />
          </button>
          <div>
            <h1 className="text-3xl font-['Playfair_Display'] font-bold text-[#F5F6F8]">Select Manufacturer</h1>
            <p className="text-[#8A8F98]">Choose who will bring your design to life.</p>
          </div>
        </div>

        {/* Sorting & Filters */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-sm text-[#8A8F98]">
            <span>Sort by:</span>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#141720] border border-[#1E2230] rounded px-2 py-1 text-[#F5F6F8] focus:border-[#E6C36A] focus:outline-none"
            >
              <option value="rating">Rating</option>
              <option value="price">Price (Low to High)</option>
              <option value="time">Lead Time (Fastest)</option>
            </select>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {sortedManufacturers.map((m) => {
              const totalCost = calculateTotal(m.costs);
              const isSelected = selectedId === m.id;

              return (
                <motion.div
                  key={m.id}
                  layout
                  onClick={() => setSelectedId(m.id)}
                  className={`
                    relative p-6 rounded-xl border-2 transition-all cursor-pointer group
                    ${isSelected 
                      ? 'bg-[#141720] border-[#E6C36A] shadow-[0_0_20px_rgba(230,195,106,0.1)]' 
                      : 'bg-[#141720] border-[#1E2230] hover:border-[#8A8F98]'
                    }
                  `}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-[#F5F6F8] flex items-center gap-2">
                        {m.name}
                        {isSelected && <Check className="size-5 text-[#E6C36A]" />}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-[#8A8F98] mt-1">
                        <span className="bg-[#1B1F2A] px-2 py-0.5 rounded border border-[#1E2230]">{m.type}</span>
                        <span>•</span>
                        <div className="flex items-center text-[#E6C36A]">
                          <Star className="size-3 fill-current mr-1" />
                          {m.rating}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-[#E6C36A]">EGP {totalCost.toFixed(2)}</div>
                      <div className="text-xs text-[#8A8F98]">per unit</div>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4 mb-4 text-sm">
                    <div className="bg-[#0B0D10] p-3 rounded-lg border border-[#1E2230]">
                      <div className="text-[#8A8F98] mb-1 flex items-center gap-1">
                        <Clock className="size-3" /> Lead Time
                      </div>
                      <div className="text-[#F5F6F8] font-medium">{m.leadTime} Days</div>
                    </div>
                    <div className="bg-[#0B0D10] p-3 rounded-lg border border-[#1E2230]">
                      <div className="text-[#8A8F98] mb-1 flex items-center gap-1">
                        <Factory className="size-3" /> MOQ
                      </div>
                      <div className="text-[#F5F6F8] font-medium">{m.minOrder} Units</div>
                    </div>
                    <div className="bg-[#0B0D10] p-3 rounded-lg border border-[#1E2230]">
                      <div className="text-[#8A8F98] mb-1">Fabrics</div>
                      <div className="text-[#F5F6F8] font-medium truncate" title={m.fabricCompatibility.join(', ')}>
                        {m.fabricCompatibility[0]} +{m.fabricCompatibility.length - 1}
                      </div>
                    </div>
                  </div>

                  {isSelected && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="border-t border-[#1E2230] pt-4 mt-4"
                    >
                      <h4 className="text-sm font-medium text-[#F5F6F8] mb-2">Cost Breakdown</h4>
                      <div className="space-y-1 text-sm text-[#8A8F98]">
                        <div className="flex justify-between">
                          <span>Fabric Cost</span>
                          <span>EGP {m.costs.fabric.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Printing/Embroidery</span>
                          <span>EGP {m.costs.printing.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Manufacturing Labor</span>
                          <span>EGP {m.costs.manufacturing.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-[#E6C36A]">
                          <span>Platform Fee</span>
                          <span>EGP {PLATFORM_FEE.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between font-bold text-[#F5F6F8] pt-2 border-t border-[#1E2230] mt-2">
                          <span>Total</span>
                          <span>EGP {totalCost.toFixed(2)}</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Summary / Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-[#141720] border border-[#1E2230] rounded-xl p-6">
              <h3 className="text-lg font-['Playfair_Display'] font-bold text-[#F5F6F8] mb-4">Selection Summary</h3>
              
              {selectedId ? (
                <div className="space-y-4">
                  <div>
                    <span className="text-sm text-[#8A8F98]">Manufacturer</span>
                    <div className="text-[#F5F6F8] font-medium">
                      {MOCK_MANUFACTURERS.find(m => m.id === selectedId)?.name}
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-[#8A8F98]">Est. Delivery</span>
                    <div className="text-[#F5F6F8] font-medium">
                      {MOCK_MANUFACTURERS.find(m => m.id === selectedId)?.leadTime} Days
                    </div>
                  </div>
                  
                  <button 
                    onClick={handleProceed}
                    className="w-full bg-[#E6C36A] text-[#0B0D10] font-bold py-3 rounded-lg hover:brightness-110 transition-all shadow-[0_0_15px_rgba(230,195,106,0.3)] flex items-center justify-center gap-2"
                  >
                    Proceed to Checkout
                    <ArrowRight className="size-5" />
                  </button>
                </div>
              ) : (
                <div className="text-center py-8 text-[#8A8F98]">
                  <Factory className="size-12 mx-auto mb-3 opacity-20" />
                  <p>Select a manufacturer to continue</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}