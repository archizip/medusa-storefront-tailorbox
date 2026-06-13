"use client"

import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ProductPreview from "@modules/products/components/product-preview"
import { useTranslations } from "@lib/util/i18n"

type ProductRailClientProps = {
  collection: HttpTypes.StoreCollection
  region: HttpTypes.StoreRegion
  products: HttpTypes.StoreProduct[]
}

export default function ProductRailClient({
  collection,
  region,
  products,
}: ProductRailClientProps) {
  const t = useTranslations("home.rail")

  return (
    <section
      style={{
        maxWidth: 1360,
        margin: "0 auto",
        padding: "60px 32px 40px",
      }}
    >
      {/* Section header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginBottom: 32,
        }}
      >
        <div>
          <div className="uppercase-label" style={{ marginBottom: 10 }}>
            {t("label")}
          </div>
          <h2
            className="serif"
            style={{
              fontSize: "clamp(32px, 4vw, 48px)",
              margin: 0,
              lineHeight: 1,
              letterSpacing: "-0.02em",
              color: "var(--ink)",
            }}
          >
            {t("title")}
          </h2>
        </div>
        <LocalizedClientLink
          href={`/collections/${collection.handle}`}
          style={{
            fontSize: 13,
            color: "var(--ink-2)",
            borderBottom: "1px solid var(--ink-2)",
            paddingBottom: 2,
            whiteSpace: "nowrap",
          }}
        >
          {t("viewAll")}
        </LocalizedClientLink>
      </div>

      {/* Products grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 20,
        }}
        className="products-grid"
      >
        {products.map((product) => (
          <ProductPreview
            key={product.id}
            product={product}
            region={region}
            isFeatured
          />
        ))}
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .products-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .products-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  )
}
