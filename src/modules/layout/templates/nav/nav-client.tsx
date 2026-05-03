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
import { Search, ShoppingBag, PersonOutline } from "@mui/icons-material"
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
      {/* Top utility bar */}
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          justifyContent: "flex-end",
          alignItems: "center",
          px: { md: 4, lg: 6 },
          py: 0.75,
          gap: 2,
          borderBottom: "1px solid",
          borderColor: "divider",
          backgroundColor: "#F5F0E8",
        }}
      >
        <LocalizedClientLink
          href="/store"
          style={{
            textDecoration: "none",
            color: "#6B4E30",
            fontSize: "0.72rem",
            fontWeight: 500,
            letterSpacing: "0.03em",
          }}
        >
          {translations.findStore}
        </LocalizedClientLink>
        <LocalizedClientLink
          href="/account"
          style={{
            textDecoration: "none",
            color: "#6B4E30",
            fontSize: "0.72rem",
            fontWeight: 500,
            letterSpacing: "0.03em",
          }}
        >
          {translations.help}
        </LocalizedClientLink>
        <Divider orientation="vertical" flexItem sx={{ borderColor: "#C8B49A" }} />
        <LocalizedClientLink
          href="/account"
          style={{
            textDecoration: "none",
            color: "#6B4E30",
            fontSize: "0.72rem",
            fontWeight: 500,
            letterSpacing: "0.03em",
          }}
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
          minHeight: { xs: 60, md: 68 },
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
        <Box
          component={LocalizedClientLink}
          href="/"
          sx={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: 0.75,
            "&:hover": { opacity: 0.8 },
          }}
          data-testid="nav-store-link"
        >
          {/* Logo mark */}
          <Box
            sx={{
              width: 28,
              height: 28,
              backgroundColor: "#1A1208",
              borderRadius: "3px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Box
              sx={{
                width: 14,
                height: 14,
                border: "2px solid #C4A882",
                borderRadius: "1px",
              }}
            />
          </Box>
          <Typography
            variant="h5"
            component="span"
            sx={{
              fontWeight: 800,
              color: "#1A1208",
              fontSize: { xs: "1.15rem", md: "1.35rem" },
              letterSpacing: "-0.03em",
              lineHeight: 1,
            }}
          >
            Tailor
            <Box component="span" sx={{ color: "#8B6847" }}>
              Box
            </Box>
          </Typography>
        </Box>

        {/* Desktop Navigation Menu */}
        <Box
          sx={{ flexGrow: 1, display: { xs: "none", lg: "flex" }, justifyContent: "center" }}
        >
          <NavMenu categories={categories} collections={collections} />
        </Box>

        {/* Right side icons */}
        <Stack direction="row" spacing={0.5} sx={{ alignItems: "center" }}>
          <IconButton
            sx={{
              color: "#1A1208",
              "&:hover": { backgroundColor: "#F5F0E8", color: "#6B4E30" },
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
                  color: "#1A1208",
                  "&:hover": { backgroundColor: "#F5F0E8", color: "#6B4E30" },
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
              color: "#1A1208",
              display: { xs: "none", sm: "flex" },
              "&:hover": { backgroundColor: "#F5F0E8", color: "#6B4E30" },
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
