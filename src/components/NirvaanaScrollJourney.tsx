import React, { useEffect, useRef, useState, useMemo } from 'react';

/**
 * NirvaanaScrollJourney
 * A fluid, wavy scroll-synchronized ambient guide line and traveling radiant beacon.
 * 
 * Key Features:
 * 1. Expressive Harmonic Waves: Features sweeping organic sways (±135px on desktop,
 *    ±65px on mobile) flowing rhythmically down the page like a serene river.
 * 2. Unhindered Typography: Soft ambient stroke styling and section-level text shields
 *    guarantee the wavy line never obstructs or hinders text readability.
 * 3. Stops Exactly Behind Map Section: The line and beacon follower terminate behind
 *    the upper half of the Google Map section, completely hidden by the map card
 *    so it NEVER peeks out below the map or into the footer.
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

  // Compute the expressive wavy Zen Path down the page:
  // Features fluid harmonic sweeps across gutters, terminating behind the map
  const pathD = useMemo(() => {
    const { width: w, endY } = dimensions;
    const midX = w * 0.5;
    const isMobile = w < 768;
    // Noticeably wavy amplitude that creates beautiful organic S-curves
    const sway = isMobile ? 65 : 135;

    const startY = 70;
    const totalDist = Math.max(100, endY - startY);

    // 14 segments creating rich, fluid harmonic waves
    const steps = 14;
    const pts: { x: number; y: number }[] = [];

    for (let i = 0; i <= steps; i++) {
      const frac = i / steps;
      const y = startY + frac * totalDist;

      // Multi-frequency harmonic wave: sweeping sways that gently damp before the map
      const damp = i === steps ? 0 : Math.sin(frac * Math.PI * 0.95);
      const wave = (Math.sin(frac * Math.PI * 5) * 0.85 + Math.cos(frac * Math.PI * 2.5) * 0.35) * sway * damp;
      const x = midX + wave;
      pts.push({ x, y });
    }

    // Build smooth cubic Bezier curve through all points
    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const pCurrent = pts[i];
      const pNext = pts[i + 1];
      const dy = (pNext.y - pCurrent.y) * 0.5;
      d += ` C ${pCurrent.x} ${pCurrent.y + dy}, ${pNext.x} ${pNext.y - dy}, ${pNext.x} ${pNext.y}`;
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

  // Real-time zero-lag scroll tracking: dot & progress line stay updated along the wave
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
        const mapDocTop = scrollYCurrent + mapRect.top;
        maxScrollForPath = Math.max(1, mapDocTop - window.innerHeight * 0.35);
      }

      const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
      const progress = Math.min(1, Math.max(0, scrollY / Math.max(1, maxScrollForPath)));

      // Keep line synchronized with scroll
      const activeLength = progress * len;
      pathEl.style.strokeDashoffset = `${len - activeLength}`;

      // Keep beacon dot visible and smoothly tracked along the wavy path
      if (beaconGroupRef.current) {
        const pt = pathEl.getPointAtLength(activeLength);
        beaconGroupRef.current.style.transform = `translate3d(${pt.x}px, ${pt.y}px, 0)`;

        // Hide beacon when scrolling into footer so it never peeks out
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
            <stop offset="50%" stopColor="#DF937D" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#C87D65" stopOpacity="0.80" />
          </linearGradient>

          {/* Soft warm aura glow filter */}
          <filter id="nirvaanaGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#C87D65" floodOpacity="0.4" />
          </filter>

          <filter id="beaconRadiance" x="-100%" y="-100%" width="300%" height="300%">
            <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#C87D65" floodOpacity="0.65" />
          </filter>
        </defs>

        {/* 1. Underlying Wavy Guide Track (Soft Terracotta trace) */}
        <path
          ref={guidePathRef}
          d={pathD}
          stroke="#C87D65"
          strokeOpacity="0.18"
          strokeWidth="2"
          strokeDasharray="4 6"
          strokeLinecap="round"
        />

        {/* 2. Active Illuminated Nirvaana Wavy Path */}
        <path
          ref={pathRef}
          d={pathD}
          stroke="url(#nirvaanaLineGradient)"
          strokeWidth="3.5"
          strokeLinecap="round"
          filter="url(#nirvaanaGlow)"
          style={{ willChange: 'stroke-dashoffset' }}
        />

        {/* 3. The Traveling Radiant Beacon along the wavy path */}
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
