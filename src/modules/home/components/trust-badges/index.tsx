"use client"

import { useTranslations } from "@lib/util/i18n"

export default function TrustBadges() {
  const t = useTranslations("home.trust")

  const BADGES = [
    { mark: "01", title: t("b1Title"), txt: t("b1Text") },
    { mark: "02", title: t("b2Title"), txt: t("b2Text") },
    { mark: "03", title: t("b3Title"), txt: t("b3Text") },
    { mark: "04", title: t("b4Title"), txt: t("b4Text") },
  ]

  return (
    <section
      style={{
        maxWidth: 1360,
        margin: "0 auto",
        padding: "60px 32px",
      }}
    >
      <div
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--line-soft)",
          padding: "50px 60px",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 50,
        }}
        className="trust-grid"
      >
        {BADGES.map((b) => (
          <div key={b.mark}>
            <div
              className="mono"
              style={{
                fontSize: 11,
                color: "var(--accent)",
                letterSpacing: "0.1em",
                marginBottom: 14,
              }}
            >
              {b.mark}
            </div>
            <div
              className="serif"
              style={{ fontSize: 22, lineHeight: 1.15, marginBottom: 10 }}
            >
              {b.title}
            </div>
            <div
              style={{ fontSize: 13, color: "var(--ink-3)", lineHeight: 1.55 }}
            >
              {b.txt}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .trust-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            padding: 30px 24px !important;
            gap: 30px !important;
          }
        }
        @media (max-width: 480px) {
          .trust-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
