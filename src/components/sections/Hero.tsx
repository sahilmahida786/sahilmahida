import Link from "next/link";
import { personal } from "@/data/personal";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import HeroCanvasLoader from "@/components/three/HeroCanvasLoader";
import { ArrowDown, ArrowUpRight } from "lucide-react";

const capabilities = ["AI", "Web", "Automation", "Digital Systems"];

/**
 * Hero section — server component.
 * HTML content renders immediately for SEO + fast FCP.
 * 3D Canvas is loaded client-side via HeroCanvasLoader (dynamic, ssr: false).
 */
export default function Hero() {
  return (
    <section
      id="hero"
      className="section-glow-hero relative min-h-[100svh] flex items-center overflow-hidden"
      aria-label="Introduction"
    >
      {/* 3D Background Layer — client-only, no SSR */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <HeroCanvasLoader />
      </div>

      {/* HTML Content Layer — always visible, always accessible */}
      <Container className="relative z-10 py-[var(--spacing-section)]">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <div className="mb-6 flex items-center gap-3">
            <div className="h-px w-8 bg-accent" />
            <Badge variant="accent" className="flex items-center gap-2 px-3 py-1 text-[10px] tracking-widest uppercase bg-surface/50 border-accent/20">
              <span 
                className="h-1.5 w-1.5 rounded-full bg-emerald-500" 
                style={{ animation: 'statusPulse 3s ease-in-out infinite' }}
                aria-hidden="true" 
              />
              System Online
            </Badge>
          </div>

          {/* Name */}
          <h1 className="text-display text-foreground">
            {personal.name}
          </h1>

          {/* Title */}
          <p className="mt-4 text-h2 text-muted">
            {personal.title}
          </p>

          {/* Tagline */}
          <p className="mt-4 text-body-lg text-subtle max-w-lg">
            {personal.tagline}
          </p>

          {/* Capabilities */}
          <div className="mt-6 flex items-center gap-3 text-label text-subtle tracking-widest">
            {capabilities.map((cap, i) => (
              <span key={cap} className="flex items-center gap-3">
                {i > 0 && <span className="text-accent">·</span>}
                {cap.toUpperCase()}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/#projects">
              <Button size="lg">
                <ArrowDown size={16} />
                Explore My Work
              </Button>
            </Link>
            <Link href="/#contact">
              <Button variant="outline" size="lg">
                Start a Project
                <ArrowUpRight size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </Container>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10 pointer-events-none">
        <span className="text-[10px] font-mono text-accent tracking-[0.25em] uppercase opacity-70">Scroll to Explore</span>
        <div className="h-12 w-px bg-gradient-to-b from-accent/50 via-accent/20 to-transparent" />
      </div>
    </section>
  );
}
