// 'use client'
// import { useState } from "react";

// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import { Button } from "@/components/ui/button";
// import { 
//   Card, 
//   CardContent 
// } from "@/components/ui/card";
// import { 
//   Table, 
//   TableBody, 
//   TableCell, 
//   TableHead, 
//   TableHeader, 
//   TableRow 
// } from "@/components/ui/table";
// import { 
//   Trash2, 
//   MinusCircle, 
//   PlusCircle, 
//   ShoppingBag, 
//   ArrowRight 
// } from "lucide-react";
// import { useCart } from "@/context/CartContext";
// import { Separator } from "@/components/ui/separator";
// import { 
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { shippingMethods } from "@/data/shipping";

// const CartPage = () => {
//   const navigate = useNavigate();
//   const { 
//     items, 
//     updateQuantity, 
//     removeFromCart, 
//     subtotal, 
//     shippingMethod,
//     setShippingMethod,
//     shippingCost
//   } = useCart();
  
//   const total = subtotal + shippingCost;
  
//   const handleCheckout = () => {
//     navigate("/checkout");
//   };

//   if (items.length === 0) {
//     return (
//       <div className="min-h-screen flex flex-col">
//         <Navbar />
//         <main className="flex-grow py-16">
//           <div className="container mx-auto px-4 text-center">
//             <div className="max-w-md mx-auto">
//               <div className="mb-6 bg-gray-100 p-8 rounded-full inline-block">
//                 <ShoppingBag className="h-12 w-12 text-gray-400" />
//               </div>
//               <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
//               <p className="text-gray-600 mb-8">
//                 Looks like you haven't added any products to your cart yet.
//               </p>
//               <Button asChild size="lg">
//                 <Link to="/products">Continue Shopping</Link>
//               </Button>
//             </div>
//           </div>
//         </main>
//         <Footer />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Navbar />
      
//       <main className="flex-grow py-8">
//         <div className="container mx-auto px-4">
//           <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
          
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//             {/* Cart Items */}
//             <div className="lg:col-span-2">
//               <Card>
//                 <CardContent className="p-6">
//                   <div className="overflow-x-auto">
//                     <Table>
//                       <TableHeader>
//                         <TableRow>
//                           <TableHead className="w-[100px]">Product</TableHead>
//                           <TableHead>Description</TableHead>
//                           <TableHead>Quantity</TableHead>
//                           <TableHead className="text-right">Price</TableHead>
//                           <TableHead className="text-right">Total</TableHead>
//                           <TableHead className="w-[70px]"></TableHead>
//                         </TableRow>
//                       </TableHeader>
//                       <TableBody>
//                         {items.map((item) => (
//                           <TableRow key={item.product.id}>
//                             <TableCell>
//                               <Link to={`/product/${item.product.id}`}>
//                                 <img 
//                                   src={item.product.image} 
//                                   alt={item.product.name}
//                                   className="w-16 h-16 object-cover rounded"
//                                 />
//                               </Link>
//                             </TableCell>
//                             <TableCell>
//                               <Link 
//                                 to={`/product/${item.product.id}`}
//                                 className="font-medium hover:text-shop-primary"
//                               >
//                                 {item.product.name}
//                               </Link>
//                               <div className="text-sm text-gray-500">
//                                 {item.product.category}
//                               </div>
//                             </TableCell>
//                             <TableCell>
//                               <div className="flex items-center space-x-1">
//                                 <Button 
//                                   variant="ghost" 
//                                   size="icon" 
//                                   className="h-7 w-7"
//                                   onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
//                                   disabled={item.quantity <= 1}
//                                 >
//                                   <MinusCircle className="h-4 w-4" />
//                                 </Button>
//                                 <span className="w-6 text-center">{item.quantity}</span>
//                                 <Button 
//                                   variant="ghost" 
//                                   size="icon" 
//                                   className="h-7 w-7"
//                                   onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
//                                   disabled={item.quantity >= item.product.stock}
//                                 >
//                                   <PlusCircle className="h-4 w-4" />
//                                 </Button>
//                               </div>
//                             </TableCell>
//                             <TableCell className="text-right">
//                               ${item.product.price.toFixed(2)}
//                             </TableCell>
//                             <TableCell className="text-right font-medium">
//                               ${(item.product.price * item.quantity).toFixed(2)}
//                             </TableCell>
//                             <TableCell>
//                               <Button 
//                                 variant="ghost" 
//                                 size="icon" 
//                                 className="h-8 w-8 text-gray-500 hover:text-red-500"
//                                 onClick={() => removeFromCart(item.product.id)}
//                               >
//                                 <Trash2 className="h-4 w-4" />
//                               </Button>
//                             </TableCell>
//                           </TableRow>
//                         ))}
//                       </TableBody>
//                     </Table>
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>
            
//             {/* Order Summary */}
//             <div>
//               <Card className="sticky top-24">
//                 <CardContent className="p-6">
//                   <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                  
//                   <div className="space-y-4">
//                     <div className="flex justify-between">
//                       <span className="text-gray-600">Subtotal</span>
//                       <span>${subtotal.toFixed(2)}</span>
//                     </div>
                    
//                     <div>
//                       <label className="text-gray-600 block mb-2">Shipping</label>
//                       <Select 
//                         value={shippingMethod} 
//                         onValueChange={setShippingMethod}
//                       >
//                         <SelectTrigger className="w-full">
//                           <SelectValue placeholder="Select shipping method" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           {shippingMethods.map(method => (
//                             <SelectItem key={method.id} value={method.id}>
//                               {method.name} (${method.price.toFixed(2)}) - {method.estimated}
//                             </SelectItem>
//                           ))}
//                         </SelectContent>
//                       </Select>
                      
//                       <div className="mt-2 text-sm text-gray-500">
//                         {shippingMethod === "standard" && subtotal >= 100 ? (
//                           <span className="text-green-600">Free shipping on orders over $100!</span>
//                         ) : (
//                           <span>
//                             {shippingMethods.find(m => m.id === shippingMethod)?.estimated} delivery
//                           </span>
//                         )}
//                       </div>
//                     </div>
                    
//                     <div className="flex justify-between">
//                       <span className="text-gray-600">Shipping Cost</span>
//                       <span>
//                         {shippingCost === 0 ? (
//                           <span className="text-green-600">Free</span>
//                         ) : (
//                           `$${shippingCost.toFixed(2)}`
//                         )}
//                       </span>
//                     </div>
                    
//                     <Separator />
                    
//                     <div className="flex justify-between text-lg font-bold">
//                       <span>Total</span>
//                       <span>${total.toFixed(2)}</span>
//                     </div>
                    
//                     <Button 
//                       className="w-full" 
//                       size="lg"
//                       onClick={handleCheckout}
//                     >
//                       Proceed to Checkout
//                       <ArrowRight className="ml-2 h-4 w-4" />
//                     </Button>
                    
//                     <div className="text-center">
//                       <Link 
//                         to="/products" 
//                         className="text-shop-primary hover:underline text-sm"
//                       >
//                         Continue Shopping
//                       </Link>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>
//           </div>
//         </div>
//       </main>
      
//       <Footer />
//     </div>
//   );
// };

// export default CartPage;

import Link from 'next/link'
import { useCart } from '@/context/cart-context'
import { Button } from '@/components/ui/button'
import { 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight 
} from 'lucide-react'
import Image from 'next/image'

export default function CartPage() {
  const { 
    items, 
    removeFromCart, 
    updateQuantity, 
    subtotal,
    shippingCost,
    // shippingMethod,
    // setShippingMethod
  } = useCart()
  
  const total = subtotal + shippingCost
  
  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
        
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="mb-6">
            <ShoppingCart className="mx-auto h-16 w-16 text-gray-400" />
          </div>
          <h2 className="text-2xl font-medium mb-4">Your cart is empty</h2>
          <p className="text-gray-500 mb-8">
            Looks like you haven&apos;t added any products to your cart yet.
          </p>
          <Button asChild size="lg">
            <Link href="/products">
              Continue Shopping
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div 
              key={item.product.id} 
              className="bg-white rounded-lg shadow-sm p-4 flex flex-col sm:flex-row gap-4"
            >
              <div className="w-full sm:w-24 h-24">
                <Image fill
                  src={item.product.image} 
                  alt={item.product.name}
                  className="w-full h-full object-contain"
                />
              </div>
              
              <div className="flex-grow">
                <div className="flex justify-between">
                  <Link href={`/product/${item.product.id}`}>
                    <h3 className="font-medium hover:text-blue-600">{item.product.name}</h3>
                  </Link>
                  <p className="font-bold">${(item.product.price * item.quantity).toFixed(2)}</p>
                </div>
                
                <p className="text-sm text-gray-500 mt-1">${item.product.price.toFixed(2)} each</p>
                
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center border rounded-md">
                    <button 
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="px-2 py-1 border-r"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="px-4 py-1 text-sm">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      disabled={item.quantity >= item.product.stock}
                      className="px-2 py-1 border-l"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                  
                  <button 
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-red-500 hover:text-red-700 flex items-center"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    <span className="text-sm">Remove</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
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
            
            <Button asChild className="w-full" size="lg">
              <Link href="/checkout">
                Proceed to Checkout
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}