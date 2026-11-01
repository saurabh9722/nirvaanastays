import React, { useState, useEffect, useRef } from 'react';
import { shouldStartDissolve } from '../utils/loader-logic.ts';

interface WebsiteLoaderProps {
  onComplete: () => void;
  leadTimeSeconds?: number; // Starts dissolve 3 seconds before video ends
}

export const WebsiteLoader: React.FC<WebsiteLoaderProps> = ({
  onComplete,
  leadTimeSeconds = 3.0,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [duration, setDuration] = useState<number>(10.0);
  const [isDissolving, setIsDissolving] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const hasTriggeredCompleteRef = useRef<boolean>(false);

  // Safely finish loader and notify parent
  const handleFinish = () => {
    if (hasTriggeredCompleteRef.current) return;
    hasTriggeredCompleteRef.current = true;
    setIsDissolving(true);
    setIsFinished(true);
    onComplete();
  };

  // Skip intro immediately if user clicks skip
  const handleSkip = () => {
    handleFinish();
  };

  // Enforce zero audio across all browsers
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.volume = 0;
      videoRef.current.defaultMuted = true;
      
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // In case autoplay is blocked or deferred by browser policy, keep playing muted
          if (videoRef.current) {
            videoRef.current.muted = true;
            videoRef.current.play().catch(() => {});
          }
        });
      }
    }
  }, []);

  // Prevent background scroll while intro video is running
  useEffect(() => {
    if (!isDissolving && !isFinished) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [isDissolving, isFinished]);

  // Video metadata loaded: record duration
  const handleLoadedMetadata = () => {
    if (videoRef.current && Number.isFinite(videoRef.current.duration) && videoRef.current.duration > 0) {
      setDuration(videoRef.current.duration);
    }
  };

  // Track video playback time to trigger dissolve exactly 3s before video completes
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const dur = duration || videoRef.current.duration || 10.0;

    if (!isDissolving && shouldStartDissolve(current, dur, leadTimeSeconds)) {
      setIsDissolving(true);
    }
  };

  // Video natural completion
  const handleVideoEnded = () => {
    handleFinish();
  };

  // Safety fallback timer: guarantees site is never stuck even on low-power devices
  useEffect(() => {
    const safetyMs = (duration + 1.0) * 1000;
    const safetyTimer = setTimeout(() => {
      if (!hasTriggeredCompleteRef.current) {
        handleFinish();
      }
    }, safetyMs);

    return () => clearTimeout(safetyTimer);
  }, [duration]);

  if (isFinished) {
    return null;
  }

  return (
    <div
      aria-label="Website loading animation"
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#091A2E] select-none transition-opacity ease-out pointer-events-${isDissolving ? 'none' : 'auto'}`}
      style={{
        opacity: isDissolving ? 0 : 1,
        transitionDuration: `${leadTimeSeconds * 1000}ms`,
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {/* Background ambient depth glow */}
      <div className="absolute inset-0 bg-radial from-[#0e2746]/50 via-[#091A2E]/90 to-[#091A2E] pointer-events-none" />

      {/* Main Brand Reveal Video Box with feathered gradient edges */}
      <div className="relative w-full h-full max-w-6xl max-h-screen flex items-center justify-center p-0 sm:p-4">
        {/* Masked Video Wrapper: CSS mask-image feathers the video perimeter smoothly into the background */}
        <div
          className="relative w-full h-full flex items-center justify-center overflow-hidden"
          style={{
            maskImage: 'radial-gradient(ellipse 80% 75% at 50% 50%, black 45%, rgba(0,0,0,0.85) 65%, transparent 95%)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 75% at 50% 50%, black 45%, rgba(0,0,0,0.85) 65%, transparent 95%)',
          }}
        >
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            preload="auto"
            onLoadedMetadata={handleLoadedMetadata}
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleVideoEnded}
            className="w-full h-full object-contain max-h-[95vh]"
          >
            {/* 100% silent audio-stripped stream */}
            <source src="/assets/aistudio/nirvaana_stays_logo_reveal_muted.mp4" type="video/mp4" />
            {/* Fallback to original with muted attribute enforced */}
            <source src="/assets/aistudio/nirvaana_stays_logo_reveal_17df2817.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Soft edge gradient fades ensuring zero sharp video borders on any screen size */}
        <div className="absolute inset-x-0 top-0 h-24 sm:h-32 bg-gradient-to-b from-[#091A2E] via-[#091A2E]/80 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-24 sm:h-32 bg-gradient-to-t from-[#091A2E] via-[#091A2E]/80 to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 left-0 w-20 sm:w-32 bg-gradient-to-r from-[#091A2E] via-[#091A2E]/80 to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-20 sm:w-32 bg-gradient-to-l from-[#091A2E] via-[#091A2E]/80 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,#091A2E_92%)] pointer-events-none" />
      </div>

      {/* Subtle luxury skip button in corner */}
      <button
        onClick={handleSkip}
        type="button"
        aria-label="Skip intro animation"
        className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 z-10 px-4 py-1.5 rounded-full bg-[#0B213F]/60 hover:bg-[#0B213F]/90 text-[#E5D9C4]/80 hover:text-[#E5D9C4] border border-[#E5D9C4]/20 backdrop-blur-md text-[11px] font-sans tracking-widest uppercase transition-all duration-300 shadow-lg hover:border-[#E5D9C4]/50 cursor-pointer"
      >
        Skip Intro
      </button>

      {/* Subtle brand attribution at bottom */}
      <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 z-10 flex items-center gap-2 pointer-events-none opacity-60">
        <div className="w-1.5 h-1.5 rounded-full bg-[#C87D65] animate-pulse" />
        <span className="text-[10px] uppercase tracking-widest text-[#E5D9C4]/70 font-sans">
          NIRVAANA STAYS · Viman Nagar
        </span>
      </div>
    </div>
  );
};
