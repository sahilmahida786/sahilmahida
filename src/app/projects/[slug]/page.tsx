import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects } from "@/data/projects";
import { createMetadata } from "@/lib/seo";

// Components
import ProjectHero from "@/components/case-study/ProjectHero";
import ProjectOverview from "@/components/case-study/ProjectOverview";
import SystemArchitecture from "@/components/case-study/SystemArchitecture";
import PipelineFlow from "@/components/case-study/PipelineFlow";
import LiveOutput from "@/components/case-study/LiveOutput";
import Infrastructure from "@/components/case-study/Infrastructure";
import ProjectGallery from "@/components/case-study/ProjectGallery";
import ProjectNavigation from "@/components/case-study/ProjectNavigation";
import CaseStudyCTA from "@/components/case-study/CaseStudyCTA";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Generate static params for all known projects at build time (SSG).
 */
export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

/**
 * Generate per-project metadata for SEO.
 */
export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return createMetadata({ title: "Project Not Found" });
  }

  return createMetadata({
    title: `${project.name} | ${project.tagline} | Sahil Mahida`,
    description: project.tagline,
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
    openGraph: {
      title: `${project.name} | ${project.tagline} | Sahil Mahida`,
      description: project.tagline,
      images: project.ogImage && project.ogImage.src !== '/images/placeholder.jpg' ? [
        {
          url: project.ogImage.src,
          width: project.ogImage.width,
          height: project.ogImage.height,
          alt: project.ogImage.alt,
          type: "image/webp",
        }
      ] : undefined
    },
    twitter: {
      title: `${project.name} | ${project.tagline} | Sahil Mahida`,
      description: project.tagline,
      images: project.ogImage && project.ogImage.src !== '/images/placeholder.jpg' ? [project.ogImage.src] : undefined,
    }
  });
}

/**
 * Dynamic project case study page.
 */
export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const projectIndex = projects.findIndex((p) => p.slug === slug);
  const project = projects[projectIndex];

  if (!project) {
    notFound();
  }

  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : undefined;
  const nextProject = projectIndex < projects.length - 1 ? projects[projectIndex + 1] : undefined;

  const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://sahilmahida.in";
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.name,
    description: project.tagline,
    applicationCategory: "WebApplication",
    author: {
      "@type": "Person",
      name: "Sahil Mahida",
    },
    url: `${BASE_URL}/projects/${project.slug}`,
    ...(project.liveUrl && { sameAs: project.liveUrl }),
    ...(project.ogImage && { image: project.ogImage.src })
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="min-h-screen">
        <ProjectHero project={project} />
        <ProjectOverview project={project} />
        {project.slug === "telegram-ai-intelligence-engine" && (
          <>
            <SystemArchitecture project={project} />
            <PipelineFlow project={project} />
          </>
        )}
        <LiveOutput project={project} />
        {project.slug === "telegram-ai-intelligence-engine" && (
          <Infrastructure project={project} />
        )}
        <ProjectGallery project={project} />
        <ProjectNavigation prevProject={prevProject} nextProject={nextProject} />
        <CaseStudyCTA />
      </article>
    </>
  );
}
