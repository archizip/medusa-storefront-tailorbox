# Структура категорий и тегов для трикотажа

## 📋 Обзор

Данный документ описывает рекомендуемую структуру категорий и систему тегов для организации ассортимента трикотажных тканей. Категории создаются на **английском языке** в Medusa, а затем переводятся на французский и украинский через систему локализации.

## 🌍 Мультиязычность

В Medusa категории создаются с **handle** (уникальный идентификатор на английском) и **name** (название на английском). Переводы названий хранятся в файлах переводов `messages/` и используются через `next-intl`.

**Формат в документе**: EN / FR / UK

## 🏗️ Структура категорий (Categories)

### Уровень 1: Основные категории по типу трикотажа

```
Knit Fabrics / Tricot / Трикотаж
├── Jersey / Jersey / Джерсі
│   ├── Single Jersey / Jersey simple / Джерсі
│   └── Stretch Jersey / Jersey extensible / Джерсі стрейч
├── Fleece / Molleton / Моллетон
│   ├── Two-Thread Fleece / Double fil / Двонитка
│   ├── Brushed Two-Thread / Double fil gratté / Двонитка з начосом
│   ├── French Terry / French Terry / Френч террі
│   └── Brushed Fleece / Molleton gratté / Моллетон з начосом
└── Other Knits / Autres mailles / Інші види трикотажу
    ├── Interlock / Interlock / Інтерлок
    ├── Rib / Côte / Рібана
    └── Piqué / Piqué / Піке
```

### Детальное описание категорий с переводами

#### 1. **Knit Fabrics / Tricot / Трикотаж** (Главная категория)
- **Handle**: `knit-fabrics`
- **EN**: Knit Fabrics
- **FR**: Tricot
- **UK**: Трикотаж
- **Описание**: 
  - EN: Knitted fabrics for clothing
  - FR: Tissus en maille pour vêtements
  - UK: Трикотажні тканини для одягу

#### 2. **Jersey / Jersey / Джерсі**
- **Handle**: `jersey`
- **EN**: Jersey
- **FR**: Jersey
- **UK**: Джерсі
- **Описание**: 
  - EN: Single-layer knit with smooth face
  - FR: Tricot simple face avec surface lisse
  - UK: Односторонній трикотаж з гладкою поверхнею
- **Подкатегории**:
  - **Handle**: `single-jersey`
    - EN: Single Jersey
    - FR: Jersey simple
    - UK: Джерсі
    - Описание: EN: Basic single-layer jersey knit / FR: Maille jersey simple de base / UK: Базовий односторонній джерсі
  - **Handle**: `stretch-jersey`
    - EN: Stretch Jersey
    - FR: Jersey extensible
    - UK: Джерсі стрейч
    - Описание: EN: Jersey knit with added elastane for stretch / FR: Maille jersey avec élasthanne ajouté pour l'élasticité / UK: Джерсі з додаванням еластану для розтягування

#### 3. **Fleece / Molleton / Моллетон**
- **Handle**: `fleece`
- **EN**: Fleece
- **FR**: Molleton
- **UK**: Моллетон
- **Описание**: 
  - EN: Two or three-layer knit with back side
  - FR: Tricot double ou triple face avec envers
  - UK: Дво- або тришаровий трикотаж з виворітним боком
- **Подкатегории**:
  - **Handle**: `two-thread-fleece`
    - EN: Two-Thread Fleece
    - FR: Double fil
    - UK: Двонитка
    - Описание: EN: Two-layer fleece / FR: Molleton à deux fils / UK: Двошаровий моллетон
  - **Handle**: `brushed-two-thread`
    - EN: Brushed Two-Thread
    - FR: Double fil gratté
    - UK: Двонитка з начосом
    - Описание: EN: Two-layer fleece with brushing / FR: Molleton à deux fils avec grattage / UK: Двошаровий моллетон з начосом
  - **Handle**: `french-terry`
    - EN: French Terry
    - FR: French Terry
    - UK: Френч террі
    - Описание: EN: Three-layer fleece with loops / FR: Molleton à trois fils avec boucles / UK: Тришаровий моллетон з петлями
  - **Handle**: `brushed-fleece`
    - EN: Brushed Fleece
    - FR: Molleton gratté
    - UK: Моллетон з начосом
    - Описание: EN: Three-layer fleece with brushing / FR: Molleton à trois fils avec grattage / UK: Тришаровий моллетон з начосом

#### 4. **Other Knits / Autres mailles / Інші види трикотажу**
- **Handle**: `other-knits`
- **EN**: Other Knits
- **FR**: Autres mailles
- **UK**: Інші види трикотажу
- **Описание**: 
  - EN: Other types of knitted fabrics
  - FR: Autres types de tissus en maille
  - UK: Інші види трикотажних тканин
- **Подкатегории**:
  - **Handle**: `interlock`
    - EN: Interlock
    - FR: Interlock
    - UK: Інтерлок
    - Описание: EN: Double-knit fabric with smooth surface on both sides / FR: Tissu double maille avec surface lisse des deux côtés / UK: Подвійний трикотаж з гладкою поверхнею з обох сторін
  - **Handle**: `rib`
    - EN: Rib
    - FR: Côte
    - UK: Рібана
    - Описание: EN: Ribbed knit with vertical ridges, highly elastic / FR: Maille côtelée avec côtes verticales, très élastique / UK: Ребристий трикотаж з вертикальними смугами, дуже еластичний
  - **Handle**: `pique`
    - EN: Piqué
    - FR: Piqué
    - UK: Піке
    - Описание: EN: Textured knit with raised geometric patterns / FR: Maille texturée avec motifs géométriques en relief / UK: Текстурований трикотаж з рельєфними геометричними візерунками

## 🏷️ Система тегов (Tags)

Теги в Medusa создаются с **value** (уникальный идентификатор) и могут иметь локализованные названия. Формат: `value` - FR / UK

### Группа 1: Принты и узоры (Imprimés / Принти)

#### Геометрические принты
- `geometric` - Géométrique / Геометричний
- `polka-dot` - Pois / Горошок
- `stripes` - Rayures / Смужки
- `check` - Vichy / Клітинка
- `zigzag` - Zigzag / Зигзаг
- `circles` - Cercles / Кола
- `squares` - Carrés / Квадрати
- `triangles` - Triangles / Трикутники
- `abstract-geometric` - Géométrie abstraite / Абстрактна геометрія

#### Цветочные принты
- `floral` - Fleuri / Квітковий
- `roses` - Roses / Троянди
- `small-flowers` - Petites fleurs / Дрібні квіти
- `large-flowers` - Grandes fleurs / Великі квіти
- `tropical` - Tropical / Тропічний
- `botanical` - Botanique / Ботанічний
- `cherry-blossom` - Cerisier / Сакура
- `daisies` - Pâquerettes / Ромашки

#### Детские принты
- `kids` - Enfants / Дитячий
- `animals` - Animaux / Тварини
- `cartoon` - Dessins animés / Мультяшні персонажі
- `cars` - Voitures / Машинки
- `unicorns` - Licornes / Єдинороги
- `dinosaurs` - Dinosaures / Динозаври
- `space` - Espace / Космос
- `princess` - Princesse / Принцеси
- `superheroes` - Super-héros / Супергерої
- `toys` - Jouets / Іграшки

#### Абстрактные принты
- `abstract` - Abstrait / Абстрактний
- `marble` - Marbre / Мармур
- `watercolor` - Aquarelle / Акварель
- `gradient` - Dégradé / Градієнт
- `tie-dye` - Tie-dye / Тай-дай
- `splatter` - Éclaboussures / Плями

#### Тематические принты
- `holiday` - Fêtes / Святковий
- `christmas` - Noël / Новорічний
- `halloween` - Halloween / Хелловін
- `easter` - Pâques / Великодній
- `valentine` - Saint-Valentin / День святого Валентина
- `nature` - Nature / Природа
- `ocean` - Océan / Океан
- `forest` - Forêt / Ліс
- `city` - Ville / Місто

### Группа 2: Цветовая палитра (Palette de couleurs / Кольорова палітра)

#### Основные цвета
- `red` - Rouge / Червоний
- `blue` - Bleu / Синій
- `green` - Vert / Зелений
- `yellow` - Jaune / Жовтий
- `pink` - Rose / Рожевий
- `purple` - Violet / Фіолетовий
- `orange` - Orange / Помаранчевий
- `brown` - Marron / Коричневий
- `black` - Noir / Чорний
- `white` - Blanc / Білий
- `gray` - Gris / Сірий
- `beige` - Beige / Бежевий

#### Цветовые группы
- `pastel` - Pastel / Пастельний
- `bright` - Vif / Яскравий
- `dark` - Foncé / Темний
- `neutral` - Neutre / Нейтральний
- `vibrant` - Éclatant / Насичений
- `muted` - Adouci / Приглушений

### Группа 3: Сезонность (Saisonnalité / Сезонність)

- `summer` - Été / Літній
- `winter` - Hiver / Зимовий
- `spring` - Printemps / Весняний
- `autumn` - Automne / Осінній
- `all-season` - Toutes saisons / Всесезонний

### Группа 4: Плотность и вес (Densité / Щільність)

- `light` - Léger (jusqu'à 180 g/m²) / Легкий (до 180 г/м²)
- `medium` - Moyen (180-250 g/m²) / Середній (180-250 г/м²)
- `heavy` - Lourd (250+ g/m²) / Щільний (250+ г/м²)

### Группа 5: Назначение (Usage / Призначення)

- `clothing` - Vêtements / Одяг
- `children` - Enfants / Дитячий одяг
- `adult` - Adultes / Дорослий одяг
- `homewear` - Vêtements de maison / Домашній одяг
- `sportswear` - Sport / Спортивний одяг
- `underwear` - Sous-vêtements / Нижня білизна

### Группа 6: Специальные характеристики (Caractéristiques / Характеристики)

- `organic` - Biologique / Органічний
- `eco-friendly` - Écologique / Екологічний
- `antibacterial` - Antibactérien / Антибактеріальний
- `moisture-wicking` - Évacuation de l'humidité / Вологовідвідний
- `breathable` - Respirant / Дихаючий
- `stretch` - Extensible / Стрейч
- `non-stretch` - Non extensible / Без стрейчу

## 📊 Примеры использования

### Пример 1: Ткань "Brushed Fleece / Molleton gratté / Моллетон з начосом с цветочным принтом"
- **Категория**: 
  - Handle: `fleece > brushed-fleece`
  - EN: `Fleece > Brushed Fleece`
  - FR: `Molleton > Molleton gratté`
  - UK: `Моллетон > Моллетон з начосом`
- **Теги**: 
  - `floral`, `roses`, `pink`, `pastel`, `all-season`, `medium`, `clothing`, `children`

### Пример 2: Ткань "Stretch Jersey / Jersey extensible / Джерсі стрейч с детским принтом"
- **Категория**: 
  - Handle: `jersey > stretch-jersey`
  - EN: `Jersey > Stretch Jersey`
  - FR: `Jersey > Jersey extensible`
  - UK: `Джерсі > Джерсі стрейч`
- **Теги**: 
  - `kids`, `animals`, `cartoon`, `bright`, `summer`, `light`, `stretch`, `children`

### Пример 3: Ткань "Two-Thread Fleece / Double fil / Двонитка с геометрическим принтом"
- **Категория**: 
  - Handle: `fleece > two-thread-fleece`
  - EN: `Fleece > Two-Thread Fleece`
  - FR: `Molleton > Double fil`
  - UK: `Моллетон > Двонитка`
- **Теги**: 
  - `geometric`, `polka-dot`, `blue`, `neutral`, `all-season`, `medium`, `clothing`, `adult`

## 🔍 Рекомендации по поиску и фильтрации

### Фильтры по категориям
- Основной фильтр: Тип трикотажа (Кулирка, Футер)
- Вторичный фильтр: Конкретный вид (Двунитка, Трехнитка и т.д.)

### Фильтры по тегам
- **Принт**: Геометрические, Цветочные, Детские, Абстрактные
- **Цвет**: Основные цвета + цветовые группы
- **Сезон**: Лето, Зима, Весна, Осень, Всесезонные
- **Плотность**: Легкие, Средние, Плотные
- **Назначение**: Детская одежда, Взрослая одежда, Спортивная одежда

## 🛠️ Реализация в Medusa

### Создание категорий через Medusa Admin

**Важно**: Создавайте все категории с английскими названиями (Name). Переводы будут добавлены через файлы локализации.

1. **Создайте основную категорию "Knit Fabrics"**:
   - Handle: `knit-fabrics`
   - Name: `Knit Fabrics` (английский)
   - Description: `Knitted fabrics for clothing`

2. **Создайте подкатегорию "Jersey"**:
   - Handle: `jersey`
   - Parent: `knit-fabrics`
   - Name: `Jersey` (английский)
   - Description: `Single-layer knit with smooth face`
   
3. **Создайте подкатегории для Jersey**:
   - Handle: `single-jersey`, Name: `Single Jersey`, Description: `Basic single-layer jersey knit`
   - Handle: `stretch-jersey`, Name: `Stretch Jersey`, Description: `Jersey knit with added elastane for stretch`

4. **Создайте подкатегорию "Fleece"**:
   - Handle: `fleece`
   - Parent: `knit-fabrics`
   - Name: `Fleece` (английский)
   - Description: `Two or three-layer knit with back side`
   
5. **Создайте подкатегории для Fleece**:
   - Handle: `two-thread-fleece`, Name: `Two-Thread Fleece`
   - Handle: `brushed-two-thread`, Name: `Brushed Two-Thread`
   - Handle: `french-terry`, Name: `French Terry`
   - Handle: `brushed-fleece`, Name: `Brushed Fleece`

6. **Создайте подкатегорию "Other Knits"**:
   - Handle: `other-knits`
   - Parent: `knit-fabrics`
   - Name: `Other Knits` (английский)
   - Description: `Other types of knitted fabrics`
   
7. **Создайте подкатегории для Other Knits**:
   - Handle: `interlock`, Name: `Interlock`, Description: `Double-knit fabric with smooth surface on both sides`
   - Handle: `rib`, Name: `Rib`, Description: `Ribbed knit with vertical ridges, highly elastic`
   - Handle: `pique`, Name: `Piqué`, Description: `Textured knit with raised geometric patterns`

### Создание тегов через Medusa Admin

Теги создаются с **value** (уникальный идентификатор). Названия можно локализовать в интерфейсе.

**Рекомендуемая структура тегов:**
```
# Принты
print-geometric
print-floral
print-kids
print-abstract

# Цвета
color-red
color-blue
color-pastel
color-bright

# Сезонность
season-summer
season-winter
season-all-season

# Плотность
density-light
density-medium
density-heavy

# Назначение
purpose-children
purpose-adult
purpose-sportswear
```

### Локализация названий категорий

В Medusa категории имеют поле `name`, которое можно локализовать. Для мультиязычности:

1. **Вариант 1**: Использовать поле `name` с основным языком (например, французским), а переводы хранить в `metadata`:
```json
{
  "name": "Jersey",
  "metadata": {
    "name_uk": "Джерсі",
    "name_fr": "Jersey"
  }
}
```

2. **Вариант 2**: Использовать систему локализации через `next-intl` и хранить переводы в файлах `messages/`:
   - Добавить секцию `categories` в `messages/fr.json` и `messages/uk.json`
   - Использовать ключи для названий категорий

### Пример структуры переводов для категорий

**messages/en.json:**
```json
{
  "categories": {
    "knit-fabrics": "Knit Fabrics",
    "jersey": "Jersey",
    "single-jersey": "Single Jersey",
    "stretch-jersey": "Stretch Jersey",
    "fleece": "Fleece",
    "two-thread-fleece": "Two-Thread Fleece",
    "brushed-two-thread": "Brushed Two-Thread",
    "french-terry": "French Terry",
    "brushed-fleece": "Brushed Fleece",
    "other-knits": "Other Knits",
    "interlock": "Interlock",
    "rib": "Rib",
    "pique": "Piqué"
  }
}
```

**messages/fr.json:**
```json
{
  "categories": {
    "knit-fabrics": "Tricot",
    "jersey": "Jersey",
    "single-jersey": "Jersey simple",
    "stretch-jersey": "Jersey extensible",
    "fleece": "Molleton",
    "two-thread-fleece": "Double fil",
    "brushed-two-thread": "Double fil gratté",
    "french-terry": "French Terry",
    "brushed-fleece": "Molleton gratté",
    "other-knits": "Autres mailles",
    "interlock": "Interlock",
    "rib": "Côte",
    "pique": "Piqué"
  }
}
```

**messages/uk.json:**
```json
{
  "categories": {
    "knit-fabrics": "Трикотаж",
    "jersey": "Джерсі",
    "single-jersey": "Джерсі",
    "stretch-jersey": "Джерсі стрейч",
    "fleece": "Моллетон",
    "two-thread-fleece": "Двонитка",
    "brushed-two-thread": "Двонитка з начосом",
    "french-terry": "Френч террі",
    "brushed-fleece": "Моллетон з начосом",
    "other-knits": "Інші види трикотажу",
    "interlock": "Інтерлок",
    "rib": "Рібана",
    "pique": "Піке"
  }
}
```

## 🔧 Использование переводов в компонентах

### Пример компонента с локализацией категорий

```tsx
// src/modules/categories/components/category-name.tsx
import { useTranslations } from 'next-intl'
import { HttpTypes } from '@medusajs/types'

type CategoryNameProps = {
  category: HttpTypes.StoreProductCategory
}

export default function CategoryName({ category }: CategoryNameProps) {
  const t = useTranslations('categories')
  
  // Используем handle как ключ для перевода
  // Если перевода нет, используем английское название из category.name
  const translatedName = t(category.handle) || category.name
  
  return <span>{translatedName}</span>
}
```

### Важно при создании категорий

1. **Создавайте категории в Medusa Admin с английскими названиями**:
   - Handle: `jersey` (уникальный идентификатор)
   - Name: `Jersey` (английское название)

2. **Переводы уже добавлены в файлы**:
   - `messages/en.json` - английские названия
   - `messages/fr.json` - французские переводы
   - `messages/uk.json` - украинские переводы

3. **Используйте handle категории как ключ для перевода**:
   ```tsx
   const t = useTranslations('categories')
   const name = t(category.handle) // автоматически выберет правильный язык
   ```

## 📝 Примечания

1. **Создание категорий**: Все категории создаются в Medusa Admin с **английскими названиями** (Name). Handle также на английском.

2. **Переводы**: Переводы названий категорий хранятся в файлах `messages/` и автоматически применяются через `next-intl` на основе handle категории.

3. **Handle**: Handle категории используется как ключ для перевода. Он должен совпадать с ключом в файлах переводов.

4. **Множественные теги**: Один продукт может иметь несколько тегов из разных групп.

5. **Гибкость**: Структура позволяет легко добавлять новые типы тканей и принты.

6. **Поиск**: Комбинация категорий и тегов обеспечивает гибкий поиск.

7. **Масштабируемость**: Система легко расширяется при росте ассортимента.

8. **Добавление новых категорий**: 
   - Создайте категорию в Medusa с английским названием
   - Добавьте переводы в `messages/en.json`, `messages/fr.json`, `messages/uk.json`
   - Используйте handle категории как ключ для перевода

