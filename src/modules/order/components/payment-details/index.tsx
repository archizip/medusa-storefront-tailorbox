"use client"

import { Container, Text } from "@medusajs/ui"

import { isStripeLike, paymentInfoMap } from "@lib/constants"
import Divider from "@modules/common/components/divider"
import { convertToLocale } from "@lib/util/money"
import { useTranslations } from "@lib/util/i18n"
import { HttpTypes } from "@medusajs/types"

type PaymentDetailsProps = {
  order: HttpTypes.StoreOrder
}

const PaymentDetails = ({ order }: PaymentDetailsProps) => {
  const t = useTranslations("order")
  const payment = order.payment_collections?.[0].payments?.[0]

  return (
    <div>
      <h2 className="serif text-3xl text-tb-ink my-6">{t("payment")}</h2>
      <div>
        {payment && (
          <div className="flex items-start gap-x-1 w-full">
            <div className="flex flex-col w-1/3">
              <Text className="txt-medium-plus text-tb-ink mb-1">
                {t("paymentMethod")}
              </Text>
              <Text
                className="txt-medium text-tb-ink-3"
                data-testid="payment-method"
              >
                {paymentInfoMap[payment.provider_id].title}
              </Text>
            </div>
            <div className="flex flex-col w-2/3">
              <Text className="txt-medium-plus text-tb-ink mb-1">
                {t("paymentDetails")}
              </Text>
              <div className="flex gap-2 txt-medium text-tb-ink-3 items-center">
                <Container className="flex items-center h-7 w-fit p-2 bg-tb-bg-deep">
                  {paymentInfoMap[payment.provider_id].icon}
                </Container>
                <Text data-testid="payment-amount">
                  {isStripeLike(payment.provider_id) && payment.data?.card_last4
                    ? `**** **** **** ${payment.data.card_last4}`
                    : `${convertToLocale({
                        amount: payment.amount,
                        currency_code: order.currency_code,
                      })} ${t("paidAt")} ${new Date(
                        payment.created_at ?? ""
                      ).toLocaleString()}`}
                </Text>
              </div>
            </div>
          </div>
        )}
      </div>

      <Divider className="mt-8 !border-tb-line-soft" />
    </div>
  )
}

export default PaymentDetails
