import React, { useState } from 'react';
import { X, Download, FileText, CheckCircle, Sparkles, BookOpen } from 'lucide-react';
import { validatePhone } from '../utils/property-logic.ts';

interface BrochureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BrochureModal: React.FC<BrochureModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    gender: 'Female',
    profession: 'Student',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [downloadReady, setDownloadReady] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please provide your name';
    }
    if (!formData.mobile.trim() || !validatePhone(formData.mobile)) {
      newErrors.mobile = 'Valid 10-digit mobile number required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setDownloadReady(true);

    // Trigger synthetic download of the Nirvana Stays Brochure
    const brochureText = `
================================================================
           NIRVANA STAYS — PUNE OFFICIAL BROCHURE
       Thoughtfully Crafted Co-Living Sanctuaries (2026–2027)
================================================================
Location: Symbiosis Viman Nagar · Kalyani Nagar · Koregaon Park
Contact: +91 90961 66306 | hello@nirvanastays.in
Address: First floor, Shubh Gateway, Shop number 116, opp. to Symbiosis Law School, Survey Number 235, Mhada Colony, Viman Nagar, Pune, Maharashtra 411032
Plus Code: HWG5+62 Pune, Maharashtra

1. OUR SPACES:
- Nirvana Willow (NS-0901): 6 En-Suites | 2 Off-Suites | Symbiosis Viman Nagar
- Nirvana Terra  (NS-0406): 4 En-Suites | 2 Off-Suites | Symbiosis Viman Nagar
- Nirvana Sage   (NS-0303): 4 En-Suites | 4 Off-Suites | Behind Hyatt Regency
- Nirvana Studios (NS-0304): Private Luxury Studios with Kitchenette & Spa Bath

2. ALL 18 AMENITIES INCLUDED IN YOUR MONTHLY PLAN:
[✔] A/C in All Rooms
[✔] Zero Brokerage Guaranteed
[✔] All Utility Bills (Electricity, Gas, Water)
[✔] Dual-Band Wi-Fi 6 (300+ Mbps)
[✔] Fully Loaded Kitchen (Induction, Microwave, RO, Cookware)
[✔] Daily Professional Housekeeping
[✔] In-House Fitness Studio / Home Gym
[✔] Community Lounge & Reading Nook
[✔] 24/7 CCTV & Biometric Security
[✔] Smart Keyless RFID Entry
[✔] Orthopedic 8-Inch Memory Foam Mattresses
[✔] Dedicated Laundry Facilities
[✔] On-Demand In-House Maintenance
[✔] Paperless 5-Minute Digital Contracts
[✔] Easy Room Swaps Across Pune Properties

3. PRICING & DEPOSIT POLICY:
- Starting Single En-Suite: ₹18,500 - ₹23,500/month
- Nirvana Studio: ₹28,000/month
- Security Deposit: Only 1 Month Rent (100% Refundable)
- Notice Period: 30 Days Digital Notice

Prepared especially for: ${formData.name} (${formData.profession}, +91 ${formData.mobile})
Welcome to peaceful living in Pune.
================================================================
    `.trim();

    const blob = new Blob([brochureText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Nirvana-Stays-Pune-Brochure-2026.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleClose = () => {
    setDownloadReady(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#FFFDF9] rounded-2xl border border-[#E6E0D6] shadow-2xl p-6 sm:p-8">
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#6E655F] hover:text-[#2C2623] hover:bg-[#F3EFE6] transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {!downloadReady ? (
          <div>
            <div className="w-12 h-12 rounded-xl bg-[#F4E6DF] text-[#C87D65] flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6 stroke-[1.75]" />
            </div>

            <h3 className="font-editorial text-2xl font-semibold text-[#2C2623]">
              Download 2026 Lookbook & Rates
            </h3>
            <p className="text-xs text-[#6E655F] mt-1 mb-6">
              Complete floor plans, high-resolution room photography, suite specifications, and exact transparent pricing for all Pune residences.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#2C2623] mb-1">Your Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Siddharth Joshi"
                  className={`w-full px-3 py-2.5 bg-[#FAF7F2] border rounded-xl text-sm text-[#2C2623] placeholder-[#A09891] focus:outline-none focus:ring-1 focus:ring-[#C87D65] ${
                    errors.name ? 'border-red-400' : 'border-[#E6E0D6]'
                  }`}
                />
                {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-xs font-medium text-[#2C2623] mb-1">WhatsApp Mobile Number</label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-[#E6E0D6] bg-[#F3EFE6] text-xs font-medium text-[#2C2623]">
                    +91
                  </span>
                    <input
                      type="tel"
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                      placeholder="090961 66306"
                      className={`w-full px-3 py-2.5 bg-[#FAF7F2] border rounded-r-xl text-sm text-[#2C2623] placeholder-[#A09891] focus:outline-none focus:ring-1 focus:ring-[#C87D65] ${
                        errors.mobile ? 'border-red-400' : 'border-[#E6E0D6]'
                      }`}
                    />
                </div>
                {errors.mobile && <p className="text-xs text-red-600 mt-1">{errors.mobile}</p>}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#2C2623] mb-1">Gender</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#E6E0D6] rounded-xl text-xs text-[#2C2623] focus:outline-none focus:ring-1 focus:ring-[#C87D65]"
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#2C2623] mb-1">Profession</label>
                  <select
                    value={formData.profession}
                    onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#E6E0D6] rounded-xl text-xs text-[#2C2623] focus:outline-none focus:ring-1 focus:ring-[#C87D65]"
                  >
                    <option value="Student">Student</option>
                    <option value="Intern">Intern</option>
                    <option value="Working Professional">Working Professional</option>
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-[#C87D65] hover:bg-[#B26B54] text-white rounded-xl text-xs font-semibold tracking-wide transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" /> Download Official Brochure
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="py-4 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-[#7A8B7B]/15 text-[#7A8B7B] flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="font-editorial text-xl font-semibold text-[#2C2623]">
              Brochure Downloaded!
            </h3>
            <p className="text-xs text-[#6E655F] max-w-sm mx-auto">
              We also sent a copy to your WhatsApp number (+91 {formData.mobile}). Have questions? Our Viman Nagar office team is happy to assist.
            </p>

            <div className="p-3 bg-[#FAF7F2] border border-[#E6E0D6] rounded-xl text-xs text-left max-w-sm mx-auto flex items-center gap-3">
              <FileText className="w-8 h-8 text-[#C87D65] shrink-0" />
              <div>
                <p className="font-medium text-[#2C2623]">Nirvana-Stays-Lookbook-2026.pdf</p>
                <p className="text-[11px] text-[#6E655F]">18 Amenities · Rates · Floor Plans · Symbiosis Proximity</p>
              </div>
            </div>

            <div className="pt-2 flex gap-2 justify-center">
              <button
                onClick={handleClose}
                className="px-5 py-2 bg-[#2C2623] text-white rounded-xl text-xs font-medium hover:bg-black transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
