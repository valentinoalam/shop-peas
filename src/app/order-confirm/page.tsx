// import { useEffect } from "react";
// import { Link } from "react-router-dom";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import { Button } from "@/components/ui/button";
// import { CheckCircle2 } from "lucide-react";

// const OrderConfirmPage = () => {
//   // Generate a random order number
//   const orderNumber = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
  
//   // Simulate an order date (current date)
//   const orderDate = new Date().toLocaleDateString('en-US', {
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric'
//   });
  
//   // Scroll to top on component mount
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);
  
//   return (
//     <div className="min-h-screen flex flex-col">
//       <Navbar />
      
//       <main className="flex-grow py-12 bg-gray-50">
//         <div className="container mx-auto px-4">
//           <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-sm">
//             <div className="text-center mb-8">
//               <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
//                 <CheckCircle2 className="h-10 w-10 text-green-600" />
//               </div>
              
//               <h1 className="text-3xl font-bold text-gray-900 mb-2">Thank You for Your Order!</h1>
//               <p className="text-gray-600">
//                 Your order has been confirmed and will be shipping soon.
//               </p>
//             </div>
            
//             <div className="space-y-6">
//               <div className="border border-gray-200 rounded-lg p-4">
//                 <div className="flex justify-between mb-2">
//                   <span className="text-gray-600">Order Number:</span>
//                   <span className="font-medium">{orderNumber}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Order Date:</span>
//                   <span>{orderDate}</span>
//                 </div>
//               </div>
              
//               <div>
//                 <h3 className="text-lg font-semibold mb-3">What Happens Next?</h3>
//                 <ol className="space-y-4">
//                   <li className="flex items-start">
//                     <div className="bg-shop-primary text-white h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
//                       1
//                     </div>
//                     <div>
//                       <h4 className="font-medium">Order Confirmation</h4>
//                       <p className="text-gray-600 text-sm">
//                         You will receive an order confirmation email with details of your order.
//                       </p>
//                     </div>
//                   </li>
                  
//                   <li className="flex items-start">
//                     <div className="bg-shop-primary text-white h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
//                       2
//                     </div>
//                     <div>
//                       <h4 className="font-medium">Order Processing</h4>
//                       <p className="text-gray-600 text-sm">
//                         We'll prepare your items and process your order for shipment.
//                       </p>
//                     </div>
//                   </li>
                  
//                   <li className="flex items-start">
//                     <div className="bg-shop-primary text-white h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
//                       3
//                     </div>
//                     <div>
//                       <h4 className="font-medium">Order Shipped</h4>
//                       <p className="text-gray-600 text-sm">
//                         Once your order is on the way, we'll send you a shipping confirmation email with tracking information.
//                       </p>
//                     </div>
//                   </li>
//                 </ol>
//               </div>
              
//               <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
//                 <Button asChild>
//                   <Link to="/">Continue Shopping</Link>
//                 </Button>
//                 <Button variant="outline" asChild>
//                   <Link to="/profile">View My Orders</Link>
//                 </Button>
//               </div>
              
//               <div className="text-center text-gray-500 text-sm pt-6">
//                 <p>Have questions about your order?</p>
//                 <Link to="/contact" className="text-shop-primary hover:underline">
//                   Contact our support team
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
      
//       <Footer />
//     </div>
//   );
// };

// export default OrderConfirmPage;

import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { Button } from '@/components/ui/button'
import { CheckCircle2, ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import { notFound } from 'next/navigation'

interface OrderConfirmPageProps {
  params: {
    orderId: string;
  };
  // order: {
  //   id: string
  //   total: number
  //   subtotal: number
  //   shippingCost: number
  //   createdAt: string
  //   status: string
  //   firstName?: string | null
  //   lastName?: string | null
  //   email?: string | null
  //   shippingMethod: {
  //     name: string
  //     estimated: string
  //   }
  //   paymentMethod: {
  //     name: string
  //   }
  //   items: {
  //     id: string
  //     quantity: number
  //     price: number
  //     product: {
  //       name: string
  //       image: string
  //     }
  //   }[]
  // } | null
}

export default async function OrderConfirmPage({ params }: OrderConfirmPageProps) {
  const { orderId } = await params;

  try {
    // Validate order ID format
    if (!orderId || typeof orderId !== 'string' || orderId.length < 10) {
      notFound();
    }

    // Fetch order with related data
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        shippingMethod: true,
        paymentMethod: true,
      },
    });

    if (!order) {
      notFound();
    }

    // Serialize Date objects
    const serializedOrder = {
      ...order,
      createdAt: order.createdAt.toISOString(),
      updatedAt: order.updatedAt.toISOString(),
      items: order.items.map(item => ({
        ...item,
        product: {
          ...item.product,
          createdAt: item.product.createdAt.toISOString(),
          updatedAt: item.product.updatedAt.toISOString(),
        }
      }))
    };

    return (
      <>
          <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-white rounded-lg shadow-md p-8">
              <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
              <p className="text-gray-600">
                  Thank you{serializedOrder.firstName ? `, ${serializedOrder.firstName}` : ''}! Your order has been received.
              </p>
              </div>
              
              <div className="border rounded-lg overflow-hidden mb-6">
              <div className="bg-gray-50 p-4 border-b">
                  <div className="flex flex-wrap justify-between items-center">
                  <div>
                      <h2 className="font-semibold">Order #{serializedOrder.id.slice(-8).toUpperCase()}</h2>
                      <p className="text-sm text-gray-500">
                      Placed on {new Date(serializedOrder.createdAt).toLocaleDateString()}
                      </p>
                  </div>
                  <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      {serializedOrder.status.charAt(0).toUpperCase() + serializedOrder.status.slice(1)}
                  </div>
                  </div>
              </div>
              
              <div className="p-4">
                  <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                      <h3 className="font-medium text-sm text-gray-500 mb-1">Shipping Method</h3>
                      <p>{serializedOrder.shippingMethod.name}</p>
                      <p className="text-sm text-gray-500">{serializedOrder.shippingMethod.estimated}</p>
                      </div>
                      <div>
                      <h3 className="font-medium text-sm text-gray-500 mb-1">Payment Method</h3>
                      <p>{serializedOrder.paymentMethod.name}</p>
                      </div>
                  </div>
                  
                  <div className="border-t pt-4">
                      <h3 className="font-medium mb-3">Order Items</h3>
                      <div className="space-y-3">
                      {serializedOrder.items.map(item => (
                          <div key={item.id} className="flex items-center">
                          <div className="h-16 w-16 bg-gray-100 rounded mr-4 overflow-hidden">
                              <Image fill
                              src={item.product.image} 
                              alt={item.product.name}
                              className="h-full w-full object-contain"
                              />
                          </div>
                          <div className="flex-grow">
                              <p className="font-medium">{item.product.name}</p>
                              <div className="text-sm text-gray-500">
                              Qty: {item.quantity} × ${item.price.toFixed(2)}
                              </div>
                          </div>
                          <div className="font-medium">
                              ${(item.quantity * item.price).toFixed(2)}
                          </div>
                          </div>
                      ))}
                      </div>
                  </div>
                  </div>
              </div>
              
              <div className="bg-gray-50 p-4 border-t">
                  <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>${serializedOrder.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                      <span>Shipping</span>
                      <span>${serializedOrder.shippingCost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold pt-2 border-t">
                      <span>Total</span>
                      <span>${serializedOrder.total.toFixed(2)}</span>
                  </div>
                  </div>
              </div>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
              <Button asChild>
                  <Link href="/">
                  Return to Home
                  </Link>
              </Button>
              <Button variant="outline" asChild>
                  <Link href="/products">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Continue Shopping
                  </Link>
              </Button>
              </div>
          </div>
          </div>
      </>
    )
  } catch (error) {
    console.error('Order fetch error:', error);
    notFound();
  }
}