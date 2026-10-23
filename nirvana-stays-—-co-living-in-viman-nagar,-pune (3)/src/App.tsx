import React, { useState, useEffect } from 'react';
import { Header } from './components/Header.tsx';
import { Footer } from './components/Footer.tsx';
import { FloatingActions } from './components/FloatingActions.tsx';
import { NirvanaCursorTrail } from './components/NirvanaCursorTrail.tsx';
import { SinglePageView } from './views/SinglePageView.tsx';
import { X } from 'lucide-react';

export default function App() {
  // Lightbox Modal state
  const [lightboxData, setLightboxData] = useState<{ src: string; alt: string } | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Google Maps Platform Demo Key Quota Defense
  const [isQuotaExceeded, setIsQuotaExceeded] = useState(false);

  useEffect(() => {
    const handleQuotaExceeded = () => {
      setIsQuotaExceeded(true);
    };
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
    <div className="min-h-screen bg-[#FAF7F2] text-[#2C2623] font-sans antialiased selection:bg-[#F3EFE6] selection:text-[#C87D65] relative">
      {/* NIRVANA Themed Orange Cursor & Radiant Light Trail */}
      <NirvanaCursorTrail />

      {/* Google Maps Platform Demo Quota Notification Bar */}
      {isQuotaExceeded && (
        <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2.5 text-xs text-center sticky top-0 z-50 shadow-sm">
          <span>
            Google Maps temporary quota limit reached. To configure a dedicated API key for high-volume visits, visit the{' '}
            <a
              href="https://developers.google.com/maps/documentation/javascript/get-api-key"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-semibold text-amber-950 hover:text-amber-800"
            >
              Google Maps Platform Console
            </a>
            .
          </span>
        </div>
      )}

      {/* Sticky Translucent Warm Header */}
      <Header
        onBookVisitClick={() => {
          const el = document.getElementById('contact');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Main Single-Page Website with 12 Minimal Sections */}
      <main>
        <SinglePageView onOpenLightbox={handleOpenLightbox} />
      </main>

      {/* Brand Footer */}
      <Footer />

      {/* Floating Action Strip (WhatsApp + Phone) */}
      <FloatingActions />

      {/* Lightbox Modal for Gallery */}
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
              <p className="text-xs text-[#FAF7F2]/75 mt-0.5">NIRVANA Stays · Viman Nagar, Pune</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
