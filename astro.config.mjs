import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react()],
  build: {
    // Inline small stylesheets for faster initial render
    inlineStylesheets: 'auto',
  },
  compressHTML: true,
  vite: {
    build: {
      cssMinify: true,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ['console.log', 'console.info', 'console.debug'],
        },
        mangle: true,
      },
      // Enable chunk splitting for better caching
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom'],
          },
        },
      },
    },
    // Optimize dependency pre-bundling
    optimizeDeps: {
      include: ['react', 'react-dom'],
    },
  },
});
