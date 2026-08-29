import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

type CardVariant = "default" | "elevated" | "interactive" | "minimal";

interface CardProps {
  children: ReactNode;
  variant?: CardVariant;
  className?: string;
  as?: "div" | "article" | "li";
}

const variantStyles: Record<CardVariant, string> = {
  default: [
    "bg-gradient-to-br from-surface to-[hsl(225,16%,6%)] border border-border",
    "rounded-[var(--radius-lg)]",
  ].join(" "),
  elevated: [
    "bg-gradient-to-br from-surface-elevated to-[hsl(225,14%,9%)] border border-border",
    "rounded-[var(--radius-lg)]",
    "shadow-[0_2px_24px_rgba(0,0,0,0.3),0_0_0_1px_rgba(59,130,246,0.02)]",
  ].join(" "),
  interactive: [
    "bg-gradient-to-br from-surface to-[hsl(225,16%,6%)] border border-border",
    "rounded-[var(--radius-lg)]",
    "transition-all duration-[250ms] ease-[var(--ease-out)]",
    "hover:border-accent/30 hover:bg-gradient-to-br hover:from-surface-elevated hover:to-[hsl(225,14%,8%)]",
    "hover:shadow-[0_0_24px_rgba(59,130,246,0.06),0_4px_24px_rgba(0,0,0,0.35)]",
    "hover:-translate-y-0.5",
    "cursor-pointer",
  ].join(" "),
  minimal: [
    "bg-transparent",
    "rounded-[var(--radius-md)]",
  ].join(" "),
};

/**
 * Flexible card component with dark-UI depth.
 * Uses surface colors and subtle borders for visual layering.
 */
export default function Card({
  children,
  variant = "default",
  className,
  as: Element = "div",
}: CardProps) {
  return (
    <Element
      className={cn(
        "p-[var(--spacing-card)]",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </Element>
  );
}
