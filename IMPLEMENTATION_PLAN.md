# План реализации мультистранового интернет-магазина

## 📊 Текущее состояние

### Backend (Medusa v2.11.3)
- ✅ Базовая настройка Medusa
- ✅ Seed скрипт с примером региона "Europe" (EUR, USD)
- ⚠️ Нужно создать регионы UA и FR
- ⚠️ Нужно настроить локали (uk, ru, fr, en)
- ⚠️ Нужно настроить shipping providers
- ⚠️ Нужно настроить payment providers

### Frontend (Next.js 15)
- ✅ Роутинг по country code (`/[countryCode]/`)
- ✅ Middleware для определения страны
- ✅ Поддержка locale через cookie
- ✅ Передача locale в API через header
- ⚠️ Нужна локализация UI текстов (next-intl)
- ⚠️ Нужна SEO оптимизация

---

## 🎯 Финальная архитектура

### Роутинг
```
/[countryCode]/
  ├── ua/             # Украина
  │   ├── products/
  │   ├── cart/
  │   └── checkout/
  └── fr/             # Франция
      ├── products/
      ├── cart/
      └── checkout/
```

### Локали
- **4 языка:** uk, ru, fr, en
- Определяются из cookie `_medusa_locale` или `Accept-Language` header
- Fallback: `uk` для UA, `fr` для FR

### Регионы и валюты
- **UA:** UAH (украинская гривна)
- **FR:** EUR (евро)

### Доставка
- **UA:** Новая почта, Укр почта
- **FR:** La Post, Colissimo

### Оплата
- **Обе страны:** Карта (Stripe), Наложенный платеж (Manual Payment)

---

## 📋 Детальный план реализации

### Этап 1: Настройка Backend (Medusa)

#### 1.1. Создание регионов
**Файл:** `/Users/yurii.yudkin/Projects/my-medusa-store/src/scripts/setup-regions.ts`

```typescript
// Создать скрипт для настройки регионов UA и FR
// - Region "Ukraine" (UA) с валютой UAH
// - Region "France" (FR) с валютой EUR
// - Добавить страны в каждый регион
```

**Действия:**
- [ ] Создать скрипт `setup-regions.ts`
- [ ] Настроить регион UA с валютой UAH
- [ ] Настроить регион FR с валютой EUR
- [ ] Запустить скрипт: `medusa exec ./src/scripts/setup-regions.ts`

#### 1.2. Настройка локалей
**В Medusa Admin:**
- [ ] Создать локаль `uk` (украинский)
- [ ] Создать локаль `ru` (русский)
- [ ] Создать локаль `fr` (французский)
- [ ] Создать локаль `en` (английский)
- [ ] Установить `en` как fallback

**Или через API/Script:**
- [ ] Создать скрипт для настройки локалей

#### 1.3. Настройка Shipping Providers
**Для Украины:**
- [ ] Создать shipping provider "Новая почта"
- [ ] Создать shipping provider "Укр почта"
- [ ] Настроить shipping options для региона UA

**Для Франции:**
- [ ] Создать shipping provider "La Post"
- [ ] Создать shipping provider "Colissimo"
- [ ] Настроить shipping options для региона FR

**Примечание:** Можно использовать `manual_manual` provider для начала, или создать кастомные модули.

#### 1.4. Настройка Payment Providers
- [ ] Настроить Stripe для карт (если еще не настроен)
- [ ] Настроить Manual Payment для наложенного платежа
- [ ] Привязать к регионам UA и FR

#### 1.5. Обновление товаров
- [ ] Добавить переводы товаров (uk, ru, fr, en)
- [ ] Настроить цены для регионов UA (UAH) и FR (EUR)
- [ ] Убедиться, что товары доступны в обоих регионах

---

### Этап 2: Настройка Frontend

#### 2.1. Установка next-intl
```bash
npm install next-intl
# или
yarn add next-intl
```

- [ ] Установить next-intl
- [ ] Настроить конфигурацию next-intl
- [ ] Создать структуру файлов переводов

#### 2.2. Создание структуры переводов
**Структура:**
```
/messages/
  ├── uk.json    # Украинский
  ├── ru.json    # Русский
  ├── fr.json    # Французский
  └── en.json    # Английский (fallback)
```

- [ ] Создать папку `messages`
- [ ] Создать файлы переводов для всех языков
- [ ] Добавить базовые переводы (кнопки, формы, сообщения)

#### 2.3. Настройка next-intl
**Файл:** `src/i18n/request.ts` (новый)

```typescript
import { getRequestConfig } from 'next-intl/server';
import { getLocale } from '@lib/data/locale-actions';

export default getRequestConfig(async () => {
  const locale = await getLocale() || 'en';
  
  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});
```

**Файл:** `next.config.js` - добавить плагин

- [ ] Создать `src/i18n/request.ts`
- [ ] Обновить `next.config.js` для next-intl
- [ ] Настроить middleware для next-intl (если нужно)

#### 2.4. Миграция UI текстов
- [ ] Найти все статические тексты в компонентах
- [ ] Заменить на `useTranslations()` из next-intl
- [ ] Добавить переводы во все файлы локализации

**Пример:**
```typescript
// Было:
<button>Add to Cart</button>

// Стало:
import { useTranslations } from 'next-intl';
const t = useTranslations('common');
<button>{t('addToCart')}</button>
```

#### 2.5. Обновление middleware
**Файл:** `src/middleware.ts`

- [ ] Убедиться, что locale определяется из cookie
- [ ] Добавить fallback на Accept-Language header
- [ ] Установить дефолтный locale по country code (uk для UA, fr для FR)

---

### Этап 3: SEO оптимизация

#### 3.1. Hreflang теги
**Файл:** `src/app/[countryCode]/layout.tsx`

- [ ] Добавить hreflang теги для всех комбинаций:
  - `<link rel="alternate" hreflang="uk-UA" href="...">`
  - `<link rel="alternate" hreflang="ru-UA" href="...">`
  - `<link rel="alternate" hreflang="fr-FR" href="...">`
  - `<link rel="alternate" hreflang="en-FR" href="...">`

#### 3.2. Локализованные метатеги
- [ ] Обновить `generateMetadata` в страницах продуктов
- [ ] Добавить локализованные title и description
- [ ] Добавить локализованные Open Graph теги

#### 3.3. Структурированные данные
- [ ] Добавить Product schema для страниц продуктов
- [ ] Добавить BreadcrumbList schema
- [ ] Добавить Organization schema

---

### Этап 4: Специфичные настройки

#### 4.1. Обновление paymentInfoMap
**Файл:** `src/lib/constants.tsx`

- [ ] Добавить иконки для новых payment providers (если нужно)
- [ ] Обновить названия для наложенного платежа

#### 4.2. Форматирование валют
- [ ] Убедиться, что цены форматируются правильно (UAH, EUR)
- [ ] Использовать `Intl.NumberFormat` для форматирования

#### 4.3. Налоги (если нужно)
- [ ] Настроить VAT для Франции в Medusa
- [ ] Проверить отображение налогов в checkout

---

### Этап 5: Тестирование

#### 5.1. Функциональное тестирование
- [ ] Переключение между странами (UA ↔ FR)
- [ ] Переключение языков (uk, ru, fr, en)
- [ ] Добавление товаров в корзину
- [ ] Checkout процесс
- [ ] Выбор способа доставки
- [ ] Выбор способа оплаты
- [ ] Отображение цен в правильной валюте

#### 5.2. SEO тестирование
- [ ] Проверить hreflang теги
- [ ] Проверить метатеги
- [ ] Проверить структурированные данные
- [ ] Проверить локализованные URLs

#### 5.3. Кроссбраузерное тестирование
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Mobile browsers

---

## 🛠️ Технические детали

### Структура файлов переводов (пример)

**messages/uk.json:**
```json
{
  "common": {
    "addToCart": "Додати до кошика",
    "checkout": "Оформити замовлення",
    "cart": "Кошик",
    "products": "Товари"
  },
  "checkout": {
    "shipping": "Доставка",
    "payment": "Оплата",
    "review": "Перегляд"
  }
}
```

**messages/fr.json:**
```json
{
  "common": {
    "addToCart": "Ajouter au panier",
    "checkout": "Passer la commande",
    "cart": "Panier",
    "products": "Produits"
  },
  "checkout": {
    "shipping": "Livraison",
    "payment": "Paiement",
    "review": "Révision"
  }
}
```

### Определение locale в middleware

```typescript
// Логика определения locale:
// 1. Проверить cookie _medusa_locale
// 2. Проверить Accept-Language header
// 3. Fallback по country code:
//    - UA -> uk
//    - FR -> fr
// 4. Final fallback -> en
```

### Форматирование валют

```typescript
// Для UAH
new Intl.NumberFormat('uk-UA', {
  style: 'currency',
  currency: 'UAH'
}).format(price)

// Для EUR
new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'EUR'
}).format(price)
```

---

## 📝 Чеклист перед запуском

### Backend
- [ ] Регионы UA и FR созданы
- [ ] Локали (uk, ru, fr, en) настроены
- [ ] Shipping providers настроены для обеих стран
- [ ] Payment providers настроены
- [ ] Товары имеют переводы и цены для обоих регионов

### Frontend
- [ ] next-intl установлен и настроен
- [ ] Файлы переводов созданы и заполнены
- [ ] UI тексты мигрированы на i18n
- [ ] Middleware обновлен для определения locale
- [ ] Hreflang теги добавлены
- [ ] Метатеги локализованы
- [ ] paymentInfoMap обновлен

### Тестирование
- [ ] Все функции работают
- [ ] SEO оптимизация проверена
- [ ] Кроссбраузерное тестирование пройдено

---

## 🚀 Следующие шаги

1. **Начать с Backend:**
   - Создать скрипт для настройки регионов
   - Настроить локали в Medusa Admin
   - Настроить shipping и payment providers

2. **Затем Frontend:**
   - Установить и настроить next-intl
   - Создать файлы переводов
   - Мигрировать UI тексты

3. **Завершить SEO:**
   - Добавить hreflang теги
   - Локализовать метатеги
   - Добавить структурированные данные

---

## 📚 Полезные ссылки

- [Medusa v2 Documentation](https://docs.medusajs.com/v2)
- [next-intl Documentation](https://next-intl-docs.vercel.app/)
- [Medusa Localization](https://docs.medusajs.com/v2/resources/storefront-development/localization)
- [Medusa Shipping](https://docs.medusajs.com/v2/resources/storefront-development/shipping)
- [Medusa Payments](https://docs.medusajs.com/v2/resources/storefront-development/payments)


