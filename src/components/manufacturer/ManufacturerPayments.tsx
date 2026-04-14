import { useState } from 'react';
import { useApp } from '../../App';
import { Bell, ChevronDown, Download, DollarSign, Clock, CheckCircle } from 'lucide-react';
import Logo from '../../imports/Logo';

interface Payment {
  id: string;
  orderId: string;
  brand: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'processing';
  invoiceUrl?: string;
}

export function ManufacturerPayments() {
  const { navigate, user } = useApp();
  const [activeTab, setActiveTab] = useState<'completed' | 'pending' | 'all'>('all');

  const payments: Payment[] = [
    {
      id: '1',
      orderId: 'ORD-2024-1245',
      brand: 'Urban Collective',
      amount: 4250,
      date: '2024-12-20',
      status: 'completed',
      invoiceUrl: '#',
    },
    {
      id: '2',
      orderId: 'ORD-2024-1238',
      brand: 'Minimal Studio',
      amount: 3890,
      date: '2024-12-18',
      status: 'completed',
      invoiceUrl: '#',
    },
    {
      id: '3',
      orderId: 'ORD-2024-1250',
      brand: 'Heritage Co.',
      amount: 5600,
      date: '2024-12-22',
      status: 'pending',
    },
    {
      id: '4',
      orderId: 'ORD-2024-1248',
      brand: 'Luxe Threads',
      amount: 2340,
      date: '2024-12-21',
      status: 'processing',
    },
    {
      id: '5',
      orderId: 'ORD-2024-1232',
      brand: 'Urban Collective',
      amount: 6780,
      date: '2024-12-15',
      status: 'completed',
      invoiceUrl: '#',
    },
  ];

  const filteredPayments = payments.filter((payment) => {
    if (activeTab === 'all') return true;
    return payment.status === activeTab;
  });

  const totalCompleted = payments
    .filter((p) => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0);

  const totalPending = payments
    .filter((p) => p.status === 'pending' || p.status === 'processing')
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#E5E7EB]">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="w-8 h-8 text-[#0B0D10] cursor-pointer" onClick={() => navigate('home')}>
            <Logo showText={false} />
          </div>

          <nav className="hidden md:flex items-center gap-12">
            {['Orders', 'Production', 'Materials', 'Community', 'Payments'].map((item) => (
              <button
                key={item}
                onClick={() => navigate(`manufacturer-${item.toLowerCase()}`)}
                className={`text-sm font-medium transition-colors tracking-wide ${
                  item === 'Payments' ? 'text-[#0B0D10]' : 'text-[#9CA3AF] hover:text-[#0B0D10]'
                }`}
              >
                {item}
              </button>
            ))}
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

      {/* Payments Content */}
      <div className="container mx-auto px-6 py-16">
        <h1 className="text-5xl font-['Playfair_Display'] font-bold text-[#0B0D10] mb-16">
          Payments
        </h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="border border-[#E5E7EB] p-8">
            <div className="flex items-center gap-4 mb-4">
              <CheckCircle className="w-6 h-6 text-[#E6C36A]" />
              <p className="text-sm text-[#9CA3AF] uppercase tracking-wide">
                Completed Payments
              </p>
            </div>
            <p className="text-4xl font-['Playfair_Display'] font-bold text-[#0B0D10]">
              ${totalCompleted.toLocaleString()}
            </p>
          </div>

          <div className="border border-[#E5E7EB] p-8">
            <div className="flex items-center gap-4 mb-4">
              <Clock className="w-6 h-6 text-[#9CA3AF]" />
              <p className="text-sm text-[#9CA3AF] uppercase tracking-wide">
                Pending Payouts
              </p>
            </div>
            <p className="text-4xl font-['Playfair_Display'] font-bold text-[#0B0D10]">
              ${totalPending.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-4 mb-8 border-b border-[#E5E7EB]">
          {[
            { id: 'all', label: 'All Transactions' },
            { id: 'completed', label: 'Completed' },
            { id: 'pending', label: 'Pending' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-4 px-2 text-sm font-medium transition-colors relative ${
                activeTab === tab.id
                  ? 'text-[#0B0D10]'
                  : 'text-[#9CA3AF] hover:text-[#0B0D10]'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0B0D10]" />
              )}
            </button>
          ))}
        </div>

        {/* Payments Table */}
        <div className="border border-[#E5E7EB]">
          {/* Table Header */}
          <div className="grid grid-cols-6 gap-4 p-6 border-b border-[#E5E7EB] bg-[#FAFAFA]">
            <p className="text-xs text-[#9CA3AF] uppercase tracking-wide">Order ID</p>
            <p className="text-xs text-[#9CA3AF] uppercase tracking-wide">Brand</p>
            <p className="text-xs text-[#9CA3AF] uppercase tracking-wide">Amount</p>
            <p className="text-xs text-[#9CA3AF] uppercase tracking-wide">Date</p>
            <p className="text-xs text-[#9CA3AF] uppercase tracking-wide">Status</p>
            <p className="text-xs text-[#9CA3AF] uppercase tracking-wide">Invoice</p>
          </div>

          {/* Table Body */}
          {filteredPayments.map((payment) => (
            <div
              key={payment.id}
              className="grid grid-cols-6 gap-4 p-6 border-b border-[#E5E7EB] last:border-0 hover:bg-[#FAFAFA] transition-colors"
            >
              <p className="text-sm font-medium text-[#0B0D10]">{payment.orderId}</p>
              <p className="text-sm text-[#9CA3AF]">{payment.brand}</p>
              <p className="text-sm font-medium text-[#0B0D10]">
                ${payment.amount.toLocaleString()}
              </p>
              <p className="text-sm text-[#9CA3AF]">
                {new Date(payment.date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>
              <div>
                <span
                  className={`inline-block px-3 py-1 text-xs font-medium ${
                    payment.status === 'completed'
                      ? 'bg-[#E6C36A]/20 text-[#0B0D10]'
                      : payment.status === 'processing'
                      ? 'bg-[#0B0D10]/10 text-[#0B0D10]'
                      : 'bg-[#E5E7EB] text-[#9CA3AF]'
                  }`}
                >
                  {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                </span>
              </div>
              <div>
                {payment.invoiceUrl ? (
                  <button className="flex items-center gap-2 text-sm text-[#0B0D10] hover:text-[#E6C36A] transition-colors">
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                ) : (
                  <span className="text-sm text-[#9CA3AF]">—</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Trust Message */}
        <div className="mt-12 bg-[#E5E7EB]/30 p-8">
          <h3 className="text-lg font-['Playfair_Display'] font-bold text-[#0B0D10] mb-3">
            Payment Security
          </h3>
          <p className="text-sm text-[#9CA3AF] leading-relaxed">
            All payments are processed securely through Black Star. Completed orders are paid out within 3-5 business days. 
            Download invoices for your records at any time.
          </p>
        </div>
      </div>
    </div>
  );
}
