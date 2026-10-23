export type PageRoute =
  | 'home'
  | 'about'
  | 'properties'
  | 'studio'
  | 'tie-up'
  | 'owners'
  | 'gallery'
  | 'blog'
  | 'contact'
  | 'testimonials'
  | 'faqs'
  | 'refer'
  | 'privacy';

export interface Property {
  id: string;
  propCode: string;
  name: string;
  tagline: string;
  location: string;
  subLocation: string;
  address: string;
  gender: 'Co-ed' | 'Girls Only' | 'Boys Only';
  roomTypes: ('Single En-Suite' | 'Double Sharing' | 'Studio' | 'Single Off-Suite')[];
  enSuitesCount: number;
  offSuitesCount: number;
  startingPrice: number;
  coverImage: string;
  galleryImages: string[];
  description: string;
  isStudioOnly?: boolean;
  proximity: {
    spot: string;
    distance: string;
    time: string;
  }[];
  specifications: {
    carpetArea: string;
    floors: string;
    totalBeds: number;
    securityDeposit: string;
    noticePeriod: string;
  };
  amenities: string[];
}

export interface AmenityItem {
  id: number;
  name: string;
  description: string;
  category: 'Living' | 'Services' | 'Wellness' | 'Safety';
  icon: string;
}

export interface BlogPost {
  id: string;
  title: string;
  category: 'Student Life in Pune' | 'Co-Living Guides' | 'Interior & Wellness' | 'Neighborhood Guide';
  readTime: string;
  date: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  excerpt: string;
  coverImage: string;
  content: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  collegeOrCompany: string;
  property: string;
  roomType: string;
  duration: string;
  rating: number;
  quote: string;
  avatar: string;
}

export interface FaqItem {
  id: string;
  category: 'Booking & Deposits' | 'Bills & Inclusions' | 'House Rules & Security' | 'Room Swaps & Notice Period';
  question: string;
  answer: string;
}

export interface GalleryImage {
  id: string;
  title: string;
  category: 'Bedrooms & Suites' | 'Nirvana Studios' | 'Community Lounge' | 'Kitchen & Dining' | 'Fitness & Wellness';
  url: string;
  property: string;
}

export interface EnquiryFormData {
  fullName: string;
  mobileNumber: string;
  email: string;
  gender: 'Male' | 'Female' | 'Other' | '';
  age: string;
  profession: 'Student' | 'Working Professional' | 'Intern' | '';
  duration: 'Less than 3 Months' | '3–6 Months' | '6–11 Months' | '1 Year+' | '';
  preferredProperty: string;
  message?: string;
}

export interface PropertyOwnerFormData {
  ownerName: string;
  phone: string;
  email: string;
  propertyLocation: string;
  propertyType: 'Standalone Building' | 'Gated Apartment' | 'Villa / Bungalow' | 'Commercial Conversion';
  numberOfRooms: string;
  builtUpArea: string;
  currentStatus: 'Vacant / Ready to Move' | 'Under Renovation' | 'Under Construction' | 'Currently Tenanted';
  additionalNotes?: string;
}

export interface TieUpFormData {
  organizationName: string;
  contactPerson: string;
  partnershipType: 'University / College Student Housing' | 'Corporate Relocation & Intern Housing' | 'Brand Collaboration & Perks' | 'Event & Community Partnership';
  email: string;
  phone: string;
  estimatedResidents: string;
  message: string;
}

export interface ReferralFormData {
  referrerName: string;
  referrerPhone: string;
  referrerProperty: string;
  friendName: string;
  friendPhone: string;
  friendEmail: string;
  friendCollegeOrCompany: string;
}
