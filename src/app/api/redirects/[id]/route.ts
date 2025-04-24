import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    await prisma.redirect.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting redirect:", error)
    return NextResponse.json({ error: "Failed to delete redirect" }, { status: 500 })
  }
}
