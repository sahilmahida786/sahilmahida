import Link from "next/link";
import { ArrowRight, Box } from "lucide-react";
import type { TechnologyItem } from "@/types";
import { projects } from "@/data/projects";

interface TechDetailPanelProps {
  technology: TechnologyItem | null;
  onClose?: () => void;
}

export default function TechDetailPanel({ technology }: TechDetailPanelProps) {
  if (!technology) return null;

  // Map slugs to actual project objects to get the name
  const relatedProjects = (technology.projects || [])
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => p !== undefined);

  return (
    <div className="bg-surface-elevated border border-border rounded-xl p-5 md:p-6 flex flex-col h-full animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="flex items-center gap-3 mb-2 text-accent">
        <Box size={20} />
        <h4 className="text-h3 text-foreground uppercase tracking-wider">{technology.name}</h4>
      </div>
      
      {technology.role && (
        <div className="text-label text-muted uppercase tracking-widest mb-4">
          {technology.role}
        </div>
      )}
      
      <p className="text-body-sm text-foreground/80 mb-6">
        {technology.description}
      </p>

      {relatedProjects.length > 0 && (
        <div className="mt-auto border-t border-border pt-4">
          <span className="text-[10px] text-muted uppercase tracking-widest mb-3 block">Used In Verified Projects</span>
          <ul className="space-y-2">
            {relatedProjects.map((project) => (
              <li key={project.slug}>
                <Link 
                  href={`/projects/${project.slug}`}
                  className="group flex items-center justify-between text-body-sm text-foreground/80 hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded px-1 -mx-1 py-0.5"
                >
                  <span className="truncate pr-4">{project.name}</span>
                  <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
