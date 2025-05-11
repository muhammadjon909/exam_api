import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    host: 'localhost',
    port: 3000,
    strictPort: true,
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 3000
    },
    proxy: {
      '/api': {
        target: 'https://api.noventer.uz',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        secure: false, // Agar HTTPS sertifikati ishonchsiz bo'lsa
      }
    }
  }
});