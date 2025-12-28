import { listCategories } from "@lib/data/categories"
import { HttpTypes } from "@medusajs/types"
import {
  Container,
  Typography,
  Box,
  Button,
} from "@mui/material"
import { getTranslations } from "next-intl/server"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

async function CategoriesGrid() {
  try {
    const categories = await listCategories({ limit: 100 })
    const t = await getTranslations("home.categories")
    const tCategories = await getTranslations("categories")

    if (!categories || categories.length === 0) {
      return null
    }

    // Находим главную категорию (без parent_category) - например "Knit Fabrics"
    const mainCategory = categories.find(
      (c) => c?.handle && c?.name && !c?.parent_category
    )

    // Если есть главная категория, показываем её прямые подкатегории (первого уровня)
    // Иначе показываем все категории без parent_category
    let displayCategories = mainCategory
      ? categories.filter(
          (c) =>
            c?.handle &&
            c?.name &&
            c?.parent_category?.id === mainCategory.id
        )
      : categories.filter(
          (c) => c?.handle && c?.name && !c?.parent_category
        )

    // Сортируем категории по имени для консистентного отображения
    displayCategories.sort((a, b) => {
      if (a?.name && b?.name) {
        return a.name.localeCompare(b.name)
      }
      return 0
    })

    // Если нет категорий для отображения, не показываем секцию
    if (displayCategories.length === 0) {
      return null
    }

    return (
      <Box sx={{ py: { xs: 8, md: 12 }, backgroundColor: "#f5f5f5" }}>
        <Container maxWidth="xl">
          <Typography
            variant="h3"
            component="h2"
            sx={{
              fontWeight: 700,
              mb: 6,
              fontSize: { xs: "1.75rem", md: "2.5rem" },
              textAlign: "center",
              letterSpacing: "-0.02em",
            }}
          >
            {t("title")}
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(1, 1fr)",
                sm: "repeat(2, 1fr)",
                md: displayCategories.length >= 3 ? "repeat(3, 1fr)" : `repeat(${displayCategories.length}, 1fr)`,
                lg: displayCategories.length >= 4 ? "repeat(4, 1fr)" : `repeat(${displayCategories.length}, 1fr)`,
              },
              gap: 2,
            }}
          >
            {displayCategories.map((category) => (
              <Box
                key={category.id}
                component={LocalizedClientLink}
                href={`/categories/${category.handle}`}
                sx={{
                  display: "block",
                  position: "relative",
                  height: { xs: 300, md: 400 },
                  backgroundColor: "#000",
                  borderRadius: 0,
                  overflow: "hidden",
                  textDecoration: "none",
                  "&:hover": {
                    "& .category-overlay": {
                      opacity: 1,
                    },
                    "& .category-title": {
                      transform: "translateY(-5px)",
                    },
                  },
                  transition: "all 0.3s ease",
                }}
              >
                <Box
                  className="category-overlay"
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)",
                    opacity: 0.7,
                    transition: "opacity 0.3s ease",
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    p: 4,
                    zIndex: 1,
                  }}
                >
                  <Typography
                    className="category-title"
                    variant="h4"
                    component="h3"
                    sx={{
                      fontWeight: 700,
                      color: "white",
                      fontSize: { xs: "1.5rem", md: "2rem" },
                      mb: 1,
                      transition: "transform 0.3s ease",
                    }}
                  >
                    {category.handle ? (tCategories(category.handle) || category.name) : category.name}
                  </Typography>
                  {category.description && (
                    <Typography
                      variant="body2"
                      sx={{
                        color: "rgba(255,255,255,0.9)",
                        fontSize: "0.875rem",
                      }}
                    >
                      {category.handle 
                        ? (tCategories(`${category.handle}-description`) || category.description) 
                        : category.description}
                    </Typography>
                  )}
                </Box>
              </Box>
            ))}
          </Box>
          <Box sx={{ textAlign: "center", mt: 6 }}>
            <Button
              component={LocalizedClientLink}
              href="/store"
              variant="outlined"
              sx={{
                px: 4,
                py: 1.5,
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
        </Container>
      </Box>
    )
  } catch (error) {
    console.error("Error loading categories:", error)
    return null
  }
}

export default CategoriesGrid

