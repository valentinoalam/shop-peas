// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import { Button } from "@/components/ui/button";
// import { 
//   Card, 
//   CardContent 
// } from "@/components/ui/card";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { 
//   Separator 
// } from "@/components/ui/separator";
// import { useCart } from "@/context/CartContext";
// import { useToast } from "@/components/ui/use-toast";
// import { 
//   CreditCard, 
//   PaypalIcon, 
//   AppleIcon, 
//   GoogleIcon 
// } from "@/components/PaymentIcons";
// import { paymentMethods } from "@/data/payment";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// // Define the form schema
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

// // Credit card form schema
// const creditCardSchema = z.object({
//   cardName: z.string().min(2, "Please enter the name on card"),
//   cardNumber: z.string().min(13, "Please enter a valid card number"),
//   expiryDate: z.string().regex(/^\d{2}\/\d{2}$/, "Please use MM/YY format"),
//   cvv: z.string().min(3, "Please enter a valid CVV/CVC"),
// });

// type ShippingFormValues = z.infer<typeof shippingFormSchema>;
// type CreditCardFormValues = z.infer<typeof creditCardSchema>;

// const CheckoutPage = () => {
//   const navigate = useNavigate();
//   const { toast } = useToast();
//   const { 
//     items, 
//     subtotal, 
//     shippingMethod,
//     shippingCost,
//     paymentMethod,
//     setPaymentMethod,
//     clearCart
//   } = useCart();
  
//   const [step, setStep] = useState<"shipping" | "payment" | "review">("shipping");
//   const [shippingData, setShippingData] = useState<ShippingFormValues | null>(null);
  
//   const total = subtotal + shippingCost;
  
//   // Initialize the form
//   const shippingForm = useForm<ShippingFormValues>({
//     resolver: zodResolver(shippingFormSchema),
//     defaultValues: {
//       firstName: "",
//       lastName: "",
//       email: "",
//       phone: "",
//       address: "",
//       city: "",
//       state: "",
//       zip: "",
//       country: "US",
//     },
//   });
  
//   const paymentForm = useForm<CreditCardFormValues>({
//     resolver: zodResolver(creditCardSchema),
//     defaultValues: {
//       cardName: "",
//       cardNumber: "",
//       expiryDate: "",
//       cvv: "",
//     },
//   });
  
//   // Handle shipping form submission
//   const onShippingSubmit = (data: ShippingFormValues) => {
//     setShippingData(data);
//     setStep("payment");
//   };
  
//   // Handle payment form submission
//   const onPaymentSubmit = (data: CreditCardFormValues) => {
//     setStep("review");
//   };
  
//   // Handle order placement
//   const placeOrder = () => {
//     // In a real app, this would submit the order to a backend
//     toast({
//       title: "Order placed successfully!",
//       description: "Your order has been placed and will be processed soon.",
//     });
    
//     // Clear the cart
//     clearCart();
    
//     // Redirect to confirmation page (we'll use homepage for now)
//     navigate("/order-confirm");
//   };
  
//   // Get icon for payment method
//   const getPaymentIcon = (methodId: string) => {
//     switch (methodId) {
//       case "credit":
//         return <CreditCard className="h-5 w-5" />;
//       case "paypal":
//         return <PaypalIcon className="h-5 w-5" />;
//       case "apple":
//         return <AppleIcon className="h-5 w-5" />;
//       case "google":
//         return <GoogleIcon className="h-5 w-5" />;
//       default:
//         return <CreditCard className="h-5 w-5" />;
//     }
//   };
  
//   if (items.length === 0 && step === "shipping") {
//     navigate("/cart");
//     return null;
//   }
  
//   return (
//     <div className="min-h-screen flex flex-col">
//       <Navbar />
      
//       <main className="flex-grow py-8 bg-gray-50">
//         <div className="container mx-auto px-4">
//           <div className="max-w-3xl mx-auto">
//             <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
            
//             {/* Progress Steps */}
//             <div className="mb-8">
//               <div className="flex justify-between items-center">
//                 <div className={`flex flex-col items-center ${step === "shipping" ? "text-shop-primary" : "text-gray-500"}`}>
//                   <div className={`h-8 w-8 rounded-full flex items-center justify-center mb-1 ${step === "shipping" ? "bg-shop-primary text-white" : "bg-gray-200"}`}>
//                     1
//                   </div>
//                   <span className="text-sm">Shipping</span>
//                 </div>
//                 <div className={`flex-1 h-1 mx-2 ${step === "shipping" ? "bg-gray-200" : "bg-shop-primary"}`}></div>
//                 <div className={`flex flex-col items-center ${step === "payment" ? "text-shop-primary" : step === "review" ? "text-shop-primary" : "text-gray-500"}`}>
//                   <div className={`h-8 w-8 rounded-full flex items-center justify-center mb-1 ${step === "payment" ? "bg-shop-primary text-white" : step === "review" ? "bg-shop-primary text-white" : "bg-gray-200"}`}>
//                     2
//                   </div>
//                   <span className="text-sm">Payment</span>
//                 </div>
//                 <div className={`flex-1 h-1 mx-2 ${step === "review" ? "bg-shop-primary" : "bg-gray-200"}`}></div>
//                 <div className={`flex flex-col items-center ${step === "review" ? "text-shop-primary" : "text-gray-500"}`}>
//                   <div className={`h-8 w-8 rounded-full flex items-center justify-center mb-1 ${step === "review" ? "bg-shop-primary text-white" : "bg-gray-200"}`}>
//                     3
//                   </div>
//                   <span className="text-sm">Review</span>
//                 </div>
//               </div>
//             </div>
            
//             {/* Step Content */}
//             <Card>
//               <CardContent className="p-6">
//                 {/* Shipping Information Step */}
//                 {step === "shipping" && (
//                   <div>
//                     <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
//                     <Form {...shippingForm}>
//                       <form onSubmit={shippingForm.handleSubmit(onShippingSubmit)} className="space-y-4">
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                           <FormField
//                             control={shippingForm.control}
//                             name="firstName"
//                             render={({ field }) => (
//                               <FormItem>
//                                 <FormLabel>First Name</FormLabel>
//                                 <FormControl>
//                                   <Input placeholder="John" {...field} />
//                                 </FormControl>
//                                 <FormMessage />
//                               </FormItem>
//                             )}
//                           />
                          
//                           <FormField
//                             control={shippingForm.control}
//                             name="lastName"
//                             render={({ field }) => (
//                               <FormItem>
//                                 <FormLabel>Last Name</FormLabel>
//                                 <FormControl>
//                                   <Input placeholder="Doe" {...field} />
//                                 </FormControl>
//                                 <FormMessage />
//                               </FormItem>
//                             )}
//                           />
//                         </div>
                        
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                           <FormField
//                             control={shippingForm.control}
//                             name="email"
//                             render={({ field }) => (
//                               <FormItem>
//                                 <FormLabel>Email</FormLabel>
//                                 <FormControl>
//                                   <Input type="email" placeholder="john@example.com" {...field} />
//                                 </FormControl>
//                                 <FormMessage />
//                               </FormItem>
//                             )}
//                           />
                          
//                           <FormField
//                             control={shippingForm.control}
//                             name="phone"
//                             render={({ field }) => (
//                               <FormItem>
//                                 <FormLabel>Phone</FormLabel>
//                                 <FormControl>
//                                   <Input placeholder="(123) 456-7890" {...field} />
//                                 </FormControl>
//                                 <FormMessage />
//                               </FormItem>
//                             )}
//                           />
//                         </div>
                        
//                         <FormField
//                           control={shippingForm.control}
//                           name="address"
//                           render={({ field }) => (
//                             <FormItem>
//                               <FormLabel>Street Address</FormLabel>
//                               <FormControl>
//                                 <Input placeholder="123 Main St" {...field} />
//                               </FormControl>
//                               <FormMessage />
//                             </FormItem>
//                           )}
//                         />
                        
//                         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                           <FormField
//                             control={shippingForm.control}
//                             name="city"
//                             render={({ field }) => (
//                               <FormItem>
//                                 <FormLabel>City</FormLabel>
//                                 <FormControl>
//                                   <Input placeholder="Los Angeles" {...field} />
//                                 </FormControl>
//                                 <FormMessage />
//                               </FormItem>
//                             )}
//                           />
                          
//                           <FormField
//                             control={shippingForm.control}
//                             name="state"
//                             render={({ field }) => (
//                               <FormItem>
//                                 <FormLabel>State/Province</FormLabel>
//                                 <FormControl>
//                                   <Input placeholder="California" {...field} />
//                                 </FormControl>
//                                 <FormMessage />
//                               </FormItem>
//                             )}
//                           />
                          
//                           <FormField
//                             control={shippingForm.control}
//                             name="zip"
//                             render={({ field }) => (
//                               <FormItem>
//                                 <FormLabel>Postal/Zip Code</FormLabel>
//                                 <FormControl>
//                                   <Input placeholder="90001" {...field} />
//                                 </FormControl>
//                                 <FormMessage />
//                               </FormItem>
//                             )}
//                           />
//                         </div>
                        
//                         <FormField
//                           control={shippingForm.control}
//                           name="country"
//                           render={({ field }) => (
//                             <FormItem>
//                               <FormLabel>Country</FormLabel>
//                               <FormControl>
//                                 <Input placeholder="United States" {...field} />
//                               </FormControl>
//                               <FormMessage />
//                             </FormItem>
//                           )}
//                         />
                        
//                         <div className="flex justify-end mt-6">
//                           <Button type="submit">
//                             Continue to Payment
//                           </Button>
//                         </div>
//                       </form>
//                     </Form>
//                   </div>
//                 )}
                
//                 {/* Payment Information Step */}
//                 {step === "payment" && (
//                   <div>
//                     <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                    
//                     <Tabs value={paymentMethod} onValueChange={setPaymentMethod}>
//                       <TabsList className="grid grid-cols-4 mb-6">
//                         {paymentMethods.map(method => (
//                           <TabsTrigger key={method.id} value={method.id} className="flex items-center gap-2">
//                             {getPaymentIcon(method.id)}
//                             <span className="hidden sm:inline">{method.name}</span>
//                           </TabsTrigger>
//                         ))}
//                       </TabsList>
                      
//                       <TabsContent value="credit">
//                         <Form {...paymentForm}>
//                           <form onSubmit={paymentForm.handleSubmit(onPaymentSubmit)} className="space-y-4">
//                             <FormField
//                               control={paymentForm.control}
//                               name="cardName"
//                               render={({ field }) => (
//                                 <FormItem>
//                                   <FormLabel>Name on Card</FormLabel>
//                                   <FormControl>
//                                     <Input placeholder="John Doe" {...field} />
//                                   </FormControl>
//                                   <FormMessage />
//                                 </FormItem>
//                               )}
//                             />
                            
//                             <FormField
//                               control={paymentForm.control}
//                               name="cardNumber"
//                               render={({ field }) => (
//                                 <FormItem>
//                                   <FormLabel>Card Number</FormLabel>
//                                   <FormControl>
//                                     <Input placeholder="1234 5678 9012 3456" {...field} />
//                                   </FormControl>
//                                   <FormMessage />
//                                 </FormItem>
//                               )}
//                             />
                            
//                             <div className="grid grid-cols-2 gap-4">
//                               <FormField
//                                 control={paymentForm.control}
//                                 name="expiryDate"
//                                 render={({ field }) => (
//                                   <FormItem>
//                                     <FormLabel>Expiry Date</FormLabel>
//                                     <FormControl>
//                                       <Input placeholder="MM/YY" {...field} />
//                                     </FormControl>
//                                     <FormMessage />
//                                   </FormItem>
//                                 )}
//                               />
                              
//                               <FormField
//                                 control={paymentForm.control}
//                                 name="cvv"
//                                 render={({ field }) => (
//                                   <FormItem>
//                                     <FormLabel>CVV/CVC</FormLabel>
//                                     <FormControl>
//                                       <Input placeholder="123" {...field} />
//                                     </FormControl>
//                                     <FormMessage />
//                                   </FormItem>
//                                 )}
//                               />
//                             </div>
                            
//                             <div className="flex justify-between mt-6">
//                               <Button 
//                                 type="button" 
//                                 variant="outline" 
//                                 onClick={() => setStep("shipping")}
//                               >
//                                 Back
//                               </Button>
//                               <Button type="submit">
//                                 Review Order
//                               </Button>
//                             </div>
//                           </form>
//                         </Form>
//                       </TabsContent>
                      
//                       <TabsContent value="paypal">
//                         <div className="text-center py-10 space-y-4">
//                           <PaypalIcon className="h-16 w-16 mx-auto text-blue-600" />
//                           <p>You'll be redirected to PayPal to complete your payment.</p>
//                           <div className="flex justify-between mt-6">
//                             <Button 
//                               variant="outline" 
//                               onClick={() => setStep("shipping")}
//                             >
//                               Back
//                             </Button>
//                             <Button onClick={() => setStep("review")}>
//                               Continue with PayPal
//                             </Button>
//                           </div>
//                         </div>
//                       </TabsContent>
                      
//                       <TabsContent value="apple">
//                         <div className="text-center py-10 space-y-4">
//                           <AppleIcon className="h-16 w-16 mx-auto" />
//                           <p>You'll be redirected to Apple Pay to complete your payment.</p>
//                           <div className="flex justify-between mt-6">
//                             <Button 
//                               variant="outline" 
//                               onClick={() => setStep("shipping")}
//                             >
//                               Back
//                             </Button>
//                             <Button onClick={() => setStep("review")}>
//                               Continue with Apple Pay
//                             </Button>
//                           </div>
//                         </div>
//                       </TabsContent>
                      
//                       <TabsContent value="google">
//                         <div className="text-center py-10 space-y-4">
//                           <GoogleIcon className="h-16 w-16 mx-auto" />
//                           <p>You'll be redirected to Google Pay to complete your payment.</p>
//                           <div className="flex justify-between mt-6">
//                             <Button 
//                               variant="outline" 
//                               onClick={() => setStep("shipping")}
//                             >
//                               Back
//                             </Button>
//                             <Button onClick={() => setStep("review")}>
//                               Continue with Google Pay
//                             </Button>
//                           </div>
//                         </div>
//                       </TabsContent>
//                     </Tabs>
//                   </div>
//                 )}
                
//                 {/* Order Review Step */}
//                 {step === "review" && shippingData && (
//                   <div>
//                     <h2 className="text-xl font-semibold mb-4">Review Your Order</h2>
                    
//                     <div className="space-y-6">
//                       {/* Shipping Address */}
//                       <div>
//                         <h3 className="font-medium mb-2 flex items-center justify-between">
//                           <span>Shipping Address</span>
//                           <Button 
//                             variant="link" 
//                             className="text-sm h-auto p-0"
//                             onClick={() => setStep("shipping")}
//                           >
//                             Edit
//                           </Button>
//                         </h3>
//                         <div className="bg-gray-50 p-3 rounded text-sm">
//                           <p>{shippingData.firstName} {shippingData.lastName}</p>
//                           <p>{shippingData.address}</p>
//                           <p>{shippingData.city}, {shippingData.state} {shippingData.zip}</p>
//                           <p>{shippingData.country}</p>
//                           <p>{shippingData.phone}</p>
//                           <p>{shippingData.email}</p>
//                         </div>
//                       </div>
                      
//                       {/* Payment Method */}
//                       <div>
//                         <h3 className="font-medium mb-2 flex items-center justify-between">
//                           <span>Payment Method</span>
//                           <Button 
//                             variant="link" 
//                             className="text-sm h-auto p-0"
//                             onClick={() => setStep("payment")}
//                           >
//                             Edit
//                           </Button>
//                         </h3>
//                         <div className="bg-gray-50 p-3 rounded text-sm flex items-center">
//                           {getPaymentIcon(paymentMethod)}
//                           <span className="ml-2">
//                             {paymentMethods.find(m => m.id === paymentMethod)?.name}
//                           </span>
//                         </div>
//                       </div>
                      
//                       {/* Order Items */}
//                       <div>
//                         <h3 className="font-medium mb-2">Order Items</h3>
//                         <div className="bg-gray-50 p-3 rounded">
//                           <div className="space-y-3">
//                             {items.map(item => (
//                               <div key={item.product.id} className="flex items-center">
//                                 <img 
//                                   src={item.product.image} 
//                                   alt={item.product.name}
//                                   className="w-12 h-12 object-cover rounded mr-3"
//                                 />
//                                 <div className="flex-1">
//                                   <div className="font-medium">{item.product.name}</div>
//                                   <div className="text-sm text-gray-500">
//                                     Qty: {item.quantity}
//                                   </div>
//                                 </div>
//                                 <div className="text-right">
//                                   ${(item.product.price * item.quantity).toFixed(2)}
//                                 </div>
//                               </div>
//                             ))}
//                           </div>
//                         </div>
//                       </div>
                      
//                       {/* Order Summary */}
//                       <div>
//                         <h3 className="font-medium mb-2">Order Summary</h3>
//                         <div className="bg-gray-50 p-3 rounded">
//                           <div className="space-y-2">
//                             <div className="flex justify-between">
//                               <span>Subtotal</span>
//                               <span>${subtotal.toFixed(2)}</span>
//                             </div>
//                             <div className="flex justify-between">
//                               <span>Shipping</span>
//                               <span>
//                                 {shippingCost === 0 ? (
//                                   <span className="text-green-600">Free</span>
//                                 ) : (
//                                   `$${shippingCost.toFixed(2)}`
//                                 )}
//                               </span>
//                             </div>
//                             <Separator />
//                             <div className="flex justify-between font-bold">
//                               <span>Total</span>
//                               <span>${total.toFixed(2)}</span>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
                      
//                       <div className="pt-4">
//                         <Button 
//                           className="w-full" 
//                           size="lg"
//                           onClick={placeOrder}
//                         >
//                           Place Order
//                         </Button>
//                         <p className="text-xs text-gray-500 text-center mt-2">
//                           By placing your order, you agree to our terms and conditions.
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </main>
      
//       <Footer />
//     </div>
//   );
// };

// export default CheckoutPage;

import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import { useCart } from '@/context/cart-context'
import { useToast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { 
  ArrowLeft, 
  CreditCard, 
  ShieldCheck 
} from 'lucide-react'
import { GetServerSideProps } from 'next'
import { prisma } from '@/lib/prisma'
import { PaymentMethod, ShippingMethod, OrderItem } from '@prisma/client'
import PaymentIcons from '@/components/icons/payment-icons'
import Image from 'next/image'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'


interface CheckoutPageProps {
  shippingMethods: ShippingMethod[]
  paymentMethods: PaymentMethod[]
}

export default function CheckoutPage({ 
  shippingMethods, 
  paymentMethods 
}: CheckoutPageProps) {
  const router = useRouter()
  const { toast } = useToast()
  const { 
    items, 
    subtotal, 
    shippingCost, 
    shippingMethod, 
    setShippingMethod,
    paymentMethod,
    setPaymentMethod,
    clearCart
  } = useCart()
  
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  })
  
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const total = subtotal + shippingCost
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      })
    }
  }
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    // Validate required fields
    const requiredFields = ['email', 'firstName', 'lastName', 'address', 'city', 'state', 'zipCode']
    requiredFields.forEach(field => {
      if (!formData[field as keyof typeof formData]) {
        newErrors[field] = 'This field is required'
      }
    })
    
    // Validate email format
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    // Validate credit card fields if credit card is selected
    if (paymentMethod === 'credit') {
      if (!formData.cardNumber) {
        newErrors.cardNumber = 'Card number is required'
      } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
        newErrors.cardNumber = 'Please enter a valid 16-digit card number'
      }
      
      if (!formData.cardName) {
        newErrors.cardName = 'Name on card is required'
      }
      
      if (!formData.expiryDate) {
        newErrors.expiryDate = 'Expiry date is required'
      } else if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
        newErrors.expiryDate = 'Please use format MM/YY'
      }
      
      if (!formData.cvv) {
        newErrors.cvv = 'CVV is required'
      } else if (!/^\d{3,4}$/.test(formData.cvv)) {
        newErrors.cvv = 'Please enter a valid CVV'
      }
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    if (items.length === 0) {
      toast({
        title: 'Your cart is empty',
        description: 'Please add items to your cart before checking out',
        variant: 'destructive'
      })
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // Here we would normally send the order to the server
      // but for this demo we'll just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Create the order in the database via API
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: items.map((item => ({
            productId: item.product.id,
            quantity: item.quantity,
            price: item.product.price
          })),
          subtotal,
          shippingCost,
          total,
          shippingMethodId: shippingMethod,
          paymentMethodId: paymentMethod,
          ...formData
        }),
      })
      
      if (!response.ok) {
        throw new Error('Failed to create order')
      }
      
      const order = await response.json()
      
      // Clear the cart
      clearCart()
      
      // Redirect to confirmation page
      router.push({
        pathname: '/order-confirm',
        query: { orderId: order.id }
      })
    } catch (error) {
      console.error('Checkout error:', error)
      toast({
        title: 'Checkout failed',
        description: 'There was a problem processing your order. Please try again.',
        variant: 'destructive'
      })
      setIsSubmitting(false)
    }
  }
  
  const handleShippingMethodChange = (value: string) => {
    setShippingMethod(value)
  }
  
  const handlePaymentMethodChange = (value: string) => {
    setPaymentMethod(value)
  }
  
  if (items.length === 0) {
    router.push('/cart')
    return null
  }

  return (
    <div className="container mx-auto px-4 max-w-6xl">
    <div className="mb-6">
        <Link href="/cart" className="inline-flex items-center text-blue-600 hover:underline">
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to Cart
        </Link>
    </div>
    
    <h1 className="text-3xl font-bold mb-8">Checkout</h1>
    
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
        <form onSubmit={handleSubmit} className="space-y-8">
            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
            <div className="space-y-4">
                <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
                </div>
            </div>
            </div>
            
            {/* Shipping Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={errors.firstName ? 'border-red-500' : ''}
                />
                {errors.firstName && (
                    <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                )}
                </div>
                
                <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={errors.lastName ? 'border-red-500' : ''}
                />
                {errors.lastName && (
                    <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                )}
                </div>
                
                <div className="md:col-span-2">
                <Label htmlFor="address">Address</Label>
                <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={errors.address ? 'border-red-500' : ''}
                />
                {errors.address && (
                    <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                )}
                </div>
                
                <div>
                <Label htmlFor="city">City</Label>
                <Input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className={errors.city ? 'border-red-500' : ''}
                />
                {errors.city && (
                    <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                )}
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="state">State</Label>
                    <Input
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className={errors.state ? 'border-red-500' : ''}
                    />
                    {errors.state && (
                    <p className="text-red-500 text-sm mt-1">{errors.state}</p>
                    )}
                </div>
                
                <div>
                    <Label htmlFor="zipCode">ZIP Code</Label>
                    <Input
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className={errors.zipCode ? 'border-red-500' : ''}
                    />
                    {errors.zipCode && (
                    <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>
                    )}
                </div>
                </div>
            </div>
            </div>
            
            {/* Shipping Method */}
            <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Shipping Method</h2>
            <RadioGroup value={shippingMethod} onValueChange={handleShippingMethodChange}>
                <div className="space-y-4">
                {shippingMethods.map(method => (
                    <div 
                    key={method.id}
                    className={`flex items-center border rounded-lg p-4 ${
                        shippingMethod === method.id ? 'border-blue-500 bg-blue-50' : ''
                    }`}
                    >
                    <RadioGroupItem value={method.id} id={`shipping-${method.id}`} className="mr-3" />
                    <Label htmlFor={`shipping-${method.id}`} className="flex-grow cursor-pointer">
                        <div className="flex justify-between items-center">
                        <div>
                            <div className="font-medium">{method.name}</div>
                            <div className="text-sm text-gray-500">{method.estimated}</div>
                        </div>
                        <div className="font-semibold">
                            {method.price === 0 ? 'FREE' : `$${method.price.toFixed(2)}`}
                        </div>
                        </div>
                    </Label>
                    </div>
                ))}
                </div>
            </RadioGroup>
            </div>
            
            {/* Payment Method */}
            <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
            <RadioGroup value={paymentMethod} onValueChange={handlePaymentMethodChange}>
                <div className="space-y-4">
                {paymentMethods.map(method => (
                    <div 
                    key={method.id}
                    className={`flex items-center border rounded-lg p-4 ${
                        paymentMethod === method.id ? 'border-blue-500 bg-blue-50' : ''
                    }`}
                    >
                    <RadioGroupItem value={method.id} id={`payment-${method.id}`} className="mr-3" />
                    <Label htmlFor={`payment-${method.id}`} className="flex-grow cursor-pointer">
                        <div className="flex justify-between items-center">
                        <div className="font-medium">{method.name}</div>
                        <PaymentIcons type={method.icon} />
                        </div>
                    </Label>
                    </div>
                ))}
                </div>
            </RadioGroup>
            
            {paymentMethod === 'credit' && (
                <div className="mt-6 space-y-4 border-t pt-4">
                <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                    id="cardNumber"
                    name="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    className={errors.cardNumber ? 'border-red-500' : ''}
                    />
                    {errors.cardNumber && (
                    <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>
                    )}
                </div>
                
                <div>
                    <Label htmlFor="cardName">Name on Card</Label>
                    <Input
                    id="cardName"
                    name="cardName"
                    placeholder="John Doe"
                    value={formData.cardName}
                    onChange={handleInputChange}
                    className={errors.cardName ? 'border-red-500' : ''}
                    />
                    {errors.cardName && (
                    <p className="text-red-500 text-sm mt-1">{errors.cardName}</p>
                    )}
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                    <div>
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input
                        id="expiryDate"
                        name="expiryDate"
                        placeholder="MM/YY"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        className={errors.expiryDate ? 'border-red-500' : ''}
                    />
                    {errors.expiryDate && (
                        <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>
                    )}
                    </div>
                    
                    <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                        id="cvv"
                        name="cvv"
                        placeholder="123"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        className={errors.cvv ? 'border-red-500' : ''}
                    />
                    {errors.cvv && (
                        <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>
                    )}
                    </div>
                </div>
                </div>
            )}
            
            <div className="mt-6 flex items-center text-sm text-gray-500">
                <ShieldCheck className="h-4 w-4 mr-2 text-green-500" />
                Your payment information is securely processed
            </div>
            </div>
            
            <Button 
            type="submit" 
            className="w-full" 
            size="lg" 
            disabled={isSubmitting}
            >
            {isSubmitting ? (
                <>Processing...</>
            ) : (
                <>
                <CreditCard className="mr-2 h-4 w-4" />
                Place Order
                </>
            )}
            </Button>
        </form>
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
        <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            
            <div className="max-h-80 overflow-y-auto mb-4">
            {items.map((item: { product: { id: Key | null | undefined; image: string | StaticImport; name: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; price: number }; quantity: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined }) => (
                <div key={item.product.id} className="flex py-3 border-b">
                <div className="w-16 h-16 mr-4">
                    <Image fill 
                    src={item.product.image} 
                    alt={item.product.name}
                    className="w-full h-full object-contain"
                    />
                </div>
                <div>
                    <p className="font-medium">{item.product.name}</p>
                    <div className="flex justify-between mt-1">
                    <span className="text-sm text-gray-500">Qty {item.quantity}</span>
                    <span className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>
                </div>
                </div>
            ))}
            </div>
            
            <div className="space-y-3 pt-3">
            <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>${shippingCost.toFixed(2)}</span>
            </div>
            
            <div className="border-t pt-3 mt-3 flex justify-between font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
            </div>
            </div>
        </div>
        </div>
    </div>
    </div>

  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const shippingMethods = await prisma.shippingMethod.findMany()
  const paymentMethods = await prisma.paymentMethod.findMany()
  
  return {
    props: {
      shippingMethods: JSON.parse(JSON.stringify(shippingMethods)),
      paymentMethods: JSON.parse(JSON.stringify(paymentMethods))
    }
  }
}