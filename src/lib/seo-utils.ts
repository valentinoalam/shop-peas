/**
 * Utilitas untuk analisis SEO
 */

// Analisis kata kunci fokus dalam konten
export function analyzeFocusKeyphrase(
  content: string,
  keyphrase: string,
): {
  found: boolean
  count: number
  density: number
} {
  if (!content || !keyphrase) {
    return { found: false, count: 0, density: 0 }
  }

  const regex = new RegExp(keyphrase, "gi")
  const matches = content.match(regex) || []
  const wordCount = content.split(/\s+/).length

  return {
    found: matches.length > 0,
    count: matches.length,
    density: wordCount > 0 ? (matches.length / wordCount) * 100 : 0,
  }
}

// Analisis keterbacaan (implementasi sederhana)
export function analyzeReadability(content: string): {
  score: number
  wordCount: number
  sentenceCount: number
  avgWordsPerSentence: number
  longSentences: number
} {
  if (!content) {
    return {
      score: 0,
      wordCount: 0,
      sentenceCount: 0,
      avgWordsPerSentence: 0,
      longSentences: 0,
    }
  }

  const words = content.split(/\s+/).filter((word) => word.length > 0)
  const sentences = content.split(/[.!?]+/).filter((sentence) => sentence.trim().length > 0)
  const longSentences = sentences.filter(
    (sentence) => sentence.split(/\s+/).filter((word) => word.length > 0).length > 20,
  ).length

  const avgWordsPerSentence = sentences.length > 0 ? words.length / sentences.length : 0

  // Skor keterbacaan sederhana (0-100)
  // Dalam implementasi nyata, ini akan menggunakan algoritma seperti Flesch-Kincaid
  let score = 100

  // Penalti untuk kalimat panjang
  if (avgWordsPerSentence > 20) {
    score -= (avgWordsPerSentence - 20) * 2
  }

  // Penalti untuk kata panjang
  const longWords = words.filter((word) => word.length > 6).length
  const longWordRatio = words.length > 0 ? longWords / words.length : 0

  if (longWordRatio > 0.3) {
    score -= (longWordRatio - 0.3) * 100
  }

  return {
    score: Math.max(0, Math.min(100, Math.round(score))),
    wordCount: words.length,
    sentenceCount: sentences.length,
    avgWordsPerSentence,
    longSentences,
  }
}

// Analisis meta deskripsi
export function analyzeMetaDescription(description: string): {
  length: number
  tooShort: boolean
  tooLong: boolean
  optimal: boolean
} {
  const length = description.length

  return {
    length,
    tooShort: length < 120,
    tooLong: length > 160,
    optimal: length >= 120 && length <= 160,
  }
}

// Analisis judul
export function analyzeTitle(
  title: string,
  keyphrase: string,
): {
  length: number
  tooShort: boolean
  tooLong: boolean
  containsKeyphrase: boolean
  optimal: boolean
} {
  const length = title.length
  const containsKeyphrase = keyphrase ? title.toLowerCase().includes(keyphrase.toLowerCase()) : false

  return {
    length,
    tooShort: length < 30,
    tooLong: length > 60,
    containsKeyphrase,
    optimal: length >= 30 && length <= 60 && containsKeyphrase,
  }
}

// Buat sitemap untuk Next.js
export function generateSitemapEntries(
  routes: string[],
  baseUrl: string,
): Array<{
  url: string
  lastModified: Date
  changeFrequency?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never"
  priority?: number
}> {
  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "/" ? 1.0 : 0.8,
  }))
}

// Buat schema markup untuk artikel
export function generateArticleSchema(data: {
  title: string
  description: string
  author: string
  datePublished: string
  imageUrl: string
  url: string
}): string {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: data.title,
    description: data.description,
    author: {
      "@type": "Person",
      name: data.author,
    },
    datePublished: data.datePublished,
    image: data.imageUrl,
    url: data.url,
  }

  return JSON.stringify(schema, null, 2)
}

// Buat schema markup untuk produk
export function generateProductSchema(data: {
  name: string
  description: string
  price: number
  currency: string
  imageUrl: string
  url: string
  availability: "InStock" | "OutOfStock"
}): string {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: data.name,
    description: data.description,
    offers: {
      "@type": "Offer",
      price: data.price,
      priceCurrency: data.currency,
      availability: `https://schema.org/${data.availability}`,
    },
    image: data.imageUrl,
    url: data.url,
  }

  return JSON.stringify(schema, null, 2)
}

// Buat schema markup untuk FAQ
export function generateFAQSchema(
  questions: Array<{
    question: string
    answer: string
  }>,
): string {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  }

  return JSON.stringify(schema, null, 2)
}
