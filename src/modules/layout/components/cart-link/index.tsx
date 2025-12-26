"use client"

import { useTranslations } from '@lib/util/i18n'

export default function CartLink({ count }: { count?: number }) {
  const t = useTranslations('common')
  return <>{t('cart')} {count !== undefined ? `(${count})` : ''}</>
}

