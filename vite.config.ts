import path from 'path';
import { fileURLToPath } from 'url';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Vite Configuration — NIRVAANA Stays
 * - Uses @vitejs/plugin-react and @tailwindcss/vite (Tailwind CSS v4).
 * - Static media & brand SVGs are served natively by Vite from `public/assets/` at `/assets/*`.
 */
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
  server: {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate',
    },
    // HMR can be toggled via DISABLE_HMR env var to prevent flickering during automated edits.
    hmr: process.env.DISABLE_HMR !== 'true',
    watch: process.env.DISABLE_HMR === 'true' ? null : {},
  },
});
