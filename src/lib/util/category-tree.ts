import { HttpTypes } from "@medusajs/types"

export type CategoryTreeNode = {
  category: HttpTypes.StoreProductCategory
  children: CategoryTreeNode[]
}

/**
 * Builds a nested category tree from a flat list of categories (as returned by
 * `listCategories`). Each category exposes its direct `parent_category`, so the
 * tree is reconstructed by parent id and works for any depth. Roots are the
 * categories without a (resolvable) parent. Siblings are sorted by name.
 */
export function buildCategoryTree(
  categories: HttpTypes.StoreProductCategory[] | null | undefined
): CategoryTreeNode[] {
  const valid = (categories ?? []).filter((c) => c?.id && c?.handle && c?.name)

  const byId = new Map<string, CategoryTreeNode>()
  for (const category of valid) {
    byId.set(category.id, { category, children: [] })
  }

  const roots: CategoryTreeNode[] = []
  for (const category of valid) {
    const node = byId.get(category.id)!
    const parentId = category.parent_category?.id
    const parent = parentId ? byId.get(parentId) : undefined
    if (parent) {
      parent.children.push(node)
    } else {
      roots.push(node)
    }
  }

  const sortRec = (nodes: CategoryTreeNode[]) => {
    nodes.sort((a, b) =>
      (a.category.name ?? "").localeCompare(b.category.name ?? "")
    )
    nodes.forEach((n) => sortRec(n.children))
  }
  sortRec(roots)

  return roots
}

/**
 * Ancestor chain for a category, root first and ending with the category
 * itself. `listCategories` exposes only each category's direct parent, so the
 * chain is walked through a flat lookup built from that list. Ids already seen
 * are skipped, so a mis-configured parent cycle cannot hang the render.
 */
export function getCategoryChain(
  categoryId: string,
  categoriesById: Map<string, HttpTypes.StoreProductCategory>
): HttpTypes.StoreProductCategory[] {
  const chain: HttpTypes.StoreProductCategory[] = []
  const seen = new Set<string>()

  let currentId: string | undefined = categoryId
  while (currentId && !seen.has(currentId)) {
    seen.add(currentId)
    const category = categoriesById.get(currentId)
    if (!category) break
    chain.unshift(category)
    currentId = category.parent_category?.id
  }

  return chain
}
