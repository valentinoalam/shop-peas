import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { analyzeFocusKeyphrase, analyzeReadability } from "@/lib/seo-utils"

export async function GET() {
  try {
    const analyses = await prisma.analysis.findMany({
      orderBy: {
        updatedAt: "desc",
      },
      include: {
        page: true,
      },
    })

    return NextResponse.json(analyses)
  } catch (error) {
    console.error("Error fetching analyses:", error)
    return NextResponse.json({ error: "Failed to fetch analyses" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { pageId, content, focusKeyphrase, title, description } = body

    // Validate required fields
    if (!pageId || !content) {
      return NextResponse.json({ error: "Page ID and content are required" }, { status: 400 })
    }

    // Check if page exists
    const page = await prisma.page.findUnique({
      where: { id: pageId },
    })

    if (!page) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 })
    }

    // Perform SEO analysis
    const keyphraseAnalysis = analyzeFocusKeyphrase(content, focusKeyphrase)
    const readabilityAnalysis = analyzeReadability(content)

    // Calculate scores
    // This is a simplified scoring system - in a real app, you'd have more complex logic
    let seoScore = 50 // Base score

    // Add points for keyphrase presence
    if (keyphraseAnalysis.found) {
      seoScore += 10

      // Bonus for good density
      if (keyphraseAnalysis.density >= 0.5 && keyphraseAnalysis.density <= 2.5) {
        seoScore += 10
      }
    }

    // Add points for title containing keyphrase
    if (title && focusKeyphrase && title.toLowerCase().includes(focusKeyphrase.toLowerCase())) {
      seoScore += 15
    }

    // Add points for description containing keyphrase
    if (description && focusKeyphrase && description.toLowerCase().includes(focusKeyphrase.toLowerCase())) {
      seoScore += 10
    }

    // Add points for good description length
    if (description && description.length >= 120 && description.length <= 160) {
      seoScore += 5
    }

    // Cap the score at 100
    seoScore = Math.min(100, seoScore)

    // Create analysis record
    const analysis = await prisma.analysis.create({
      data: {
        pageId,
        content,
        focusKeyphrase,
        seoScore,
        readabilityScore: readabilityAnalysis.score,
      },
    })

    return NextResponse.json({
      analysis,
      details: {
        keyphrase: keyphraseAnalysis,
        readability: readabilityAnalysis,
        seoScore,
        readabilityScore: readabilityAnalysis.score,
      },
    })
  } catch (error) {
    console.error("Error creating analysis:", error)
    return NextResponse.json({ error: "Failed to create analysis" }, { status: 500 })
  }
}
