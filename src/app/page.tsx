
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { Button } from '@/components/ui/button'
import { ShoppingBag, ChevronRight, Clock, CreditCard, Truck } from 'lucide-react'
import Image from 'next/image'
import ProductCard from '@/components/products/product-card'
import { Suspense } from 'react'
// import { Product } from '@prisma/client'
async function getFeaturedProducts() {
  return prisma.product.findMany({
    where: {
      featured: true,
    },
    take: 4,
  });
}

async function getCategories() {
  return prisma.product.findMany({
    select: {
      category: true,
    },
    distinct: ['category'],
  });
}

export default async function Home() {
  const [featuredProducts, categories] = await Promise.all([
    getFeaturedProducts(),
    getCategories()
  ]);

  return (
    <main className="flex-grow">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-100 to-indigo-100 py-20">
        <div className="container mx-auto px-4 flex-col md:flex-row items-center">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Shop the Latest Products</h1>
              <p className="text-lg text-gray-700 mb-6">Find the perfect items for your lifestyle with our curated collection.</p>
              <div className="space-x-4">
                <Button asChild size="lg">
                  <Link href="/products">
                    Shop Now <ShoppingBag className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg">
                  <Link href="/products">
                    Browse Categories
                  </Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <Image width={400} height={400}
                  src="/placeholder.svg"
                  alt="Featured products"
                  className="rounded-lg shadow-lg w-full h-auto object-cover"
                  style={{ maxHeight: "400px" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Button variant="ghost" asChild>
              <Link href="/products" className="flex items-center">
                View All <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Suspense fallback={<div>Loading products...</div>}>
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
            </Suspense>
          </div>
        </div>
      </section>
      
      {/* Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Shop by Category</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Suspense fallback={<div>Loading categories...</div>}>
            {categories.map(category => (
              <Link 
                href={`/products?category=${category}`} 
                key={category.category}
                className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105"
              >
                <div className="relative h-48">
                  <Image fill
                    src="/placeholder.svg"
                    alt={category.category}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <h3 className="text-white text-xl font-bold">{category.category}</h3>
                  </div>
                </div>
              </Link>
            ))}
            </Suspense>
          </div>
        </div>
      </section>

      
      {/* Special Offers Carousel */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Special Offers</h2>
          
          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent>
              <CarouselItem className="basis-full md:basis-1/2 lg:basis-1/3">
                <div className="bg-gradient-to-br from-rose-100 to-pink-100 p-6 rounded-lg h-60 flex flex-col justify-between">
                  <div>
                    <p className="text-sm font-medium text-rose-600">Limited Time Offer</p>
                    <h3 className="text-2xl font-bold mt-2 mb-2">20% Off Electronics</h3>
                    <p className="text-sm">Use code: TECH20</p>
                  </div>
                  <Button variant="default" className="mt-4 w-full">Shop Now</Button>
                </div>
              </CarouselItem>
              
              <CarouselItem className="basis-full md:basis-1/2 lg:basis-1/3">
                <div className="bg-gradient-to-br from-blue-100 to-cyan-100 p-6 rounded-lg h-60 flex flex-col justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-600">Weekend Sale</p>
                    <h3 className="text-2xl font-bold mt-2 mb-2">Buy One Get One 50% Off</h3>
                    <p className="text-sm">On all accessories</p>
                  </div>
                  <Button variant="default" className="mt-4 w-full">Shop Now</Button>
                </div>
              </CarouselItem>
              
              <CarouselItem className="basis-full md:basis-1/2 lg:basis-1/3">
                <div className="bg-gradient-to-br from-amber-100 to-yellow-100 p-6 rounded-lg h-60 flex flex-col justify-between">
                  <div>
                    <p className="text-sm font-medium text-amber-600">Clearance</p>
                    <h3 className="text-2xl font-bold mt-2 mb-2">Up to 40% Off</h3>
                    <p className="text-sm">While supplies last</p>
                  </div>
                  <Button variant="default" className="mt-4 w-full">Shop Now</Button>
                </div>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>
      
      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-6 w-6 text-shop-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Free Shipping</h3>
              <p className="text-gray-600 text-sm">
                Free shipping on all orders over $100
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="h-6 w-6 text-shop-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Secure Payment</h3>
              <p className="text-gray-600 text-sm">
                Multiple secure payment options
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-6 w-6 text-shop-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">30-Day Returns</h3>
              <p className="text-gray-600 text-sm">
                30-day money-back guarantee
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="h-6 w-6 text-shop-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Quality Products</h3>
              <p className="text-gray-600 text-sm">
                Carefully selected high-quality products
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter */}
      <section className="py-16 bg-shop-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-2">Stay Updated</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter to receive updates on new products, special offers, and promotions.
          </p>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-2">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-2 rounded-md text-gray-900 focus:outline-none"
            />
            <Button className="bg-white text-shop-primary hover:bg-gray-100">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
