/**
 * Minimal class-name joiner.
 *
 * Deliberately dependency-free: the class lists in this project are authored
 * by hand and never conditionally conflict, so `clsx` + `tailwind-merge`
 * would be ~8KB of runtime for no benefit.
 */
export type ClassValue =
  | string
  | number
  | null
  | undefined
  | false
  | ClassValue[];

export function cn(...values: ClassValue[]): string {
  const out: string[] = [];

  for (const value of values) {
    if (!value && value !== 0) continue;
    if (Array.isArray(value)) {
      const nested = cn(...value);
      if (nested) out.push(nested);
    } else {
      out.push(String(value));
    }
  }

  return out.join(" ");
}
