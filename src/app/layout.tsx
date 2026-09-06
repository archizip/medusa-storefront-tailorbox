import { getBaseURL } from "@lib/util/env"
import { cookies, headers } from "next/headers"
import { Metadata } from "next"
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter"
import { Analytics } from "@vercel/analytics/next"
import { normalizeLocale } from "@lib/util/normalize-locale"
import {
  LOCALE_COOKIE_NAME,
  LOCALE_REQUEST_HEADER,
} from "@lib/util/resolve-locale"
import "styles/globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const headerStore = await headers()
  const locale = normalizeLocale(
    cookieStore.get(LOCALE_COOKIE_NAME)?.value ??
      headerStore.get(LOCALE_REQUEST_HEADER)
  )

  return (
    <html lang={locale} data-mode="light">
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
