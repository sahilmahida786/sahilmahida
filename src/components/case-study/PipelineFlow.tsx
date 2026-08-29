import type { Project } from "@/types";
import Container from "@/components/ui/Container";
import { ArrowRight } from "lucide-react";

interface PipelineFlowProps {
  project: Project;
}

export default function PipelineFlow({ project }: PipelineFlowProps) {
  if (!project.pipeline || project.pipeline.length === 0) return null;

  return (
    <section className="py-section bg-surface border-y border-border">
      <Container>
        <div className="mb-12 text-center">
          <h2 className="text-h2 text-foreground mb-4">Automated Pipeline</h2>
          <p className="text-muted max-w-2xl mx-auto">
            The lifecycle of a single piece of incoming information.
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-y-6 gap-x-2 md:gap-x-4 max-w-5xl mx-auto">
          {project.pipeline.map((step, index) => (
            <div key={index} className="flex items-center">
              
              <div className="bg-background border border-border rounded-lg px-4 py-3 min-w-[120px] text-center shadow-sm">
                <span className="text-label text-foreground text-xs md:text-sm whitespace-nowrap">
                  {step.title}
                </span>
              </div>

              {index < project.pipeline!.length - 1 && (
                <div className="text-accent mx-2 md:mx-4">
                  <ArrowRight size={20} className="opacity-50" />
                </div>
              )}
              
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
