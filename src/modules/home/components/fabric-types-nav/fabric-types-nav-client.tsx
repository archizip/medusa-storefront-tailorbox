"use client"

import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type Props = {
  categories: HttpTypes.StoreProductCategory[]
}

export default function FabricTypesNavClient({ categories }: Props) {
  return (
    <div
      style={{
        background: "var(--bg-deep)",
        borderBottom: "1px solid var(--line-soft)",
        borderTop: "1px solid var(--line-soft)",
        padding: "12px 0",
      }}
    >
      <div
        style={{
          maxWidth: 1360,
          margin: "0 auto",
          padding: "0 32px",
          display: "flex",
          alignItems: "center",
          gap: 8,
          overflowX: "auto",
          scrollbarWidth: "none",
        }}
      >
        <div
          className="mono"
          style={{
            fontSize: "0.7rem",
            color: "var(--ink-3)",
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            whiteSpace: "nowrap",
            marginRight: 4,
            flexShrink: 0,
          }}
        >
          Тип:
        </div>

        {/* All fabrics */}
        <LocalizedClientLink
          href="/store"
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "5px 14px",
            borderRadius: 999,
            background: "var(--ink)",
            color: "var(--bg-card)",
            fontSize: "0.8rem",
            fontWeight: 600,
            fontFamily: "var(--mono)",
            letterSpacing: "0.02em",
            whiteSpace: "nowrap",
            flexShrink: 0,
            transition: "background-color 0.15s",
          }}
        >
          Всі
        </LocalizedClientLink>

        {categories.map((category) => (
          <LocalizedClientLink
            key={category.id}
            href={`/categories/${category.handle}`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "5px 14px",
              borderRadius: 999,
              border: "1px solid var(--line)",
              color: "var(--ink-2)",
              fontSize: "0.8rem",
              fontFamily: "var(--mono)",
              letterSpacing: "0.02em",
              whiteSpace: "nowrap",
              flexShrink: 0,
              transition: "all 0.15s",
            }}
          >
            {category.name}
          </LocalizedClientLink>
        ))}
      </div>
    </div>
  )
}
