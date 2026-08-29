"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TechnologyGroup, TechnologyItem } from "@/types";
import TechDetailPanel from "./TechDetailPanel";

interface TechAccordionMobileProps {
  groups: TechnologyGroup[];
}

export default function TechAccordionMobile({ groups }: TechAccordionMobileProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(groups[0]?.category || null);
  const [activeTech, setActiveTech] = useState<TechnologyItem | null>(null);

  const toggleCategory = (category: string) => {
    if (expandedCategory === category) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(category);
    }
  };

  const toggleTech = (tech: TechnologyItem) => {
    if (activeTech?.slug === tech.slug) {
      setActiveTech(null);
    } else {
      setActiveTech(tech);
    }
  };

  return (
    <div className="md:hidden flex flex-col gap-4">
      {groups.map((group) => {
        const isExpanded = expandedCategory === group.category;
        
        return (
          <div key={group.category} className="border border-border rounded-xl bg-surface overflow-hidden">
            <button
              onClick={() => toggleCategory(group.category)}
              aria-expanded={isExpanded}
              aria-controls={`tech-content-${group.category}`}
              className="w-full flex items-center justify-between p-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
            >
              <div>
                <h3 className="text-h3 text-foreground uppercase tracking-widest">{group.label}</h3>
              </div>
              <ChevronDown 
                size={20} 
                className={cn("text-muted transition-transform duration-300", isExpanded && "rotate-180")} 
              />
            </button>
            
            <div 
              id={`tech-content-${group.category}`}
              className={cn(
                "grid transition-all duration-300", 
                isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              )}
            >
              <div className="overflow-hidden">
                <div className="p-5 pt-0 flex flex-col gap-2">
                  {group.items.map((tech) => {
                    const isTechActive = activeTech?.slug === tech.slug;
                    return (
                      <div key={tech.slug} className="flex flex-col gap-2">
                        <button
                          onClick={() => toggleTech(tech)}
                          aria-expanded={isTechActive}
                          className={cn(
                            "text-left p-3 rounded-lg border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                            isTechActive 
                              ? "bg-accent/10 border-accent text-accent" 
                              : "bg-surface-elevated border-transparent text-foreground/80 hover:border-border"
                          )}
                        >
                          <span className="font-mono text-sm">{tech.name}</span>
                        </button>
                        
                        {/* Inline Detail Panel on Mobile */}
                        {isTechActive && (
                          <div className="mt-2 mb-4">
                            <TechDetailPanel technology={tech} />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
