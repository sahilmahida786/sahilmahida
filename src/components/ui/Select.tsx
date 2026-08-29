import { type SelectHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "children"> {
  label: string;
  options: SelectOption[];
  placeholder?: string;
  error?: string;
}

/**
 * Select dropdown with label, error, and custom chevron.
 * Same API pattern as Input/Textarea for consistency.
 */
const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, placeholder, error, className, id, ...props }, ref) => {
    const inputId = id || label.toLowerCase().replace(/\s+/g, "-");
    const errorId = error ? `${inputId}-error` : undefined;

    return (
      <div className={cn("flex flex-col gap-1.5", className)}>
        <label
          htmlFor={inputId}
          className="text-body-sm font-medium text-foreground"
        >
          {label}
        </label>

        <div className="relative">
          <select
            ref={ref}
            id={inputId}
            aria-invalid={!!error}
            aria-describedby={errorId}
            className={cn(
              "h-11 w-full appearance-none rounded-[var(--radius-md)] pl-4 pr-10",
              "bg-surface border text-foreground",
              "text-body",
              "transition-colors duration-[var(--duration-fast)]",
              "focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-0",
              error
                ? "border-error focus:ring-error"
                : "border-border hover:border-border-strong focus:border-accent"
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          <ChevronDown
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-subtle"
            size={16}
          />
        </div>

        {error && (
          <p id={errorId} className="text-caption text-error" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";
export default Select;
