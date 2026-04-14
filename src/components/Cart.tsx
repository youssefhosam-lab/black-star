import React from 'react';
import { Layout } from './Layout';
import { useApp } from '../App';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';

export function Cart() {
  const { cart, removeFromCart, navigate } = useApp();

  const subtotal = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  const shipping = subtotal > 2000 ? 0 : 200;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <Layout>
      <div className="p-6 max-w-6xl mx-auto">
        <h1 className="text-3xl font-['Playfair_Display'] font-bold text-[#F5F6F8] mb-8">Shopping Cart</h1>

        {cart.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingBag className="size-24 text-[#1E2230] mx-auto mb-4" />
            <h2 className="text-[#F5F6F8] text-xl font-medium mb-2">Your cart is empty</h2>
            <p className="text-[#8A8F98] mb-6">Start shopping to add items to your cart</p>
            <button
              onClick={() => navigate('marketplace')}
              className="bg-[#E6C36A] text-[#0B0D10] px-6 py-3 rounded-lg hover:brightness-110 transition-all font-bold"
            >
              Browse Marketplace
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div key={item.cartId} className="bg-[#141720] rounded-xl p-6 shadow-sm border border-[#1E2230]">
                  <div className="flex gap-4">
                    <div className="size-24 bg-[#1B1F2A] rounded-lg overflow-hidden flex-shrink-0 border border-[#1E2230]">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between mb-2">
                        <div>
                          <h3 className="text-[#F5F6F8] font-medium">{item.name}</h3>
                          <p className="text-sm text-[#8A8F98]">{item.brand}</p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.cartId)}
                          className="text-[#8A8F98] hover:text-[#E74C3C] transition-colors"
                        >
                          <Trash2 className="size-5" />
                        </button>
                      </div>

                      {item.selectedSize && (
                        <p className="text-sm text-[#8A8F98] mb-4">
                          Size: {item.selectedSize} • Color: {item.selectedColor}
                        </p>
                      )}

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <button className="size-8 rounded border border-[#1E2230] bg-[#0B0D10] text-[#F5F6F8] hover:border-[#E6C36A] flex items-center justify-center transition-colors">
                            <Minus className="size-4" />
                          </button>
                          <span className="w-8 text-center text-[#F5F6F8]">{item.quantity || 1}</span>
                          <button className="size-8 rounded border border-[#1E2230] bg-[#0B0D10] text-[#F5F6F8] hover:border-[#E6C36A] flex items-center justify-center transition-colors">
                            <Plus className="size-4" />
                          </button>
                        </div>
                        <span className="text-[#E6C36A] font-bold">EGP {item.price.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-[#141720] rounded-xl p-6 shadow-sm border border-[#1E2230] sticky top-24">
                <h2 className="text-[#F5F6F8] font-['Playfair_Display'] font-bold text-xl mb-6">Order Summary</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-[#8A8F98]">
                    <span>Subtotal ({cart.length} items)</span>
                    <span>EGP {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[#8A8F98]">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'FREE' : `EGP ${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-[#8A8F98]">
                    <span>Tax</span>
                    <span>EGP {tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-[#1E2230] pt-3">
                    <div className="flex justify-between text-[#F5F6F8] font-bold">
                      <span>Total</span>
                      <span className="text-xl text-[#E6C36A]">EGP {total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {subtotal < 2000 && (
                  <div className="mb-6 p-3 bg-[#E6C36A]/10 border border-[#E6C36A]/20 rounded-lg text-sm text-[#E6C36A]">
                    Add EGP {(2000 - subtotal).toFixed(2)} more for free shipping!
                  </div>
                )}

                <button className="w-full bg-[#E6C36A] text-[#0B0D10] py-4 rounded-lg hover:brightness-110 transition-all font-bold flex items-center justify-center gap-2 mb-4">
                  Proceed to Checkout
                  <ArrowRight className="size-5" />
                </button>

                <button
                  onClick={() => navigate('marketplace')}
                  className="w-full text-[#E6C36A] py-3 rounded-lg border-2 border-[#E6C36A] hover:bg-[#E6C36A] hover:text-[#0B0D10] transition-all font-medium"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}