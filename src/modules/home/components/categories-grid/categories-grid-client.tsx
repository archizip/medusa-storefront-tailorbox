"use client"

import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type CategoriesGridClientProps = {
  categories: HttpTypes.StoreProductCategory[]
}

const SWATCH_PATTERNS = [
  { bg: "#e8c8b8", pattern: `repeating-linear-gradient(45deg, transparent, transparent 6px, rgba(184,90,59,0.12) 6px, rgba(184,90,59,0.12) 7px)` },
  { bg: "#c8d4b8", pattern: `repeating-linear-gradient(0deg, transparent, transparent 8px, rgba(107,122,82,0.15) 8px, rgba(107,122,82,0.15) 9px)` },
  { bg: "#c8d0d8", pattern: `repeating-linear-gradient(-45deg, transparent, transparent 6px, rgba(74,90,120,0.12) 6px, rgba(74,90,120,0.12) 7px)` },
  { bg: "#d8c8a8", pattern: `repeating-linear-gradient(90deg, transparent, transparent 10px, rgba(120,100,60,0.12) 10px, rgba(120,100,60,0.12) 11px)` },
  { bg: "#d4b8b8", pattern: `repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(160,60,60,0.1) 8px, rgba(160,60,60,0.1) 9px)` },
  { bg: "#b8d0c8", pattern: `repeating-linear-gradient(135deg, transparent, transparent 6px, rgba(60,130,110,0.12) 6px, rgba(60,130,110,0.12) 7px)` },
]

export default function CategoriesGridClient({ categories }: CategoriesGridClientProps) {
  const displayCategories = categories.slice(0, 6)

  return (
    <section
      style={{
        maxWidth: 1360,
        margin: "0 auto",
        padding: "80px 32px 40px",
      }}
    >
      {/* Section header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginBottom: 32,
        }}
      >
        <div>
          <div className="uppercase-label" style={{ marginBottom: 10 }}>01 — Категорії</div>
          <h2
            className="serif"
            style={{
              fontSize: "clamp(32px, 4vw, 48px)",
              margin: 0,
              lineHeight: 1,
              letterSpacing: "-0.02em",
              color: "var(--ink)",
            }}
          >
            За типом трикотажу
          </h2>
        </div>
        <LocalizedClientLink
          href="/store"
          style={{
            fontSize: 13,
            color: "var(--ink-2)",
            borderBottom: "1px solid var(--ink-2)",
            paddingBottom: 2,
            whiteSpace: "nowrap",
          }}
        >
          Дивитися всі →
        </LocalizedClientLink>
      </div>

      {/* Categories grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 20,
        }}
        className="categories-grid"
      >
        {displayCategories.map((category, index) => {
          const swatch = SWATCH_PATTERNS[index % SWATCH_PATTERNS.length]
          const childCount = category.category_children?.length ?? 0

          return (
            <LocalizedClientLink
              key={category.id}
              href={`/categories/${category.handle}`}
              style={{ display: "flex", flexDirection: "column", textDecoration: "none", color: "var(--ink)" }}
            >
              {/* Swatch */}
              <div
                style={{
                  width: "100%",
                  aspectRatio: "1",
                  background: `${swatch.pattern}, ${swatch.bg}`,
                  borderRadius: 2,
                  transition: "opacity 200ms",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              />

              {/* Text below */}
              <div style={{ padding: "16px 4px 0" }}>
                {category.parent_category && (
                  <div className="uppercase-label" style={{ marginBottom: 4 }}>
                    {category.parent_category.name}
                  </div>
                )}
                <div className="serif" style={{ fontSize: 22, marginBottom: 6 }}>{category.name}</div>
                {category.description && (
                  <div style={{ fontSize: 13, color: "var(--ink-3)", lineHeight: 1.4, marginBottom: 8 }}>
                    {category.description}
                  </div>
                )}
                <div
                  className="mono"
                  style={{ fontSize: 11, color: "var(--ink-4)", letterSpacing: "0.06em" }}
                >
                  {childCount > 0 ? `${childCount} підкатегорій →` : "Переглянути →"}
                </div>
              </div>
            </LocalizedClientLink>
          )
        })}
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .categories-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .categories-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  )
}
