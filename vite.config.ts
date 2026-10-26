import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Keep the build output predictable for the SSR server.
    emptyOutDir: true,
    // Never inline assets as data: URIs, so the strict Content-Security-Policy (font-src 'self') holds.
    assetsInlineLimit: 0,
  },
  server: {
    hmr: process.env.DISABLE_HMR !== 'true',
  },
});
