import { humanizeTag, ProductAttribute } from "@lib/util/product-attributes"

/**
 * The slice of a next-intl translator these helpers need. Kept structural so
 * the same code works with `getTranslations` (server) and `useTranslations`.
 */
type Translator = {
  (key: string): string
  has: (key: string) => boolean
}

/**
 * Resolves an attribute's label and display value. Tag-derived attributes are
 * translated tag by tag through the `productTags` namespace, falling back to a
 * humanised slug so a tag added in the admin before its translation exists
 * still renders readably.
 *
 * The label/value separator comes from the locale (French puts a space before
 * the colon), so no punctuation is baked into the components.
 */
export const attributeText = (tSpecs: Translator, tTags: Translator) => ({
  label: (attribute: ProductAttribute) => tSpecs(attribute.labelKey),

  value: (attribute: ProductAttribute) => {
    if (attribute.tagValues?.length) {
      return attribute.tagValues
        .map((tag) => (tTags.has(tag) ? tTags(tag) : humanizeTag(tag)))
        .join(", ")
    }
    return attribute.value ?? ""
  },
})

export type AttributeText = ReturnType<typeof attributeText>
