import React from 'react';
import { Sparkles, ShieldCheck, Heart, Users, Coffee, Music, BookOpen, SunMedium, CheckCircle, ArrowRight } from 'lucide-react';
import { PageRoute } from '../types.ts';
import { FallbackImage } from '../components/FallbackImage.tsx';
import { PerspectiveCard } from '../components/PerspectiveCard.tsx';

interface AboutViewProps {
  onNavigate: (route: PageRoute) => void;
  onOpenEnquire: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate, onOpenEnquire }) => {
  return (
    <div className="space-y-24 pb-20">
      {/* Header Banner */}
      <section className="pt-12 sm:pt-16 pb-8 text-center max-w-3xl mx-auto px-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#7A8B7B]">
          The Philosophy Behind Nirvana Stays
        </span>
        <h1 className="font-editorial text-4xl sm:text-5xl font-semibold text-[#2C2623] mt-2 leading-tight">
          Where Architecture Honors Peace of Mind.
        </h1>
        <p className="text-sm sm:text-base text-[#6E655F] mt-4 leading-relaxed">
          Born in Pune out of a simple observation: students and young professionals were forced to choose between depressing, run-down hostels and overpriced, isolating apartments. We built Nirvana Stays to be the third, peaceful alternative.
        </p>
      </section>

      {/* Story Split Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <PerspectiveCard
              maxTilt={13}
              scale={1.03}
              glare={true}
              glareOpacity={0.25}
              depth={22}
              className="w-full"
            >
              <div className="rounded-3xl overflow-hidden border border-[#E6E0D6] shadow-xl aspect-[4/3] bg-[#F3EFE6]">
                <FallbackImage
                  src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80"
                  alt="Cozy Community Lounge at Nirvana Stays"
                  className="w-full h-full object-cover"
                />
              </div>
            </PerspectiveCard>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#C87D65]">
              Our Founding Story
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-semibold text-[#2C2623]">
              The Antidote to Urban Housing Chaos in Pune
            </h2>
            <div className="space-y-4 text-sm text-[#6E655F] leading-relaxed">
              <p>
                In 2022, our founding team—consisting of hospitality architects and Pune university alumni—spent six months interviewing over 200 students from Symbiosis, design scholars, and tech associates in Viman Nagar and Kalyani Nagar.
              </p>
              <p>
                The stories were uniform: landlords demanding huge upfront cash deposits, arbitrary utility bills, broken plumbing that took weeks to repair, and an utter lack of ergonomic workspaces. Most devastatingly, residents felt a pervasive loneliness behind locked apartment doors.
              </p>
              <p>
                Nirvana Stays was conceived as a true sanctuary ("Nirvana"). We eliminated every single pain point: zero brokerage, all-inclusive transparent monthly plans, circadian-conscious interior architecture, and shared spaces designed for authentic, pressure-free connection.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <PerspectiveCard maxTilt={10} scale={1.02} glare={true} glareOpacity={0.18} containerClassName="h-full" className="h-full">
            <div className="p-8 sm:p-10 rounded-3xl bg-[#FFFDF9] border border-[#E6E0D6] shadow-sm space-y-4 h-full">
              <div className="w-12 h-12 rounded-2xl bg-[#F4E6DF] text-[#C87D65] flex items-center justify-center">
                <SunMedium className="w-6 h-6 stroke-[1.75]" />
              </div>
              <h3 className="font-editorial text-2xl font-semibold text-[#2C2623]">Our Mission</h3>
              <p className="text-sm text-[#6E655F] leading-relaxed">
                To craft human-centric, aesthetically serene living spaces in India’s leading educational and technology hubs where young minds can rest deeply, work without distraction, and cultivate lasting lifelong friendships.
              </p>
            </div>
          </PerspectiveCard>

          <PerspectiveCard maxTilt={10} scale={1.02} glare={true} glareOpacity={0.18} containerClassName="h-full" className="h-full">
            <div className="p-8 sm:p-10 rounded-3xl bg-[#FFFDF9] border border-[#E6E0D6] shadow-sm space-y-4 h-full">
              <div className="w-12 h-12 rounded-2xl bg-[#F3EFE6] text-[#7A8B7B] flex items-center justify-center">
                <Heart className="w-6 h-6 stroke-[1.75]" />
              </div>
              <h3 className="font-editorial text-2xl font-semibold text-[#2C2623]">Our Vision</h3>
              <p className="text-sm text-[#6E655F] leading-relaxed">
                To become the benchmark for managed accommodation across Maharashtra—proven by resident well-being metrics, landlord partner trust, zero hidden costs, and spaces that feel deeply restorative from the instant you step inside.
              </p>
            </div>
          </PerspectiveCard>
        </div>
      </section>

      {/* Community Life Section */}
      <section className="bg-[#F3EFE6] py-20 border-y border-[#E6E0D6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#7A8B7B]">
              Life at Nirvana
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-semibold text-[#2C2623] mt-1">
              Community Without the Noise
            </h2>
            <p className="text-xs sm:text-sm text-[#6E655F] mt-2">
              We host experiences that enrich your life, leaving participation completely effortless and pressure-free.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#E6E0D6] space-y-3">
              <Coffee className="w-6 h-6 text-[#C87D65]" />
              <h4 className="font-editorial text-lg font-semibold text-[#2C2623]">Community Brunches</h4>
              <p className="text-xs text-[#6E655F] leading-relaxed">
                Sunday morning pancake and avocado toast bars prepared by guest chefs in our communal kitchens.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#E6E0D6] space-y-3">
              <Music className="w-6 h-6 text-[#7A8B7B]" />
              <h4 className="font-editorial text-lg font-semibold text-[#2C2623]">Acoustic Rooftop Nights</h4>
              <p className="text-xs text-[#6E655F] leading-relaxed">
                Intimate acoustic sessions, open-mic poetry, and ambient music under fairy lights and Pune breezes.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#E6E0D6] space-y-3">
              <Users className="w-6 h-6 text-[#C87D65]" />
              <h4 className="font-editorial text-lg font-semibold text-[#2C2623]">Masterclasses & Mixers</h4>
              <p className="text-xs text-[#6E655F] leading-relaxed">
                Resume workshops, product design teardowns, and networking sessions with Pune startup founders.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#E6E0D6] space-y-3">
              <BookOpen className="w-6 h-6 text-[#7A8B7B]" />
              <h4 className="font-editorial text-lg font-semibold text-[#2C2623]">Silent Study Circles</h4>
              <p className="text-xs text-[#6E655F] leading-relaxed">
                Pomodoro study blocks during Symbiosis semester exams with complimentary herbal tea and quiet focus zones.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Safety & Hygiene Promise */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#FFFDF9] border border-[#E6E0D6] shadow-sm">
          <div className="max-w-3xl space-y-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#C87D65]">
              Uncompromising Standards
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-semibold text-[#2C2623]">
              The Nirvana Safety & Hygiene Promise
            </h2>
            <p className="text-sm text-[#6E655F] leading-relaxed">
              We treat the safety and health of our residents with the gravity of family. Our residences are equipped with hospitality-grade protocols audited every month.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#7A8B7B] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold text-[#2C2623]">3-Tier Biometric Security</h4>
                  <p className="text-xs text-[#6E655F] mt-0.5">Turnstiles, perimeter CCTV cameras, and personal suite digital locks.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#7A8B7B] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold text-[#2C2623]">Hospitality Sanitization</h4>
                  <p className="text-xs text-[#6E655F] mt-0.5">Daily room sweeping and bi-weekly medical-grade bathroom disinfection.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#7A8B7B] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold text-[#2C2623]">24/7 On-Site Wardens & Managers</h4>
                  <p className="text-xs text-[#6E655F] mt-0.5">Trained staff residing on premises for immediate emergency assistance.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#7A8B7B] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold text-[#2C2623]">Strict Visitor Protocols</h4>
                  <p className="text-xs text-[#6E655F] mt-0.5">Digital check-ins for parents & friends, ensuring safety at all hours.</p>
                </div>
              </div>
            </div>

            <div className="pt-4 flex gap-4">
              <button
                onClick={onOpenEnquire}
                className="px-6 py-3 rounded-full bg-[#C87D65] hover:bg-[#B26B54] text-white text-xs font-semibold tracking-wide transition-colors"
              >
                Schedule an In-Person Tour
              </button>
              <button
                onClick={() => onNavigate('properties')}
                className="px-6 py-3 rounded-full border border-[#2C2623] text-xs font-semibold text-[#2C2623] hover:bg-[#F3EFE6] transition-colors"
              >
                Explore Residences
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
