import React, { useState } from 'react';
import { useApp } from '../../App';
import { motion } from 'motion/react';
import { 
  ArrowLeft,
  AlertTriangle,
  CheckCircle2,
  Plus,
  Edit,
  TrendingDown
} from 'lucide-react';

interface Material {
  id: string;
  name: string;
  type: 'fabric' | 'ink' | 'thread' | 'hardware' | 'other';
  available: number;
  reserved: number;
  threshold: number;
  unit: string;
  status: 'ok' | 'low' | 'critical';
}

interface PendingOrder {
  id: string;
  brand: string;
  product: string;
  impact: { materialId: string; required: number }[];
}

const mockMaterials: Material[] = [
  {
    id: 'MAT-001',
    name: 'Cotton Fleece',
    type: 'fabric',
    available: 420,
    reserved: 180,
    threshold: 500,
    unit: 'm',
    status: 'low'
  },
  {
    id: 'MAT-002',
    name: 'Polyester Thread (Black)',
    type: 'thread',
    available: 120,
    reserved: 85,
    threshold: 150,
    unit: 'spools',
    status: 'low'
  },
  {
    id: 'MAT-003',
    name: 'White Cotton',
    type: 'fabric',
    available: 680,
    reserved: 250,
    threshold: 400,
    unit: 'm',
    status: 'ok'
  },
  {
    id: 'MAT-004',
    name: 'Black Ink (DTG)',
    type: 'ink',
    available: 35,
    reserved: 12,
    threshold: 25,
    unit: 'L',
    status: 'ok'
  },
  {
    id: 'MAT-005',
    name: 'Metal Zippers (15cm)',
    type: 'hardware',
    available: 890,
    reserved: 350,
    threshold: 1000,
    unit: 'units',
    status: 'low'
  },
  {
    id: 'MAT-006',
    name: 'Wool Suiting',
    type: 'fabric',
    available: 145,
    reserved: 75,
    threshold: 200,
    unit: 'm',
    status: 'critical'
  },
  {
    id: 'MAT-007',
    name: 'Canvas Fabric',
    type: 'fabric',
    available: 520,
    reserved: 0,
    threshold: 300,
    unit: 'm',
    status: 'ok'
  }
];

const mockPendingOrders: PendingOrder[] = [
  {
    id: 'BL-2850',
    brand: 'Street Culture',
    product: 'Cargo Pants (200 units)',
    impact: [
      { materialId: 'MAT-007', required: 280 }
    ]
  },
  {
    id: 'BL-2851',
    brand: 'Urban Essentials',
    product: 'Cotton Tee (400 units)',
    impact: [
      { materialId: 'MAT-003', required: 180 },
      { materialId: 'MAT-002', required: 65 }
    ]
  }
];

const statusColors = {
  ok: 'text-[#2F4F2F]',
  low: 'text-[#B8860B]',
  critical: 'text-[#8B0000]'
};

const statusBgColors = {
  ok: 'bg-[#2F4F2F]/10',
  low: 'bg-[#B8860B]/10',
  critical: 'bg-[#8B0000]/10'
};

export function ManufacturerInventory() {
  const { navigate } = useApp();
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [materials, setMaterials] = useState(mockMaterials);

  // Calculate projected inventory if orders are accepted
  const calculateProjectedStock = (material: Material) => {
    let totalRequired = 0;
    selectedOrders.forEach(orderId => {
      const order = mockPendingOrders.find(o => o.id === orderId);
      if (order) {
        const impact = order.impact.find(i => i.materialId === material.id);
        if (impact) {
          totalRequired += impact.required;
        }
      }
    });
    return material.available - totalRequired;
  };

  const toggleOrderSelection = (orderId: string) => {
    setSelectedOrders(prev =>
      prev.includes(orderId)
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    );
  };

  return (
    <div className="min-h-screen bg-[#F7F7F5] p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl tracking-tight text-[#0F0F12] font-['Inter_Tight']">Materials Inventory</h1>
        <button className="h-10 px-6 bg-[#0F0F12] text-white text-xs uppercase tracking-wider hover:bg-[#0E1A2B] transition-colors duration-200 flex items-center gap-2 font-['Inter_Tight'] rounded-md">
          <Plus className="w-4 h-4" />
          Add Material
        </button>
      </div>

      {/* Split Layout */}
      <div className="flex h-[calc(100vh-113px)]">
        {/* LEFT: Inventory Table */}
        <div className="w-2/3 overflow-y-auto">
          <table className="w-full">
            <thead className="bg-[#FFFFFF] sticky top-0 border-b border-[#E6E6E3]">
              <tr>
                <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-[#6E6E6E]">
                  Material
                </th>
                <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-[#6E6E6E]">
                  Type
                </th>
                <th className="px-6 py-4 text-right text-xs uppercase tracking-wider text-[#6E6E6E]">
                  Available
                </th>
                <th className="px-6 py-4 text-right text-xs uppercase tracking-wider text-[#6E6E6E]">
                  Reserved
                </th>
                <th className="px-6 py-4 text-right text-xs uppercase tracking-wider text-[#6E6E6E]">
                  Threshold
                </th>
                <th className="px-6 py-4 text-center text-xs uppercase tracking-wider text-[#6E6E6E]">
                  Status
                </th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody>
              {materials.map((material) => {
                const projectedStock = calculateProjectedStock(material);
                const isAffected = selectedOrders.some(orderId => {
                  const order = mockPendingOrders.find(o => o.id === orderId);
                  return order?.impact.some(i => i.materialId === material.id);
                });

                return (
                  <tr
                    key={material.id}
                    onClick={() => setSelectedMaterial(material)}
                    className={`
                      cursor-pointer border-b border-[#E6E6E3] transition-all duration-300
                      ${selectedMaterial?.id === material.id ? 'bg-[#111111]' : 'bg-[#FFFFFF] hover:bg-[#F7F7F5]'}
                      ${isAffected ? 'border-l-4 border-l-[#B8860B]' : ''}
                    `}
                  >
                    <td className={`px-6 py-4 ${selectedMaterial?.id === material.id ? 'text-white' : 'text-[#0B0B0B]'}`}>
                      <div>
                        <p className="text-sm">{material.name}</p>
                        {isAffected && selectedMaterial?.id !== material.id && (
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-xs text-[#B8860B] mt-1"
                          >
                            Affected by selected orders
                          </motion.p>
                        )}
                      </div>
                    </td>
                    <td className={`px-6 py-4 text-sm capitalize ${selectedMaterial?.id === material.id ? 'text-white/80' : 'text-[#6E6E6E]'}`}>
                      {material.type}
                    </td>
                    <td className={`px-6 py-4 text-right ${selectedMaterial?.id === material.id ? 'text-white' : 'text-[#0B0B0B]'}`}>
                      <div>
                        <p className="text-sm">{material.available} {material.unit}</p>
                        {isAffected && selectedOrders.length > 0 && (
                          <motion.p
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className={`text-xs mt-1 ${
                              selectedMaterial?.id === material.id 
                                ? 'text-white/60' 
                                : projectedStock < material.threshold 
                                  ? 'text-[#8B0000]' 
                                  : 'text-[#6E6E6E]'
                            }`}
                          >
                            → {projectedStock} {material.unit}
                          </motion.p>
                        )}
                      </div>
                    </td>
                    <td className={`px-6 py-4 text-sm text-right ${selectedMaterial?.id === material.id ? 'text-white/80' : 'text-[#6E6E6E]'}`}>
                      {material.reserved} {material.unit}
                    </td>
                    <td className={`px-6 py-4 text-sm text-right ${selectedMaterial?.id === material.id ? 'text-white/80' : 'text-[#6E6E6E]'}`}>
                      {material.threshold} {material.unit}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`
                        inline-flex items-center gap-1 px-3 py-1 text-xs uppercase tracking-wider
                        ${selectedMaterial?.id === material.id 
                          ? 'text-white/80' 
                          : statusColors[material.status]
                        }
                      `}>
                        {material.status === 'ok' && <CheckCircle2 className="w-3 h-3" />}
                        {material.status === 'low' && <AlertTriangle className="w-3 h-3" />}
                        {material.status === 'critical' && <AlertTriangle className="w-3 h-3" />}
                        {material.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className={`p-2 hover:bg-[#F7F7F5] transition-colors duration-200 ${
                        selectedMaterial?.id === material.id ? 'text-white' : 'text-[#6E6E6E]'
                      }`}>
                        <Edit className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* RIGHT: Order Impact Panel */}
        <div className="w-1/3 bg-[#FFFFFF] border-l border-[#E6E6E3] overflow-y-auto p-6">
          <div className="mb-6">
            <h3 className="text-xs uppercase tracking-wider text-[#6E6E6E] mb-4">
              Incoming Orders Impact
            </h3>
            <p className="text-xs text-[#6E6E6E] leading-relaxed">
              Select pending orders to see their impact on inventory levels. 
              Materials will be highlighted and projected stock will be calculated.
            </p>
          </div>

          {/* Pending Orders */}
          <div className="space-y-3 mb-8">
            {mockPendingOrders.map((order) => (
              <div
                key={order.id}
                onClick={() => toggleOrderSelection(order.id)}
                className={`
                  p-4 border cursor-pointer transition-all duration-300
                  ${selectedOrders.includes(order.id)
                    ? 'border-[#111111] bg-[#111111] text-white'
                    : 'border-[#E6E6E3] hover:border-[#111111]'
                  }
                `}
              >
                <div className="flex items-start justify-between mb-2">
                  <p className={`text-sm ${selectedOrders.includes(order.id) ? 'text-white' : 'text-[#0B0B0B]'}`}>
                    {order.product}
                  </p>
                  <span className={`text-xs ${selectedOrders.includes(order.id) ? 'text-white/80' : 'text-[#6E6E6E]'}`}>
                    #{order.id}
                  </span>
                </div>
                <p className={`text-xs ${selectedOrders.includes(order.id) ? 'text-white/70' : 'text-[#6E6E6E]'}`}>
                  {order.brand}
                </p>
              </div>
            ))}
          </div>

          {/* Impact Summary */}
          {selectedOrders.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="border border-[#E6E6E3] p-4"
            >
              <div className="flex items-center gap-2 mb-4">
                <TrendingDown className="w-4 h-4 text-[#B8860B]" />
                <h4 className="text-xs uppercase tracking-wider text-[#6E6E6E]">
                  Projected Impact
                </h4>
              </div>

              <div className="space-y-3">
                {materials
                  .filter(mat => {
                    return selectedOrders.some(orderId => {
                      const order = mockPendingOrders.find(o => o.id === orderId);
                      return order?.impact.some(i => i.materialId === mat.id);
                    });
                  })
                  .map(material => {
                    const projectedStock = calculateProjectedStock(material);
                    const isBelowThreshold = projectedStock < material.threshold;

                    return (
                      <div key={material.id} className="pb-3 border-b border-[#E6E6E3] last:border-0">
                        <p className="text-xs text-[#0B0B0B] mb-2">{material.name}</p>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-[#6E6E6E]">Current: {material.available} {material.unit}</span>
                          <span className={isBelowThreshold ? 'text-[#8B0000]' : 'text-[#0B0B0B]'}>
                            After: {projectedStock} {material.unit}
                          </span>
                        </div>
                        {isBelowThreshold && (
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-xs text-[#8B0000] mt-2 flex items-center gap-1"
                          >
                            <AlertTriangle className="w-3 h-3" />
                            Below threshold
                          </motion.p>
                        )}
                      </div>
                    );
                  })}
              </div>

              <div className="mt-6 pt-4 border-t border-[#E6E6E3]">
                <p className="text-xs text-[#6E6E6E] mb-3">
                  {materials.filter(mat => calculateProjectedStock(mat) < mat.threshold).length} materials will be below threshold
                </p>
                <button className="w-full h-10 bg-[#111111] text-white text-xs uppercase tracking-wider hover:bg-[#0B0B0B] transition-colors duration-200">
                  Review Before Accept
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}