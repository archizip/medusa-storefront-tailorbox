"use client"

import { HttpTypes } from "@medusajs/types"
import { Text, clx } from "@medusajs/ui"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useTranslations } from "@lib/util/i18n"
import { buildCategoryTree, CategoryTreeNode } from "@lib/util/category-tree"

type CategoryFilterProps = {
  categories: HttpTypes.StoreProductCategory[]
  currentCategory?: string
  "data-testid"?: string
}

function CategoryNodes({
  nodes,
  currentCategory,
  nested = false,
}: {
  nodes: CategoryTreeNode[]
  currentCategory?: string
  nested?: boolean
}) {
  return (
    <ul
      className={clx("flex flex-col gap-y-2", {
        "mt-2 ml-1.5 border-l border-tb-line-soft pl-3": nested,
      })}
    >
      {nodes.map((node) => (
        <li key={node.category.id}>
          <LocalizedClientLink
            href={`/categories/${node.category.handle}`}
            className={clx(
              "txt-compact-small text-ui-fg-subtle hover:text-ui-fg-base",
              {
                "text-ui-fg-base font-semibold":
                  currentCategory === node.category.handle,
              }
            )}
            data-testid="category-filter-link"
          >
            {node.category.name}
          </LocalizedClientLink>
          {node.children.length > 0 && (
            <CategoryNodes
              nodes={node.children}
              currentCategory={currentCategory}
              nested
            />
          )}
        </li>
      ))}
    </ul>
  )
}

const CategoryFilter = ({
  categories,
  currentCategory,
  "data-testid": dataTestId,
}: CategoryFilterProps) => {
  const t = useTranslations("store")
  const roots = buildCategoryTree(categories)

  if (!roots.length) {
    return null
  }

  return (
    <div className="flex gap-x-3 flex-col gap-y-3" data-testid={dataTestId}>
      <Text className="txt-compact-small-plus text-ui-fg-muted">
        {t("categories")}
      </Text>
      <ul className="flex flex-col gap-y-2">
        <li>
          <LocalizedClientLink
            href="/store"
            className={clx(
              "txt-compact-small text-ui-fg-subtle hover:text-ui-fg-base",
              { "text-ui-fg-base font-semibold": !currentCategory }
            )}
            data-testid="category-filter-link"
          >
            {t("allCategories")}
          </LocalizedClientLink>
        </li>
      </ul>
      <CategoryNodes nodes={roots} currentCategory={currentCategory} />
    </div>
  )
}

export default CategoryFilter
