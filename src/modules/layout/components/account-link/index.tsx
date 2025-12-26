"use client"

import { useTranslations } from '@lib/util/i18n'

export default function AccountLink() {
  const t = useTranslations('common')
  return <>{t('account')}</>
}

