"use client"

import { useLocale } from "next-intl"
import { useTranslations } from "@lib/util/i18n"
import { getCountryName } from "@lib/util/country-names"
import Back from "@modules/common/icons/back"
import FastDelivery from "@modules/common/icons/fast-delivery"
import Refresh from "@modules/common/icons/refresh"
import ReactCountryFlag from "react-country-flag"

import Accordion from "./accordion"
import { HttpTypes } from "@medusajs/types"

type ProductTabsProps = {
  product: HttpTypes.StoreProduct
}

const ProductTabs = ({ product }: ProductTabsProps) => {
  const t = useTranslations('product')
  const tabs = [
    {
      label: t('productInformation'),
      component: <ProductInfoTab product={product} />,
    },
    {
      label: t('shippingReturns'),
      component: <ShippingInfoTab />,
    },
  ]
  return (
    <div className="w-full">
      <Accordion type="multiple">
        {tabs.map((tab, i) => (
          <Accordion.Item
            key={i}
            title={tab.label}
            headingSize="medium"
            value={tab.label}
          >
            {tab.component}
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  )
}

const ProductInfoTab = ({ product }: ProductTabsProps) => {
  const t = useTranslations('product')
  const locale = useLocale()
  const normalizedLocale = locale.split('-')[0] || 'en' // Получаем базовый locale (en, fr, uk, ru)
  
  const countryCode = product.origin_country?.toUpperCase()
  const countryName = countryCode ? getCountryName(countryCode, normalizedLocale) : null
  
  return (
    <div className="text-small-regular py-8">
      <div className="grid grid-cols-2 gap-x-8">
        <div className="flex flex-col gap-y-4">
          <div>
            <span className="font-semibold">{t('material')}</span>
            <p>{product.material ? product.material : "-"}</p>
          </div>
          <div>
            <span className="font-semibold">{t('countryOfOrigin')}</span>
            {countryCode ? (
              <div className="flex items-center gap-x-2">
                <ReactCountryFlag
                  svg
                  style={{
                    width: "20px",
                    height: "20px",
                  }}
                  countryCode={countryCode}
                />
                <p>{countryName || countryCode}</p>
              </div>
            ) : (
              <p>-</p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-y-4">
          <div>
            <span className="font-semibold">{t('width')}</span>
            <p>{product.width ? `${product.width} cm` : "-"}</p>
          </div>
          <div>
            <span className="font-semibold">{t('type')}</span>
            <p>{product.type ? product.type.value : "-"}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

const ShippingInfoTab = () => {
  const t = useTranslations('product')
  return (
    <div className="text-small-regular py-8">
      <div className="grid grid-cols-1 gap-y-8">
        <div className="flex items-start gap-x-2">
          <FastDelivery />
          <div>
            <span className="font-semibold">{t('fastDelivery')}</span>
            <p className="max-w-sm">
              {t('fastDeliveryDescription')}
            </p>
          </div>
        </div>
        <div className="flex items-start gap-x-2">
          <Refresh />
          <div>
            <span className="font-semibold">{t('simpleExchanges')}</span>
            <p className="max-w-sm">
              {t('simpleExchangesDescription')}
            </p>
          </div>
        </div>
        <div className="flex items-start gap-x-2">
          <Back />
          <div>
            <span className="font-semibold">{t('easyReturns')}</span>
            <p className="max-w-sm">
              {t('easyReturnsDescription')}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductTabs
