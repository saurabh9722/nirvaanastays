import React from 'react';
import { X, Clock, Calendar, Share2, Sparkles } from 'lucide-react';
import { BlogPost } from '../types.ts';
import { FallbackImage } from './FallbackImage.tsx';

interface ArticleModalProps {
  post: BlogPost | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenEnquire: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  post,
  isOpen,
  onClose,
  onOpenEnquire,
}) => {
  if (!isOpen || !post) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#FFFDF9] rounded-2xl border border-[#E6E0D6] shadow-2xl p-6 sm:p-10"
        role="dialog"
        aria-modal="true"
        aria-labelledby="article-reader-title"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#6E655F] hover:text-[#2C2623] hover:bg-[#F3EFE6] transition-colors"
          aria-label="Close article"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Metadata */}
        <div className="flex items-center gap-2 text-xs text-[#7A8B7B] font-medium mb-2">
          <span>{post.category}</span>
          <span>·</span>
          <span className="flex items-center gap-1 text-[#6E655F]">
            <Clock className="w-3.5 h-3.5" /> {post.readTime}
          </span>
          <span>·</span>
          <span className="text-[#6E655F]">{post.date}</span>
        </div>

        <h1 id="article-reader-title" className="font-editorial text-2xl sm:text-4xl font-semibold text-[#2C2623] leading-tight">
          {post.title}
        </h1>

        {/* Author */}
        <div className="flex items-center gap-3 my-6 pb-6 border-b border-[#E6E0D6]">
          <div className="w-11 h-11 rounded-full overflow-hidden border border-[#E6E0D6]">
            <FallbackImage src={post.author.avatar} alt={post.author.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-sm font-semibold text-[#2C2623]">{post.author.name}</p>
            <p className="text-xs text-[#6E655F]">{post.author.role}</p>
          </div>
        </div>

        {/* Hero image */}
        <div className="rounded-2xl overflow-hidden aspect-[16/9] mb-8 border border-[#E6E0D6]">
          <FallbackImage src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
        </div>

        {/* Body content */}
        <div className="space-y-5 text-sm sm:text-base text-[#2C2623] leading-relaxed">
          {post.content.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>

        {/* Callout box */}
        <div className="my-8 p-6 rounded-2xl bg-[#F4E6DF]/60 border border-[#E6E0D6] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h4 className="font-editorial text-lg font-semibold text-[#2C2623]">Experience Nirvaana in Person</h4>
            <p className="text-xs text-[#6E655F] mt-1">
              Visit our residences in Viman Nagar, Kalyani Nagar, or Koregaon Park.
            </p>
          </div>
          <button
            onClick={() => {
              onClose();
              onOpenEnquire();
            }}
            className="px-5 py-2.5 bg-[#C87D65] hover:bg-[#B26B54] text-white rounded-xl text-xs font-semibold shrink-0 transition-colors shadow-sm"
          >
            Schedule a Visit
          </button>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-[#E6E0D6] flex justify-between items-center text-xs text-[#6E655F]">
          <span>NIRVAANA Stays Pune Editorial Collection</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#FAF7F2] hover:bg-[#F3EFE6] text-[#2C2623] font-medium border border-[#E6E0D6]"
          >
            Back to Articles
          </button>
        </div>
      </div>
    </div>
  );
};
