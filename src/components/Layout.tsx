import React, { useState } from 'react';
import { useApp } from '../App';
import { 
  Home, Palette, ShoppingBag, Package, Factory, Users, 
  BarChart3, Trophy, Sparkles, User, Settings, Menu, X,
  ShoppingCart, Bell
} from 'lucide-react';
import Logo from '../imports/Logo';

interface LayoutProps {
  children: React.ReactNode;
  mainClassName?: string;
}

export function Layout({ children, mainClassName = "bg-[#0B0D10]" }: LayoutProps) {
  const { user, navigate, cart } = useApp();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const getNavItems = () => {
    // Base items available to everyone (except restricted ones)
    const baseItems = [
      { id: 'home', label: 'Home', icon: Home },
      { id: 'marketplace', label: 'Marketplace', icon: ShoppingBag },
      { id: 'community', label: 'Community', icon: Users },
      { id: 'rankings', label: 'Rankings', icon: Trophy },
    ];

    const roleSpecificItems: Record<string, any[]> = {
      customer: [
        { id: 'design-studio', label: 'Design Studio', icon: Palette },
        { id: 'orders', label: 'My Orders', icon: Package },
      ],
      brand: [
        { id: 'design-studio', label: 'Design Studio', icon: Palette },
        { id: 'orders', label: 'My Orders', icon: Package },
        { id: 'manufacturer-directory', label: 'Manufacturers', icon: Factory },
        { id: 'analytics', label: 'Analytics', icon: BarChart3 },
        { id: 'ai-recommendations', label: 'AI Suggestions', icon: Sparkles },
      ],
      manufacturer: [
        { id: 'production-dashboard', label: 'Production', icon: Factory },
        { id: 'orders', label: 'Orders', icon: Package },
        { id: 'analytics', label: 'Analytics', icon: BarChart3 },
        { id: 'ai-recommendations', label: 'AI Suggestions', icon: Sparkles },
      ],
      model: [
        { id: 'orders', label: 'Bookings', icon: Package },
      ],
      admin: [
        { id: 'analytics', label: 'Analytics', icon: BarChart3 },
      ]
    };

    const items = [...baseItems];
    
    // Add role specific items
    if (user?.role && roleSpecificItems[user.role]) {
      // Insert role items after Marketplace (index 2)
      items.splice(2, 0, ...roleSpecificItems[user.role]);
    }

    return items;
  };

  return (
    <div className="min-h-screen bg-[#0B0D10] text-[#F5F6F8]">
      {/* Top Navigation */}
      <nav className="bg-[#0B0D10] border-b border-[#1E2230] sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden text-[#F5F6F8] hover:text-[#E6C36A] transition-colors"
              >
                {isSidebarOpen ? <X className="size-6" /> : <Menu className="size-6" />}
              </button>
              
              <div
                className="flex items-center gap-2 cursor-pointer group"
                onClick={() => navigate('home')}
              >
                <div className="w-[40px] h-[33px]">
                  <Logo />
                </div>
                <span className="text-xl font-bold font-['Playfair_Display'] tracking-tight group-hover:text-[#E6C36A] transition-colors">BLACK STAR</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="relative p-2 text-[#8A8F98] hover:text-[#E6C36A] hover:bg-[#141720] rounded-lg transition-colors">
                <Bell className="size-5" />
                <span className="absolute top-1 right-1 size-2 bg-[#E74C3C] rounded-full" />
              </button>
              
              <button
                onClick={() => navigate('cart')}
                className="relative p-2 text-[#8A8F98] hover:text-[#E6C36A] hover:bg-[#141720] rounded-lg transition-colors"
              >
                <ShoppingCart className="size-5" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#E6C36A] text-[#0B0D10] text-xs font-bold rounded-full size-5 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => navigate('profile')}
                className="flex items-center gap-2 hover:bg-[#141720] px-3 py-2 rounded-lg transition-colors border border-transparent hover:border-[#1E2230]"
              >
                <div className="size-8 rounded-full bg-[#E6C36A] flex items-center justify-center text-[#0B0D10]">
                  <User className="size-4" />
                </div>
                <span className="hidden md:block text-sm font-medium">{user?.name}</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`
            fixed lg:sticky top-16 left-0 h-[calc(100vh-4rem)] bg-[#0B0D10] border-r border-[#1E2230]
            w-64 transition-transform z-30 overflow-y-auto custom-scrollbar
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          `}
        >
          <nav className="p-4 space-y-1">
            {getNavItems().map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    navigate(item.id);
                    setIsSidebarOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#141720] text-[#8A8F98] hover:text-[#E6C36A] transition-all group"
                >
                  <Icon className="size-5 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}

            <div className="pt-4 mt-4 border-t border-[#1E2230]">
              <button
                onClick={() => {
                  navigate('settings');
                  setIsSidebarOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#141720] text-[#8A8F98] hover:text-[#E6C36A] transition-all group"
              >
                <Settings className="size-5 group-hover:scale-110 transition-transform" />
                <span className="font-medium">Settings</span>
              </button>
            </div>
          </nav>
        </aside>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/80 z-20 lg:hidden backdrop-blur-sm"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className={`flex-1 min-h-[calc(100vh-4rem)] ${mainClassName}`}>
          {children}
        </main>
      </div>
    </div>
  );
}