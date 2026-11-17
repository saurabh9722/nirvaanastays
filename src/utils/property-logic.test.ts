import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validatePhone,
  validateEmail,
  shouldTriggerPopup,
  generateWhatsAppInquiryUrl,
} from './property-logic.ts';

test('validatePhone and validateEmail check accurately', () => {
  assert.equal(validatePhone('9876543210'), true);
  assert.equal(validatePhone('+91 98765 43210'), true);
  assert.equal(validatePhone('12345'), false);

  assert.equal(validateEmail('hello@nirvaanastays.in'), true);
  assert.equal(validateEmail('invalid-email'), false);
});

test('shouldTriggerPopup correctly honors 5s delay and dismissal', () => {
  assert.equal(shouldTriggerPopup(false, 3000, 5000), false);
  assert.equal(shouldTriggerPopup(false, 5000, 5000), true);
  assert.equal(shouldTriggerPopup(false, 6500, 5000), true);
  assert.equal(shouldTriggerPopup(true, 5000, 5000), false);
  assert.equal(shouldTriggerPopup(true, 10000, 5000), false);
});

test('generateWhatsAppInquiryUrl creates correct URL with encoded payload', () => {
  const url = generateWhatsAppInquiryUrl({
    name: 'Rohan Verma',
    phone: '9876543210',
    stayType: 'Boys’ Accommodation',
    roomType: 'Nirvaana Prime',
    property: 'Shubh Gateway',
    message: 'Visiting tomorrow at 4pm',
  });

  assert.match(url, /^https:\/\/wa\.me\/919096166306\?text=/);
  assert.ok(url.includes(encodeURIComponent('Rohan Verma')));
  assert.ok(url.includes(encodeURIComponent('Shubh Gateway')));
});
