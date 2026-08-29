import type { TechnologyGroup } from "@/types";

export const technologies: TechnologyGroup[] = [
  {
    category: "build",
    label: "BUILD",
    description: "Core languages and frameworks for development.",
    items: [
      { name: "Python", slug: "python", category: "build", role: "Primary Backend Language", description: "Used in web applications, automation, and AI systems.", projects: ["telegram-ai-intelligence-engine", "stockboy", "google-maps-scraper", "enterprise-erp", "voice-khata-book", "ai-stock-market-analysis"] },
      { name: "JavaScript", slug: "javascript", category: "build", role: "Frontend & Full-stack", description: "Used for interactive web elements and DOM manipulation.", projects: ["alpha-software"] },
      { name: "HTML", slug: "html", category: "build", role: "Markup", description: "Semantic web structure.", projects: ["alpha-software"] },
      { name: "CSS", slug: "css", category: "build", role: "Styling", description: "Core web styling.", projects: ["alpha-software"] },
      { name: "Django", slug: "django", category: "build", role: "Web Framework", description: "Full-featured web framework.", projects: ["stockboy", "enterprise-erp"] },
      { name: "Flask", slug: "flask", category: "build", role: "Micro-Framework", description: "Lightweight API services.", projects: [] },
      { name: "Tailwind CSS", slug: "tailwind", category: "build", role: "Styling Framework", description: "Utility-first responsive design.", projects: ["girstay-premium"] },
    ],
  },
  {
    category: "data",
    label: "DATA",
    description: "Databases and data management systems.",
    items: [
      { name: "PostgreSQL", slug: "postgresql", category: "data", role: "Relational Database", description: "Advanced open-source relational database.", projects: ["telegram-ai-intelligence-engine", "stockboy", "enterprise-erp"] },
      { name: "MySQL", slug: "mysql", category: "data", role: "Relational Database", description: "Standard relational database for web applications.", projects: [] },
      { name: "SQLite", slug: "sqlite", category: "data", role: "Embedded Database", description: "Lightweight disk-based database.", projects: [] },
      { name: "Firebase", slug: "firebase", category: "data", role: "NoSQL / Auth", description: "Real-time database and authentication.", projects: [] },
      { name: "Supabase", slug: "supabase", category: "data", role: "PostgreSQL Platform", description: "Open-source Firebase alternative.", projects: [] },
    ],
  },
  {
    category: "intelligence",
    label: "INTELLIGENCE",
    description: "AI capabilities and automation workflows.",
    items: [
      { name: "AI Integration", slug: "ai-integration", category: "intelligence", role: "AI Services", description: "Integrating large language models and intelligent processing.", projects: ["telegram-ai-intelligence-engine", "stockboy", "ai-stock-market-analysis"] },
      { name: "Automation", slug: "automation", category: "intelligence", role: "Workflow Automation", description: "Automated pipelines and data processing scripts.", projects: ["telegram-ai-intelligence-engine", "google-maps-scraper"] },
      { name: "AI Workflows", slug: "ai-workflows", category: "intelligence", role: "Pipeline Verification", description: "AI-assisted verification and extraction pipelines.", projects: ["telegram-ai-intelligence-engine"] },
    ],
  },
  {
    category: "integration",
    label: "INTEGRATION",
    description: "APIs, third-party services, and payments.",
    items: [
      { name: "REST APIs", slug: "rest-apis", category: "integration", role: "API Communication", description: "Developing and consuming RESTful interfaces.", projects: [] },
      { name: "Telegram API", slug: "telegram-api", category: "integration", role: "Bot & Distribution", description: "Automated messaging and distribution.", projects: ["telegram-ai-intelligence-engine"] },
      { name: "Razorpay", slug: "razorpay", category: "integration", role: "Payment Gateway", description: "Payment processing integration.", projects: ["stockboy"] },
      { name: "Web Scraping", slug: "web-scraping", category: "integration", role: "Data Extraction", description: "Automated business data discovery and structuring.", projects: ["google-maps-scraper"] },
    ],
  },
  {
    category: "infrastructure",
    label: "INFRASTRUCTURE",
    description: "Version control, hosting, and deployment.",
    items: [
      { name: "Git", slug: "git", category: "infrastructure", role: "Version Control", description: "Source code management.", projects: [] },
      { name: "GitHub", slug: "github", category: "infrastructure", role: "Repository Hosting", description: "Code hosting and collaboration.", projects: [] },
      { name: "Linux", slug: "linux", category: "infrastructure", role: "OS", description: "Server administration and environment setup.", projects: [] },
      { name: "Hosting", slug: "hosting", category: "infrastructure", role: "Deployment", description: "Application deployment.", projects: [] },
      { name: "Domain & DNS", slug: "domain-dns", category: "infrastructure", role: "Networking", description: "Domain routing and DNS management.", projects: [] },
      { name: "Railway", slug: "railway", category: "infrastructure", role: "Cloud Platform", description: "Automated deployment and hosting.", projects: ["telegram-ai-intelligence-engine"] },
    ],
  },
  {
    category: "optimization",
    label: "OPTIMIZATION",
    description: "Search, performance, and responsive design.",
    items: [
      { name: "SEO", slug: "seo", category: "optimization", role: "Discoverability", description: "Search engine optimization strategy.", projects: ["alpha-software"] },
      { name: "Google Search Console", slug: "gsc", category: "optimization", role: "Monitoring", description: "Search performance and indexing.", projects: [] },
      { name: "Google Business Profile", slug: "gbp", category: "optimization", role: "Local SEO", description: "Local business presence.", projects: [] },
      { name: "Performance Optimization", slug: "performance", category: "optimization", role: "Web Vitals", description: "Improving load times and efficiency.", projects: [] },
    ],
  },
];
