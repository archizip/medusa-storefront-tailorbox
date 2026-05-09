import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"

export default async function ProductPreview({
  product,
  isFeatured,
  region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  const { cheapestPrice } = getProductPrice({ product })

  const category = product.categories?.[0]?.name ?? ""

  return (
    <LocalizedClientLink href={`/products/${product.handle}`} style={{ textDecoration: "none", color: "var(--ink)", display: "block" }}>
      <div
        className="fabric-card"
        data-testid="product-wrapper"
        style={{ height: "100%" }}
      >
        {/* Product image */}
        <div style={{ position: "relative" }}>
          <Thumbnail
            thumbnail={product.thumbnail}
            images={product.images}
            size="full"
            isFeatured={isFeatured}
          />
          {isFeatured && (
            <div
              className="mono"
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                background: "var(--ink)",
                color: "var(--bg-card)",
                padding: "2px 8px",
                fontSize: 10,
                letterSpacing: "0.08em",
                borderRadius: 2,
              }}
            >
              NEW
            </div>
          )}
        </div>

        {/* Card body */}
        <div style={{ padding: "18px 18px 22px", flex: 1, display: "flex", flexDirection: "column" }}>
          {category && (
            <div className="uppercase-label" style={{ marginBottom: 6 }}>{category}</div>
          )}

          <div className="serif" style={{ fontSize: 19, lineHeight: 1.2, marginBottom: 14, color: "var(--ink)" }}>
            {product.title}
          </div>

          <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <div>
              <div style={{ fontSize: 11, color: "var(--ink-3)", fontFamily: "var(--mono)", letterSpacing: "0.04em", marginBottom: 2 }}>
                ціна за метр
              </div>
              {cheapestPrice && (
                <div className="serif" style={{ fontSize: 22, lineHeight: 1, color: "var(--ink)" }}>
                  <PreviewPrice price={cheapestPrice} />
                </div>
              )}
            </div>
          </div>

          {/* Stock indicator */}
          <div
            style={{
              marginTop: 12,
              paddingTop: 12,
              borderTop: "1px solid var(--line-soft)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              className="mono"
              style={{ fontSize: 11, color: "var(--in-stock)", letterSpacing: "0.04em" }}
            >
              ● у наявності
            </div>
            <button
              onClick={(e) => e.preventDefault()}
              className="btn-ghost"
              style={{
                padding: "4px 8px",
                fontSize: 12,
                fontFamily: "var(--mono)",
                letterSpacing: "0.05em",
                color: "var(--ink-2)",
                borderRadius: 2,
              }}
            >
              + 1 м
            </button>
          </div>
        </div>
      </div>
    </LocalizedClientLink>
  )
}
