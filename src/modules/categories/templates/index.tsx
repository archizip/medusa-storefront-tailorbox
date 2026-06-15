import { notFound } from "next/navigation"
import { Suspense } from "react"

import { listCategories } from "@lib/data/categories"
import InteractiveLink from "@modules/common/components/interactive-link"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "@modules/store/templates/paginated-products"
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
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

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

  return (
    <div
      className="flex flex-col small:flex-row small:items-start py-6 content-container"
      data-testid="category-container"
    >
      <RefinementList
        sortBy={sort}
        categories={allCategories ?? []}
        currentCategory={category.handle}
        data-testid="sort-by-container"
      />
      <div className="w-full">
        <div className="flex flex-row mb-8 text-2xl-semi gap-4">
          {parents &&
            parents.map((parent) => (
              <span key={parent.id} className="text-ui-fg-subtle">
                <LocalizedClientLink
                  className="mr-4 hover:text-black"
                  href={`/categories/${parent.handle}`}
                  data-testid="sort-by-link"
                >
                  {parent.handle ? parent.name : parent.name}
                </LocalizedClientLink>
                /
              </span>
            ))}
          <h1 data-testid="category-page-title">
            {category.handle ? category.name : category.name}
          </h1>
        </div>
        {category.description && (
          <div className="mb-8 text-base-regular">
            <p>
              {category.handle ? category.description : category.description}
            </p>
          </div>
        )}
        {category.category_children && (
          <div className="mb-8 text-base-large">
            <ul className="grid grid-cols-1 gap-2">
              {category.category_children?.map((c) => (
                <li key={c.id}>
                  <InteractiveLink href={`/categories/${c.handle}`}>
                    {c.handle ? c.name : c.name}
                  </InteractiveLink>
                </li>
              ))}
            </ul>
          </div>
        )}
        <Suspense
          fallback={
            <SkeletonProductGrid
              numberOfProducts={category.products?.length ?? 8}
            />
          }
        >
          <PaginatedProducts
            sortBy={sort}
            page={pageNumber}
            categoryId={categoryIds}
            countryCode={countryCode}
          />
        </Suspense>
      </div>
    </div>
  )
}
