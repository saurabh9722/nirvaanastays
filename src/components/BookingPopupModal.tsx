import React, { useState, useEffect } from 'react';
import { X, Sparkles, MapPin } from 'lucide-react';
import { BookingVisitForm } from './BookingVisitForm.tsx';

interface BookingPopupModalProps {
  delayMs?: number;
  isOpenControlled?: boolean;
  onCloseControlled?: () => void;
}

export const BookingPopupModal: React.FC<BookingPopupModalProps> = ({
  delayMs = 5000,
  isOpenControlled,
  onCloseControlled,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasDismissed, setHasDismissed] = useState(false);

  // Trigger pop up after exactly delayMs (5 seconds) unless already dismissed during this page session
  useEffect(() => {
    if (hasDismissed) return;

    const timer = setTimeout(() => {
      setIsOpen(true);
    }, delayMs);

    return () => clearTimeout(timer);
  }, [delayMs, hasDismissed]);

  // Synchronize controlled open if passed
  useEffect(() => {
    if (typeof isOpenControlled === 'boolean') {
      setIsOpen(isOpenControlled);
    }
  }, [isOpenControlled]);

  const handleClose = () => {
    setIsOpen(false);
    setHasDismissed(true); // Permanent dismissal for the current page session; resets on refresh
    if (onCloseControlled) {
      onCloseControlled();
    }
  };

  // Keyboard accessibility: Escape key closes modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Prevent background scroll while modal is active
  useEffect(() => {
    if (isOpen) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      id="booking-popup-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/70 backdrop-blur-sm overflow-y-auto overflow-x-hidden animate-in fade-in duration-200"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-xl my-auto bg-[#FFFDF9] dark:bg-[#081A33] border border-[#0B213F]/15 dark:border-[#E5D9C4]/25 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200 transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle Brand Accent Header */}
        <div className="bg-[#FAF7F2] dark:bg-[#071930] border-b border-[#0B213F]/15 dark:border-[#E5D9C4]/20 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-[#C87D65]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Limited Semester Availability · Zero Brokerage</span>
          </div>

          {/* Prominent, Accessible Close Button */}
          <button
            onClick={handleClose}
            aria-label="Close booking pop up"
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFFDF9] dark:bg-[#0E294E] hover:bg-[#EAE4D8] dark:hover:bg-[#133463] border border-[#0B213F]/15 dark:border-[#E5D9C4]/25 text-xs font-semibold text-[#0B213F] dark:text-[#E5D9C4] transition-colors focus:outline-none focus:ring-2 focus:ring-[#C87D65]"
          >
            <span>Close</span>
            <X className="w-3.5 h-3.5 text-[#C87D65]" />
          </button>
        </div>

        {/* Scrollable Form Content - strictly no horizontal scroll */}
        <div className="overflow-y-auto overflow-x-hidden flex-1">
          <BookingVisitForm
            isModal={true}
            onClose={handleClose}
            customTitle="Book Your Property Walkthrough"
            customSubtitle="Directly opposite Symbiosis Law School, Viman Nagar. Schedule an in-person or virtual tour."
          />
        </div>

        {/* Subtle Footer Dismissal Note */}
        <div className="bg-[#FAF7F2] dark:bg-[#071930] border-t border-[#0B213F]/15 dark:border-[#E5D9C4]/20 px-6 py-2.5 text-center flex items-center justify-between text-[11px] text-[#0B213F]/70 dark:text-[#E5D9C4]/70">
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3 text-[#C87D65]" />
            Shubh Gateway & Shubh Nirvaana
          </span>
          <button
            type="button"
            onClick={handleClose}
            className="font-medium text-[#C87D65] hover:underline"
          >
            Close & browse website
          </button>
        </div>
      </div>
    </div>
  );
};
