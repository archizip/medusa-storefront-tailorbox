import { test, expect } from "@playwright/test"

/**
 * Каталог на главной: рубрики видны сразу, переключаются, и разворачиваются
 * в полный список. Тест зависит от данных — нужен доступный Medusa backend
 * хотя бы с одной категорией (URL в .env.local1).
 */
test.describe("каталог на главной", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/")
    await expect(page).toHaveURL(/\/[a-z]{2}(\/|$)/i)
  })

  test("каталог виден сразу, без клика", async ({ page }) => {
    const catalog = page.getByTestId("home-catalog")
    await expect(catalog).toBeVisible()

    // рубрики слева и раскрытая рубрика справа
    await expect(catalog.getByTestId("catalog-rail-item").first()).toBeVisible()
    const panel = catalog.getByTestId("catalog-panel")
    await expect(panel).toBeVisible()
    await expect(panel.getByTestId("catalog-panel-title")).not.toBeEmpty()

    // ссылка на саму рубрику есть всегда; на подкатегории — только если они есть
    const categoryLinks = panel.locator('a[href*="/categories/"]')
    await expect(categoryLinks.first()).toBeVisible()
  })

  test("выбор рубрики переключает панель", async ({ page }) => {
    const catalog = page.getByTestId("home-catalog")
    const railItems = catalog.getByTestId("catalog-rail-item")
    const count = await railItems.count()

    test.skip(count < 2, "в каталоге меньше двух корневых рубрик")

    const title = catalog.getByTestId("catalog-panel-title")
    const before = (await title.textContent())?.trim()

    await railItems.nth(1).click()
    await expect(railItems.nth(1)).toHaveAttribute("aria-selected", "true")
    await expect(title).not.toHaveText(before ?? "")
  })

  test("рубрики переключаются стрелками с клавиатуры", async ({ page }) => {
    const catalog = page.getByTestId("home-catalog")
    const railItems = catalog.getByTestId("catalog-rail-item")
    const count = await railItems.count()

    test.skip(count < 2, "в каталоге меньше двух корневых рубрик")

    await railItems.first().focus()
    await page.keyboard.press("ArrowDown")

    await expect(railItems.nth(1)).toHaveAttribute("aria-selected", "true")
    await expect(railItems.nth(1)).toBeFocused()
  })

  test("каталог разворачивается целиком и сворачивается обратно", async ({
    page,
  }) => {
    const catalog = page.getByTestId("home-catalog")
    const toggle = catalog.getByTestId("catalog-expand-toggle")

    await expect(catalog.getByTestId("catalog-expanded")).toHaveCount(0)

    await toggle.click()
    await expect(catalog.getByTestId("catalog-expanded")).toBeVisible()
    await expect(toggle).toHaveAttribute("aria-expanded", "true")
    await expect(catalog.getByTestId("catalog-panel")).toHaveCount(0)

    await toggle.click()
    await expect(catalog.getByTestId("catalog-panel")).toBeVisible()
    await expect(toggle).toHaveAttribute("aria-expanded", "false")
  })
})
