import { Metadata } from "next"

import ContentPage from "@modules/content/templates/content-page"

export const metadata: Metadata = {
  title: "Shipping & payment",
}

export default function Page() {
  return <ContentPage pageKey="shipping" />
}
