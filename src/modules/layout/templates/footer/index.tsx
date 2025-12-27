import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import {
  Container,
  Box,
  Typography,
  Link as MuiLink,
  Divider,
} from "@mui/material"
import { getTranslations } from "next-intl/server"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default async function Footer() {
  const { collections } = await listCollections({
    fields: "*products",
  })
  const productCategories = await listCategories()
  const t = await getTranslations("footer")

  // Фильтруем только родительские категории
  const parentCategories =
    productCategories?.filter((c) => !c.parent_category && c.handle) || []

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#f5f5f5",
        borderTop: "1px solid",
        borderColor: "divider",
        mt: "auto",
      }}
    >
      <Container maxWidth="xl" sx={{ py: { xs: 6, md: 8 } }}>
        {/* Main Footer Links */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(2, 1fr)",
              sm: "repeat(3, 1fr)",
              md: "repeat(4, 1fr)",
              lg: "repeat(5, 1fr)",
            },
            gap: { xs: 4, md: 6 },
            mb: 6,
          }}
        >
          {/* Find a Store */}
          <Box>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 600,
                mb: 2,
                fontSize: "0.875rem",
                color: "text.primary",
              }}
            >
              {t("findStore")}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontSize: "0.875rem",
                color: "text.secondary",
                lineHeight: 1.6,
              }}
            >
              {t("findStoreDescription")}
            </Typography>
          </Box>

          {/* Get Help */}
          <Box>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 600,
                mb: 2,
                fontSize: "0.875rem",
                color: "text.primary",
              }}
            >
              {t("getHelp")}
            </Typography>
            <Box
              component="ul"
              sx={{
                listStyle: "none",
                p: 0,
                m: 0,
                display: "flex",
                flexDirection: "column",
                gap: 1.5,
              }}
            >
              <li>
                <MuiLink
                  component={LocalizedClientLink}
                  href="/account"
                  sx={{
                    fontSize: "0.875rem",
                    color: "text.secondary",
                    textDecoration: "none",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  {t("orderStatus")}
                </MuiLink>
              </li>
              <li>
                <MuiLink
                  component={LocalizedClientLink}
                  href="/account"
                  sx={{
                    fontSize: "0.875rem",
                    color: "text.secondary",
                    textDecoration: "none",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  {t("delivery")}
                </MuiLink>
              </li>
              <li>
                <MuiLink
                  component={LocalizedClientLink}
                  href="/account"
                  sx={{
                    fontSize: "0.875rem",
                    color: "text.secondary",
                    textDecoration: "none",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  {t("returns")}
                </MuiLink>
              </li>
              <li>
                <MuiLink
                  component={LocalizedClientLink}
                  href="/account"
                  sx={{
                    fontSize: "0.875rem",
                    color: "text.secondary",
                    textDecoration: "none",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  {t("paymentOptions")}
                </MuiLink>
              </li>
              <li>
                <MuiLink
                  component={LocalizedClientLink}
                  href="/account"
                  sx={{
                    fontSize: "0.875rem",
                    color: "text.secondary",
                    textDecoration: "none",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  {t("contactUs")}
                </MuiLink>
              </li>
            </Box>
          </Box>

          {/* About */}
          <Box>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 600,
                mb: 2,
                fontSize: "0.875rem",
                color: "text.primary",
              }}
            >
              {t("about")}
            </Typography>
            <Box
              component="ul"
              sx={{
                listStyle: "none",
                p: 0,
                m: 0,
                display: "flex",
                flexDirection: "column",
                gap: 1.5,
              }}
            >
              <li>
                <MuiLink
                  href="https://github.com/medusajs"
                  target="_blank"
                  rel="noreferrer"
                  sx={{
                    fontSize: "0.875rem",
                    color: "text.secondary",
                    textDecoration: "none",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  {t("news")}
                </MuiLink>
              </li>
              <li>
                <MuiLink
                  href="https://docs.medusajs.com"
                  target="_blank"
                  rel="noreferrer"
                  sx={{
                    fontSize: "0.875rem",
                    color: "text.secondary",
                    textDecoration: "none",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  {t("careers")}
                </MuiLink>
              </li>
              <li>
                <MuiLink
                  href="https://github.com/medusajs/nextjs-starter-medusa"
                  target="_blank"
                  rel="noreferrer"
                  sx={{
                    fontSize: "0.875rem",
                    color: "text.secondary",
                    textDecoration: "none",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  {t("investors")}
                </MuiLink>
              </li>
              <li>
                <MuiLink
                  component={LocalizedClientLink}
                  href="/store"
                  sx={{
                    fontSize: "0.875rem",
                    color: "text.secondary",
                    textDecoration: "none",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  {t("sustainability")}
                </MuiLink>
              </li>
            </Box>
          </Box>

          {/* Categories */}
          {parentCategories.length > 0 && (
            <Box>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 600,
                  mb: 2,
                  fontSize: "0.875rem",
                  color: "text.primary",
                }}
              >
                {t("categories")}
              </Typography>
              <Box
                component="ul"
                sx={{
                  listStyle: "none",
                  p: 0,
                  m: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 1.5,
                }}
              >
                {parentCategories.slice(0, 5).map((category) => (
                  <li key={category.id}>
                    <MuiLink
                      component={LocalizedClientLink}
                      href={`/categories/${category.handle}`}
                      sx={{
                        fontSize: "0.875rem",
                        color: "text.secondary",
                        textDecoration: "none",
                        "&:hover": {
                          textDecoration: "underline",
                        },
                      }}
                    >
                      {category.name}
                    </MuiLink>
                  </li>
                ))}
              </Box>
            </Box>
          )}

          {/* Collections */}
          {collections && collections.length > 0 && (
            <Box>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 600,
                  mb: 2,
                  fontSize: "0.875rem",
                  color: "text.primary",
                }}
              >
                {t("collections")}
              </Typography>
              <Box
                component="ul"
                sx={{
                  listStyle: "none",
                  p: 0,
                  m: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 1.5,
                }}
              >
                {collections.slice(0, 5).map((collection) => (
                  <li key={collection.id}>
                    <MuiLink
                      component={LocalizedClientLink}
                      href={`/collections/${collection.handle}`}
                      sx={{
                        fontSize: "0.875rem",
                        color: "text.secondary",
                        textDecoration: "none",
                        "&:hover": {
                          textDecoration: "underline",
                        },
                      }}
                    >
                      {collection.title}
                    </MuiLink>
                  </li>
                ))}
              </Box>
            </Box>
          )}
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* Copyright */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "center" },
            gap: 2,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontSize: "0.75rem",
              color: "text.secondary",
            }}
          >
            © {new Date().getFullYear()} Medusa Store. {t("allRightsReserved")}
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            <MuiLink
              component={LocalizedClientLink}
              href="/store"
              sx={{
                fontSize: "0.75rem",
                color: "text.secondary",
                textDecoration: "none",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              {t("terms")}
            </MuiLink>
            <MuiLink
              component={LocalizedClientLink}
              href="/store"
              sx={{
                fontSize: "0.75rem",
                color: "text.secondary",
                textDecoration: "none",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              {t("privacy")}
            </MuiLink>
            <MuiLink
              component={LocalizedClientLink}
              href="/store"
              sx={{
                fontSize: "0.75rem",
                color: "text.secondary",
                textDecoration: "none",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              {t("cookies")}
            </MuiLink>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
