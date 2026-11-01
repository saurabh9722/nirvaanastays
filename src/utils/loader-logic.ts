/**
 * Pure helper functions for website loader animation timing and dissolve transitions.
 */

/**
 * Calculates the exact timestamp when the dissolve transition must begin.
 * For example, a 10s video with 3s lead time begins dissolving at 7.0s.
 */
export function calculateDissolveStartTime(duration: number, leadTimeSeconds: number = 3): number {
  if (duration <= 0 || !Number.isFinite(duration)) return 0;
  return Math.max(0, duration - leadTimeSeconds);
}

/**
 * Determines whether the dissolve transition should currently be active.
 */
export function shouldStartDissolve(currentTime: number, duration: number, leadTimeSeconds: number = 3): boolean {
  if (duration <= 0 || !Number.isFinite(duration)) return false;
  const startTime = calculateDissolveStartTime(duration, leadTimeSeconds);
  return currentTime >= startTime;
}

/**
 * Calculates the normalized opacity (1.0 -> 0.0) during the 3-second dissolve window.
 */
export function calculateDissolveOpacity(currentTime: number, duration: number, leadTimeSeconds: number = 3): number {
  if (duration <= 0 || !Number.isFinite(duration)) return 0;
  const startTime = calculateDissolveStartTime(duration, leadTimeSeconds);
  
  if (currentTime < startTime) {
    return 1;
  }
  if (currentTime >= duration) {
    return 0;
  }
  
  const elapsedInDissolve = currentTime - startTime;
  const progress = Math.min(1, Math.max(0, elapsedInDissolve / leadTimeSeconds));
  return Number((1 - progress).toFixed(3));
}

/**
 * Checks if the video animation has reached completion.
 */
export function isLoaderFinished(currentTime: number, duration: number): boolean {
  if (duration <= 0 || !Number.isFinite(duration)) return true;
  return currentTime >= duration - 0.05;
}
