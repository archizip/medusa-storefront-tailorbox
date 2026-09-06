/**
 * Region (`/[countryCode]`) and UI language are independent:
 *   /fr  → shopping in France (EUR, shipping)
 *   language → cookie / Accept-Language / country hint
 *
 * Resolution order (first match wins):
 *   1. Explicit `_medusa_locale` cookie (user picked a language)
 *   2. Accept-Language, negotiated against storefront locales
 *   3. Default language for the shopping country (FR → fr, UA → uk)
 *   4. DEFAULT_LOCALE
 */

export const LOCALE_COOKIE_NAME = "_medusa_locale"
export const LOCALE_REQUEST_HEADER = "x-medusa-locale"

export const DEFAULT_LOCALE = "uk"

export const SUPPORTED_LOCALE_CODES = ["uk", "fr"] as const

export type SupportedLocale = (typeof SUPPORTED_LOCALE_CODES)[number]

export const SUPPORTED_LOCALES: { code: SupportedLocale; name: string }[] = [
  { code: "uk", name: "Українська" },
  { code: "fr", name: "Français" },
]

const SUPPORTED_SET = new Set<string>(SUPPORTED_LOCALE_CODES)

/** ISO country → storefront language when the browser language is unknown. */
const COUNTRY_DEFAULT_LOCALE: Record<string, SupportedLocale> = {
  fr: "fr",
  ua: "uk",
  be: "fr",
}

export function isSupportedLocale(code: string): code is SupportedLocale {
  return SUPPORTED_SET.has(code)
}

/** `fr-FR` / `fr_FR` / `FR` → `fr`. */
export function canonicalizeLocale(locale: string | null | undefined): string {
  if (!locale) return ""
  return locale.split(/[-_]/)[0].toLowerCase()
}

export function parseAcceptLanguage(
  header: string | null | undefined
): string[] {
  if (!header) return []

  return header
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";")
      const qParam = params.find((p) => p.trim().startsWith("q="))
      const q = qParam ? Number.parseFloat(qParam.trim().slice(2)) : 1
      return { tag: tag.trim(), q: Number.isFinite(q) ? q : 0 }
    })
    .filter((entry) => entry.tag && entry.tag !== "*" && entry.q > 0)
    .sort((a, b) => b.q - a.q)
    .map((entry) => entry.tag)
}

export function negotiateLocale(
  preferredTags: string[]
): SupportedLocale | null {
  for (const tag of preferredTags) {
    const canonical = canonicalizeLocale(tag)
    if (isSupportedLocale(canonical)) {
      return canonical
    }
  }
  return null
}

export function localeFromCountry(
  countryCode: string | null | undefined
): SupportedLocale | null {
  if (!countryCode) return null
  const mapped = COUNTRY_DEFAULT_LOCALE[countryCode.toLowerCase()]
  return mapped ?? null
}

export type ResolveLocaleInput = {
  cookieLocale?: string | null
  acceptLanguage?: string | null
  countryCode?: string | null
}

export function resolveLocale({
  cookieLocale,
  acceptLanguage,
  countryCode,
}: ResolveLocaleInput): SupportedLocale {
  const fromCookie = canonicalizeLocale(cookieLocale)
  if (isSupportedLocale(fromCookie)) {
    return fromCookie
  }

  const fromHeader = negotiateLocale(parseAcceptLanguage(acceptLanguage))
  if (fromHeader) {
    return fromHeader
  }

  const fromCountry = localeFromCountry(countryCode)
  if (fromCountry) {
    return fromCountry
  }

  return DEFAULT_LOCALE
}
