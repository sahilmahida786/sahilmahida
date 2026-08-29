import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "article" | "main";
}

/**
 * Responsive content container.
 * Max-width with fluid horizontal padding.
 * Works correctly from 320px → 1920px+.
 */
export default function Container({
  children,
  className,
  as: Element = "div",
}: ContainerProps) {
  return (
    <Element
      className={cn(
        "mx-auto w-full max-w-[var(--container-max)] px-[var(--spacing-container)]",
        className
      )}
    >
      {children}
    </Element>
  );
}
