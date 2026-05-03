import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter"
import "styles/globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light">
      <body>
        <AppRouterCacheProvider>
          <main className="relative">{props.children}</main>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
