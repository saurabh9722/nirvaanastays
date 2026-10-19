import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateTilt, lerp, calculateSpeed } from './perspective-logic.ts';

test('calculateTilt accurately computes center coordinates', () => {
  const rect = { left: 100, top: 100, width: 200, height: 200 };
  // Mouse at exact center (200, 200)
  const result = calculateTilt(200, 200, rect, 15);

  assert.equal(result.rotateX, 0);
  assert.equal(result.rotateY, 0);
  assert.equal(result.pctX, 0);
  assert.equal(result.pctY, 0);
  assert.equal(result.glareX, 50);
  assert.equal(result.glareY, 50);
});

test('calculateTilt computes top-left corner tilt', () => {
  const rect = { left: 0, top: 0, width: 100, height: 100 };
  // Mouse at top-left (0, 0)
  const result = calculateTilt(0, 0, rect, 10);

  // normalizedX = -1, normalizedY = -1
  // rotateX = -(-1 * 10) = 10
  // rotateY = -1 * 10 = -10
  assert.equal(result.rotateX, 10);
  assert.equal(result.rotateY, -10);
  assert.equal(result.glareX, 0);
  assert.equal(result.glareY, 0);
});

test('calculateTilt computes bottom-right corner tilt', () => {
  const rect = { left: 50, top: 50, width: 100, height: 100 };
  // Mouse at bottom-right (150, 150)
  const result = calculateTilt(150, 150, rect, 12);

  assert.equal(result.rotateX, -12);
  assert.equal(result.rotateY, 12);
  assert.equal(result.glareX, 100);
  assert.equal(result.glareY, 100);
});

test('calculateTilt safely handles zero dimensions', () => {
  const rect = { left: 0, top: 0, width: 0, height: 0 };
  const result = calculateTilt(50, 50, rect, 12);

  assert.equal(result.rotateX, 0);
  assert.equal(result.rotateY, 0);
  assert.equal(result.glareX, 50);
});

test('lerp accurately interpolates values', () => {
  assert.equal(lerp(0, 100, 0.5), 50);
  assert.equal(lerp(10, 20, 0.1), 11);
  assert.equal(lerp(100, 100, 0.8), 100);
});

test('calculateSpeed computes pixel velocity', () => {
  // Moved 100px in 100ms -> 1000 px/s
  const speed = calculateSpeed(0, 0, 100, 0, 100);
  assert.equal(Math.round(speed), 1000);

  // Zero delta time should return 0
  assert.equal(calculateSpeed(0, 0, 100, 0, 0), 0);
});
