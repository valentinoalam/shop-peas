import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const revalidate = 3600 // Revalidate this API route every hour

export async function GET() {
  try {
    const categories = await prisma.category.findMany()
    return NextResponse.json(categories.map(c => c.name))
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    )
  }
}