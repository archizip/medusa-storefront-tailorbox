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
