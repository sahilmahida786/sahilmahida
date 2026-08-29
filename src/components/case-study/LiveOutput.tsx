import Image from "next/image";
import type { Project } from "@/types";
import Container from "@/components/ui/Container";

interface LiveOutputProps {
  project: Project;
}

export default function LiveOutput({ project }: LiveOutputProps) {
  // Select images based on project
  let displayImages = [];
  let title = "Live Output";
  let description = "This system produces real verified output automatically. Here are examples of the structured intelligence published directly to Telegram.";

  if (project.slug === "stockboy") {
    displayImages = project.screenshots.filter(s => s.alt.toLowerCase().includes('login') || s.alt.toLowerCase().includes('register'));
    title = "Authentication & Access";
    description = "Secure access portals designed for seamless onboarding and premium member authentication.";
  } else {
    const outputImages = project.screenshots.filter(s => s.alt.toLowerCase().includes('output') || s.alt.toLowerCase().includes('telegram'));
    displayImages = outputImages.length > 0 ? outputImages : project.screenshots.slice(0, 2);
  }

  if (displayImages.length === 0) return null;

  return (
    <section className="py-section bg-background">
      <Container>
        <div className="mb-12">
          <h2 className="text-h2 text-foreground mb-4">{title}</h2>
          <p className="text-muted max-w-2xl">
            {description}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {displayImages.map((img, idx) => (
            <div key={idx} className="relative rounded-2xl overflow-hidden bg-surface-elevated border border-border aspect-[4/3] md:aspect-auto md:h-[600px] group shadow-[0_2px_12px_rgba(0,0,0,0.2)] transition-all duration-300 hover:border-accent/20 hover:shadow-[0_0_20px_rgba(59,130,246,0.06),0_4px_20px_rgba(0,0,0,0.3)]">
              {img.src !== '/images/placeholder.jpg' ? (
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-contain p-4 transition-transform duration-500 group-hover:scale-[1.01]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-muted text-sm">
                  Screenshot Placeholder
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
