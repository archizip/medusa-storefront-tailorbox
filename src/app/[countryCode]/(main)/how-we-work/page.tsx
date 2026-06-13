import { Metadata } from "next"

import ContentPage from "@modules/content/templates/content-page"

export const metadata: Metadata = {
  title: "How we work",
}

export default function Page() {
  return <ContentPage pageKey="howWeWork" />
}
