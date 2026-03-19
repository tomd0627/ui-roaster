"use client";

import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/Skeleton";
import { LOADING_MESSAGES, LOADING_MESSAGE_INTERVAL_MS } from "@/lib/constants";

export function LoadingRoast() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, LOADING_MESSAGE_INTERVAL_MS);

    return () => clearInterval(interval);
  }, []);

  const currentMessage = LOADING_MESSAGES[messageIndex] ?? LOADING_MESSAGES[0];

  return (
    <div className="animate-fade-in space-y-6">
      {/* Animated status message */}
      <div
        role="status"
        aria-live="polite"
        aria-label="Analyzing your UI"
        className="flex flex-col items-center gap-2 py-4 text-center"
      >
        {/* Flame animation */}
        <div className="relative flex h-12 w-12 items-center justify-center" aria-hidden="true">
          <div
            className="absolute inset-0 animate-ping rounded-full opacity-20"
            style={{ backgroundColor: "var(--color-heat)" }}
          />
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none" width={32} height={32}>
            <path d="M16 2C16 2 23 9 23 17C23 22.5 19.5 26.5 16 29C12.5 26.5 9 22.5 9 17C9 9 16 2 16 2Z" fill="var(--color-heat)" />
            <path d="M16 11C16 11 19.5 15 19.5 19C19.5 21.5 17.8 23.5 16 24.5C14.2 23.5 12.5 21.5 12.5 19C12.5 15 16 11 16 11Z" fill="var(--color-digital)" />
          </svg>
        </div>

        <p
          className="text-sm font-medium transition-all duration-500"
          style={{ color: "var(--color-digital)", fontFamily: "var(--font-jetbrains-mono, monospace)" }}
        >
          {currentMessage}
        </p>
      </div>

      {/* Skeleton cards */}
      <div className="space-y-3" aria-hidden="true">
        {/* Heat meter skeleton */}
        <div className="rounded-xl p-4" style={{ backgroundColor: "var(--color-surface)" }}>
          <Skeleton className="mb-2 h-4 w-32" />
          <Skeleton className="h-8 w-full" />
        </div>

        {/* Category skeletons */}
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl p-5"
            style={{ backgroundColor: "var(--color-surface)" }}
          >
            <div className="mb-3 flex items-center gap-3">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-5 w-36" />
            </div>
            <Skeleton className="mb-2 h-4 w-full" />
            <Skeleton className="mb-2 h-4 w-5/6" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ))}
      </div>
    </div>
  );
}
