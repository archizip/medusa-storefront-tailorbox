import { Metadata } from "next"

import ContentPage from "@modules/content/templates/content-page"

export const metadata: Metadata = {
  title: "Journal",
}

export default function Page() {
  return <ContentPage pageKey="journal" />
}
