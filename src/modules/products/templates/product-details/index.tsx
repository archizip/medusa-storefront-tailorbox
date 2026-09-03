import { HttpTypes } from "@medusajs/types"
import { getLocale, getTranslations } from "next-intl/server"

import { getCountryName } from "@lib/util/country-names"
import { normalizeLocale } from "@lib/util/normalize-locale"
import { getFullSpecs, getOriginCountry } from "@lib/util/product-attributes"
import ProductSpecs from "@modules/products/components/product-specs"

type ProductDetailsProps = {
  product: HttpTypes.StoreProduct
  selectedVariantId?: string
}

/**
 * The "additional information" section: the full attribute table next to the
 * complete product description, matching the reference fabric shop's layout.
 */
const ProductDetails = async ({
  product,
  selectedVariantId,
}: ProductDetailsProps) => {
  const t = await getTranslations("product")
  const locale = await getLocale()

  const originCode = getOriginCountry(product)
  const originLabel =
    originCode?.length === 2
      ? getCountryName(originCode, normalizeLocale(locale))
      : originCode

  // Show the SKU of what the customer is about to buy, falling back to the
  // product's only/first variant when no variant is selected yet.
  const variant =
    product.variants?.find((v) => v.id === selectedVariantId) ??
    product.variants?.[0]

  const specs = getFullSpecs(product, {
    units: { width: t("unitCm"), weight: t("unitGsm") },
    reference: variant?.sku ?? undefined,
    originLabel,
  })

  if (specs.length === 0 && !product.description) {
    return null
  }

  return (
    <section
      className="border-y border-tb-line-soft bg-tb-bg-card"
      data-testid="product-details"
    >
      <div className="content-container py-12 small:py-16">
        <h2 className="uppercase-label mb-8">{t("additionalInformation")}</h2>

        <div className="grid grid-cols-1 gap-10 small:grid-cols-3">
          <div className="small:col-span-2">
            <ProductSpecs attributes={specs} />
          </div>

          {product.description && (
            <div id="product-description" className="scroll-mt-32">
              <h3 className="mb-3 text-sm font-semibold text-tb-ink">
                {t("fullDescription")}
              </h3>
              <p
                className="whitespace-pre-line text-sm leading-relaxed text-tb-ink-2"
                data-testid="product-description"
              >
                {product.description}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default ProductDetails
