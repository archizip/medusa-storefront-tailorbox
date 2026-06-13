import { HttpTypes } from "@medusajs/types"
import Image from "next/image"

import PlaceholderImage from "@modules/common/icons/placeholder-image"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const withUrl = images.filter((image) => !!image.url)

  return (
    <div className="flex items-start relative">
      <div className="flex flex-col flex-1 small:mx-16 gap-y-4">
        {withUrl.length > 0 ? (
          withUrl.map((image, index) => {
            return (
              <div
                key={image.id}
                className="relative aspect-[29/34] w-full overflow-hidden rounded bg-tb-bg-deep border border-tb-line-soft"
                id={image.id}
              >
                <Image
                  src={image.url!}
                  priority={index <= 2 ? true : false}
                  className="absolute inset-0 mix-blend-multiply"
                  alt={`Product image ${index + 1}`}
                  fill
                  sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
                  style={{
                    objectFit: "cover",
                  }}
                />
              </div>
            )
          })
        ) : (
          <div className="relative aspect-[29/34] w-full overflow-hidden rounded bg-tb-bg-deep border border-tb-line-soft flex items-center justify-center text-tb-ink-4">
            <PlaceholderImage size={40} />
          </div>
        )}
      </div>
    </div>
  )
}

export default ImageGallery
