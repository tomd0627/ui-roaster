import {
  RATE_LIMIT_REQUESTS_PER_WINDOW,
  RATE_LIMIT_WINDOW_MS,
} from "@/lib/constants";

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

// In-memory store — resets on server restart (acceptable for serverless)
const store = new Map<string, RateLimitEntry>();

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
}

export function checkRateLimit(ip: string): RateLimitResult {
  const now = Date.now();
  const entry = store.get(ip);

  if (!entry || now >= entry.resetAt) {
    store.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true, remaining: RATE_LIMIT_REQUESTS_PER_WINDOW - 1 };
  }

  if (entry.count >= RATE_LIMIT_REQUESTS_PER_WINDOW) {
    return { allowed: false, remaining: 0 };
  }

  entry.count++;
  return {
    allowed: true,
    remaining: RATE_LIMIT_REQUESTS_PER_WINDOW - entry.count,
  };
}
