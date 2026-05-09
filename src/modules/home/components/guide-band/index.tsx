"use client"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

const QA = [
  { q: "Кулірка чи інтерлок?", a: "Інтерлок гладкий з обох сторін, тримає форму. Кулірка тонка, легка." },
  { q: "Скільки метрів на боді 86?", a: "Орієнтовно 0.6–0.8 м кулірки шириною 180 см." },
  { q: "Чим начіс відрізняється?", a: "Виворіт пухкий — додає тепла. Йде на зимовий одяг." },
  { q: "Що таке щільність?", a: "г/м² — чим більше, тим тканина щільніша. До 180 — легка, понад 250 — щільна." },
]

export default function GuideBand() {
  return (
    <section style={{ background: "var(--bg-deep)", padding: "70px 0", marginTop: 40 }}>
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
          <div className="uppercase-label" style={{ marginBottom: 16 }}>03 — Гайд для початківців</div>
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
            Не знаєте,
            <br />
            яку обрати?
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
            Розкажемо мовою, яку зрозуміє і досвідчена швачка, і та, що тільки купила оверлок.
            Що таке кулірка, чим відрізняється трьохнитка від двонитки, скільки метрів треба на боді 86 розміру.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <LocalizedClientLink href="/store">
              <button className="btn btn-primary">Відкрити гайд</button>
            </LocalizedClientLink>
            <LocalizedClientLink href="/store">
              <button className="btn btn-outline">Замовити зразки</button>
            </LocalizedClientLink>
          </div>
        </div>

        {/* Right — Q&A grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14 }}>
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
              <div className="serif" style={{ fontSize: 18, marginBottom: 8, color: "var(--ink)" }}>
                {item.q}
              </div>
              <div style={{ fontSize: 13, color: "var(--ink-3)", lineHeight: 1.5 }}>{item.a}</div>
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
