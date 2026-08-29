"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { TechnologyGroup, TechnologyItem } from "@/types";
import TechDetailPanel from "./TechDetailPanel";

interface TechGraphDesktopProps {
  groups: TechnologyGroup[];
}

export default function TechGraphDesktop({ groups }: TechGraphDesktopProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeTech, setActiveTech] = useState<TechnologyItem | null>(null);

  const handleTechClick = (tech: TechnologyItem, category: string) => {
    setActiveTech(tech);
    setActiveCategory(category);
  };

  const handleCategoryHover = (category: string) => {
    if (!activeTech) {
      setActiveCategory(category);
    }
  };

  const handleMouseLeave = () => {
    if (!activeTech) {
      setActiveCategory(null);
    }
  };

  return (
    <div className="hidden md:flex flex-col lg:flex-row gap-12 lg:gap-20 relative">
      
      {/* Ecosystem Map (Left side) */}
      <div 
        className="flex-1 flex flex-col items-center relative"
        onMouseLeave={handleMouseLeave}
      >
        {/* Core Node */}
        <div className="z-10 bg-background border-2 border-accent rounded-lg px-8 py-4 shadow-[0_0_20px_rgba(var(--color-accent-rgb),0.2)] mb-12">
          <h2 className="text-h3 text-foreground tracking-widest font-mono">SAHIL.OS</h2>
        </div>

        {/* Vertical stem from core */}
        <div className="absolute top-[56px] left-1/2 w-px h-12 bg-border -translate-x-1/2" />

        {/* Categories Grid */}
        <div className="w-full grid grid-cols-2 xl:grid-cols-3 gap-8 relative z-10">
          {groups.map((group) => {
            const isHovered = activeCategory === group.category;
            const isDimmed = activeCategory && activeCategory !== group.category;

            return (
              <div 
                key={group.category}
                onMouseEnter={() => handleCategoryHover(group.category)}
                className={cn(
                  "flex flex-col border border-border rounded-xl p-5 bg-surface transition-all duration-500",
                  isHovered ? "border-accent/50 shadow-[0_4px_20px_rgba(0,0,0,0.2)]" : "",
                  isDimmed ? "opacity-30 scale-95" : "opacity-100 scale-100"
                )}
              >
                <div className="text-center mb-6 border-b border-border pb-4">
                  <h3 className={cn("text-label font-mono uppercase tracking-widest transition-colors duration-300", isHovered ? "text-accent" : "text-foreground")}>
                    {group.label}
                  </h3>
                </div>
                
                <div className="flex flex-col gap-2">
                  {group.items.map((tech) => {
                    const isSelected = activeTech?.slug === tech.slug;
                    return (
                      <button
                        key={tech.slug}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTechClick(tech, group.category);
                        }}
                        className={cn(
                          "px-3 py-2 text-sm font-mono rounded border transition-all text-left focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent",
                          isSelected 
                            ? "bg-accent/20 border-accent text-accent" 
                            : "bg-surface-elevated border-transparent text-muted hover:border-accent/30 hover:text-foreground"
                        )}
                      >
                        {tech.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Abstract Background Wiring */}
        <div className="absolute inset-0 pointer-events-none -z-10 opacity-20">
            {/* Horizontal bus line connecting categories */}
            <div className="absolute top-[104px] left-[16.6%] right-[16.6%] h-px bg-foreground" />
        </div>
      </div>

      {/* Detail Panel (Right side, fixed width) */}
      <div className="w-full lg:w-80 flex-none shrink-0">
        <div className="sticky top-32">
          {activeTech ? (
            <div className="h-full relative">
              {/* Close button overlay */}
              <button 
                onClick={() => {
                  setActiveTech(null);
                  setActiveCategory(null);
                }}
                className="absolute top-4 right-4 z-20 text-muted hover:text-foreground p-1"
                aria-label="Close details"
              >
                ✕
              </button>
              <TechDetailPanel technology={activeTech} />
            </div>
          ) : (
            <div className="h-[300px] border border-border/50 border-dashed rounded-xl flex items-center justify-center p-6 text-center bg-surface/50">
              <p className="text-muted text-sm uppercase tracking-widest font-mono">
                Select a technology<br/>to view details and<br/>project usage.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
