import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  /** Eyebrow/label above the title (e.g. "01 / PROJECTS") */
  eyebrow?: string;
  /** Main heading */
  title: string;
  /** Supporting description */
  description?: string;
  /** Optional action element (button, link) */
  action?: ReactNode;
  /** Text alignment */
  align?: "left" | "center";
  className?: string;
}

/**
 * Consistent section header with eyebrow → title → description hierarchy.
 *
 * Visual hierarchy:
 * ```
 * 01 / PROJECTS        ← eyebrow (label, muted, uppercase)
 * Selected Work        ← title (h2, foreground, bold)
 * Digital products...  ← description (body-lg, muted)
 * ```
 */
export default function SectionHeader({
  eyebrow,
  title,
  description,
  action,
  align = "left",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-[var(--spacing-gap-lg)]",
        align === "center" && "text-center",
        className
      )}
    >
      {eyebrow && (
        <p className="text-label text-accent mb-3 tracking-widest">
          {eyebrow}
        </p>
      )}

      <div className={cn(
        "flex flex-col gap-4",
        action && "sm:flex-row sm:items-end sm:justify-between",
        align === "center" && "sm:flex-col sm:items-center"
      )}>
        <div>
          <h2 className="text-h1 text-foreground">{title}</h2>
          {description && (
            <p className={cn(
              "mt-3 text-body-lg text-muted max-w-2xl",
              align === "center" && "mx-auto"
            )}>
              {description}
            </p>
          )}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
    </div>
  );
}
