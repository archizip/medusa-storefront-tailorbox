import { Suspense } from "react"
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Stack,
  Typography,
  Divider,
} from "@mui/material"
import {
  Search,
  ShoppingBag,
  PersonOutline,
  Menu as MenuIcon,
} from "@mui/icons-material"
import { getTranslations } from "next-intl/server"

import { listRegions } from "@lib/data/regions"
import { listLocales } from "@lib/data/locales"
import { getLocale } from "@lib/data/locale-actions"
import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import CountrySelectMui from "@modules/layout/components/country-select-mui"
import LanguageSelectMui from "@modules/layout/components/language-select-mui"
import MobileNavMenu from "@modules/layout/components/mobile-nav-menu"
import NavMenu from "@modules/layout/components/nav-menu"

export default async function Nav() {
  const [regions, locales, currentLocale, categories, collectionsData] = await Promise.all([
    listRegions().then((regions: StoreRegion[]) => regions),
    listLocales(),
    getLocale(),
    listCategories(),
    listCollections({ fields: "id, handle, title" }),
  ])
  
  const t = await getTranslations("common")
  const { collections } = collectionsData

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: "white",
        color: "text.primary",
        zIndex: 1100,
      }}
    >
      {/* Top bar - Help, Find Store, Sign In */}
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          justifyContent: "flex-end",
          alignItems: "center",
          px: { md: 4, lg: 6 },
          py: 0.5,
          gap: 2,
          borderBottom: "1px solid",
          borderColor: "divider",
          backgroundColor: "#f5f5f5",
        }}
      >
        <LocalizedClientLink
          href="/store"
          style={{
            textDecoration: "none",
            color: "inherit",
            fontSize: "0.75rem",
          }}
        >
          {t("findStore")}
        </LocalizedClientLink>
        <LocalizedClientLink
          href="/account"
          style={{
            textDecoration: "none",
            color: "inherit",
            fontSize: "0.75rem",
          }}
        >
          {t("help")}
        </LocalizedClientLink>
        <Divider orientation="vertical" flexItem />
        <LocalizedClientLink
          href="/account"
          style={{
            textDecoration: "none",
            color: "inherit",
            fontSize: "0.75rem",
          }}
        >
          {t("signIn")}
        </LocalizedClientLink>
        {locales && locales.length > 0 && (
          <Box sx={{ ml: 1 }}>
            <LanguageSelectMui
              locales={locales}
              currentLocale={currentLocale}
            />
          </Box>
        )}
        {regions && regions.length > 0 && (
          <Box>
            <CountrySelectMui regions={regions} />
          </Box>
        )}
      </Box>

      {/* Main navigation bar */}
      <Toolbar
        disableGutters
        sx={{
          minHeight: { xs: 60, md: 70 },
          px: { xs: 2, md: 4, lg: 6 },
          justifyContent: "space-between",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        {/* Mobile Menu Button */}
        <Box sx={{ display: { xs: "block", lg: "none" } }}>
          <MobileNavMenu
            regions={regions}
            locales={locales}
            currentLocale={currentLocale}
            categories={categories}
            collections={collections}
          />
        </Box>

        {/* Logo */}
        <Typography
          component={LocalizedClientLink}
          href="/"
          variant="h5"
          sx={{
            fontWeight: 700,
            textDecoration: "none",
            color: "text.primary",
            fontSize: { xs: "1.25rem", md: "1.5rem" },
            letterSpacing: "-0.02em",
            "&:hover": {
              opacity: 0.7,
            },
          }}
          data-testid="nav-store-link"
        >
          MEDUSA
        </Typography>

        {/* Desktop Navigation Menu */}
        <Box sx={{ flexGrow: 1, display: { xs: "none", lg: "flex" }, justifyContent: "center" }}>
          <NavMenu categories={categories} collections={collections} />
        </Box>

        {/* Right side - Search, Cart, Account */}
        <Stack
          direction="row"
          spacing={1}
          sx={{
            alignItems: "center",
          }}
        >
          {/* Search */}
          <IconButton
            sx={{
              color: "text.primary",
              "&:hover": {
                backgroundColor: "transparent",
                color: "text.secondary",
              },
            }}
            aria-label="search"
          >
            <Search />
          </IconButton>

          {/* Cart */}
          <Suspense
            fallback={
              <IconButton
                component={LocalizedClientLink}
                href="/cart"
                sx={{
                  color: "text.primary",
                  "&:hover": {
                    backgroundColor: "transparent",
                    color: "text.secondary",
                  },
                }}
                data-testid="nav-cart-link"
              >
                <ShoppingBag />
              </IconButton>
            }
          >
            <CartButton />
          </Suspense>

          {/* Account */}
          <IconButton
            component={LocalizedClientLink}
            href="/account"
            sx={{
              color: "text.primary",
              display: { xs: "none", sm: "flex" },
              "&:hover": {
                backgroundColor: "transparent",
                color: "text.secondary",
              },
            }}
            data-testid="nav-account-link"
          >
            <PersonOutline />
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  )
}
