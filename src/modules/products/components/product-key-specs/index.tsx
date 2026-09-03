import { getTranslations } from "next-intl/server"

import { ProductAttribute } from "@lib/util/product-attributes"
import { attributeText } from "@modules/products/components/product-specs/attribute-text"

type ProductKeySpecsProps = {
  attributes: ProductAttribute[]
}

/**
 * The short attribute summary next to the title — width, technical properties,
 * density and intended use — laid out in two columns like the reference shop.
 */
const ProductKeySpecs = async ({ attributes }: ProductKeySpecsProps) => {
  if (attributes.length === 0) {
    return null
  }

  const [tSpecs, tTags, tProduct] = await Promise.all([
    getTranslations("product.specs"),
    getTranslations("productTags"),
    getTranslations("product"),
  ])
  const { label, value } = attributeText(tSpecs, tTags)

  return (
    <ul
      className="grid grid-cols-1 gap-x-8 gap-y-1.5 text-xs small:grid-cols-2"
      data-testid="product-key-specs"
    >
      {attributes.map((attribute) => (
        <li key={attribute.key} className="flex gap-x-1.5">
          <span aria-hidden className="text-tb-ink-4">
            •
          </span>
          <span className="text-tb-ink-2">
            {tProduct("specLine", {
              label: label(attribute),
              value: value(attribute),
            })}
          </span>
        </li>
      ))}
    </ul>
  )
}

export default ProductKeySpecs
