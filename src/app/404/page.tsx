
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ShoppingBag } from 'lucide-react'

export default function NotFound() {
  return (
    <main className="flex-grow items-center justify-center py-16">
      <div className="container mx-auto px-4 max-w-3xl text-center">
      <h1 className="text-8xl font-bold text-gray-300 mb-4">404</h1>
      <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
      <p className="text-gray-600 mb-8">
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
      </p>
      <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
          <Button asChild>
          <Link href="/">
              Return to Home
          </Link>
          </Button>
          <Button variant="outline" asChild>
          <Link href="/products">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Browse Products
          </Link>
          </Button>
      </div>
      </div>
    </main>
  )
}
