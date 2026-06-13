"use client"

import { useTranslations } from "@lib/util/i18n"

type Block = { heading?: string; text?: string; items?: string[] }

/**
 * Универсальный шаблон контентной страницы (about, contacts, shipping и т.д.).
 * Контент берётся из namespace `pages.<pageKey>` в messages/*.json:
 *   { kicker, title, intro, blocks: [{ heading?, text?, items?[] }] }
 */
export default function ContentPage({ pageKey }: { pageKey: string }) {
  const t = useTranslations("pages")
  const blocks = (t.raw(`${pageKey}.blocks`) as Block[] | undefined) ?? []

  return (
    <div className="content-container py-16 small:py-24">
      <div className="max-w-3xl mx-auto">
        <div className="uppercase-label mb-4">{t(`${pageKey}.kicker`)}</div>
        <h1 className="serif text-4xl small:text-5xl text-tb-ink leading-tight">
          {t(`${pageKey}.title`)}
        </h1>
        <p className="text-lg text-tb-ink-2 mt-6 leading-relaxed">
          {t(`${pageKey}.intro`)}
        </p>

        <div className="mt-12 flex flex-col gap-y-10">
          {blocks.map((block, i) => (
            <section key={i}>
              {block.heading && (
                <h2 className="serif text-2xl text-tb-ink mb-3">
                  {block.heading}
                </h2>
              )}
              {block.text && (
                <p className="text-tb-ink-2 leading-relaxed whitespace-pre-line">
                  {block.text}
                </p>
              )}
              {block.items && block.items.length > 0 && (
                <ul className="mt-3 flex flex-col gap-y-2">
                  {block.items.map((item, j) => (
                    <li
                      key={j}
                      className="flex gap-x-3 text-tb-ink-2 leading-relaxed"
                    >
                      <span className="text-tb-accent mt-1 shrink-0">—</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
