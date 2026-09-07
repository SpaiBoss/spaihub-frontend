import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // Do not proxy /portal — that path is the React captive portal SPA.
    // API portal calls use VITE_API_URL (see .env) so they hit the backend directly.
    proxy: {
      '/api': 'http://localhost:4000',
      '/uploads': 'http://localhost:4000',
      '/media': 'http://localhost:4000',
      '/webhooks': 'http://localhost:4000',
    },
  },
});
