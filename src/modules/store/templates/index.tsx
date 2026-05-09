import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

import PaginatedProducts from "./paginated-products"

const StoreTemplate = ({
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

  return (
    <div
      style={{
        maxWidth: 1360,
        margin: "0 auto",
        padding: "40px 32px",
      }}
      data-testid="category-container"
    >
      {/* Page header */}
      <div style={{ marginBottom: 40 }}>
        <div className="uppercase-label" style={{ marginBottom: 12 }}>Каталог тканин</div>
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
          Всі тканини
        </h1>
      </div>

      <div style={{ display: "flex", gap: 40, alignItems: "flex-start" }}>
        <RefinementList sortBy={sort} />
        <div style={{ flex: 1, minWidth: 0 }}>
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
