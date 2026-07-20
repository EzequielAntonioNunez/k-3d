import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.js',
    include: ['src/test/**/*.test.{js,jsx,ts,tsx}'],
    exclude: ['e2e/**', 'node_modules/**', 'dist/**'],
    coverage: {
      provider: 'v8',
      reporter: ['text'],
      include: ['src/**/*.{js,jsx}'],
      exclude: [
        // WebGL scenes can't run in jsdom; they are covered by Playwright E2E.
        'src/components/3d/**',
        'src/test/**',
        'src/main.jsx',
        'src/config/sentry.js',
        'src/assets/**',
      ],
      thresholds: { lines: 70, functions: 70, statements: 70 },
    },
  },
})
