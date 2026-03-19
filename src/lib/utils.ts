import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { RoastResult } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function formatRoastAsText(roast: RoastResult): string {
  const lines: string[] = [
    `UI ROASTER — VERDICT`,
    `${"─".repeat(40)}`,
    `Heat Level: ${roast.overallScore}/10`,
    `Verdict: ${roast.overallVerdict}`,
    ``,
  ];

  for (const cat of roast.categories) {
    const severityLabel =
      cat.severity === 3 ? "🔴 Savage" : cat.severity === 2 ? "🟡 Notable" : "🟢 Mild";
    lines.push(`${cat.title} · ${severityLabel}`);
    lines.push(cat.critique);
    lines.push(`Fix: ${cat.suggestion}`);
    lines.push(``);
  }

  lines.push(`Roasted by UI Roaster · Powered by Claude Sonnet`);
  return lines.join("\n");
}

export function pickRandomExcluding<T>(arr: readonly T[], exclude: T): T {
  const filtered = arr.filter((item) => item !== exclude);
  const pool = filtered.length > 0 ? filtered : arr;
  const index = Math.floor(Math.random() * pool.length);
  return pool[index] ?? arr[0] as T;
}
