"use client"

import repeat from "@lib/util/repeat"
import { useTranslations } from "@lib/util/i18n"
import { HttpTypes } from "@medusajs/types"
import { Table } from "@medusajs/ui"

import Item from "@modules/cart/components/item"
import SkeletonLineItem from "@modules/skeletons/components/skeleton-line-item"

type ItemsTemplateProps = {
  cart?: HttpTypes.StoreCart
}

const ItemsTemplate = ({ cart }: ItemsTemplateProps) => {
  const t = useTranslations("cart")
  const items = cart?.items
  return (
    <div>
      <div className="pb-3 flex items-center">
        <h1 className="serif text-3xl text-tb-ink">{t("title")}</h1>
      </div>
      <Table>
        <Table.Header className="border-t-0">
          <Table.Row className="text-tb-ink-3 txt-medium-plus !bg-transparent hover:!bg-transparent !border-tb-line-soft">
            <Table.HeaderCell className="!pl-0">{t("item")}</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell>{t("quantity")}</Table.HeaderCell>
            <Table.HeaderCell className="hidden small:table-cell">
              {t("price")}
            </Table.HeaderCell>
            <Table.HeaderCell className="!pr-0 text-right">
              {t("total")}
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {items
            ? items
                .sort((a, b) => {
                  return (a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1
                })
                .map((item) => {
                  return (
                    <Item
                      key={item.id}
                      item={item}
                      currencyCode={cart?.currency_code}
                    />
                  )
                })
            : repeat(5).map((i) => {
                return <SkeletonLineItem key={i} />
              })}
        </Table.Body>
      </Table>
    </div>
  )
}

export default ItemsTemplate
