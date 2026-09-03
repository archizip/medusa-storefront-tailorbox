"use client"

import { useState } from "react"

import { useTranslations } from "@lib/util/i18n"
import ChevronDown from "@modules/common/icons/chevron-down"

/** Garment types the length guide gives a recommendation for. */
const GARMENTS = [
  "dress",
  "skirt",
  "blouse",
  "trousers",
  "accessories",
] as const

/**
 * "How much fabric do I need?" — a disclosure with a per-garment length
 * recommendation, the equivalent of the reference shop's "guide des métrages".
 */
const MetrageGuide = () => {
  const t = useTranslations("product.metrageGuide")
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="text-xs">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        className="flex items-center gap-x-1 text-tb-ink-3 underline decoration-tb-line hover:text-tb-ink"
        data-testid="metrage-guide-toggle"
      >
        {t("title")}
        <ChevronDown
          size={12}
          className={
            isOpen ? "rotate-180 transition-transform" : "transition-transform"
          }
        />
      </button>

      {isOpen && (
        <div
          className="mt-3 rounded border border-tb-line-soft bg-tb-bg-card p-4"
          data-testid="metrage-guide-content"
        >
          <p className="mb-3 text-tb-ink-2">{t("intro")}</p>
          <dl className="flex flex-col gap-y-2">
            {GARMENTS.map((garment) => (
              <div key={garment} className="flex justify-between gap-x-4">
                <dt className="text-tb-ink-2">
                  {t(`garments.${garment}.label`)}
                </dt>
                <dd className="mono shrink-0 text-tb-ink">
                  {t(`garments.${garment}.length`)}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-tb-ink-3">{t("note")}</p>
        </div>
      )}
    </div>
  )
}

export default MetrageGuide
