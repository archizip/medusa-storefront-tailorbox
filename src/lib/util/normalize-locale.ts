/**
 * Нормализует locale код для использования с файлами переводов
 * Преобразует форматы типа "fr-FR", "uk-UA" в "fr", "uk"
 */
export function normalizeLocale(locale: string | null | undefined): string {
  if (!locale) return 'en';
  
  // Извлекаем только код языка (до дефиса или подчеркивания)
  const normalized = locale.split(/[-_]/)[0].toLowerCase();
  
  // Маппинг для особых случаев
  const localeMap: Record<string, string> = {
    'uk': 'uk',
    'ru': 'ru',
    'fr': 'fr',
    'en': 'en',
  };
  
  // Возвращаем нормализованный код или fallback на 'en'
  return localeMap[normalized] || 'en';
}

