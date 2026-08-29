import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "accent" | "outline" | "success" | "muted";

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default:
    "bg-surface-elevated text-muted border border-border",
  accent:
    "bg-accent-muted text-accent border border-accent/20",
  outline:
    "bg-transparent text-muted border border-border",
  success:
    "bg-success/10 text-success border border-success/20",
  muted:
    "bg-surface text-subtle border border-transparent",
};

/**
 * Badge / tag component for technologies, categories, statuses.
 * Compact, readable on all screen sizes.
 */
export default function Badge({
  children,
  variant = "default",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[var(--radius-sm)]",
        "px-2.5 py-1 text-label",
        "whitespace-nowrap select-none",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
