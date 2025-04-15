import { SchemaProduct } from "@/types/schema-types"
import { ItemAvailability } from "schema-dts"


export interface ProductSchemaProps {
  name: string
  description: string
  image: string | string[]
  sku: string
  price: number
  currency?: string
  availability?: string
  brand: string
  reviews?: Array<{
    author: string
    reviewRating: number
    reviewBody?: string
  }>
}

/**
 * Creates a product schema
 */
export function createProductSchema({
  name,
  description,
  image,
  sku,
  price,
  currency = "USD",
  availability = "https://schema.org/InStock",
  brand,
  reviews = [],
}: ProductSchemaProps): SchemaProduct {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    image: Array.isArray(image) ? image : [image],
    sku,
    brand: {
      "@type": "Brand",
      name: brand,
    },
    offers: {
      "@type": "Offer",
      price,
      priceCurrency: currency,
      availability: availability as ItemAvailability,
    },
    ...(reviews.length > 0 && {
      review: reviews.map((review) => ({
        "@type": "Review",
        author: {
          "@type": "Person",
          name: review.author,
        },
        reviewRating: {
          "@type": "Rating",
          ratingValue: review.reviewRating,
          bestRating: "5",
        },
        ...(review.reviewBody && { reviewBody: review.reviewBody }),
      })),
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: (reviews.reduce((acc, review) => acc + review.reviewRating, 0) / reviews.length).toFixed(1),
        reviewCount: reviews.length,
      },
    }),
  }
}

// export default function addProductJsonLd() {
//   return {
//       __html: `{
//           "@context": "https://schema.org/",
//           "@type": "Product",
//           "name": "Executive Anvil",
//           "image": [
//               "https://example.com/photos/1x1/photo.jpg",
//               "https://example.com/photos/4x3/photo.jpg",
//               "https://example.com/photos/16x9/photo.jpg"
//           ],
//           "description": "Sleeker than ACME's Classic Anvil, the Executive Anvil is perfect for the business traveler looking for something to drop from a height.",
//           "sku": "0446310786",
//           "mpn": "925872",
//           "brand": {
//               "@type": "Brand",
//               "name": "ACME"
//           },
//           "review": {
//               "@type": "Review",
//               "reviewRating": {
//               "@type": "Rating",
//               "ratingValue": "4",
//               "bestRating": "5"
//               },
//               "author": {
//               "@type": "Person",
//               "name": "Fred Benson"
//               }
//           },
//           "aggregateRating": {
//               "@type": "AggregateRating",
//               "ratingValue": "4.4",
//               "reviewCount": "89"
//           },
//           "offers": {
//               "@type": "Offer",
//               "url": "https://example.com/anvil",
//               "priceCurrency": "USD",
//               "price": "119.99",
//               "priceValidUntil": "2020-11-20",
//               "itemCondition": "https://schema.org/UsedCondition",
//               "availability": "https://schema.org/InStock"
//           }
//       }`,
//   };
// }