import React, { useState } from 'react';
import { useApp } from '../../App';
import { motion } from 'motion/react';
import { Bell, ChevronDown, Search, SlidersHorizontal, Star } from 'lucide-react';

// --- Mock Data ---
const modelsData = [
  {
    id: 'model-001',
    name: 'Layla Mansour',
    image: 'https://images.unsplash.com/photo-1725892604314-5d9c9f363757?w=600&h=800&fit=crop&q=80',
    gender: 'Female',
    height: '175 cm',
    chest: '86 cm',
    waist: '61 cm',
    hips: '89 cm',
    bodyType: 'Athletic',
    experience: 'Senior',
    rating: 4.9,
    rank: 'Elite',
    availability: 'Available',
    location: 'Cairo',
    tags: ['Editorial', 'Runway', 'Commercial']
  },
  {
    id: 'model-002',
    name: 'Ahmed Hassan',
    image: 'https://images.unsplash.com/photo-1618008797651-3eb256213400?w=600&h=800&fit=crop&q=80',
    gender: 'Male',
    height: '185 cm',
    chest: '98 cm',
    waist: '76 cm',
    hips: '95 cm',
    bodyType: 'Athletic',
    experience: 'Senior',
    rating: 4.8,
    rank: 'Platinum',
    availability: 'Available',
    location: 'Cairo',
    tags: ['Runway', 'Commercial']
  },
  {
    id: 'model-003',
    name: 'Nour Ibrahim',
    image: 'https://images.unsplash.com/photo-1612739980306-908bac4fc9fe?w=600&h=800&fit=crop&q=80',
    gender: 'Female',
    height: '172 cm',
    chest: '84 cm',
    waist: '60 cm',
    hips: '88 cm',
    bodyType: 'Slim',
    experience: 'Mid',
    rating: 4.7,
    rank: 'Gold',
    availability: 'Busy',
    location: 'Alexandria',
    tags: ['Editorial', 'Commercial']
  },
  {
    id: 'model-004',
    name: 'Omar Khalil',
    image: 'https://images.unsplash.com/photo-1643285740368-f7f1ba6b116f?w=600&h=800&fit=crop&q=80',
    gender: 'Male',
    height: '180 cm',
    chest: '96 cm',
    waist: '78 cm',
    hips: '94 cm',
    bodyType: 'Average',
    experience: 'Mid',
    rating: 4.6,
    rank: 'Gold',
    availability: 'Available',
    location: 'Cairo',
    tags: ['Commercial', 'Editorial']
  },
  {
    id: 'model-005',
    name: 'Yasmin El-Sayed',
    image: 'https://images.unsplash.com/photo-1669643783392-09d0a26c79e8?w=600&h=800&fit=crop&q=80',
    gender: 'Female',
    height: '178 cm',
    chest: '88 cm',
    waist: '62 cm',
    hips: '90 cm',
    bodyType: 'Athletic',
    experience: 'Senior',
    rating: 4.9,
    rank: 'Elite',
    availability: 'Available',
    location: 'Cairo',
    tags: ['Runway', 'Editorial', 'Commercial']
  },
  {
    id: 'model-006',
    name: 'Karim Nasser',
    image: 'https://images.unsplash.com/photo-1646526802765-cdb3cd36d87d?w=600&h=800&fit=crop&q=80',
    gender: 'Male',
    height: '183 cm',
    chest: '100 cm',
    waist: '80 cm',
    hips: '96 cm',
    bodyType: 'Muscular',
    experience: 'Junior',
    rating: 4.5,
    rank: 'Silver',
    availability: 'Available',
    location: 'Giza',
    tags: ['Commercial']
  },
];

// --- Components ---

const Header = () => {
  const { navigate, setUser } = useApp();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 h-[72px] bg-[#0B0D10] border-b border-[#1E2230] z-50">
      <div className="h-full max-w-[1800px] mx-auto px-8 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="size-8 bg-white flex items-center justify-center">
            <span className="text-[#0B0D10] text-xs font-semibold">★</span>
          </div>
          <span className="text-white text-sm tracking-wide">BLACK STAR</span>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={() => navigate('brand-dashboard')}
            className="text-xs uppercase tracking-[0.1em] text-white hover:text-[#E6C36A] transition-all"
          >
            Dashboard
          </button>
          <button
            onClick={() => navigate('brand-production')}
            className="text-xs uppercase tracking-[0.1em] text-white hover:text-[#E6C36A] transition-all"
          >
            Production
          </button>
          <button
            onClick={() => navigate('models-directory')}
            className="text-xs uppercase tracking-[0.1em] text-white border-b-2 border-[#E6C36A] pb-1"
          >
            Models
          </button>
          <button
            onClick={() => navigate('brand-community')}
            className="text-xs uppercase tracking-[0.1em] text-white hover:text-[#E6C36A] transition-all"
          >
            Community
          </button>
          <button
            onClick={() => navigate('model-analytics')}
            className="text-xs uppercase tracking-[0.1em] text-white hover:text-[#E6C36A] transition-all"
          >
            Analytics
          </button>
        </nav>

        {/* Profile Menu */}
        <div className="flex items-center gap-6">
          <button className="relative text-white hover:text-[#E6C36A] transition-colors">
            <Bell className="size-5" />
            <span className="absolute -top-1 -right-1 size-2 bg-[#E6C36A] rounded-full" />
          </button>
          
          <div className="relative">
            <button 
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 text-white hover:text-[#E6C36A] transition-colors"
            >
              <div className="size-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-[#0B0D10] text-xs font-semibold">BS</span>
              </div>
              <ChevronDown className="size-4" />
            </button>

            {showProfileMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 top-12 w-48 bg-white border border-[#E5E7EB] shadow-lg"
              >
                <button className="w-full px-4 py-3 text-left text-xs uppercase tracking-wide hover:bg-[#FAFAFA] transition-colors">
                  Settings
                </button>
                <button 
                  onClick={() => {
                    setUser(null);
                    navigate('welcome');
                  }}
                  className="w-full px-4 py-3 text-left text-xs uppercase tracking-wide hover:bg-[#FAFAFA] transition-colors border-t border-[#E5E7EB]"
                >
                  Logout
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

const FilterSidebar = ({ filters, setFilters }: any) => {
  const handleReset = () => {
    setFilters({
      search: '',
      gender: '',
      heightMin: '',
      heightMax: '',
      bodyType: '',
      experience: '',
      availability: '',
      ratingMin: '',
      location: '',
      tags: []
    });
  };

  const toggleTag = (tag: string) => {
    setFilters((prev: any) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t: string) => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  return (
    <aside className="sticky top-[88px] h-[calc(100vh-104px)] overflow-y-auto bg-white border-r border-[#E5E7EB] p-6 w-[280px]">
      <div className="flex items-center gap-2 mb-6">
        <SlidersHorizontal className="size-5 text-[#6B7280]" />
        <h3 className="text-sm uppercase tracking-wide text-[#0B0D10] font-medium">Filters</h3>
      </div>

      <div className="space-y-6">
        {/* Search */}
        <div>
          <label className="text-xs uppercase tracking-wide text-[#6B7280] mb-2 block">
            Search
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#6B7280]" />
            <input
              type="text"
              placeholder="Name or ID"
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="w-full pl-10 pr-3 py-2 border border-[#E5E7EB] text-sm text-[#0B0D10] focus:outline-none focus:border-[#E6C36A]"
            />
          </div>
        </div>

        {/* Gender */}
        <div>
          <label className="text-xs uppercase tracking-wide text-[#6B7280] mb-2 block">
            Gender
          </label>
          <select
            value={filters.gender}
            onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
            className="w-full px-3 py-2 border border-[#E5E7EB] text-sm text-[#0B0D10] focus:outline-none focus:border-[#E6C36A]"
          >
            <option value="">All</option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
          </select>
        </div>

        {/* Height Range */}
        <div>
          <label className="text-xs uppercase tracking-wide text-[#6B7280] mb-2 block">
            Height Range (cm)
          </label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              placeholder="Min"
              value={filters.heightMin}
              onChange={(e) => setFilters({ ...filters, heightMin: e.target.value })}
              className="px-3 py-2 border border-[#E5E7EB] text-sm text-[#0B0D10] focus:outline-none focus:border-[#E6C36A]"
            />
            <input
              type="number"
              placeholder="Max"
              value={filters.heightMax}
              onChange={(e) => setFilters({ ...filters, heightMax: e.target.value })}
              className="px-3 py-2 border border-[#E5E7EB] text-sm text-[#0B0D10] focus:outline-none focus:border-[#E6C36A]"
            />
          </div>
        </div>

        {/* Body Type */}
        <div>
          <label className="text-xs uppercase tracking-wide text-[#6B7280] mb-2 block">
            Body Type
          </label>
          <select
            value={filters.bodyType}
            onChange={(e) => setFilters({ ...filters, bodyType: e.target.value })}
            className="w-full px-3 py-2 border border-[#E5E7EB] text-sm text-[#0B0D10] focus:outline-none focus:border-[#E6C36A]"
          >
            <option value="">All</option>
            <option value="Slim">Slim</option>
            <option value="Athletic">Athletic</option>
            <option value="Average">Average</option>
            <option value="Muscular">Muscular</option>
          </select>
        </div>

        {/* Experience Level */}
        <div>
          <label className="text-xs uppercase tracking-wide text-[#6B7280] mb-2 block">
            Experience
          </label>
          <select
            value={filters.experience}
            onChange={(e) => setFilters({ ...filters, experience: e.target.value })}
            className="w-full px-3 py-2 border border-[#E5E7EB] text-sm text-[#0B0D10] focus:outline-none focus:border-[#E6C36A]"
          >
            <option value="">All</option>
            <option value="Junior">Junior</option>
            <option value="Mid">Mid-Level</option>
            <option value="Senior">Senior</option>
          </select>
        </div>

        {/* Availability */}
        <div>
          <label className="text-xs uppercase tracking-wide text-[#6B7280] mb-2 block">
            Availability
          </label>
          <select
            value={filters.availability}
            onChange={(e) => setFilters({ ...filters, availability: e.target.value })}
            className="w-full px-3 py-2 border border-[#E5E7EB] text-sm text-[#0B0D10] focus:outline-none focus:border-[#E6C36A]"
          >
            <option value="">All</option>
            <option value="Available">Available</option>
            <option value="Busy">Busy</option>
          </select>
        </div>

        {/* Rating Range */}
        <div>
          <label className="text-xs uppercase tracking-wide text-[#6B7280] mb-2 block">
            Minimum Rating
          </label>
          <select
            value={filters.ratingMin}
            onChange={(e) => setFilters({ ...filters, ratingMin: e.target.value })}
            className="w-full px-3 py-2 border border-[#E5E7EB] text-sm text-[#0B0D10] focus:outline-none focus:border-[#E6C36A]"
          >
            <option value="">All</option>
            <option value="4.5">4.5+</option>
            <option value="4.7">4.7+</option>
            <option value="4.8">4.8+</option>
          </select>
        </div>

        {/* Location */}
        <div>
          <label className="text-xs uppercase tracking-wide text-[#6B7280] mb-2 block">
            Location
          </label>
          <select
            value={filters.location}
            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
            className="w-full px-3 py-2 border border-[#E5E7EB] text-sm text-[#0B0D10] focus:outline-none focus:border-[#E6C36A]"
          >
            <option value="">All</option>
            <option value="Cairo">Cairo</option>
            <option value="Alexandria">Alexandria</option>
            <option value="Giza">Giza</option>
          </select>
        </div>

        {/* Tags */}
        <div>
          <label className="text-xs uppercase tracking-wide text-[#6B7280] mb-2 block">
            Tags
          </label>
          <div className="space-y-2">
            {['Runway', 'Editorial', 'Commercial'].map((tag) => (
              <label key={tag} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.tags.includes(tag)}
                  onChange={() => toggleTag(tag)}
                  className="size-4 accent-[#E6C36A]"
                />
                <span className="text-sm text-[#0B0D10]">{tag}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="pt-6 space-y-2 border-t border-[#E5E7EB]">
          <button
            onClick={handleReset}
            className="w-full py-2 text-xs uppercase tracking-wide text-[#6B7280] hover:text-[#0B0D10] transition-colors border border-[#E5E7EB] hover:border-[#0B0D10]"
          >
            Reset
          </button>
        </div>
      </div>
    </aside>
  );
};

const ModelCard = ({ model }: { model: any }) => {
  const { navigate } = useApp();
  const [isHovered, setIsHovered] = useState(false);

  const getRankColor = (rank: string) => {
    const colors: any = {
      'Bronze': '#CD7F32',
      'Silver': '#C0C0C0',
      'Gold': '#E6C36A',
      'Platinum': '#E5E4E2',
      'Elite': '#E6C36A'
    };
    return colors[rank] || '#6B7280';
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => navigate('model-profile', { modelId: model.id })}
      className="bg-white border border-[#E5E7EB] overflow-hidden cursor-pointer group"
    >
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-[#F5F5F5]">
        <motion.img
          src={model.image}
          alt={model.name}
          className="w-full h-full object-cover grayscale"
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.4 }}
        />
        
        {/* Availability Indicator */}
        <div className="absolute top-4 right-4">
          <div className={`size-3 rounded-full ${
            model.availability === 'Available' ? 'bg-green-500' : 'bg-red-500'
          }`} />
        </div>

        {/* Stats Overlay on Hover */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-black/70 flex items-center justify-center"
        >
          <div className="text-white text-center px-4">
            <div className="space-y-2 mb-4">
              <p className="text-xs uppercase tracking-wide text-white/70">Measurements</p>
              <div className="grid grid-cols-3 gap-3 text-xs">
                <div>
                  <p className="text-white/70">Chest</p>
                  <p className="font-mono">{model.chest}</p>
                </div>
                <div>
                  <p className="text-white/70">Waist</p>
                  <p className="font-mono">{model.waist}</p>
                </div>
                <div>
                  <p className="text-white/70">Hips</p>
                  <p className="font-mono">{model.hips}</p>
                </div>
              </div>
            </div>
            <button className="text-xs uppercase tracking-wide text-white underline underline-offset-4">
              View Profile →
            </button>
          </div>
        </motion.div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="text-sm uppercase tracking-wide text-[#0B0D10] font-medium mb-3">
          {model.name}
        </h3>

        {/* Key Stats */}
        <div className="space-y-2 text-xs mb-4">
          <div className="flex items-center justify-between">
            <span className="text-[#6B7280]">Height</span>
            <span className="text-[#0B0D10] font-mono">{model.height}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#6B7280]">Experience</span>
            <span className="text-[#0B0D10]">{model.experience}</span>
          </div>
        </div>

        {/* Rating & Rank */}
        <div className="flex items-center justify-between pt-3 border-t border-[#E5E7EB]">
          <div className="flex items-center gap-1">
            <Star className="size-3 text-[#E6C36A] fill-[#E6C36A]" />
            <span className="text-xs font-mono text-[#0B0D10]">{model.rating}</span>
          </div>
          <div
            className="px-2 py-1 text-[10px] uppercase tracking-wide border"
            style={{ 
              borderColor: getRankColor(model.rank),
              color: getRankColor(model.rank)
            }}
          >
            {model.rank}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export function ModelsDirectoryPage() {
  const [filters, setFilters] = useState({
    search: '',
    gender: '',
    heightMin: '',
    heightMax: '',
    bodyType: '',
    experience: '',
    availability: '',
    ratingMin: '',
    location: '',
    tags: [] as string[]
  });

  // Filter logic
  const filteredModels = modelsData.filter(model => {
    if (filters.search && !model.name.toLowerCase().includes(filters.search.toLowerCase()) && !model.id.includes(filters.search)) {
      return false;
    }
    if (filters.gender && model.gender !== filters.gender) return false;
    if (filters.heightMin && parseInt(model.height) < parseInt(filters.heightMin)) return false;
    if (filters.heightMax && parseInt(model.height) > parseInt(filters.heightMax)) return false;
    if (filters.bodyType && model.bodyType !== filters.bodyType) return false;
    if (filters.experience && model.experience !== filters.experience) return false;
    if (filters.availability && model.availability !== filters.availability) return false;
    if (filters.ratingMin && model.rating < parseFloat(filters.ratingMin)) return false;
    if (filters.location && model.location !== filters.location) return false;
    if (filters.tags.length > 0 && !filters.tags.some(tag => model.tags.includes(tag))) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Header />

      <div className="pt-[72px] flex">
        {/* Filter Sidebar */}
        <FilterSidebar filters={filters} setFilters={setFilters} />

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="max-w-[1600px] mx-auto">
            {/* Page Title */}
            <div className="mb-8">
              <h1 className="font-['Playfair_Display'] text-4xl text-[#0B0D10] mb-2">
                Models
              </h1>
              <p className="text-sm text-[#6B7280]">
                {filteredModels.length} model{filteredModels.length !== 1 ? 's' : ''} available
              </p>
            </div>

            {/* Models Grid */}
            {filteredModels.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredModels.map((model) => (
                  <ModelCard key={model.id} model={model} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-[#6B7280] text-sm uppercase tracking-wide">
                  No models match your filters
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}