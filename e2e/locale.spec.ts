import { test, expect } from "@playwright/test"

const FRENCH_ANNOUNCEMENT = /LIVRAISON GRATUITE/i
const UKRAINIAN_ANNOUNCEMENT = /БЕЗКОШТОВНА ДОСТАВКА/i
const BASE_URL = process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:8000"

test.describe("locale: French browser, no saved preference", () => {
  test.use({ locale: "fr-FR" })

  test("renders French UI even when the URL region is not fr", async ({
    page,
  }) => {
    // Fresh context: no `_medusa_locale` cookie. Locale comes from Accept-Language
    // (`fr-FR` via test.use), not from the `/[countryCode]` region in the URL.
    await page.goto("/")
    await expect(page).toHaveURL(/\/[a-z]{2}(\/|$)/i)
    await expect(page.locator("html")).toHaveAttribute("lang", "fr")
    await expect(page.getByText(FRENCH_ANNOUNCEMENT)).toBeVisible()
  })
})

test.describe("locale: cookie overrides browser language", () => {
  test("uk cookie wins over a French Accept-Language", async ({ browser }) => {
    const context = await browser.newContext({ locale: "fr-FR" })
    await context.addCookies([
      {
        name: "_medusa_locale",
        value: "uk",
        url: BASE_URL,
        sameSite: "Lax",
      },
    ])
    const page = await context.newPage()

    await page.goto("/")
    await expect(page).toHaveURL(/\/[a-z]{2}(\/|$)/i)
    await expect(page.locator("html")).toHaveAttribute("lang", "uk")
    await expect(page.getByText(UKRAINIAN_ANNOUNCEMENT)).toBeVisible()

    await context.close()
  })
})

test.describe("locale: language switcher", () => {
  test.use({ locale: "uk-UA" })

  test("header switcher persists French and updates the UI", async ({
    page,
  }) => {
    await page.goto("/")
    await expect(page).toHaveURL(/\/[a-z]{2}(\/|$)/i)

    const headerControls = page.getByTestId("header-locale-controls")
    await expect(headerControls).toBeVisible()

    await headerControls.getByTestId("language-select").click()
    await page.getByRole("option", { name: "Français" }).click()

    await expect(page.locator("html")).toHaveAttribute("lang", "fr")
    await expect(page.getByText(FRENCH_ANNOUNCEMENT)).toBeVisible()

    const cookies = await page.context().cookies()
    const localeCookie = cookies.find((c) => c.name === "_medusa_locale")
    expect(localeCookie?.value).toBe("fr")
  })
})
