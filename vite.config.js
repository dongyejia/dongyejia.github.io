import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: '127.0.0.1',
    port: 5173,
    strictPort: true,
    watch: {
      ignored: ['**/.local/**', '**/public/media/**', '**/public/pdfjs/**', '**/作品集-董烨嘉/**'],
    },
  },
});
