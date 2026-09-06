import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter"
import { Analytics } from "@vercel/analytics/next"
import "styles/globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="uk" data-mode="light">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Manrope:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ background: "var(--bg)", color: "var(--ink)" }}>
        <AppRouterCacheProvider>
          <main className="relative">{props.children}</main>
        </AppRouterCacheProvider>
        <Analytics />
      </body>
    </html>
  )
}
