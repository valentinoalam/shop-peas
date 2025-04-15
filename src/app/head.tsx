// import Script from "next/script"
import { createOrganizationSchema, createWebsiteSchema, JsonLd } from "@/schema"
export default function Head() {
  
  // Organization schema that applies to the whole site
  const organizationSchema = createOrganizationSchema({
    name: "TinoKarya",
    url: "https://tinokarya.com",
    logo: "https://tinokarya.com/logo.png",
    sameAs: [
      "https://twitter.com/tonyfranky",
      "https://facebook.com/yourcompany",
      "https://linkedin.com/company/yourcompany",
    ],
    contactPoint: {
      telephone: "+1-555-555-5555",
      contactType: "customer service",
    },
  })

  // Website schema
  const websiteSchema = createWebsiteSchema({
    name: "Karya Tino",
    url: "https://tinokarya.com",
    searchUrl: "https://tinokarya.com/search",
  })
  return (
    // <Script
    //   id="schema-org"
    //   type="application/ld+json"
    //   dangerouslySetInnerHTML={{
    //     __html: JSON.stringify({
    //       "@context": "https://schema.org",
    //       "@type": "ProfessionalService",
    //       "name": "Tino Karya Web Developer Agency",
    //       "description": "web design agency creating stunning, high-performance websites that drive results",
    //       "url": "https://tinokarya.com/",
    //       "author": {
    //         "@type": "Solo Agency",
    //         "name": "Tino Karya",
    //         "url": "https://tinokarya.com"
    //       },
    //       "logo": "https://tinokarya.com/icon.svg",
    //       "image": "https://tinokarya.com/agency-building.jpg",
    //       "priceRange": "$$",
    //       "telephone": "+62-0857-9807-9847",
    //       "email": "valentino@tinokarya.com",
    //       "address": {
    //         "@type": "PostalAddress",
    //         "streetAddress": "123 Design Avenue",
    //         "addressLocality": "San Francisco",
    //         "addressRegion": "CA",
    //         "postalCode": "94103",
    //         "addressCountry": "US"
    //       },
    //       "geo": {
    //         "@type": "GeoCoordinates",
    //         "latitude": "37.7749",
    //         "longitude": "-122.4194"
    //       },
    //       "openingHours": "Mo,Tu,We,Th,Fr 09:00-17:00",
    //       "sameAs": [
    //         "https://www.facebook.com/valentinonooralam",
    //         "https://www.instagram.com/matapena",
    //         "https://twitter.com/tonyfranky",
    //         "https://www.linkedin.com/valentinoalam",
    //         "https://www.behance.net/valentinoalam"
    //       ],
    //       "serviceArea": {
    //         "@type": "GeoCircle",
    //         "geoMidpoint": {
    //           "@type": "GeoCoordinates",
    //           "latitude": "37.7749",
    //           "longitude": "-122.4194"
    //         },
    //         "geoRadius": "50000"
    //       },
    //       "hasOfferCatalog": {
    //         "@type": "OfferCatalog",
    //         "name": "Web Design Services",
    //         "itemListElement": [
    //           {
    //             "@type": "Offer",
    //             "itemOffered": {
    //               "@type": "Service",
    //               "name": "Custom Website Design",
    //               "description": "Bespoke website design tailored to your brand and business goals."
    //             }
    //           },
    //           {
    //             "@type": "Offer",
    //             "itemOffered": {
    //               "@type": "Service",
    //               "name": "E-commerce Development",
    //               "description": "Custom online stores with secure payment processing and inventory management."
    //             }
    //           },
    //           {
    //             "@type": "Offer",
    //             "itemOffered": {
    //               "@type": "Service",
    //               "name": "UI/UX Design",
    //               "description": "User-centered design that enhances engagement and conversion rates."
    //             }
    //           }
    //         ]
    //       }
    //     })
    //   }}
    // />
    <>
      {/* Add global schema markup */}
      <JsonLd schema={organizationSchema} />
      <JsonLd schema={websiteSchema} />
    </>
  );
}
  