import { cookies as nextCookies } from "next/headers"

import { getLocale } from "@lib/data/locale-actions"
import { getTranslations } from "@lib/util/i18n"
import CartTotals from "@modules/common/components/cart-totals"
import Help from "@modules/order/components/help"
import Items from "@modules/order/components/items"
import OnboardingCta from "@modules/order/components/onboarding-cta"
import OrderDetails from "@modules/order/components/order-details"
import ShippingDetails from "@modules/order/components/shipping-details"
import PaymentDetails from "@modules/order/components/payment-details"
import { HttpTypes } from "@medusajs/types"

type OrderCompletedTemplateProps = {
  order: HttpTypes.StoreOrder
}

export default async function OrderCompletedTemplate({
  order,
}: OrderCompletedTemplateProps) {
  const cookies = await nextCookies()
  const locale = (await getLocale()) || "uk"
  const t = await getTranslations(locale)

  const isOnboarding = cookies.get("_medusa_onboarding")?.value === "true"

  return (
    <div className="py-12 min-h-[calc(100vh-64px)]">
      <div className="content-container flex flex-col justify-center items-center gap-y-10 max-w-4xl h-full w-full">
        {isOnboarding && <OnboardingCta orderId={order.id} />}
        <div
          className="flex flex-col gap-4 max-w-4xl h-full w-full bg-tb-bg-card border border-tb-line-soft rounded px-6 small:px-10 py-10"
          data-testid="order-complete-container"
        >
          <h1 className="serif text-4xl text-tb-ink flex flex-col gap-y-2 mb-4">
            <span>{t("order.thankYou")}</span>
            <span>{t("order.placedSuccessfully")}</span>
          </h1>
          <OrderDetails order={order} />
          <h2 className="serif text-3xl text-tb-ink">{t("order.summary")}</h2>
          <Items order={order} />
          <CartTotals totals={order} />
          <ShippingDetails order={order} />
          <PaymentDetails order={order} />
          <Help />
        </div>
      </div>
    </div>
  )
}
