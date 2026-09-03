import { HttpTypes } from "@medusajs/types"

import { listCategories } from "@lib/data/categories"
import { getLocale } from "@lib/data/locale-actions"
import { buildCategoryTree, CategoryTreeNode } from "@lib/util/category-tree"
import { resolveImageUrl } from "@lib/util/image-url"
import CatalogBrowserClient, { CatalogSection } from "./catalog-browser-client"

const PREVIEW_PRODUCTS = 2

/** Все потомки рубрики одним плоским списком. */
function flattenDescendants(node: CategoryTreeNode): CategoryTreeNode[] {
  return node.children.flatMap((child) => [child, ...flattenDescendants(child)])
}

/**
 * Товары рубрики вместе со всеми вложенными: один и тот же товар может лежать
 * в нескольких категориях, поэтому дедуплицируем по id.
 */
function collectProducts(node: CategoryTreeNode): HttpTypes.StoreProduct[] {
  const byId = new Map<string, HttpTypes.StoreProduct>()

  const walk = (current: CategoryTreeNode) => {
    for (const product of current.category.products ?? []) {
      if (product?.id && !byId.has(product.id)) {
        byId.set(product.id, product)
      }
    }
    current.children.forEach(walk)
  }

  walk(node)

  return Array.from(byId.values())
}

const productImage = (product: HttpTypes.StoreProduct) =>
  resolveImageUrl(product.thumbnail ?? product.images?.[0]?.url)

/**
 * Каталог сразу на главной: рубрики слева, раскрытая рубрика справа,
 * плюс режим «весь каталог целиком».
 *
 * Дерево, счётчики и картинки считаются здесь, на сервере: в клиент уезжает
 * только то, что рисуется, а не сто категорий с раскрытыми товарами.
 */
async function CatalogBrowser() {
  const [categories, locale] = await Promise.all([
    listCategories({ limit: 100 }),
    getLocale(),
  ])

  if (!categories || categories.length === 0) {
    return null
  }

  // Из-за лимита выборки родитель категории может не приехать — тогда
  // `buildCategoryTree` считает её корневой, и подкатегория вылезает в ленту
  // рубрик как самостоятельный раздел. Такие узлы отбрасываем.
  const fetchedIds = new Set(categories.map((category) => category.id))
  const rooted = categories.filter(
    (category) =>
      !category.parent_category?.id ||
      fetchedIds.has(category.parent_category.id)
  )

  const collator = new Intl.Collator(locale ?? undefined)

  const sections: CatalogSection[] = buildCategoryTree(rooted)
    .map((root) => {
      const descendants = flattenDescendants(root)
      const groupIds = new Set(root.children.map((child) => child.category.id))
      // Прямые подкатегории показываются пилюлями, поэтому в колонках — только
      // то, что лежит глубже. Если каталог двухуровневый, колонки берут детей.
      const deeper = descendants.filter(
        (node) => !groupIds.has(node.category.id)
      )
      const entries = deeper.length > 0 ? deeper : root.children
      const products = collectProducts(root)

      return {
        id: root.category.id,
        name: root.category.name ?? "",
        handle: root.category.handle,
        description: root.category.description ?? null,
        productCount: products.length,
        image: products.map(productImage).find(Boolean),
        groups:
          deeper.length > 0
            ? root.children.map((child) => ({
                id: child.category.id,
                name: child.category.name ?? "",
                handle: child.category.handle,
              }))
            : [],
        entries: entries.map((node) => ({
          id: node.category.id,
          name: node.category.name ?? "",
          handle: node.category.handle,
        })),
        preview: products
          .filter((product) => product.handle)
          .slice(0, PREVIEW_PRODUCTS)
          .map((product) => ({
            id: product.id,
            title: product.title ?? "",
            handle: product.handle,
            image: productImage(product),
          })),
        subcategoryCount: descendants.length,
      }
    })
    // Самая наполненная рубрика идёт первой: каталог сразу выглядит каталогом,
    // а на мобильном активная рубрика — первая в горизонтальной ленте.
    .sort(
      (a, b) =>
        b.subcategoryCount - a.subcategoryCount ||
        b.productCount - a.productCount ||
        collator.compare(a.name, b.name)
    )

  if (sections.length === 0) {
    return null
  }

  return <CatalogBrowserClient sections={sections} />
}

export default CatalogBrowser
