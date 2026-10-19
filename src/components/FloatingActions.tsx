import React from 'react';
import { MessageCircle, Phone, ArrowUp } from 'lucide-react';

interface FloatingActionsProps {
  onBookVisitClick?: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({ onBookVisitClick }) => {
  const handleWhatsApp = () => {
    const msg = encodeURIComponent(
      'Hi NIRVANA Stays, I would like to inquire about co-living rooms in Viman Nagar, Pune.'
    );
    window.open(`https://wa.me/917507066306?text=${msg}`, '_blank');
  };

  const handleCall = () => {
    window.location.href = 'tel:+917507066306';
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {/* Call Button */}
      <button
        onClick={handleCall}
        className="hidden sm:flex items-center gap-2 px-4 py-3 rounded-full bg-[#FFFDF9] text-[#2C2623] shadow-lg hover:bg-[#F3EFE6] transition-all border border-[#E6E0D6] hover:scale-105"
        title="Call NIRVANA Stays"
        aria-label="Call NIRVANA Stays"
      >
        <Phone className="w-4 h-4 text-[#C87D65]" />
        <span className="text-xs font-semibold">Call Now</span>
      </button>

      {/* WhatsApp Floating Button */}
      <button
        onClick={handleWhatsApp}
        className="flex items-center gap-2.5 px-5 py-3 rounded-full bg-[#C87D65] hover:bg-[#B56A52] text-white shadow-xl hover:shadow-2xl transition-all hover:scale-105 font-medium border border-[#B56A52]"
        title="Chat on WhatsApp (+91 75070 66306)"
        aria-label="WhatsApp NIRVANA Stays"
      >
        <MessageCircle className="w-4 h-4 fill-current" />
        <span className="text-xs font-semibold tracking-wide">WhatsApp Us</span>
      </button>
    </div>
  );
};
