"use client"

import { useState, useRef } from "react"
import { Suspense } from "react"
import { HttpTypes } from "@medusajs/types"
import { Locale } from "@lib/data/locales"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"

type NavClientProps = {
  regions: HttpTypes.StoreRegion[] | null
  locales: Locale[] | null
  currentLocale: string | null
  categories: HttpTypes.StoreProductCategory[]
  collections: HttpTypes.StoreCollection[]
  translations: {
    findStore: string
    help: string
    signIn: string
  }
}

const MEGA_MENU_GROUPS = [
  {
    title: "Кулірка",
    hint: "тонкий гладкий трикотаж",
    handles: ["single-jersey", "stretch-jersey"],
    names: ["Кулірка", "Кулірка стрейч"],
  },
  {
    title: "Футер",
    hint: "теплий, для зими і міжсезоння",
    handles: ["two-thread-fleece", "brushed-two-thread", "french-terry", "brushed-fleece"],
    names: ["Двонитка", "Двонитка з начосом", "Трьохнитка петля", "Трьохнитка з начосом"],
  },
  {
    title: "Інші",
    hint: "інтерлок, рібана, піке",
    handles: ["interlock", "rib", "pique"],
    names: ["Інтерлок", "Рібана", "Піке"],
  },
]

function MegaMenu({ categories, onClose }: { categories: HttpTypes.StoreProductCategory[]; onClose: () => void }) {
  const categoryMap = new Map(categories.map((c) => [c.handle, c]))

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
        gap: 60,
        boxShadow: "0 12px 40px rgba(31,26,20,0.08)",
        borderRadius: 4,
        width: 720,
        zIndex: 100,
      }}
    >
      {MEGA_MENU_GROUPS.map((group) => (
        <div key={group.title}>
          <div className="serif" style={{ fontSize: 22, marginBottom: 4 }}>{group.title}</div>
          <div style={{ fontSize: 12, color: "var(--ink-3)", marginBottom: 12 }}>{group.hint}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {group.handles.map((handle, i) => {
              const cat = categoryMap.get(handle)
              return (
                <LocalizedClientLink
                  key={handle}
                  href={cat ? `/categories/${cat.handle}` : `/store`}
                  onClick={onClose}
                  style={{ fontSize: 14, color: "var(--ink-2)", display: "flex", alignItems: "center", gap: 6 }}
                >
                  {group.names[i]}
                  <span style={{ color: "var(--ink-4)", fontFamily: "var(--mono)", fontSize: 11 }}>→</span>
                </LocalizedClientLink>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

export default function NavClient({
  regions,
  locales,
  currentLocale,
  categories,
  collections,
  translations,
}: NavClientProps) {
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
        БЕЗКОШТОВНА ДОСТАВКА НОВОЮ ПОШТОЮ ВІД 1500 ₴ · ЗРАЗКИ ТКАНИНИ — БЕЗКОШТОВНО
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
          style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: "var(--ink)", flexShrink: 0 }}
          data-testid="nav-store-link"
        >
          <svg width={28} height={28} viewBox="0 0 32 32">
            <rect x="2" y="2" width="28" height="28" rx="2" fill="none" stroke="currentColor" strokeWidth="1.6" />
            <path d="M2 12 L30 12 M2 20 L30 20 M12 2 L12 30 M20 2 L20 30" stroke="currentColor" strokeWidth="1" opacity="0.4" />
            <circle cx="16" cy="16" r="3" fill="currentColor" />
          </svg>
          <span className="serif" style={{ fontSize: 22, letterSpacing: "-0.01em" }}>TailorBox</span>
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
              Тканини
              <svg width={10} height={10} viewBox="0 0 10 10">
                <path d="M2 4 L5 7 L8 4" stroke="currentColor" strokeWidth="1.4" fill="none" />
              </svg>
            </LocalizedClientLink>
            {megaOpen && (
              <MegaMenu
                categories={categories}
                onClose={() => setMegaOpen(false)}
              />
            )}
          </div>

          <LocalizedClientLink
            href="/store"
            style={{ padding: "10px 14px", color: "var(--ink)" }}
          >
            Колекції
          </LocalizedClientLink>
          <LocalizedClientLink
            href="/store"
            style={{ padding: "10px 14px", color: "var(--ink)" }}
          >
            Зразки
          </LocalizedClientLink>
          <span style={{ padding: "10px 14px", color: "var(--ink-3)", cursor: "default" }}>Гуртом</span>
          <span style={{ padding: "10px 14px", color: "var(--ink-3)", cursor: "default" }}>Журнал</span>
        </nav>

        {/* Right icons */}
        <div style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
          <button className="btn-ghost" title="Пошук" style={{ borderRadius: 999, padding: "8px 10px" }}>
            <svg width={18} height={18} viewBox="0 0 18 18" fill="none">
              <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M12 12 L16 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>

          <LocalizedClientLink href="/account">
            <button className="btn-ghost" title="Акаунт" style={{ borderRadius: 999, padding: "8px 10px" }} data-testid="nav-account-link">
              <svg width={18} height={18} viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="6" r="3" stroke="currentColor" strokeWidth="1.5" />
                <path d="M3 16 C 3 12, 6 11, 9 11 S 15 12, 15 16" stroke="currentColor" strokeWidth="1.5" fill="none" />
              </svg>
            </button>
          </LocalizedClientLink>

          <Suspense
            fallback={
              <LocalizedClientLink href="/cart">
                <button className="btn btn-soft btn-sm" style={{ borderRadius: 999 }} data-testid="nav-cart-link">
                  <svg width={16} height={16} viewBox="0 0 16 16" fill="none">
                    <path d="M2 4 H4 L5.5 12 H13 L14 6 H5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
                    <circle cx="6" cy="14" r="0.8" fill="currentColor" />
                    <circle cx="12" cy="14" r="0.8" fill="currentColor" />
                  </svg>
                  Кошик
                </button>
              </LocalizedClientLink>
            }
          >
            <CartButton />
          </Suspense>
        </div>
      </div>
    </header>
  )
}
