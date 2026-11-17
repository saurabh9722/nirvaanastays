/**
 * Root Application Shell — NIRVAANA Stays (`src/App.tsx`)
 *
 * Architecture Overview:
 * 1. `ThemeProvider` (`src/context/ThemeContext.tsx`) — Manages Light/Dark mode state & `<html class="dark">`.
 * 2. `WebsiteLoader` (`src/components/WebsiteLoader.tsx`) — Fullscreen intro video experience; dissolves 3s before video ends.
 * 3. `NirvanaWatermark` (`src/components/NirvanaWatermark.tsx`) — Fixed background brand emblem (stops above footer).
 * 4. `NirvanaCursorTrail` (`src/components/NirvanaCursorTrail.tsx`) — Desktop ambient terracotta cursor glow.
 * 5. `Header` (`src/components/Header.tsx`) — Sticky navigation bar with section smooth-scroll and theme switcher.
 * 6. `SinglePageView` (`src/views/SinglePageView.tsx`) — All 12 core sections of the single-page website.
 * 7. `Footer` (`src/components/Footer.tsx`) — Brand details, quick links, addresses, and "Replay Logo Reveal" trigger.
 * 8. `FloatingActions` (`src/components/FloatingActions.tsx`) — Bottom-right Call & WhatsApp floating buttons.
 * 9. `BookingPopupModal` (`src/components/BookingPopupModal.tsx`) — Auto-opens 5s after the intro loader completes.
 * 10. Lightbox Viewer — Fullscreen modal for inspecting gallery photos from `ArcGalleryCarousel`.
 */
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header.tsx';
import { Footer } from './components/Footer.tsx';
import { FloatingActions } from './components/FloatingActions.tsx';
import { NirvanaCursorTrail } from './components/NirvanaCursorTrail.tsx';
import { BookingPopupModal } from './components/BookingPopupModal.tsx';
import { NirvanaWatermark } from './components/NirvanaWatermark.tsx';
import { SinglePageView } from './views/SinglePageView.tsx';
import { ThemeProvider } from './context/ThemeContext.tsx';
import { WebsiteLoader } from './components/WebsiteLoader.tsx';
import { X } from 'lucide-react';

function AppContent() {
  // Intro Loader & Post-Intro Popup synchronization
  const [showLoader, setShowLoader] = useState(true);
  const [isIntroComplete, setIsIntroComplete] = useState(false);

  // Fullscreen Image Lightbox state (triggered from ArcGalleryCarousel in SinglePageView)
  const [lightboxData, setLightboxData] = useState<{ src: string; alt: string } | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Listen for `replay-intro` custom event dispatched by the Footer button
  useEffect(() => {
    const handleReplay = () => {
      setIsIntroComplete(false);
      setShowLoader(true);
    };
    window.addEventListener('replay-intro', handleReplay);
    return () => window.removeEventListener('replay-intro', handleReplay);
  }, []);

  // Google Maps Platform Quota Fallback Notification state (triggered by `src/main.tsx`)
  const [isQuotaExceeded, setIsQuotaExceeded] = useState(false);

  useEffect(() => {
    const handleQuotaExceeded = () => setIsQuotaExceeded(true);
    window.addEventListener('gmp-quota-exceeded', handleQuotaExceeded);
    return () => window.removeEventListener('gmp-quota-exceeded', handleQuotaExceeded);
  }, []);

  const handleOpenLightbox = (src: string, alt: string) => {
    setLightboxData({ src, alt });
    setIsLightboxOpen(true);
  };

  const handleCloseLightbox = () => {
    setIsLightboxOpen(false);
    setLightboxData(null);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] dark:bg-[#0B213F] text-[#0B213F] dark:text-[#E5D9C4] font-sans antialiased selection:bg-[#C87D65]/20 selection:text-[#C87D65] relative transition-colors duration-300">
      {/* 1. Brand Intro Reveal Video Loader (Dissolves 3s before video ends) */}
      {showLoader && (
        <WebsiteLoader
          leadTimeSeconds={3.0}
          onComplete={() => {
            setShowLoader(false);
            setIsIntroComplete(true);
          }}
        />
      )}

      {/* 2. Fixed Background Logo Watermark */}
      <NirvanaWatermark />

      {/* 3. Desktop Ambient Terracotta Cursor Light */}
      <NirvanaCursorTrail />

      {/* 4. Google Maps Quota Fallback Notice (only shown if Maps API quota is exceeded) */}
      {isQuotaExceeded && (
        <div className="bg-amber-50 dark:bg-amber-950/60 border-b border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 px-4 py-2.5 text-xs text-center sticky top-0 z-50 shadow-sm">
          <span>
            Google Maps temporary quota limit reached. To configure a dedicated API key for high-volume visits, visit the{' '}
            <a
              href="https://developers.google.com/maps/documentation/javascript/get-api-key"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-semibold text-amber-950 dark:text-amber-100 hover:text-amber-800"
            >
              Google Maps Platform Console
            </a>
            .
          </span>
        </div>
      )}

      {/* 5. Sticky Header with Smooth-Scroll Nav & Light/Dark Theme Toggle */}
      <Header />

      {/* 6. Main Single-Page Content (12 Sections + Scroll Journey Wave) */}
      <main>
        <SinglePageView onOpenLightbox={handleOpenLightbox} />
      </main>

      {/* 7. Brand Footer */}
      <Footer />

      {/* 8. Floating Quick-Action Strip (Call + WhatsApp) */}
      <FloatingActions />

      {/* 9. Timed 5-Second Visit Inquiry Modal (starts counting only after intro loader finishes) */}
      {isIntroComplete && <BookingPopupModal delayMs={5000} />}

      {/* 10. Fullscreen Gallery Lightbox Modal */}
      {isLightboxOpen && lightboxData && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md transition-opacity"
          onClick={handleCloseLightbox}
        >
          <button
            onClick={handleCloseLightbox}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close image viewer"
          >
            <X className="w-6 h-6" />
          </button>

          <div
            className="max-w-5xl w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full max-h-[80vh] rounded-3xl overflow-hidden border border-white/15 bg-black/40 shadow-2xl">
              <img
                src={lightboxData.src}
                alt={lightboxData.alt}
                className="w-full h-full max-h-[80vh] object-contain mx-auto"
              />
            </div>
            <div className="mt-4 text-center">
              <h3 className="font-editorial text-xl text-white font-semibold">{lightboxData.alt}</h3>
              <p className="text-xs text-[#E5D9C4]/75 mt-0.5">NIRVAANA Stays · Viman Nagar, Pune</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
