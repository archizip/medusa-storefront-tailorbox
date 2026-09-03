/**
 * Скелетон блока каталога: держит высоту секции, пока категории едут с
 * бэкенда, чтобы герой и остальная главная стримились раньше.
 */
export default function CatalogBrowserSkeleton() {
  return (
    <section
      aria-hidden="true"
      style={{
        background: "var(--bg-deep)",
        borderBottom: "1px solid var(--line)",
      }}
    >
      <div
        style={{
          maxWidth: 1360,
          margin: "0 auto",
          padding: "32px 32px 40px",
          display: "grid",
          gridTemplateColumns: "268px minmax(0, 1fr)",
          gap: 20,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="animate-pulse"
              style={{
                height: 44,
                borderRadius: 999,
                background: "var(--line-soft)",
              }}
            />
          ))}
        </div>
        <div
          className="animate-pulse"
          style={{
            height: 300,
            borderRadius: 4,
            background: "var(--bg-card)",
            border: "1px solid var(--line-soft)",
          }}
        />
      </div>
    </section>
  )
}
