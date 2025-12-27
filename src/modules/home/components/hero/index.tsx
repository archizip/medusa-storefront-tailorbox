"use client"

import { Button, Box, Typography, Container } from "@mui/material"
import { useTranslations } from "next-intl"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Hero = () => {
  const t = useTranslations("home.hero")

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        backgroundColor: "#000",
        color: "white",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "relative",
          minHeight: { xs: "70vh", md: "85vh" },
          display: "flex",
          alignItems: "center",
          background: "linear-gradient(to bottom, #000 0%, #1a1a1a 100%)",
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            position: "relative",
            zIndex: 1,
            py: { xs: 8, md: 12 },
          }}
        >
          <Box
            sx={{
              maxWidth: { xs: "100%", md: "50%" },
            }}
          >
            <Typography
              variant="h1"
              component="h1"
              sx={{
                fontSize: { xs: "2.5rem", sm: "3.5rem", md: "5rem", lg: "6rem" },
                fontWeight: 700,
                mb: 2,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
              }}
            >
              {t("title")}
            </Typography>
            <Typography
              variant="h5"
              component="h2"
              sx={{
                fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
                fontWeight: 400,
                mb: 4,
                opacity: 0.9,
                lineHeight: 1.5,
              }}
            >
              {t("subtitle")}
            </Typography>
            <Button
              component={LocalizedClientLink}
              href="/store"
              variant="contained"
              size="large"
              sx={{
                px: 4,
                py: 1.5,
                fontSize: "1rem",
                fontWeight: 500,
                backgroundColor: "white",
                color: "black",
                borderRadius: "30px",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#e5e5e5",
                  transform: "scale(1.02)",
                },
                transition: "all 0.2s ease",
              }}
            >
              {t("shopNow")}
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}

export default Hero
