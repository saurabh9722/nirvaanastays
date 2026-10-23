import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
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
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Normalize options to { value, label } format
  const normalizedOptions: SelectOption[] = options.map((opt) =>
    typeof opt === 'string' ? { value: opt, label: opt } : opt
  );

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
        className={`w-full flex items-center justify-between text-left transition-all ${
          isSmall
            ? 'px-3 py-2 rounded-xl text-xs'
            : 'px-4 py-3 rounded-2xl text-sm'
        } bg-[#FAF7F2] border text-[#2C2623] hover:border-[#C87D65] focus:outline-none focus:border-[#C87D65] focus:ring-1 focus:ring-[#C87D65]/20 disabled:opacity-60 disabled:cursor-not-allowed ${
          error ? 'border-red-400' : 'border-[#E6E0D6]'
        } ${isOpen ? 'border-[#C87D65] ring-1 ring-[#C87D65]/20' : ''} ${buttonClassName}`}
      >
        <span className={`truncate ${!selectedOption && placeholder ? 'text-[#6E655F]/60' : 'text-[#2C2623]'}`}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={`${isSmall ? 'w-3.5 h-3.5' : 'w-4 h-4'} text-[#6E655F] shrink-0 ml-2 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-[#C87D65]' : ''
          }`}
        />
      </button>

      {/* Custom Floating Options Panel (Themed warm ivory / terracotta) */}
      {isOpen && (
        <div
          role="listbox"
          tabIndex={-1}
          className={`absolute left-0 right-0 top-full mt-1.5 z-50 bg-[#FFFDF9] border border-[#E6E0D6] rounded-2xl shadow-xl p-1.5 max-h-60 overflow-y-auto space-y-0.5 animate-in fade-in zoom-in-95 duration-100 ${dropdownClassName}`}
        >
          {normalizedOptions.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <div
                key={opt.value}
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between cursor-pointer rounded-xl transition-colors ${
                  isSmall ? 'px-3 py-2 text-xs' : 'px-3.5 py-2.5 text-sm'
                } ${
                  isSelected
                    ? 'bg-[#FAF0E6] text-[#C87D65] font-semibold'
                    : 'text-[#2C2623] hover:bg-[#FAF7F2] hover:text-[#C87D65] font-medium'
                }`}
              >
                <span className="truncate pr-2">{opt.label}</span>
                {isSelected && (
                  <Check className={`${isSmall ? 'w-3.5 h-3.5' : 'w-4 h-4'} text-[#C87D65] shrink-0`} />
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
