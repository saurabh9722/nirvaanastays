import React from 'react';
import { Star, Quote, Sparkles, Building, MapPin, CheckCircle2 } from 'lucide-react';
import { PageRoute } from '../types.ts';
import { TESTIMONIALS } from '../data/mockData.ts';
import { FallbackImage } from '../components/FallbackImage.tsx';
import { PerspectiveCard } from '../components/PerspectiveCard.tsx';

interface TestimonialsViewProps {
  onNavigate: (route: PageRoute) => void;
  onOpenEnquire: () => void;
}

export const TestimonialsView: React.FC<TestimonialsViewProps> = ({
  onNavigate,
  onOpenEnquire,
}) => {
  return (
    <div className="space-y-16 pb-20 pt-8">
      {/* Header */}
      <section className="text-center max-w-3xl mx-auto px-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#7A8B7B]">
          Sub-Page 8A · Verified Resident Voices
        </span>
        <h1 className="font-editorial text-4xl sm:text-5xl font-semibold text-[#2C2623] mt-2 leading-tight">
          What Life Feels Like at Nirvaana Stays.
        </h1>
        <p className="text-sm sm:text-base text-[#6E655F] mt-3">
          Honest stories from Symbiosis scholars, legal apprentices, tech associates, and creative interns who found peace and productivity in Pune.
        </p>
      </section>

      {/* Testimonials Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TESTIMONIALS.map((item) => (
            <PerspectiveCard
              key={item.id}
              maxTilt={12}
              scale={1.025}
              glare={true}
              glareOpacity={0.2}
              depth={16}
              containerClassName="h-full"
              className="h-full rounded-3xl"
            >
              <div className="p-8 rounded-3xl bg-[#FFFDF9] border border-[#E6E0D6] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-6 h-full">
                <div className="space-y-4">
                  {/* Rating & Room Badge */}
                  <div className="flex items-center justify-between">
                    <div className="flex text-amber-500">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>

                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-[#FAF7F2] text-[#2C2623] border border-[#E6E0D6]">
                      {item.roomType}
                    </span>
                  </div>

                  <Quote className="w-8 h-8 text-[#C87D65]/40" />

                  <p className="text-xs sm:text-sm text-[#2C2623] leading-relaxed italic">
                    "{item.quote}"
                  </p>
                </div>

                {/* Author Strip */}
                <div className="pt-4 border-t border-[#E6E0D6] flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-[#E6E0D6] shrink-0">
                    <FallbackImage src={item.avatar} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-editorial text-base font-semibold text-[#2C2623]">{item.name}</h4>
                    <p className="text-xs text-[#6E655F]">{item.role}</p>
                    <p className="text-[11px] text-[#7A8B7B] font-medium mt-0.5">{item.property} · {item.duration}</p>
                  </div>
                </div>
              </div>
            </PerspectiveCard>
          ))}
        </div>
      </section>

      {/* Social Trust Metrics */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#FAF7F2] border border-[#E6E0D6] grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          <div>
            <span className="font-editorial text-3xl sm:text-4xl font-bold text-[#C87D65] block">5.0/5</span>
            <span className="text-xs text-[#6E655F] mt-1 block">Google Verified Score (17 Reviews)</span>
          </div>
          <div>
            <span className="font-editorial text-3xl sm:text-4xl font-bold text-[#2C2623] block">96%</span>
            <span className="text-xs text-[#6E655F] mt-1 block">Sustained Annual Re-Booking Rate</span>
          </div>
          <div>
            <span className="font-editorial text-3xl sm:text-4xl font-bold text-[#7A8B7B] block">5 Min</span>
            <span className="text-xs text-[#6E655F] mt-1 block">Average Walk to Symbiosis SLS/SCMS</span>
          </div>
          <div>
            <span className="font-editorial text-3xl sm:text-4xl font-bold text-[#C87D65] block">₹0</span>
            <span className="text-xs text-[#6E655F] mt-1 block">Brokerage Paid By Any Resident</span>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-xl mx-auto space-y-4">
          <h3 className="font-editorial text-2xl font-semibold text-[#2C2623]">
            Become Part of Our Pune Story
          </h3>
          <p className="text-xs sm:text-sm text-[#6E655F]">
            Limited single and double sharing suites available for the upcoming session in Viman Nagar.
          </p>
          <div className="pt-2">
            <button
              onClick={onOpenEnquire}
              className="px-6 py-3 rounded-full bg-[#C87D65] hover:bg-[#B26B54] text-white text-xs font-semibold tracking-wide transition-colors shadow-sm"
            >
              Schedule Your Personal Tour
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
