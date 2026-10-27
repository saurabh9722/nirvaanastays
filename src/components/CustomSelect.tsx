import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, Sparkles } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
  title?: string;
  subtitle?: string;
  price?: string;
  badge?: string;
}

export interface CustomSelectProps {
  id?: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: (SelectOption | string)[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  buttonClassName?: string;
  dropdownClassName?: string;
  error?: boolean;
  size?: 'sm' | 'md';
  /**
   * Only enable sideways marquee scrolling on specific complex fields (e.g. Room Tier).
   * Standard selects like Accommodation Preference & Preferred Property remain static.
   */
  enableMarquee?: boolean;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  id,
  name,
  value,
  onChange,
  options,
  placeholder = 'Select an option',
  disabled = false,
  className = '',
  buttonClassName = '',
  dropdownClassName = '',
  error = false,
  size = 'md',
  enableMarquee = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Normalize options to SelectOption format
  const normalizedOptions: SelectOption[] = options.map((opt) => {
    if (typeof opt === 'string') {
      return { value: opt, label: opt };
    }
    return opt;
  });

  const selectedOption = normalizedOptions.find((opt) => opt.value === value);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Handle keyboard interaction
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen((prev) => !prev);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
      } else {
        const currentIndex = normalizedOptions.findIndex((opt) => opt.value === value);
        if (currentIndex < normalizedOptions.length - 1) {
          onChange(normalizedOptions[currentIndex + 1].value);
        }
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
      } else {
        const currentIndex = normalizedOptions.findIndex((opt) => opt.value === value);
        if (currentIndex > 0) {
          onChange(normalizedOptions[currentIndex - 1].value);
        }
      }
    }
  };

  const isSmall = size === 'sm';

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${className}`}
      onKeyDown={handleKeyDown}
    >
      {/* Hidden native input so standard form serialization / Web3Forms gets the field */}
      <input type="hidden" name={name} value={value} />

      {/* Styled Dropdown Trigger Button */}
      <button
        id={id}
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`w-full flex items-center justify-between text-left transition-all font-sans ${
          isSmall
            ? 'px-3 py-2 rounded-xl text-xs'
            : 'px-4 py-2.5 sm:py-3 rounded-2xl text-sm'
        } bg-[#FFFDF9] dark:bg-[#071930] border text-[#0B213F] dark:text-[#E5D9C4] hover:border-[#C87D65]/60 focus:outline-none focus:border-[#C87D65] focus:ring-1 focus:ring-[#C87D65]/30 disabled:opacity-60 disabled:cursor-not-allowed ${
          error
            ? 'border-red-400 dark:border-red-500'
            : 'border-[#0B213F]/15 dark:border-[#E5D9C4]/20'
        } ${isOpen ? 'border-[#C87D65] dark:border-[#C87D65] ring-1 ring-[#C87D65]/25' : ''} ${buttonClassName} ${enableMarquee ? 'group' : ''}`}
      >
        <div className="flex-1 min-w-0 pr-2 overflow-hidden">
          {selectedOption ? (
            enableMarquee ? (
              <div className="select-marquee-wrapper relative w-full overflow-hidden whitespace-nowrap">
                <div className="select-marquee-content inline-flex items-center gap-1.5 whitespace-nowrap text-xs sm:text-sm font-medium">
                  {selectedOption.title && selectedOption.price ? (
                    <>
                      <span className="font-bold text-[#0B213F] dark:text-[#E5D9C4] shrink-0">
                        {selectedOption.title}
                      </span>
                      {selectedOption.subtitle && (
                        <span className="text-[#0B213F]/75 dark:text-[#E5D9C4]/75 shrink-0 font-normal">
                          · {selectedOption.subtitle}
                        </span>
                      )}
                      <span className="font-bold text-[#C87D65] shrink-0">
                        · {selectedOption.price}
                      </span>
                    </>
                  ) : (
                    <span className="text-[#0B213F] dark:text-[#E5D9C4]">
                      {selectedOption.label}
                    </span>
                  )}
                </div>
              </div>
            ) : (
              <span className="block truncate text-[#0B213F] dark:text-[#E5D9C4] font-medium leading-snug">
                {selectedOption.label}
              </span>
            )
          ) : (
            <span className="text-[#0B213F]/50 dark:text-[#E5D9C4]/50 font-normal truncate block">
              {placeholder}
            </span>
          )}
        </div>
        <ChevronDown
          className={`${isSmall ? 'w-3.5 h-3.5' : 'w-4 h-4'} text-[#C87D65] shrink-0 ml-1 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Custom Floating Options Panel - Fits container width, strictly no modal overflow */}
      {isOpen && (
        <div
          role="listbox"
          tabIndex={-1}
          className={`absolute left-0 right-0 w-full top-full mt-1.5 z-50 bg-[#FFFDF9] dark:bg-[#0B213F] border border-[#0B213F]/20 dark:border-[#E5D9C4]/30 rounded-2xl shadow-2xl p-1.5 sm:p-2 max-h-64 overflow-y-auto overflow-x-hidden space-y-1 animate-in fade-in zoom-in-95 duration-150 font-sans ${dropdownClassName}`}
        >
          {normalizedOptions.map((opt) => {
            const isSelected = opt.value === value;
            const hasRichDetails = Boolean(opt.title && opt.price);

            return (
              <div
                key={opt.value}
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between cursor-pointer rounded-xl p-2.5 transition-colors ${
                  enableMarquee ? 'group/option' : ''
                } ${
                  isSelected
                    ? 'bg-[#E5D9C4]/40 dark:bg-[#133463] text-[#0B213F] dark:text-[#E5D9C4] ring-1 ring-[#C87D65]/40'
                    : 'text-[#0B213F] dark:text-[#E5D9C4] hover:bg-[#E5D9C4]/20 dark:hover:bg-[#0E294E]'
                }`}
              >
                <div className="flex-1 min-w-0 pr-1.5 overflow-hidden">
                  {enableMarquee ? (
                    hasRichDetails ? (
                      <div className="select-item-marquee-wrapper relative w-full overflow-hidden whitespace-nowrap">
                        <div className="select-item-marquee-track inline-flex items-center gap-1.5 whitespace-nowrap text-xs sm:text-sm font-medium">
                          <span className="font-bold text-[#0B213F] dark:text-[#E5D9C4] shrink-0">
                            {opt.title}
                          </span>
                          {opt.badge && (
                            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-[#C87D65] text-white shrink-0">
                              <Sparkles className="w-2.5 h-2.5 fill-white" />
                              <span>{opt.badge}</span>
                            </span>
                          )}
                          {opt.subtitle && (
                            <span className="text-[#0B213F]/75 dark:text-[#E5D9C4]/75 shrink-0 font-normal">
                              · {opt.subtitle}
                            </span>
                          )}
                          <span className="font-bold text-xs text-[#C87D65] bg-[#C87D65]/10 px-2 py-0.5 rounded-full shrink-0">
                            · {opt.price}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="select-item-marquee-wrapper relative w-full overflow-hidden whitespace-nowrap">
                        <div className="select-item-marquee-track inline-block whitespace-nowrap text-xs sm:text-sm font-medium text-[#0B213F] dark:text-[#E5D9C4]">
                          {opt.label}
                        </div>
                      </div>
                    )
                  ) : (
                    <span className="text-xs sm:text-sm font-medium block text-[#0B213F] dark:text-[#E5D9C4] truncate">
                      {opt.label}
                    </span>
                  )}
                </div>

                {isSelected && (
                  <div className="shrink-0 pl-1">
                    <Check className="w-4 h-4 text-[#C87D65]" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
