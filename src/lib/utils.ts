import { type ClassValue, clsx } from "clsx";

/**
 * Utility for conditionally joining class names.
 * Lightweight alternative to classnames/clsx when Tailwind merge isn't needed.
 *
 * If tailwind-merge is added later, this becomes:
 *   import { twMerge } from "tailwind-merge";
 *   export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}
