import { useState } from 'react';
import { useApp } from '../../App';
import { 
  Bell, 
  ChevronDown, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Edit,
  User,
  ShoppingBag,
  Activity,
  Palette,
  Settings as SettingsIcon,
  CheckCircle,
  Clock,
  Package,
  Star
} from 'lucide-react';
import { motion } from 'motion/react';
import Logo from '../../imports/Logo';

type TabType = 'overview' | 'orders' | 'activity' | 'designs' | 'settings';

export function CustomerProfilePage() {
  const { navigate, user, setUser } = useApp();
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  // Mock customer data
  const customerData = {
    name: user?.name || 'Customer Name',
    email: user?.email || 'customer@blackstar.com',
    phone: '+966 50 123 4567',
    location: 'Riyadh, Saudi Arabia',
    joinDate: 'January 15, 2024',
    status: 'Active',
    avatar: user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400',
    stats: {
      totalOrders: 12,
      activeDesigns: 3,
      completedOrders: 8,
      totalSpent: 4850
    }
  };

  // Mock orders data
  const orders = [
    {
      id: 'ORD-001',
      name: 'Black Hoodie',
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400',
      status: 'In Production',
      date: '2024-03-01',
      total: 450
    },
    {
      id: 'ORD-002',
      name: 'White T-Shirt',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
      status: 'Delivered',
      date: '2024-02-28',
      total: 280
    },
    {
      id: 'ORD-003',
      name: 'Denim Jacket',
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400',
      status: 'Shipped',
      date: '2024-02-25',
      total: 780
    }
  ];

  // Mock activity data
  const activities = [
    {
      id: '1',
      type: 'order',
      description: 'Placed a new order for Black Hoodie',
      date: '2024-03-01',
      time: '14:30'
    },
    {
      id: '2',
      type: 'design',
      description: 'Created a new design in Studio',
      date: '2024-02-28',
      time: '10:15'
    },
    {
      id: '3',
      type: 'review',
      description: 'Left a review for White T-Shirt',
      date: '2024-02-27',
      time: '16:45'
    }
  ];

  // Mock designs data
  const designs = [
    {
      id: '1',
      name: 'Custom Hoodie Design',
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400',
      status: 'Draft',
      lastModified: '2024-03-01'
    },
    {
      id: '2',
      name: 'Summer Collection T-Shirt',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
      status: 'Completed',
      lastModified: '2024-02-28'
    },
    {
      id: '3',
      name: 'Vintage Denim Jacket',
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400',
      status: 'In Progress',
      lastModified: '2024-02-25'
    }
  ];

  const tabs = [
    { id: 'overview' as TabType, label: 'Overview', icon: User },
    { id: 'orders' as TabType, label: 'Orders', icon: ShoppingBag },
    { id: 'activity' as TabType, label: 'Activity', icon: Activity },
    { id: 'designs' as TabType, label: 'Designs', icon: Palette },
    { id: 'settings' as TabType, label: 'Settings', icon: SettingsIcon }
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-500';
      case 'in production':
        return 'bg-blue-500';
      case 'shipped':
        return 'bg-purple-500';
      case 'delivered':
        return 'bg-green-500';
      case 'draft':
        return 'bg-gray-500';
      case 'completed':
        return 'bg-green-500';
      case 'in progress':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header - Sticky Minimal */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#E5E7EB]">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="w-8 h-8 text-[#0B0D10] cursor-pointer" onClick={() => navigate('customer-dashboard')}>
            <Logo showText={false} />
          </div>

          {/* Center Navigation */}
          <nav className="hidden md:flex items-center gap-12">
            {['Dashboard', 'Studio', 'Orders', 'Community', 'Shop'].map((item) => (
              <button
                key={item}
                onClick={() => {
                  if (item === 'Dashboard') {
                    navigate('customer-dashboard');
                  } else {
                    navigate(`customer-${item.toLowerCase()}`);
                  }
                }}
                className="text-sm font-medium text-[#0B0D10] hover:text-[#E6C36A] transition-colors tracking-wide"
              >
                {item}
              </button>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* Notification Bell */}
            <button className="relative p-2 hover:bg-[#E5E7EB]/50 rounded-full transition-colors">
              <Bell className="w-5 h-5 text-[#0B0D10]" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#E6C36A] rounded-full animate-pulse" />
            </button>

            {/* Profile Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <div className="w-8 h-8 rounded-full bg-[#E5E7EB] overflow-hidden">
                  <img
                    src={customerData.avatar}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <ChevronDown className="w-4 h-4 text-[#9CA3AF]" />
              </button>

              {/* Dropdown Menu */}
              <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-[#E5E7EB] rounded-sm shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <button
                  onClick={() => navigate('customer-settings')}
                  className="w-full px-4 py-2 text-left text-sm text-[#0B0D10] hover:bg-[#E5E7EB]/50 transition-colors"
                >
                  Settings
                </button>
                <button
                  onClick={() => {
                    setUser(null);
                    navigate('welcome');
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-[#0B0D10] hover:bg-[#E5E7EB]/50 transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        {/* Primary Information Section - Hero Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="border border-[#E5E7EB] p-12 mb-8 relative overflow-hidden"
        >
          {/* Background Gradient */}
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#E5E7EB]/30 to-transparent" />
          
          <div className="relative">
            {/* Top Row: Avatar, Name, Status */}
            <div className="flex items-start gap-8 mb-8">
              {/* Avatar */}
              <div className="relative">
                <img
                  src={customerData.avatar}
                  alt={customerData.name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                />
                <button className="absolute bottom-0 right-0 w-10 h-10 bg-[#0B0D10] hover:bg-[#E6C36A] text-white rounded-full flex items-center justify-center transition-colors">
                  <Edit className="w-5 h-5" />
                </button>
              </div>

              {/* Name and Status */}
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-3">
                  <h1 className="text-4xl font-['Playfair_Display'] font-bold text-[#0B0D10]">
                    {customerData.name}
                  </h1>
                  <div className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${getStatusColor(customerData.status)}`} />
                    <span className="text-sm font-medium text-[#0B0D10]">{customerData.status}</span>
                  </div>
                </div>

                {/* Contact Information - Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  {/* Email */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#E5E7EB] rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-[#0B0D10]" />
                    </div>
                    <div>
                      <p className="text-xs text-[#9CA3AF] uppercase tracking-wider mb-1">Email</p>
                      <p className="text-sm font-medium text-[#0B0D10]">{customerData.email}</p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#E5E7EB] rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-[#0B0D10]" />
                    </div>
                    <div>
                      <p className="text-xs text-[#9CA3AF] uppercase tracking-wider mb-1">Phone</p>
                      <p className="text-sm font-medium text-[#0B0D10]">{customerData.phone}</p>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#E5E7EB] rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-[#0B0D10]" />
                    </div>
                    <div>
                      <p className="text-xs text-[#9CA3AF] uppercase tracking-wider mb-1">Location</p>
                      <p className="text-sm font-medium text-[#0B0D10]">{customerData.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Row: Stats and Join Date */}
            <div className="border-t border-[#E5E7EB] pt-8 mt-8">
              <div className="flex items-center justify-between">
                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  <div>
                    <p className="text-xs text-[#9CA3AF] uppercase tracking-wider mb-2">Total Orders</p>
                    <p className="text-3xl font-['Playfair_Display'] font-bold text-[#0B0D10]">
                      {customerData.stats.totalOrders}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#9CA3AF] uppercase tracking-wider mb-2">Active Designs</p>
                    <p className="text-3xl font-['Playfair_Display'] font-bold text-[#0B0D10]">
                      {customerData.stats.activeDesigns}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#9CA3AF] uppercase tracking-wider mb-2">Completed</p>
                    <p className="text-3xl font-['Playfair_Display'] font-bold text-[#0B0D10]">
                      {customerData.stats.completedOrders}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#9CA3AF] uppercase tracking-wider mb-2">Total Spent</p>
                    <p className="text-3xl font-['Playfair_Display'] font-bold text-[#0B0D10]">
                      ${customerData.stats.totalSpent}
                    </p>
                  </div>
                </div>

                {/* Join Date */}
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-[#9CA3AF]" />
                  <div>
                    <p className="text-xs text-[#9CA3AF] uppercase tracking-wider mb-1">Member Since</p>
                    <p className="text-sm font-medium text-[#0B0D10]">{customerData.joinDate}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs Navigation */}
        <div className="border-b border-[#E5E7EB] mb-8">
          <nav className="flex gap-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center gap-2 pb-4 border-b-2 transition-all
                    ${activeTab === tab.id 
                      ? 'border-[#0B0D10] text-[#0B0D10]' 
                      : 'border-transparent text-[#9CA3AF] hover:text-[#0B0D10]'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Recent Orders */}
              <div className="border border-[#E5E7EB] p-6">
                <h3 className="text-xl font-['Playfair_Display'] font-bold text-[#0B0D10] mb-6">
                  Recent Orders
                </h3>
                <div className="space-y-4">
                  {orders.slice(0, 3).map((order) => (
                    <div key={order.id} className="flex items-center gap-4 pb-4 border-b border-[#E5E7EB] last:border-0">
                      <img
                        src={order.image}
                        alt={order.name}
                        className="w-16 h-16 object-cover"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-[#0B0D10]">{order.name}</p>
                        <p className="text-sm text-[#9CA3AF]">{order.id}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-[#0B0D10]">${order.total}</p>
                        <span className={`inline-block px-2 py-1 text-xs text-white rounded-full mt-1 ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setActiveTab('orders')}
                  className="w-full mt-6 text-sm text-[#0B0D10] hover:text-[#E6C36A] transition-colors font-medium"
                >
                  View all orders →
                </button>
              </div>

              {/* Recent Activity */}
              <div className="border border-[#E5E7EB] p-6">
                <h3 className="text-xl font-['Playfair_Display'] font-bold text-[#0B0D10] mb-6">
                  Recent Activity
                </h3>
                <div className="space-y-4">
                  {activities.slice(0, 3).map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3 pb-4 border-b border-[#E5E7EB] last:border-0">
                      <div className="w-8 h-8 bg-[#E5E7EB] rounded-full flex items-center justify-center flex-shrink-0">
                        {activity.type === 'order' && <ShoppingBag className="w-4 h-4 text-[#0B0D10]" />}
                        {activity.type === 'design' && <Palette className="w-4 h-4 text-[#0B0D10]" />}
                        {activity.type === 'review' && <Star className="w-4 h-4 text-[#0B0D10]" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-[#0B0D10]">{activity.description}</p>
                        <p className="text-xs text-[#9CA3AF] mt-1">
                          {activity.date} at {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setActiveTab('activity')}
                  className="w-full mt-6 text-sm text-[#0B0D10] hover:text-[#E6C36A] transition-colors font-medium"
                >
                  View all activity →
                </button>
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div className="border border-[#E5E7EB] p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-['Playfair_Display'] font-bold text-[#0B0D10]">
                  All Orders
                </h3>
                <button
                  onClick={() => navigate('customer-orders')}
                  className="text-sm text-[#0B0D10] hover:text-[#E6C36A] transition-colors font-medium"
                >
                  Manage Orders →
                </button>
              </div>
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="flex items-center gap-6 p-4 border border-[#E5E7EB] hover:border-[#0B0D10] transition-colors">
                    <img
                      src={order.image}
                      alt={order.name}
                      className="w-24 h-24 object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-medium text-[#0B0D10]">{order.name}</h4>
                        <span className={`inline-block px-3 py-1 text-xs text-white rounded-full ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                      <p className="text-sm text-[#9CA3AF] mb-1">Order ID: {order.id}</p>
                      <p className="text-sm text-[#9CA3AF]">Date: {order.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-['Playfair_Display'] font-bold text-[#0B0D10]">
                        ${order.total}
                      </p>
                      <button className="mt-2 px-4 py-2 border border-[#E5E7EB] text-sm text-[#0B0D10] hover:bg-[#E5E7EB] transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Activity Tab */}
          {activeTab === 'activity' && (
            <div className="border border-[#E5E7EB] p-6">
              <h3 className="text-xl font-['Playfair_Display'] font-bold text-[#0B0D10] mb-6">
                Activity History
              </h3>
              <div className="space-y-6">
                {activities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-4 pb-6 border-b border-[#E5E7EB] last:border-0">
                    <div className="w-12 h-12 bg-[#E5E7EB] rounded-full flex items-center justify-center flex-shrink-0">
                      {activity.type === 'order' && <ShoppingBag className="w-6 h-6 text-[#0B0D10]" />}
                      {activity.type === 'design' && <Palette className="w-6 h-6 text-[#0B0D10]" />}
                      {activity.type === 'review' && <Star className="w-6 h-6 text-[#0B0D10]" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-[#0B0D10] mb-1">{activity.description}</p>
                      <p className="text-sm text-[#9CA3AF]">
                        {activity.date} at {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Designs Tab */}
          {activeTab === 'designs' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-['Playfair_Display'] font-bold text-[#0B0D10]">
                  My Designs
                </h3>
                <button
                  onClick={() => navigate('customer-studio')}
                  className="px-6 py-2 bg-[#0B0D10] text-white hover:bg-[#E6C36A] transition-colors"
                >
                  Create New Design
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {designs.map((design) => (
                  <div key={design.id} className="border border-[#E5E7EB] hover:border-[#0B0D10] transition-colors group">
                    <div className="relative overflow-hidden">
                      <img
                        src={design.image}
                        alt={design.name}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className={`absolute top-4 right-4 px-3 py-1 text-xs text-white rounded-full ${getStatusColor(design.status)}`}>
                        {design.status}
                      </span>
                    </div>
                    <div className="p-4">
                      <h4 className="font-medium text-[#0B0D10] mb-2">{design.name}</h4>
                      <p className="text-sm text-[#9CA3AF] mb-4">
                        Last modified: {design.lastModified}
                      </p>
                      <button className="w-full py-2 border border-[#E5E7EB] text-sm text-[#0B0D10] hover:bg-[#E5E7EB] transition-colors">
                        Edit Design
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Account Settings */}
              <div className="border border-[#E5E7EB] p-6">
                <h3 className="text-xl font-['Playfair_Display'] font-bold text-[#0B0D10] mb-6">
                  Account Settings
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#0B0D10] mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      defaultValue={customerData.name}
                      className="w-full px-4 py-2 border border-[#E5E7EB] focus:border-[#0B0D10] focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#0B0D10] mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      defaultValue={customerData.email}
                      className="w-full px-4 py-2 border border-[#E5E7EB] focus:border-[#0B0D10] focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#0B0D10] mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      defaultValue={customerData.phone}
                      className="w-full px-4 py-2 border border-[#E5E7EB] focus:border-[#0B0D10] focus:outline-none transition-colors"
                    />
                  </div>
                  <button className="w-full py-3 bg-[#0B0D10] text-white hover:bg-[#E6C36A] transition-colors mt-4">
                    Save Changes
                  </button>
                </div>
              </div>

              {/* Privacy & Security */}
              <div className="border border-[#E5E7EB] p-6">
                <h3 className="text-xl font-['Playfair_Display'] font-bold text-[#0B0D10] mb-6">
                  Privacy & Security
                </h3>
                <div className="space-y-4">
                  <button className="w-full px-4 py-3 border border-[#E5E7EB] text-left text-sm text-[#0B0D10] hover:bg-[#E5E7EB] transition-colors flex items-center justify-between">
                    <span>Change Password</span>
                    <span>→</span>
                  </button>
                  <button className="w-full px-4 py-3 border border-[#E5E7EB] text-left text-sm text-[#0B0D10] hover:bg-[#E5E7EB] transition-colors flex items-center justify-between">
                    <span>Two-Factor Authentication</span>
                    <span>→</span>
                  </button>
                  <button className="w-full px-4 py-3 border border-[#E5E7EB] text-left text-sm text-[#0B0D10] hover:bg-[#E5E7EB] transition-colors flex items-center justify-between">
                    <span>Privacy Settings</span>
                    <span>→</span>
                  </button>
                  <button className="w-full px-4 py-3 border border-[#E5E7EB] text-left text-sm text-[#0B0D10] hover:bg-[#E5E7EB] transition-colors flex items-center justify-between">
                    <span>Connected Devices</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}