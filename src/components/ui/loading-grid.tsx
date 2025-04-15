export default function LoadingGrid() {
    return (
      <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
        <div className="grid grid-cols-3 gap-1">
          {Array.from({ length: 9 }).map((_, index) => (
            <div key={index} className="aspect-square bg-gray-200 animate-pulse" />
          ))}
        </div>
      </div>
    )
  }
  
  