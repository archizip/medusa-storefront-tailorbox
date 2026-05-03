import { listCategories } from "@lib/data/categories"
import FabricTypesNavClient from "./fabric-types-nav-client"

async function FabricTypesQuickNav() {
  try {
    const categories = await listCategories({ limit: 100 })
    if (!categories || categories.length === 0) return null

    const parentCategories = categories.filter(
      (c) => c?.handle && c?.name && !c?.parent_category
    )
    if (parentCategories.length === 0) return null

    return <FabricTypesNavClient categories={parentCategories} />
  } catch {
    return null
  }
}

export default FabricTypesQuickNav
