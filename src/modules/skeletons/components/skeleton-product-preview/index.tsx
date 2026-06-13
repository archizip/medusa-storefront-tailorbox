import { Container } from "@medusajs/ui"

const SkeletonProductPreview = () => {
  return (
    <div className="animate-pulse">
      <Container className="aspect-[9/16] w-full bg-tb-bg-deep rounded-large" />
      <div className="flex justify-between text-base-regular mt-2">
        <div className="w-2/5 h-6 bg-tb-bg-deep"></div>
        <div className="w-1/5 h-6 bg-tb-bg-deep"></div>
      </div>
    </div>
  )
}

export default SkeletonProductPreview
