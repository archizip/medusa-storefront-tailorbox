"use client"

import { useState, useEffect, useRef } from "react"
import {
  IconButton,
  Badge,
  Popover,
  Box,
  Typography,
  Button,
  Divider,
  Stack,
} from "@mui/material"
import { ShoppingBag } from "@mui/icons-material"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import DeleteButton from "@modules/common/components/delete-button"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "@modules/products/components/thumbnail"
import { usePathname } from "next/navigation"
import { useTranslations } from "@lib/util/i18n"

const CartButtonMui = ({
  cart: cartState,
}: {
  cart?: HttpTypes.StoreCart | null
}) => {
  const t = useTranslations("common")
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const [activeTimer, setActiveTimer] = useState<NodeJS.Timer | undefined>(
    undefined
  )

  const totalItems =
    cartState?.items?.reduce((acc, item) => {
      return acc + item.quantity
    }, 0) || 0

  const subtotal = cartState?.subtotal ?? 0
  const itemRef = useRef<number>(totalItems || 0)
  const pathname = usePathname()

  const open = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const close = () => {
    setAnchorEl(null)
    if (activeTimer) {
      clearTimeout(activeTimer)
      setActiveTimer(undefined)
    }
  }

  const timedOpen = () => {
    const button = document.querySelector(
      '[data-testid="nav-cart-link"]'
    ) as HTMLButtonElement
    if (button) {
      setAnchorEl(button)
      const timer = setTimeout(() => {
        close()
      }, 5000)
      setActiveTimer(timer)
    }
  }

  const handleMouseEnter = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (activeTimer) {
      clearTimeout(activeTimer)
      setActiveTimer(undefined)
    }
    open(event)
  }

  useEffect(() => {
    return () => {
      if (activeTimer) {
        clearTimeout(activeTimer)
      }
    }
  }, [activeTimer])

  useEffect(() => {
    if (itemRef.current !== totalItems && !pathname.includes("/cart")) {
      timedOpen()
    }
    itemRef.current = totalItems
  }, [totalItems, pathname])

  const openDropdown = Boolean(anchorEl)

  return (
    <Box>
      <IconButton
        onClick={open}
        onMouseEnter={handleMouseEnter}
        sx={{
          color: "text.primary",
          "&:hover": {
            backgroundColor: "transparent",
            color: "text.secondary",
          },
        }}
        data-testid="nav-cart-link"
      >
        <Badge badgeContent={totalItems} color="primary">
          <ShoppingBag />
        </Badge>
      </IconButton>
      <Popover
        open={openDropdown}
        anchorEl={anchorEl}
        onClose={close}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        sx={{
          display: { xs: "none", sm: "block" },
          mt: 1,
        }}
        PaperProps={{
          sx: {
            width: { xs: "90vw", sm: 420 },
            maxWidth: 420,
            maxHeight: 500,
            mt: 1,
          },
          onMouseEnter: () => {
            if (activeTimer) {
              clearTimeout(activeTimer)
              setActiveTimer(undefined)
            }
          },
          onMouseLeave: close,
        }}
        data-testid="nav-cart-dropdown"
      >
        <Box sx={{ p: 2, textAlign: "center" }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {t("cart")}
          </Typography>
        </Box>
        {cartState && cartState.items?.length ? (
          <>
            <Box
              sx={{
                maxHeight: 402,
                overflowY: "auto",
                px: 2,
                py: 1,
              }}
            >
              {cartState.items
                .sort((a, b) => {
                  return (a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1
                })
                .map((item) => (
                  <Box
                    key={item.id}
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "122px 1fr",
                      gap: 2,
                      py: 2,
                    }}
                    data-testid="cart-item"
                  >
                    <LocalizedClientLink
                      href={`/products/${item.product_handle}`}
                      style={{ width: "100%" }}
                    >
                      <Thumbnail
                        thumbnail={item.thumbnail}
                        images={item.variant?.product?.images}
                        size="square"
                      />
                    </LocalizedClientLink>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          mb: 1,
                        }}
                      >
                        <Box sx={{ flex: 1, mr: 2, minWidth: 0 }}>
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: 500,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            <LocalizedClientLink
                              href={`/products/${item.product_handle}`}
                              style={{ textDecoration: "none", color: "inherit" }}
                              data-testid="product-link"
                            >
                              {item.title}
                            </LocalizedClientLink>
                          </Typography>
                          <LineItemOptions
                            variant={item.variant}
                            data-testid="cart-item-variant"
                            data-value={item.variant}
                          />
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            data-testid="cart-item-quantity"
                            data-value={item.quantity}
                          >
                            {t("quantity")}: {item.quantity}
                          </Typography>
                        </Box>
                        <Box>
                          <LineItemPrice
                            item={item}
                            style="tight"
                            currencyCode={cartState.currency_code}
                          />
                        </Box>
                      </Box>
                      <DeleteButton
                        id={item.id}
                        data-testid="cart-item-remove-button"
                      >
                        {t("remove")}
                      </DeleteButton>
                    </Box>
                  </Box>
                ))}
            </Box>
            <Divider />
            <Box sx={{ p: 2 }}>
              <Stack spacing={2}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {t("subtotalExclTaxes")}
                  </Typography>
                  <Typography
                    variant="h6"
                    data-testid="cart-subtotal"
                    data-value={subtotal}
                  >
                    {convertToLocale({
                      amount: subtotal,
                      currency_code: cartState.currency_code,
                    })}
                  </Typography>
                </Box>
                <Button
                  component={LocalizedClientLink}
                  href="/cart"
                  variant="contained"
                  fullWidth
                  size="large"
                  data-testid="go-to-cart-button"
                >
                  {t("goToCart")}
                </Button>
              </Stack>
            </Box>
          </>
        ) : (
          <Box sx={{ py: 4, px: 2, textAlign: "center" }}>
            <Box
              sx={{
                width: 24,
                height: 24,
                borderRadius: "50%",
                bgcolor: "grey.900",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mx: "auto",
                mb: 2,
              }}
            >
              <Typography variant="caption">0</Typography>
            </Box>
            <Typography variant="body2" sx={{ mb: 2 }}>
              {t("emptyBag")}
            </Typography>
            <Button
              component={LocalizedClientLink}
              href="/store"
              variant="outlined"
              onClick={close}
            >
              {t("exploreProducts")}
            </Button>
          </Box>
        )}
      </Popover>
    </Box>
  )
}

export default CartButtonMui

