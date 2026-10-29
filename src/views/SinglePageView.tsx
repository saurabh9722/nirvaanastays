import React from 'react';
import {
  Sparkles,
  ArrowRight,
  MessageCircle,
  MapPin,
  CheckCircle2,
  Clock,
  Phone,
  Gift,
  Award,
} from 'lucide-react';
import { getAssetUrl } from '../utils/asset-helper.ts';
import { PerspectiveCard } from '../components/PerspectiveCard.tsx';
import { NirvanaLocationMap } from '../components/NirvanaLocationMap.tsx';
import { ArcGalleryCarousel } from '../components/ArcGalleryCarousel.tsx';
import { BookingVisitForm } from '../components/BookingVisitForm.tsx';
import { NirvaanaScrollJourney } from '../components/NirvaanaScrollJourney.tsx';
import { ROOM_TIERS } from '../data/roomTiers.ts';

const NIRVAANA_STATIC_CENTER = { lat: 18.5758, lng: 73.9073 };

interface SinglePageAppProps {
  onOpenLightbox: (src: string, alt: string) => void;
}

export const SinglePageView: React.FC<SinglePageAppProps> = ({ onOpenLightbox }) => {
  const handleWhatsAppDirect = (customText?: string) => {
    const text = encodeURIComponent(
      customText || 'Hi NIRVAANA Stays, I would like to inquire about co-living rooms in Viman Nagar, Pune.'
    );
    window.open(`https://wa.me/919096166306?text=${text}`, '_blank');
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToRooms = () => {
    const el = document.getElementById('rooms');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // 12 Amenities items as specified
  const amenitiesList = [
    { name: 'Air Conditioning', icon: '❄️' },
    { name: 'High-Speed Wi-Fi', icon: '📶' },
    { name: 'Housekeeping', icon: '🧹' },
    { name: 'Fully Furnished Rooms', icon: '🛋️' },
    { name: 'Chef Ready Kitchen', icon: '🍳' },
    { name: 'Refrigerator', icon: '🧊' },
    { name: 'Zero Brokerage', icon: '🤝' },
    { name: 'Premium Interiors', icon: '✨' },
    { name: 'Gym', icon: '🏋️' },
    { name: 'Swimming Pool', icon: '🏊' },
    { name: 'Flexible Plans', icon: '📅' },
    { name: '24x7 Security', icon: '🛡️' },
  ];

  // 5 Why NIRVAANA points
  const whyNirvanaPoints = [
    {
      num: '01',
      title: 'Premium Living',
      desc: 'Thoughtfully furnished spaces for everyday comfort.',
    },
    {
      num: '02',
      title: 'Prime Location',
      desc: 'Minutes from Symbiosis, Pune Airport & IT hubs.',
    },
    {
      num: '03',
      title: 'Hassle-Free',
      desc: 'Move-in ready with zero setup stress.',
    },
    {
      num: '04',
      title: 'Professionally Managed',
      desc: 'Clean, organized, and responsive care.',
    },
    {
      num: '05',
      title: 'Safe & Comfortable',
      desc: 'Designed around privacy and peace of mind.',
    },
  ];

  // 10 Comprehensive Local SEO & Resident FAQ items
  const faqs = [
    {
      q: 'Where is Nirvaana Stays located in Viman Nagar, Pune?',
      a: 'Nirvaana Stays is centrally located at First floor, Shubh Gateway, Shop number 116, society, opp. to Symbiosis Law School, Survey Number 235, Mhada Colony, Viman Nagar, Pune, Maharashtra 411032. Our second premier property in the cluster is Shubh Nirvaana (opposite 10Biz Park).',
    },
    {
      q: 'Is Nirvaana Stays walking distance from Symbiosis Law School (SLS) and other SIU institutes?',
      a: 'Yes! Nirvaana Stays at Shubh Gateway is directly opposite Symbiosis Law School (SLS) — under a 2-minute walk. It is also within 3–7 minutes of SCMS (Symbiosis Centre for Management Studies), SID (Design), SCMC (Media & Communication), SSLA (Liberal Arts), and Christ College Pune.',
    },
    {
      q: 'Is Nirvaana Stays convenient for professionals in Kharadi (EON Free Zone & WTC)?',
      a: 'Absolutely. Nirvaana Stays is just 10–15 minutes from the Kharadi IT Corridor via Nagar Road and Kharadi South Main Road. Tech professionals at EON Free Zone (Phase 1 & 2), World Trade Center (WTC) Pune, Gera Commerzone, Barclays, UBS, Citi Corp, and Zensar enjoy a quick commute while staying in Pune’s best student and social hub.',
    },
    {
      q: 'How accessible are Kalyani Nagar, Cerebrum IT Park, and Pune Metro?',
      a: 'Kalyani Nagar is only 5–8 minutes away. Cerebrum IT Park, Marisoft, Cybage Software, and HSBC are easily accessible. The Ramwadi Metro Station and Kalyani Nagar Metro Station are under 6 minutes away, connecting you rapidly across the Pune Metro network.',
    },
    {
      q: 'What is included in the monthly rent at Nirvaana Stays?',
      a: 'Your monthly rent covers a fully furnished air-conditioned (AC) room with study desk, high-speed fiber Wi-Fi, electricity allowance, daily professional housekeeping, fully equipped chef-grade kitchen with induction, microwave, refrigerator, and RO water, plus access to society gym, swimming pool, and sports facilities.',
    },
    {
      q: 'Is there any brokerage fee or hidden onboarding charge?',
      a: 'No. Nirvaana Stays operates on a strict Zero Brokerage policy. You deal directly with our verified management team (NIRVAANA Urban Nest Pvt. Ltd.). There are zero broker commissions, zero onboarding fees, and transparent 1-month security deposits.',
    },
    {
      q: 'Are there separate, dedicated accommodations for girls and boys?',
      a: 'Yes. We provide dedicated, separate properties and wings for Girls’ Accommodation (Navy blue bedding rooms) and Boys’ Accommodation (Grey bedding rooms), plus unisex co-living options with complete privacy, biometric entry, and round-the-clock CCTV.',
    },
    {
      q: 'How does food, dining, and the communal kitchen work?',
      a: 'Every flat features a spotless, fully loaded modern kitchen where you can cook freely. In addition, residents can subscribe to our verified home-style tiffin meal partner (fresh breakfast, lunch, and dinner) at subsidized resident rates.',
    },
    {
      q: 'What safety, security, and accessibility standards are provided?',
      a: 'We provide round-the-clock security with 24/7 CCTV in common areas, biometric facial/fingerprint turnstiles, smart keyless suite locks, and on-site resident managers. Nirvaana Stays is also proudly wheelchair accessible and LGBTQ+ friendly.',
    },
    {
      q: 'What is the deposit and lock-in period, and how do I book?',
      a: 'We offer straightforward, transparent terms with reasonable security deposits. SPECIAL 12-MONTH BONUS: Pay for 11 months and stay for 12! Schedule an in-person or virtual walkthrough via our website or message our concierge on WhatsApp at +91 90961 66306.',
    },
  ];

  return (
    <div className="pb-24 overflow-x-hidden relative transition-colors">
      {/* NIRVAANA Resonant Scroll-Driven Flowing Line Animation & Traveling Beacon */}
      <NirvaanaScrollJourney />

      {/* Foreground Content Stack (all cards, text, and buttons strictly in front of scroll line) */}
      <div className="relative z-10 space-y-24 sm:space-y-32">

      {/* ============================================================== */}
      {/* SECTION 1: HERO (#home) */}
      {/* ============================================================== */}
      <section id="home" className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        {/* Background Image with warm soft-darkened gradient overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            referrerPolicy="no-referrer"
            src={getAssetUrl('assets/hero-room.jpeg')}
            alt="NIRVAANA Stays Premium Room"
            className="w-full h-full object-cover object-center scale-105 filter brightness-95 transition-transform duration-1000"
          />
          {/* Subtle espresso scrim - lets real room details shine through */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B213F]/75 via-[#0B213F]/40 to-[#0B213F]/85" />
          {/* Smooth, gentle fade into the canvas (light or dark) */}
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#FAF7F2] dark:from-[#0B213F] via-[#FAF7F2]/30 dark:via-[#0B213F]/30 to-transparent pointer-events-none" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8 text-white font-sans">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-[#E5D9C4] text-xs font-semibold tracking-widest uppercase shadow-sm">
            <MapPin className="w-3.5 h-3.5 text-[#C87D65]" />
            <span>VIMAN NAGAR · PUNE</span>
          </div>

          {/* Headline in Cormorant Garamond */}
          <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.12] text-balance drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
            Premium Co-Living, Designed Around You.
          </h1>

          {/* Minimal Subcopy */}
          <p className="text-lg sm:text-xl text-[#E5D9C4]/90 max-w-2xl mx-auto leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.55)]">
            Fully furnished, professionally managed homes for students and working professionals.
          </p>

          {/* Price Highlight Badge in Terracotta */}
          <div className="pt-2">
            <span className="inline-block px-6 py-2.5 rounded-full bg-[#C87D65] text-white text-sm sm:text-base font-semibold shadow-lg tracking-wide">
              Starting from ₹18,999 / bed
            </span>
          </div>

          {/* 2 Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={scrollToContact}
              className="px-8 py-4 rounded-full bg-[#C87D65] hover:bg-[#B56A52] text-white text-base font-semibold tracking-wide transition-all shadow-xl hover:shadow-2xl hover:scale-105 flex items-center gap-2.5"
            >
              <span>Book a Visit</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="https://wa.me/919096166306"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full bg-black/35 hover:bg-black/55 backdrop-blur-md border border-white/30 text-white text-base font-medium tracking-wide transition-all hover:scale-105 flex items-center gap-2.5"
            >
              <MessageCircle className="w-5 h-5 text-white" />
              <span>WhatsApp Now</span>
            </a>
          </div>

          {/* 4 Minimal Hero Pills */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm font-medium text-white/90">
            {['Fully Furnished', 'AC Rooms', 'Wi-Fi', 'Housekeeping'].map((pill) => (
              <span
                key={pill}
                className="px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/15"
              >
                {pill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 2: MINIMAL TRUST STRIP */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 p-6 sm:p-8 rounded-3xl bg-[#FFFDF9] dark:bg-[#081A33] border border-[#0B213F]/15 dark:border-[#E5D9C4]/20 shadow-sm font-sans transition-colors">
          <div className="space-y-1">
            <h4 className="font-editorial text-lg sm:text-xl font-bold text-[#0B213F] dark:text-[#E5D9C4]">Prime Location</h4>
            <p className="text-sm text-[#0B213F]/70 dark:text-[#E5D9C4]/70">Viman Nagar, Pune</p>
          </div>
          <div className="space-y-1">
            <h4 className="font-editorial text-lg sm:text-xl font-bold text-[#0B213F] dark:text-[#E5D9C4]">Move-In Ready</h4>
            <p className="text-sm text-[#0B213F]/70 dark:text-[#E5D9C4]/70">Furniture + essentials</p>
          </div>
          <div className="space-y-1">
            <h4 className="font-editorial text-lg sm:text-xl font-bold text-[#0B213F] dark:text-[#E5D9C4]">Professionally Managed</h4>
            <p className="text-sm text-[#0B213F]/70 dark:text-[#E5D9C4]/70">Clean, simple, hassle-free</p>
          </div>
          <div className="space-y-1">
            <h4 className="font-editorial text-lg sm:text-xl font-bold text-[#0B213F] dark:text-[#E5D9C4]">Premium Amenities</h4>
            <p className="text-sm text-[#0B213F]/70 dark:text-[#E5D9C4]/70">Pool, gym & more</p>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 3: STAY TYPES (2-Column Visual Split) */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
        <div className="text-center max-w-2xl mx-auto space-y-2 zen-text-shield px-6 py-4">
          <span className="text-xs font-bold tracking-widest uppercase text-[#C87D65]">
            CURATED LIVING EXPERIENCES
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#0B213F] dark:text-[#E5D9C4]">
            Thoughtfully Segregated Accommodations
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Girls’ Accommodation */}
          <PerspectiveCard
            maxTilt={7}
            scale={1.02}
            className="rounded-3xl overflow-hidden bg-[#071930] text-white border border-[#0B213F]/20 dark:border-[#E5D9C4]/20 shadow-md group flex flex-col justify-between min-h-[440px] relative"
          >
            {/* Background image */}
            <div className="absolute inset-0 z-0">
              <img
                referrerPolicy="no-referrer"
                src={getAssetUrl('assets/girls-room.jpeg')}
                alt="Girls’ Accommodation"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B213F]/90 via-[#0B213F]/35 to-black/35" />
            </div>

            {/* Top Info */}
            <div className="relative z-10 p-8 space-y-3">
              <span className="inline-block px-3.5 py-1 rounded-full bg-[#C87D65] text-white text-xs font-semibold tracking-wider uppercase shadow-sm">
                For Women
              </span>
              <h3 className="font-editorial text-3xl sm:text-4xl font-bold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
                Girls’ Accommodation
              </h3>
              <p className="text-base sm:text-lg text-[#E5D9C4] max-w-md leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
                Furnished AC rooms, study spaces & daily housekeeping.
              </p>
            </div>

            {/* Bottom Bar */}
            <div className="relative z-10 p-8 pt-0 flex items-center justify-between border-t border-white/20 mt-auto backdrop-blur-[2px]">
              <span className="text-sm sm:text-base font-semibold text-[#C87D65] drop-shadow-sm">
                Starting from ₹18,999 / bed
              </span>
              <button
                onClick={scrollToRooms}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-white hover:text-[#C87D65] transition-colors drop-shadow-sm"
              >
                <span>View Rooms</span>
                <ArrowRight className="w-4 h-4 text-[#C87D65]" />
              </button>
            </div>
          </PerspectiveCard>

          {/* Card 2: Boys’ Accommodation */}
          <PerspectiveCard
            maxTilt={7}
            scale={1.02}
            className="rounded-3xl overflow-hidden bg-[#071930] text-white border border-[#0B213F]/20 dark:border-[#E5D9C4]/20 shadow-md group flex flex-col justify-between min-h-[440px] relative"
          >
            {/* Background image */}
            <div className="absolute inset-0 z-0">
              <img
                referrerPolicy="no-referrer"
                src={getAssetUrl('assets/boys-room.jpeg')}
                alt="Boys’ Accommodation"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B213F]/90 via-[#0B213F]/35 to-black/35" />
            </div>

            {/* Top Info */}
            <div className="relative z-10 p-8 space-y-3">
              <span className="inline-block px-3.5 py-1 rounded-full bg-[#C87D65] text-white text-xs font-semibold tracking-wider uppercase shadow-sm">
                For Men
              </span>
              <h3 className="font-editorial text-3xl sm:text-4xl font-bold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
                Boys’ Accommodation
              </h3>
              <p className="text-base sm:text-lg text-[#E5D9C4] max-w-md leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
                Fully managed bedrooms with AC, study setup & amenities.
              </p>
            </div>

            {/* Bottom Bar */}
            <div className="relative z-10 p-8 pt-0 flex items-center justify-between border-t border-white/20 mt-auto backdrop-blur-[2px]">
              <span className="text-sm sm:text-base font-semibold text-[#C87D65] drop-shadow-sm">
                Premium room options available
              </span>
              <button
                onClick={scrollToRooms}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-white hover:text-[#C87D65] transition-colors drop-shadow-sm"
              >
                <span>View Rooms</span>
                <ArrowRight className="w-4 h-4 text-[#C87D65]" />
              </button>
            </div>
          </PerspectiveCard>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 4: OUR PROPERTIES (#properties) */}
      {/* ============================================================== */}
      <section id="properties" className="scroll-mt-24 sm:scroll-mt-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 font-sans">
        <div className="text-center max-w-3xl mx-auto space-y-3 zen-text-shield px-6 py-4">
          <span className="text-xs font-bold tracking-widest uppercase text-[#C87D65]">
            OUR PROPERTIES
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B213F] dark:text-[#E5D9C4]">
            Two premium addresses. One NIRVAANA experience.
          </h2>
          <p className="text-base sm:text-lg text-[#0B213F]/70 dark:text-[#E5D9C4]/70">
            Close to Symbiosis, major business hubs, and Pune Airport.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Property 1: Shubh Gateway */}
          <PerspectiveCard
            maxTilt={10}
            scale={1.02}
            containerClassName="h-full flex flex-col"
            className="rounded-3xl overflow-hidden bg-[#FFFDF9] dark:bg-[#081A33] border border-[#0B213F]/15 dark:border-[#E5D9C4]/20 shadow-sm hover:shadow-xl transition-all flex flex-col h-full justify-between"
          >
            <div className="relative h-64 sm:h-72 overflow-hidden shrink-0">
              <img referrerPolicy="no-referrer"
                src={getAssetUrl('assets/amenities.jpeg')}
                alt="Shubh Gateway Property"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute top-4 left-4 px-3.5 py-1 rounded-full bg-[#FFFDF9]/95 dark:bg-[#071930]/95 text-[#0B213F] dark:text-[#E5D9C4] text-xs font-semibold backdrop-blur-md shadow-sm border border-[#0B213F]/15 dark:border-[#E5D9C4]/20">
                Viman Nagar
              </div>
            </div>

            <div className="p-8 flex-1 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <h3 className="font-editorial text-2xl font-bold text-[#0B213F] dark:text-[#E5D9C4]">Shubh Gateway</h3>
                <p className="text-xs sm:text-sm text-[#0B213F]/70 dark:text-[#E5D9C4]/70 leading-relaxed">
                  First floor, Shubh Gateway, Shop number 116, society, opp. to Symbiosis Law School, Survey Number 235, Mhada Colony, Pune, Maharashtra 411032.
                </p>
              </div>

              <button
                onClick={scrollToContact}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#0B213F] dark:text-[#E5D9C4] hover:text-[#C87D65] dark:hover:text-[#C87D65] transition-colors group mt-auto pt-2"
              >
                <span>Check availability</span>
                <ArrowRight className="w-4 h-4 text-[#C87D65] group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </PerspectiveCard>

          {/* Property 2: Shubh Nirvaana */}
          <PerspectiveCard
            maxTilt={10}
            scale={1.02}
            containerClassName="h-full flex flex-col"
            className="rounded-3xl overflow-hidden bg-[#FFFDF9] dark:bg-[#081A33] border border-[#0B213F]/15 dark:border-[#E5D9C4]/20 shadow-sm hover:shadow-xl transition-all flex flex-col h-full justify-between"
          >
            <div className="relative h-64 sm:h-72 overflow-hidden shrink-0">
              <img referrerPolicy="no-referrer"
                src={getAssetUrl('assets/kitchen-premium.jpeg')}
                alt="Shubh Nirvaana Property"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute top-4 left-4 px-3.5 py-1 rounded-full bg-[#FFFDF9]/95 dark:bg-[#071930]/95 text-[#0B213F] dark:text-[#E5D9C4] text-xs font-semibold backdrop-blur-md shadow-sm border border-[#0B213F]/15 dark:border-[#E5D9C4]/20">
                Opp. 10Biz Park
              </div>
            </div>

            <div className="p-8 flex-1 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <h3 className="font-editorial text-2xl font-bold text-[#0B213F] dark:text-[#E5D9C4]">Shubh Nirvaana</h3>
                <p className="text-xs sm:text-sm text-[#0B213F]/70 dark:text-[#E5D9C4]/70 leading-relaxed">
                  Opposite 10Biz Park, Viman Nagar, Pune, Maharashtra 411014. Premium student and executive accommodations with loaded kitchens.
                </p>
              </div>

              <button
                onClick={scrollToContact}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#0B213F] dark:text-[#E5D9C4] hover:text-[#C87D65] dark:hover:text-[#C87D65] transition-colors group mt-auto pt-2"
              >
                <span>Check availability</span>
                <ArrowRight className="w-4 h-4 text-[#C87D65] group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </PerspectiveCard>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 5: ROOMS & PRICING (#rooms) */}
      {/* ============================================================== */}
      <section id="rooms" className="scroll-mt-24 sm:scroll-mt-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 font-sans">
        <div className="text-center max-w-2xl mx-auto space-y-3 zen-text-shield px-6 py-4">
          <span className="text-xs font-bold tracking-widest uppercase text-[#C87D65]">
            ROOMS & PRICING
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B213F] dark:text-[#E5D9C4]">
            Simple room choices. Clear pricing.
          </h2>
          <p className="text-base sm:text-lg text-[#0B213F]/70 dark:text-[#E5D9C4]/70">
            Transparent coliving living tiers with zero brokerage and premium inclusions.
          </p>
        </div>

        {/* 4 Pricing Cards (Equal Heights) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {ROOM_TIERS.map((tier) => {
            const isDarkCard = tier.popular || tier.exclusive;
            return (
              <PerspectiveCard
                key={tier.id}
                maxTilt={12}
                containerClassName="w-full h-full flex flex-col"
                className={`p-7 rounded-3xl flex flex-col justify-between space-y-6 transition-all h-full ${
                  isDarkCard
                    ? 'bg-[#071930] dark:bg-[#071529] text-white border-2 border-[#C87D65] shadow-xl'
                    : 'bg-[#FFFDF9] dark:bg-[#081A33] text-[#0B213F] dark:text-[#E5D9C4] border border-[#0B213F]/15 dark:border-[#E5D9C4]/20 shadow-sm hover:shadow-lg'
                }`}
              >
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="h-6 flex items-center">
                      {tier.popular ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C87D65] text-white text-[10px] font-extrabold uppercase tracking-wider shadow-sm">
                          <Sparkles className="w-3 h-3 fill-white" />
                          <span>Popular</span>
                        </span>
                      ) : tier.exclusive ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C87D65] text-white text-[10px] font-extrabold uppercase tracking-wider shadow-sm">
                          <Award className="w-3 h-3" />
                          <span>Exclusive</span>
                        </span>
                      ) : (
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#C87D65]">
                          {tier.categoryBadge}
                        </span>
                      )}
                    </div>

                    <h3
                      className={`font-editorial text-xl sm:text-2xl font-bold tracking-tight ${
                        isDarkCard ? 'text-white' : 'text-[#0B213F] dark:text-[#E5D9C4]'
                      }`}
                    >
                      {tier.name}
                    </h3>
                    <p
                      className={`text-sm line-clamp-2 min-h-[2.5rem] leading-snug ${
                        isDarkCard ? 'text-white/80' : 'text-[#0B213F]/70 dark:text-[#E5D9C4]/70'
                      }`}
                    >
                      {tier.subtitle}
                    </p>
                  </div>

                  <div
                    className={`text-2xl font-bold ${
                      isDarkCard ? 'text-white' : 'text-[#0B213F] dark:text-[#E5D9C4]'
                    }`}
                  >
                    {tier.priceFormatted}{' '}
                    <span
                      className={`text-xs font-normal ${
                        isDarkCard ? 'text-white/70' : 'text-[#0B213F]/60 dark:text-[#E5D9C4]/60'
                      }`}
                    >
                      {tier.pricePeriod}
                    </span>
                  </div>

                  <ul
                    className={`space-y-2.5 text-xs pt-2 ${
                      isDarkCard ? 'text-white/90' : 'text-[#0B213F] dark:text-[#E5D9C4]'
                    }`}
                  >
                    {tier.features.map((bullet) => (
                      <li key={bullet} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#C87D65] shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={scrollToContact}
                  className={`w-full py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-sm mt-auto ${
                    isDarkCard
                      ? 'bg-[#C87D65] hover:bg-[#B56A52] text-white'
                      : 'border border-[#0B213F]/15 dark:border-[#E5D9C4]/25 bg-[#FAF7F2] dark:bg-[#0E294E] hover:bg-[#C87D65] hover:text-white text-[#0B213F] dark:text-[#E5D9C4]'
                  }`}
                >
                  Check Availability
                </button>
              </PerspectiveCard>
            );
          })}
        </div>

        {/* 12-Month Lock-In Bonus Banner */}
        <PerspectiveCard
          maxTilt={5}
          scale={1.005}
          containerClassName="w-full"
          className="w-full p-8 sm:p-10 lg:p-12 rounded-3xl bg-gradient-to-br from-[#071930] via-[#08182E] to-[#040C16] text-white border-2 border-[#C87D65] shadow-xl relative overflow-hidden"
        >
          {/* Subtle Ambient Glows */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[#C87D65]/20 blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-[#C87D65]/15 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C87D65]/25 border border-[#C87D65]/40 text-[#E5D9C4] text-[11px] font-bold tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5 text-[#C87D65]" />
                <span>Special Long-Stay Bonus</span>
              </div>

              <h3 className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
                Lock-In for 12 Months, Get <span className="text-[#C87D65]">1 Month Complimentary</span>
              </h3>

              <p className="text-xs sm:text-sm text-white/85 leading-relaxed">
                Commit to a 12-month tenure at NIRVAANA Stays and enjoy your 12th month completely free of charge. Stay for a full year while paying rent for only 11 months—including high-speed fiber Wi-Fi, air conditioning, regular housekeeping, fully equipped kitchen, and community amenities.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs text-white/90">
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-2 rounded-xl">
                  <CheckCircle2 className="w-4 h-4 text-[#C87D65] shrink-0" />
                  <span className="font-medium">1 Month Free</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-2 rounded-xl">
                  <CheckCircle2 className="w-4 h-4 text-[#C87D65] shrink-0" />
                  <span className="font-medium">Zero Brokerage</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-2 rounded-xl">
                  <CheckCircle2 className="w-4 h-4 text-[#C87D65] shrink-0" />
                  <span className="font-medium">Rent Lock</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-2 rounded-xl">
                  <CheckCircle2 className="w-4 h-4 text-[#C87D65] shrink-0" />
                  <span className="font-medium">All Inclusions</span>
                </div>
              </div>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto">
              <button
                onClick={() =>
                  handleWhatsAppDirect(
                    'Hi NIRVAANA Stays, I would like to lock-in for 12 months and claim the 1-month complimentary stay bonus. Please share available rooms.'
                  )
                }
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#C87D65] hover:bg-[#B56A52] text-white text-xs font-bold tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2 hover:scale-[1.02]"
              >
                <MessageCircle className="w-4 h-4 text-white" />
                <span>Claim 12-Month Bonus</span>
              </button>

              <button
                onClick={scrollToContact}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 text-white text-xs font-semibold tracking-wider uppercase transition-all flex items-center justify-center gap-2"
              >
                <span>Schedule a Walkthrough</span>
                <ArrowRight className="w-4 h-4 text-[#C87D65]" />
              </button>
            </div>
          </div>
        </PerspectiveCard>
      </section>

      {/* ============================================================== */}
      {/* SECTION 6: REFERRAL REWARDS BANNER */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-sans">
        <PerspectiveCard
          maxTilt={6}
          scale={1.01}
          className="p-8 sm:p-12 rounded-3xl bg-[#FFFDF9] dark:bg-[#081A33] border border-[#0B213F]/15 dark:border-[#E5D9C4]/20 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8 transition-colors"
        >
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C87D65] inline-flex items-center gap-1.5">
              <Gift className="w-3.5 h-3.5" />
              <span>REFERRAL REWARDS</span>
            </span>
            <h2 className="font-editorial text-2xl sm:text-4xl font-bold text-[#0B213F] dark:text-[#E5D9C4]">
              Share NIRVAANA. Earn ₹3,000.
            </h2>
            <p className="text-sm sm:text-base text-[#0B213F]/70 dark:text-[#E5D9C4]/70 max-w-xl">
              Refer a friend for a minimum 6-month stay and receive a ₹3,000 referral reward.
            </p>
          </div>

          <a
            href="https://wa.me/919096166306?text=Hi%20NIRVAANA%20Stays%2C%20I%20would%20like%20to%20refer%20someone%20for%20a%20stay."
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 rounded-full bg-[#C87D65] hover:bg-[#B56A52] text-white text-sm font-semibold tracking-wide transition-all shadow-md hover:scale-105 shrink-0 flex items-center gap-2"
          >
            <span>Refer Someone</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </a>
        </PerspectiveCard>
      </section>

      {/* ============================================================== */}
      {/* SECTION 7: AMENITIES (#amenities) */}
      {/* ============================================================== */}
      <section id="amenities" className="scroll-mt-24 sm:scroll-mt-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-sans">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start lg:items-center">
          {/* Left: Full height kitchen showcase image */}
          <div className="lg:col-span-5 w-full h-[320px] sm:h-[420px] lg:h-[580px] shrink-0">
            <PerspectiveCard
              maxTilt={9}
              containerClassName="w-full h-full"
              className="w-full h-full rounded-3xl overflow-hidden shadow-lg border border-[#0B213F]/15 dark:border-[#E5D9C4]/20 relative group"
            >
              <img referrerPolicy="no-referrer"
                src={getAssetUrl('assets/kitchen-premium.jpeg')}
                alt="Fully equipped NIRVAANA kitchen"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B213F]/85 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <span className="text-xs uppercase tracking-wider text-[#C87D65] font-bold">
                  Kitchen Showcase
                </span>
                <h4 className="font-editorial text-xl sm:text-2xl font-bold text-white">
                  Fully equipped NIRVAANA kitchen
                </h4>
              </div>
            </PerspectiveCard>
          </div>

          {/* Right: Content & 12-Item clean pill grid */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <span className="text-xs font-bold tracking-widest uppercase text-[#C87D65]">
                EVERYTHING YOU NEED
              </span>
              <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B213F] dark:text-[#E5D9C4] leading-tight">
                More than a room. A complete living experience.
              </h2>
              <p className="text-base sm:text-lg text-[#0B213F]/70 dark:text-[#E5D9C4]/70">
                Modern conveniences, professional housekeeping, and leisure amenities designed for effortless living.
              </p>
            </div>

            {/* 12-Item Clean Pill/Grid List */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
              {amenitiesList.map((item) => (
                <div
                  key={item.name}
                  className="p-3.5 rounded-2xl bg-[#FFFDF9] dark:bg-[#081A33] border border-[#0B213F]/15 dark:border-[#E5D9C4]/20 flex items-center gap-3 shadow-sm hover:border-[#C87D65] transition-colors h-[54px]"
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-xs sm:text-sm font-medium text-[#0B213F] dark:text-[#E5D9C4]">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 8: GALLERY (#gallery) */}
      {/* ============================================================== */}
      <section id="gallery" className="scroll-mt-24 sm:scroll-mt-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
        <div className="text-center max-w-2xl mx-auto space-y-3 zen-text-shield px-6 py-4">
          <span className="text-xs font-bold tracking-widest uppercase text-[#C87D65]">
            CURATED GALLERY & SPACES
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B213F] dark:text-[#E5D9C4]">
            See what living at NIRVAANA feels like.
          </h2>
          <p className="text-base sm:text-lg text-[#0B213F]/70 dark:text-[#E5D9C4]/70">
            Browse through our authentic spaces with interactive arrow controls, high-resolution photography, and detailed room specifications.
          </p>
        </div>

        {/* Gather-Style Arched Carousel with Left/Right Arrows & Big Legible Photos */}
        <ArcGalleryCarousel
          onOpenLightbox={onOpenLightbox}
          onBookVisit={scrollToContact}
        />
      </section>

      {/* ============================================================== */}
      {/* SECTION 9: WHY NIRVAANA (#why) */}
      {/* ============================================================== */}
      <section id="why" className="scroll-mt-24 sm:scroll-mt-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3 zen-text-shield px-6 py-4">
          <span className="font-sans text-xs font-bold tracking-widest uppercase text-[#C87D65]">
            WHY NIRVAANA
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-medium text-[#0B213F] dark:text-[#E5D9C4]">
            Live better. Stay NIRVAANA.
          </h2>
          <p className="font-sans text-base sm:text-lg text-[#0B213F]/70 dark:text-[#E5D9C4]/70">
            The standard of refined, managed co-living across East Pune.
          </p>
        </div>

        {/* 5 Minimal Cards in a single row on desktop - Equal Dimensions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 items-stretch">
          {whyNirvanaPoints.map((point) => (
            <PerspectiveCard
              key={point.num}
              maxTilt={12}
              containerClassName="h-full flex flex-col"
              className="p-6 rounded-3xl bg-[#FFFDF9] dark:bg-[#081A33] border border-[#0B213F]/15 dark:border-[#E5D9C4]/20 shadow-sm hover:shadow-lg hover:border-[#C87D65]/40 transition-all flex flex-col justify-between h-full space-y-3"
            >
              <div className="space-y-2">
                <span className="font-editorial text-2xl font-bold text-[#C87D65]">
                  {point.num}
                </span>
                <h3 className="font-editorial text-xl font-medium text-[#0B213F] dark:text-[#E5D9C4] min-h-[3rem] flex items-center">
                  {point.title}
                </h3>
              </div>
              <p className="font-sans text-xs text-[#0B213F]/70 dark:text-[#E5D9C4]/70 leading-relaxed mt-auto pt-2">
                {point.desc}
              </p>
            </PerspectiveCard>
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 10: FAQ (#faq) */}
      {/* ============================================================== */}
      <section id="faq" className="scroll-mt-24 sm:scroll-mt-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 zen-text-shield max-w-2xl mx-auto px-6 py-4">
          <span className="font-sans text-xs font-bold tracking-widest uppercase text-[#C87D65]">
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-medium text-[#0B213F] dark:text-[#E5D9C4]">
            Frequently Asked Questions
          </h2>
          <p className="font-sans text-base sm:text-lg text-[#0B213F]/70 dark:text-[#E5D9C4]/70 max-w-xl mx-auto">
            Clear, transparent answers about our Viman Nagar community, amenities, and annual residency benefits.
          </p>
        </div>

        {/* All Questions & Answers Openly Visible at Once - Equal Sizing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 items-stretch">
          {faqs.map((faq, index) => (
            <div
              key={faq.q}
              className="p-6 sm:p-7 rounded-3xl border border-[#0B213F]/15 dark:border-[#E5D9C4]/20 bg-[#FFFDF9] dark:bg-[#081A33] shadow-sm flex flex-col justify-start space-y-3 hover:border-[#C87D65]/50 hover:shadow-md transition-all h-full"
            >
              <div className="flex items-start gap-3">
                <span className="w-8 h-8 rounded-xl bg-[#FAF7F2] dark:bg-[#0E294E] text-[#C87D65] border border-[#0B213F]/15 dark:border-[#E5D9C4]/20 flex items-center justify-center font-editorial text-sm font-bold shrink-0 mt-0.5">
                  0{index + 1}
                </span>
                <h3 className="font-editorial text-lg sm:text-xl font-medium text-[#0B213F] dark:text-[#E5D9C4] leading-snug">
                  {faq.q}
                </h3>
              </div>
              <p className="font-sans text-xs sm:text-sm text-[#0B213F]/75 dark:text-[#E5D9C4]/75 leading-relaxed pl-11">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION: EAST PUNE CONNECTIVITY HUB (#connectivity) */}
      {/* ============================================================== */}
      <section id="connectivity" className="scroll-mt-24 sm:scroll-mt-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 zen-text-shield max-w-2xl mx-auto px-6 py-4">
          <span className="font-sans text-xs font-bold tracking-widest uppercase text-[#C87D65]">
            STRATEGIC LOCATION & CONNECTIVITY
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-medium text-[#0B213F] dark:text-[#E5D9C4]">
            Connected to East Pune's Top Colleges & Tech Parks
          </h2>
          <p className="font-sans text-base sm:text-lg text-[#0B213F]/70 dark:text-[#E5D9C4]/70 max-w-2xl mx-auto">
            Situated directly opposite Symbiosis Law School at Shubh Gateway, Mhada Colony, Nirvaana Stays offers seamless daily commutes across Viman Nagar, Kharadi, and Kalyani Nagar.
          </p>
        </div>

        {/* 3 Strategic Hubs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {/* Hub 1: Viman Nagar Cluster */}
          <div className="p-7 rounded-3xl bg-[#FFFDF9] dark:bg-[#081A33] border border-[#0B213F]/15 dark:border-[#E5D9C4]/20 shadow-sm hover:shadow-lg hover:border-[#C87D65]/40 transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 font-sans">
                <span className="px-3 py-1 rounded-full bg-[#0B213F] dark:bg-[#E5D9C4] text-[#E5D9C4] dark:text-[#0B213F] text-[11px] font-bold uppercase tracking-wider">
                  0–2 Mins · Walking Hub
                </span>
                <span className="text-[11px] font-mono text-[#0B213F] dark:text-[#E5D9C4] font-semibold bg-[#FAF7F2] dark:bg-[#0E294E] px-2 py-0.5 rounded border border-[#0B213F]/15 dark:border-[#E5D9C4]/20">PIN 411032</span>
              </div>
              <h3 className="font-editorial text-2xl font-medium text-[#0B213F] dark:text-[#E5D9C4]">
                Viman Nagar Campus Cluster
              </h3>
              <p className="font-sans text-xs text-[#0B213F]/70 dark:text-[#E5D9C4]/70 leading-relaxed">
                Step directly across the avenue into Symbiosis institutes and neighborhood conveniences.
              </p>
              <ul className="space-y-2 font-sans text-xs text-[#0B213F] dark:text-[#E5D9C4] pt-2 border-t border-[#0B213F]/15 dark:border-[#E5D9C4]/20">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C87D65] shrink-0 mt-0.5" />
                  <span><strong>Opposite Symbiosis Law School (SLS)</strong> (100 m / 1 min walk)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C87D65] shrink-0 mt-0.5" />
                  <span><strong>SCMS, SID, SCMC & SSLA Campuses</strong> (400–600 m / 5 min walk)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C87D65] shrink-0 mt-0.5" />
                  <span><strong>Shubh Gateway Shop 116 & Mhada Colony</strong> (Survey No. 235)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C87D65] shrink-0 mt-0.5" />
                  <span><strong>Pune International Airport & Aero Mall</strong> (2.1 km / 6 min)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C87D65] shrink-0 mt-0.5" />
                  <span><strong>Sakore Nagar, Sanjay Park & Clover Park</strong> cafes</span>
                </li>
              </ul>
            </div>
            <div className="pt-2 font-sans text-[11px] text-[#0B213F]/70 dark:text-[#E5D9C4]/70 font-medium border-t border-[#0B213F]/15 dark:border-[#E5D9C4]/20">
              Ideal for SLS students, SIU scholars & airport crew
            </div>
          </div>

          {/* Hub 2: Kalyani Nagar & Metro */}
          <div className="p-7 rounded-3xl bg-[#FFFDF9] dark:bg-[#081A33] border border-[#0B213F]/15 dark:border-[#E5D9C4]/20 shadow-sm hover:shadow-lg hover:border-[#C87D65]/40 transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 font-sans">
                <span className="px-3 py-1 rounded-full bg-[#0B213F] dark:bg-[#E5D9C4] text-[#E5D9C4] dark:text-[#0B213F] text-[11px] font-bold uppercase tracking-wider">
                  5–10 Mins · Metro & Lifestyle
                </span>
                <span className="text-[11px] font-mono text-[#0B213F] dark:text-[#E5D9C4] font-semibold bg-[#FAF7F2] dark:bg-[#0E294E] px-2 py-0.5 rounded border border-[#0B213F]/15 dark:border-[#E5D9C4]/20">PIN 411006</span>
              </div>
              <h3 className="font-editorial text-2xl font-medium text-[#0B213F] dark:text-[#E5D9C4]">
                Kalyani Nagar & Transit
              </h3>
              <p className="font-sans text-xs text-[#0B213F]/70 dark:text-[#E5D9C4]/70 leading-relaxed">
                Effortless link to Pune Metro line, major IT parks, and premier retail hubs.
              </p>
              <ul className="space-y-2 font-sans text-xs text-[#0B213F] dark:text-[#E5D9C4] pt-2 border-t border-[#0B213F]/15 dark:border-[#E5D9C4]/20">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C87D65] shrink-0 mt-0.5" />
                  <span><strong>Ramwadi Metro & Kalyani Nagar Metro</strong> (4–6 min drive)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C87D65] shrink-0 mt-0.5" />
                  <span><strong>Phoenix Marketcity Mall & PVR</strong> (1.2 km / 4 min)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C87D65] shrink-0 mt-0.5" />
                  <span><strong>Cerebrum IT Park, Marisoft & Cybage</strong> (7 min drive)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C87D65] shrink-0 mt-0.5" />
                  <span><strong>Weikfield IT Citi & Giga Space IT Park</strong> (1.8 km / 6 min)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C87D65] shrink-0 mt-0.5" />
                  <span><strong>Joggers Park, Central Avenue & Mariplex Mall</strong></span>
                </li>
              </ul>
            </div>
            <div className="pt-2 font-sans text-[11px] text-[#0B213F]/70 dark:text-[#E5D9C4]/70 font-medium border-t border-[#0B213F]/15 dark:border-[#E5D9C4]/20">
              Rapid metro connectivity to Central Pune & Koregaon Park
            </div>
          </div>

          {/* Hub 3: Kharadi IT Parks */}
          <div className="p-7 rounded-3xl bg-[#FFFDF9] dark:bg-[#081A33] border border-[#0B213F]/15 dark:border-[#E5D9C4]/20 shadow-sm hover:shadow-lg hover:border-[#C87D65]/40 transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 font-sans">
                <span className="px-3 py-1 rounded-full bg-[#0B213F] dark:bg-[#E5D9C4] text-[#E5D9C4] dark:text-[#0B213F] text-[11px] font-bold uppercase tracking-wider">
                  15–20 Mins · IT Tech Corridor
                </span>
                <span className="text-[11px] font-mono text-[#0B213F] dark:text-[#E5D9C4] font-semibold bg-[#FAF7F2] dark:bg-[#0E294E] px-2 py-0.5 rounded border border-[#0B213F]/15 dark:border-[#E5D9C4]/20">PIN 411014</span>
              </div>
              <h3 className="font-editorial text-2xl font-medium text-[#0B213F] dark:text-[#E5D9C4]">
                Kharadi Corporate Hub
              </h3>
              <p className="font-sans text-xs text-[#0B213F]/70 dark:text-[#E5D9C4]/70 leading-relaxed">
                Direct commute down Nagar Road and Kharadi South Main Road for working professionals.
              </p>
              <ul className="space-y-2 font-sans text-xs text-[#0B213F] dark:text-[#E5D9C4] pt-2 border-t border-[#0B213F]/15 dark:border-[#E5D9C4]/20">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C87D65] shrink-0 mt-0.5" />
                  <span><strong>EON Free Zone / EON IT Park (Phases 1 & 2)</strong> (12–15 min)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C87D65] shrink-0 mt-0.5" />
                  <span><strong>World Trade Center (WTC) Pune Kharadi</strong> (14 min)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C87D65] shrink-0 mt-0.5" />
                  <span><strong>Gera Commerzone, Zensar, Barclays & UBS</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C87D65] shrink-0 mt-0.5" />
                  <span><strong>Chandan Nagar & Wadgaon Sheri</strong> bridge corridors</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C87D65] shrink-0 mt-0.5" />
                  <span><strong>Commerzone Yerwada, Business Bay & Koregaon Park</strong></span>
                </li>
              </ul>
            </div>
            <div className="pt-2 font-sans text-[11px] text-[#0B213F]/70 dark:text-[#E5D9C4]/70 font-medium border-t border-[#0B213F]/15 dark:border-[#E5D9C4]/20">
              Top choice for engineers, consultants & summer corporate interns
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 11: BOOK A VISIT & INTERACTIVE MAP (#contact) */}
      {/* ============================================================== */}
      <section id="contact" className="scroll-mt-24 sm:scroll-mt-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3 zen-text-shield px-6 py-4">
          <span className="font-sans text-xs font-bold tracking-widest uppercase text-[#C87D65]">
            BOOK A VISIT & CONTACT
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-medium text-[#0B213F] dark:text-[#E5D9C4]">
            Schedule Your Visit Today
          </h2>
          <p className="font-sans text-base sm:text-lg text-[#0B213F]/70 dark:text-[#E5D9C4]/70">
            Walk into our Shubh Gateway office or send us a visit inquiry below.
          </p>
        </div>

        {/* 2-Column Split: Booking Form on Left, Location Details on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Clean Booking Form */}
          <div className="lg:col-span-7">
            <BookingVisitForm />
          </div>

          {/* Right Column: Contact Details, WhatsApp Concierge */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-[#FFFDF9] dark:bg-[#081A33] border border-[#0B213F]/15 dark:border-[#E5D9C4]/20 space-y-6 shadow-sm transition-colors">
              <div className="space-y-2">
                <span className="font-sans text-xs font-bold uppercase tracking-wider text-[#C87D65]">
                  DIRECT CONCIERGE
                </span>
                <h3 className="font-editorial text-2xl font-medium text-[#0B213F] dark:text-[#E5D9C4]">
                  Talk Directly with NIRVAANA Stays
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#0B213F]/70 dark:text-[#E5D9C4]/70">
                  Need immediate confirmation or photos? Reach out to our Pune management team.
                </p>
              </div>

              <div className="space-y-4 pt-2 font-sans">
                <a
                  href="https://wa.me/919096166306"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-6 rounded-full bg-[#C87D65] hover:bg-[#B56A52] text-white text-sm font-semibold tracking-wider uppercase transition-all shadow-sm hover:shadow flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-white" />
                    <span>WhatsApp: +91 90961 66306</span>
                  </span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </a>

                <a
                  href="tel:+919096166306"
                  className="w-full py-3.5 px-6 rounded-full bg-white dark:bg-[#0E294E] hover:bg-[#FAF7F2] dark:hover:bg-[#133463] border border-[#0B213F]/15 dark:border-[#E5D9C4]/20 text-[#0B213F] dark:text-[#E5D9C4] text-sm font-semibold tracking-wider uppercase transition-all flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#C87D65]" />
                    <span>Phone: +91 90961 66306</span>
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#C87D65]" />
                </a>
              </div>

              <div className="pt-4 border-t border-[#0B213F]/15 dark:border-[#E5D9C4]/20 space-y-3 text-xs font-sans text-[#0B213F]/70 dark:text-[#E5D9C4]/70">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#C87D65] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#0B213F] dark:text-[#E5D9C4] block">Campus Headquarters & Visits</span>
                    <p className="leading-relaxed">First floor, Shubh Gateway, Shop number 116, society, opp. to Symbiosis Law School, Survey Number 235, Mhada Colony, Pune, Maharashtra 411032</p>
                    <span className="inline-block mt-1 font-mono text-[11px] text-[#0B213F] dark:text-[#E5D9C4] bg-[#FAF7F2] dark:bg-[#0E294E] px-2 py-0.5 rounded border border-[#0B213F]/15 dark:border-[#E5D9C4]/20 font-semibold">Plus Code: HWG5+62</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-[#C87D65] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#0B213F] dark:text-[#E5D9C4] block">Visit Timings</span>
                    <p>Daily: 9:30 AM to 8:30 PM (Walk-ins welcomed)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dedicated Interactive Google Maps Section for Contact */}
        <div id="location-map" className="pt-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="font-sans text-xs font-bold tracking-widest uppercase text-[#C87D65]">
                GEOGRAPHIC LOCATION
              </span>
              <h3 className="font-editorial text-2xl sm:text-3xl font-medium text-[#0B213F] dark:text-[#E5D9C4]">
                NIRVAANA Stays on Google Maps
              </h3>
            </div>
            <p className="font-sans text-sm text-[#0B213F]/70 dark:text-[#E5D9C4]/70">
              Directly on Sunset Blvd, opposite Symbiosis Law School (SLS), Viman Nagar, Pune
            </p>
          </div>

          <NirvanaLocationMap
            defaultCenter={NIRVAANA_STATIC_CENTER}
            defaultZoom={17}
            height="500px"
          />
        </div>
      </section>
      </div>
    </div>
  );
};
