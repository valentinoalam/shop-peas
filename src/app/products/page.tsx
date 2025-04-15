
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
  const products = await prisma.product.findMany()
  return JSON.parse(JSON.stringify(products))
})

const getCategories = cache(async () => {
  const categories = await prisma.product.findMany({
    select: { category: true },
    distinct: ['category']
  })
  return categories.map(c => c.category)
})

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const productsPromise = getProducts()
  const categoriesPromise = getCategories()
  
  const [products, categories] = await Promise.all([
    productsPromise,
    categoriesPromise
  ])
  
  const categoryFilter = searchParams.category?.toString() || ''
  const sortParam = searchParams?.sort || 'price-asc'
  const sortBy = typeof sortParam === 'string' ? sortParam : sortParam[0] || 'price-asc'
  
  const minPriceParam = searchParams?.minPrice || '0'
  const minPrice = Number(typeof minPriceParam === 'string' ? minPriceParam : minPriceParam[0] || '0')
  
  const maxPriceParam = searchParams?.maxPrice || '600'
  const maxPrice = Number(typeof maxPriceParam === 'string' ? maxPriceParam : maxPriceParam[0] || '600')


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
        />
      </Suspense>
    </div>
  )
}