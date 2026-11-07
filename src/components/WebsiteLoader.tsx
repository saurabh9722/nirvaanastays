import React, { useState, useEffect, useRef } from 'react';
import { shouldStartDissolve } from '../utils/loader-logic.ts';
import { Volume2, VolumeX } from 'lucide-react';

interface WebsiteLoaderProps {
  onComplete: () => void;
  leadTimeSeconds?: number; // Starts dissolve 3 seconds before video ends
}

export const WebsiteLoader: React.FC<WebsiteLoaderProps> = ({
  onComplete,
  leadTimeSeconds = 3.0,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(10.0);
  const [isDissolving, setIsDissolving] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const hasTriggeredCompleteRef = useRef<boolean>(false);

  // Safely finish loader and notify parent
  const handleFinish = () => {
    if (hasTriggeredCompleteRef.current) return;
    hasTriggeredCompleteRef.current = true;
    setIsDissolving(true);
    setIsFinished(true);
    onComplete();
  };

  // Triggered when user clicks "Enter Experience"
  // Calling .play() synchronously inside an onClick handler unlocks unmuted browser audio
  const handleEnterExperience = () => {
    setHasStarted(true);

    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.muted = false;
      videoRef.current.volume = 1.0;
      videoRef.current.defaultMuted = false;
      setIsMuted(false);

      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Fallback in case a strict device setting still restricts audio
          if (videoRef.current) {
            videoRef.current.muted = true;
            setIsMuted(true);
            videoRef.current.play().catch(() => {});
          }
        });
      }
    }
  };

  // Skip intro immediately if user clicks skip
  const handleSkip = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    handleFinish();
  };

  // Toggle sound on/off while video is playing
  const toggleSound = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!videoRef.current) return;
    const nextMuted = !videoRef.current.muted;
    videoRef.current.muted = nextMuted;
    videoRef.current.volume = 1.0;
    setIsMuted(nextMuted);
  };

  // Prevent background scroll while intro gate or video is active
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
    if (
      videoRef.current &&
      Number.isFinite(videoRef.current.duration) &&
      videoRef.current.duration > 0
    ) {
      setDuration(videoRef.current.duration);
    }
  };

  // Track video playback time to trigger dissolve 3s before video completes
  const handleTimeUpdate = () => {
    if (!videoRef.current || !hasStarted) return;
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

  // Safety fallback timer: ONLY starts counting after user clicks "Enter Experience"
  useEffect(() => {
    if (!hasStarted) return;

    const safetyMs = (duration + 1.0) * 1000;
    const safetyTimer = setTimeout(() => {
      if (!hasTriggeredCompleteRef.current) {
        handleFinish();
      }
    }, safetyMs);

    return () => clearTimeout(safetyTimer);
  }, [hasStarted, duration]);

  if (isFinished) {
    return null;
  }

  return (
    <div
      aria-label="Website loading animation"
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#091A2E] select-none transition-opacity ease-out pointer-events-${
        isDissolving ? 'none' : 'auto'
      }`}
      style={{
        opacity: isDissolving ? 0 : 1,
        transitionDuration: `${leadTimeSeconds * 1000}ms`,
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {/* Background ambient depth glow */}
      <div className="absolute inset-0 bg-radial from-[#0e2746]/50 via-[#091A2E]/90 to-[#091A2E] pointer-events-none" />

      {/* =====================================================================
          1. INITIAL "ENTER EXPERIENCE" OVERLAY (Shown before user clicks)
      ===================================================================== */}
      {!hasStarted && (
        <div className="relative z-20 flex flex-col items-center justify-center px-6 text-center animate-fade-in">
          {/* Subtle top badge */}
          <div className="flex items-center gap-2 mb-4 opacity-80">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C87D65] animate-pulse" />
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#E5D9C4]/80 font-sans">
              Viman Nagar · Pune
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#C87D65] animate-pulse" />
          </div>

          {/* Brand Title */}
          <h1 className="text-2xl sm:text-4xl font-serif tracking-[0.2em] uppercase text-[#E5D9C4] mb-3">
            Nirvaana Stays
          </h1>
          <p className="text-xs sm:text-sm text-[#E5D9C4]/60 tracking-widest uppercase font-sans mb-10 max-w-md">
            Luxury Co-Living & Curated Comfort
          </p>

          {/* Primary Enter Experience CTA (Unlocks Audio + Starts Video) */}
          <button
            onClick={handleEnterExperience}
            type="button"
            aria-label="Enter experience with sound"
            className="group relative flex items-center gap-3 px-8 py-3.5 rounded-full bg-[#0B213F]/90 hover:bg-[#C87D65] text-[#E5D9C4] hover:text-[#091A2E] border border-[#C87D65]/50 hover:border-[#C87D65] backdrop-blur-md text-xs font-sans font-medium tracking-[0.25em] uppercase transition-all duration-500 shadow-[0_0_30px_rgba(200,125,101,0.15)] hover:shadow-[0_0_40px_rgba(200,125,101,0.4)] cursor-pointer"
          >
            <Volume2 className="w-4 h-4 text-[#C87D65] group-hover:text-[#091A2E] transition-colors duration-300 animate-pulse" />
            <span>Enter Experience</span>
          </button>

          {/* Direct Skip Option for returning visitors */}
          <button
            onClick={handleSkip}
            type="button"
            className="mt-6 text-[10px] uppercase tracking-[0.2em] text-[#E5D9C4]/40 hover:text-[#E5D9C4]/80 font-sans transition-colors duration-300 cursor-pointer"
          >
            Skip Intro
          </button>
        </div>
      )}

      {/* =====================================================================
          2. VIDEO REVEAL CONTAINER (Preloads silently in DOM, reveals on click)
      ===================================================================== */}
      <div
        className={`relative w-full h-full max-w-6xl max-h-screen flex items-center justify-center p-0 sm:p-4 transition-opacity duration-700 ${
          hasStarted ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Masked Video Wrapper: CSS mask-image feathers the video perimeter smoothly into the background */}
        <div
          className="relative w-full h-full flex items-center justify-center overflow-hidden"
          style={{
            maskImage:
              'radial-gradient(ellipse 80% 75% at 50% 50%, black 45%, rgba(0,0,0,0.85) 65%, transparent 95%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 80% 75% at 50% 50%, black 45%, rgba(0,0,0,0.85) 65%, transparent 95%)',
          }}
        >
          <video
            ref={videoRef}
            muted={isMuted}
            playsInline
            preload="auto"
            onLoadedMetadata={handleLoadedMetadata}
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleVideoEnded}
            className="w-full h-full object-contain max-h-[95vh]"
          >
            {/* Full-fidelity official reveal video with original audio track */}
            <source
              src="/assets/aistudio/nirvaana_stays_logo_reveal_17df2817.webm"
              type="video/webm"
            />
            <source
              src="/assets/aistudio/nirvaana_stays_logo_reveal_muted.mp4"
              type="video/mp4"
            />
          </video>
        </div>

        {/* Soft edge gradient fades ensuring zero sharp video borders on any screen size */}
        <div className="absolute inset-x-0 top-0 h-24 sm:h-32 bg-gradient-to-b from-[#091A2E] via-[#091A2E]/80 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-24 sm:h-32 bg-gradient-to-t from-[#091A2E] via-[#091A2E]/80 to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 left-0 w-20 sm:w-32 bg-gradient-to-r from-[#091A2E] via-[#091A2E]/80 to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-20 sm:w-32 bg-gradient-to-l from-[#091A2E] via-[#091A2E]/80 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,#091A2E_92%)] pointer-events-none" />
      </div>

      {/* =====================================================================
          3. BOTTOM CONTROLS (Only shown after the video has started)
      ===================================================================== */}
      {hasStarted && (
        <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 z-10 flex items-center gap-2.5">
          {/* Sound Toggle Button */}
          <button
            onClick={toggleSound}
            type="button"
            aria-label={isMuted ? 'Turn sound on' : 'Mute sound'}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#0B213F]/75 hover:bg-[#0B213F] text-[#E5D9C4] border border-[#E5D9C4]/30 hover:border-[#E5D9C4]/60 backdrop-blur-md text-[11px] font-sans tracking-wider uppercase transition-all duration-300 shadow-lg cursor-pointer"
          >
            {isMuted ? (
              <>
                <VolumeX className="w-3.5 h-3.5 text-[#C87D65]" />
                <span>Sound Off</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[#C87D65] animate-pulse" />
                <span>Sound On</span>
              </>
            )}
          </button>

          {/* Skip Intro Button */}
          <button
            onClick={handleSkip}
            type="button"
            aria-label="Skip intro animation"
            className="px-4 py-1.5 rounded-full bg-[#0B213F]/60 hover:bg-[#0B213F]/90 text-[#E5D9C4]/80 hover:text-[#E5D9C4] border border-[#E5D9C4]/20 hover:border-[#E5D9C4]/50 backdrop-blur-md text-[11px] font-sans tracking-widest uppercase transition-all duration-300 shadow-lg cursor-pointer"
          >
            Skip Intro
          </button>
        </div>
      )}

      {/* Subtle brand attribution at bottom left */}
      <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 z-10 flex items-center gap-2 pointer-events-none opacity-60">
        <div className="w-1.5 h-1.5 rounded-full bg-[#C87D65] animate-pulse" />
        <span className="text-[10px] uppercase tracking-widest text-[#E5D9C4]/70 font-sans">
          NIRVAANA STAYS · Viman Nagar
        </span>
      </div>
    </div>
  );
};