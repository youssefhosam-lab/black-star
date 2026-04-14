import { useState } from 'react';
import { useApp } from '../../App';
import { User, Mail, Phone, MapPin, Building2, Save, Bell, Shield, Eye, Factory, Palette } from 'lucide-react';
import { LocalBrandHeader } from './LocalBrandHeader';
import { motion, AnimatePresence } from 'motion/react';

export function LocalBrandSettings() {
  const { user } = useApp();
  const [brandName, setBrandName] = useState(user?.brandName || user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [website, setWebsite] = useState('');
  const [instagram, setInstagram] = useState('');
  const [showSaveMessage, setShowSaveMessage] = useState(false);

  // Preferences state
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [statusUpdates, setStatusUpdates] = useState(true);
  const [manufacturerContact, setManufacturerContact] = useState(false);
  const [marketingEmails, setMarketingEmails] = useState(true);

  const handleSave = () => {
    // Save logic here
    setShowSaveMessage(true);
    setTimeout(() => setShowSaveMessage(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#F7F7F5]">
      <LocalBrandHeader activePage="dashboard" />

      <div className="container mx-auto px-6 py-16">
        <div className="max-w-5xl mx-auto">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h1 className="text-4xl font-['Inter_Tight'] text-[#0F0F12] mb-3">
              Settings
            </h1>
            <p className="text-[#0F0F12]/60 text-sm uppercase tracking-wider">
              Configure your brand presence and platform preferences
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white border border-[#0F0F12]/10 p-6 sticky top-24"
              >
                <nav className="space-y-2">
                  {[
                    { icon: Building2, label: 'Brand Profile', active: true },
                    { icon: Bell, label: 'Notifications', active: false },
                    { icon: Shield, label: 'Privacy', active: false },
                    { icon: Eye, label: 'Appearance', active: false },
                  ].map((item, idx) => (
                    <button
                      key={idx}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-xs uppercase tracking-wider transition-colors ${
                        item.active
                          ? 'bg-[#0F0F12] text-white'
                          : 'text-[#0F0F12]/60 hover:text-[#0F0F12] hover:bg-[#F7F7F5]'
                      }`}
                    >
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </button>
                  ))}
                </nav>
              </motion.div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Brand Information Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white border border-[#0F0F12]/10"
              >
                <div className="p-8 border-b border-[#0F0F12]/10">
                  <div className="flex items-center gap-3 mb-2">
                    <Building2 className="w-5 h-5 text-[#0F0F12]" />
                    <h2 className="text-xl font-['Inter_Tight'] text-[#0F0F12]">
                      Brand Information
                    </h2>
                  </div>
                  <p className="text-sm text-[#0F0F12]/60">
                    Your public brand identity on Black Star
                  </p>
                </div>
                
                <div className="p-8 space-y-6">
                  {/* Brand Name */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#0F0F12]/60 mb-2">
                      Brand Name
                    </label>
                    <input
                      type="text"
                      value={brandName}
                      onChange={(e) => setBrandName(e.target.value)}
                      className="w-full px-4 py-3 bg-[#F7F7F5] border border-[#0F0F12]/20 text-[#0F0F12] placeholder-[#0F0F12]/40 focus:border-[#0F0F12] focus:outline-none transition-colors font-['Inter']"
                      placeholder="Your Brand Name"
                    />
                  </div>

                  {/* Email & Phone Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#0F0F12]/60 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 bg-[#F7F7F5] border border-[#0F0F12]/20 text-[#0F0F12] placeholder-[#0F0F12]/40 focus:border-[#0F0F12] focus:outline-none transition-colors font-['Inter']"
                        placeholder="brand@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#0F0F12]/60 mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-3 bg-[#F7F7F5] border border-[#0F0F12]/20 text-[#0F0F12] placeholder-[#0F0F12]/40 focus:border-[#0F0F12] focus:outline-none transition-colors font-['Inter']"
                        placeholder="+20 123 456 7890"
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#0F0F12]/60 mb-2">
                      Address
                    </label>
                    <textarea
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 bg-[#F7F7F5] border border-[#0F0F12]/20 text-[#0F0F12] placeholder-[#0F0F12]/40 focus:border-[#0F0F12] focus:outline-none transition-colors resize-none font-['Inter']"
                      placeholder="Your brand address"
                    />
                  </div>

                  {/* Social Media */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#0F0F12]/60 mb-2">
                        Website
                      </label>
                      <input
                        type="url"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        className="w-full px-4 py-3 bg-[#F7F7F5] border border-[#0F0F12]/20 text-[#0F0F12] placeholder-[#0F0F12]/40 focus:border-[#0F0F12] focus:outline-none transition-colors font-['Inter']"
                        placeholder="https://yourbrand.com"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#0F0F12]/60 mb-2">
                        Instagram
                      </label>
                      <input
                        type="text"
                        value={instagram}
                        onChange={(e) => setInstagram(e.target.value)}
                        className="w-full px-4 py-3 bg-[#F7F7F5] border border-[#0F0F12]/20 text-[#0F0F12] placeholder-[#0F0F12]/40 focus:border-[#0F0F12] focus:outline-none transition-colors font-['Inter']"
                        placeholder="@yourbrand"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#0F0F12]/60 mb-2">
                      Brand Description
                    </label>
                    <textarea
                      value={description}
                      onChange={(e) => {
                        if (e.target.value.length <= 500) {
                          setDescription(e.target.value);
                        }
                      }}
                      rows={6}
                      className="w-full px-4 py-3 bg-[#F7F7F5] border border-[#0F0F12]/20 text-[#0F0F12] placeholder-[#0F0F12]/40 focus:border-[#0F0F12] focus:outline-none transition-colors resize-none font-['Inter']"
                      placeholder="Tell the story of your brand..."
                    />
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-xs text-[#0F0F12]/60 italic">
                        Fashion without illusion
                      </p>
                      <p className={`text-xs font-['IBM_Plex_Mono'] ${description.length > 450 ? 'text-red-600' : 'text-[#0F0F12]/60'}`}>
                        {description.length}/500
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Notifications Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white border border-[#0F0F12]/10"
              >
                <div className="p-8 border-b border-[#0F0F12]/10">
                  <div className="flex items-center gap-3 mb-2">
                    <Bell className="w-5 h-5 text-[#0F0F12]" />
                    <h2 className="text-xl font-['Inter_Tight'] text-[#0F0F12]">
                      Notifications
                    </h2>
                  </div>
                  <p className="text-sm text-[#0F0F12]/60">
                    Control your notification preferences
                  </p>
                </div>
                
                <div className="p-8 space-y-6">
                  {/* Notification Options */}
                  {[
                    { 
                      id: 'email',
                      label: 'Email Notifications',
                      description: 'Receive email alerts for new orders and updates',
                      checked: emailNotifications,
                      onChange: setEmailNotifications
                    },
                    { 
                      id: 'status',
                      label: 'Production Status Updates',
                      description: 'Get notified when production stages are completed',
                      checked: statusUpdates,
                      onChange: setStatusUpdates
                    },
                    { 
                      id: 'contact',
                      label: 'Manufacturer Contact',
                      description: 'Allow manufacturers to reach you directly',
                      checked: manufacturerContact,
                      onChange: setManufacturerContact
                    },
                    { 
                      id: 'marketing',
                      label: 'Platform Updates',
                      description: 'Receive news about new features and platform improvements',
                      checked: marketingEmails,
                      onChange: setMarketingEmails
                    },
                  ].map((option) => (
                    <label
                      key={option.id}
                      className="flex items-start gap-4 cursor-pointer group"
                    >
                      <div className="relative mt-1">
                        <input
                          type="checkbox"
                          checked={option.checked}
                          onChange={(e) => option.onChange(e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-5 h-5 border-2 border-[#0F0F12]/20 bg-[#F7F7F5] peer-checked:bg-[#0F0F12] peer-checked:border-[#0F0F12] transition-all" />
                        <div className="absolute inset-0 flex items-center justify-center text-white opacity-0 peer-checked:opacity-100 transition-opacity">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                          </svg>
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-[#0F0F12] group-hover:opacity-80 transition-opacity">
                          {option.label}
                        </p>
                        <p className="text-xs text-[#0F0F12]/60 mt-1">
                          {option.description}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              </motion.div>

              {/* Manufacturing Preferences */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white border border-[#0F0F12]/10"
              >
                <div className="p-8 border-b border-[#0F0F12]/10">
                  <div className="flex items-center gap-3 mb-2">
                    <Factory className="w-5 h-5 text-[#0F0F12]" />
                    <h2 className="text-xl font-['Inter_Tight'] text-[#0F0F12]">
                      Manufacturing Preferences
                    </h2>
                  </div>
                  <p className="text-sm text-[#0F0F12]/60">
                    Default settings for production orders
                  </p>
                </div>
                
                <div className="p-8 space-y-6">
                  {/* Preferred Lead Time */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#0F0F12]/60 mb-3">
                      Preferred Lead Time
                    </label>
                    <div className="flex gap-3">
                      {['7-10 days', '14-21 days', '30+ days'].map((time) => (
                        <button
                          key={time}
                          className="flex-1 px-4 py-3 bg-[#F7F7F5] border border-[#0F0F12]/20 text-[#0F0F12] hover:border-[#0F0F12] transition-colors text-sm"
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Minimum Order Quantity */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#0F0F12]/60 mb-2">
                      Default Order Quantity
                    </label>
                    <input
                      type="number"
                      defaultValue={100}
                      min={50}
                      step={50}
                      className="w-full px-4 py-3 bg-[#F7F7F5] border border-[#0F0F12]/20 text-[#0F0F12] focus:border-[#0F0F12] focus:outline-none transition-colors font-['IBM_Plex_Mono']"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Save Button */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex items-center justify-between pt-6"
              >
                <button
                  onClick={handleSave}
                  className="px-8 py-4 bg-[#0F0F12] text-white font-medium hover:bg-[#0E1A2B] transition-colors flex items-center gap-3 uppercase tracking-wider text-sm"
                >
                  <Save className="w-5 h-5" />
                  Save Changes
                </button>

                <button className="text-sm uppercase tracking-wider text-[#0F0F12]/60 hover:text-[#0F0F12] transition-colors">
                  Reset to Default
                </button>
              </motion.div>
            </div>
          </div>

          {/* Success Message */}
          <AnimatePresence>
            {showSaveMessage && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="fixed bottom-8 right-8 bg-white text-[#0B0B0B] px-6 py-4 shadow-2xl border border-[#E6E6E3] flex items-center gap-3"
              >
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <p className="text-sm uppercase tracking-wider font-medium">
                  Settings saved successfully
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}