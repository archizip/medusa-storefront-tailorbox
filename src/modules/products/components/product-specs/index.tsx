import { getTranslations } from "next-intl/server"

import { ProductAttribute } from "@lib/util/product-attributes"

import { attributeText } from "./attribute-text"

type ProductSpecsProps = {
  attributes: ProductAttribute[]
}

/**
 * The full attribute table of the "additional information" section. Attributes
 * are split into two balanced columns; empty ones were already dropped by
 * `getFullSpecs`.
 */
const ProductSpecs = async ({ attributes }: ProductSpecsProps) => {
  if (attributes.length === 0) {
    return null
  }

  const [tSpecs, tTags] = await Promise.all([
    getTranslations("product.specs"),
    getTranslations("productTags"),
  ])
  const { label, value } = attributeText(tSpecs, tTags)

  const half = Math.ceil(attributes.length / 2)
  const columns = [attributes.slice(0, half), attributes.slice(half)]

  return (
    <div
      className="grid grid-cols-1 gap-x-10 gap-y-4 small:grid-cols-2"
      data-testid="product-specs"
    >
      {columns.map((column, columnIndex) => (
        <dl key={columnIndex} className="flex flex-col gap-y-3 text-sm">
          {column.map((attribute) => (
            <div key={attribute.key} className="flex flex-col gap-y-0.5">
              <dt className="uppercase-label">{label(attribute)}</dt>
              <dd className="text-tb-ink-2">{value(attribute)}</dd>
            </div>
          ))}
        </dl>
      ))}
    </div>
  )
}

export default ProductSpecs
