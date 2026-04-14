import React, { useState } from 'react';
import { useApp } from '../../../App';
import { motion, AnimatePresence } from 'motion/react';
import { Star } from 'lucide-react';

const easing = [0.22, 1, 0.36, 1];

// Garment types with their positions in a circle
const garments = [
  { id: 'tshirt', name: 'T-Shirt', icon: '👕', angle: 0 },
  { id: 'hoodie', name: 'Hoodie', icon: '🧥', angle: 51.43 },
  { id: 'jacket', name: 'Jacket', icon: '🧥', angle: 102.86 },
  { id: 'pants', name: 'Pants', icon: '👖', angle: 154.29 },
  { id: 'dress', name: 'Dress', icon: '👗', angle: 205.71 },
  { id: 'shirt', name: 'Shirt', icon: '👔', angle: 257.14 },
  { id: 'accessories', name: 'Accessories', icon: '👜', angle: 308.57 },
];

// Simple SVG icons for garments
const GarmentIcon = ({ type, filled }: { type: string; filled: boolean }) => {
  const baseClass = filled ? 'fill-[#111111]/80' : 'fill-none';
  
  if (type === 'tshirt') {
    return (
      <svg width="48" height="48" viewBox="0 0 48 48" className={baseClass} stroke="#111111" strokeWidth="1.5">
        <path d="M14 12L20 8L24 10L28 8L34 12L36 24V40H12V24L14 12Z" />
        <path d="M20 8V14M28 8V14" />
      </svg>
    );
  }
  if (type === 'hoodie') {
    return (
      <svg width="48" height="48" viewBox="0 0 48 48" className={baseClass} stroke="#111111" strokeWidth="1.5">
        <path d="M14 12L20 8L24 10L28 8L34 12L36 24V40H12V24L14 12Z" />
        <circle cx="24" cy="12" r="4" />
      </svg>
    );
  }
  if (type === 'jacket') {
    return (
      <svg width="48" height="48" viewBox="0 0 48 48" className={baseClass} stroke="#111111" strokeWidth="1.5">
        <path d="M14 12L20 8L24 12L28 8L34 12V40H28V20L24 16L20 20V40H14V12Z" />
      </svg>
    );
  }
  if (type === 'pants') {
    return (
      <svg width="48" height="48" viewBox="0 0 48 48" className={baseClass} stroke="#111111" strokeWidth="1.5">
        <path d="M16 8H32L30 24L28 40H20L18 24L16 8Z" />
        <path d="M24 8V24" />
      </svg>
    );
  }
  if (type === 'dress') {
    return (
      <svg width="48" height="48" viewBox="0 0 48 48" className={baseClass} stroke="#111111" strokeWidth="1.5">
        <path d="M18 8L22 6L26 6L30 8L32 20L36 40H12L16 20L18 8Z" />
      </svg>
    );
  }
  if (type === 'shirt') {
    return (
      <svg width="48" height="48" viewBox="0 0 48 48" className={baseClass} stroke="#111111" strokeWidth="1.5">
        <path d="M14 14L20 10L24 12L28 10L34 14V40H14V14Z" />
        <path d="M24 12V40M20 20H28" />
      </svg>
    );
  }
  if (type === 'accessories') {
    return (
      <svg width="48" height="48" viewBox="0 0 48 48" className={baseClass} stroke="#111111" strokeWidth="1.5">
        <rect x="12" y="16" width="24" height="20" rx="2" />
        <path d="M16 16V12C16 10 18 10 18 10H30C30 10 32 10 32 12V16" />
      </svg>
    );
  }
  return null;
};

export function StudioSelectGarment() {
  const { navigate } = useApp();
  const [hoveredGarment, setHoveredGarment] = useState<string | null>(null);
  const [selectedGarment, setSelectedGarment] = useState<string | null>(null);
  const [rotationPaused, setRotationPaused] = useState(false);

  const handleGarmentClick = (garmentId: string) => {
    setSelectedGarment(garmentId);
    setTimeout(() => {
      navigate('studio-design-garment', { garmentType: garmentId });
    }, 800);
  };

  const radius = 280;

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center relative overflow-hidden">
      {/* Center Black Star */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ 
          scale: selectedGarment ? 0.85 : 1,
          opacity: 1 
        }}
        transition={{ duration: 0.6, ease: easing }}
        className="relative z-10"
      >
        <motion.div
          animate={{ 
            scale: selectedGarment ? 0.95 : [1, 1.02, 1],
          }}
          transition={{ 
            duration: 6,
            repeat: selectedGarment ? 0 : Infinity,
            ease: "easeInOut"
          }}
        >
          <Star 
            size={120} 
            className="fill-[#111111] text-[#111111]" 
            strokeWidth={0}
          />
        </motion.div>

        {/* Garment name appears below star on hover */}
        <AnimatePresence>
          {hoveredGarment && !selectedGarment && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: easing }}
              className="absolute top-full left-1/2 -translate-x-1/2 mt-8 text-center"
            >
              <p className="text-sm uppercase tracking-wider text-[#0B0B0B]">
                {garments.find(g => g.id === hoveredGarment)?.name}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Orbiting Garments */}
      <div className="absolute inset-0 flex items-center justify-center">
        {garments.map((garment, index) => {
          const angle = garment.angle;
          const isHovered = hoveredGarment === garment.id;
          const isSelected = selectedGarment === garment.id;
          
          return (
            <motion.div
              key={garment.id}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{
                opacity: isSelected && selectedGarment !== garment.id ? 0 : 1,
                scale: isSelected ? 1.5 : 1,
                x: isSelected ? 0 : Math.cos((angle * Math.PI) / 180) * radius,
                y: isSelected ? 0 : Math.sin((angle * Math.PI) / 180) * radius,
                rotate: rotationPaused || isHovered ? 0 : [0, 360],
              }}
              transition={{
                opacity: { duration: 0.4 },
                scale: { duration: 0.6, ease: easing },
                x: { duration: isSelected ? 0.8 : 0.6, ease: easing },
                y: { duration: isSelected ? 0.8 : 0.6, ease: easing },
                rotate: {
                  duration: 120,
                  repeat: Infinity,
                  ease: "linear",
                },
                delay: index * 0.1,
              }}
              className="absolute cursor-pointer"
              style={{
                transformOrigin: 'center',
              }}
              onMouseEnter={() => {
                setHoveredGarment(garment.id);
                setRotationPaused(true);
              }}
              onMouseLeave={() => {
                setHoveredGarment(null);
                setRotationPaused(false);
              }}
              onClick={() => handleGarmentClick(garment.id)}
            >
              <motion.div
                animate={{
                  scale: isHovered ? 1.15 : 1,
                }}
                transition={{ duration: 0.3, ease: easing }}
              >
                <GarmentIcon type={garment.id} filled={isHovered || isSelected} />
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Back button */}
      <button
        onClick={() => navigate('localbrand-dashboard')}
        className="absolute top-8 left-8 text-sm uppercase tracking-wider text-[#6E6E6E] hover:text-[#0B0B0B] transition-colors"
      >
        ← Back
      </button>
    </div>
  );
}