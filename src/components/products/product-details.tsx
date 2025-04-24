// src/app/products/[id]/components/product-details.tsx
'use client'

import { useState } from 'react'
import { Prisma } from '@prisma/client'
import { Star, ShoppingCart, MinusCircle, PlusCircle, Truck, RefreshCw, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/context/cart-context'
import { Card, CardContent } from '../ui/card'
import { Separator } from '../ui/separator'

export type ProductWithDetails = Prisma.ProductGetPayload<{
  include: {
    category: true;
    reviews: { select: { id: true } }; // Include reviews just for counting
    // Include other relations if needed by the card, e.g., ratings if 'rating' field isn't populated
  }
}>
interface ProductDetailsProps {
  product: ProductWithDetails
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()
  const categoryName = product.category?.name ?? 'Uncategorized';
  const reviewCount = product.reviews?.length ?? 0;
  const averageRating = product.rating ?? 0;
  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1)
    }
  }
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }
  
  const handleAddToCart = () => {
    addToCart(product, quantity)
  }

  return (
    <div className="space-y-4">
      <div className="text-sm text-gray-500">{categoryName}</div>
      <h1 className="text-3xl font-bold">{product.name}</h1>
      
      <div className="flex items-center">
        <div className="flex items-center">
          {/* <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
          <span className="ml-1 font-medium">{product.rating}</span> */}
          {[...Array(5)].map((_, i) => (
            <Star 
                key={i} 
                className={`h-5 w-5 ${
                i < Math.floor(averageRating) 
                    ? "fill-yellow-400 text-yellow-400" 
                    : "text-gray-300"
                }`} 
            />
          ))}
        </div>
        <span className="mx-2 text-gray-300">|</span>
        <span className="text-sm text-gray-500">{reviewCount} reviews</span>
      </div>
      
      <div className="text-2xl font-bold">${product.price.toFixed(2)}</div>
      
      <div className="border-t border-b py-4 my-6">
        <p className="text-gray-700">{product.description}</p>
      </div>
      
      {/* Stock */}
      <div className="mb-6">
        <span className={`inline-block px-3 py-1 rounded-full text-sm ${
            product.stock > 10 
            ? "bg-green-100 text-green-800" 
            : product.stock > 0 
                ? "bg-yellow-100 text-yellow-800" 
                : "bg-red-100 text-red-800"
        }`}>
            {product.stock > 10 
            ? "In Stock" 
            : product.stock > 0 
                ? `Only ${product.stock} left` 
                : "Out of Stock"}
        </span>
      </div>
      
      {/* Quantity */}
      <div className="flex items-center space-x-4">
        <span className="mr-4">Quantity:</span>
        <div className="flex items-center border rounded-md">
          <Button 
            variant="outline" 
            size="icon"
            onClick={decrementQuantity}
            disabled={quantity <= 1}
            className="px-3 py-1 border-r"
          >
            <MinusCircle className="h-4 w-4" />
          </Button>
          <span className="px-4 py-1">{quantity}</span>
          <Button 
            variant="outline" 
            size="icon"  
            onClick={incrementQuantity}
            disabled={quantity >= product.stock}
            className="px-3 py-1 border-l"
          >
            <PlusCircle className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="text-sm text-gray-500">
          {product.stock} items available
        </div>
      </div>

      {/* Add to Cart Button */}
      <Button 
        className="w-full mt-6" 
        size="lg"
        onClick={handleAddToCart}
        disabled={product.stock === 0}
      >
        <ShoppingCart className="mr-2 h-5 w-5" />
        Add to Cart
      </Button>

      {/* Shipping & Returns */}
      <Card>
        <CardContent className="p-4 space-y-4">
            <div className="flex items-start">
              <Truck className="h-5 w-5 text-shop-primary mr-3 mt-0.5" />
              <div>
                  <h4 className="text-sm font-medium">Free Shipping</h4>
                  <p className="text-sm text-gray-500">
                  Free standard shipping on orders over $100
                  </p>
              </div>
            </div>
            <Separator />
            <div className="flex items-start">
              <RefreshCw className="h-5 w-5 text-shop-primary mr-3 mt-0.5" />
              <div>
                  <h4 className="text-sm font-medium">Easy Returns</h4>
                  <p className="text-sm text-gray-500">
                  30-day return policy for unused items
                  </p>
              </div>
            </div>
            <Separator />
            <div className="flex items-start">
              <Calendar className="h-5 w-5 text-shop-primary mr-3 mt-0.5" />
              <div>
                  <h4 className="text-sm font-medium">Estimated Delivery</h4>
                  <p className="text-sm text-gray-500">
                  3-5 business days
                  </p>
              </div>
            </div>
        </CardContent>
      </Card>
    </div>
  )
}