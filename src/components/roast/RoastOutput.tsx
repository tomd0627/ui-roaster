"use client";

import { useEffect, useRef } from "react";
import type { RoastResult } from "@/types";
import { HeatMeter } from "./HeatMeter";
import { RoastCategory } from "./RoastCategory";
import { ShareBar } from "./ShareBar";

interface RoastOutputProps {
  roast: RoastResult;
  onReset: () => void;
  isDemo?: boolean;
}

export function RoastOutput({ roast, onReset, isDemo }: RoastOutputProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Move focus to results when they appear
  useEffect(() => {
    containerRef.current?.focus();
  }, []);

  return (
    <div
      ref={containerRef}
      tabIndex={-1}
      aria-label="Roast results"
      className="animate-fade-in space-y-4 outline-none"
    >
      {/* Sample indicator + top-level CTA */}
      {isDemo && (
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="rounded-full px-3 py-1 text-xs font-semibold shrink-0"
              style={{
                color: "var(--color-digital)",
                border: "1px solid var(--color-digital)",
                backgroundColor: "var(--color-digital-muted)",
              }}
            >
              Sample Roast
            </span>
            <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>
              This is a demo — scroll down to see the full critique
            </span>
          </div>
          <button
            type="button"
            onClick={onReset}
            className="flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-all cursor-pointer"
            style={{
              border: "1px solid var(--color-heat)",
              color: "var(--color-heat)",
              backgroundColor: "var(--color-heat-muted)",
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={15} height={15} aria-hidden="true">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            Upload your own screenshot
          </button>
        </div>
      )}

      {/* Overall verdict banner */}
      <div
        className="rounded-xl p-5"
        style={{
          backgroundColor: "var(--color-heat-muted)",
          border: "1px solid var(--color-heat)",
        }}
      >
        <p
          className="text-xs font-semibold uppercase tracking-widest mb-1"
          style={{ color: "var(--color-heat)" }}
        >
          The Verdict
        </p>
        <p
          className="text-base font-medium leading-relaxed"
          style={{
            color: "var(--color-text)",
            fontFamily: "var(--font-jetbrains-mono, monospace)",
          }}
        >
          &ldquo;{roast.overallVerdict}&rdquo;
        </p>
      </div>

      {/* Heat meter */}
      <HeatMeter score={roast.overallScore} />

      {/* Category cards */}
      <div className="space-y-3" role="list" aria-label="Category critiques">
        {roast.categories.map((category, index) => (
          <div key={category.id} role="listitem">
            <RoastCategory category={category} index={index} />
          </div>
        ))}
      </div>

      {/* Share / reset */}
      <ShareBar roast={roast} onReset={onReset} />
    </div>
  );
}
