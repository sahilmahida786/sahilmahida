import Link from "next/link";
import { ArrowLeft, ArrowRight, LayoutGrid } from "lucide-react";
import Container from "@/components/ui/Container";

interface ProjectNavigationProps {
  prevProject?: { slug: string; name: string };
  nextProject?: { slug: string; name: string };
}

export default function ProjectNavigation({
  prevProject,
  nextProject,
}: ProjectNavigationProps) {
  return (
    <section
      aria-label="Project navigation"
      className="relative border-t border-border overflow-hidden"
    >
      {/* Inline styles for transitions — avoids Tailwind purging group-hover on dynamic classes */}
      <style>{`
        .proj-nav-card {
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding: 24px;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.07);
          background: rgba(255,255,255,0.02);
          text-decoration: none;
          color: inherit;
          transition:
            border-color 200ms ease,
            background 200ms ease,
            transform 200ms ease,
            box-shadow 200ms ease;
          outline-offset: 3px;
          -webkit-tap-highlight-color: transparent;
          cursor: pointer;
          width: 100%;
        }
        .proj-nav-card:hover {
          border-color: rgba(59,130,246,0.4);
          background: rgba(59,130,246,0.04);
          transform: translateY(-3px);
          box-shadow: 0 8px 32px rgba(59,130,246,0.08), 0 0 0 1px rgba(59,130,246,0.1) inset;
        }
        .proj-nav-card:active {
          transform: scale(0.985);
          box-shadow: none;
        }
        .proj-nav-card:focus-visible {
          outline: 2px solid hsl(var(--accent, 217 91% 60%));
          border-color: rgba(59,130,246,0.5);
        }
        @media (prefers-reduced-motion: reduce) {
          .proj-nav-card,
          .proj-nav-card:hover,
          .proj-nav-card:active {
            transition: border-color 200ms ease, background 200ms ease;
            transform: none !important;
            box-shadow: none !important;
          }
        }

        /* Arrow animation */
        .proj-nav-arrow-left {
          transition: transform 200ms ease, color 200ms ease;
        }
        .proj-nav-card:hover .proj-nav-arrow-left {
          transform: translateX(-4px);
          color: rgb(59,130,246);
        }
        .proj-nav-arrow-right {
          transition: transform 200ms ease, color 200ms ease;
        }
        .proj-nav-card:hover .proj-nav-arrow-right {
          transform: translateX(4px);
          color: rgb(59,130,246);
        }
        @media (prefers-reduced-motion: reduce) {
          .proj-nav-arrow-left,
          .proj-nav-arrow-right {
            transition: color 200ms ease;
            transform: none !important;
          }
        }

        /* Project title colour transition */
        .proj-nav-title {
          transition: color 200ms ease;
          color: rgba(255,255,255,0.9);
        }
        .proj-nav-card:hover .proj-nav-title {
          color: #ffffff;
        }

        /* Back to Projects button */
        .proj-back-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          height: 48px;
          padding: 0 28px;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.1);
          background: transparent;
          color: rgba(255,255,255,0.55);
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          text-decoration: none;
          transition:
            border-color 200ms ease,
            background 200ms ease,
            color 200ms ease,
            box-shadow 200ms ease,
            transform 200ms ease;
          -webkit-tap-highlight-color: transparent;
          cursor: pointer;
          white-space: nowrap;
        }
        .proj-back-btn:hover {
          border-color: rgba(59,130,246,0.45);
          background: rgba(59,130,246,0.07);
          color: rgb(147,197,253);
          box-shadow: 0 0 20px rgba(59,130,246,0.06);
        }
        .proj-back-btn:active {
          transform: scale(0.98);
        }
        .proj-back-btn:focus-visible {
          outline: 2px solid rgb(59,130,246);
          outline-offset: 3px;
        }
        .proj-back-arrow {
          transition: transform 200ms ease, color 200ms ease;
          color: rgba(255,255,255,0.35);
        }
        .proj-back-btn:hover .proj-back-arrow {
          transform: translateX(-3px);
          color: rgb(147,197,253);
        }
        @media (prefers-reduced-motion: reduce) {
          .proj-back-btn {
            transition: border-color 200ms ease, background 200ms ease, color 200ms ease;
            transform: none !important;
          }
          .proj-back-arrow {
            transition: color 200ms ease;
            transform: none !important;
          }
        }
      `}</style>

      {/* Top gradient line */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.2), transparent)",
          pointerEvents: "none",
        }}
      />

      <Container className="relative py-12 md:py-16">

        {/* ── Prev / Next grid ─────────────────────────────── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: prevProject && nextProject
              ? "1fr 1fr"
              : "1fr",
            gap: "12px",
          }}
          className="proj-nav-grid"
        >
          {/* PREVIOUS PROJECT */}
          {prevProject ? (
            <Link
              href={`/projects/${prevProject.slug}`}
              className="proj-nav-card"
              aria-label={`Previous project: ${prevProject.name}`}
            >
              {/* Label row */}
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.35)",
                }}
              >
                <ArrowLeft size={13} className="proj-nav-arrow-left" aria-hidden="true" />
                Previous
              </span>

              {/* Project name */}
              <span
                className="proj-nav-title"
                style={{
                  fontSize: "clamp(1rem, 3vw, 1.25rem)",
                  fontWeight: 600,
                  lineHeight: 1.25,
                  letterSpacing: "-0.01em",
                }}
              >
                {prevProject.name}
              </span>

              {/* Hint */}
              <span
                style={{
                  fontSize: "0.7rem",
                  color: "rgba(59,130,246,0.5)",
                  fontWeight: 500,
                  letterSpacing: "0.03em",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                View project
              </span>
            </Link>
          ) : (
            // Placeholder to preserve grid alignment
            <div aria-hidden="true" />
          )}

          {/* NEXT PROJECT */}
          {nextProject ? (
            <Link
              href={`/projects/${nextProject.slug}`}
              className="proj-nav-card"
              aria-label={`Next project: ${nextProject.name}`}
              style={{ textAlign: "right" }}
            >
              {/* Label row */}
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  gap: "8px",
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.35)",
                }}
              >
                Next
                <ArrowRight size={13} className="proj-nav-arrow-right" aria-hidden="true" />
              </span>

              {/* Project name */}
              <span
                className="proj-nav-title"
                style={{
                  fontSize: "clamp(1rem, 3vw, 1.25rem)",
                  fontWeight: 600,
                  lineHeight: 1.25,
                  letterSpacing: "-0.01em",
                }}
              >
                {nextProject.name}
              </span>

              {/* Hint */}
              <span
                style={{
                  fontSize: "0.7rem",
                  color: "rgba(59,130,246,0.5)",
                  fontWeight: 500,
                  letterSpacing: "0.03em",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  gap: "4px",
                }}
              >
                View project
              </span>
            </Link>
          ) : (
            <div aria-hidden="true" />
          )}
        </div>

        {/* ── Mobile: collapse single-card to full-width ──── */}
        <style>{`
          @media (max-width: 480px) {
            .proj-nav-grid {
              grid-template-columns: 1fr !important;
            }
            .proj-nav-card {
              text-align: left !important;
            }
          }
        `}</style>

        {/* ── Back to Projects CTA ─────────────────────────── */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "28px",
          }}
        >
          <Link
            href="/#projects"
            className="proj-back-btn"
            aria-label="Back to all projects"
          >
            <ArrowLeft size={15} className="proj-back-arrow" aria-hidden="true" />
            <LayoutGrid size={13} aria-hidden="true" style={{ opacity: 0.5 }} />
            Back to Projects
          </Link>
        </div>

      </Container>
    </section>
  );
}
