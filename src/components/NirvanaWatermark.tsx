import React, { useEffect, useRef } from 'react';

/**
 * NirvanaWatermark
 * Fixed monumental capital 'N' watermark in NIRVAANA signature terracotta orange (#C87D65).
 * Follows the center of the viewport during body scrolling, and STOPS following the
 * center of the screen rule just before the footer so it never bleeds into or overlaps the footer.
 */
export const NirvanaWatermark: React.FC = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;
      const footer = document.querySelector('footer');
      if (!footer) return;

      const footerTop = footer.getBoundingClientRect().top;
      const vh = window.innerHeight;

      // Half height of watermark glyph (~320px) plus breathing margin before footer
      const watermarkBottomBuffer = 330;
      const stopThreshold = vh * 0.5 + watermarkBottomBuffer;

      if (footerTop < stopThreshold) {
        // Stop following the center of the screen: pin it just above the footer
        const shiftUp = stopThreshold - footerTop;
        contentRef.current.style.transform = `translate3d(0, ${-shiftUp}px, 0)`;
        const fade = Math.max(0, 1 - shiftUp / 350);
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
        {/* Subtle warm radial warmth centered behind the letterform */}
        <div className="absolute w-[80vw] max-w-[850px] h-[80vw] max-h-[850px] rounded-full bg-[#C87D65]/[0.08] dark:bg-[#C87D65]/[0.10] blur-3xl pointer-events-none" />

        {/* Clean Monumental Serif Capital 'N' Watermark without weird outlines or double strokes */}
        <svg
          viewBox="0 0 600 700"
          className="w-[75vw] max-w-[620px] h-[72vh] max-h-[700px] text-[#C87D65] overflow-visible pointer-events-none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Pure Serif 'N' glyph with smooth luxury fill, zero stroke artifacts */}
          <text
            x="300"
            y="540"
            textAnchor="middle"
            fontFamily="'Cormorant Garamond', Georgia, serif"
            fontSize="560"
            fontWeight="700"
            fill="#C87D65"
            fillOpacity="0.14"
            style={{ letterSpacing: '-0.02em' }}
          >
            N
          </text>
        </svg>
      </div>
    </div>
  );
};
