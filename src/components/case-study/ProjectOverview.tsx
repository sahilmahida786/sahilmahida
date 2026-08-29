import type { Project } from "@/types";
import Container from "@/components/ui/Container";

interface ProjectOverviewProps {
  project: Project;
}

export default function ProjectOverview({ project }: ProjectOverviewProps) {
  if (!project.problem && !project.solution) return null;

  return (
    <section className="py-section border-b border-border bg-surface">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
            
            {project.problem && (
              <div>
                <h2 className="text-label text-accent uppercase tracking-widest mb-4">
                  The Problem
                </h2>
                <div className="prose prose-invert prose-p:text-muted max-w-none">
                  <p className="text-body-lg">{project.problem}</p>
                </div>
              </div>
            )}

            {project.solution && (
              <div>
                <h2 className="text-label text-accent uppercase tracking-widest mb-4">
                  The Solution
                </h2>
                <div className="prose prose-invert prose-p:text-muted max-w-none">
                  <p className="text-body-lg">{project.solution}</p>
                </div>
              </div>
            )}
            
          </div>
        </div>
      </Container>
    </section>
  );
}
