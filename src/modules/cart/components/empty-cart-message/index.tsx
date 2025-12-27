"use client"

import { Heading, Text } from "@medusajs/ui"
import { useTranslations } from "@lib/util/i18n"

import InteractiveLink from "@modules/common/components/interactive-link"

const EmptyCartMessage = () => {
  const t = useTranslations('cart')
  const tCommon = useTranslations('common')

  return (
    <div className="py-48 px-2 flex flex-col justify-center items-start" data-testid="empty-cart-message">
      <Heading
        level="h1"
        className="flex flex-row text-3xl-regular gap-x-2 items-baseline"
      >
        {t('emptyTitle')}
      </Heading>
      <Text className="text-base-regular mt-4 mb-6 max-w-[32rem]">
        {t('emptyDescription')}
      </Text>
      <div>
        <InteractiveLink href="/store">{tCommon('exploreProducts')}</InteractiveLink>
      </div>
    </div>
  )
}

export default EmptyCartMessage
