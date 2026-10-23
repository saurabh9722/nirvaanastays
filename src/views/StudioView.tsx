import React from 'react';
import { Sparkles, Check, X, ShieldCheck, Utensils, Wifi, BedDouble, Laptop, ArrowRight, Calendar } from 'lucide-react';
import { PageRoute, Property } from '../types.ts';
import { PROPERTIES } from '../data/mockData.ts';
import { FallbackImage } from '../components/FallbackImage.tsx';
import { PerspectiveCard } from '../components/PerspectiveCard.tsx';

interface StudioViewProps {
  onNavigate: (route: PageRoute) => void;
  onBookProperty: (property: Property) => void;
  onOpenEnquire: () => void;
}

export const StudioView: React.FC<StudioViewProps> = ({
  onNavigate,
  onBookProperty,
  onOpenEnquire,
}) => {
  const studioProperty = PROPERTIES.find((p) => p.id === 'nirvana-studios') || PROPERTIES[3];

  return (
    <div className="space-y-24 pb-20 pt-8">
      {/* Hero Studio Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F4E6DF] text-[#C87D65] border border-[#E6E0D6] text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Sub-Page 3B · Independent Private Living</span>
            </div>

            <h1 className="font-editorial text-4xl sm:text-5xl font-semibold text-[#2C2623] leading-tight">
              Nirvaana Studio: The Luxury of Total Autonomy.
            </h1>

            <p className="text-base text-[#6E655F] leading-relaxed">
              Step into your own private haven in Viman Nagar. Designed for senior students, founders, researchers, and remote professionals who desire independence without the friction of apartment hunting or landlord surveillance.
            </p>

            <div className="p-4 rounded-2xl bg-[#FFFDF9] border border-[#E6E0D6] flex items-center justify-between text-xs">
              <div>
                <span className="text-[#6E655F] block">All-Inclusive Monthly Rent</span>
                <span className="font-editorial text-2xl font-semibold text-[#C87D65]">
                  <span className="font-sans">₹</span>28,000 <span className="text-xs font-sans font-normal text-[#6E655F]">/ month</span>
                </span>
              </div>
              <span className="text-[#7A8B7B] font-medium">Zero Brokerage · 1-Month Deposit</span>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => onBookProperty(studioProperty)}
                className="px-6 py-3.5 rounded-full bg-[#C87D65] hover:bg-[#B26B54] text-white text-xs font-semibold tracking-wide transition-all shadow-md flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" /> Schedule Studio Tour
              </button>

              <button
                onClick={() => onNavigate('properties')}
                className="px-6 py-3.5 rounded-full border border-[#2C2623] hover:bg-[#F3EFE6] text-[#2C2623] text-xs font-semibold transition-all"
              >
                Compare with Shared Suites
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <PerspectiveCard
              maxTilt={13}
              scale={1.03}
              glare={true}
              glareOpacity={0.25}
              depth={22}
              className="w-full"
            >
              <div className="rounded-3xl overflow-hidden border border-[#E6E0D6] shadow-xl aspect-[4/3] bg-[#F3EFE6]">
                <FallbackImage
                  src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80"
                  alt="Nirvaana Studio Interior View"
                  className="w-full h-full object-cover"
                />
              </div>
            </PerspectiveCard>
          </div>
        </div>
      </section>

      {/* 4 Signature Studio Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#7A8B7B]">
            Autonomous Suite Design
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl font-semibold text-[#2C2623] mt-1">
            Engineered for Deep Work & Rest
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <PerspectiveCard maxTilt={12} scale={1.025} glare={true} glareOpacity={0.2} containerClassName="h-full" className="h-full">
            <div className="p-6 rounded-2xl bg-[#FFFDF9] border border-[#E6E0D6] space-y-3 h-full">
              <Utensils className="w-6 h-6 text-[#C87D65]" />
              <h4 className="font-editorial text-lg font-semibold text-[#2C2623]">Private Kitchenette</h4>
              <p className="text-xs text-[#6E655F] leading-relaxed">
                Equipped with private induction stove, silent chimney, mini-fridge, microwave, and custom cutlery drawers.
              </p>
            </div>
          </PerspectiveCard>

          <PerspectiveCard maxTilt={12} scale={1.025} glare={true} glareOpacity={0.2} containerClassName="h-full" className="h-full">
            <div className="p-6 rounded-2xl bg-[#FFFDF9] border border-[#E6E0D6] space-y-3 h-full">
              <Sparkles className="w-6 h-6 text-[#7A8B7B]" />
              <h4 className="font-editorial text-lg font-semibold text-[#2C2623]">En-Suite Spa Bath</h4>
              <p className="text-xs text-[#6E655F] leading-relaxed">
                Glass-partitioned rain shower, ceramic vanity, instant geyser, and Kohler fixtures with bi-weekly sanitization.
              </p>
            </div>
          </PerspectiveCard>

          <PerspectiveCard maxTilt={12} scale={1.025} glare={true} glareOpacity={0.2} containerClassName="h-full" className="h-full">
            <div className="p-6 rounded-2xl bg-[#FFFDF9] border border-[#E6E0D6] space-y-3 h-full">
              <Laptop className="w-6 h-6 text-[#C87D65]" />
              <h4 className="font-editorial text-lg font-semibold text-[#2C2623]">Dedicated Study Desk</h4>
              <p className="text-xs text-[#6E655F] leading-relaxed">
                5-foot solid birch desk, ergonomic mesh swivel chair, pinboard, ambient task lighting, and personal 300 Mbps router.
              </p>
            </div>
          </PerspectiveCard>

          <PerspectiveCard maxTilt={12} scale={1.025} glare={true} glareOpacity={0.2} containerClassName="h-full" className="h-full">
            <div className="p-6 rounded-2xl bg-[#FFFDF9] border border-[#E6E0D6] space-y-3 h-full">
              <BedDouble className="w-6 h-6 text-[#7A8B7B]" />
              <h4 className="font-editorial text-lg font-semibold text-[#2C2623]">Queen Orthopedic Bed</h4>
              <p className="text-xs text-[#6E655F] leading-relaxed">
                Triple-layer memory foam mattress, hydraulic storage base, 100% organic cotton linen set, and bedside USB-C ports.
              </p>
            </div>
          </PerspectiveCard>
        </div>
      </section>

      {/* COMPARISON TABLE: NIRVAANA STUDIO VS TRADITIONAL 1BHK */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#C87D65]">
            Transparent Financial Comparison
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl font-semibold text-[#2C2623] mt-1">
            Nirvaana Studio vs. Traditional 1BHK Rental
          </h2>
          <p className="text-xs sm:text-sm text-[#6E655F] mt-2">
            See the honest real-world breakdown of renting a standalone 1BHK in Viman Nagar versus moving into Nirvaana Studio.
          </p>
        </div>

        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="rounded-2xl border border-[#E6E0D6] overflow-hidden bg-[#FFFDF9] shadow-sm">
              <table className="min-w-full divide-y divide-[#E6E0D6] text-xs sm:text-sm text-left">
                <thead className="bg-[#FAF7F2] font-semibold text-[#2C2623]">
                  <tr>
                    <th className="py-4 px-6">Cost & Lifestyle Parameter</th>
                    <th className="py-4 px-6 text-[#C87D65] bg-[#F4E6DF]/50">
                      Nirvaana Studio (Viman Nagar)
                    </th>
                    <th className="py-4 px-6 text-[#6E655F]">
                      Traditional 1BHK Rental in Pune
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E6E0D6]">
                  <tr>
                    <td className="py-4 px-6 font-medium text-[#2C2623]">Brokerage / Agent Commission</td>
                    <td className="py-4 px-6 text-[#7A8B7B] font-semibold bg-[#F4E6DF]/20">
                      ₹0 (Direct Zero Brokerage)
                    </td>
                    <td className="py-4 px-6 text-[#6E655F]">
                      1 to 2 Months Rent (₹25,000 – ₹50,000 lost)
                    </td>
                  </tr>

                  <tr>
                    <td className="py-4 px-6 font-medium text-[#2C2623]">Security Deposit Lock-In</td>
                    <td className="py-4 px-6 text-[#7A8B7B] font-semibold bg-[#F4E6DF]/20">
                      1 Month (100% Refundable in 7 Days)
                    </td>
                    <td className="py-4 px-6 text-[#6E655F]">
                      3 to 6 Months (₹75,000 – ₹1.5 Lakh locked)
                    </td>
                  </tr>

                  <tr>
                    <td className="py-4 px-6 font-medium text-[#2C2623]">Furniture & Appliance Setup</td>
                    <td className="py-4 px-6 text-[#7A8B7B] font-semibold bg-[#F4E6DF]/20">
                      ₹0 (Turnkey Ready with AC, Bed, Fridge, RO)
                    </td>
                    <td className="py-4 px-6 text-[#6E655F]">
                      ₹35,000+ upfront or ₹4,000/mo rental rentals
                    </td>
                  </tr>

                  <tr>
                    <td className="py-4 px-6 font-medium text-[#2C2623]">WiFi, Electricity & Utilities</td>
                    <td className="py-4 px-6 text-[#7A8B7B] font-semibold bg-[#F4E6DF]/20">
                      Included in Single Monthly Plan
                    </td>
                    <td className="py-4 px-6 text-[#6E655F]">
                      Separate ₹4,500 – ₹6,000 bills each month
                    </td>
                  </tr>

                  <tr>
                    <td className="py-4 px-6 font-medium text-[#2C2623]">Daily Housekeeping & Repairs</td>
                    <td className="py-4 px-6 text-[#7A8B7B] font-semibold bg-[#F4E6DF]/20">
                      Included (In-house professional team)
                    </td>
                    <td className="py-4 px-6 text-[#6E655F]">
                      Find and negotiate your own maid & plumber
                    </td>
                  </tr>

                  <tr>
                    <td className="py-4 px-6 font-medium text-[#2C2623]">Move-In Readiness</td>
                    <td className="py-4 px-6 text-[#7A8B7B] font-semibold bg-[#F4E6DF]/20">
                      Instant (Bring 1 Suitcase, Move-in in 10 mins)
                    </td>
                    <td className="py-4 px-6 text-[#6E655F]">
                      2 to 3 weeks of setup, deep cleaning & approvals
                    </td>
                  </tr>

                  <tr>
                    <td className="py-4 px-6 font-medium text-[#2C2623]">Notice & Flexibility</td>
                    <td className="py-4 px-6 text-[#7A8B7B] font-semibold bg-[#F4E6DF]/20">
                      30-Day Digital Notice
                    </td>
                    <td className="py-4 px-6 text-[#6E655F]">
                      Strict 11-month agreement lock-in with penalties
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#2C2623] text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <h3 className="font-editorial text-2xl sm:text-3xl font-semibold">
              Ready to Claim Your Nirvaana Studio?
            </h3>
            <p className="text-xs sm:text-sm text-white/80">
              Only 4 studio suites available for the upcoming academic and corporate intake in Symbiosis Viman Nagar.
            </p>
          </div>

          <div className="flex gap-3 shrink-0">
            <button
              onClick={() => onBookProperty(studioProperty)}
              className="px-6 py-3 rounded-full bg-[#C87D65] hover:bg-[#B26B54] text-white text-xs font-semibold tracking-wide transition-colors"
            >
              Book Studio Visit
            </button>
            <button
              onClick={onOpenEnquire}
              className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors"
            >
              Check Availability
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
