import React, { useEffect, useRef, useState, useMemo } from 'react';

/**
 * NirvaanaScrollJourney
 * A centered, scroll-synchronized ambient guide line and traveling radiant beacon.
 * 
 * Key Features:
 * 1. Centered & Organic: Flows down the middle axis of the page (centered around midX)
 *    with a serene harmonic sway, remaining centered behind content.
 * 2. Stops Exactly Behind Map Section: The line and beacon follower terminate behind
 *    the upper half of the Google Map section, completely hidden by the map card
 *    so it NEVER peeks out below the map or into the footer.
 * 3. Minimal Zen Aesthetic: Extra intermediate milestone dots have been removed for a clean,
 *    pure visual flow.
 * 4. Zero Foreground Interference: Positioned at z-[1] pointer-events-none in the background.
 */
export const NirvaanaScrollJourney: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const guidePathRef = useRef<SVGPathElement>(null);
  const beaconGroupRef = useRef<SVGGElement>(null);
  const totalLengthRef = useRef<number>(0);
  const isUpdatingRef = useRef<boolean>(false);

  const [dimensions, setDimensions] = useState<{ width: number; height: number; endY: number }>({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: 4500,
    endY: 3800,
  });

  // Measure parent container height and map element dynamically
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const parent = containerRef.current.parentElement;
        const parentHeight = parent ? parent.scrollHeight : document.documentElement.scrollHeight;
        const width = Math.max(window.innerWidth, 360);
        const height = Math.max(parentHeight, 2000);

        // Find the map section to terminate strictly behind it
        let endY = height - 900;
        const mapEl = document.getElementById('location-map');
        if (mapEl && containerRef.current) {
          const containerRect = containerRef.current.getBoundingClientRect();
          const mapRect = mapEl.getBoundingClientRect();
          // Anchor stop point inside the upper-middle region of the map card
          const mapTopInContainer = mapRect.top - containerRect.top;
          endY = Math.max(400, mapTopInContainer + 160);
        }

        setDimensions((prev) => {
          if (
            Math.abs(prev.height - height) > 10 ||
            Math.abs(prev.width - width) > 10 ||
            Math.abs(prev.endY - endY) > 10
          ) {
            return { width, height, endY };
          }
          return prev;
        });
      }
    };

    updateSize();

    const target = containerRef.current?.parentElement || document.body;
    const resizeObserver = new ResizeObserver(() => {
      updateSize();
    });

    if (target) {
      resizeObserver.observe(target);
    }

    window.addEventListener('resize', updateSize, { passive: true });
    const timer1 = setTimeout(updateSize, 300);
    const timer2 = setTimeout(updateSize, 1200);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateSize);
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  // Compute the centered Zen Path down the page:
  // Terminates squarely behind the map section so it NEVER peeks out below
  const pathD = useMemo(() => {
    const { width: w, endY } = dimensions;
    const midX = w * 0.5;
    const isMobile = w < 768;
    const sway = isMobile ? 18 : 32;

    const startY = 60;
    const totalDist = Math.max(100, endY - startY);

    // 8 segments down the center spine of the page ending behind the map
    const steps = 8;
    const pts: { x: number; y: number }[] = [];

    for (let i = 0; i <= steps; i++) {
      const frac = i / steps;
      const y = startY + frac * totalDist;
      // Oscillate gently around midX, then settle to 0 at the map
      const damp = i === steps ? 0 : 1;
      const wave = Math.sin(frac * Math.PI * 4) * sway * damp;
      const x = midX + wave;
      pts.push({ x, y });
    }

    // Build smooth cubic Bezier curve through all points
    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const pCurrent = pts[i];
      const pNext = pts[i + 1];
      const midY = (pCurrent.y + pNext.y) / 2;
      d += ` C ${pCurrent.x} ${midY}, ${pNext.x} ${midY}, ${pNext.x} ${pNext.y}`;
    }

    return d;
  }, [dimensions]);

  // Recalculate total path length when path or dimensions change
  useEffect(() => {
    if (pathRef.current) {
      try {
        const len = pathRef.current.getTotalLength();
        totalLengthRef.current = len;
        pathRef.current.style.strokeDasharray = `${len}`;
        pathRef.current.style.strokeDashoffset = `${len}`;

        // Initial beacon position
        if (beaconGroupRef.current && len > 0) {
          const pt = pathRef.current.getPointAtLength(0);
          beaconGroupRef.current.style.transform = `translate3d(${pt.x}px, ${pt.y}px, 0)`;
          beaconGroupRef.current.style.opacity = '1';
        }
      } catch {
        // Fallback
      }
    }
  }, [pathD]);

  // Real-time zero-lag scroll tracking: dot & progress line stay updated, stopping behind the map
  useEffect(() => {
    const updateProgress = () => {
      if (!pathRef.current) return;
      const pathEl = pathRef.current;
      const len = totalLengthRef.current || pathEl.getTotalLength();
      if (!len || len === 0) return;

      const mapEl = document.getElementById('location-map');
      let maxScrollForPath = document.documentElement.scrollHeight - window.innerHeight;

      if (mapEl) {
        const scrollYCurrent = window.scrollY || window.pageYOffset;
        const mapRect = mapEl.getBoundingClientRect();
        // Target scroll reaches 1.0 when the middle of the map reaches viewport center
        const mapDocTop = scrollYCurrent + mapRect.top;
        maxScrollForPath = Math.max(1, mapDocTop - window.innerHeight * 0.35);
      }

      const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
      const progress = Math.min(1, Math.max(0, scrollY / Math.max(1, maxScrollForPath)));

      // Keep line synchronized with scroll
      const activeLength = progress * len;
      pathEl.style.strokeDashoffset = `${len - activeLength}`;

      // Keep beacon dot visible and smoothly tracked at all times.
      // When at the map section or scrolling into footer, it stays parked safely behind the map card.
      if (beaconGroupRef.current) {
        const pt = pathEl.getPointAtLength(activeLength);
        beaconGroupRef.current.style.transform = `translate3d(${pt.x}px, ${pt.y}px, 0)`;

        // If the user has scrolled past the map section into the footer, hide the beacon completely
        // to guarantee it never peeks out from any angles
        const footer = document.querySelector('footer');
        if (footer) {
          const footerTop = footer.getBoundingClientRect().top;
          if (footerTop < window.innerHeight + 50) {
            beaconGroupRef.current.style.opacity = '0';
          } else {
            beaconGroupRef.current.style.opacity = '1';
          }
        } else {
          beaconGroupRef.current.style.opacity = '1';
        }
      }
    };

    const handleScroll = () => {
      updateProgress();
      if (!isUpdatingRef.current) {
        isUpdatingRef.current = true;
        requestAnimationFrame(() => {
          updateProgress();
          isUpdatingRef.current = false;
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleScroll, { passive: true });
    window.addEventListener('touchmove', handleScroll, { passive: true });

    updateProgress();
    const initTimer = setTimeout(updateProgress, 150);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('touchmove', handleScroll);
      clearTimeout(initTimer);
    };
  }, [pathD, dimensions.endY]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-[1] overflow-hidden"
      aria-hidden="true"
    >
      <svg
        width={dimensions.width}
        height={dimensions.height}
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        className="w-full h-full overflow-visible pointer-events-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Signature Terracotta Radiant Gradient for Nirvaana Path */}
          <linearGradient id="nirvaanaLineGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C87D65" stopOpacity="0.75" />
            <stop offset="50%" stopColor="#DF937D" stopOpacity="1" />
            <stop offset="100%" stopColor="#C87D65" stopOpacity="0.85" />
          </linearGradient>

          {/* Soft warm aura glow filter */}
          <filter id="nirvaanaGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#C87D65" floodOpacity="0.5" />
          </filter>

          <filter id="beaconRadiance" x="-100%" y="-100%" width="300%" height="300%">
            <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#C87D65" floodOpacity="0.7" />
          </filter>
        </defs>

        {/* 1. Underlying Centered Guide Track (Soft Terracotta trace) - ends behind map */}
        <path
          ref={guidePathRef}
          d={pathD}
          stroke="#C87D65"
          strokeOpacity="0.20"
          strokeWidth="2"
          strokeDasharray="4 6"
          strokeLinecap="round"
        />

        {/* 2. Active Illuminated Nirvaana Path (Follows scroll, ends behind map) */}
        <path
          ref={pathRef}
          d={pathD}
          stroke="url(#nirvaanaLineGradient)"
          strokeWidth="3.5"
          strokeLinecap="round"
          filter="url(#nirvaanaGlow)"
          style={{ willChange: 'stroke-dashoffset' }}
        />

        {/* 3. The Traveling Radiant Beacon (Stays behind map at bottom, never peeks out) */}
        <g
          ref={beaconGroupRef}
          filter="url(#beaconRadiance)"
          className="pointer-events-none transition-opacity duration-200"
          style={{
            transform: 'translate3d(0px, 0px, 0)',
            opacity: 1,
            willChange: 'transform, opacity',
          }}
        >
          {/* Outer gentle radiant aura */}
          <circle
            r="18"
            fill="#C87D65"
            fillOpacity="0.22"
            className="animate-ping origin-center"
            style={{ animationDuration: '2.5s' }}
          />

          {/* Middle warm disc */}
          <circle
            r="8"
            fill="#FFFDF9"
            stroke="#C87D65"
            strokeWidth="2.5"
          />

          {/* Inner vivid terracotta pearl */}
          <circle
            r="4"
            fill="#C87D65"
          />
        </g>
      </svg>
    </div>
  );
};
