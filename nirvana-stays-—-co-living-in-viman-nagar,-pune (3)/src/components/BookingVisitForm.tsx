import React, { useState } from 'react';
import { Send, CheckCircle2, Loader2, AlertCircle, MessageCircle } from 'lucide-react';

const WEB3FORMS_ACCESS_KEY = 'c85c1c3d-4d3e-40e3-b218-b1ca384cf41f';

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
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
    if (submitError) setSubmitError(null);
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
    if (submitError) setSubmitError(null);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Build FormData payload for Web3Forms API
      const web3Data = new FormData();
      web3Data.append('access_key', WEB3FORMS_ACCESS_KEY);
      web3Data.append('subject', `New Visit Inquiry: ${formData.name} - ${formData.roomType}`);
      web3Data.append('from_name', 'NIRVANA Stays Website');
      web3Data.append('name', formData.name);
      web3Data.append('phone', formData.phone);
      web3Data.append('stay_type', formData.stayType);
      web3Data.append('room_tier', formData.roomType);
      web3Data.append('preferred_property', formData.property);
      web3Data.append('message', formData.message || 'Scheduling an in-person walkthrough.');

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: web3Data,
      });

      const data = await response.json();

      if (data.success) {
        setFormSubmitted(true);

        // Also open WhatsApp intent directly to official number +91 90961 66306
        const text = encodeURIComponent(
          `Hi NIRVANA Stays,\nName: ${formData.name}\nPhone: ${formData.phone}\nStay: ${formData.stayType}\nRoom: ${formData.roomType}\nProperty: ${formData.property}\nNote: ${formData.message || 'I would like to schedule a visit.'}`
        );
        window.open(`https://wa.me/919096166306?text=${text}`, '_blank');
      } else {
        setSubmitError(data.message || 'Failed to submit inquiry. Please try again.');
      }
    } catch (err) {
      setSubmitError('Network error while saving inquiry. Please check your internet connection or contact us via WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setFormSubmitted(false);
    setSubmitError(null);
    setFormData({
      name: '',
      phone: '',
      stayType: 'Girls’ Accommodation',
      roomType: 'Nirvana Prime — Attached Washroom + Balcony (₹24,999)',
      property: 'Shubh Gateway (Opp. Symbiosis Law College)',
      moveInDate: '',
      message: '',
    });
  };

  const whatsAppUrl = `https://wa.me/919096166306?text=${encodeURIComponent(
    `Hi NIRVANA Stays,\nName: ${formData.name}\nPhone: ${formData.phone}\nStay: ${formData.stayType}\nRoom: ${formData.roomType}\nProperty: ${formData.property}\nNote: ${formData.message || 'I would like to schedule a visit.'}`
  )}`;

  return (
    <div className="p-8 sm:p-10 rounded-3xl bg-[#FFFDF9] border border-[#E6E0D6] shadow-sm space-y-6">
      {formSubmitted ? (
        <div className="py-10 text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="font-editorial text-2xl font-bold text-[#2C2623]">
              Visit Request Received & Stored!
            </h3>
            <p className="text-xs font-semibold text-emerald-700 bg-emerald-50 py-1 px-3 rounded-full inline-block">
              Recorded via Web3Forms
            </p>
          </div>
          <p className="text-sm text-[#6E655F] max-w-md mx-auto">
            Your details have been saved to Web3Forms and dispatched to our community manager. WhatsApp was also opened with your inquiry details.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#C87D65] hover:bg-[#B56A52] text-white text-xs font-semibold tracking-wide transition-all shadow-md flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Open WhatsApp Chat</span>
            </a>

            <button
              onClick={handleResetForm}
              className="w-full sm:w-auto px-6 py-3 rounded-full border border-[#E6E0D6] bg-[#FAF7F2] hover:bg-[#F3EFE6] text-xs font-semibold text-[#2C2623] transition-colors"
            >
              Submit Another Inquiry
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleFormSubmit} className="space-y-5">
          <div className="space-y-1">
            <h3 className="font-editorial text-xl font-bold text-[#2C2623]">
              Schedule an In-Person Walkthrough
            </h3>
            <p className="text-xs text-[#6E655F]">
              Fill out your details to visit NIRVANA Stays. Submissions are stored instantly.
            </p>
          </div>

          {submitError && (
            <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{submitError}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#2C2623]">Full Name *</label>
              <input
                type="text"
                name="name"
                autoComplete="name"
                required
                placeholder="e.g. Aditi Sharma"
                value={formData.name}
                onChange={handleNameChange}
                disabled={isSubmitting}
                className="w-full px-4 py-3 rounded-2xl bg-[#FAF7F2] border border-[#E6E0D6] text-sm text-[#2C2623] focus:outline-none focus:border-[#C87D65] focus:ring-1 focus:ring-[#C87D65]/20 transition-colors disabled:opacity-60"
              />
              {formErrors.name && <p className="text-[11px] text-red-500">{formErrors.name}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#2C2623]">Mobile / WhatsApp *</label>
              <input
                type="tel"
                name="phone"
                autoComplete="tel"
                required
                placeholder="e.g. 9876543210"
                value={formData.phone}
                onChange={handlePhoneChange}
                disabled={isSubmitting}
                className="w-full px-4 py-3 rounded-2xl bg-[#FAF7F2] border border-[#E6E0D6] text-sm text-[#2C2623] focus:outline-none focus:border-[#C87D65] focus:ring-1 focus:ring-[#C87D65]/20 transition-colors disabled:opacity-60"
              />
              {formErrors.phone && <p className="text-[11px] text-red-500">{formErrors.phone}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#2C2623]">Accommodation Preference</label>
              <select
                name="stay_type"
                value={formData.stayType}
                onChange={(e) => setFormData((prev) => ({ ...prev, stayType: e.target.value }))}
                disabled={isSubmitting}
                className="w-full px-4 py-3 rounded-2xl bg-[#FAF7F2] border border-[#E6E0D6] text-sm text-[#2C2623] focus:outline-none focus:border-[#C87D65] disabled:opacity-60"
              >
                <option value="Girls’ Accommodation">Girls’ Accommodation</option>
                <option value="Boys’ Accommodation">Boys’ Accommodation</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#2C2623]">Select Room Tier</label>
              <select
                name="room_tier"
                value={formData.roomType}
                onChange={(e) => setFormData((prev) => ({ ...prev, roomType: e.target.value }))}
                disabled={isSubmitting}
                className="w-full px-4 py-3 rounded-2xl bg-[#FAF7F2] border border-[#E6E0D6] text-sm text-[#2C2623] focus:outline-none focus:border-[#C87D65] disabled:opacity-60"
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
              name="preferred_property"
              value={formData.property}
              onChange={(e) => setFormData((prev) => ({ ...prev, property: e.target.value }))}
              disabled={isSubmitting}
              className="w-full px-4 py-3 rounded-2xl bg-[#FAF7F2] border border-[#E6E0D6] text-sm text-[#2C2623] focus:outline-none focus:border-[#C87D65] disabled:opacity-60"
            >
              <option value="Shubh Gateway (Opp. Symbiosis Law College)">Shubh Gateway (Opp. Symbiosis Law College)</option>
              <option value="Shubh Nirvana (Opp. 10Biz Park)">Shubh Nirvana (Opp. 10Biz Park)</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#2C2623]">Additional Note (Optional)</label>
            <textarea
              name="message"
              rows={3}
              placeholder="Tell us your tentative move-in date or questions..."
              value={formData.message}
              onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
              disabled={isSubmitting}
              className="w-full px-4 py-3 rounded-2xl bg-[#FAF7F2] border border-[#E6E0D6] text-sm text-[#2C2623] focus:outline-none focus:border-[#C87D65] resize-none disabled:opacity-60"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 rounded-full bg-[#C87D65] hover:bg-[#B56A52] text-white text-sm font-semibold tracking-wide transition-all shadow-md hover:shadow-xl hover:scale-[1.01] flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Storing & Submitting...</span>
              </>
            ) : (
              <>
                <span>Confirm Visit & Open WhatsApp</span>
                <Send className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
};
