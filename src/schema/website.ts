import { SchemaWebsite } from "@/types/schema-types"

export interface WebsiteSchemaProps {
  name: string
  url: string
  description?: string
  searchUrl?: string
}

/**
 * Creates a website schema
 */
export function createWebsiteSchema({ name, url, description, searchUrl }: WebsiteSchemaProps): SchemaWebsite {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    url,
    ...(description && { description }),
    ...(searchUrl && {
      potentialAction: {
        "@type": "SearchAction",
        target: `${searchUrl}?q={search_term_string}`,
        query: "required name=search_term_string",
      },
    }),
  }
}

