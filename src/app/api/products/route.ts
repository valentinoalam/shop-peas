// app/api/products/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const revalidate = 3600 // Revalidate this API route every hour

export async function GET() {
  try {
    
    // Fetch all products with their categories and reviews
    const products = await prisma.product.findMany({
      include: {
        category: true,
        reviews: {
          select: { id: true }
        },
      }
    })

    // Serialize before sending
    return NextResponse.json(JSON.parse(JSON.stringify(products)))
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}