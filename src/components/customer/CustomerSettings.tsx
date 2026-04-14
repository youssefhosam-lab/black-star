import { useState, useEffect } from 'react';
import { useApp } from '../../App';
import { Bell, ChevronDown, Save, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import Logo from '../../imports/Logo';
import { supabase } from '../../lib/supabase';

type FeedbackState = { type: 'success' | 'error'; message: string } | null;

export function CustomerSettings() {
  const { navigate, user, setUser } = useApp();
  const [activeTab, setActiveTab] = useState<'profile' | 'address' | 'password' | 'notifications'>('profile');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackState>(null);

  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
  });

  const [addressData, setAddressData] = useState({
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  });

  const [passwordData, setPasswordData] = useState({
    new: '',
    confirm: '',
  });

  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    newBrands: false,
    newsletter: false,
  });

  // ✅ تحميل بيانات المستخدم من Supabase عند فتح الصفحة
  useEffect(() => {
    const loadProfile = async () => {
      if (!user?.id) return;
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (data && !error) {
        setProfileData({
          name: data.name || '',
          email: data.email || '',
          phone: data.phone || '',
        });
        setAddressData({
          street: data.street || '',
          city: data.city || '',
          state: data.state || '',
          zip: data.zip || '',
          country: data.country || '',
        });
        if (data.notifications) {
          setNotifications(data.notifications);
        }
      }
    };
    loadProfile();
  }, [user?.id]);

  const showFeedback = (type: 'success' | 'error', message: string) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 3500);
  };

  // ✅ حفظ بيانات الـ Profile
  const handleSaveProfile = async () => {
    if (!user?.id) return;
    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          name: profileData.name,
          phone: profileData.phone,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);

      if (error) throw error;

      setUser({ ...user, name: profileData.name });
      showFeedback('success', 'Profile saved successfully!');
    } catch (err: any) {
      showFeedback('error', err.message || 'Failed to save profile.');
    }
    setLoading(false);
  };

  // ✅ حفظ العنوان
  const handleSaveAddress = async () => {
    if (!user?.id) return;
    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          street: addressData.street,
          city: addressData.city,
          state: addressData.state,
          zip: addressData.zip,
          country: addressData.country,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);

      if (error) throw error;
      showFeedback('success', 'Address saved successfully!');
    } catch (err: any) {
      showFeedback('error', err.message || 'Failed to save address.');
    }
    setLoading(false);
  };

  // ✅ تغيير كلمة المرور
  const handleSavePassword = async () => {
    if (passwordData.new !== passwordData.confirm) {
      showFeedback('error', 'Passwords do not match.');
      return;
    }
    if (passwordData.new.length < 6) {
      showFeedback('error', 'Password must be at least 6 characters.');
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: passwordData.new });
      if (error) throw error;
      setPasswordData({ new: '', confirm: '' });
      showFeedback('success', 'Password updated successfully!');
    } catch (err: any) {
      showFeedback('error', err.message || 'Failed to update password.');
    }
    setLoading(false);
  };

  // ✅ حفظ إعدادات الإشعارات
  const handleSaveNotifications = async () => {
    if (!user?.id) return;
    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ notifications, updated_at: new Date().toISOString() })
        .eq('id', user.id);

      if (error) throw error;
      showFeedback('success', 'Preferences saved successfully!');
    } catch (err: any) {
      showFeedback('error', err.message || 'Failed to save preferences.');
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate('welcome');
  };

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
              return (
                <button
                  key={item}
                  onClick={() => navigate(route)}
                  className="text-sm font-medium text-[#9CA3AF] hover:text-[#E6C36A] transition-colors tracking-wide"
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

      {/* ✅ Feedback Toast */}
      {feedback && (
        <div className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-lg shadow-lg text-sm font-medium transition-all ${
          feedback.type === 'success'
            ? 'bg-green-50 border border-green-200 text-green-700'
            : 'bg-red-50 border border-red-200 text-red-700'
        }`}>
          {feedback.type === 'success'
            ? <CheckCircle className="w-4 h-4 shrink-0" />
            : <AlertCircle className="w-4 h-4 shrink-0" />
          }
          {feedback.message}
        </div>
      )}

      {/* Settings Content */}
      <div className="container mx-auto px-6 py-16">
        <h1 className="text-5xl font-['Playfair_Display'] font-bold text-[#0B0D10] mb-16">
          Settings
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="space-y-2">
              {[
                { id: 'profile', label: 'Profile Info' },
                { id: 'address', label: 'Address' },
                { id: 'password', label: 'Password' },
                { id: 'notifications', label: 'Notifications' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-[#0B0D10] text-white'
                      : 'text-[#0B0D10] hover:bg-[#E5E7EB]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors mt-8"
              >
                Logout
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">

            {/* Profile Info */}
            {activeTab === 'profile' && (
              <div className="border border-[#E5E7EB] p-8">
                <h2 className="text-2xl font-['Playfair_Display'] font-bold text-[#0B0D10] mb-8">
                  Profile Information
                </h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-[#0B0D10] mb-2 uppercase tracking-wide">Full Name</label>
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      className="w-full px-4 py-3 border border-[#E5E7EB] text-[#0B0D10] focus:border-[#0B0D10] focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#0B0D10] mb-2 uppercase tracking-wide">Email Address</label>
                    <input
                      type="email"
                      value={profileData.email}
                      disabled
                      className="w-full px-4 py-3 border border-[#E5E7EB] text-[#9CA3AF] bg-[#F9FAFB] cursor-not-allowed"
                    />
                    <p className="text-xs text-[#9CA3AF] mt-1">Email cannot be changed here.</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#0B0D10] mb-2 uppercase tracking-wide">Phone Number</label>
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-[#E5E7EB] text-[#0B0D10] focus:border-[#0B0D10] focus:outline-none transition-colors"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <button
                    onClick={handleSaveProfile}
                    disabled={loading}
                    className="px-8 py-3 bg-[#0B0D10] text-white font-medium hover:opacity-90 transition-opacity flex items-center gap-2 disabled:opacity-60"
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-5 h-5" />}
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {/* Address */}
            {activeTab === 'address' && (
              <div className="border border-[#E5E7EB] p-8">
                <h2 className="text-2xl font-['Playfair_Display'] font-bold text-[#0B0D10] mb-8">
                  Shipping Address
                </h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-[#0B0D10] mb-2 uppercase tracking-wide">Street Address</label>
                    <input
                      type="text"
                      value={addressData.street}
                      onChange={(e) => setAddressData({ ...addressData, street: e.target.value })}
                      className="w-full px-4 py-3 border border-[#E5E7EB] text-[#0B0D10] focus:border-[#0B0D10] focus:outline-none transition-colors"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#0B0D10] mb-2 uppercase tracking-wide">City</label>
                      <input
                        type="text"
                        value={addressData.city}
                        onChange={(e) => setAddressData({ ...addressData, city: e.target.value })}
                        className="w-full px-4 py-3 border border-[#E5E7EB] text-[#0B0D10] focus:border-[#0B0D10] focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#0B0D10] mb-2 uppercase tracking-wide">State</label>
                      <input
                        type="text"
                        value={addressData.state}
                        onChange={(e) => setAddressData({ ...addressData, state: e.target.value })}
                        className="w-full px-4 py-3 border border-[#E5E7EB] text-[#0B0D10] focus:border-[#0B0D10] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#0B0D10] mb-2 uppercase tracking-wide">ZIP Code</label>
                      <input
                        type="text"
                        value={addressData.zip}
                        onChange={(e) => setAddressData({ ...addressData, zip: e.target.value })}
                        className="w-full px-4 py-3 border border-[#E5E7EB] text-[#0B0D10] focus:border-[#0B0D10] focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#0B0D10] mb-2 uppercase tracking-wide">Country</label>
                      <input
                        type="text"
                        value={addressData.country}
                        onChange={(e) => setAddressData({ ...addressData, country: e.target.value })}
                        className="w-full px-4 py-3 border border-[#E5E7EB] text-[#0B0D10] focus:border-[#0B0D10] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                  <button
                    onClick={handleSaveAddress}
                    disabled={loading}
                    className="px-8 py-3 bg-[#0B0D10] text-white font-medium hover:opacity-90 transition-opacity flex items-center gap-2 disabled:opacity-60"
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-5 h-5" />}
                    Save Address
                  </button>
                </div>
              </div>
            )}

            {/* Password */}
            {activeTab === 'password' && (
              <div className="border border-[#E5E7EB] p-8">
                <h2 className="text-2xl font-['Playfair_Display'] font-bold text-[#0B0D10] mb-8">
                  Change Password
                </h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-[#0B0D10] mb-2 uppercase tracking-wide">New Password</label>
                    <input
                      type="password"
                      value={passwordData.new}
                      onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
                      className="w-full px-4 py-3 border border-[#E5E7EB] text-[#0B0D10] focus:border-[#0B0D10] focus:outline-none transition-colors"
                      placeholder="•••••••• (6+ characters)"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#0B0D10] mb-2 uppercase tracking-wide">Confirm New Password</label>
                    <input
                      type="password"
                      value={passwordData.confirm}
                      onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
                      className="w-full px-4 py-3 border border-[#E5E7EB] text-[#0B0D10] focus:border-[#0B0D10] focus:outline-none transition-colors"
                      placeholder="••••••••"
                    />
                  </div>
                  <button
                    onClick={handleSavePassword}
                    disabled={loading}
                    className="px-8 py-3 bg-[#0B0D10] text-white font-medium hover:opacity-90 transition-opacity flex items-center gap-2 disabled:opacity-60"
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-5 h-5" />}
                    Update Password
                  </button>
                </div>
              </div>
            )}

            {/* Notifications */}
            {activeTab === 'notifications' && (
              <div className="border border-[#E5E7EB] p-8">
                <h2 className="text-2xl font-['Playfair_Display'] font-bold text-[#0B0D10] mb-8">
                  Notification Preferences
                </h2>
                <div className="space-y-6">
                  {[
                    { key: 'orderUpdates', label: 'Order Updates', desc: 'Receive notifications about your order status' },
                    { key: 'newBrands', label: 'New Brands', desc: 'Discover when new brands join the platform' },
                    { key: 'newsletter', label: 'Newsletter', desc: 'Monthly updates and insights' },
                  ].map((item) => (
                    <div key={item.key} className="flex items-start justify-between py-4 border-b border-[#E5E7EB] last:border-0">
                      <div>
                        <p className="text-sm font-medium text-[#0B0D10] mb-1">{item.label}</p>
                        <p className="text-xs text-[#9CA3AF]">{item.desc}</p>
                      </div>
                      <button
                        onClick={() => setNotifications({
                          ...notifications,
                          [item.key]: !notifications[item.key as keyof typeof notifications],
                        })}
                        className={`relative w-12 h-6 rounded-full transition-colors ${
                          notifications[item.key as keyof typeof notifications] ? 'bg-[#0B0D10]' : 'bg-[#E5E7EB]'
                        }`}
                      >
                        <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                          notifications[item.key as keyof typeof notifications] ? 'right-1' : 'left-1'
                        }`} />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={handleSaveNotifications}
                    disabled={loading}
                    className="px-8 py-3 bg-[#0B0D10] text-white font-medium hover:opacity-90 transition-opacity flex items-center gap-2 mt-6 disabled:opacity-60"
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-5 h-5" />}
                    Save Preferences
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}