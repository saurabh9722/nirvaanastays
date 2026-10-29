import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext.tsx';

/**
 * NirvanaWatermark
 * Fixed monumental logo watermark using the official logo-only SVG.
 * Light theme: Blue logo (/assets/aistudio/Trans_blue_logo_only_407c30d8.svg)
 * Dark theme: Beige logo (/assets/aistudio/Trans_biege_logo_only_a2d50d83.svg)
 * Rendered at subtle 0.14 opacity so it is visible but never prominent.
 * Follows the center of the viewport during body scrolling, and STOPS following the
 * center of the screen rule just before the footer so it never bleeds into or overlaps the footer.
 */
export const NirvanaWatermark: React.FC = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const { isDark } = useTheme();

  const logoSrc = isDark
    ? '/assets/aistudio/Trans_biege_logo_only_a2d50d83.svg'
    : '/assets/aistudio/Trans_blue_logo_only_407c30d8.svg';

  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;
      const footer = document.querySelector('footer');
      if (!footer) return;

      const footerTop = footer.getBoundingClientRect().top;
      const vh = window.innerHeight;

      // Half height of watermark glyph (~290px) plus breathing margin before footer
      const watermarkBottomBuffer = 300;
      const stopThreshold = vh * 0.5 + watermarkBottomBuffer;

      if (footerTop < stopThreshold) {
        // Stop following the center of the screen: pin it just above the footer
        const shiftUp = stopThreshold - footerTop;
        contentRef.current.style.transform = `translate3d(0, ${-shiftUp}px, 0)`;
        const fade = Math.max(0, 1 - shiftUp / 300);
        contentRef.current.style.opacity = `${fade}`;
      } else {
        contentRef.current.style.transform = 'translate3d(0, 0, 0)';
        contentRef.current.style.opacity = '1';
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden select-none"
      aria-hidden="true"
    >
      <div
        ref={contentRef}
        className="relative flex items-center justify-center will-change-transform transition-opacity duration-150"
      >
        {/* Subtle warm radial warmth centered behind the logo */}
        <div className="absolute w-[80vw] max-w-[850px] h-[80vw] max-h-[850px] rounded-full bg-[#C87D65]/[0.05] dark:bg-[#C87D65]/[0.08] blur-3xl pointer-events-none" />

        {/* Official Brand Logo-Only Watermark: visible but not prominent */}
        <img
          src={logoSrc}
          alt=""
          aria-hidden="true"
          className="w-[75vw] max-w-[580px] h-[72vh] max-h-[580px] object-contain opacity-[0.14] select-none pointer-events-none transition-opacity duration-200"
        />
      </div>
    </div>
  );
};
