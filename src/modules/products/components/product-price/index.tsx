"use client"

import { clx } from "@medusajs/ui"

import { getProductPrice } from "@lib/util/get-product-price"
import { useTranslations } from "@lib/util/i18n"
import { HttpTypes } from "@medusajs/types"

export default function ProductPrice({
  product,
  variant,
}: {
  product: HttpTypes.StoreProduct
  variant?: HttpTypes.StoreProductVariant
}) {
  const t = useTranslations("product")
  const { cheapestPrice, variantPrice } = getProductPrice({
    product,
    variantId: variant?.id,
  })

  const selectedPrice = variant ? variantPrice : cheapestPrice

  if (!selectedPrice) {
    return (
      <div className="block w-32 h-9 bg-tb-bg-deep animate-pulse rounded" />
    )
  }

  return (
    <div className="flex flex-col text-tb-ink">
      <span className="uppercase-label mb-1">{t("pricePerMeter")}</span>
      <span
        className={clx("serif text-3xl leading-none", {
          "text-tb-accent": selectedPrice.price_type === "sale",
        })}
      >
        {!variant && `${t("from")} `}
        <span
          data-testid="product-price"
          data-value={selectedPrice.calculated_price_number}
        >
          {selectedPrice.calculated_price}
        </span>
      </span>
      {selectedPrice.price_type === "sale" && (
        <div className="mt-2 flex items-center gap-x-2 text-sm">
          <span className="text-tb-ink-3">{t("original")}:</span>
          <span
            className="line-through text-tb-ink-3"
            data-testid="original-product-price"
            data-value={selectedPrice.original_price_number}
          >
            {selectedPrice.original_price}
          </span>
          <span className="text-tb-accent font-semibold">
            -{selectedPrice.percentage_diff}%
          </span>
        </div>
      )}
    </div>
  )
}
