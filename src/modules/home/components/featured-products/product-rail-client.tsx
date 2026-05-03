"use client"

import { HttpTypes } from "@medusajs/types"
import { Container, Typography, Box, Button } from "@mui/material"
import { East } from "@mui/icons-material"
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
        {/* Section header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            mb: 6,
            pb: 3,
            borderBottom: "1px solid #E8DDD0",
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: "0.68rem",
                fontWeight: 700,
                letterSpacing: "0.18em",
                color: "#8B6847",
                textTransform: "uppercase",
                mb: 1,
              }}
            >
              {t("subtitle")}
            </Typography>
            <Typography
              variant="h3"
              component="h2"
              sx={{
                fontWeight: 800,
                fontSize: { xs: "1.6rem", md: "2.25rem" },
                letterSpacing: "-0.025em",
                color: "#1A1208",
                lineHeight: 1.15,
              }}
            >
              {collection.title}
            </Typography>
          </Box>
          <Button
            component={LocalizedClientLink}
            href={`/collections/${collection.handle}`}
            endIcon={<East sx={{ fontSize: "1rem !important" }} />}
            sx={{
              display: { xs: "none", sm: "inline-flex" },
              color: "#6B4E30",
              textTransform: "none",
              fontSize: "0.875rem",
              fontWeight: 500,
              "&:hover": { backgroundColor: "transparent", color: "#1A1208" },
            }}
          >
            {t("viewAll")}
          </Button>
        </Box>

        {/* Products grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(2, 1fr)",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
            },
            gap: { xs: 2, md: 3 },
          }}
        >
          {products.map((product) => (
            <Box
              key={product.id}
              sx={{
                "& .group": {
                  display: "block",
                  textDecoration: "none",
                },
                "& [data-testid='product-wrapper']": {
                  borderRadius: "4px",
                  overflow: "hidden",
                  transition: "transform 0.2s ease",
                  "&:hover": { transform: "translateY(-2px)" },
                },
              }}
            >
              <ProductPreview product={product} region={region} isFeatured />
            </Box>
          ))}
        </Box>

        {/* Mobile view all */}
        <Box sx={{ textAlign: "center", mt: 5, display: { xs: "block", sm: "none" } }}>
          <Button
            component={LocalizedClientLink}
            href={`/collections/${collection.handle}`}
            variant="outlined"
            sx={{
              px: 5,
              py: 1.5,
              fontSize: "0.875rem",
              fontWeight: 500,
              borderRadius: "3px",
              textTransform: "none",
              borderColor: "#8B6847",
              color: "#6B4E30",
              "&:hover": {
                borderColor: "#1A1208",
                backgroundColor: "#1A1208",
                color: "white",
              },
            }}
          >
            {t("viewAll")}
          </Button>
        </Box>
      </Container>
    </Box>
  )
}
