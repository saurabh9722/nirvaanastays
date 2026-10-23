// Helper to resolve image paths reliably whether accessed via 'assets/file.jpeg', '/assets/file.jpeg', or 'file.jpeg'
export function getAssetUrl(filename: string): string {
  if (!filename) return '';
  if (filename.startsWith('http://') || filename.startsWith('https://') || filename.startsWith('data:')) {
    return filename;
  }
  // Strip leading slash or assets/ prefix
  const clean = filename.replace(/^\/?(assets\/)?/, '');
  return `/assets/${clean}`;
}
