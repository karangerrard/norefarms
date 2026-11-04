import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/norefarms/',
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
  build: {
    outDir: 'docs',
    rollupOptions: {
      input: {
        home: 'index.html',
        milk: 'products/cow-milk/index.html',
        paneer: 'products/paneer/index.html',
        ghee: 'products/ghee/index.html',
      },
    },
  },
});