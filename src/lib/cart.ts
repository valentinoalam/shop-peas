"use server"

import { CartItem } from "@/context/cart-context"
import prisma from "@/lib/prisma"

/**
 * Save cart items to the database for a specific user
 */
export async function saveCartToDatabase(userId: string, items: CartItem[]): Promise<void> {
  try {
    // Start a transaction to ensure all operations succeed or fail together
    await prisma.$transaction(async (tx) => {
      // Delete existing cart items for this user
      await tx.cartItem.deleteMany({
        where: { userId },
      })

      // Insert new cart items
      if (items.length > 0) {
        await Promise.all(
          items.map((item) =>
            tx.cartItem.create({
              data: {
                userId,
                productId: item.product.id,
                quantity: item.quantity,
              },
            }),
          ),
        )
      }
    })

    console.log(`Saved ${items.length} items to database for user ${userId}`)
  } catch (error) {
    console.error("Error saving cart to database:", error)
    throw new Error("Failed to save cart to database")
  }
}

/**
 * Get cart items from the database for a specific user
 */
export async function getUserCart(userId: string): Promise<CartItem[]> {
  try {
    const cartItems = await prisma.cartItem.findMany({
      where: { userId },
      include: { product: true },
    })

    return cartItems.map((item) => ({
      product: item.product,
      quantity: item.quantity,
    }))
  } catch (error) {
    console.error("Error getting cart from database:", error)
    throw new Error("Failed to get cart from database")
  }
}

/**
 * Merge local cart with database cart
 * This is useful when a user logs in and we want to combine their guest cart with their saved cart
 */
export async function mergeCartsOnLogin(userId: string, localCart: CartItem[]): Promise<CartItem[]> {
  try {
    // 1. Get the user's cart from the database
    const dbCart = await getUserCart(userId)

    // 2. Merge the carts, preferring higher quantities
    const mergedCart = [...dbCart]

    localCart.forEach((localItem) => {
      const dbItemIndex = mergedCart.findIndex((dbItem) => dbItem.product.id === localItem.product.id)

      if (dbItemIndex >= 0) {
        // Item exists in both carts, keep the higher quantity
        mergedCart[dbItemIndex].quantity = Math.max(mergedCart[dbItemIndex].quantity, localItem.quantity)
      } else {
        // Item only exists in local cart, add it
        mergedCart.push(localItem)
      }
    })

    // 3. Save the merged cart back to the database
    await saveCartToDatabase(userId, mergedCart)

    return mergedCart
  } catch (error) {
    console.error("Error merging carts:", error)
    throw new Error("Failed to merge carts")
  }
}
