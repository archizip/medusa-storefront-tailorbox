"use client"

import ChevronDown from "@modules/common/icons/chevron-down"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { convertToLocale } from "@lib/util/money"
import { useTranslations } from "@lib/util/i18n"
import { HttpTypes } from "@medusajs/types"

type OverviewProps = {
  customer: HttpTypes.StoreCustomer | null
  orders: HttpTypes.StoreOrder[] | null
}

const Overview = ({ customer, orders }: OverviewProps) => {
  const t = useTranslations("account")

  return (
    <div data-testid="overview-page-wrapper" className="px-8">
      <div className="hidden small:block">
        <div className="flex justify-between items-center mb-4">
          <span
            className="serif text-2xl text-tb-ink"
            data-testid="welcome-message"
            data-value={customer?.first_name}
          >
            {t("helloName", { name: customer?.first_name ?? "" })}
          </span>
          <span className="text-sm text-tb-ink-3">
            {t("signedInAs")}{" "}
            <span
              className="font-semibold text-tb-ink"
              data-testid="customer-email"
              data-value={customer?.email}
            >
              {customer?.email}
            </span>
          </span>
        </div>
        <div className="flex flex-col py-8 border-t border-tb-line-soft">
          <div className="flex flex-col gap-y-4 h-full col-span-1 row-span-2 flex-1">
            <div className="flex items-start gap-x-16 mb-6">
              <div className="flex flex-col gap-y-4">
                <h3 className="text-large-semi text-tb-ink">{t("profile")}</h3>
                <div className="flex items-end gap-x-2">
                  <span
                    className="serif text-3xl leading-none text-tb-ink"
                    data-testid="customer-profile-completion"
                    data-value={getProfileCompletion(customer)}
                  >
                    {getProfileCompletion(customer)}%
                  </span>
                  <span className="uppercase text-base-regular text-tb-ink-3">
                    {t("completed")}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-y-4">
                <h3 className="text-large-semi text-tb-ink">
                  {t("addresses")}
                </h3>
                <div className="flex items-end gap-x-2">
                  <span
                    className="serif text-3xl leading-none text-tb-ink"
                    data-testid="addresses-count"
                    data-value={customer?.addresses?.length || 0}
                  >
                    {customer?.addresses?.length || 0}
                  </span>
                  <span className="uppercase text-base-regular text-tb-ink-3">
                    {t("saved")}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-y-4">
              <div className="flex items-center gap-x-2">
                <h3 className="text-large-semi text-tb-ink">
                  {t("recentOrders")}
                </h3>
              </div>
              <ul
                className="flex flex-col gap-y-4"
                data-testid="orders-wrapper"
              >
                {orders && orders.length > 0 ? (
                  orders.slice(0, 5).map((order) => {
                    return (
                      <li
                        key={order.id}
                        data-testid="order-wrapper"
                        data-value={order.id}
                      >
                        <LocalizedClientLink
                          href={`/account/orders/details/${order.id}`}
                        >
                          <div className="bg-tb-bg-deep border border-tb-line-soft rounded flex justify-between items-center p-4 hover:border-tb-ink-4 transition-colors">
                            <div className="grid grid-cols-3 grid-rows-2 text-small-regular gap-x-4 flex-1">
                              <span className="font-semibold text-tb-ink">
                                {t("datePlaced")}
                              </span>
                              <span className="font-semibold text-tb-ink">
                                {t("orderNumber")}
                              </span>
                              <span className="font-semibold text-tb-ink">
                                {t("totalAmount")}
                              </span>
                              <span data-testid="order-created-date">
                                {new Date(order.created_at).toDateString()}
                              </span>
                              <span
                                data-testid="order-id"
                                data-value={order.display_id}
                              >
                                #{order.display_id}
                              </span>
                              <span data-testid="order-amount">
                                {convertToLocale({
                                  amount: order.total,
                                  currency_code: order.currency_code,
                                })}
                              </span>
                            </div>
                            <button
                              className="flex items-center justify-between"
                              data-testid="open-order-button"
                            >
                              <span className="sr-only">
                                {t("goToOrder", { id: order.display_id ?? "" })}
                              </span>
                              <ChevronDown className="-rotate-90" />
                            </button>
                          </div>
                        </LocalizedClientLink>
                      </li>
                    )
                  })
                ) : (
                  <span
                    data-testid="no-orders-message"
                    className="text-tb-ink-3"
                  >
                    {t("noRecentOrders")}
                  </span>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const getProfileCompletion = (customer: HttpTypes.StoreCustomer | null) => {
  let count = 0

  if (!customer) {
    return 0
  }

  if (customer.email) {
    count++
  }

  if (customer.first_name && customer.last_name) {
    count++
  }

  if (customer.phone) {
    count++
  }

  const billingAddress = customer.addresses?.find(
    (addr) => addr.is_default_billing
  )

  if (billingAddress) {
    count++
  }

  return (count / 4) * 100
}

export default Overview
