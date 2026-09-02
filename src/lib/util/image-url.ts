/**
 * Product images come from the Medusa backend as absolute URLs, built by the
 * file provider that uploaded them. The `local` file provider defaults to
 * `http://localhost:9000`, so images added through an admin whose backend has
 * no public `backend_url` (or no S3 provider) end up stored in the database as
 * `http://localhost:9000/static/<file>` — unreachable from a deployed
 * storefront.
 *
 * `resolveImageUrl` repoints such URLs at the backend the storefront actually
 * talks to, and hides them entirely when there is nothing sane to point at
 * (a public deployment with a loopback backend URL) so the UI can fall back to
 * its placeholder instead of rendering a broken image.
 */

const LOOPBACK_HOSTNAMES = [
  "localhost",
  "127.0.0.1",
  "0.0.0.0",
  "[::1]",
  "host.docker.internal",
]

const BACKEND_URL =
  process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || process.env.MEDUSA_BACKEND_URL

const isLoopbackHost = (hostname: string) =>
  LOOPBACK_HOSTNAMES.includes(hostname.toLowerCase())

const parseUrl = (url: string) => {
  try {
    return new URL(url)
  } catch {
    return null
  }
}

/**
 * True when the storefront itself is served from a public origin — in that
 * case a loopback image URL can never load for a visitor.
 */
const isPublicDeployment = () => {
  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    return true
  }

  const baseUrl = parseUrl(process.env.NEXT_PUBLIC_BASE_URL || "")

  return baseUrl ? !isLoopbackHost(baseUrl.hostname) : false
}

export const resolveImageUrl = (url?: string | null): string | undefined => {
  if (!url) {
    return undefined
  }

  const backendUrl = parseUrl(BACKEND_URL || "")

  // Backend-relative path (e.g. "/static/file.jpg")
  if (url.startsWith("/")) {
    return backendUrl ? new URL(url, backendUrl.origin).href : undefined
  }

  const imageUrl = parseUrl(url)

  if (!imageUrl) {
    return undefined
  }

  if (!isLoopbackHost(imageUrl.hostname)) {
    return url
  }

  // Stored against a loopback backend: repoint it at the configured backend.
  if (backendUrl && !isLoopbackHost(backendUrl.hostname)) {
    return new URL(imageUrl.pathname + imageUrl.search, backendUrl.origin).href
  }

  return isPublicDeployment() ? undefined : url
}
