import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../App';
import { Layout } from './Layout';
import { 
  Type, Image as ImageIcon, Upload, Palette, Ruler, Scissors, 
  Save, ShoppingCart, Download, Undo, Redo, Trash2, RotateCw,
  ZoomIn, ZoomOut, Move, ChevronLeft, Shirt, Eye, Box
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Logo from '../imports/Logo';

interface DesignElement {
  id: string;
  type: 'text' | 'image' | 'logo';
  content: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  color?: string;
  fontSize?: number;
}

// 3D Selection Page Component
const SelectionView = ({ onSelect }: { onSelect: (id: string) => void }) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  // Define orbit radius
  const radius = 250; // Distance from center

  const garmentTypes = [
    { id: 't-shirt', name: 'T-Shirt', icon: '👕', angle: 0 },
    { id: 'hoodie', name: 'Hoodie', icon: '🧥', angle: 72 },
    { id: 'tank-top', name: 'Tank Top', icon: '🎽', angle: 144 },
    { id: 'polo', name: 'Polo', icon: '👔', angle: 216 },
    { id: 'sweatshirt', name: 'Sweatshirt', icon: '👚', angle: 288 },
  ];

  return (
    <div className="relative w-full h-[calc(100vh-4rem)] bg-[#0B0D10] overflow-hidden perspective-1000 flex items-center justify-center">
      {/* Background Star Field Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#1B1F2A_0%,_#0B0D10_100%)] opacity-50" />
      
      {/* Rotating Galaxy Container */}
      <motion.div
        className="relative size-[600px] flex items-center justify-center"
      >
        {/* Connecting Lines (SVG Layer inside rotating container) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <defs>
            <linearGradient id="lineGradient" x1="50%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#E6C36A" stopOpacity="1" />
              <stop offset="100%" stopColor="#E6C36A" stopOpacity="0.2" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          {garmentTypes.map((item) => {
            // Calculate position on the circle
            const radian = (item.angle * Math.PI) / 180;
            const x = 300 + radius * Math.cos(radian);
            const y = 300 + radius * Math.sin(radian);

            return (
              <motion.line
                key={item.id}
                x1="300"
                y1="300"
                x2={x}
                y2={y}
                stroke="url(#lineGradient)"
                strokeWidth={hoveredItem === item.id ? 3 : 1.5}
                strokeOpacity={hoveredItem === item.id ? 1 : 0.5}
                filter="url(#glow)"
              />
            );
          })}
        </svg>

        {/* Center Star (Logo) */}
        <div className="absolute z-10 w-64 h-64 flex items-center justify-center">
             <div className="w-full h-full relative group cursor-default">
              {/* Enhanced Glow Effect */}
              <div className="absolute inset-0 bg-white opacity-20 blur-3xl rounded-full" />
              <div className="absolute inset-0 bg-white opacity-10 blur-xl rounded-full animate-pulse" />
              
              {/* The Star Logo */}
              <div className="relative z-10 drop-shadow-[0_0_50px_rgba(255,255,255,0.8)] w-full h-full">
                <Logo showText={false} fill="#0B0D10" />
              </div>
            </div>
        </div>

        {/* Orbiting Items */}
        {garmentTypes.map((item) => {
          const radian = (item.angle * Math.PI) / 180;
          const x = radius * Math.cos(radian);
          const y = radius * Math.sin(radian);

          return (
            <motion.button
              key={item.id}
              className="absolute z-20 group"
              style={{ 
                x, 
                y,
              }}
              onClick={() => onSelect(item.id)}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className={`
                relative w-32 h-32 rounded-full bg-[#0B0D10] border-2 border-[#1E2230] 
                flex flex-col items-center justify-center gap-2 transition-all duration-300
                group-hover:border-[#E6C36A] group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(230,195,106,0.3)]
                shadow-xl
              `}>
                <div className="text-4xl filter drop-shadow-lg transform transition-transform group-hover:scale-110">
                  {item.icon}
                </div>
                <span className="text-[#F5F6F8] font-['Playfair_Display'] font-medium text-sm tracking-wide group-hover:text-[#E6C36A] transition-colors absolute -bottom-8 w-max">
                  {item.name}
                </span>
              </div>
            </motion.button>
          );
        })}
      </motion.div>

      {/* Instructions */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <p className="text-[#8A8F98] text-sm uppercase tracking-widest mb-2">Select a garment to design</p>
        <div className="w-1 h-8 bg-gradient-to-b from-[#E6C36A] to-transparent mx-auto" />
      </motion.div>
    </div>
  );
};

// Main Design Studio Component
export function DesignStudio() {
  const { navigate } = useApp();
  const [view, setView] = useState<'selection' | 'studio'>('selection');
  const [garmentType, setGarmentType] = useState('t-shirt');
  const [garmentColor, setGarmentColor] = useState('#FFFFFF');
  const [size, setSize] = useState('M');
  const [fit, setFit] = useState('regular');
  const [fabric, setFabric] = useState('cotton');
  const [designElements, setDesignElements] = useState<DesignElement[]>([]);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const colors = [
    { name: 'White', value: '#FFFFFF' },
    { name: 'Black', value: '#000000' },
    { name: 'Navy', value: '#1E3A8A' },
    { name: 'Red', value: '#DC2626' },
    { name: 'Green', value: '#16A34A' },
    { name: 'Purple', value: '#9333EA' },
    { name: 'Pink', value: '#EC4899' },
    { name: 'Gray', value: '#6B7280' },
  ];

  const handleGarmentSelect = (id: string) => {
    setGarmentType(id);
    setView('studio');
  };

  const addText = () => {
    const newElement: DesignElement = {
      id: Date.now().toString(),
      type: 'text',
      content: 'Your Text Here',
      x: 150,
      y: 200,
      width: 200,
      height: 50,
      rotation: 0,
      color: '#000000',
      fontSize: 24,
    };
    setDesignElements([...designElements, newElement]);
    setSelectedElement(newElement.id);
  };

  const addImage = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const newElement: DesignElement = {
            id: Date.now().toString(),
            type: 'image',
            content: event.target?.result as string,
            x: 150,
            y: 150,
            width: 150,
            height: 150,
            rotation: 0,
          };
          setDesignElements([...designElements, newElement]);
          setSelectedElement(newElement.id);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const deleteElement = (id: string) => {
    setDesignElements(designElements.filter(el => el.id !== id));
    if (selectedElement === id) {
      setSelectedElement(null);
    }
  };

  const updateElement = (id: string, updates: Partial<DesignElement>) => {
    setDesignElements(designElements.map(el =>
      el.id === id ? { ...el, ...updates } : el
    ));
  };

  const selectedElementData = designElements.find(el => el.id === selectedElement);

  return (
    <Layout>
      <AnimatePresence mode="wait">
        {view === 'selection' ? (
          <motion.div
            key="selection"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <SelectionView onSelect={handleGarmentSelect} />
          </motion.div>
        ) : (
          <motion.div
            key="studio"
            className="h-[calc(100vh-4rem)] flex overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            {/* Left Sidebar - Design Tools */}
            <div className="w-80 bg-[#141720] border-r border-[#1E2230] overflow-y-auto custom-scrollbar">
              <div className="p-6 space-y-6">
                <div className="flex items-center gap-2 mb-6">
                  <button 
                    onClick={() => setView('selection')}
                    className="p-2 hover:bg-[#1E2230] rounded-lg text-[#8A8F98] hover:text-[#E6C36A] transition-colors"
                  >
                    <ChevronLeft className="size-5" />
                  </button>
                  <h2 className="text-xl font-['Playfair_Display'] font-bold text-[#F5F6F8]">Design Studio</h2>
                </div>
                
                {/* Selected Item Info */}
                <div className="p-4 bg-[#1B1F2A] rounded-lg border border-[#1E2230] flex items-center gap-3">
                  <div className="size-10 bg-[#0B0D10] rounded-lg flex items-center justify-center text-xl">
                    {garmentType === 't-shirt' && '👕'}
                    {garmentType === 'hoodie' && '🧥'}
                    {garmentType === 'tank-top' && '🎽'}
                    {garmentType === 'polo' && '👔'}
                    {garmentType === 'sweatshirt' && '👚'}
                  </div>
                  <div>
                    <p className="text-[#F5F6F8] font-medium capitalize">{garmentType.replace('-', ' ')}</p>
                    <button 
                      onClick={() => setView('selection')}
                      className="text-xs text-[#E6C36A] hover:underline"
                    >
                      Change Item
                    </button>
                  </div>
                </div>

                {/* Size */}
                <div>
                  <label className="block text-[#8A8F98] mb-3 text-sm font-medium">Size</label>
                  <div className="flex gap-2">
                    {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((s) => (
                      <button
                        key={s}
                        onClick={() => setSize(s)}
                        className={`flex-1 py-2 rounded-lg border transition-all text-sm font-medium ${
                          size === s
                            ? 'border-[#E6C36A] bg-[#E6C36A] text-[#0B0D10]'
                            : 'border-[#1E2230] bg-[#0B0D10] text-[#8A8F98] hover:border-[#8A8F98]'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Fit */}
                <div>
                  <label className="block text-[#8A8F98] mb-3 text-sm font-medium">Fit</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['slim', 'regular', 'loose'].map((f) => (
                      <button
                        key={f}
                        onClick={() => setFit(f)}
                        className={`py-2 px-3 rounded-lg border capitalize transition-all text-sm font-medium ${
                          fit === f
                            ? 'border-[#E6C36A] bg-[#E6C36A] text-[#0B0D10]'
                            : 'border-[#1E2230] bg-[#0B0D10] text-[#8A8F98] hover:border-[#8A8F98]'
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Fabric */}
                <div>
                  <label className="block text-[#8A8F98] mb-3 text-sm font-medium">Fabric</label>
                  <select
                    value={fabric}
                    onChange={(e) => setFabric(e.target.value)}
                    className="w-full p-3 rounded-lg border border-[#1E2230] bg-[#0B0D10] text-[#F5F6F8] focus:border-[#E6C36A] focus:outline-none"
                  >
                    <option value="cotton">100% Cotton</option>
                    <option value="polyester">Polyester Blend</option>
                    <option value="organic">Organic Cotton</option>
                    <option value="bamboo">Bamboo Fabric</option>
                    <option value="linen">Linen</option>
                  </select>
                </div>

                {/* Color */}
                <div>
                  <label className="block text-[#8A8F98] mb-3 text-sm font-medium">Garment Color</label>
                  <div className="grid grid-cols-4 gap-2">
                    {colors.map((color) => (
                      <button
                        key={color.value}
                        onClick={() => setGarmentColor(color.value)}
                        className={`aspect-square rounded-lg border-2 transition-all ${
                          garmentColor === color.value
                            ? 'border-[#E6C36A] scale-110'
                            : 'border-[#1E2230] hover:border-[#8A8F98]'
                        }`}
                        style={{ backgroundColor: color.value }}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>

                {/* Design Tools */}
                <div>
                  <label className="block text-[#8A8F98] mb-3 text-sm font-medium">Add Elements</label>
                  <div className="space-y-2">
                    <button
                      onClick={addText}
                      className="w-full flex items-center gap-3 p-3 rounded-lg border border-[#1E2230] bg-[#0B0D10] text-[#F5F6F8] hover:border-[#E6C36A] hover:text-[#E6C36A] transition-all"
                    >
                      <Type className="size-5" />
                      <span>Add Text</span>
                    </button>
                    <button
                      onClick={addImage}
                      className="w-full flex items-center gap-3 p-3 rounded-lg border border-[#1E2230] bg-[#0B0D10] text-[#F5F6F8] hover:border-[#E6C36A] hover:text-[#E6C36A] transition-all"
                    >
                      <Upload className="size-5" />
                      <span>Upload Image</span>
                    </button>
                  </div>
                </div>

                {/* Element Properties */}
                {selectedElementData && (
                  <div className="p-4 bg-[#1B1F2A] rounded-lg border border-[#1E2230]">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[#F5F6F8] text-sm font-medium">Properties</span>
                      <button
                        onClick={() => deleteElement(selectedElementData.id)}
                        className="text-[#E74C3C] hover:text-red-400"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>

                    {selectedElementData.type === 'text' && (
                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs text-[#8A8F98] mb-1">Text</label>
                          <input
                            type="text"
                            value={selectedElementData.content}
                            onChange={(e) => updateElement(selectedElementData.id, { content: e.target.value })}
                            className="w-full p-2 rounded bg-[#0B0D10] border border-[#1E2230] text-[#F5F6F8] text-sm focus:border-[#E6C36A] focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-[#8A8F98] mb-1">Font Size</label>
                          <input
                            type="range"
                            min="12"
                            max="72"
                            value={selectedElementData.fontSize}
                            onChange={(e) => updateElement(selectedElementData.id, { fontSize: parseInt(e.target.value) })}
                            className="w-full accent-[#E6C36A]"
                          />
                          <span className="text-xs text-[#8A8F98]">{selectedElementData.fontSize}px</span>
                        </div>
                        <div>
                          <label className="block text-xs text-[#8A8F98] mb-1">Color</label>
                          <input
                            type="color"
                            value={selectedElementData.color}
                            onChange={(e) => updateElement(selectedElementData.id, { color: e.target.value })}
                            className="w-full h-8 rounded bg-transparent border-none cursor-pointer"
                          />
                        </div>
                      </div>
                    )}

                    <div className="mt-3">
                      <label className="block text-xs text-[#8A8F98] mb-1">Rotation</label>
                      <input
                        type="range"
                        min="0"
                        max="360"
                        value={selectedElementData.rotation}
                        onChange={(e) => updateElement(selectedElementData.id, { rotation: parseInt(e.target.value) })}
                        className="w-full accent-[#E6C36A]"
                      />
                      <span className="text-xs text-[#8A8F98]">{selectedElementData.rotation}°</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Canvas Area */}
            <div className="flex-1 bg-[#0B0D10] flex flex-col relative">
              {/* Toolbar */}
              <div className="bg-[#141720] border-b border-[#1E2230] p-4 flex items-center justify-between z-10">
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-[#1E2230] rounded-lg text-[#8A8F98] hover:text-[#F5F6F8]" title="Undo">
                    <Undo className="size-5" />
                  </button>
                  <button className="p-2 hover:bg-[#1E2230] rounded-lg text-[#8A8F98] hover:text-[#F5F6F8]" title="Redo">
                    <Redo className="size-5" />
                  </button>
                  <div className="w-px h-6 bg-[#1E2230] mx-2" />
                  <button className="p-2 hover:bg-[#1E2230] rounded-lg text-[#8A8F98] hover:text-[#F5F6F8]" title="Zoom In">
                    <ZoomIn className="size-5" />
                  </button>
                  <button className="p-2 hover:bg-[#1E2230] rounded-lg text-[#8A8F98] hover:text-[#F5F6F8]" title="Zoom Out">
                    <ZoomOut className="size-5" />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#1E2230] text-[#F5F6F8] hover:bg-[#1E2230] transition-colors">
                    <Save className="size-5" />
                    <span className="hidden sm:inline">Save Draft</span>
                  </button>
                  <button 
                    onClick={() => navigate('manufacturer-selection')}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#E6C36A] text-[#0B0D10] hover:brightness-110 transition-colors font-medium"
                  >
                    <ShoppingCart className="size-5" />
                    <span className="hidden sm:inline">Order Now</span>
                  </button>
                </div>
              </div>

              {/* Canvas */}
              <div className="flex-1 p-8 flex items-center justify-center overflow-auto bg-[radial-gradient(circle_at_center,_#1B1F2A_0%,_#0B0D10_100%)]">
                <div
                  ref={canvasRef}
                  className="relative shadow-2xl rounded-lg transition-all duration-300"
                  style={{
                    width: '500px',
                    height: '600px',
                    backgroundColor: garmentColor,
                    boxShadow: '0 0 50px rgba(0,0,0,0.5)',
                  }}
                >
                  {/* Garment Template */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
                    <div className="text-9xl filter blur-sm">
                      {garmentType === 't-shirt' && '👕'}
                      {garmentType === 'hoodie' && '🧥'}
                      {garmentType === 'tank-top' && '🎽'}
                      {garmentType === 'polo' && '👔'}
                      {garmentType === 'sweatshirt' && '👚'}
                    </div>
                  </div>

                  {/* Design Elements */}
                  {designElements.map((element) => (
                    <div
                      key={element.id}
                      className={`absolute cursor-move group ${
                        selectedElement === element.id ? 'ring-2 ring-[#E6C36A] ring-offset-2 ring-offset-transparent' : ''
                      }`}
                      style={{
                        left: element.x,
                        top: element.y,
                        width: element.width,
                        height: element.height,
                        transform: `rotate(${element.rotation}deg)`,
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedElement(element.id);
                      }}
                    >
                      {element.type === 'text' ? (
                        <div
                          style={{
                            color: element.color,
                            fontSize: element.fontSize,
                            fontWeight: 'bold',
                            whiteSpace: 'nowrap',
                            textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                          }}
                        >
                          {element.content}
                        </div>
                      ) : (
                        <img
                          src={element.content}
                          alt="Design element"
                          className="w-full h-full object-contain drop-shadow-lg"
                          draggable={false}
                        />
                      )}
                      {/* Selection Indicators */}
                      {selectedElement === element.id && (
                        <>
                          <div className="absolute -top-2 -left-2 size-4 bg-[#E6C36A] rounded-full border border-[#0B0D10]" />
                          <div className="absolute -top-2 -right-2 size-4 bg-[#E6C36A] rounded-full border border-[#0B0D10]" />
                          <div className="absolute -bottom-2 -left-2 size-4 bg-[#E6C36A] rounded-full border border-[#0B0D10]" />
                          <div className="absolute -bottom-2 -right-2 size-4 bg-[#E6C36A] rounded-full border border-[#0B0D10]" />
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Info */}
              <div className="bg-[#141720] border-t border-[#1E2230] p-4">
                <div className="flex items-center justify-between text-sm text-[#8A8F98]">
                  <div>
                    <span className="text-[#F5F6F8] font-medium capitalize">{garmentType.replace('-', ' ')}</span>
                    <span className="mx-2">•</span>
                    Size {size}
                    <span className="mx-2">•</span>
                    {fit.charAt(0).toUpperCase() + fit.slice(1)} Fit
                    <span className="mx-2">•</span>
                    {fabric}
                  </div>
                  <div>
                    {designElements.length} element{designElements.length !== 1 ? 's' : ''}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}
