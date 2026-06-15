import { getTranslations } from "next-intl/server"

import { listCategories } from "@lib/data/categories"
import { listProducts } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import ProductFilters from "@modules/store/components/product-filters"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

const StoreTemplate = async ({
  sortBy,
  page,
  countryCode,
}: {
  sortBy?: SortOptions
  page?: string
  countryCode: string
}) => {
  const t = await getTranslations("store")

  const [categories, region, productsResult] = await Promise.all([
    listCategories({ limit: 100 }).catch(() => []),
    getRegion(countryCode),
    listProducts({
      pageParam: 1,
      queryParams: { limit: 100 },
      countryCode,
    }),
  ])

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
      <div style={{ marginBottom: 32 }}>
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

      {region && (
        <ProductFilters
          products={productsResult.response.products}
          region={region}
          categories={categories ?? []}
        />
      )}
    </div>
  )
}

export default StoreTemplate
