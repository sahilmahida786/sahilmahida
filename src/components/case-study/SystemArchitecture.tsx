"use client";

import { useState } from "react";
import type { Project } from "@/types";
import Container from "@/components/ui/Container";
import { ChevronDown, Database, Cpu, Bot, Send, Search, Workflow, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SystemArchitectureProps {
  project: Project;
}

const getIconForNodeId = (id: string) => {
  switch (id) {
    case "source": return <Database size={20} />;
    case "adapter": return <Workflow size={20} />;
    case "queue": return <Database size={20} />;
    case "processing": return <Search size={20} />;
    case "ai": return <Cpu size={20} />;
    case "intelligence": return <Bot size={20} />;
    case "image": return <ImageIcon size={20} />;
    case "telegram": return <Send size={20} />;
    default: return <Cpu size={20} />;
  }
};

export default function SystemArchitecture({ project }: SystemArchitectureProps) {
  const [expandedNode, setExpandedNode] = useState<string | null>(null);

  if (!project.architectureNodes || project.architectureNodes.length === 0) return null;

  const nodes = project.architectureNodes;

  return (
    <section id="architecture" className="py-section bg-background overflow-hidden relative">
      <Container>
        <div className="mb-16 text-center">
          <h2 className="text-h2 text-foreground mb-4">System Architecture</h2>
          <p className="text-muted max-w-2xl mx-auto">
            Interactive overview of the automated pipeline.
          </p>
        </div>

        {/* Desktop View (Horizontal Flow) */}
        <div className="hidden lg:flex items-stretch justify-between relative max-w-6xl mx-auto min-h-[300px]">
          {/* Subtle animated flow line behind nodes */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2 z-0" />
          <div 
            className="absolute top-1/2 left-0 h-0.5 bg-accent -translate-y-1/2 z-0 motion-safe:animate-[flow_3s_ease-in-out_infinite]"
            style={{ width: '20%' }}
          />

          {nodes.map((node) => (
            <div 
              key={node.id} 
              className="relative z-10 flex flex-col items-center group flex-1 px-2"
              onMouseEnter={() => setExpandedNode(node.id)}
              onMouseLeave={() => setExpandedNode(null)}
            >
              {/* Node Icon Circle */}
              <div className={cn(
                "w-14 h-14 rounded-full flex items-center justify-center border-2 transition-colors duration-300 bg-surface",
                expandedNode === node.id ? "border-accent text-accent" : "border-border text-muted group-hover:border-accent/50"
              )}>
                {getIconForNodeId(node.id)}
              </div>
              
              {/* Node Title */}
              <div className="mt-4 text-center">
                <div className="text-label text-foreground mb-2 text-xs">{node.title}</div>
                
                {/* Expandable Details */}
                <div className={cn(
                  "absolute top-full left-1/2 -translate-x-1/2 w-48 mt-4 p-4 rounded-xl bg-surface-elevated border border-border shadow-lg transition-all duration-300",
                  expandedNode === node.id ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-2 invisible"
                )}>
                  <p className="text-body-sm text-muted text-left">
                    {node.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View (Vertical Accordion) */}
        <div className="lg:hidden flex flex-col gap-4 max-w-2xl mx-auto">
          {nodes.map((node, index) => {
            const isExpanded = expandedNode === node.id;
            return (
              <div key={node.id} className="relative">
                {/* Connecting Line (except for last item) */}
                {index < nodes.length - 1 && (
                  <div className="absolute left-7 top-14 bottom-[-16px] w-0.5 bg-border z-0" />
                )}
                
                <button
                  onClick={() => setExpandedNode(isExpanded ? null : node.id)}
                  className={cn(
                    "relative z-10 w-full flex items-start text-left bg-surface border rounded-xl p-4 transition-colors",
                    isExpanded ? "border-accent shadow-[0_0_15px_rgba(59,130,246,0.15)]" : "border-border"
                  )}
                  aria-expanded={isExpanded}
                >
                  <div className={cn(
                    "shrink-0 w-6 h-6 rounded-full flex items-center justify-center mr-4 mt-0.5 transition-colors",
                    isExpanded ? "text-accent bg-accent/10" : "text-muted"
                  )}>
                    {getIconForNodeId(node.id)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-label text-foreground">{node.title}</span>
                      <ChevronDown 
                        size={16} 
                        className={cn(
                          "text-muted transition-transform duration-300",
                          isExpanded && "rotate-180"
                        )} 
                      />
                    </div>
                    
                    <div className={cn(
                      "overflow-hidden transition-all duration-300",
                      isExpanded ? "max-h-40 mt-3 opacity-100" : "max-h-0 opacity-0"
                    )}>
                      <p className="text-body-sm text-muted">
                        {node.description}
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            );
          })}
        </div>

      </Container>

      {/* Basic flow animation keyframes */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes flow {
          0% { left: 0; transform: translateY(-50%) translateX(-100%); }
          100% { left: 100%; transform: translateY(-50%) translateX(0); }
        }
      `}} />
    </section>
  );
}
