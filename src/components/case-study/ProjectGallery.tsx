import Image from "next/image";
import type { Project } from "@/types";
import Container from "@/components/ui/Container";

interface ProjectGalleryProps {
  project: Project;
}

export default function ProjectGallery({ project }: ProjectGalleryProps) {
  // Filter out images that are already displayed in the LiveOutput component
  const galleryImages = project.screenshots.filter(img => {
    if (project.slug === "stockboy") {
      return !img.alt.toLowerCase().includes('login') && !img.alt.toLowerCase().includes('register');
    }
    return !img.alt.toLowerCase().includes('output') && !img.alt.toLowerCase().includes('telegram');
  });

  if (!galleryImages || galleryImages.length === 0) return null;

  return (
    <section className="py-section bg-background">
      <Container>
        <div className="mb-12">
          <h2 className="text-h2 text-foreground mb-4">Project Gallery</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {galleryImages.map((img, idx) => (
            <div 
              key={idx} 
              className="relative rounded-2xl overflow-hidden bg-surface-elevated border border-border aspect-[16/10] group shadow-[0_2px_12px_rgba(0,0,0,0.2)] transition-all duration-300 hover:border-accent/20 hover:shadow-[0_0_20px_rgba(59,130,246,0.06),0_4px_20px_rgba(0,0,0,0.3)]"
            >
              {img.src !== '/images/placeholder.jpg' ? (
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.01]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-muted text-sm bg-surface">
                  Gallery Placeholder
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
