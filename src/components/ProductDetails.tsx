import React, { useState } from 'react';
import { Layout } from './Layout';
import { useApp } from '../App';
import { Heart, ShoppingCart, Star, Truck, Shield, RotateCcw, ChevronLeft } from 'lucide-react';

export function ProductDetails() {
  const { navigate, addToCart } = useApp();
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('black');
  const [quantity, setQuantity] = useState(1);

  const product = {
    id: '1',
    name: 'Urban Streetwear Hoodie',
    brand: 'StreetVibe',
    price: 1800,
    rating: 4.8,
    reviews: 234,
    description: 'Premium quality hoodie made from 100% organic cotton. Features a modern streetwear design with a comfortable fit. Perfect for casual wear and urban exploration.',
    images: [
      'https://images.unsplash.com/photo-1599012307530-d163bd04ecab?w=800',
      'https://images.unsplash.com/photo-1628068311627-0f5abce65050?w=800',
      'https://images.unsplash.com/photo-1599012307530-d163bd04ecab?w=800',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Black', value: 'black', hex: '#000000' },
      { name: 'White', value: 'white', hex: '#FFFFFF' },
      { name: 'Navy', value: 'navy', hex: '#1E3A8A' },
      { name: 'Gray', value: 'gray', hex: '#6B7280' },
    ],
    features: [
      '100% Organic Cotton',
      'Heavyweight 450gsm fabric',
      'Ribbed cuffs and waistband',
      'Kangaroo pocket',
      'Unisex fit',
    ],
    inStock: true,
  };

  const [currentImage, setCurrentImage] = useState(0);

  const reviews = [
    {
      id: '1',
      author: 'Alex Johnson',
      rating: 5,
      date: 'Dec 10, 2025',
      comment: 'Amazing quality! The fabric is thick and soft. Fits perfectly and looks great.',
      verified: true,
    },
    {
      id: '2',
      author: 'Sarah Chen',
      rating: 4,
      date: 'Dec 8, 2025',
      comment: 'Love the design and comfort. Slightly larger than expected but still great.',
      verified: true,
    },
    {
      id: '3',
      author: 'Mike Brown',
      rating: 5,
      date: 'Dec 5, 2025',
      comment: 'Best hoodie I own. Worth every penny. The print quality is exceptional.',
      verified: true,
    },
  ];

  return (
    <Layout>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate('marketplace')}
          className="flex items-center gap-2 text-[#8A8F98] hover:text-[#E6C36A] mb-6 transition-colors"
        >
          <ChevronLeft className="size-5" />
          Back to Marketplace
        </button>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div>
            <div className="bg-[#141720] rounded-2xl overflow-hidden mb-4 aspect-square border border-[#1E2230]">
              <img
                src={product.images[currentImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    currentImage === index ? 'border-[#E6C36A]' : 'border-[#1E2230] hover:border-[#8A8F98]'
                  }`}
                >
                  <img src={image} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <p className="text-[#E6C36A] mb-2 font-medium">{product.brand}</p>
            <h1 className="text-[#F5F6F8] mb-4 font-['Playfair_Display'] text-4xl font-bold">{product.name}</h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`size-5 ${
                      i < Math.floor(product.rating)
                        ? 'text-[#E6C36A] fill-[#E6C36A]'
                        : 'text-[#1E2230]'
                    }`}
                  />
                ))}
              </div>
              <span className="text-[#F5F6F8]">{product.rating}</span>
              <span className="text-[#8A8F98]">({product.reviews} reviews)</span>
            </div>

            <div className="text-3xl text-[#E6C36A] font-bold mb-6">EGP {product.price}</div>

            <p className="text-[#8A8F98] mb-6 leading-relaxed">{product.description}</p>

            {/* Size Selection */}
            <div className="mb-6">
              <label className="block text-[#F5F6F8] mb-3 font-medium">Select Size</label>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-6 py-3 rounded-lg border-2 transition-all font-medium ${
                      selectedSize === size
                        ? 'border-[#E6C36A] bg-[#E6C36A] text-[#0B0D10]'
                        : 'border-[#1E2230] bg-[#141720] text-[#8A8F98] hover:border-[#8A8F98]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className="mb-6">
              <label className="block text-[#F5F6F8] mb-3 font-medium">Select Color</label>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setSelectedColor(color.value)}
                    className={`size-12 rounded-full border-4 transition-all ${
                      selectedColor === color.value
                        ? 'border-[#E6C36A] scale-110'
                        : 'border-[#1E2230]'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <label className="block text-[#F5F6F8] mb-3 font-medium">Quantity</label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="size-10 rounded-lg border border-[#1E2230] bg-[#141720] text-[#F5F6F8] hover:border-[#E6C36A] transition-colors"
                >
                  -
                </button>
                <span className="text-xl w-12 text-center text-[#F5F6F8]">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="size-10 rounded-lg border border-[#1E2230] bg-[#141720] text-[#F5F6F8] hover:border-[#E6C36A] transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mb-8">
              <button
                onClick={() => {
                  addToCart({ ...product, selectedSize, selectedColor, quantity });
                  navigate('cart');
                }}
                className="flex-1 bg-[#E6C36A] text-[#0B0D10] py-4 rounded-lg hover:brightness-110 transition-all font-bold flex items-center justify-center gap-2"
              >
                <ShoppingCart className="size-5" />
                Add to Cart
              </button>
              <button className="size-14 border-2 border-[#1E2230] bg-[#141720] rounded-lg hover:border-[#E74C3C] hover:text-[#E74C3C] text-[#8A8F98] transition-colors flex items-center justify-center">
                <Heart className="size-6" />
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 mb-8 p-6 bg-[#141720] rounded-lg border border-[#1E2230]">
              <div className="text-center">
                <Truck className="size-6 text-[#E6C36A] mx-auto mb-2" />
                <p className="text-sm text-[#8A8F98]">Free Shipping</p>
              </div>
              <div className="text-center">
                <Shield className="size-6 text-[#E6C36A] mx-auto mb-2" />
                <p className="text-sm text-[#8A8F98]">Quality Assured</p>
              </div>
              <div className="text-center">
                <RotateCcw className="size-6 text-[#E6C36A] mx-auto mb-2" />
                <p className="text-sm text-[#8A8F98]">30-Day Returns</p>
              </div>
            </div>

            {/* Product Features */}
            <div>
              <h3 className="text-[#F5F6F8] mb-3 font-medium">Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-[#8A8F98]">
                    <div className="size-1.5 rounded-full bg-[#E6C36A]" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-['Playfair_Display'] font-bold text-[#F5F6F8]">Customer Reviews</h2>
            <button className="text-[#E6C36A] hover:text-[#F5F6F8] transition-colors">Write a Review</button>
          </div>

          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="bg-[#141720] p-6 rounded-xl border border-[#1E2230]">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[#F5F6F8] font-medium">{review.author}</span>
                      {review.verified && (
                        <span className="text-xs bg-[#2ECC71]/10 text-[#2ECC71] px-2 py-1 rounded border border-[#2ECC71]/20">
                          Verified Purchase
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`size-4 ${
                              i < review.rating
                                ? 'text-[#E6C36A] fill-[#E6C36A]'
                                : 'text-[#1E2230]'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-[#8A8F98]">{review.date}</span>
                    </div>
                  </div>
                </div>
                <p className="text-[#F5F6F8]/80">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}