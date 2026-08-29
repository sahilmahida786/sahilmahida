"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import { projects } from "@/data/projects";
import FeaturedProjectCard from "@/components/ui/FeaturedProjectCard";
import ProjectCard from "@/components/ui/ProjectCard";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { cn } from "@/lib/utils";

const FILTERS = ["ALL", "AI", "WEB", "SOFTWARE", "AUTOMATION"];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const hasProjects = projects.length > 0;
  
  const filteredProjects = projects.filter(p => {
    if (activeFilter === "ALL") return true;
    if (activeFilter === "WEB" && (p.category === "website" || p.category === "web-app")) return true;
    if (activeFilter === "AI" && p.category === "ai") return true;
    if (activeFilter === "SOFTWARE" && p.category === "software") return true;
    if (activeFilter === "AUTOMATION" && p.category === "automation") return true;
    return false;
  });

  const featuredProject = filteredProjects.find((p) => p.featured && p.order === 1);
  const standardProjects = filteredProjects.filter((p) => p.featured && p.order !== 1);

  return (
    <section
      id="projects"
      className="relative py-section bg-gradient-to-b from-background via-[hsl(225,20%,4.5%)] to-background"
      aria-labelledby="projects-heading"
    >
      <Container>
        <RevealOnScroll>
          <SectionHeader
            eyebrow="01 / PROJECT UNIVERSE"
            title="Systems, products and digital experiences I've engineered."
            description="Selected systems, products and digital solutions."
          />
        </RevealOnScroll>

        {hasProjects ? (
          <div className="flex flex-col gap-12 lg:gap-20">
            
            {/* Filter Bar */}
            <div className="flex flex-wrap gap-2 md:gap-4 justify-center" role="tablist">
              {FILTERS.map(filter => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  role="tab"
                  aria-selected={activeFilter === filter}
                  className={cn(
                    "px-4 py-2 rounded-full text-xs font-mono uppercase tracking-widest transition-all duration-300 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                    activeFilter === filter 
                      ? "bg-accent/10 border-accent text-accent" 
                      : "bg-surface border-border text-muted hover:border-accent/50 hover:text-foreground"
                  )}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Flagship Project */}
            {featuredProject && (
              <RevealOnScroll delay={200}>
                <FeaturedProjectCard project={featuredProject} />
              </RevealOnScroll>
            )}

            {/* Asymmetric Project Grid (CSS Grid) */}
            {standardProjects.length > 0 && (
              <RevealOnScroll delay={300}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-[var(--spacing-gap-lg)] auto-rows-max">
                  {standardProjects.map((project, index) => {
                    let spanClass = "";
                    const patternIndex = index % 8;
                    if (patternIndex === 0) spanClass = "lg:col-span-7";
                    else if (patternIndex === 1) spanClass = "lg:col-span-5";
                    else if (patternIndex === 2) spanClass = "lg:col-span-5";
                    else if (patternIndex === 3) spanClass = "lg:col-span-7";
                    else if (patternIndex === 4) spanClass = "lg:col-span-6";
                    else if (patternIndex === 5) spanClass = "lg:col-span-6";
                    else if (patternIndex === 6) spanClass = "lg:col-span-6";
                    else if (patternIndex === 7) spanClass = "lg:col-span-6";
                    else spanClass = "lg:col-span-12";

                    return (
                      <ProjectCard 
                        key={project.slug} 
                        project={project} 
                        className={spanClass} 
                      />
                    );
                  })}
                </div>
              </RevealOnScroll>
            )}
            
            {filteredProjects.length === 0 && (
              <div className="text-center py-20 text-muted">
                No projects found in this category.
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-20 text-muted">
            Projects are currently being updated.
          </div>
        )}
      </Container>
    </section>
  );
}
