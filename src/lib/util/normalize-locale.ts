/**
 * Нормализует locale код для использования с файлами переводов
 * Преобразует форматы типа "fr-FR", "uk-UA" в "fr", "uk"
 */
export function normalizeLocale(locale: string | null | undefined): string {
  if (!locale) return "uk"

  // Извлекаем только код языка (до дефиса или подчеркивания)
  const normalized = locale.split(/[-_]/)[0].toLowerCase()

  // Маппинг для особых случаев
  const localeMap: Record<string, string> = {
    uk: "uk",
    ru: "ru",
    fr: "fr",
    en: "en",
  }

  // Возвращаем нормализованный код или fallback на 'uk'
  return localeMap[normalized] || "uk"
}

export function denormalizeLocale(locale: string): string {
  const localeMap: Record<string, string> = {
    ua: "uk-UA",
    ru: "ru-RU",
    fr: "fr-FR",
    en: "en-US",
  }
  return localeMap[locale] || "en-US"
}
