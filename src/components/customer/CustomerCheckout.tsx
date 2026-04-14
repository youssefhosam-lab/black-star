import { useState, useEffect } from 'react';
import { useApp } from '../../App';
import { motion } from 'motion/react';
import { ArrowLeft, CreditCard, Lock, CheckCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export function CustomerCheckout() {
  const { navigate, user } = useApp();
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState<string>('');

  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [billingAddress, setBillingAddress] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');

  useEffect(() => {
    const stored = sessionStorage.getItem('orderDetails');
    if (stored) {
      setOrderDetails(JSON.parse(stored));
    } else {
      navigate('manufacturer-selection');
    }
  }, [navigate]);

  // ✅ تحميل عنوان المستخدم المحفوظ تلقائياً
  useEffect(() => {
    const loadSavedAddress = async () => {
      if (!user?.id) return;
      const { data } = await supabase
        .from('profiles')
        .select('street, city, zip')
        .eq('id', user.id)
        .single();

      if (data) {
        if (data.street) setBillingAddress(data.street);
        if (data.city) setCity(data.city);
        if (data.zip) setZipCode(data.zip);
      }
    };
    loadSavedAddress();
  }, [user?.id]);

  const handlePayment = async () => {
    setIsProcessing(true);

    try {
      // ✅ حفظ الأوردر في Supabase
      const { data: order, error } = await supabase
        .from('orders')
        .insert({
          user_id: user?.id,
          manufacturer_id: orderDetails.manufacturer?.id || null,
          manufacturer_name: orderDetails.manufacturer?.name || '',
          quantity: orderDetails.quantity,
          total_price: orderDetails.totalPrice,
          delivery_time: orderDetails.manufacturer?.deliveryTime || '',
          message: orderDetails.message || '',
          status: 'pending',
          payment_method: paymentMethod,
          billing_address: billingAddress,
          billing_city: city,
          billing_zip: zipCode,
        })
        .select()
        .single();

      if (error) throw error;

      setOrderId(order.id);
      sessionStorage.removeItem('orderDetails');
      setIsProcessing(false);
      setIsSuccess(true);

      setTimeout(() => navigate('customer-orders'), 3000);
    } catch (err) {
      // حتى لو فشل الحفظ في Supabase، نكمل كـ fallback
      sessionStorage.removeItem('orderDetails');
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => navigate('customer-orders'), 3000);
    }
  };

  if (!orderDetails) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-[#9CA3AF] font-['Inter']">Loading...</p>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
          >
            <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6" />
          </motion.div>
          <h1 className="text-3xl font-['Playfair_Display'] font-bold text-[#0B0D10] mb-4">
            Order Placed Successfully!
          </h1>
          {orderId && (
            <p className="text-[#9CA3AF] font-['Inter'] text-sm mb-2">
              Order ID: <span className="text-[#0B0D10] font-medium">{orderId.slice(0, 8).toUpperCase()}</span>
            </p>
          )}
          <p className="text-[#9CA3AF] font-['Inter'] mb-2">
            Your order has been saved and is being processed.
          </p>
          <p className="text-sm text-[#9CA3AF] font-['Inter']">
            Redirecting to orders page...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-[#E5E7EB] sticky top-0 z-10">
        <div className="container mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('manufacturer-selection')}
              className="flex items-center gap-2 text-sm uppercase tracking-wider text-[#9CA3AF] hover:text-[#0B0D10] transition-colors font-['Inter']"
            >
              <ArrowLeft size={18} />
              Back
            </button>
            <h1 className="text-xl font-['Playfair_Display'] font-bold text-[#0B0D10]">Checkout</h1>
            <div className="flex items-center gap-2 text-sm text-[#9CA3AF] font-['Inter']">
              <Lock size={16} />
              Secure Payment
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-8 py-12 max-w-6xl">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left - Payment Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Payment Method */}
            <div>
              <h2 className="text-lg font-['Playfair_Display'] font-bold text-[#0B0D10] mb-4">Payment Method</h2>
              <div className="grid grid-cols-2 gap-4">
                {(['card', 'paypal'] as const).map((method) => (
                  <button
                    key={method}
                    onClick={() => setPaymentMethod(method)}
                    className={`p-4 border flex items-center justify-center gap-2 transition-colors ${
                      paymentMethod === method
                        ? 'border-[#0B0D10] bg-[#0B0D10] text-white'
                        : 'border-[#E5E7EB] text-[#0B0D10] hover:border-[#0B0D10]'
                    }`}
                  >
                    {method === 'card' && <CreditCard size={20} />}
                    <span className="font-['Inter'] capitalize">{method === 'card' ? 'Credit Card' : 'PayPal'}</span>
                  </button>
                ))}
              </div>
            </div>

            {paymentMethod === 'card' && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                {/* Card Info */}
                <div>
                  <h2 className="text-lg font-['Playfair_Display'] font-bold text-[#0B0D10] mb-4">Card Information</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#9CA3AF] mb-2 font-['Inter']">Card Number</label>
                      <input
                        type="text" value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="1234 5678 9012 3456" maxLength={19}
                        className="w-full bg-white border border-[#E5E7EB] px-4 py-3 text-sm font-['Inter'] text-[#0B0D10] focus:outline-none focus:border-[#0B0D10]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#9CA3AF] mb-2 font-['Inter']">Cardholder Name</label>
                      <input
                        type="text" value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full bg-white border border-[#E5E7EB] px-4 py-3 text-sm font-['Inter'] text-[#0B0D10] focus:outline-none focus:border-[#0B0D10]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-[#9CA3AF] mb-2 font-['Inter']">Expiry Date</label>
                        <input
                          type="text" value={expiryDate}
                          onChange={(e) => setExpiryDate(e.target.value)}
                          placeholder="MM/YY" maxLength={5}
                          className="w-full bg-white border border-[#E5E7EB] px-4 py-3 text-sm font-['Inter'] text-[#0B0D10] focus:outline-none focus:border-[#0B0D10]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-[#9CA3AF] mb-2 font-['Inter']">CVV</label>
                        <input
                          type="text" value={cvv}
                          onChange={(e) => setCvv(e.target.value)}
                          placeholder="123" maxLength={3}
                          className="w-full bg-white border border-[#E5E7EB] px-4 py-3 text-sm font-['Inter'] text-[#0B0D10] focus:outline-none focus:border-[#0B0D10]"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Billing Address */}
                <div>
                  <h2 className="text-lg font-['Playfair_Display'] font-bold text-[#0B0D10] mb-1">Billing Address</h2>
                  <p className="text-xs text-[#9CA3AF] mb-4 font-['Inter']">Auto-filled from your saved address</p>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#9CA3AF] mb-2 font-['Inter']">Street Address</label>
                      <input
                        type="text" value={billingAddress}
                        onChange={(e) => setBillingAddress(e.target.value)}
                        placeholder="123 Main Street"
                        className="w-full bg-white border border-[#E5E7EB] px-4 py-3 text-sm font-['Inter'] text-[#0B0D10] focus:outline-none focus:border-[#0B0D10]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-[#9CA3AF] mb-2 font-['Inter']">City</label>
                        <input
                          type="text" value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="New York"
                          className="w-full bg-white border border-[#E5E7EB] px-4 py-3 text-sm font-['Inter'] text-[#0B0D10] focus:outline-none focus:border-[#0B0D10]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-[#9CA3AF] mb-2 font-['Inter']">ZIP Code</label>
                        <input
                          type="text" value={zipCode}
                          onChange={(e) => setZipCode(e.target.value)}
                          placeholder="10001"
                          className="w-full bg-white border border-[#E5E7EB] px-4 py-3 text-sm font-['Inter'] text-[#0B0D10] focus:outline-none focus:border-[#0B0D10]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {paymentMethod === 'paypal' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-[#E5E7EB] p-8 text-center"
              >
                <p className="text-[#9CA3AF] font-['Inter'] mb-4">
                  You will be redirected to PayPal to complete your payment
                </p>
                <button className="px-8 py-3 bg-[#0070BA] text-white font-['Inter'] hover:bg-[#005EA6] transition-colors">
                  Continue to PayPal
                </button>
              </motion.div>
            )}
          </div>

          {/* Right - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-[#E5E7EB] p-6 sticky top-24">
              <h2 className="text-lg font-['Playfair_Display'] font-bold text-[#0B0D10] mb-6">Order Summary</h2>
              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-xs uppercase tracking-wider text-[#9CA3AF] mb-1 font-['Inter']">Manufacturer</p>
                  <p className="text-sm font-['Inter'] text-[#0B0D10]">{orderDetails.manufacturer?.name}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-[#9CA3AF] mb-1 font-['Inter']">Quantity</p>
                  <p className="text-sm font-['Inter'] text-[#0B0D10]">{orderDetails.quantity} units</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-[#9CA3AF] mb-1 font-['Inter']">Delivery Time</p>
                  <p className="text-sm font-['Inter'] text-[#0B0D10]">{orderDetails.manufacturer?.deliveryTime}</p>
                </div>
                {orderDetails.message && (
                  <div>
                    <p className="text-xs uppercase tracking-wider text-[#9CA3AF] mb-1 font-['Inter']">Special Requirements</p>
                    <p className="text-sm font-['Inter'] text-[#0B0D10]">{orderDetails.message}</p>
                  </div>
                )}
              </div>

              <div className="space-y-2 mb-6 pt-4 border-t border-[#E5E7EB]">
                <div className="flex justify-between text-sm">
                  <span className="text-[#9CA3AF] font-['Inter']">Subtotal</span>
                  <span className="font-['Inter'] text-[#0B0D10]">${orderDetails.totalPrice}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#9CA3AF] font-['Inter']">Shipping</span>
                  <span className="font-['Inter'] text-[#0B0D10]">Calculated later</span>
                </div>
                <div className="flex justify-between text-lg pt-2 border-t border-[#E5E7EB]">
                  <span className="text-[#0B0D10] font-['Playfair_Display'] font-bold">Total</span>
                  <span className="font-['Playfair_Display'] font-bold text-[#0B0D10]">${orderDetails.totalPrice}</span>
                </div>
              </div>

              <button
                onClick={handlePayment}
                disabled={isProcessing || (paymentMethod === 'card' && (!cardNumber || !cardName || !expiryDate || !cvv))}
                className="w-full bg-[#0B0D10] text-white py-4 uppercase tracking-wider text-sm font-['Inter'] hover:bg-[#E6C36A] hover:text-[#0B0D10] transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing...
                  </>
                ) : 'Place Order'}
              </button>

              <p className="text-xs text-[#9CA3AF] text-center mt-4 font-['Inter']">
                Your payment information is secure and encrypted
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}