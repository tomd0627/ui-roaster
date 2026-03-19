import { type NextRequest, NextResponse } from "next/server";
import { validateEnv } from "@/lib/validate-env";
import { checkRateLimit } from "@/lib/rate-limit";
import { callClaude, ClaudeAPIError, ClaudeParseError } from "@/lib/claude";
import { ACCEPTED_MIME_TYPES, MAX_FILE_SIZE_BYTES } from "@/lib/constants";
import type {
  AcceptedMimeType,
  ApiErrorBody,
  RoastRequestBody,
  RoastResponseBody,
} from "@/types";

function errorResponse(
  code: ApiErrorBody["error"],
  message: string,
  status: number
): NextResponse<ApiErrorBody> {
  return NextResponse.json({ error: code, message }, { status });
}

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown"
  );
}

export async function POST(
  request: NextRequest
): Promise<NextResponse<RoastResponseBody | ApiErrorBody>> {
  // Validate env at request time so it doesn't throw during build
  validateEnv();

  // Rate limiting
  const ip = getClientIp(request);
  const { allowed } = checkRateLimit(ip);
  if (!allowed) {
    return errorResponse(
      "RATE_LIMITED",
      "Too many requests. Please wait a moment and try again.",
      429
    );
  }

  // Parse body
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return errorResponse("INVALID_FILE_TYPE", "Invalid request body.", 400);
  }

  if (
    typeof body !== "object" ||
    body === null ||
    !("imageBase64" in body) ||
    !("mimeType" in body)
  ) {
    return errorResponse("INVALID_FILE_TYPE", "Missing required fields: imageBase64, mimeType.", 400);
  }

  const { imageBase64, mimeType } = body as RoastRequestBody;

  // Validate MIME type
  if (!ACCEPTED_MIME_TYPES.includes(mimeType as AcceptedMimeType)) {
    return errorResponse(
      "INVALID_FILE_TYPE",
      "Only PNG, JPEG, and WebP images are accepted.",
      400
    );
  }

  // Validate payload size (base64 is ~33% larger than binary; we check the string length)
  const base64Data = imageBase64.startsWith("data:")
    ? imageBase64.split(",")[1] ?? ""
    : imageBase64;

  const approximateBytes = Math.ceil((base64Data.length * 3) / 4);
  if (approximateBytes > MAX_FILE_SIZE_BYTES) {
    return errorResponse(
      "PAYLOAD_TOO_LARGE",
      "Image must be under 5 MB.",
      400
    );
  }

  // Call Claude
  try {
    const result = await callClaude(imageBase64, mimeType as AcceptedMimeType);
    return NextResponse.json({ result }, { status: 200 });
  } catch (err) {
    if (err instanceof ClaudeParseError) {
      return errorResponse(
        "PARSE_ERROR",
        "Could not parse AI response. Please try again.",
        500
      );
    }
    if (err instanceof ClaudeAPIError) {
      return errorResponse(
        "AI_API_ERROR",
        "The roasting engine is temporarily down. Please try again.",
        500
      );
    }
    return errorResponse(
      "AI_API_ERROR",
      "An unexpected error occurred. Please try again.",
      500
    );
  }
}
