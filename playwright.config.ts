import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './playwright',
  outputDir: './playwright/test-results',
  snapshotPathTemplate: '{testDir}/snapshots/{arg}{ext}',
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 2,
  reporter: process.env.CI
    ? [['line'], ['html', { open: 'never' }], ['json', { outputFile: 'playwright/results.json' }]]
    : [['line'], ['html', { open: 'never' }]],
  use: {
    ...devices['Desktop Chrome'],
    viewport: { width: 1280, height: 800 },
    baseURL: 'http://127.0.0.1:6006',
    timezoneId: 'UTC',
    locale: 'en-US',
    trace: 'retain-on-failure',
  },
  webServer: {
    command: 'node scripts/serve-storybook.mjs',
    url: 'http://127.0.0.1:6006',
    reuseExistingServer: false,
  },
});
