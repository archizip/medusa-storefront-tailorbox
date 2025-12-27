import { listCategories } from "@lib/data/categories"
import { HttpTypes } from "@medusajs/types"
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Box,
} from "@mui/material"
import { getTranslations } from "next-intl/server"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Category, ArrowForward } from "@mui/icons-material"

async function CategoriesGrid() {
  const categories = await listCategories({ limit: 6 })
  const t = await getTranslations("home.categories")

  // Фильтруем только родительские категории
  const parentCategories = categories?.filter((c) => !c.parent_category) || []

  if (!parentCategories.length) {
    return null
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
      <Box sx={{ mb: 4, textAlign: "center" }}>
        <Typography
          variant="h3"
          component="h2"
          sx={{
            fontWeight: 600,
            mb: 1,
            fontSize: { xs: "1.75rem", md: "2.25rem" },
          }}
        >
          {t("title")}
        </Typography>
      </Box>
      <Grid container spacing={3}>
        {parentCategories.slice(0, 6).map((category) => (
          <Grid item xs={6} sm={4} md={2} key={category.id}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                },
              }}
            >
              <CardActionArea
                component={LocalizedClientLink}
                href={`/categories/${category.handle}`}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  p: 2,
                  textAlign: "center",
                }}
              >
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    backgroundColor: "primary.light",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: "auto",
                    mb: 2,
                  }}
                >
                  <Category sx={{ fontSize: 32, color: "white" }} />
                </Box>
                <CardContent sx={{ flexGrow: 1, p: 0 }}>
                  <Typography
                    variant="h6"
                    component="h3"
                    sx={{
                      fontWeight: 600,
                      fontSize: "1rem",
                      mb: 1,
                    }}
                  >
                    {category.name}
                  </Typography>
                  {category.description && (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        fontSize: "0.875rem",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {category.description}
                    </Typography>
                  )}
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <LocalizedClientLink
          href="/categories"
          style={{
            textDecoration: "none",
            color: "inherit",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            fontWeight: 500,
          }}
        >
          <Typography variant="body1" sx={{ fontWeight: 500 }}>
            {t("viewAll")}
          </Typography>
          <ArrowForward sx={{ fontSize: 20 }} />
        </LocalizedClientLink>
      </Box>
    </Container>
  )
}

export default CategoriesGrid

