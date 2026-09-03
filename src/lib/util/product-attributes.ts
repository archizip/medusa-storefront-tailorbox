import { HttpTypes } from "@medusajs/types"

/**
 * Fabric products carry their catalogue attributes in three different places:
 * native Medusa columns (`material`, `width`, `weight`, `origin_country`),
 * prefixed tags (`density-light`, `feature-organic`, …) and free-form
 * `metadata` — see PRODUCT_TYPES_AND_TAGS.md and PRODUCT_CREATION_GUIDE.md.
 *
 * The helpers below normalise all three into a flat list of attributes the
 * product page can render, without any component having to know where a given
 * value came from. They are pure: labels and units stay in `messages/*.json`
 * and are resolved by the components from the returned `labelKey`.
 */

/** Tag prefixes documented in PRODUCT_TYPES_AND_TAGS.md. */
export const TAG_PREFIXES = [
  "print",
  "color",
  "season",
  "density",
  "purpose",
  "feature",
] as const

export type TagPrefix = (typeof TAG_PREFIXES)[number]

export type GroupedTags = Record<TagPrefix, string[]> & { other: string[] }

/**
 * Readable fallback for a tag with no translation yet: strips the group prefix
 * and sentence-cases the rest — `"print-small-flowers"` → `"Small flowers"`.
 */
export const humanizeTag = (value: string): string => {
  const words = value
    .replace(new RegExp(`^(?:${TAG_PREFIXES.join("|")})-`), "")
    .replace(/-/g, " ")
    .trim()
  return words ? words.charAt(0).toUpperCase() + words.slice(1) : value
}

const emptyGroups = (): GroupedTags => ({
  print: [],
  color: [],
  season: [],
  density: [],
  purpose: [],
  feature: [],
  other: [],
})

/**
 * Buckets a product's tags by their documented prefix. Colourway (`color`) and
 * unprefixed (`other`) tags are collected too, but the product page does not
 * render them: colours are chosen through the variant options, and unprefixed
 * tags have no column to belong to.
 */
export const groupProductTags = (
  product: Pick<HttpTypes.StoreProduct, "tags">
): GroupedTags => {
  const groups = emptyGroups()

  for (const tag of product.tags ?? []) {
    const value = tag?.value?.trim()
    if (!value) continue

    const prefix = TAG_PREFIXES.find((p) => value.startsWith(`${p}-`))
    if (prefix) {
      groups[prefix].push(value)
    } else {
      groups.other.push(value)
    }
  }

  return groups
}

const metadataString = (
  metadata: HttpTypes.StoreProduct["metadata"],
  key: string
): string | undefined => {
  const value = metadata?.[key]
  if (typeof value === "string") {
    const trimmed = value.trim()
    return trimmed || undefined
  }
  if (typeof value === "number" && Number.isFinite(value)) {
    return String(value)
  }
  return undefined
}

/** True when a value is a bare number, i.e. it still needs its unit appended. */
const isBareNumber = (value: string) => /^-?\d+([.,]\d+)?$/.test(value.trim())

/**
 * Reads a measurement that may live in `metadata` (usually already carrying its
 * unit) or in a native numeric column. Either way the result ends up with a
 * unit, so `metadata.width = 145` renders as "145 cm" rather than "145".
 */
const measurement = (
  product: HttpTypes.StoreProduct,
  key: string,
  native: number | null | undefined,
  unit: string
): string | undefined => {
  const fromMetadata = metadataString(product.metadata, key)
  if (fromMetadata) {
    return isBareNumber(fromMetadata) ? `${fromMetadata} ${unit}` : fromMetadata
  }

  const fromColumn = numericValue(native)
  return fromColumn ? `${fromColumn} ${unit}` : undefined
}

/**
 * A single attribute row. `labelKey` is a key under the `product.specs`
 * namespace; `tagValues` is set for tag-derived rows so the component can
 * translate each tag individually instead of rendering a raw slug.
 */
export type ProductAttribute = {
  key: string
  labelKey: string
  value?: string
  tagValues?: string[]
}

const numericValue = (value?: number | null): string | undefined =>
  typeof value === "number" && Number.isFinite(value)
    ? String(value)
    : undefined

/**
 * Width in centimetres ("laize"). `metadata.width` wins when present because it
 * is entered with its own unit; otherwise the native column is formatted with
 * the caller-supplied unit.
 */
export const getWidth = (
  product: HttpTypes.StoreProduct,
  unit: string
): string | undefined => measurement(product, "width", product.width, unit)

/** Fabric weight (grammage). Same metadata-first rule as `getWidth`. */
export const getWeight = (
  product: HttpTypes.StoreProduct,
  unit: string
): string | undefined => measurement(product, "weight", product.weight, unit)

/** Fibre composition — `metadata.composition` first, then `material`. */
export const getComposition = (
  product: HttpTypes.StoreProduct
): string | undefined =>
  metadataString(product.metadata, "composition") ||
  product.material?.trim() ||
  undefined

/** ISO-2 origin country, from the native column or metadata. */
export const getOriginCountry = (
  product: HttpTypes.StoreProduct
): string | undefined => {
  const native = product.origin_country?.trim()
  if (native) return native.toUpperCase()

  const fromMetadata = metadataString(product.metadata, "origin_country")
  return fromMetadata?.length === 2 ? fromMetadata.toUpperCase() : fromMetadata
}

/**
 * The four-attribute summary shown next to the title (width, technical
 * properties, density, intended use), mirroring the reference fabric shop.
 * Rows without a value are omitted so the block never renders empty dashes.
 */
export const getKeySpecs = (
  product: HttpTypes.StoreProduct,
  units: { width: string }
): ProductAttribute[] => {
  const tags = groupProductTags(product)

  return [
    { key: "width", labelKey: "width", value: getWidth(product, units.width) },
    {
      key: "properties",
      labelKey: "properties",
      tagValues: tags.feature,
    },
    { key: "density", labelKey: "density", tagValues: tags.density },
    { key: "usage", labelKey: "usage", tagValues: tags.purpose },
  ].filter((spec) => spec.value || spec.tagValues?.length)
}

/**
 * The full attribute table ("informations complémentaires"). `reference` comes
 * from the selected variant's SKU when the caller knows it, so the table
 * matches what the customer is about to buy.
 */
export const getFullSpecs = (
  product: HttpTypes.StoreProduct,
  {
    units,
    reference,
    originLabel,
  }: {
    units: { width: string; weight: string }
    reference?: string
    originLabel?: string
  }
): ProductAttribute[] => {
  const tags = groupProductTags(product)

  return [
    { key: "reference", labelKey: "reference", value: reference },
    {
      key: "composition",
      labelKey: "composition",
      value: getComposition(product),
    },
    { key: "width", labelKey: "width", value: getWidth(product, units.width) },
    {
      key: "weight",
      labelKey: "weight",
      value: getWeight(product, units.weight),
    },
    { key: "density", labelKey: "density", tagValues: tags.density },
    { key: "properties", labelKey: "properties", tagValues: tags.feature },
    { key: "usage", labelKey: "usage", tagValues: tags.purpose },
    { key: "print", labelKey: "print", tagValues: tags.print },
    { key: "season", labelKey: "season", tagValues: tags.season },
    { key: "type", labelKey: "type", value: product.type?.value ?? undefined },
    { key: "origin", labelKey: "origin", value: originLabel },
    {
      key: "care",
      labelKey: "care",
      value: metadataString(product.metadata, "care_instructions"),
    },
  ].filter((spec) => spec.value || spec.tagValues?.length)
}
