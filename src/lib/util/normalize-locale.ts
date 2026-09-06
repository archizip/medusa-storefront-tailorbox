import {
  canonicalizeLocale,
  DEFAULT_LOCALE,
  isSupportedLocale,
} from "./resolve-locale"

/**
 * Canonical storefront locale for message files (`fr-FR` → `fr`).
 * Unknown values fall back to the default UI language.
 */
export function normalizeLocale(locale: string | null | undefined): string {
  const canonical = canonicalizeLocale(locale)
  return isSupportedLocale(canonical) ? canonical : DEFAULT_LOCALE
}
