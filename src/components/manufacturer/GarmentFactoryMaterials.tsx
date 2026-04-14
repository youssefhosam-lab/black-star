import { useState } from 'react';
import { useApp } from '../../App';
import { Bell, ChevronDown, Search, AlertTriangle, Package } from 'lucide-react';
import Logo from '../../imports/Logo';

interface Material {
  id: string;
  name: string;
  category: 'Fabric' | 'Trim' | 'Hardware' | 'Packaging';
  quantity: number;
  unit: string;
  minStock: number;
  supplier: string;
  lastRestocked: string;
  location: string;
  status: 'good' | 'low' | 'critical';
}

export function GarmentFactoryMaterials() {
  const { navigate, user } = useApp();
  const [activeTab, setActiveTab] = useState<'all' | 'fabric' | 'trim' | 'hardware'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const materials: Material[] = [
    {
      id: '1',
      name: 'Cotton Fleece 300gsm - Black',
      category: 'Fabric',
      quantity: 2400,
      unit: 'meters',
      minStock: 1000,
      supplier: 'Turkish Textile Co',
      lastRestocked: '2024-12-15',
      location: 'Warehouse A',
      status: 'good',
    },
    {
      id: '2',
      name: 'Organic Cotton Jersey - White',
      category: 'Fabric',
      quantity: 450,
      unit: 'meters',
      minStock: 800,
      supplier: 'Eco Fabrics Ltd',
      lastRestocked: '2024-12-10',
      location: 'Warehouse A',
      status: 'low',
    },
    {
      id: '3',
      name: 'YKK Metal Zippers 20cm',
      category: 'Hardware',
      quantity: 150,
      unit: 'pieces',
      minStock: 500,
      supplier: 'YKK Asia',
      lastRestocked: '2024-12-05',
      location: 'Warehouse B',
      status: 'critical',
    },
    {
      id: '4',
      name: 'Japanese Denim 14oz - Indigo',
      category: 'Fabric',
      quantity: 1800,
      unit: 'meters',
      minStock: 800,
      supplier: 'Osaka Mills',
      lastRestocked: '2024-12-18',
      location: 'Warehouse A',
      status: 'good',
    },
    {
      id: '5',
      name: 'Woven Labels - Brand Logo',
      category: 'Trim',
      quantity: 3200,
      unit: 'pieces',
      minStock: 2000,
      supplier: 'Label Masters',
      lastRestocked: '2024-12-12',
      location: 'Warehouse B',
      status: 'good',
    },
    {
      id: '6',
      name: 'Polyester Thread - Black',
      category: 'Trim',
      quantity: 45,
      unit: 'spools',
      minStock: 100,
      supplier: 'Thread Supply Co',
      lastRestocked: '2024-11-28',
      location: 'Production Floor',
      status: 'critical',
    },
    {
      id: '7',
      name: 'Poly Bags - Medium',
      category: 'Packaging',
      quantity: 8500,
      unit: 'pieces',
      minStock: 5000,
      supplier: 'PackPro Industries',
      lastRestocked: '2024-12-19',
      location: 'Warehouse C',
      status: 'good',
    },
    {
      id: '8',
      name: 'Metal Buttons 15mm - Silver',
      category: 'Hardware',
      quantity: 680,
      unit: 'pieces',
      minStock: 1000,
      supplier: 'Button Factory Ltd',
      lastRestocked: '2024-12-08',
      location: 'Warehouse B',
      status: 'low',
    },
  ];

  const filteredMaterials = materials.filter((material) => {
    const matchesTab =
      activeTab === 'all' ||
      (activeTab === 'fabric' && material.category === 'Fabric') ||
      (activeTab === 'trim' && material.category === 'Trim') ||
      (activeTab === 'hardware' && material.category === 'Hardware');

    const matchesSearch =
      searchQuery === '' ||
      material.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.supplier.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesSearch;
  });

  const getStatusColor = (status: Material['status']) => {
    switch (status) {
      case 'good':
        return 'bg-[#E6C36A]/20 text-[#0B0D10]';
      case 'low':
        return 'bg-[#E5E7EB] text-[#9CA3AF]';
      case 'critical':
        return 'bg-[#7A0F0F]/10 text-[#7A0F0F]';
    }
  };

  const criticalCount = materials.filter((m) => m.status === 'critical').length;
  const lowCount = materials.filter((m) => m.status === 'low').length;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#E5E7EB]">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="w-8 h-8 text-[#0B0D10] cursor-pointer" onClick={() => navigate('home')}>
            <Logo showText={false} />
          </div>

          <nav className="hidden md:flex items-center gap-12">
            {['Orders', 'Production', 'Materials', 'Community', 'Payments'].map((item) => (
              <button
                key={item}
                onClick={() => navigate(`garment-factory-${item.toLowerCase()}`)}
                className={`text-sm font-medium transition-colors tracking-wide ${
                  item === 'Materials' ? 'text-[#0B0D10]' : 'text-[#9CA3AF] hover:text-[#0B0D10]'
                }`}
              >
                {item}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button className="relative p-2 hover:bg-[#E5E7EB]/50 rounded-full transition-colors">
              <Bell className="w-5 h-5 text-[#0B0D10]" />
              {(criticalCount > 0 || lowCount > 0) && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#7A0F0F] rounded-full" />
              )}
            </button>
            <div className="relative group">
              <button className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <div className="w-8 h-8 rounded-full bg-[#E5E7EB] overflow-hidden">
                  <img
                    src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <ChevronDown className="w-4 h-4 text-[#9CA3AF]" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Materials Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-5xl font-['Playfair_Display'] font-bold text-[#0B0D10] mb-2">
              Material Inventory
            </h1>
            <p className="text-[#9CA3AF]">Bulk fabrics, trims, and production supplies</p>
          </div>
        </div>

        {/* Alerts */}
        {(criticalCount > 0 || lowCount > 0) && (
          <div className="mb-8 space-y-3">
            {criticalCount > 0 && (
              <div className="border-l-4 border-[#7A0F0F] bg-[#7A0F0F]/5 p-4 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-[#7A0F0F] mt-0.5" />
                <div className="flex-1">
                  <p className="text-[#7A0F0F] font-medium mb-1">
                    {criticalCount} material{criticalCount > 1 ? 's' : ''} critically low
                  </p>
                  <p className="text-sm text-[#9CA3AF]">
                    Immediate restocking required to avoid production delays
                  </p>
                </div>
                <button
                  onClick={() => navigate('garment-factory-community')}
                  className="px-4 py-2 bg-[#7A0F0F] text-white text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  Request from Community
                </button>
              </div>
            )}
            {lowCount > 0 && (
              <div className="border-l-4 border-[#9CA3AF] bg-[#E5E7EB]/50 p-4 flex items-start gap-3">
                <Package className="w-5 h-5 text-[#9CA3AF] mt-0.5" />
                <div className="flex-1">
                  <p className="text-[#0B0D10] font-medium mb-1">
                    {lowCount} material{lowCount > 1 ? 's' : ''} running low
                  </p>
                  <p className="text-sm text-[#9CA3AF]">Plan restocking within the next week</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF]" />
            <input
              type="text"
              placeholder="Search materials, suppliers, or categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-[#E5E7EB] text-[#0B0D10] placeholder-[#9CA3AF] focus:border-[#0B0D10] focus:outline-none"
            />
          </div>
          <button className="px-6 py-3 bg-[#0B0D10] text-white hover:opacity-90 transition-opacity">
            + Add Material
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-[#E5E7EB]">
          {[
            { id: 'all', label: 'All Materials', count: materials.length },
            { id: 'fabric', label: 'Fabrics', count: materials.filter((m) => m.category === 'Fabric').length },
            { id: 'trim', label: 'Trims', count: materials.filter((m) => m.category === 'Trim').length },
            { id: 'hardware', label: 'Hardware', count: materials.filter((m) => m.category === 'Hardware').length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-4 px-2 text-sm font-medium transition-colors relative flex items-center gap-2 ${
                activeTab === tab.id ? 'text-[#0B0D10]' : 'text-[#9CA3AF] hover:text-[#0B0D10]'
              }`}
            >
              {tab.label}
              <span className="text-xs px-2 py-0.5 bg-[#E5E7EB] rounded-full">{tab.count}</span>
              {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0B0D10]" />}
            </button>
          ))}
        </div>

        {/* Materials List */}
        <div className="space-y-4">
          {filteredMaterials.map((material) => (
            <div
              key={material.id}
              className={`border p-6 transition-colors ${
                material.status === 'critical'
                  ? 'border-[#7A0F0F] bg-[#7A0F0F]/5'
                  : 'border-[#E5E7EB] hover:border-[#0B0D10]'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    <h3 className="text-xl font-['Playfair_Display'] font-bold text-[#0B0D10]">
                      {material.name}
                    </h3>
                    <span className={`px-3 py-1 text-xs font-medium ${getStatusColor(material.status)}`}>
                      {material.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                    <div>
                      <p className="text-[#9CA3AF] mb-1">Current Stock</p>
                      <p className="text-[#0B0D10] font-medium">
                        {material.quantity.toLocaleString()} {material.unit}
                      </p>
                    </div>
                    <div>
                      <p className="text-[#9CA3AF] mb-1">Min Stock</p>
                      <p className="text-[#0B0D10] font-medium">
                        {material.minStock.toLocaleString()} {material.unit}
                      </p>
                    </div>
                    <div>
                      <p className="text-[#9CA3AF] mb-1">Supplier</p>
                      <p className="text-[#0B0D10] font-medium">{material.supplier}</p>
                    </div>
                    <div>
                      <p className="text-[#9CA3AF] mb-1">Location</p>
                      <p className="text-[#0B0D10] font-medium">{material.location}</p>
                    </div>
                    <div>
                      <p className="text-[#9CA3AF] mb-1">Last Restocked</p>
                      <p className="text-[#0B0D10] font-medium">
                        {new Date(material.lastRestocked).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E5E7EB] flex items-center justify-between">
                <div className="flex-1 mr-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex-1 bg-[#E5E7EB] h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all ${
                          material.status === 'critical'
                            ? 'bg-[#7A0F0F]'
                            : material.status === 'low'
                            ? 'bg-[#9CA3AF]'
                            : 'bg-[#E6C36A]'
                        }`}
                        style={{ width: `${(material.quantity / material.minStock) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-[#9CA3AF] whitespace-nowrap">
                      {Math.round((material.quantity / material.minStock) * 100)}% of min stock
                    </span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button className="px-4 py-2 bg-[#0B0D10] text-white text-sm font-medium hover:opacity-90 transition-opacity">
                    Restock
                  </button>
                  <button className="px-4 py-2 border border-[#E5E7EB] text-[#0B0D10] text-sm font-medium hover:border-[#0B0D10] transition-colors">
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredMaterials.length === 0 && (
          <div className="text-center py-16">
            <p className="text-[#9CA3AF] text-lg">No materials found</p>
          </div>
        )}
      </div>
    </div>
  );
}
