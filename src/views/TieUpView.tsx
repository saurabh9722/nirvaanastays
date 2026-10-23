import React, { useState } from 'react';
import { Building2, GraduationCap, Briefcase, Sparkles, CheckCircle2, ShieldCheck, Mail, Phone, ArrowRight } from 'lucide-react';
import { TieUpFormData, PageRoute } from '../types.ts';
import { validatePhone, validateEmail } from '../utils/property-logic.ts';

interface TieUpViewProps {
  onNavigate: (route: PageRoute) => void;
  onOpenEnquire: () => void;
}

export const TieUpView: React.FC<TieUpViewProps> = ({ onNavigate, onOpenEnquire }) => {
  const [formData, setFormData] = useState<TieUpFormData>({
    organizationName: '',
    contactPerson: '',
    partnershipType: 'University / College Student Housing',
    email: '',
    phone: '',
    estimatedResidents: '10–25 Beds',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.organizationName.trim()) {
      newErrors.organizationName = 'Organization / University name is required';
    }
    if (!formData.contactPerson.trim()) {
      newErrors.contactPerson = 'Contact person name is required';
    }
    if (!formData.email.trim() || !validateEmail(formData.email)) {
      newErrors.email = 'Valid official email address is required';
    }
    if (!formData.phone.trim() || !validatePhone(formData.phone)) {
      newErrors.phone = 'Valid 10-digit mobile number is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitted(true);
  };

  return (
    <div className="space-y-20 pb-20 pt-8">
      {/* Hero Header */}
      <section className="pt-8 pb-4 text-center max-w-3xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F4E6DF] text-[#C87D65] border border-[#E6E0D6] text-xs font-semibold mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Sub-Page 4A · Institutional & Corporate Partnerships</span>
        </div>
        <h1 className="font-editorial text-4xl sm:text-5xl font-semibold text-[#2C2623] leading-tight">
          Partner With Nirvaana Stays: Elevated Housing for Your Talent.
        </h1>
        <p className="text-sm sm:text-base text-[#6E655F] mt-4 leading-relaxed">
          We collaborate with universities, colleges, corporate HR teams, and lifestyle brands to offer turnkey, verified, and premium student and employee residences across Pune.
        </p>
      </section>

      {/* 3 Partnership Models */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Model 1: University Student Housing */}
          <div className="p-8 rounded-3xl bg-[#FFFDF9] border border-[#E6E0D6] shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#F4E6DF] text-[#C87D65] flex items-center justify-center">
              <GraduationCap className="w-6 h-6 stroke-[1.75]" />
            </div>
            <h3 className="font-editorial text-2xl font-semibold text-[#2C2623]">
              University Student Housing
            </h3>
            <p className="text-xs sm:text-sm text-[#6E655F] leading-relaxed">
              Designated student blocks for academic institutions near Viman Nagar. Provide your incoming undergraduate, postgraduate, and international scholars with safe, parent-approved accommodations walking distance from campus.
            </p>
            <ul className="text-xs text-[#2C2623] space-y-2 pt-2 border-t border-[#E6E0D6]">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#7A8B7B]" /> Subsidized institutional cohort rates
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#7A8B7B]" /> Direct university liaison & attendance logs
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#7A8B7B]" /> Strict 3-tier security & curfew oversight
              </li>
            </ul>
          </div>

          {/* Model 2: Corporate Relocation & Interns */}
          <div className="p-8 rounded-3xl bg-[#FFFDF9] border border-[#E6E0D6] shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#F3EFE6] text-[#7A8B7B] flex items-center justify-center">
              <Briefcase className="w-6 h-6 stroke-[1.75]" />
            </div>
            <h3 className="font-editorial text-2xl font-semibold text-[#2C2623]">
              Corporate Relocation & Interns
            </h3>
            <p className="text-xs sm:text-sm text-[#6E655F] leading-relaxed">
              Hassle-free 2 to 6 month stay packages for corporate interns, summer associates, and newly relocated engineers joining Barclays, Credit Suisse, or Pune tech parks with zero lease liability for HR.
            </p>
            <ul className="text-xs text-[#2C2623] space-y-2 pt-2 border-t border-[#E6E0D6]">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#7A8B7B]" /> GST billing & corporate expense invoicing
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#7A8B7B]" /> Flexible 60 to 90 day contract durations
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#7A8B7B]" /> Dedicated ergonomic desk & 300 Mbps Wi-Fi
              </li>
            </ul>
          </div>

          {/* Model 3: Brand Collaborations & Perks */}
          <div className="p-8 rounded-3xl bg-[#FFFDF9] border border-[#E6E0D6] shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#F4E6DF] text-[#2C2623] flex items-center justify-center">
              <Building2 className="w-6 h-6 stroke-[1.75]" />
            </div>
            <h3 className="font-editorial text-2xl font-semibold text-[#2C2623]">
              Brand Perks & Event Collaborations
            </h3>
            <p className="text-xs sm:text-sm text-[#6E655F] leading-relaxed">
              Partner with Nirvaana Stays to reach an energetic demographic of 200+ affluent students and young professionals through sampling activations, wellness sessions, and co-branded campus events.
            </p>
            <ul className="text-xs text-[#2C2623] space-y-2 pt-2 border-t border-[#E6E0D6]">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#7A8B7B]" /> Exclusive resident product drops
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#7A8B7B]" /> Event sponsorships in our communal lounges
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#7A8B7B]" /> Wellness & sustainable brand alignment
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* B2B Partnership Inquiry Form */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#FFFDF9] border border-[#E6E0D6] shadow-md">
          {!isSubmitted ? (
            <div>
              <div className="text-center max-w-xl mx-auto mb-8">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#7A8B7B]">
                  Connect With Institutional Team
                </span>
                <h3 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#2C2623] mt-1">
                  Initiate a Partnership Inquiry
                </h3>
                <p className="text-xs sm:text-sm text-[#6E655F] mt-1">
                  Our partnerships director will review your requirements and respond with a customized housing proposal within 24 hours.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#2C2623] mb-1">
                      Organization / University Name <span className="text-[#C87D65]">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.organizationName}
                      onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
                      placeholder="e.g. Symbiosis International / Barclays HR"
                      className={`w-full px-3 py-2.5 bg-[#FAF7F2] border rounded-xl text-xs sm:text-sm text-[#2C2623] placeholder-[#A09891] focus:outline-none focus:ring-1 focus:ring-[#C87D65] ${
                        errors.organizationName ? 'border-red-400' : 'border-[#E6E0D6]'
                      }`}
                    />
                    {errors.organizationName && <p className="text-xs text-red-600 mt-1">{errors.organizationName}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#2C2623] mb-1">
                      Contact Person & Designation <span className="text-[#C87D65]">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.contactPerson}
                      onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                      placeholder="e.g. Dr. Rajesh Sen, Dean of Student Affairs"
                      className={`w-full px-3 py-2.5 bg-[#FAF7F2] border rounded-xl text-xs sm:text-sm text-[#2C2623] placeholder-[#A09891] focus:outline-none focus:ring-1 focus:ring-[#C87D65] ${
                        errors.contactPerson ? 'border-red-400' : 'border-[#E6E0D6]'
                      }`}
                    />
                    {errors.contactPerson && <p className="text-xs text-red-600 mt-1">{errors.contactPerson}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#2C2623] mb-1">
                      Official Email Address <span className="text-[#C87D65]">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="partnerships@organization.com"
                      className={`w-full px-3 py-2.5 bg-[#FAF7F2] border rounded-xl text-xs sm:text-sm text-[#2C2623] placeholder-[#A09891] focus:outline-none focus:ring-1 focus:ring-[#C87D65] ${
                        errors.email ? 'border-red-400' : 'border-[#E6E0D6]'
                      }`}
                    />
                    {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#2C2623] mb-1">
                      Direct Phone Number <span className="text-[#C87D65]">*</span>
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
                      Partnership Category
                    </label>
                    <select
                      value={formData.partnershipType}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          partnershipType: e.target.value as any,
                        })
                      }
                      className="w-full px-3 py-2.5 bg-[#FAF7F2] border border-[#E6E0D6] rounded-xl text-xs sm:text-sm text-[#2C2623] focus:outline-none focus:ring-1 focus:ring-[#C87D65]"
                    >
                      <option value="University / College Student Housing">University / College Student Housing</option>
                      <option value="Corporate Relocation & Intern Housing">Corporate Relocation & Intern Housing</option>
                      <option value="Brand Collaboration & Perks">Brand Collaboration & Perks</option>
                      <option value="Event & Community Partnership">Event & Community Partnership</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#2C2623] mb-1">
                      Estimated Requirement
                    </label>
                    <select
                      value={formData.estimatedResidents}
                      onChange={(e) => setFormData({ ...formData, estimatedResidents: e.target.value })}
                      className="w-full px-3 py-2.5 bg-[#FAF7F2] border border-[#E6E0D6] rounded-xl text-xs sm:text-sm text-[#2C2623] focus:outline-none focus:ring-1 focus:ring-[#C87D65]"
                    >
                      <option value="5–10 Beds">5–10 Beds</option>
                      <option value="10–25 Beds">10–25 Beds</option>
                      <option value="25–50 Beds">25–50 Beds</option>
                      <option value="Entire Wing / Dedicated Residence (50+ Beds)">
                        Entire Wing / Dedicated Residence (50+ Beds)
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#2C2623] mb-1">
                    Specific Requirements or Preferred Locations
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="e.g. Inquiring for July 2026 intake of 20 design scholars in Viman Nagar..."
                    className="w-full px-3 py-2.5 bg-[#FAF7F2] border border-[#E6E0D6] rounded-xl text-xs sm:text-sm text-[#2C2623] placeholder-[#A09891] focus:outline-none focus:ring-1 focus:ring-[#C87D65]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#C87D65] hover:bg-[#B26B54] text-white rounded-xl text-xs sm:text-sm font-semibold tracking-wide transition-colors shadow-sm"
                  >
                    Submit Partnership Inquiry
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
                Inquiry Logged Successfully
              </h3>
              <p className="text-sm text-[#6E655F] max-w-md mx-auto">
                Thank you for reaching out, {formData.contactPerson}. Our institutional accounts lead will contact you via {formData.email} and phone within 24 hours with a comprehensive presentation.
              </p>

              <div className="pt-4 flex justify-center">
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl bg-[#2C2623] text-white text-xs font-medium hover:bg-black transition-colors"
                >
                  Submit Another Inquiry
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
