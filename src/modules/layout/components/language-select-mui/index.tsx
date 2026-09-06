"use client"

import { useMemo, useState, useTransition } from "react"
import {
  Select,
  MenuItem,
  FormControl,
  SelectChangeEvent,
  Box,
  Typography,
} from "@mui/material"
import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import { updateLocale } from "@lib/data/locale-actions"
import { Locale } from "@lib/data/locales"
import { normalizeLocale } from "@lib/util/normalize-locale"

type LanguageSelectMuiProps = {
  locales: Locale[]
  currentLocale: string | null
  compact?: boolean
}

const LanguageSelectMui = ({
  locales,
  currentLocale,
  compact = false,
}: LanguageSelectMuiProps) => {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const t = useTranslations("common")

  const options = useMemo(
    () =>
      locales.map((locale) => ({
        code: normalizeLocale(locale.code),
        name: locale.name,
      })),
    [locales]
  )

  const selectedCode = useMemo(() => {
    const normalized = normalizeLocale(currentLocale)
    return options.some((o) => o.code === normalized)
      ? normalized
      : options[0]?.code ?? ""
  }, [currentLocale, options])

  const [optimistic, setOptimistic] = useState<string | null>(null)
  const current = optimistic ?? selectedCode

  const handleChange = (event: SelectChangeEvent<string>) => {
    const selected = normalizeLocale(event.target.value)
    if (selected === selectedCode) {
      return
    }

    setOptimistic(selected)
    startTransition(async () => {
      try {
        await updateLocale(selected)
        router.refresh()
      } catch (error) {
        console.error("Failed to update locale:", error)
        setOptimistic(null)
      }
    })
  }

  return (
    <FormControl
      size="small"
      sx={{
        minWidth: compact ? { xs: 88, sm: 110 } : { xs: 100, sm: 120, md: 140 },
        width: compact ? "auto" : { xs: "100%", sm: "auto" },
      }}
    >
      <Select
        value={current}
        onChange={handleChange}
        disabled={isPending}
        displayEmpty
        data-testid="language-select"
        inputProps={{ "aria-label": t("language") }}
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
          const option = options.find((o) => o.code === value)
          if (!option) {
            return (
              <Typography variant="body2" color="text.secondary">
                {t("language")}
              </Typography>
            )
          }
          return (
            <Typography variant="body2">
              {isPending ? "..." : option.name}
            </Typography>
          )
        }}
      >
        {options.map((o) => (
          <MenuItem
            key={o.code}
            value={o.code}
            data-testid={`language-option-${o.code}`}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="body2">{o.name}</Typography>
            </Box>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default LanguageSelectMui
