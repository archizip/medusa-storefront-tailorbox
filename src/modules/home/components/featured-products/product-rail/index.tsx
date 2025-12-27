import { listProducts } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"
import {
  Container,
  Typography,
  Grid,
  Box,
  Link as MuiLink,
} from "@mui/material"
import { getTranslations } from "next-intl/server"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ProductPreview from "@modules/products/components/product-preview"
import { ArrowForward } from "@mui/icons-material"

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
      limit: 6,
    },
  })

  const t = await getTranslations("home.featured")

  if (!pricedProducts || pricedProducts.length === 0) {
    return null
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography
          variant="h3"
          component="h2"
          sx={{
            fontWeight: 600,
            fontSize: { xs: "1.75rem", md: "2.25rem" },
          }}
        >
          {collection.title}
        </Typography>
        <MuiLink
          component={LocalizedClientLink}
          href={`/collections/${collection.handle}`}
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 0.5,
            textDecoration: "none",
            color: "primary.main",
            fontWeight: 500,
            "&:hover": {
              textDecoration: "underline",
            },
          }}
        >
          {t("viewAll")}
          <ArrowForward sx={{ fontSize: 20 }} />
        </MuiLink>
      </Box>
      <Grid container spacing={3}>
        {pricedProducts.map((product) => (
          <Grid item xs={6} sm={4} md={3} key={product.id}>
            <ProductPreview product={product} region={region} isFeatured />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}
