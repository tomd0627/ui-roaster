// ── Upload ────────────────────────────────────────────────────────────────────

export type AcceptedMimeType = "image/png" | "image/jpeg" | "image/webp";

export interface UploadedImage {
  file: File;
  previewUrl: string;
  base64: string;
  mimeType: AcceptedMimeType;
}

export type UploadStatus = "idle" | "selected" | "compressing" | "error";

// ── Roast ─────────────────────────────────────────────────────────────────────

export type CategoryId =
  | "visual-design"
  | "ux"
  | "accessibility"
  | "typography"
  | "layout";

export type Severity = 1 | 2 | 3;

export type RoastStatus = "idle" | "loading" | "success" | "error";

export interface RoastCategory {
  id: CategoryId;
  title: string;
  score: number;
  severity: Severity;
  critique: string;
  suggestion: string;
}

export interface RoastResult {
  overallScore: number;
  overallVerdict: string;
  categories: RoastCategory[];
}

// ── API ───────────────────────────────────────────────────────────────────────

export interface RoastRequestBody {
  imageBase64: string;
  mimeType: AcceptedMimeType;
}

export interface RoastResponseBody {
  result: RoastResult;
}

export type ApiErrorCode =
  | "INVALID_FILE_TYPE"
  | "PAYLOAD_TOO_LARGE"
  | "RATE_LIMITED"
  | "AI_API_ERROR"
  | "PARSE_ERROR";

export interface ApiErrorBody {
  error: ApiErrorCode;
  message: string;
}
