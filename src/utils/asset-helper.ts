// Helper to resolve image paths reliably whether accessed via 'assets/file.jpeg', '/assets/file.jpeg', or 'file.jpeg'
// Includes a version query parameter to bust stale browser image caches when room photos are retouched.
const ASSET_CACHE_VERSION = 'v2';

export function getAssetUrl(filename: string): string {
  if (!filename) return '';
  if (filename.startsWith('http://') || filename.startsWith('https://') || filename.startsWith('data:')) {
    return filename;
  }
  // Strip leading slash or assets/ prefix
  const clean = filename.replace(/^\/?(assets\/)?/, '');
  const separator = clean.includes('?') ? '&' : '?';
  return `/assets/${clean}${separator}v=${ASSET_CACHE_VERSION}`;
}
