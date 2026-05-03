import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import CategoriesGrid from "@modules/home/components/categories-grid"
import FabricTypesQuickNav from "@modules/home/components/fabric-types-nav"
import TrustBadges from "@modules/home/components/trust-badges"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"

export const metadata: Metadata = {
  title: "TailorBox — Ткани для шитья и декора",
  description:
    "Широкий выбор натуральных и качественных тканей: хлопок, лён, шёлк, шерсть. Быстрая доставка, лёгкий возврат, экспертная помощь в выборе.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params
  const { countryCode } = params

  const region = await getRegion(countryCode)

  const { collections } = await listCollections({
    fields: "id, handle, title",
  })

  if (!collections || !region) {
    return null
  }

  return (
    <>
      <Hero />
      <FabricTypesQuickNav />
      <CategoriesGrid />
      <TrustBadges />
      <FeaturedProducts collections={collections} region={region} />
    </>
  )
}
