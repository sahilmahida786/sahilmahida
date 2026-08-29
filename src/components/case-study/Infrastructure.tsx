import type { Project } from "@/types";
import Container from "@/components/ui/Container";

interface InfrastructureProps {
  project: Project;
}

export default function Infrastructure({ project }: InfrastructureProps) {
  if (!project.infrastructure || project.infrastructure.length === 0) return null;

  return (
    <section className="py-section border-t border-border bg-surface">
      <Container>
        <div className="mb-12">
          <h2 className="text-h2 text-foreground mb-4">Infrastructure Stack</h2>
          <p className="text-muted max-w-2xl">
            The core technologies powering the pipeline, grouped by system responsibility.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {project.infrastructure.map((item, idx) => (
            <div key={idx} className="bg-background border border-border p-5 rounded-xl">
              <span className="text-xs text-accent uppercase tracking-widest block mb-2 font-mono">
                {item.category}
              </span>
              <span className="text-foreground text-body-lg font-medium block">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
