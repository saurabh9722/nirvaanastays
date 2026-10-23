import React from 'react';
import { ShieldCheck, Lock, Eye, FileText, CheckCircle2 } from 'lucide-react';
import { PageRoute } from '../types.ts';

interface PrivacyPolicyViewProps {
  onNavigate: (route: PageRoute) => void;
}

export const PrivacyPolicyView: React.FC<PrivacyPolicyViewProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-16 pb-20 pt-8">
      {/* Header */}
      <section className="text-center max-w-3xl mx-auto px-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#7A8B7B]">
          Sub-Page 8D · Data Governance & Resident Rights
        </span>
        <h1 className="font-editorial text-4xl sm:text-5xl font-semibold text-[#2C2623] mt-2 leading-tight">
          Privacy Policy & Resident Charter.
        </h1>
        <p className="text-sm sm:text-base text-[#6E655F] mt-3">
          Last updated: October 2026. How Nirvaana Stays protects your identity, digital contracts, and resident privacy.
        </p>
      </section>

      {/* Main Content Card */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#FFFDF9] border border-[#E6E0D6] shadow-sm space-y-8 text-xs sm:text-sm text-[#2C2623] leading-relaxed">
          {/* Section 1 */}
          <div className="space-y-3">
            <h3 className="font-editorial text-xl font-semibold text-[#2C2623] flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#C87D65]" />
              1. Information We Collect
            </h3>
            <p className="text-[#6E655F]">
              Nirvaana Stays Managed Residences LLP ("Nirvaana Stays") collects personal data strictly necessary to fulfill legal tenant verification, digital lease agreements, emergency medical contact protocols, and secure biometric access.
            </p>
            <ul className="list-disc pl-5 text-[#6E655F] space-y-1.5">
              <li>
                <strong>Identity Verification Data:</strong> Government ID (Aadhaar / Passport / Voter ID), college enrollment or employment verification letter, and parent/guardian emergency contact details.
              </li>
              <li>
                <strong>Contact Information:</strong> Phone number, email address, permanent home address, and WhatsApp messaging preferences.
              </li>
              <li>
                <strong>Financial Information:</strong> Bank account details solely for automated security deposit refund processing. Card and UPI transactions are tokenized via RBI-licensed payment gateways.
              </li>
            </ul>
          </div>

          {/* Section 2 */}
          <div className="space-y-3 pt-6 border-t border-[#E6E0D6]">
            <h3 className="font-editorial text-xl font-semibold text-[#2C2623] flex items-center gap-2">
              <Eye className="w-4 h-4 text-[#7A8B7B]" />
              2. CCTV & Biometric Security Governance
            </h3>
            <p className="text-[#6E655F]">
              To safeguard our resident community, CCTV surveillance operates 24/7 across building perimeters, entry turnstiles, lift lobbies, and public corridors.
            </p>
            <ul className="list-disc pl-5 text-[#6E655F] space-y-1.5">
              <li>CCTV cameras are strictly prohibited inside private bedrooms, bathrooms, and private suites.</li>
              <li>Footage is encrypted and automatically overwritten after 30 days unless requested by local Pune police authorities for an official investigation.</li>
              <li>Biometric fingerprint or facial data used for door turnstiles is stored as hashed mathematical tokens and never shared with commercial third parties.</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="space-y-3 pt-6 border-t border-[#E6E0D6]">
            <h3 className="font-editorial text-xl font-semibold text-[#2C2623] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#C87D65]" />
              3. Zero Data Monetization
            </h3>
            <p className="text-[#6E655F]">
              We do not sell, rent, or trade your personal information, phone numbers, or academic credentials to third-party telemarketers, credit card issuers, or coaching institutes. We communicate with you strictly about your stay, community events, and security advisories.
            </p>
          </div>

          {/* Section 4 */}
          <div className="space-y-3 pt-6 border-t border-[#E6E0D6]">
            <h3 className="font-editorial text-xl font-semibold text-[#2C2623] flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#7A8B7B]" />
              4. Data Retention & Digital Deletion
            </h3>
            <p className="text-[#6E655F]">
              Upon completion of your notice period and formal checkout, your biometric turnstile records are purged within 48 hours. Legal lease contracts and payment receipts are retained for the statutory tax period required by Indian law.
            </p>
          </div>

          {/* Section 5 */}
          <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E6E0D6] space-y-2">
            <h4 className="text-xs font-semibold text-[#2C2623]">Data Protection Officer (DPO)</h4>
            <p className="text-xs text-[#6E655F]">
              For privacy grievances or data deletion requests, contact our legal desk at{' '}
              <a href="mailto:privacy@nirvanastays.in" className="text-[#C87D65] underline">
                privacy@nirvanastays.in
              </a>{' '}
              or visit First floor, Shubh Gateway, Shop number 116, opp. to Symbiosis Law School, Survey Number 235, Mhada Colony, Viman Nagar, Pune 411032.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
