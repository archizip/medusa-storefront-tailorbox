"use client"

import { NextIntlClientProvider } from 'next-intl';
import { ReactNode, useEffect, useState } from 'react';
import { normalizeLocale } from '@lib/util/normalize-locale';

// Загружаем дефолтные сообщения сразу
import enMessages from '../../messages/en.json';

type NextIntlProviderProps = {
  children: ReactNode;
  initialLocale?: string;
  initialMessages?: any;
}

/**
 * Провайдер для next-intl, который получает locale из cookie
 * Используется для клиентских компонентов
 */
export function NextIntlProvider({ 
  children, 
  initialLocale = 'en',
  initialMessages = enMessages 
}: NextIntlProviderProps) {
  const normalizedInitialLocale = normalizeLocale(initialLocale);
  const [locale, setLocale] = useState<string>(normalizedInitialLocale);
  const [messages, setMessages] = useState<any>(initialMessages);

  // Логируем начальные значения
  useEffect(() => {
    console.log('[NextIntlProvider] Initialized with locale:', initialLocale, '-> normalized:', normalizedInitialLocale);
  }, [initialLocale, normalizedInitialLocale]);

  // Слушаем изменения cookie для обновления locale
  useEffect(() => {
    const getCookieLocale = () => {
      if (typeof document === 'undefined') return normalizedInitialLocale;
      const cookies = document.cookie.split(';');
      const localeCookie = cookies.find(c => c.trim().startsWith('_medusa_locale='));
      const rawLocale = localeCookie ? localeCookie.split('=')[1].trim() : normalizedInitialLocale;
      return normalizeLocale(rawLocale);
    };

    const checkLocale = () => {
      const newLocale = getCookieLocale();
      
      if (newLocale && newLocale !== locale) {
        console.log('[NextIntlProvider] Locale changed:', locale, '->', newLocale);
        setLocale(newLocale);
        // Загружаем сообщения для нового locale
        import(`../../messages/${newLocale}.json`)
          .then((mod) => {
            console.log('[NextIntlProvider] Messages loaded for locale:', newLocale);
            setMessages(mod.default);
          })
          .catch((err) => {
            console.error('[NextIntlProvider] Failed to load messages for locale:', newLocale, err);
            // Fallback на английский, если переводы не найдены
            setMessages(enMessages);
          });
      }
    };

    // Проверяем изменения cookie каждые 300ms
    const interval = setInterval(checkLocale, 300);
    
    // Также проверяем сразу при монтировании
    checkLocale();
    
    return () => clearInterval(interval);
  }, [locale, normalizedInitialLocale]);

  // Всегда возвращаем провайдер с сообщениями
  // Используем key для принудительного обновления при изменении locale
  return (
    <NextIntlClientProvider key={locale} locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}

