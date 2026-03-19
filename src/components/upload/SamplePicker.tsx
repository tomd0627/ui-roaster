"use client";

import { useState } from "react";
import { SAMPLE_IMAGES } from "@/lib/constants";
import { pickRandomExcluding } from "@/lib/utils";

interface SamplePickerProps {
  onSelectSample: (src: string, label: string) => void;
  isDisabled?: boolean;
}

export function SamplePicker({ onSelectSample, isDisabled = false }: SamplePickerProps) {
  const [lastSrc, setLastSrc] = useState<string | null>(null);

  const handleClick = () => {
    const srcs = SAMPLE_IMAGES.map((s) => s.src);
    const picked =
      lastSrc !== null
        ? pickRandomExcluding(srcs as string[], lastSrc)
        : (srcs[Math.floor(Math.random() * srcs.length)] ?? srcs[0] ?? "");

    const sample = SAMPLE_IMAGES.find((s) => s.src === picked);
    if (!sample) return;

    setLastSrc(sample.src);
    onSelectSample(sample.src, sample.label);
  };

  return (
    <div className="flex items-center gap-3">
      <div className="h-px flex-1" style={{ backgroundColor: "var(--color-border)" }} aria-hidden="true" />
      <button
        onClick={handleClick}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50"
        style={{
          color: "var(--color-digital)",
          border: "1px solid var(--color-digital-hover)",
          backgroundColor: "var(--color-digital-muted)",
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={12} height={12} aria-hidden="true">
          <polyline points="16 3 21 3 21 8" />
          <line x1="4" y1="20" x2="21" y2="3" />
          <polyline points="21 16 21 21 16 21" />
          <line x1="15" y1="15" x2="21" y2="21" />
        </svg>
        Try a sample
      </button>
      <div className="h-px flex-1" style={{ backgroundColor: "var(--color-border)" }} aria-hidden="true" />
    </div>
  );
}
