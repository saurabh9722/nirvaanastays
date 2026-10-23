import test from 'node:test';
import assert from 'node:assert/strict';
import {
  filterProperties,
  calculateOwnerYield,
  calculateReferralDiscount,
  validatePhone,
  validateEmail,
} from './property-logic.ts';
import type { Property } from '../types.ts';

const mockProperties: Property[] = [
  {
    id: 'prop-1',
    propCode: 'NS-0901',
    name: 'Nirvaana Willow',
    tagline: 'Sunlit Serenity in Viman Nagar',
    location: 'Symbiosis Viman Nagar, Pune',
    subLocation: 'Viman Nagar',
    address: 'Near Symbiosis Campus, Viman Nagar, Pune',
    gender: 'Co-ed',
    roomTypes: ['Single En-Suite', 'Double Sharing'],
    enSuitesCount: 6,
    offSuitesCount: 2,
    startingPrice: 18500,
    coverImage: '/images/willow.jpg',
    galleryImages: [],
    description: 'A peaceful haven for Symbiosis students and young executives.',
    proximity: [{ spot: 'Symbiosis International University', distance: '400m', time: '5 min walk' }],
    specifications: { carpetArea: '4,200 sq.ft', floors: '3 Floors', totalBeds: 16, securityDeposit: '1 Month', noticePeriod: '30 Days' },
    amenities: ['A/C Apartments', 'Zero Brokerage'],
  },
  {
    id: 'prop-2',
    propCode: 'NS-0304',
    name: 'Nirvaana Studios',
    tagline: 'Private Luxury Studio Living',
    location: 'Symbiosis Viman Nagar, Pune',
    subLocation: 'Viman Nagar',
    address: 'Road No 12, Viman Nagar, Pune',
    gender: 'Co-ed',
    roomTypes: ['Studio'],
    enSuitesCount: 4,
    offSuitesCount: 4,
    startingPrice: 28000,
    coverImage: '/images/studios.jpg',
    galleryImages: [],
    description: 'Self-contained studios with kitchenette and luxury bath.',
    isStudioOnly: true,
    proximity: [{ spot: 'Phoenix Marketcity', distance: '1.2 km', time: '4 min drive' }],
    specifications: { carpetArea: '5,500 sq.ft', floors: '4 Floors', totalBeds: 12, securityDeposit: '1 Month', noticePeriod: '30 Days' },
    amenities: ['A/C Apartments', 'Fully Loaded Kitchen'],
  },
  {
    id: 'prop-3',
    propCode: 'NS-0708',
    name: 'Nirvaana Haven',
    tagline: 'Tree-lined Bliss in Koregaon Park',
    location: 'Koregaon Park / North Main Rd, Pune',
    subLocation: 'Koregaon Park',
    address: 'Lane 7, Koregaon Park, Pune',
    gender: 'Girls Only',
    roomTypes: ['Single En-Suite'],
    enSuitesCount: 6,
    offSuitesCount: 0,
    startingPrice: 22000,
    coverImage: '/images/haven.jpg',
    galleryImages: [],
    description: 'Curated female sanctuary surrounded by cafes and green lanes.',
    proximity: [{ spot: 'Osho Teerth Park', distance: '300m', time: '3 min walk' }],
    specifications: { carpetArea: '3,800 sq.ft', floors: '3 Floors', totalBeds: 10, securityDeposit: '1 Month', noticePeriod: '30 Days' },
    amenities: ['A/C Apartments', '24/7 CCTV & Biometric Security'],
  },
];

test('filterProperties correctly filters by location', () => {
  const result = filterProperties(mockProperties, { location: 'Koregaon Park' });
  assert.equal(result.length, 1);
  assert.equal(result[0].name, 'Nirvaana Haven');
});

test('filterProperties correctly filters by room type Studio', () => {
  const result = filterProperties(mockProperties, { roomType: 'Studio' });
  assert.equal(result.length, 1);
  assert.equal(result[0].name, 'Nirvaana Studios');
});

test('filterProperties correctly filters by suiteType Off-Suite', () => {
  const result = filterProperties(mockProperties, { suiteType: 'Off-Suite' });
  // prop-1 has 2 off-suites, prop-2 has 4 off-suites, prop-3 has 0
  assert.equal(result.length, 2);
});

test('calculateOwnerYield produces positive net and uplift', () => {
  const yieldResult = calculateOwnerYield({
    numberOfUnits: 10,
    expectedRentPerUnit: 20000,
    estimatedOccupancyPercent: 95,
  });

  assert.ok(yieldResult.monthlyNirvanaNetRevenue > 0);
  assert.ok(yieldResult.annualNirvanaRevenue > yieldResult.annualTraditionalRevenue);
  assert.ok(yieldResult.percentageUplift > 0);
});

test('calculateReferralDiscount computes correct tiers', () => {
  const zero = calculateReferralDiscount(0);
  assert.equal(zero.totalCredit, 0);

  const one = calculateReferralDiscount(1);
  assert.equal(one.totalCredit, 5000);

  const three = calculateReferralDiscount(3);
  assert.equal(three.totalCredit, 15000);
  assert.match(three.rewardTier, /Community Benefactor/);

  const five = calculateReferralDiscount(5);
  assert.equal(five.totalCredit, 25000);
  assert.match(five.rewardTier, /Nirvaana Legend/);
});

test('validatePhone and validateEmail check accurately', () => {
  assert.equal(validatePhone('9876543210'), true);
  assert.equal(validatePhone('+91 98765 43210'), true);
  assert.equal(validatePhone('12345'), false);

  assert.equal(validateEmail('hello@nirvaanastays.in'), true);
  assert.equal(validateEmail('invalid-email'), false);
});
