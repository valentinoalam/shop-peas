
import { Suspense } from 'react'
import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import ProductsPageClient from './ProductsPageClient'
import ProductsPageSkeleton from './ProductsPageSkeleton'
import { cache } from 'react'
export const metadata: Metadata = {
  title: 'Products | Shop',
  description: 'Browse our collection of products',
}

// Revalidate page data every hour
export const revalidate = 3600


const getProducts = cache(async () => {
  const products = await prisma.product.findMany({
    include: {
      category: true, // Essential to get category name
      reviews: {      // Needed ONLY if you calculate review count here
         select: { id: true } // Select only 'id' for counting to be efficient
      },
      // 'ratings' might not be needed if 'rating' field is reliably updated average
    }
  })
  return JSON.parse(JSON.stringify(products))
})

const getCategories = cache(async () => {
  const categories = await prisma.category.findMany()
  return categories.map(({id, name}) => ({id,name}))
})

export default async function ProductsPage(
  props: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
  }
) {
  const searchParams = await props.searchParams;
  const productsPromise = getProducts()
  const categoriesPromise = getCategories()

  const [products, categories] = await Promise.all([
    productsPromise,
    categoriesPromise
  ])

  const categoryFilter = Number(searchParams.category) || null
  const sortParam = searchParams?.sort || 'price-asc'
  const sortBy = typeof sortParam === 'string' ? sortParam : sortParam[0] || 'price-asc'

  const minPriceParam = searchParams?.minPrice || '0'
  const minPrice = Number(typeof minPriceParam === 'string' ? minPriceParam : minPriceParam[0] || '0')

  const maxPriceParam = searchParams?.maxPrice || '999999'
  const maxPrice = Number(typeof maxPriceParam === 'string' ? maxPriceParam : maxPriceParam[0] || '999999')

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Products</h1>
      
      <Suspense fallback={<ProductsPageSkeleton />}>
        <ProductsPageClient 
          products={products} 
          categories={categories} 
          initialFilters={{
            categories: categoryFilter ? [categoryFilter] : [],
            priceRange: [minPrice, maxPrice],
            sortBy
          }}
          maxPrice={maxPrice}
        />
      </Suspense>
    </div>
  )
}