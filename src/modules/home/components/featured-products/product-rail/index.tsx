import { listProducts } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"
import ProductRailClient from "../product-rail-client"

export default async function ProductRail({
  collection,
  region,
}: {
  collection: HttpTypes.StoreCollection
  region: HttpTypes.StoreRegion
}) {
  const {
    response: { products: pricedProducts },
  } = await listProducts({
    regionId: region.id,
    queryParams: {
      collection_id: collection.id,
      fields: "*variants.calculated_price",
      limit: 4,
    },
  })

  if (!pricedProducts || pricedProducts.length === 0) {
    return null
  }

  return (
    <ProductRailClient
      collection={collection}
      region={region}
      products={pricedProducts}
    />
  )
}
