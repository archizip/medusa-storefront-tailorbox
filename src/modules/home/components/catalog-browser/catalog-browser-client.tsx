"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Image from "next/image"
import { useLocale } from "next-intl"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useTranslations } from "@lib/util/i18n"
import { splitIntoAlphaColumns } from "@lib/util/alpha-columns"

type CatalogEntry = {
  id: string
  name: string
  handle: string
}

type CatalogPreviewProduct = {
  id: string
  title: string
  handle: string
  image?: string
}

/** Готовая к отрисовке рубрика — всё посчитано в server-компоненте. */
export type CatalogSection = {
  id: string
  name: string
  handle: string
  description: string | null
  /** Прямые подкатегории (пилюли). Пусто, если каталог двухуровневый. */
  groups: CatalogEntry[]
  /** Что раскладывается по алфавитным колонкам. */
  entries: CatalogEntry[]
  /** Реальные товары рубрики для боковой колонки. */
  preview: CatalogPreviewProduct[]
  productCount: number
  subcategoryCount: number
}

type CatalogBrowserClientProps = {
  sections: CatalogSection[]
}

// Пауза перед сменой рубрики по ховеру: без неё диагональный проход курсором
// к ссылке в панели утаскивает контент из-под курсора.
const HOVER_INTENT_MS = 140

/**
 * Плитка рубрики: реальное фото товара, а когда фотографий в каталоге нет —
 * буква названия, чтобы плитка не была пустой.
 */
function CategoryTile({
  image,
  name,
  size,
}: {
  image?: string
  name: string
  size: number
}) {
  const code = name.trim().codePointAt(0)
  const initial =
    code === undefined ? "" : String.fromCodePoint(code).toLocaleUpperCase()

  return (
    <span
      aria-hidden="true"
      style={{
        position: "relative",
        width: size,
        height: size,
        flexShrink: 0,
        borderRadius: 3,
        overflow: "hidden",
        background: "var(--bg-deep)",
        border: "1px solid var(--line-soft)",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {image ? (
        <Image
          src={image}
          alt=""
          fill
          quality={40}
          sizes={`${size}px`}
          style={{ objectFit: "cover" }}
        />
      ) : (
        <span
          className="mono"
          style={{ fontSize: size * 0.45, color: "var(--ink-4)" }}
        >
          {initial}
        </span>
      )}
    </span>
  )
}

/** Колонки «A — E», «F — L», … по подкатегориям одной рубрики. */
function AlphaColumns({
  entries,
  maxColumns,
  locale,
}: {
  entries: CatalogEntry[]
  maxColumns: number
  locale: string
}) {
  const columns = useMemo(
    () =>
      splitIntoAlphaColumns(entries, (entry) => entry.name, {
        maxColumns,
        locale,
      }),
    [entries, maxColumns, locale]
  )

  if (columns.length === 0) {
    return null
  }

  return (
    <div className="catalog-columns">
      {columns.map((column, index) => (
        <div key={`${column.label}-${index}`} style={{ minWidth: 0 }}>
          <div
            className="mono"
            style={{
              fontSize: 11,
              letterSpacing: "0.1em",
              color: "var(--ink-4)",
              textTransform: "uppercase",
              paddingBottom: 8,
              marginBottom: 10,
              borderBottom: "1px solid var(--line-soft)",
            }}
          >
            {column.label}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
            {column.items.map((entry) => (
              <LocalizedClientLink
                key={entry.id}
                href={`/categories/${entry.handle}`}
                className="catalog-link"
              >
                {entry.name}
              </LocalizedClientLink>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default function CatalogBrowserClient({
  sections,
}: CatalogBrowserClientProps) {
  const t = useTranslations("home.catalog")
  const locale = useLocale()
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "")
  const [expanded, setExpanded] = useState(false)
  const railRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (hoverTimeout.current) {
        clearTimeout(hoverTimeout.current)
      }
    }
  }, [])

  const cancelHoverIntent = () => {
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current)
      hoverTimeout.current = null
    }
  }

  const selectNow = (id: string) => {
    cancelHoverIntent()
    setActiveId(id)
  }

  const selectOnHoverIntent = (id: string) => {
    cancelHoverIntent()
    hoverTimeout.current = setTimeout(() => setActiveId(id), HOVER_INTENT_MS)
  }

  // role="tablist" обещает навигацию стрелками — лента вертикальная на десктопе
  // и горизонтальная на мобильном, поэтому слушаем обе пары стрелок.
  const handleRailKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    const step =
      event.key === "ArrowDown" || event.key === "ArrowRight"
        ? 1
        : event.key === "ArrowUp" || event.key === "ArrowLeft"
        ? -1
        : 0

    let nextIndex: number | null = null
    if (step !== 0) {
      nextIndex = (index + step + sections.length) % sections.length
    } else if (event.key === "Home") {
      nextIndex = 0
    } else if (event.key === "End") {
      nextIndex = sections.length - 1
    }

    if (nextIndex === null) {
      return
    }

    event.preventDefault()
    const nextId = sections[nextIndex].id
    selectNow(nextId)
    railRefs.current[nextId]?.focus()
  }

  if (sections.length === 0) {
    return null
  }

  const active =
    sections.find((section) => section.id === activeId) ?? sections[0]

  const sectionCounts = (section: CatalogSection) =>
    [
      section.subcategoryCount > 0 &&
        t("subcategories", { count: section.subcategoryCount }),
      section.productCount > 0 &&
        t("products", { count: section.productCount }),
    ]
      .filter(Boolean)
      .join(" · ")

  return (
    <section
      data-testid="home-catalog"
      style={{
        background: "var(--bg-deep)",
        borderBottom: "1px solid var(--line)",
      }}
    >
      <div
        style={{
          maxWidth: 1360,
          margin: "0 auto",
          padding: "32px 32px 40px",
        }}
      >
        {/* Заголовок секции */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 24,
            flexWrap: "wrap",
            marginBottom: 24,
          }}
        >
          <div>
            <div className="uppercase-label" style={{ marginBottom: 10 }}>
              {t("label")}
            </div>
            <h1
              className="serif"
              style={{
                fontSize: "clamp(28px, 3.4vw, 42px)",
                margin: 0,
                lineHeight: 1,
                letterSpacing: "-0.02em",
                color: "var(--ink)",
              }}
            >
              {t("title")}
            </h1>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button
              type="button"
              className="btn btn-soft btn-sm"
              data-testid="catalog-expand-toggle"
              aria-expanded={expanded}
              aria-controls="catalog-full"
              onClick={() => setExpanded((value) => !value)}
              style={{ borderRadius: 999 }}
            >
              {expanded ? t("collapse") : t("expand")}
            </button>
            <LocalizedClientLink
              href="/store"
              className="btn btn-primary btn-sm"
              style={{ borderRadius: 999 }}
            >
              {t("allFabrics")} →
            </LocalizedClientLink>
          </div>
        </div>

        {expanded ? (
          /* Развёрнутый вид: весь каталог сразу, рубрика за рубрикой */
          <div
            id="catalog-full"
            data-testid="catalog-expanded"
            aria-label={t("title")}
            style={{ display: "flex", flexDirection: "column", gap: 28 }}
          >
            {sections.map((section) => (
              <div
                key={section.id}
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--line-soft)",
                  borderRadius: 4,
                  padding: "22px 24px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    marginBottom: 18,
                    flexWrap: "wrap",
                  }}
                >
                  <CategoryTile
                    image={section.preview[0]?.image}
                    name={section.name}
                    size={28}
                  />
                  <LocalizedClientLink
                    href={`/categories/${section.handle}`}
                    className="serif"
                    style={{
                      fontSize: 24,
                      color: "var(--ink)",
                      textDecoration: "none",
                    }}
                  >
                    {section.name}
                  </LocalizedClientLink>
                  <span
                    className="mono"
                    style={{ fontSize: 11, color: "var(--ink-4)" }}
                  >
                    {sectionCounts(section)}
                  </span>
                </div>
                {/* Прямые подкатегории — пилюлями, как в свёрнутой панели:
                    иначе в «полном» каталоге не хватало бы одного уровня. */}
                {section.groups.length > 0 && (
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 8,
                      marginBottom: 20,
                    }}
                  >
                    {section.groups.map((group) => (
                      <LocalizedClientLink
                        key={group.id}
                        href={`/categories/${group.handle}`}
                        className="pill pill-accent"
                        style={{ textDecoration: "none" }}
                      >
                        {group.name}
                      </LocalizedClientLink>
                    ))}
                  </div>
                )}
                {section.entries.length > 0 ? (
                  <AlphaColumns
                    entries={section.entries}
                    maxColumns={4}
                    locale={locale}
                  />
                ) : (
                  <p
                    style={{
                      fontSize: 14,
                      color: "var(--ink-3)",
                      margin: 0,
                      maxWidth: 520,
                    }}
                  >
                    {t("emptyCategory")}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          /* Свёрнутый вид: рубрики слева, выбранная раскрыта справа */
          <div className="catalog-layout">
            <div
              role="tablist"
              aria-label={t("title")}
              className="catalog-rail"
              onMouseLeave={cancelHoverIntent}
            >
              {sections.map((section, index) => {
                const isActive = section.id === active.id

                return (
                  <button
                    key={section.id}
                    type="button"
                    role="tab"
                    id={`catalog-tab-${section.id}`}
                    aria-selected={isActive}
                    aria-controls="catalog-panel"
                    data-testid="catalog-rail-item"
                    data-active={isActive ? "true" : undefined}
                    tabIndex={isActive ? 0 : -1}
                    ref={(node) => {
                      railRefs.current[section.id] = node

                      return () => {
                        delete railRefs.current[section.id]
                      }
                    }}
                    onKeyDown={(event) => handleRailKeyDown(event, index)}
                    onClick={() => selectNow(section.id)}
                    onFocus={() => selectNow(section.id)}
                    onMouseEnter={() => selectOnHoverIntent(section.id)}
                    className="catalog-rail-item"
                  >
                    <CategoryTile
                      image={section.preview[0]?.image}
                      name={section.name}
                      size={26}
                    />
                    <span style={{ flex: 1, textAlign: "left", minWidth: 0 }}>
                      {section.name}
                    </span>
                    {section.productCount > 0 && (
                      <span
                        className="mono catalog-rail-count"
                        style={{ fontSize: 11 }}
                      >
                        {section.productCount}
                      </span>
                    )}
                    <span
                      aria-hidden="true"
                      className="mono catalog-rail-arrow"
                      style={{ fontSize: 12 }}
                    >
                      →
                    </span>
                  </button>
                )
              })}
            </div>

            <div
              id="catalog-panel"
              role="tabpanel"
              aria-labelledby={`catalog-tab-${active.id}`}
              data-testid="catalog-panel"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--line)",
                borderRadius: 4,
                padding: "24px 26px",
                minWidth: 0,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 14,
                  flexWrap: "wrap",
                  marginBottom: 18,
                }}
              >
                <span
                  className="serif"
                  style={{ fontSize: 26 }}
                  data-testid="catalog-panel-title"
                >
                  {active.name}
                </span>
                <LocalizedClientLink
                  href={`/categories/${active.handle}`}
                  style={{
                    fontSize: 13,
                    color: "var(--accent)",
                    borderBottom: "1px solid var(--accent-soft)",
                    paddingBottom: 1,
                  }}
                >
                  {t("viewCategory")}
                </LocalizedClientLink>
                {active.description && (
                  <span
                    style={{
                      fontSize: 13,
                      color: "var(--ink-3)",
                      flexBasis: "100%",
                    }}
                  >
                    {active.description}
                  </span>
                )}
              </div>

              {/* Прямые подкатегории — пилюлями; в колонках ниже их нет */}
              {active.groups.length > 0 && (
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 8,
                    marginBottom: 22,
                  }}
                >
                  {active.groups.map((group) => (
                    <LocalizedClientLink
                      key={group.id}
                      href={`/categories/${group.handle}`}
                      className="pill pill-accent"
                      style={{ textDecoration: "none" }}
                    >
                      {group.name}
                    </LocalizedClientLink>
                  ))}
                </div>
              )}

              <div className="catalog-panel-body">
                {active.entries.length > 0 ? (
                  <AlphaColumns
                    entries={active.entries}
                    maxColumns={3}
                    locale={locale}
                  />
                ) : (
                  <p
                    style={{
                      fontSize: 14,
                      color: "var(--ink-3)",
                      margin: 0,
                      maxWidth: 420,
                    }}
                  >
                    {t("emptyCategory")}
                  </p>
                )}

                {/* Товары этой рубрики — настоящие позиции каталога */}
                {active.preview.length > 0 && (
                  <div>
                    <div
                      className="mono"
                      style={{
                        fontSize: 11,
                        letterSpacing: "0.1em",
                        color: "var(--ink-4)",
                        textTransform: "uppercase",
                        paddingBottom: 8,
                        marginBottom: 10,
                        borderBottom: "1px solid var(--line-soft)",
                      }}
                    >
                      {t("inSection")}
                    </div>
                    <div className="catalog-preview-items">
                      {active.preview.map((product) => (
                        <LocalizedClientLink
                          key={product.id}
                          href={`/products/${product.handle}`}
                          className="catalog-preview-card"
                        >
                          <span className="catalog-preview-image">
                            {product.image && (
                              <Image
                                src={product.image}
                                alt={product.title}
                                fill
                                quality={50}
                                sizes="240px"
                                style={{ objectFit: "cover" }}
                              />
                            )}
                          </span>
                          <span className="catalog-preview-title">
                            {product.title}
                          </span>
                        </LocalizedClientLink>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .catalog-layout {
          display: grid;
          grid-template-columns: 268px minmax(0, 1fr);
          gap: 20px;
          align-items: start;
        }
        .catalog-rail {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .catalog-rail-item {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          padding: 9px 12px;
          border: 1px solid transparent;
          border-radius: 999px;
          background: transparent;
          color: var(--ink-2);
          font-family: var(--sans);
          font-size: 14px;
          cursor: pointer;
          transition: background-color 0.15s, color 0.15s, border-color 0.15s;
        }
        .catalog-rail-item:hover {
          background: var(--bg);
          color: var(--ink);
        }
        .catalog-rail-item[data-active="true"] {
          background: var(--bg-card);
          border-color: var(--line);
          color: var(--ink);
        }
        .catalog-rail-count {
          color: var(--ink-4);
        }
        .catalog-rail-arrow {
          color: var(--ink-4);
        }
        .catalog-rail-item[data-active="true"] .catalog-rail-arrow {
          color: var(--accent);
        }
        .catalog-panel-body {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 232px;
          gap: 28px;
          align-items: start;
        }
        .catalog-columns {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 20px 24px;
        }
        .catalog-link {
          display: block;
          font-size: 13.5px;
          line-height: 1.5;
          color: var(--ink-2);
          text-decoration: none;
        }
        .catalog-link:hover {
          color: var(--accent);
        }
        .catalog-preview-items {
          display: grid;
          gap: 14px;
        }
        .catalog-preview-card {
          display: block;
          text-decoration: none;
        }
        .catalog-preview-image {
          position: relative;
          display: block;
          width: 100%;
          aspect-ratio: 4 / 3;
          background: var(--bg-deep);
          border-radius: 3px;
          overflow: hidden;
        }
        .catalog-preview-title {
          display: block;
          font-size: 13px;
          line-height: 1.35;
          margin-top: 8px;
          color: var(--ink-2);
        }
        .catalog-preview-card:hover .catalog-preview-title {
          color: var(--accent);
        }
        @media (max-width: 1024px) {
          .catalog-panel-body {
            grid-template-columns: minmax(0, 1fr);
          }
          .catalog-preview-items {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
        @media (max-width: 768px) {
          .catalog-layout {
            grid-template-columns: minmax(0, 1fr);
          }
          .catalog-rail {
            flex-direction: row;
            gap: 8px;
            overflow-x: auto;
            scrollbar-width: none;
            padding-bottom: 4px;
          }
          .catalog-rail-item {
            width: auto;
            flex-shrink: 0;
            border-color: var(--line);
          }
        }
      `}</style>
    </section>
  )
}
