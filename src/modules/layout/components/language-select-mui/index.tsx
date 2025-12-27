"use client"

import { useEffect, useMemo, useState, useTransition } from "react"
import {
  Select,
  MenuItem,
  FormControl,
  SelectChangeEvent,
  Box,
  Typography,
} from "@mui/material"
import ReactCountryFlag from "react-country-flag"
import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import { updateLocale } from "@lib/data/locale-actions"
import { Locale } from "@lib/data/locales"
import { normalizeLocale } from "@lib/util/normalize-locale"

type LanguageOption = {
  code: string
  name: string
  localizedName: string
  countryCode: string
}

const getCountryCodeFromLocale = (localeCode: string): string => {
  try {
    const locale = new Intl.Locale(localeCode)
    if (locale.region) {
      return locale.region.toUpperCase()
    }
    const maximized = locale.maximize()
    return maximized.region?.toUpperCase() ?? localeCode.toUpperCase()
  } catch {
    const parts = localeCode.split(/[-_]/)
    return parts.length > 1 ? parts[1].toUpperCase() : parts[0].toUpperCase()
  }
}

const getLocalizedLanguageName = (
  code: string,
  fallbackName: string,
  displayLocale: string = "en-US"
): string => {
  try {
    const displayNames = new Intl.DisplayNames([displayLocale], {
      type: "language",
    })
    return displayNames.of(code) ?? fallbackName
  } catch {
    return fallbackName
  }
}

type LanguageSelectMuiProps = {
  locales: Locale[]
  currentLocale: string | null
}

const LanguageSelectMui = ({
  locales,
  currentLocale,
}: LanguageSelectMuiProps) => {
  const [current, setCurrent] = useState<string>("")
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const t = useTranslations("common")

  const options = useMemo(() => {
    return locales.map((locale) => ({
      code: locale.code,
      name: locale.name,
      localizedName: getLocalizedLanguageName(
        locale.code,
        locale.name,
        currentLocale ?? "en-US"
      ),
      countryCode: getCountryCodeFromLocale(locale.code),
    }))
  }, [locales, currentLocale])

  useEffect(() => {
    if (currentLocale) {
      const normalizedCurrent = normalizeLocale(currentLocale)
      const option = options.find(
        (o) => normalizeLocale(o.code) === normalizedCurrent
      )
      if (option) {
        setCurrent(option.code)
      }
    }
  }, [options, currentLocale])

  const handleChange = (event: SelectChangeEvent<string>) => {
    const selectedCode = event.target.value
    const normalizedOptionCode = normalizeLocale(selectedCode || "")
    const normalizedCurrent = normalizeLocale(currentLocale || "")

    if (normalizedOptionCode === normalizedCurrent) {
      return
    }

    setCurrent(selectedCode)
    startTransition(async () => {
      try {
        await updateLocale(normalizedOptionCode)
        router.refresh()
      } catch (error) {
        console.error("Failed to update locale:", error)
      }
    })
  }

  const currentOption = options.find((o) => o.code === current)

  return (
    <FormControl 
      size="small" 
      sx={{ 
        minWidth: { xs: 100, sm: 120, md: 140 },
        width: { xs: "100%", sm: "auto" },
      }}
    >
      <Select
        value={current}
        onChange={handleChange}
        disabled={isPending}
        displayEmpty
        sx={{
          height: { xs: 32, sm: 36 },
          fontSize: { xs: "0.75rem", sm: "0.875rem" },
          "& .MuiSelect-select": {
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            py: 0.5,
            px: { xs: 1, sm: 1.5 },
          },
        }}
        renderValue={(value) => {
          if (!value) {
            return (
              <Typography variant="body2" color="text.secondary">
                {t("language")}
              </Typography>
            )
          }
          const option = options.find((o) => o.code === value)
          if (!option) return null
          return (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {option.countryCode && (
                <ReactCountryFlag
                  svg
                  style={{
                    width: "16px",
                    height: "16px",
                  }}
                  countryCode={option.countryCode}
                />
              )}
              <Typography variant="body2">
                {isPending ? "..." : option.localizedName}
              </Typography>
            </Box>
          )
        }}
      >
        {options.map((o) => (
          <MenuItem key={o.code} value={o.code}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {o.countryCode && (
                <ReactCountryFlag
                  svg
                  style={{
                    width: "16px",
                    height: "16px",
                  }}
                  countryCode={o.countryCode}
                />
              )}
              <Typography variant="body2">{o.localizedName}</Typography>
            </Box>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default LanguageSelectMui

