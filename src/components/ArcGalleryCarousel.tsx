import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, Sparkles, MessageCircle, Calendar } from 'lucide-react';
import { getAssetUrl } from '../utils/asset-helper.ts';

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  features: string[];
  ctaLabel?: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'girls-room',
    category: 'GIRLS’ ACCOMMODATION',
    title: 'Navy Blue Bedding Bedroom',
    image: 'assets/girls-room.jpeg',
    description:
      'Spacious, naturally lit bedroom featuring signature navy blue bedding, dedicated wardrobe storage, whisper-quiet air conditioning, and ergonomic study workspace.',
    features: ['Navy Blue Linens', 'AC Equipped', 'Personal Wardrobe', 'Study Desk', 'Daily Housekeeping'],
    ctaLabel: 'Check Girls’ Room Availability',
  },
  {
    id: 'living',
    category: 'COMMUNAL SPACES',
    title: 'Open-Concept Living & Lounge',
    image: 'assets/living.jpeg',
    description:
      'Warm and inviting lounge with plush seating, wall-mounted entertainment screen, designer illumination, and curated dining area for socializing and relaxation.',
    features: ['Smart TV Lounge', 'Comfort Seating', 'Dining Area', 'High-Speed Wi-Fi', 'Airy Natural Light'],
    ctaLabel: 'Explore Living Spaces',
  },
  {
    id: 'kitchen-premium',
    category: 'GOURMET KITCHEN',
    title: 'Fully Equipped Modular Kitchen',
    image: 'assets/kitchen-premium.jpeg',
    description:
      'State-of-the-art kitchen complete with smooth-glide cutlery drawers, multi-burner gas hob, microwave, RO water purifier, and generous food prep counters.',
    features: ['Multi-Burner Hob', 'Microwave Oven', 'Cutlery & Utensils', 'RO Water System', 'Exhaust Chimney'],
    ctaLabel: 'See Kitchen Amenities',
  },
  {
    id: 'boys-room',
    category: 'BOYS’ ACCOMMODATION',
    title: 'Grey Bedding Executive Room',
    image: 'assets/boys-room.jpeg',
    description:
      'Contemporary bedroom designed with modern grey bedding, illuminated vanity mirror, study corner, ample storage, and high-speed fiber internet.',
    features: ['Grey Palette Bedding', 'Illuminated Mirror', 'Executive Study Desk', 'Split AC', 'Regular Linens'],
    ctaLabel: 'Check Boys’ Room Availability',
  },
  {
    id: 'amenities',
    category: 'RESIDENCE & LEISURE',
    title: 'Courtyard Swimming Pool & Society',
    image: 'assets/amenities.jpeg',
    description:
      'Resort-inspired residential community in Viman Nagar with landscaped grounds, sparkling swimming pool, fitness gym, jogging track, and 24/7 security.',
    features: ['Swimming Pool', 'Equipped Gymnasium', 'Gated Security', 'Jogging Track', 'Power Backup'],
    ctaLabel: 'Inquire About Society',
  },
  {
    id: 'bathroom',
    category: 'PRIVATE BATHROOMS',
    title: 'Pristine Designer Bathrooms',
    image: 'assets/bathroom.jpeg',
    description:
      'Spotless modern washrooms featuring glass shower partitions, high-pressure hot water geyser, wall-hung sanitary fittings, and premium porcelain tile finishes.',
    features: ['Glass Shower Partition', 'Hot Water Geyser', 'Wall-Hung Commode', 'Premium Tilework', 'Daily Sanitization'],
    ctaLabel: 'View Bathroom Specs',
  },
  {
    id: 'kitchen-wide',
    category: 'MEAL PREPARATION',
    title: 'Spacious Kitchen & Double Fridge',
    image: 'assets/kitchen-wide.jpeg',
    description:
      'Generous open-layout kitchen featuring ample refrigerator storage, modern marble backsplash, and seamless cabinetry for all residents.',
    features: ['Double-Door Fridge', 'Dedicated Cabinets', 'Clean Water Dispenser', 'Induction & Gas', 'Prep Island'],
    ctaLabel: 'Explore Kitchen Setup',
  },
  {
    id: 'hero-room',
    category: 'MASTER SUITE',
    title: 'Executive Master Bedroom',
    image: 'assets/hero-room.jpeg',
    description:
      'Generously proportioned bedroom with ceiling-height wardrobes, floor-to-ceiling drapery, full-length dressing mirror, and tranquil ambient illumination.',
    features: ['Full Wardrobes', 'Vanity & Mirror', 'Study Setup', 'Curated Lighting', 'Attached Balcony Available'],
    ctaLabel: 'Check Master Bedroom',
  },
];

interface ArcGalleryCarouselProps {
  onOpenLightbox?: (imageSrc: string, title: string) => void;
  onBookVisit?: () => void;
}

export const ArcGalleryCarousel: React.FC<ArcGalleryCarouselProps> = React.memo(({
  onOpenLightbox,
  onBookVisit,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [themeMode, setThemeMode] = useState<'espresso' | 'ivory'>('espresso');
  const [isAnimating, setIsAnimating] = useState(false);

  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const total = GALLERY_ITEMS.length;

  const nextSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev + 1) % total);
    setTimeout(() => setIsAnimating(false), 380);
  }, [isAnimating, total]);

  const prevSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev - 1 + total) % total);
    setTimeout(() => setIsAnimating(false), 380);
  }, [isAnimating, total]);

  const goToSlide = (index: number) => {
    if (isAnimating || index === activeIndex) return;
    setIsAnimating(true);
    setActiveIndex(index);
    setTimeout(() => setIsAnimating(false), 380);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (diff > 40) nextSlide();
    else if (diff < -40) prevSlide();
    setTouchStartX(null);
  };

  const currentItem = GALLERY_ITEMS[activeIndex];

  // Calculate arc geometry for each item relative to activeIndex
  const getCardStyle = (index: number) => {
    let offset = index - activeIndex;
    if (offset > total / 2) offset -= total;
    if (offset < -total / 2) offset += total;

    const isMobile = windowWidth < 640;
    const isTablet = windowWidth < 1024;

    const maxVisibleOffset = isMobile ? 2 : 3.5;
    const isVisible = Math.abs(offset) <= maxVisibleOffset;

    const angleStep = isMobile ? 24 : isTablet ? 26 : 28;
    const angleDeg = offset * angleStep;
    const angleRad = (angleDeg * Math.PI) / 180;

    const radiusX = isMobile ? 180 : isTablet ? 320 : 460;
    const radiusY = isMobile ? 65 : isTablet ? 115 : 160;

    const x = Math.sin(angleRad) * radiusX;
    const y = (1 - Math.cos(angleRad)) * radiusY;
    const rotation = angleDeg * 0.75;
    const distance = Math.abs(offset);
    const scale = Math.max(isMobile ? 0.72 : 0.68, (isMobile ? 1.08 : 1.15) - distance * 0.14);
    const opacity = isVisible ? Math.max(0.15, 1 - distance * (isMobile ? 0.35 : 0.22)) : 0;
    const zIndex = Math.round(50 - distance * 10);

    return {
      x,
      y,
      rotation,
      scale,
      opacity,
      zIndex,
      isVisible,
      isActive: offset === 0,
    };
  };

  const isDark = themeMode === 'espresso';

  return (
    <div
      className={`relative w-full rounded-3xl md:rounded-[36px] overflow-hidden transition-colors duration-500 border ${
        isDark
          ? 'bg-[#1E1917] border-[#382E2A] text-[#FAF7F2] shadow-2xl'
          : 'bg-[#F3EFE6] border-[#E6E0D6] text-[#2C2623] shadow-lg'
      }`}
    >
      {/* Subtle Background Glow & Texture */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className={`absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] h-[380px] rounded-full blur-3xl opacity-20 ${
            isDark ? 'bg-[#C87D65]' : 'bg-[#C9A45B]'
          }`}
        />
        <div
          className={`absolute -bottom-40 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-3xl opacity-15 ${
            isDark ? 'bg-[#7A8B7B]' : 'bg-[#C87D65]'
          }`}
        />
      </div>

      {/* Top Bar: Counter & Theme Switch */}
      <div className="relative z-20 flex items-center justify-between px-6 sm:px-10 pt-6 sm:pt-8">
        <div className="flex items-center gap-2.5">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase border ${
              isDark
                ? 'bg-[#2C2623] border-[#443833] text-[#C9A45B]'
                : 'bg-[#FFFDF9] border-[#E6E0D6] text-[#7A8B7B]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C87D65]" />
            Curated Spaces · 0{activeIndex + 1} / 0{total}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Theme Switcher */}
          <button
            onClick={() => setThemeMode(isDark ? 'ivory' : 'espresso')}
            title="Toggle gallery theme"
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all border ${
              isDark
                ? 'bg-[#2C2623] border-[#443833] text-[#FAF7F2] hover:bg-[#382E2A]'
                : 'bg-[#FFFDF9] border-[#E6E0D6] text-[#2C2623] hover:bg-white'
            }`}
          >
            {isDark ? '🌙 Night Theme' : '☀️ Sunlit Theme'}
          </button>
        </div>
      </div>

      {/* Main Interactive Arc Stage */}
      <div className="relative z-10 pt-4 pb-2 sm:pt-6 overflow-hidden">
        {/* Arc Track Container (Desktop, Tablet & Mobile with Touch) */}
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative w-full h-[320px] sm:h-[380px] md:h-[430px] flex items-center justify-center select-none"
        >
          {GALLERY_ITEMS.map((item, idx) => {
            const style = getCardStyle(idx);
            if (!style.isVisible) return null;

            return (
              <div
                key={item.id}
                onClick={() => goToSlide(idx)}
                style={{
                  transform: `translate3d(${style.x}px, ${style.y}px, 0) rotate(${style.rotation}deg) scale(${style.scale})`,
                  opacity: style.opacity,
                  zIndex: style.zIndex,
                  transition: 'transform 480ms cubic-bezier(0.22, 1, 0.36, 1), opacity 400ms ease',
                }}
                className={`absolute top-6 sm:top-8 w-36 h-48 sm:w-48 sm:h-64 md:w-56 md:h-72 rounded-2xl md:rounded-3xl cursor-pointer overflow-hidden group transition-all duration-300 ${
                  style.isActive
                    ? isDark
                      ? 'ring-4 ring-[#C87D65] shadow-[0_20px_45px_rgba(0,0,0,0.7)]'
                      : 'ring-4 ring-[#C87D65] shadow-[0_20px_40px_rgba(44,38,35,0.22)]'
                    : 'shadow-lg hover:brightness-105'
                }`}
              >
                {/* Photo */}
                <img
                  src={getAssetUrl(item.image)}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Card Gradient Overlay */}
                <div
                  className={`absolute inset-0 transition-opacity duration-300 ${
                    style.isActive
                      ? 'bg-gradient-to-t from-black/75 via-black/10 to-transparent'
                      : 'bg-black/35 group-hover:bg-black/15'
                  }`}
                />

                {/* Card Bottom Pill on Active */}
                {style.isActive && (
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                    <span className="text-[11px] sm:text-xs font-semibold px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md truncate max-w-[80%]">
                      {item.title}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onOpenLightbox) onOpenLightbox(getAssetUrl(item.image), item.title);
                      }}
                      title="Enlarge Photo"
                      className="p-1.5 rounded-full bg-white/25 hover:bg-white/40 backdrop-blur-md transition-colors"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            );
          })}

          {/* Left Arrow Button */}
          <button
            onClick={prevSlide}
            aria-label="Previous room photo"
            className={`absolute left-3 sm:left-6 md:left-12 top-1/2 -translate-y-1/2 z-40 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-md shadow-xl group ${
              isDark
                ? 'bg-[#2C2623]/85 text-[#FAF7F2] border border-[#443833] hover:bg-[#C87D65] hover:text-white hover:border-[#C87D65]'
                : 'bg-[#FFFDF9]/90 text-[#2C2623] border border-[#E6E0D6] hover:bg-[#C87D65] hover:text-white hover:border-[#C87D65]'
            }`}
          >
            <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 transition-transform group-hover:-translate-x-0.5" />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={nextSlide}
            aria-label="Next room photo"
            className={`absolute right-3 sm:right-6 md:right-12 top-1/2 -translate-y-1/2 z-40 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-md shadow-xl group ${
              isDark
                ? 'bg-[#2C2623]/85 text-[#FAF7F2] border border-[#443833] hover:bg-[#C87D65] hover:text-white hover:border-[#C87D65]'
                : 'bg-[#FFFDF9]/90 text-[#2C2623] border border-[#E6E0D6] hover:bg-[#C87D65] hover:text-white hover:border-[#C87D65]'
            }`}
          >
            <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

        {/* Central Text Placeholder & Room Details (Directly under the arc, like Gather) */}
        <div className="relative z-30 max-w-3xl mx-auto px-6 sm:px-10 text-center space-y-4 pt-4 sm:pt-6 pb-8 sm:pb-12">
          {/* Eyebrow */}
          <div className="inline-block">
            <span
              className={`text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full ${
                isDark ? 'bg-[#2C2623] text-[#C9A45B]' : 'bg-[#FFFDF9] text-[#7A8B7B] border border-[#E6E0D6]'
              }`}
            >
              {currentItem.category}
            </span>
          </div>

          {/* Headline */}
          <h3
            key={`title-${currentItem.id}`}
            className="font-editorial text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight animate-fade-in"
          >
            {currentItem.title}
          </h3>

          {/* Description / Text Placeholder */}
          <p
            key={`desc-${currentItem.id}`}
            className={`text-sm sm:text-base leading-relaxed max-w-2xl mx-auto animate-fade-in ${
              isDark ? 'text-[#D5CEC7]' : 'text-[#6E655F]'
            }`}
          >
            {currentItem.description}
          </p>

          {/* Feature Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1 pb-2">
            {currentItem.features.map((feat) => (
              <span
                key={feat}
                className={`text-xs font-medium px-3 py-1 rounded-full border transition-colors ${
                  isDark
                    ? 'bg-[#25201E] border-[#3D332F] text-[#FAF7F2]'
                    : 'bg-[#FFFDF9] border-[#E6E0D6] text-[#2C2623]'
                }`}
              >
                {feat}
              </span>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={onBookVisit}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#C87D65] hover:bg-[#B56A52] text-white text-xs sm:text-sm font-semibold tracking-wide shadow-md hover:shadow-lg transition-all"
            >
              <Calendar className="w-4 h-4" />
              <span>Book a Visit to View</span>
            </button>

            <button
              onClick={() => {
                if (onOpenLightbox) {
                  onOpenLightbox(getAssetUrl(currentItem.image), currentItem.title);
                }
              }}
              className={`inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs sm:text-sm font-semibold transition-all border ${
                isDark
                  ? 'bg-[#2C2623] border-[#443833] text-[#FAF7F2] hover:bg-[#382E2A]'
                  : 'bg-[#FFFDF9] border-[#E6E0D6] text-[#2C2623] hover:bg-white'
              }`}
            >
              <Maximize2 className="w-4 h-4 text-[#C87D65]" />
              <span>View Full Photo</span>
            </button>

            <a
              href={`https://wa.me/919096166306?text=Hi%20NIRVAANA%20Stays%2C%20I%20am%20interested%20in%20the%20${encodeURIComponent(
                currentItem.title
              )}.`}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs sm:text-sm font-semibold transition-all border ${
                isDark
                  ? 'bg-[#2C2623] border-[#443833] text-[#7A8B7B] hover:text-white'
                  : 'bg-[#FFFDF9] border-[#E6E0D6] text-[#7A8B7B] hover:text-[#2C2623]'
              }`}
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Inquiry</span>
            </a>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-2 pt-4">
            {GALLERY_ITEMS.map((_, dotIdx) => (
              <button
                key={dotIdx}
                onClick={() => goToSlide(dotIdx)}
                aria-label={`Go to room photo ${dotIdx + 1}`}
                className={`transition-all duration-300 rounded-full ${
                  dotIdx === activeIndex
                    ? 'w-8 h-2.5 bg-[#C87D65]'
                    : isDark
                    ? 'w-2.5 h-2.5 bg-[#443833] hover:bg-[#6E655F]'
                    : 'w-2.5 h-2.5 bg-[#D6CEC4] hover:bg-[#A89F95]'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

ArcGalleryCarousel.displayName = 'ArcGalleryCarousel';
