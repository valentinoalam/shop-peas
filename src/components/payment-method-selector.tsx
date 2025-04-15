"use client"
import { CreditCard, Wallet, Globe, Store } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { FormControl, FormItem, FormLabel } from "@/components/ui/form"

interface PaymentMethodSelectorProps {
  value: string
  onChange: (value: string) => void
}

export function PaymentMethodSelector({ value, onChange }: PaymentMethodSelectorProps) {
  return (
    <RadioGroup value={value} onValueChange={onChange} className="grid grid-cols-2 gap-4 md:grid-cols-3">
      <FormItem>
        <FormLabel className="cursor-pointer [&:has([data-state=checked])>div]:border-primary">
          <FormControl>
            <RadioGroupItem value="credit_card" className="sr-only" />
          </FormControl>
          <div className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground">
            <CreditCard className="mb-3 h-6 w-6" />
            <span className="text-center text-sm font-medium">Credit Card</span>
          </div>
        </FormLabel>
      </FormItem>
      <FormItem>
        <FormLabel className="cursor-pointer [&:has([data-state=checked])>div]:border-primary">
          <FormControl>
            <RadioGroupItem value="midtrans" className="sr-only" />
          </FormControl>
          <div className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground">
            <Globe className="mb-3 h-6 w-6" />
            <span className="text-center text-sm font-medium">Midtrans</span>
          </div>
        </FormLabel>
      </FormItem>
      <FormItem>
        <FormLabel className="cursor-pointer [&:has([data-state=checked])>div]:border-primary">
          <FormControl>
            <RadioGroupItem value="paypal" className="sr-only" />
          </FormControl>
          <div className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground">
            <Wallet className="mb-3 h-6 w-6" />
            <span className="text-center text-sm font-medium">PayPal</span>
          </div>
        </FormLabel>
      </FormItem>
      <FormItem>
        <FormLabel className="cursor-pointer [&:has([data-state=checked])>div]:border-primary">
          <FormControl>
            <RadioGroupItem value="stripe" className="sr-only" />
          </FormControl>
          <div className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground">
            <CreditCard className="mb-3 h-6 w-6" />
            <span className="text-center text-sm font-medium">Stripe</span>
          </div>
        </FormLabel>
      </FormItem>
      <FormItem>
        <FormLabel className="cursor-pointer [&:has([data-state=checked])>div]:border-primary">
          <FormControl>
            <RadioGroupItem value="alfamart" className="sr-only" />
          </FormControl>
          <div className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground">
            <Store className="mb-3 h-6 w-6" />
            <span className="text-center text-sm font-medium">Alfamart</span>
          </div>
        </FormLabel>
      </FormItem>
      <FormItem>
        <FormLabel className="cursor-pointer [&:has([data-state=checked])>div]:border-primary">
          <FormControl>
            <RadioGroupItem value="indomaret" className="sr-only" />
          </FormControl>
          <div className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground">
            <Store className="mb-3 h-6 w-6" />
            <span className="text-center text-sm font-medium">Indomaret</span>
          </div>
        </FormLabel>
      </FormItem>
    </RadioGroup>
  )
}
