import React from 'react';
import { MessageCircle, Phone } from 'lucide-react';

interface FloatingActionsProps {
  onBookVisitClick?: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({ onBookVisitClick }) => {
  const handleWhatsApp = () => {
    const msg = encodeURIComponent(
      'Hi NIRVAANA Stays, I would like to inquire about co-living rooms in Viman Nagar, Pune.'
    );
    window.open(`https://wa.me/919096166306?text=${msg}`, '_blank');
  };

  const handleCall = () => {
    window.location.href = 'tel:+919096166306';
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3 font-sans">
      {/* Call Button */}
      <button
        onClick={handleCall}
        className="hidden sm:flex items-center gap-2 px-4 py-3 rounded-full bg-white dark:bg-[#0E294E] text-[#0B213F] dark:text-[#E5D9C4] shadow-lg hover:bg-[#FAF7F2] dark:hover:bg-[#133463] transition-all border border-[#0B213F]/15 dark:border-[#E5D9C4]/25 hover:scale-105"
        title="Call NIRVAANA Stays"
        aria-label="Call NIRVAANA Stays"
      >
        <Phone className="w-4 h-4 text-[#C87D65]" />
        <span className="text-xs font-semibold">Call Now</span>
      </button>

      {/* WhatsApp Floating Button */}
      <button
        onClick={handleWhatsApp}
        className="flex items-center gap-2.5 px-5 py-3 rounded-full bg-[#C87D65] hover:bg-[#B56A52] text-white shadow-xl hover:shadow-2xl transition-all hover:scale-105 font-semibold tracking-wide"
        title="Chat on WhatsApp (+91 90961 66306)"
        aria-label="WhatsApp NIRVAANA Stays"
      >
        <MessageCircle className="w-4 h-4 fill-current text-white" />
        <span className="text-xs tracking-wide">WhatsApp Us</span>
      </button>
    </div>
  );
};
