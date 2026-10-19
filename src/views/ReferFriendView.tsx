import React, { useState } from 'react';
import { Gift, Sparkles, CheckCircle2, Users, ArrowRight, ShieldCheck, Coins } from 'lucide-react';
import { ReferralFormData, PageRoute } from '../types.ts';
import { calculateReferralDiscount, validatePhone, validateEmail } from '../utils/property-logic.ts';
import { PROPERTIES } from '../data/mockData.ts';

interface ReferFriendViewProps {
  onNavigate: (route: PageRoute) => void;
  onOpenEnquire: () => void;
}

export const ReferFriendView: React.FC<ReferFriendViewProps> = ({
  onNavigate,
  onOpenEnquire,
}) => {
  const [referralCount, setReferralCount] = useState(2);
  const rewardData = calculateReferralDiscount(referralCount);

  const [formData, setFormData] = useState<ReferralFormData>({
    referrerName: '',
    referrerPhone: '',
    referrerProperty: 'Nirvana Willow (NS-0901)',
    friendName: '',
    friendPhone: '',
    friendEmail: '',
    friendCollegeOrCompany: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.referrerName.trim()) newErrors.referrerName = 'Your name is required';
    if (!formData.referrerPhone.trim() || !validatePhone(formData.referrerPhone)) {
      newErrors.referrerPhone = 'Valid 10-digit mobile required';
    }
    if (!formData.friendName.trim()) newErrors.friendName = "Friend's name is required";
    if (!formData.friendPhone.trim() || !validatePhone(formData.friendPhone)) {
      newErrors.friendPhone = "Valid 10-digit friend's phone required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setSubmitted(true);
  };

  return (
    <div className="space-y-20 pb-20 pt-8">
      {/* Header */}
      <section className="text-center max-w-3xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F4E6DF] text-[#C87D65] border border-[#E6E0D6] text-xs font-semibold mb-4">
          <Gift className="w-3.5 h-3.5" />
          <span>Sub-Page 8C · Resident Referral Circle</span>
        </div>
        <h1 className="font-editorial text-4xl sm:text-5xl font-semibold text-[#2C2623] leading-tight">
          Share the Calm, Earn Direct Rent Rewards.
        </h1>
        <p className="text-sm sm:text-base text-[#6E655F] mt-3">
          Know a classmate from Symbiosis or a colleague seeking a mindful sanctuary in Pune? Refer them to Nirvana Stays and enjoy ₹5,000 credited directly to your next month’s rent when they check in.
        </p>
      </section>

      {/* Interactive Reward Calculator Slider */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-[#FFFDF9] border border-[#E6E0D6] shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#C87D65]">
                Reward Simulator
              </span>
              <h3 className="font-editorial text-2xl font-semibold text-[#2C2623] mt-0.5">
                Calculate Your Rent Savings
              </h3>
            </div>

            <div className="p-3 bg-[#FAF7F2] rounded-2xl border border-[#E6E0D6] text-right">
              <span className="text-[11px] text-[#6E655F] block">Total Rent Credit</span>
              <span className="font-editorial text-3xl font-bold text-[#C87D65] tabular-nums">
                ₹{rewardData.totalCredit.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center text-xs font-medium text-[#2C2623] mb-2">
              <span>Friends Joining Nirvana:</span>
              <span className="font-mono font-bold text-[#C87D65] text-sm">{referralCount} Friends</span>
            </div>
            <input
              type="range"
              min="1"
              max="6"
              step="1"
              value={referralCount}
              onChange={(e) => setReferralCount(Number(e.target.value))}
              className="w-full accent-[#C87D65] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-[#6E655F] mt-1">
              <span>1 Friend (₹5,000)</span>
              <span>3 Friends (₹15,000)</span>
              <span>5+ Friends (1 Month Free)</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#F3EFE6] text-xs text-[#2C2623] flex items-center justify-between">
            <span className="font-medium">Active Ambassador Tier:</span>
            <span className="font-semibold text-[#7A8B7B]">{rewardData.rewardTier}</span>
          </div>
        </div>
      </section>

      {/* Referral Submission Form */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#FFFDF9] border border-[#E6E0D6] shadow-md">
          {!submitted ? (
            <div>
              <div className="text-center max-w-xl mx-auto mb-8">
                <h3 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#2C2623]">
                  Submit Your Referral
                </h3>
                <p className="text-xs sm:text-sm text-[#6E655F] mt-1">
                  We will reach out to your friend warmly via WhatsApp with a VIP invitation from you.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Referrer Details */}
                <div className="space-y-3 pb-6 border-b border-[#E6E0D6]">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#7A8B7B] block">
                    Your Details (Current Resident or Alumni)
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#2C2623] mb-1">Your Full Name</label>
                      <input
                        type="text"
                        value={formData.referrerName}
                        onChange={(e) => setFormData({ ...formData, referrerName: e.target.value })}
                        placeholder="e.g. Tanvi Joshi"
                        className={`w-full px-3 py-2 bg-[#FAF7F2] border rounded-xl text-xs sm:text-sm text-[#2C2623] placeholder-[#A09891] focus:outline-none focus:ring-1 focus:ring-[#C87D65] ${
                          errors.referrerName ? 'border-red-400' : 'border-[#E6E0D6]'
                        }`}
                      />
                      {errors.referrerName && <p className="text-xs text-red-600 mt-1">{errors.referrerName}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#2C2623] mb-1">Your Registered Mobile</label>
                      <input
                        type="tel"
                        value={formData.referrerPhone}
                        onChange={(e) => setFormData({ ...formData, referrerPhone: e.target.value })}
                        placeholder="090961 66306"
                        className={`w-full px-3 py-2 bg-[#FAF7F2] border rounded-xl text-xs sm:text-sm text-[#2C2623] placeholder-[#A09891] focus:outline-none focus:ring-1 focus:ring-[#C87D65] ${
                          errors.referrerPhone ? 'border-red-400' : 'border-[#E6E0D6]'
                        }`}
                      />
                      {errors.referrerPhone && <p className="text-xs text-red-600 mt-1">{errors.referrerPhone}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#2C2623] mb-1">Your Current Residence</label>
                      <select
                        value={formData.referrerProperty}
                        onChange={(e) => setFormData({ ...formData, referrerProperty: e.target.value })}
                        className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#E6E0D6] rounded-xl text-xs sm:text-sm text-[#2C2623] focus:outline-none focus:ring-1 focus:ring-[#C87D65]"
                      >
                        {PROPERTIES.map((p) => (
                          <option key={p.id} value={p.name}>
                            {p.name} ({p.propCode})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Friend Details */}
                <div className="space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#C87D65] block">
                    Your Friend’s Information
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#2C2623] mb-1">Friend's Full Name</label>
                      <input
                        type="text"
                        value={formData.friendName}
                        onChange={(e) => setFormData({ ...formData, friendName: e.target.value })}
                        placeholder="e.g. Siddharth Rao"
                        className={`w-full px-3 py-2.5 bg-[#FAF7F2] border rounded-xl text-xs sm:text-sm text-[#2C2623] placeholder-[#A09891] focus:outline-none focus:ring-1 focus:ring-[#C87D65] ${
                          errors.friendName ? 'border-red-400' : 'border-[#E6E0D6]'
                        }`}
                      />
                      {errors.friendName && <p className="text-xs text-red-600 mt-1">{errors.friendName}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#2C2623] mb-1">Friend's WhatsApp Mobile</label>
                      <input
                        type="tel"
                        value={formData.friendPhone}
                        onChange={(e) => setFormData({ ...formData, friendPhone: e.target.value })}
                        placeholder="98220 99887"
                        className={`w-full px-3 py-2.5 bg-[#FAF7F2] border rounded-xl text-xs sm:text-sm text-[#2C2623] placeholder-[#A09891] focus:outline-none focus:ring-1 focus:ring-[#C87D65] ${
                          errors.friendPhone ? 'border-red-400' : 'border-[#E6E0D6]'
                        }`}
                      />
                      {errors.friendPhone && <p className="text-xs text-red-600 mt-1">{errors.friendPhone}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#2C2623] mb-1">Friend's Email (Optional)</label>
                      <input
                        type="email"
                        value={formData.friendEmail}
                        onChange={(e) => setFormData({ ...formData, friendEmail: e.target.value })}
                        placeholder="friend@college.edu"
                        className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#E6E0D6] rounded-xl text-xs sm:text-sm text-[#2C2623] placeholder-[#A09891] focus:outline-none focus:ring-1 focus:ring-[#C87D65]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#2C2623] mb-1">College or Company in Pune</label>
                      <input
                        type="text"
                        value={formData.friendCollegeOrCompany}
                        onChange={(e) => setFormData({ ...formData, friendCollegeOrCompany: e.target.value })}
                        placeholder="e.g. Symbiosis SLS / Tech Intern"
                        className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#E6E0D6] rounded-xl text-xs sm:text-sm text-[#2C2623] placeholder-[#A09891] focus:outline-none focus:ring-1 focus:ring-[#C87D65]"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#C87D65] hover:bg-[#B26B54] text-white rounded-xl text-xs sm:text-sm font-semibold tracking-wide transition-colors shadow-sm flex items-center justify-center gap-2"
                  >
                    <Gift className="w-4 h-4" /> Send Referral & Unlock ₹5,000 Credit
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#7A8B7B]/15 text-[#7A8B7B] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <h3 className="font-editorial text-2xl font-semibold text-[#2C2623]">
                Referral Logged, {formData.referrerName.split(' ')[0]}!
              </h3>
              <p className="text-sm text-[#6E655F] max-w-md mx-auto">
                We will send {formData.friendName} a personalized VIP tour invitation mentioning your recommendation. Once they confirm their room booking, ₹5,000 will be credited directly to your account.
              </p>

              <div className="pt-4 flex justify-center">
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl bg-[#2C2623] text-white text-xs font-medium hover:bg-black transition-colors"
                >
                  Refer Another Friend
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
