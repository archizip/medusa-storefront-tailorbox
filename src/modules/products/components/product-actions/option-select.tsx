"use client"

import { HttpTypes } from "@medusajs/types"
import { clx } from "@medusajs/ui"
import Image from "next/image"
import React from "react"

import { useTranslations } from "@lib/util/i18n"

type OptionSelectProps = {
  option: HttpTypes.StoreProductOption
  current: string | undefined
  updateOption: (title: string, value: string) => void
  title: string
  disabled: boolean
  /**
   * Option value → image URL. Swatch tiles are used only when *every* value has
   * an image; a partial set would mix tiles with unreadable text-in-a-tile, so
   * the whole option falls back to text pills instead.
   */
  swatches?: Record<string, string | undefined>
  "data-testid"?: string
}

const OptionSelect: React.FC<OptionSelectProps> = ({
  option,
  current,
  updateOption,
  title,
  "data-testid": dataTestId,
  disabled,
  swatches,
}) => {
  const t = useTranslations("product")
  const filteredOptions = (option.values ?? [])
    .map((v) => v.value)
    .filter((v): v is string => !!v)

  const hasSwatches =
    filteredOptions.length > 0 &&
    filteredOptions.every((value) => !!swatches?.[value])

  return (
    <div className="flex flex-col gap-y-3">
      <span className="uppercase-label">
        {t("select")} {title}
      </span>
      <div className="flex flex-wrap gap-2" data-testid={dataTestId}>
        {filteredOptions.map((v) => {
          const swatch = swatches?.[v]
          const isSelected = v === current

          if (hasSwatches) {
            return (
              <button
                key={v}
                type="button"
                onClick={() => updateOption(option.id, v)}
                disabled={disabled}
                title={v}
                aria-label={v}
                aria-pressed={isSelected}
                className={clx(
                  "relative h-12 w-12 overflow-hidden rounded border bg-tb-bg-deep transition-colors",
                  {
                    "border-tb-ink ring-1 ring-tb-ink": isSelected,
                    "border-tb-line hover:border-tb-ink-4": !isSelected,
                  }
                )}
                data-testid="option-swatch"
              >
                <Image
                  src={swatch!}
                  alt=""
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </button>
            )
          }

          return (
            <button
              key={v}
              type="button"
              onClick={() => updateOption(option.id, v)}
              aria-pressed={isSelected}
              className={clx(
                "border bg-tb-bg-card text-small-regular h-10 min-w-[72px] flex-1 rounded p-2 transition-colors",
                {
                  "border-tb-ink text-tb-ink font-semibold": isSelected,
                  "border-tb-line text-tb-ink-2 hover:border-tb-ink-4":
                    !isSelected,
                }
              )}
              disabled={disabled}
              data-testid="option-button"
            >
              {v}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default OptionSelect
