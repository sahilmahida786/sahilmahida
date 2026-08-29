import Container from "@/components/ui/Container";
import { projects } from "@/data/projects";

const signals = ["PYTHON", "AI", "AUTOMATION", "APIs", "WEB", "DEPLOYMENT"];

/**
 * Engineering Signal — a compact visual strip after the Hero
 * showing capabilities and verified stats derived from real project data.
 * Pure server component, zero JS overhead.
 */
export default function EngineeringSignal() {
  const totalProjects = projects.length;
  const liveProjects = projects.filter(p => p.status === "live" && p.liveUrl).length;

  return (
    <section className="py-8 md:py-10 bg-gradient-to-b from-[hsl(225,20%,5%)] to-surface/50 border-y border-border/50" aria-label="Engineering capabilities">
      <Container>
        <div className="flex flex-col gap-6 md:gap-8 items-center text-center">
          
          {/* Capability signals */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 md:gap-x-10">
            {signals.map((signal) => (
              <span
                key={signal}
                className="flex items-center gap-2 text-[11px] md:text-xs font-mono tracking-[0.15em] text-muted uppercase"
              >
                <span className="h-1 w-1 rounded-full bg-accent/60" aria-hidden="true" />
                {signal}
              </span>
            ))}
          </div>

          {/* Verified stats */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            <div className="flex items-baseline gap-2">
              <span className="text-h3 text-foreground font-bold">{totalProjects}</span>
              <span className="text-caption text-subtle uppercase tracking-widest">Systems Built</span>
            </div>
            {liveProjects > 0 && (
              <div className="flex items-baseline gap-2">
                <span className="text-h3 text-foreground font-bold">{liveProjects}</span>
                <span className="text-caption text-subtle uppercase tracking-widest">Live Products</span>
              </div>
            )}
            <div className="flex items-baseline gap-2">
              <span className="text-caption text-subtle uppercase tracking-widest">End-to-End Engineering</span>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
