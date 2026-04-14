import React, { useState } from 'react';
import { useApp } from '../../App';
import { motion } from 'motion/react';
import { 
  ArrowLeft,
  Building,
  User,
  Bell,
  Shield,
  DollarSign,
  Package,
  Save
} from 'lucide-react';

type SettingsTab = 'factory' | 'account' | 'notifications' | 'payments' | 'capabilities';

const InputField = ({ 
  label, 
  value, 
  onChange, 
  type = "text",
  placeholder 
}: { 
  label: string; 
  value: string; 
  onChange: (value: string) => void; 
  type?: string;
  placeholder?: string;
}) => (
  <div className="mb-6">
    <label className="block text-xs uppercase tracking-wider text-[#6E6E6E] mb-3">
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-transparent border-b border-[#E6E6E3] py-3 text-sm text-[#0B0B0B] focus:outline-none focus:border-[#111111] transition-all duration-200"
    />
  </div>
);

const SelectField = ({ 
  label, 
  value, 
  onChange, 
  options 
}: { 
  label: string; 
  value: string; 
  onChange: (value: string) => void; 
  options: string[];
}) => (
  <div className="mb-6">
    <label className="block text-xs uppercase tracking-wider text-[#6E6E6E] mb-3">
      {label}
    </label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-transparent border-b border-[#E6E6E3] py-3 text-sm text-[#0B0B0B] focus:outline-none focus:border-[#111111] transition-all duration-200"
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

const CheckboxField = ({ 
  label, 
  checked, 
  onChange,
  description 
}: { 
  label: string; 
  checked: boolean; 
  onChange: (checked: boolean) => void;
  description?: string;
}) => (
  <label className="flex items-start gap-3 py-4 cursor-pointer group">
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      className="w-4 h-4 mt-0.5 border-[#E6E6E3] accent-[#111111]"
    />
    <div className="flex-1">
      <p className="text-sm text-[#0B0B0B] group-hover:text-[#111111] transition-colors duration-200">
        {label}
      </p>
      {description && (
        <p className="text-xs text-[#6E6E6E] mt-1">{description}</p>
      )}
    </div>
  </label>
);

export function ManufacturerSettings() {
  const { navigate } = useApp();
  const [activeTab, setActiveTab] = useState<SettingsTab>('factory');

  // Factory Info State
  const [factoryName, setFactoryName] = useState('Premium Textile Manufacturing');
  const [country, setCountry] = useState('Portugal');
  const [city, setCity] = useState('Porto');
  const [address, setAddress] = useState('Rua da Indústria, 245');
  const [phoneNumber, setPhoneNumber] = useState('+351 22 123 4567');
  const [website, setWebsite] = useState('www.premiumtextile.pt');

  // Account State
  const [contactName, setContactName] = useState('João Silva');
  const [email, setEmail] = useState('joao@premiumtextile.pt');
  const [role, setRole] = useState('Factory Manager');

  // Notifications State
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [orderAlerts, setOrderAlerts] = useState(true);
  const [inventoryAlerts, setInventoryAlerts] = useState(true);
  const [delayAlerts, setDelayAlerts] = useState(true);
  const [platformUpdates, setPlatformUpdates] = useState(false);

  // Payment State
  const [bankName, setBankName] = useState('Banco Português');
  const [accountNumber, setAccountNumber] = useState('****4567');
  const [taxId, setTaxId] = useState('PT123456789');

  // Capabilities State
  const [garmentCapabilities, setGarmentCapabilities] = useState(['Cutting', 'Stitching', 'Finishing']);
  const [printCapabilities, setPrintCapabilities] = useState(['DTG', 'Screen Print']);
  const [tailorCapabilities, setTailorCapabilities] = useState(['Custom Fitting', 'Luxury Finish']);
  const [monthlyCapacity, setMonthlyCapacity] = useState('5000');
  const [moq, setMoq] = useState('100');

  const tabs = [
    { id: 'factory', label: 'Factory Info', icon: Building },
    { id: 'account', label: 'Account', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'payments', label: 'Payments', icon: DollarSign },
    { id: 'capabilities', label: 'Capabilities', icon: Package },
  ] as const;

  const renderContent = () => {
    switch (activeTab) {
      case 'factory':
        return (
          <div>
            <h2 className="text-lg tracking-tight text-[#0B0B0B] mb-6">Factory Information</h2>
            
            <InputField
              label="Factory Name"
              value={factoryName}
              onChange={setFactoryName}
            />

            <div className="grid grid-cols-2 gap-6 mb-6">
              <InputField
                label="Country"
                value={country}
                onChange={setCountry}
              />
              <InputField
                label="City"
                value={city}
                onChange={setCity}
              />
            </div>

            <InputField
              label="Address"
              value={address}
              onChange={setAddress}
            />

            <div className="grid grid-cols-2 gap-6">
              <InputField
                label="Phone Number"
                value={phoneNumber}
                onChange={setPhoneNumber}
                type="tel"
              />
              <InputField
                label="Website"
                value={website}
                onChange={setWebsite}
                type="url"
              />
            </div>
          </div>
        );

      case 'account':
        return (
          <div>
            <h2 className="text-lg tracking-tight text-[#0B0B0B] mb-6">Account Settings</h2>
            
            <InputField
              label="Contact Name"
              value={contactName}
              onChange={setContactName}
            />

            <InputField
              label="Email Address"
              value={email}
              onChange={setEmail}
              type="email"
            />

            <InputField
              label="Role"
              value={role}
              onChange={setRole}
            />

            <div className="pt-6 mt-6 border-t border-[#E6E6E3]">
              <h3 className="text-sm text-[#0B0B0B] mb-4">Password</h3>
              <button className="h-10 px-6 border border-[#E6E6E3] text-[#0B0B0B] text-xs uppercase tracking-wider hover:border-[#111111] transition-colors duration-200">
                Change Password
              </button>
            </div>

            <div className="pt-6 mt-6 border-t border-[#E6E6E3]">
              <h3 className="text-sm text-[#0B0B0B] mb-2">Danger Zone</h3>
              <p className="text-xs text-[#6E6E6E] mb-4">
                Deactivating your account will remove all data and cannot be undone.
              </p>
              <button className="h-10 px-6 border border-[#8B0000] text-[#8B0000] text-xs uppercase tracking-wider hover:bg-[#8B0000] hover:text-white transition-all duration-200">
                Deactivate Account
              </button>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div>
            <h2 className="text-lg tracking-tight text-[#0B0B0B] mb-6">Notification Preferences</h2>
            
            <div className="border-b border-[#E6E6E3]">
              <CheckboxField
                label="Email Notifications"
                checked={emailNotifications}
                onChange={setEmailNotifications}
                description="Receive notifications via email"
              />
            </div>

            <div className="mt-6">
              <h3 className="text-xs uppercase tracking-wider text-[#6E6E6E] mb-4">
                Alert Types
              </h3>

              <div className="space-y-2 border-b border-[#E6E6E3]">
                <CheckboxField
                  label="New Order Requests"
                  checked={orderAlerts}
                  onChange={setOrderAlerts}
                  description="Get notified when brands request production"
                />
                <CheckboxField
                  label="Inventory Alerts"
                  checked={inventoryAlerts}
                  onChange={setInventoryAlerts}
                  description="Alerts when materials fall below threshold"
                />
                <CheckboxField
                  label="Production Delays"
                  checked={delayAlerts}
                  onChange={setDelayAlerts}
                  description="Notifications for delayed orders"
                />
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-xs uppercase tracking-wider text-[#6E6E6E] mb-4">
                Platform Updates
              </h3>

              <div className="border-b border-[#E6E6E3]">
                <CheckboxField
                  label="Platform Announcements"
                  checked={platformUpdates}
                  onChange={setPlatformUpdates}
                  description="Updates about new features and platform changes"
                />
              </div>
            </div>
          </div>
        );

      case 'payments':
        return (
          <div>
            <h2 className="text-lg tracking-tight text-[#0B0B0B] mb-6">Payment Settings</h2>
            
            <InputField
              label="Bank Name"
              value={bankName}
              onChange={setBankName}
            />

            <InputField
              label="Account Number"
              value={accountNumber}
              onChange={setAccountNumber}
              type="password"
            />

            <InputField
              label="Tax ID / VAT Number"
              value={taxId}
              onChange={setTaxId}
            />

            <div className="pt-6 mt-6 border-t border-[#E6E6E3]">
              <h3 className="text-sm text-[#0B0B0B] mb-2">Payment Terms</h3>
              <p className="text-xs text-[#6E6E6E] mb-4">
                Default payment terms for new orders
              </p>
              <SelectField
                label="Default Terms"
                value="50% upfront, 50% on delivery"
                onChange={() => {}}
                options={[
                  '50% upfront, 50% on delivery',
                  '30% upfront, 70% on delivery',
                  '100% upfront',
                  'Net 30',
                  'Net 60'
                ]}
              />
            </div>
          </div>
        );

      case 'capabilities':
        return (
          <div>
            <h2 className="text-lg tracking-tight text-[#0B0B0B] mb-6">Production Capabilities</h2>
            
            <div className="mb-8">
              <h3 className="text-xs uppercase tracking-wider text-[#6E6E6E] mb-4">
                Garment Factory
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {['Cutting', 'Stitching', 'Finishing', 'Pattern Making'].map((capability) => (
                  <CheckboxField
                    key={capability}
                    label={capability}
                    checked={garmentCapabilities.includes(capability)}
                    onChange={(checked) => {
                      setGarmentCapabilities(
                        checked
                          ? [...garmentCapabilities, capability]
                          : garmentCapabilities.filter(c => c !== capability)
                      );
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xs uppercase tracking-wider text-[#6E6E6E] mb-4">
                Print-On Factory
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {['DTG', 'Screen Print', 'Embroidery', 'Heat Transfer'].map((capability) => (
                  <CheckboxField
                    key={capability}
                    label={capability}
                    checked={printCapabilities.includes(capability)}
                    onChange={(checked) => {
                      setPrintCapabilities(
                        checked
                          ? [...printCapabilities, capability]
                          : printCapabilities.filter(c => c !== capability)
                      );
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xs uppercase tracking-wider text-[#6E6E6E] mb-4">
                Tailor
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {['Custom Fitting', 'Alteration', 'Luxury Finish', 'Made-to-Measure'].map((capability) => (
                  <CheckboxField
                    key={capability}
                    label={capability}
                    checked={tailorCapabilities.includes(capability)}
                    onChange={(checked) => {
                      setTailorCapabilities(
                        checked
                          ? [...tailorCapabilities, capability]
                          : tailorCapabilities.filter(c => c !== capability)
                      );
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-[#E6E6E3]">
              <h3 className="text-xs uppercase tracking-wider text-[#6E6E6E] mb-4">
                Production Capacity
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <InputField
                  label="Monthly Capacity (units)"
                  value={monthlyCapacity}
                  onChange={setMonthlyCapacity}
                  type="number"
                />
                <InputField
                  label="Minimum Order Quantity (MOQ)"
                  value={moq}
                  onChange={setMoq}
                  type="number"
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F7F5]">
      {/* Header */}
      <div className="bg-[#FFFFFF] border-b border-[#E6E6E3] px-8 py-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('manufacturer-dashboard')}
            className="p-2 hover:bg-[#F7F7F5] transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5 text-[#6E6E6E]" />
          </button>
          <h1 className="text-xl tracking-tight text-[#0B0B0B]">Settings</h1>
        </div>
      </div>

      {/* Split Layout */}
      <div className="flex h-[calc(100vh-113px)]">
        {/* LEFT: Tabs */}
        <div className="w-64 bg-[#FFFFFF] border-r border-[#E6E6E3] p-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 mb-1 text-sm transition-all duration-200
                  ${isActive 
                    ? 'bg-[#111111] text-white' 
                    : 'text-[#6E6E6E] hover:bg-[#F7F7F5]'
                  }
                `}
              >
                <Icon className="w-4 h-4" />
                <span className="uppercase tracking-wider">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* RIGHT: Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-3xl p-8">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}

              {/* Save Button */}
              <div className="pt-8 mt-8 border-t border-[#E6E6E3]">
                <button className="h-12 px-8 bg-[#111111] text-white text-xs uppercase tracking-wider hover:bg-[#0B0B0B] transition-colors duration-200 flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
