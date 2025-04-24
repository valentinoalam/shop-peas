import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    const pages = await prisma.page.findMany({
      orderBy: {
        updatedAt: "desc",
      },
    })

    return NextResponse.json(pages)
  } catch (error) {
    console.error("Error fetching pages:", error)
    return NextResponse.json({ error: "Failed to fetch pages" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { path, title, description, keywords } = body

    // Validate required fields
    if (!path || !title) {
      return NextResponse.json({ error: "Path and title are required" }, { status: 400 })
    }

    // Check if page with this path already exists
    const existingPage = await prisma.page.findUnique({
      where: { path },
    })

    if (existingPage) {
      return NextResponse.json({ error: "A page with this path already exists" }, { status: 400 })
    }

    const page = await prisma.page.create({
      data: {
        path,
        title,
        description,
        keywords,
      },
    })

    return NextResponse.json(page)
  } catch (error) {
    console.error("Error creating page:", error)
    return NextResponse.json({ error: "Failed to create page" }, { status: 500 })
  }
}
