import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, ShieldCheck, Compass, Navigation } from 'lucide-react';
import { PageRoute } from '../types.ts';
import { validatePhone, validateEmail } from '../utils/property-logic.ts';
import { NirvanaLocationMap } from '../components/NirvanaLocationMap.tsx';
import { PerspectiveCard } from '../components/PerspectiveCard.tsx';

interface ContactViewProps {
  onNavigate: (route: PageRoute) => void;
  onOpenEnquire: () => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ onNavigate, onOpenEnquire }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    purpose: 'Schedule a Property Visit',
    preferredTime: 'Morning (10:00 AM – 1:00 PM)',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Please provide your full name';
    if (!formData.email.trim() || !validateEmail(formData.email)) newErrors.email = 'Valid email is required';
    if (!formData.phone.trim() || !validatePhone(formData.phone)) newErrors.phone = 'Valid 10-digit phone number is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setSubmitted(true);
  };

  return (
    <div className="space-y-20 pb-20 pt-8">
      {/* Header */}
      <section className="text-center max-w-3xl mx-auto px-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#7A8B7B]">
          Contact & Visit Concierge · Page 7
        </span>
        <h1 className="font-editorial text-4xl sm:text-5xl font-semibold text-[#2C2623] mt-2 leading-tight">
          We’d Love to Welcome You to Pune.
        </h1>
        <p className="text-sm sm:text-base text-[#6E655F] mt-3">
          Schedule an in-person walkthrough, meet our Viman Nagar community team, or get answers to your questions about our student and professional residences.
        </p>
      </section>

      {/* 3 Contact Info Cards with Perspective Alterer */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Office Address */}
          <PerspectiveCard
            containerClassName="h-full"
            className="h-full"
            maxTilt={10}
            scale={1.02}
            glare={true}
            glareOpacity={0.2}
            depth={14}
          >
            <div className="p-8 rounded-3xl bg-[#FFFDF9] border border-[#E6E0D6] shadow-sm space-y-3 h-full flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[#F4E6DF] text-[#C87D65] flex items-center justify-center">
                  <MapPin className="w-6 h-6 stroke-[1.75]" />
                </div>
                <h3 className="font-editorial text-xl font-semibold text-[#2C2623]">
                  Corporate & Sales Office
                </h3>
                <p className="text-xs text-[#6E655F] leading-relaxed">
                  First floor, Shubh Gateway, Shop number 116, opp. to Symbiosis Law School, Survey Number 235, Mhada Colony, Viman Nagar, Pune, Maharashtra 411032
                </p>
              </div>
              <div className="pt-2 border-t border-[#E6E0D6] space-y-1 text-[11px] font-mono">
                <span className="text-[#7A8B7B] block">
                  Landmark: Opp. to Symbiosis Law School
                </span>
                <span className="text-[#6E655F] block">
                  Plus Code: HWG5+62 Pune, Maharashtra
                </span>
              </div>
            </div>
          </PerspectiveCard>

          {/* Card 2: Phone & WhatsApp */}
          <PerspectiveCard
            containerClassName="h-full"
            className="h-full"
            maxTilt={10}
            scale={1.02}
            glare={true}
            glareOpacity={0.2}
            depth={14}
          >
            <div className="p-8 rounded-3xl bg-[#FFFDF9] border border-[#E6E0D6] shadow-sm space-y-3 h-full flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[#F3EFE6] text-[#7A8B7B] flex items-center justify-center">
                  <Phone className="w-6 h-6 stroke-[1.75]" />
                </div>
                <h3 className="font-editorial text-xl font-semibold text-[#2C2623]">
                  Direct Helpline & WhatsApp
                </h3>
                <div className="space-y-1">
                  <a
                    href="tel:+919096166306"
                    className="font-mono text-base font-bold text-[#C87D65] hover:underline block"
                  >
                    +91 90961 66306
                  </a>
                  <p className="text-xs text-[#6E655F]">
                    Instant support for prospective students, parents, and working professionals.
                  </p>
                </div>
              </div>
              <span className="text-[11px] font-mono text-[#7A8B7B] block pt-2 border-t border-[#E6E0D6]">
                Daily 9:00 AM – 8:30 PM IST
              </span>
            </div>
          </PerspectiveCard>

          {/* Card 3: Email Concierge */}
          <PerspectiveCard
            containerClassName="h-full"
            className="h-full"
            maxTilt={10}
            scale={1.02}
            glare={true}
            glareOpacity={0.2}
            depth={14}
          >
            <div className="p-8 rounded-3xl bg-[#FFFDF9] border border-[#E6E0D6] shadow-sm space-y-3 h-full flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[#F4E6DF] text-[#2C2623] flex items-center justify-center">
                  <Mail className="w-6 h-6 stroke-[1.75]" />
                </div>
                <h3 className="font-editorial text-xl font-semibold text-[#2C2623]">
                  Email Channels
                </h3>
                <div className="space-y-1 text-xs">
                  <p>
                    <strong className="text-[#2C2623]">General & Stays:</strong>{' '}
                    <a href="mailto:hello@nirvanastays.in" className="text-[#C87D65] hover:underline">
                      hello@nirvanastays.in
                    </a>
                  </p>
                  <p>
                    <strong className="text-[#2C2623]">Partnerships:</strong>{' '}
                    <a href="mailto:info@nirvanastays.in" className="text-[#C87D65] hover:underline">
                      info@nirvanastays.in
                    </a>
                  </p>
                </div>
              </div>
              <span className="text-[11px] font-mono text-[#7A8B7B] block pt-2 border-t border-[#E6E0D6]">
                Guaranteed Response within 4 Hours
              </span>
            </div>
          </PerspectiveCard>
        </div>
      </section>

      {/* Interactive Google Maps Component Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <NirvanaLocationMap />
      </section>

      {/* Main Grid: Form & Location Directions */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Form Column */}
          <div className="lg:col-span-7 p-8 sm:p-10 rounded-3xl bg-[#FFFDF9] border border-[#E6E0D6] shadow-sm">
            {!submitted ? (
              <div>
                <h3 className="font-editorial text-2xl font-semibold text-[#2C2623] mb-1">
                  Send Us a Direct Message or Visit Request
                </h3>
                <p className="text-xs text-[#6E655F] mb-6">
                  Fill in your preferred date and time, and our resident manager will greet you at the gate.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#2C2623] mb-1">Full Name</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Maya Kulkarni"
                        className={`w-full px-3 py-2.5 bg-[#FAF7F2] border rounded-xl text-xs sm:text-sm text-[#2C2623] placeholder-[#A09891] focus:outline-none focus:ring-1 focus:ring-[#C87D65] ${
                          errors.name ? 'border-red-400' : 'border-[#E6E0D6]'
                        }`}
                      />
                      {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#2C2623] mb-1">Mobile Number</label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-[#E6E0D6] bg-[#F3EFE6] text-xs font-medium text-[#2C2623]">
                          +91
                        </span>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="090961 66306"
                          className={`w-full px-3 py-2.5 bg-[#FAF7F2] border rounded-r-xl text-xs sm:text-sm text-[#2C2623] placeholder-[#A09891] focus:outline-none focus:ring-1 focus:ring-[#C87D65] ${
                            errors.phone ? 'border-red-400' : 'border-[#E6E0D6]'
                          }`}
                        />
                      </div>
                      {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#2C2623] mb-1">Email Address</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="maya@example.com"
                      className={`w-full px-3 py-2.5 bg-[#FAF7F2] border rounded-xl text-xs sm:text-sm text-[#2C2623] placeholder-[#A09891] focus:outline-none focus:ring-1 focus:ring-[#C87D65] ${
                        errors.email ? 'border-red-400' : 'border-[#E6E0D6]'
                      }`}
                    />
                    {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#2C2623] mb-1">Inquiry Purpose</label>
                      <select
                        value={formData.purpose}
                        onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                        className="w-full px-3 py-2.5 bg-[#FAF7F2] border border-[#E6E0D6] rounded-xl text-xs sm:text-sm text-[#2C2623] focus:outline-none focus:ring-1 focus:ring-[#C87D65]"
                      >
                        <option value="Schedule a Property Visit">Schedule a Property Visit</option>
                        <option value="Studio Apartment Inquiries">Studio Apartment Inquiries</option>
                        <option value="Long-term Stay Booking">Long-term Stay Booking</option>
                        <option value="University / Corporate Tie-Up">University / Corporate Tie-Up</option>
                        <option value="Property Owner Collaboration">Property Owner Collaboration</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#2C2623] mb-1">Preferred Time Window</label>
                      <select
                        value={formData.preferredTime}
                        onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                        className="w-full px-3 py-2.5 bg-[#FAF7F2] border border-[#E6E0D6] rounded-xl text-xs sm:text-sm text-[#2C2623] focus:outline-none focus:ring-1 focus:ring-[#C87D65]"
                      >
                        <option value="Morning (10:00 AM – 1:00 PM)">Morning (10:00 AM – 1:00 PM)</option>
                        <option value="Afternoon (1:00 PM – 4:00 PM)">Afternoon (1:00 PM – 4:00 PM)</option>
                        <option value="Evening (4:00 PM – 7:30 PM)">Evening (4:00 PM – 7:30 PM)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#2C2623] mb-1">Message or Specific Requests</label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Let us know which residences you wish to visit (e.g. Willow, Terra, or Studios)..."
                      className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#E6E0D6] rounded-xl text-xs sm:text-sm text-[#2C2623] placeholder-[#A09891] focus:outline-none focus:ring-1 focus:ring-[#C87D65]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#C87D65] hover:bg-[#B26B54] text-white rounded-xl text-xs sm:text-sm font-semibold tracking-wide transition-colors shadow-sm flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" /> Send Message & Schedule Visit
                  </button>
                </form>
              </div>
            ) : (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#7A8B7B]/15 text-[#7A8B7B] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="font-editorial text-2xl font-semibold text-[#2C2623]">
                  Thank You, {formData.name}!
                </h3>
                <p className="text-sm text-[#6E655F] max-w-sm mx-auto">
                  We have logged your message. Our resident manager will contact you on +91 {formData.phone} to confirm your {formData.preferredTime} visit.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2 bg-[#2C2623] text-white rounded-xl text-xs font-semibold hover:bg-black transition-colors"
                >
                  Send Another Note
                </button>
              </div>
            )}
          </div>

          {/* Styled Map Visual & Proximity Card */}
          <div className="lg:col-span-5 space-y-6">
            <PerspectiveCard
              containerClassName="h-full"
              className="h-full"
              maxTilt={8}
              scale={1.01}
              glare={true}
              glareOpacity={0.18}
              depth={12}
            >
              <div className="p-8 rounded-3xl bg-[#F3EFE6] border border-[#E6E0D6] space-y-6 h-full flex flex-col justify-between">
                <div className="space-y-6">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C87D65]">
                    <Compass className="w-4 h-4" />
                    <span>Strategic Viman Nagar Hub</span>
                  </div>

                  <h4 className="font-editorial text-2xl font-semibold text-[#2C2623]">
                    Location Directions & Proximity
                  </h4>

                  <p className="text-xs text-[#6E655F] leading-relaxed">
                    Shop #116, First Floor, Shubh Gateway, directly opposite Symbiosis Law School, Mhada Colony, Viman Nagar, Pune 411032.
                  </p>

                  {/* Proximity Strip */}
                  <div className="space-y-3 pt-2">
                    <div className="p-3.5 rounded-2xl bg-[#FFFDF9] border border-[#E6E0D6] flex items-center justify-between text-xs">
                      <div>
                        <span className="font-semibold text-[#2C2623] block">Symbiosis Law School & Campus</span>
                        <span className="text-[11px] text-[#6E655F]">Directly Opposite Society Gate</span>
                      </div>
                      <span className="font-mono font-bold text-[#C87D65]">Across Road (1 min)</span>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-[#FFFDF9] border border-[#E6E0D6] flex items-center justify-between text-xs">
                      <div>
                        <span className="font-semibold text-[#2C2623] block">Phoenix Marketcity & PVR</span>
                        <span className="text-[11px] text-[#6E655F]">Retail, Dining & Entertainment</span>
                      </div>
                      <span className="font-mono font-bold text-[#7A8B7B]">1.1 km (4 min)</span>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-[#FFFDF9] border border-[#E6E0D6] flex items-center justify-between text-xs">
                      <div>
                        <span className="font-semibold text-[#2C2623] block">Pune International Airport (PNQ)</span>
                        <span className="text-[11px] text-[#6E655F]">Terminal 1 & Aeromall</span>
                      </div>
                      <span className="font-mono font-bold text-[#2C2623]">2.4 km (8 min)</span>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-[#FFFDF9] border border-[#E6E0D6] flex items-center justify-between text-xs">
                      <div>
                        <span className="font-semibold text-[#2C2623] block">Plus Code Navigation</span>
                        <span className="text-[11px] text-[#6E655F]">Google Maps Reference</span>
                      </div>
                      <span className="font-mono font-bold text-[#7A8B7B]">HWG5+62 Pune</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E6E0D6]">
                  <a
                    href="https://maps.google.com/?q=HWG5%2B62+Pune,+Maharashtra"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 rounded-xl border border-[#2C2623] text-xs font-semibold text-[#2C2623] hover:bg-[#FAF7F2] transition-colors flex items-center justify-center gap-2"
                  >
                    <Navigation className="w-4 h-4 text-[#C87D65]" /> Open in Google Maps (HWG5+62)
                  </a>
                </div>
              </div>
            </PerspectiveCard>
          </div>
        </div>
      </section>
    </div>
  );
};
