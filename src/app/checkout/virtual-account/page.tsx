"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Copy, Building } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"

export default function VirtualAccountPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const bank = searchParams.get("bank") || "bca"
  const vaNumber = searchParams.get("va_number") || "1234567890"
  const amount = searchParams.get("amount") || "150000"
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(vaNumber)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Format the expiry date (24 hours from now)
  const expiryDate = new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleString()

  // Format the amount with currency
  const formattedAmount = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(Number(amount))

  // Bank-specific instructions
  const bankInstructions: { [key: string]: string[] } = {
    bca: [
      "Log in to BCA Mobile or Internet Banking",
      "Select 'Transfer' and choose 'BCA Virtual Account'",
      "Enter the Virtual Account Number",
      "Confirm the payment details and complete the transaction",
    ],
    bni: [
      "Log in to BNI Mobile Banking or Internet Banking",
      "Select 'Transfer' and choose 'Virtual Account Billing'",
      "Enter the Virtual Account Number",
      "Confirm the payment details and complete the transaction",
    ],
    bri: [
      "Log in to BRI Mobile Banking or Internet Banking",
      "Select 'Payment' and choose 'BRIVA'",
      "Enter the Virtual Account Number",
      "Confirm the payment details and complete the transaction",
    ],
    mandiri: [
      "Log in to Mandiri Mobile or Internet Banking",
      "Select 'Payment' and choose 'Multi Payment'",
      "Select 'Virtual Account' as the payment type",
      "Enter the Virtual Account Number",
      "Confirm the payment details and complete the transaction",
    ],
    permata: [
      "Log in to Permata Mobile X or Internet Banking",
      "Select 'Transfer' and choose 'Other Bank Account'",
      "Enter the Virtual Account Number",
      "Confirm the payment details and complete the transaction",
    ],
  }

  // Get instructions for the selected bank or default to generic instructions
  const instructions =
    bankInstructions[bank] ||
    [
    "Log in to your mobile banking or internet banking app",\
    "Select   || [
    "Log in to your mobile banking or internet banking app",
    "Select 'Transfer' or 'Payment' option",
    "Choose 'Virtual Account' as the payment method",
    "Enter the Virtual Account Number",
    "Confirm the payment details and complete the transaction",
  ]

  return (
    <div className="container mx-auto flex min-h-[80vh] items-center justify-center py-10 px-4 md:px-6">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Building className="h-16 w-16 text-primary" />
          </div>
          <CardTitle className="text-2xl">Virtual Account Payment</CardTitle>
          <CardDescription>Complete your payment via {bank.toUpperCase()} Virtual Account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertTitle>Virtual Account Number</AlertTitle>
            <AlertDescription className="flex items-center justify-between">
              <span className="font-mono text-lg">{vaNumber}</span>
              <Button variant="outline" size="icon" onClick={copyToClipboard}>
                <Copy className="h-4 w-4" />
              </Button>
            </AlertDescription>
            {copied && <p className="text-xs text-green-500 mt-1">Copied to clipboard!</p>}
          </Alert>

          <div className="rounded-lg bg-muted p-4">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Amount:</span>
              <span className="text-sm font-bold">{formattedAmount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">Expires:</span>
              <span className="text-sm">{expiryDate}</span>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">Payment Instructions:</h3>
            <ol className="list-decimal pl-5 space-y-2 text-sm">
              {instructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ol>
          </div>

          <Separator />

          <div className="text-sm">
            <p className="font-medium">Important Notes:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Make sure to transfer the exact amount</li>
              <li>Your order will be processed after payment is confirmed</li>
              <li>Payment confirmation may take up to 5 minutes</li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button asChild className="w-full">
            <Link href="/checkout/success">I've Completed Payment</Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href="/checkout">Return to Checkout</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
