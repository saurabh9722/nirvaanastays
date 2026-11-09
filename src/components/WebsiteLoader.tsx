import React, { useState, useEffect, useRef } from 'react';
import { shouldStartDissolve } from '../utils/loader-logic.ts';
import { Volume2, VolumeX, Loader2 } from 'lucide-react';

interface WebsiteLoaderProps {
  onComplete: () => void;
  leadTimeSeconds?: number;
}

export const WebsiteLoader: React.FC<WebsiteLoaderProps> = ({
  onComplete,
  leadTimeSeconds = 3.0,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(10.0);
  const [isDissolving, setIsDissolving] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const hasTriggeredCompleteRef = useRef<boolean>(false);

  const handleFinish = () => {
    if (hasTriggeredCompleteRef.current) return;
    hasTriggeredCompleteRef.current = true;
    setIsDissolving(true);
    setIsFinished(true);
    if (videoRef.current) {
      videoRef.current.pause();
    }
    onComplete();
  };

  useEffect(() => {
    const readyFallback = setTimeout(() => setIsReady(true), 2000);
    return () => clearTimeout(readyFallback);
  }, []);

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
          if (videoRef.current) {
            videoRef.current.muted = true;
            setIsMuted(true);
            videoRef.current.play().catch(() => {});
          }
        });
      }
    }
  };

  const handleSkip = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    handleFinish();
  };

  const toggleSound = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!videoRef.current) return;
    const nextMuted = !videoRef.current.muted;
    videoRef.current.muted = nextMuted;
    videoRef.current.volume = 1.0;
    setIsMuted(nextMuted);
  };

  useEffect(() => {
    if (!isDissolving && !isFinished) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [isDissolving, isFinished]);

  const handleLoadedMetadata = () => {
    if (
      videoRef.current &&
      Number.isFinite(videoRef.current.duration) &&
      videoRef.current.duration > 0
    ) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current || !hasStarted || isDissolving) return;
    const current = videoRef.current.currentTime;
    const dur = duration || videoRef.current.duration || 10.0;

    if (shouldStartDissolve(current, dur, leadTimeSeconds)) {
      setIsDissolving(true);
    }
  };

  const handleVideoEnded = () => {
    handleFinish();
  };

  useEffect(() => {
    if (!hasStarted) return;

    const safetyMs = (duration + 1.5) * 1000;
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
      className={`fixed inset-0 z-[9999] w-screen h-screen overflow-hidden bg-[#091A2E] select-none transition-opacity ease-out transform-gpu ${
        isDissolving ? 'pointer-events-none' : 'pointer-events-auto'
      }`}
      style={{
        opacity: isDissolving ? 0 : 1,
        transitionDuration: `${leadTimeSeconds * 1000}ms`,
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
        transform: 'translate3d(0, 0, 0)',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        willChange: 'opacity',
        contain: 'strict',
      }}
    >
      <div
        className="absolute inset-0 bg-radial from-[#0e2746]/50 via-[#091A2E]/90 to-[#091A2E] pointer-events-none transform-gpu"
        style={{ transform: 'translate3d(0, 0, 0)' }}
      />

      {!hasStarted && (
        <div
          className="absolute inset-0 z-20 w-full h-full flex flex-col items-center justify-center px-6 text-center transform-gpu"
          style={{
            transform: 'translate3d(0, 0, 0)',
            backfaceVisibility: 'hidden',
          }}
        >
          <div className="flex items-center justify-center gap-3 mb-6 opacity-90">
            <span className="w-2 h-2 rounded-full bg-[#C87D65] animate-pulse" />
            <span className="text-xs sm:text-sm md:text-base uppercase tracking-[0.35em] text-[#E5D9C4]/90 font-sans">
              Viman Nagar · Pune
            </span>
            <span className="w-2 h-2 rounded-full bg-[#C87D65] animate-pulse" />
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif tracking-[0.22em] uppercase text-[#E5D9C4] mb-4 drop-shadow-md">
            Nirvaana Stays
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-[#E5D9C4]/70 tracking-[0.25em] uppercase font-sans mb-12 max-w-xl">
            Luxury Co-Living & Curated Comfort
          </p>

          <button
            onClick={handleEnterExperience}
            disabled={!isReady}
            type="button"
            aria-label="Enter experience with sound"
            className="group relative flex items-center justify-center gap-4 px-10 py-4 sm:px-14 sm:py-5 rounded-full bg-[#0B213F] hover:bg-[#C87D65] text-[#E5D9C4] hover:text-[#091A2E] border-2 border-[#C87D65]/60 hover:border-[#C87D65] text-sm sm:text-base md:text-lg font-sans font-semibold tracking-[0.25em] uppercase transition-all duration-300 shadow-[0_0_40px_rgba(200,125,101,0.25)] hover:shadow-[0_0_60px_rgba(200,125,101,0.5)] hover:scale-105 active:scale-95 cursor-pointer disabled:opacity-60 transform-gpu"
            style={{
              transform: 'translate3d(0, 0, 0)',
              willChange: 'transform, background-color',
            }}
          >
            {isReady ? (
              <>
                <Volume2 className="w-5 h-5 sm:w-6 sm:h-6 text-[#C87D65] group-hover:text-[#091A2E] transition-colors duration-300 animate-pulse" />
                <span>Enter Experience</span>
              </>
            ) : (
              <>
                <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 text-[#C87D65] animate-spin" />
                <span>Preparing...</span>
              </>
            )}
          </button>

          <button
            onClick={handleSkip}
            type="button"
            className="mt-8 text-xs sm:text-sm uppercase tracking-[0.25em] text-[#E5D9C4]/50 hover:text-[#E5D9C4] font-sans transition-colors duration-200 cursor-pointer"
          >
            Skip Intro
          </button>
        </div>
      )}

      <div
        className={`absolute inset-0 z-10 w-full h-full flex items-center justify-center transition-opacity duration-500 transform-gpu ${
          hasStarted ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        style={{
          transform: 'translate3d(0, 0, 0)',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          willChange: 'opacity',
        }}
      >
        <div className="relative w-full h-full max-w-6xl max-h-screen flex items-center justify-center overflow-hidden p-0 sm:p-4">
          <video
            ref={videoRef}
            muted={isMuted}
            playsInline
            preload="auto"
            onLoadedMetadata={handleLoadedMetadata}
            onCanPlayThrough={() => setIsReady(true)}
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleVideoEnded}
            className="w-full h-full object-contain max-h-[95vh] transform-gpu"
            style={{
              transform: 'translate3d(0, 0, 0)',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              willChange: 'transform',
            }}
          >
            <source
              src="/assets/aistudio/nirvaana_stays_logo_reveal_17df2817.mp4"
              type="video/mp4"
            />
            <source
              src="/assets/aistudio/nirvaana_stays_logo_reveal_muted.mp4"
              type="video/mp4"
            />
          </video>

          <div
            className="absolute inset-x-0 top-0 h-24 sm:h-32 bg-gradient-to-b from-[#091A2E] via-[#091A2E]/80 to-transparent pointer-events-none transform-gpu"
            style={{ transform: 'translate3d(0, 0, 0)' }}
          />
          <div
            className="absolute inset-x-0 bottom-0 h-24 sm:h-32 bg-gradient-to-t from-[#091A2E] via-[#091A2E]/80 to-transparent pointer-events-none transform-gpu"
            style={{ transform: 'translate3d(0, 0, 0)' }}
          />
          <div
            className="absolute inset-y-0 left-0 w-20 sm:w-32 bg-gradient-to-r from-[#091A2E] via-[#091A2E]/80 to-transparent pointer-events-none transform-gpu"
            style={{ transform: 'translate3d(0, 0, 0)' }}
          />
          <div
            className="absolute inset-y-0 right-0 w-20 sm:w-32 bg-gradient-to-l from-[#091A2E] via-[#091A2E]/80 to-transparent pointer-events-none transform-gpu"
            style={{ transform: 'translate3d(0, 0, 0)' }}
          />
        </div>
      </div>

      {hasStarted ? (
        <div
          className="absolute inset-x-0 bottom-6 sm:bottom-8 z-30 flex items-center justify-center gap-3 px-6 transform-gpu"
          style={{ transform: 'translate3d(0, 0, 0)' }}
        >
          <button
            onClick={toggleSound}
            type="button"
            aria-label={isMuted ? 'Turn sound on' : 'Mute sound'}
            className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#0B213F]/90 hover:bg-[#0B213F] text-[#E5D9C4] border border-[#E5D9C4]/30 hover:border-[#E5D9C4]/60 text-xs font-sans tracking-wider uppercase transition-colors duration-200 shadow-lg cursor-pointer"
          >
            {isMuted ? (
              <>
                <VolumeX className="w-4 h-4 text-[#C87D65]" />
                <span>Sound Off</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-[#C87D65]" />
                <span>Sound On</span>
              </>
            )}
          </button>

          <button
            onClick={handleSkip}
            type="button"
            aria-label="Skip intro animation"
            className="px-5 py-2 rounded-full bg-[#0B213F]/80 hover:bg-[#0B213F] text-[#E5D9C4]/80 hover:text-[#E5D9C4] border border-[#E5D9C4]/20 hover:border-[#E5D9C4]/50 text-xs font-sans tracking-widest uppercase transition-colors duration-200 shadow-lg cursor-pointer"
          >
            Skip Intro
          </button>
        </div>
      ) : (
        <div
          className="absolute inset-x-0 bottom-6 sm:bottom-8 z-20 flex items-center justify-center gap-2 pointer-events-none opacity-60 transform-gpu"
          style={{ transform: 'translate3d(0, 0, 0)' }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-[#C87D65]" />
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#E5D9C4]/80 font-sans">
            NIRVAANA STAYS · Viman Nagar
          </span>
          <div className="w-1.5 h-1.5 rounded-full bg-[#C87D65]" />
        </div>
      )}
    </div>
  );
};