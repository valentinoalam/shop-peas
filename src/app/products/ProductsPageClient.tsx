'use client'

import { useState, useEffect, useMemo } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import ProductFilter from '@/components/products/product-filter'
import ProductCard from '@/components/products/product-card'
import { Button } from '@/components/ui/button'
import { ProductWithDetails } from '@/components/products/product-details'
interface Category {
  id: number;
  name: string;
}
interface ProductsPageProps {
  products: ProductWithDetails[]
  categories: Category[]
  initialFilters: {
    categories: number[]
    priceRange: [number, number]
    sortBy: string
  },
  maxPrice: number
}

export default function ProductsPageClient({ 
  products, 
  categories,
  initialFilters,
  maxPrice
}: ProductsPageProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  const [selectedCategories, setSelectedCategories] = useState<number[]>(initialFilters.categories)
  const [priceRange, setPriceRange] = useState<[number, number]>(initialFilters.priceRange)
  const [sortBy, setSortBy] = useState(initialFilters.sortBy)
  const [isFiltering, setIsFiltering] = useState(false)

  // Memoize filtered products to avoid unnecessary re-filtering
  const filteredProducts = useMemo(() => {
    let result = [...products]

    // Filter by categories
    if (selectedCategories.length > 0) {
      result = result.filter(product => selectedCategories.includes(product.category.id))
    }
    // Filter by price range
    // const [minPrice, maxPrice] = [
    //   Math.min(...priceRange), 
    //   Math.max(...priceRange)
    // ].map(Number)
    // Filter by price range
    const [minPrice, maxPrice] = priceRange;
    result = result.filter(product => {
      const price = Number(product.price);
      return price >= minPrice && price <= maxPrice;
    });

    // Sort products (create new arrays to avoid mutation)
    return [...result].sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "rating-desc":
          return b.rating - a.rating;
        case "popular":
          return b.reviews.length - a.reviews.length;
        default:
          return 0;
      }
    });
  }, [products, selectedCategories, priceRange, sortBy])
  
  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    
    // Update category parameters
    if (selectedCategories.length > 0) {
      params.set('categories', selectedCategories.join(','));
    } else {
      params.delete('categories');
    }
    
    // Update price parameters
    params.set('minPrice', priceRange[0].toString());
    params.set('maxPrice', priceRange[1].toString());
    
    // Update sort parameter
    if (sortBy !== "price-asc") {
      params.set('sort', sortBy)
    } else {
      params.delete('sort')
    }
    
    // Add a small delay to show loading state for better UX
    const timeout = setTimeout(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
      setIsFiltering(false);
    }, 300);
    
    return () => clearTimeout(timeout)

  }, [selectedCategories, priceRange, sortBy, pathname, searchParams, router, maxPrice])

  const clearFilters = () => {
    setSelectedCategories([])
    setPriceRange([0, maxPrice])
    setSortBy("price-asc")
  }

  const hasActiveFilters = selectedCategories.length > 0 || 
    priceRange[0] > 0 || 
    priceRange[1] < maxPrice || 
    sortBy !== "price-asc"

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <div className="lg:col-span-1">
        <ProductFilter
          categories={categories}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          sortBy={sortBy}
          setSortBy={setSortBy}
          onClearFilters={clearFilters}
          maxPrice={maxPrice}
        />
      </div>
      
      <div className="lg:col-span-3">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-medium">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
          </h2>
          
          {hasActiveFilters && (
            <Button 
              variant="outline" 
              onClick={clearFilters}
              size="sm"
            >
              Clear filters
            </Button>
          )}
        </div>
        
        {isFiltering ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(6).fill(0).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-lg">
            <h3 className="text-2xl font-semibold mb-2">No products found</h3>
            <p className="text-gray-500 mb-6">
              Try adjusting your filters to find what you&apos;re looking for.
            </p>
            <Button
              onClick={clearFilters}
              variant="outline"
            >
              Clear all filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

function ProductCardSkeleton() {
  return (
    <div className="flex flex-col space-y-3 bg-white rounded-lg p-4 shadow-sm">
      <div className="aspect-square w-full rounded-lg bg-gray-200 animate-pulse" />
      <div className="h-4 w-3/4 bg-gray-200 animate-pulse rounded" />
      <div className="h-4 w-1/2 bg-gray-200 animate-pulse rounded" />
      <div className="h-10 w-full bg-gray-200 animate-pulse rounded" />
    </div>
  )
}