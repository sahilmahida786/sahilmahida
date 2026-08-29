import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import { technologies } from "@/data/technologies";
import TechGraphDesktop from "@/components/ui/TechGraphDesktop";
import TechAccordionMobile from "@/components/ui/TechAccordionMobile";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

export default function TechCore() {
  return (
    <section
      id="stack"
      className="section-glow-tech relative py-section bg-background"
      aria-labelledby="stack-heading"
    >
      <Container>
        <RevealOnScroll>
          <SectionHeader
            eyebrow="02 / TECHNOLOGY CORE"
            title="Engineering Ecosystem"
            description="Here is what I build it with. The systems, tools and technologies I use to take an idea from concept to production."
          />
        </RevealOnScroll>

        <RevealOnScroll delay={200}>
          <div className="mt-12 lg:mt-20">
            {/* Desktop Ecosystem Graph */}
            <TechGraphDesktop groups={technologies} />

            {/* Mobile Ecosystem Accordion */}
            <TechAccordionMobile groups={technologies} />
          </div>
        </RevealOnScroll>
      </Container>
    </section>
  );
}
