import test from 'node:test';
import assert from 'node:assert/strict';
import { ROOM_TIERS, ROOM_TIER_SELECT_OPTIONS } from '../data/roomTiers.ts';
import { generateWhatsAppInquiryUrl } from './property-logic.ts';

test('ROOM_TIERS contains exact updated prices from prompt', () => {
  const lite = ROOM_TIERS.find((r) => r.id === 'lite');
  assert.ok(lite);
  assert.equal(lite.price, 18999);
  assert.equal(lite.priceFormatted, '₹18,999');
  assert.equal(lite.subtitle, 'Non-Attached Washroom');

  const plus = ROOM_TIERS.find((r) => r.id === 'plus');
  assert.ok(plus);
  assert.equal(plus.price, 22999);
  assert.equal(plus.priceFormatted, '₹22,999');
  assert.equal(plus.subtitle, 'Attached Balcony + Non-Attached Washroom');

  const prime = ROOM_TIERS.find((r) => r.id === 'prime');
  assert.ok(prime);
  assert.equal(prime.price, 24999);
  assert.equal(prime.priceFormatted, '₹24,999');
  assert.equal(prime.subtitle, 'Attached Washroom + Balcony');

  const elite = ROOM_TIERS.find((r) => r.id === 'elite');
  assert.ok(elite);
  assert.equal(elite.price, 25999);
  assert.equal(elite.priceFormatted, '₹25,999');
  assert.equal(elite.subtitle, 'Master Bedroom + Attached Washroom');
});

test('ROOM_TIER_SELECT_OPTIONS gives complete information with zero truncation', () => {
  assert.equal(ROOM_TIER_SELECT_OPTIONS.length, 4);
  ROOM_TIER_SELECT_OPTIONS.forEach((opt) => {
    assert.ok(opt.title.startsWith('Nirvaana'));
    assert.ok(opt.subtitle.length > 5);
    assert.ok(opt.price.startsWith('₹'));
    assert.ok(opt.value.includes(opt.price));
  });
});

test('generateWhatsAppInquiryUrl includes the updated prices in message payload', () => {
  const plusOpt = ROOM_TIER_SELECT_OPTIONS.find((o) => o.title === 'Nirvaana Plus')!;
  const urlPlus = generateWhatsAppInquiryUrl({
    name: 'Pooja Patil',
    phone: '9876543210',
    stayType: 'Girls’ Accommodation',
    roomType: plusOpt.value,
    property: 'Shubh Gateway',
  });
  assert.ok(urlPlus.includes(encodeURIComponent('₹22,999')));

  const eliteOpt = ROOM_TIER_SELECT_OPTIONS.find((o) => o.title === 'Nirvaana Elite')!;
  const urlElite = generateWhatsAppInquiryUrl({
    name: 'Aman Shah',
    phone: '9876543210',
    stayType: 'Boys’ Accommodation',
    roomType: eliteOpt.value,
    property: 'Shubh Nirvaana',
  });
  assert.ok(urlElite.includes(encodeURIComponent('₹25,999')));
});
