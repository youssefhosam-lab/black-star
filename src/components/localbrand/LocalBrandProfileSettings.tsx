import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Camera, Building2, Mail, Phone, MapPin, Users, Save } from 'lucide-react';

interface LocalBrandProfileSettingsProps {
  onClose: () => void;
}

export function LocalBrandProfileSettings({ onClose }: LocalBrandProfileSettingsProps) {
  const [formData, setFormData] = useState({
    brandName: 'Urban Threads Co.',
    email: 'contact@urbanthreads.co',
    phone: '+1 (555) 987-6543',
    location: 'Los Angeles, CA',
    teamSize: 12,
    website: 'www.urbanthreads.co',
    description: 'Contemporary streetwear brand focusing on sustainable fashion and local manufacturing.',
    profileImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.name === 'teamSize' ? parseInt(e.target.value) || 0 : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      onClose();
    }, 1500);
  };

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
        className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#0F0F12]/10 p-6 flex items-center justify-between z-10">
          <h2 className="text-2xl font-['Inter_Tight'] text-[#0F0F12]">Brand Profile</h2>
          <button onClick={onClose} className="p-2 hover:bg-[#F7F7F5] transition-colors">
            <X className="w-6 h-6 text-[#0F0F12]" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Brand Logo */}
          <div className="flex flex-col items-center">
            <div className="relative group">
              <div
                className="w-32 h-32 rounded-full bg-cover bg-center border-4 border-[#0F0F12]/10"
                style={{ backgroundImage: `url(${formData.profileImage})` }}
              />
              <button className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="w-8 h-8 text-white" />
              </button>
            </div>
            <p className="text-sm text-[#0F0F12]/60 mt-3">Click to change brand logo</p>
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            {/* Brand Name */}
            <div>
              <label className="flex items-center gap-2 text-sm uppercase tracking-wider text-[#0F0F12] mb-2">
                <Building2 className="w-4 h-4" />
                Brand Name
              </label>
              <input
                type="text"
                name="brandName"
                value={formData.brandName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-[#0F0F12]/20 focus:border-[#0F0F12] focus:outline-none transition-colors"
              />
            </div>

            {/* Email */}
            <div>
              <label className="flex items-center gap-2 text-sm uppercase tracking-wider text-[#0F0F12] mb-2">
                <Mail className="w-4 h-4" />
                Contact Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-[#0F0F12]/20 focus:border-[#0F0F12] focus:outline-none transition-colors"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="flex items-center gap-2 text-sm uppercase tracking-wider text-[#0F0F12] mb-2">
                <Phone className="w-4 h-4" />
                Contact Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-[#0F0F12]/20 focus:border-[#0F0F12] focus:outline-none transition-colors"
              />
            </div>

            {/* Location */}
            <div>
              <label className="flex items-center gap-2 text-sm uppercase tracking-wider text-[#0F0F12] mb-2">
                <MapPin className="w-4 h-4" />
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-[#0F0F12]/20 focus:border-[#0F0F12] focus:outline-none transition-colors"
              />
            </div>

            {/* Team Size */}
            <div>
              <label className="flex items-center gap-2 text-sm uppercase tracking-wider text-[#0F0F12] mb-2">
                <Users className="w-4 h-4" />
                Team Size
              </label>
              <input
                type="number"
                name="teamSize"
                value={formData.teamSize}
                onChange={handleChange}
                min="1"
                className="w-full px-4 py-3 border border-[#0F0F12]/20 focus:border-[#0F0F12] focus:outline-none transition-colors"
              />
            </div>

            {/* Website */}
            <div>
              <label className="flex items-center gap-2 text-sm uppercase tracking-wider text-[#0F0F12] mb-2">
                Website
              </label>
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-[#0F0F12]/20 focus:border-[#0F0F12] focus:outline-none transition-colors"
              />
            </div>

            {/* Description */}
            <div>
              <label className="flex items-center gap-2 text-sm uppercase tracking-wider text-[#0F0F12] mb-2">
                Brand Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border border-[#0F0F12]/20 focus:border-[#0F0F12] focus:outline-none transition-colors resize-none"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-6 border-t border-[#0F0F12]/10">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-[#0F0F12]/20 text-[#0F0F12] hover:bg-[#F7F7F5] transition-colors text-sm uppercase tracking-wider"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex-1 px-6 py-3 bg-[#0F0F12] text-white hover:bg-[#0E1A2B] transition-colors text-sm uppercase tracking-wider flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
