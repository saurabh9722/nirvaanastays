import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import {defineConfig} from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Plugin to serve assets directly from the ./assets directory in real-time
const serveLocalAssets = () => ({
  name: 'serve-local-assets',
  configureServer(server: any) {
    server.middlewares.use((req: any, res: any, next: any) => {
      const rawUrl = req.url ? req.url.split('?')[0] : '';
      if (rawUrl.startsWith('/assets/')) {
        const relativeName = rawUrl.replace(/^\/assets\//, '');
        const filePath = path.join(__dirname, 'assets', relativeName);
        if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
          const ext = path.extname(filePath).toLowerCase();
          const mimeTypes: Record<string, string> = {
            '.jpeg': 'image/jpeg',
            '.jpg': 'image/jpeg',
            '.png': 'image/png',
            '.webp': 'image/webp',
            '.svg': 'image/svg+xml',
          };
          res.setHeader('Content-Type', mimeTypes[ext] || 'application/octet-stream');
          res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
          fs.createReadStream(filePath).pipe(res);
          return;
        }
      }
      next();
    });
  },
  buildStart() {
    // Ensure public/assets exists and syncs from assets folder at build time
    try {
      const assetsDir = path.join(__dirname, 'assets');
      const publicAssetsDir = path.join(__dirname, 'public', 'assets');
      if (fs.existsSync(assetsDir)) {
        if (!fs.existsSync(publicAssetsDir)) {
          fs.mkdirSync(publicAssetsDir, { recursive: true });
        }
        const files = fs.readdirSync(assetsDir);
        for (const file of files) {
          const src = path.join(assetsDir, file);
          const dst = path.join(publicAssetsDir, file);
          if (fs.statSync(src).isFile()) {
            fs.copyFileSync(src, dst);
          }
        }
      }
    } catch {
      // Continue build if copy fails
    }
  },
});

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), serveLocalAssets()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
