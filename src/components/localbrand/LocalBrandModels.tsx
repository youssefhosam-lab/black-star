import React, { useState } from 'react';
import { useApp } from '../../App';
import { motion, AnimatePresence } from 'motion/react';
import { X, Ruler } from 'lucide-react';

// Model Card Component
const ModelCard = ({ model, onClick }: { model: any; onClick: () => void }) => {
  const [colorProgress, setColorProgress] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      onClick={onClick}
      onMouseEnter={() => setColorProgress(100)}
      onMouseLeave={() => setColorProgress(0)}
      className="bg-white border border-[#0F0F12]/10 hover:border-[#5B7C99] transition-all duration-400 cursor-pointer overflow-hidden group"
    >
      {/* Portrait */}
      <div className="aspect-[3/4] overflow-hidden relative">
        <div
          className="w-full h-full bg-cover bg-center transition-all duration-700"
          style={{
            backgroundImage: `url(${model.image})`,
            filter: `grayscale(${100 - colorProgress}%)`,
          }}
        />
        
        {/* Measurements Overlay */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: colorProgress > 0 ? 1 : 0, y: colorProgress > 0 ? 0 : 20 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white"
        >
          <div className="flex items-center gap-4 text-sm font-['IBM_Plex_Mono']">
            <div>
              <p className="text-white/60 text-xs mb-1">Height</p>
              <p>{model.measurements.height} cm</p>
            </div>
            <div>
              <p className="text-white/60 text-xs mb-1">Chest</p>
              <p>{model.measurements.chest} cm</p>
            </div>
            <div>
              <p className="text-white/60 text-xs mb-1">Waist</p>
              <p>{model.measurements.waist} cm</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Name */}
      <div className="p-4">
        <h3 className="text-lg text-[#0F0F12]">{model.name}</h3>
        <p className="text-sm text-[#0F0F12]/60">{model.location}</p>
        
        {/* Rating & Rate */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#0F0F12]/10">
          <div>
            <p className="text-xs text-[#0F0F12]/60 mb-1">Rating</p>
            <p className="text-sm font-['IBM_Plex_Mono'] text-[#0F0F12]">{model.stats.rating}/100</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-[#0F0F12]/60 mb-1">Daily Rate</p>
            <p className="text-sm font-['IBM_Plex_Mono'] text-[#0F0F12]">{model.rate.currency}{model.rate.daily}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Model Profile Modal
const ModelProfileModal = ({ model, onClose, onInvite }: { model: any; onClose: () => void; onInvite: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#0F0F12]/10 p-6 flex items-center justify-between z-10">
          <h2 className="text-2xl font-['Inter_Tight'] text-[#0F0F12]">Model Profile</h2>
          <button onClick={onClose} className="p-2 hover:bg-[#F7F7F5] transition-colors">
            <X className="w-6 h-6 text-[#0F0F12]" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Portrait */}
            <div className="aspect-[3/4] bg-cover bg-center" style={{ backgroundImage: `url(${model.image})` }} />

            {/* Details */}
            <div className="space-y-6">
              <div>
                <h3 className="text-3xl font-['Inter_Tight'] text-[#0F0F12] mb-2">{model.name}</h3>
                <p className="text-[#0F0F12]/60">{model.location}</p>
              </div>

              {/* Measurements */}
              <div className="border-t border-[#0F0F12]/10 pt-6">
                <div className="flex items-center gap-2 mb-4">
                  <Ruler className="w-5 h-5 text-[#0F0F12]" />
                  <h4 className="text-sm uppercase tracking-wider text-[#0F0F12]">Measurements</h4>
                </div>
                <div className="grid grid-cols-3 gap-4 font-['IBM_Plex_Mono']">
                  <div>
                    <p className="text-xs text-[#0F0F12]/60 mb-1">Height</p>
                    <p className="text-lg text-[#0F0F12]">{model.measurements.height} cm</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#0F0F12]/60 mb-1">Chest</p>
                    <p className="text-lg text-[#0F0F12]">{model.measurements.chest} cm</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#0F0F12]/60 mb-1">Waist</p>
                    <p className="text-lg text-[#0F0F12]">{model.measurements.waist} cm</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#0F0F12]/60 mb-1">Hips</p>
                    <p className="text-lg text-[#0F0F12]">{model.measurements.hips} cm</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#0F0F12]/60 mb-1">Shoulders</p>
                    <p className="text-lg text-[#0F0F12]">{model.measurements.shoulders} cm</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#0F0F12]/60 mb-1">Sleeve</p>
                    <p className="text-lg text-[#0F0F12]">{model.measurements.sleeve} cm</p>
                  </div>
                </div>
              </div>

              {/* Experience */}
              <div className="border-t border-[#0F0F12]/10 pt-6">
                <h4 className="text-sm uppercase tracking-wider text-[#0F0F12] mb-3">Experience</h4>
                <p className="text-[#0F0F12]/70 leading-relaxed">{model.experience}</p>
              </div>

              {/* Stats */}
              <div className="border-t border-[#0F0F12]/10 pt-6">
                <div className="grid grid-cols-2 gap-4 font-['IBM_Plex_Mono']">
                  <div>
                    <p className="text-xs text-[#0F0F12]/60 mb-1">Completed Jobs</p>
                    <p className="text-2xl text-[#0F0F12]">{model.stats.completedJobs}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#0F0F12]/60 mb-1">Rating</p>
                    <p className="text-2xl text-[#0F0F12]">{model.stats.rating}/100</p>
                  </div>
                </div>
              </div>

              {/* Rate */}
              <div className="border-t border-[#0F0F12]/10 pt-6">
                <div className="grid grid-cols-2 gap-4 font-['IBM_Plex_Mono']">
                  <div>
                    <p className="text-xs text-[#0F0F12]/60 mb-1">Daily Rate</p>
                    <p className="text-2xl text-[#0F0F12]">{model.rate.currency}{model.rate.daily}</p>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={onInvite}
                className="w-full px-6 py-4 bg-[#0F0F12] text-white hover:bg-[#0E1A2B] transition-all duration-300 text-sm uppercase tracking-wider"
              >
                Invite Model
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Invitation Sent Notification
const InvitationSent = ({ modelName, onClose }: { modelName: string; onClose: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed top-6 right-6 bg-white border border-[#0F0F12]/10 shadow-lg p-6 max-w-sm z-50"
    >
      <h3 className="text-lg font-['Inter_Tight'] text-[#0F0F12] mb-2">Invitation Sent</h3>
      <p className="text-sm text-[#0F0F12]/70 mb-4">
        Your invitation to {modelName} has been sent. Waiting for response.
      </p>
      <button
        onClick={onClose}
        className="text-sm uppercase tracking-wider text-[#0F0F12]/60 hover:text-[#0F0F12] transition-colors"
      >
        Close
      </button>
    </motion.div>
  );
};

export function LocalBrandModels() {
  const { navigate } = useApp();
  const [selectedModel, setSelectedModel] = useState<any>(null);
  const [showInvite, setShowInvite] = useState(false);

  const models = [
    {
      id: 1,
      name: 'Sofia Andersen',
      location: 'Copenhagen',
      image: 'https://images.unsplash.com/photo-1656438496600-bd46536ac165?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbW9kZWwlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzY2ODIwMDM5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      measurements: { height: 178, chest: 86, waist: 64, hips: 92, shoulders: 40, sleeve: 60 },
      experience: '5 years of experience in fashion modeling. Specialized in editorial and runway. Previously worked with multiple independent brands.',
      stats: { completedJobs: 42, rating: 96 },
      rate: { daily: 850, currency: '$' },
    },
    {
      id: 2,
      name: 'Marcus Silva',
      location: 'Lisbon',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      measurements: { height: 185, chest: 98, waist: 78, hips: 96, shoulders: 48, sleeve: 65 },
      experience: '3 years in fashion. Experience with streetwear and contemporary designs. Strong editorial portfolio.',
      stats: { completedJobs: 28, rating: 92 },
      rate: { daily: 650, currency: '$' },
    },
    {
      id: 3,
      name: 'Elena Kovac',
      location: 'Berlin',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      measurements: { height: 175, chest: 84, waist: 62, hips: 90, shoulders: 38, sleeve: 58 },
      experience: '7 years of modeling experience. Versatile with runway, editorial, and commercial work. Works with sustainable fashion brands.',
      stats: { completedJobs: 67, rating: 98 },
      rate: { daily: 950, currency: '$' },
    },
    {
      id: 4,
      name: 'Kai Zhang',
      location: 'Tokyo',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      measurements: { height: 182, chest: 94, waist: 76, hips: 94, shoulders: 46, sleeve: 63 },
      experience: '4 years in fashion industry. Specialized in contemporary menswear. Experience with international campaigns.',
      stats: { completedJobs: 35, rating: 94 },
      rate: { daily: 750, currency: '$' },
    },
  ];

  const handleInvite = (model: any) => {
    setSelectedModel(null);
    setShowInvite(true);
    setTimeout(() => {
      setShowInvite(false);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-[#F7F7F5]">
      {/* Header */}
      <header className="bg-[#F7F7F5] border-b border-[#0F0F12]/10 sticky top-0 z-40">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-['Inter_Tight'] tracking-tight text-[#0F0F12]">Models</h1>
            <div className="w-20" />
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-6 py-12 bg-[#FAFAFA]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-['Inter_Tight'] text-[#0F0F12] mb-2">Available Models</h2>
          <p className="text-[#0F0F12]/60">Select models for your next production</p>
        </motion.div>

        {/* Model Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {models.map((model) => (
            <ModelCard
              key={model.id}
              model={model}
              onClick={() => setSelectedModel(model)}
            />
          ))}
        </div>
      </div>

      {/* Model Profile Modal */}
      <AnimatePresence>
        {selectedModel && (
          <ModelProfileModal
            model={selectedModel}
            onClose={() => setSelectedModel(null)}
            onInvite={() => handleInvite(selectedModel)}
          />
        )}
      </AnimatePresence>

      {/* Invitation Sent Notification */}
      <AnimatePresence>
        {showInvite && (
          <InvitationSent
            modelName={selectedModel ? selectedModel.name : ''}
            onClose={() => setShowInvite(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}