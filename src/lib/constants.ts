import type { AcceptedMimeType, CategoryId } from "@/types";

// ── File upload ───────────────────────────────────────────────────────────────

export const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB
export const MAX_FILE_SIZE_LABEL = "5 MB";

export const ACCEPTED_MIME_TYPES: AcceptedMimeType[] = [
  "image/png",
  "image/jpeg",
  "image/webp",
];

export const ACCEPTED_MIME_TYPE_LABELS = "PNG, JPG, or WebP";

// ── Compression ───────────────────────────────────────────────────────────────

export const COMPRESS_MAX_DIMENSION = 1200;
export const COMPRESS_QUALITY = 0.85;

// ── Rate limiting ─────────────────────────────────────────────────────────────

export const RATE_LIMIT_REQUESTS_PER_WINDOW = 10;
export const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute

// ── Claude API ────────────────────────────────────────────────────────────────

export const CLAUDE_MODEL = "claude-sonnet-4-6";
export const CLAUDE_MAX_TOKENS = 2048;

// ── Loading messages (cycling during AI analysis) ─────────────────────────────

export const LOADING_MESSAGES = [
  "Analyzing every pixel...",
  "Finding your design sins...",
  "Consulting the typography gods...",
  "Measuring your whitespace crimes...",
  "Calculating contrast ratios — ironic, we know...",
  "Preparing the verdict...",
  "Cross-referencing with the WCAG council...",
  "Identifying the accessibility violations...",
  "Reviewing your font choices...",
  "Judging your color palette...",
] as const;

export const LOADING_MESSAGE_INTERVAL_MS = 2500;

// ── Sample images (curated for the randomizer) ────────────────────────────────

export const SAMPLE_IMAGES = [
  { src: "/samples/sample-01.svg", label: "Legacy government portal" },
  { src: "/samples/sample-02.svg", label: "Startup homepage, circa 2012" },
  { src: "/samples/sample-03.svg", label: "Over-engineered dashboard" },
  { src: "/samples/sample-04.svg", label: "Busy e-commerce product page" },
  { src: "/samples/sample-05.svg", label: "Typography nightmare blog" },
  { src: "/samples/sample-06.svg", label: "Confusing mobile onboarding" },
  { src: "/samples/sample-07.svg", label: "Dark SaaS dashboard" },
  { src: "/samples/sample-08.svg", label: "Minimal portfolio" },
] as const;

// ── Category display metadata ─────────────────────────────────────────────────

export const CATEGORY_METADATA: Record<
  CategoryId,
  { title: string; icon: string }
> = {
  "visual-design": { title: "Visual Design", icon: "palette" },
  ux: { title: "User Experience", icon: "cursor" },
  accessibility: { title: "Accessibility", icon: "eye" },
  typography: { title: "Typography", icon: "text" },
  layout: { title: "Layout & Spacing", icon: "grid" },
};

// ── Error messages ────────────────────────────────────────────────────────────

export const ERROR_MESSAGES = {
  INVALID_FILE_TYPE: `Only ${ACCEPTED_MIME_TYPE_LABELS} images are accepted.`,
  PAYLOAD_TOO_LARGE: `Image must be under ${MAX_FILE_SIZE_LABEL}.`,
  RATE_LIMITED: "Too many requests. Please wait a moment and try again.",
  AI_API_ERROR: "The roasting engine is temporarily down. Please try again.",
  PARSE_ERROR: "Couldn't parse the AI response. Please try again.",
  GENERIC: "Something went wrong. Please try again.",
} as const;
