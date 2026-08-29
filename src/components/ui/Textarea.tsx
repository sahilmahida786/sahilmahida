import { type TextareaHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  hint?: string;
}

/**
 * Textarea with label, error, and hint support.
 * Same API pattern as Input for consistency.
 */
const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
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

        <textarea
          ref={ref}
          id={inputId}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          rows={4}
          className={cn(
            "w-full rounded-[var(--radius-md)] px-4 py-3",
            "bg-surface border text-foreground",
            "text-body placeholder:text-subtle",
            "transition-colors duration-[var(--duration-fast)]",
            "focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-0",
            "resize-y min-h-[120px]",
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

Textarea.displayName = "Textarea";
export default Textarea;
