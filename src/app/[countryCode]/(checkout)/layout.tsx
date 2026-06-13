import { getLocale } from "@lib/data/locale-actions"
import { normalizeLocale } from "@lib/util/normalize-locale"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import MedusaCTA from "@modules/layout/components/medusa-cta"
import BackToCartLink from "@modules/checkout/components/back-to-cart-link"
import { NextIntlProvider } from "../../../components/next-intl-provider"
import { MuiThemeProvider } from "../../../components/mui-theme-provider"

export default async function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const rawLocale = await getLocale()
  const locale = normalizeLocale(rawLocale)

  const messages = await import(`../../../../messages/${locale}.json`)
    .catch(() => import(`../../../../messages/uk.json`))
    .then((mod) => mod.default)

  return (
    <MuiThemeProvider>
      <NextIntlProvider initialLocale={locale} initialMessages={messages}>
        <div className="w-full bg-tb-bg relative small:min-h-screen">
          <div className="h-16 bg-tb-bg-card border-b border-tb-line-soft">
            <nav className="flex h-full items-center content-container justify-between">
              <BackToCartLink />
              <LocalizedClientLink
                href="/"
                className="serif text-xl text-tb-ink hover:text-tb-accent transition-colors"
                data-testid="store-link"
              >
                TailorBox
              </LocalizedClientLink>
              <div className="flex-1 basis-0" />
            </nav>
          </div>
          <div className="relative" data-testid="checkout-container">
            {children}
          </div>
          <div className="py-4 w-full flex items-center justify-center">
            <MedusaCTA />
          </div>
        </div>
      </NextIntlProvider>
    </MuiThemeProvider>
  )
}
