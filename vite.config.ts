import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  base: 'stocky-client',
  plugins: [react(), eslint()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@/ui': resolve(__dirname, './src/Components/ui'),
      '@/Components': resolve(__dirname, './src/Components'),
    },
  },
});
