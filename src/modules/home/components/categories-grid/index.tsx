import { listCategories } from "@lib/data/categories"
import CategoriesGridClient from "./categories-grid-client"

async function CategoriesGrid() {
  try {
    const categories = await listCategories({ limit: 100 })

    if (!categories || categories.length === 0) {
      return null
    }

    const mainCategory = categories.find(
      (c) => c?.handle && c?.name && !c?.parent_category
    )

    let displayCategories = mainCategory
      ? categories.filter(
          (c) =>
            c?.handle &&
            c?.name &&
            c?.parent_category?.id === mainCategory.id
        )
      : categories.filter(
          (c) => c?.handle && c?.name && !c?.parent_category
        )

    displayCategories.sort((a, b) => {
      if (a?.name && b?.name) return a.name.localeCompare(b.name)
      return 0
    })

    if (displayCategories.length === 0) {
      return null
    }

    return <CategoriesGridClient categories={displayCategories} />
  } catch (error) {
    console.error("Error loading categories:", error)
    return null
  }
}

export default CategoriesGrid
