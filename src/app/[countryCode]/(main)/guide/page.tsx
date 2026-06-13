import { Metadata } from "next"

import ContentPage from "@modules/content/templates/content-page"

export const metadata: Metadata = {
  title: "Fabric guide",
}

export default function Page() {
  return <ContentPage pageKey="guide" />
}
