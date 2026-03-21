"use client";

import { Flame } from "lucide-react";

interface RoastButtonProps {
  onClick: () => void;
  isLoading: boolean;
  isDisabled: boolean;
}

export function RoastButton({ onClick, isLoading, isDisabled }: RoastButtonProps) {
  const label = isLoading
    ? "Roasting..."
    : isDisabled
      ? "Drop a screenshot first"
      : "Roast It";

  return (
    <button
      onClick={onClick}
      disabled={isDisabled || isLoading}
      aria-disabled={isDisabled || isLoading}
      aria-busy={isLoading}
      className="flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-xl py-4 text-base font-bold tracking-wide transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50"
      style={{
        backgroundColor: isDisabled || isLoading ? "var(--color-heat)" : "var(--color-heat)",
        color: "#ffffff",
        boxShadow: isDisabled || isLoading ? "none" : "0 0 24px color-mix(in srgb, var(--color-heat) 40%, transparent)",
      }}
    >
      {isLoading ? (
        <>
          <svg
            className="animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            width={18}
            height={18}
            aria-hidden="true"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Roasting...
        </>
      ) : (
        <>
          {label}
          {!isDisabled && <Flame size={18} aria-hidden={true} />}
        </>
      )}
    </button>
  );
}
