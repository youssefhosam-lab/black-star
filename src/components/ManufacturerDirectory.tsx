import React, { useState } from 'react';
import { Layout } from './Layout';
import { Star, MapPin, Clock, Package, Award, MessageCircle, Filter } from 'lucide-react';

export function ManufacturerDirectory() {
  const [filter, setFilter] = useState('all');

  const manufacturers = [
    {
      id: '1',
      name: 'Premium Textile Co.',
      location: 'New York, USA',
      rating: 4.9,
      reviews: 234,
      specialties: ['Screen Printing', 'Embroidery', 'Custom Patterns'],
      capacity: 'High',
      turnaround: '3-5 days',
      completed: 1250,
      price: '$$$',
      certified: true,
      image: 'https://images.unsplash.com/photo-1606053929013-311c13f97b5f?w=400',
    },
    {
      id: '2',
      name: 'Urban Stitch Factory',
      location: 'Los Angeles, USA',
      rating: 4.7,
      reviews: 189,
      specialties: ['Digital Printing', 'Cut & Sew', 'Samples'],
      capacity: 'Medium',
      turnaround: '5-7 days',
      completed: 850,
      price: '$$',
      certified: true,
      image: 'https://images.unsplash.com/photo-1606053929013-311c13f97b5f?w=400',
    },
    {
      id: '3',
      name: 'Eco Fashion Makers',
      location: 'Portland, USA',
      rating: 4.8,
      reviews: 167,
      specialties: ['Organic Cotton', 'Sustainable Dyeing', 'Small Batches'],
      capacity: 'Small',
      turnaround: '7-10 days',
      completed: 620,
      price: '$$$$',
      certified: true,
      image: 'https://images.unsplash.com/photo-1606053929013-311c13f97b5f?w=400',
    },
    {
      id: '4',
      name: 'Quick Print Studios',
      location: 'Miami, USA',
      rating: 4.5,
      reviews: 342,
      specialties: ['DTG Printing', 'Fast Turnaround', 'Bulk Orders'],
      capacity: 'High',
      turnaround: '2-3 days',
      completed: 2100,
      price: '$',
      certified: false,
      image: 'https://images.unsplash.com/photo-1606053929013-311c13f97b5f?w=400',
    },
  ];

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'certified', label: 'Certified Only' },
    { id: 'fast', label: 'Fast Turnaround' },
    { id: 'eco', label: 'Eco-Friendly' },
  ];

  return (
    <Layout>
      <div className="p-6 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-gray-900 mb-2">Manufacturer Directory</h1>
          <p className="text-gray-600">Find the perfect manufacturing partner for your designs</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-4 py-2 rounded-lg transition-all ${
                filter === f.id
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:border-purple-500'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Manufacturers Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {manufacturers.map((manufacturer) => (
            <div
              key={manufacturer.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all"
            >
              <div className="h-48 bg-gray-100 relative">
                <img
                  src={manufacturer.image}
                  alt={manufacturer.name}
                  className="w-full h-full object-cover"
                />
                {manufacturer.certified && (
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
                    <Award className="size-4" />
                    Certified
                  </div>
                )}
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-gray-900 mb-1">{manufacturer.name}</h3>
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <MapPin className="size-4" />
                      {manufacturer.location}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 mb-1">
                      <Star className="size-5 text-yellow-400 fill-yellow-400" />
                      <span className="text-gray-900">{manufacturer.rating}</span>
                    </div>
                    <p className="text-sm text-gray-500">({manufacturer.reviews} reviews)</p>
                  </div>
                </div>

                {/* Specialties */}
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Specialties</p>
                  <div className="flex flex-wrap gap-2">
                    {manufacturer.specialties.map((specialty, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-purple-50 text-purple-700 text-sm rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <div className="text-sm text-gray-600 mb-1">Capacity</div>
                    <div className="text-gray-900">{manufacturer.capacity}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-600 mb-1">Turnaround</div>
                    <div className="text-gray-900">{manufacturer.turnaround}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-600 mb-1">Completed</div>
                    <div className="text-gray-900">{manufacturer.completed}</div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button className="flex-1 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2">
                    <Package className="size-4" />
                    Request Quote
                  </button>
                  <button className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <MessageCircle className="size-5 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
