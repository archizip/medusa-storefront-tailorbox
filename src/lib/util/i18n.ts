/**
 * Хелпер для использования next-intl в компонентах
 * Используется для получения переводов на основе текущего locale из cookie
 */

import { useTranslations as useNextIntlTranslations } from 'next-intl';

/**
 * Хук для использования переводов в клиентских компонентах
 * @param namespace - пространство имен для переводов (например, 'common', 'checkout')
 */
export function useTranslations(namespace?: string) {
  return useNextIntlTranslations(namespace);
}

/**
 * Функция для получения переводов в серверных компонентах
 * @param locale - текущий locale
 * @param namespace - пространство имен для переводов
 */
export async function getTranslations(locale: string, namespace?: string) {
  const messages = (await import(`../../../messages/${locale}.json`)).default;
  
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

