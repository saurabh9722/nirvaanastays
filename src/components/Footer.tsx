import React from 'react';
import { Mail, Phone, MapPin, ArrowUp, MessageCircle, Heart, ShieldCheck } from 'lucide-react';
import { getAssetUrl } from '../utils/asset-helper.ts';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Properties', href: '#properties' },
    { label: 'Rooms & Pricing', href: '#rooms' },
    { label: 'Amenities', href: '#amenities' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Why NIRVANA', href: '#why' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact & Visit', href: '#contact' },
  ];

  return (
    <footer className="bg-[#2C2623] text-[#FAF7F2] border-t border-[#3D3531] pt-16 pb-12 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[#3E3632]">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-6">
            {/* Full-size uncropped brand logo card */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl bg-[#0C1520] p-2.5 border border-white/15 shadow-xl flex items-center justify-center shrink-0">
                <img
                  src={getAssetUrl('assets/logo-dark.png')}
                  alt="NIRVANA Stays Official Logo"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="space-y-1">
                <span className="font-editorial text-2xl sm:text-3xl font-bold tracking-tight text-[#FFFDF9] block">
                  NIRVANA Stays
                </span>
                <span className="text-xs uppercase tracking-widest text-[#C9A45B] block font-semibold">
                  NIRVANA Urban Nest Pvt. Ltd.
                </span>
                <p className="text-xs text-[#FAF7F2]/65 pt-1">
                  Co-Living in Viman Nagar, Pune
                </p>
              </div>
            </div>

            <p className="text-sm text-[#FAF7F2]/75 leading-relaxed max-w-sm">
              Premium co-living brand in Viman Nagar, Pune. Providing fully furnished, professionally managed homes designed for students and working professionals.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://wa.me/917507066306"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#C87D65] hover:bg-[#B56A52] text-white text-xs font-semibold tracking-wide transition-all shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>

              <a
                href="tel:+917507066306"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#FAF7F2]/20 hover:border-[#FAF7F2]/40 text-[#FAF7F2] text-xs font-medium tracking-wide transition-all"
              >
                <Phone className="w-3.5 h-3.5 text-[#C9A45B]" />
                <span>+91 75070 66306</span>
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C9A45B]">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[#FAF7F2]/75 hover:text-[#C87D65] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Location & Details Column */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C9A45B]">
              Viman Nagar Addresses
            </h4>
            
            <div className="space-y-4 text-xs text-[#FAF7F2]/75">
              <div className="space-y-1">
                <span className="font-semibold text-[#FFFDF9] block">1. Shubh Gateway (Sales & Campus Office)</span>
                <p className="leading-relaxed">
                  Sr. No. 227, Plot No. 1, New Airport Rd, opposite Symbiosis Law College, Viman Nagar, Pune, Maharashtra 411032.
                </p>
              </div>

              <div className="space-y-1">
                <span className="font-semibold text-[#FFFDF9] block">2. Shubh Nirvana</span>
                <p className="leading-relaxed">
                  Opposite 10Biz Park, Viman Nagar, Pune, Maharashtra 411014.
                </p>
              </div>

              <div className="pt-2 text-xs text-[#FAF7F2]/60 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#7A8B7B]" />
                <span>Verified Legal Entity: NIRVANA Urban Nest Pvt. Ltd.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FAF7F2]/60">
          <p>© {new Date().getFullYear()} NIRVANA Urban Nest Pvt. Ltd. All rights reserved.</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-[#C87D65] transition-colors group focus:outline-none"
            aria-label="Scroll back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};
