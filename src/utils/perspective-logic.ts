/**
 * Pure calculation logic for 3D perspective alterer and reactive cursor light tracking
 */

export interface TiltResult {
  rotateX: number; // in degrees
  rotateY: number; // in degrees
  pctX: number; // -1 to 1 (from center)
  pctY: number; // -1 to 1 (from center)
  glareX: number; // 0 to 100%
  glareY: number; // 0 to 100%
  depthZ: number; // translation in Z
}

/**
 * Calculates 3D tilt angles and glare reflection positions based on cursor coordinates
 * relative to the bounding box of the card/image element.
 */
export function calculateTilt(
  clientX: number,
  clientY: number,
  rect: { left: number; top: number; width: number; height: number },
  maxTilt: number = 14,
  maxDepthZ: number = 20
): TiltResult {
  if (!rect || rect.width <= 0 || rect.height <= 0) {
    return {
      rotateX: 0,
      rotateY: 0,
      pctX: 0,
      pctY: 0,
      glareX: 50,
      glareY: 50,
      depthZ: 0,
    };
  }

  // Calculate mouse position relative to element top-left
  const x = clientX - rect.left;
  const y = clientY - rect.top;

  // Normalized to -1 (left/top) to +1 (right/bottom), centered at 0
  const normalizedX = (x / rect.width) * 2 - 1;
  const normalizedY = (y / rect.height) * 2 - 1;

  // Clamp within bounds [-1.2, 1.2] to prevent extreme overshooting
  const clampedX = Math.max(-1.2, Math.min(1.2, normalizedX));
  const clampedY = Math.max(-1.2, Math.min(1.2, normalizedY));

  // In 3D transforms:
  // Moving mouse down (clampedY > 0) tilts element forward away from viewer -> negative rotateX
  // Moving mouse right (clampedX > 0) tilts right side toward viewer or pushes right side away -> positive rotateY
  const rotateX = Number((-clampedY * maxTilt).toFixed(2));
  const rotateY = Number((clampedX * maxTilt).toFixed(2));

  // Specular Glare position (percentage 0 - 100)
  const glareX = Number((((clampedX + 1) / 2) * 100).toFixed(1));
  const glareY = Number((((clampedY + 1) / 2) * 100).toFixed(1));

  // Dynamic elevation depth based on distance from center
  const distFromCenter = Math.min(1, Math.sqrt(clampedX * clampedX + clampedY * clampedY));
  const depthZ = Number((maxDepthZ * (1 - distFromCenter * 0.3)).toFixed(1));

  return {
    rotateX,
    rotateY,
    pctX: Number(clampedX.toFixed(3)),
    pctY: Number(clampedY.toFixed(3)),
    glareX,
    glareY,
    depthZ,
  };
}

/**
 * Linear interpolation helper for smooth cursor follower movement
 */
export function lerp(start: number, end: number, factor: number): number {
  return start + (end - start) * factor;
}

/**
 * Calculates cursor speed or velocity between two frames
 */
export function calculateSpeed(
  prevX: number,
  prevY: number,
  currX: number,
  currY: number,
  deltaTimeMs: number
): number {
  if (deltaTimeMs <= 0) return 0;
  const dx = currX - prevX;
  const dy = currY - prevY;
  const dist = Math.sqrt(dx * dx + dy * dy);
  return (dist / deltaTimeMs) * 1000; // pixels per second
}
