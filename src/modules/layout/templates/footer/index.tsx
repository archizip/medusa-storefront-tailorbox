import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import FooterClient from "./footer-client"

export default async function Footer() {
  const { collections } = await listCollections({ fields: "*products" })
  const productCategories = await listCategories()

  const parentCategories =
    productCategories?.filter((c) => !c.parent_category && c.handle) || []

  return (
    <FooterClient
      collections={collections}
      parentCategories={parentCategories}
    />
  )
}
