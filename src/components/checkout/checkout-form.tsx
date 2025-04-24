"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"

type CheckoutFormProps = {
  user: any
  cartItems: any[]
  totalPrice: number
  totalWeight: number
  couriers: any[]
  paymentMethods: any[]
  shippingServices: any[]
}

export default function CheckoutForm({
  user,
  cartItems,
  totalPrice,
  totalWeight,
  couriers,
  paymentMethods,
  shippingServices,
}: CheckoutFormProps) {
  const router = useRouter()
  const [selectedShipping, setSelectedShipping] = useState("")
  const [selectedPayment, setSelectedPayment] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [shippingCost, setShippingCost] = useState(0)

  const handleShippingSelect = (service: any) => {
    setSelectedShipping(JSON.stringify(service))
    setShippingCost(service.cost)
  }

  const handleCheckout = async () => {
    if (!selectedShipping) {
      toast({
        title: "Shipping method required",
        description: "Please select a shipping method",
        variant: "destructive",
      })
      return
    }

    if (!selectedPayment) {
      toast({
        title: "Payment method required",
        description: "Please select a payment method",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          selectedShipping,
          shippingCost,
          paymentMethod: selectedPayment,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Checkout failed")
      }

      const data = await response.json()

      // Redirect to payment page
      router.push(`/payment?orderId=${data.orderId}&token=${data.paymentToken}`)
    } catch (error) {
      toast({
        title: "Checkout failed",
        description: error instanceof Error ? error.message : "An error occurred during checkout",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="grid md:grid-cols-3 gap-8">
      <div className="md:col-span-2 space-y-8">
        {/* Shipping Address */}
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
          <div className="space-y-2">
            <p>
              <span className="font-medium">Name:</span> {user.fullName || user.name}
            </p>
            <p>
              <span className="font-medium">Address:</span> {user.addressDetail}
            </p>
            <p>
              {user.village}, {user.district}, {user.city}, {user.province}, {user.postalCode}
            </p>
          </div>
        </div>

        {/* Shipping Methods */}
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Shipping Method</h2>

          <RadioGroup value={selectedShipping} onValueChange={setSelectedShipping}>
            <div className="grid gap-4">
              {shippingServices.map((service: any) => (
                <div key={service.id} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={JSON.stringify(service)}
                    id={`shipping-${service.id}`}
                    onClick={() => handleShippingSelect(service)}
                  />
                  <Label htmlFor={`shipping-${service.id}`} className="flex flex-1 justify-between">
                    <div className="flex items-center gap-2">
                      <Image
                        src={service.image || `/placeholder.svg?height=40&width=40`}
                        alt={service.name}
                        width={40}
                        height={40}
                        className="object-contain"
                      />
                      <span>{service.name}</span>
                    </div>
                    <span className="font-medium">${service.cost.toFixed(2)}</span>
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>

        {/* Payment Methods */}
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Payment Method</h2>

          <RadioGroup value={selectedPayment} onValueChange={setSelectedPayment}>
            <div className="grid gap-4">
              {paymentMethods.map((method) => (
                <div key={method.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={method.id} id={`payment-${method.id}`} />
                  <Label htmlFor={`payment-${method.id}`}>{method.name}</Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>
      </div>

      {/* Order Summary */}
      <div>
        <div className="border rounded-lg p-6 sticky top-4">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

          <div className="space-y-4 mb-6">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span>
                  {item.quantity} x {item.product.name}
                </span>
                <span>${(item.product.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>${shippingCost.toFixed(2)}</span>
            </div>
          </div>

          <div className="border-t pt-4 mb-6">
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>${(totalPrice + shippingCost).toFixed(2)}</span>
            </div>
          </div>

          <Button className="w-full" onClick={handleCheckout} disabled={isLoading}>
            {isLoading ? "Processing..." : "Place Order"}
          </Button>
        </div>
      </div>
    </div>
  )
}
