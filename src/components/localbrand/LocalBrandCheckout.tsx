import { useState, useEffect } from 'react';
import { useApp } from '../../App';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, CreditCard, Lock, CheckCircle, Send } from 'lucide-react';
import { LocalBrandHeader } from './LocalBrandHeader';

export function LocalBrandCheckout() {
  const { navigate } = useApp();
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    // Get order details from sessionStorage
    const stored = sessionStorage.getItem('localBrandOrderDetails');
    if (stored) {
      setOrderDetails(JSON.parse(stored));
    } else {
      // If no order details, redirect back to studio
      navigate('localbrand-studio');
    }
  }, [navigate]);

  const handleFinish = () => {
    setShowSuccessMessage(true);
    
    // Clear order details
    sessionStorage.removeItem('localBrandOrderDetails');

    // Redirect to studio after 3 seconds
    setTimeout(() => {
      navigate('localbrand-studio');
    }, 3000);
  };

  if (!orderDetails) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-[#9CA3AF] font-['Inter']">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <LocalBrandHeader activePage="studio" />

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#0B0D10]/80 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white p-12 max-w-md text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
              >
                <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-6" />
              </motion.div>
              <h2 className="text-2xl font-['Playfair_Display'] font-bold text-[#0B0D10] mb-3">
                Sent to Manufacturer
              </h2>
              <p className="text-[#9CA3AF] font-['Inter']">
                Your order has been successfully sent to {orderDetails.manufacturer.name}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      <div className="container mx-auto px-8 py-12 max-w-6xl">
        {/* Back Button */}
        <button
          onClick={() => navigate('localbrand-select-manufacturer')}
          className="flex items-center gap-2 text-sm uppercase tracking-wider text-[#9CA3AF] hover:text-[#0B0D10] transition-colors font-['Inter'] mb-8"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left Column - Order Details */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h1 className="text-3xl font-['Playfair_Display'] font-bold text-[#0B0D10] mb-2">
                Review Order
              </h1>
              <p className="text-[#9CA3AF] font-['Inter']">
                Confirm your order details before sending to manufacturer
              </p>
            </div>

            {/* Manufacturer Info */}
            <div className="bg-white border border-[#E5E7EB] p-6">
              <h2 className="text-lg font-['Playfair_Display'] font-bold text-[#0B0D10] mb-4">
                Manufacturer Details
              </h2>
              <div className="space-y-3">
                <div>
                  <p className="text-xs uppercase tracking-wider text-[#9CA3AF] mb-1 font-['Inter']">
                    Company Name
                  </p>
                  <p className="text-sm font-['Inter'] text-[#0B0D10]">
                    {orderDetails.manufacturer.name}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-[#9CA3AF] mb-1 font-['Inter']">
                    Location
                  </p>
                  <p className="text-sm font-['Inter'] text-[#0B0D10]">
                    {orderDetails.manufacturer.location}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-[#9CA3AF] mb-1 font-['Inter']">
                    Estimated Lead Time
                  </p>
                  <p className="text-sm font-['Inter'] text-[#0B0D10]">
                    {orderDetails.manufacturer.leadTime}
                  </p>
                </div>
              </div>
            </div>

            {/* Order Specifications */}
            <div className="bg-white border border-[#E5E7EB] p-6">
              <h2 className="text-lg font-['Playfair_Display'] font-bold text-[#0B0D10] mb-4">
                Order Specifications
              </h2>
              <div className="space-y-3">
                <div>
                  <p className="text-xs uppercase tracking-wider text-[#9CA3AF] mb-1 font-['Inter']">
                    Quantity
                  </p>
                  <p className="text-sm font-['Inter'] text-[#0B0D10]">
                    {orderDetails.quantity} units
                  </p>
                </div>
                {orderDetails.message && (
                  <div>
                    <p className="text-xs uppercase tracking-wider text-[#9CA3AF] mb-1 font-['Inter']">
                      Special Requirements
                    </p>
                    <p className="text-sm font-['Inter'] text-[#0B0D10] leading-relaxed">
                      {orderDetails.message}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Design Preview Placeholder */}
            <div className="bg-white border border-[#E5E7EB] p-6">
              <h2 className="text-lg font-['Playfair_Display'] font-bold text-[#0B0D10] mb-4">
                Design Preview
              </h2>
              <div className="aspect-video bg-[#F7F7F5] flex items-center justify-center">
                <p className="text-[#9CA3AF] text-sm font-['Inter']">Your design will appear here</p>
              </div>
            </div>
          </div>

          {/* Right Column - Summary & Action */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-[#E5E7EB] p-6 sticky top-24 space-y-6">
              <h2 className="text-lg font-['Playfair_Display'] font-bold text-[#0B0D10]">
                Order Summary
              </h2>

              <div className="space-y-3 pb-4 border-b border-[#E5E7EB]">
                <div className="flex justify-between text-sm">
                  <span className="text-[#9CA3AF] font-['Inter']">Manufacturer</span>
                  <span className="font-['Inter'] text-xs text-[#0B0D10]">
                    {orderDetails.manufacturer.name}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#9CA3AF] font-['Inter']">Quantity</span>
                  <span className="font-['Inter'] text-xs text-[#0B0D10]">
                    {orderDetails.quantity} units
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#9CA3AF] font-['Inter']">Lead Time</span>
                  <span className="font-['Inter'] text-xs text-[#0B0D10]">
                    {orderDetails.manufacturer.leadTime}
                  </span>
                </div>
              </div>

              <div className="bg-[#E5E7EB]/30 p-4">
                <div className="flex items-start gap-2 mb-2">
                  <Lock size={16} className="text-[#0B0D10] mt-0.5" />
                  <p className="text-xs text-[#0B0D10] font-['Inter']">
                    This will be sent directly to the manufacturer for production
                  </p>
                </div>
              </div>

              <button
                onClick={handleFinish}
                className="w-full bg-[#0B0D10] text-white py-4 flex items-center justify-center gap-2 uppercase tracking-wider text-sm font-['Inter'] hover:bg-[#E6C36A] hover:text-[#0B0D10] transition-colors"
              >
                <Send size={16} />
                Finish
              </button>

              <p className="text-xs text-[#9CA3AF] text-center font-['Inter']">
                You'll receive a confirmation once the manufacturer accepts your order
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
