// app/api/products/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'
export const revalidate = 3600

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    
    // Parse filters
    const category = searchParams.get('category') || undefined
    const minPrice = Number(searchParams.get('minPrice')) || 0
    const maxPrice = Number(searchParams.get('maxPrice')) || 1000
    const sort = searchParams.get('sort')?.split('-') || ['price', 'asc']

    // Build Prisma query
    const products = await prisma.product.findMany({
      where: {
        category: { name: category },
        price: { gte: minPrice, lte: maxPrice }
      },
      include: {
        category: true,
        reviews: { select: { id: true } }
      },
      orderBy: { [sort[0]]: sort[1] }
    })

    return NextResponse.json({
      data: JSON.parse(JSON.stringify(products)),
      error: null
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600',
        'CDN-Cache-Control': 'public, s-maxage=3600'
      }
    })
  } catch (error) {
    console.error("Error fetching page:", error)
    return NextResponse.json(
      { data: null, error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}