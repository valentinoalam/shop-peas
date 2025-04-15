export default function ProductsPageSkeleton() {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          {/* Filter sidebar skeleton */}
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="h-6 w-32 bg-gray-200 animate-pulse rounded" />
              <div className="space-y-2">
                {Array(5).fill(0).map((_, i) => (
                  <div key={i} className="h-8 w-full bg-gray-200 animate-pulse rounded" />
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="h-6 w-32 bg-gray-200 animate-pulse rounded" />
              <div className="h-12 w-full bg-gray-200 animate-pulse rounded" />
            </div>
            
            <div className="space-y-2">
              <div className="h-6 w-32 bg-gray-200 animate-pulse rounded" />
              <div className="space-y-2">
                {Array(4).fill(0).map((_, i) => (
                  <div key={i} className="h-8 w-full bg-gray-200 animate-pulse rounded" />
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(9).fill(0).map((_, i) => (
              <div key={i} className="flex flex-col space-y-3 bg-white rounded-lg p-4 shadow-sm">
                <div className="aspect-square w-full rounded-lg bg-gray-200 animate-pulse" />
                <div className="h-4 w-3/4 bg-gray-200 animate-pulse rounded" />
                <div className="h-4 w-1/2 bg-gray-200 animate-pulse rounded" />
                <div className="h-10 w-full bg-gray-200 animate-pulse rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }