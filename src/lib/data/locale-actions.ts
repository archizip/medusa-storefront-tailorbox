"use server"

import { sdk } from "@lib/config"
import { revalidateTag } from "next/cache"
import { cookies as nextCookies } from "next/headers"
import { getAuthHeaders, getCacheTag, getCartId, removeCartId } from "./cookies"

const LOCALE_COOKIE_NAME = "_medusa_locale"

/**
 * Gets the current locale from cookies
 */
export const getLocale = async (): Promise<string | null> => {
  try {
    const cookies = await nextCookies()
    return cookies.get(LOCALE_COOKIE_NAME)?.value ?? null
  } catch {
    return null
  }
}

/**
 * Sets the locale cookie
 */
export const setLocaleCookie = async (locale: string) => {
  const cookies = await nextCookies()
  cookies.set(LOCALE_COOKIE_NAME, locale, {
    maxAge: 60 * 60 * 24 * 365, // 1 year
    httpOnly: false, // Allow client-side access
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  })
}

/**
 * Updates the locale preference via SDK and stores in cookie.
 * Also updates the cart with the new locale if one exists.
 */
export const updateLocale = async (localeCode: string): Promise<string> => {
  await setLocaleCookie(localeCode)

  // Update cart with the new locale if a cart exists
  const cartId = await getCartId()
  if (cartId) {
    try {
      const headers = {
        ...(await getAuthHeaders()),
      }

      await sdk.store.cart.update(cartId, { locale: localeCode }, {}, headers)

      const cartCacheTag = await getCacheTag("carts")
      if (cartCacheTag) {
        revalidateTag(cartCacheTag)
      }
    } catch (error: any) {
      // If cart is not found, remove the cart ID from cookies
      const errorMessage = error?.message || error?.error?.message || String(error || "")
      const isCartNotFound = 
        errorMessage.includes("not found") ||
        errorMessage.includes("Cart id not found") ||
        error?.status === 404 ||
        error?.response?.status === 404

      if (isCartNotFound) {
        await removeCartId()
        console.warn(`Cart ${cartId} not found, removed from cookies`)
        // Don't throw error, just continue with locale update
      } else {
        // Re-throw other errors
        console.error("Error updating cart locale:", error)
        throw error
      }
    }
  }

  // Revalidate relevant caches to refresh content
  const productsCacheTag = await getCacheTag("products")
  if (productsCacheTag) {
    revalidateTag(productsCacheTag)
  }

  const categoriesCacheTag = await getCacheTag("categories")
  if (categoriesCacheTag) {
    revalidateTag(categoriesCacheTag)
  }

  const collectionsCacheTag = await getCacheTag("collections")
  if (collectionsCacheTag) {
    revalidateTag(collectionsCacheTag)
  }

  return localeCode
}
