import { defineConfig, devices } from '@playwright/test'

// Local runs use the installed Chrome (no browser download needed);
// CI uses the bundled chromium instead.
const channel = process.env.CI ? undefined : 'chrome'

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  retries: 1,
  snapshotDir: './e2e/__snapshots__',
  expect: {
    toHaveScreenshot: { maxDiffPixelRatio: 0.02 },
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], channel },
      testIgnore: /visual\.spec\.js/,
    },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] }, testIgnore: /visual\.spec\.js/ },
    { name: 'webkit', use: { ...devices['Desktop Safari'] }, testIgnore: /visual\.spec\.js/ },
    // Visual regression of the home page: viewport fixed at 1470x1092 (2x the
    // reference shot); the test freezes motion via page.emulateMedia (the
    // reducedMotion context option is not honored by the test runner).
    // Baselines live in e2e/__snapshots__/ and are refreshed only via an
    // explicit `--update-snapshots` run.
    {
      name: 'visual',
      testMatch: /visual\.spec\.js/,
      use: {
        ...devices['Desktop Chrome'],
        channel,
        viewport: { width: 1470, height: 1092 },
      },
    },
  ],
  webServer: {
    command: 'npm run dev',
    port: 5173,
    reuseExistingServer: true,
  },
})
