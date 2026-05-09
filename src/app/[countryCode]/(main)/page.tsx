import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import CategoriesGrid from "@modules/home/components/categories-grid"
import FabricTypesQuickNav from "@modules/home/components/fabric-types-nav"
import TrustBadges from "@modules/home/components/trust-badges"
import GuideBand from "@modules/home/components/guide-band"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export const metadata: Metadata = {
  title: "TailorBox — Тканини для брендів і ательє",
  description:
    "Кулірка, футер, інтерлок, рібана. Замовляйте від 0.5 м. Безкоштовна доставка від 1500 ₴.",
}

const COLLECTION_SWATCHES = [
  {
    title: "Дитячі тканини",
    hint: "Боді, повзунки, костюмчики 0–6 років.",
    count: 38,
    bg: "#e8d8c0",
    pattern: `repeating-linear-gradient(30deg, transparent, transparent 10px, rgba(90,74,56,0.08) 10px, rgba(90,74,56,0.08) 11px)`,
    big: true,
  },
  {
    title: "Спортивний одяг",
    hint: "Дихаючі, з добрим стретчем.",
    count: 14,
    bg: "#3a5a5a",
    pattern: `repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(255,255,255,0.06) 8px, rgba(255,255,255,0.06) 9px)`,
    big: false,
  },
  {
    title: "Базовий гардероб",
    hint: "Чорний, молочний, графіт, пісок.",
    count: 22,
    bg: "#d8d2c8",
    pattern: `repeating-linear-gradient(90deg, transparent, transparent 12px, rgba(120,100,60,0.1) 12px, rgba(120,100,60,0.1) 13px)`,
    big: false,
  },
]

function CollectionsSection() {
  return (
    <section
      style={{
        maxWidth: 1360,
        margin: "0 auto",
        padding: "80px 32px 40px",
      }}
    >
      <div className="uppercase-label" style={{ marginBottom: 10 }}>04 — Колекції</div>
      <h2
        className="serif"
        style={{
          fontSize: "clamp(32px, 4vw, 48px)",
          margin: "0 0 32px",
          lineHeight: 1,
          letterSpacing: "-0.02em",
          color: "var(--ink)",
        }}
      >
        За призначенням
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.5fr 1fr 1fr",
          gap: 20,
        }}
        className="collections-grid"
      >
        {COLLECTION_SWATCHES.map((c, i) => (
          <LocalizedClientLink
            key={i}
            href="/store"
            style={{
              display: "block",
              position: "relative",
              overflow: "hidden",
              borderRadius: 2,
              textDecoration: "none",
            }}
          >
            <div
              style={{
                width: "100%",
                aspectRatio: c.big ? "5 / 6" : "1",
                background: `${c.pattern}, ${c.bg}`,
                position: "relative",
              }}
            >
              {/* gradient overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(180deg, transparent 40%, rgba(31,26,20,0.7))",
                }}
              />
              {/* text overlay */}
              <div
                style={{
                  position: "absolute",
                  bottom: 24,
                  left: 24,
                  right: 24,
                  color: "var(--bg-card)",
                }}
              >
                <div
                  className="mono"
                  style={{ fontSize: 11, opacity: 0.8, letterSpacing: "0.08em", marginBottom: 8 }}
                >
                  {c.count} ТКАНИН
                </div>
                <div
                  className="serif"
                  style={{ fontSize: c.big ? 38 : 26, lineHeight: 1, marginBottom: 8 }}
                >
                  {c.title}
                </div>
                <div style={{ fontSize: 13, opacity: 0.85 }}>{c.hint}</div>
              </div>
            </div>
          </LocalizedClientLink>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .collections-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}

function CraftManifesto() {
  return (
    <section style={{ padding: "100px 0", textAlign: "center" }}>
      <div style={{ maxWidth: 880, margin: "0 auto", padding: "0 32px" }}>
        <div className="uppercase-label" style={{ marginBottom: 24 }}>· МАЙСТЕРНЯ В КИЄВІ ·</div>
        <h2
          className="serif"
          style={{
            fontSize: "clamp(36px, 5vw, 64px)",
            lineHeight: 1.05,
            letterSpacing: "-0.025em",
            margin: 0,
            color: "var(--ink)",
          }}
        >
          Тканина — це лише початок.{" "}
          <span style={{ color: "var(--accent)" }}>А далі — ваші руки.</span>
        </h2>
        <p
          style={{
            fontSize: 17,
            color: "var(--ink-2)",
            lineHeight: 1.6,
            margin: "30px auto 0",
            maxWidth: 620,
          }}
        >
          Ми ріжемо рулони, відправляємо зразки і відповідаємо на &laquo;а яка з цих краща для зимового боді?&raquo; — щодня.
          Бо тканина має бути зрозумілою.
        </p>
      </div>
    </section>
  )
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params
  const { countryCode } = params

  const region = await getRegion(countryCode)

  const { collections } = await listCollections({
    fields: "id, handle, title",
  })

  if (!collections || !region) {
    return null
  }

  return (
    <>
      <Hero />
      <FabricTypesQuickNav />
      <CategoriesGrid />
      <TrustBadges />
      <FeaturedProducts collections={collections} region={region} />
      <GuideBand />
      <CollectionsSection />
      <CraftManifesto />
    </>
  )
}
