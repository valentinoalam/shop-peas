"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

type CartSummaryProps = {
  totalPrice: number
}

export default function CartSummary({ totalPrice }: CartSummaryProps) {
  const router = useRouter()

  return (
    <div className="border rounded-lg p-6 sticky top-4">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-500">
          <span>Shipping</span>
          <span>Calculated at checkout</span>
        </div>
      </div>

      <div className="border-t pt-4 mb-6">
        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
      </div>

      <Button className="w-full" onClick={() => router.push("/checkout")}>
        Proceed to Checkout
      </Button>
    </div>
  )
}
