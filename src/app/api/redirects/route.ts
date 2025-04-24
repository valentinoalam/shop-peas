import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    const redirects = await prisma.redirect.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(redirects)
  } catch (error) {
    console.error("Error fetching redirects:", error)
    return NextResponse.json({ error: "Failed to fetch redirects" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { source, destination, permanent } = body

    // Validate required fields
    if (!source || !destination) {
      return NextResponse.json({ error: "Source and destination are required" }, { status: 400 })
    }

    // Check if redirect with this source already exists
    const existingRedirect = await prisma.redirect.findUnique({
      where: { source },
    })

    if (existingRedirect) {
      return NextResponse.json({ error: "A redirect with this source already exists" }, { status: 400 })
    }

    const redirect = await prisma.redirect.create({
      data: {
        source,
        destination,
        permanent: permanent ?? true,
      },
    })

    return NextResponse.json(redirect)
  } catch (error) {
    console.error("Error creating redirect:", error)
    return NextResponse.json({ error: "Failed to create redirect" }, { status: 500 })
  }
}
