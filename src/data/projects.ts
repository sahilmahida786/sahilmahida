import type { Project } from "@/types";

/**
 * Project data array.
 * Each project follows the case study data model from the implementation plan.
 *
 * IMPORTANT: Only include information that has been confirmed by Sahil.
 * Mark uncertain fields as undefined rather than inventing details.
 *
 * Projects will be populated as Sahil provides content for each one.
 */
export const projects: Project[] = [
  {
    slug: "telegram-ai-intelligence-engine",
    name: "QuantAI",
    tagline: "An automated intelligence pipeline that transforms market and company information into verified, structured and publish-ready intelligence.",
    category: "ai",
    
    overview: "This system automates the ingestion, processing, and distribution of critical market information directly to Telegram.",
    problem: "Important market/company information arrives through various sources like announcements and financial documents. Processing this manually is repetitive, slow, and prone to human error.",
    solution: "An automated pipeline that detects events, queues processing tasks, extracts text from documents, uses AI for verification and analysis, and publishes the structured intelligence directly to a Telegram channel.",
    role: "Lead Engineer",
    
    technologies: ["Python", "AI", "Redis", "PostgreSQL", "Telegram API", "PDF Processing"],
    architectureNodes: [
      { id: "source", title: "SOURCE", description: "Receives relevant information from various data streams." },
      { id: "adapter", title: "EVENT ADAPTER", description: "Normalizes and filters incoming events." },
      { id: "queue", title: "QUEUE", description: "Provides decoupling between ingestion and processing via Redis." },
      { id: "processing", title: "DOCUMENT PROCESSING", description: "Downloads and extracts text from incoming documents (PDFs)." },
      { id: "ai", title: "AI VERIFICATION", description: "Uses AI-assisted verification and analysis on extracted text." },
      { id: "intelligence", title: "INTELLIGENCE", description: "Transforms processed information into structured, publish-ready output." },
      { id: "image", title: "IMAGE ENGINE", description: "Generates visual output representations (when implemented)." },
      { id: "telegram", title: "TELEGRAM", description: "Publishes the final structured result to the Telegram channel." }
    ],
    pipeline: [
      { title: "NEW EVENT" },
      { title: "DETECT" },
      { title: "QUEUE" },
      { title: "PROCESS" },
      { title: "EXTRACT" },
      { title: "VERIFY" },
      { title: "ANALYZE" },
      { title: "GENERATE" },
      { title: "PUBLISH" }
    ],
    infrastructure: [
      { category: "HOSTING", name: "Railway" },
      { category: "DATA", name: "PostgreSQL" },
      { category: "QUEUE / CACHE", name: "Redis" },
      { category: "PROCESSING", name: "Python Workers" },
      { category: "AI", name: "AI Provider" },
      { category: "DISTRIBUTION", name: "Telegram Bot API" }
    ],
    features: [
      { title: "Automated Pipeline", description: "Seamless data flow from source to publication." },
      { title: "AI-Assisted Verification", description: "Ensures accuracy and consistency in extracted data." }
    ],
    
    thumbnail: { src: "/images/placeholder.jpg", alt: "Thumbnail", width: 800, height: 600 },
    hero: { src: "/images/placeholder.jpg", alt: "Hero", width: 1920, height: 1080 },
    screenshots: [
      { src: "/images/placeholder.jpg", alt: "Architecture", width: 1200, height: 800 },
      { src: "/images/placeholder.jpg", alt: "Output", width: 1200, height: 800 }
    ],
    ogImage: { src: "/images/placeholder.jpg", alt: "OG", width: 1200, height: 630 },
    
    featured: true,
    order: 1,
    status: "live",
    liveUrl: "https://quantai-telegram-intelligence-production.up.railway.app/",
    liveLabel: "Live System"
  },
  {
    slug: "stockboy",
    name: "StockBoy",
    tagline: "Stock market learning and intelligence platform.",
    category: "website",
    overview: "An educational and intelligence platform designed to help users understand stock market dynamics.",
    role: "Full-Stack Developer",
    technologies: ["Python", "Django", "AI", "PostgreSQL", "Razorpay"],
    thumbnail: { src: "/images/projects/stockboy/stockboy-overview-v2.webp", alt: "StockBoy premium signal platform overview", width: 1920, height: 1080 },
    hero: { src: "/images/projects/stockboy/stockboy-overview-v2.webp", alt: "StockBoy premium signal platform interface", width: 1920, height: 1080 },
    screenshots: [
      { src: "/images/projects/stockboy/stockboy-overview-v2.webp", alt: "StockBoy premium signal platform interface overview", width: 1920, height: 1080 },
      { src: "/images/projects/stockboy/stockboy-features-v2.webp", alt: "StockBoy real-time stock signals and member features", width: 1920, height: 1080 },
      { src: "/images/projects/stockboy/stockboy-pricing-v2.webp", alt: "StockBoy premium membership plans", width: 1920, height: 1080 },
      { src: "/images/projects/stockboy/stockboy-community-v2.webp", alt: "StockBoy verified premium community access", width: 1920, height: 1080 },
      { src: "/images/projects/stockboy/stockboy-login-v2.webp", alt: "StockBoy premium dashboard login", width: 1920, height: 1080 },
      { src: "/images/projects/stockboy/stockboy-register-v2.webp", alt: "StockBoy premium dashboard register", width: 1920, height: 1080 }
    ],
    ogImage: { src: "/images/projects/stockboy/stockboy-overview-v2.webp", alt: "StockBoy premium signal platform", width: 1920, height: 1080 },
    features: [
      { title: "Market Intelligence", description: "Learn about the stock market with AI-assisted insights." },
      { title: "Responsive Web Experience", description: "Accessible across all devices for on-the-go learning." }
    ],
    featured: true,
    order: 2,
    status: "live",
    liveUrl: "https://stockboy.works",
    liveLabel: "Live Site"
  },
  {
    slug: "girstay-premium",
    name: "GirStay Premium",
    tagline: "Sasan Gir resort booking website with seamless reservation flow.",
    category: "website",
    overview: "A premium digital presence and booking experience for a luxury resort located in Sasan Gir.",
    role: "Frontend Engineer",
    technologies: ["React", "Next.js", "Tailwind CSS"],
    thumbnail: { src: "/images/projects/girstay-premium/girstay-overview.webp", alt: "GirStay Premium resort booking overview", width: 1920, height: 1080 },
    hero: { src: "/images/projects/girstay-premium/girstay-overview.webp", alt: "GirStay Premium resort booking platform interface", width: 1920, height: 1080 },
    screenshots: [
      { src: "/images/projects/girstay-premium/girstay-overview.webp", alt: "GirStay Premium resort booking overview", width: 1920, height: 1080 },
      { src: "/images/projects/girstay-premium/girstay-rooms.webp", alt: "GirStay Premium luxury rooms and suites", width: 1920, height: 1080 },
      { src: "/images/projects/girstay-premium/girstay-booking.webp", alt: "GirStay Premium seamless reservation flow", width: 1920, height: 1080 },
      { src: "/images/projects/girstay-premium/girstay-amenities.webp", alt: "GirStay Premium exclusive resort amenities", width: 1920, height: 1080 },
      { src: "/images/projects/girstay-premium/girstay-gallery.webp", alt: "GirStay Premium resort image gallery", width: 1920, height: 1080 },
      { src: "/images/projects/girstay-premium/girstay-contact.webp", alt: "GirStay Premium contact and location", width: 1920, height: 1080 }
    ],
    ogImage: { src: "/images/projects/girstay-premium/girstay-overview.webp", alt: "GirStay Premium Sasan Gir resort", width: 1920, height: 1080 },
    features: [
      { title: "Mobile-First Design", description: "Optimized for mobile users searching for resorts on the go." },
      { title: "Booking Flow", description: "Seamless and intuitive reservation system integration." }
    ],
    featured: true,
    order: 3,
    status: "live",
    liveUrl: "http://girstay-premium.vercel.app",
    liveLabel: "Live Site"
  },
  {
    slug: "omr-software",
    name: "Alpha OMR",
    tagline: "High-performance enterprise presentation platform for OMR examination software.",
    category: "website",
    overview: "A highly optimized, production-grade business website built for Alpha Softwares to showcase their OMR examination software to schools, colleges, and coaching institutes.",
    problem: "The client required an extremely fast, SEO-optimized digital presence to rank for highly competitive OMR-related search terms, while clearly communicating their offline product's capabilities.",
    solution: "Architected a lightning-fast, mobile-first static website using semantic HTML and Tailwind CSS. Implemented a robust technical SEO strategy including comprehensive schema markup, WebP image optimization, and rigorous PageSpeed tuning.",
    role: "Frontend Development • Performance Optimization • Technical SEO",
    technologies: [
      "Semantic HTML5",
      "Tailwind CSS",
      "Vanilla JavaScript",
      "Technical SEO",
      "Image Optimization (WebP)",
      "Schema Markup",
      "CDN / India-based Hosting"
    ],
    thumbnail: { src: "/images/projects/omr-software/omr-overview.webp", alt: "Alpha OMR corporate presentation overview", width: 1920, height: 1080 },
    hero: { src: "/images/projects/omr-software/omr-overview.webp", alt: "Alpha OMR enterprise platform interface", width: 1920, height: 1080 },
    screenshots: [
      { src: "/images/projects/omr-software/omr-overview.webp", alt: "Alpha OMR corporate presentation overview", width: 1920, height: 1080 },
      { src: "/images/projects/omr-software/omr-feature-1.webp", alt: "Alpha OMR business intelligence and analytics", width: 1920, height: 1080 },
      { src: "/images/projects/omr-software/omr-feature-2.webp", alt: "Alpha OMR enterprise dashboard", width: 1920, height: 1080 },
      { src: "/images/projects/omr-software/omr-feature-3.webp", alt: "Alpha OMR corporate management interface", width: 1920, height: 1080 },
      { src: "/images/projects/omr-software/omr-feature-4.webp", alt: "Alpha OMR data visualization and reporting", width: 1920, height: 1080 },
      { src: "/images/projects/omr-software/omr-feature-5.webp", alt: "Alpha OMR client management portal", width: 1920, height: 1080 },
      { src: "/images/projects/omr-software/omr-feature-6.webp", alt: "Alpha OMR enterprise workflow management", width: 1920, height: 1080 },
      { src: "/images/projects/omr-software/omr-feature-7.webp", alt: "Alpha OMR secure system architecture", width: 1920, height: 1080 }
    ],
    ogImage: { src: "/images/projects/omr-software/omr-overview.webp", alt: "Alpha OMR business platform", width: 1920, height: 1080 },
    features: [
      { title: "⚡ Performance: 95+", description: "Engineered for maximum speed, achieving 95+ Lighthouse performance scores." },
      { title: "🔍 SEO: 100", description: "Flawless technical SEO implementation resulting in a perfect 100 score." },
      { title: "♿ Accessibility: 95+", description: "Strict adherence to WCAG guidelines for an inclusive user experience." },
      { title: "🛡️ Best Practices: 95+", description: "Secure, HTTPS-enforced, and built following strict web development standards." },
      { title: "📱 Mobile Responsive", description: "Flawless rendering across all breakpoints with lazy-loaded assets." }
    ],
    featured: true,
    order: 4,
    status: "live",
    liveUrl: "https://omrsoftware.in",
    liveLabel: "Live Site"
  },
  {
    slug: "google-maps-scraper",
    name: "Google Maps Scraper",
    tagline: "Business data extraction and automation system.",
    category: "automation",
    overview: "An automated data extraction pipeline designed to discover and extract structured business data from Google Maps.",
    role: "Automation Engineer",
    technologies: ["Python", "Selenium", "Data Extraction"],
    pipeline: [
      { title: "SEARCH INPUT" },
      { title: "BUSINESS DISCOVERY" },
      { title: "DATA EXTRACTION" },
      { title: "DEDUPLICATION" },
      { title: "STRUCTURED DATA" },
      { title: "CSV EXPORT" }
    ],
    thumbnail: { src: "/images/projects/google-maps-scraper/google-maps-scraper-overview.webp", alt: "Google Maps Scraper overview", width: 1920, height: 1080 },
    hero: { src: "/images/projects/google-maps-scraper/google-maps-scraper-overview.webp", alt: "Google Maps Scraper automation pipeline", width: 1920, height: 1080 },
    screenshots: [
      { src: "/images/projects/google-maps-scraper/google-maps-scraper-overview.webp", alt: "Google Maps Scraper overview", width: 1920, height: 1080 },
      { src: "/images/projects/google-maps-scraper/google-maps-scraper-feature-1.webp", alt: "Google Maps Scraper search and discovery", width: 1920, height: 1080 },
      { src: "/images/projects/google-maps-scraper/google-maps-scraper-feature-2.webp", alt: "Google Maps Scraper automated extraction", width: 1920, height: 1080 },
      { src: "/images/projects/google-maps-scraper/google-maps-scraper-feature-3.webp", alt: "Google Maps Scraper deduplication", width: 1920, height: 1080 },
      { src: "/images/projects/google-maps-scraper/google-maps-scraper-feature-4.webp", alt: "Google Maps Scraper structured data format", width: 1920, height: 1080 },
      { src: "/images/projects/google-maps-scraper/google-maps-scraper-feature-5.webp", alt: "Google Maps Scraper CSV export", width: 1920, height: 1080 }
    ],
    ogImage: { src: "/images/projects/google-maps-scraper/google-maps-scraper-overview.webp", alt: "Google Maps Scraper", width: 1920, height: 1080 },
    features: [
      { title: "Automated Extraction", description: "Discovers and structures business data automatically." },
      { title: "Deduplication", description: "Ensures clean output by removing duplicate entries." }
    ],
    featured: true,
    order: 5,
    status: "live"
  },
  {
    slug: "seo-google-business-profile",
    name: "Local SEO & GPB Optimization",
    tagline: "Achieved 100+ SEO scores and dominated local search rankings.",
    category: "website",
    overview: "A comprehensive Local SEO and Google Business Profile (GPB) optimization campaign resulting in top local search rankings and flawless 100+ SEO scores.",
    problem: "Local businesses often struggle to gain visibility in Google Maps and local search results due to unoptimized profiles, poor image SEO, and lack of structured data.",
    solution: "Executed a full-scale Technical and Local SEO strategy. Optimized the Google Business Profile, implemented advanced Schema Markup, improved Image SEO, and consistently managed reviews and keyword strategies to achieve a perfect 100 SEO score.",
    role: "SEO & Web Performance Engineer",
    technologies: [
      "Google Business Profile",
      "Google Maps SEO",
      "Local SEO",
      "On-Page SEO",
      "Technical SEO",
      "Keyword Research",
      "Review Management",
      "Image SEO",
      "Schema Markup",
      "Google Search Console",
      "PageSpeed Optimization"
    ],
    pipeline: [
      { title: "TECHNICAL AUDIT" },
      { title: "GPB SETUP" },
      { title: "ON-PAGE SEO" },
      { title: "SCHEMA MARKUP" },
      { title: "IMAGE SEO" },
      { title: "REVIEW MANAGEMENT" },
      { title: "LOCAL DOMINANCE" }
    ],
    thumbnail: { src: "/images/projects/seo-gpb/seo-gpb-feature-1.webp", alt: "SEO 100+ Score Dashboard", width: 1920, height: 1080 },
    hero: { src: "/images/projects/seo-gpb/seo-gpb-feature-8.webp", alt: "Google Business Profile Optimization", width: 1920, height: 1080 },
    screenshots: [
      { src: "/images/projects/seo-gpb/seo-gpb-feature-1.webp", alt: "SEO 100+ Score Dashboard", width: 1920, height: 1080 },
      { src: "/images/projects/seo-gpb/seo-gpb-feature-2.webp", alt: "Google Business Profile Search Results", width: 1920, height: 1080 },
      { src: "/images/projects/seo-gpb/seo-gpb-feature-3.webp", alt: "Local SEO Ranking Analysis", width: 1920, height: 1080 },
      { src: "/images/projects/seo-gpb/seo-gpb-feature-4.webp", alt: "Google Search Console Insights", width: 1920, height: 1080 },
      { src: "/images/projects/seo-gpb/seo-gpb-feature-5.webp", alt: "Technical SEO Performance", width: 1920, height: 1080 },
      { src: "/images/projects/seo-gpb/seo-gpb-feature-6.webp", alt: "On-Page SEO Optimization", width: 1920, height: 1080 },
      { src: "/images/projects/seo-gpb/seo-gpb-feature-7.webp", alt: "Review Management Strategy", width: 1920, height: 1080 },
      { src: "/images/projects/seo-gpb/seo-gpb-feature-8.webp", alt: "Google Maps Local Dominance", width: 1920, height: 1080 }
    ],
    ogImage: { src: "/images/projects/seo-gpb/seo-gpb-feature-1.webp", alt: "SEO 100+ Score Dashboard", width: 1920, height: 1080 },
    features: [
      { title: "100+ SEO Score", description: "Achieved perfect technical SEO scores across all major auditing platforms." },
      { title: "Local Search Dominance", description: "Secured top positions in the Google Maps Local Pack for target keywords." },
      { title: "Advanced Schema Markup", description: "Implemented structured data to clearly communicate business entities to search engines." }
    ],
    featured: true,
    order: 6,
    status: "live"
  },
  {
    slug: "voice-khata-book",
    name: "Voice Khata Book",
    tagline: "Voice-enabled accounting application.",
    category: "software",
    overview: "An innovative accounting application that utilizes voice input to log and process financial records.",
    role: "Software Engineer",
    technologies: ["Python", "FastAPI", "SQLite", "SQLAlchemy", "Web Speech API", "Gemini AI"],
    pipeline: [
      { title: "VOICE INPUT" },
      { title: "PROCESSING" },
      { title: "FINANCIAL RECORD" },
      { title: "ACCOUNTING DATA" }
    ],
    infrastructure: [
      { category: "BACKEND", name: "FastAPI" },
      { category: "DATABASE", name: "SQLite (accounts.db)" },
      { category: "AI ENGINE", name: "Gemini 1.5 Flash" },
      { category: "FRONTEND", name: "Vanilla HTML/JS/CSS + Web Speech API" },
      { category: "DEPLOYMENT", name: "Local Execution (uvicorn)" }
    ],
    thumbnail: { src: "/images/projects/voice-khata-book/voice-khata-book-overview.webp", alt: "Voice Khata Book overview", width: 1920, height: 1080 },
    hero: { src: "/images/projects/voice-khata-book/voice-khata-book-overview.webp", alt: "Voice Khata Book accounting interface", width: 1920, height: 1080 },
    screenshots: [
      { src: "/images/projects/voice-khata-book/voice-khata-book-overview.webp", alt: "Voice Khata Book overview", width: 1920, height: 1080 },
      { src: "/images/projects/voice-khata-book/voice-khata-book-feature-1.webp", alt: "Voice Khata Book account management", width: 1920, height: 1080 },
      { src: "/images/projects/voice-khata-book/voice-khata-book-feature-2.webp", alt: "Voice Khata Book item management", width: 1920, height: 1080 },
      { src: "/images/projects/voice-khata-book/voice-khata-book-feature-3.webp", alt: "Voice Khata Book bill creation", width: 1920, height: 1080 },
      { src: "/images/projects/voice-khata-book/voice-khata-book-feature-4.webp", alt: "Voice Khata Book Gemini AI extraction", width: 1920, height: 1080 },
      { src: "/images/projects/voice-khata-book/voice-khata-book-feature-5.webp", alt: "Voice Khata Book REST API", width: 1920, height: 1080 }
    ],
    ogImage: { src: "/images/projects/voice-khata-book/voice-khata-book-overview.webp", alt: "Voice Khata Book", width: 1920, height: 1080 },
    features: [
      { title: "Voice-to-Bill Creation", description: "Hands-free bill creation using Web Speech API and Gemini AI data extraction." },
      { title: "Core Accounting", description: "Comprehensive Account and Item CRUD operations." },
      { title: "REST API Architecture", description: "Internal API serving /accounts, /items, and /bills endpoints." }
    ],
    featured: true,
    order: 7,
    status: "in-development"
  },
  {
    slug: "ai-stock-market-analysis",
    name: "AI Stock Market Analysis",
    tagline: "AI-powered market analysis and data visualization platform.",
    category: "ai",
    overview: "A data-intensive platform that analyzes market data to generate visualizations and intelligence using AI.",
    role: "Data & AI Engineer",
    technologies: ["Python", "AI", "Data Visualization", "Pandas"],
    pipeline: [
      { title: "MARKET DATA" },
      { title: "ANALYSIS" },
      { title: "INDICATORS" },
      { title: "VISUALIZATION" },
      { title: "INTELLIGENCE" }
    ],
    thumbnail: { src: "/images/projects/ai-stock-market-analysis/ai-stock-overview.webp", alt: "AI Stock Market Analysis platform overview", width: 1920, height: 1080 },
    hero: { src: "/images/projects/ai-stock-market-analysis/ai-stock-overview.webp", alt: "AI Stock Market Analysis data visualization", width: 1920, height: 1080 },
    screenshots: [
      { src: "/images/projects/ai-stock-market-analysis/ai-stock-overview.webp", alt: "AI Stock Market Analysis platform overview", width: 1920, height: 1080 },
      { src: "/images/projects/ai-stock-market-analysis/ai-stock-feature-1.webp", alt: "AI Stock Market predictive analytics dashboard", width: 1920, height: 1080 },
      { src: "/images/projects/ai-stock-market-analysis/ai-stock-feature-2.webp", alt: "AI Stock Market real-time financial indicators", width: 1920, height: 1080 },
      { src: "/images/projects/ai-stock-market-analysis/ai-stock-feature-3.webp", alt: "AI Stock Market automated trading signals", width: 1920, height: 1080 },
      { src: "/images/projects/ai-stock-market-analysis/ai-stock-feature-4.webp", alt: "AI Stock Market machine learning models", width: 1920, height: 1080 },
      { src: "/images/projects/ai-stock-market-analysis/ai-stock-feature-5.webp", alt: "AI Stock Market robust risk management", width: 1920, height: 1080 }
    ],
    ogImage: { src: "/images/projects/ai-stock-market-analysis/ai-stock-overview.webp", alt: "AI Stock Market Analysis intelligence platform", width: 1920, height: 1080 },
    features: [
      { title: "Data Visualization", description: "Turns raw market data into understandable visual intelligence." },
      { title: "Indicator Calculation", description: "Automated calculation of standard market indicators." }
    ],
    featured: true,
    order: 8,
    status: "live"
  },
  {
    slug: "alphatrack",
    name: "AlphaTrack",
    tagline: "A Full-Stack Task Management Application",
    category: "web-app",
    overview: "AlphaTrack is a modern, responsive, and robust task management application designed to help users organize their work and personal lives efficiently. It features a sleek user interface, real-time analytics, drag-and-drop task organization, and secure authentication.",
    role: "Full-Stack Engineer",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Zustand", "FastAPI", "Python", "SQLAlchemy", "SQLite"],
    pipeline: [
      { title: "AUTHENTICATION" },
      { title: "DASHBOARD" },
      { title: "TASK MANAGEMENT" },
      { title: "DRAG & DROP" },
      { title: "ANALYTICS" }
    ],
    infrastructure: [
      { category: "FRONTEND", name: "React, Vite, Tailwind CSS" },
      { category: "BACKEND", name: "FastAPI, Python" },
      { category: "DATABASE", name: "SQLite / MySQL" },
      { category: "AUTHENTICATION", name: "JWT (JSON Web Tokens)" },
      { category: "DEPLOYMENT", name: "Local Execution (Uvicorn / Vite)" }
    ],
    thumbnail: { src: "/images/projects/alphatrack/alphatrack-overview.webp", alt: "AlphaTrack overview", width: 1920, height: 1080 },
    hero: { src: "/images/projects/alphatrack/alphatrack-overview.webp", alt: "AlphaTrack task management interface", width: 1920, height: 1080 },
    screenshots: [
      { src: "/images/projects/alphatrack/alphatrack-overview.webp", alt: "AlphaTrack overview", width: 1920, height: 1080 },
      { src: "/images/projects/alphatrack/alphatrack-feature-1.webp", alt: "AlphaTrack feature 1", width: 1920, height: 1080 },
      { src: "/images/projects/alphatrack/alphatrack-feature-2.webp", alt: "AlphaTrack feature 2", width: 1920, height: 1080 },
      { src: "/images/projects/alphatrack/alphatrack-feature-3.webp", alt: "AlphaTrack feature 3", width: 1920, height: 1080 },
      { src: "/images/projects/alphatrack/alphatrack-feature-4.webp", alt: "AlphaTrack feature 4", width: 1920, height: 1080 },
      { src: "/images/projects/alphatrack/alphatrack-feature-5.webp", alt: "AlphaTrack feature 5", width: 1920, height: 1080 },
      { src: "/images/projects/alphatrack/alphatrack-feature-6.webp", alt: "AlphaTrack feature 6", width: 1920, height: 1080 },
      { src: "/images/projects/alphatrack/alphatrack-feature-7.webp", alt: "AlphaTrack feature 7", width: 1920, height: 1080 },
      { src: "/images/projects/alphatrack/alphatrack-feature-8.webp", alt: "AlphaTrack feature 8", width: 1920, height: 1080 },
      { src: "/images/projects/alphatrack/alphatrack-feature-9.webp", alt: "AlphaTrack feature 9", width: 1920, height: 1080 },
      { src: "/images/projects/alphatrack/alphatrack-feature-10.webp", alt: "AlphaTrack feature 10", width: 1920, height: 1080 },
      { src: "/images/projects/alphatrack/alphatrack-feature-11.webp", alt: "AlphaTrack feature 11", width: 1920, height: 1080 },
      { src: "/images/projects/alphatrack/alphatrack-feature-12.webp", alt: "AlphaTrack feature 12", width: 1920, height: 1080 },
      { src: "/images/projects/alphatrack/alphatrack-feature-13.webp", alt: "AlphaTrack feature 13", width: 1920, height: 1080 },
      { src: "/images/projects/alphatrack/alphatrack-feature-14.webp", alt: "AlphaTrack feature 14", width: 1920, height: 1080 }
    ],
    ogImage: { src: "/images/projects/alphatrack/alphatrack-overview.webp", alt: "AlphaTrack Task Manager", width: 1920, height: 1080 },
    features: [
      { title: "User Authentication", description: "Secure registration and login flows with JWT-based authorization." },
      { title: "Dashboard Analytics", description: "Visual representation of task progress and statistics using interactive charts." },
      { title: "Task Organization", description: "Create, read, update, and delete (CRUD) tasks. Categorize tasks into custom lists. Drag-and-drop interface." },
      { title: "Smart Views", description: "Filter tasks efficiently based on their status or categories." }
    ],
    featured: true,
    order: 9,
    status: "in-development"
  }
];

