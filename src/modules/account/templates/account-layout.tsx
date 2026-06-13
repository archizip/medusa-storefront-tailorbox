"use client"

import React from "react"

import { ArrowUpRightMini } from "@medusajs/icons"
import { useTranslations } from "@lib/util/i18n"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

import AccountNav from "../components/account-nav"
import { HttpTypes } from "@medusajs/types"

interface AccountLayoutProps {
  customer: HttpTypes.StoreCustomer | null
  children: React.ReactNode
}

const AccountLayout: React.FC<AccountLayoutProps> = ({
  customer,
  children,
}) => {
  const t = useTranslations("account")

  return (
    <div className="flex-1 small:py-12" data-testid="account-page">
      <div className="flex-1 content-container h-full max-w-5xl mx-auto bg-tb-bg-card border border-tb-line-soft rounded flex flex-col">
        {customer ? (
          <div className="grid grid-cols-1 small:grid-cols-[240px_1fr] py-12">
            <div>
              <AccountNav customer={customer} />
            </div>
            <div className="flex-1">{children}</div>
          </div>
        ) : (
          <div className="py-12">{children}</div>
        )}
        <div className="flex flex-col small:flex-row items-end justify-between small:border-t border-tb-line-soft py-12 gap-8 px-8">
          <div>
            <h3 className="serif text-2xl text-tb-ink mb-3">
              {t("gotQuestions")}
            </h3>
            <span className="text-sm text-tb-ink-3">
              {t("gotQuestionsText")}
            </span>
          </div>
          <div>
            <LocalizedClientLink
              href="/customer-service"
              className="flex gap-x-1 items-center group text-tb-accent hover:text-tb-ink transition-colors"
            >
              <span>{t("customerService")}</span>
              <ArrowUpRightMini className="group-hover:rotate-45 ease-in-out duration-150" />
            </LocalizedClientLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountLayout
