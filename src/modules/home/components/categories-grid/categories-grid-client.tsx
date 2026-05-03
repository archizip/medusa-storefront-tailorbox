"use client"

import { HttpTypes } from "@medusajs/types"
import { Container, Typography, Box, Button } from "@mui/material"
import { useTranslations } from "next-intl"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { East } from "@mui/icons-material"

type CategoriesGridClientProps = {
  categories: HttpTypes.StoreProductCategory[]
}

const FABRIC_ACCENTS = [
  "#8B6847",
  "#5C7A5A",
  "#7A5C8B",
  "#5A6B8B",
  "#8B5A5A",
  "#6B7A5A",
  "#8B7A47",
  "#5A7A7A",
]

export default function CategoriesGridClient({ categories }: CategoriesGridClientProps) {
  const t = useTranslations("home.categories")

  return (
    <Box sx={{ py: { xs: 8, md: 12 }, backgroundColor: "#FAF8F5" }}>
      <Container maxWidth="xl">
        {/* Section header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            mb: 6,
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
                fontSize: { xs: "1.75rem", md: "2.5rem" },
                letterSpacing: "-0.025em",
                color: "#1A1208",
                lineHeight: 1.15,
              }}
            >
              {t("title")}
            </Typography>
          </Box>
          <Button
            component={LocalizedClientLink}
            href="/store"
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

        {/* Categories grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(2, 1fr)",
              sm: "repeat(2, 1fr)",
              md: categories.length >= 3 ? "repeat(3, 1fr)" : `repeat(${categories.length}, 1fr)`,
              lg: categories.length >= 4 ? "repeat(4, 1fr)" : `repeat(${categories.length}, 1fr)`,
            },
            gap: { xs: 1.5, md: 2 },
          }}
        >
          {categories.map((category, index) => {
            const accent = FABRIC_ACCENTS[index % FABRIC_ACCENTS.length]
            return (
              <Box
                key={category.id}
                component={LocalizedClientLink}
                href={`/categories/${category.handle}`}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  position: "relative",
                  height: { xs: 220, sm: 280, md: 340 },
                  backgroundColor: "#EDE8DF",
                  borderRadius: "4px",
                  overflow: "hidden",
                  textDecoration: "none",
                  border: "1px solid #E0D8CC",
                  transition: "transform 0.25s ease, box-shadow 0.25s ease",
                  "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: "0 12px 32px rgba(26,18,8,0.12)",
                    "& .cat-bar": { width: "100%" },
                    "& .cat-arrow": { opacity: 1, transform: "translateX(0)" },
                  },
                }}
              >
                {/* Accent color bar at top */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "4px",
                    backgroundColor: accent,
                  }}
                />

                {/* Large fabric-swatch background colour block */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 4,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `linear-gradient(160deg, ${accent}18 0%, ${accent}08 100%)`,
                  }}
                />

                {/* Subtle weave pattern */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 4,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background:
                      "repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(0,0,0,0.015) 20px, rgba(0,0,0,0.015) 21px)",
                  }}
                />

                {/* Animated bottom bar */}
                <Box
                  className="cat-bar"
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    height: "3px",
                    width: "0%",
                    backgroundColor: accent,
                    transition: "width 0.35s ease",
                  }}
                />

                {/* Content */}
                <Box sx={{ position: "relative", p: { xs: 2.5, md: 3.5 }, zIndex: 1 }}>
                  <Typography
                    variant="h4"
                    component="h3"
                    sx={{
                      fontWeight: 700,
                      color: "#1A1208",
                      fontSize: { xs: "1.1rem", md: "1.4rem" },
                      mb: category.description ? 0.75 : 0,
                      letterSpacing: "-0.01em",
                      lineHeight: 1.25,
                    }}
                  >
                    {category.name}
                  </Typography>
                  {category.description && (
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#6B5A48",
                        fontSize: "0.8rem",
                        lineHeight: 1.5,
                        mb: 1.5,
                      }}
                    >
                      {category.description}
                    </Typography>
                  )}
                  <Box
                    className="cat-arrow"
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 0.5,
                      color: accent,
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      opacity: 0,
                      transform: "translateX(-8px)",
                      transition: "all 0.25s ease",
                    }}
                  >
                    Смотреть <East sx={{ fontSize: "0.85rem" }} />
                  </Box>
                </Box>
              </Box>
            )
          })}
        </Box>

        {/* Mobile view all link */}
        <Box sx={{ textAlign: "center", mt: 5, display: { xs: "block", sm: "none" } }}>
          <Button
            component={LocalizedClientLink}
            href="/store"
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
