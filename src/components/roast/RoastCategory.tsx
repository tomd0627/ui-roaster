import type { RoastCategory as RoastCategoryType } from "@/types";

// Category icons as inline SVGs
function CategoryIcon({ id }: { id: string }) {
  const iconProps = {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    width: 18,
    height: 18,
    "aria-hidden": true,
  };

  switch (id) {
    case "visual-design":
      return (
        <svg {...iconProps}>
          <circle cx="13.5" cy="6.5" r="2.5" />
          <circle cx="19" cy="13" r="2.5" />
          <circle cx="7" cy="14" r="2.5" />
          <circle cx="12" cy="20" r="2.5" />
          <line x1="13.5" y1="9" x2="19" y2="10.5" />
          <line x1="13.5" y1="9" x2="7" y2="11.5" />
          <line x1="7" y1="16.5" x2="12" y2="17.5" />
          <line x1="19" y1="15.5" x2="12" y2="17.5" />
        </svg>
      );
    case "ux":
      return (
        <svg {...iconProps}>
          <path d="M12 2a3 3 0 0 1 3 3v7a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3z" />
          <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
          <line x1="12" y1="19" x2="12" y2="23" />
          <line x1="8" y1="23" x2="16" y2="23" />
        </svg>
      );
    case "accessibility":
      return (
        <svg {...iconProps}>
          <circle cx="12" cy="5" r="2" />
          <path d="M12 10v5" />
          <path d="M8 15l-3 5" />
          <path d="M16 15l3 5" />
          <path d="M7 10h10" />
        </svg>
      );
    case "typography":
      return (
        <svg {...iconProps}>
          <polyline points="4 7 4 4 20 4 20 7" />
          <line x1="9" y1="20" x2="15" y2="20" />
          <line x1="12" y1="4" x2="12" y2="20" />
        </svg>
      );
    case "layout":
      return (
        <svg {...iconProps}>
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <line x1="3" y1="9" x2="21" y2="9" />
          <line x1="3" y1="15" x2="21" y2="15" />
          <line x1="9" y1="9" x2="9" y2="21" />
        </svg>
      );
    default:
      return (
        <svg {...iconProps}>
          <circle cx="12" cy="12" r="10" />
        </svg>
      );
  }
}

function SeverityBadge({ severity }: { severity: 1 | 2 | 3 }) {
  const config = {
    1: { label: "Mild", color: "var(--color-severity-low)" },
    2: { label: "Notable", color: "var(--color-severity-mid)" },
    3: { label: "Savage", color: "var(--color-severity-high)" },
  }[severity];

  return (
    <span
      className="rounded-full px-2 py-0.5 text-xs font-semibold"
      style={{
        color: config.color,
        border: `1px solid ${config.color}`,
        backgroundColor: `color-mix(in srgb, ${config.color} 12%, transparent)`,
      }}
    >
      {config.label}
    </span>
  );
}

interface RoastCategoryProps {
  category: RoastCategoryType;
  index: number;
}

export function RoastCategory({ category, index }: RoastCategoryProps) {
  const severityBorderColor = {
    1: "var(--color-severity-low)",
    2: "var(--color-severity-mid)",
    3: "var(--color-severity-high)",
  }[category.severity];

  return (
    <article
      className="animate-fade-in overflow-hidden rounded-xl"
      style={{
        backgroundColor: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderLeft: `3px solid ${severityBorderColor}`,
        animationDelay: `${index * 80}ms`,
      }}
    >
      <div className="p-5">
        {/* Header */}
        <div className="mb-3 flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2.5">
            <div
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
              style={{
                backgroundColor: "var(--color-surface-raised)",
                color: severityBorderColor,
              }}
            >
              <CategoryIcon id={category.id} />
            </div>
            <h3 className="font-semibold" style={{ color: "var(--color-text)" }}>
              {category.title}
            </h3>
          </div>
          <SeverityBadge severity={category.severity} />
        </div>

        {/* Critique */}
        <p
          className="mb-3 text-sm leading-relaxed"
          style={{
            color: "var(--color-text-secondary)",
            fontFamily: "var(--font-jetbrains-mono, monospace)",
          }}
        >
          {category.critique}
        </p>

        {/* Suggestion */}
        <div
          className="rounded-lg p-3"
          style={{ backgroundColor: "var(--color-surface-raised)" }}
        >
          <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "var(--color-digital)" }}>
            Fix it
          </p>
          <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
            {category.suggestion}
          </p>
        </div>
      </div>
    </article>
  );
}
