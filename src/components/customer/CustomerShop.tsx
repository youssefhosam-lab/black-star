import { useState } from 'react';
import { useApp } from '../../App';
import { Bell, ChevronDown, Star } from 'lucide-react';
import Logo from '../../imports/Logo';

interface Brand {
  id: string;
  name: string;
  image: string;
  rating: number; // 0-1 for single star system
  tagline: string;
  story: string;
}

export function CustomerShop() {
  const { navigate, user } = useApp();
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);

  const brands: Brand[] = [
    {
      id: '1',
      name: 'Urban Collective',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600',
      rating: 0.92,
      tagline: 'Modern streetwear with purpose',
      story: 'Founded in 2020, Urban Collective brings together designers who believe in ethical production and timeless style.',
    },
    {
      id: '2',
      name: 'Minimal Studio',
      image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=600',
      rating: 0.88,
      tagline: 'Less is more. Always.',
      story: 'Minimal Studio creates elevated basics that last. Every piece is designed to be worn for years, not seasons.',
    },
    {
      id: '3',
      name: 'Heritage Co.',
      image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600',
      rating: 0.95,
      tagline: 'Craftsmanship meets contemporary',
      story: 'Heritage Co. combines traditional manufacturing techniques with modern design sensibilities.',
    },
    {
      id: '4',
      name: 'Luxe Threads',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600',
      rating: 0.87,
      tagline: 'Premium fabrics, refined cuts',
      story: 'Luxe Threads sources the finest materials from around the world to create pieces that feel as good as they look.',
    },
  ];

  const products = [
    {
      id: '1',
      name: 'Signature Black Hoodie',
      brand: 'Urban Collective',
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600',
      price: 89,
    },
    {
      id: '2',
      name: 'Essential White Tee',
      brand: 'Minimal Studio',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600',
      price: 45,
    },
    {
      id: '3',
      name: 'Classic Denim Jacket',
      brand: 'Heritage Co.',
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600',
      price: 179,
    },
  ];

  if (selectedBrand) {
    return (
      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#E5E7EB]">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <div className="w-8 h-8 text-[#0B0D10] cursor-pointer" onClick={() => navigate('home')}>
              <Logo showText={false} />
            </div>

            <nav className="hidden md:flex items-center gap-12">
              {['Studio', 'Orders', 'Shop'].map((item) => {
                const route = `customer-${item.toLowerCase()}`;
                const isActive = item === 'Shop';
                return (
                  <button
                    key={item}
                    onClick={() => navigate(route)}
                    className={`text-sm font-medium transition-colors tracking-wide ${
                      isActive ? 'text-[#0B0D10]' : 'text-[#9CA3AF] hover:text-[#E6C36A]'
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
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

        {/* Brand Profile */}
        <div className="container mx-auto px-6 py-16">
          <button
            onClick={() => setSelectedBrand(null)}
            className="text-sm text-[#9CA3AF] hover:text-[#0B0D10] transition-colors mb-8"
          >
            ← Back to Brands
          </button>

          {/* Brand Header */}
          <div className="mb-16">
            <h1 className="text-5xl font-['Playfair_Display'] font-bold text-[#0B0D10] mb-4">
              {selectedBrand.name}
            </h1>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <div className="relative w-6 h-6">
                  <Star className="w-6 h-6 text-[#E5E7EB] absolute" />
                  <div 
                    className="overflow-hidden absolute inset-0"
                    style={{ width: `${selectedBrand.rating * 100}%` }}
                  >
                    <Star className="w-6 h-6 text-[#E6C36A] fill-[#E6C36A]" />
                  </div>
                </div>
                <span className="text-sm font-medium text-[#0B0D10]">
                  {(selectedBrand.rating * 100).toFixed(0)}% Rating
                </span>
              </div>
            </div>
            <p className="text-lg text-[#9CA3AF] mb-6">{selectedBrand.tagline}</p>
            <p className="text-[#0B0D10] max-w-2xl">{selectedBrand.story}</p>
          </div>

          {/* Collection Grid */}
          <h2 className="text-2xl font-['Playfair_Display'] font-bold text-[#0B0D10] mb-8">
            Collection
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products
              .filter(p => p.brand === selectedBrand.name)
              .map((product) => (
                <div
                  key={product.id}
                  className="border border-[#E5E7EB] hover:border-[#0B0D10] transition-colors cursor-pointer group"
                  onClick={() => navigate('customer-product-details', { productId: product.id })}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-96 object-cover group-hover:opacity-90 transition-opacity"
                  />
                  <div className="p-6">
                    <h3 className="font-medium text-[#0B0D10] mb-2">{product.name}</h3>
                    <p className="text-lg font-['Playfair_Display'] font-bold text-[#0B0D10]">
                      ${product.price}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#E5E7EB]">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="w-8 h-8 text-[#0B0D10] cursor-pointer" onClick={() => navigate('home')}>
            <Logo showText={false} />
          </div>

          <nav className="hidden md:flex items-center gap-12">
            {['Home', 'Studio', 'Orders', 'Shop'].map((item) => {
              const route = item === 'Home' ? 'home' : `customer-${item.toLowerCase()}`;
              const isActive = item === 'Shop';
              return (
                <button
                  key={item}
                  onClick={() => navigate(route)}
                  className={`text-sm font-medium transition-colors tracking-wide ${
                    isActive ? 'text-[#0B0D10]' : 'text-[#9CA3AF] hover:text-[#E6C36A]'
                  }`}
                >
                  {item}
                </button>
              );
            })}
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

      {/* Shop Content */}
      <div className="container mx-auto px-6 py-16">
        <h1 className="text-5xl font-['Playfair_Display'] font-bold text-[#0B0D10] mb-4">
          Discover Local Brands
        </h1>
        <p className="text-lg text-[#9CA3AF] mb-16 max-w-2xl">
          Explore brands built on transparency, craftsmanship, and accountability.
        </p>

        {/* Brands Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {brands.map((brand) => (
            <div
              key={brand.id}
              onClick={() => setSelectedBrand(brand)}
              className="border border-[#E5E7EB] hover:border-[#0B0D10] transition-colors cursor-pointer group"
            >
              <img
                src={brand.image}
                alt={brand.name}
                className="w-full h-80 object-cover group-hover:opacity-90 transition-opacity"
              />
              <div className="p-8">
                <h2 className="text-2xl font-['Playfair_Display'] font-bold text-[#0B0D10] mb-3">
                  {brand.name}
                </h2>
                
                {/* Single Star Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="relative w-5 h-5">
                    <Star className="w-5 h-5 text-[#E5E7EB] absolute" />
                    <div 
                      className="overflow-hidden absolute inset-0"
                      style={{ width: `${brand.rating * 100}%` }}
                    >
                      <Star className="w-5 h-5 text-[#E6C36A] fill-[#E6C36A]" />
                    </div>
                  </div>
                  <span className="text-sm text-[#9CA3AF]">
                    {(brand.rating * 100).toFixed(0)}% Rating
                  </span>
                </div>

                <p className="text-[#9CA3AF]">{brand.tagline}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}