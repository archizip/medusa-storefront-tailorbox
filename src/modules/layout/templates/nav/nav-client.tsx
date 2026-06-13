"use client"

import { useState, useRef } from "react"
import { HttpTypes } from "@medusajs/types"
import { Locale } from "@lib/data/locales"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useTranslations } from "@lib/util/i18n"

type NavClientProps = {
  regions: HttpTypes.StoreRegion[] | null
  locales: Locale[] | null
  currentLocale: string | null
  categories: HttpTypes.StoreProductCategory[]
  collections: HttpTypes.StoreCollection[]
  cartSlot: React.ReactNode
  translations: {
    findStore: string
    help: string
    signIn: string
    fabrics: string
    viewAll: string
  }
}

function MegaMenu({
  categories,
  allLabel,
  onClose,
}: {
  categories: HttpTypes.StoreProductCategory[]
  allLabel: string
  onClose: () => void
}) {
  // Build the menu from real backend categories: top-level ones become
  // column headers, their children (if any) are listed beneath.
  const topLevel = categories.filter(
    (c) => c?.handle && c?.name && !c?.parent_category
  )

  if (topLevel.length === 0) {
    return null
  }

  return (
    <div
      className="fade-in"
      style={{
        position: "absolute",
        top: "calc(100% + 1px)",
        left: -20,
        background: "var(--bg-card)",
        border: "1px solid var(--line)",
        padding: "28px 32px",
        display: "flex",
        flexWrap: "wrap",
        gap: "28px 60px",
        boxShadow: "0 12px 40px rgba(31,26,20,0.08)",
        borderRadius: 4,
        maxWidth: 720,
        zIndex: 100,
      }}
    >
      {topLevel.map((category) => {
        const children = (category.category_children ?? []).filter(
          (c) => c?.handle && c?.name
        )
        return (
          <div key={category.id} style={{ minWidth: 160 }}>
            <LocalizedClientLink
              href={`/categories/${category.handle}`}
              onClick={onClose}
              className="serif"
              style={{
                display: "block",
                fontSize: 22,
                marginBottom: children.length ? 12 : 0,
                color: "var(--ink)",
                textDecoration: "none",
              }}
            >
              {category.name}
            </LocalizedClientLink>
            {children.length > 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {children.map((child) => (
                  <LocalizedClientLink
                    key={child.id}
                    href={`/categories/${child.handle}`}
                    onClick={onClose}
                    style={{
                      fontSize: 14,
                      color: "var(--ink-2)",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    {child.name}
                    <span
                      style={{
                        color: "var(--ink-4)",
                        fontFamily: "var(--mono)",
                        fontSize: 11,
                      }}
                    >
                      →
                    </span>
                  </LocalizedClientLink>
                ))}
              </div>
            )}
          </div>
        )
      })}

      {/* Link to the full catalog */}
      <div
        style={{
          width: "100%",
          borderTop: "1px solid var(--line-soft)",
          paddingTop: 16,
        }}
      >
        <LocalizedClientLink
          href="/store"
          onClick={onClose}
          className="mono"
          style={{
            fontSize: 12,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "var(--ink-2)",
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          {allLabel} →
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default function NavClient({
  regions,
  locales,
  currentLocale,
  categories,
  collections,
  cartSlot,
  translations,
}: NavClientProps) {
  const tNav = useTranslations("nav")
  const tCommon = useTranslations("common")
  const [megaOpen, setMegaOpen] = useState(false)
  const megaTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  const openMega = () => {
    if (megaTimeout.current) clearTimeout(megaTimeout.current)
    setMegaOpen(true)
  }
  const closeMega = () => {
    megaTimeout.current = setTimeout(() => setMegaOpen(false), 120)
  }

  return (
    <header
      style={{
        background: "var(--bg)",
        borderBottom: "1px solid var(--line-soft)",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      {/* Announcement bar */}
      <div
        style={{
          background: "var(--bg-ink)",
          color: "var(--bg-card)",
          fontFamily: "var(--mono)",
          fontSize: 11,
          letterSpacing: "0.08em",
          padding: "8px 0",
          textAlign: "center",
        }}
      >
        {tNav("announcement")}
      </div>

      {/* Main nav row */}
      <div
        style={{
          maxWidth: 1360,
          margin: "0 auto",
          padding: "0 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 68,
          gap: 32,
        }}
      >
        {/* Logo */}
        <LocalizedClientLink
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            textDecoration: "none",
            color: "var(--ink)",
            flexShrink: 0,
          }}
          data-testid="nav-store-link"
        >
          <svg width={28} height={28} viewBox="0 0 32 32">
            <rect
              x="2"
              y="2"
              width="28"
              height="28"
              rx="2"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
            />
            <path
              d="M2 12 L30 12 M2 20 L30 20 M12 2 L12 30 M20 2 L20 30"
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.4"
            />
            <circle cx="16" cy="16" r="3" fill="currentColor" />
          </svg>
          <span
            className="serif"
            style={{ fontSize: 22, letterSpacing: "-0.01em" }}
          >
            TailorBox
          </span>
        </LocalizedClientLink>

        {/* Desktop nav */}
        <nav
          style={{
            display: "flex",
            gap: 4,
            fontSize: 14,
            alignItems: "center",
            flexGrow: 1,
            justifyContent: "center",
          }}
        >
          {/* Тканини with mega menu */}
          <div
            onMouseEnter={openMega}
            onMouseLeave={closeMega}
            style={{ position: "relative" }}
          >
            <LocalizedClientLink
              href="/store"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "10px 14px",
                color: "var(--ink)",
                fontWeight: 400,
              }}
            >
              {translations.fabrics}
              <svg width={10} height={10} viewBox="0 0 10 10">
                <path
                  d="M2 4 L5 7 L8 4"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  fill="none"
                />
              </svg>
            </LocalizedClientLink>
            {megaOpen && (
              <MegaMenu
                categories={categories}
                allLabel={translations.viewAll}
                onClose={() => setMegaOpen(false)}
              />
            )}
          </div>

          <LocalizedClientLink
            href="/collections"
            style={{ padding: "10px 14px", color: "var(--ink)" }}
          >
            {tNav("collections")}
          </LocalizedClientLink>
          <LocalizedClientLink
            href="/samples"
            style={{ padding: "10px 14px", color: "var(--ink)" }}
          >
            {tNav("samples")}
          </LocalizedClientLink>
          <LocalizedClientLink
            href="/wholesale"
            style={{ padding: "10px 14px", color: "var(--ink)" }}
          >
            {tNav("wholesale")}
          </LocalizedClientLink>
          <LocalizedClientLink
            href="/journal"
            style={{ padding: "10px 14px", color: "var(--ink)" }}
          >
            {tNav("journal")}
          </LocalizedClientLink>
        </nav>

        {/* Right icons */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            flexShrink: 0,
          }}
        >
          <button
            className="btn-ghost"
            title={tCommon("search")}
            style={{ borderRadius: 999, padding: "8px 10px" }}
          >
            <svg width={18} height={18} viewBox="0 0 18 18" fill="none">
              <circle
                cx="8"
                cy="8"
                r="5.5"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M12 12 L16 16"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>

          <LocalizedClientLink href="/account">
            <button
              className="btn-ghost"
              title={tCommon("account")}
              style={{ borderRadius: 999, padding: "8px 10px" }}
              data-testid="nav-account-link"
            >
              <svg width={18} height={18} viewBox="0 0 18 18" fill="none">
                <circle
                  cx="9"
                  cy="6"
                  r="3"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M3 16 C 3 12, 6 11, 9 11 S 15 12, 15 16"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                />
              </svg>
            </button>
          </LocalizedClientLink>

          {cartSlot}
        </div>
      </div>
    </header>
  )
}
