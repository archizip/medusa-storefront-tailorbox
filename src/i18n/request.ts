import { getRequestConfig } from 'next-intl/server';
import { getLocale } from '@lib/data/locale-actions';

export default getRequestConfig(async () => {
  // Получаем locale из cookie (через существующую функцию)
  const locale = await getLocale() || 'en';
  
  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});

