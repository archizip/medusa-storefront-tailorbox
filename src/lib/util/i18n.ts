/**
 * Хелпер для использования next-intl в компонентах
 * Используется для получения переводов на основе текущего locale из cookie
 */

import { useTranslations as useNextIntlTranslations } from 'next-intl';
import { normalizeLocale } from './normalize-locale';

/**
 * Хук для использования переводов в клиентских компонентах
 * @param namespace - пространство имен для переводов (например, 'common', 'checkout')
 */
export function useTranslations(namespace?: string) {
  return useNextIntlTranslations(namespace);
}

/**
 * Функция для получения переводов в серверных компонентах
 * @param locale - текущий locale (может быть в формате fr-FR или fr)
 * @param namespace - пространство имен для переводов
 */
export async function getTranslations(locale: string, namespace?: string) {
  // Нормализуем locale для загрузки файла (fr-FR -> fr)
  const normalizedLocale = normalizeLocale(locale);
  const messages = (await import(`../../../messages/${normalizedLocale}.json`)).default;
  
  if (namespace) {
    return (key: string) => {
      const keys = key.split('.');
      let value: any = messages;
      for (const k of keys) {
        value = value?.[k];
      }
      return value || key;
    };
  }
  
  return (key: string) => {
    const keys = key.split('.');
    let value: any = messages;
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  };
}

