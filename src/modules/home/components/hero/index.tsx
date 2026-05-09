"use client"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

const FABRIC_PATTERN = `repeating-linear-gradient(
  45deg,
  transparent,
  transparent 8px,
  rgba(184,90,59,0.07) 8px,
  rgba(184,90,59,0.07) 9px
), repeating-linear-gradient(
  -45deg,
  transparent,
  transparent 8px,
  rgba(74,63,51,0.05) 8px,
  rgba(74,63,51,0.05) 9px
)`

const Hero = () => {
  return (
    <section
      style={{
        maxWidth: 1360,
        margin: "0 auto",
        padding: "40px 32px 0",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 24,
          alignItems: "stretch",
        }}
        className="hero-grid"
      >
        {/* Left column */}
        <div
          style={{
            padding: "60px 0",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div className="uppercase-label" style={{ marginBottom: 22 }}>
            · ВЕСНА — ЛІТО · 2025 ·
          </div>

          <h1
            className="serif"
            style={{
              fontSize: "clamp(52px, 7vw, 88px)",
              lineHeight: 0.96,
              letterSpacing: "-0.03em",
              margin: 0,
              color: "var(--ink)",
            }}
          >
            Трикотаж
            <br />
            <em style={{ fontStyle: "italic", color: "var(--accent)" }}>метражем</em>
            <br />
            для маленьких
            <br />
            партій.
          </h1>

          <p
            style={{
              fontSize: 18,
              color: "var(--ink-2)",
              lineHeight: 1.55,
              maxWidth: 460,
              margin: "32px 0",
            }}
          >
            Кулірка, футер, інтерлок, рібана. Замовляйте від 0.5 м — стільки,
            скільки треба для одного дитячого боді або тестового зразка моделі.
          </p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <LocalizedClientLink href="/store">
              <button className="btn btn-primary btn-lg">Переглянути каталог</button>
            </LocalizedClientLink>
            <LocalizedClientLink href="/store">
              <button className="btn btn-outline btn-lg">Замовити зразки</button>
            </LocalizedClientLink>
          </div>

          {/* Stats row */}
          <div style={{ marginTop: 50, display: "flex", gap: 50 }}>
            {[
              ["120+", "тканин у каталозі"],
              ["від 0.5 м", "мінімальне замовлення"],
              ["3–5 днів", "доставка по Україні"],
            ].map(([num, label]) => (
              <div key={label}>
                <div className="serif" style={{ fontSize: 30, lineHeight: 1, color: "var(--ink)" }}>
                  {num}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: "var(--ink-3)",
                    marginTop: 4,
                    fontFamily: "var(--mono)",
                    letterSpacing: "0.06em",
                  }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column — fabric swatch */}
        <div style={{ position: "relative" }}>
          <div
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "4 / 5",
              background: `${FABRIC_PATTERN}, #e8d8c8`,
              overflow: "hidden",
              borderRadius: 2,
            }}
          >
            {/* Label top-left */}
            <div
              className="mono"
              style={{
                position: "absolute",
                top: 12,
                left: 12,
                background: "rgba(255,255,255,0.85)",
                padding: "3px 7px",
                fontSize: 10,
                letterSpacing: "0.08em",
                color: "var(--ink-2)",
              }}
            >
              МАКРОЗЙОМКА · 1:1
            </div>

            {/* Badge top-right */}
            <div
              className="mono"
              style={{
                position: "absolute",
                top: 12,
                right: 12,
                background: "var(--ink)",
                color: "var(--bg-card)",
                padding: "3px 9px",
                fontSize: 10,
                letterSpacing: "0.08em",
                borderRadius: 2,
              }}
            >
              ОСТАННЄ
            </div>

            {/* Overlay card */}
            <div
              style={{
                position: "absolute",
                bottom: 24,
                left: 24,
                right: 24,
                background: "rgba(250,245,234,0.95)",
                padding: "20px 22px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                border: "1px solid var(--line-soft)",
                backdropFilter: "blur(8px)",
              }}
            >
              <div>
                <div className="uppercase-label">Кулірка стрейч</div>
                <div className="serif" style={{ fontSize: 22, marginTop: 2 }}>«Пелюстка»</div>
                <div
                  style={{
                    fontSize: 12,
                    color: "var(--ink-3)",
                    marginTop: 4,
                    fontFamily: "var(--mono)",
                  }}
                >
                  200 г/м² · 180 см · в 3 кольорах
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div className="serif" style={{ fontSize: 28 }}>420 ₴</div>
                <div style={{ fontSize: 11, color: "var(--ink-3)", fontFamily: "var(--mono)" }}>
                  за метр
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
          }
          .hero-grid > div:last-child {
            display: none;
          }
        }
      `}</style>
    </section>
  )
}

export default Hero
