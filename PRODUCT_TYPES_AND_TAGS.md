# 🏷️ Структура Product Types и Product Tags для Medusa

## 📋 Обзор

В Medusa есть три уровня классификации товаров:
1. **Product Categories** - иерархическая структура категорий (уже определена в `CATEGORIES_STRUCTURE.md`)
2. **Product Types** - высокоуровневая классификация типов товаров
3. **Product Tags** - детальные теги для фильтрации и поиска

## 🎯 Product Types (Типы продуктов)

Product Types используются для **высокоуровневой классификации** товаров. Это более общая категоризация, чем категории.

### Рекомендуемая структура Product Types

#### 1. **Fabric / Tissu / Тканина**
- **Value**: `fabric`
- **EN**: Fabric
- **FR**: Tissu
- **UK**: Тканина
- **Описание**: 
  - EN: Knitted fabrics sold by meter
  - FR: Tissus en maille vendus au mètre
  - UK: Трикотажні тканини, що продаються на метри
- **Использование**: Все трикотажные ткани (Jersey, Fleece, Other Knits)

#### 2. **Accessories / Accessoires / Аксесуари**
- **Value**: `accessories`
- **EN**: Accessories
- **FR**: Accessoires
- **UK**: Аксесуари
- **Описание**: 
  - EN: Sewing accessories and supplies
  - FR: Accessoires et fournitures de couture
  - UK: Аксесуари та приладдя для шиття
- **Использование**: Нитки, пуговицы, молнии, и т.д.

#### 3. **Tools / Outils / Інструменти**
- **Value**: `tools`
- **EN**: Tools
- **FR**: Outils
- **UK**: Інструменти
- **Описание**: 
  - EN: Sewing tools and equipment
  - FR: Outils et équipement de couture
  - UK: Інструменти та обладнання для шиття
- **Использование**: Ножницы, иглы, линейки, и т.д.

#### 4. **Patterns / Patrons / Викрійки**
- **Value**: `patterns`
- **EN**: Patterns
- **FR**: Patrons
- **UK**: Викрійки
- **Описание**: 
  - EN: Sewing patterns and templates
  - FR: Patrons et modèles de couture
  - UK: Викрійки та шаблони для шиття
- **Использование**: PDF-паттерны, бумажные выкройки

#### 5. **Notions / Fournitures / Фурнітура**
- **Value**: `notions`
- **EN**: Notions
- **FR**: Fournitures
- **UK**: Фурнітура
- **Описание**: 
  - EN: Small sewing items and haberdashery
  - FR: Petits articles de couture et mercerie
  - UK: Дрібні швейні вироби та галантерея
- **Использование**: Эластичная лента, тесьма, и т.д.

### Создание Product Types в Medusa Admin

1. Перейдите в **Settings → Product Types**
2. Создайте каждый тип с **Value** (уникальный идентификатор) и **Name** (название на английском)
3. Переводы будут применяться через файлы локализации

**Пример создания:**
- Value: `fabric`
- Name: `Fabric`
- Description: `Knitted fabrics sold by meter`

## 🏷️ Product Tags (Теги продуктов)

Product Tags используются для **детальной фильтрации и поиска**. Они более специфичны, чем категории и типы.

### Оптимизированная структура тегов с префиксами

Используйте префиксы для группировки тегов и упрощения фильтрации:

#### Группа 1: Принты (Print)

**Префикс**: `print-`

```
print-geometric          - Геометрический / Géométrique / Геометричний
print-polka-dot          - Горошек / Pois / Горошок
print-stripes            - Полоски / Rayures / Смужки
print-check              - Клетка / Vichy / Клітинка
print-zigzag             - Зигзаг / Zigzag / Зигзаг
print-circles             - Круги / Cercles / Кола
print-squares             - Квадраты / Carrés / Квадрати
print-triangles           - Треугольники / Triangles / Трикутники
print-abstract-geometric  - Абстрактная геометрия / Géométrie abstraite / Абстрактна геометрія
print-floral              - Цветочный / Fleuri / Квітковий
print-roses               - Розы / Roses / Троянди
print-small-flowers       - Мелкие цветы / Petites fleurs / Дрібні квіти
print-large-flowers       - Крупные цветы / Grandes fleurs / Великі квіти
print-tropical            - Тропический / Tropical / Тропічний
print-botanical           - Ботанический / Botanique / Ботанічний
print-cherry-blossom      - Сакура / Cerisier / Сакура
print-daisies             - Ромашки / Pâquerettes / Ромашки
print-kids                - Детский / Enfants / Дитячий
print-animals             - Животные / Animaux / Тварини
print-cartoon             - Мультяшные / Dessins animés / Мультяшні персонажі
print-cars                - Машинки / Voitures / Машинки
print-unicorns            - Единороги / Licornes / Єдинороги
print-dinosaurs           - Динозавры / Dinosaures / Динозаври
print-space               - Космос / Espace / Космос
print-princess            - Принцессы / Princesse / Принцеси
print-superheroes         - Супергерои / Super-héros / Супергерої
print-toys                - Игрушки / Jouets / Іграшки
print-abstract            - Абстрактный / Abstrait / Абстрактний
print-marble              - Мрамор / Marbre / Мармур
print-watercolor          - Акварель / Aquarelle / Акварель
print-gradient            - Градиент / Dégradé / Градієнт
print-tie-dye             - Тай-дай / Tie-dye / Тай-дай
print-splatter            - Брызги / Éclaboussures / Плями
print-holiday             - Праздничный / Fêtes / Святковий
print-christmas           - Рождественский / Noël / Новорічний
print-halloween           - Хэллоуин / Halloween / Хелловін
print-easter              - Пасхальный / Pâques / Великодній
print-valentine           - День святого Валентина / Saint-Valentin / День святого Валентина
print-nature              - Природа / Nature / Природа
print-ocean               - Океан / Océan / Океан
print-forest              - Лес / Forêt / Ліс
print-city                - Город / Ville / Місто
```

#### Группа 2: Цвета (Color)

**Префикс**: `color-`

```
# Основные цвета
color-red       - Красный / Rouge / Червоний
color-blue      - Синий / Bleu / Синій
color-green     - Зеленый / Vert / Зелений
color-yellow    - Желтый / Jaune / Жовтий
color-pink      - Розовый / Rose / Рожевий
color-purple    - Фиолетовый / Violet / Фіолетовий
color-orange    - Оранжевый / Orange / Помаранчевий
color-brown     - Коричневый / Marron / Коричневий
color-black     - Черный / Noir / Чорний
color-white     - Белый / Blanc / Білий
color-gray      - Серый / Gris / Сірий
color-beige     - Бежевый / Beige / Бежевий

# Цветовые группы
color-pastel    - Пастельный / Pastel / Пастельний
color-bright    - Яркий / Vif / Яскравий
color-dark      - Темный / Foncé / Темний
color-neutral   - Нейтральный / Neutre / Нейтральний
color-vibrant   - Насыщенный / Éclatant / Насичений
color-muted     - Приглушенный / Adouci / Приглушений
```

#### Группа 3: Сезонность (Season)

**Префикс**: `season-`

```
season-summer      - Летний / Été / Літній
season-winter      - Зимний / Hiver / Зимовий
season-spring      - Весенний / Printemps / Весняний
season-autumn      - Осенний / Automne / Осінній
season-all-season  - Всесезонный / Toutes saisons / Всесезонний
```

#### Группа 4: Плотность (Density)

**Префикс**: `density-`

```
density-light   - Легкий (до 180 г/м²) / Léger (jusqu'à 180 g/m²) / Легкий (до 180 г/м²)
density-medium  - Средний (180-250 г/м²) / Moyen (180-250 g/m²) / Середній (180-250 г/м²)
density-heavy   - Плотный (250+ г/м²) / Lourd (250+ g/m²) / Щільний (250+ г/м²)
```

#### Группа 5: Назначение (Purpose)

**Префикс**: `purpose-`

```
purpose-clothing    - Одежда / Vêtements / Одяг
purpose-children    - Детская одежда / Vêtements enfants / Дитячий одяг
purpose-adult       - Взрослая одежда / Vêtements adultes / Дорослий одяг
purpose-homewear    - Домашняя одежда / Vêtements de maison / Домашній одяг
purpose-sportswear  - Спортивная одежда / Sport / Спортивний одяг
purpose-underwear   - Нижнее белье / Sous-vêtements / Нижня білизна
```

#### Группа 6: Характеристики (Features)

**Префикс**: `feature-`

```
feature-organic         - Органический / Biologique / Органічний
feature-eco-friendly    - Экологичный / Écologique / Екологічний
feature-antibacterial   - Антибактериальный / Antibactérien / Антибактеріальний
feature-moisture-wicking - Влагоотводящий / Évacuation de l'humidité / Вологовідвідний
feature-breathable      - Дышащий / Respirant / Дихаючий
feature-stretch         - Стрейч / Extensible / Стрейч
feature-non-stretch     - Без стрейча / Non extensible / Без стрейчу
feature-brushed         - С начесом / Gratté / З начосом
feature-brushed-interior - С начесом внутри / Gratté intérieur / З начосом всередині
feature-smooth          - Гладкий / Lisse / Гладкий
feature-textured        - Текстурированный / Texturé / Текстурований
```

#### Группа 7: Состав (Composition) - опционально

**Префикс**: `composition-`

```
composition-cotton      - Хлопок / Coton / Бавовна
composition-elastane    - Эластан / Élasthanne / Еластан
composition-polyester   - Полиэстер / Polyester / Поліестер
composition-bamboo      - Бамбук / Bambou / Бамбук
composition-organic      - Органический / Biologique / Органічний
composition-blend       - Смесовый / Mélange / Змішаний
```

## 📊 Примеры использования

### Пример 1: Ткань "Кулірка стрейч с цветочным принтом"

**Product Type**: `fabric`

**Product Category**: `Knit Fabrics > Jersey > Stretch Jersey`

**Product Tags**:
```
print-floral
print-roses
color-pink
color-pastel
season-summer
density-light
purpose-children
feature-stretch
feature-breathable
composition-cotton
composition-elastane
```

### Пример 2: Ткань "Трьохнитка з начосом с детским принтом"

**Product Type**: `fabric`

**Product Category**: `Knit Fabrics > Fleece > Brushed Fleece`

**Product Tags**:
```
print-kids
print-animals
print-cartoon
color-bright
season-winter
density-heavy
purpose-children
feature-brushed
feature-brushed-interior
composition-cotton
feature-organic
```

### Пример 3: Ткань "Двонитка с геометрическим принтом"

**Product Type**: `fabric`

**Product Category**: `Knit Fabrics > Fleece > Two-Thread Fleece`

**Product Tags**:
```
print-geometric
print-polka-dot
color-blue
color-neutral
season-all-season
density-medium
purpose-adult
purpose-clothing
composition-cotton
```

## 🔍 Преимущества использования префиксов

1. **Группировка**: Легко фильтровать теги по группам
2. **Поиск**: Упрощает поиск и фильтрацию в админ-панели
3. **Масштабируемость**: Легко добавлять новые теги в существующие группы
4. **Организация**: Четкая структура для больших каталогов
5. **API**: Удобно работать с тегами через API (фильтрация по префиксу)

## 🛠️ Создание тегов в Medusa Admin

1. Перейдите в **Settings → Product Tags**
2. Создайте теги с **Value** (уникальный идентификатор с префиксом)
3. **Name** можно оставить на английском или локализовать
4. Переводы применяются через файлы локализации (уже добавлены в `messages/`)

**Пример создания тега:**
- Value: `print-floral`
- Name: `Floral Print` (или использовать перевод из `messages/tags`)

## 📝 Рекомендации

### Для Product Types:
- Используйте **максимум 5-7 типов** для простоты навигации
- Типы должны быть **высокоуровневыми** и охватывать все товары
- Если продаете только ткани, можно использовать только `fabric`

### Для Product Tags:
- Используйте **префиксы** для всех тегов
- Один товар может иметь **множество тегов** из разных групп
- Не перегружайте товары тегами - используйте только релевантные
- **Минимум 3-5 тегов** на товар для хорошей фильтрации
- **Максимум 10-12 тегов** на товар для избежания перегрузки

### Приоритет тегов:
1. **Обязательные**: Принт (print-), Цвет (color-), Сезон (season-)
2. **Рекомендуемые**: Плотность (density-), Назначение (purpose-)
3. **Опциональные**: Характеристики (feature-), Состав (composition-)

## 🔄 Связь между Category, Type и Tags

```
Product Type (Fabric)
    ↓
Product Category (Knit Fabrics > Jersey > Stretch Jersey)
    ↓
Product Tags (print-floral, color-pink, season-summer, ...)
```

**Иерархия:**
- **Type** - самый общий уровень (что это: ткань, аксессуар, инструмент)
- **Category** - средний уровень (какой тип трикотажа: кулірка, футер)
- **Tags** - самый детальный уровень (принт, цвет, сезон, характеристики)

## ✅ Чек-лист при создании товара

- [ ] Выбран **Product Type** (например, `fabric`)
- [ ] Выбрана **Product Category** (3 уровня: главная → подкатегория → под-подкатегория)
- [ ] Добавлены теги **Принт** (минимум 1 тег из группы `print-`)
- [ ] Добавлены теги **Цвет** (минимум 1 тег из группы `color-`)
- [ ] Добавлен тег **Сезон** (1 тег из группы `season-`)
- [ ] Добавлен тег **Плотность** (1 тег из группы `density-`)
- [ ] Добавлен тег **Назначение** (минимум 1 тег из группы `purpose-`)
- [ ] Добавлены релевантные теги **Характеристики** (из группы `feature-`)
- [ ] Все теги используют **префиксы** (print-, color-, season-, и т.д.)

## 📚 Дополнительные ресурсы

- См. `CATEGORIES_STRUCTURE.md` для структуры категорий
- См. `PRODUCT_CREATION_GUIDE.md` для детального руководства по созданию товаров
- Переводы тегов уже добавлены в `messages/en.json`, `messages/fr.json`, `messages/uk.json`

---

**Примечание**: Все Product Types и Tags создаются в Medusa Admin с английскими названиями. Переводы применяются автоматически через систему локализации `next-intl` на основе value/name.

