import React, { useState } from 'react';
import { useApp } from '../../App';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import svgPaths from '../../imports/svg-wwmtqbnwwc';

// Garment types positioned at each star point
const garmentTypes = [
  { id: 't-shirt', label: 'T-Shirt', angle: 0 },
  { id: 'hoodie', label: 'Hoodie', angle: 60 },
  { id: 'pants', label: 'Pants', angle: 120 },
  { id: 'jacket', label: 'Jacket', angle: 180 },
  { id: 'dress', label: 'Dress', angle: 240 },
  { id: 'accessories', label: 'Accessories', angle: 300 }
];

export function StudioEntryPage() {
  const { navigate } = useApp();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleSelectItem = (itemId: string) => {
    setSelectedItem(itemId);
    setIsTransitioning(true);
    
    // Transition to Studio Design page after animation
    setTimeout(() => {
      navigate('studio-design', { garmentType: itemId });
    }, 1200);
  };

  const handleExit = () => {
    navigate('brand-dashboard');
  };

  return (
    <div className="fixed inset-0 bg-[#FAFAFA] overflow-hidden">
      {/* Subtle Grid Background */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(#0B0D10 1px, transparent 1px), linear-gradient(90deg, #0B0D10 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}
      />

      {/* Exit Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        onClick={handleExit}
        className="fixed top-8 right-8 z-50 flex items-center gap-2 text-[#6B7280] hover:text-[#0B0D10] transition-colors"
      >
        <span className="text-xs uppercase tracking-wide">Exit Studio</span>
        <X className="size-5" />
      </motion.button>

      {/* Central Star Navigation */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ 
            scale: isTransitioning ? 2 : 1, 
            opacity: isTransitioning ? 0 : 1,
            rotate: isTransitioning ? 0 : 360
          }}
          transition={{
            scale: { duration: 1.2, ease: 'easeInOut' },
            opacity: { duration: 1.2 },
            rotate: { duration: 60, ease: 'linear', repeat: Infinity }
          }}
          className="relative"
        >
          {/* Black Star SVG */}
          <div className="relative z-10 w-[240px] h-[240px]">
            <motion.svg
              className="block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 221 212"
              animate={{
                fill: hoveredItem ? '#E6C36A' : (selectedItem ? '#E6C36A' : '#0B0D10')
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.path
                d={svgPaths.p2c226900}
                fill={selectedItem ? '#E6C36A' : '#0B0D10'}
                animate={{
                  fill: hoveredItem ? '#E6C36A' : (selectedItem ? '#E6C36A' : '#0B0D10')
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.svg>
          </div>

          {/* Garment Type Labels at Star Points */}
          <AnimatePresence>
            {!isTransitioning && garmentTypes.map((garment, index) => {
              const isHovered = hoveredItem === garment.id;
              const isSelected = selectedItem === garment.id;
              const isOtherSelected = selectedItem && selectedItem !== garment.id;
              
              // Calculate position (240px radius from center for labels - increased distance)
              const labelRadius = 240;
              const angleRad = (garment.angle - 90) * (Math.PI / 180);
              const x = Math.cos(angleRad) * labelRadius;
              const y = Math.sin(angleRad) * labelRadius;
              
              // Star point position (120px radius - at the star's points)
              const starPointRadius = 120;
              const starPointX = Math.cos(angleRad) * starPointRadius;
              const starPointY = Math.sin(angleRad) * starPointRadius;
              
              // Line length from star point to label
              const lineLength = labelRadius - starPointRadius;

              return (
                <motion.div
                  key={garment.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: isOtherSelected ? 0 : 1,
                    scale: isOtherSelected ? 0 : (isHovered ? 1.2 : 1),
                    x,
                    y
                  }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ 
                    delay: index * 0.1,
                    duration: 0.4
                  }}
                  onHoverStart={() => setHoveredItem(garment.id)}
                  onHoverEnd={() => setHoveredItem(null)}
                  onClick={() => handleSelectItem(garment.id)}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                >
                  {/* Connection Line - from star point to label */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        exit={{ scaleX: 0 }}
                        className="absolute top-1/2 left-1/2 h-[2px] bg-[#E6C36A] origin-left"
                        style={{
                          width: `${lineLength}px`,
                          transform: `translate(-${lineLength}px, -1px) rotate(${garment.angle + 90}deg)`
                        }}
                      />
                    )}
                  </AnimatePresence>

                  {/* Label - counter-rotate to keep text upright */}
                  <div className="relative z-10 text-center">
                    <motion.div
                      animate={{
                        y: isHovered ? -10 : 0,
                        rotate: -360 // Counter-rotate to keep text upright as star rotates
                      }}
                      transition={{
                        y: { duration: 0.3 },
                        rotate: { duration: 60, ease: 'linear', repeat: Infinity }
                      }}
                      className="px-6 py-3 bg-white border-2 border-[#0B0D10] shadow-lg"
                      style={{
                        borderColor: isHovered ? '#E6C36A' : '#0B0D10'
                      }}
                    >
                      <p className="text-sm uppercase tracking-wide font-medium whitespace-nowrap"
                         style={{ color: isHovered ? '#E6C36A' : '#0B0D10' }}>
                        {garment.label}
                      </p>
                    </motion.div>

                    {/* Hover Glow */}
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.3 }}
                        className="absolute inset-0 bg-[#E6C36A] blur-xl -z-10"
                      />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Central Glow Effect */}
          {hoveredItem && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.2, scale: 1.2 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#E6C36A] blur-3xl -z-10"
            />
          )}
        </motion.div>
      </div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="fixed top-8 left-8"
      >
        <h1 className="font-['Playfair_Display'] text-3xl text-[#0B0D10] mb-1">Studio</h1>
        <p className="text-xs uppercase tracking-wide text-[#6B7280]">Select a garment to design</p>
      </motion.div>

      {/* Instruction Text */}
      <AnimatePresence>
        {!hoveredItem && !selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 1.2 }}
            className="fixed bottom-12 left-1/2 -translate-x-1/2 text-center"
          >
            <p className="text-xs uppercase tracking-wide text-[#6B7280]">
              Hover over a garment type to begin
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}