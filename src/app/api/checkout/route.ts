// import { type NextRequest, NextResponse } from "next/server"
// import { getServerSession } from "next-auth/next"
// import { authOptions } from "@/lib/auth"
// import prisma from "@/lib/prisma"
// import { Midtrans } from "@/lib/midtrans"

// export async function POST(request: NextRequest) {
//   // Start a transaction
//   const transaction = await prisma.$transaction(async (tx) => {
//     try {
//       const session = await getServerSession(authOptions)

//       if (!session?.user) {
//         return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
//       }

//       const { selectedShipping, shippingCost } = await request.json()
//       const parsedShipping = JSON.parse(selectedShipping)
//       const shippingFee = Number.parseInt(shippingCost, 10)

//       // Get user info
//       const user = await tx.user.findUnique({
//         where: { id: session.user.id },
//       })

//       if (!user) {
//         return NextResponse.json({ message: "User not found" }, { status: 404 })
//       }

//       // Find user's cart and items
//       const cart = await tx.cart.findUnique({
//         where: { userId: user.id },
//         include: {
//           items: {
//             include: {
//               product: true,
//             },
//           },
//         },
//       })

//       if (!cart || cart.items.length === 0) {
//         return NextResponse.json({ message: "Cart is empty" }, { status: 400 })
//       }

//       // Calculate product total
//       const productTotal = cart.items.reduce((sum, item) => {
//         return sum + item.product.price * item.quantity
//       }, 0)

//       const totalAmount = productTotal + shippingFee

//       // const shippingAddress = `${user.addressDetail}, ${user.village}, ${user.district}, ${user.city}, ${user.province}, ${user.postalCode}`

//       // Create order
//       const order = await tx.order.create({
//         data: {
//           userId: user.id,
//           total: productTotal,
//           subtotal: productTotal,
//           shippingCost: shippingFee,
//           shippingMethodId: parsedShipping.id,
//           // shippingAddress: shippingAddress,
//           status: "PENDING",
//         },
//       })

//       // Create order items & update stock
//       for (const cartItem of cart.items) {
//         if (cartItem.product.stock < cartItem.quantity) {
//           throw new Error(`Insufficient stock for ${cartItem.product.name}`)
//         }

//         // Update product stock
//         await tx.product.update({
//           where: { id: cartItem.product.id },
//           data: { stock: cartItem.product.stock - cartItem.quantity },
//         })

//         // Create order item
//         await tx.orderItem.create({
//           data: {
//             orderId: order.id,
//             productId: cartItem.product.id,
//             quantity: cartItem.quantity,
//             price: cartItem.product.price,
//           },
//         })
//       }

//       // Clear cart
//       await tx.cartItem.deleteMany({
//         where: { cartId: cart.id },
//       })

//       // Prepare item details for Midtrans
//       const itemDetails = cart.items.map((item) => ({
//         id: item.product.id,
//         price: item.product.price,
//         quantity: item.quantity,
//         name: item.product.name.substring(0, 50), // Midtrans has 50 char limit
//       }))

//       // Add shipping fee as an item
//       itemDetails.push({
//         id: "SHIPPING",
//         price: shippingFee,
//         quantity: 1,
//         name: `Shipping Fee (${parsedShipping.name})`,
//       })

//       // Generate order ID for Midtrans
//       const midtransOrderId = `ORDER-${order.id}-${Date.now()}`

//       // Initialize Midtrans transaction
//       const midtrans = new Midtrans()
//       const transaction = await midtrans.createTransaction({
//         transaction_details: {
//           order_id: midtransOrderId,
//           gross_amount: totalAmount,
//         },
//         item_details: itemDetails,
//         customer_details: {
//           first_name: user.fullName || user.name,
//           email: user.email,
//           phone: user.phone || "0812345678",
//         },
//         credit_card: {
//           secure: true,
//         },
//         callbacks: {
//           finish: `${process.env.NEXT_PUBLIC_BASE_URL}/order/status/${order.id}`,
//           error: `${process.env.NEXT_PUBLIC_BASE_URL}/order/error/${order.id}`,
//           pending: `${process.env.NEXT_PUBLIC_BASE_URL}/order/pending/${order.id}`,
//         },
//       })

//       // Update order with Midtrans orderId
//       await tx.order.update({
//         where: { id: order.id },
//         data: {
//           midtransOrderId,
//           paymentToken: transaction.token,
//         },
//       })

//       return {
//         success: true,
//         orderId: order.id,
//         paymentToken: transaction.token,
//       }
//     } catch (error) {
//       console.error("Error during checkout:", error)
//       throw error
//     }
//   })

//   if (transaction.success) {
//     return NextResponse.json(transaction)
//   } else {
//     return NextResponse.json({ message: "Error during checkout" }, { status: 500 })
//   }
// }

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { CartItem, OrderStatus, Prisma } from '@prisma/client';
export type CartItemWithPrice = Prisma.CartItemGetPayload<{
  include: {
    product: { select: { price: true } };
  }
}>
export const POST = async (req: Request) => {
  try {
    const body = await req.json();

    // Validate required fields
    const requiredFields = [
      'email',
      'firstName',
      'lastName',
      'address',
      'city',
      'state',
      'zipCode',
      'shippingMethodId',
      'paymentMethodId',
      'items'
    ];
    
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Verify shipping method exists
    const shippingMethod = await prisma.shippingMethod.findUnique({
      where: { id: body.shippingMethodId },
    });

    if (!shippingMethod) {
      return NextResponse.json(
        { error: 'Invalid shipping method' },
        { status: 400 }
      );
    }

    // Verify payment method exists
    const paymentMethod = await prisma.paymentMethod.findUnique({
      where: { id: body.paymentMethodId },
    });

    if (!paymentMethod) {
      return NextResponse.json(
        { error: 'Invalid payment method' },
        { status: 400 }
      );
    }

    // Calculate order totals
    let subtotal = 0;
    const itemsWithPrice = await Promise.all(
      body.items.map(async (item: CartItem) => {
        const product = await prisma.product.findUnique({
          where: { id: item.productId },
          select: { price: true },
        });

        if (!product) {
          throw new Error(`Product not found: ${item.productId}`);
        }

        return {
          ...item,
          price: product.price,
        };
      })
    );

    subtotal = itemsWithPrice.reduce(
      (sum: number, item: CartItemWithPrice) => sum + item.product.price * item.quantity,
      0
    );

    const shippingCost = shippingMethod.price;
    const total = subtotal + shippingCost;

    // Create transaction
    const order = await prisma.$transaction(async (tx) => {
      // Create order
      const newOrder = await tx.order.create({
        data: {
          email: body.email,
          firstName: body.firstName,
          lastName: body.lastName,
          address: body.address,
          city: body.city,
          state: body.state,
          zipCode: body.zipCode,
          total,
          shippingCost,
          subtotal,
          status: OrderStatus.PENDING,
          shippingMethodId: body.shippingMethodId,
          paymentMethodId: body.paymentMethodId,
          userId: body.userId || null,
          discountCode: body.discountCode,
          discountAmount: body.discountAmount,
        },
      });

      // Create order items
      await tx.orderItem.createMany({
        data: itemsWithPrice.map((item: CartItemWithPrice) => ({
          quantity: item.quantity,
          price: item.product.price,
          orderId: newOrder.id,
          productId: item.productId,
        })),
      });

      return newOrder;
    });

    return NextResponse.json(order, { status: 201 });

  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: error || 'Failed to process checkout' },
      { status: 500 }
    );
  }
};