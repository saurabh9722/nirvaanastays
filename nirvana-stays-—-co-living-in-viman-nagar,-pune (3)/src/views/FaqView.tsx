import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, HelpCircle, MessageSquare, Phone } from 'lucide-react';
import { PageRoute } from '../types.ts';
import { FAQS } from '../data/mockData.ts';

interface FaqViewProps {
  onNavigate: (route: PageRoute) => void;
  onOpenEnquire: () => void;
}

const CATEGORIES = [
  'All Categories',
  'Booking & Deposits',
  'Bills & Inclusions',
  'House Rules & Security',
  'Room Swaps & Notice Period',
] as const;

export const FaqView: React.FC<FaqViewProps> = ({ onNavigate, onOpenEnquire }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Categories');
  const [searchQuery, setSearchQuery] = useState('');
  const [openIds, setOpenIds] = useState<string[]>(['faq-1', 'faq-3', 'faq-7']);

  const toggleAccordion = (id: string) => {
    if (openIds.includes(id)) {
      setOpenIds(openIds.filter((item) => item !== id));
    } else {
      setOpenIds([...openIds, id]);
    }
  };

  const filteredFaqs = useMemo(() => {
    return FAQS.filter((faq) => {
      const matchCat =
        selectedCategory === 'All Categories' || faq.category === selectedCategory;
      const matchSearch =
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="space-y-16 pb-20 pt-8">
      {/* Header */}
      <section className="text-center max-w-3xl mx-auto px-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#7A8B7B]">
          Sub-Page 8B · Clarity & Transparency
        </span>
        <h1 className="font-editorial text-4xl sm:text-5xl font-semibold text-[#2C2623] mt-2 leading-tight">
          Frequently Asked Questions.
        </h1>
        <p className="text-sm sm:text-base text-[#6E655F] mt-3">
          Everything you need to know about contracts, deposits, utility inclusions, guest rules, and room swaps.
        </p>

        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto mt-8">
          <Search className="w-4 h-4 text-[#6E655F] absolute left-4 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions (e.g. deposit, kitchen, guests, notice period)..."
            className="w-full pl-11 pr-4 py-3 bg-[#FFFDF9] border border-[#E6E0D6] rounded-2xl text-xs sm:text-sm text-[#2C2623] placeholder-[#A09891] shadow-sm focus:outline-none focus:ring-1 focus:ring-[#C87D65]"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-[#C87D65] text-white shadow-sm'
                  : 'bg-[#FFFDF9] text-[#2C2623] border border-[#E6E0D6] hover:bg-[#F3EFE6]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Accordion List */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-3">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => {
              const isOpen = openIds.includes(faq.id);
              return (
                <div
                  key={faq.id}
                  className="rounded-2xl border border-[#E6E0D6] bg-[#FFFDF9] overflow-hidden shadow-sm transition-all"
                >
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 hover:bg-[#FAF7F2] transition-colors"
                    aria-expanded={isOpen}
                  >
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#7A8B7B] block">
                        {faq.category}
                      </span>
                      <h3 className="font-editorial text-lg sm:text-xl font-semibold text-[#2C2623]">
                        {faq.question}
                      </h3>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-[#6E655F] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#C87D65]' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 border-t border-[#E6E0D6]/60 text-xs sm:text-sm text-[#6E655F] leading-relaxed animate-fade-in">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="p-8 text-center bg-[#FFFDF9] rounded-2xl border border-[#E6E0D6]">
              <p className="text-sm text-[#6E655F]">
                No answers found matching "{searchQuery}". Try a different keyword or contact our resident care team directly.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Unanswered Questions Callout */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-3xl bg-[#F3EFE6] border border-[#E6E0D6] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-editorial text-xl font-semibold text-[#2C2623]">
              Still have a specific question?
            </h4>
            <p className="text-xs text-[#6E655F]">
              Our Viman Nagar operations manager is available 7 days a week on WhatsApp and call.
            </p>
          </div>

          <div className="flex gap-3 shrink-0">
            <a
              href="tel:+919096166306"
              className="px-5 py-2.5 rounded-xl border border-[#2C2623] text-xs font-semibold text-[#2C2623] hover:bg-[#FFFDF9] transition-colors flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5" /> +91 90961 66306
            </a>
            <button
              onClick={() => onNavigate('contact')}
              className="px-5 py-2.5 rounded-xl bg-[#C87D65] hover:bg-[#B26B54] text-white text-xs font-semibold tracking-wide transition-colors"
            >
              Send Us a Note
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
