"use client"

const BADGES = [
  {
    mark: "01",
    title: "Безкоштовний зразок",
    txt: "Шматочок 10×10 см будь-якої тканини — щоб помацати перед замовленням.",
  },
  {
    mark: "02",
    title: "Від 0.5 м",
    txt: "Без мінімального замовлення. Купуйте стільки, скільки треба для одного боді.",
  },
  {
    mark: "03",
    title: "Знаємо тканини",
    txt: "Розкажемо різницю між кулірою стрейч і інтерлоком — без спеціальної освіти.",
  },
  {
    mark: "04",
    title: "На наступний день",
    txt: "Відправляємо у день замовлення, якщо встигнете до 14:00.",
  },
]

export default function TrustBadges() {
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
            <div className="serif" style={{ fontSize: 22, lineHeight: 1.15, marginBottom: 10 }}>
              {b.title}
            </div>
            <div style={{ fontSize: 13, color: "var(--ink-3)", lineHeight: 1.55 }}>{b.txt}</div>
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
