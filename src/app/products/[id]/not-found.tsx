// src/app/product/[id]/not-found.tsx
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function ProductNotFound() {
  return (
    <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <p className="mb-6">Sorry, the product you&apos;re looking for doesn&apos;t exist.</p>
        <Button asChild>
        <Link href="/products">Continue Shopping</Link>
        </Button>
    </div>
  )
}