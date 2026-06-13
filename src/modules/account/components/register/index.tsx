"use client"

import { useActionState } from "react"
import Input from "@modules/common/components/input"
import { useTranslations } from "@lib/util/i18n"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { signup } from "@lib/data/customer"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Register = ({ setCurrentView }: Props) => {
  const t = useTranslations("account")
  const tf = useTranslations("form")
  const [message, formAction] = useActionState(signup, null)

  return (
    <div
      className="max-w-sm flex flex-col items-center"
      data-testid="register-page"
    >
      <h1 className="serif text-3xl text-tb-ink mb-3">{t("createTitle")}</h1>
      <p className="text-center text-sm text-tb-ink-3 mb-6">
        {t("registerHint")}
      </p>
      <form className="w-full flex flex-col" action={formAction}>
        <div className="flex flex-col w-full gap-y-2">
          <Input
            label={tf("firstName")}
            name="first_name"
            required
            autoComplete="given-name"
            data-testid="first-name-input"
          />
          <Input
            label={tf("lastName")}
            name="last_name"
            required
            autoComplete="family-name"
            data-testid="last-name-input"
          />
          <Input
            label={tf("email")}
            name="email"
            required
            type="email"
            autoComplete="email"
            data-testid="email-input"
          />
          <Input
            label={tf("phone")}
            name="phone"
            type="tel"
            autoComplete="tel"
            data-testid="phone-input"
          />
          <Input
            label={t("password")}
            name="password"
            required
            type="password"
            autoComplete="new-password"
            data-testid="password-input"
          />
        </div>
        <ErrorMessage error={message} data-testid="register-error" />
        <span className="text-center text-tb-ink-3 text-sm mt-6">
          {t("agreePrefix")}{" "}
          <LocalizedClientLink
            href="/content/privacy-policy"
            className="text-tb-accent underline underline-offset-2 hover:text-tb-ink transition-colors"
          >
            {t("privacyPolicy")}
          </LocalizedClientLink>{" "}
          {t("and")}{" "}
          <LocalizedClientLink
            href="/content/terms-of-use"
            className="text-tb-accent underline underline-offset-2 hover:text-tb-ink transition-colors"
          >
            {t("termsOfUse")}
          </LocalizedClientLink>
          .
        </span>
        <SubmitButton className="w-full mt-6" data-testid="register-button">
          {t("join")}
        </SubmitButton>
      </form>
      <span className="text-center text-tb-ink-3 text-sm mt-6">
        {t("alreadyMember")}{" "}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
          className="text-tb-accent underline underline-offset-2 hover:text-tb-ink transition-colors"
        >
          {t("signIn")}
        </button>
      </span>
    </div>
  )
}

export default Register
