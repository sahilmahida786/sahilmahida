import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

export default function CaseStudyCTA() {
  return (
    <section className="py-24 lg:py-32 bg-surface-elevated border-t border-border text-center">
      <Container>
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          <h2 className="text-h2 text-foreground mb-4">Ready to start your next project?</h2>
          <p className="text-h2 text-muted mb-10">
            Let&apos;s build it.
          </p>
          <Link href="#contact">
            <Button size="lg" className="w-full sm:w-auto">
              Start a Project
              <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
