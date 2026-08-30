import type { Metadata } from "next";
import { personal } from "@/data/personal";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://sahilmahida.vercel.app";

/**
 * Generate page-specific metadata with sensible defaults.
 * Uses Next.js metadata API for automatic <head> generation.
 */
export function createMetadata(overrides: Partial<Metadata> = {}): Metadata {
  const title = overrides.title || `${personal.name} | Full-Stack Python Developer in Rajkot, Gujarat`;
  const description =
    (overrides.description as string) ||
    `${personal.name} is a Full-Stack Python Developer in Rajkot, Gujarat, building high-performance websites, AI solutions, automation systems, and custom web applications.`;

  return {
    title,
    description,
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: "/",
    },
    authors: [{ name: personal.name, url: BASE_URL }],
    creator: personal.name,
    openGraph: {
      title: title as string,
      description,
      url: BASE_URL,
      siteName: `${personal.name} | Full-Stack Python Developer`,
      locale: "en_IN",
      type: "website",
      images: [
        {
          url: "/opengraph-image", // Resolved via metadataBase
          width: 1200,
          height: 630,
          alt: `${personal.name} - Full-Stack Python Developer in Rajkot`,
          type: "image/png",
        },
      ],
      ...(overrides.openGraph || {}),
    },
    twitter: {
      card: "summary_large_image",
      title: title as string,
      description,
      creator: "@sahilmahida",
      images: ["/opengraph-image"],
      ...(overrides.twitter || {}),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: {
      icon: "/images/sahil-mahida-favicon.webp",
      apple: "/images/sahil-mahida-favicon.webp",
    },
    ...overrides,
  };
}
