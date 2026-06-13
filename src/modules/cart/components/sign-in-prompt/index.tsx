"use client"

import { Button, Text } from "@medusajs/ui"
import { useTranslations } from "@lib/util/i18n"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const SignInPrompt = () => {
  const t = useTranslations("checkout")

  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="serif text-2xl text-tb-ink">
          {t("alreadyHaveAccount")}
        </h2>
        <Text className="txt-medium text-tb-ink-3 mt-2">
          {t("signInForExperience")}
        </Text>
      </div>
      <div>
        <LocalizedClientLink href="/account">
          <Button
            variant="secondary"
            className="h-10"
            data-testid="sign-in-button"
          >
            {t("signIn")}
          </Button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default SignInPrompt
