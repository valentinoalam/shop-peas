import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"

// Get cart items
export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    // Find or create cart for user
    let cart = await prisma.cart.findUnique({
      where: { userId: session.user.id },
      include: {
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                price: true,
                image: true,
              },
            },
          },
        },
      },
    })

    if (!cart) {
      cart = await prisma.cart.create({
        data: {
          userId: session.user.id,
        },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      })
    }

    // Calculate total price
    const totalPrice = cart.items.reduce((sum, item) => {
      return sum + item.product.price * item.quantity
    }, 0)

    // Get total items count
    const cartCount = cart.items.reduce((sum, item) => sum + item.quantity, 0)

    return NextResponse.json({
      cartItems: cart.items,
      totalPrice,
      cartCount,
    })
  } catch (error) {
    console.error("Error fetching cart:", error)
    return NextResponse.json({ message: "Error fetching cart" }, { status: 500 })
  }
}

// Add to cart
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ message: "Please log in to add items to the cart" }, { status: 401 })
    }

    const { productId, quantity } = await request.json()

    // Verify product exists and has enough stock
    const product = await prisma.product.findUnique({
      where: { id: productId },
    })

    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 })
    }

    if (product.stock < quantity) {
      return NextResponse.json({ message: "Not enough stock" }, { status: 400 })
    }

    // Get or create cart
    let cart = await prisma.cart.findUnique({
      where: { userId: session.user.id },
    })

    if (!cart) {
      cart = await prisma.cart.create({
        data: {
          userId: session.user.id,
        },
      })
    }

    // Check if product already in cart
    const cartItem = await prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId,
      },
    })

    if (cartItem) {
      // Update quantity if product already in cart
      await prisma.cartItem.update({
        where: { id: cartItem.id },
        data: {
          quantity: cartItem.quantity + quantity,
        },
      })
    } else {
      // Create new cart item
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity,
        },
      })
    }

    return NextResponse.json({ message: "Product added to cart" })
  } catch (error) {
    console.error("Error adding to cart:", error)
    return NextResponse.json({ message: "Error adding to cart" }, { status: 500 })
  }
}
