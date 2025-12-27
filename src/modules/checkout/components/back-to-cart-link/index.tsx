"use client"

import { useTranslations } from "@lib/util/i18n"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ChevronDown from "@modules/common/icons/chevron-down"

export default function BackToCartLink() {
  const t = useTranslations('checkout')

  return (
    <LocalizedClientLink
      href="/cart"
      className="text-small-semi text-ui-fg-base flex items-center gap-x-2 uppercase flex-1 basis-0"
      data-testid="back-to-cart-link"
    >
      <ChevronDown className="rotate-90" size={16} />
      <span className="mt-px hidden small:block txt-compact-plus text-ui-fg-subtle hover:text-ui-fg-base ">
        {t('backToCart')}
      </span>
      <span className="mt-px block small:hidden txt-compact-plus text-ui-fg-subtle hover:text-ui-fg-base">
        {t('back')}
      </span>
    </LocalizedClientLink>
  )
}

