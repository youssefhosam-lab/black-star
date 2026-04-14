import { useApp } from '../../App';
import { Bell, ChevronDown, Trash2, ShoppingBag } from 'lucide-react';
import Logo from '../../imports/Logo';

export function CustomerCart() {
  const { navigate, user, cart, removeFromCart } = useApp();

  const subtotal = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  const shipping = cart.length > 0 ? 15 : 0;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#E5E7EB]">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="w-8 h-8 text-[#0B0D10] cursor-pointer" onClick={() => navigate('home')}>
            <Logo showText={false} />
          </div>

          <nav className="hidden md:flex items-center gap-12">
            {['Studio', 'Orders', 'Community', 'Shop'].map((item) => (
              <button
                key={item}
                onClick={() => navigate(`customer-${item.toLowerCase()}`)}
                className="text-sm font-medium text-[#9CA3AF] hover:text-[#E6C36A] transition-colors tracking-wide"
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

      {/* Cart Content */}
      <div className="container mx-auto px-6 py-16">
        <h1 className="text-5xl font-['Playfair_Display'] font-bold text-[#0B0D10] mb-16">
          Shopping Cart
        </h1>

        {cart.length === 0 ? (
          <div className="text-center py-24">
            <ShoppingBag className="w-16 h-16 text-[#E5E7EB] mx-auto mb-6" />
            <h2 className="text-2xl font-['Playfair_Display'] font-bold text-[#0B0D10] mb-4">
              Your cart is empty
            </h2>
            <p className="text-[#9CA3AF] mb-8">
              Start exploring our curated brands and add items to your cart.
            </p>
            <button
              onClick={() => navigate('customer-shop')}
              className="px-8 py-3 bg-[#0B0D10] text-white font-medium hover:opacity-90 transition-opacity"
            >
              Discover Brands
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cart.map((item) => (
                <div
                  key={item.cartId}
                  className="border border-[#E5E7EB] p-6 flex gap-6"
                >
                  <img
                    src={item.images?.[0] || item.image}
                    alt={item.name}
                    className="w-32 h-32 object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-['Playfair_Display'] font-bold text-[#0B0D10] mb-2">
                      {item.name}
                    </h3>
                    <p className="text-sm text-[#9CA3AF] mb-4">
                      {item.brand?.name || item.brand}
                    </p>
                    <div className="flex items-center gap-6 text-sm text-[#9CA3AF]">
                      <span>Size: {item.selectedSize}</span>
                      <span>Qty: {item.quantity || 1}</span>
                    </div>
                  </div>
                  <div className="text-right flex flex-col justify-between">
                    <p className="text-lg font-['Playfair_Display'] font-bold text-[#0B0D10]">
                      ${item.price * (item.quantity || 1)}
                    </p>
                    <button
                      onClick={() => removeFromCart(item.cartId)}
                      className="text-[#9CA3AF] hover:text-red-600 transition-colors flex items-center gap-2 justify-end"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span className="text-sm">Remove</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div>
              <div className="border border-[#E5E7EB] p-8 sticky top-24">
                <h2 className="text-2xl font-['Playfair_Display'] font-bold text-[#0B0D10] mb-8">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6 pb-6 border-b border-[#E5E7EB]">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#9CA3AF]">Subtotal</span>
                    <span className="text-[#0B0D10] font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#9CA3AF]">Shipping</span>
                    <span className="text-[#0B0D10] font-medium">${shipping.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex justify-between mb-8">
                  <span className="text-lg font-medium text-[#0B0D10]">Total</span>
                  <span className="text-2xl font-['Playfair_Display'] font-bold text-[#0B0D10]">
                    ${total.toFixed(2)}
                  </span>
                </div>

                <button
                  onClick={() => navigate('customer-checkout')}
                  className="w-full px-8 py-4 bg-[#0B0D10] text-white font-medium hover:opacity-90 transition-opacity"
                >
                  Proceed to Checkout
                </button>

                <button
                  onClick={() => navigate('customer-shop')}
                  className="w-full mt-4 text-sm text-[#9CA3AF] hover:text-[#0B0D10] transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
