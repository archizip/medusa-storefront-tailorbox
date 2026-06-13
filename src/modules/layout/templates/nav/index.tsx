import { Suspense } from "react"
import { getTranslations } from "next-intl/server"
import { StoreRegion } from "@medusajs/types"
import { listRegions } from "@lib/data/regions"
import { listLocales } from "@lib/data/locales"
import { getLocale } from "@lib/data/locale-actions"
import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import CartButton from "@modules/layout/components/cart-button"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import NavClient from "./nav-client"

export default async function Nav() {
  const [regions, locales, currentLocale, categories, collectionsData] =
    await Promise.all([
      listRegions().then((regions: StoreRegion[]) => regions),
      listLocales(),
      getLocale(),
      listCategories(),
      listCollections({ fields: "id, handle, title" }),
    ])

  const t = await getTranslations("common")
  const tStore = await getTranslations("store")
  const { collections } = collectionsData

  const cartSlot = (
    <Suspense
      fallback={
        <LocalizedClientLink href="/cart">
          <button
            className="btn btn-soft btn-sm"
            style={{ borderRadius: 999 }}
            data-testid="nav-cart-link"
          >
            <svg width={16} height={16} viewBox="0 0 16 16" fill="none">
              <path
                d="M2 4 H4 L5.5 12 H13 L14 6 H5"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
                strokeLinejoin="round"
              />
              <circle cx="6" cy="14" r="0.8" fill="currentColor" />
              <circle cx="12" cy="14" r="0.8" fill="currentColor" />
            </svg>
            {t("cart")}
          </button>
        </LocalizedClientLink>
      }
    >
      <CartButton />
    </Suspense>
  )

  return (
    <NavClient
      regions={regions}
      locales={locales}
      currentLocale={currentLocale}
      categories={categories}
      collections={collections}
      cartSlot={cartSlot}
      translations={{
        findStore: t("findStore"),
        help: t("help"),
        signIn: t("signIn"),
        fabrics: tStore("fabrics"),
        viewAll: tStore("viewAll"),
      }}
    />
  )
}
