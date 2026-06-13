import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  return (
    <div id="product-info">
      <div className="flex flex-col gap-y-4 lg:max-w-[500px] mx-auto">
        {product.collection && (
          <LocalizedClientLink
            href={`/collections/${product.collection.handle}`}
            className="uppercase-label hover:text-tb-ink transition-colors"
          >
            {product.collection.title}
          </LocalizedClientLink>
        )}
        <h1
          className="serif text-4xl leading-tight text-tb-ink"
          data-testid="product-title"
        >
          {product.title}
        </h1>

        <p
          className="text-sm leading-relaxed text-tb-ink-2 whitespace-pre-line"
          data-testid="product-description"
        >
          {product.description}
        </p>
      </div>
    </div>
  )
}

export default ProductInfo
