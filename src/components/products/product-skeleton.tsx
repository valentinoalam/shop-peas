// src/app/products/[id]/components/product-skeleton.tsx
import { Skeleton } from '@/components/ui/skeleton'

export function ProductSkeleton() {
  return (
    <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <Skeleton className="aspect-square w-full rounded-lg" />
            <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-28 w-full" />
            <Skeleton className="h-12 w-full" />
            </div>
        </div>
    </div>
  )
}
