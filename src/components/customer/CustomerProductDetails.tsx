import { useState } from 'react';
import { useApp } from '../../App';
import { Bell, ChevronDown, Star, ShoppingCart } from 'lucide-react';
import Logo from '../../imports/Logo';

export function CustomerProductDetails() {
  const { navigate, user, addToCart, routeParams } = useApp();
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);

  // Mock product data
  const product = {
    id: routeParams?.productId || '1',
    name: 'Signature Black Hoodie',
    brand: {
      name: 'Urban Collective',
      rating: 0.92,
    },
    manufacturer: {
      name: 'Milano Textiles',
      location: 'Milan, Italy',
      rating: 0.89,
    },
    price: 89,
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800',
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&sat=-100',
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&brightness=80',
    ],
    description: 'Our signature hoodie combines premium cotton fleece with a modern oversized fit. Designed for comfort and style, this piece features reinforced stitching and a unique interior lining.',
    fabric: {
      material: '100% Organic Cotton Fleece',
      weight: '380 GSM',
      care: 'Machine wash cold, tumble dry low',
    },
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  };

  const [currentImage, setCurrentImage] = useState(0);

  const handleAddToCart = () => {
    addToCart({
      ...product,
      selectedSize,
      quantity,
    });
    navigate('customer-cart');
  };

  const handleBuyNow = () => {
    addToCart({
      ...product,
      selectedSize,
      quantity,
    });
    navigate('customer-checkout');
  };

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
                className={`text-sm font-medium transition-colors tracking-wide ${
                  item === 'Shop' ? 'text-[#0B0D10]' : 'text-[#9CA3AF] hover:text-[#E6C36A]'
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

      {/* Product Details */}
      <div className="container mx-auto px-6 py-16">
        <button
          onClick={() => navigate('customer-shop')}
          className="text-sm text-[#9CA3AF] hover:text-[#0B0D10] transition-colors mb-8"
        >
          ← Back to Shop
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: Images */}
          <div>
            {/* Main Image */}
            <div className="mb-4 border border-[#E5E7EB]">
              <img
                src={product.images[currentImage]}
                alt={product.name}
                className="w-full aspect-square object-cover"
              />
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-3 gap-4">
              {product.images.map((image, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImage(idx)}
                  className={`border-2 transition-colors ${
                    currentImage === idx ? 'border-[#0B0D10]' : 'border-[#E5E7EB] hover:border-[#9CA3AF]'
                  }`}
                >
                  <img
                    src={image}
                    alt={`View ${idx + 1}`}
                    className="w-full aspect-square object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Details */}
          <div>
            <h1 className="text-4xl font-['Playfair_Display'] font-bold text-[#0B0D10] mb-4">
              {product.name}
            </h1>

            {/* Brand Info */}
            <div className="mb-6 pb-6 border-b border-[#E5E7EB]">
              <button
                onClick={() => navigate('customer-shop', { brandId: product.brand.name })}
                className="text-[#0B0D10] hover:text-[#E6C36A] transition-colors mb-2"
              >
                <span className="text-sm font-medium">{product.brand.name}</span>
              </button>
              <div className="flex items-center gap-2">
                <div className="relative w-4 h-4">
                  <Star className="w-4 h-4 text-[#E5E7EB] absolute" />
                  <div 
                    className="overflow-hidden absolute inset-0"
                    style={{ width: `${product.brand.rating * 100}%` }}
                  >
                    <Star className="w-4 h-4 text-[#E6C36A] fill-[#E6C36A]" />
                  </div>
                </div>
                <span className="text-xs text-[#9CA3AF]">
                  {(product.brand.rating * 100).toFixed(0)}% Brand Rating
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="mb-8">
              <p className="text-3xl font-['Playfair_Display'] font-bold text-[#0B0D10]">
                ${product.price}
              </p>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="text-sm font-medium text-[#0B0D10] mb-3 uppercase tracking-wide">
                Description
              </h3>
              <p className="text-[#9CA3AF] leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Fabric Info */}
            <div className="mb-8 p-6 bg-[#E5E7EB]/30">
              <h3 className="text-sm font-medium text-[#0B0D10] mb-4 uppercase tracking-wide">
                Fabric Details
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#9CA3AF]">Material</span>
                  <span className="text-[#0B0D10] font-medium">{product.fabric.material}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#9CA3AF]">Weight</span>
                  <span className="text-[#0B0D10] font-medium">{product.fabric.weight}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#9CA3AF]">Care</span>
                  <span className="text-[#0B0D10] font-medium">{product.fabric.care}</span>
                </div>
              </div>
            </div>

            {/* Manufacturer Info */}
            <div className="mb-8 pb-8 border-b border-[#E5E7EB]">
              <h3 className="text-sm font-medium text-[#0B0D10] mb-3 uppercase tracking-wide">
                Manufactured By
              </h3>
              <p className="text-[#0B0D10] font-medium mb-1">{product.manufacturer.name}</p>
              <p className="text-sm text-[#9CA3AF] mb-2">{product.manufacturer.location}</p>
              <div className="flex items-center gap-2">
                <div className="relative w-4 h-4">
                  <Star className="w-4 h-4 text-[#E5E7EB] absolute" />
                  <div 
                    className="overflow-hidden absolute inset-0"
                    style={{ width: `${product.manufacturer.rating * 100}%` }}
                  >
                    <Star className="w-4 h-4 text-[#E6C36A] fill-[#E6C36A]" />
                  </div>
                </div>
                <span className="text-xs text-[#9CA3AF]">
                  {(product.manufacturer.rating * 100).toFixed(0)}% Manufacturing Rating
                </span>
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-8">
              <h3 className="text-sm font-medium text-[#0B0D10] mb-4 uppercase tracking-wide">
                Select Size
              </h3>
              <div className="flex gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-6 py-3 border text-sm font-medium transition-colors ${
                      selectedSize === size
                        ? 'border-[#0B0D10] bg-[#0B0D10] text-white'
                        : 'border-[#E5E7EB] text-[#0B0D10] hover:border-[#0B0D10]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <h3 className="text-sm font-medium text-[#0B0D10] mb-4 uppercase tracking-wide">
                Quantity
              </h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-[#E5E7EB] hover:border-[#0B0D10] transition-colors flex items-center justify-center"
                >
                  −
                </button>
                <span className="text-lg font-medium text-[#0B0D10] w-12 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-[#E5E7EB] hover:border-[#0B0D10] transition-colors flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 px-8 py-4 border border-[#0B0D10] text-[#0B0D10] font-medium hover:bg-[#0B0D10] hover:text-white transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 px-8 py-4 bg-[#0B0D10] text-white font-medium hover:opacity-90 transition-opacity"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
