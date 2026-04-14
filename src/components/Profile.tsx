import React, { useState } from 'react';
import { Layout } from './Layout';
import { useApp } from '../App';
import { User, MapPin, Package, MessageSquare, LogOut, Settings as SettingsIcon } from 'lucide-react';
import { motion } from 'motion/react';

export function Profile() {
  const { user, setUser, navigate } = useApp();
  const [activeTab, setActiveTab] = useState<'info' | 'addresses' | 'orders' | 'posts'>('info');

  const handleLogout = () => {
    setUser(null);
    navigate('welcome');
  };

  const menuItems = [
    { id: 'info', label: 'Personal Info', icon: User },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'posts', label: 'Community Posts', icon: MessageSquare },
  ];

  return (
    <Layout>
      <div className="max-w-5xl mx-auto p-6">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="w-full md:w-64 space-y-2">
            <div className="p-6 bg-[#141720] border border-[#1E2230] rounded-xl mb-6 text-center">
              <div className="size-20 bg-[#1B1F2A] rounded-full mx-auto mb-4 flex items-center justify-center text-[#E6C36A] text-2xl font-bold border border-[#1E2230]">
                {user?.name?.[0]}
              </div>
              <h2 className="text-[#F5F6F8] font-bold text-lg truncate">{user?.name}</h2>
              <p className="text-[#8A8F98] text-sm truncate">{user?.email}</p>
            </div>

            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    activeTab === item.id 
                      ? 'bg-[#E6C36A] text-[#0B0D10] font-medium' 
                      : 'text-[#8A8F98] hover:bg-[#141720] hover:text-[#F5F6F8]'
                  }`}
                >
                  <Icon className="size-5" />
                  {item.label}
                </button>
              );
            })}

            <div className="pt-4 border-t border-[#1E2230] mt-4">
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[#E74C3C] hover:bg-[#141720] transition-colors"
              >
                <LogOut className="size-5" />
                Logout
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-[#141720] border border-[#1E2230] rounded-xl p-8 min-h-[500px]"
            >
              {activeTab === 'info' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-['Playfair_Display'] font-bold text-[#F5F6F8] mb-6">Personal Information</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-[#8A8F98] mb-2">Full Name</label>
                      <input 
                        defaultValue={user?.name} 
                        className="w-full bg-[#0B0D10] border border-[#1E2230] rounded-lg p-3 text-[#F5F6F8] focus:border-[#E6C36A] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-[#8A8F98] mb-2">Email Address</label>
                      <input 
                        defaultValue={user?.email} 
                        className="w-full bg-[#0B0D10] border border-[#1E2230] rounded-lg p-3 text-[#F5F6F8] focus:border-[#E6C36A] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-[#8A8F98] mb-2">Phone Number</label>
                      <input 
                        placeholder="+1 (555) 000-0000" 
                        className="w-full bg-[#0B0D10] border border-[#1E2230] rounded-lg p-3 text-[#F5F6F8] focus:border-[#E6C36A] focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="pt-6">
                    <button className="px-6 py-2 bg-[#E6C36A] text-[#0B0D10] rounded-lg font-medium hover:brightness-110">
                      Save Changes
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'addresses' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-['Playfair_Display'] font-bold text-[#F5F6F8]">My Addresses</h2>
                    <button className="text-[#E6C36A] text-sm font-medium hover:underline">+ Add New</button>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-[#1B1F2A] border border-[#1E2230] rounded-lg relative group">
                      <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="text-[#8A8F98] hover:text-[#F5F6F8]">Edit</button>
                        <button className="text-[#E74C3C]">Delete</button>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-[#E6C36A]/20 text-[#E6C36A] text-xs px-2 py-1 rounded">Default</span>
                        <span className="text-[#F5F6F8] font-medium">Home</span>
                      </div>
                      <p className="text-[#8A8F98]">123 Fashion Ave, Apt 4B</p>
                      <p className="text-[#8A8F98]">New York, NY 10012</p>
                      <p className="text-[#8A8F98]">United States</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'orders' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-['Playfair_Display'] font-bold text-[#F5F6F8]">Order History</h2>
                    <button onClick={() => navigate('orders')} className="text-[#E6C36A] text-sm hover:underline">
                      View All Orders
                    </button>
                  </div>
                  <div className="text-center py-12 border-2 border-dashed border-[#1E2230] rounded-xl">
                    <Package className="size-12 text-[#1E2230] mx-auto mb-3" />
                    <p className="text-[#8A8F98]">See your full order history in the My Orders page.</p>
                    <button 
                      onClick={() => navigate('orders')}
                      className="mt-4 px-6 py-2 bg-[#1B1F2A] border border-[#1E2230] rounded-lg text-[#F5F6F8] hover:border-[#E6C36A] transition-colors"
                    >
                      Go to My Orders
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'posts' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-['Playfair_Display'] font-bold text-[#F5F6F8]">My Community Posts</h2>
                  </div>
                   <div className="text-center py-12 border-2 border-dashed border-[#1E2230] rounded-xl">
                    <MessageSquare className="size-12 text-[#1E2230] mx-auto mb-3" />
                    <p className="text-[#8A8F98]">You haven't posted anything yet.</p>
                    <button 
                      onClick={() => navigate('community')}
                      className="mt-4 px-6 py-2 bg-[#E6C36A] text-[#0B0D10] rounded-lg font-medium hover:brightness-110"
                    >
                      Go to Community
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
