import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

export const BookingVisitForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    stayType: 'Girls’ Accommodation',
    roomType: 'Nirvana Prime — Attached Washroom + Balcony (₹24,999)',
    property: 'Shubh Gateway (Opp. Symbiosis Law College)',
    moveInDate: '',
    message: '',
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setFormData((prev) => ({ ...prev, name: val }));
    if (formErrors.name) {
      setFormErrors((prev) => {
        const next = { ...prev };
        delete next.name;
        return next;
      });
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setFormData((prev) => ({ ...prev, phone: val }));
    if (formErrors.phone) {
      setFormErrors((prev) => {
        const next = { ...prev };
        delete next.phone;
        return next;
      });
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = 'Please provide your name';
    if (!formData.phone.trim() || formData.phone.replace(/[^0-9]/g, '').length < 10) {
      errors.phone = 'Please provide a valid 10-digit mobile number';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setFormSubmitted(true);

    // Trigger WhatsApp intent directly to official number +91 90961 66306
    const text = encodeURIComponent(
      `Hi NIRVANA Stays,\nName: ${formData.name}\nPhone: ${formData.phone}\nStay: ${formData.stayType}\nRoom: ${formData.roomType}\nProperty: ${formData.property}\nMove-in: ${formData.moveInDate || 'Immediate'}\nNote: ${formData.message || 'I would like to schedule a visit.'}`
    );
    window.open(`https://wa.me/919096166306?text=${text}`, '_blank');
  };

  return (
    <div className="p-8 sm:p-10 rounded-3xl bg-[#FFFDF9] border border-[#E6E0D6] shadow-sm space-y-6">
      {formSubmitted ? (
        <div className="py-12 text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="font-editorial text-2xl font-bold text-[#2C2623]">
            Visit Request Received!
          </h3>
          <p className="text-sm text-[#6E655F] max-w-md mx-auto">
            We’ve opened WhatsApp with your details. Our community manager will confirm your walkthrough slot shortly.
          </p>
          <button
            onClick={() => setFormSubmitted(false)}
            className="px-6 py-2.5 rounded-full border border-[#E6E0D6] bg-[#FAF7F2] hover:bg-[#F3EFE6] text-xs font-semibold text-[#2C2623] transition-colors"
          >
            Submit Another Inquiry
          </button>
        </div>
      ) : (
        <form onSubmit={handleFormSubmit} className="space-y-5">
          <div className="space-y-1">
            <h3 className="font-editorial text-xl font-bold text-[#2C2623]">
              Schedule an In-Person Walkthrough
            </h3>
            <p className="text-xs text-[#6E655F]">
              Fill out your details to visit NIRVANA Stays.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#2C2623]">Full Name *</label>
              <input
                type="text"
                name="name"
                autoComplete="name"
                placeholder="e.g. Aditi Sharma"
                value={formData.name}
                onChange={handleNameChange}
                className="w-full px-4 py-3 rounded-2xl bg-[#FAF7F2] border border-[#E6E0D6] text-sm text-[#2C2623] focus:outline-none focus:border-[#C87D65] focus:ring-1 focus:ring-[#C87D65]/20 transition-colors"
              />
              {formErrors.name && <p className="text-[11px] text-red-500">{formErrors.name}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#2C2623]">Mobile / WhatsApp *</label>
              <input
                type="tel"
                name="phone"
                autoComplete="tel"
                placeholder="e.g. 9876543210"
                value={formData.phone}
                onChange={handlePhoneChange}
                className="w-full px-4 py-3 rounded-2xl bg-[#FAF7F2] border border-[#E6E0D6] text-sm text-[#2C2623] focus:outline-none focus:border-[#C87D65] focus:ring-1 focus:ring-[#C87D65]/20 transition-colors"
              />
              {formErrors.phone && <p className="text-[11px] text-red-500">{formErrors.phone}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#2C2623]">Accommodation Preference</label>
              <select
                value={formData.stayType}
                onChange={(e) => setFormData((prev) => ({ ...prev, stayType: e.target.value }))}
                className="w-full px-4 py-3 rounded-2xl bg-[#FAF7F2] border border-[#E6E0D6] text-sm text-[#2C2623] focus:outline-none focus:border-[#C87D65]"
              >
                <option value="Girls’ Accommodation">Girls’ Accommodation</option>
                <option value="Boys’ Accommodation">Boys’ Accommodation</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#2C2623]">Select Room Tier</label>
              <select
                value={formData.roomType}
                onChange={(e) => setFormData((prev) => ({ ...prev, roomType: e.target.value }))}
                className="w-full px-4 py-3 rounded-2xl bg-[#FAF7F2] border border-[#E6E0D6] text-sm text-[#2C2623] focus:outline-none focus:border-[#C87D65]"
              >
                <option value="Nirvana Lite — Non-Attached Washroom (₹18,999)">Nirvana Lite: Non-Attached (₹18,999)</option>
                <option value="Nirvana Plus — Attached Balcony + Non-Attached Washroom (₹21,999)">Nirvana Plus: Balcony + Non-Attached (₹21,999)</option>
                <option value="Nirvana Prime — Attached Washroom + Balcony (₹24,999)">Nirvana Prime: Attached Washroom + Balcony (₹24,999)</option>
                <option value="Nirvana Elite — Master Bedroom + Attached Washroom (₹24,999)">Nirvana Elite: Master Bedroom (₹24,999)</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#2C2623]">Preferred Property</label>
            <select
              value={formData.property}
              onChange={(e) => setFormData((prev) => ({ ...prev, property: e.target.value }))}
              className="w-full px-4 py-3 rounded-2xl bg-[#FAF7F2] border border-[#E6E0D6] text-sm text-[#2C2623] focus:outline-none focus:border-[#C87D65]"
            >
              <option value="Shubh Gateway (Opp. Symbiosis Law College)">Shubh Gateway (Opp. Symbiosis Law College)</option>
              <option value="Shubh Nirvana (Opp. 10Biz Park)">Shubh Nirvana (Opp. 10Biz Park)</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#2C2623]">Additional Note (Optional)</label>
            <textarea
              rows={3}
              placeholder="Tell us your tentative move-in date or questions..."
              value={formData.message}
              onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
              className="w-full px-4 py-3 rounded-2xl bg-[#FAF7F2] border border-[#E6E0D6] text-sm text-[#2C2623] focus:outline-none focus:border-[#C87D65] resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-full bg-[#C87D65] hover:bg-[#B56A52] text-white text-sm font-semibold tracking-wide transition-all shadow-md hover:shadow-xl hover:scale-[1.01] flex items-center justify-center gap-2"
          >
            <span>Confirm Visit & Open WhatsApp</span>
            <Send className="w-4 h-4" />
          </button>
        </form>
      )}
    </div>
  );
};
