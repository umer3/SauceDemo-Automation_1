// @ts-check
const { defineConfig, devices } = require('@playwright/test');
const config = require('./config/config');

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  //retries: 1,
  //retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  // reporter: 'html',
  
  reporter: [
    ['list'],
    ['html'],
    ['junit', { outputFile: 'test-results/junit-report.xml' }]
  ],

  
  
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    // 💡 1. INCREASE GLOBAL TEST TIMEOUT (Total time per test)
    // The current error is 30000ms. Increasing this to 60 or 90 seconds often helps.
    timeout: config.timeouts.globalTimeout,
    

    // 💡 2. SET ACTION TIMEOUT (Time per fill/click/select action)
    // This is the most crucial setting for the "stuck on every step" error.
    // Set a reasonable limit, like 10 seconds, for Playwright to wait for an element.
    actionTimeout: config.timeouts.elementTimeout, 

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    launchOptions: {
      slowMo: 1000,
    },
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // ... rest of the projects ...
  ],
  // ... rest of the file ...
});