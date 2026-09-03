import { getTranslations } from "next-intl/server"

import Back from "@modules/common/icons/back"
import FastDelivery from "@modules/common/icons/fast-delivery"
import Lock from "@modules/common/icons/lock"
import Package from "@modules/common/icons/package"

/**
 * Delivery and reassurance block under the add-to-cart button. The reference
 * shop also offers in-store pickup; this catalogue has no store data, so only
 * shipping and the returns/payment guarantees are shown.
 */
const ProductServiceBox = async () => {
  const t = await getTranslations("product.service")

  const badges = [
    { key: "returns", icon: <Back /> },
    { key: "payment", icon: <Lock /> },
    { key: "care", icon: <Package /> },
  ]

  return (
    <div
      className="flex flex-col divide-y divide-tb-line-soft rounded border border-tb-line-soft bg-tb-bg-card text-xs"
      data-testid="product-service-box"
    >
      <div className="flex items-start gap-x-3 p-4">
        <span className="mt-0.5 text-tb-ink-3">
          <FastDelivery />
        </span>
        <div className="flex flex-col gap-y-1">
          <span className="uppercase-label">{t("deliveryTitle")}</span>
          <span className="text-tb-ink-2">{t("deliveryLeadTime")}</span>
          <span className="text-tb-ink-3">{t("deliveryNote")}</span>
        </div>
      </div>

      <ul className="grid grid-cols-1 gap-3 p-4 small:grid-cols-3">
        {badges.map((badge) => (
          <li
            key={badge.key}
            className="flex items-center gap-x-2 text-tb-ink-2"
          >
            <span className="text-tb-ink-3">{badge.icon}</span>
            {t(`badges.${badge.key}`)}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ProductServiceBox
