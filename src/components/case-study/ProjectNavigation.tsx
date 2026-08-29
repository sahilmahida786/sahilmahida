import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";

interface ProjectNavigationProps {
  prevProject?: { slug: string; name: string };
  nextProject?: { slug: string; name: string };
}

export default function ProjectNavigation({ prevProject, nextProject }: ProjectNavigationProps) {
  return (
    <div className="relative py-16 md:py-20 border-t border-border overflow-hidden">
      {/* Subtle Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-accent/5 pointer-events-none" />
      
      <Container className="relative z-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-8 md:gap-6">
          
          {/* Previous Project */}
          <div className="flex-1 flex justify-start w-full sm:w-auto">
            {prevProject ? (
              <Link 
                href={`/projects/${prevProject.slug}`}
                className="group flex flex-col items-start w-full sm:w-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-xl p-4 -ml-4 transition-all duration-300 hover:bg-white/5 active:scale-[0.98]"
              >
                <span className="text-label text-muted mb-2 flex items-center gap-2 uppercase tracking-widest text-xs">
                  <ArrowLeft size={14} className="transition-transform duration-300 group-hover:-translate-x-1.5 group-hover:text-accent" />
                  Previous Project
                </span>
                <span className="text-h3 text-foreground group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/70 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                  {prevProject.name}
                </span>
              </Link>
            ) : <div className="hidden sm:block" />}
          </div>

          {/* Back to Projects */}
          <div className="flex-none order-last sm:order-none mt-4 sm:mt-0">
            <Link 
              href="/#projects"
              className="text-label text-muted hover:text-accent transition-colors duration-300 uppercase tracking-widest px-4 py-2"
            >
              Back to Projects
            </Link>
          </div>

          {/* Next Project */}
          <div className="flex-1 flex justify-end w-full sm:w-auto sm:text-right">
            {nextProject ? (
              <Link 
                href={`/projects/${nextProject.slug}`}
                className="group flex flex-col items-start sm:items-end w-full sm:w-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-xl p-4 -ml-4 sm:ml-0 sm:-mr-4 transition-all duration-300 hover:bg-white/5 active:scale-[0.98]"
              >
                <span className="text-label text-muted mb-2 flex items-center gap-2 uppercase tracking-widest text-xs">
                  Next Project
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1.5 group-hover:text-accent" />
                </span>
                <span className="text-h3 text-foreground group-hover:bg-gradient-to-l group-hover:from-white group-hover:to-white/70 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                  {nextProject.name}
                </span>
              </Link>
            ) : <div className="hidden sm:block" />}
          </div>

        </div>
      </Container>
    </div>
  );
}
