/**
 * Core Inquiry & Validation Utilities — NIRVAANA Stays
 * Lightweight pure functions used by BookingVisitForm, BookingPopupModal, and unit tests.
 */

/**
 * Validates Indian mobile numbers (10 digits, or 12 digits prefixed with country code 91).
 */
export function validatePhone(phone: string): boolean {
  const clean = phone.replace(/[^0-9]/g, '');
  return clean.length === 10 || (clean.length === 12 && clean.startsWith('91'));
}

/**
 * Validates standard email format.
 */
export function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.trim());
}

/**
 * Determines whether the timed visit inquiry popup should open.
 * Returns false if already dismissed during the current session.
 */
export function shouldTriggerPopup(
  hasDismissed: boolean,
  timeElapsedMs: number,
  delayMs: number = 5000
): boolean {
  if (hasDismissed) return false;
  return timeElapsedMs >= delayMs;
}

/**
 * Builds a pre-filled WhatsApp click-to-chat URL for property walkthrough inquiries.
 * Default target: +91 90961 66306 (NIRVAANA Stays Pune Concierge).
 */
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
