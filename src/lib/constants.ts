import type { AcceptedMimeType, CategoryId, RoastResult } from "@/types";

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

// ── Demo / pre-loaded sample ──────────────────────────────────────────────────

export const DEMO_IMAGE = SAMPLE_IMAGES[0]; // "Legacy government portal"

export const DEMO_RESULT: RoastResult = {
  overallScore: 8,
  overallVerdict: "This UI is what happens when Comic Sans has a crisis of identity and decides to get a government job.",
  categories: [
    {
      id: "visual-design",
      title: "Visual Design",
      score: 8,
      severity: 3,
      critique: "The color palette appears to have been chosen by someone who lost a bet. The primary blue clashes violently with the accent orange in a way that should be classified as a public health emergency.",
      suggestion: "Establish a coherent color system — a single neutral base plus one accessible accent. USWDS design tokens are free and battle-tested for exactly this context.",
    },
    {
      id: "ux",
      title: "User Experience",
      score: 7,
      severity: 3,
      critique: "Navigation is a labyrinthine choose-your-own-adventure where every path leads to a PDF from 2009. The information architecture reads like it was organized by the department that never communicates with any other department.",
      suggestion: "Conduct a card sort with 10 real users to discover what they actually need. Flatten the nav to 5 or fewer top-level items — everything else belongs in search.",
    },
    {
      id: "accessibility",
      title: "Accessibility",
      score: 9,
      severity: 3,
      critique: "Contrast ratios in the body copy would fail WCAG AA if audited — and given the user base likely includes seniors and people with visual impairments, this is not a cosmetic concern. Focus indicators appear to have been surgically removed.",
      suggestion: "Run axe DevTools immediately. Fix contrast to 4.5:1 minimum for body text, restore visible focus indicators, and ensure all form fields have programmatically associated labels.",
    },
    {
      id: "typography",
      title: "Typography",
      score: 6,
      severity: 2,
      critique: "Three different serif fonts are competing for dominance like a typography battle royale. Line height is set to 1.2, which means dense paragraphs are functionally unreadable for anyone who isn't squinting.",
      suggestion: "Pick one typeface family and one size scale. Set body line-height to at least 1.5 and cap line length at 65–75 characters per line.",
    },
    {
      id: "layout",
      title: "Layout & Spacing",
      score: 7,
      severity: 2,
      critique: "The page stretches to fill a 1440px viewport with no max-width constraint, creating line lengths that could double as a marathon route. Sidebar columns appear to have been eyeballed into existence with no grid in sight.",
      suggestion: "Constrain content to 1200px max-width centered, implement a consistent 8px spacing scale, and align elements to a 12-column grid.",
    },
  ],
};

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
