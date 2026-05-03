"use client"

import { HttpTypes } from "@medusajs/types"
import { Box, Container, Typography } from "@mui/material"
import { useTranslations } from "next-intl"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type Props = {
  categories: HttpTypes.StoreProductCategory[]
}

export default function FabricTypesNavClient({ categories }: Props) {
  const t = useTranslations("home.fabricTypes")

  return (
    <Box
      sx={{
        backgroundColor: "#FAF8F5",
        borderBottom: "1px solid #E8DDD0",
        borderTop: "1px solid #E8DDD0",
        py: 1.75,
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            overflowX: "auto",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          <Typography
            sx={{
              fontSize: "0.7rem",
              fontWeight: 700,
              color: "#8B6847",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              whiteSpace: "nowrap",
              mr: 0.5,
              flexShrink: 0,
            }}
          >
            {t("label")}
          </Typography>

          {/* All fabrics pill */}
          <Box
            component={LocalizedClientLink}
            href="/store"
            sx={{
              display: "inline-flex",
              alignItems: "center",
              px: 2,
              py: 0.6,
              borderRadius: "3px",
              backgroundColor: "#1A1208",
              color: "#F5F0E8",
              fontSize: "0.8rem",
              fontWeight: 600,
              whiteSpace: "nowrap",
              textDecoration: "none",
              flexShrink: 0,
              transition: "background-color 0.15s",
              "&:hover": { backgroundColor: "#2D2010" },
            }}
          >
            {t("all")}
          </Box>

          {categories.map((category) => (
            <Box
              key={category.id}
              component={LocalizedClientLink}
              href={`/categories/${category.handle}`}
              sx={{
                display: "inline-flex",
                alignItems: "center",
                px: 2,
                py: 0.6,
                borderRadius: "3px",
                border: "1px solid #C8B49A",
                color: "#4A3828",
                fontSize: "0.8rem",
                fontWeight: 400,
                whiteSpace: "nowrap",
                textDecoration: "none",
                flexShrink: 0,
                transition: "all 0.15s",
                "&:hover": {
                  backgroundColor: "#F0E8DC",
                  borderColor: "#8B6847",
                  color: "#3A2818",
                },
              }}
            >
              {category.name}
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  )
}
