import { cn } from "@/lib/utils";

interface DividerProps {
  className?: string;
  /** Decorative gradient line vs subtle border */
  variant?: "default" | "gradient" | "glow" | "subtle";
}

/**
 * Visual section divider. Creates separation between content blocks.
 */
export default function Divider({
  className,
  variant = "default",
}: DividerProps) {
  if (variant === "gradient") {
    return (
      <div
        role="separator"
        className={cn("h-px w-full", className)}
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--color-border-strong) 20%, var(--color-accent) 50%, var(--color-border-strong) 80%, transparent)",
        }}
      />
    );
  }

  if (variant === "glow") {
    return (
      <div
        role="separator"
        className={cn("h-px w-full", className)}
        style={{
          background:
            "linear-gradient(90deg, transparent 5%, hsla(210, 100%, 60%, 0.35) 50%, transparent 95%)",
          boxShadow: "0 0 10px hsla(210, 100%, 60%, 0.08), 0 0 24px hsla(210, 100%, 60%, 0.04), 0 1px 0 hsla(210, 80%, 50%, 0.03)",
        }}
      />
    );
  }

  return (
    <hr
      className={cn(
        "border-0 h-px w-full",
        variant === "subtle"
          ? "bg-border/50"
          : "bg-border",
        className
      )}
    />
  );
}
