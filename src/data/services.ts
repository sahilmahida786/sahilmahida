import type { ServiceCategory } from "@/types";

export const services: ServiceCategory[] = [
  {
    title: "Websites",
    slug: "websites",
    description: "Professional web presence that converts visitors into customers",
    items: [
      { name: "Business Websites", description: "Professional online presence for businesses" },
      { name: "Landing Pages", description: "High-converting single-page experiences" },
      { name: "Corporate Websites", description: "Enterprise-grade company websites" },
      { name: "Product Websites", description: "Showcase and sell digital or physical products" },
      { name: "Resort & Hospitality Websites", description: "Booking-ready websites for hospitality" },
    ],
  },
  {
    title: "Software",
    slug: "software",
    description: "Custom software solutions that streamline operations",
    items: [
      { name: "Web Applications", description: "Full-featured browser-based applications" },
      { name: "Dashboards", description: "Data visualization and management interfaces" },
      { name: "ERP Systems", description: "Enterprise resource planning solutions" },
      { name: "Business Software", description: "Custom tools for business workflows" },
    ],
  },
  {
    title: "Automation",
    slug: "automation",
    description: "Automate repetitive tasks and extract valuable data",
    items: [
      { name: "Web Scraping", description: "Automated data extraction from any website" },
      { name: "Process Automation", description: "Automate repetitive business workflows" },
      { name: "Data Extraction", description: "Structured data from unstructured sources" },
      { name: "API Integrations", description: "Connect and synchronize different services" },
    ],
  },
  {
    title: "AI Solutions",
    slug: "ai",
    description: "Intelligent features powered by artificial intelligence",
    items: [
      { name: "AI-Powered Applications", description: "Applications with built-in intelligence" },
      { name: "AI Integrations", description: "Add AI capabilities to existing systems" },
      { name: "Intelligent Workflows", description: "Smart automation with decision-making" },
    ],
  },
  {
    title: "Digital Launch",
    slug: "digital-launch",
    description: "Everything needed to go from code to live product",
    items: [
      { name: "Domain & DNS", description: "Domain registration and DNS configuration" },
      { name: "Hosting & Deployment", description: "Server setup and application deployment" },
      { name: "SEO Setup", description: "Search engine optimization from day one" },
      { name: "Google Business Profile", description: "Local search presence setup" },
    ],
  },
];
