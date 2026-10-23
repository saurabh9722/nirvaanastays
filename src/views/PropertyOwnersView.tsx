import React, { useState, useMemo } from 'react';
import {
  TrendingUp,
  ShieldCheck,
  Wrench,
  CalendarCheck,
  ArrowRight,
  CheckCircle2,
  Building,
  Sparkles,
  Calculator,
} from 'lucide-react';
import { PropertyOwnerFormData, PageRoute } from '../types.ts';
import { calculateOwnerYield, validatePhone, validateEmail } from '../utils/property-logic.ts';

interface PropertyOwnersViewProps {
  onNavigate: (route: PageRoute) => void;
  onOpenEnquire: () => void;
}

export const PropertyOwnersView: React.FC<PropertyOwnersViewProps> = ({
  onNavigate,
  onOpenEnquire,
}) => {
  // Calculator state
  const [calcUnits, setCalcUnits] = useState(12);
  const [calcRent, setCalcRent] = useState(18000);

  const yieldData = useMemo(() => {
    return calculateOwnerYield({
      numberOfUnits: calcUnits,
      expectedRentPerUnit: calcRent,
      estimatedOccupancyPercent: 95,
      traditionalOccupancyPercent: 75,
    });
  }, [calcUnits, calcRent]);

  // Form state
  const [formData, setFormData] = useState<PropertyOwnerFormData>({
    ownerName: '',
    phone: '',
    email: '',
    propertyLocation: 'Viman Nagar',
    propertyType: 'Standalone Building',
    numberOfRooms: '10–20 Rooms',
    builtUpArea: '4,500 sq.ft',
    currentStatus: 'Vacant / Ready to Move',
    additionalNotes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.ownerName.trim()) {
      newErrors.ownerName = 'Owner / Investor name is required';
    }
    if (!formData.phone.trim() || !validatePhone(formData.phone)) {
      newErrors.phone = 'Valid 10-digit phone number is required';
    }
    if (!formData.email.trim() || !validateEmail(formData.email)) {
      newErrors.email = 'Valid email address is required';
    }
    if (!formData.propertyLocation.trim()) {
      newErrors.propertyLocation = 'Property location in Pune is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitted(true);
  };

  return (
    <div className="space-y-24 pb-20 pt-8">
      {/* Hero Header */}
      <section className="pt-8 pb-4 text-center max-w-3xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F4E6DF] text-[#C87D65] border border-[#E6E0D6] text-xs font-semibold mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Sub-Page 4B · Real Estate Asset Monetization</span>
        </div>
        <h1 className="font-editorial text-4xl sm:text-5xl font-semibold text-[#2C2623] leading-tight">
          Turn Your Pune Property Into a Guaranteed High-Yield Asset.
        </h1>
        <p className="text-sm sm:text-base text-[#6E655F] mt-4 leading-relaxed">
          Stop chasing erratic tenants, unpaid electricity bills, and costly vacant months. Nirvaana Stays transforms residential buildings into boutique, high-occupancy co-living sanctuaries with guaranteed long-term leases.
        </p>
      </section>

      {/* 4 Key Value Props */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-8 rounded-3xl bg-[#FFFDF9] border border-[#E6E0D6] shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#F4E6DF] text-[#C87D65] flex items-center justify-center">
              <TrendingUp className="w-6 h-6 stroke-[1.75]" />
            </div>
            <h3 className="font-editorial text-xl font-semibold text-[#2C2623]">
              Highest Rental Yield
            </h3>
            <p className="text-xs text-[#6E655F] leading-relaxed">
              Achieve up to 35% higher net annual return than traditional family or student rentals through our community co-living model and zero vacancy loss.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#FFFDF9] border border-[#E6E0D6] shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#F3EFE6] text-[#7A8B7B] flex items-center justify-center">
              <CalendarCheck className="w-6 h-6 stroke-[1.75]" />
            </div>
            <h3 className="font-editorial text-xl font-semibold text-[#2C2623]">
              Guaranteed Timely Payouts
            </h3>
            <p className="text-xs text-[#6E655F] leading-relaxed">
              Direct automated bank transfers credited on the 1st of every calendar month, backed by corporate bank guarantees regardless of tenant turnaround.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#FFFDF9] border border-[#E6E0D6] shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#F4E6DF] text-[#C87D65] flex items-center justify-center">
              <Wrench className="w-6 h-6 stroke-[1.75]" />
            </div>
            <h3 className="font-editorial text-xl font-semibold text-[#2C2623]">
              End-to-End Asset Care
            </h3>
            <p className="text-xs text-[#6E655F] leading-relaxed">
              Hospitality-grade daily housekeeping, continuous preventative maintenance, and annual touch-ups ensuring zero physical depreciation of your asset.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#FFFDF9] border border-[#E6E0D6] shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#F3EFE6] text-[#7A8B7B] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 stroke-[1.75]" />
            </div>
            <h3 className="font-editorial text-xl font-semibold text-[#2C2623]">
              Zero Legal or Tenant Friction
            </h3>
            <p className="text-xs text-[#6E655F] leading-relaxed">
              We handle all police verification, digital Aadhaar contracts, tenant onboarding, billing, and security oversight so you never deal with tenant disputes.
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS (4-STEP PROCESS) */}
      <section className="bg-[#F3EFE6] py-20 border-y border-[#E6E0D6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#7A8B7B]">
              Seamless Partnership Journey
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-semibold text-[#2C2623] mt-1">
              How It Works: 4 Steps to Freedom
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#E6E0D6] space-y-3">
              <span className="font-mono text-xs font-semibold text-[#C87D65]">01. EVALUATION</span>
              <h4 className="font-editorial text-lg font-semibold text-[#2C2623]">Property Walkthrough</h4>
              <p className="text-xs text-[#6E655F] leading-relaxed">
                Our architecture team conducts a structural audit in 48 hours to assess room yield, plumbing, and aesthetic conversion viability.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#E6E0D6] space-y-3">
              <span className="font-mono text-xs font-semibold text-[#7A8B7B]">02. TRANSFORMATION</span>
              <h4 className="font-editorial text-lg font-semibold text-[#2C2623]">Mindful Staging</h4>
              <p className="text-xs text-[#6E655F] leading-relaxed">
                We implement our signature warm Scandinavian furnishings, acoustic study desks, and modern keyless entry in 14 to 21 days.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#E6E0D6] space-y-3">
              <span className="font-mono text-xs font-semibold text-[#C87D65]">03. ONBOARDING</span>
              <h4 className="font-editorial text-lg font-semibold text-[#2C2623]">Community Launch</h4>
              <p className="text-xs text-[#6E655F] leading-relaxed">
                Our pre-vetted waitlist of Symbiosis scholars and corporate associates fills your property to 95%+ occupancy before day one.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#E6E0D6] space-y-3">
              <span className="font-mono text-xs font-semibold text-[#7A8B7B]">04. RETURNS</span>
              <h4 className="font-editorial text-lg font-semibold text-[#2C2623]">Hassle-Free Payouts</h4>
              <p className="text-xs text-[#6E655F] leading-relaxed">
                Relax and receive passive monthly rent credits on the 1st of every month with zero operational headache or maintenance calls.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE OWNER YIELD CALCULATOR */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#FFFDF9] border border-[#E6E0D6] shadow-lg">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C87D65] mb-1">
            <Calculator className="w-4 h-4" />
            <span>Interactive Real Estate Yield Simulator</span>
          </div>
          <h3 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#2C2623] mb-2">
            Calculate Your Projected Annual Revenue Uplift
          </h3>
          <p className="text-xs sm:text-sm text-[#6E655F] mb-8">
            Adjust the sliders below based on your Pune property capacity to compare Nirvaana managed returns against conventional leasing.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Sliders */}
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-semibold text-[#2C2623]">Number of Rooms / Units</span>
                  <span className="font-mono text-sm font-bold text-[#C87D65]">{calcUnits} Units</span>
                </div>
                <input
                  type="range"
                  min="4"
                  max="40"
                  step="1"
                  value={calcUnits}
                  onChange={(e) => setCalcUnits(Number(e.target.value))}
                  className="w-full accent-[#C87D65] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-[#6E655F] mt-1">
                  <span>4 Rooms</span>
                  <span>40 Rooms</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-semibold text-[#2C2623]">Expected Monthly Rent Per Unit</span>
                  <span className="font-mono text-sm font-bold text-[#C87D65]">
                    ₹{calcRent.toLocaleString('en-IN')}/mo
                  </span>
                </div>
                <input
                  type="range"
                  min="12000"
                  max="35000"
                  step="1000"
                  value={calcRent}
                  onChange={(e) => setCalcRent(Number(e.target.value))}
                  className="w-full accent-[#C87D65] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-[#6E655F] mt-1">
                  <span>₹12,000</span>
                  <span>₹35,000</span>
                </div>
              </div>
            </div>

            {/* Results Display */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#FAF7F2] to-[#F4E6DF] border border-[#E6E0D6] space-y-4">
              <div>
                <span className="text-[11px] text-[#6E655F] uppercase font-bold tracking-wider block">
                  Projected Net Monthly Payout to Owner
                </span>
                <div className="font-editorial text-3xl font-bold text-[#2C2623] mt-0.5 tabular-nums">
                  <span className="font-sans">₹</span>{yieldData.monthlyNirvanaNetRevenue.toLocaleString('en-IN')}
                  <span className="text-xs font-sans font-normal text-[#6E655F]"> / month</span>
                </div>
              </div>

              <div className="pt-2 border-t border-[#E6E0D6] flex justify-between items-center text-xs">
                <span className="text-[#6E655F]">Annual Nirvaana Returns:</span>
                <span className="font-mono font-bold text-[#2C2623]">
                  ₹{yieldData.annualNirvanaRevenue.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="flex justify-between items-center text-xs">
                <span className="text-[#6E655F]">Traditional Tenant Returns:</span>
                <span className="font-mono text-[#6E655F]">
                  ₹{yieldData.annualTraditionalRevenue.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="p-3 bg-[#7A8B7B]/15 rounded-xl border border-[#7A8B7B]/30 flex items-center justify-between">
                <span className="text-xs font-semibold text-[#2C2623]">Estimated Annual Gain:</span>
                <span className="font-editorial text-lg font-bold text-[#7A8B7B]">
                  +<span className="font-sans">₹</span>{yieldData.extraAnnualGain.toLocaleString('en-IN')} ({yieldData.percentageUplift}% Uplift)
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROPERTY OWNER SUBMISSION FORM */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#FFFDF9] border border-[#E6E0D6] shadow-md">
          {!isSubmitted ? (
            <div>
              <div className="text-center max-w-xl mx-auto mb-8">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#7A8B7B]">
                  Schedule a Free Feasibility Audit
                </span>
                <h3 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#2C2623] mt-1">
                  Submit Your Property Details
                </h3>
                <p className="text-xs sm:text-sm text-[#6E655F] mt-1">
                  Tell us about your property. Our acquisitions team will contact you within 24 hours to schedule an in-person site inspection.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#2C2623] mb-1">
                      Owner / Representative Name <span className="text-[#C87D65]">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.ownerName}
                      onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                      placeholder="e.g. Suresh Kulkarni"
                      className={`w-full px-3 py-2.5 bg-[#FAF7F2] border rounded-xl text-xs sm:text-sm text-[#2C2623] placeholder-[#A09891] focus:outline-none focus:ring-1 focus:ring-[#C87D65] ${
                        errors.ownerName ? 'border-red-400' : 'border-[#E6E0D6]'
                      }`}
                    />
                    {errors.ownerName && <p className="text-xs text-red-600 mt-1">{errors.ownerName}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#2C2623] mb-1">
                      Phone Number <span className="text-[#C87D65]">*</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 90961 66306"
                      className={`w-full px-3 py-2.5 bg-[#FAF7F2] border rounded-xl text-xs sm:text-sm text-[#2C2623] placeholder-[#A09891] focus:outline-none focus:ring-1 focus:ring-[#C87D65] ${
                        errors.phone ? 'border-red-400' : 'border-[#E6E0D6]'
                      }`}
                    />
                    {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#2C2623] mb-1">
                      Email Address <span className="text-[#C87D65]">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="owner@gmail.com"
                      className={`w-full px-3 py-2.5 bg-[#FAF7F2] border rounded-xl text-xs sm:text-sm text-[#2C2623] placeholder-[#A09891] focus:outline-none focus:ring-1 focus:ring-[#C87D65] ${
                        errors.email ? 'border-red-400' : 'border-[#E6E0D6]'
                      }`}
                    />
                    {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#2C2623] mb-1">
                      Property Location in Pune <span className="text-[#C87D65]">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.propertyLocation}
                      onChange={(e) => setFormData({ ...formData, propertyLocation: e.target.value })}
                      placeholder="e.g. Viman Nagar / Kalyani Nagar / Baner"
                      className={`w-full px-3 py-2.5 bg-[#FAF7F2] border rounded-xl text-xs sm:text-sm text-[#2C2623] placeholder-[#A09891] focus:outline-none focus:ring-1 focus:ring-[#C87D65] ${
                        errors.propertyLocation ? 'border-red-400' : 'border-[#E6E0D6]'
                      }`}
                    />
                    {errors.propertyLocation && <p className="text-xs text-red-600 mt-1">{errors.propertyLocation}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#2C2623] mb-1">
                      Property Asset Type
                    </label>
                    <select
                      value={formData.propertyType}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          propertyType: e.target.value as any,
                        })
                      }
                      className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#E6E0D6] rounded-xl text-xs text-[#2C2623] focus:outline-none focus:ring-1 focus:ring-[#C87D65]"
                    >
                      <option value="Standalone Building">Standalone Building</option>
                      <option value="Gated Apartment">Gated Apartment Cluster</option>
                      <option value="Villa / Bungalow">Villa / Bungalow</option>
                      <option value="Commercial Conversion">Commercial Conversion</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#2C2623] mb-1">
                      Number of Rooms / Units
                    </label>
                    <input
                      type="text"
                      value={formData.numberOfRooms}
                      onChange={(e) => setFormData({ ...formData, numberOfRooms: e.target.value })}
                      placeholder="e.g. 14 Rooms"
                      className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#E6E0D6] rounded-xl text-xs text-[#2C2623] focus:outline-none focus:ring-1 focus:ring-[#C87D65]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#2C2623] mb-1">
                      Built-Up Area
                    </label>
                    <input
                      type="text"
                      value={formData.builtUpArea}
                      onChange={(e) => setFormData({ ...formData, builtUpArea: e.target.value })}
                      placeholder="e.g. 5,000 sq.ft"
                      className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#E6E0D6] rounded-xl text-xs text-[#2C2623] focus:outline-none focus:ring-1 focus:ring-[#C87D65]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#2C2623] mb-1">
                    Current Property Status
                  </label>
                  <select
                    value={formData.currentStatus}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        currentStatus: e.target.value as any,
                      })
                    }
                    className="w-full px-3 py-2.5 bg-[#FAF7F2] border border-[#E6E0D6] rounded-xl text-xs sm:text-sm text-[#2C2623] focus:outline-none focus:ring-1 focus:ring-[#C87D65]"
                  >
                    <option value="Vacant / Ready to Move">Vacant / Ready to Move</option>
                    <option value="Under Renovation">Under Renovation</option>
                    <option value="Under Construction">Under Construction (Finishing in 1–3 months)</option>
                    <option value="Currently Tenanted">Currently Tenanted (Lease ending soon)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#2C2623] mb-1">
                    Additional Notes or Timeline (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={formData.additionalNotes}
                    onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                    placeholder="e.g. Located 300 meters from Symbiosis, looking for 3 to 5 year institutional lease..."
                    className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#E6E0D6] rounded-xl text-xs sm:text-sm text-[#2C2623] placeholder-[#A09891] focus:outline-none focus:ring-1 focus:ring-[#C87D65]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#C87D65] hover:bg-[#B26B54] text-white rounded-xl text-xs sm:text-sm font-semibold tracking-wide transition-colors shadow-sm"
                  >
                    Submit Property for Feasibility Review
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#7A8B7B]/15 text-[#7A8B7B] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <h3 className="font-editorial text-2xl font-semibold text-[#2C2623]">
                Property Details Received!
              </h3>
              <p className="text-sm text-[#6E655F] max-w-md mx-auto">
                Thank you, {formData.ownerName}. Our Pune head of acquisitions has received your asset brief for {formData.propertyLocation}. We will reach out to schedule an on-site structural and yield walkthrough within 24 hours.
              </p>

              <div className="pt-4 flex justify-center">
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl bg-[#2C2623] text-white text-xs font-medium hover:bg-black transition-colors"
                >
                  Submit Another Property
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
