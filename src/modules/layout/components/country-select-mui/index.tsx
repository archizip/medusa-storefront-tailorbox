"use client"

import { useEffect, useMemo, useState } from "react"
import {
  Select,
  MenuItem,
  FormControl,
  SelectChangeEvent,
  Box,
  Typography,
} from "@mui/material"
import ReactCountryFlag from "react-country-flag"
import { useParams, usePathname } from "next/navigation"
import { useTranslations } from "next-intl"
import { updateRegion } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"

type CountryOption = {
  country: string
  region: string
  label: string
}

type CountrySelectMuiProps = {
  regions: HttpTypes.StoreRegion[]
}

const CountrySelectMui = ({ regions }: CountrySelectMuiProps) => {
  const [current, setCurrent] = useState<string>("")
  const { countryCode } = useParams()
  const currentPath = usePathname().split(`/${countryCode}`)[1]
  const t = useTranslations("common")

  const options = useMemo(() => {
    return regions
      ?.map((r) => {
        return r.countries?.map((c) => ({
          country: c.iso_2,
          region: r.id,
          label: c.display_name,
        }))
      })
      .flat()
      .sort((a, b) => (a?.label ?? "").localeCompare(b?.label ?? ""))
  }, [regions])

  useEffect(() => {
    if (countryCode) {
      const option = options?.find((o) => o?.country === countryCode)
      if (option) {
        setCurrent(option.country)
      }
    }
  }, [options, countryCode])

  const handleChange = (event: SelectChangeEvent<string>) => {
    const selectedCountry = event.target.value
    const option = options?.find((o) => o.country === selectedCountry)
    if (option) {
      updateRegion(option.country, currentPath)
      setCurrent(selectedCountry)
    }
  }

  const currentOption = options?.find((o) => o.country === current)

  return (
    <FormControl 
      size="small" 
      sx={{ 
        minWidth: { xs: 120, sm: 140, md: 160 },
        width: { xs: "100%", sm: "auto" },
      }}
    >
      <Select
        value={current}
        onChange={handleChange}
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
                {t("selectCountry")}
              </Typography>
            )
          }
          const option = options?.find((o) => o.country === value)
          if (!option) return null
          return (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <ReactCountryFlag
                svg
                style={{
                  width: "16px",
                  height: "16px",
                }}
                countryCode={option.country}
              />
              <Typography variant="body2">{option.label}</Typography>
            </Box>
          )
        }}
      >
        <MenuItem value="" disabled>
          <Typography variant="body2" color="text.secondary">
            {t("selectCountry")}
          </Typography>
        </MenuItem>
        {options?.map((o, index) => (
          <MenuItem key={index} value={o.country}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <ReactCountryFlag
                svg
                style={{
                  width: "16px",
                  height: "16px",
                }}
                countryCode={o.country}
              />
              <Typography variant="body2">{o.label}</Typography>
            </Box>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default CountrySelectMui

