import { getRequestConfig } from "next-intl/server"
import { getLocale } from "@lib/data/locale-actions"
import { normalizeLocale } from "@lib/util/normalize-locale"

export default getRequestConfig(async () => {
  // Получаем locale из cookie (через существующую функцию)
  const rawLocale = (await getLocale()) || "uk"
  // Нормализуем для загрузки файла (fr-FR -> fr)
  const locale = normalizeLocale(rawLocale)

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  }
})
