# CLAUDE.md — Руководство для ИИ-разработчика

Этот файл — главный источник контекста для ИИ, работающего над проектом. ИИ выступает
**полноценным разработчиком**: проектирует и доставляет фичи, пишет и запускает тесты,
находит и чинит баги. Читай этот файл целиком перед началом любой задачи.

---

## 1. Что это за проект

**TailorBox storefront** — витрина интернет-магазина тканей/ателье на основе официального
стартера **Medusa v2 Next.js Starter**. Это фронтенд (Next.js), который обращается к
бэкенду Medusa по HTTP через `@medusajs/js-sdk`. Бэкенд в этом репозитории **не лежит** —
storefront общается с внешним Medusa-сервером (URL в `.env.local1`).

### Стек

| Слой | Технология |
|------|------------|
| Фреймворк | Next.js 15.3 (App Router, RSC, Server Actions, Turbopack) |
| Язык | TypeScript 5 (strict) |
| Рантайм | React 19, Node 22 |
| Данные | `@medusajs/js-sdk` → Medusa v2 backend |
| Стили | Tailwind CSS 3 + `@medusajs/ui` + MUI v7 (`@mui/material`) |
| i18n | `next-intl` (локали: `en`, `fr`, `ru`, `uk`) |
| Платежи | Stripe (`@stripe/react-stripe-js`) |
| Пакетный менеджер | **Yarn 1** (`yarn`, не npm/pnpm) |

---

## 2. Команды

```bash
yarn install            # установка зависимостей (Yarn 1)
yarn dev                # dev-сервер на http://localhost:8000 (см. про env ниже)
yarn build              # прод-сборка
yarn start              # запуск прод-сборки на :8000
yarn lint               # ESLint (next/core-web-vitals)
yarn typecheck          # tsc --noEmit — ОБЯЗАТЕЛЬНО запускать, build НЕ проверяет типы
yarn test:e2e           # Playwright E2E тесты (см. раздел Тестирование)
yarn test:e2e:ui        # Playwright в UI-режиме
```

> ⚠️ **`next.config.js` игнорирует ошибки TS и ESLint при сборке**
> (`typescript.ignoreBuildErrors` и `eslint.ignoreDuringBuilds` = true).
> Поэтому **`yarn build` зелёный ≠ код корректен**. Перед завершением задачи всегда
> прогоняй `yarn typecheck` и `yarn lint` — это единственный способ поймать регрессии типов.

> 📌 **Baseline typecheck (на момент настройки):** в репозитории есть 29 предсуществующих
> ошибок строгой типизации в нескольких файлах layout/checkout/common — в основном
> `country-select-mui`, `line-item-unit-price`, `line-item-price`, `shipping`. Они **не**
> внесены ИИ; build их раньше скрывал. Сравнивай свой прогон `yarn typecheck` с этим
> baseline: твоя цель — **не добавлять новые** ошибки (а лучше уменьшать их число). Эти
> файлы — хорошая первая задача на чистку строгих типов.

### Особенность запуска dev (важно!)

`yarn dev` запускает `scripts/dev-with-env.js`, который:
1. копирует `.env.local1` → `.env.local` (с бэкапом текущего в `.env.local.backup`);
2. запускает `next dev --turbopack -p 8000`;
3. на выходе (SIGINT/SIGTERM/exit) восстанавливает оригинальный `.env.local`.

**Активная конфигурация окружения живёт в `.env.local1`.** Правь переменные там.
Не коммить значения секретов. Файлы `.env*` в `.gitignore`.

---

## 3. Архитектура и структура

```
src/
├── app/[countryCode]/          # App Router. countryCode — регион (ISO-2), задаёт middleware
│   ├── (checkout)/             # route group: изолированный layout чекаута
│   └── (main)/                 # route group: основной layout (nav + footer)
│       ├── account/            # @dashboard + @login — параллельные роуты
│       ├── cart/ categories/ collections/ order/ products/ store/
│       └── page.tsx            # домашняя
├── modules/                    # ФИЧИ по доменам — основное место для кода UI
│   ├── account/ cart/ categories/ checkout/ collections/ common/
│   ├── home/ layout/ order/ products/ shipping/ skeletons/ store/
│   └── <module>/
│       ├── components/         # презентационные компоненты
│       └── templates/          # композиция компонентов в страницу
├── lib/
│   ├── config.ts               # инициализация Medusa SDK (sdk.client.fetch + locale header)
│   ├── data/                   # ★ СЛОЙ ДАННЫХ: все вызовы к Medusa backend
│   │   ├── cart.ts products.ts customer.ts orders.ts regions.ts ...
│   ├── util/                   # хелперы (money, product price, locale, ...)
│   ├── hooks/ context/ constants.tsx
├── i18n/request.ts             # конфиг next-intl
├── middleware.ts               # резолв региона/локали, редиректы
├── styles/ types/ components/
messages/                       # переводы: en.json fr.json ru.json uk.json
```

### Ключевые архитектурные правила

- **Слой данных только в `src/lib/data/*`.** Любое обращение к Medusa backend
  (продукты, корзина, заказы, регионы) идёт через функции там, использующие `sdk` из
  `lib/config.ts`. Компоненты НЕ дёргают SDK напрямую — они импортируют функции из `lib/data`.
- Функции в `lib/data` помечены `"use server"` или вызываются из server-компонентов;
  многие — Server Actions для мутаций (корзина, аккаунт).
- **Server Components по умолчанию.** Помечай `"use client"` только когда нужны хуки/события/браузерные API. MUI-компоненты должны быть в client-компонентах (см. коммит `0c503e5`).
- **Фича = модуль.** Новый UI кладётся в `src/modules/<домен>/components|templates`,
  страница — в `src/app/[countryCode]/(main)/<route>/page.tsx`, которая собирает шаблон.
- **Алиасы путей** (tsconfig): `@lib/*`, `@modules/*`, `@components/*`, `@pages/*`.
  Используй их вместо относительных `../../..`.
- **i18n:** пользовательские строки — через `next-intl`, ключи во всех 4 файлах
  `messages/*.json`. Не хардкодь текст в UI. Добавил ключ в `en.json` — добавь во все локали.
- **Деньги/цены:** через хелперы `lib/util/money.ts`, `lib/util/get-product-price.ts` —
  не форматируй валюту руками.

### Соглашения по стилю

- Prettier: **без точек с запятой**, двойные кавычки, `tabWidth: 2`, `trailingComma: es5`,
  `arrowParens: always`. Сохраняется автоматически хуком (см. `.claude/settings.json`).
- Именование и структуру копируй из соседних файлов модуля.
- Tailwind + `@medusajs/ui` для большинства UI; MUI там, где уже используется.

---

## 4. Рабочий процесс ИИ (обязательный цикл)

Для **каждой** задачи (фича или баг) следуй циклу:

1. **Понять** — прочитай релевантные модули и `lib/data`. Не угадывай API Medusa: при
   сомнениях сверься с документацией (есть MCP `query-docs` / Context7 и `docs.medusajs.com`).
2. **Спланировать** — для нетривиальных задач составь план; меняй минимально необходимое.
3. **Реализовать** — пиши в стиле окружающего кода, используй слой `lib/data`, алиасы, i18n.
4. **Проверить (ОБЯЗАТЕЛЬНО, gate перед сдачей):**
   ```bash
   yarn typecheck   # должно пройти чисто
   yarn lint        # должно пройти чисто
   ```
   Для UI-поведения — прогони/допиши E2E (`yarn test:e2e`) или подними `yarn dev` и
   проверь вручную через Preview/браузер.
5. **Самопроверка** — перечитай diff: нет ли мусора, console.log, забытых TODO, хардкода строк,
   прямых вызовов SDK мимо `lib/data`.
6. **Отчитаться честно** — что сделано, что проверено, что осталось. Если тест упал — скажи
   об этом и покажи вывод, не заявляй об успехе без проверки.

### Починка багов

- Сначала **воспроизведи** баг (тест или ручной сценарий), потом чини. По возможности
  добавь регрессионный E2E-тест, который падал до фикса и проходит после.
- Чини корневую причину, а не симптом. Минимальный диф.

### Доставка фич

- Новый домен → новый модуль в `src/modules`. Переиспользуй существующие компоненты (`common`, `skeletons`).
- Данные — через новую/существующую функцию в `lib/data`. Соблюдай паттерн server actions.
- Все тексты — в `messages/*.json` (все 4 локали).
- Добавь loading-состояния (`loading.tsx` / skeletons) для новых роутов.

---

## 5. Тестирование

E2E на **Playwright** (storefront-уровень — основной вид тестов). Конфиг: `playwright.config.ts`,
тесты в `e2e/`. Playwright поднимает `yarn dev` (порт 8000) сам через `webServer`.

```bash
npx playwright install      # один раз: скачать браузеры
yarn test:e2e               # прогнать все тесты
yarn test:e2e:ui            # интерактивный режим
npx playwright test e2e/smoke.spec.ts   # один файл
```

- Тесты должны быть устойчивыми: селекторы по роли/тексту/`data-testid`, не по случайным классам.
- Для нового пользовательского сценария добавляй `*.spec.ts` в `e2e/`.
- Требуется доступный Medusa backend (URL из `.env.local1`); если backend недоступен, тесты,
  зависящие от данных, будут падать — это ожидаемо, отметь это в отчёте.

---

## 6. Чего НЕ делать

- ❌ Не коммить и не пушить без явной просьбы пользователя. На ветке по умолчанию — сначала создай ветку.
- ❌ Не вызывай Medusa SDK напрямую из компонентов — только через `lib/data`.
- ❌ Не хардкодь UI-строки и форматирование валюты.
- ❌ Не полагайся на `yarn build` как на проверку корректности — он глушит ошибки TS/ESLint.
- ❌ Не трогай секреты в `.env*` и не выводи их значения.
- ❌ Не удаляй `.env.local.backup` руками — им управляет `dev-with-env.js`.

---

## 7. Полезные доки в репозитории

- `ARCHITECTURE_PLAN.md`, `IMPLEMENTATION_PLAN.md` — планы по проекту.
- `PRODUCT_CREATION_GUIDE.md`, `PRODUCT_TYPES_AND_TAGS.md`, `CATEGORIES_STRUCTURE.md` —
  доменная модель каталога (товары, типы, теги, категории).
- Официальные доки: https://docs.medusajs.com (Medusa v2), https://nextjs.org/docs.
