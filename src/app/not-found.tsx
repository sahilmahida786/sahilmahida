import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] flex-col items-center justify-center">
      <Container className="text-center">
        <p className="text-label text-accent tracking-widest mb-4">
          404
        </p>
        <h1 className="text-display text-foreground">
          Page not found
        </h1>
        <p className="mt-4 text-body-lg text-muted max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link href="/">
            <Button variant="outline" size="lg">
              <ArrowLeft size={16} />
              Back to SAHIL.OS
            </Button>
          </Link>
          <Link href="/#projects">
            <Button variant="primary" size="lg">
              Explore Projects
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
