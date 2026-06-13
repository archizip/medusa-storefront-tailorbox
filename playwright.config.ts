import { defineConfig, devices } from "@playwright/test"

/**
 * Playwright E2E конфиг для TailorBox storefront.
 * Поднимает dev-сервер (yarn dev, порт 8000) автоматически.
 * Документация: https://playwright.dev/docs/test-configuration
 */
const PORT = 8000
const BASE_URL = process.env.PLAYWRIGHT_BASE_URL ?? `http://localhost:${PORT}`

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: BASE_URL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  // Переиспользуем dev-сервер. Он сам подставляет .env.local1 (см. scripts/dev-with-env.js).
  webServer: {
    command: "yarn dev",
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
})
