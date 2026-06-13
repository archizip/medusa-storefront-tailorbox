import { login } from "@lib/data/customer"
import { useTranslations } from "@lib/util/i18n"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import Input from "@modules/common/components/input"
import { useActionState } from "react"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Login = ({ setCurrentView }: Props) => {
  const t = useTranslations("account")
  const tf = useTranslations("form")
  const [message, formAction] = useActionState(login, null)

  return (
    <div
      className="max-w-sm w-full flex flex-col items-center"
      data-testid="login-page"
    >
      <h1 className="serif text-3xl text-tb-ink mb-3">{t("welcomeBack")}</h1>
      <p className="text-center text-sm text-tb-ink-3 mb-8">
        {t("signInHint")}
      </p>
      <form className="w-full" action={formAction}>
        <div className="flex flex-col w-full gap-y-2">
          <Input
            label={tf("email")}
            name="email"
            type="email"
            title="Enter a valid email address."
            autoComplete="email"
            required
            data-testid="email-input"
          />
          <Input
            label={t("password")}
            name="password"
            type="password"
            autoComplete="current-password"
            required
            data-testid="password-input"
          />
        </div>
        <ErrorMessage error={message} data-testid="login-error-message" />
        <SubmitButton data-testid="sign-in-button" className="w-full mt-6">
          {t("signIn")}
        </SubmitButton>
      </form>
      <span className="text-center text-tb-ink-3 text-sm mt-6">
        {t("notMember")}{" "}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
          className="text-tb-accent underline underline-offset-2 hover:text-tb-ink transition-colors"
          data-testid="register-button"
        >
          {t("joinUs")}
        </button>
      </span>
    </div>
  )
}

export default Login
