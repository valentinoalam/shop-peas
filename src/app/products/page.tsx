import { Suspense } from 'react'
import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import ProductsPageClient from './ProductsPageClient'
import ProductsPageSkeleton from './ProductsPageSkeleton'

export const metadata: Metadata = {
  title: 'Products | Shop',
  description: 'Browse our collection of products',
}

// Revalidate page data every hour
export const revalidate = 3600

// Use Next.js 14 unstable_cache for data fetching
import { unstable_cache } from 'next/cache'

// Cache the products fetch with Next.js 14 data cache
const getProducts = unstable_cache(
  async () => {
    const products = await prisma.product.findMany({
      include: {
        category: true, // Essential to get category name
        reviews: {      // Needed ONLY if you calculate review count here
          select: { id: true } // Select only 'id' for counting to be efficient
        },
        // 'ratings' might not be needed if 'rating' field is reliably updated average
      }
    })
    
    // Return the products directly - Next.js can now handle serialization
    return products
  },
  ['products-list'], // Cache tag
  { revalidate: 3600 } // Same revalidation period as the page
)

// Cache the categories fetch with Next.js 14 data cache
const getCategories = unstable_cache(
  async () => {
    const categories = await prisma.category.findMany()
    return categories.map(c => c.name)
  },
  ['categories-list'], // Cache tag
  { revalidate: 3600 } // Same revalidation period as the page
)

export default async function ProductsPage({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  // Start both data fetches in parallel
  const productsPromise = getProducts()
  const categoriesPromise = getCategories()

  const [products, categories] = await Promise.all([
    productsPromise,
    categoriesPromise
  ])

  // Handle filter parameters
  const categoryParam = searchParams.category
  const categoryFilter = typeof categoryParam === 'string' ? 
    categoryParam : categoryParam?.[0] || ''
    
  const sortParam = searchParams.sort || 'price-asc'
  const sortBy = typeof sortParam === 'string' 
    ? sortParam 
    : sortParam[0] || 'price-asc'

  // Unified parameter handling for prices
  const getPriceParam = (param: string | string[] | undefined, fallback: string) => 
    Number(
      (typeof param === 'string' ? param : param?.[0] || fallback)
    )

  const minPrice = getPriceParam(searchParams.minPrice, '0')
  const maxPrice = getPriceParam(searchParams.maxPrice, '600')
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Products</h1>
      
      <Suspense fallback={<ProductsPageSkeleton />}>
        <ProductsPageClient 
          key={`${categoryFilter}-${sortBy}-${minPrice}-${maxPrice}`} // Reset client state on filter change
          products={products}
          categories={categories}
          initialFilters={{
            categories: categoryFilter 
              ? [categoryFilter] 
              : [],  // Array format for potential multi-select support
            priceRange: [
              minPrice,  // Already converted to number by getPriceParam
              maxPrice   // Already converted to number by getPriceParam
            ],
            sortBy: sortBy  // Already guaranteed to be string
          }}
        />
      </Suspense>
    </div>
  )
}