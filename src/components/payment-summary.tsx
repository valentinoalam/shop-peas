import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export function PaymentSummary() {
  // This would typically come from your cart or order state
  const orderItems = [
    { id: 1, name: "Product 1", price: 49.99, quantity: 1 },
    { id: 2, name: "Product 2", price: 29.99, quantity: 2 },
  ]

  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 5.99
  const tax = subtotal * 0.1 // 10% tax
  const total = subtotal + shipping + tax

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
        <CardDescription>Review your order before completing the purchase.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {orderItems.map((item) => (
          <div key={item.id} className="flex justify-between">
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
            </div>
            <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}

        <Separator className="my-4" />

        <div className="space-y-2">
          <div className="flex justify-between">
            <p className="text-muted-foreground">Subtotal</p>
            <p>${subtotal.toFixed(2)}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-muted-foreground">Shipping</p>
            <p>${shipping.toFixed(2)}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-muted-foreground">Tax</p>
            <p>${tax.toFixed(2)}</p>
          </div>
        </div>

        <Separator className="my-4" />

        <div className="flex justify-between font-medium">
          <p>Total</p>
          <p>${total.toFixed(2)}</p>
        </div>
      </CardContent>
    </Card>
  )
}
