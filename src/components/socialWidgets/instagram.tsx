"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Loader2 } from "lucide-react"

interface InstagramMedia {
  id: string
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM"
  media_url: string
  thumbnail_url?: string
  permalink: string
  caption?: string
  timestamp: string
}

export default function InstagramFeed() {
  const [media, setMedia] = useState<InstagramMedia[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchInstagramMedia() {
      try {
        setLoading(true)
        const response = await fetch("/api/instagram")

        if (!response.ok) {
          throw new Error("Failed to fetch Instagram media")
        }

        const data = await response.json()
        setMedia(data.slice(0, 9)) // Limit to 9 items for 3x3 grid
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
        console.error("Error fetching Instagram media:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchInstagramMedia()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full h-40">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error) {
    return <div className="text-red-500 text-center">Error loading Instagram feed: {error}</div>
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-3 gap-1">
        {media.map((item) => (
          <a
            key={item.id}
            href={item.permalink}
            target="_blank"
            rel="noopener noreferrer"
            className="relative aspect-square overflow-hidden group"
          >
            <Image
              src={item.thumbnail_url || item.media_url}
              alt={item.caption || "Instagram post"}
              fill
              sizes="(max-width: 768px) 33vw, (max-width: 1024px) 16vw, 8vw"
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </a>
        ))}
      </div>
    </div>
  )
}

