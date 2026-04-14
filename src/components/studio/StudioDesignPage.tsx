import React, { useState } from 'react';
import { useApp } from '../../App';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, Save, X, Scissors, Ruler, Palette, 
  Type, Image as ImageIcon, Star, Plus, Minus
} from 'lucide-react';

// Tool definitions
const tools = [
  { id: 'cut', label: 'Cut & Shape', icon: Scissors },
  { id: 'fit', label: 'Fit & Measurements', icon: Ruler },
  { id: 'color', label: 'Color', icon: Palette },
  { id: 'text', label: 'Add Text', icon: Type },
  { id: 'image', label: 'Add Image/Logo', icon: ImageIcon }
];

// Color palette
const colors = [
  '#FFFFFF', '#F5F5F5', '#E5E7EB', '#6B7280', '#0B0D10', '#000000',
  '#E6C36A', '#D4AF37', '#FF0000', '#0000FF', '#00FF00', '#FF00FF'
];

export function StudioDesignPage() {
  const { navigate, routeParams } = useApp();
  const garmentType = routeParams?.garmentType || 't-shirt';
  
  const [showToolPanel, setShowToolPanel] = useState(false);
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [showFinishModal, setShowFinishModal] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  
  // Design state
  const [garmentColor, setGarmentColor] = useState('#FFFFFF');
  const [textElements, setTextElements] = useState<any[]>([]);
  const [measurements, setMeasurements] = useState({
    chest: 100,
    waist: 85,
    sleeves: 65,
    shoulders: 45
  });

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const deltaX = e.clientX - dragStart.x;
      const deltaY = e.clientY - dragStart.y;
      setRotation({
        x: rotation.x + deltaY * 0.5,
        y: rotation.y + deltaX * 0.5
      });
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY * -0.001;
    setZoom(Math.max(0.5, Math.min(2, zoom + delta)));
  };

  const handleToolClick = (toolId: string) => {
    setActiveTool(toolId);
    setShowToolPanel(true);
  };

  const handleStarClick = () => {
    setShowToolPanel(!showToolPanel);
  };

  const handleBack = () => {
    navigate('studio-entry');
  };

  const handleSaveDraft = () => {
    setShowFinishModal(false);
    // Save logic here
    navigate('brand-dashboard');
  };

  const handleContinueToProduction = () => {
    setShowFinishModal(false);
    navigate('studio-fabric-selection', { garmentType, design: { color: garmentColor, measurements } });
  };

  return (
    <div className="fixed inset-0 bg-[#F5F5F5]">
      {/* Minimal Header */}
      <header className="fixed top-0 left-0 right-0 h-[60px] bg-white border-b border-[#E5E7EB] z-40">
        <div className="h-full px-6 flex items-center justify-between">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-[#6B7280] hover:text-[#0B0D10] transition-colors"
          >
            <ChevronLeft className="size-5" />
            <span className="text-xs uppercase tracking-wide">Back</span>
          </button>

          <div className="text-center">
            <h1 className="text-sm uppercase tracking-wide font-medium text-[#0B0D10]">
              Studio — {garmentType.replace('-', ' ')}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFinishModal(true)}
              className="flex items-center gap-2 px-4 py-2 border border-[#E5E7EB] text-xs uppercase tracking-wide text-[#0B0D10] hover:bg-[#FAFAFA] transition-colors"
            >
              <Save className="size-4" />
              Save Draft
            </button>
            <button
              onClick={handleBack}
              className="text-[#6B7280] hover:text-[#0B0D10] transition-colors"
            >
              <X className="size-5" />
            </button>
          </div>
        </div>
      </header>

      {/* 3D Garment Viewport */}
      <div 
        className="absolute inset-0 pt-[60px] flex items-center justify-center cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      >
        {/* 3D Model Placeholder (using CSS 3D transforms for demo) */}
        <motion.div
          style={{
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${zoom})`,
            transformStyle: 'preserve-3d'
          }}
          className="relative"
        >
          {/* Simple T-Shirt Shape */}
          <svg
            width="400"
            height="500"
            viewBox="0 0 400 500"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.15))' }}
          >
            {/* T-Shirt Body */}
            <path
              d="M120 120 L120 450 L280 450 L280 120 Z"
              fill={garmentColor}
              stroke="#0B0D10"
              strokeWidth="2"
            />
            {/* Sleeves */}
            <path
              d="M120 120 L60 180 L60 220 L120 200 Z"
              fill={garmentColor}
              stroke="#0B0D10"
              strokeWidth="2"
            />
            <path
              d="M280 120 L340 180 L340 220 L280 200 Z"
              fill={garmentColor}
              stroke="#0B0D10"
              strokeWidth="2"
            />
            {/* Collar */}
            <path
              d="M160 120 L160 100 L200 80 L240 100 L240 120 Z"
              fill={garmentColor}
              stroke="#0B0D10"
              strokeWidth="2"
            />
            {/* Seam Lines */}
            <line x1="200" y1="120" x2="200" y2="450" stroke="#E5E7EB" strokeWidth="1" />
            <line x1="120" y1="200" x2="280" y2="200" stroke="#E5E7EB" strokeWidth="1" />
          </svg>

          {/* Text Elements Overlay */}
          {textElements.map((text, index) => (
            <motion.div
              key={index}
              drag
              className="absolute text-2xl font-bold"
              style={{
                top: text.y,
                left: text.x,
                color: text.color
              }}
            >
              {text.content}
            </motion.div>
          ))}
        </motion.div>

        {/* Zoom Controls */}
        <div className="absolute bottom-8 left-8 flex flex-col gap-2">
          <button
            onClick={() => setZoom(Math.min(2, zoom + 0.1))}
            className="size-10 bg-white border border-[#E5E7EB] flex items-center justify-center hover:bg-[#FAFAFA] transition-colors"
          >
            <Plus className="size-4" />
          </button>
          <button
            onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}
            className="size-10 bg-white border border-[#E5E7EB] flex items-center justify-center hover:bg-[#FAFAFA] transition-colors"
          >
            <Minus className="size-4" />
          </button>
        </div>

        {/* View Info */}
        <div className="absolute top-24 left-8 text-xs text-[#6B7280] space-y-1">
          <p>Drag to rotate</p>
          <p>Scroll to zoom</p>
          <p className="font-mono">Zoom: {(zoom * 100).toFixed(0)}%</p>
        </div>
      </div>

      {/* Floating Star Tool Controller */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: 1, 
          opacity: 1,
          y: [0, -10, 0]
        }}
        transition={{
          scale: { duration: 0.5, delay: 0.5 },
          y: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
        }}
        className="fixed right-12 top-1/2 -translate-y-1/2 z-30"
      >
        <button
          onClick={handleStarClick}
          className="size-16 bg-[#0B0D10] flex items-center justify-center hover:bg-black transition-all shadow-xl hover:scale-110"
          style={{
            clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
          }}
        >
          <Star className="size-6 text-[#E6C36A] fill-[#E6C36A]" />
        </button>
      </motion.div>

      {/* Tool Panel (Expandable from Star) */}
      <AnimatePresence>
        {showToolPanel && (
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            className="fixed right-12 top-1/2 -translate-y-1/2 z-20"
            style={{ marginRight: '80px' }}
          >
            <div className="bg-white border-2 border-[#0B0D10] shadow-2xl p-4 w-64">
              <h3 className="text-xs uppercase tracking-wide font-medium text-[#0B0D10] mb-4 pb-3 border-b border-[#E5E7EB]">
                Tools
              </h3>
              <div className="space-y-2">
                {tools.map((tool) => {
                  const Icon = tool.icon;
                  const isActive = activeTool === tool.id;
                  return (
                    <button
                      key={tool.id}
                      onClick={() => handleToolClick(tool.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 text-left transition-all ${
                        isActive 
                          ? 'bg-[#0B0D10] text-white' 
                          : 'hover:bg-[#FAFAFA] text-[#0B0D10]'
                      }`}
                    >
                      <Icon className="size-4" />
                      <span className="text-xs uppercase tracking-wide">{tool.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tool Window (Bottom Left - Contextual) */}
      <AnimatePresence>
        {activeTool && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-8 left-8 z-30 bg-white border-2 border-[#0B0D10] shadow-2xl p-6 w-96"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm uppercase tracking-wide font-medium text-[#0B0D10]">
                {tools.find(t => t.id === activeTool)?.label}
              </h3>
              <button
                onClick={() => setActiveTool(null)}
                className="text-[#6B7280] hover:text-[#0B0D10]"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Color Tool */}
            {activeTool === 'color' && (
              <div>
                <p className="text-xs text-[#6B7280] mb-3">Select garment color</p>
                <div className="grid grid-cols-6 gap-2">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setGarmentColor(color)}
                      className="size-10 border-2 hover:scale-110 transition-transform"
                      style={{
                        backgroundColor: color,
                        borderColor: garmentColor === color ? '#E6C36A' : '#E5E7EB'
                      }}
                    />
                  ))}
                </div>
                <div className="mt-4">
                  <p className="text-xs text-[#6B7280] mb-2">Current color</p>
                  <div className="flex items-center gap-3">
                    <div 
                      className="size-12 border-2 border-[#E5E7EB]"
                      style={{ backgroundColor: garmentColor }}
                    />
                    <p className="text-sm font-mono text-[#0B0D10]">{garmentColor}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Fit Tool */}
            {activeTool === 'fit' && (
              <div className="space-y-4">
                {Object.entries(measurements).map(([key, value]) => (
                  <div key={key}>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs uppercase tracking-wide text-[#6B7280]">
                        {key}
                      </label>
                      <span className="text-sm font-mono text-[#0B0D10]">{value} cm</span>
                    </div>
                    <input
                      type="range"
                      min="50"
                      max="150"
                      value={value}
                      onChange={(e) => setMeasurements({
                        ...measurements,
                        [key]: parseInt(e.target.value)
                      })}
                      className="w-full accent-[#E6C36A]"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Text Tool */}
            {activeTool === 'text' && (
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Enter text"
                  className="w-full px-3 py-2 border border-[#E5E7EB] text-sm text-[#0B0D10] focus:outline-none focus:border-[#E6C36A]"
                />
                <button
                  onClick={() => {
                    setTextElements([...textElements, {
                      content: 'Sample Text',
                      x: 150,
                      y: 200,
                      color: '#0B0D10'
                    }]);
                  }}
                  className="w-full py-2 bg-[#0B0D10] text-white text-xs uppercase tracking-wide hover:bg-black transition-colors"
                >
                  Add to Garment
                </button>
              </div>
            )}

            {/* Cut & Shape Tool */}
            {activeTool === 'cut' && (
              <div className="text-center py-8">
                <Scissors className="size-12 text-[#6B7280] mx-auto mb-4" />
                <p className="text-xs text-[#6B7280]">
                  Click on garment edges to adjust cut and shape
                </p>
              </div>
            )}

            {/* Image Tool */}
            {activeTool === 'image' && (
              <div>
                <button className="w-full py-3 border-2 border-dashed border-[#E5E7EB] text-xs uppercase tracking-wide text-[#6B7280] hover:border-[#E6C36A] hover:text-[#E6C36A] transition-colors">
                  Upload Image or Logo
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Finish Design Button */}
      <motion.button
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 1 }}
        onClick={() => setShowFinishModal(true)}
        className="fixed bottom-8 right-12 px-8 py-4 bg-[#E6C36A] text-[#0B0D10] text-sm uppercase tracking-wide font-medium hover:bg-[#D4AF37] transition-colors shadow-xl z-30"
      >
        Finish Design
      </motion.button>

      {/* Finish Modal */}
      <AnimatePresence>
        {showFinishModal && (
          <>
            {/* Blur Background */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setShowFinishModal(false)}
            />

            {/* Modal */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border-2 border-[#0B0D10] shadow-2xl p-8 w-[480px] z-50"
            >
              <h2 className="font-['Playfair_Display'] text-2xl text-[#0B0D10] mb-6">
                Finish Design
              </h2>
              <p className="text-sm text-[#6B7280] mb-8 leading-relaxed">
                Save your design as a draft to continue later, or proceed to production to select fabric and manufacturer.
              </p>
              <div className="space-y-3">
                <button
                  onClick={handleSaveDraft}
                  className="w-full py-4 border border-[#E5E7EB] text-sm uppercase tracking-wide text-[#0B0D10] hover:bg-[#FAFAFA] transition-colors"
                >
                  Save as Draft
                </button>
                <button
                  onClick={handleContinueToProduction}
                  className="w-full py-4 bg-[#0B0D10] text-white text-sm uppercase tracking-wide hover:bg-black transition-colors"
                >
                  Continue to Production
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
