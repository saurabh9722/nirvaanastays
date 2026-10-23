import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Calendar, Phone, Mail, User, ShieldCheck } from 'lucide-react';
import { EnquiryFormData, Property } from '../types.ts';
import { validatePhone, validateEmail } from '../utils/property-logic.ts';
import { PROPERTIES } from '../data/mockData.ts';
import { CustomSelect } from './CustomSelect.tsx';

interface EnquireModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedProperty?: string;
}

export const EnquireModal: React.FC<EnquireModalProps> = ({
  isOpen,
  onClose,
  preselectedProperty = '',
}) => {
  const [formData, setFormData] = useState<EnquiryFormData>({
    fullName: '',
    mobileNumber: '',
    email: '',
    gender: '',
    age: '',
    profession: '',
    duration: '',
    preferredProperty: preselectedProperty,
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [refId, setRefId] = useState('');

  useEffect(() => {
    if (preselectedProperty) {
      setFormData((prev) => ({ ...prev, preferredProperty: preselectedProperty }));
    }
  }, [preselectedProperty]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name';
    }
    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = 'Mobile number is required';
    } else if (!validatePhone(formData.mobileNumber)) {
      newErrors.mobileNumber = 'Please enter a valid 10-digit mobile number';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.gender) {
      newErrors.gender = 'Please select your gender';
    }
    if (!formData.age || isNaN(Number(formData.age)) || Number(formData.age) < 16 || Number(formData.age) > 65) {
      newErrors.age = 'Please enter a valid age (16–65)';
    }
    if (!formData.profession) {
      newErrors.profession = 'Please select your profession';
    }
    if (!formData.duration) {
      newErrors.duration = 'Please select expected stay duration';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Generate reference code
    const generated = `NS-${Math.floor(1000 + Math.random() * 9000)}`;
    setRefId(generated);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      mobileNumber: '',
      email: '',
      gender: '',
      age: '',
      profession: '',
      duration: '',
      preferredProperty: '',
      message: '',
    });
    setErrors({});
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-[#FFFDF9] rounded-2xl border border-[#E6E0D6] shadow-2xl p-6 sm:p-8"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#6E655F] hover:text-[#2C2623] hover:bg-[#F3EFE6] transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="mb-6">
              <span className="text-xs font-semibold tracking-wider uppercase text-[#7A8B7B]">
                Personalized Visit & Stay Inquiry
              </span>
              <h2 id="modal-title" className="font-editorial text-2xl sm:text-3xl text-[#2C2623] mt-1 font-semibold">
                Begin Your NIRVAANA Journey
              </h2>
              <p className="text-sm text-[#6E655F] mt-1">
                Schedule an in-person or virtual tour. Zero brokerage, honest inclusions, and instant confirmation.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-medium text-[#2C2623] mb-1">
                  Full Name <span className="text-[#C87D65]">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#6E655F] absolute left-3 top-3" />
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Radhika Sharma"
                    className={`w-full pl-9 pr-3 py-2.5 bg-[#FAF7F2] border rounded-xl text-sm text-[#2C2623] placeholder-[#A09891] focus:outline-none focus:ring-1 focus:ring-[#C87D65] ${
                      errors.fullName ? 'border-red-400' : 'border-[#E6E0D6]'
                    }`}
                  />
                </div>
                {errors.fullName && <p className="text-xs text-red-600 mt-1">{errors.fullName}</p>}
              </div>

              {/* Mobile & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#2C2623] mb-1">
                    Mobile Number <span className="text-[#C87D65]">*</span>
                  </label>
                  <div className="relative flex">
                    <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-[#E6E0D6] bg-[#F3EFE6] text-xs font-medium text-[#2C2623]">
                      +91
                    </span>
                    <input
                      type="tel"
                      value={formData.mobileNumber}
                      onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                      placeholder="090961 66306"
                      className={`w-full px-3 py-2.5 bg-[#FAF7F2] border rounded-r-xl text-sm text-[#2C2623] placeholder-[#A09891] focus:outline-none focus:ring-1 focus:ring-[#C87D65] ${
                        errors.mobileNumber ? 'border-red-400' : 'border-[#E6E0D6]'
                      }`}
                    />
                  </div>
                  {errors.mobileNumber && <p className="text-xs text-red-600 mt-1">{errors.mobileNumber}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#2C2623] mb-1">
                    Email Address <span className="text-[#C87D65]">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#6E655F] absolute left-3 top-3" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@university.edu"
                      className={`w-full pl-9 pr-3 py-2.5 bg-[#FAF7F2] border rounded-xl text-sm text-[#2C2623] placeholder-[#A09891] focus:outline-none focus:ring-1 focus:ring-[#C87D65] ${
                        errors.email ? 'border-red-400' : 'border-[#E6E0D6]'
                      }`}
                    />
                  </div>
                  {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
                </div>
              </div>

              {/* Gender Pills */}
              <div>
                <label className="block text-xs font-medium text-[#2C2623] mb-1.5">
                  Gender <span className="text-[#C87D65]">*</span>
                </label>
                <div className="flex gap-2">
                  {(['Female', 'Male', 'Other'] as const).map((genderOption) => (
                    <button
                      key={genderOption}
                      type="button"
                      onClick={() => setFormData({ ...formData, gender: genderOption })}
                      className={`flex-1 py-2 text-xs font-medium rounded-xl border transition-all ${
                        formData.gender === genderOption
                          ? 'bg-[#C87D65] text-white border-[#C87D65] shadow-sm'
                          : 'bg-[#FAF7F2] text-[#2C2623] border-[#E6E0D6] hover:bg-[#F4E6DF]'
                      }`}
                    >
                      {genderOption}
                    </button>
                  ))}
                </div>
                {errors.gender && <p className="text-xs text-red-600 mt-1">{errors.gender}</p>}
              </div>

              {/* Age & Profession Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#2C2623] mb-1">
                    Age <span className="text-[#C87D65]">*</span>
                  </label>
                  <input
                    type="number"
                    min="16"
                    max="65"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    placeholder="e.g. 21"
                    className={`w-full px-3 py-2.5 bg-[#FAF7F2] border rounded-xl text-sm text-[#2C2623] placeholder-[#A09891] focus:outline-none focus:ring-1 focus:ring-[#C87D65] ${
                      errors.age ? 'border-red-400' : 'border-[#E6E0D6]'
                    }`}
                  />
                  {errors.age && <p className="text-xs text-red-600 mt-1">{errors.age}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#2C2623] mb-1">
                    Profession <span className="text-[#C87D65]">*</span>
                  </label>
                  <CustomSelect
                    name="profession"
                    value={formData.profession}
                    placeholder="Select Profession"
                    onChange={(val) =>
                      setFormData({
                        ...formData,
                        profession: val as 'Student' | 'Working Professional' | 'Intern',
                      })
                    }
                    options={[
                      { value: 'Student', label: 'Student (Symbiosis / College)' },
                      { value: 'Intern', label: 'Intern / Summer Associate' },
                      { value: 'Working Professional', label: 'Working Professional / Tech' },
                    ]}
                    error={!!errors.profession}
                  />
                  {errors.profession && <p className="text-xs text-red-600 mt-1">{errors.profession}</p>}
                </div>
              </div>

              {/* Stay Duration */}
              <div>
                <label className="block text-xs font-medium text-[#2C2623] mb-1">
                  Expected Duration of Stay <span className="text-[#C87D65]">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(['Less than 3 Months', '3–6 Months', '6–11 Months', '1 Year+'] as const).map((dur) => (
                    <button
                      key={dur}
                      type="button"
                      onClick={() => setFormData({ ...formData, duration: dur })}
                      className={`p-2 text-center text-xs font-medium rounded-xl border transition-all ${
                        formData.duration === dur
                          ? 'bg-[#2C2623] text-white border-[#2C2623]'
                          : 'bg-[#FAF7F2] text-[#2C2623] border-[#E6E0D6] hover:bg-[#F3EFE6]'
                      }`}
                    >
                      {dur}
                    </button>
                  ))}
                </div>
                {errors.duration && <p className="text-xs text-red-600 mt-1">{errors.duration}</p>}
              </div>

              {/* Preferred Property */}
              <div>
                <label className="block text-xs font-medium text-[#2C2623] mb-1">
                  Preferred Property / Residence (Optional)
                </label>
                <CustomSelect
                  name="preferredProperty"
                  value={formData.preferredProperty || ''}
                  placeholder="Any Available Property in Viman Nagar / Pune"
                  onChange={(val) => setFormData({ ...formData, preferredProperty: val })}
                  options={[
                    { value: '', label: 'Any Available Property in Viman Nagar / Pune' },
                    ...PROPERTIES.map((prop) => ({
                      value: prop.name,
                      label: `${prop.name} — ${prop.location} (${prop.propCode})`,
                    })),
                  ]}
                />
              </div>

              {/* Note / Specific Questions */}
              <div>
                <label className="block text-xs font-medium text-[#2C2623] mb-1">
                  Specific Requests or Move-in Date (Optional)
                </label>
                <textarea
                  rows={2}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="e.g. Planning to move in around 1st July, prefer quiet study desk near window..."
                  className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#E6E0D6] rounded-xl text-sm text-[#2C2623] placeholder-[#A09891] focus:outline-none focus:ring-1 focus:ring-[#C87D65]"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#C87D65] hover:bg-[#B26B54] text-white rounded-xl text-sm font-semibold tracking-wide transition-all shadow-md flex items-center justify-center gap-2"
                >
                  Confirm & Schedule Visit
                </button>
                <p className="text-center text-[11px] text-[#6E655F] mt-2 flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#7A8B7B]" /> Instant confirmation · Zero spam · Direct manager contact
                </p>
              </div>
            </form>
          </div>
        ) : (
          <div className="py-6 text-center space-y-4 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-[#7A8B7B]/15 text-[#7A8B7B] flex items-center justify-center mx-auto">
              <CheckCircle className="w-9 h-9" />
            </div>

            <div>
              <span className="text-xs font-semibold text-[#7A8B7B] tracking-wider uppercase">
                Visit Inquiry Confirmed
              </span>
              <h3 className="font-editorial text-2xl text-[#2C2623] font-semibold mt-1">
                Welcome to the NIRVAANA Family, {formData.fullName.split(' ')[0]}!
              </h3>
              <p className="text-sm text-[#6E655F] mt-2 max-w-md mx-auto">
                Your visit request has been logged. Our Viman Nagar community manager will reach out via WhatsApp & call on{' '}
                <strong className="text-[#2C2623]">+91 {formData.mobileNumber}</strong> within 30 minutes.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E6E0D6] max-w-sm mx-auto text-left text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-[#6E655F]">Booking Reference:</span>
                <span className="font-mono font-semibold text-[#C87D65]">{refId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6E655F]">Preferred Space:</span>
                <span className="font-medium text-[#2C2623]">
                  {formData.preferredProperty || 'Best Available Suite'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6E655F]">Stay Duration:</span>
                <span className="font-medium text-[#2C2623]">{formData.duration}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6E655F]">Dedicated Helpline:</span>
                <span className="font-medium text-[#2C2623]">+91 90961 66306</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={handleReset}
                className="px-6 py-2.5 bg-[#2C2623] hover:bg-black text-white text-xs font-semibold rounded-xl transition-all"
              >
                Close & Return to Browsing
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
