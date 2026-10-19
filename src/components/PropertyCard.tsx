import React from 'react';
import { MapPin, ArrowUpRight, Bed, ShieldCheck, Sparkles } from 'lucide-react';
import { Property } from '../types.ts';
import { FallbackImage } from './FallbackImage.tsx';
import { PerspectiveCard } from './PerspectiveCard.tsx';

interface PropertyCardProps {
  property: Property;
  onSelect: (property: Property) => void;
  onBook: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onSelect,
  onBook,
}) => {
  return (
    <PerspectiveCard
      containerClassName="h-full"
      className="h-full"
      maxTilt={12}
      scale={1.02}
      glare={true}
      glareOpacity={0.25}
      depth={16}
    >
      <article className="group bg-[#FFFDF9] rounded-2xl border border-[#E6E0D6] overflow-hidden hover:shadow-xl hover:border-[#C87D65]/50 transition-all duration-300 flex flex-col h-full">
      {/* Cover Media */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#F3EFE6]">
        <FallbackImage
          src={property.coverImage}
          alt={property.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <span className="font-mono text-[11px] font-semibold px-2.5 py-1 rounded-md bg-[#FFFDF9]/95 text-[#2C2623] shadow-sm backdrop-blur-sm border border-[#E6E0D6]">
            {property.propCode}
          </span>
          <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-[#FAF7F2]/95 text-[#2C2623] shadow-sm backdrop-blur-sm border border-[#E6E0D6]">
            {property.gender}
          </span>
        </div>

        {/* Bottom Configuration Banner */}
        <div className="absolute bottom-3 left-3 right-3">
          <div className="px-3 py-1.5 rounded-lg bg-[#2C2623]/80 backdrop-blur-md text-white flex items-center justify-between text-[11px] font-mono tracking-wider">
            <span>{property.enSuitesCount} EN-SUITES</span>
            <span className="opacity-40">|</span>
            <span>{property.offSuitesCount} OFF-SUITES</span>
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-[#7A8B7B] font-medium mb-1">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{property.location}</span>
          </div>

          <h3 className="font-editorial text-xl font-semibold text-[#2C2623] group-hover:text-[#C87D65] transition-colors">
            {property.name}
          </h3>

          <p className="text-xs text-[#6E655F] mt-1.5 line-clamp-2 leading-relaxed">
            {property.tagline} · {property.description}
          </p>
        </div>

        {/* Key Features Quick Strip */}
        <div className="pt-2 border-t border-[#E6E0D6] flex items-center justify-between text-xs text-[#6E655F]">
          <span className="truncate">Near {property.proximity[0]?.spot.split(' ')[0] || 'Symbiosis'} ({property.proximity[0]?.time || '5 min walk'})</span>
          <span className="text-[#7A8B7B] font-medium shrink-0">Zero Brokerage</span>
        </div>

        {/* Price & Action Row */}
        <div className="pt-1 flex items-center justify-between gap-3">
          <div>
            <span className="text-[11px] text-[#6E655F] block">All-Inclusive</span>
            <div className="font-editorial font-semibold text-xl text-[#2C2623] tabular-nums">
              <span className="font-sans">₹</span>{property.startingPrice.toLocaleString('en-IN')}
              <span className="text-xs font-sans font-normal text-[#6E655F]"> / mo</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onSelect(property)}
              className="px-3.5 py-2 text-xs font-semibold rounded-xl border border-[#E6E0D6] bg-[#FAF7F2] text-[#2C2623] hover:bg-[#F3EFE6] hover:border-[#2C2623] transition-colors flex items-center gap-1"
            >
              Know More
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onBook(property)}
              className="px-3.5 py-2 text-xs font-semibold rounded-xl bg-[#C87D65] hover:bg-[#B26B54] text-white transition-colors shadow-sm"
            >
              Book Tour
            </button>
          </div>
        </div>
      </div>
    </article>
    </PerspectiveCard>
  );
};
