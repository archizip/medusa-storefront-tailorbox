"use client"

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
} from "@mui/icons-material"
import { Suspense } from "react"
import { HttpTypes } from "@medusajs/types"
import { Locale } from "@lib/data/locales"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import CountrySelectMui from "@modules/layout/components/country-select-mui"
import LanguageSelectMui from "@modules/layout/components/language-select-mui"
import MobileNavMenu from "@modules/layout/components/mobile-nav-menu"
import NavMenu from "@modules/layout/components/nav-menu"

type NavClientProps = {
  regions: HttpTypes.StoreRegion[] | null
  locales: Locale[] | null
  currentLocale: string | null
  categories: HttpTypes.StoreProductCategory[]
  collections: HttpTypes.StoreCollection[]
  translations: {
    findStore: string
    help: string
    signIn: string
  }
}

export default function NavClient({
  regions,
  locales,
  currentLocale,
  categories,
  collections,
  translations,
}: NavClientProps) {
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
          style={{ textDecoration: "none", color: "inherit", fontSize: "0.75rem" }}
        >
          {translations.findStore}
        </LocalizedClientLink>
        <LocalizedClientLink
          href="/account"
          style={{ textDecoration: "none", color: "inherit", fontSize: "0.75rem" }}
        >
          {translations.help}
        </LocalizedClientLink>
        <Divider orientation="vertical" flexItem />
        <LocalizedClientLink
          href="/account"
          style={{ textDecoration: "none", color: "inherit", fontSize: "0.75rem" }}
        >
          {translations.signIn}
        </LocalizedClientLink>
        {locales && locales.length > 0 && (
          <Box sx={{ ml: 1 }}>
            <LanguageSelectMui locales={locales} currentLocale={currentLocale} />
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
            "&:hover": { opacity: 0.7 },
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
        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
          <IconButton
            sx={{
              color: "text.primary",
              "&:hover": { backgroundColor: "transparent", color: "text.secondary" },
            }}
            aria-label="search"
          >
            <Search />
          </IconButton>

          <Suspense
            fallback={
              <IconButton
                component={LocalizedClientLink}
                href="/cart"
                sx={{
                  color: "text.primary",
                  "&:hover": { backgroundColor: "transparent", color: "text.secondary" },
                }}
                data-testid="nav-cart-link"
              >
                <ShoppingBag />
              </IconButton>
            }
          >
            <CartButton />
          </Suspense>

          <IconButton
            component={LocalizedClientLink}
            href="/account"
            sx={{
              color: "text.primary",
              display: { xs: "none", sm: "flex" },
              "&:hover": { backgroundColor: "transparent", color: "text.secondary" },
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
