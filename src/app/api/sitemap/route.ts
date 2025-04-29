import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

// Sitemap configuration model (we'll create this in the database)
interface SitemapConfig {
  id: string
  enabled: boolean
  excludedPaths: string
  lastGenerated: Date | null
  createdAt: Date
  updatedAt: Date
}

export async function GET() {
  try {
    // Try to get existing config
    let config = await prisma.$queryRaw`
      SELECT * FROM "SitemapConfig" LIMIT 1
    `

    // If no config exists, create a default one
    if (!config || (Array.isArray(config) && config.length === 0)) {
      // Create the table if it doesn't exist
      await prisma.$executeRaw`
        CREATE TABLE IF NOT EXISTS "SitemapConfig" (
          "id" TEXT PRIMARY KEY,
          "enabled" BOOLEAN DEFAULT TRUE,
          "excludedPaths" TEXT DEFAULT '',
          "lastGenerated" TIMESTAMP WITH TIME ZONE,
          "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        )
      `

      // Insert default config
      await prisma.$executeRaw`
        INSERT INTO "SitemapConfig" ("id", "enabled", "excludedPaths")
        VALUES ('default', TRUE, '')
      `

      // Get the newly created config
      config = await prisma.$queryRaw`
        SELECT * FROM "SitemapConfig" LIMIT 1
      `
    }

    return NextResponse.json(Array.isArray(config) ? config[0] : config)
  } catch (error) {
    console.error("Error fetching sitemap config:", error)
    return NextResponse.json({ error: "Failed to fetch sitemap config" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { enabled, excludedPaths, generate } = body

    // Update config
    await prisma.$executeRaw`
      UPDATE "SitemapConfig"
      SET 
        "enabled" = ${enabled},
        "excludedPaths" = ${excludedPaths},
        ${generate ? `"lastGenerated" = CURRENT_TIMESTAMP,` : ""}
        "updatedAt" = CURRENT_TIMESTAMP
      WHERE "id" = 'default'
      RETURNING *
    `

    // Get the updated config
    const config: SitemapConfig  = await prisma.$queryRaw`
      SELECT * FROM "SitemapConfig" LIMIT 1
    `

    return NextResponse.json(Array.isArray(config) ? config[0] : config)
  } catch (error) {
    console.error("Error updating sitemap config:", error)
    return NextResponse.json({ error: "Failed to update sitemap config" }, { status: 500 })
  }
}
