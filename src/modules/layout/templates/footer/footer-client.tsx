"use client"

import { HttpTypes } from "@medusajs/types"
import { useState } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type FooterClientProps = {
  collections: HttpTypes.StoreCollection[]
  parentCategories: HttpTypes.StoreProductCategory[]
}

function Logo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
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
    </div>
  )
}

export default function FooterClient({
  collections,
  parentCategories,
}: FooterClientProps) {
  const [email, setEmail] = useState("")

  const shopLinks = [
    { label: "Кулірка", href: "/store" },
    { label: "Футер", href: "/store" },
    { label: "Інтерлок", href: "/store" },
    { label: "Рібана", href: "/store" },
    { label: "Зразки тканин", href: "/store" },
  ]

  const helpLinks = [
    { label: "Як обрати тканину", href: "/guide" },
    { label: "Доставка та оплата", href: "/shipping" },
    { label: "Повернення", href: "/returns" },
    { label: "FAQ для початківців", href: "/faq" },
  ]

  const aboutLinks = [
    { label: "Наша історія", href: "/about" },
    { label: "Як ми працюємо", href: "/how-we-work" },
    { label: "Гуртом", href: "/wholesale" },
    { label: "Контакти", href: "/contacts" },
  ]

  return (
    <footer
      style={{
        background: "var(--bg-ink)",
        color: "#d8c8a8",
        padding: "60px 0 30px",
        marginTop: 80,
      }}
    >
      <div style={{ maxWidth: 1360, margin: "0 auto", padding: "0 32px" }}>
        {/* Main grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr",
            gap: 40,
            marginBottom: 50,
          }}
        >
          {/* Brand column */}
          <div style={{ color: "var(--bg-card)" }}>
            <Logo />
            <p
              className="serif"
              style={{
                fontSize: 22,
                lineHeight: 1.35,
                marginTop: 18,
                color: "var(--bg-card)",
              }}
            >
              Трикотаж для тих, хто шиє маленькими партіями та з душею.
            </p>
            <div style={{ marginTop: 24, fontSize: 13, color: "#a89880" }}>
              📞 +38 (067) 555-12-34 · ✉ hello@tailorbox.ua
            </div>
          </div>

          {/* Магазин */}
          <div>
            <div
              className="uppercase-label"
              style={{ color: "#a89880", marginBottom: 16 }}
            >
              Магазин
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {(parentCategories.length > 0
                ? parentCategories
                    .slice(0, 5)
                    .map((c) => ({
                      label: c.name,
                      href: `/categories/${c.handle}`,
                    }))
                : shopLinks
              ).map((link) => (
                <LocalizedClientLink
                  key={link.label}
                  href={link.href}
                  style={{ fontSize: 13, color: "#d8c8a8" }}
                >
                  {link.label}
                </LocalizedClientLink>
              ))}
            </div>
          </div>

          {/* Допомога */}
          <div>
            <div
              className="uppercase-label"
              style={{ color: "#a89880", marginBottom: 16 }}
            >
              Допомога
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {helpLinks.map((link) => (
                <LocalizedClientLink
                  key={link.label}
                  href={link.href}
                  style={{ fontSize: 13, color: "#d8c8a8" }}
                >
                  {link.label}
                </LocalizedClientLink>
              ))}
            </div>
          </div>

          {/* Про нас */}
          <div>
            <div
              className="uppercase-label"
              style={{ color: "#a89880", marginBottom: 16 }}
            >
              Про нас
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {aboutLinks.map((link) => (
                <LocalizedClientLink
                  key={link.label}
                  href={link.href}
                  style={{ fontSize: 13, color: "#d8c8a8" }}
                >
                  {link.label}
                </LocalizedClientLink>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <div
              className="uppercase-label"
              style={{ color: "#a89880", marginBottom: 16 }}
            >
              Підписка
            </div>
            <div
              style={{
                fontSize: 13,
                color: "#d8c8a8",
                marginBottom: 12,
                lineHeight: 1.5,
              }}
            >
              Нові надходження — раз на тиждень. Без спаму.
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              <input
                className="tb-input"
                placeholder="email@..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  background: "rgba(255,255,255,0.06)",
                  borderColor: "rgba(255,255,255,0.15)",
                  color: "#fff",
                  borderRadius: 4,
                }}
              />
              <button
                className="btn btn-primary btn-sm"
                style={{
                  background: "var(--accent)",
                  borderRadius: 4,
                  flexShrink: 0,
                }}
              >
                →
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            paddingTop: 24,
            borderTop: "1px solid rgba(255,255,255,0.1)",
            display: "flex",
            justifyContent: "space-between",
            fontSize: 12,
            color: "#7a6b58",
            fontFamily: "var(--mono)",
          }}
        >
          <div>© {new Date().getFullYear()} TAILORBOX · ВСІ ПРАВА ЗАХИЩЕНІ</div>
          <div>МАЙСТЕРНЯ В КИЄВІ · ВІДПРАВЛЯЄМО ПО УКРАЇНІ ТА ЄС</div>
        </div>
      </div>
    </footer>
  )
}
