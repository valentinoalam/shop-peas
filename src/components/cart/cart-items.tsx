"use client"

import Image from "next/image"
import { useState } from "react"
import { Trash2, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"
import { CartItemWithPrice } from "@/app/api/checkout/route"

type CartItemProps = {
  items: CartItemWithPrice[]
}

export default function CartItems({ items }: CartItemProps) {
  const [cartItems, setCartItems] = useState(items)
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({})

  const updateQuantity = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return

    setIsLoading((prev) => ({ ...prev, [itemId]: true }))

    try {
      const response = await fetch(`/api/cart/${itemId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity: newQuantity }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to update cart")
      }

      setCartItems((prev) => prev.map((item) => (item.id === itemId ? { ...item, quantity: newQuantity } : item)))

      toast({
        title: "Cart updated",
        description: "Your cart has been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update cart",
        variant: "destructive",
      })
    } finally {
      setIsLoading((prev) => ({ ...prev, [itemId]: false }))
    }
  }

  const removeItem = async (itemId: string) => {
    setIsLoading((prev) => ({ ...prev, [itemId]: true }))

    try {
      const response = await fetch(`/api/cart/${itemId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to remove item")
      }

      setCartItems((prev) => prev.filter((item) => item.id !== itemId))

      toast({
        title: "Item removed",
        description: "Item has been removed from your cart.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to remove item",
        variant: "destructive",
      })
    } finally {
      setIsLoading((prev) => ({ ...prev, [itemId]: false }))
    }
  }

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-gray-600">Your cart is empty</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {cartItems.map((item) => (
        <div key={item.id} className="flex border rounded-lg p-4 gap-4">
          <div className="w-24 h-24 relative flex-shrink-0">
            <Image
              src={item.product.image || "/placeholder.svg?height=96&width=96"}
              alt={item.product.name}
              fill
              className="object-cover rounded-md"
            />
          </div>

          <div className="flex-1">
            <h3 className="font-medium">{item.product.name}</h3>
            <p className="text-sm text-gray-500 mt-1">${item.product.price.toFixed(2)}</p>

            <div className="flex items-center mt-4 space-x-4">
              <div className="flex items-center border rounded-md">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  disabled={isLoading[item.id] || item.quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center">{item.quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  disabled={isLoading[item.id] || item.quantity >= item.product.stock}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-red-500"
                onClick={() => removeItem(item.id)}
                disabled={isLoading[item.id]}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="text-right">
            <p className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
