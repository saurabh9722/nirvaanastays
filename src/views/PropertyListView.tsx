import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, RotateCcw, MapPin, Sparkles, Bed, ShieldCheck } from 'lucide-react';
import { Property, PageRoute } from '../types.ts';
import { PROPERTIES } from '../data/mockData.ts';
import { filterProperties } from '../utils/property-logic.ts';
import { PropertyCard } from '../components/PropertyCard.tsx';

interface PropertyListViewProps {
  onNavigate: (route: PageRoute) => void;
  onSelectProperty: (property: Property) => void;
  onBookProperty: (property: Property) => void;
  onOpenEnquire: () => void;
}

export const PropertyListView: React.FC<PropertyListViewProps> = ({
  onNavigate,
  onSelectProperty,
  onBookProperty,
  onOpenEnquire,
}) => {
  const [location, setLocation] = useState('All');
  const [roomType, setRoomType] = useState('All');
  const [suiteType, setSuiteType] = useState<'All' | 'En-Suite' | 'Off-Suite'>('All');
  const [gender, setGender] = useState('All');
  const [maxPrice, setMaxPrice] = useState(30000);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProperties = useMemo(() => {
    return filterProperties(PROPERTIES, {
      location,
      roomType,
      suiteType,
      gender,
      maxPrice,
      searchQuery,
    });
  }, [location, roomType, suiteType, gender, maxPrice, searchQuery]);

  const handleResetFilters = () => {
    setLocation('All');
    setRoomType('All');
    setSuiteType('All');
    setGender('All');
    setMaxPrice(30000);
    setSearchQuery('');
  };

  return (
    <div className="space-y-12 pb-20 pt-8">
      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#E6E0D6]">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#7A8B7B] font-semibold uppercase tracking-wider mb-1">
              <span>Catalog 3A</span>
              <span>·</span>
              <span>Pune Managed Accommodations</span>
            </div>
            <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#2C2623]">
              Residences & Co-Living Spaces
            </h1>
            <p className="text-xs sm:text-sm text-[#6E655F] mt-1 max-w-xl">
              Filter by location, en-suite configuration, and price. Every residence features 18 signature amenities, zero brokerage, and 30-day notice flexibility.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-[#6E655F]">Need help deciding?</span>
            <button
              onClick={onOpenEnquire}
              className="px-4 py-2 rounded-xl bg-[#C87D65] hover:bg-[#B26B54] text-white text-xs font-semibold shadow-sm transition-colors"
            >
              Ask an Advisor
            </button>
          </div>
        </div>
      </section>

      {/* Filter Toolbar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-5 sm:p-6 rounded-3xl bg-[#FFFDF9] border border-[#E6E0D6] shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full sm:max-w-md">
              <Search className="w-4 h-4 text-[#6E655F] absolute left-3 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, landmark, or Property ID (e.g. NS-0901)..."
                className="w-full pl-9 pr-4 py-2 bg-[#FAF7F2] border border-[#E6E0D6] rounded-xl text-xs sm:text-sm text-[#2C2623] placeholder-[#A09891] focus:outline-none focus:ring-1 focus:ring-[#C87D65]"
              />
            </div>

            {/* Reset Button */}
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[#6E655F] hover:text-[#C87D65] transition-colors py-1.5 px-3 rounded-lg hover:bg-[#FAF7F2]"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          </div>

          {/* Filter Dropdowns Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-2">
            {/* Location */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6E655F] mb-1">
                Location
              </label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#E6E0D6] rounded-xl text-xs text-[#2C2623] focus:outline-none focus:ring-1 focus:ring-[#C87D65]"
              >
                <option value="All">All Locations</option>
                <option value="Viman Nagar">Viman Nagar (Symbiosis)</option>
                <option value="Kalyani Nagar">Kalyani Nagar (Cerebrum)</option>
                <option value="Koregaon Park">Koregaon Park (Lane 7)</option>
              </select>
            </div>

            {/* Occupancy / Room Type */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6E655F] mb-1">
                Room Type
              </label>
              <select
                value={roomType}
                onChange={(e) => setRoomType(e.target.value)}
                className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#E6E0D6] rounded-xl text-xs text-[#2C2623] focus:outline-none focus:ring-1 focus:ring-[#C87D65]"
              >
                <option value="All">All Types</option>
                <option value="Single En-Suite">Single En-Suite</option>
                <option value="Double Sharing">Double Sharing</option>
                <option value="Studio">Studio Apartment</option>
              </select>
            </div>

            {/* Suite Type */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6E655F] mb-1">
                Suite Arrangement
              </label>
              <select
                value={suiteType}
                onChange={(e) => setSuiteType(e.target.value as 'All' | 'En-Suite' | 'Off-Suite')}
                className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#E6E0D6] rounded-xl text-xs text-[#2C2623] focus:outline-none focus:ring-1 focus:ring-[#C87D65]"
              >
                <option value="All">En-Suite & Off-Suite</option>
                <option value="En-Suite">Has En-Suites (Attached)</option>
                <option value="Off-Suite">Has Off-Suites (Adjacent)</option>
              </select>
            </div>

            {/* Gender */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6E655F] mb-1">
                Community
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#E6E0D6] rounded-xl text-xs text-[#2C2623] focus:outline-none focus:ring-1 focus:ring-[#C87D65]"
              >
                <option value="All">All Stays</option>
                <option value="Girls Only">Girls Only</option>
                <option value="Co-ed">Co-ed Community</option>
              </select>
            </div>

            {/* Max Budget */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#6E655F]">
                  Max Price
                </label>
                <span className="text-[11px] font-mono font-semibold text-[#C87D65]">
                  ₹{maxPrice.toLocaleString('en-IN')}/mo
                </span>
              </div>
              <input
                type="range"
                min="17000"
                max="30000"
                step="1000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#C87D65] cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="mt-4 flex items-center justify-between text-xs text-[#6E655F] px-2">
          <span>
            Showing <strong className="text-[#2C2623] font-semibold">{filteredProperties.length}</strong> verified residences in Pune
          </span>
          <span className="text-[#7A8B7B] font-medium">All properties include 18 standard amenities</span>
        </div>
      </section>

      {/* Property Cards Catalog */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onSelect={onSelectProperty}
                onBook={onBookProperty}
              />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center rounded-3xl bg-[#FFFDF9] border border-[#E6E0D6] space-y-4 max-w-lg mx-auto">
            <div className="w-12 h-12 rounded-full bg-[#F4E6DF] text-[#C87D65] flex items-center justify-center mx-auto">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="font-editorial text-2xl font-semibold text-[#2C2623]">No matching residences found</h3>
            <p className="text-xs text-[#6E655F]">
              Try adjusting your price ceiling or selecting "All Locations" to view our complete Pune portfolio.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-5 py-2.5 bg-[#C87D65] text-white rounded-xl text-xs font-semibold hover:bg-[#B26B54] transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </section>

      {/* Studio Banner Kicker */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#F4E6DF] to-[#FAF7F2] border border-[#E6E0D6] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#C87D65]">
              Looking for Complete Privacy?
            </span>
            <h3 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#2C2623]">
              Discover Nirvaana Studio Apartments
            </h3>
            <p className="text-xs sm:text-sm text-[#6E655F] max-w-xl">
              Private induction kitchenette, spa-inspired en-suite bathroom, high-speed personal router, and dedicated ergonomic workstation—with zero brokerage.
            </p>
          </div>

          <button
            onClick={() => onNavigate('studio')}
            className="px-6 py-3 rounded-full bg-[#2C2623] hover:bg-black text-white text-xs font-semibold shrink-0 transition-colors shadow-sm"
          >
            Explore Nirvaana Studio
          </button>
        </div>
      </section>
    </div>
  );
};
