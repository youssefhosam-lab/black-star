import React, { useState } from 'react';
import { Layout } from './Layout';
import { useApp } from '../App';
import { Package, Truck, CheckCircle, Clock, Search, MapPin } from 'lucide-react';

export function MyOrders() {
  const { navigate } = useApp();
  const [activeTab, setActiveTab] = useState('active');

  const orders = [
    {
      id: 'ORD-8821-XJ',
      date: 'Dec 12, 2025',
      status: 'in-production',
      manufacturer: 'Elite Garments Co.',
      item: 'Custom T-Shirt Design',
      quantity: 50,
      image: 'https://images.unsplash.com/photo-1599012307530-d163bd04ecab?w=200',
      timeline: [
        { status: 'confirmed', label: 'Confirmed', completed: true, date: 'Dec 12' },
        { status: 'in-production', label: 'In Production', completed: true, date: 'Dec 13', current: true },
        { status: 'quality-check', label: 'Quality Check', completed: false },
        { status: 'shipped', label: 'Shipped', completed: false },
        { status: 'delivered', label: 'Delivered', completed: false },
      ]
    },
    {
      id: 'ORD-9920-AA',
      date: 'Dec 05, 2025',
      status: 'shipped',
      manufacturer: 'QuickPrint Studio',
      item: 'Promo Hoodies',
      quantity: 10,
      image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=200',
      trackingNumber: 'TRK-99283712',
      timeline: [
        { status: 'confirmed', label: 'Confirmed', completed: true, date: 'Dec 05' },
        { status: 'in-production', label: 'In Production', completed: true, date: 'Dec 06' },
        { status: 'quality-check', label: 'Quality Check', completed: true, date: 'Dec 08' },
        { status: 'shipped', label: 'Shipped', completed: true, date: 'Dec 09', current: true },
        { status: 'delivered', label: 'Delivered', completed: false },
      ]
    }
  ];

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-['Playfair_Display'] font-bold text-[#F5F6F8] mb-8">My Orders</h1>

        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-[#141720] border border-[#1E2230] rounded-xl overflow-hidden">
              {/* Order Header */}
              <div className="p-6 border-b border-[#1E2230] flex flex-col sm:flex-row justify-between gap-4">
                <div className="flex gap-4">
                   <div className="size-20 bg-[#0B0D10] border border-[#1E2230] rounded-lg overflow-hidden flex-shrink-0">
                      <img src={order.image} alt={order.item} className="w-full h-full object-cover opacity-80" />
                   </div>
                   <div>
                     <div className="text-sm text-[#E6C36A] font-medium mb-1">
                       {order.manufacturer}
                     </div>
                     <h3 className="text-lg font-bold text-[#F5F6F8]">{order.item}</h3>
                     <p className="text-sm text-[#8A8F98]">Qty: {order.quantity} • Order #{order.id}</p>
                     
                     {order.trackingNumber && (
                       <div className="mt-2 text-xs bg-[#1B1F2A] text-[#F5F6F8] px-2 py-1 rounded inline-flex items-center gap-2 border border-[#1E2230]">
                         <Truck className="size-3 text-[#E6C36A]" />
                         Tracking: {order.trackingNumber}
                       </div>
                     )}
                   </div>
                </div>
                <div className="text-right">
                   <button 
                    onClick={() => navigate('order-details')}
                    className="text-sm text-[#F5F6F8] hover:text-[#E6C36A] underline"
                   >
                     View Invoice
                   </button>
                </div>
              </div>

              {/* Timeline */}
              <div className="p-6 bg-[#0B0D10]">
                <div className="relative">
                  {/* Progress Bar Background */}
                  <div className="absolute top-3 left-0 w-full h-0.5 bg-[#1E2230]" />
                  
                  {/* Progress Bar Active */}
                  {/* Simplified logic for active bar width based on steps */}
                  
                  <div className="relative flex justify-between">
                    {order.timeline.map((step, index) => {
                      const isActive = step.completed || step.current;
                      const isCurrent = step.current;

                      return (
                        <div key={index} className="flex flex-col items-center relative z-10 group">
                          <div 
                            className={`
                              size-7 rounded-full flex items-center justify-center border-2 transition-colors duration-300
                              ${isActive 
                                ? 'bg-[#E6C36A] border-[#E6C36A] text-[#0B0D10]' 
                                : 'bg-[#0B0D10] border-[#1E2230] text-[#8A8F98]'
                              }
                            `}
                          >
                            {isActive ? <CheckCircle className="size-4" /> : <div className="size-2 rounded-full bg-[#1E2230]" />}
                          </div>
                          <div className="mt-2 text-center">
                            <p className={`text-xs font-medium ${isActive ? 'text-[#F5F6F8]' : 'text-[#8A8F98]'}`}>
                              {step.label}
                            </p>
                            {step.date && (
                              <p className="text-[10px] text-[#8A8F98] mt-0.5">{step.date}</p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {orders.length === 0 && (
            <div className="text-center py-20 bg-[#141720] rounded-xl border border-[#1E2230]">
              <Package className="size-16 text-[#1E2230] mx-auto mb-4" />
              <p className="text-[#8A8F98]">No active orders</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
