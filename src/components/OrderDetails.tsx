import React from 'react';
import { Layout } from './Layout';
import { useApp } from '../App';
import { CheckCircle, Circle, ChevronLeft, Package, Scissors, Printer, Truck, MessageCircle } from 'lucide-react';

export function OrderDetails() {
  const { navigate } = useApp();

  const order = {
    id: 'ORD-2025-001',
    date: 'Dec 12, 2025',
    status: 'in-production',
    currentStage: 3,
    estimatedDelivery: 'Dec 18, 2025',
    manufacturer: {
      name: 'Premium Textile Co.',
      rating: 4.9,
      contact: 'Contact Manufacturer',
    },
    stages: [
      { id: 1, name: 'Order Confirmed', icon: CheckCircle, completed: true, date: 'Dec 12, 10:30 AM' },
      { id: 2, name: 'Cutting', icon: Scissors, completed: true, date: 'Dec 12, 2:15 PM' },
      { id: 3, name: 'Printing', icon: Printer, completed: false, inProgress: true, date: 'In Progress' },
      { id: 4, name: 'Tailoring', icon: Package, completed: false, date: 'Pending' },
      { id: 5, name: 'Quality Check', icon: CheckCircle, completed: false, date: 'Pending' },
      { id: 6, name: 'Shipping', icon: Truck, completed: false, date: 'Pending' },
    ],
    items: [
      {
        id: '1',
        name: 'Urban Streetwear Hoodie',
        size: 'M',
        color: 'Black',
        quantity: 1,
        price: 89.99,
        image: 'https://images.unsplash.com/photo-1599012307530-d163bd04ecab?w=200',
        customization: 'Custom logo print on front',
      },
    ],
    shipping: {
      address: '123 Fashion Street, New York, NY 10001',
      method: 'Standard Shipping',
      cost: 0,
    },
    payment: {
      method: 'Credit Card •••• 4242',
      subtotal: 89.99,
      shipping: 0,
      tax: 7.20,
      total: 97.19,
    },
  };

  return (
    <Layout>
      <div className="p-6 max-w-6xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate('orders')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ChevronLeft className="size-5" />
          Back to Orders
        </button>

        <div className="mb-8">
          <h1 className="text-gray-900 mb-2">Order {order.id}</h1>
          <p className="text-gray-600">Placed on {order.date}</p>
        </div>

        {/* Production Timeline */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 mb-8">
          <h2 className="text-gray-900 mb-6">Production Progress</h2>
          
          <div className="relative">
            {order.stages.map((stage, index) => {
              const Icon = stage.icon;
              const isLast = index === order.stages.length - 1;

              return (
                <div key={stage.id} className="relative">
                  <div className="flex gap-4">
                    {/* Timeline Line */}
                    <div className="flex flex-col items-center">
                      <div
                        className={`size-12 rounded-full flex items-center justify-center ${
                          stage.completed
                            ? 'bg-green-500 text-white'
                            : stage.inProgress
                            ? 'bg-blue-500 text-white animate-pulse'
                            : 'bg-gray-200 text-gray-400'
                        }`}
                      >
                        <Icon className="size-6" />
                      </div>
                      {!isLast && (
                        <div
                          className={`w-0.5 h-16 ${
                            stage.completed ? 'bg-green-500' : 'bg-gray-200'
                          }`}
                        />
                      )}
                    </div>

                    {/* Stage Info */}
                    <div className="flex-1 pb-16">
                      <h3 className="text-gray-900 mb-1">{stage.name}</h3>
                      <p className={`text-sm ${
                        stage.completed
                          ? 'text-green-600'
                          : stage.inProgress
                          ? 'text-blue-600'
                          : 'text-gray-500'
                      }`}>
                        {stage.date}
                      </p>
                      {stage.inProgress && (
                        <p className="text-sm text-gray-600 mt-2">
                          Your order is currently being printed. Estimated completion: 2 hours
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Manufacturer Info */}
          <div className="mt-6 p-4 bg-purple-50 rounded-lg flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Manufactured by</p>
              <p className="text-gray-900">{order.manufacturer.name}</p>
              <p className="text-sm text-yellow-600">⭐ {order.manufacturer.rating} rating</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
              <MessageCircle className="size-4" />
              {order.manufacturer.contact}
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Order Items */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-gray-900 mb-6">Order Items</h2>
              {order.items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="size-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-gray-900 mb-1">{item.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      Size: {item.size} • Color: {item.color} • Qty: {item.quantity}
                    </p>
                    {item.customization && (
                      <p className="text-sm text-purple-600 mb-2">
                        ✨ {item.customization}
                      </p>
                    )}
                    <p className="text-purple-600">${item.price}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-gray-900 mb-4">Shipping Address</h2>
              <p className="text-gray-700 mb-2">{order.shipping.address}</p>
              <p className="text-sm text-gray-600">
                {order.shipping.method} • Estimated delivery: {order.estimatedDelivery}
              </p>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 sticky top-24">
              <h2 className="text-gray-900 mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${order.payment.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>{order.payment.shipping === 0 ? 'FREE' : `$${order.payment.shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>${order.payment.tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-gray-900">
                    <span>Total</span>
                    <span className="text-xl">${order.payment.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="mb-6 pb-6 border-b border-gray-200">
                <p className="text-sm text-gray-600 mb-1">Payment Method</p>
                <p className="text-gray-900">{order.payment.method}</p>
              </div>

              <div className="space-y-3">
                <button className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  Contact Support
                </button>
                <button className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  Download Invoice
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
