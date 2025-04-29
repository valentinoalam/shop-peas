'use client'

import { useState, useEffect, useMemo } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import ProductFilter from '@/components/products/product-filter'
import ProductCard from '@/components/products/product-card'
import { Button } from '@/components/ui/button'
import { ProductWithDetails } from '@/components/products/product-details'

interface ProductsPageProps {
  products: ProductWithDetails[]
  categories: string[]
  initialFilters: {
    categories: string[]
    priceRange: [number, number]
    sortBy: string
  }
}

export default function ProductsPageClient({ 
  products, 
  categories,
  initialFilters
}: ProductsPageProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  const [selectedCategories, setSelectedCategories] = useState<string[]>(initialFilters.categories)
  const [priceRange, setPriceRange] = useState<[number, number]>(initialFilters.priceRange)
  const [sortBy, setSortBy] = useState(initialFilters.sortBy)
  const [isFiltering, setIsFiltering] = useState(false)

  // Memoize filtered products to avoid unnecessary re-filtering
  const filteredProducts = useMemo(() => {
    let result = [...products]
    
    // Filter by categories
    if (selectedCategories.length > 0) {
      result = result.filter(product => selectedCategories.includes(product.category.name))
    }
    
    // Filter by price range
    result = result.filter(
      product => product.price >= priceRange[0] && product.price <= priceRange[1]
    )
    
    // Sort products
    switch (sortBy) {
      case "price-asc":
        return result.sort((a, b) => a.price - b.price)
      case "price-desc":
        return result.sort((a, b) => b.price - a.price)
      case "rating-desc":
        return result.sort((a, b) => b.rating - a.rating)
      case "popular":
        return result.sort((a, b) => b.reviews.length - a.reviews.length)
      default:
        return result
    }
  }, [products, selectedCategories, priceRange, sortBy])
  
  // Update URL when filters change
  useEffect(() => {
    // Create a new URLSearchParams instance based on current
    const params = new URLSearchParams(searchParams.toString())
    
    // Update category parameter
    if (selectedCategories.length === 1) {
      params.set('category', selectedCategories[0])
    } else {
      params.delete('category')
    }
    
    // Update price range parameters
    if (priceRange[0] > 0) {
      params.set('minPrice', priceRange[0].toString())
    } else {
      params.delete('minPrice')
    }
    
    if (priceRange[1] < 600) {
      params.set('maxPrice', priceRange[1].toString())
    } else {
      params.delete('maxPrice')
    }
    
    // Update sort parameter
    if (sortBy !== "price-asc") {
      params.set('sort', sortBy)
    } else {
      params.delete('sort')
    }
    
    // Only update URL if filters have changed
    const newParams = params.toString()
    const currentParams = searchParams.toString()
    
    if (newParams !== currentParams) {
      setIsFiltering(true)
      router.push(`${pathname}?${newParams}`, { scroll: false })
      
      // Add a small delay to show loading state for better UX
      const timeout = setTimeout(() => {
        setIsFiltering(false)
      }, 300)
      
      return () => clearTimeout(timeout)
    }
  }, [selectedCategories, priceRange, sortBy, pathname, searchParams, router])

  const clearFilters = () => {
    setSelectedCategories([])
    setPriceRange([0, 600])
    setSortBy("price-asc")
  }

  const hasActiveFilters = selectedCategories.length > 0 || 
    priceRange[0] > 0 || 
    priceRange[1] < 600 || 
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