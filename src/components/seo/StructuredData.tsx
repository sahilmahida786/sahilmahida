import Script from "next/script";
import { personal } from "@/data/personal";
import { faqs } from "@/data/faq";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://sahilmahida.vercel.app";

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
        name: `${personal.name} | Software Developer & Digital Solutions Provider`,
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
        // Use just the personal name — Google displays this as the site brand in Search
        name: personal.name,
        description: "Software Developer & Digital Solutions Provider in Rajkot, Gujarat, India",
        publisher: {
          "@id": `${BASE_URL}/#person`,
        },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${BASE_URL}/?s={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        // FAQPage — synchronized with visible FAQ accordion (src/data/faq.ts)
        // Only contains questions actually shown to the user — no hidden SEO content.
        "@type": "FAQPage",
        "@id": `${BASE_URL}/#faq`,
        mainEntity: faqs.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
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
