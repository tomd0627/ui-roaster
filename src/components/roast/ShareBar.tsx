"use client";

import { useState } from "react";
import type { RoastResult } from "@/types";
import { formatRoastAsText } from "@/lib/utils";

interface ShareBarProps {
  roast: RoastResult;
  onReset: () => void;
}

export function ShareBar({ roast, onReset }: ShareBarProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const text = formatRoastAsText(roast);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback: create temporary textarea
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <button
        onClick={handleCopy}
        aria-label={copied ? "Roast copied to clipboard" : "Copy roast to clipboard"}
        aria-live="polite"
        className="flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-all"
        style={{
          border: "1px solid var(--color-digital)",
          color: copied ? "var(--color-bg)" : "var(--color-digital)",
          backgroundColor: copied
            ? "var(--color-digital)"
            : "var(--color-digital-muted)",
        }}
      >
        {copied ? (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" width={15} height={15} aria-hidden="true">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Copied!
          </>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={15} height={15} aria-hidden="true">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
            </svg>
            Copy Roast
          </>
        )}
      </button>

      <button
        onClick={onReset}
        aria-label="Start over with a new screenshot"
        className="flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-all"
        style={{
          border: "1px solid var(--color-border)",
          color: "var(--color-text-secondary)",
          backgroundColor: "var(--color-surface)",
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={15} height={15} aria-hidden="true">
          <polyline points="1 4 1 10 7 10" />
          <path d="M3.51 15a9 9 0 1 0 .49-3.73" />
        </svg>
        Try Another
      </button>
    </div>
  );
}
