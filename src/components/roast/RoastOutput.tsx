"use client";

import { useEffect, useRef } from "react";
import type { RoastResult } from "@/types";
import { HeatMeter } from "./HeatMeter";
import { RoastCategory } from "./RoastCategory";
import { ShareBar } from "./ShareBar";

interface RoastOutputProps {
  roast: RoastResult;
  onReset: () => void;
}

export function RoastOutput({ roast, onReset }: RoastOutputProps) {
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
