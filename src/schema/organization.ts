// export function generateOrganizationSchema({ name, url, logo }) {
//     return {
//       "@context": "https://schema.org",
//       "@type": "Organization",
//       name,
//       url,
//       logo: {
//         "@type": "ImageObject",
//         url: logo,
//       },
//     };
// }
import type { SchemaOrganization } from "@/types/schema-types"

export interface ContactPoint {
  telephone: string
  contactType: string
  email?: string
  areaServed?: string | string[]
  availableLanguage?: string | string[]
}

export interface OrganizationSchemaProps {
  name: string
  url: string
  logo: string
  sameAs?: string[]
  contactPoint?: ContactPoint
  description?: string
}

/**
 * Creates an organization schema
 */
export function createOrganizationSchema({
  name,
  url,
  logo,
  sameAs = [],
  contactPoint,
  description,
}: OrganizationSchemaProps): SchemaOrganization {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url,
    logo,
    ...(sameAs.length > 0 && { sameAs }),
    ...(contactPoint && {
      contactPoint: {
        "@type": "ContactPoint",
        ...contactPoint,
      },
    }),
    ...(description && { description }),
  }
}