// import { type NextRequest, NextResponse } from "next/server"
// import { getServerSession } from "next-auth/next"
// import { authOptions } from "@/lib/auth"
// import prisma from "@/lib/prisma"

// // Update cart item
// export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
//   try {
//     const session = await getServerSession(authOptions)

//     if (!session?.user) {
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
//     }

//     const { quantity } = await request.json()
//     const {id} = await params

//     // Find cart item
//     const cartItem = await prisma.cartItem.findUnique({
//       where: { id },
//       include: {
//         cart: true,
//         product: true,
//       },
//     })

//     if (!cartItem) {
//       return NextResponse.json({ message: "Cart item not found" }, { status: 404 })
//     }

//     // Verify ownership
//     if (cartItem.cart.userId !== session.user.id) {
//       return NextResponse.json({ message: "Unauthorized" }, { status: 403 })
//     }

//     // Verify stock availability
//     if (cartItem.product.stock < quantity) {
//       return NextResponse.json({ message: "Not enough stock" }, { status: 400 })
//     }

//     // Update cart item
//     await prisma.cartItem.update({
//       where: { id },
//       data: { quantity },
//     })

//     return NextResponse.json({ message: "Cart updated" })
//   } catch (error) {
//     console.error("Error updating cart:", error)
//     return NextResponse.json({ message: "Error updating cart" }, { status: 500 })
//   }
// }

// // Remove cart item
// export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
//   try {
//     const session = await getServerSession(authOptions)

//     if (!session?.user) {
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
//     }

//     const {id} = await params

//     // Find cart item
//     const cartItem = await prisma.cartItem.findUnique({
//       where: { id },
//       include: {
//         cart: true,
//       },
//     })

//     if (!cartItem) {
//       return NextResponse.json({ message: "Cart item not found" }, { status: 404 })
//     }

//     // Verify ownership
//     if (cartItem.cart.userId !== session.user.id) {
//       return NextResponse.json({ message: "Unauthorized" }, { status: 403 })
//     }

//     // Delete cart item
//     await prisma.cartItem.delete({
//       where: { id },
//     })

//     return NextResponse.json({ message: "Item removed from cart" })
//   } catch (error) {
//     console.error("Error removing cart item:", error)
//     return NextResponse.json({ message: "Error removing cart item" }, { status: 500 })
//   }
// }
import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

// Helper function to get user ID from request
// In a real app, this would use your authentication system
async function getUserId(req: NextRequest): Promise<string | null> {
  // This is a placeholder - replace with your actual auth logic
  const authHeader = req.headers.get("authorization")
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null
  }

  const token = authHeader.substring(7)
  // Validate token and get user ID
  if (token === "demo-token") {
    return "demo-user-id"
  }

  return null
}

// PUT /api/cart/[productId] - Update a specific cart item
export async function PUT(req: NextRequest, { params }: { params: { productId: string } }) {
  try {
    const userId = await getUserId(req)

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const productId = params.productId
    const body = await req.json()
    const { quantity } = body as { quantity: number }

    if (typeof quantity !== "number" || quantity < 0) {
      return NextResponse.json({ error: "Invalid quantity" }, { status: 400 })
    }

    if (quantity === 0) {
      // Remove the item if quantity is 0
      await prisma.cartItem.deleteMany({
        where: {
          userId,
          productId,
        },
      })
    } else {
      // Upsert the cart item (create if doesn't exist, update if it does)
      await prisma.cartItem.upsert({
        where: {
          userId_productId: {
            userId,
            productId,
          },
        },
        update: {
          quantity,
        },
        create: {
          userId,
          productId,
          quantity,
        },
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating cart item:", error)
    return NextResponse.json({ error: "Failed to update cart item" }, { status: 500 })
  }
}

// DELETE /api/cart/[productId] - Remove a specific cart item
export async function DELETE(req: NextRequest, { params }: { params: { productId: string } }) {
  try {
    const userId = await getUserId(req)

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const productId = params.productId

    await prisma.cartItem.deleteMany({
      where: {
        userId,
        productId,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error removing cart item:", error)
    return NextResponse.json({ error: "Failed to remove cart item" }, { status: 500 })
  }
}
