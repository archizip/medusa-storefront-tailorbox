"use client"

import { Button, Box, Typography, Container, Stack } from "@mui/material"
import { useTranslations } from "next-intl"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Hero = () => {
  const t = useTranslations("home.hero")

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        backgroundColor: "#F5F0E8",
      }}
    >
      <Box
        sx={{
          position: "relative",
          minHeight: { xs: "62vh", md: "76vh" },
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* Right decorative fabric panel */}
        <Box
          sx={{
            display: { xs: "none", md: "block" },
            position: "absolute",
            top: 0,
            right: 0,
            width: "43%",
            height: "100%",
            background: "linear-gradient(160deg, #C8BAA8 0%, #B5A493 50%, #A89078 100%)",
            clipPath: "polygon(10% 0, 100% 0, 100% 100%, 0% 100%)",
          }}
        />
        {/* Fabric weave texture overlay on right panel */}
        <Box
          sx={{
            display: { xs: "none", md: "block" },
            position: "absolute",
            top: 0,
            right: 0,
            width: "43%",
            height: "100%",
            clipPath: "polygon(10% 0, 100% 0, 100% 100%, 0% 100%)",
            background:
              "repeating-linear-gradient(0deg, transparent, transparent 32px, rgba(255,255,255,0.07) 32px, rgba(255,255,255,0.07) 33px), repeating-linear-gradient(90deg, transparent, transparent 32px, rgba(255,255,255,0.07) 32px, rgba(255,255,255,0.07) 33px)",
          }}
        />

        <Container
          maxWidth="xl"
          sx={{
            position: "relative",
            zIndex: 1,
            py: { xs: 10, md: 16 },
          }}
        >
          <Box sx={{ maxWidth: { xs: "100%", sm: "72%", md: "52%" } }}>
            {/* Eyebrow label */}
            <Typography
              sx={{
                fontSize: "0.68rem",
                fontWeight: 700,
                letterSpacing: "0.18em",
                color: "#8B6847",
                textTransform: "uppercase",
                mb: 3,
              }}
            >
              {t("badge")}
            </Typography>

            {/* Main heading */}
            <Typography
              variant="h1"
              component="h1"
              sx={{
                fontSize: { xs: "2.6rem", sm: "3.6rem", md: "4.6rem", lg: "5.4rem" },
                fontWeight: 800,
                mb: 3,
                lineHeight: 1.06,
                letterSpacing: "-0.03em",
                color: "#1A1208",
              }}
            >
              {t("title")}
            </Typography>

            {/* Subtitle */}
            <Typography
              component="p"
              sx={{
                fontSize: { xs: "1rem", md: "1.15rem" },
                fontWeight: 400,
                mb: 5,
                color: "#6B5A48",
                lineHeight: 1.75,
                maxWidth: "460px",
              }}
            >
              {t("subtitle")}
            </Typography>

            {/* CTA buttons */}
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Button
                component={LocalizedClientLink}
                href="/store"
                variant="contained"
                size="large"
                sx={{
                  px: 5,
                  py: 1.75,
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  backgroundColor: "#1A1208",
                  color: "#F5F0E8",
                  borderRadius: "3px",
                  textTransform: "none",
                  letterSpacing: "0.01em",
                  boxShadow: "none",
                  "&:hover": {
                    backgroundColor: "#2D2010",
                    boxShadow: "none",
                  },
                }}
              >
                {t("shopNow")}
              </Button>
              <Button
                component={LocalizedClientLink}
                href="/store"
                variant="outlined"
                size="large"
                sx={{
                  px: 5,
                  py: 1.75,
                  fontSize: "0.95rem",
                  fontWeight: 500,
                  borderColor: "#A08060",
                  color: "#6B4E30",
                  borderRadius: "3px",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "rgba(139,104,71,0.08)",
                    borderColor: "#6B4E30",
                  },
                }}
              >
                {t("explore")}
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}

export default Hero
