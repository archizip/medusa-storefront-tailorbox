import { getRequestConfig } from "next-intl/server"
import { getLocale } from "@lib/data/locale-actions"
import { normalizeLocale } from "@lib/util/normalize-locale"

export default getRequestConfig(async () => {
  const rawLocale = await getLocale()
  const locale = normalizeLocale(rawLocale)

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  }
})
