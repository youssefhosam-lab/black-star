import React, { useState } from 'react';
import { useApp } from '../App';
import { Layout } from './Layout';
import { createOrder } from '../lib/supabase';
import {
  CreditCard, MapPin, Package, CheckCircle,
  ShieldCheck, AlertCircle
} from 'lucide-react';
import { motion } from 'motion/react';

export function Checkout() {
  const { navigate, user } = useApp();
  const [step, setStep] = useState<'details' | 'success'>('details');
  const [isProcessing, setIsProcessing] = useState(false);
  const [quantity, setQuantity] = useState(50);
  const [address, setAddress] = useState({ street: '', city: '', zip: '', country: '' });

  const pricePerUnit = 900.00;
  const subtotal = pricePerUnit * quantity;
  const shipping = 500.00;
  const total = subtotal + shipping;

  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      // ✅ حفظ الأوردر في Supabase
      await createOrder({
        user_id: user?.id,
        user_email: user?.email,
        user_name: user?.name,
        product_name: 'Custom T-Shirt Design',
        quantity,
        price_per_unit: pricePerUnit,
        subtotal,
        shipping,
        total,
        address_street: address.street,
        address_city: address.city,
        address_zip: address.zip,
        address_country: address.country,
        status: 'In Production',
        progress: 20,
        manufacturer: 'Elite Garments Co.',
      });
    } catch (err) {
      console.error('Error saving order:', err);
      // بنكمل حتى لو في error عشان مانوقفش المستخدم
    }
    setIsProcessing(false);
    setStep('success');
  };

  if (step === 'success') {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[80vh] p-6 text-center">
          <motion.div
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            className="size-24 bg-[#E6C36A] rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(230,195,106,0.4)]"
          >
            <CheckCircle className="size-12 text-[#0B0D10]" />
          </motion.div>
          <h1 className="text-4xl font-['Playfair_Display'] font-bold text-[#F5F6F8] mb-4">Order Confirmed</h1>
          <p className="text-[#8A8F98] max-w-md mb-8">
            Your production order has been sent to <strong>Elite Garments Co.</strong> You can track the status in your orders page.
          </p>
          <div className="flex gap-4">
            <button onClick={() => navigate('customer-orders')} className="px-8 py-3 bg-[#E6C36A] text-[#0B0D10] font-bold rounded-lg hover:brightness-110 transition-all">Track Order</button>
            <button onClick={() => navigate('home')} className="px-8 py-3 bg-transparent border border-[#1E2230] text-[#F5F6F8] font-bold rounded-lg hover:bg-[#141720] transition-all">Back Home</button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-['Playfair_Display'] font-bold text-[#F5F6F8] mb-8">Checkout</h1>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-[#141720] border border-[#1E2230] rounded-xl p-6">
              <h2 className="text-xl font-medium text-[#F5F6F8] mb-4 flex items-center gap-2">
                <Package className="size-5 text-[#E6C36A]" />Order Details
              </h2>
              <div>
                <label className="block text-sm text-[#8A8F98] mb-1">Quantity (Units)</label>
                <input
                  type="number" value={quantity}
                  onChange={e => setQuantity(parseInt(e.target.value) || 0)}
                  min={50}
                  className="w-full bg-[#0B0D10] border border-[#1E2230] rounded-lg p-3 text-[#F5F6F8] focus:border-[#E6C36A] focus:outline-none"
                />
                <p className="text-xs text-[#E6C36A] mt-1">Minimum Order Quantity: 50</p>
              </div>
            </div>

            <div className="bg-[#141720] border border-[#1E2230] rounded-xl p-6">
              <h2 className="text-xl font-medium text-[#F5F6F8] mb-4 flex items-center gap-2">
                <MapPin className="size-5 text-[#E6C36A]" />Shipping Address
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <input placeholder="Street Address" value={address.street}
                    onChange={e => setAddress({ ...address, street: e.target.value })}
                    className="w-full bg-[#0B0D10] border border-[#1E2230] rounded-lg p-3 text-[#F5F6F8] focus:border-[#E6C36A] focus:outline-none" />
                </div>
                <input placeholder="City" value={address.city}
                  onChange={e => setAddress({ ...address, city: e.target.value })}
                  className="w-full bg-[#0B0D10] border border-[#1E2230] rounded-lg p-3 text-[#F5F6F8] focus:border-[#E6C36A] focus:outline-none" />
                <input placeholder="ZIP / Postal Code" value={address.zip}
                  onChange={e => setAddress({ ...address, zip: e.target.value })}
                  className="w-full bg-[#0B0D10] border border-[#1E2230] rounded-lg p-3 text-[#F5F6F8] focus:border-[#E6C36A] focus:outline-none" />
                <div className="col-span-2">
                  <input placeholder="Country" value={address.country}
                    onChange={e => setAddress({ ...address, country: e.target.value })}
                    className="w-full bg-[#0B0D10] border border-[#1E2230] rounded-lg p-3 text-[#F5F6F8] focus:border-[#E6C36A] focus:outline-none" />
                </div>
              </div>
            </div>

            <div className="bg-[#141720] border border-[#1E2230] rounded-xl p-6">
              <h2 className="text-xl font-medium text-[#F5F6F8] mb-4 flex items-center gap-2">
                <CreditCard className="size-5 text-[#E6C36A]" />Payment Method
              </h2>
              <div className="p-4 bg-[#0B0D10] border border-[#1E2230] rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-6 bg-[#F5F6F8] rounded flex items-center justify-center text-[10px] font-bold text-black">VISA</div>
                  <span className="text-[#F5F6F8]">**** **** **** 4242</span>
                </div>
                <button className="text-[#E6C36A] text-sm hover:underline">Change</button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-[#141720] border border-[#1E2230] rounded-xl p-6 sticky top-24">
              <h2 className="text-xl font-medium text-[#F5F6F8] mb-6">Order Summary</h2>
              <div className="flex gap-4 mb-6 pb-6 border-b border-[#1E2230]">
                <div className="size-20 bg-[#1B1F2A] rounded-lg flex items-center justify-center text-3xl">👕</div>
                <div>
                  <h3 className="text-[#F5F6F8] font-bold">Custom T-Shirt Design</h3>
                  <p className="text-sm text-[#8A8F98]">Production by Elite Garments Co.</p>
                  <p className="text-xs text-[#E6C36A] mt-1">Est. Delivery: 14 Days</p>
                </div>
              </div>
              <div className="space-y-3 text-sm mb-6">
                <div className="flex justify-between text-[#8A8F98]"><span>Unit Price</span><span>EGP {pricePerUnit.toFixed(2)}</span></div>
                <div className="flex justify-between text-[#8A8F98]"><span>Quantity</span><span>{quantity}</span></div>
                <div className="flex justify-between text-[#8A8F98]"><span>Subtotal</span><span>EGP {subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between text-[#8A8F98]"><span>Shipping</span><span>EGP {shipping.toFixed(2)}</span></div>
                <div className="pt-4 border-t border-[#1E2230] flex justify-between items-center">
                  <span className="text-[#F5F6F8] font-bold text-lg">Total</span>
                  <span className="text-[#E6C36A] font-bold text-xl">EGP {total.toFixed(2)}</span>
                </div>
              </div>
              <button
                onClick={handlePayment} disabled={isProcessing}
                className="w-full bg-[#E6C36A] text-[#0B0D10] font-bold py-4 rounded-lg hover:brightness-110 transition-all shadow-[0_0_15px_rgba(230,195,106,0.3)] flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isProcessing ? 'Processing Payment...' : <><span>Confirm & Pay</span><ShieldCheck className="size-5" /></>}
              </button>
              <div className="mt-4 text-center">
                <p className="text-xs text-[#8A8F98] flex items-center justify-center gap-2">
                  <AlertCircle className="size-3" />Payment is held in escrow until production starts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}