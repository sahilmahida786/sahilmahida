/**
 * FAQ data — single source of truth for both the visible accordion
 * and the FAQPage JSON-LD structured data.
 *
 * Keep this in sync with what is visible on the page.
 * Do NOT add hidden items solely for SEO.
 */

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const faqs: FAQItem[] = [
  {
    id: "faq-1",
    question: "How much does a website cost?",
    answer:
      "Website pricing depends on the number of pages, design requirements, functionality, integrations, and overall project scope. Every project is scoped individually based on its specific requirements — reach out with what you want to build and I'll give you a clear picture.",
  },
  {
    id: "faq-2",
    question: "Do you build custom software?",
    answer:
      "Yes. I build custom web applications and business systems tailored around specific workflows, operational requirements, and business needs — not generic templates.",
  },
  {
    id: "faq-3",
    question: "Do you provide deployment and production setup?",
    answer:
      "Yes. Deployment, domain and DNS configuration, hosting setup, and production launch can be included depending on the project requirements. I'll cover what's needed as part of the project scope.",
  },
  {
    id: "faq-4",
    question: "Can you integrate AI into websites and applications?",
    answer:
      "Yes. AI APIs, intelligent features, automation workflows, and custom AI-powered functionality can be integrated into websites and web applications where they genuinely add value to the product.",
  },
  {
    id: "faq-5",
    question: "Can you work on an existing website or application?",
    answer:
      "Yes. Whether it's adding new features, redesigning specific sections, improving performance, or fixing bugs in an existing codebase — I can work with what you already have.",
  },
  {
    id: "faq-6",
    question: "Do you work with businesses outside Rajkot?",
    answer:
      "Yes. I work with clients in Rajkot, across Gujarat, across India, and remotely worldwide. Most project communication is handled online.",
  },
  {
    id: "faq-7",
    question: "Can you integrate third-party APIs and services?",
    answer:
      "Yes. Payment gateways, messaging services, CRM systems, data feeds, maps, authentication providers, and other external APIs and platforms can be integrated as part of a project.",
  },
  {
    id: "faq-8",
    question: "How do I start a project?",
    answer:
      "Use the Start a Project form below and describe what you want to build, your requirements, and any important details. I'll review the request and get back to you, usually within 24 hours.",
  },
];
