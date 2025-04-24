import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    const schemas = await prisma.schemaMarkup.findMany({
      orderBy: {
        updatedAt: "desc",
      },
    })

    return NextResponse.json(schemas)
  } catch (error) {
    console.error("Error fetching schemas:", error)
    return NextResponse.json({ error: "Failed to fetch schemas" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { pageId, type, data } = body

    // Validate required fields
    if (!type || !data) {
      return NextResponse.json({ error: "Type and data are required" }, { status: 400 })
    }

    const schema = await prisma.schemaMarkup.create({
      data: {
        pageId,
        type,
        data,
      },
    })

    return NextResponse.json(schema)
  } catch (error) {
    console.error("Error creating schema:", error)
    return NextResponse.json({ error: "Failed to create schema" }, { status: 500 })
  }
}
