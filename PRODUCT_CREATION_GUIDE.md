# 📦 Руководство по созданию товаров в админ-панели Medusa

## 🎯 Обзор

Это руководство поможет вам перенести формат товаров из Instagram в админ-панель Medusa с использованием системы категорий и тегов, описанной в `CATEGORIES_STRUCTURE.md`.

## 📋 Структура товара в Medusa

### Основные поля товара

#### 1. **Основная информация**

- **Title** (Название) - EN: `Stretch Jersey with Floral Print`
  - Это название будет отображаться на сайте
  - Рекомендуется: `[Тип ткани] [Принт/Цвет]`
  - Примеры:
    - EN: `Brushed Fleece with Rose Print`
    - EN: `Two-Thread Fleece Geometric Pattern`
    - EN: `Single Jersey Striped`

- **Handle** (URL-идентификатор) - `stretch-jersey-floral-print`
  - Уникальный идентификатор для URL
  - Формат: `тип-ткани-принт-цвет`
  - Примеры:
    - `brushed-fleece-rose-pink`
    - `two-thread-fleece-polka-dot-blue`
    - `single-jersey-stripes-white`

- **Description** (Описание) - Многоязычное описание
  - EN: `Premium stretch jersey fabric with beautiful floral rose print. Perfect for children's clothing. Soft, breathable, and comfortable.`
  - FR: `Tissu jersey extensible de qualité supérieure avec un magnifique imprimé floral de roses. Parfait pour les vêtements d'enfants. Doux, respirant et confortable.`
  - UK: `Преміум кулірка стрейч з красивим квітковим принтом троянд. Ідеально підходить для дитячого одягу. М'яка, дихаюча та зручна.`

#### 2. **Категория (Product Category)**

Выберите категорию согласно структуре из `CATEGORIES_STRUCTURE.md`:

**Пример 1: Кулірка стрейч с цветочным принтом**
- **Parent Category**: `Knit Fabrics` (handle: `knit-fabrics`)
- **Category**: `Jersey` (handle: `jersey`)
- **Subcategory**: `Stretch Jersey` (handle: `stretch-jersey`)

**Пример 2: Трьохнитка з начосом с детским принтом**
- **Parent Category**: `Knit Fabrics` (handle: `knit-fabrics`)
- **Category**: `Fleece` (handle: `fleece`)
- **Subcategory**: `Brushed Fleece` (handle: `brushed-fleece`)

**Пример 3: Двонитка с геометрическим принтом**
- **Parent Category**: `Knit Fabrics` (handle: `knit-fabrics`)
- **Category**: `Fleece` (handle: `fleece`)
- **Subcategory**: `Two-Thread Fleece` (handle: `two-thread-fleece`)

#### 3. **Теги (Tags)**

Добавьте теги согласно системе из `CATEGORIES_STRUCTURE.md`. Используйте префиксы для группировки:

**Группа: Принты (Print)**
- `print-floral` - для цветочных принтов
- `print-geometric` - для геометрических
- `print-kids` - для детских принтов
- `print-abstract` - для абстрактных

**Группа: Цвета (Color)**
- `color-pink`, `color-blue`, `color-red` и т.д.
- `color-pastel`, `color-bright`, `color-neutral`

**Группа: Сезонность (Season)**
- `season-summer`, `season-winter`, `season-all-season`

**Группа: Плотность (Density)**
- `density-light` (до 180 г/м²)
- `density-medium` (180-250 г/м²)
- `density-heavy` (250+ г/м²)

**Группа: Назначение (Purpose)**
- `purpose-children` - детская одежда
- `purpose-adult` - взрослая одежда
- `purpose-sportswear` - спортивная одежда
- `purpose-homewear` - домашняя одежда

**Группа: Характеристики (Features)**
- `feature-stretch` - стрейч
- `feature-organic` - органический
- `feature-eco-friendly` - экологичный
- `feature-breathable` - дышащий

#### 4. **Метаданные (Metadata)**

Используйте поле `metadata` для дополнительной информации:

```json
{
  "composition": "95% Cotton, 5% Elastane",
  "weight": "200 g/m²",
  "width": "150 cm",
  "care_instructions": "Machine wash at 30°C",
  "origin_country": "Turkey",
  "print_type": "floral",
  "print_style": "roses",
  "season": "all-season",
  "density": "medium",
  "stretch": "yes"
}
```

#### 5. **Варианты (Variants)**

Создайте варианты для разных:
- **Цветов** (если один принт в разных цветах)
- **Метража** (если продаете на метры)
- **Размеров** (если продаете готовые изделия)

**Пример вариантов для ткани:**
- Variant 1: `Color: Pink` - Price: €15/m, Inventory: 50m
- Variant 2: `Color: Blue` - Price: €15/m, Inventory: 30m
- Variant 3: `Color: White` - Price: €15/m, Inventory: 20m

**Пример вариантов для метража:**
- Variant 1: `1 meter` - Price: €15
- Variant 2: `2 meters` - Price: €28
- Variant 3: `3 meters` - Price: €40

#### 6. **Изображения (Images)**

- Загрузите **минимум 3-4 фото**:
  1. Общий вид ткани (крупный план)
  2. Деталь принта/узора
  3. Ткань в рулоне/складке
  4. Пример использования (если есть)

- **Thumbnail** (миниатюра) - выберите лучшее фото для превью

#### 7. **Дополнительные поля**

- **Material** - Состав ткани (например: `95% Cotton, 5% Elastane`)
- **Origin Country** - Страна производства
- **Weight** - Вес (если применимо)
- **Type** - Тип товара (можно использовать теги)

## 📝 Примеры заполнения товаров

### Пример 1: Кулірка стрейч с цветочным принтом (детская)

**Основная информация:**
- **Title**: `Stretch Jersey with Rose Print`
- **Handle**: `stretch-jersey-rose-print`
- **Description**:
  - EN: `Soft stretch jersey fabric with delicate rose floral print. Perfect for children's summer clothing. 95% Cotton, 5% Elastane. Lightweight and breathable.`
  - FR: `Tissu jersey extensible doux avec un imprimé floral délicat de roses. Parfait pour les vêtements d'été pour enfants. 95% Coton, 5% Élasthanne. Léger et respirant.`
  - UK: `М'яка кулірка стрейч з ніжним квітковим принтом троянд. Ідеально підходить для дитячого літнього одягу. 95% Бавовна, 5% Еластан. Легка та дихаюча.`

**Категория:**
- `Knit Fabrics > Jersey > Stretch Jersey`

**Теги:**
- `print-floral`
- `print-roses`
- `color-pink`
- `color-pastel`
- `season-summer`
- `density-light`
- `purpose-children`
- `feature-stretch`
- `feature-breathable`

**Метаданные:**
```json
{
  "composition": "95% Cotton, 5% Elastane",
  "weight": "180 g/m²",
  "width": "150 cm",
  "care_instructions": "Machine wash at 30°C, gentle cycle",
  "origin_country": "Turkey",
  "print_type": "floral",
  "print_style": "roses",
  "season": "summer",
  "density": "light",
  "stretch": "yes"
}
```

**Варианты:**
- Pink - €15/m
- Blue - €15/m
- White - €15/m

---

### Пример 2: Трьохнитка з начосом с детским принтом

**Основная информация:**
- **Title**: `Brushed Fleece with Animal Print`
- **Handle**: `brushed-fleece-animal-print`
- **Description**:
  - EN: `Warm and cozy three-thread brushed fleece with fun animal print. Perfect for children's winter clothing. Soft brushed interior for extra comfort.`
  - FR: `Molleton gratté chaud et douillet à trois fils avec un imprimé animal amusant. Parfait pour les vêtements d'hiver pour enfants. Intérieur gratté doux pour un confort supplémentaire.`
  - UK: `Теплий та затишний тришаровий футер з начосом з веселим принтом тварин. Ідеально підходить для дитячого зимового одягу. М'який начос з внутрішнього боку для додаткового комфорту.`

**Категория:**
- `Knit Fabrics > Fleece > Brushed Fleece`

**Теги:**
- `print-kids`
- `print-animals`
- `color-bright`
- `season-winter`
- `density-heavy`
- `purpose-children`
- `feature-organic`

**Метаданные:**
```json
{
  "composition": "100% Organic Cotton",
  "weight": "280 g/m²",
  "width": "150 cm",
  "care_instructions": "Machine wash at 40°C",
  "origin_country": "Portugal",
  "print_type": "kids",
  "print_style": "animals",
  "season": "winter",
  "density": "heavy",
  "brushed": "yes"
}
```

---

### Пример 3: Двонитка с геометрическим принтом

**Основная информация:**
- **Title**: `Two-Thread Fleece with Polka Dot Pattern`
- **Handle**: `two-thread-fleece-polka-dot`
- **Description**:
  - EN: `Classic two-thread fleece with timeless polka dot pattern. Versatile fabric suitable for all-season clothing. Medium weight, perfect balance of warmth and breathability.`
  - FR: `Molleton classique à deux fils avec un motif pois intemporel. Tissu polyvalent adapté aux vêtements toutes saisons. Poids moyen, équilibre parfait entre chaleur et respirabilité.`
  - UK: `Класична двонитка з вічним принтом горошок. Універсальна тканина, підходить для всесезонного одягу. Середня щільність, ідеальний баланс тепла та дихання.`

**Категория:**
- `Knit Fabrics > Fleece > Two-Thread Fleece`

**Теги:**
- `print-geometric`
- `print-polka-dot`
- `color-blue`
- `color-neutral`
- `season-all-season`
- `density-medium`
- `purpose-adult`
- `purpose-children`

**Метаданные:**
```json
{
  "composition": "100% Cotton",
  "weight": "220 g/m²",
  "width": "150 cm",
  "care_instructions": "Machine wash at 30°C",
  "origin_country": "Turkey",
  "print_type": "geometric",
  "print_style": "polka-dot",
  "season": "all-season",
  "density": "medium"
}
```

## 🎨 Рекомендации по оформлению

### Название товара
- Используйте формат: `[Тип ткани] [Принт/Узор]`
- Избегайте слишком длинных названий
- Включите ключевые слова для поиска

### Описание
- Начните с главных характеристик
- Укажите состав ткани
- Добавьте информацию о назначении
- Упомяните особенности (стрейч, начос, и т.д.)

### Изображения
- Первое фото должно быть самым привлекательным
- Покажите детали принта/узора
- Добавьте фото ткани в контексте (если есть)

### Цены
- Указывайте цену за метр (если продаете на метры)
- Или за единицу товара
- Учитывайте регион при установке цен

## 🔍 Поиск и фильтрация

Товары будут автоматически фильтроваться по:
- **Категориям**: Тип трикотажа → Конкретный вид
- **Тегам**: Принт, Цвет, Сезон, Плотность, Назначение

Пользователи смогут найти товары через:
- Поиск по названию
- Фильтр по категориям
- Фильтр по тегам
- Комбинированные фильтры

## ✅ Чек-лист при создании товара

- [ ] Название товара (Title) на английском
- [ ] Уникальный Handle
- [ ] Описание на всех языках (EN, FR, UK)
- [ ] Выбрана правильная категория (3 уровня)
- [ ] Добавлены все релевантные теги
- [ ] Заполнены метаданные (состав, вес, ширина)
- [ ] Созданы варианты (цвета/метраж)
- [ ] Загружены изображения (минимум 3-4)
- [ ] Установлена цена для каждого варианта
- [ ] Указан инвентарь (количество)
- [ ] Проверена корректность всех переводов

## 📚 Дополнительные ресурсы

- См. `CATEGORIES_STRUCTURE.md` для полной структуры категорий и тегов
- См. файлы переводов в `messages/` для локализации
- Используйте примеры из этого документа как шаблоны

## 🚀 Быстрый старт

1. **Создайте категории** (если еще не созданы) согласно `CATEGORIES_STRUCTURE.md`
2. **Создайте теги** с префиксами (print-, color-, season-, и т.д.)
3. **Создайте товар** по одному из примеров выше
4. **Проверьте отображение** на сайте в разных языках
5. **Оптимизируйте** описание и теги для SEO

---

**Примечание**: Все названия категорий и тегов создаются на английском языке в Medusa. Переводы применяются автоматически через систему локализации `next-intl` на основе handle/value.

