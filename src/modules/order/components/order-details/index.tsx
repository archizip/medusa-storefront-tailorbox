"use client"

import { HttpTypes } from "@medusajs/types"
import { Text } from "@medusajs/ui"
import { useTranslations } from "@lib/util/i18n"

type OrderDetailsProps = {
  order: HttpTypes.StoreOrder
  showStatus?: boolean
}

const OrderDetails = ({ order, showStatus }: OrderDetailsProps) => {
  const t = useTranslations("order")

  const formatStatus = (str: string) => {
    const formatted = str.split("_").join(" ")

    return formatted.slice(0, 1).toUpperCase() + formatted.slice(1)
  }

  return (
    <div className="text-tb-ink-2">
      <Text>
        {t("confirmationSentTo")}{" "}
        <span className="text-tb-ink font-semibold" data-testid="order-email">
          {order.email}
        </span>
        .
      </Text>
      <Text className="mt-2">
        {t("orderDate")}{" "}
        <span data-testid="order-date">
          {new Date(order.created_at).toDateString()}
        </span>
      </Text>
      <Text className="mt-2 text-tb-accent">
        {t("orderNumber")}{" "}
        <span data-testid="order-id">{order.display_id}</span>
      </Text>

      <div className="flex items-center text-compact-small gap-x-4 mt-4">
        {showStatus && (
          <>
            <Text>
              {t("orderStatus")}{" "}
              <span className="text-tb-ink-3" data-testid="order-status">
                {formatStatus(order.fulfillment_status)}
              </span>
            </Text>
            <Text>
              {t("paymentStatus")}{" "}
              <span
                className="text-tb-ink-3"
                data-testid="order-payment-status"
              >
                {formatStatus(order.payment_status)}
              </span>
            </Text>
          </>
        )}
      </div>
    </div>
  )
}

export default OrderDetails
