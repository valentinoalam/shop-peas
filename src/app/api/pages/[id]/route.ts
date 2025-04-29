import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const {id} = await params

    const page = await prisma.page.findUnique({
      where: { id },
      include: {
        analyses: {
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
        },
      },
    })

    if (!page) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 })
    }

    return NextResponse.json(page)
  } catch (error) {
    console.error("Error fetching page:", error)
    return NextResponse.json({ error: "Failed to fetch page" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const {id} = await params
    const body = await request.json()
    const { path, title, description, keywords } = body

    // Validate required fields
    if (!path || !title) {
      return NextResponse.json({ error: "Path and title are required" }, { status: 400 })
    }

    // Check if another page with this path already exists
    const existingPage = await prisma.page.findFirst({
      where: {
        path,
        id: {
          not: id,
        },
      },
    })

    if (existingPage) {
      return NextResponse.json({ error: "Another page with this path already exists" }, { status: 400 })
    }

    const page = await prisma.page.update({
      where: { id },
      data: {
        path,
        title,
        description,
        keywords,
      },
    })

    return NextResponse.json(page)
  } catch (error) {
    console.error("Error updating page:", error)
    return NextResponse.json({ error: "Failed to update page" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const {id} = await params

    // Delete associated analyses first
    await prisma.analysis.deleteMany({
      where: { pageId: id },
    })

    // Then delete the page
    await prisma.page.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting page:", error)
    return NextResponse.json({ error: "Failed to delete page" }, { status: 500 })
  }
}
