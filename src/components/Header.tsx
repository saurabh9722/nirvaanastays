import React, { useState } from 'react';
import { Menu, X, ArrowRight, MessageCircle, Sun, Moon } from 'lucide-react';
import { getAssetUrl } from '../utils/asset-helper.ts';
import { useTheme } from '../context/ThemeContext.tsx';

interface HeaderProps {
  onBookVisitClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onBookVisitClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, isDark, toggleTheme } = useTheme();

  const navLinks = [
    { label: 'Properties', href: '#properties' },
    { label: 'Rooms', href: '#rooms' },
    { label: 'Amenities', href: '#amenities' },
    { label: 'Connectivity', href: '#connectivity' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Why NIRVAANA', href: '#why' },
    { label: 'FAQ', href: '#faq' },
  ];

  // Exact scroll target calculation with header offset to guarantee headers are NEVER cut off
  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const headerOffset = 96; // 80px header height + 16px buffer
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth',
      });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#FAF7F2]/90 dark:bg-[#0B213F]/90 border-b border-[#0B213F]/15 dark:border-[#E5D9C4]/15 transition-colors shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo - Theme-aware official SVG logo and text */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('#home');
          }}
          className="flex items-center gap-3 shrink-0 group focus:outline-none"
          aria-label="NIRVAANA Stays Home"
        >
          {/* Logo badge with logo-only SVG: Blue on Light mode, Beige on Dark mode */}
          <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-xl bg-[#0B213F]/5 dark:bg-[#E5D9C4]/10 p-1.5 border border-[#0B213F]/10 dark:border-[#E5D9C4]/20 shadow-xs flex items-center justify-center shrink-0 group-hover:scale-105 transition-all">
            <img
              src={isDark ? '/assets/aistudio/Trans_biege_logo_only_a2d50d83.svg' : '/assets/aistudio/Trans_blue_logo_only_407c30d8.svg'}
              alt="NIRVAANA Stays Logo Emblem"
              className="w-full h-full object-contain"
            />
          </div>

          <div className="flex flex-col justify-center">
            {/* Header text replaced with official text-only SVG: Blue on Light mode, Beige on Dark mode */}
            <img
              src={isDark ? '/assets/aistudio/Trans_biege_text_only_e19768c1.svg' : '/assets/aistudio/Trans_blue_text_only_cf746784.svg'}
              alt="NIRVAANA STAYS"
              className="h-7 sm:h-8 w-auto object-contain transition-opacity"
            />
            <span className="text-[10px] sm:text-[11px] uppercase font-bold tracking-widest text-[#C87D65] mt-0.5 font-sans">
              Co-Living · Viman Nagar
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-7 text-sm font-sans font-medium" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(link.href);
              }}
              className="text-[#0B213F]/75 dark:text-[#E5D9C4]/80 hover:text-[#C87D65] dark:hover:text-[#C87D65] transition-colors duration-200 tracking-wide font-medium text-sm"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right CTA Button, Theme Toggle & Mobile Menu Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Theme Toggle Button (Light / Dark) */}
          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
            className="flex items-center gap-2 px-3 py-2 rounded-full border border-[#0B213F]/15 dark:border-[#E5D9C4]/20 bg-[#FFFDF9] dark:bg-[#071930] hover:bg-[#F3ECE0] dark:hover:bg-[#0E294E] text-[#0B213F] dark:text-[#E5D9C4] transition-all focus:outline-none focus:ring-2 focus:ring-[#C87D65]"
          >
            {isDark ? (
              <>
                <Sun className="w-4 h-4 text-amber-300 animate-in spin-in-90 duration-200" />
                <span className="hidden sm:inline text-xs font-semibold">Light</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-[#0B213F] animate-in spin-in-90 duration-200" />
                <span className="hidden sm:inline text-xs font-semibold">Dark</span>
              </>
            )}
          </button>

          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              if (onBookVisitClick) onBookVisitClick();
              handleLinkClick('#contact');
            }}
            className="hidden sm:inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#C87D65] hover:bg-[#B56A52] text-white text-sm font-semibold tracking-wide transition-all shadow-sm hover:shadow-md hover:scale-[1.02]"
          >
            <span>Book a Visit</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl border border-[#0B213F]/15 dark:border-[#E5D9C4]/20 bg-[#FFFDF9] dark:bg-[#071930] text-[#0B213F] dark:text-[#E5D9C4] hover:text-[#C87D65] transition-colors focus:outline-none"
            aria-label="Toggle navigation drawer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF7F2] dark:bg-[#071930] border-b border-[#0B213F]/15 dark:border-[#E5D9C4]/15 px-6 py-6 space-y-4 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200 font-sans">
          <div className="flex items-center justify-between pb-2 border-b border-[#0B213F]/10 dark:border-[#E5D9C4]/15">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B213F]/70 dark:text-[#E5D9C4]/70">
              Theme Mode:
            </span>
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#0B213F]/20 dark:border-[#E5D9C4]/30 bg-[#FFFDF9] dark:bg-[#0B213F] text-xs font-semibold text-[#0B213F] dark:text-[#E5D9C4]"
            >
              {isDark ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-300" />
                  <span>Switch to Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-[#0B213F]" />
                  <span>Switch to Dark Mode</span>
                </>
              )}
            </button>
          </div>

          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className="text-base font-medium text-[#0B213F] dark:text-[#E5D9C4] hover:text-[#C87D65] py-2 border-b border-[#0B213F]/10 dark:border-[#E5D9C4]/10 transition-colors"
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
              className="w-full py-3 rounded-full border border-[#0B213F]/20 dark:border-[#E5D9C4]/30 bg-[#FFFDF9] dark:bg-[#0B213F] text-[#0B213F] dark:text-[#E5D9C4] hover:text-[#C87D65] text-center text-sm font-medium tracking-wide transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-[#C87D65]" />
              <span>WhatsApp Concierge</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
