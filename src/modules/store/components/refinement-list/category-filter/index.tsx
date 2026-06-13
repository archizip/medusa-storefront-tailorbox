"use client"

import { HttpTypes } from "@medusajs/types"
import { Text, clx } from "@medusajs/ui"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useTranslations } from "@lib/util/i18n"

type CategoryFilterProps = {
  categories: HttpTypes.StoreProductCategory[]
  currentCategory?: string
  "data-testid"?: string
}

const CategoryFilter = ({
  categories,
  currentCategory,
  "data-testid": dataTestId,
}: CategoryFilterProps) => {
  const t = useTranslations("store")

  if (!categories?.length) {
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
        {categories.map((category) => (
          <li key={category.id}>
            <LocalizedClientLink
              href={`/categories/${category.handle}`}
              className={clx(
                "txt-compact-small text-ui-fg-subtle hover:text-ui-fg-base",
                {
                  "text-ui-fg-base font-semibold":
                    currentCategory === category.handle,
                }
              )}
              data-testid="category-filter-link"
            >
              {category.name}
            </LocalizedClientLink>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CategoryFilter
