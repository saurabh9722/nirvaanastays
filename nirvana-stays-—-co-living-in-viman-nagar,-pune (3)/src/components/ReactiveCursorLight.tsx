import React, { useEffect, useState, useRef, useCallback } from 'react';
import { lerp } from '../utils/perspective-logic.ts';

interface ReactiveCursorLightProps {
  enabled?: boolean;
}

export const ReactiveCursorLight: React.FC<ReactiveCursorLightProps> = ({
  enabled = true,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);

  // Target mouse position (instantaneous)
  const targetPos = useRef({ x: -100, y: -100 });
  // Rendered follower position (smoothly lerped)
  const currentPos = useRef({ x: -100, y: -100 });
  // Light glow position (slightly looser lerp for fluid ambient illumination)
  const ambientPos = useRef({ x: -100, y: -100 });

  const cursorRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);

  // Check if device supports fine hover (mouse)
  const isFinePointer = useRef(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
      isFinePointer.current = mediaQuery.matches;

      const handleMediaChange = (e: MediaQueryListEvent) => {
        isFinePointer.current = e.matches;
      };

      mediaQuery.addEventListener('change', handleMediaChange);
      return () => mediaQuery.removeEventListener('change', handleMediaChange);
    }
  }, []);

  // Frame animation loop with lerping
  const animate = useCallback(() => {
    // Lerp cursor follower (fast, snappy 0.28)
    currentPos.current.x = lerp(currentPos.current.x, targetPos.current.x, 0.28);
    currentPos.current.y = lerp(currentPos.current.y, targetPos.current.y, 0.28);

    // Lerp ambient light cone (gentle, atmospheric 0.12)
    ambientPos.current.x = lerp(ambientPos.current.x, targetPos.current.x, 0.12);
    ambientPos.current.y = lerp(ambientPos.current.y, targetPos.current.y, 0.12);

    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0)`;
    }

    if (lightRef.current) {
      lightRef.current.style.transform = `translate3d(${ambientPos.current.x}px, ${ambientPos.current.y}px, 0)`;
    }

    rafId.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      if (!isFinePointer.current) return;

      targetPos.current.x = e.clientX;
      targetPos.current.y = e.clientY;

      if (!isVisible) setIsVisible(true);

      // Check if hovering over an interactive element or card
      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = Boolean(
          target.closest('button, a, input, select, textarea, [role="button"], article, .cursor-pointer, [data-interactive]')
        );
        setIsHoveringInteractive(isInteractive);
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      setIsClicking(true);

      // Spawn a light burst ripple
      const newRipple = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
      };
      setRipples((prev) => [...prev.slice(-3), newRipple]);

      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 600);
    };

    const handlePointerUp = () => {
      setIsClicking(false);
    };

    const handlePointerLeave = () => {
      setIsVisible(false);
    };

    const handlePointerEnter = () => {
      if (isFinePointer.current) {
        setIsVisible(true);
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);
    document.addEventListener('mouseleave', handlePointerLeave);
    document.addEventListener('mouseenter', handlePointerEnter);

    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      document.removeEventListener('mouseleave', handlePointerLeave);
      document.removeEventListener('mouseenter', handlePointerEnter);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [enabled, isVisible, animate]);

  if (!enabled) return null;

  return (
    <>
      {/* 1. Viewport Ambient Reactive Light Aura (illuminates cards and surfaces under cursor) */}
      <div
        className="fixed inset-0 pointer-events-none z-20 overflow-hidden transition-opacity duration-500"
        style={{ opacity: isVisible ? 1 : 0 }}
      >
        <div
          ref={lightRef}
          className="absolute -top-[300px] -left-[300px] w-[600px] h-[600px] rounded-full pointer-events-none will-change-transform"
          style={{
            background: isHoveringInteractive
              ? 'radial-gradient(circle, rgba(200, 125, 101, 0.14) 0%, rgba(212, 163, 115, 0.08) 35%, rgba(244, 230, 223, 0.02) 65%, transparent 75%)'
              : 'radial-gradient(circle, rgba(200, 125, 101, 0.09) 0%, rgba(212, 163, 115, 0.04) 30%, transparent 70%)',
            transition: 'background 0.3s ease',
            filter: 'blur(10px)',
          }}
        />
      </div>

      {/* 2. Cursor Follower Halo & Beacon */}
      <div
        className="fixed inset-0 pointer-events-none z-50 overflow-hidden transition-opacity duration-300"
        style={{ opacity: isVisible ? 1 : 0 }}
      >
        <div
          ref={cursorRef}
          className="absolute -top-6 -left-6 w-12 h-12 flex items-center justify-center pointer-events-none will-change-transform"
        >
          {/* Outer glowing reactive ring */}
          <div
            className={`rounded-full transition-all duration-300 ease-out border flex items-center justify-center ${
              isHoveringInteractive
                ? 'w-11 h-11 border-[#C87D65] bg-[#C87D65]/15 shadow-[0_0_20px_rgba(200,125,101,0.45)] scale-110'
                : isClicking
                ? 'w-7 h-7 border-[#B26B54] bg-[#B26B54]/25 scale-90'
                : 'w-7 h-7 border-[#C87D65]/50 bg-[#C87D65]/5 shadow-[0_0_12px_rgba(200,125,101,0.2)]'
            }`}
          >
            {/* Inner radiant spark/dot */}
            <div
              className={`rounded-full bg-[#C87D65] transition-all duration-200 ${
                isHoveringInteractive
                  ? 'w-2 h-2 shadow-[0_0_8px_#C87D65]'
                  : isClicking
                  ? 'w-2.5 h-2.5 bg-[#B26B54]'
                  : 'w-1.5 h-1.5 opacity-90'
              }`}
            />
          </div>
        </div>

        {/* 3. Click Light Bursts / Radiations */}
        {ripples.map((ripple) => (
          <div
            key={ripple.id}
            className="absolute -top-10 -left-10 w-20 h-20 rounded-full border border-[#C87D65]/60 bg-[#C87D65]/10 animate-ping pointer-events-none"
            style={{
              transform: `translate3d(${ripple.x}px, ${ripple.y}px, 0)`,
            }}
          />
        ))}
      </div>
    </>
  );
};
