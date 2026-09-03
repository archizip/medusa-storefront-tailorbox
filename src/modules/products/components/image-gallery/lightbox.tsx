"use client"

import { Dialog, Transition } from "@headlessui/react"
import { clx } from "@medusajs/ui"
import Image from "next/image"
import { Fragment, useCallback, useEffect, useState } from "react"

import { useTranslations } from "@lib/util/i18n"
import X from "@modules/common/icons/x"

const MIN_ZOOM = 1
const MAX_ZOOM = 3
const ZOOM_STEP = 0.5

type GalleryLightboxProps = {
  images: { id: string; url: string }[]
  index: number
  onIndexChange: (index: number) => void
  isOpen: boolean
  close: () => void
  title: string
}

/**
 * Fullscreen image viewer: zoom controls, a thumbnail strip and keyboard
 * navigation. Headless UI's `Dialog` provides the focus trap and closes on
 * Escape; the arrow keys are wired up here.
 */
const GalleryLightbox = ({
  images,
  index,
  onIndexChange,
  isOpen,
  close,
  title,
}: GalleryLightboxProps) => {
  const t = useTranslations("product")
  const [zoom, setZoom] = useState(MIN_ZOOM)

  const current = images[index]

  // Reset the zoom whenever the viewer opens or a different image is shown, so
  // a zoomed-in state is never carried over to the next picture.
  useEffect(() => {
    setZoom(MIN_ZOOM)
  }, [index, isOpen])

  const step = useCallback(
    (delta: number) => {
      if (images.length < 2) return
      onIndexChange((index + delta + images.length) % images.length)
    },
    [images.length, index, onIndexChange]
  )

  useEffect(() => {
    if (!isOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") step(1)
      if (event.key === "ArrowLeft") step(-1)
      if (event.key === "+" || event.key === "=") {
        setZoom((z) => Math.min(MAX_ZOOM, z + ZOOM_STEP))
      }
      if (event.key === "-") {
        setZoom((z) => Math.max(MIN_ZOOM, z - ZOOM_STEP))
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [isOpen, step])

  if (!current) {
    return null
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[80]" onClose={close}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-tb-bg-card" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Dialog.Panel
            className="fixed inset-0 flex flex-col"
            data-testid="gallery-lightbox"
          >
            <Dialog.Title className="sr-only">{title}</Dialog.Title>

            {/* Zoom controls */}
            <div className="absolute left-3 top-3 z-10 flex flex-col gap-y-1">
              <button
                type="button"
                onClick={() =>
                  setZoom((z) => Math.min(MAX_ZOOM, z + ZOOM_STEP))
                }
                disabled={zoom >= MAX_ZOOM}
                aria-label={t("zoomIn")}
                className="btn btn-soft h-9 w-9 !p-0 disabled:opacity-40"
                data-testid="lightbox-zoom-in"
              >
                +
              </button>
              <button
                type="button"
                onClick={() =>
                  setZoom((z) => Math.max(MIN_ZOOM, z - ZOOM_STEP))
                }
                disabled={zoom <= MIN_ZOOM}
                aria-label={t("zoomOut")}
                className="btn btn-soft h-9 w-9 !p-0 disabled:opacity-40"
                data-testid="lightbox-zoom-out"
              >
                −
              </button>
            </div>

            <button
              type="button"
              onClick={close}
              aria-label={t("closeGallery")}
              className="btn btn-soft absolute right-3 top-3 z-10 h-9 w-9 !p-0"
              data-testid="lightbox-close"
            >
              <X size={18} />
            </button>

            {/* Stage — grows with the zoom so the image can be panned by scrolling */}
            <div className="flex-1 overflow-auto">
              <div className="flex min-h-full min-w-full items-center justify-center p-4">
                <div
                  className="relative shrink-0"
                  style={{
                    width: `${70 * zoom}vw`,
                    height: `${70 * zoom}vh`,
                  }}
                >
                  <Image
                    src={current.url}
                    alt={`${title} — ${index + 1}`}
                    fill
                    sizes="90vw"
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
            </div>

            {images.length > 1 && (
              <div className="flex justify-center gap-x-2 overflow-x-auto px-4 pb-6 no-scrollbar">
                {images.map((image, i) => (
                  <button
                    key={image.id}
                    type="button"
                    onClick={() => onIndexChange(i)}
                    aria-label={`${title} — ${i + 1}`}
                    aria-current={i === index}
                    className={clx(
                      "relative h-14 w-14 shrink-0 overflow-hidden rounded border bg-tb-bg-deep transition-colors",
                      {
                        "border-tb-ink": i === index,
                        "border-tb-line-soft hover:border-tb-ink-4":
                          i !== index,
                      }
                    )}
                  >
                    <Image
                      src={image.url}
                      alt=""
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  )
}

export default GalleryLightbox
