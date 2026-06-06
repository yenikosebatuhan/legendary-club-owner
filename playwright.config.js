import { defineConfig, devices } from '@playwright/test'

/**
 * Playwright config for the Legendary Club Owner landing page.
 *
 * By default the suite starts the local Vite dev server and tests against it.
 * Set PW_BASE_URL to run the exact same tests against any deployed URL, e.g.
 * the live GitHub Pages site (no local server is started in that case):
 *
 *   PW_BASE_URL=https://yenikosebatuhan.github.io/legendary-club-owner/ npm run test:e2e
 */
const liveURL = process.env.PW_BASE_URL
const baseURL = liveURL || 'http://localhost:5173'

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile-safari', use: { ...devices['iPhone 13'] } },
  ],
  // Only spin up the dev server when testing locally.
  webServer: liveURL
    ? undefined
    : {
        command: 'npm run dev',
        url: 'http://localhost:5173',
        reuseExistingServer: !process.env.CI,
        timeout: 120 * 1000,
      },
})
