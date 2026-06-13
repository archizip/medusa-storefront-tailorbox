"use client"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useTranslations } from "@lib/util/i18n"

export default function GuideBand() {
  const t = useTranslations("home.guide")

  const QA = [
    { q: t("qa1q"), a: t("qa1a") },
    { q: t("qa2q"), a: t("qa2a") },
    { q: t("qa3q"), a: t("qa3a") },
    { q: t("qa4q"), a: t("qa4a") },
  ]

  return (
    <section
      style={{ background: "var(--bg-deep)", padding: "70px 0", marginTop: 40 }}
    >
      <div
        style={{
          maxWidth: 1360,
          margin: "0 auto",
          padding: "0 32px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 60,
          alignItems: "center",
        }}
        className="guide-grid"
      >
        {/* Left */}
        <div>
          <div className="uppercase-label" style={{ marginBottom: 16 }}>
            {t("label")}
          </div>
          <h2
            className="serif"
            style={{
              fontSize: "clamp(36px, 4vw, 56px)",
              margin: 0,
              lineHeight: 1,
              letterSpacing: "-0.02em",
              color: "var(--ink)",
            }}
          >
            {t("titleLine1")}
            <br />
            {t("titleLine2")}
          </h2>
          <p
            style={{
              fontSize: 17,
              lineHeight: 1.55,
              color: "var(--ink-2)",
              margin: "26px 0 30px",
              maxWidth: 460,
            }}
          >
            {t("text")}
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <LocalizedClientLink href="/guide">
              <button className="btn btn-primary">{t("openGuide")}</button>
            </LocalizedClientLink>
            <LocalizedClientLink href="/samples">
              <button className="btn btn-outline">{t("orderSamples")}</button>
            </LocalizedClientLink>
          </div>
        </div>

        {/* Right — Q&A grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 14,
          }}
        >
          {QA.map((item, i) => (
            <div
              key={i}
              style={{
                background: "var(--bg-card)",
                padding: "18px 20px",
                border: "1px solid var(--line-soft)",
                borderRadius: 2,
              }}
            >
              <div
                className="serif"
                style={{ fontSize: 18, marginBottom: 8, color: "var(--ink)" }}
              >
                {item.q}
              </div>
              <div
                style={{ fontSize: 13, color: "var(--ink-3)", lineHeight: 1.5 }}
              >
                {item.a}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .guide-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  )
}
