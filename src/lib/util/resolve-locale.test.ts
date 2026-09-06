// @ts-nocheck — Node type-stripping requires a .ts import specifier.
import assert from "node:assert/strict"
import { describe, it } from "node:test"
import { resolveLocale } from "./resolve-locale.ts"

describe("resolveLocale", () => {
  it("prefers an explicit cookie over Accept-Language and country", () => {
    assert.equal(
      resolveLocale({
        cookieLocale: "uk",
        acceptLanguage: "fr-FR,fr;q=0.9",
        countryCode: "fr",
      }),
      "uk"
    )
  })

  it("canonicalizes cookie values like fr-FR", () => {
    assert.equal(
      resolveLocale({
        cookieLocale: "fr-FR",
        acceptLanguage: "uk",
        countryCode: "ua",
      }),
      "fr"
    )
  })

  it("ignores an unsupported cookie and uses Accept-Language", () => {
    assert.equal(
      resolveLocale({
        cookieLocale: "de",
        acceptLanguage: "fr-FR,fr;q=0.9,en;q=0.8",
        countryCode: "ua",
      }),
      "fr"
    )
  })

  it("picks the highest-q supported language from Accept-Language", () => {
    assert.equal(
      resolveLocale({
        acceptLanguage: "de-DE,de;q=0.9,fr;q=0.8,en;q=0.7",
      }),
      "fr"
    )
  })

  it("falls back to the country default when the browser language is unknown", () => {
    assert.equal(
      resolveLocale({
        acceptLanguage: "de-DE,de;q=0.9",
        countryCode: "fr",
      }),
      "fr"
    )
    assert.equal(
      resolveLocale({
        acceptLanguage: "de-DE",
        countryCode: "ua",
      }),
      "uk"
    )
  })

  it("defaults to uk when nothing matches", () => {
    assert.equal(resolveLocale({ acceptLanguage: "de-DE" }), "uk")
    assert.equal(resolveLocale({}), "uk")
  })
})
