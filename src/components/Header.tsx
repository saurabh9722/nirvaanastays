import React, { useState } from 'react';
import { Menu, X, ArrowRight, MessageCircle } from 'lucide-react';
import { getAssetUrl } from '../utils/asset-helper.ts';

interface HeaderProps {
  onBookVisitClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onBookVisitClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Properties', href: '#properties' },
    { label: 'Rooms', href: '#rooms' },
    { label: 'Amenities', href: '#amenities' },
    { label: 'Connectivity', href: '#connectivity' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Why NIRVAANA', href: '#why' },
    { label: 'FAQ', href: '#faq' },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#FAF7F2]/90 border-b border-[#E6E0D6] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo - Full size & uncropped with complete typography */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('#home');
          }}
          className="flex items-center gap-3.5 shrink-0 group focus:outline-none"
          aria-label="NIRVAANA Stays Home"
        >
          {/* Logo badge with generous padding so corners & bottom tagline are NEVER cut off */}
          <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-xl bg-[#0C1520] p-1 border border-[#0C1520]/20 shadow-sm flex items-center justify-center shrink-0 overflow-hidden group-hover:shadow-md transition-all">
            <img
              src={getAssetUrl('assets/logo-dark.png')}
              alt="NIRVAANA Stays Emblem"
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain"
            />
          </div>

          <div className="flex flex-col justify-center">
            <span className="font-editorial text-lg sm:text-2xl font-bold tracking-tight text-[#2C2623] leading-none group-hover:text-[#C87D65] transition-colors">
              NIRVAANA STAYS
            </span>
            <span className="text-[10px] sm:text-xs tracking-widest uppercase text-[#C87D65] font-semibold mt-1">
              Co-Living · Viman Nagar
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#2C2623]" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(link.href);
              }}
              className="text-[#6E655F] hover:text-[#C87D65] transition-colors duration-200 tracking-wide font-medium"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right CTA Button & Mobile Menu Toggle */}
        <div className="flex items-center gap-3">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              if (onBookVisitClick) onBookVisitClick();
              handleLinkClick('#contact');
            }}
            className="hidden sm:inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#C87D65] hover:bg-[#B56A52] text-white text-sm font-semibold tracking-wide transition-all shadow-sm hover:shadow-md hover:scale-105"
          >
            <span>Book a Visit</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl border border-[#E6E0D6] bg-[#FFFDF9] text-[#2C2623] hover:text-[#C87D65] transition-colors focus:outline-none"
            aria-label="Toggle navigation drawer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FFFDF9] border-b border-[#E6E0D6] px-6 py-6 space-y-4 shadow-lg animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className="text-base font-medium text-[#2C2623] hover:text-[#C87D65] py-2 border-b border-[#FAF7F2] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-3 flex flex-col gap-2.5">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                if (onBookVisitClick) onBookVisitClick();
                handleLinkClick('#contact');
              }}
              className="w-full py-3 rounded-full bg-[#C87D65] hover:bg-[#B56A52] text-white text-center text-sm font-semibold tracking-wide transition-all shadow-sm flex items-center justify-center gap-2"
            >
              <span>Book a Visit</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="https://wa.me/919096166306"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-full border border-[#E6E0D6] bg-[#F3EFE6] text-[#2C2623] hover:bg-[#FAF7F2] text-center text-sm font-medium tracking-wide transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-[#7A8B7B]" />
              <span>WhatsApp Concierge</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
