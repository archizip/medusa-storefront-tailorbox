"use client"

import { useState } from "react"
import {
  Box,
  Button,
  Menu,
  MenuItem,
  Typography,
  Divider,
  ListItemText,
} from "@mui/material"
import { KeyboardArrowDown } from "@mui/icons-material"
import { useRouter } from "next/navigation"
import { useParams } from "next/navigation"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"
import { useTranslations } from "next-intl"

type NavMenuProps = {
  categories: HttpTypes.StoreProductCategory[]
  collections: HttpTypes.StoreCollection[]
}

const NavMenu = ({ categories, collections }: NavMenuProps) => {
  const t = useTranslations("common")
  const router = useRouter()
  const { countryCode } = useParams()
  const [anchorEls, setAnchorEls] = useState<{ [key: string]: HTMLElement | null }>({})

  // Получаем только родительские категории
  const parentCategories = categories?.filter((c) => !c.parent_category) || []

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, key: string) => {
    setAnchorEls((prev) => ({ ...prev, [key]: event.currentTarget }))
  }

  const handleMenuClose = (key: string) => {
    setAnchorEls((prev) => ({ ...prev, [key]: null }))
  }

  const handleNavigation = (href: string) => {
    handleMenuClose("all")
    router.push(`/${countryCode}${href}`)
  }

  return (
    <Box
      sx={{
        display: { xs: "none", lg: "flex" },
        alignItems: "center",
        gap: 0.5,
      }}
    >
      {/* Новинки / Новые коллекции */}
      {collections && collections.length > 0 && (
        <Box>
          <Button
            onClick={(e) => handleMenuOpen(e, "new")}
            sx={{
              color: "text.primary",
              textTransform: "none",
              fontSize: "0.875rem",
              fontWeight: 400,
              px: 2,
              py: 1,
              "&:hover": {
                backgroundColor: "transparent",
                color: "text.secondary",
              },
            }}
            endIcon={<KeyboardArrowDown sx={{ fontSize: 16 }} />}
          >
            {t("new")}
          </Button>
          <Menu
            anchorEl={anchorEls["new"]}
            open={Boolean(anchorEls["new"])}
            onClose={() => handleMenuClose("new")}
            MenuListProps={{
              sx: { minWidth: 200, py: 1 },
            }}
            PaperProps={{
              sx: {
                mt: 1,
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              },
            }}
          >
            {collections.slice(0, 5).map((collection) => (
              <MenuItem
                key={collection.id}
                onClick={() => {
                  handleMenuClose("new")
                  handleNavigation(`/collections/${collection.handle}`)
                }}
                sx={{ py: 1, cursor: "pointer" }}
              >
                <ListItemText primary={collection.title} />
              </MenuItem>
            ))}
          </Menu>
        </Box>
      )}

      {/* Категории */}
      {parentCategories.slice(0, 5).map((category) => {
        const hasChildren = category.category_children && category.category_children.length > 0
        
        return (
          <Box key={category.id}>
            {hasChildren ? (
              <Button
                onClick={(e) => handleMenuOpen(e, category.id)}
                sx={{
                  color: "text.primary",
                  textTransform: "none",
                  fontSize: "0.875rem",
                  fontWeight: 400,
                  px: 2,
                  py: 1,
                  "&:hover": {
                    backgroundColor: "transparent",
                    color: "text.secondary",
                  },
                }}
                endIcon={<KeyboardArrowDown sx={{ fontSize: 16 }} />}
              >
                {category.name}
              </Button>
            ) : (
              <Button
                component={LocalizedClientLink}
                href={`/categories/${category.handle}`}
                sx={{
                  color: "text.primary",
                  textTransform: "none",
                  fontSize: "0.875rem",
                  fontWeight: 400,
                  px: 2,
                  py: 1,
                  "&:hover": {
                    backgroundColor: "transparent",
                    color: "text.secondary",
                  },
                }}
              >
                {category.name}
              </Button>
            )}
            {hasChildren && (
              <Menu
                anchorEl={anchorEls[category.id]}
                open={Boolean(anchorEls[category.id])}
                onClose={() => handleMenuClose(category.id)}
                MenuListProps={{
                  sx: { minWidth: 200, py: 1 },
                }}
                PaperProps={{
                  sx: {
                    mt: 1,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                  },
                }}
              >
                <MenuItem
                  onClick={() => {
                    handleMenuClose(category.id)
                    handleNavigation(`/categories/${category.handle}`)
                  }}
                  sx={{ py: 1, fontWeight: 600, cursor: "pointer" }}
                >
                  <ListItemText primary={category.name} />
                </MenuItem>
                <Divider />
                {category.category_children.map((child) => (
                  <MenuItem
                    key={child.id}
                    onClick={() => {
                      handleMenuClose(category.id)
                      handleNavigation(`/categories/${child.handle}`)
                    }}
                    sx={{ py: 1, cursor: "pointer" }}
                  >
                    <ListItemText primary={child.name} />
                  </MenuItem>
                ))}
              </Menu>
            )}
          </Box>
        )
      })}

      {/* Ссылка на все товары */}
      <Button
        component={LocalizedClientLink}
        href="/store"
        sx={{
          color: "text.primary",
          textTransform: "none",
          fontSize: "0.875rem",
          fontWeight: 400,
          px: 2,
          py: 1,
          "&:hover": {
            backgroundColor: "transparent",
            color: "text.secondary",
          },
        }}
      >
        {t("store")}
      </Button>
    </Box>
  )
}

export default NavMenu

