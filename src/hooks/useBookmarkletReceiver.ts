"use client";

import { useEffect, useRef } from "react";
import type { AcceptedMimeType } from "@/types";

type ReceiveCallback = (imageBase64: string, mimeType: AcceptedMimeType) => void;
type ErrorCallback = (message: string) => void;

const ACCEPTED_MIMES = new Set<AcceptedMimeType>(["image/jpeg", "image/png", "image/webp"]);

function toAcceptedMime(raw: unknown): AcceptedMimeType {
  if (typeof raw === "string" && ACCEPTED_MIMES.has(raw as AcceptedMimeType)) {
    return raw as AcceptedMimeType;
  }
  return "image/jpeg";
}

/**
 * Listens for messages sent by the "Roast This Page" bookmarklet via postMessage.
 * Only activates when the URL contains `?from=bookmarklet`.
 */
export function useBookmarkletReceiver(onReceive: ReceiveCallback, onError?: ErrorCallback): void {
  const onReceiveRef = useRef<ReceiveCallback>(onReceive);
  onReceiveRef.current = onReceive;

  const onErrorRef = useRef<ErrorCallback | undefined>(onError);
  onErrorRef.current = onError;

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (params.get("from") !== "bookmarklet") return;

    // Signal to the bookmarklet's window that the roaster is ready to receive
    if (window.opener) {
      try {
        window.opener.postMessage({ type: "ROASTER_READY" }, "*");
      } catch {
        // opener may be inaccessible in some browsers — safe to ignore
      }
    }

    const handler = (e: MessageEvent) => {
      if (!e.data) return;

      if (e.data.type === "ROAST_ERROR" && typeof e.data.message === "string") {
        onErrorRef.current?.(e.data.message);
        return;
      }

      if (
        e.data.type !== "ROAST_IMAGE" ||
        typeof e.data.imageBase64 !== "string" ||
        e.data.imageBase64.length === 0
      ) {
        return;
      }
      onReceiveRef.current(e.data.imageBase64 as string, toAcceptedMime(e.data.mimeType));
    };

    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []); // Run once on mount — URLSearchParams checked at that point
}
