"use client"

import { useState } from "react"
import {
  IconButton,
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
} from "@mui/material"
import { Menu, Home, Store, AccountCircle, Close } from "@mui/icons-material"
import { useTranslations } from "next-intl"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CountrySelectMui from "@modules/layout/components/country-select-mui"
import LanguageSelectMui from "@modules/layout/components/language-select-mui"
import { HttpTypes } from "@medusajs/types"
import { Locale } from "@lib/data/locales"
import { buildCategoryTree, CategoryTreeNode } from "@lib/util/category-tree"

type MobileNavMenuProps = {
  regions: HttpTypes.StoreRegion[] | null
  locales: Locale[] | null
  currentLocale: string | null
  categories?: HttpTypes.StoreProductCategory[]
  collections?: HttpTypes.StoreCollection[]
}

const MobileNavMenu = ({
  regions,
  locales,
  currentLocale,
  categories = [],
  collections = [],
}: MobileNavMenuProps) => {
  const [open, setOpen] = useState(false)
  const t = useTranslations("common")

  const categoryRoots = buildCategoryTree(categories)

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen)
  }

  const renderCategoryNodes = (
    nodes: CategoryTreeNode[],
    depth = 0
  ): React.ReactNode[] =>
    nodes.flatMap((node) => [
      <ListItem key={node.category.id} disablePadding>
        <ListItemButton
          component={LocalizedClientLink}
          href={`/categories/${node.category.handle}`}
          onClick={toggleDrawer(false)}
          sx={{ pl: 2 + depth * 2 }}
        >
          <ListItemText
            primary={node.category.name}
            primaryTypographyProps={
              depth === 0 ? { fontWeight: 600 } : undefined
            }
          />
        </ListItemButton>
      </ListItem>,
      ...(node.children.length > 0
        ? renderCategoryNodes(node.children, depth + 1)
        : []),
    ])

  return (
    <>
      <IconButton
        onClick={toggleDrawer(true)}
        sx={{
          color: "text.primary",
          "&:hover": {
            backgroundColor: "action.hover",
          },
        }}
        aria-label="menu"
      >
        <Menu />
      </IconButton>
      <Drawer
        anchor="left"
        open={open}
        onClose={toggleDrawer(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: { xs: "80%", sm: 320 },
            maxWidth: 400,
          },
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              p: 2,
              borderBottom: 1,
              borderColor: "divider",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {t("menu")}
            </Typography>
            <IconButton onClick={toggleDrawer(false)}>
              <Close />
            </IconButton>
          </Box>

          {/* Navigation Links */}
          <List sx={{ flexGrow: 1 }}>
            <ListItem disablePadding>
              <ListItemButton
                component={LocalizedClientLink}
                href="/"
                onClick={toggleDrawer(false)}
              >
                <ListItemIcon>
                  <Home />
                </ListItemIcon>
                <ListItemText primary={t("home")} />
              </ListItemButton>
            </ListItem>
            {collections && collections.length > 0 && (
              <ListItem disablePadding>
                <ListItemButton
                  component={LocalizedClientLink}
                  href="/collections"
                  onClick={toggleDrawer(false)}
                >
                  <ListItemText primary={t("new")} />
                </ListItemButton>
              </ListItem>
            )}
            {renderCategoryNodes(categoryRoots)}
            <ListItem disablePadding>
              <ListItemButton
                component={LocalizedClientLink}
                href="/store"
                onClick={toggleDrawer(false)}
              >
                <ListItemIcon>
                  <Store />
                </ListItemIcon>
                <ListItemText primary={t("store")} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                component={LocalizedClientLink}
                href="/account"
                onClick={toggleDrawer(false)}
              >
                <ListItemIcon>
                  <AccountCircle />
                </ListItemIcon>
                <ListItemText primary={t("account")} />
              </ListItemButton>
            </ListItem>
          </List>

          <Divider />

          {/* Language and Country Selectors */}
          <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2 }}>
            {locales && locales.length > 0 && (
              <Box>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ mb: 1, display: "block" }}
                >
                  {t("language")}
                </Typography>
                <LanguageSelectMui
                  locales={locales}
                  currentLocale={currentLocale}
                />
              </Box>
            )}
            {regions && regions.length > 0 && (
              <Box>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ mb: 1, display: "block" }}
                >
                  {t("country")}
                </Typography>
                <CountrySelectMui regions={regions} />
              </Box>
            )}
          </Box>
        </Box>
      </Drawer>
    </>
  )
}

export default MobileNavMenu
