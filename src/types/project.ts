export type ProjectCategory = "website" | "software" | "automation" | "ai" | "web-app";
export type ProjectStatus = "live" | "in-development" | "archived";

export interface ImageAsset {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Technology {
  name: string;
  slug: string;
  category: TechnologyCategory;
}

export type TechnologyCategory =
  | "language"
  | "framework"
  | "database"
  | "integration"
  | "infrastructure"
  | "intelligence"
  | "optimization";

export interface Feature {
  title: string;
  description: string;
  screenshot?: ImageAsset;
}

export interface ArchitectureNode {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

export interface PipelineStep {
  title: string;
  description?: string;
}

export interface InfrastructureItem {
  category: string;
  name: string;
}


export interface Project {
  // Identity
  slug: string;
  name: string;
  tagline: string;
  category: ProjectCategory;

  // Case Study Content
  overview: string;
  problem?: string;
  solution?: string;
  role: string;
  duration?: string;

  // Technical
  technologies: string[];
  architecture?: string;
  architectureNodes?: ArchitectureNode[];
  pipeline?: PipelineStep[];
  infrastructure?: InfrastructureItem[];
  features: Feature[];

  // Media
  thumbnail: ImageAsset;
  hero: ImageAsset;
  screenshots: ImageAsset[];
  ogImage: ImageAsset;

  // Links
  liveUrl?: string;
  liveLabel?: string;
  githubUrl?: string;
  demoUrl?: string;

  // Reflection
  challenges?: string[];
  learnings?: string[];
  result?: string;

  // Meta
  featured: boolean;
  order: number;
  status: ProjectStatus;
}
