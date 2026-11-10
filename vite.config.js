import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './' keeps the build portable: dist/ can be uploaded to any folder on any static host.
export default defineConfig({
  base: './',
  plugins: [react()],
});
