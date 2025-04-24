"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Copy, Store } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"

export default function PaymentInstructionsPage() {
  // const router = useRouter()
  const searchParams = useSearchParams()
  const storeType = searchParams.get("store") || "alfamart"
  const paymentCode = searchParams.get("code") || "1234567890"
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(paymentCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Format the expiry date (24 hours from now)
  const expiryDate = new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleString()

  return (
    <div className="container mx-auto flex min-h-[80vh] items-center justify-center py-10 px-4 md:px-6">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Store className="h-16 w-16 text-primary" />
          </div>
          <CardTitle className="text-2xl">Payment Instructions</CardTitle>
          <CardDescription>
            Complete your payment at {storeType.charAt(0).toUpperCase() + storeType.slice(1)}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertTitle>Payment Code</AlertTitle>
            <AlertDescription className="flex items-center justify-between">
              <span className="font-mono text-lg">{paymentCode}</span>
              <Button variant="outline" size="icon" onClick={copyToClipboard}>
                <Copy className="h-4 w-4" />
              </Button>
            </AlertDescription>
            {copied && <p className="text-xs text-green-500 mt-1">Copied to clipboard!</p>}
          </Alert>

          <div>
            <h3 className="font-medium mb-2">Instructions:</h3>
            <ol className="list-decimal pl-5 space-y-2 text-sm">
              <li>Visit any {storeType.charAt(0).toUpperCase() + storeType.slice(1)} store near you</li>
              <li>
                Tell the cashier you want to make a payment for{" "}
                {storeType === "alfamart" ? "Alfamart Payment" : "Indomaret i-Saku"}
              </li>
              <li>Show the payment code to the cashier</li>
              <li>Make the payment according to your order total</li>
              <li>Keep your payment receipt as proof of payment</li>
            </ol>
          </div>

          <Separator />

          <div className="text-sm">
            <p className="font-medium">Important Notes:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Payment code will expire on: {expiryDate}</li>
              <li>Your order will be processed after payment is confirmed</li>
              <li>Payment confirmation may take up to 5 minutes</li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button asChild className="w-full">
            <Link href="/checkout/success">I&apos;ve Completed Payment</Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href="/checkout">Return to Checkout</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
