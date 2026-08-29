import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Accessible label (required for icon-only buttons) */
  label: string;
  /** Size variant */
  size?: "sm" | "md" | "lg";
}

const sizeStyles = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-12 w-12",
};

/**
 * Accessible icon-only button with required label.
 * Renders aria-label for screen readers.
 * Min 44px touch target enforced.
 */
const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ label, size = "md", className, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        aria-label={label}
        disabled={disabled}
        className={cn(
          "inline-flex items-center justify-center rounded-[var(--radius-md)]",
          "text-muted transition-colors duration-[var(--duration-fast)] ease-[var(--ease-out)]",
          "hover:text-foreground hover:bg-surface",
          "active:bg-surface-elevated",
          "min-h-[44px] min-w-[44px]",
          sizeStyles[size],
          disabled && "pointer-events-none opacity-40",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

IconButton.displayName = "IconButton";
export default IconButton;
