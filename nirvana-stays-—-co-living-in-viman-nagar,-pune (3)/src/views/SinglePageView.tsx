import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  MessageCircle,
  MapPin,
  CheckCircle2,
  Maximize2,
  Flame,
  ShieldCheck,
  Clock,
  Phone,
  Mail,
  Send,
  Building,
  School,
  ExternalLink,
  Gift,
  Compass,
} from 'lucide-react';
import { getAssetUrl } from '../utils/asset-helper.ts';
import { PerspectiveCard } from '../components/PerspectiveCard.tsx';
import { NirvanaLocationMap } from '../components/NirvanaLocationMap.tsx';
import { ArcGalleryCarousel } from '../components/ArcGalleryCarousel.tsx';
import { BookingVisitForm } from '../components/BookingVisitForm.tsx';

const NIRVANA_STATIC_CENTER = { lat: 18.5758, lng: 73.9073 };

interface SinglePageAppProps {
  onOpenLightbox: (src: string, alt: string) => void;
}

export const SinglePageView: React.FC<SinglePageAppProps> = ({ onOpenLightbox }) => {
  const handleWhatsAppDirect = (customText?: string) => {
    const text = encodeURIComponent(
      customText || 'Hi NIRVANA Stays, I would like to inquire about co-living rooms in Viman Nagar, Pune.'
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
    { name: 'Microwave', icon: '♨️' },
    { name: 'RO Water', icon: '💧' },
    { name: 'Gym', icon: '🏋️' },
    { name: 'Swimming Pool', icon: '🏊' },
    { name: 'Basketball', icon: '🏀' },
    { name: 'Jogging Track', icon: '🏃' },
  ];

  // 5 Why NIRVANA points
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

  // 6 FAQ items
  const faqs = [
    {
      q: 'Where are the properties located?',
      a: 'We have two premier addresses in Viman Nagar, Pune: Shubh Gateway (opposite Symbiosis Law College) and Shubh Nirvana (opposite 10Biz Park). Both are close to Symbiosis campuses, airport, and major tech corridors.',
    },
    {
      q: 'What is included in the monthly rent?',
      a: 'Your rent covers a fully furnished AC room, study desk, high-speed Wi-Fi, regular housekeeping, fully equipped kitchen with appliances (refrigerator, microwave, RO water), and access to society amenities like swimming pool and gym.',
    },
    {
      q: 'Are there separate accommodations for girls and boys?',
      a: 'Yes, we provide dedicated, separate properties and wings for Girls’ Accommodation (Navy blue bedding rooms) and Boys’ Accommodation (Grey bedding rooms) ensuring complete comfort and privacy.',
    },
    {
      q: 'What is the deposit and lock-in period?',
      a: 'We offer straightforward, transparent terms with reasonable security deposits. SPECIAL 12-MONTH BONUS: Lock-in for a 12-month duration and receive 1 full month completely complimentary with your stay (Pay for 11 months, stay for 12)! Contact our concierge for customized semester or annual tenancy agreements.',
    },
    {
      q: 'Can I visit before booking?',
      a: 'Absolutely! We encourage you to schedule an in-person or virtual walkthrough. Simply click "Book a Visit" or message us directly on WhatsApp at +91 90961 66306.',
    },
    {
      q: 'How does the ₹3,000 Referral Program work?',
      a: 'Refer a friend for a minimum 6-month stay at NIRVANA Stays. Once their booking and move-in are confirmed, you receive your ₹3,000 cash reward directly.',
    },
  ];

  return (
    <div className="space-y-24 sm:space-y-32 pb-24 overflow-x-hidden">
      {/* ============================================================== */}
      {/* SECTION 1: HERO (#home) */}
      {/* ============================================================== */}
      <section id="home" className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        {/* Background Image with warm soft-darkened espresso gradient overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            referrerPolicy="no-referrer"
            src={getAssetUrl('assets/hero-room.jpeg')}
            alt="NIRVANA Stays Premium Room"
            className="w-full h-full object-cover object-center scale-105 filter brightness-95 transition-transform duration-1000"
          />
          {/* Subtle warm espresso scrim - lets real room details shine through */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#2C2623]/60 via-[#2C2623]/35 to-[#2C2623]/65" />
          {/* Smooth, gentle fade into the soft ivory canvas */}
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#FAF7F2] via-[#FAF7F2]/30 to-transparent pointer-events-none" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8 text-white">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFFDF9]/20 backdrop-blur-md border border-[#FFFDF9]/30 text-[#FAF7F2] text-xs font-semibold tracking-widest uppercase shadow-sm">
            <MapPin className="w-3.5 h-3.5 text-[#C9A45B]" />
            <span>VIMAN NAGAR · PUNE</span>
          </div>

          {/* Headline */}
          <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#FFFDF9] leading-[1.12] text-balance drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)]">
            Premium Co-Living, Designed Around You.
          </h1>

          {/* Minimal Subcopy */}
          <p className="text-base sm:text-xl text-[#FAF7F2] font-light max-w-2xl mx-auto leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
            Fully furnished, professionally managed homes for students and working professionals.
          </p>

          {/* Price Highlight Badge */}
          <div className="pt-2">
            <span className="inline-block px-5 py-2.5 rounded-full bg-[#C87D65] text-[#FFFDF9] text-sm sm:text-base font-semibold shadow-lg tracking-wide border border-[#B56A52]">
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
              className="px-8 py-4 rounded-full bg-[#FFFDF9]/10 hover:bg-[#FFFDF9]/20 backdrop-blur-md border border-[#FFFDF9]/30 text-[#FFFDF9] text-base font-medium tracking-wide transition-all hover:scale-105 flex items-center gap-2.5"
            >
              <MessageCircle className="w-5 h-5 text-[#C9A45B]" />
              <span>WhatsApp Now</span>
            </a>
          </div>

          {/* 4 Minimal Hero Pills */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm font-medium text-[#FAF7F2]/90">
            {['Fully Furnished', 'AC Rooms', 'Wi-Fi', 'Housekeeping'].map((pill, i) => (
              <span
                key={pill}
                className="px-4 py-1.5 rounded-full bg-[#2C2623]/60 backdrop-blur-md border border-[#FFFDF9]/20"
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
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 p-6 sm:p-8 rounded-3xl bg-[#F3EFE6] border border-[#E6E0D6] shadow-sm">
          <div className="space-y-1">
            <h4 className="font-editorial text-lg sm:text-xl font-bold text-[#2C2623]">Prime Location</h4>
            <p className="text-xs sm:text-sm text-[#6E655F]">Viman Nagar, Pune</p>
          </div>
          <div className="space-y-1">
            <h4 className="font-editorial text-lg sm:text-xl font-bold text-[#2C2623]">Move-In Ready</h4>
            <p className="text-xs sm:text-sm text-[#6E655F]">Furniture + essentials</p>
          </div>
          <div className="space-y-1">
            <h4 className="font-editorial text-lg sm:text-xl font-bold text-[#2C2623]">Professionally Managed</h4>
            <p className="text-xs sm:text-sm text-[#6E655F]">Clean, simple, hassle-free</p>
          </div>
          <div className="space-y-1">
            <h4 className="font-editorial text-lg sm:text-xl font-bold text-[#2C2623]">Premium Amenities</h4>
            <p className="text-xs sm:text-sm text-[#6E655F]">Pool, gym & more</p>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 3: STAY TYPES (2-Column Visual Split) */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold tracking-widest uppercase text-[#7A8B7B]">
            CURATED LIVING EXPERIENCES
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#2C2623]">
            Thoughtfully Segregated Accommodations
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Girls’ Accommodation */}
          <PerspectiveCard
            maxTilt={7}
            scale={1.02}
            className="rounded-3xl overflow-hidden bg-[#2C2623] text-white border border-[#E6E0D6] shadow-md group flex flex-col justify-between min-h-[440px] relative"
          >
            {/* Background image - fully visible with soft gentle scrim */}
            <div className="absolute inset-0 z-0">
              <img
                referrerPolicy="no-referrer"
                src={getAssetUrl('assets/girls-room.jpeg')}
                alt="Girls’ Accommodation"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Light non-prominent gradient so the navy bedding and room details are crystal clear */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#2C2623]/85 via-[#2C2623]/25 to-black/30" />
            </div>

            {/* Top Info */}
            <div className="relative z-10 p-8 space-y-3">
              <span className="inline-block px-3.5 py-1 rounded-full bg-[#7A8B7B] text-[#FFFDF9] text-xs font-semibold tracking-wider uppercase shadow-sm">
                For Women
              </span>
              <h3 className="font-editorial text-3xl sm:text-4xl font-bold text-[#FFFDF9] drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
                Girls’ Accommodation
              </h3>
              <p className="text-sm sm:text-base text-[#FAF7F2] max-w-md leading-relaxed font-light drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
                Furnished AC rooms, study spaces & daily housekeeping.
              </p>
            </div>

            {/* Bottom Bar */}
            <div className="relative z-10 p-8 pt-0 flex items-center justify-between border-t border-white/20 mt-auto backdrop-blur-[2px]">
              <span className="text-sm sm:text-base font-semibold text-[#E9C377] drop-shadow-sm">
                Starting from ₹18,999 / bed
              </span>
              <button
                onClick={scrollToRooms}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#FFFDF9] hover:text-[#C87D65] transition-colors drop-shadow-sm"
              >
                <span>View Rooms</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </PerspectiveCard>

          {/* Card 2: Boys’ Accommodation */}
          <PerspectiveCard
            maxTilt={7}
            scale={1.02}
            className="rounded-3xl overflow-hidden bg-[#2C2623] text-white border border-[#E6E0D6] shadow-md group flex flex-col justify-between min-h-[440px] relative"
          >
            {/* Background image - fully visible with soft gentle scrim */}
            <div className="absolute inset-0 z-0">
              <img
                referrerPolicy="no-referrer"
                src={getAssetUrl('assets/boys-room.jpeg')}
                alt="Boys’ Accommodation"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Light non-prominent gradient so the grey bedding and study space are crystal clear */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#2C2623]/85 via-[#2C2623]/25 to-black/30" />
            </div>

            {/* Top Info */}
            <div className="relative z-10 p-8 space-y-3">
              <span className="inline-block px-3.5 py-1 rounded-full bg-[#C87D65] text-[#FFFDF9] text-xs font-semibold tracking-wider uppercase shadow-sm">
                For Men
              </span>
              <h3 className="font-editorial text-3xl sm:text-4xl font-bold text-[#FFFDF9] drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
                Boys’ Accommodation
              </h3>
              <p className="text-sm sm:text-base text-[#FAF7F2] max-w-md leading-relaxed font-light drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
                Fully managed bedrooms with AC, study setup & amenities.
              </p>
            </div>

            {/* Bottom Bar */}
            <div className="relative z-10 p-8 pt-0 flex items-center justify-between border-t border-white/20 mt-auto backdrop-blur-[2px]">
              <span className="text-sm sm:text-base font-semibold text-[#E9C377] drop-shadow-sm">
                Premium room options available
              </span>
              <button
                onClick={scrollToRooms}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#FFFDF9] hover:text-[#C87D65] transition-colors drop-shadow-sm"
              >
                <span>View Rooms</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </PerspectiveCard>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 4: OUR PROPERTIES (#properties) */}
      {/* ============================================================== */}
      <section id="properties" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold tracking-widest uppercase text-[#7A8B7B]">
            OUR PROPERTIES
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C2623]">
            Two premium addresses. One NIRVANA experience.
          </h2>
          <p className="text-sm sm:text-base text-[#6E655F]">
            Close to Symbiosis, major business hubs, and Pune Airport.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Property 1: Shubh Gateway */}
          <PerspectiveCard
            maxTilt={10}
            scale={1.02}
            containerClassName="h-full flex flex-col"
            className="rounded-3xl overflow-hidden bg-[#FFFDF9] border border-[#E6E0D6] shadow-sm hover:shadow-xl transition-all flex flex-col h-full justify-between"
          >
            <div className="relative h-64 sm:h-72 overflow-hidden shrink-0">
              <img referrerPolicy="no-referrer"
                src={getAssetUrl('assets/amenities.jpeg')}
                alt="Shubh Gateway Property"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute top-4 left-4 px-3.5 py-1 rounded-full bg-[#FFFDF9]/95 text-[#2C2623] text-xs font-semibold backdrop-blur-md shadow-sm">
                Viman Nagar
              </div>
            </div>

            <div className="p-8 flex-1 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <h3 className="font-editorial text-2xl font-bold text-[#2C2623]">Shubh Gateway</h3>
                <p className="text-xs sm:text-sm text-[#6E655F] leading-relaxed">
                  Sr. No. 227, Plot No. 1, New Airport Rd, opposite Symbiosis Law College, Viman Nagar, Pune, Maharashtra 411032.
                </p>
              </div>

              <button
                onClick={scrollToContact}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#C87D65] hover:text-[#B56A52] transition-colors group mt-auto pt-2"
              >
                <span>Check availability</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </PerspectiveCard>

          {/* Property 2: Shubh Nirvana */}
          <PerspectiveCard
            maxTilt={10}
            scale={1.02}
            containerClassName="h-full flex flex-col"
            className="rounded-3xl overflow-hidden bg-[#FFFDF9] border border-[#E6E0D6] shadow-sm hover:shadow-xl transition-all flex flex-col h-full justify-between"
          >
            <div className="relative h-64 sm:h-72 overflow-hidden shrink-0">
              <img referrerPolicy="no-referrer"
                src={getAssetUrl('assets/living.jpeg')}
                alt="Shubh Nirvana Property"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute top-4 left-4 px-3.5 py-1 rounded-full bg-[#FFFDF9]/95 text-[#2C2623] text-xs font-semibold backdrop-blur-md shadow-sm">
                Viman Nagar
              </div>
            </div>

            <div className="p-8 flex-1 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <h3 className="font-editorial text-2xl font-bold text-[#2C2623]">Shubh Nirvana</h3>
                <p className="text-xs sm:text-sm text-[#6E655F] leading-relaxed">
                  Opposite 10Biz Park, Viman Nagar, Pune, Maharashtra 411014.
                </p>
              </div>

              <button
                onClick={scrollToContact}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#C87D65] hover:text-[#B56A52] transition-colors group mt-auto pt-2"
              >
                <span>Check availability</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </PerspectiveCard>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 5: ROOMS & PRICING (#rooms) */}
      {/* ============================================================== */}
      <section id="rooms" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold tracking-widest uppercase text-[#7A8B7B]">
            ROOMS & PRICING
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C2623]">
            Simple room choices. Clear pricing.
          </h2>
        </div>

        {/* 4 Pricing Cards (2x2 or 4-column responsive grid) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <PerspectiveCard
            maxTilt={12}
            className="p-7 rounded-3xl bg-[#FFFDF9] border border-[#E6E0D6] shadow-sm flex flex-col justify-between space-y-6 hover:shadow-lg transition-all"
          >
            <div className="space-y-4">
              <div className="space-y-1.5">
                <h3 className="font-editorial text-xl sm:text-2xl font-bold text-[#2C2623] whitespace-nowrap tracking-tight">
                  Nirvana Lite
                </h3>
                <p className="text-xs sm:text-sm font-medium text-[#6E655F] line-clamp-2 min-h-[2.5rem] leading-snug">
                  Non-Attached Washroom
                </p>
              </div>
              <div className="text-2xl font-bold text-[#2C2623]">
                ₹18,999 <span className="text-xs font-normal text-[#6E655F]">/ bed / month</span>
              </div>
              <ul className="space-y-2.5 text-xs text-[#6E655F] pt-2">
                {['Fully furnished room', 'Air conditioning', 'Study setup', 'Shared / non-attached washroom', 'Housekeeping'].map((bullet) => (
                  <li key={bullet} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#7A8B7B] shrink-0" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={scrollToContact}
              className="w-full py-3 rounded-full border border-[#E6E0D6] bg-[#FAF7F2] hover:bg-[#C87D65] hover:text-white hover:border-[#C87D65] text-[#2C2623] text-xs font-semibold tracking-wide transition-all shadow-sm"
            >
              Check Availability
            </button>
          </PerspectiveCard>

          {/* Card 2 */}
          <PerspectiveCard
            maxTilt={12}
            className="p-7 rounded-3xl bg-[#FFFDF9] border border-[#E6E0D6] shadow-sm flex flex-col justify-between space-y-6 hover:shadow-lg transition-all"
          >
            <div className="space-y-4">
              <div className="space-y-1.5">
                <h3 className="font-editorial text-xl sm:text-2xl font-bold text-[#2C2623] whitespace-nowrap tracking-tight">
                  Nirvana Plus
                </h3>
                <p className="text-xs sm:text-sm font-medium text-[#6E655F] line-clamp-2 min-h-[2.5rem] leading-snug">
                  Attached Balcony + Non-Attached Washroom
                </p>
              </div>
              <div className="text-2xl font-bold text-[#2C2623]">
                ₹21,999 <span className="text-xs font-normal text-[#6E655F]">/ bed / month</span>
              </div>
              <ul className="space-y-2.5 text-xs text-[#6E655F] pt-2">
                {['Fully furnished room', 'Attached private balcony', 'Air conditioning', 'Shared / non-attached washroom', 'Housekeeping'].map((bullet) => (
                  <li key={bullet} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#7A8B7B] shrink-0" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={scrollToContact}
              className="w-full py-3 rounded-full border border-[#E6E0D6] bg-[#FAF7F2] hover:bg-[#C87D65] hover:text-white hover:border-[#C87D65] text-[#2C2623] text-xs font-semibold tracking-wide transition-all shadow-sm"
            >
              Check Availability
            </button>
          </PerspectiveCard>

          {/* Card 3 (Highlighted Warm Premium Card) */}
          <PerspectiveCard
            maxTilt={12}
            className="p-7 rounded-3xl bg-[#2C2623] text-white border-2 border-[#C9A45B] shadow-xl flex flex-col justify-between space-y-6 relative overflow-hidden"
          >
            <div className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-editorial text-xl sm:text-2xl font-bold text-[#FFFDF9] whitespace-nowrap tracking-tight">
                    Nirvana Prime
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#C9A45B] text-[#2C2623] text-[10px] font-bold uppercase tracking-wider shrink-0">
                    Popular
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-medium text-[#FAF7F2]/80 line-clamp-2 min-h-[2.5rem] leading-snug">
                  Attached Washroom + Balcony
                </p>
              </div>
              <div className="text-2xl font-bold text-[#FFFDF9]">
                ₹24,999 <span className="text-xs font-normal text-[#FAF7F2]/75">/ bed / month</span>
              </div>
              <ul className="space-y-2.5 text-xs text-[#FAF7F2]/90 pt-2">
                {['Fully furnished room', 'Attached washroom', 'Attached balcony', 'Air conditioning', 'Housekeeping'].map((bullet) => (
                  <li key={bullet} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C9A45B] shrink-0" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={scrollToContact}
              className="w-full py-3 rounded-full bg-[#C87D65] hover:bg-[#B56A52] text-white text-xs font-semibold tracking-wide transition-all shadow-md"
            >
              Check Availability
            </button>
          </PerspectiveCard>

          {/* Card 4 (Highlighted Warm Premium Card) */}
          <PerspectiveCard
            maxTilt={12}
            className="p-7 rounded-3xl bg-[#2C2623] text-white border-2 border-[#C9A45B] shadow-xl flex flex-col justify-between space-y-6 relative overflow-hidden"
          >
            <div className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-editorial text-xl sm:text-2xl font-bold text-[#FFFDF9] whitespace-nowrap tracking-tight">
                    Nirvana Elite
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#C9A45B] text-[#2C2623] text-[10px] font-bold uppercase tracking-wider shrink-0">
                    Executive
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-medium text-[#FAF7F2]/80 line-clamp-2 min-h-[2.5rem] leading-snug">
                  Master Bedroom + Attached Washroom
                </p>
              </div>
              <div className="text-2xl font-bold text-[#FFFDF9]">
                ₹24,999 <span className="text-xs font-normal text-[#FAF7F2]/75">/ bed / month</span>
              </div>
              <ul className="space-y-2.5 text-xs text-[#FAF7F2]/90 pt-2">
                {['Master bedroom category', 'Attached washroom', 'Fully furnished', 'Air conditioning', 'Housekeeping'].map((bullet) => (
                  <li key={bullet} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C9A45B] shrink-0" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={scrollToContact}
              className="w-full py-3 rounded-full bg-[#C87D65] hover:bg-[#B56A52] text-white text-xs font-semibold tracking-wide transition-all shadow-md"
            >
              Check Availability
            </button>
          </PerspectiveCard>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 6: REFERRAL REWARDS BANNER */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PerspectiveCard
          maxTilt={6}
          scale={1.01}
          className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#F3EFE6] via-[#FAF7F2] to-[#F4E6DF] border border-[#E6E0D6] shadow-sm flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-[#7A8B7B] inline-flex items-center gap-1.5">
              <Gift className="w-3.5 h-3.5" />
              <span>REFERRAL REWARDS</span>
            </span>
            <h2 className="font-editorial text-2xl sm:text-4xl font-bold text-[#2C2623]">
              Share NIRVANA. Earn ₹3,000.
            </h2>
            <p className="text-sm text-[#6E655F] max-w-xl">
              Refer a friend for a minimum 6-month stay and receive a ₹3,000 referral reward.
            </p>
          </div>

          <a
            href="https://wa.me/919096166306?text=Hi%20NIRVANA%20Stays%2C%20I%20would%20like%20to%20refer%20someone%20for%20a%20stay."
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 rounded-full bg-[#C87D65] hover:bg-[#B56A52] text-white text-sm font-semibold tracking-wide transition-all shadow-md hover:scale-105 shrink-0 flex items-center gap-2"
          >
            <span>Refer Someone</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </PerspectiveCard>
      </section>

      {/* ============================================================== */}
      {/* SECTION 7: AMENITIES (#amenities) */}
      {/* ============================================================== */}
      <section id="amenities" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: Full height kitchen showcase image */}
          <div className="lg:col-span-5 h-[480px] lg:h-[580px]">
            <PerspectiveCard
              maxTilt={9}
              className="w-full h-full rounded-3xl overflow-hidden shadow-lg border border-[#E6E0D6] relative group"
            >
              <img referrerPolicy="no-referrer"
                src={getAssetUrl('assets/kitchen-premium.jpeg')}
                alt="Fully equipped NIRVANA kitchen"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2C2623]/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <span className="text-xs uppercase tracking-wider text-[#C9A45B] font-semibold">
                  Kitchen Showcase
                </span>
                <h4 className="font-editorial text-xl font-bold">
                  Fully equipped NIRVANA kitchen
                </h4>
              </div>
            </PerspectiveCard>
          </div>

          {/* Right: Content & 12-Item clean pill grid */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <span className="text-xs font-bold tracking-widest uppercase text-[#7A8B7B]">
                EVERYTHING YOU NEED
              </span>
              <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C2623] leading-tight">
                More than a room. A complete living experience.
              </h2>
            </div>

            {/* 12-Item Clean Pill/Grid List */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
              {amenitiesList.map((item) => (
                <div
                  key={item.name}
                  className="p-3.5 rounded-2xl bg-[#FFFDF9] border border-[#E6E0D6] flex items-center gap-3 shadow-sm hover:border-[#C87D65] transition-colors"
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-xs sm:text-sm font-medium text-[#2C2623]">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* ============================================================== */}
      {/* SECTION 8: GALLERY (#gallery) */}
      {/* ============================================================== */}
      {/* ============================================================== */}
      {/* SECTION 8: GALLERY (#gallery) */}
      {/* ============================================================== */}
      <section id="gallery" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold tracking-widest uppercase text-[#7A8B7B]">
            CURATED GALLERY & SPACES
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C2623]">
            See what living at NIRVANA feels like.
          </h2>
          <p className="text-sm sm:text-base text-[#6E655F]">
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
      {/* SECTION 9: WHY NIRVANA (#why) */}
      {/* ============================================================== */}
      <section id="why" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold tracking-widest uppercase text-[#7A8B7B]">
            WHY NIRVANA
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C2623]">
            Live better. Stay NIRVANA.
          </h2>
        </div>

        {/* 5 Minimal Cards in a single row on desktop - Equal Dimensions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 items-stretch">
          {whyNirvanaPoints.map((point) => (
            <PerspectiveCard
              key={point.num}
              maxTilt={12}
              containerClassName="h-full flex flex-col"
              className="p-6 rounded-3xl bg-[#FFFDF9] border border-[#E6E0D6] shadow-sm hover:shadow-lg transition-all flex flex-col justify-between h-full space-y-3"
            >
              <div className="space-y-2">
                <span className="font-editorial text-2xl font-bold text-[#C87D65]">
                  {point.num}
                </span>
                <h3 className="font-editorial text-lg font-bold text-[#2C2623] min-h-[3rem] flex items-center">
                  {point.title}
                </h3>
              </div>
              <p className="text-xs text-[#6E655F] leading-relaxed mt-auto pt-2">
                {point.desc}
              </p>
            </PerspectiveCard>
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 10: FAQ & ANNUAL BONUS (#faq) */}
      {/* ============================================================== */}
      <section id="faq" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold tracking-widest uppercase text-[#7A8B7B]">
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C2623]">
            Everything You Need to Know
          </h2>
          <p className="text-sm text-[#6E655F] max-w-xl mx-auto">
            Clear, transparent answers about our Viman Nagar community, amenities, and annual residency benefits.
          </p>
        </div>

        {/* 12-Month Lock-In Bonus Section */}
        <PerspectiveCard
          maxTilt={5}
          scale={1.01}
          className="p-8 sm:p-10 lg:p-12 rounded-3xl bg-gradient-to-br from-[#2C2623] via-[#3A2F2A] to-[#201A18] text-white border-2 border-[#C9A45B] shadow-xl relative overflow-hidden"
        >
          {/* Subtle Ambient Radial Glows */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[#C87D65]/25 blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-[#C9A45B]/20 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C9A45B]/20 border border-[#C9A45B]/40 text-[#C9A45B] text-xs font-bold tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Special Residency Bonus</span>
              </div>

              <h3 className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-bold text-[#FFFDF9] leading-tight">
                Lock-In for 12 Months, Get <span className="text-[#C9A45B]">1 Month Complimentary</span>
              </h3>

              <p className="text-xs sm:text-sm text-[#FAF7F2]/85 leading-relaxed">
                Commit to a 12-month tenure at NIRVANA Stays and enjoy your 12th month completely free of charge. Stay for a full year while paying rent for only 11 months—including high-speed fiber Wi-Fi, air conditioning, regular housekeeping, fully equipped kitchen, and community amenities.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs text-[#FAF7F2]/90">
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-2 rounded-xl">
                  <CheckCircle2 className="w-4 h-4 text-[#C9A45B] shrink-0" />
                  <span className="font-medium">1 Month Free</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-2 rounded-xl">
                  <CheckCircle2 className="w-4 h-4 text-[#C9A45B] shrink-0" />
                  <span className="font-medium">Zero Brokerage</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-2 rounded-xl">
                  <CheckCircle2 className="w-4 h-4 text-[#C9A45B] shrink-0" />
                  <span className="font-medium">Rent Lock</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-2 rounded-xl">
                  <CheckCircle2 className="w-4 h-4 text-[#C9A45B] shrink-0" />
                  <span className="font-medium">All Inclusions</span>
                </div>
              </div>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto">
              <button
                onClick={() =>
                  handleWhatsAppDirect(
                    'Hi NIRVANA Stays, I would like to lock-in for 12 months and claim the 1-month complimentary stay bonus. Please share available rooms.'
                  )
                }
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#C87D65] hover:bg-[#B56A52] text-white text-xs font-semibold tracking-wide transition-all shadow-md flex items-center justify-center gap-2 hover:scale-[1.02]"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Claim 12-Month Bonus</span>
              </button>

              <button
                onClick={scrollToContact}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 text-white text-xs font-semibold tracking-wide transition-all flex items-center justify-center gap-2"
              >
                <span>Schedule a Walkthrough</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </PerspectiveCard>

        {/* All Questions & Answers Openly Visible at Once */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {faqs.map((faq, index) => (
            <div
              key={faq.q}
              className="p-6 sm:p-7 rounded-3xl border border-[#E6E0D6] bg-[#FFFDF9] shadow-sm flex flex-col justify-start space-y-3 hover:border-[#C87D65]/40 hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-3">
                <span className="w-7 h-7 rounded-xl bg-[#FAF7F2] text-[#C87D65] border border-[#E6E0D6] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  0{index + 1}
                </span>
                <h3 className="font-editorial text-lg sm:text-xl font-bold text-[#2C2623] leading-snug">
                  {faq.q}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#6E655F] leading-relaxed pl-10">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 11: BOOK A VISIT & INTERACTIVE MAP (#contact) */}
      {/* ============================================================== */}
      <section id="contact" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold tracking-widest uppercase text-[#7A8B7B]">
            BOOK A VISIT & CONTACT
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C2623]">
            Schedule Your Visit Today
          </h2>
          <p className="text-sm text-[#6E655F]">
            Walk into our Shubh Gateway office or send us a visit inquiry below.
          </p>
        </div>

        {/* 2-Column Split: Booking Form on Left, Location Details & Quick WhatsApp on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Clean Booking Form - Static, No 3D Tilt */}
          <div className="lg:col-span-7">
            <BookingVisitForm />
          </div>

          {/* Right Column: Contact Details, WhatsApp Concierge, and Quick Routing */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-[#F3EFE6] border border-[#E6E0D6] space-y-6 shadow-sm">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#7A8B7B]">
                  DIRECT CONCIERGE
                </span>
                <h3 className="font-editorial text-2xl font-bold text-[#2C2623]">
                  Talk Directly with NIRVANA Stays
                </h3>
                <p className="text-xs sm:text-sm text-[#6E655F]">
                  Need immediate confirmation or photos? Reach out to our Pune management team.
                </p>
              </div>

              <div className="space-y-4 pt-2">
                <a
                  href="https://wa.me/919096166306"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-6 rounded-full bg-[#C87D65] hover:bg-[#B56A52] text-white text-sm font-semibold tracking-wide transition-all shadow-md flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp: +91 90961 66306</span>
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href="tel:+919096166306"
                  className="w-full py-3.5 px-6 rounded-full bg-[#FFFDF9] hover:bg-[#FAF7F2] border border-[#E6E0D6] text-[#2C2623] text-sm font-semibold tracking-wide transition-all flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#C87D65]" />
                    <span>Phone: +91 90961 66306</span>
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#6E655F]" />
                </a>
              </div>

              <div className="pt-4 border-t border-[#E6E0D6] space-y-3 text-xs text-[#6E655F]">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#C87D65] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#2C2623] block">Campus Headquarters & Visits</span>
                    <p>First floor, Shubh Gateway, Shop number 116, society, opp. to Symbiosis Law School, Survey Number 235, Mhada Colony, Pune, Maharashtra 411032</p>
                    <span className="inline-block mt-1 font-mono text-[11px] text-[#C87D65] bg-[#FAF7F2] px-2 py-0.5 rounded border border-[#E6E0D6]">Plus Code: HWG5+62</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-[#7A8B7B] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#2C2623] block">Visit Timings</span>
                    <p>Daily: 9:30 AM to 8:30 PM (Walk-ins welcomed)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dedicated Interactive Google Maps Section for Contact / Viman Nagar precise coordinates */}
        <div className="pt-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#7A8B7B]">
                GEOGRAPHIC LOCATION
              </span>
              <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#2C2623]">
                NIRVANA Stays on Google Maps
              </h3>
            </div>
            <p className="text-xs text-[#6E655F]">
              Directly on Sunset Blvd, opposite Symbiosis Law School (SLS), Viman Nagar, Pune
            </p>
          </div>

          <NirvanaLocationMap
            defaultCenter={NIRVANA_STATIC_CENTER}
            defaultZoom={17}
            height="500px"
          />
        </div>
      </section>
    </div>
  );
};
