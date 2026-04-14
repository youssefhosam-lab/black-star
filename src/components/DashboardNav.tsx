import React from 'react';
import { useApp } from '../App';
import { LogOut, User, Settings } from 'lucide-react';
import Logo from '../imports/Logo';

export function DashboardNav() {
  const { user, setUser, navigate } = useApp();

  const handleLogout = () => {
    setUser(null);
    navigate('welcome');
  };

  return (
    <nav className="bg-[#141720] border-b border-[#1E2230]">
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <button onClick={() => navigate('home')} className="w-[80px] h-[70px]">
              <Logo />
            </button>
            <span className="text-[#E6C36A] text-sm">BLACK STAR</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 px-4 py-2 bg-[#1B1F2A] rounded-lg">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
              ) : (
                <div className="w-8 h-8 bg-[#E6C36A] rounded-full flex items-center justify-center">
                  <User className="size-4 text-[#0B0D10]" />
                </div>
              )}
              <div className="text-left">
                <p className="text-[#F5F6F8] text-sm">{user?.name}</p>
                <p className="text-[#8A8F98] text-xs capitalize">{user?.role}</p>
              </div>
            </div>

            <button
              onClick={() => navigate('settings')}
              className="p-2 text-[#8A8F98] hover:text-[#E6C36A] transition-colors"
              title="Settings"
            >
              <Settings className="size-5" />
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-[#1B1F2A] text-[#8A8F98] hover:text-[#E6C36A] rounded-lg transition-colors"
            >
              <LogOut className="size-4" />
              <span className="text-sm">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
