

import { useState } from 'react'
import { useRouter } from 'next/router'
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
import { PaymentMethod, ShippingMethod } from '@prisma/client'
import PaymentIcons from '@/components/icons/payment-icons'
import Image from 'next/image'


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
          items: items.map(item => ({
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
            {items.map((item) => (
                <div key={item.product.id} className="flex py-3 border-b">
                <div className="w-16 h-16 mr-4">
                    <Image fill 
                    src={item.product.image} 
                    alt={item.product.name as string}
                    className="w-full h-full object-contain"
                    />
                </div>
                <div>
                    <p className="font-medium">{item.product.name}</p>
                    <div className="flex justify-between mt-1">
                    <span className="text-sm text-gray-500">Qty {item.quantity}</span>
                    <span className="font-medium">${(Number(item.product.price) * Number(item.quantity)).toFixed(2)}</span>
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