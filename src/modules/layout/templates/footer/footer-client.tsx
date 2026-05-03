"use client"

import { HttpTypes } from "@medusajs/types"
import {
  Container,
  Box,
  Typography,
  Link as MuiLink,
  Divider,
} from "@mui/material"
import { useTranslations } from "next-intl"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type FooterClientProps = {
  collections: HttpTypes.StoreCollection[]
  parentCategories: HttpTypes.StoreProductCategory[]
}

export default function FooterClient({ collections, parentCategories }: FooterClientProps) {
  const t = useTranslations("footer")

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
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2, fontSize: "0.875rem", color: "text.primary" }}>
              {t("findStore")}
            </Typography>
            <Typography variant="body2" sx={{ fontSize: "0.875rem", color: "text.secondary", lineHeight: 1.6 }}>
              {t("findStoreDescription")}
            </Typography>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2, fontSize: "0.875rem", color: "text.primary" }}>
              {t("getHelp")}
            </Typography>
            <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0, display: "flex", flexDirection: "column", gap: 1.5 }}>
              {[
                { key: "orderStatus", href: "/account" },
                { key: "delivery", href: "/account" },
                { key: "returns", href: "/account" },
                { key: "paymentOptions", href: "/account" },
                { key: "contactUs", href: "/account" },
              ].map(({ key, href }) => (
                <li key={key}>
                  <MuiLink
                    component={LocalizedClientLink}
                    href={href}
                    sx={{ fontSize: "0.875rem", color: "text.secondary", textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
                  >
                    {t(key as any)}
                  </MuiLink>
                </li>
              ))}
            </Box>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2, fontSize: "0.875rem", color: "text.primary" }}>
              {t("about")}
            </Typography>
            <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0, display: "flex", flexDirection: "column", gap: 1.5 }}>
              {[
                { key: "news", href: "https://github.com/medusajs", external: true },
                { key: "careers", href: "https://docs.medusajs.com", external: true },
                { key: "investors", href: "https://github.com/medusajs/nextjs-starter-medusa", external: true },
                { key: "sustainability", href: "/store", external: false },
              ].map(({ key, href, external }) => (
                <li key={key}>
                  <MuiLink
                    {...(external ? { href, target: "_blank", rel: "noreferrer" } : { component: LocalizedClientLink, href })}
                    sx={{ fontSize: "0.875rem", color: "text.secondary", textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
                  >
                    {t(key as any)}
                  </MuiLink>
                </li>
              ))}
            </Box>
          </Box>

          {parentCategories.length > 0 && (
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2, fontSize: "0.875rem", color: "text.primary" }}>
                {t("categories")}
              </Typography>
              <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0, display: "flex", flexDirection: "column", gap: 1.5 }}>
                {parentCategories.slice(0, 5).map((category) => (
                  <li key={category.id}>
                    <MuiLink
                      component={LocalizedClientLink}
                      href={`/categories/${category.handle}`}
                      sx={{ fontSize: "0.875rem", color: "text.secondary", textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
                    >
                      {category.name}
                    </MuiLink>
                  </li>
                ))}
              </Box>
            </Box>
          )}

          {collections && collections.length > 0 && (
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2, fontSize: "0.875rem", color: "text.primary" }}>
                {t("collections")}
              </Typography>
              <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0, display: "flex", flexDirection: "column", gap: 1.5 }}>
                {collections.slice(0, 5).map((collection) => (
                  <li key={collection.id}>
                    <MuiLink
                      component={LocalizedClientLink}
                      href={`/collections/${collection.handle}`}
                      sx={{ fontSize: "0.875rem", color: "text.secondary", textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
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

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "center" },
            gap: 2,
          }}
        >
          <Typography variant="body2" sx={{ fontSize: "0.75rem", color: "text.secondary" }}>
            © {new Date().getFullYear()} Medusa Store. {t("allRightsReserved")}
          </Typography>
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            {["terms", "privacy", "cookies"].map((key) => (
              <MuiLink
                key={key}
                component={LocalizedClientLink}
                href="/store"
                sx={{ fontSize: "0.75rem", color: "text.secondary", textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
              >
                {t(key as any)}
              </MuiLink>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
