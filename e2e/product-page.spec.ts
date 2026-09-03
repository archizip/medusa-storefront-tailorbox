import { expect, Page, test } from "@playwright/test"

/**
 * E2E для страницы продукта (PDP): галерея с лайтбоксом, выбор метража,
 * блок «дополнительная информация», хлебные крошки.
 *
 * Тесты зависят от данных: нужен доступный Medusa backend с хотя бы одним
 * продуктом (URL и publishable key в .env.local1). Если каталог пуст или
 * backend недоступен, тесты помечаются как skipped, а не падают ложно.
 */

/** Находит handle первого продукта в каталоге. */
const firstProductUrl = async (page: Page): Promise<string | null> => {
  await page.goto("/store")

  const link = page.locator('a[href*="/products/"]').first()

  try {
    await link.waitFor({ state: "attached", timeout: 15_000 })
  } catch {
    return null
  }

  return link.getAttribute("href")
}

test.describe("страница продукта", () => {
  let productUrl: string | null = null

  test.beforeEach(async ({ page }) => {
    productUrl = await firstProductUrl(page)
    test.skip(
      !productUrl,
      "В каталоге нет продуктов (backend недоступен или пустой)"
    )
    await page.goto(productUrl!)

    // В dev-режиме роут компилируется при первом обращении, что заметно дольше
    // дефолтного таймаута assertion-ов.
    await page
      .getByTestId("product-container")
      .waitFor({ state: "visible", timeout: 60_000 })
  })

  /**
   * У товара с несколькими вариантами ничего не выбрано по умолчанию, а часть
   * UI (итог за метраж, добавление в корзину) требует конкретного варианта.
   */
  const selectFirstVariant = async (page: Page) => {
    for (const testId of ["option-swatch", "option-button"]) {
      const options = page.getByTestId(testId)
      if ((await options.count()) > 0) {
        await options.first().click()
        return
      }
    }
  }

  test("показывает заголовок, крошки и цену", async ({ page }) => {
    await expect(page.getByTestId("product-container")).toBeVisible()
    await expect(page.getByTestId("product-title")).toBeVisible()

    // Крошки всегда содержат как минимум «главная / каталог / <товар>».
    const breadcrumbs = page.getByTestId("product-breadcrumbs")
    await expect(breadcrumbs).toBeVisible()
    await expect(breadcrumbs.locator("a")).not.toHaveCount(0)

    await expect(page.getByTestId("product-price")).toBeVisible()
  })

  test("галерея открывается на весь экран и закрывается", async ({ page }) => {
    const gallery = page.getByTestId("product-gallery")
    test.skip((await gallery.count()) === 0, "У продукта нет изображений")

    await page.getByTestId("product-gallery-main").click()

    const lightbox = page.getByTestId("gallery-lightbox")
    await expect(lightbox).toBeVisible()

    // Зум доступен, пока не достигнут максимум.
    await page.getByTestId("lightbox-zoom-in").click()
    await expect(page.getByTestId("lightbox-zoom-out")).toBeEnabled()

    await page.getByTestId("lightbox-close").click()
    await expect(lightbox).toBeHidden()
  })

  test("метраж меняется и пересчитывает итог", async ({ page }) => {
    // Итог считается только для выбранного варианта: без него на экране цена
    // самого дешёвого, и умножать её на метраж было бы неверно.
    await selectFirstVariant(page)

    const input = page.getByTestId("quantity-input").first()
    await expect(input).toHaveValue("1")

    // На одном метре итог не показываем — он равен цене за метр.
    await expect(page.getByTestId("product-total")).toHaveCount(0)

    const increase = page.getByTestId("quantity-increase").first()
    test.skip(
      await increase.isDisabled(),
      "У выбранного варианта в наличии только 1 м"
    )

    await increase.click()
    await expect(input).toHaveValue("2")
    await expect(page.getByTestId("product-total")).toBeVisible()

    await page.getByTestId("quantity-decrease").first().click()
    await expect(input).toHaveValue("1")

    // Ниже одного метра уйти нельзя.
    await expect(page.getByTestId("quantity-decrease").first()).toBeDisabled()
  })

  test("гид по метражу раскрывается", async ({ page }) => {
    await page.getByTestId("metrage-guide-toggle").first().click()
    await expect(
      page.getByTestId("metrage-guide-content").first()
    ).toBeVisible()
  })

  test("ссылка ведёт к полному описанию", async ({ page }) => {
    const link = page.getByTestId("see-full-description")
    test.skip((await link.count()) === 0, "У продукта нет описания")

    await link.click()
    await expect(page.getByTestId("product-description")).toBeVisible()
  })

  test("блок дополнительной информации присутствует", async ({ page }) => {
    const details = page.getByTestId("product-details")
    test.skip(
      (await details.count()) === 0,
      "У продукта не заполнены характеристики и описание"
    )

    await expect(details).toBeVisible()
  })
})
