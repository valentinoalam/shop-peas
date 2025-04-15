import { SchemaLocalBusiness } from "@/types/schema-types"

type DayOfWeek = 
  "Monday" | 
  "Tuesday" | 
  "Wednesday" | 
  "Thursday" | 
  "Friday" | 
  "Saturday" | 
  "Sunday";

export interface LocalBusinessAddress {
  streetAddress: string
  addressLocality: string
  addressRegion: string
  postalCode: string
  addressCountry: string
}

export interface GeoCoordinates {
  latitude: number
  longitude: number
}

export interface OpeningHoursSpecification {
  dayOfWeek: DayOfWeek | DayOfWeek[]
  opens: string
  closes: string
}

export interface LocalBusinessSchemaProps {
  name: string
  description: string
  url: string
  telephone: string
  address: LocalBusinessAddress
  geo?: GeoCoordinates
  image?: string
  priceRange?: string
  openingHours?: OpeningHoursSpecification[]
}

/**
 * Creates a local business schema
 */
export function createLocalBusinessSchema({
  name,
  description,
  url,
  telephone,
  address,
  geo,
  image,
  priceRange,
  openingHours,
}: LocalBusinessSchemaProps): SchemaLocalBusiness {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name,
    description,
    url,
    telephone,
    address: {
      "@type": "PostalAddress",
      ...address,
    },
    ...(geo && {
      geo: {
        "@type": "GeoCoordinates",
        latitude: geo.latitude,
        longitude: geo.longitude,
      },
    }),
    ...(image && { image }),
    ...(priceRange && { priceRange }),
    ...(openingHours && {
      openingHoursSpecification: openingHours.map((hours) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: Array.isArray(hours.dayOfWeek) 
          ? hours.dayOfWeek 
          : [hours.dayOfWeek], // Ensure array format
        opens: hours.opens,
        closes: hours.closes,
      })),
    }),
  }
}

