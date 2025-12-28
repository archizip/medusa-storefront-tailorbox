/**
 * Country names mapping for common fabric producing countries
 * ISO 3166-1 alpha-2 codes to localized country names
 */

export const countryNames: Record<string, {
  en: string
  fr: string
  uk: string
  ru: string
}> = {
  TR: { en: "Turkey", fr: "Turquie", uk: "Туреччина", ru: "Турция" },
  PT: { en: "Portugal", fr: "Portugal", uk: "Португалія", ru: "Португалия" },
  CN: { en: "China", fr: "Chine", uk: "Китай", ru: "Китай" },
  IN: { en: "India", fr: "Inde", uk: "Індія", ru: "Индия" },
  IT: { en: "Italy", fr: "Italie", uk: "Італія", ru: "Италия" },
  FR: { en: "France", fr: "France", uk: "Франція", ru: "Франция" },
  DE: { en: "Germany", fr: "Allemagne", uk: "Німеччина", ru: "Германия" },
  GB: { en: "United Kingdom", fr: "Royaume-Uni", uk: "Великобританія", ru: "Великобритания" },
  US: { en: "United States", fr: "États-Unis", uk: "США", ru: "США" },
  BD: { en: "Bangladesh", fr: "Bangladesh", uk: "Бангладеш", ru: "Бангладеш" },
  PK: { en: "Pakistan", fr: "Pakistan", uk: "Пакистан", ru: "Пакистан" },
  ES: { en: "Spain", fr: "Espagne", uk: "Іспанія", ru: "Испания" },
  PL: { en: "Poland", fr: "Pologne", uk: "Польща", ru: "Польша" },
  RO: { en: "Romania", fr: "Roumanie", uk: "Румунія", ru: "Румыния" },
  BG: { en: "Bulgaria", fr: "Bulgarie", uk: "Болгарія", ru: "Болгария" },
  UA: { en: "Ukraine", fr: "Ukraine", uk: "Україна", ru: "Украина" },
  BY: { en: "Belarus", fr: "Biélorussie", uk: "Білорусь", ru: "Беларусь" },
  CZ: { en: "Czech Republic", fr: "République tchèque", uk: "Чехія", ru: "Чехия" },
  SK: { en: "Slovakia", fr: "Slovaquie", uk: "Словаччина", ru: "Словакия" },
  HU: { en: "Hungary", fr: "Hongrie", uk: "Угорщина", ru: "Венгрия" },
  GR: { en: "Greece", fr: "Grèce", uk: "Греція", ru: "Греция" },
  NL: { en: "Netherlands", fr: "Pays-Bas", uk: "Нідерланди", ru: "Нидерланды" },
  BE: { en: "Belgium", fr: "Belgique", uk: "Бельгія", ru: "Бельгия" },
  AT: { en: "Austria", fr: "Autriche", uk: "Австрія", ru: "Австрия" },
  CH: { en: "Switzerland", fr: "Suisse", uk: "Швейцарія", ru: "Швейцария" },
  SE: { en: "Sweden", fr: "Suède", uk: "Швеція", ru: "Швеция" },
  DK: { en: "Denmark", fr: "Danemark", uk: "Данія", ru: "Дания" },
  NO: { en: "Norway", fr: "Norvège", uk: "Норвегія", ru: "Норвегия" },
  FI: { en: "Finland", fr: "Finlande", uk: "Фінляндія", ru: "Финляндия" },
  BR: { en: "Brazil", fr: "Brésil", uk: "Бразилія", ru: "Бразилия" },
  MX: { en: "Mexico", fr: "Mexique", uk: "Мексика", ru: "Мексика" },
  JP: { en: "Japan", fr: "Japon", uk: "Японія", ru: "Япония" },
  KR: { en: "South Korea", fr: "Corée du Sud", uk: "Південна Корея", ru: "Южная Корея" },
  TH: { en: "Thailand", fr: "Thaïlande", uk: "Таїланд", ru: "Таиланд" },
  VN: { en: "Vietnam", fr: "Vietnam", uk: "В'єтнам", ru: "Вьетнам" },
  ID: { en: "Indonesia", fr: "Indonésie", uk: "Індонезія", ru: "Индонезия" },
  MY: { en: "Malaysia", fr: "Malaisie", uk: "Малайзія", ru: "Малайзия" },
  EG: { en: "Egypt", fr: "Égypte", uk: "Єгипет", ru: "Египет" },
  MA: { en: "Morocco", fr: "Maroc", uk: "Марокко", ru: "Марокко" },
  TN: { en: "Tunisia", fr: "Tunisie", uk: "Туніс", ru: "Тунис" },
}

/**
 * Get localized country name by ISO code
 * @param isoCode - ISO 3166-1 alpha-2 country code (e.g., "TR", "PT")
 * @param locale - Locale code (en, fr, uk, ru)
 * @returns Localized country name or ISO code if not found
 */
export function getCountryName(isoCode: string | null | undefined, locale: string = "en"): string {
  if (!isoCode) return "-"
  
  const upperCode = isoCode.toUpperCase()
  const country = countryNames[upperCode]
  
  if (!country) {
    // If country not in our list, return the ISO code
    return upperCode
  }
  
  // Map locale to country name property
  const localeMap: Record<string, keyof typeof country> = {
    en: "en",
    fr: "fr",
    uk: "uk",
    ru: "ru",
  }
  
  const localeKey = localeMap[locale] || "en"
  return country[localeKey] || country.en
}

