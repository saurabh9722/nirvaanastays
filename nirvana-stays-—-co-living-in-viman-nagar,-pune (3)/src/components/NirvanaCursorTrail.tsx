import React, { useEffect, useRef } from 'react';

/**
 * NirvanaCursorTrail: Soft orange ambient light that gracefully follows the mouse pointer.
 * Replaces circle rings and particle trails with a subtle, luxurious diffused glow
 * from NIRVANA's terracotta orange palette (#C87D65).
 */
export const NirvanaCursorTrail: React.FC = () => {
  const lightRef = useRef<HTMLDivElement | null>(null);
  const targetPos = useRef({ x: -600, y: -600 });
  const currentPos = useRef({ x: -600, y: -600 });
  const isHovering = useRef(false);
  const isVisible = useRef(false);

  useEffect(() => {
    // Only enable on fine pointer devices (desktop mouse/trackpad), not touch screens
    const isTouch =
      typeof window !== 'undefined' &&
      window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    if (isTouch) return;

    let animId: number;

    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };

      if (!isVisible.current) {
        isVisible.current = true;
        // Snap initial position directly to cursor on first movement
        currentPos.current = { x: e.clientX, y: e.clientY };
      }

      // Check if hovering over clickable or interactive elements
      const target = e.target as HTMLElement | null;
      if (target) {
        isHovering.current = Boolean(
          target.closest('button, a, input, select, textarea, [role="button"], .cursor-pointer')
        );
      }
    };

    const handleMouseLeave = () => {
      isVisible.current = false;
    };

    const handleMouseEnter = () => {
      isVisible.current = true;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Continuous smooth animation loop using physical lerp
    const animate = () => {
      // 0.14 lerp factor produces a fluid, soft delayed follow behind the cursor
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * 0.14;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * 0.14;

      if (lightRef.current) {
        const { x, y } = currentPos.current;
        const scale = isHovering.current ? 1.25 : 1;
        lightRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${scale})`;
        lightRef.current.style.opacity = isVisible.current
          ? isHovering.current
            ? '0.85'
            : '0.65'
          : '0';
      }

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div
      ref={lightRef}
      className="fixed top-0 left-0 pointer-events-none z-30 transition-opacity duration-300 ease-out will-change-transform"
      style={{
        opacity: 0,
        width: '420px',
        height: '420px',
        // Diffused warm orange soft light (#C87D65) perfectly blended with no hard edges or circles
        background:
          'radial-gradient(circle closest-side, rgba(200, 125, 101, 0.20) 0%, rgba(200, 125, 101, 0.10) 40%, rgba(200, 125, 101, 0.03) 70%, rgba(200, 125, 101, 0) 100%)',
        filter: 'blur(30px)',
      }}
    />
  );
};
