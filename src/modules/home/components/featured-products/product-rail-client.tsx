"use client"

import { HttpTypes } from "@medusajs/types"
import {
  Container,
  Typography,
  Grid,
  Box,
  Button,
} from "@mui/material"
import { useTranslations } from "next-intl"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ProductPreview from "@modules/products/components/product-preview"

type ProductRailClientProps = {
  collection: HttpTypes.StoreCollection
  region: HttpTypes.StoreRegion
  products: HttpTypes.StoreProduct[]
}

export default function ProductRailClient({ collection, region, products }: ProductRailClientProps) {
  const t = useTranslations("home.featured")

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
          {products.map((product) => (
            <Grid item xs={6} sm={4} md={3} key={product.id}>
              <ProductPreview product={product} region={region} isFeatured />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}
