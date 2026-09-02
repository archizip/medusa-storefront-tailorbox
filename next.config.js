const checkEnvVariables = require("./check-env-variables")
const createNextIntlPlugin = require("next-intl/plugin")

checkEnvVariables()

/**
 * Medusa Cloud-related environment variables
 */
const S3_HOSTNAME = process.env.MEDUSA_CLOUD_S3_HOSTNAME
const S3_PATHNAME = process.env.MEDUSA_CLOUD_S3_PATHNAME

/**
 * The Medusa backend can serve product images itself (the `local` file
 * provider stores them under `/static`), so its host has to be allowed in the
 * image optimizer as well.
 */
const MEDUSA_BACKEND_URL =
  process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || process.env.MEDUSA_BACKEND_URL

const backendRemotePattern = () => {
  if (!MEDUSA_BACKEND_URL) {
    return []
  }

  try {
    const { protocol, hostname, port } = new URL(MEDUSA_BACKEND_URL)

    return [
      {
        protocol: protocol.replace(":", ""),
        hostname,
        ...(port ? { port } : {}),
      },
    ]
  } catch {
    console.warn(`Invalid MEDUSA_BACKEND_URL: ${MEDUSA_BACKEND_URL}`)
    return []
  }
}

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts")

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  env: {
    // Needed in client components (cart dropdown thumbnails) to rewrite image
    // URLs the backend stored against localhost.
    ...(MEDUSA_BACKEND_URL
      ? { NEXT_PUBLIC_MEDUSA_BACKEND_URL: MEDUSA_BACKEND_URL }
      : {}),
  },
  images: {
    remotePatterns: [
      ...backendRemotePattern(),
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "medusa-public-images.s3.eu-west-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "medusa-server-testing.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "medusa-server-testing.s3.us-east-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "tailorbox-uploads-prod.s3.eu-west-3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      ...(S3_HOSTNAME && S3_PATHNAME
        ? [
            {
              protocol: "https",
              hostname: S3_HOSTNAME,
              pathname: S3_PATHNAME,
            },
          ]
        : []),
    ],
  },
}

module.exports = withNextIntl(nextConfig)
