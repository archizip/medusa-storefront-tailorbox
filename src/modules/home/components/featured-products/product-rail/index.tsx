import { listProducts } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"
import {
  Container,
  Typography,
  Grid,
  Box,
  Button,
} from "@mui/material"
import { getTranslations } from "next-intl/server"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ProductPreview from "@modules/products/components/product-preview"

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

  const t = await getTranslations("home.featured")

  if (!pricedProducts || pricedProducts.length === 0) {
    return null
  }

  return (
    <Box sx={{ py: { xs: 8, md: 12 }, backgroundColor: "white" }}>
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 6,
          }}
        >
          <Typography
            variant="h3"
            component="h2"
            sx={{
              fontWeight: 700,
              fontSize: { xs: "1.75rem", md: "2.5rem" },
              letterSpacing: "-0.02em",
            }}
          >
            {collection.title}
          </Typography>
          <Button
            component={LocalizedClientLink}
            href={`/collections/${collection.handle}`}
            variant="outlined"
            sx={{
              px: 3,
              py: 1,
              fontSize: "0.875rem",
              fontWeight: 500,
              borderRadius: "30px",
              textTransform: "none",
              borderColor: "black",
              color: "black",
              "&:hover": {
                borderColor: "black",
                backgroundColor: "black",
                color: "white",
              },
            }}
          >
            {t("viewAll")}
          </Button>
        </Box>
        <Grid container spacing={2}>
          {pricedProducts.map((product) => (
            <Grid item xs={6} sm={4} md={3} key={product.id}>
              <ProductPreview product={product} region={region} isFeatured />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}
