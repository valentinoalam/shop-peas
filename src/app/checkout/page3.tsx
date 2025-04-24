import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { 
  Separator 
} from "@/components/ui/separator";
import { 
	CreditCard, 
	PaypalIcon, 
	AppleIcon, 
	GoogleIcon 
} from "@/components/icons/payment-icons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/context/cart-context";
import { useRouter } from 'next/navigation';
import Image from "next/image";

// Define the form schema
const shippingFormSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  address: z.string().min(5, "Please enter your street address"),
  city: z.string().min(2, "Please enter your city"),
  state: z.string().min(2, "Please enter your state/province"),
  zip: z.string().min(5, "Please enter a valid postal/zip code"),
  country: z.string().min(2, "Please select your country"),
});

// Credit card form schema
const creditCardSchema = z.object({
  cardName: z.string().min(2, "Please enter the name on card"),
  cardNumber: z.string().min(13, "Please enter a valid card number"),
  expiryDate: z.string().regex(/^\d{2}\/\d{2}$/, "Please use MM/YY format"),
  cvv: z.string().min(3, "Please enter a valid CVV/CVC"),
});

type ShippingFormValues = z.infer<typeof shippingFormSchema>;
type CreditCardFormValues = z.infer<typeof creditCardSchema>;

export const paymentMethods = [
  {
    id: "credit",
    name: "Credit / Debit Card",
    icon: "credit-card"
  },
  {
    id: "paypal",
    name: "PayPal",
    icon: "paypal"
  },
  {
    id: "apple",
    name: "Apple Pay",
    icon: "apple"
  },
  {
    id: "google",
    name: "Google Pay",
    icon: "google"
  }
];
const CheckoutPage = () => {
  const router = useRouter()
  const { toast } = useToast();
  const { 
    items, 
    subtotal, 
    // shippingMethod,
    shippingCost,
    paymentMethod,
    setPaymentMethod,
    clearCart
  } = useCart();
  
  const [step, setStep] = useState<"shipping" | "payment" | "review">("shipping");
  const [shippingData, setShippingData] = useState<ShippingFormValues | null>(null);
  
  const total = subtotal + shippingCost;
  
  // Initialize the form
  const shippingForm = useForm<ShippingFormValues>({
    resolver: zodResolver(shippingFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      country: "US",
    },
  });
  
  const paymentForm = useForm<CreditCardFormValues>({
    resolver: zodResolver(creditCardSchema),
    defaultValues: {
      cardName: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    },
  });
  
  // Handle shipping form submission
  const onShippingSubmit = (data: ShippingFormValues) => {
    setShippingData(data);
    setStep("payment");
  };
  
  // Handle payment form submission
  const onPaymentSubmit = (data: CreditCardFormValues) => {
    setStep("review");
    console.log(data)
  };
  
  // Handle order placement
  const placeOrder = () => {
    // In a real app, this would submit the order to a backend
    toast({
      title: "Order placed successfully!",
      description: "Your order has been placed and will be processed soon.",
    });
    
    // Clear the cart
    clearCart();
    
    // Redirect to confirmation page (we'll use homepage for now)
    router.push("/order-confirm");
  };
  
  // Get icon for payment method
  const getPaymentIcon = (methodId: string) => {
    switch (methodId) {
      case "credit":
        return <CreditCard className="h-5 w-5" />;
      case "paypal":
        return <PaypalIcon className="h-5 w-5" />;
      case "apple":
        return <AppleIcon className="h-5 w-5" />;
      case "google":
        return <GoogleIcon className="h-5 w-5" />;
      default:
        return <CreditCard className="h-5 w-5" />;
    }
  };
  
  if (items.length === 0 && step === "shipping") {
    router.push("/cart");
    return null;
  }
  
  return (
    <main className="flex-grow py-8 bg-gray-50">
    <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
        
        {/* Progress Steps */}
        <div className="mb-8">
            <div className="flex justify-between items-center">
            <div className={`flex flex-col items-center ${step === "shipping" ? "text-shop-primary" : "text-gray-500"}`}>
                <div className={`h-8 w-8 rounded-full flex items-center justify-center mb-1 ${step === "shipping" ? "bg-shop-primary text-white" : "bg-gray-200"}`}>
                1
                </div>
                <span className="text-sm">Shipping</span>
            </div>
            <div className={`flex-1 h-1 mx-2 ${step === "shipping" ? "bg-gray-200" : "bg-shop-primary"}`}></div>
            <div className={`flex flex-col items-center ${step === "payment" ? "text-shop-primary" : step === "review" ? "text-shop-primary" : "text-gray-500"}`}>
                <div className={`h-8 w-8 rounded-full flex items-center justify-center mb-1 ${step === "payment" ? "bg-shop-primary text-white" : step === "review" ? "bg-shop-primary text-white" : "bg-gray-200"}`}>
                2
                </div>
                <span className="text-sm">Payment</span>
            </div>
            <div className={`flex-1 h-1 mx-2 ${step === "review" ? "bg-shop-primary" : "bg-gray-200"}`}></div>
            <div className={`flex flex-col items-center ${step === "review" ? "text-shop-primary" : "text-gray-500"}`}>
                <div className={`h-8 w-8 rounded-full flex items-center justify-center mb-1 ${step === "review" ? "bg-shop-primary text-white" : "bg-gray-200"}`}>
                3
                </div>
                <span className="text-sm">Review</span>
            </div>
            </div>
        </div>
        
        {/* Step Content */}
        <Card>
            <CardContent className="p-6">
            {/* Shipping Information Step */}
            {step === "shipping" && (
                <div>
                <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
                <Form {...shippingForm}>
                    <form onSubmit={shippingForm.handleSubmit(onShippingSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                        control={shippingForm.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                                <Input placeholder="John" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        
                        <FormField
                        control={shippingForm.control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                        control={shippingForm.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type="email" placeholder="john@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        
                        <FormField
                        control={shippingForm.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                                <Input placeholder="(123) 456-7890" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    </div>
                    
                    <FormField
                        control={shippingForm.control}
                        name="address"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Street Address</FormLabel>
                            <FormControl>
                            <Input placeholder="123 Main St" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FormField
                        control={shippingForm.control}
                        name="city"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                                <Input placeholder="Los Angeles" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        
                        <FormField
                        control={shippingForm.control}
                        name="state"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>State/Province</FormLabel>
                            <FormControl>
                                <Input placeholder="California" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        
                        <FormField
                        control={shippingForm.control}
                        name="zip"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Postal/Zip Code</FormLabel>
                            <FormControl>
                                <Input placeholder="90001" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    </div>
                    
                    <FormField
                        control={shippingForm.control}
                        name="country"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Country</FormLabel>
                            <FormControl>
                            <Input placeholder="United States" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    
                    <div className="flex justify-end mt-6">
                        <Button type="submit">
                        Continue to Payment
                        </Button>
                    </div>
                    </form>
                </Form>
                </div>
            )}
            
            {/* Payment Information Step */}
            {step === "payment" && (
                <div>
                <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                
                <Tabs value={paymentMethod} onValueChange={setPaymentMethod}>
                    <TabsList className="grid grid-cols-4 mb-6">
                    {paymentMethods.map(method => (
                        <TabsTrigger key={method.id} value={method.id} className="flex items-center gap-2">
                        {getPaymentIcon(method.id)}
                        <span className="hidden sm:inline">{method.name}</span>
                        </TabsTrigger>
                    ))}
                    </TabsList>
                    
                    <TabsContent value="credit">
                    <Form {...paymentForm}>
                        <form onSubmit={paymentForm.handleSubmit(onPaymentSubmit)} className="space-y-4">
                        <FormField
                            control={paymentForm.control}
                            name="cardName"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name on Card</FormLabel>
                                <FormControl>
                                <Input placeholder="John Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        
                        <FormField
                            control={paymentForm.control}
                            name="cardNumber"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Card Number</FormLabel>
                                <FormControl>
                                <Input placeholder="1234 5678 9012 3456" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                            control={paymentForm.control}
                            name="expiryDate"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Expiry Date</FormLabel>
                                <FormControl>
                                    <Input placeholder="MM/YY" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                            
                            <FormField
                            control={paymentForm.control}
                            name="cvv"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>CVV/CVC</FormLabel>
                                <FormControl>
                                    <Input placeholder="123" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                        </div>
                        
                        <div className="flex justify-between mt-6">
                            <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => setStep("shipping")}
                            >
                            Back
                            </Button>
                            <Button type="submit">
                            Review Order
                            </Button>
                        </div>
                        </form>
                    </Form>
                    </TabsContent>
                    
                    <TabsContent value="paypal">
                    <div className="text-center py-10 space-y-4">
                        <PaypalIcon className="h-16 w-16 mx-auto text-blue-600" />
                        <p>You&apos;ll be redirected to PayPal to complete your payment.</p>
                        <div className="flex justify-between mt-6">
                        <Button 
                            variant="outline" 
                            onClick={() => setStep("shipping")}
                        >
                            Back
                        </Button>
                        <Button onClick={() => setStep("review")}>
                            Continue with PayPal
                        </Button>
                        </div>
                    </div>
                    </TabsContent>
                    
                    <TabsContent value="apple">
                    <div className="text-center py-10 space-y-4">
                        <AppleIcon className="h-16 w-16 mx-auto" />
                        <p>You&apos;ll be redirected to Apple Pay to complete your payment.</p>
                        <div className="flex justify-between mt-6">
                        <Button 
                            variant="outline" 
                            onClick={() => setStep("shipping")}
                        >
                            Back
                        </Button>
                        <Button onClick={() => setStep("review")}>
                            Continue with Apple Pay
                        </Button>
                        </div>
                    </div>
                    </TabsContent>
                    
                    <TabsContent value="google">
                    <div className="text-center py-10 space-y-4">
                        <GoogleIcon className="h-16 w-16 mx-auto" />
                        <p>You&apos;ll be redirected to Google Pay to complete your payment.</p>
                        <div className="flex justify-between mt-6">
                        <Button 
                            variant="outline" 
                            onClick={() => setStep("shipping")}
                        >
                            Back
                        </Button>
                        <Button onClick={() => setStep("review")}>
                            Continue with Google Pay
                        </Button>
                        </div>
                    </div>
                    </TabsContent>
                </Tabs>
                </div>
            )}
            
            {/* Order Review Step */}
            {step === "review" && shippingData && (
                <div>
                <h2 className="text-xl font-semibold mb-4">Review Your Order</h2>
                
                <div className="space-y-6">
                    {/* Shipping Address */}
                    <div>
                    <h3 className="font-medium mb-2 flex items-center justify-between">
                        <span>Shipping Address</span>
                        <Button 
                        variant="link" 
                        className="text-sm h-auto p-0"
                        onClick={() => setStep("shipping")}
                        >
                        Edit
                        </Button>
                    </h3>
                    <div className="bg-gray-50 p-3 rounded text-sm">
                        <p>{shippingData.firstName} {shippingData.lastName}</p>
                        <p>{shippingData.address}</p>
                        <p>{shippingData.city}, {shippingData.state} {shippingData.zip}</p>
                        <p>{shippingData.country}</p>
                        <p>{shippingData.phone}</p>
                        <p>{shippingData.email}</p>
                    </div>
                    </div>
                    
                    {/* Payment Method */}
                    <div>
                    <h3 className="font-medium mb-2 flex items-center justify-between">
                        <span>Payment Method</span>
                        <Button 
                        variant="link" 
                        className="text-sm h-auto p-0"
                        onClick={() => setStep("payment")}
                        >
                        Edit
                        </Button>
                    </h3>
                    <div className="bg-gray-50 p-3 rounded text-sm flex items-center">
                        {getPaymentIcon(paymentMethod)}
                        <span className="ml-2">
                        {paymentMethods.find(m => m.id === paymentMethod)?.name}
                        </span>
                    </div>
                    </div>
                    
                    {/* Order Items */}
                    <div>
                    <h3 className="font-medium mb-2">Order Items</h3>
                    <div className="bg-gray-50 p-3 rounded">
                        <div className="space-y-3">
                        {items.map(item => (
                            <div key={item.product.id} className="flex items-center">
                            <Image width={48} height={48} 
                                src={item.product.image} 
                                alt={item.product.name}
                                className="w-12 h-12 object-cover rounded mr-3"
                            />
                            <div className="flex-1">
                                <div className="font-medium">{item.product.name}</div>
                                <div className="text-sm text-gray-500">
                                Qty: {item.quantity}
                                </div>
                            </div>
                            <div className="text-right">
                                ${(item.product.price * item.quantity).toFixed(2)}
                            </div>
                            </div>
                        ))}
                        </div>
                    </div>
                    </div>
                    
                    {/* Order Summary */}
                    <div>
                    <h3 className="font-medium mb-2">Order Summary</h3>
                    <div className="bg-gray-50 p-3 rounded">
                        <div className="space-y-2">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Shipping</span>
                            <span>
                            {shippingCost === 0 ? (
                                <span className="text-green-600">Free</span>
                            ) : (
                                `$${shippingCost.toFixed(2)}`
                            )}
                            </span>
                        </div>
                        <Separator />
                        <div className="flex justify-between font-bold">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                        </div>
                    </div>
                    </div>
                    
                    <div className="pt-4">
                    <Button 
                        className="w-full" 
                        size="lg"
                        onClick={placeOrder}
                    >
                        Place Order
                    </Button>
                    <p className="text-xs text-gray-500 text-center mt-2">
                        By placing your order, you agree to our terms and conditions.
                    </p>
                    </div>
                </div>
                </div>
            )}
            </CardContent>
        </Card>
        </div>
    </div>
    </main>
  );
};

export default CheckoutPage;