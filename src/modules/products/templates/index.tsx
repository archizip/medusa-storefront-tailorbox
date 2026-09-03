import React, { Suspense } from "react"

import ImageGallery from "@modules/products/components/image-gallery"
import ProductActions from "@modules/products/components/product-actions"
import ProductBreadcrumbs from "@modules/products/components/product-breadcrumbs"
import ProductOnboardingCta from "@modules/products/components/product-onboarding-cta"
import ProductServiceBox from "@modules/products/components/product-service-box"
import RelatedProducts from "@modules/products/components/related-products"
import ProductDetails from "@modules/products/templates/product-details"
import ProductInfo from "@modules/products/templates/product-info"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import { notFound } from "next/navigation"
import { HttpTypes } from "@medusajs/types"

import ProductActionsWrapper from "./product-actions-wrapper"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
  images: HttpTypes.StoreProductImage[]
  selectedVariantId?: string
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
  images,
  selectedVariantId,
}) => {
  if (!product || !product.id) {
    return notFound()
  }

  return (
    <>
      <div className="content-container py-6" data-testid="product-container">
        <Suspense fallback={<div className="h-4" />}>
          <ProductBreadcrumbs product={product} />
        </Suspense>

        <div className="mt-8 grid grid-cols-1 gap-10 small:grid-cols-2 small:gap-x-14 small:items-start">
          <ImageGallery images={images} title={product.title} />

          <div className="flex flex-col gap-y-6 small:sticky small:top-28">
            <ProductOnboardingCta />
            <ProductInfo product={product} />

            <hr className="hr-thin" />

            <Suspense
              fallback={
                <ProductActions
                  disabled={true}
                  product={product}
                  region={region}
                />
              }
            >
              <ProductActionsWrapper id={product.id} region={region} />
            </Suspense>

            <ProductServiceBox />
          </div>
        </div>
      </div>

      <ProductDetails product={product} selectedVariantId={selectedVariantId} />

      <div
        className="content-container my-16 small:my-20"
        data-testid="related-products-container"
      >
        <Suspense fallback={<SkeletonRelatedProducts />}>
          <RelatedProducts product={product} countryCode={countryCode} />
        </Suspense>
      </div>
    </>
  )
}

export default ProductTemplate
