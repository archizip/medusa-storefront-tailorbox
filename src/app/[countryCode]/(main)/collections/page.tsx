import { Metadata } from "next"

import { listCollections } from "@lib/data/collections"
import CollectionsIndex from "@modules/collections/templates/collections-index"

export const metadata: Metadata = {
  title: "Collections",
  description: "Browse all fabric collections.",
}

export default async function CollectionsPage() {
  const { collections } = await listCollections({
    fields: "id,title,handle",
  }).catch(() => ({ collections: [], count: 0 }))

  return <CollectionsIndex collections={collections} />
}
