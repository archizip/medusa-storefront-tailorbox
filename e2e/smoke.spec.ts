import { test, expect } from "@playwright/test"

/**
 * Smoke-тест: storefront поднимается и отдаёт главную.
 * `/` редиректится middleware на `/<countryCode>` (регион из заголовка или дефолт).
 *
 * Это базовый пример. Для новых пользовательских сценариев (каталог, корзина, чекаут,
 * аккаунт) добавляй отдельные *.spec.ts рядом. Тесты, зависящие от данных, требуют
 * доступного Medusa backend (URL в .env.local1).
 */
test.describe("storefront smoke", () => {
  test("главная загружается и редиректит на регион", async ({ page }) => {
    const response = await page.goto("/")

    // не должно быть 5xx
    expect(response?.status() ?? 200).toBeLessThan(500)

    // middleware должен увести с "/" на "/<countryCode>"
    await expect(page).toHaveURL(/\/[a-z]{2}(\/|$)/i)

    // страница отрендерилась — есть <body> с контентом и нет дефолтного экрана ошибки Next
    await expect(page.locator("body")).toBeVisible()
    await expect(page.locator("text=Application error")).toHaveCount(0)
  })

  test("есть навигация по сайту", async ({ page }) => {
    await page.goto("/")
    // в шапке есть хотя бы одна ссылка навигации
    await expect(page.locator("nav a, header a").first()).toBeVisible()
  })
})
