import React from 'react';
import { Phone, ArrowUp, MessageCircle, ShieldCheck } from 'lucide-react';
import { getAssetUrl } from '../utils/asset-helper.ts';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Properties', href: '#properties' },
    { label: 'Rooms & Pricing', href: '#rooms' },
    { label: 'Amenities', href: '#amenities' },
    { label: 'Connectivity & Hubs', href: '#connectivity' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Why NIRVAANA', href: '#why' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact & Visit', href: '#contact' },
  ];

  return (
    <footer className="bg-[#071529] dark:bg-[#050E1A] text-[#E5D9C4] border-t border-[#E5D9C4]/15 pt-16 pb-12 transition-colors font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[#E5D9C4]/15">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-6">
            {/* Full-size uncropped brand logo card */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-[#0D1826] p-2.5 border border-[#E5D9C4]/20 shadow-xl flex items-center justify-center shrink-0">
                <img
                  src="/assets/aistudio/Trans_biege_logo_only_a2d50d83.svg"
                  alt="NIRVAANA Stays Official Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="space-y-1">
                <span className="font-editorial text-2xl sm:text-3xl font-bold tracking-tight text-[#E5D9C4] block">
                  NIRVAANA Stays
                </span>
                <span className="text-xs uppercase font-bold tracking-widest text-[#C87D65] block">
                  NIRVAANA Urban Nest Pvt. Ltd.
                </span>
                <p className="text-xs text-[#E5D9C4]/70 pt-1">
                  Co-Living in Viman Nagar, Pune
                </p>
              </div>
            </div>

            <p className="text-sm text-[#E5D9C4]/80 leading-relaxed max-w-sm">
              Premium co-living brand in Viman Nagar, Pune. Providing fully furnished, professionally managed homes designed for students and working professionals.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://wa.me/919096166306"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#C87D65] hover:bg-[#B56A52] text-white text-xs font-semibold tracking-wide transition-all shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>

              <a
                href="tel:+919096166306"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#E5D9C4]/20 hover:border-[#E5D9C4]/40 text-[#E5D9C4] text-xs font-medium tracking-wide transition-all"
              >
                <Phone className="w-3.5 h-3.5 text-[#C87D65]" />
                <span>+91 90961 66306</span>
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#C87D65]">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[#E5D9C4]/80 hover:text-[#C87D65] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Location & Details Column */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#C87D65]">
              Viman Nagar Addresses
            </h4>
            
            <div className="space-y-4 text-xs text-[#E5D9C4]/80">
              <div className="space-y-1">
                <span className="font-bold text-[#E5D9C4] block">1. Shubh Gateway (Campus HQ & Office)</span>
                <p className="leading-relaxed">
                  First floor, Shubh Gateway, Shop number 116, society, opp. to Symbiosis Law School, Survey Number 235, Mhada Colony, Pune, Maharashtra 411032.
                </p>
                <p className="text-[11px] font-mono text-[#C87D65]">
                  Plus Code: HWG5+62 Pune, Maharashtra · Lat/Lng: 18.5756, 73.9076
                </p>
              </div>

              <div className="space-y-1">
                <span className="font-bold text-[#E5D9C4] block">2. Shubh Nirvaana</span>
                <p className="leading-relaxed">
                  Opposite 10Biz Park, Viman Nagar, Pune, Maharashtra 411014.
                </p>
              </div>

              <div className="pt-2 text-xs text-[#E5D9C4]/70 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C87D65]" />
                <span>Verified Legal Entity: NIRVAANA Urban Nest Pvt. Ltd.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#E5D9C4]/70">
          <p>© {new Date().getFullYear()} NIRVAANA Urban Nest Pvt. Ltd. All rights reserved.</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-[#C87D65] transition-colors group focus:outline-none"
            aria-label="Scroll back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-4 h-4 text-[#C87D65] group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};
