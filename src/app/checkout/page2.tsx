"use client"

import React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { CreditCard, Wallet, Globe, Store, Building } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { PaymentSummary } from "@/components/payment-summary"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { useToast } from "@/hooks/use-toast"

// Define the form schema
// const shippingFormSchema = z.object({
//   firstName: z.string().min(2, "First name must be at least 2 characters"),
//   lastName: z.string().min(2, "Last name must be at least 2 characters"),
//   email: z.string().email("Please enter a valid email address"),
//   phone: z.string().min(10, "Please enter a valid phone number"),
//   address: z.string().min(5, "Please enter your street address"),
//   city: z.string().min(2, "Please enter your city"),
//   state: z.string().min(2, "Please enter your state/province"),
//   zip: z.string().min(5, "Please enter a valid postal/zip code"),
//   country: z.string().min(2, "Please select your country"),
// });

// Credit card form schema
// const creditCardSchema = z.object({
//   cardName: z.string().min(2, "Please enter the name on card"),
//   cardNumber: z.string().min(13, "Please enter a valid card number"),
//   expiryDate: z.string().regex(/^\d{2}\/\d{2}$/, "Please use MM/YY format"),
//   cvv: z.string().min(3, "Please enter a valid CVV/CVC"),
// });

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits." }),
  address: z.string().min(5, { message: "Address must be at least 5 characters." }),
  paymentMethod: z.enum(["credit_card", "midtrans", "paypal", "stripe", "alfamart", "indomaret", "virtual_account"]),
  bankCode: z.string().optional(),
})

// type ShippingFormValues = z.infer<typeof shippingFormSchema>;
// type CreditCardFormValues = z.infer<typeof creditCardSchema>;

export default function CheckoutPage() {
  const router = useRouter()
  // const { toast } = useToast();
  // const { 
  //   items, 
  //   subtotal, 
  //   shippingMethod,
  //   shippingCost,
  //   paymentMethod,
  //   setPaymentMethod,
  //   clearCart
  // } = useCart();
  //   const [step, setStep] = useState<"shipping" | "payment" | "review">("shipping");
  const [isProcessing, setIsProcessing] = useState(false)
  const [showBankSelect, setShowBankSelect] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      paymentMethod: "credit_card",
      bankCode: "",
    },
  })

  // Watch for payment method changes to show/hide bank selection
  const watchPaymentMethod = form.watch("paymentMethod")

  // Update UI when payment method changes
  React.useEffect(() => {
    setShowBankSelect(watchPaymentMethod === "virtual_account")
  }, [watchPaymentMethod])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsProcessing(true)

    try {
      // Simulate API call to process payment
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Common order data
      const orderData = {
        amount: 150000, // This would be your actual order amount
        orderId: "ORDER-" + Date.now(),
        customerDetails: {
          firstName: values.name.split(" ")[0],
          lastName: values.name.split(" ").slice(1).join(" "),
          email: values.email,
          phone: values.phone,
        },
      }

      // Handle different payment methods
      switch (values.paymentMethod) {
        case "midtrans":
          // Redirect to Midtrans payment page or handle Midtrans snap
          console.log("Processing Midtrans payment")
          router.push("/checkout/processing?gateway=midtrans")
          break

        case "paypal":
          // Redirect to PayPal
          console.log("Processing PayPal payment")
          router.push("/checkout/processing?gateway=paypal")
          break

        case "stripe":
          // Handle Stripe payment
          console.log("Processing Stripe payment")
          router.push("/checkout/processing?gateway=stripe")
          break

        case "alfamart":
        case "indomaret":
          // Handle convenience store payments
          console.log(`Processing ${values.paymentMethod} payment`)

          const storeResponse = await fetch("/api/checkout/convenience-store", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...orderData,
              storeType: values.paymentMethod,
            }),
          })

          const storeData = await storeResponse.json()

          if (storeResponse.ok) {
            // Redirect to payment instructions page with the payment code
            router.push(`/checkout/payment-instructions?store=${values.paymentMethod}&code=${storeData.payment_code}`)
          } else {
            console.error("Payment processing error:", storeData.error)
            // Handle error
          }
          break

        case "virtual_account":
          // Handle virtual account payments
          if (!values.bankCode) {
            form.setError("bankCode", {
              type: "manual",
              message: "Please select a bank",
            })
            setIsProcessing(false)
            return
          }

          console.log(`Processing virtual account payment for ${values.bankCode}`)

          const vaResponse = await fetch("/api/checkout/virtual-account", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...orderData,
              bankCode: values.bankCode,
            }),
          })

          const vaData = await vaResponse.json()

          if (vaResponse.ok) {
            // Redirect to VA payment instructions page
            router.push(
              `/checkout/virtual-account?bank=${values.bankCode}&va_number=${vaData.va_number}&amount=${vaData.amount}`,
            )
          } else {
            console.error("VA payment processing error:", vaData.error)
            // Handle error
          }
          break

        default:
          // Handle credit card payment
          console.log("Processing credit card payment")
          router.push("/checkout/success")
      }
    } catch (error) {
      console.error("Payment processing error:", error)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <div className="grid gap-10 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Checkout</CardTitle>
              <CardDescription>
                Complete your purchase by providing your details and payment information.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Personal Information</h3>
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid gap-4 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="john.doe@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="+1 (555) 000-0000" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Shipping Address</FormLabel>
                          <FormControl>
                            <Input placeholder="123 Main St, City, Country" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Payment Method</h3>
                    <FormField
                      control={form.control}
                      name="paymentMethod"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormControl>
                            <RadioGroup
                              onValueChange={(value) => {
                                field.onChange(value)
                                if (value !== "virtual_account") {
                                  form.setValue("bankCode", "")
                                }
                              }}
                              defaultValue={field.value}
                              className="grid grid-cols-2 gap-4 md:grid-cols-3"
                            >
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
                                    <RadioGroupItem value="virtual_account" className="sr-only" />
                                  </FormControl>
                                  <div className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground">
                                    <Building className="mb-3 h-6 w-6" />
                                    <span className="text-center text-sm font-medium">Virtual Account</span>
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
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Bank selection for Virtual Account */}
                    {showBankSelect && (
                      <FormField
                        control={form.control}
                        name="bankCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Select Bank</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a bank" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="bca">BCA</SelectItem>
                                <SelectItem value="bni">BNI</SelectItem>
                                <SelectItem value="bri">BRI</SelectItem>
                                <SelectItem value="mandiri">Mandiri</SelectItem>
                                <SelectItem value="permata">Permata</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </div>

                  <div className="mt-6 hidden md:block">
                    <Button type="submit" className="w-full" disabled={isProcessing}>
                      {isProcessing ? "Processing..." : "Complete Purchase"}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-2">
          <PaymentSummary />
          <div className="mt-6 block md:hidden">
            <Button onClick={form.handleSubmit(onSubmit)} className="w-full" disabled={isProcessing}>
              {isProcessing ? "Processing..." : "Complete Purchase"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
