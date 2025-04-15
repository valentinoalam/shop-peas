"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Loader2 } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ProcessingPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const gateway = searchParams.get("gateway") || "unknown"
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    // Simulate payment processing
    const timer = setTimeout(() => {
      router.push("/checkout/success")
    }, 5000)

    // Countdown timer
    const interval = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    return () => {
      clearTimeout(timer)
      clearInterval(interval)
    }
  }, [router])

  return (
    <div className="container mx-auto flex min-h-[80vh] items-center justify-center py-10 px-4 md:px-6">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>Processing Your Payment</CardTitle>
          <CardDescription>
            Please wait while we process your payment with {gateway.charAt(0).toUpperCase() + gateway.slice(1)}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center space-y-4 py-8">
          <div className="flex items-center justify-center">
            <Loader2 className="h-16 w-16 animate-spin text-primary" />
          </div>
          <p className="text-center text-sm text-muted-foreground">
            Please do not close this window. You will be redirected in {countdown} seconds...
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
