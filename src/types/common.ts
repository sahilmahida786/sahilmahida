export interface NavLink {
  label: string;
  href: string;
  section: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface ServiceCategory {
  title: string;
  slug: string;
  description: string;
  items: ServiceItem[];
}

export interface ServiceItem {
  name: string;
  description: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  projectType: string;
  message: string;
}

export interface DeviceCapability {
  hasWebGL: boolean;
  isMobile: boolean;
  isTouch: boolean;
  prefersReducedMotion: boolean;
  connectionSpeed: "fast" | "medium" | "slow" | "unknown";
  gpuTier: "high" | "medium" | "low" | "unknown";
  viewportWidth: number;
}
