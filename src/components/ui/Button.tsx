import {
  type ButtonHTMLAttributes,
  type ReactNode,
  forwardRef,
} from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline" | "icon";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  children: ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: [
    "bg-accent text-background font-bold",
    "hover:bg-accent-hover hover:shadow-[0_0_20px_rgba(59,130,246,0.18),0_2px_8px_rgba(59,130,246,0.1)]",
    "active:brightness-90",
  ].join(" "),
  secondary: [
    "bg-surface-elevated text-foreground border border-border",
    "hover:border-border-strong hover:bg-surface-elevated/80",
    "active:brightness-90",
  ].join(" "),
  ghost: [
    "bg-transparent text-muted",
    "hover:text-foreground hover:bg-surface",
    "active:bg-surface-elevated",
  ].join(" "),
  outline: [
    "bg-transparent text-foreground border border-border",
    "hover:border-accent hover:text-accent hover:bg-accent/5",
    "active:bg-accent-muted",
  ].join(" "),
  icon: [
    "bg-transparent text-muted p-0",
    "hover:text-foreground",
    "active:text-accent",
  ].join(" "),
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-body-sm gap-1.5 rounded-[var(--radius-sm)]",
  md: "h-10 px-5 text-body-sm gap-2 rounded-[var(--radius-md)]",
  lg: "h-12 px-7 text-body gap-2.5 rounded-[var(--radius-md)]",
};

const iconSizeStyles: Record<ButtonSize, string> = {
  sm: "h-8 w-8 rounded-[var(--radius-sm)]",
  md: "h-10 w-10 rounded-[var(--radius-md)]",
  lg: "h-12 w-12 rounded-[var(--radius-md)]",
};

/**
 * Button component with variants, sizes, loading state.
 * Accessible: proper disabled state, keyboard focus, min touch target.
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      disabled,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;
    const isIcon = variant === "icon";

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={cn(
          // Base
          "inline-flex items-center justify-center font-medium",
          "transition-all duration-[var(--duration-fast)] ease-[var(--ease-out)]",
          "select-none whitespace-nowrap",
          // Min touch target
          "min-h-[44px] min-w-[44px]",
          // Variant
          variantStyles[variant],
          // Size
          isIcon ? iconSizeStyles[size] : sizeStyles[size],
          // Disabled
          isDisabled && "pointer-events-none opacity-40",
          className
        )}
        {...props}
      >
        {loading && (
          <Loader2
            className="animate-spin"
            size={size === "sm" ? 14 : size === "md" ? 16 : 18}
          />
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
