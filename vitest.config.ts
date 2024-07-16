/// <reference types="vitest" />
import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      root: './',
      globals: true,
      environment: 'jsdom',
      setupFiles: './tests/setup.ts',
      include: ['./**/*.test.{ts,tsx}'],
      coverage: {
        include: ['**/src/**'],
        exclude: ['**/tests/**', '**/ui/**'],
        reporter: ['text', 'json', 'html'],
        reportsDirectory: './tests/coverage',
      },
    },
  }),
);
