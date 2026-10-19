import React, { useState } from 'react';
import { Sparkles, Home } from 'lucide-react';
import { PerspectiveCard } from './PerspectiveCard.tsx';

interface FallbackImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: '16/9' | '4/3' | '1/1' | 'auto';
  perspective?: boolean;
  perspectiveMaxTilt?: number;
}

export const FallbackImage: React.FC<FallbackImageProps> = ({
  src,
  alt,
  className = '',
  aspectRatio = 'auto',
  perspective = false,
  perspectiveMaxTilt = 14,
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const imageContent = hasError ? (
    <div
      className={`relative overflow-hidden bg-gradient-to-br from-[#F3EFE6] via-[#FAF7F2] to-[#F4E6DF] flex flex-col items-center justify-center p-6 text-center border border-[#E6E0D6] ${className}`}
      style={aspectRatio !== 'auto' ? { aspectRatio } : undefined}
    >
      <div className="w-12 h-12 rounded-full bg-[#FFFDF9] shadow-sm flex items-center justify-center text-[#C87D65] mb-2 border border-[#E6E0D6]">
        <Home className="w-6 h-6 stroke-[1.5]" />
      </div>
      <p className="font-editorial text-[#2C2623] text-sm font-semibold max-w-xs">{alt}</p>
      <span className="text-[11px] text-[#6E655F] mt-1 flex items-center gap-1">
        <Sparkles className="w-3 h-3 text-[#7A8B7B]" /> Nirvana Stays Sanctuary
      </span>
    </div>
  ) : (
    <div
      className={`relative overflow-hidden bg-[#F3EFE6] ${className}`}
      style={aspectRatio !== 'auto' ? { aspectRatio } : undefined}
    >
      {!isLoaded && (
        <div className="absolute inset-0 bg-[#F3EFE6] animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-[#C87D65] border-t-transparent animate-spin opacity-40" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );

  if (perspective) {
    return (
      <PerspectiveCard
        maxTilt={perspectiveMaxTilt}
        scale={1.03}
        glare={true}
        glareOpacity={0.3}
        containerClassName="w-full h-full"
        className="w-full h-full rounded-[inherit] overflow-hidden"
      >
        {imageContent}
      </PerspectiveCard>
    );
  }

  return imageContent;
};
