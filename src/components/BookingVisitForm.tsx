import React, { useState } from 'react';
import { Send, CheckCircle2, Loader2, AlertCircle, MessageCircle } from 'lucide-react';
import { CustomSelect } from './CustomSelect.tsx';
import { ROOM_TIER_SELECT_OPTIONS } from '../data/roomTiers.ts';
import { generateWhatsAppInquiryUrl } from '../utils/property-logic.ts';

const WEB3FORMS_ACCESS_KEY = 'c85c1c3d-4d3e-40e3-b218-b1ca384cf41f';

const STAY_TYPE_OPTIONS = [
  { value: 'Girls’ Accommodation', label: 'Girls’ Accommodation' },
  { value: 'Boys’ Accommodation', label: 'Boys’ Accommodation' },
];

const PROPERTY_OPTIONS = [
  { value: 'Shubh Gateway (Opp. Symbiosis Law School)', label: 'Shubh Gateway (Opp. Symbiosis Law School)' },
  { value: 'Shubh Nirvaana (Opp. 10Biz Park)', label: 'Shubh Nirvaana (Opp. 10Biz Park)' },
];

export interface BookingVisitFormProps {
  isModal?: boolean;
  onClose?: () => void;
  customTitle?: string;
  customSubtitle?: string;
}

export const BookingVisitForm: React.FC<BookingVisitFormProps> = ({
  isModal = false,
  onClose,
  customTitle,
  customSubtitle,
}) => {
  const defaultRoom = ROOM_TIER_SELECT_OPTIONS[2]?.value || 'Nirvaana Prime — Attached Washroom + Balcony - ₹24,999';

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    stayType: 'Girls’ Accommodation',
    roomType: defaultRoom,
    property: 'Shubh Gateway (Opp. Symbiosis Law School)',
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
      web3Data.append('from_name', 'NIRVAANA Stays Website');
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

        // Open WhatsApp intent directly to official number +91 90961 66306 with the selected room tier and updated price
        const whatsAppUrl = generateWhatsAppInquiryUrl({
          name: formData.name,
          phone: formData.phone,
          stayType: formData.stayType,
          roomType: formData.roomType,
          property: formData.property,
          message: formData.message || 'I would like to schedule a visit.',
        });
        window.open(whatsAppUrl, '_blank');
      } else {
        setSubmitError(data.message || 'Failed to submit inquiry. Please try again.');
      }
    } catch {
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
      roomType: defaultRoom,
      property: 'Shubh Gateway (Opp. Symbiosis Law School)',
      moveInDate: '',
      message: '',
    });
  };

  const currentWhatsAppUrl = generateWhatsAppInquiryUrl({
    name: formData.name || 'Resident',
    phone: formData.phone,
    stayType: formData.stayType,
    roomType: formData.roomType,
    property: formData.property,
    message: formData.message || 'I would like to schedule a visit.',
  });

  return (
    <div
      className={
        isModal
          ? 'p-4 sm:p-6 space-y-4'
          : 'p-8 sm:p-10 rounded-3xl bg-[#FFFDF9] dark:bg-[#081A33] border border-[#0B213F]/15 dark:border-[#E5D9C4]/20 shadow-sm space-y-6 transition-colors'
      }
    >
      {formSubmitted ? (
        <div className="py-8 text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="font-editorial text-2xl font-bold text-[#0B213F] dark:text-[#E5D9C4]">
              Visit Request Received!
            </h3>
            <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-900/40 py-1 px-3 rounded-full inline-block">
              Recorded via Web3Forms
            </p>
          </div>
          <p className="text-xs sm:text-sm text-[#0B213F]/75 dark:text-[#E5D9C4]/75 max-w-md mx-auto leading-relaxed">
            Your walkthrough request has been saved and dispatched to our community manager. WhatsApp was also opened with your inquiry details.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={currentWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#C87D65] hover:bg-[#B56A52] text-white text-xs font-semibold tracking-wide transition-all shadow-md flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Open WhatsApp Chat</span>
            </a>

            {onClose ? (
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-3 rounded-full border border-[#0B213F] dark:border-[#E5D9C4] bg-[#0B213F] dark:bg-[#E5D9C4] hover:bg-black dark:hover:bg-white text-xs font-semibold text-white dark:text-[#0B213F] transition-colors"
              >
                Close & Explore
              </button>
            ) : (
              <button
                onClick={handleResetForm}
                className="w-full sm:w-auto px-6 py-3 rounded-full border border-[#0B213F]/20 dark:border-[#E5D9C4]/30 bg-[#FAF7F2] dark:bg-[#0E294E] hover:bg-[#F3EFE6] dark:hover:bg-[#133463] text-xs font-semibold text-[#0B213F] dark:text-[#E5D9C4] transition-colors"
              >
                Submit Another Inquiry
              </button>
            )}
          </div>
        </div>
      ) : (
        <form onSubmit={handleFormSubmit} className={isModal ? 'space-y-3.5' : 'space-y-5'}>
          <div className="space-y-0.5">
            <h3
              id={isModal ? 'booking-modal-title' : undefined}
              className="font-editorial text-xl sm:text-2xl font-bold text-[#0B213F] dark:text-[#E5D9C4]"
            >
              {customTitle || 'Schedule an In-Person Walkthrough'}
            </h3>
            <p className="text-xs text-[#0B213F]/70 dark:text-[#E5D9C4]/70">
              {customSubtitle || 'Fill out your details to visit NIRVAANA Stays. Submissions are stored instantly.'}
            </p>
          </div>

          {submitError && (
            <div className="p-3 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 text-red-700 dark:text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600 dark:text-red-400" />
              <span>{submitError}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#0B213F] dark:text-[#E5D9C4]">Full Name *</label>
              <input
                type="text"
                name="name"
                autoComplete="name"
                required
                placeholder="e.g. Aditi Sharma"
                value={formData.name}
                onChange={handleNameChange}
                disabled={isSubmitting}
                className={`w-full px-4 ${isModal ? 'py-2.5' : 'py-3'} rounded-2xl bg-[#FAF7F2] dark:bg-[#071930] border border-[#0B213F]/15 dark:border-[#E5D9C4]/20 text-sm text-[#0B213F] dark:text-[#E5D9C4] focus:outline-none focus:border-[#C87D65] focus:ring-1 focus:ring-[#C87D65]/20 transition-colors disabled:opacity-60 placeholder-[#0B213F]/40 dark:placeholder-[#E5D9C4]/40`}
              />
              {formErrors.name && <p className="text-[11px] text-red-500">{formErrors.name}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#0B213F] dark:text-[#E5D9C4]">Mobile / WhatsApp *</label>
              <input
                type="tel"
                name="phone"
                autoComplete="tel"
                required
                placeholder="e.g. 9876543210"
                value={formData.phone}
                onChange={handlePhoneChange}
                disabled={isSubmitting}
                className={`w-full px-4 ${isModal ? 'py-2.5' : 'py-3'} rounded-2xl bg-[#FAF7F2] dark:bg-[#071930] border border-[#0B213F]/15 dark:border-[#E5D9C4]/20 text-sm text-[#0B213F] dark:text-[#E5D9C4] focus:outline-none focus:border-[#C87D65] focus:ring-1 focus:ring-[#C87D65]/20 transition-colors disabled:opacity-60 placeholder-[#0B213F]/40 dark:placeholder-[#E5D9C4]/40`}
              />
              {formErrors.phone && <p className="text-[11px] text-red-500">{formErrors.phone}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#0B213F] dark:text-[#E5D9C4]">Accommodation Preference</label>
              <CustomSelect
                name="stay_type"
                value={formData.stayType}
                onChange={(val) => setFormData((prev) => ({ ...prev, stayType: val }))}
                options={STAY_TYPE_OPTIONS}
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#0B213F] dark:text-[#E5D9C4]">
                Select Room Tier
              </label>
              <CustomSelect
                name="room_tier"
                value={formData.roomType}
                onChange={(val) => setFormData((prev) => ({ ...prev, roomType: val }))}
                options={ROOM_TIER_SELECT_OPTIONS}
                disabled={isSubmitting}
                enableMarquee={true}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#0B213F] dark:text-[#E5D9C4]">Preferred Property</label>
            <CustomSelect
              name="preferred_property"
              value={formData.property}
              onChange={(val) => setFormData((prev) => ({ ...prev, property: val }))}
              options={PROPERTY_OPTIONS}
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#0B213F] dark:text-[#E5D9C4]">Additional Note (Optional)</label>
            <textarea
              name="message"
              rows={isModal ? 2 : 3}
              placeholder="Tell us your tentative move-in date or questions..."
              value={formData.message}
              onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
              disabled={isSubmitting}
              className={`w-full px-4 ${isModal ? 'py-2' : 'py-3'} rounded-2xl bg-[#FAF7F2] dark:bg-[#071930] border border-[#0B213F]/15 dark:border-[#E5D9C4]/20 text-sm text-[#0B213F] dark:text-[#E5D9C4] focus:outline-none focus:border-[#C87D65] resize-none disabled:opacity-60 placeholder-[#0B213F]/40 dark:placeholder-[#E5D9C4]/40`}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full ${isModal ? 'py-3' : 'py-4'} rounded-full bg-[#C87D65] hover:bg-[#B56A52] text-white text-sm font-semibold tracking-wide transition-all shadow-md hover:shadow-xl hover:scale-[1.01] flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed`}
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
