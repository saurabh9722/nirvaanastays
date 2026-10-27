import type { Property } from '../types.ts';

export interface PropertyFilterCriteria {
  location?: string;
  roomType?: string;
  suiteType?: 'All' | 'En-Suite' | 'Off-Suite';
  gender?: string;
  maxPrice?: number;
  searchQuery?: string;
}

export function filterProperties(
  properties: Property[],
  criteria: PropertyFilterCriteria
): Property[] {
  return properties.filter((property) => {
    // Location filter
    if (criteria.location && criteria.location !== 'All') {
      const locMatch =
        property.location.toLowerCase().includes(criteria.location.toLowerCase()) ||
        property.subLocation.toLowerCase().includes(criteria.location.toLowerCase());
      if (!locMatch) return false;
    }

    // Room type filter
    if (criteria.roomType && criteria.roomType !== 'All') {
      const hasRoom = property.roomTypes.some((rt) =>
        rt.toLowerCase().includes(criteria.roomType!.toLowerCase())
      );
      if (!hasRoom) return false;
    }

    // Suite type filter
    if (criteria.suiteType && criteria.suiteType !== 'All') {
      if (criteria.suiteType === 'En-Suite' && property.enSuitesCount <= 0) {
        return false;
      }
      if (criteria.suiteType === 'Off-Suite' && property.offSuitesCount <= 0) {
        return false;
      }
    }

    // Gender filter
    if (criteria.gender && criteria.gender !== 'All') {
      if (property.gender !== criteria.gender && property.gender !== 'Co-ed') {
        return false;
      }
    }

    // Max price filter
    if (criteria.maxPrice && criteria.maxPrice > 0) {
      if (property.startingPrice > criteria.maxPrice) {
        return false;
      }
    }

    // Search query filter
    if (criteria.searchQuery && criteria.searchQuery.trim().length > 0) {
      const q = criteria.searchQuery.toLowerCase().trim();
      const inName = property.name.toLowerCase().includes(q);
      const inLoc = property.location.toLowerCase().includes(q) || property.subLocation.toLowerCase().includes(q);
      const inCode = property.propCode.toLowerCase().includes(q);
      const inDesc = property.description.toLowerCase().includes(q);
      if (!inName && !inLoc && !inCode && !inDesc) {
        return false;
      }
    }

    return true;
  });
}

export interface OwnerYieldInput {
  numberOfUnits: number;
  expectedRentPerUnit: number;
  estimatedOccupancyPercent?: number; // default 95
  traditionalOccupancyPercent?: number; // default 75
}

export interface OwnerYieldResult {
  monthlyGrossRevenue: number;
  monthlyNirvanaNetRevenue: number;
  annualNirvanaRevenue: number;
  annualTraditionalRevenue: number;
  extraAnnualGain: number;
  percentageUplift: number;
}

export function calculateOwnerYield(input: OwnerYieldInput): OwnerYieldResult {
  const units = Math.max(1, input.numberOfUnits || 1);
  const rent = Math.max(1000, input.expectedRentPerUnit || 15000);
  const nirvanaOccupancy = (input.estimatedOccupancyPercent ?? 95) / 100;
  const traditionalOccupancy = (input.traditionalOccupancyPercent ?? 75) / 100;

  // With Nirvana: higher occupancy (95%), 12% tech & operations management fee
  const nirvanaGrossMonthly = units * rent * nirvanaOccupancy;
  const managementFee = nirvanaGrossMonthly * 0.12;
  const monthlyNirvanaNetRevenue = Math.round(nirvanaGrossMonthly - managementFee);
  const annualNirvanaRevenue = monthlyNirvanaNetRevenue * 12;

  // Traditional leasing: 75% occupancy, 1 month brokerage per year (8.3% fee), frequent tenant vacancies
  const traditionalGrossMonthly = units * (rent * 0.9) * traditionalOccupancy;
  const annualTraditionalRevenue = Math.round(traditionalGrossMonthly * 11); // minus 1 month brokerage

  const extraAnnualGain = Math.max(0, annualNirvanaRevenue - annualTraditionalRevenue);
  const percentageUplift =
    annualTraditionalRevenue > 0
      ? Math.round((extraAnnualGain / annualTraditionalRevenue) * 100)
      : 0;

  return {
    monthlyGrossRevenue: Math.round(nirvanaGrossMonthly),
    monthlyNirvanaNetRevenue,
    annualNirvanaRevenue,
    annualTraditionalRevenue,
    extraAnnualGain,
    percentageUplift,
  };
}

export function calculateReferralDiscount(referralCount: number): {
  totalCredit: number;
  rewardTier: string;
  perReferralAmount: number;
} {
  const count = Math.max(0, Math.floor(referralCount));
  const perReferralAmount = 5000;
  const totalCredit = count * perReferralAmount;

  let rewardTier = 'Peace Ambassador';
  if (count >= 5) {
    rewardTier = 'Nirvaana Legend (1 Month Rent Waived + Exclusive Perk)';
  } else if (count >= 3) {
    rewardTier = 'Community Benefactor (₹15,000 Credit + Spa Day)';
  } else if (count >= 1) {
    rewardTier = 'Warm Welcomer (₹5,000 Credit)';
  }

  return {
    totalCredit,
    rewardTier,
    perReferralAmount,
  };
}

export function validatePhone(phone: string): boolean {
  // Strips non-digits, checks for 10 digits
  const clean = phone.replace(/[^0-9]/g, '');
  return clean.length === 10 || (clean.length === 12 && clean.startsWith('91'));
}

export function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.trim());
}

export function shouldTriggerPopup(
  hasDismissed: boolean,
  timeElapsedMs: number,
  delayMs: number = 5000
): boolean {
  if (hasDismissed) return false;
  return timeElapsedMs >= delayMs;
}

export function generateWhatsAppInquiryUrl(params: {
  name: string;
  phone: string;
  stayType: string;
  roomType: string;
  property: string;
  message?: string;
  phoneTarget?: string;
}): string {
  const target = params.phoneTarget || '919096166306';
  const text = `Hi NIRVAANA Stays,\nName: ${params.name}\nPhone: ${params.phone}\nStay: ${params.stayType}\nRoom: ${params.roomType}\nProperty: ${params.property}\nNote: ${params.message || 'I would like to schedule a visit.'}`;
  return `https://wa.me/${target}?text=${encodeURIComponent(text)}`;
}

