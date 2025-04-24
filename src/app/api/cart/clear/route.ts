import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { auth } from '@/lib/auth';

const prisma = new PrismaClient();

export async function POST() {
  // Get the authenticated user from the session
  const session = await auth();
  
  if (!session?.user) {
    return NextResponse.json(
      { error: 'You must be logged in' },
      { status: 401 }
    );
  }

  try {
    const userId = session.user.id;
    
    // Find user's cart
    const cart = await prisma.cart.findUnique({
      where: { userId },
    });

    if (!cart) {
      return NextResponse.json(
        { error: 'Cart not found' },
        { status: 404 }
      );
    }

    // Delete all cart items
    await prisma.cartItem.deleteMany({
      where: { cartId: cart.id },
    });

    return NextResponse.json(
      { message: 'Cart cleared successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error clearing cart:', error);
    return NextResponse.json(
      { error: 'Failed to clear cart' },
      { status: 500 }
    );
  }
}