"use client"

import { clx } from "@medusajs/ui"
import { useEffect, useState } from "react"

import { useTranslations } from "@lib/util/i18n"

type QuantitySelectorProps = {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  disabled?: boolean
}

/**
 * Length picker for fabric sold by the metre. Medusa line-item quantities are
 * integers, so the step is one whole metre; `max` is the stock on hand when the
 * variant manages inventory.
 */
const QuantitySelector = ({
  value,
  onChange,
  min = 1,
  max,
  disabled,
}: QuantitySelectorProps) => {
  const t = useTranslations("product")

  // Mirror the committed value so the field can be cleared and retyped; it is
  // clamped on blur rather than on every keystroke.
  const [draft, setDraft] = useState(String(value))

  useEffect(() => {
    setDraft(String(value))
  }, [value])

  const clamp = (next: number) => {
    if (!Number.isFinite(next)) return min
    const upperBound = typeof max === "number" ? Math.min(next, max) : next
    return Math.max(min, Math.floor(upperBound))
  }

  const canDecrease = !disabled && value > min
  const canIncrease = !disabled && (typeof max !== "number" || value < max)

  return (
    <div
      className="inline-flex items-stretch rounded border border-tb-line bg-tb-bg-card"
      data-testid="quantity-selector"
    >
      <button
        type="button"
        onClick={() => onChange(clamp(value - 1))}
        disabled={!canDecrease}
        aria-label={t("decreaseLength")}
        className={clx("w-10 text-lg leading-none text-tb-ink", {
          "opacity-30": !canDecrease,
        })}
        data-testid="quantity-decrease"
      >
        −
      </button>
      <label className="flex items-baseline gap-x-1 border-x border-tb-line px-3 py-2">
        <span className="sr-only">{t("lengthInMeters")}</span>
        <input
          type="number"
          inputMode="numeric"
          min={min}
          max={max}
          step={1}
          value={draft}
          disabled={disabled}
          onChange={(event) => setDraft(event.target.value)}
          onBlur={() => {
            const next = clamp(Number(draft))
            setDraft(String(next))
            onChange(next)
          }}
          className="w-10 bg-transparent text-center text-base text-tb-ink outline-none"
          data-testid="quantity-input"
        />
        <span className="mono text-xs text-tb-ink-3">{t("unitMeter")}</span>
      </label>
      <button
        type="button"
        onClick={() => onChange(clamp(value + 1))}
        disabled={!canIncrease}
        aria-label={t("increaseLength")}
        className={clx("w-10 text-lg leading-none text-tb-ink", {
          "opacity-30": !canIncrease,
        })}
        data-testid="quantity-increase"
      >
        +
      </button>
    </div>
  )
}

export default QuantitySelector
