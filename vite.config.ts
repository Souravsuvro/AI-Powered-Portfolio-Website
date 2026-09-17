import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (
              id.includes('recharts') ||
              id.includes('react-syntax-highlighter') ||
              id.includes('unsplash-js')
            ) {
              return 'vendor-charts';
            }
            if (
              id.includes('framer-motion') ||
              id.includes('react-type-animation')
            ) {
              return 'vendor-animations';
            }
            return 'vendor';
          }
        },
      },
    },
  },
});
