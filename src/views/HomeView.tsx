import React, { useState } from 'react';
import {
  Search,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  Clock,
  MapPin,
  HeartHandshake,
  Compass,
  Building2,
  Award,
  ArrowUpRight,
  AirVent,
  Coins,
  Receipt,
  CalendarClock,
  Utensils,
  Tv,
  Wifi,
  FileText,
  Dumbbell,
  Wrench,
  Tag,
  KeyRound,
  ArrowLeftRight,
  Palette,
  BedDouble,
  Shirt,
} from 'lucide-react';
import { Property, PageRoute } from '../types.ts';
import { PROPERTIES, AMENITIES_18 } from '../data/mockData.ts';
import { PropertyCard } from '../components/PropertyCard.tsx';
import { FallbackImage } from '../components/FallbackImage.tsx';
import { PerspectiveCard } from '../components/PerspectiveCard.tsx';
import { CustomSelect } from '../components/CustomSelect.tsx';

interface HomeViewProps {
  onNavigate: (route: PageRoute) => void;
  onSelectProperty: (property: Property) => void;
  onBookProperty: (property: Property) => void;
  onOpenEnquire: () => void;
  onOpenBrochure: () => void;
}

// Map amenity icons
const iconMap: Record<string, React.ReactNode> = {
  AirVent: <AirVent className="w-5 h-5 text-[#C87D65]" />,
  Coins: <Coins className="w-5 h-5 text-[#7A8B7B]" />,
  Receipt: <Receipt className="w-5 h-5 text-[#C87D65]" />,
  CalendarClock: <CalendarClock className="w-5 h-5 text-[#7A8B7B]" />,
  Utensils: <Utensils className="w-5 h-5 text-[#C87D65]" />,
  Sparkles: <Sparkles className="w-5 h-5 text-[#7A8B7B]" />,
  Tv: <Tv className="w-5 h-5 text-[#C87D65]" />,
  Wifi: <Wifi className="w-5 h-5 text-[#7A8B7B]" />,
  FileText: <FileText className="w-5 h-5 text-[#C87D65]" />,
  Dumbbell: <Dumbbell className="w-5 h-5 text-[#7A8B7B]" />,
  Wrench: <Wrench className="w-5 h-5 text-[#C87D65]" />,
  Tag: <Tag className="w-5 h-5 text-[#7A8B7B]" />,
  KeyRound: <KeyRound className="w-5 h-5 text-[#C87D65]" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5 text-[#7A8B7B]" />,
  ArrowLeftRight: <ArrowLeftRight className="w-5 h-5 text-[#C87D65]" />,
  Palette: <Palette className="w-5 h-5 text-[#7A8B7B]" />,
  BedDouble: <BedDouble className="w-5 h-5 text-[#C87D65]" />,
  Shirt: <Shirt className="w-5 h-5 text-[#7A8B7B]" />,
};

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onSelectProperty,
  onBookProperty,
  onOpenEnquire,
  onOpenBrochure,
}) => {
  // Quick Search Bar state
  const [searchLocation, setSearchLocation] = useState('Viman Nagar');
  const [searchRoomType, setSearchRoomType] = useState('All');
  const [searchGender, setSearchGender] = useState('All');

  const featuredProperties = PROPERTIES.slice(0, 4);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate('properties');
  };

  return (
    <div className="space-y-24 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 sm:pt-20 pb-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F4E6DF] text-[#C87D65] border border-[#E6E0D6] text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Pune’s Most Thoughtful Co-Living Sanctuary</span>
              </div>

              <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-[#2C2623] font-semibold leading-[1.12] tracking-tight text-balance">
                Find Your Calm in the Heart of the City. Welcome to{' '}
                <span className="text-[#C87D65] italic">Nirvaana Stays.</span>
              </h1>

              <p className="text-base sm:text-lg text-[#6E655F] leading-relaxed max-w-2xl">
                Pune’s most thoughtfully crafted co-living sanctuary for students and working professionals. Fully furnished spaces, all utility bills included, and a warm community waiting for you in Viman Nagar.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => onNavigate('properties')}
                  className="px-6 py-3.5 rounded-full bg-[#C87D65] hover:bg-[#B26B54] text-white text-sm font-semibold tracking-wide transition-all shadow-md hover:scale-105 flex items-center gap-2"
                >
                  Explore Spaces
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={onOpenBrochure}
                  className="px-6 py-3.5 rounded-full border border-[#2C2623] hover:bg-[#F3EFE6] text-[#2C2623] text-sm font-semibold transition-all"
                >
                  Download Brochure
                </button>

                <button
                  onClick={onOpenEnquire}
                  className="px-6 py-3.5 rounded-full bg-[#2C2623] hover:bg-black text-white text-sm font-semibold transition-all"
                >
                  Schedule a Visit
                </button>
              </div>

              {/* Social Proof Trust Kicker */}
              <div className="pt-4 flex items-center gap-6 text-xs text-[#6E655F]">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#7A8B7B]" />
                  <span>Zero Brokerage Always</span>
                </div>
                <span>·</span>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-[#7A8B7B]" />
                  <span>1-Month Refundable Deposit</span>
                </div>
                <span>·</span>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#7A8B7B]" />
                  <span>400m to Symbiosis Campus</span>
                </div>
              </div>
            </div>

            {/* Right Media Hero Card */}
            <div className="lg:col-span-5 relative">
              <PerspectiveCard
                maxTilt={12}
                scale={1.03}
                glare={true}
                glareOpacity={0.25}
                depth={22}
                className="w-full"
              >
                <div className="relative rounded-3xl overflow-hidden border border-[#E6E0D6] shadow-2xl bg-[#F3EFE6] aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/5]">
                  <FallbackImage
                    src="https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80"
                    alt="Nirvaana Willow Sunlit Suite"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Overlaid Card Info */}
                  <div className="absolute bottom-6 left-6 right-6 text-white p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[11px] font-mono tracking-wider uppercase text-[#F4E6DF]">
                          Featured Residence · NS-0901
                        </span>
                        <h3 className="font-editorial text-2xl font-semibold mt-0.5">Nirvaana Willow</h3>
                        <p className="text-xs text-white/80">Symbiosis Viman Nagar, Pune</p>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-white/70 block">Starts at</span>
                        <span className="font-editorial text-xl font-bold">₹19,500</span>
                      </div>
                    </div>
                  </div>
                </div>
              </PerspectiveCard>
            </div>
          </div>

          {/* Quick Search / Filter Bar */}
          <div className="mt-12 p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-[#FFFDF9] border border-[#E6E0D6] shadow-lg">
            <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6E655F] mb-1">
                  Location in Pune
                </label>
                <CustomSelect
                  name="location"
                  value={searchLocation}
                  onChange={(val) => setSearchLocation(val)}
                  options={[
                    { value: 'Viman Nagar', label: 'Viman Nagar (Symbiosis Campus)' },
                    { value: 'Kalyani Nagar', label: 'Kalyani Nagar (Cerebrum IT)' },
                    { value: 'Koregaon Park', label: 'Koregaon Park (North Main Rd)' },
                  ]}
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6E655F] mb-1">
                  Room Configuration
                </label>
                <CustomSelect
                  name="roomType"
                  value={searchRoomType}
                  onChange={(val) => setSearchRoomType(val)}
                  options={[
                    { value: 'All', label: 'All Room Types' },
                    { value: 'Single En-Suite', label: 'Single En-Suite (Private Bath)' },
                    { value: 'Double Sharing', label: 'Double Sharing (Cost Saver)' },
                    { value: 'Studio', label: 'Nirvaana Studio (Full Private)' },
                  ]}
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6E655F] mb-1">
                  Stay Preference
                </label>
                <CustomSelect
                  name="gender"
                  value={searchGender}
                  onChange={(val) => setSearchGender(val)}
                  options={[
                    { value: 'All', label: 'All Residents (Co-ed & Reserved)' },
                    { value: 'Girls Only', label: 'Girls Only Residences' },
                    { value: 'Co-ed', label: 'Co-ed Community Spaces' },
                  ]}
                />
              </div>

              <div className="pt-2 sm:pt-4 lg:pt-0">
                <button
                  type="submit"
                  className="w-full py-3 bg-[#C87D65] hover:bg-[#B26B54] text-white rounded-xl text-xs sm:text-sm font-semibold tracking-wide transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <Search className="w-4 h-4" /> Find Matching Stays
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* 2. INTRODUCTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#F3EFE6] via-[#FAF7F2] to-[#F4E6DF] border border-[#E6E0D6] text-center max-w-4xl mx-auto space-y-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#7A8B7B]">
            Redefining Urban Accommodation in Pune
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl text-[#2C2623] font-semibold leading-tight">
            Not a Cramped Hostel. Not a Lonely Apartment.
          </h2>
          <p className="text-sm sm:text-base text-[#6E655F] leading-relaxed max-w-2xl mx-auto">
            Nirvaana Stays bridges the gap between five-star hospitality and authentic community living. We furnish every room with Scandinavian oak, memory-foam sleep systems, 300 Mbps fiber Wi-Fi, loaded chef kitchens, and 3-tier biometric security—so your energy stays focused on academic breakthroughs and career goals.
          </p>
        </div>
      </section>

      {/* 3. NIRVAANA PUTS YOU(TH) FIRST — 3 CORE VALUE PILLARS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#C87D65]">
            Nirvaana Puts You(th) First
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl font-semibold text-[#2C2623] mt-1">
            Three Foundations of Mindful Living
          </h2>
          <p className="text-xs sm:text-sm text-[#6E655F] mt-2">
            Every square foot and daily service is engineered to eliminate friction from student and professional life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Pillar 1 */}
          <PerspectiveCard maxTilt={10} scale={1.02} glare={true} glareOpacity={0.18} containerClassName="h-full" className="h-full">
            <div className="p-8 rounded-3xl bg-[#FFFDF9] border border-[#E6E0D6] shadow-sm hover:shadow-md transition-shadow space-y-4 h-full">
              <div className="w-12 h-12 rounded-2xl bg-[#F4E6DF] text-[#C87D65] flex items-center justify-center font-editorial text-xl font-bold">
                01
              </div>
              <h3 className="font-editorial text-2xl font-semibold text-[#2C2623]">Honest Value</h3>
              <p className="text-sm text-[#6E655F] leading-relaxed">
                Space to stay, lounge, cook, study, and unwind. Tastefully furnished with all utility bills—high-speed Wi-Fi 6, electricity, gas, water, and housekeeping—included in one transparent monthly plan. Zero hidden maintenance charges.
              </p>
            </div>
          </PerspectiveCard>

          {/* Pillar 2 */}
          <PerspectiveCard maxTilt={10} scale={1.02} glare={true} glareOpacity={0.18} containerClassName="h-full" className="h-full">
            <div className="p-8 rounded-3xl bg-[#FFFDF9] border border-[#E6E0D6] shadow-sm hover:shadow-md transition-shadow space-y-4 h-full">
              <div className="w-12 h-12 rounded-2xl bg-[#F3EFE6] text-[#7A8B7B] flex items-center justify-center font-editorial text-xl font-bold">
                02
              </div>
              <h3 className="font-editorial text-2xl font-semibold text-[#2C2623]">Mindfully Designed</h3>
              <p className="text-sm text-[#6E655F] leading-relaxed">
                Ergonomic workspaces with acoustic comfort, circadian-friendly 2700K ambient lighting, triple-layer orthopedic mattresses, and secure smart storage tailored around your real daily routines and study habits.
              </p>
            </div>
          </PerspectiveCard>

          {/* Pillar 3 */}
          <PerspectiveCard maxTilt={10} scale={1.02} glare={true} glareOpacity={0.18} containerClassName="h-full" className="h-full">
            <div className="p-8 rounded-3xl bg-[#FFFDF9] border border-[#E6E0D6] shadow-sm hover:shadow-md transition-shadow space-y-4 h-full">
              <div className="w-12 h-12 rounded-2xl bg-[#F4E6DF] text-[#2C2623] flex items-center justify-center font-editorial text-xl font-bold">
                03
              </div>
              <h3 className="font-editorial text-2xl font-semibold text-[#2C2623]">Effortless Living</h3>
              <p className="text-sm text-[#6E655F] leading-relaxed">
                Zero brokerage, flexible pay-as-you-stay plans starting from 3 months, instant 5-minute digital contracts, easy room transfers across Pune, and exclusive annual stay privileges for extended peace of mind.
              </p>
            </div>
          </PerspectiveCard>
        </div>
      </section>

      {/* 4. THE NIRVAANA 3-POINT PERSPECTIVE */}
      <section className="bg-[#F3EFE6] py-20 border-y border-[#E6E0D6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#7A8B7B]">
              Our Guiding Manifesto
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-semibold text-[#2C2623] mt-1">
              The Nirvaana 3-Point Perspective
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <PerspectiveCard maxTilt={11} scale={1.025} glare={true} glareOpacity={0.2} containerClassName="h-full" className="h-full">
              <div className="p-6 sm:p-8 bg-[#FAF7F2] rounded-2xl border border-[#E6E0D6] space-y-3 h-full">
                <span className="text-xs font-mono text-[#C87D65] uppercase tracking-wider font-semibold">
                  Perspective 01
                </span>
                <h3 className="font-editorial text-xl font-semibold text-[#2C2623]">
                  Belonging Without Boundaries
                </h3>
                <p className="text-xs sm:text-sm text-[#6E655F] leading-relaxed">
                  Community first, always. We believe that true belonging never imposes forced mixers. Instead, we create warm communal living rooms, collaborative study tables, and acoustic music nights where connections emerge organically at your own pace.
                </p>
              </div>
            </PerspectiveCard>

            <PerspectiveCard maxTilt={11} scale={1.025} glare={true} glareOpacity={0.2} containerClassName="h-full" className="h-full">
              <div className="p-6 sm:p-8 bg-[#FAF7F2] rounded-2xl border border-[#E6E0D6] space-y-3 h-full">
                <span className="text-xs font-mono text-[#7A8B7B] uppercase tracking-wider font-semibold">
                  Perspective 02
                </span>
                <h3 className="font-editorial text-xl font-semibold text-[#2C2623]">
                  Crafted With Intention
                </h3>
                <p className="text-xs sm:text-sm text-[#6E655F] leading-relaxed">
                  Excellence in every detail. From the density of our memory foam to silent air conditioning compressors and water pressure in our rain showers—nothing in our spaces is accidental or cut to minimum budget standards.
                </p>
              </div>
            </PerspectiveCard>

            <PerspectiveCard maxTilt={11} scale={1.025} glare={true} glareOpacity={0.2} containerClassName="h-full" className="h-full">
              <div className="p-6 sm:p-8 bg-[#FAF7F2] rounded-2xl border border-[#E6E0D6] space-y-3 h-full">
                <span className="text-xs font-mono text-[#2C2623] uppercase tracking-wider font-semibold">
                  Perspective 03
                </span>
                <h3 className="font-editorial text-xl font-semibold text-[#2C2623]">
                  Transparency as Standard
                </h3>
                <p className="text-xs sm:text-sm text-[#6E655F] leading-relaxed">
                  Trust has no fine print. What you see is what you pay. We don't believe in broker cuts, surprise utility penalties, or delayed deposit returns. Your notice period and security refund terms are spelled out in clear plain English.
                </p>
              </div>
            </PerspectiveCard>
          </div>
        </div>
      </section>

      {/* 5. FEATURED PROPERTIES SHOWCASE ("WHERE YOU WOULD LOVE TO BE") */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#C87D65]">
              Featured Residences
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-semibold text-[#2C2623] mt-1">
              Where You Would Love to Be
            </h2>
            <p className="text-xs sm:text-sm text-[#6E655F] mt-1">
              Select residences walking distance from Symbiosis Viman Nagar and Pune tech corridors.
            </p>
          </div>

          <button
            onClick={() => onNavigate('properties')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C87D65] hover:text-[#B26B54] transition-colors"
          >
            <span>View All Pune Residences</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onSelect={onSelectProperty}
              onBook={onBookProperty}
            />
          ))}
        </div>
      </section>

      {/* 6. THE COMPLETE 18-POINT AMENITIES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#7A8B7B]">
            All-Inclusive Standard
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl font-semibold text-[#2C2623] mt-1">
            The Complete 18-Point Amenities Grid
          </h2>
          <p className="text-xs sm:text-sm text-[#6E655F] mt-2">
            Every single Nirvaana residence includes all 18 of these signature hospitality amenities under one monthly billing.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {AMENITIES_18.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-[#FFFDF9] border border-[#E6E0D6] hover:border-[#C87D65]/40 hover:shadow-sm transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] border border-[#E6E0D6] flex items-center justify-center mb-3">
                  {iconMap[item.icon] || <Sparkles className="w-5 h-5 text-[#C87D65]" />}
                </div>
                <h4 className="font-editorial font-semibold text-sm text-[#2C2623] mb-1">
                  {item.name}
                </h4>
                <p className="text-[11px] text-[#6E655F] leading-relaxed line-clamp-3">
                  {item.description}
                </p>
              </div>
              <span className="text-[10px] text-[#7A8B7B] font-mono mt-3 uppercase tracking-wider">
                {item.category}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 7. WHY PARTNER WITH US (PREVIEW BANNER) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#2C2623] text-white overflow-hidden relative shadow-xl">
          <div className="relative z-10 max-w-3xl space-y-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#F4E6DF]">
              Why Partner With Us · For Property Owners & Institutions
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-semibold leading-tight">
              Transforming Real Estate Into High-Yield Community Living
            </h2>
            <p className="text-xs sm:text-sm text-[#FAF7F2]/80 leading-relaxed">
              We partner with real estate owners, developers, and educational institutions across Pune to provide guaranteed lease payouts, mindful interior transformation, and complete facility management with 95%+ sustained occupancy.
            </p>

            {/* 4 Metric / Highlight Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15">
                <span className="font-editorial text-xl font-bold text-[#F4E6DF] block">4.9 / 5</span>
                <span className="text-[11px] text-white/80">Highest Rated in Pune</span>
              </div>
              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15">
                <span className="font-editorial text-xl font-bold text-[#F4E6DF] block">Long & Short</span>
                <span className="text-[11px] text-white/80">Stays In One Platform</span>
              </div>
              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15">
                <span className="font-editorial text-xl font-bold text-[#F4E6DF] block">Mindful Luxury</span>
                <span className="text-[11px] text-white/80">Premium Co-Living Brand</span>
              </div>
              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15">
                <span className="font-editorial text-xl font-bold text-[#F4E6DF] block">+35% Extra</span>
                <span className="text-[11px] text-white/80">Maximum Yield for Owners</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-3">
              <button
                onClick={() => onNavigate('owners')}
                className="px-6 py-3 rounded-full bg-[#C87D65] hover:bg-[#B26B54] text-white text-xs font-semibold tracking-wide transition-colors flex items-center gap-1.5"
              >
                <span>Partner as Property Owner</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('tie-up')}
                className="px-6 py-3 rounded-full bg-white/15 hover:bg-white/25 text-white text-xs font-semibold tracking-wide transition-colors"
              >
                Explore University & Corporate Tie-Ups
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
