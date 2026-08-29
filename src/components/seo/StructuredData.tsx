import Script from "next/script";
import { personal } from "@/data/personal";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://sahilmahida.in";

export default function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${BASE_URL}/#person`,
        name: personal.name,
        jobTitle: "Software Developer & Digital Solutions Provider",
        url: BASE_URL,
        sameAs: [
          personal.socials.github,
          personal.socials.linkedin,
          personal.socials.twitter,
        ].filter(Boolean),
        image: `${BASE_URL}/images/sahil-mahida-logo.webp`,
        logo: `${BASE_URL}/images/sahil-mahida-logo.webp`,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Rajkot",
          addressRegion: "Gujarat",
          addressCountry: "India",
        },
      },
      {
        "@type": "LocalBusiness",
        "@id": `${BASE_URL}/#business`,
        name: `${personal.name} | Digital Solutions`,
        image: `${BASE_URL}/images/sahil-mahida-logo.webp`,
        logo: `${BASE_URL}/images/sahil-mahida-logo.webp`,
        url: BASE_URL,
        telephone: personal.phone,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Rajkot",
          addressRegion: "Gujarat",
          addressCountry: "IN",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: "22.3039",
          longitude: "70.8022",
        },
        priceRange: "$$",
      },
      {
        "@type": "WebSite",
        "@id": `${BASE_URL}/#website`,
        url: BASE_URL,
        name: `${personal.name} | Digital Solutions`,
        publisher: {
          "@id": `${BASE_URL}/#person`,
        },
      },
    ],
  };

  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
