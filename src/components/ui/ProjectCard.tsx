import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/types";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Badge from "@/components/ui/Badge";

interface ProjectCardProps {
  project: Project;
  className?: string;
}

export default function ProjectCard({ project, className }: ProjectCardProps) {
  // Format the order with a leading zero
  const displayOrder = project.order.toString().padStart(2, '0');

  return (
    <Link 
      href={`/projects/${project.slug}`} 
      className={cn(
        "group block relative overflow-hidden rounded-2xl bg-surface border border-border transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
        "hover:border-accent/30 hover:-translate-y-[3px] hover:shadow-[0_0_24px_rgba(59,130,246,0.06),0_8px_30px_rgb(0,0,0,0.45)]",
        className
      )}
    >
      <div className="flex flex-col h-full">
        {/* Visual Header */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-surface-elevated border-b border-border">
          {project.thumbnail.src !== '/images/placeholder.jpg' ? (
            <Image
              src={project.thumbnail.src}
              alt={project.thumbnail.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            /* CSS-based Placeholder if no image */
            <div className="absolute inset-0 bg-gradient-to-br from-surface-elevated to-background flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
              <span className="text-muted tracking-widest uppercase text-xs z-10">{project.name}</span>
            </div>
          )}
          
          {/* Top overlays */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
            <Badge variant="accent" className="backdrop-blur-sm bg-background/80 uppercase tracking-widest text-[10px]">
              {displayOrder} / {project.category}
            </Badge>
          </div>
        </div>

        {/* Content Footer */}
        <div className="p-6 flex flex-col flex-1 relative z-10 bg-gradient-to-b from-background to-[hsl(225,20%,4.5%)] transition-colors duration-500 group-hover:from-surface-elevated group-hover:to-[hsl(225,14%,9%)]">
          <h3 className="text-h3 text-foreground transition-transform duration-300 group-hover:-translate-y-1">
            {project.name}
          </h3>
          
          <p className="mt-2 text-body-sm text-muted line-clamp-2 transition-transform duration-300 delay-75 group-hover:-translate-y-1">
            {project.tagline}
          </p>

          <div className="mt-6 flex flex-wrap gap-1.5 transition-transform duration-300 delay-100 group-hover:-translate-y-1">
            {project.technologies.slice(0, 3).map((tech) => (
              <span key={tech} className="text-[11px] px-2 py-1 rounded bg-surface border border-border text-muted">
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="text-[11px] px-2 py-1 rounded bg-surface border border-border text-muted">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>

          <div className="mt-auto pt-6 flex items-center text-label text-accent uppercase tracking-widest">
            <span className="mr-2">{project.liveLabel || "View Case Study"}</span>
            <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </Link>
  );
}
