import React, { useState } from 'react';
import { Layout } from './Layout';
import { useApp } from '../App';
import { Search, Filter, Heart, Star, ShoppingCart } from 'lucide-react';

export function Marketplace() {
  const { navigate, addToCart } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 10000]);

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 't-shirts', name: 'T-Shirts' },
    { id: 'hoodies', name: 'Hoodies' },
    { id: 'pants', name: 'Pants' },
    { id: 'accessories', name: 'Accessories' },
  ];

  const products = [
    {
      id: '1',
      name: 'Urban Streetwear Hoodie',
      brand: 'StreetVibe',
      price: 1800,
      rating: 4.8,
      reviews: 234,
      image: 'https://images.unsplash.com/photo-1599012307530-d163bd04ecab?w=400',
      category: 'hoodies',
      inStock: true,
    },
    {
      id: '2',
      name: 'Minimalist Cotton Tee',
      brand: 'CleanCut',
      price: 700,
      rating: 4.6,
      reviews: 189,
      image: 'https://images.unsplash.com/photo-1628068311627-0f5abce65050?w=400',
      category: 't-shirts',
      inStock: true,
    },
    {
      id: '3',
      name: 'Classic Denim Jacket',
      brand: 'Vintage Co',
      price: 2600,
      rating: 4.9,
      reviews: 312,
      image: 'https://images.unsplash.com/photo-1599012307530-d163bd04ecab?w=400',
      category: 'hoodies',
      inStock: true,
    },
    {
      id: '4',
      name: 'Premium Graphic Tee',
      brand: 'ArtWear',
      price: 920,
      rating: 4.7,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1628068311627-0f5abce65050?w=400',
      category: 't-shirts',
      inStock: true,
    },
    {
      id: '5',
      name: 'Vintage Oversized Hoodie',
      brand: 'RetroFit',
      price: 1600,
      rating: 4.5,
      reviews: 98,
      image: 'https://images.unsplash.com/photo-1599012307530-d163bd04ecab?w=400',
      category: 'hoodies',
      inStock: false,
    },
    {
      id: '6',
      name: 'Eco-Friendly Organic Tee',
      brand: 'GreenThreads',
      price: 800,
      rating: 4.8,
      reviews: 267,
      image: 'https://images.unsplash.com/photo-1628068311627-0f5abce65050?w=400',
      category: 't-shirts',
      inStock: true,
    },
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <Layout>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-['Playfair_Display'] font-bold text-[#F5F6F8] mb-2">Marketplace</h1>
          <p className="text-[#8A8F98]">Discover unique designs from local brands and creators</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-[#8A8F98]" />
            <input
              type="text"
              placeholder="Search products, brands..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-[#141720] rounded-lg border border-[#1E2230] text-[#F5F6F8] placeholder-[#8A8F98] focus:border-[#E6C36A] focus:outline-none transition-colors"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg transition-all font-medium ${
                  selectedCategory === category.id
                    ? 'bg-[#E6C36A] text-[#0B0D10]'
                    : 'bg-[#141720] text-[#8A8F98] border border-[#1E2230] hover:border-[#E6C36A]'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Price Range */}
          <div className="bg-[#141720] p-4 rounded-lg border border-[#1E2230]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[#8A8F98]">Price Range</span>
              <span className="text-[#E6C36A] font-bold">EGP {priceRange[0]} - EGP {priceRange[1]}</span>
            </div>
            <input
              type="range"
              min="0"
              max="10000"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
              className="w-full accent-[#E6C36A]"
            />
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4 text-[#8A8F98]">
          {filteredProducts.length} products found
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-[#141720] rounded-xl overflow-hidden border border-[#1E2230] hover:border-[#E6C36A] transition-all group"
            >
              <div
                className="relative aspect-square bg-[#1B1F2A] cursor-pointer"
                onClick={() => navigate('product-details')}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <button className="absolute top-3 right-3 size-10 bg-[#0B0D10]/50 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-[#E6C36A] hover:text-[#0B0D10] transition-colors text-[#F5F6F8]">
                  <Heart className="size-5" />
                </button>
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span className="text-[#F5F6F8] px-4 py-2 bg-[#0B0D10] rounded-lg border border-[#1E2230]">Out of Stock</span>
                  </div>
                )}
              </div>

              <div className="p-4">
                <p className="text-sm text-[#8A8F98] mb-1">{product.brand}</p>
                <h3
                  className="text-[#F5F6F8] font-medium mb-2 cursor-pointer hover:text-[#E6C36A] transition-colors"
                  onClick={() => navigate('product-details')}
                >
                  {product.name}
                </h3>

                <div className="flex items-center gap-1 mb-3">
                  <Star className="size-4 text-[#E6C36A] fill-[#E6C36A]" />
                  <span className="text-sm text-[#F5F6F8]">{product.rating}</span>
                  <span className="text-sm text-[#8A8F98]">({product.reviews})</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#E6C36A] font-bold text-lg">EGP {product.price}</span>
                  <button
                    onClick={() => {
                      addToCart(product);
                      // Show a toast notification here
                    }}
                    disabled={!product.inStock}
                    className="p-2 bg-[#E6C36A] text-[#0B0D10] rounded-lg hover:brightness-110 disabled:bg-[#1E2230] disabled:text-[#8A8F98] disabled:cursor-not-allowed transition-colors"
                  >
                    <ShoppingCart className="size-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-[#8A8F98] mb-4">
              <Filter className="size-16 mx-auto" />
            </div>
            <h3 className="text-[#F5F6F8] text-xl font-medium mb-2">No products found</h3>
            <p className="text-[#8A8F98]">Try adjusting your filters or search query</p>
          </div>
        )}
      </div>
    </Layout>
  );
}