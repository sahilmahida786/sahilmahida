import type { Metadata } from "next";
import { personal } from "@/data/personal";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://sahilmahida.vercel.app";

/**
 * Generate page-specific metadata with sensible defaults.
 * Uses Next.js metadata API for automatic <head> generation.
 */
export function createMetadata(overrides: Partial<Metadata> = {}): Metadata {
  const title = overrides.title || `${personal.name} | Software Developer & Digital Solutions Provider`;
  const description =
    (overrides.description as string) ||
    `${personal.name} is a Software Developer & Digital Solutions Provider in Rajkot, Gujarat, India. Specializing in Web Development, Custom Software, Python, AI Solutions, and Business Automation.`;

  return {
    // applicationName is used by Google as the displayed site name in Search results
    applicationName: personal.name,
    title,
    description,
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: "/",
    },
    authors: [{ name: personal.name, url: BASE_URL }],
    creator: personal.name,
    publisher: personal.name,
    openGraph: {
      title: title as string,
      description,
      url: BASE_URL,
      siteName: personal.name,
      locale: "en_IN",
      type: "website",
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: `${personal.name} - Software Developer & Digital Solutions Provider in Rajkot, Gujarat, India`,
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
      // Next.js App Router also picks up src/app/icon.jpg automatically.
      // These explicit declarations ensure broad browser & crawler coverage.
      icon: [
        { url: "/icon.jpg", type: "image/jpeg" },
        { url: "/images/sahil-mahida-favicon.webp", type: "image/webp" },
      ],
      apple: [
        { url: "/icon.jpg", type: "image/jpeg" },
      ],
      shortcut: "/icon.jpg",
    },
    ...overrides,
  };
}
