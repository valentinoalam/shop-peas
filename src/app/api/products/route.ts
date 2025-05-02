// app/api/products/route.ts
import { NextRequest, NextResponse } from 'next/server'
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
      },
      orderBy: {
        name: "asc",
      },
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

export async function POST(req: NextRequest) {
  try {
    // In a real app, you would check if the user is an admin

    const body = await req.json()
    const { name, description, featured, category, price, weight, stock, image } = body

    if (!name || typeof price !== "number") {
      return NextResponse.json({ error: "Invalid product data" }, { status: 400 })
    }

    const product = await prisma.product.create({
      data: {
        name,
        slug: slugify(name),
        category,
        description,
        price,
        weight,
        stock,
        image,
        rating: 0,
        featured
      },
    })

    return NextResponse.json({ product }, { status: 201 })
  } catch (error) {
    console.error("Error creating product:", error)
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
  }
}

function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w-]+/g, '') // Remove all non-word chars
    .replace(/--+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
}