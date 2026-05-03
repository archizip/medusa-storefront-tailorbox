"use client"

import { Box, Container, Typography, Stack } from "@mui/material"
import { Verified, LocalShipping, AssignmentReturn, Headset } from "@mui/icons-material"
import { useTranslations } from "next-intl"

export default function TrustBadges() {
  const t = useTranslations("home.trust")

  const badges = [
    {
      icon: <Verified />,
      title: t("quality"),
      subtitle: t("qualitySub"),
    },
    {
      icon: <LocalShipping />,
      title: t("delivery"),
      subtitle: t("deliverySub"),
    },
    {
      icon: <AssignmentReturn />,
      title: t("returns"),
      subtitle: t("returnsSub"),
    },
    {
      icon: <Headset />,
      title: t("support"),
      subtitle: t("supportSub"),
    },
  ]

  return (
    <Box sx={{ backgroundColor: "#1A1208", py: { xs: 5, md: 6 } }}>
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(2, 1fr)",
              md: "repeat(4, 1fr)",
            },
            gap: { xs: 3, md: 5 },
          }}
        >
          {badges.map((badge) => (
            <Stack key={badge.title} direction="row" spacing={2} alignItems="flex-start">
              <Box
                sx={{
                  color: "#C4A882",
                  mt: 0.3,
                  flexShrink: 0,
                  "& svg": { fontSize: "1.65rem" },
                }}
              >
                {badge.icon}
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    color: "#F5F0E8",
                    mb: 0.35,
                    lineHeight: 1.3,
                  }}
                >
                  {badge.title}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "0.75rem",
                    color: "#9A8A78",
                    lineHeight: 1.5,
                  }}
                >
                  {badge.subtitle}
                </Typography>
              </Box>
            </Stack>
          ))}
        </Box>
      </Container>
    </Box>
  )
}
