"use client";

import { TriangleAlert } from "lucide-react";
import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log to an error reporting service in production
    // For now, silently capture — no console.log per ESLint rules
    void error;
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <TriangleAlert
        aria-hidden="true"
        size={48}
        style={{ color: "var(--color-heat)", marginBottom: "0.5rem" }}
      />
      <h1
        className="mb-4 text-2xl font-bold"
        style={{ color: "var(--color-text)" }}
      >
        Something went wrong
      </h1>
      <p className="mb-8 text-sm" style={{ color: "var(--color-text-secondary)" }}>
        The roasting engine hit a snag. Give it another shot.
      </p>
      <button
        type="button"
        onClick={reset}
        className="rounded-md px-5 py-2.5 text-sm font-semibold transition-colors"
        style={{ backgroundColor: "var(--color-heat)", color: "#fff" }}
      >
        Try again
      </button>
    </div>
  );
}
