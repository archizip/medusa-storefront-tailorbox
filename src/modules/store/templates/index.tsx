import { Suspense } from "react"
import { getTranslations } from "next-intl/server"

import { listCategories } from "@lib/data/categories"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

import PaginatedProducts from "./paginated-products"

const StoreTemplate = async ({
  sortBy,
  page,
  countryCode,
}: {
  sortBy?: SortOptions
  page?: string
  countryCode: string
}) => {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  const t = await getTranslations("store")

  const categories = await listCategories({ limit: 100 }).catch(() => [])

  return (
    <div
      className="px-4 small:px-8 py-10"
      style={{
        maxWidth: 1360,
        margin: "0 auto",
      }}
      data-testid="category-container"
    >
      {/* Page header */}
      <div style={{ marginBottom: 40 }}>
        <div className="uppercase-label" style={{ marginBottom: 12 }}>
          {t("catalog")}
        </div>
        <h1
          className="serif"
          style={{
            fontSize: "clamp(36px, 5vw, 64px)",
            margin: 0,
            lineHeight: 1,
            letterSpacing: "-0.025em",
            color: "var(--ink)",
          }}
          data-testid="store-page-title"
        >
          {t("title")}
        </h1>
      </div>

      <div className="flex flex-col gap-6 small:flex-row small:gap-10 small:items-start">
        <RefinementList sortBy={sort} categories={categories ?? []} />
        <div className="w-full flex-1 min-w-0">
          <Suspense fallback={<SkeletonProductGrid />}>
            <PaginatedProducts
              sortBy={sort}
              page={pageNumber}
              countryCode={countryCode}
            />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default StoreTemplate
