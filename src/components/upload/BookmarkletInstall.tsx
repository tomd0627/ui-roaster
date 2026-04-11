"use client";

import { useEffect, useRef } from "react";
import { buildBookmarkletHref } from "@/lib/bookmarklet";

export function BookmarkletInstall() {
  // React sanitizes javascript: URLs passed as the href prop.
  // Setting the attribute directly via a ref bypasses that sanitization.
  // This must remain an <a> element — only anchors can be dragged to the bookmarks bar.
  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (linkRef.current) {
      linkRef.current.setAttribute("href", buildBookmarkletHref(window.location.origin));
    }
  }, []);

  return (
    <div
      className="hidden sm:flex rounded-xl p-4 flex-col gap-3"
      style={{
        border: "1px solid var(--color-border)",
        backgroundColor: "var(--color-surface)",
      }}
    >
      <div className="flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          width={14}
          height={14}
          aria-hidden="true"
          style={{ color: "var(--color-digital)", flexShrink: 0 }}
        >
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
        </svg>
        <p className="text-xs font-semibold" style={{ color: "var(--color-text)" }}>
          Roast any page
        </p>
      </div>

      <p className="text-xs leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
        Drag this button to your bookmarks bar, then click it on any website to capture and roast it:
      </p>

      <a
        ref={linkRef}
        href="#"
        draggable
        onClick={(e) => e.preventDefault()}
        aria-label="Drag to bookmarks bar to install the Roast This Page bookmarklet"
        className="flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold cursor-grab active:cursor-grabbing select-none"
        style={{
          border: "2px dashed var(--color-digital)",
          color: "var(--color-digital)",
          backgroundColor: "var(--color-digital-muted)",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          width={14}
          height={14}
          aria-hidden="true"
        >
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
        </svg>
        Roast This Page
        <span className="text-xs font-normal opacity-60">← drag to bookmarks bar</span>
      </a>

      <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
        Click it on any website to capture and roast that page automatically.
      </p>
    </div>
  );
}
