export type TechnologyCategory =
  | "build"
  | "data"
  | "intelligence"
  | "integration"
  | "infrastructure"
  | "optimization";

export interface TechnologyItem {
  name: string;
  slug: string;
  category: TechnologyCategory;
  description: string;
  role?: string;
  projects?: string[]; // Array of project slugs
  icon?: string;
}

export interface TechnologyGroup {
  category: TechnologyCategory;
  label: string;
  description: string;
  items: TechnologyItem[];
}
