import { HttpTypes } from "@medusajs/types"
import { getTranslations } from "next-intl/server"

import { getKeySpecs } from "@lib/util/product-attributes"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ProductKeySpecs from "@modules/products/components/product-key-specs"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
}

const ProductInfo = async ({ product }: ProductInfoProps) => {
  const t = await getTranslations("product")

  const keySpecs = getKeySpecs(product, { width: t("unitCm") })

  return (
    <div id="product-info" className="flex flex-col gap-y-4">
      {product.collection && (
        <LocalizedClientLink
          href={`/collections/${product.collection.handle}`}
          className="uppercase-label hover:text-tb-ink transition-colors"
        >
          {product.collection.title}
        </LocalizedClientLink>
      )}

      <h1
        className="serif text-4xl leading-tight text-tb-ink"
        data-testid="product-title"
      >
        {product.title}
      </h1>

      {product.subtitle && (
        <p className="text-sm text-tb-ink-3">{product.subtitle}</p>
      )}

      <ProductKeySpecs attributes={keySpecs} />

      {product.description && (
        <a
          href="#product-description"
          className="self-start text-xs text-tb-ink-3 underline decoration-tb-line hover:text-tb-ink"
          data-testid="see-full-description"
        >
          {t("seeFullDescription")}
        </a>
      )}
    </div>
  )
}

export default ProductInfo
