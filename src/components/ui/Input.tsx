import { type InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
}

/**
 * Text input with label, error, and hint support.
 * Accessible: label connected via htmlFor, error via aria-describedby.
 */
const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, className, id, ...props }, ref) => {
    const inputId = id || label.toLowerCase().replace(/\s+/g, "-");
    const errorId = error ? `${inputId}-error` : undefined;
    const hintId = hint ? `${inputId}-hint` : undefined;
    const describedBy = [errorId, hintId].filter(Boolean).join(" ") || undefined;

    return (
      <div className={cn("flex flex-col gap-1.5", className)}>
        <label
          htmlFor={inputId}
          className="text-body-sm font-medium text-foreground"
        >
          {label}
        </label>

        <input
          ref={ref}
          id={inputId}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          className={cn(
            "h-11 w-full rounded-[var(--radius-md)] px-4",
            "bg-surface border text-foreground",
            "text-body placeholder:text-subtle",
            "transition-colors duration-[var(--duration-fast)]",
            "focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-0",
            error
              ? "border-error focus:ring-error"
              : "border-border hover:border-border-strong focus:border-accent"
          )}
          {...props}
        />

        {hint && !error && (
          <p id={hintId} className="text-caption text-subtle">
            {hint}
          </p>
        )}

        {error && (
          <p id={errorId} className="text-caption text-error" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
