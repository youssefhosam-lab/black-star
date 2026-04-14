import { useState } from 'react';
import { useApp } from '../../App';
import { Bell, ChevronDown, Info, Save, Trash2 } from 'lucide-react';
import Logo from '../../imports/Logo';

type GarmentType = 'T-Shirt' | 'Hoodie' | 'Jacket' | 'Pants';

export function CustomerStudio() {
  const { navigate, user } = useApp();
  const [selectedGarment, setSelectedGarment] = useState<GarmentType>('T-Shirt');
  const [selectedColor, setSelectedColor] = useState('#0B0D10');
  const [text, setText] = useState('');
  const [size, setSize] = useState('M');

  const garmentTypes: GarmentType[] = ['T-Shirt', 'Hoodie', 'Jacket', 'Pants'];
  const colors = [
    { name: 'Black', value: '#0B0D10' },
    { name: 'White', value: '#FFFFFF' },
    { name: 'Gray', value: '#9CA3AF' },
    { name: 'Navy', value: '#1E293B' },
    { name: 'Beige', value: '#E6C36A' },
  ];
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  const drafts = [
    {
      id: '1',
      name: 'Black Hoodie Design',
      type: 'Hoodie',
      thumbnail: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300',
      lastEdited: '2 days ago',
    },
    {
      id: '2',
      name: 'White T-Shirt',
      type: 'T-Shirt',
      thumbnail: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300',
      lastEdited: '1 week ago',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#E5E7EB]">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="w-8 h-8 text-[#0B0D10]">
            <Logo showText={false} />
          </div>

          <nav className="hidden md:flex items-center gap-12">
            {['Home', 'Studio', 'Orders', 'Shop'].map((item) => {
              const route = item === 'Home' ? 'home' : `customer-${item.toLowerCase()}`;
              const isActive = item === 'Studio';
              return (
                <button
                  key={item}
                  onClick={() => navigate(route)}
                  className={`text-sm font-medium transition-colors tracking-wide ${
                    isActive ? 'text-[#0B0D10]' : 'text-[#9CA3AF] hover:text-[#E6C36A]'
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            <button className="relative p-2 hover:bg-[#E5E7EB]/50 rounded-full transition-colors">
              <Bell className="w-5 h-5 text-[#0B0D10]" />
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

      <div className="container mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-4xl font-['Playfair_Display'] font-bold text-[#0B0D10]">
            Design Studio
          </h1>
          <button
            onClick={() => navigate('customer-drafts')}
            className="text-sm text-[#0B0D10] hover:text-[#E6C36A] transition-colors font-medium"
          >
            View Drafts →
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Preview */}
          <div className="border border-[#E5E7EB] p-12 flex items-center justify-center" style={{ backgroundColor: selectedColor === '#FFFFFF' ? '#F5F5F5' : '#FFFFFF' }}>
            <div className="text-center">
              <div 
                className="w-64 h-80 mb-6 flex items-center justify-center text-6xl"
                style={{ 
                  backgroundColor: selectedColor,
                  color: selectedColor === '#FFFFFF' ? '#0B0D10' : '#FFFFFF',
                  border: selectedColor === '#FFFFFF' ? '1px solid #E5E7EB' : 'none'
                }}
              >
                {text || selectedGarment[0]}
              </div>
              <p className="text-sm text-[#9CA3AF]">{selectedGarment} Preview</p>
            </div>
          </div>

          {/* Right: Design Controls */}
          <div className="space-y-8">
            {/* Garment Type */}
            <div>
              <label className="block text-sm font-medium text-[#0B0D10] mb-4 uppercase tracking-wide">
                Garment Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                {garmentTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedGarment(type)}
                    className={`py-3 px-4 border text-sm font-medium transition-colors ${
                      selectedGarment === type
                        ? 'border-[#0B0D10] bg-[#0B0D10] text-white'
                        : 'border-[#E5E7EB] text-[#0B0D10] hover:border-[#0B0D10]'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <label className="block text-sm font-medium text-[#0B0D10] mb-4 uppercase tracking-wide">
                Color
              </label>
              <div className="flex gap-3">
                {colors.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setSelectedColor(color.value)}
                    className={`w-12 h-12 border-2 transition-all ${
                      selectedColor === color.value
                        ? 'border-[#0B0D10] scale-110'
                        : 'border-[#E5E7EB] hover:border-[#9CA3AF]'
                    }`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Text Input */}
            <div>
              <label className="block text-sm font-medium text-[#0B0D10] mb-4 uppercase tracking-wide">
                Add Text
              </label>
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text..."
                className="w-full px-4 py-3 border border-[#E5E7EB] text-[#0B0D10] placeholder-[#9CA3AF] focus:border-[#0B0D10] focus:outline-none transition-colors"
                maxLength={20}
              />
              <p className="text-xs text-[#9CA3AF] mt-2">{text.length}/20 characters</p>
            </div>

            {/* Size Selection */}
            <div>
              <label className="block text-sm font-medium text-[#0B0D10] mb-4 uppercase tracking-wide">
                Size
              </label>
              <div className="flex gap-2">
                {sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`px-4 py-2 border text-sm font-medium transition-colors ${
                      size === s
                        ? 'border-[#0B0D10] bg-[#0B0D10] text-white'
                        : 'border-[#E5E7EB] text-[#0B0D10] hover:border-[#0B0D10]'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6">
              <button className="flex-1 px-6 py-3 bg-[#0B0D10] text-white font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                <Save className="w-5 h-5" />
                Save Draft
              </button>
              <button 
                onClick={() => navigate('customer-select-manufacturer')}
                className="flex-1 px-6 py-3 border border-[#0B0D10] text-[#0B0D10] font-medium hover:bg-[#0B0D10] hover:text-white transition-colors"
              >
                Continue →
              </button>
            </div>
          </div>
        </div>

        {/* Drafts Section */}
        <div className="mt-24">
          <h2 className="text-2xl font-['Playfair_Display'] font-bold text-[#0B0D10] mb-8">
            Your Drafts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {drafts.map((draft) => (
              <div
                key={draft.id}
                className="border border-[#E5E7EB] hover:border-[#0B0D10] transition-colors group"
              >
                <img
                  src={draft.thumbnail}
                  alt={draft.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-medium text-[#0B0D10] mb-1">{draft.name}</h3>
                  <p className="text-xs text-[#9CA3AF] mb-4">{draft.type} • {draft.lastEdited}</p>
                  <div className="flex gap-2">
                    <button className="flex-1 py-2 text-sm text-[#0B0D10] border border-[#E5E7EB] hover:border-[#0B0D10] transition-colors">
                      Resume
                    </button>
                    <button className="p-2 text-[#9CA3AF] hover:text-red-600 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}