import { HttpTypes } from "@medusajs/types"
import ProductRail from "@modules/home/components/featured-products/product-rail"
import { Box } from "@mui/material"

export default async function FeaturedProducts({
  collections,
  region,
}: {
  collections: HttpTypes.StoreCollection[]
  region: HttpTypes.StoreRegion
}) {
  return (
    <>
      {collections.map((collection) => (
        <Box key={collection.id} component="section">
          <ProductRail collection={collection} region={region} />
        </Box>
      ))}
    </>
  )
}
