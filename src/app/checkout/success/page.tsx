import Link from "next/link"
import { CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function SuccessPage() {
  // Generate a random order number
  const orderNumber = `ORD-${Math.floor(Math.random() * 1000000)}`

  return (
    <div className="container mx-auto flex min-h-[80vh] items-center justify-center py-10 px-4 md:px-6">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl">Payment Successful!</CardTitle>
          <CardDescription>Thank you for your purchase. Your order has been confirmed.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg bg-muted p-4">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Order Number:</span>
              <span className="text-sm">{orderNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">Date:</span>
              <span className="text-sm">{new Date().toLocaleDateString()}</span>
            </div>
          </div>
          <p className="text-center text-sm text-muted-foreground">
            A confirmation email has been sent to your email address with all the details of your purchase.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button asChild className="w-full">
            <Link href="/orders">View Order</Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href="/">Continue Shopping</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
