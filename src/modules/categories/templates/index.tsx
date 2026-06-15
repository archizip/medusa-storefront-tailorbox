import { notFound } from "next/navigation"

import { listCategories } from "@lib/data/categories"
import { listProducts } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import ProductFilters from "@modules/store/components/product-filters"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

export default async function CategoryTemplate({
  category,
  sortBy,
  page,
  countryCode,
}: {
  category: HttpTypes.StoreProductCategory
  sortBy?: SortOptions
  page?: string
  countryCode: string
}) {
  if (!category || !countryCode) notFound()

  const allCategories = await listCategories({ limit: 100 }).catch(() => [])

  const categoriesById = new Map((allCategories ?? []).map((c) => [c.id, c]))

  // Full breadcrumb chain (root → … → immediate parent). `getCategoryByHandle`
  // loads only the closest parent, so walk the whole chain via the flat list.
  const parents: HttpTypes.StoreProductCategory[] = []
  let breadcrumbParentId = (categoriesById.get(category.id) ?? category)
    .parent_category?.id
  while (breadcrumbParentId) {
    const parent = categoriesById.get(breadcrumbParentId)
    if (!parent) break
    parents.unshift(parent)
    breadcrumbParentId = parent.parent_category?.id
  }

  // Medusa's `category_id` filter is not recursive, so a parent category would
  // show no products of its own when items live in leaf categories. Collect the
  // current category plus every descendant (any depth) and filter by all of them.
  const childrenByParent = new Map<string, string[]>()
  for (const c of allCategories ?? []) {
    const parentId = c?.parent_category?.id
    if (!parentId || !c?.id) continue
    const siblings = childrenByParent.get(parentId) ?? []
    siblings.push(c.id)
    childrenByParent.set(parentId, siblings)
  }

  const categoryIds: string[] = []
  const stack = [category.id]
  while (stack.length) {
    const id = stack.pop()!
    categoryIds.push(id)
    stack.push(...(childrenByParent.get(id) ?? []))
  }

  const [region, productsResult] = await Promise.all([
    getRegion(countryCode),
    listProducts({
      pageParam: 1,
      queryParams: { limit: 100, category_id: categoryIds },
      countryCode,
    }),
  ])

  return (
    <div
      className="px-4 small:px-8 py-10"
      style={{ maxWidth: 1360, margin: "0 auto" }}
      data-testid="category-container"
    >
      {/* Breadcrumb + title */}
      <div style={{ marginBottom: 32 }}>
        <div
          className="serif"
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "baseline",
            gap: 12,
            fontSize: "clamp(28px, 4vw, 48px)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
          }}
        >
          {parents.map((parent) => (
            <span
              key={parent.id}
              style={{
                display: "inline-flex",
                alignItems: "baseline",
                gap: 12,
              }}
            >
              <LocalizedClientLink
                href={`/categories/${parent.handle}`}
                style={{ color: "var(--ink-3)" }}
                data-testid="sort-by-link"
              >
                {parent.name}
              </LocalizedClientLink>
              <span style={{ color: "var(--ink-4)" }}>/</span>
            </span>
          ))}
          <h1
            style={{ margin: 0, color: "var(--ink)" }}
            data-testid="category-page-title"
          >
            {category.name}
          </h1>
        </div>
        {category.description && (
          <p
            style={{
              marginTop: 16,
              maxWidth: 640,
              color: "var(--ink-2)",
              lineHeight: 1.6,
            }}
          >
            {category.description}
          </p>
        )}
      </div>

      {region && (
        <ProductFilters
          products={productsResult.response.products}
          region={region}
          categories={allCategories ?? []}
          currentCategory={category.handle}
        />
      )}
    </div>
  )
}
