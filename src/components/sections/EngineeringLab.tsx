import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

const stages = [
  { step: "01", label: "Idea", description: "Requirements, research, planning" },
  { step: "02", label: "Frontend", description: "UI design, responsive development" },
  { step: "03", label: "Backend", description: "Server logic, API development" },
  { step: "04", label: "Database", description: "Schema design, optimization" },
  { step: "05", label: "Integration", description: "Payments, APIs, services" },
  { step: "06", label: "Deploy", description: "Hosting, domain, CI/CD" },
  { step: "07", label: "SEO", description: "Search optimization, analytics" },
  { step: "08", label: "Launch", description: "Go live, monitor, iterate" },
];

export default function EngineeringLab() {
  return (
    <section
      id="process"
      className="relative py-section bg-gradient-to-b from-surface via-[hsl(225,16%,6.5%)] to-surface"
      aria-labelledby="process-heading"
    >
      <RevealOnScroll>
        <Container>
          <SectionHeader
            eyebrow="03 / Process"
            title="Engineering Lab"
            description="From idea to launch — every stage of a digital product, handled end-to-end."
          />

          {/* Pipeline visualization */}
          <div className="relative max-w-2xl mx-auto pl-4 sm:pl-0">
            {/* Continuous background line */}
            <div
              className="absolute left-[2.15rem] sm:left-[1.15rem] top-4 bottom-8 w-px bg-border hidden sm:block"
              aria-hidden="true"
            />
            
            {/* Mobile continuous background line */}
            <div
              className="absolute left-[1.15rem] top-4 bottom-8 w-px bg-border sm:hidden"
              aria-hidden="true"
            />

            <div className="grid gap-0">
              {stages.map((stage) => (
                <div key={stage.step} className="group relative flex items-start gap-6 sm:gap-8 py-6">
                  
                  {/* Connecting Active Line */}
                  <div className="absolute left-[1.15rem] top-6 bottom-0 w-px bg-accent scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-500 ease-out hidden sm:block z-0" />
                  <div className="absolute left-[1.15rem] top-6 bottom-0 w-px bg-accent scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-500 ease-out sm:hidden z-0" />

                  {/* Step indicator */}
                  <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-label text-muted group-hover:border-accent group-hover:bg-accent/10 group-hover:text-accent group-hover:shadow-[0_0_15px_rgba(59,130,246,0.12)] transition-all duration-300">
                    {stage.step}
                  </div>

                  {/* Content */}
                  <div className="pt-1.5 pb-2">
                    <h3 className="text-h3 text-foreground transition-colors duration-300 group-hover:text-accent">
                      {stage.label}
                    </h3>
                    <p className="mt-2 text-body-sm text-muted max-w-md">
                      {stage.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </RevealOnScroll>
    </section>
  );
}

