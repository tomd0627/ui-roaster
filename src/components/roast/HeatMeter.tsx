"use client";

interface HeatMeterProps {
  score: number;
}

export function HeatMeter({ score: rawScore }: HeatMeterProps) {
  // Clamp score between 1 and 10
  const score = Math.min(10, Math.max(1, Math.round(rawScore)));

  const label =
    score <= 3
      ? "Lukewarm"
      : score <= 5
        ? "Getting Toasty"
        : score <= 7
          ? "On Fire"
          : score <= 9
            ? "Blazing"
            : "Scorched Earth";

  return (
    <div
      className="rounded-xl p-5"
      style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)" }}
    >
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest" style={{ color: "var(--color-text-muted)" }}>
            Heat Level
          </p>
          <p
            className="mt-0.5 text-3xl font-bold"
            style={{
              color: "var(--color-heat)",
              fontFamily: "var(--font-jetbrains-mono, monospace)",
            }}
          >
            {score}
            <span className="text-base font-normal" style={{ color: "var(--color-text-muted)" }}>
              /10
            </span>
          </p>
          <p className="text-sm font-medium" style={{ color: "var(--color-text-secondary)" }}>
            {label}
          </p>
        </div>

        {/* Pip meter */}
        <div
          role="img"
          aria-label={`Heat level: ${score} out of 10 — ${label}`}
          className="flex items-center gap-1.5 flex-wrap"
        >
          {Array.from({ length: 10 }).map((_, i) => {
            const filled = i < score;
            return (
              <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                fill="none"
                width={22}
                height={22}
                aria-hidden="true"
                style={{
                  opacity: filled ? 1 : 0.18,
                  animationDelay: filled ? `${i * 60}ms` : "0ms",
                  animation: filled ? "pip-fill 0.3s ease-out both" : "none",
                }}
              >
                <path
                  d="M16 2C16 2 23 9 23 17C23 22.5 19.5 26.5 16 29C12.5 26.5 9 22.5 9 17C9 9 16 2 16 2Z"
                  fill={filled ? "#FF4D6D" : "var(--color-text-muted)"}
                />
              </svg>
            );
          })}
        </div>
      </div>
    </div>
  );
}
