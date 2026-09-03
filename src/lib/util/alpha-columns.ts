/**
 * Раскладка длинного алфавитного списка по колонкам с буквенными заголовками
 * («A — E», «F — L», …) — как в каталогах тканевых магазинов.
 *
 * Число колонок подбирается под реальный объём данных: маленький каталог не
 * должен растягиваться на четыре почти пустые колонки.
 */

export type AlphaColumn<T> = {
  /** Заголовок колонки: «A — E» либо одна буква, если диапазон схлопнулся. */
  label: string
  items: T[]
}

type Options = {
  /** Максимум колонок (по умолчанию 4, как в референсе). */
  maxColumns?: number
  /** Минимум элементов в колонке, пока колонок можно взять меньше. */
  minPerColumn?: number
  /**
   * Локаль для сортировки и регистра букв. Задавать обязательно там, где
   * разметка рендерится и на сервере, и в браузере: дефолтная локаль Node и
   * локаль браузера дают разный порядок и разные заглавные буквы — то есть
   * разный HTML и ошибку гидрации.
   */
  locale?: string
}

const firstLetter = (value: string, locale?: string) => {
  // По кодовой точке, а не charAt: иначе эмодзи или редкий символ в названии
  // распадётся на одинокий суррогат.
  const code = value.trim().codePointAt(0)
  return code === undefined
    ? "•"
    : String.fromCodePoint(code).toLocaleUpperCase(locale)
}

/** Подряд идущие элементы с одной первой буквой. */
function groupByLetter<T>(
  sorted: T[],
  getName: (item: T) => string,
  locale?: string
): T[][] {
  const groups: T[][] = []

  for (const item of sorted) {
    const letter = firstLetter(getName(item), locale)
    const last = groups[groups.length - 1]

    if (last && firstLetter(getName(last[0]), locale) === letter) {
      last.push(item)
    } else {
      groups.push([item])
    }
  }

  return groups
}

/**
 * Складывает буквенные группы в колонки, не разрывая букву между колонками —
 * иначе подписи вроде «C — D» и «D — H» перекрываются.
 */
function packGroups<T>(
  groups: T[][],
  columnCount: number,
  total: number
): T[][] {
  const target = Math.ceil(total / columnCount)
  const chunks: T[][] = []
  let current: T[] = []

  groups.forEach((group, index) => {
    const groupsLeft = groups.length - index
    const columnsLeft = columnCount - chunks.length

    // Хватит ли оставшихся букв на оставшиеся колонки — если нет, закрываем текущую.
    const mustClose = current.length > 0 && groupsLeft < columnsLeft
    // Закрываем и когда добавление буквы уводит колонку дальше от целевого размера.
    const betterToClose =
      current.length > 0 &&
      chunks.length < columnCount - 1 &&
      Math.abs(current.length + group.length - target) >
        Math.abs(current.length - target)

    if (mustClose || betterToClose) {
      chunks.push(current)
      current = []
    }

    current.push(...group)
  })

  if (current.length > 0) {
    chunks.push(current)
  }

  return chunks
}

/** Равные куски без оглядки на буквы. */
function splitEvenly<T>(sorted: T[], columnCount: number): T[][] {
  const perColumn = Math.ceil(sorted.length / columnCount)
  const chunks: T[][] = []

  for (let start = 0; start < sorted.length; start += perColumn) {
    chunks.push(sorted.slice(start, start + perColumn))
  }

  return chunks
}

/**
 * Сортирует элементы по имени и делит их на почти равные колонки,
 * подписывая каждую диапазоном первых букв.
 */
export function splitIntoAlphaColumns<T>(
  items: T[],
  getName: (item: T) => string,
  { maxColumns = 4, minPerColumn = 5, locale }: Options = {}
): AlphaColumn<T>[] {
  const collator = new Intl.Collator(locale)
  const sorted = [...items].sort((a, b) =>
    collator.compare(getName(a), getName(b))
  )

  if (sorted.length === 0) {
    return []
  }

  const columnCount = Math.max(
    1,
    Math.min(maxColumns, Math.ceil(sorted.length / minPerColumn))
  )
  const groups = groupByLetter(sorted, getName, locale)

  // Букв хватает — режем по буквам. Не хватает (например, все подкатегории
  // называются «Шёлк …») — режем внутри буквы, иначе колонка была бы одна.
  const chunks =
    groups.length >= columnCount
      ? packGroups(groups, columnCount, sorted.length)
      : splitEvenly(sorted, columnCount)

  return chunks.map((chunk) => {
    const from = firstLetter(getName(chunk[0]), locale)
    const to = firstLetter(getName(chunk[chunk.length - 1]), locale)

    return {
      label: from === to ? from : `${from} — ${to}`,
      items: chunk,
    }
  })
}
