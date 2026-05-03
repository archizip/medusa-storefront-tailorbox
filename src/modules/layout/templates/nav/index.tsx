import { getTranslations } from "next-intl/server"
import { StoreRegion } from "@medusajs/types"
import { listRegions } from "@lib/data/regions"
import { listLocales } from "@lib/data/locales"
import { getLocale } from "@lib/data/locale-actions"
import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import NavClient from "./nav-client"

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
    <NavClient
      regions={regions}
      locales={locales}
      currentLocale={currentLocale}
      categories={categories}
      collections={collections}
      translations={{
        findStore: t("findStore"),
        help: t("help"),
        signIn: t("signIn"),
      }}
    />
  )
}
