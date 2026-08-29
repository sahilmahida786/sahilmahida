import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/types";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

interface FeaturedProjectCardProps {
  project: Project;
}

export default function FeaturedProjectCard({ project }: FeaturedProjectCardProps) {
  return (
    <Card 
      variant="elevated" 
      className="group relative overflow-hidden border-border hover:border-accent/30 hover:shadow-[0_0_24px_rgba(59,130,246,0.06)] transition-all duration-300 ease-out" 
      as="article"
    >
      <div className="grid lg:grid-cols-2 lg:gap-0 items-stretch h-full">
        
        {/* Content Side */}
        <div className="flex flex-col p-8 lg:p-12 z-10 bg-gradient-to-b from-surface to-[hsl(225,16%,6%)]">
          <div className="mb-8 flex items-center gap-3">
            <div className="h-px w-8 bg-accent" />
            <span className="text-label text-accent tracking-widest uppercase">
              01 / Flagship
            </span>
          </div>

          <h3 className="text-display-sm text-foreground">
            {project.name}
          </h3>

          <p className="mt-4 text-h3 text-muted max-w-md">
            {project.tagline}
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {project.technologies.slice(0, 6).map((tech) => (
              <Badge key={tech} variant="default">{tech}</Badge>
            ))}
          </div>

          <div className="mt-12 lg:mt-auto pt-8">
            <Link href={`/projects/${project.slug}`}>
              <Button size="lg" className="w-full sm:w-auto group/btn">
                {project.liveLabel || "View Case Study"}
                <ArrowRight size={16} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Visual Side */}
        <div className="relative flex flex-col p-8 lg:p-12 min-h-[500px] lg:min-h-full bg-surface-elevated overflow-hidden border-t lg:border-t-0 lg:border-l border-border">
          
          {/* Background Image / Placeholder */}
          <div className="absolute inset-0 z-0">
            {project.thumbnail.src !== '/images/placeholder.jpg' ? (
              <Image 
                src={project.thumbnail.src} 
                alt={project.thumbnail.alt} 
                fill
                className="object-cover opacity-10 group-hover:opacity-20 group-hover:scale-[1.02] transition-all duration-700 ease-out mix-blend-screen"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-surface to-surface-elevated" />
            )}
            
            {/* Subtle grid pattern for technical feel */}
            <div 
              className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity duration-700"
              style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)',
                backgroundSize: '24px 24px'
              }}
            />
          </div>

          {/* Storytelling Visual Pipeline */}
          <div className="relative z-10 flex-1 flex flex-col justify-center max-w-sm mx-auto w-full pointer-events-none">
            
            {/* Pipeline Container */}
            <div className="relative flex flex-col gap-6">
              
              {/* Connecting Line */}
              <div className="absolute left-[15px] top-4 bottom-4 w-px bg-gradient-to-b from-accent/50 via-border to-accent/50 z-0 group-hover:bg-accent/40 transition-colors duration-700" />
              
              {/* 01 - INPUT */}
              <div className="relative z-10 flex gap-4">
                <div className="w-8 h-8 rounded-full bg-surface border border-border flex items-center justify-center shrink-0 group-hover:border-accent/50 transition-colors duration-500">
                  <div className="w-2 h-2 rounded-full bg-muted group-hover:bg-accent transition-colors duration-500" />
                </div>
                <div className="pt-1">
                  <div className="text-label text-foreground mb-1 tracking-widest uppercase">01 / Input</div>
                  <div className="text-caption text-subtle">Market & company information</div>
                </div>
              </div>

              {/* 02 - PROCESS */}
              <div className="relative z-10 flex gap-4">
                <div className="w-8 h-8 rounded-full bg-surface border border-border flex items-center justify-center shrink-0 group-hover:border-accent/50 transition-colors duration-500 delay-100">
                  <div className="w-2 h-2 rounded-full bg-muted group-hover:bg-accent transition-colors duration-500 delay-100" />
                </div>
                <div className="pt-1">
                  <div className="text-label text-foreground mb-1 tracking-widest uppercase">02 / Process</div>
                  <div className="text-caption text-subtle">Event Adapter · Queue · PDF Processing</div>
                </div>
              </div>

              {/* 03 - INTELLIGENCE */}
              <div className="relative z-10 flex gap-4">
                <div className="w-8 h-8 rounded-full bg-surface border border-border flex items-center justify-center shrink-0 group-hover:border-accent/50 transition-colors duration-500 delay-200">
                  <div className="w-2 h-2 rounded-full bg-muted group-hover:bg-accent transition-colors duration-500 delay-200" />
                </div>
                <div className="pt-1">
                  <div className="text-label text-foreground mb-1 tracking-widest uppercase">03 / Intelligence</div>
                  <div className="text-caption text-subtle">AI Verification · Structured Intelligence</div>
                </div>
              </div>

              {/* 04 - OUTPUT */}
              <div className="relative z-10 flex gap-4">
                <div className="w-8 h-8 rounded-full bg-surface border-accent/30 bg-accent/5 flex items-center justify-center shrink-0 group-hover:border-accent transition-colors duration-500 delay-300">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                </div>
                <div className="pt-1">
                  <div className="text-label text-accent mb-1 tracking-widest uppercase">04 / Output</div>
                  <div className="text-caption text-subtle group-hover:text-foreground transition-colors duration-500">Telegram Distribution</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </Card>
  );
}
