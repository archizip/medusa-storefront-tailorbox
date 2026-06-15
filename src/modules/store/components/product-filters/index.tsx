"use client"

import { useMemo, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { HttpTypes } from "@medusajs/types"

import ProductPreview from "@modules/products/components/product-preview"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useTranslations } from "@lib/util/i18n"
import { buildCategoryTree, CategoryTreeNode } from "@lib/util/category-tree"
import { getProductPrice } from "@lib/util/get-product-price"

type SortKey = "created_at" | "price_asc" | "price_desc"

type Props = {
  products: HttpTypes.StoreProduct[]
  region: HttpTypes.StoreRegion
  categories: HttpTypes.StoreProductCategory[]
  currentCategory?: string
}

const THEME_KEYS: Record<string, string> = {
  "print-geometric": "geometric",
  "print-polka-dot": "polkaDot",
  "print-stripes": "stripes",
  "print-animals": "animals",
  "print-cat": "cat",
}

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")

const priceOf = (p: HttpTypes.StoreProduct): number | null => {
  try {
    return (
      getProductPrice({ product: p }).cheapestPrice?.calculated_price_number ??
      null
    )
  } catch {
    return null
  }
}

const inStockOf = (p: HttpTypes.StoreProduct): boolean =>
  (p.variants ?? []).some(
    (v) => v.inventory_quantity == null || v.inventory_quantity > 0
  )

const optionValues = (p: HttpTypes.StoreProduct, title: string): string[] =>
  (p.options ?? [])
    .filter((o) => (o.title ?? "").toLowerCase() === title.toLowerCase())
    .flatMap(
      (o) => (o.values ?? []).map((v) => v.value).filter(Boolean) as string[]
    )

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width={12}
      height={12}
      viewBox="0 0 12 12"
      style={{
        transition: "transform 0.15s",
        transform: open ? "rotate(180deg)" : "none",
      }}
    >
      <path
        d="M2 4 L6 8 L10 4"
        stroke="currentColor"
        strokeWidth="1.4"
        fill="none"
      />
    </svg>
  )
}

function FilterSection({
  title,
  children,
  defaultOpen = true,
}: {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div style={{ borderTop: "1px solid var(--line-soft)", padding: "16px 0" }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
          color: "var(--ink)",
          fontSize: 14,
          fontWeight: 600,
        }}
      >
        {title}
        <Chevron open={open} />
      </button>
      {open && <div style={{ marginTop: 14 }}>{children}</div>}
    </div>
  )
}

function CheckRow({
  label,
  count,
  checked,
  onChange,
}: {
  label: string
  count?: number
  checked: boolean
  onChange: () => void
}) {
  return (
    <label
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        cursor: "pointer",
        fontSize: 14,
        color: "var(--ink-2)",
        padding: "2px 0",
      }}
    >
      <span
        style={{
          width: 16,
          height: 16,
          borderRadius: 3,
          border: `1.5px solid ${checked ? "var(--accent)" : "var(--line)"}`,
          background: checked ? "var(--accent)" : "transparent",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {checked && (
          <svg width={10} height={10} viewBox="0 0 10 10">
            <path
              d="M1.5 5 L4 7.5 L8.5 2.5"
              stroke="#fff"
              strokeWidth="1.6"
              fill="none"
            />
          </svg>
        )}
      </span>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        style={{ position: "absolute", opacity: 0, width: 0, height: 0 }}
      />
      <span style={{ flex: 1 }}>{label}</span>
      {count != null && (
        <span style={{ color: "var(--ink-4)", fontSize: 12 }}>{count}</span>
      )}
    </label>
  )
}

function CategoryNodes({
  nodes,
  currentCategory,
  nested = false,
}: {
  nodes: CategoryTreeNode[]
  currentCategory?: string
  nested?: boolean
}) {
  return (
    <ul
      style={{
        listStyle: "none",
        margin: 0,
        padding: 0,
        display: "flex",
        flexDirection: "column",
        gap: 8,
        ...(nested
          ? {
              marginTop: 8,
              marginLeft: 6,
              paddingLeft: 12,
              borderLeft: "1px solid var(--line-soft)",
            }
          : {}),
      }}
    >
      {nodes.map((node) => {
        const active = currentCategory === node.category.handle
        return (
          <li key={node.category.id}>
            <LocalizedClientLink
              href={`/categories/${node.category.handle}`}
              style={{
                fontSize: 14,
                color: active ? "var(--ink)" : "var(--ink-2)",
                fontWeight: active ? 600 : 400,
              }}
            >
              {node.category.name}
            </LocalizedClientLink>
            {node.children.length > 0 && (
              <CategoryNodes
                nodes={node.children}
                currentCategory={currentCategory}
                nested
              />
            )}
          </li>
        )
      })}
    </ul>
  )
}

export default function ProductFilters({
  products,
  region,
  categories,
  currentCategory,
}: Props) {
  const t = useTranslations("store")
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [showSidebar, setShowSidebar] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [sortOpen, setSortOpen] = useState(false)

  const categoryRoots = useMemo(
    () => buildCategoryTree(categories),
    [categories]
  )

  // Distinct product-option titles present in the data (e.g. Material, Density),
  // Material first, Density second, then anything else.
  const optionTitles = useMemo(() => {
    const set = new Set<string>()
    products.forEach((p) =>
      (p.options ?? []).forEach((o) => o.title && set.add(o.title))
    )
    const order = (title: string) => {
      const l = title.toLowerCase()
      if (l === "material") return 0
      if (l === "density") return 1
      return 2
    }
    return Array.from(set).sort((a, b) => order(a) - order(b))
  }, [products])

  const themeValues = useMemo(() => {
    const set = new Set<string>()
    products.forEach((p) =>
      (p.tags ?? []).forEach((tag) => tag.value && set.add(tag.value))
    )
    return Array.from(set).sort()
  }, [products])

  const sel = (key: string) =>
    (searchParams.get(key) ?? "").split(",").filter(Boolean)

  const sortBy = (searchParams.get("sortBy") as SortKey) || "created_at"
  const minPrice = searchParams.get("minPrice")
    ? Number(searchParams.get("minPrice"))
    : null
  const maxPrice = searchParams.get("maxPrice")
    ? Number(searchParams.get("maxPrice"))
    : null
  const inStock = searchParams.get("inStock") === "1"

  const setParams = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString())
    Object.entries(updates).forEach(([k, v]) => {
      if (v == null || v === "") params.delete(k)
      else params.set(k, v)
    })
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const toggleCsv = (key: string, value: string) => {
    const cur = sel(key)
    const next = cur.includes(value)
      ? cur.filter((x) => x !== value)
      : [...cur, value]
    setParams({ [key]: next.join(",") || null })
  }

  const activeFilterCount =
    sel("theme").length +
    (inStock ? 1 : 0) +
    (minPrice != null || maxPrice != null ? 1 : 0) +
    optionTitles.reduce((acc, title) => acc + sel(`f_${slug(title)}`).length, 0)

  const clearAll = () =>
    setParams({
      theme: null,
      inStock: null,
      minPrice: null,
      maxPrice: null,
      ...Object.fromEntries(optionTitles.map((tl) => [`f_${slug(tl)}`, null])),
    })

  const themeLabel = (value: string) => {
    const key = THEME_KEYS[value]
    if (key) return t(`themes.${key}`)
    return value.replace(/^print-/, "").replace(/-/g, " ")
  }

  const optionValueLabel = (title: string, value: string) =>
    title.toLowerCase() === "density" ? `${value} ${t("densityUnit")}` : value

  const countWith = (predicate: (p: HttpTypes.StoreProduct) => boolean) =>
    products.filter(predicate).length

  const filtered = useMemo(() => {
    const result = products.filter((p) => {
      if (inStock && !inStockOf(p)) return false
      const price = priceOf(p)
      if (minPrice != null && (price == null || price < minPrice)) return false
      if (maxPrice != null && (price == null || price > maxPrice)) return false
      const themes = sel("theme")
      if (
        themes.length &&
        !(p.tags ?? []).some((tag) => tag.value && themes.includes(tag.value))
      )
        return false
      for (const title of optionTitles) {
        const chosen = sel(`f_${slug(title)}`)
        if (chosen.length) {
          const vals = optionValues(p, title)
          if (!vals.some((v) => chosen.includes(v))) return false
        }
      }
      return true
    })

    if (sortBy === "price_asc") {
      result.sort((a, b) => (priceOf(a) ?? Infinity) - (priceOf(b) ?? Infinity))
    } else if (sortBy === "price_desc") {
      result.sort(
        (a, b) => (priceOf(b) ?? -Infinity) - (priceOf(a) ?? -Infinity)
      )
    }
    return result
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products, searchParams, optionTitles, sortBy])

  const sortOptions: { value: SortKey; label: string }[] = [
    { value: "created_at", label: t("sortLatest") },
    { value: "price_asc", label: t("sortPriceAsc") },
    { value: "price_desc", label: t("sortPriceDesc") },
  ]

  const sidebar = (
    <div>
      {categoryRoots.length > 0 && (
        <FilterSection title={t("categories")}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <LocalizedClientLink
              href="/store"
              style={{
                fontSize: 14,
                color: !currentCategory ? "var(--ink)" : "var(--ink-2)",
                fontWeight: !currentCategory ? 600 : 400,
              }}
            >
              {t("allCategories")}
            </LocalizedClientLink>
            <CategoryNodes
              nodes={categoryRoots}
              currentCategory={currentCategory}
            />
          </div>
        </FilterSection>
      )}

      {themeValues.length > 0 && (
        <FilterSection title={t("theme")}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {themeValues.map((value) => (
              <CheckRow
                key={value}
                label={themeLabel(value)}
                count={countWith((p) =>
                  (p.tags ?? []).some((tag) => tag.value === value)
                )}
                checked={sel("theme").includes(value)}
                onChange={() => toggleCsv("theme", value)}
              />
            ))}
          </div>
        </FilterSection>
      )}

      {optionTitles.map((title) => {
        const values = Array.from(
          new Set(products.flatMap((p) => optionValues(p, title)))
        ).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
        if (!values.length) return null
        const key = `f_${slug(title)}`
        const label =
          title.toLowerCase() === "material"
            ? t("material")
            : title.toLowerCase() === "density"
            ? t("density")
            : title
        return (
          <FilterSection key={title} title={label}>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {values.map((value) => (
                <CheckRow
                  key={value}
                  label={optionValueLabel(title, value)}
                  count={countWith((p) =>
                    optionValues(p, title).includes(value)
                  )}
                  checked={sel(key).includes(value)}
                  onChange={() => toggleCsv(key, value)}
                />
              ))}
            </div>
          </FilterSection>
        )
      })}

      <FilterSection title={t("price")}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <input
            type="number"
            inputMode="numeric"
            placeholder={t("priceFrom")}
            defaultValue={minPrice ?? ""}
            onBlur={(e) =>
              setParams({ minPrice: e.target.value.trim() || null })
            }
            className="tb-input"
            style={{ width: "100%", borderRadius: 4, fontSize: 14 }}
          />
          <span style={{ color: "var(--ink-4)" }}>—</span>
          <input
            type="number"
            inputMode="numeric"
            placeholder={t("priceTo")}
            defaultValue={maxPrice ?? ""}
            onBlur={(e) =>
              setParams({ maxPrice: e.target.value.trim() || null })
            }
            className="tb-input"
            style={{ width: "100%", borderRadius: 4, fontSize: 14 }}
          />
        </div>
      </FilterSection>

      <FilterSection title={t("inStockOnly")} defaultOpen={false}>
        <CheckRow
          label={t("inStockOnly")}
          checked={inStock}
          onChange={() => setParams({ inStock: inStock ? null : "1" })}
        />
      </FilterSection>

      {activeFilterCount > 0 && (
        <button
          onClick={clearAll}
          className="mono"
          style={{
            marginTop: 16,
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--accent)",
            fontSize: 12,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            padding: 0,
          }}
        >
          {t("clearAll")} ({activeFilterCount})
        </button>
      )}
    </div>
  )

  return (
    <div>
      {/* Controls bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          paddingBottom: 16,
          borderBottom: "1px solid var(--line-soft)",
          marginBottom: 24,
        }}
      >
        <div style={{ fontSize: 14, color: "var(--ink-3)" }}>
          {filtered.length} {t("resultsLabel")}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {/* Desktop: hide/show filters */}
          <button
            onClick={() => setShowSidebar((s) => !s)}
            className="btn-ghost hidden small:inline-flex"
            style={{
              alignItems: "center",
              gap: 8,
              fontSize: 14,
              borderRadius: 999,
              padding: "8px 14px",
              color: "var(--ink)",
            }}
          >
            {showSidebar ? t("hideFilters") : t("showFilters")}
            <svg width={16} height={16} viewBox="0 0 16 16" fill="none">
              <path
                d="M2 4 H14 M4 8 H12 M6 12 H10"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </svg>
          </button>

          {/* Mobile: open filters drawer */}
          <button
            onClick={() => setMobileOpen(true)}
            className="btn-ghost inline-flex small:hidden"
            style={{
              alignItems: "center",
              gap: 8,
              fontSize: 14,
              borderRadius: 999,
              padding: "8px 14px",
              color: "var(--ink)",
            }}
          >
            {t("filters")}
            {activeFilterCount > 0 && ` (${activeFilterCount})`}
            <svg width={16} height={16} viewBox="0 0 16 16" fill="none">
              <path
                d="M2 4 H14 M4 8 H12 M6 12 H10"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </svg>
          </button>

          {/* Sort */}
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setSortOpen((o) => !o)}
              className="btn-ghost"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontSize: 14,
                borderRadius: 999,
                padding: "8px 14px",
                color: "var(--ink)",
              }}
            >
              {t("sortBy")}
              <Chevron open={sortOpen} />
            </button>
            {sortOpen && (
              <>
                <div
                  onClick={() => setSortOpen(false)}
                  style={{ position: "fixed", inset: 0, zIndex: 39 }}
                />
                <div
                  className="fade-in"
                  style={{
                    position: "absolute",
                    top: "calc(100% + 4px)",
                    right: 0,
                    background: "var(--bg-card)",
                    border: "1px solid var(--line)",
                    borderRadius: 4,
                    boxShadow: "0 12px 40px rgba(31,26,20,0.08)",
                    padding: 6,
                    minWidth: 220,
                    zIndex: 40,
                  }}
                >
                  {sortOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => {
                        setParams({
                          sortBy: opt.value === "created_at" ? null : opt.value,
                        })
                        setSortOpen(false)
                      }}
                      style={{
                        display: "block",
                        width: "100%",
                        textAlign: "left",
                        background:
                          sortBy === opt.value ? "var(--bg-deep)" : "none",
                        border: "none",
                        cursor: "pointer",
                        padding: "8px 12px",
                        borderRadius: 3,
                        fontSize: 14,
                        color: "var(--ink)",
                      }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Body: sidebar + grid */}
      <div
        style={{
          display: "flex",
          gap: 40,
          alignItems: "flex-start",
        }}
      >
        {showSidebar && (
          <aside
            className="hidden small:block"
            style={{ width: 250, flexShrink: 0 }}
          >
            {sidebar}
          </aside>
        )}
        <div style={{ flex: 1, minWidth: 0, width: "100%" }}>
          {filtered.length === 0 ? (
            <div
              style={{
                padding: "80px 0",
                textAlign: "center",
                color: "var(--ink-3)",
              }}
            >
              {t("noProducts")}
            </div>
          ) : (
            <ul
              className="grid grid-cols-2 small:grid-cols-3 medium:grid-cols-4 gap-x-6 gap-y-8"
              data-testid="products-list"
            >
              {filtered.map((p) => (
                <li key={p.id}>
                  <ProductPreview product={p} region={region} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div
          className="small:hidden"
          style={{ position: "fixed", inset: 0, zIndex: 60 }}
        >
          <div
            onClick={() => setMobileOpen(false)}
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(31,26,20,0.4)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              width: "85%",
              maxWidth: 360,
              background: "var(--bg-card)",
              overflowY: "auto",
              padding: "20px 20px 40px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 8,
              }}
            >
              <div
                className="serif"
                style={{ fontSize: 22, color: "var(--ink)" }}
              >
                {t("filters")}
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="btn-ghost"
                style={{ borderRadius: 999, padding: "6px 10px" }}
                aria-label="close"
              >
                <svg width={18} height={18} viewBox="0 0 18 18">
                  <path
                    d="M4 4 L14 14 M14 4 L4 14"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              </button>
            </div>
            {sidebar}
          </div>
        </div>
      )}
    </div>
  )
}
