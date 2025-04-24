import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"

// Update cart item
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { quantity } = await request.json()
    const cartItemId = params.id

    // Find cart item
    const cartItem = await prisma.cartItem.findUnique({
      where: { id: cartItemId },
      include: {
        cart: true,
        product: true,
      },
    })

    if (!cartItem) {
      return NextResponse.json({ message: "Cart item not found" }, { status: 404 })
    }

    // Verify ownership
    if (cartItem.cart.userId !== session.user.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 })
    }

    // Verify stock availability
    if (cartItem.product.stock < quantity) {
      return NextResponse.json({ message: "Not enough stock" }, { status: 400 })
    }

    // Update cart item
    await prisma.cartItem.update({
      where: { id: cartItemId },
      data: { quantity },
    })

    return NextResponse.json({ message: "Cart updated" })
  } catch (error) {
    console.error("Error updating cart:", error)
    return NextResponse.json({ message: "Error updating cart" }, { status: 500 })
  }
}

// Remove cart item
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const cartItemId = params.id

    // Find cart item
    const cartItem = await prisma.cartItem.findUnique({
      where: { id: cartItemId },
      include: {
        cart: true,
      },
    })

    if (!cartItem) {
      return NextResponse.json({ message: "Cart item not found" }, { status: 404 })
    }

    // Verify ownership
    if (cartItem.cart.userId !== session.user.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 })
    }

    // Delete cart item
    await prisma.cartItem.delete({
      where: { id: cartItemId },
    })

    return NextResponse.json({ message: "Item removed from cart" })
  } catch (error) {
    console.error("Error removing cart item:", error)
    return NextResponse.json({ message: "Error removing cart item" }, { status: 500 })
  }
}
