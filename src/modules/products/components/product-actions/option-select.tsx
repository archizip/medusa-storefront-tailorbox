import { HttpTypes } from "@medusajs/types"
import { clx } from "@medusajs/ui"
import { useTranslations } from "@lib/util/i18n"
import React from "react"

type OptionSelectProps = {
  option: HttpTypes.StoreProductOption
  current: string | undefined
  updateOption: (title: string, value: string) => void
  title: string
  disabled: boolean
  "data-testid"?: string
}

const OptionSelect: React.FC<OptionSelectProps> = ({
  option,
  current,
  updateOption,
  title,
  "data-testid": dataTestId,
  disabled,
}) => {
  const t = useTranslations("product")
  const filteredOptions = (option.values ?? []).map((v) => v.value)

  return (
    <div className="flex flex-col gap-y-3">
      <span className="uppercase-label">
        {t("select")} {title}
      </span>
      <div
        className="flex flex-wrap justify-between gap-2"
        data-testid={dataTestId}
      >
        {filteredOptions.map((v) => {
          return (
            <button
              onClick={() => updateOption(option.id, v)}
              key={v}
              className={clx(
                "border bg-tb-bg-card text-small-regular h-10 rounded p-2 flex-1 transition-colors",
                {
                  "border-tb-ink text-tb-ink font-semibold": v === current,
                  "border-tb-line text-tb-ink-2 hover:border-tb-ink-4":
                    v !== current,
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
