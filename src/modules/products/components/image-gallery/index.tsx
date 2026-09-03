"use client"

import { HttpTypes } from "@medusajs/types"
import { clx } from "@medusajs/ui"
import Image from "next/image"
import { useEffect, useMemo, useState } from "react"

import { useTranslations } from "@lib/util/i18n"
import { resolveImageUrl } from "@lib/util/image-url"
import ChevronDown from "@modules/common/icons/chevron-down"
import PlaceholderImage from "@modules/common/icons/placeholder-image"

import GalleryLightbox from "./lightbox"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
  title: string
}

/**
 * One large image with previous/next controls and a thumbnail strip below.
 * Clicking the large image opens the fullscreen viewer.
 */
const ImageGallery = ({ images, title }: ImageGalleryProps) => {
  const t = useTranslations("product")
  const [index, setIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)

  const withUrl = useMemo(
    () =>
      images
        .map((image) => ({ ...image, url: resolveImageUrl(image.url) }))
        .filter(
          (image): image is typeof image & { url: string } => !!image.url
        ),
    [images]
  )

  // The variant picker swaps the image set through props, so `index` can point
  // past the end of a shorter set. Clamping has to happen during render: an
  // effect would run only after `withUrl[index]` had already been read.
  const safeIndex = withUrl.length ? Math.min(index, withUrl.length - 1) : 0

  // Keep the state itself in range too, so navigating back to a longer set does
  // not jump to a position the customer never selected.
  useEffect(() => {
    setIndex((current) => (current < withUrl.length ? current : 0))
  }, [withUrl.length])

  const step = (delta: number) => {
    if (withUrl.length < 2) return
    setIndex((current) => {
      const from = Math.min(current, withUrl.length - 1)
      return (from + delta + withUrl.length) % withUrl.length
    })
  }

  if (withUrl.length === 0) {
    return (
      <div
        className="relative aspect-[4/5] w-full overflow-hidden rounded border border-tb-line-soft bg-tb-bg-deep flex items-center justify-center text-tb-ink-4"
        data-testid="product-gallery-empty"
      >
        <PlaceholderImage size={40} />
      </div>
    )
  }

  const current = withUrl[safeIndex]

  return (
    <div className="flex flex-col gap-y-4" data-testid="product-gallery">
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsZoomed(true)}
          aria-label={t("openGallery")}
          className="relative block aspect-[4/5] w-full cursor-zoom-in overflow-hidden rounded border border-tb-line-soft bg-tb-bg-deep"
          data-testid="product-gallery-main"
        >
          <Image
            src={current.url}
            alt={`${title} — ${safeIndex + 1}`}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 640px"
            className="object-cover mix-blend-multiply"
          />
        </button>

        {withUrl.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label={t("previousImage")}
              className="btn btn-soft absolute left-3 top-1/2 h-9 w-9 -translate-y-1/2 !p-0"
              data-testid="product-gallery-prev"
            >
              <ChevronDown size={16} className="rotate-90" />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label={t("nextImage")}
              className="btn btn-soft absolute right-3 top-1/2 h-9 w-9 -translate-y-1/2 !p-0"
              data-testid="product-gallery-next"
            >
              <ChevronDown size={16} className="-rotate-90" />
            </button>
          </>
        )}
      </div>

      {withUrl.length > 1 && (
        <div className="flex gap-x-3 overflow-x-auto pb-1 no-scrollbar">
          {withUrl.map((image, i) => (
            <button
              key={image.id}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`${title} — ${i + 1}`}
              aria-current={i === safeIndex}
              className={clx(
                "relative h-20 w-20 shrink-0 overflow-hidden rounded border bg-tb-bg-deep transition-colors",
                {
                  "border-tb-ink": i === safeIndex,
                  "border-tb-line-soft hover:border-tb-ink-4": i !== safeIndex,
                }
              )}
              data-testid="product-gallery-thumbnail"
            >
              <Image
                src={image.url}
                alt=""
                fill
                sizes="80px"
                className="object-cover mix-blend-multiply"
              />
            </button>
          ))}
        </div>
      )}

      <GalleryLightbox
        images={withUrl}
        index={safeIndex}
        onIndexChange={setIndex}
        isOpen={isZoomed}
        close={() => setIsZoomed(false)}
        title={title}
      />
    </div>
  )
}

export default ImageGallery
