"use client"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useTranslations } from "@lib/util/i18n"
import React from "react"

const Help = () => {
  const t = useTranslations("order")
  return (
    <div className="mt-6">
      <h3 className="text-base-semi text-tb-ink">{t("needHelp")}</h3>
      <div className="text-base-regular my-2">
        <ul className="gap-y-2 flex flex-col">
          <li>
            <LocalizedClientLink
              href="/contacts"
              className="text-tb-accent hover:text-tb-ink transition-colors"
            >
              {t("contactLink")}
            </LocalizedClientLink>
          </li>
          <li>
            <LocalizedClientLink
              href="/returns"
              className="text-tb-accent hover:text-tb-ink transition-colors"
            >
              {t("returnsExchanges")}
            </LocalizedClientLink>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Help
