import React from 'react';
import { X, MapPin } from 'lucide-react';
import { GalleryImage } from '../types.ts';
import { FallbackImage } from './FallbackImage.tsx';

interface LightboxModalProps {
  image: GalleryImage | null;
  isOpen: boolean;
  onClose: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({ image, isOpen, onClose }) => {
  if (!isOpen || !image) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <button
        onClick={onClose}
        className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
        aria-label="Close image viewer"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="max-w-4xl w-full flex flex-col items-center">
        <div className="w-full max-h-[75vh] rounded-2xl overflow-hidden border border-white/15 bg-black/40">
          <FallbackImage
            src={image.url}
            alt={image.title}
            className="w-full h-full max-h-[75vh] object-contain"
          />
        </div>

        <div className="mt-4 text-center">
          <span className="text-xs text-[#E6E0D6] uppercase tracking-wider font-mono">
            {image.category}
          </span>
          <h3 className="font-editorial text-2xl text-white font-medium mt-1">{image.title}</h3>
          <p className="text-xs text-[#FAF7F2]/70 mt-1 flex items-center justify-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-[#C87D65]" /> {image.property}
          </p>
        </div>
      </div>
    </div>
  );
};
