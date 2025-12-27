"use client"

import { Button, Container, Typography, Box } from "@mui/material"
import { useTranslations } from "next-intl"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { ShoppingBag, Explore } from "@mui/icons-material"

const Hero = () => {
  const t = useTranslations("home.hero")

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: { xs: "60vh", md: "75vh" },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "white",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)",
        }}
      />
      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          py: { xs: 8, md: 12 },
        }}
      >
        <Typography
          variant="h1"
          component="h1"
          sx={{
            fontSize: { xs: "2rem", sm: "3rem", md: "4rem" },
            fontWeight: 700,
            mb: 2,
            textShadow: "0 2px 10px rgba(0,0,0,0.2)",
          }}
        >
          {t("title")}
        </Typography>
        <Typography
          variant="h5"
          component="h2"
          sx={{
            fontSize: { xs: "1.1rem", sm: "1.3rem", md: "1.5rem" },
            fontWeight: 400,
            mb: 4,
            opacity: 0.95,
            maxWidth: "600px",
            mx: "auto",
          }}
        >
          {t("subtitle")}
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Button
            component={LocalizedClientLink}
            href="/store"
            variant="contained"
            size="large"
            startIcon={<ShoppingBag />}
            sx={{
              px: 4,
              py: 1.5,
              fontSize: "1.1rem",
              backgroundColor: "white",
              color: "primary.main",
              "&:hover": {
                backgroundColor: "grey.100",
                transform: "translateY(-2px)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              },
              transition: "all 0.3s ease",
            }}
          >
            {t("shopNow")}
          </Button>
          <Button
            component={LocalizedClientLink}
            href="/collections"
            variant="outlined"
            size="large"
            startIcon={<Explore />}
            sx={{
              px: 4,
              py: 1.5,
              fontSize: "1.1rem",
              borderColor: "white",
              color: "white",
              "&:hover": {
                borderColor: "white",
                backgroundColor: "rgba(255,255,255,0.1)",
                transform: "translateY(-2px)",
              },
              transition: "all 0.3s ease",
            }}
          >
            {t("explore")}
          </Button>
        </Box>
      </Container>
    </Box>
  )
}

export default Hero
