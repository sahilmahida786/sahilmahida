import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import Card from "@/components/ui/Card";
import { services } from "@/data/services";
import { ArrowUpRight } from "lucide-react";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import Link from "next/link";

export default function Services() {
  return (
    <section
      id="services"
      className="section-glow-services relative py-section bg-gradient-to-b from-background via-[hsl(225,18%,5%)] to-background"
      aria-labelledby="services-heading"
    >
      <Container>
        <RevealOnScroll>
          <SectionHeader
            eyebrow="04 / Services"
            title="What I Build"
            description="End-to-end digital solutions — from code to launch, handled by one developer."
          />
        </RevealOnScroll>

        <RevealOnScroll delay={100}>
          <div className="grid gap-[var(--spacing-gap)] sm:grid-cols-2 lg:grid-cols-3">
            {services.map((category) => (
              <Link key={category.slug} href={`/services/${category.slug}`} className="block h-full group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background rounded-[var(--radius-lg)]">
                <Card
                  variant="interactive"
                  as="article"
                  className="flex flex-col h-full hover:border-accent/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.06),0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 bg-surface"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-h3 text-foreground group-hover:text-accent transition-colors duration-300">
                      {category.title}
                    </h3>
                    <ArrowUpRight
                      size={18}
                      className="text-subtle transition-all duration-200 group-hover:text-accent group-hover:translate-x-[3px] group-hover:-translate-y-[3px] shrink-0 mt-1"
                    />
                  </div>
                  <p className="text-body-sm text-muted mb-6 flex-1">
                    {category.description}
                  </p>
                  <ul className="space-y-2 mt-auto">
                    {category.items.slice(0, 3).map((item) => (
                      <li
                        key={item.name}
                        className="text-caption text-subtle flex items-center gap-2 group-hover:text-muted transition-colors duration-300"
                      >
                        <span className="h-1 w-1 rounded-full bg-accent/50 group-hover:bg-accent transition-colors duration-300 shrink-0" />
                        {item.name}
                      </li>
                    ))}
                    {category.items.length > 3 && (
                      <li className="text-caption text-accent pt-1">
                        +{category.items.length - 3} more
                      </li>
                    )}
                  </ul>
                </Card>
              </Link>
            ))}
          </div>
        </RevealOnScroll>
      </Container>
    </section>
  );
}

