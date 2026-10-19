import React, { useRef, useState, useCallback, useEffect } from 'react';
import { calculateTilt, TiltResult } from '../utils/perspective-logic.ts';

export interface PerspectiveCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  maxTilt?: number; // max tilt degrees (e.g. 10 to 16)
  perspective?: number; // perspective in pixels (e.g. 1000)
  scale?: number; // scale on hover (e.g. 1.025)
  glare?: boolean; // whether to show specular light reflection
  glareOpacity?: number; // max glare opacity (e.g. 0.25)
  active?: boolean; // can disable on demand
  depth?: number; // max Z elevation in px
}

export const PerspectiveCard: React.FC<PerspectiveCardProps> = ({
  children,
  className = '',
  containerClassName = '',
  maxTilt = 13,
  perspective = 1000,
  scale = 1.02,
  glare = true,
  glareOpacity = 0.22,
  active = true,
  depth = 18,
  style,
  ...restProps
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState<TiltResult>({
    rotateX: 0,
    rotateY: 0,
    pctX: 0,
    pctY: 0,
    glareX: 50,
    glareY: 50,
    depthZ: 0,
  });

  const rafId = useRef<number | null>(null);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!active || !cardRef.current) return;
      // Skip on touch devices to maintain native smooth scroll
      if (e.pointerType === 'touch') return;

      const rect = cardRef.current.getBoundingClientRect();
      const nextTilt = calculateTilt(e.clientX, e.clientY, rect, maxTilt, depth);

      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }

      rafId.current = requestAnimationFrame(() => {
        setTilt(nextTilt);
        if (!isHovered) setIsHovered(true);
      });
    },
    [active, maxTilt, depth, isHovered]
  );

  const handlePointerLeave = useCallback(() => {
    if (!active) return;
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
    }
    setIsHovered(false);
    setTilt({
      rotateX: 0,
      rotateY: 0,
      pctX: 0,
      pctY: 0,
      glareX: 50,
      glareY: 50,
      depthZ: 0,
    });
  }, [active]);

  useEffect(() => {
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  const transformStyle = active && isHovered
    ? `perspective(${perspective}px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) translateZ(${tilt.depthZ}px) scale3d(${scale}, ${scale}, ${scale})`
    : `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale3d(1, 1, 1)`;

  return (
    <div
      className={`relative [perspective:1000px] ${containerClassName}`}
      style={{ isolation: 'isolate' }}
    >
      <div
        ref={cardRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onPointerCancel={handlePointerLeave}
        className={`relative transition-transform duration-200 ease-out will-change-transform [transform-style:preserve-3d] ${className}`}
        style={{
          transform: transformStyle,
          transition: isHovered
            ? 'transform 0.12s cubic-bezier(0.2, 0, 0.38, 0.9), box-shadow 0.2s ease-out'
            : 'transform 0.55s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.4s ease-out',
          ...style,
        }}
        {...restProps}
      >
        {children}

        {/* Specular Glare / Dynamic Lighting Sheen Layer */}
        {glare && active && (
          <div
            className="absolute inset-0 rounded-[inherit] pointer-events-none transition-opacity duration-300 z-30 overflow-hidden"
            style={{
              opacity: isHovered ? 1 : 0,
              background: `radial-gradient(circle 420px at ${tilt.glareX}% ${tilt.glareY}%, rgba(255, 255, 255, ${glareOpacity}) 0%, rgba(244, 230, 223, ${glareOpacity * 0.4}) 35%, transparent 75%)`,
              mixBlendMode: 'soft-light',
            }}
          />
        )}

        {/* Subtle Ambient Rim Light */}
        {active && isHovered && (
          <div
            className="absolute -inset-[1px] rounded-[inherit] pointer-events-none z-20 transition-opacity duration-300"
            style={{
              boxShadow: `0 ${tilt.rotateX * -2}px 35px -8px rgba(200, 125, 101, 0.18), 0 10px 25px -5px rgba(44, 38, 35, 0.08)`,
              opacity: isHovered ? 1 : 0,
            }}
          />
        )}
      </div>
    </div>
  );
};
