"use server"

import { SUPPORTED_LOCALES } from "@lib/util/resolve-locale"

export type Locale = {
  code: string
  name: string
}

/**
 * UI languages the storefront can render (`messages/*.json`).
 * Independent from Medusa regions: a shopper in France can still read Ukrainian.
 */
export const listLocales = async (): Promise<Locale[]> => {
  return [...SUPPORTED_LOCALES]
}
