import React, { useState, useMemo } from 'react';
import { useApp } from '../../../App';
import { motion, AnimatePresence } from 'motion/react';
import { Star, X } from 'lucide-react';

const easing = [0.22, 1, 0.36, 1];

// 2D T-Shirt Component (SVG)
function TShirtVisual({ fabric, color }: any) {
  // Fabric texture simulation
  const getTextureStyle = () => {
    if (fabric === 'cotton') return { filter: 'contrast(0.95) brightness(1.02)' };
    if (fabric === 'polyester') return { filter: 'contrast(1.1) brightness(1.1) saturate(1.1)' };
    if (fabric === 'blend') return { filter: 'sepia(0.1) contrast(1.05)' };
    return {};
  };

  return (
    <div className="relative w-[500px] h-[600px] flex items-center justify-center">
      {/* Shadow */}
      <div className="absolute top-[60%] left-1/2 -translate-x-1/2 w-[300px] h-[40px] bg-black/10 blur-xl rounded-[100%]" />
      
      {/* T-Shirt SVG */}
      <svg 
        viewBox="0 0 512 512" 
        className="w-full h-full drop-shadow-2xl transition-all duration-500"
        style={getTextureStyle()}
      >
        <defs>
          <filter id="fabricNoise">
            <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" stitchTiles="stitch"/>
            <feColorMatrix type="saturate" values="0"/>
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.1"/> 
            </feComponentTransfer>
          </filter>
        </defs>
        
        <g transform="translate(0, 40)">
           {/* Main Body */}
           <path 
             d="M128 64 L192 32 L256 48 L320 32 L384 64 L416 160 L384 176 L368 128 L368 448 H144 L144 128 L128 176 L96 160 Z" 
             fill={color}
             stroke="#000000"
             strokeWidth="2"
             strokeLinejoin="round"
           />
           {/* Neck */}
           <path 
             d="M192 32 Q256 80 320 32" 
             fill="none" 
             stroke="#000000" 
             strokeWidth="2"
             strokeOpacity="0.2"
           />
           {/* Texture Overlay */}
           <rect x="96" y="32" width="320" height="416" fill="url(#fabricNoise)" style={{ mixBlendMode: 'multiply' }} opacity="0.4" pointerEvents="none" />
           
           {/* Highlights */}
           <path 
              d="M144 128 L144 448 M368 128 L368 448" 
              fill="none" 
              stroke="#FFFFFF" 
              strokeWidth="1" 
              opacity="0.1" 
           />
        </g>
      </svg>
      
      {/* Fabric Label */}
      <div className="absolute bottom-0 right-10 flex flex-col items-end">
        <span className="text-xs uppercase tracking-widest text-[#0B0B0B]/40 font-mono">Material</span>
        <span className="text-sm font-medium text-[#0B0B0B] uppercase">{fabric}</span>
      </div>
    </div>
  );
}

// Tool Panel Component
function ToolPanel({ tool, onClose, onApply }: any) {
  const [value, setValue] = useState('');
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      transition={{ duration: 0.4, ease: easing }}
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border border-[#E6E6E3] p-8 w-96 z-50"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm uppercase tracking-wider text-[#0B0B0B]">{tool.name}</h3>
        <button onClick={onClose} className="text-[#6E6E6E] hover:text-[#0B0B0B] transition-colors">
          <X size={20} />
        </button>
      </div>

      {tool.id === 'color' && (
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <input
              type="color"
              value={value || '#ffffff'}
              onChange={(e) => setValue(e.target.value)}
              className="w-16 h-16 cursor-pointer border border-[#E6E6E3]"
            />
            <input
              type="text"
              value={value || '#ffffff'}
              onChange={(e) => setValue(e.target.value)}
              placeholder="#FFFFFF"
              className="flex-1 bg-white border border-[#E6E6E3] px-4 py-3 text-sm font-mono text-[#0B0B0B] focus:outline-none focus:border-[#111111]"
            />
          </div>
          <button
            onClick={() => {
              onApply({ color: value || '#ffffff' });
              onClose();
            }}
            className="w-full bg-[#111111] text-white py-3 uppercase tracking-wider text-sm hover:bg-[#0B0B0B] transition-colors"
          >
            Apply
          </button>
        </div>
      )}

      {tool.id === 'fabric' && (
        <div className="space-y-4">
          <select
            value={value || 'cotton'}
            onChange={(e) => setValue(e.target.value)}
            className="w-full bg-white border border-[#E6E6E3] px-4 py-3 text-sm text-[#0B0B0B] focus:outline-none focus:border-[#111111]"
          >
            <option value="cotton">Cotton</option>
            <option value="polyester">Polyester</option>
            <option value="blend">Cotton/Poly Blend</option>
          </select>
          <button
            onClick={() => {
              onApply({ fabric: value || 'cotton' });
              onClose();
            }}
            className="w-full bg-[#111111] text-white py-3 uppercase tracking-wider text-sm hover:bg-[#0B0B0B] transition-colors"
          >
            Apply
          </button>
        </div>
      )}

      {tool.id === 'text' && (
        <div className="space-y-4">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter text..."
            className="w-full bg-white border border-[#E6E6E3] px-4 py-3 text-sm text-[#0B0B0B] focus:outline-none focus:border-[#111111]"
          />
          <select className="w-full bg-white border border-[#E6E6E3] px-4 py-3 text-sm text-[#0B0B0B]">
            <option>Serif</option>
            <option>Sans Serif</option>
            <option>Monospace</option>
          </select>
          <button
            onClick={() => {
              onApply({ text: value });
              onClose();
            }}
            className="w-full bg-[#111111] text-white py-3 uppercase tracking-wider text-sm hover:bg-[#0B0B0B] transition-colors"
          >
            Apply
          </button>
        </div>
      )}

      {tool.id === 'image' && (
        <div className="space-y-4">
          <div className="border-2 border-dashed border-[#E6E6E3] p-8 text-center">
            <p className="text-sm text-[#6E6E6E] mb-2">Upload Image</p>
            <input type="file" accept="image/*" className="text-xs" />
          </div>
          <button
            onClick={onClose}
            className="w-full bg-[#111111] text-white py-3 uppercase tracking-wider text-sm hover:bg-[#0B0B0B] transition-colors"
          >
            Apply
          </button>
        </div>
      )}

      {['pattern', 'measurements', 'fit', 'notes'].includes(tool.id) && (
        <div className="space-y-4">
          <p className="text-sm text-[#6E6E6E]">Tool interface for {tool.name}</p>
          <button
            onClick={onClose}
            className="w-full bg-[#111111] text-white py-3 uppercase tracking-wider text-sm hover:bg-[#0B0B0B] transition-colors"
          >
            Close
          </button>
        </div>
      )}
    </motion.div>
  );
}

// Completion Modal
function CompletionModal({ onContinue, onSaveDraft, onClose }: any) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-[#111111]/60 backdrop-blur-sm z-40 flex items-center justify-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.4, ease: easing }}
        className="bg-white p-12 max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-['Inter_Tight'] tracking-tight text-[#0B0B0B] mb-8">
          Ready to produce?
        </h2>
        
        <div className="space-y-4">
          <button
            onClick={onContinue}
            className="w-full bg-[#111111] text-white py-4 uppercase tracking-wider text-sm hover:bg-[#0B0B0B] transition-colors"
          >
            Continue to Manufacturing
          </button>
          
          <button
            onClick={onSaveDraft}
            className="w-full border border-[#111111] text-[#0B0B0B] py-4 uppercase tracking-wider text-sm hover:bg-[#F7F7F5] transition-colors"
          >
            Save as Draft
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

const tools = [
  { id: 'fabric', name: 'Fabric', icon: '🧵' },
  { id: 'color', name: 'Color', icon: '🎨' },
  { id: 'pattern', name: 'Pattern', icon: '◆' },
  { id: 'text', name: 'Text', icon: 'T' },
  { id: 'image', name: 'Image', icon: '🖼' },
  { id: 'measurements', name: 'Measurements', icon: '📏' },
  { id: 'fit', name: 'Fit', icon: '👕' },
  { id: 'notes', name: 'Notes', icon: '📝' },
];

export function StudioDesignGarment() {
  const { navigate } = useApp();
  const [starExpanded, setStarExpanded] = useState(false);
  const [activeTool, setActiveTool] = useState<any>(null);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  
  // Design state
  const [fabric, setFabric] = useState('cotton');
  const [color, setColor] = useState('#ffffff');

  const handleToolApply = (data: any) => {
    if (data.fabric) setFabric(data.fabric);
    if (data.color) setColor(data.color);
  };

  const handleContinue = () => {
    navigate('studio-select-manufacturer');
  };

  const handleSaveDraft = () => {
    setShowCompletionModal(false);
    // Show notification (would update bell)
    alert('Draft saved successfully');
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] relative">
      {/* 3D Garment Center -> 2D Visual Center */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-full max-w-4xl flex items-center justify-center bg-[#F7F7F5]/50 backdrop-blur-sm">
           <TShirtVisual fabric={fabric} color={color} />
        </div>
      </div>

      {/* Black Star Control Hub - Right Side */}
      <div className="absolute right-12 top-1/2 -translate-y-1/2 z-30">
        <motion.button
          onClick={() => setStarExpanded(!starExpanded)}
          animate={{ 
            scale: starExpanded ? 1.1 : [1, 1.05, 1],
            rotate: starExpanded ? 90 : 0,
          }}
          transition={{
            scale: { duration: 6, repeat: starExpanded ? 0 : Infinity, ease: "easeInOut" },
            rotate: { duration: 0.5, ease: easing }
          }}
          className="relative"
        >
          <Star size={64} className="fill-[#111111] text-[#111111]" strokeWidth={0} />
        </motion.button>

        {/* Tool Menu */}
        <AnimatePresence>
          {starExpanded && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4, ease: easing }}
              className="absolute left-0 top-0 -translate-x-full -translate-y-1/2 pr-8 flex flex-col gap-2"
            >
              {tools.map((tool, index) => (
                <motion.button
                  key={tool.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3, delay: index * 0.05, ease: easing }}
                  onClick={() => setActiveTool(tool)}
                  className="flex items-center gap-3 bg-white border border-[#E6E6E3] px-4 py-3 hover:border-[#111111] hover:bg-[#F7F7F5] transition-all whitespace-nowrap"
                >
                  <span className="text-lg">{tool.icon}</span>
                  <span className="text-xs uppercase tracking-wider text-[#0B0B0B]">{tool.name}</span>
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Tool Panel */}
      <AnimatePresence>
        {activeTool && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#111111]/20 backdrop-blur-sm z-40"
              onClick={() => setActiveTool(null)}
            />
            <ToolPanel
              tool={activeTool}
              onClose={() => setActiveTool(null)}
              onApply={handleToolApply}
            />
          </>
        )}
      </AnimatePresence>

      {/* Completion Modal */}
      <AnimatePresence>
        {showCompletionModal && (
          <CompletionModal
            onContinue={handleContinue}
            onSaveDraft={handleSaveDraft}
            onClose={() => setShowCompletionModal(false)}
          />
        )}
      </AnimatePresence>

      {/* Next Button */}
      <button
        onClick={() => setShowCompletionModal(true)}
        className="absolute bottom-8 right-8 bg-[#111111] text-white px-8 py-4 uppercase tracking-wider text-sm hover:bg-[#0B0B0B] transition-colors"
      >
        Next
      </button>

      {/* Back Button */}
      <button
        onClick={() => navigate('studio-select-garment')}
        className="absolute top-8 left-8 text-sm uppercase tracking-wider text-[#6E6E6E] hover:text-[#0B0B0B] transition-colors"
      >
        ← Back
      </button>
    </div>
  );
}