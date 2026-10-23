import React, { useState } from 'react';
import { Sparkles, Maximize2, MapPin } from 'lucide-react';
import { GalleryImage, PageRoute } from '../types.ts';
import { GALLERY_ITEMS } from '../data/mockData.ts';
import { FallbackImage } from '../components/FallbackImage.tsx';
import { PerspectiveCard } from '../components/PerspectiveCard.tsx';

interface GalleryViewProps {
  onNavigate: (route: PageRoute) => void;
  onSelectImage: (image: GalleryImage) => void;
  onOpenEnquire: () => void;
}

const CATEGORIES = [
  'All',
  'Bedrooms & Suites',
  'Nirvaana Studios',
  'Community Lounge',
  'Kitchen & Dining',
  'Fitness & Wellness',
] as const;

export const GalleryView: React.FC<GalleryViewProps> = ({
  onNavigate,
  onSelectImage,
  onOpenEnquire,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredImages =
    selectedCategory === 'All'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === selectedCategory);

  return (
    <div className="space-y-16 pb-20 pt-8">
      {/* Header */}
      <section className="text-center max-w-3xl mx-auto px-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#7A8B7B]">
          Visual Lookbook 5
        </span>
        <h1 className="font-editorial text-4xl sm:text-5xl font-semibold text-[#2C2623] mt-2 leading-tight">
          Spaces Crafted for Stillness & Inspiration
        </h1>
        <p className="text-sm sm:text-base text-[#6E655F] mt-3">
          Explore sun-drenched private bedrooms, shared culinary zones, peaceful study alcoves, and private studio apartments in Pune.
        </p>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-[#C87D65] text-white shadow-sm'
                  : 'bg-[#FFFDF9] text-[#2C2623] border border-[#E6E0D6] hover:bg-[#F3EFE6]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image) => (
            <PerspectiveCard
              key={image.id}
              maxTilt={14}
              scale={1.03}
              glare={true}
              glareOpacity={0.28}
              depth={20}
              className="h-full rounded-2xl"
              containerClassName="h-full"
            >
              <div
                onClick={() => onSelectImage(image)}
                className="group relative rounded-2xl overflow-hidden border border-[#E6E0D6] bg-[#FFFDF9] shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer aspect-[4/3] h-full"
              >
                <FallbackImage
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-4 h-4" />
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-[#F4E6DF] block">
                    {image.category}
                  </span>
                  <h3 className="font-editorial text-lg font-semibold mt-0.5 leading-snug">
                    {image.title}
                  </h3>
                  <p className="text-[11px] text-white/80 flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3 text-[#C87D65]" /> {image.property}
                  </p>
                </div>
              </div>
            </PerspectiveCard>
          ))}
        </div>
      </section>

      {/* CTA Bottom Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-[#FAF7F2] border border-[#E6E0D6] text-center max-w-2xl mx-auto space-y-4">
          <h3 className="font-editorial text-2xl font-semibold text-[#2C2623]">
            Like What You See? Experience It Live.
          </h3>
          <p className="text-xs sm:text-sm text-[#6E655F]">
            We host personal physical and video walkthroughs 7 days a week across our Viman Nagar and Koregaon Park properties.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={onOpenEnquire}
              className="px-6 py-3 rounded-full bg-[#C87D65] hover:bg-[#B26B54] text-white text-xs font-semibold tracking-wide transition-colors shadow-sm"
            >
              Book an In-Person Tour
            </button>
            <button
              onClick={() => onNavigate('properties')}
              className="px-6 py-3 rounded-full border border-[#2C2623] hover:bg-[#F3EFE6] text-[#2C2623] text-xs font-semibold transition-colors"
            >
              Browse Pricing & Plans
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
