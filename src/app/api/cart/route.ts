// import { type NextRequest, NextResponse } from "next/server"
// import { getServerSession } from "next-auth/next"
// import { authOptions } from "@/lib/auth"
// import prisma from "@/lib/prisma"
// import { getSession } from "next-auth/react"

// // Get cart items
// export async function GET() {
//   try {
//     const session = await getServerSession(authOptions)

//     if (!session?.user) {
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
//     }

//     // Find or create cart for user
//     let cart = await prisma.cart.findUnique({
//       where: { userId: session.user.id },
//       include: {
//         items: {
//           include: {
//             product: {
//               select: {
//                 id: true,
//                 name: true,
//                 price: true,
//                 image: true,
//               },
//             },
//           },
//         },
//       },
//     })

//     if (!cart) {
//       cart = await prisma.cart.create({
//         data: {
//           userId: session.user.id,
//         },
//         include: {
//           items: {
//             include: {
//               product: true,
//             },
//           },
//         },
//       })
//     }

//     // Calculate total price
//     const totalPrice = cart.items.reduce((sum, item) => {
//       return sum + item.product.price * item.quantity
//     }, 0)

//     // Get total items count
//     const cartCount = cart.items.reduce((sum, item) => sum + item.quantity, 0)

//     return NextResponse.json({
//       cartItems: cart.items,
//       totalPrice,
//       cartCount,
//     })
//   } catch (error) {
//     console.error("Error fetching cart:", error)
//     return NextResponse.json({ message: "Error fetching cart" }, { status: 500 })
//   }
// }

// // Add to cart
// export async function POST(request: NextRequest) {
//   try {
//     const session = await getServerSession(authOptions)

//     if (!session?.user) {
//       return NextResponse.json({ message: "Please log in to add items to the cart" }, { status: 401 })
//     }

//     const { productId, quantity } = await request.json()

//     // Verify product exists and has enough stock
//     const product = await prisma.product.findUnique({
//       where: { id: productId },
//     })

//     if (!product) {
//       return NextResponse.json({ message: "Product not found" }, { status: 404 })
//     }

//     if (product.stock < quantity) {
//       return NextResponse.json({ message: "Not enough stock" }, { status: 400 })
//     }

//     // Get or create cart
//     let cart = await prisma.cart.findUnique({
//       where: { userId: session.user.id },
//     })

//     if (!cart) {
//       cart = await prisma.cart.create({
//         data: {
//           userId: session.user.id,
//         },
//       })
//     }

//     // Check if product already in cart
//     const cartItem = await prisma.cartItem.findFirst({
//       where: {
//         cartId: cart.id,
//         productId,
//       },
//     })

//     if (cartItem) {
//       // Update quantity if product already in cart
//       await prisma.cartItem.update({
//         where: { id: cartItem.id },
//         data: {
//           quantity: cartItem.quantity + quantity,
//         },
//       })
//     } else {
//       // Create new cart item
//       await prisma.cartItem.create({
//         data: {
//           cartId: cart.id,
//           productId,
//           quantity,
//         },
//       })
//     }

//     return NextResponse.json({ message: "Product added to cart" })
//   } catch (error) {
//     console.error("Error adding to cart:", error)
//     return NextResponse.json({ message: "Error adding to cart" }, { status: 500 })
//   }
// }
import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { getUserCart, saveCartToDatabase } from "@/lib/cart"
import type { CartItem } from "@/context/cart-context"

// Helper function to get user ID from request
// In a real app, this would use your authentication system
async function getUserId(req: NextRequest): Promise<string | null> {
  // This is a placeholder - replace with your actual auth logic
  // For example, you might get the user ID from a session cookie or JWT
  const authHeader = req.headers.get("authorization")
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null
  }

  const token = authHeader.substring(7)
  // Validate token and get user ID
  // This is just an example - implement your actual auth logic
  if (token === "demo-token") {
    return "demo-user-id"
  }

  return null
}

// GET /api/cart - Get the current user's cart
export async function GET(req: NextRequest) {
  try {
    const userId = await getUserId(req)

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const cart = await getUserCart(userId)
    return NextResponse.json({ cart })
  } catch (error) {
    console.error("Error fetching cart:", error)
    return NextResponse.json({ error: "Failed to fetch cart" }, { status: 500 })
  }
}

// POST /api/cart - Update the cart (replace entire cart)
export async function POST(req: NextRequest) {
  try {
    const userId = await getUserId(req)

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { items } = body as { items: CartItem[] }

    if (!Array.isArray(items)) {
      return NextResponse.json({ error: "Invalid cart data" }, { status: 400 })
    }

    await saveCartToDatabase(userId, items)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating cart:", error)
    return NextResponse.json({ error: "Failed to update cart" }, { status: 500 })
  }
}

// DELETE /api/cart - Clear the cart
export async function DELETE(req: NextRequest) {
  try {
    const userId = await getUserId(req)

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await prisma.cartItem.deleteMany({
      where: { userId },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error clearing cart:", error)
    return NextResponse.json({ error: "Failed to clear cart" }, { status: 500 })
  }
}
