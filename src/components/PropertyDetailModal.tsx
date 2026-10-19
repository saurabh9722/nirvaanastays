import React, { useState } from 'react';
import { X, MapPin, Check, Calendar, ShieldCheck, Info, Compass, Maximize2 } from 'lucide-react';
import { Property } from '../types.ts';
import { FallbackImage } from './FallbackImage.tsx';

interface PropertyDetailModalProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
  onBookTour: (property: Property) => void;
}

export const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({
  property,
  isOpen,
  onClose,
  onBookTour,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!isOpen || !property) return null;

  const images = property.galleryImages.length > 0 ? property.galleryImages : [property.coverImage];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#FFFDF9] rounded-2xl border border-[#E6E0D6] shadow-2xl flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="property-detail-title"
      >
        {/* Sticky Header with Close */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[#FFFDF9]/95 backdrop-blur-md border-b border-[#E6E0D6]">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded-md bg-[#F3EFE6] text-[#2C2623] border border-[#E6E0D6]">
              {property.propCode}
            </span>
            <span className="text-xs text-[#7A8B7B] font-medium flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" /> {property.location}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#6E655F] hover:text-[#2C2623] hover:bg-[#F3EFE6] transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Gallery View */}
          <div>
            <div className="rounded-2xl overflow-hidden border border-[#E6E0D6] aspect-[16/9] sm:aspect-[21/9] bg-[#F3EFE6]">
              <FallbackImage
                src={images[activeImageIndex] || property.coverImage}
                alt={property.name}
                className="w-full h-full object-cover"
              />
            </div>
            {images.length > 1 && (
              <div className="flex gap-2.5 mt-3 overflow-x-auto pb-1">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-14 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
                      activeImageIndex === idx ? 'border-[#C87D65] ring-1 ring-[#C87D65]' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <FallbackImage src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Title & Price Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#E6E0D6]">
            <div>
              <div className="flex items-center gap-2 text-xs text-[#6E655F] mb-1">
                <span>{property.gender}</span>
                <span>·</span>
                <span>{property.subLocation}</span>
                <span>·</span>
                <span className="text-[#7A8B7B] font-medium">All Bills Included</span>
              </div>
              <h2 id="property-detail-title" className="font-editorial text-3xl sm:text-4xl font-semibold text-[#2C2623]">
                {property.name}
              </h2>
              <p className="text-sm text-[#6E655F] mt-1">{property.tagline}</p>
            </div>

            <div className="text-left md:text-right shrink-0">
              <span className="text-xs text-[#6E655F] block">All-Inclusive Starting Rent</span>
              <div className="text-2xl sm:text-3xl font-semibold text-[#C87D65] tabular-nums font-editorial">
                <span className="font-sans">₹</span>{property.startingPrice.toLocaleString('en-IN')}
                <span className="text-xs text-[#6E655F] font-sans font-normal"> / month</span>
              </div>
              <span className="text-[11px] text-[#7A8B7B] font-medium">Zero Brokerage · 1-Month Deposit</span>
            </div>
          </div>

          {/* Suite Configuration Deep-Dive */}
          <div className="p-5 rounded-2xl bg-[#F3EFE6]/60 border border-[#E6E0D6] space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-[#2C2623] flex items-center gap-2">
                <Info className="w-4 h-4 text-[#C87D65]" />
                Room & Suite Architecture
              </h3>
              <span className="font-mono text-xs text-[#2C2623] font-medium">
                {property.enSuitesCount} En-Suites · {property.offSuitesCount} Off-Suites
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 bg-[#FFFDF9] rounded-xl border border-[#E6E0D6]">
                <div className="font-semibold text-[#2C2623] mb-1 flex items-center justify-between">
                  <span>En-Suite Bedroom</span>
                  <span className="text-[#C87D65] font-mono">{property.enSuitesCount} Available</span>
                </div>
                <p className="text-[#6E655F]">
                  Features private attached bathroom located directly inside your bedroom suite for complete autonomy.
                </p>
              </div>

              <div className="p-3.5 bg-[#FFFDF9] rounded-xl border border-[#E6E0D6]">
                <div className="font-semibold text-[#2C2623] mb-1 flex items-center justify-between">
                  <span>Off-Suite Bedroom</span>
                  <span className="text-[#7A8B7B] font-mono">{property.offSuitesCount} Available</span>
                </div>
                <p className="text-[#6E655F]">
                  Dedicated personal bathroom positioned immediately adjacent across the private hallway with personal key access.
                </p>
              </div>
            </div>
          </div>

          {/* About This Residence */}
          <div>
            <h3 className="font-editorial text-xl font-semibold text-[#2C2623] mb-2">About This Residence</h3>
            <p className="text-sm text-[#6E655F] leading-relaxed">{property.description}</p>
          </div>

          {/* Proximity / Location Highlights */}
          <div>
            <h3 className="font-editorial text-xl font-semibold text-[#2C2623] mb-3 flex items-center gap-2">
              <Compass className="w-5 h-5 text-[#C87D65]" />
              Strategic Pune Proximity
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {property.proximity.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-xl bg-[#FAF7F2] border border-[#E6E0D6] text-xs"
                >
                  <span className="font-medium text-[#2C2623]">{item.spot}</span>
                  <div className="text-right">
                    <span className="font-semibold text-[#C87D65] block">{item.distance}</span>
                    <span className="text-[11px] text-[#6E655F]">{item.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Included Amenities in this residence */}
          <div>
            <h3 className="font-editorial text-xl font-semibold text-[#2C2623] mb-3">
              Included Amenities & Services
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {property.amenities.map((amenity, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-[#FFFDF9] border border-[#E6E0D6] text-xs text-[#2C2623]"
                >
                  <Check className="w-4 h-4 text-[#7A8B7B] shrink-0" />
                  <span className="truncate">{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Specifications Table */}
          <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E6E0D6]">
            <h4 className="text-xs font-semibold text-[#2C2623] uppercase tracking-wider mb-3">
              Residence Specifications & Lease Terms
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
              <div>
                <span className="text-[#6E655F] block">Carpet Area</span>
                <span className="font-medium text-[#2C2623]">{property.specifications.carpetArea}</span>
              </div>
              <div>
                <span className="text-[#6E655F] block">Floors</span>
                <span className="font-medium text-[#2C2623]">{property.specifications.floors}</span>
              </div>
              <div>
                <span className="text-[#6E655F] block">Total Beds</span>
                <span className="font-medium text-[#2C2623]">{property.specifications.totalBeds} Residents</span>
              </div>
              <div>
                <span className="text-[#6E655F] block">Security Deposit</span>
                <span className="font-medium text-[#2C2623]">{property.specifications.securityDeposit}</span>
              </div>
              <div>
                <span className="text-[#6E655F] block">Notice Period</span>
                <span className="font-medium text-[#2C2623]">{property.specifications.noticePeriod}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer CTAs */}
        <div className="sticky bottom-0 z-20 flex items-center justify-between gap-4 px-6 py-4 bg-[#FFFDF9]/95 backdrop-blur-md border-t border-[#E6E0D6]">
          <div className="hidden sm:block">
            <span className="text-xs text-[#6E655F]">Ready to see {property.name}?</span>
            <p className="text-xs font-medium text-[#2C2623]">In-person and virtual video tours available daily</p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-[#E6E0D6] text-xs font-medium text-[#2C2623] hover:bg-[#F3EFE6] transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onBookTour(property);
              }}
              className="flex-1 sm:flex-none px-6 py-2.5 bg-[#C87D65] hover:bg-[#B26B54] text-white rounded-xl text-xs font-semibold tracking-wide transition-all shadow-sm flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" /> Schedule a Visit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
