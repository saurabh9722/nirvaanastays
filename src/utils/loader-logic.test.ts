import { test } from 'node:test';
import assert from 'node:assert';
import {
  calculateDissolveStartTime,
  shouldStartDissolve,
  calculateDissolveOpacity,
  isLoaderFinished,
} from './loader-logic.ts';

test('calculateDissolveStartTime accurately computes 3 seconds before end', () => {
  const duration = 10.0;
  const startTime = calculateDissolveStartTime(duration, 3.0);
  assert.strictEqual(startTime, 7.0);

  // Fallback / edge cases
  assert.strictEqual(calculateDissolveStartTime(2.0, 3.0), 0);
  assert.strictEqual(calculateDissolveStartTime(0, 3.0), 0);
});

test('shouldStartDissolve triggers only when within the final 3 seconds', () => {
  const duration = 10.0;
  assert.strictEqual(shouldStartDissolve(5.0, duration, 3.0), false);
  assert.strictEqual(shouldStartDissolve(6.9, duration, 3.0), false);
  assert.strictEqual(shouldStartDissolve(7.0, duration, 3.0), true);
  assert.strictEqual(shouldStartDissolve(8.5, duration, 3.0), true);
  assert.strictEqual(shouldStartDissolve(10.0, duration, 3.0), true);
});

test('calculateDissolveOpacity smoothly transitions from 1.0 to 0.0', () => {
  const duration = 10.0;
  // Before dissolve: 1.0
  assert.strictEqual(calculateDissolveOpacity(5.0, duration, 3.0), 1);
  assert.strictEqual(calculateDissolveOpacity(7.0, duration, 3.0), 1);

  // Halfway through 3s dissolve: 7.0 + 1.5 = 8.5s => 0.5 opacity
  assert.strictEqual(calculateDissolveOpacity(8.5, duration, 3.0), 0.5);

  // At end: 0.0
  assert.strictEqual(calculateDissolveOpacity(10.0, duration, 3.0), 0);
});

test('isLoaderFinished detects animation completion', () => {
  const duration = 10.0;
  assert.strictEqual(isLoaderFinished(7.0, duration), false);
  assert.strictEqual(isLoaderFinished(9.94, duration), false);
  assert.strictEqual(isLoaderFinished(9.96, duration), true);
  assert.strictEqual(isLoaderFinished(10.0, duration), true);
});
