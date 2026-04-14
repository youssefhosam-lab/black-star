import { useState, useEffect } from 'react';
import { useApp } from '../../App';
import { Bell, ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';
import Logo from '../../imports/Logo';

export function CustomerDashboard() {
  const { navigate, user, setUser } = useApp();
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [displayedName, setDisplayedName] = useState('');
  const customerName = user?.name || 'Customer';
  
  // Typing animation for name
  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= customerName.length) {
        setDisplayedName(customerName.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTypingComplete(true);
      }
    }, 80); // Slow, elegant typing

    return () => clearInterval(typingInterval);
  }, [customerName]);

  // Mock data
  const recentOrders = [
    {
      id: '1',
      name: 'Black Hoodie',
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400',
      status: 'In Production',
      progress: 65,
    },
    {
      id: '2',
      name: 'White T-Shirt',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
      status: 'Designing',
      progress: 25,
    },
    {
      id: '3',
      name: 'Denim Jacket',
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400',
      status: 'Shipped',
      progress: 90,
    },
  ];

  const unfinishedDesign = {
    name: 'Custom Hoodie',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800',
  };

  const localBrands = [
    {
      id: '1',
      name: 'StreetVibe',
      category: 'Urban Streetwear',
      image: 'https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=400',
      products: 24,
    },
    {
      id: '2',
      name: 'CleanCut',
      category: 'Minimalist Fashion',
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400',
      products: 18,
    },
    {
      id: '3',
      name: 'Vintage Co',
      category: 'Classic Denim',
      image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400',
      products: 31,
    },
    {
      id: '4',
      name: 'EcoThreads',
      category: 'Sustainable Fashion',
      image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400',
      products: 15,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header - Sticky Minimal */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#E5E7EB]">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="w-8 h-8 text-[#0B0D10]">
            <Logo showText={false} />
          </div>

          {/* Center Navigation */}
          <nav className="hidden md:flex items-center gap-12">
            {['Home', 'Studio', 'Orders', 'Shop'].map((item) => {
              const route = item === 'Home' ? 'home' : `customer-${item.toLowerCase()}`;
              const isActive = item === 'Home';
              return (
                <button
                  key={item}
                  onClick={() => navigate(route)}
                  className={`text-sm font-medium transition-colors tracking-wide ${
                    isActive ? 'text-[#0B0D10]' : 'text-[#9CA3AF] hover:text-[#E6C36A]'
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* Notification Bell */}
            <button className="relative p-2 hover:bg-[#E5E7EB]/50 rounded-full transition-colors">
              <Bell className="w-5 h-5 text-[#0B0D10]" />
              {/* Subtle pulse for unread */}
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#E6C36A] rounded-full animate-pulse" />
            </button>

            {/* Profile Dropdown */}
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

              {/* Dropdown Menu */}
              <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-[#E5E7EB] rounded-sm shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <button
                  onClick={() => navigate('customer-profile')}
                  className="w-full px-4 py-2 text-left text-sm text-[#0B0D10] hover:bg-[#E5E7EB]/50 transition-colors"
                >
                  My Profile
                </button>
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

      {/* Hero Welcome Section */}
      <section className="py-8 px-6 border-b border-[#E5E7EB] bg-gradient-to-r from-white to-[#F9FAFB]">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col sm:flex-row sm:items-baseline gap-3 sm:gap-4"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-['Playfair_Display'] font-bold text-[#0B0D10]">
              Welcome back,
            </h1>
            <div className="relative inline-block">
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: isTypingComplete ? 1 : 0, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-2xl sm:text-3xl md:text-4xl font-['Playfair_Display'] font-semibold bg-gradient-to-r from-[#E6C36A] to-[#D4AF37] bg-clip-text text-transparent inline-block"
              >
                {displayedName}
                {!isTypingComplete && (
                  <span className="inline-block w-0.5 h-6 sm:h-8 md:h-10 bg-[#E6C36A] ml-2 animate-pulse" />
                )}
              </motion.span>
              {/* Decorative underline */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: isTypingComplete ? '100%' : 0 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#E6C36A] to-[#D4AF37]"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Dashboard Content Grid */}
      <section className="container mx-auto px-6 py-8">
        {/* A. Orders Preview - Full Width Top */}
        <div className="border border-[#E5E7EB] p-8 hover:border-[#0B0D10] transition-colors mb-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-['Playfair_Display'] font-bold text-[#0B0D10]">
              Your Orders
            </h2>
            <button
              onClick={() => navigate('customer-orders')}
              className="text-sm text-[#0B0D10] hover:text-[#E6C36A] transition-colors font-medium"
            >
              View all orders →
            </button>
          </div>

          <div className="space-y-6">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center gap-4 pb-6 border-b border-[#E5E7EB] last:border-0"
              >
                <img
                  src={order.image}
                  alt={order.name}
                  className="w-20 h-20 object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-[#0B0D10] mb-2">{order.name}</h3>
                  <p className="text-sm text-[#9CA3AF] mb-2">{order.status}</p>
                  {/* Progress Bar */}
                  <div className="w-full h-1 bg-[#E5E7EB] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#0B0D10] transition-all duration-500"
                      style={{ width: `${order.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* B. Studio Continue Card - Full Width */}
        <div className="relative border border-[#E5E7EB] overflow-hidden group hover:border-[#0B0D10] transition-colors cursor-pointer mb-6">
          <img
            src={unfinishedDesign.image}
            alt="Unfinished design"
            className="w-full h-80 object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D10]/80 to-transparent flex flex-col items-center justify-center">
            <h2 className="text-3xl font-['Playfair_Display'] font-bold text-white mb-6">
              Continue your design?
            </h2>
            <button
              onClick={() => navigate('customer-studio')}
              className="px-8 py-3 bg-white text-[#0B0D10] font-medium hover:bg-[#E6C36A] transition-colors"
            >
              Open Studio →
            </button>
          </div>
        </div>

        {/* C. Local Brands Section - Grid */}
        <div className="border border-[#E5E7EB] p-8 hover:border-[#0B0D10] transition-colors">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-['Playfair_Display'] font-bold text-[#0B0D10]">
              Local Brands
            </h2>
            <button
              onClick={() => navigate('customer-shop')}
              className="text-sm text-[#0B0D10] hover:text-[#E6C36A] transition-colors font-medium"
            >
              View all brands →
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {localBrands.map((brand) => (
              <motion.div
                key={brand.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * parseInt(brand.id) }}
                className="group cursor-pointer"
                onClick={() => navigate('customer-shop')}
              >
                <div className="relative overflow-hidden mb-3 aspect-square">
                  <img
                    src={brand.image}
                    alt={brand.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </div>
                <h3 className="font-['Playfair_Display'] font-semibold text-[#0B0D10] mb-1 group-hover:text-[#E6C36A] transition-colors">
                  {brand.name}
                </h3>
                <p className="text-sm text-[#9CA3AF] mb-1">{brand.category}</p>
                <p className="text-xs text-[#9CA3AF]">{brand.products} products</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}