import type { Project } from "@/types";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface ProjectHeroProps {
  project: Project;
}

export default function ProjectHero({ project }: ProjectHeroProps) {
  return (
    <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden border-b border-border bg-background">
      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          
          <Badge variant="accent" className="mb-6 uppercase tracking-widest">
            {project.category}
          </Badge>

          <h1 className="text-display font-bold text-foreground mb-6">
            {project.name}
          </h1>

          <p className="text-h2 text-muted mb-10 max-w-2xl">
            {project.tagline}
          </p>

          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {project.technologies.map(tech => (
              <Badge key={tech} variant="muted">{tech}</Badge>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Link href="#architecture">
              <Button size="lg">
                View Architecture
              </Button>
            </Link>
            
            {project.liveUrl && (
              <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline">
                  {project.liveLabel || "View Live Output"}
                  <ArrowUpRight size={16} />
                </Button>
              </Link>
            )}
          </div>
          
        </div>
      </Container>
    </section>
  );
}
