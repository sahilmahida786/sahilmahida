import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { createMetadata } from "@/lib/seo";
import SkipLink from "@/components/ui/SkipLink";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import SmoothScrollProvider from "@/components/layout/SmoothScrollProvider";
import ScrollProgress from "@/components/ui/ScrollProgress";
import StructuredData from "@/components/seo/StructuredData";
import BackToTop from "@/components/ui/BackToTop";
import "./globals.css";

/**
 * Primary font — Inter
 * Used for all body text, headings, and UI elements.
 * Loaded with next/font for automatic optimization and zero CLS.
 */
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

/**
 * Monospace font — JetBrains Mono
 * Used for code snippets, technology tags, and technical labels.
 * Loaded with next/font for automatic optimization.
 */
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

/**
 * Root metadata — homepage defaults.
 * Individual pages override via their own metadata exports.
 */
export const metadata: Metadata = createMetadata({
  title: "Sahil Mahida | Full-Stack Python Developer in Rajkot, Gujarat",
  description:
    "Sahil Mahida is a Full-Stack Python Developer in Rajkot, Gujarat, building high-performance websites, AI solutions, automation systems, and custom web applications.",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-IN" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body>
        <StructuredData />
        <SmoothScrollProvider>
          <ScrollProgress />
          <SkipLink />
          <Navigation />
          <main id="main-content">{children}</main>
          <Footer />
          <BackToTop />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
