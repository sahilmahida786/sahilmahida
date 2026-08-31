import type { MetadataRoute } from "next";
import { personal } from "@/data/personal";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${personal.name} | Software Developer & Digital Solutions Provider`,
    short_name: "SAHIL.OS",
    description: "Software Developer & Digital Solutions Provider in Rajkot, Gujarat, India.",
    start_url: "/",
    display: "standalone",
    background_color: "#05070B", // Dark premium background
    theme_color: "#3b82f6", // Subtle blue accent
    icons: [
      {
        src: "/images/sahil-mahida-favicon.webp",
        sizes: "192x192",
        type: "image/webp",
        purpose: "maskable",
      },
      {
        src: "/images/sahil-mahida-favicon.webp",
        sizes: "512x512",
        type: "image/webp",
      },
    ],
  };
}
