"use client";

import { useEffect, useRef } from "react";
import type { AcceptedMimeType } from "@/types";

type ReceiveCallback = (imageBase64: string, mimeType: AcceptedMimeType) => void;

const ACCEPTED_MIMES = new Set<AcceptedMimeType>(["image/jpeg", "image/png", "image/webp"]);

function toAcceptedMime(raw: unknown): AcceptedMimeType {
  if (typeof raw === "string" && ACCEPTED_MIMES.has(raw as AcceptedMimeType)) {
    return raw as AcceptedMimeType;
  }
  return "image/jpeg";
}

/**
 * Listens for a screenshot sent by the "Roast This Page" bookmarklet via postMessage.
 * Only activates when the URL contains `?from=bookmarklet`.
 */
export function useBookmarkletReceiver(onReceive: ReceiveCallback): void {
  // Keep onReceive stable in the effect via a ref
  const onReceiveRef = useRef<ReceiveCallback>(onReceive);
  onReceiveRef.current = onReceive;

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
      if (
        !e.data ||
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
