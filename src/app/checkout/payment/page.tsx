"use client"

import { useEffect, useRef } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

declare global {
  interface Window {
    snap: {
      pay: (token: string, options: object) => void
    }
  }
}

export default function PaymentPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId")
  const token = searchParams.get("token")
  const snapContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Load the Midtrans Snap JS
    const script = document.createElement("script")
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js"
    script.setAttribute("data-client-key", process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || "")
    document.body.appendChild(script)

    // Initialize Snap when script is loaded
    script.onload = () => {
      if (token) {
        window.snap.pay(token, {
          onSuccess: () => {
            window.location.href = `/order/status/${orderId}`
          },
          onPending: () => {
            window.location.href = `/order/pending/${orderId}`
          },
          onError: () => {
            window.location.href = `/order/error/${orderId}`
          },
          onClose: () => {
            // Handle when customer closes the payment popup
            console.log("Customer closed the payment window")
          },
        })
      }
    }

    return () => {
      // Clean up
      document.body.removeChild(script)
    }
  }, [token, orderId])

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Complete Your Payment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-4">
            <p>Order ID: {orderId}</p>
            <p className="text-sm text-gray-500 mt-2">Please complete your payment to confirm your order.</p>
          </div>

          <div ref={snapContainerRef} id="snap-container"></div>
        </CardContent>
      </Card>
    </div>
  )
}
