"use client"

import { HttpTypes } from "@medusajs/types"
import { useTranslations } from "@lib/util/i18n"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function CollectionsIndex({
  collections,
}: {
  collections: HttpTypes.StoreCollection[]
}) {
  const t = useTranslations("pages")

  return (
    <div className="content-container py-16 small:py-24">
      <div className="max-w-5xl mx-auto">
        <div className="uppercase-label mb-4">{t("collections.kicker")}</div>
        <h1 className="serif text-4xl small:text-5xl text-tb-ink leading-tight">
          {t("collections.title")}
        </h1>
        <p className="text-lg text-tb-ink-2 mt-6 leading-relaxed max-w-2xl">
          {t("collections.intro")}
        </p>

        {collections.length > 0 ? (
          <div className="mt-12 grid grid-cols-1 small:grid-cols-2 gap-4">
            {collections.map((collection) => (
              <LocalizedClientLink
                key={collection.id}
                href={`/collections/${collection.handle}`}
                className="fabric-card p-6 flex items-center justify-between group"
              >
                <span className="serif text-2xl text-tb-ink">
                  {collection.title}
                </span>
                <span className="text-tb-ink-4 group-hover:text-tb-accent transition-colors">
                  →
                </span>
              </LocalizedClientLink>
            ))}
          </div>
        ) : (
          <div className="mt-12 rounded border border-tb-line-soft bg-tb-bg-card p-10 text-center">
            <p className="text-tb-ink-2">{t("collections.empty")}</p>
            <LocalizedClientLink
              href="/store"
              className="inline-block mt-4 text-tb-accent hover:text-tb-ink transition-colors"
            >
              {t("collections.toStore")} →
            </LocalizedClientLink>
          </div>
        )}
      </div>
    </div>
  )
}
