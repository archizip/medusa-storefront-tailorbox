"use server"

import { sdk } from "@lib/config"
import { getCacheOptions } from "./cookies"

export type Locale = {
  code: string
  name: string
}

// Языки, которые поддерживает витрина (переводы в messages/*.json).
// Бэкенд может не отдавать локали вовсе — тогда используется этот список.
const SUPPORTED_LOCALES: Locale[] = [
  { code: "uk", name: "Українська" },
  { code: "fr", name: "Français" },
]

/**
 * Fetches available locales from the backend, restricted to the
 * storefront-supported set. Falls back to SUPPORTED_LOCALES when the
 * backend has none configured (empty list or 404).
 */
export const listLocales = async (): Promise<Locale[] | null> => {
  const next = {
    ...(await getCacheOptions("locales")),
  }

  const backendLocales = await sdk.client
    .fetch<{ locales: Locale[] }>(`/store/locales`, {
      method: "GET",
      next,
      cache: "force-cache",
    })
    .then(({ locales }) => locales)
    .catch(() => null)

  const supportedCodes = new Set(SUPPORTED_LOCALES.map((l) => l.code))
  const filtered = (backendLocales ?? []).filter((l) =>
    supportedCodes.has(l.code.split(/[-_]/)[0].toLowerCase())
  )

  return filtered.length > 0 ? filtered : SUPPORTED_LOCALES
}
