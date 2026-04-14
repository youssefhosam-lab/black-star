import React, { useState } from 'react';
import { Layout } from './Layout';
import { useApp } from '../App';
import { Bell, Lock, Globe, CreditCard, Shield, LogOut, User } from 'lucide-react';

export function Settings() {
  const { navigate, setUser } = useApp();
  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    newMessages: true,
    promotions: false,
    newsletter: true,
  });

  const handleLogout = () => {
    setUser(null);
    navigate('welcome');
  };

  return (
    <Layout>
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-[#F5F6F8] font-['Playfair_Display'] text-3xl font-bold mb-8">Settings</h1>

        <div className="space-y-6">
          {/* Account Settings */}
          <div className="bg-[#141720] rounded-xl p-6 shadow-sm border border-[#1E2230]">
            <div className="flex items-center gap-3 mb-6">
              <User className="size-6 text-[#E6C36A]" />
              <h2 className="text-[#F5F6F8] font-medium text-lg">Account Settings</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-[#8A8F98] mb-2">Display Name</label>
                <input
                  type="text"
                  defaultValue="Demo User"
                  className="w-full p-3 bg-[#0B0D10] border border-[#1E2230] text-[#F5F6F8] rounded-lg focus:border-[#E6C36A] focus:outline-none placeholder-[#8A8F98]"
                />
              </div>
              <div>
                <label className="block text-[#8A8F98] mb-2">Email</label>
                <input
                  type="email"
                  defaultValue="user@blackstar.com"
                  className="w-full p-3 bg-[#0B0D10] border border-[#1E2230] text-[#F5F6F8] rounded-lg focus:border-[#E6C36A] focus:outline-none placeholder-[#8A8F98]"
                />
              </div>
              <div>
                <label className="block text-[#8A8F98] mb-2">Bio</label>
                <textarea
                  rows={3}
                  defaultValue="Fashion enthusiast with a passion for sustainable and custom designs."
                  className="w-full p-3 bg-[#0B0D10] border border-[#1E2230] text-[#F5F6F8] rounded-lg resize-none focus:border-[#E6C36A] focus:outline-none placeholder-[#8A8F98]"
                />
              </div>
              <button className="bg-[#E6C36A] text-[#0B0D10] px-6 py-3 rounded-lg hover:brightness-110 transition-colors font-medium">
                Save Changes
              </button>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-[#141720] rounded-xl p-6 shadow-sm border border-[#1E2230]">
            <div className="flex items-center gap-3 mb-6">
              <Bell className="size-6 text-[#E6C36A]" />
              <h2 className="text-[#F5F6F8] font-medium text-lg">Notifications</h2>
            </div>
            <div className="space-y-4">
              {Object.entries(notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between py-3 border-b border-[#1E2230] last:border-0">
                  <div>
                    <p className="text-[#F5F6F8] capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                    <p className="text-sm text-[#8A8F98]">
                      {key === 'orderUpdates' && 'Get notified about order status changes'}
                      {key === 'newMessages' && 'Receive alerts for new messages'}
                      {key === 'promotions' && 'Special offers and discounts'}
                      {key === 'newsletter' && 'Weekly fashion trends and updates'}
                    </p>
                  </div>
                  <button
                    onClick={() => setNotifications({ ...notifications, [key]: !value })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      value ? 'bg-[#E6C36A]' : 'bg-[#1E2230]'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-[#0B0D10] transition-transform ${
                        value ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Security */}
          <div className="bg-[#141720] rounded-xl p-6 shadow-sm border border-[#1E2230]">
            <div className="flex items-center gap-3 mb-6">
              <Lock className="size-6 text-[#E6C36A]" />
              <h2 className="text-[#F5F6F8] font-medium text-lg">Security</h2>
            </div>
            <div className="space-y-4">
              <button className="w-full flex items-center justify-between p-4 border border-[#1E2230] bg-[#1B1F2A] rounded-lg hover:border-[#E6C36A] transition-colors group">
                <div className="text-left">
                  <p className="text-[#F5F6F8]">Change Password</p>
                  <p className="text-sm text-[#8A8F98]">Update your password regularly for security</p>
                </div>
                <span className="text-[#E6C36A] group-hover:translate-x-1 transition-transform">→</span>
              </button>
              <button className="w-full flex items-center justify-between p-4 border border-[#1E2230] bg-[#1B1F2A] rounded-lg hover:border-[#E6C36A] transition-colors group">
                <div className="text-left">
                  <p className="text-[#F5F6F8]">Two-Factor Authentication</p>
                  <p className="text-sm text-[#8A8F98]">Add an extra layer of security</p>
                </div>
                <span className="px-3 py-1 bg-[#2ECC71]/10 text-[#2ECC71] border border-[#2ECC71]/20 rounded-full text-sm">Active</span>
              </button>
            </div>
          </div>

          {/* Preferences */}
          <div className="bg-[#141720] rounded-xl p-6 shadow-sm border border-[#1E2230]">
            <div className="flex items-center gap-3 mb-6">
              <Globe className="size-6 text-[#E6C36A]" />
              <h2 className="text-[#F5F6F8] font-medium text-lg">Preferences</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-[#8A8F98] mb-2">Language</label>
                <select className="w-full p-3 bg-[#0B0D10] border border-[#1E2230] text-[#F5F6F8] rounded-lg focus:border-[#E6C36A] focus:outline-none">
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                </select>
              </div>
              <div>
                <label className="block text-[#8A8F98] mb-2">Currency</label>
                <select className="w-full p-3 bg-[#0B0D10] border border-[#1E2230] text-[#F5F6F8] rounded-lg focus:border-[#E6C36A] focus:outline-none">
                  <option>USD ($)</option>
                  <option>EUR (€)</option>
                  <option>GBP (£)</option>
                  <option>JPY (¥)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="bg-[#141720] rounded-xl p-6 shadow-sm border border-[#1E2230]">
            <div className="flex items-center gap-3 mb-6">
              <CreditCard className="size-6 text-[#E6C36A]" />
              <h2 className="text-[#F5F6F8] font-medium text-lg">Payment Methods</h2>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 border border-[#1E2230] bg-[#1B1F2A] rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="size-10 bg-[#0B0D10] border border-[#1E2230] rounded flex items-center justify-center">
                    <CreditCard className="size-5 text-[#E6C36A]" />
                  </div>
                  <div>
                    <p className="text-[#F5F6F8]">Visa •••• 4242</p>
                    <p className="text-sm text-[#8A8F98]">Expires 12/26</p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-[#2ECC71]/10 text-[#2ECC71] border border-[#2ECC71]/20 rounded-full text-sm">Default</span>
              </div>
              <button className="w-full p-4 border-2 border-dashed border-[#1E2230] rounded-lg text-[#E6C36A] hover:border-[#E6C36A] hover:bg-[#E6C36A]/5 transition-colors">
                + Add Payment Method
              </button>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-[#141720] border border-[#E74C3C]/30 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="size-6 text-[#E74C3C]" />
              <h2 className="text-[#E74C3C] font-medium text-lg">Danger Zone</h2>
            </div>
            <div className="space-y-3">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 bg-[#1B1F2A] border border-[#1E2230] text-[#F5F6F8] px-6 py-3 rounded-lg hover:border-[#E6C36A] transition-colors"
              >
                <LogOut className="size-4" />
                Log Out
              </button>
              <button className="w-full bg-[#E74C3C] text-white px-6 py-3 rounded-lg hover:bg-[#E74C3C]/80 transition-colors">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
