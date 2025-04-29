import { Suspense } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { prisma } from '@/lib/prisma'
import { ProductDetails } from '@/components/products/product-details'
import RelatedProducts from '@/components/products/related-products'
import { ProductSkeleton } from '@/components/products/product-skeleton'
import { Breadcrumb } from '@/components/breadcrumb'
import { 
  Metadata, 
  // ResolvingMetadata 
} from 'next'
import { notFound } from 'next/navigation'
import ImageWithFallback from '@/components/image'

type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  // Fetch product data
  const product = await getProduct(params.id)

  if (!product) {
    return {
      title: 'Product Not Found',
    }
  }

  return {
    title: `${product.name} | E-Commerce Store`,
    description: product.description,
  }
}

async function getProduct(id: string) {
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      category: true, // Essential to get category name
      reviews: {      // Needed ONLY if you calculate review count here
         select: { id: true } // Select only 'id' for counting to be efficient
      },
    }
  })
  
  return product
}

async function getRelatedProducts(category: number, id: string) {
  const relatedProducts = await prisma.product.findMany({
    where: {
      categoryId: category,
      id: { not: id }
    },
    include: {
      category: true, // Essential to get category name
      reviews: {      // Needed ONLY if you calculate review count here
         select: { id: true } // Select only 'id' for counting to be efficient
      },
    },
    take: 4
  })
  
  return relatedProducts
}

export async function generateStaticParams() {
  const products = await prisma.product.findMany({
    select: { id: true }
  })
  return products.map((product) => ({
    id: product.id,
  }))
}

export default async function ProductDetailPage(props: Props) {
  const params = await props.params;
  const product = await getProduct(params.id)

  if (!product) {
    notFound()
  }

  const relatedProducts = await getRelatedProducts(product.categoryId, product.id)

  // Create breadcrumb items
  const breadcrumbItems = [
    { label: 'Products', href: '/products' },
    { label: product.category.name, href: `/products/category/${product.category.name.toLowerCase()}` },
    { label: product.name }
  ]

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <Breadcrumb items={breadcrumbItems} />
      
      <div className="mb-6">
        <Link href="/products" className="inline-flex items-center text-blue-600 hover:underline">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Products
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Product Image */}
        <div className="bg-white relative rounded-lg overflow-hidden shadow-md">
          <ImageWithFallback 
            fill
            src={product.image} 
            alt={product.name} 
            className="w-full h-[400px] object-contain"
            priority
          />
        </div>
        
        {/* Product Info */}
        <Suspense fallback={<ProductSkeleton />}>
          <ProductDetails product={product} />
        </Suspense>
      </div>
      
      {/* Related Products */}
      <Suspense fallback={<div>Loading related products...</div>}>
        <RelatedProducts products={relatedProducts} />
      </Suspense>
    </div>
  )
}