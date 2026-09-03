"use client"

import { addToCart } from "@lib/data/cart"
import { useIntersection } from "@lib/hooks/use-in-view"
import { getProductPrice } from "@lib/util/get-product-price"
import { useTranslations } from "@lib/util/i18n"
import { resolveImageUrl } from "@lib/util/image-url"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import { Button } from "@medusajs/ui"
import MetrageGuide from "@modules/products/components/metrage-guide"
import OptionSelect from "@modules/products/components/product-actions/option-select"
import QuantitySelector from "@modules/products/components/quantity-selector"
import { isEqual } from "lodash"
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"

import ProductPrice from "../product-price"
import MobileActions from "./mobile-actions"

type ProductActionsProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  disabled?: boolean
}

/** Option titles whose values are colourways and deserve image swatches. */
const COLOR_OPTION_TITLES = ["color", "colour", "couleur", "цвет", "колір"]

const optionsAsKeymap = (
  variantOptions: HttpTypes.StoreProductVariant["options"]
) => {
  return variantOptions?.reduce((acc: Record<string, string>, varopt: any) => {
    acc[varopt.option_id] = varopt.value
    return acc
  }, {})
}

/**
 * Maps each value of a colour option to the image of the first variant carrying
 * that value. Values whose variant has no image of its own are left out, and
 * `OptionSelect` then falls back to text pills for the whole option rather than
 * showing a row of identical tiles.
 */
const swatchesForOption = (
  product: HttpTypes.StoreProduct,
  option: HttpTypes.StoreProductOption
): Record<string, string | undefined> | undefined => {
  const isColorOption = COLOR_OPTION_TITLES.includes(
    (option.title ?? "").trim().toLowerCase()
  )

  if (!isColorOption) {
    return undefined
  }

  const swatches: Record<string, string | undefined> = {}

  for (const variant of product.variants ?? []) {
    const value = variant.options?.find(
      (optionValue) => optionValue.option_id === option.id
    )?.value
    if (!value || swatches[value]) continue

    swatches[value] = resolveImageUrl(variant.images?.[0]?.url)
  }

  return swatches
}

export default function ProductActions({
  product,
  disabled,
}: ProductActionsProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const t = useTranslations("common")
  const tp = useTranslations("product")

  const [options, setOptions] = useState<Record<string, string | undefined>>({})
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)
  const [addError, setAddError] = useState<string | null>(null)
  const countryCode = useParams().countryCode as string

  // If there is only 1 variant, preselect the options
  useEffect(() => {
    if (product.variants?.length === 1) {
      const variantOptions = optionsAsKeymap(product.variants[0].options)
      setOptions(variantOptions ?? {})
    }
  }, [product.variants])

  const selectedVariant = useMemo(() => {
    if (!product.variants || product.variants.length === 0) {
      return
    }

    return product.variants.find((v) => {
      const variantOptions = optionsAsKeymap(v.options)
      return isEqual(variantOptions, options)
    })
  }, [product.variants, options])

  // update the options when a variant is selected
  const setOptionValue = (optionId: string, value: string) => {
    setOptions((prev) => ({
      ...prev,
      [optionId]: value,
    }))
  }

  //check if the selected options produce a valid variant
  const isValidVariant = useMemo(() => {
    return product.variants?.some((v) => {
      const variantOptions = optionsAsKeymap(v.options)
      return isEqual(variantOptions, options)
    })
  }, [product.variants, options])

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    const value = isValidVariant ? selectedVariant?.id : null

    if (params.get("v_id") === value) {
      return
    }

    if (value) {
      params.set("v_id", value)
    } else {
      params.delete("v_id")
    }

    router.replace(pathname + "?" + params.toString())
  }, [selectedVariant, isValidVariant])

  // check if the selected variant is in stock
  const inStock = useMemo(() => {
    // If we don't manage inventory, we can always add to cart
    if (selectedVariant && !selectedVariant.manage_inventory) {
      return true
    }

    // If we allow back orders on the variant, we can add to cart
    if (selectedVariant?.allow_backorder) {
      return true
    }

    // If there is inventory available, we can add to cart
    if (
      selectedVariant?.manage_inventory &&
      (selectedVariant?.inventory_quantity || 0) > 0
    ) {
      return true
    }

    // Otherwise, we can't add to cart
    return false
  }, [selectedVariant])

  /**
   * Longest length the customer may order: the stock on hand when the variant
   * tracks inventory and does not allow back orders, unlimited otherwise.
   */
  const maxQuantity = useMemo(() => {
    if (
      selectedVariant?.manage_inventory &&
      !selectedVariant.allow_backorder &&
      typeof selectedVariant.inventory_quantity === "number"
    ) {
      return selectedVariant.inventory_quantity
    }
    return undefined
  }, [selectedVariant])

  // Start from one metre again on every variant change, so a length picked for
  // one colourway is never carried over to another with different stock.
  useEffect(() => {
    setQuantity(1)
  }, [selectedVariant?.id])

  const { variantPrice, cheapestPrice } = useMemo(
    () => getProductPrice({ product, variantId: selectedVariant?.id }),
    [product, selectedVariant?.id]
  )

  const selectedPrice = selectedVariant ? variantPrice : cheapestPrice

  /**
   * Order total for the chosen length. Only shown for a concrete variant: with
   * none selected the displayed price is the cheapest one, which would not be
   * what the customer ends up paying.
   */
  const total = useMemo(() => {
    if (!selectedVariant || !variantPrice || quantity < 2) {
      return null
    }

    return convertToLocale({
      amount: variantPrice.calculated_price_number * quantity,
      currency_code: variantPrice.currency_code,
    })
  }, [selectedVariant, variantPrice, quantity])

  const actionsRef = useRef<HTMLDivElement>(null)

  const inView = useIntersection(actionsRef, "0px")

  // add the selected variant to the cart
  const handleAddToCart = async () => {
    if (!selectedVariant?.id) return

    setIsAdding(true)
    setAddError(null)

    try {
      await addToCart({
        variantId: selectedVariant.id,
        quantity,
        countryCode,
      })
    } catch (error) {
      setAddError(
        error instanceof Error && error.message ? error.message : t("error")
      )
    } finally {
      setIsAdding(false)
    }
  }

  return (
    <div className="flex flex-col gap-y-5" ref={actionsRef}>
      {(product.variants?.length ?? 0) > 1 && (
        <div className="flex flex-col gap-y-4">
          {(product.options || []).map((option) => (
            <OptionSelect
              key={option.id}
              option={option}
              current={options[option.id]}
              updateOption={setOptionValue}
              title={option.title ?? ""}
              swatches={swatchesForOption(product, option)}
              data-testid="product-options"
              disabled={!!disabled || isAdding}
            />
          ))}
        </div>
      )}

      <div className="flex flex-col gap-y-3">
        <div className="flex items-baseline justify-between gap-x-4">
          <span className="uppercase-label">{tp("quantity")}</span>
          <MetrageGuide />
        </div>

        <div className="flex flex-wrap items-end justify-between gap-4">
          <QuantitySelector
            value={quantity}
            onChange={setQuantity}
            max={maxQuantity}
            disabled={!!disabled || isAdding || (!!selectedVariant && !inStock)}
          />
          <ProductPrice product={product} variant={selectedVariant} />
        </div>

        {total && (
          <div className="flex items-baseline gap-x-2 text-sm">
            <span className="text-tb-ink-3">{tp("total")}</span>
            <span
              className="text-tb-ink font-semibold"
              data-testid="product-total"
            >
              {total}
            </span>
          </div>
        )}
      </div>

      <Button
        onClick={handleAddToCart}
        disabled={
          !inStock ||
          !selectedVariant ||
          !!disabled ||
          isAdding ||
          !isValidVariant
        }
        variant="primary"
        className="w-full h-11"
        isLoading={isAdding}
        data-testid="add-product-button"
      >
        {!selectedVariant && !isValidVariant
          ? t("selectVariant")
          : !inStock
          ? t("outOfStock")
          : t("addToCart")}
      </Button>

      {addError && (
        <p
          className="text-xs text-tb-accent"
          role="alert"
          data-testid="add-to-cart-error"
        >
          {addError}
        </p>
      )}

      {inStock && (
        <div className="mono text-tb-sage text-xs tracking-wide flex items-center gap-x-1">
          <span aria-hidden>●</span>
          {tp("inStock")}
        </div>
      )}

      <MobileActions
        product={product}
        variant={selectedVariant}
        options={options}
        updateOptions={setOptionValue}
        inStock={inStock}
        handleAddToCart={handleAddToCart}
        isAdding={isAdding}
        show={!inView}
        optionsDisabled={!!disabled || isAdding}
      />
    </div>
  )
}
