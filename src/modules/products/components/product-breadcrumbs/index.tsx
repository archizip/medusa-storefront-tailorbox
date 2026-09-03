import { HttpTypes } from "@medusajs/types"
import { getTranslations } from "next-intl/server"

import { listCategories } from "@lib/data/categories"
import { getCategoryChain } from "@lib/util/category-tree"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type ProductBreadcrumbsProps = {
  product: HttpTypes.StoreProduct
}

const ProductBreadcrumbs = async ({ product }: ProductBreadcrumbsProps) => {
  const t = await getTranslations("common")

  const allCategories = await listCategories({ limit: 100 }).catch(() => [])
  const categoriesById = new Map(
    (allCategories ?? []).filter((c) => c?.id).map((c) => [c.id, c])
  )

  // A product can sit in several categories; show the deepest chain, which is
  // the most specific place the customer could have arrived from.
  const chain = (product.categories ?? [])
    .map((category) => getCategoryChain(category.id, categoriesById))
    .sort((a, b) => b.length - a.length)[0]

  return (
    <nav
      aria-label={t("breadcrumbs")}
      className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-tb-ink-3"
      data-testid="product-breadcrumbs"
    >
      <LocalizedClientLink href="/" className="hover:text-tb-ink">
        {t("home")}
      </LocalizedClientLink>
      <span aria-hidden className="text-tb-ink-4">
        /
      </span>
      <LocalizedClientLink href="/store" className="hover:text-tb-ink">
        {t("store")}
      </LocalizedClientLink>
      {(chain ?? []).map((category) => (
        <span key={category.id} className="flex items-center gap-x-2">
          <span aria-hidden className="text-tb-ink-4">
            /
          </span>
          <LocalizedClientLink
            href={`/categories/${category.handle}`}
            className="hover:text-tb-ink"
          >
            {category.name}
          </LocalizedClientLink>
        </span>
      ))}
      <span aria-hidden className="text-tb-ink-4">
        /
      </span>
      <span aria-current="page" className="text-tb-ink">
        {product.title}
      </span>
    </nav>
  )
}

export default ProductBreadcrumbs
