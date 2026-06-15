"use client"

import { useState, useRef } from "react"
import { HttpTypes } from "@medusajs/types"
import { Locale } from "@lib/data/locales"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import MobileNavMenu from "@modules/layout/components/mobile-nav-menu"
import { useTranslations } from "@lib/util/i18n"
import { buildCategoryTree, CategoryTreeNode } from "@lib/util/category-tree"

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

// Renders a category and any nested descendants (any depth) as small links.
function MegaMenuLeaves({
  nodes,
  onClose,
}: {
  nodes: CategoryTreeNode[]
  onClose: () => void
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {nodes.map((node) => (
        <div key={node.category.id}>
          <LocalizedClientLink
            href={`/categories/${node.category.handle}`}
            onClick={onClose}
            style={{
              fontSize: 14,
              color: "var(--ink-2)",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            {node.category.name}
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
          {node.children.length > 0 && (
            <div style={{ marginLeft: 12, marginTop: 8 }}>
              <MegaMenuLeaves nodes={node.children} onClose={onClose} />
            </div>
          )}
        </div>
      ))}
    </div>
  )
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
  // Build the full nested tree so every category is visible at once: top-level
  // ones become section headers, their children become column headers, and any
  // deeper descendants are listed beneath.
  const roots = buildCategoryTree(categories)

  if (roots.length === 0) {
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
        flexDirection: "column",
        gap: 24,
        boxShadow: "0 12px 40px rgba(31,26,20,0.08)",
        borderRadius: 4,
        width: 680,
        maxWidth: "calc(100vw - 40px)",
        zIndex: 100,
      }}
    >
      {roots.map((root) => (
        <div key={root.category.id}>
          <LocalizedClientLink
            href={`/categories/${root.category.handle}`}
            onClick={onClose}
            className="serif"
            style={{
              display: "block",
              fontSize: 22,
              color: "var(--ink)",
              textDecoration: "none",
              marginBottom: root.children.length ? 16 : 0,
            }}
          >
            {root.category.name}
          </LocalizedClientLink>
          {root.children.length > 0 && (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "24px 48px",
              }}
            >
              {root.children.map((child) => (
                <div key={child.category.id} style={{ minWidth: 150 }}>
                  <LocalizedClientLink
                    href={`/categories/${child.category.handle}`}
                    onClick={onClose}
                    className="serif"
                    style={{
                      display: "block",
                      fontSize: 17,
                      color: "var(--ink)",
                      textDecoration: "none",
                      marginBottom: child.children.length ? 10 : 0,
                    }}
                  >
                    {child.category.name}
                  </LocalizedClientLink>
                  {child.children.length > 0 && (
                    <MegaMenuLeaves nodes={child.children} onClose={onClose} />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* Link to the full catalog */}
      <div
        style={{
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
        {/* Left cluster: mobile menu trigger + logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            flexShrink: 0,
          }}
        >
          <div className="small:hidden">
            <MobileNavMenu
              regions={regions}
              locales={locales}
              currentLocale={currentLocale}
              categories={categories}
              collections={collections}
            />
          </div>

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
        </div>

        {/* Desktop nav */}
        <nav
          className="hidden small:flex"
          style={{
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
