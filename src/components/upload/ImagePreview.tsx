"use client";

import Image from "next/image";
import { formatFileSize } from "@/lib/utils";

interface ImagePreviewProps {
  src: string;
  fileName: string;
  fileSize: number | null;
  onRemove: () => void;
  isLoading?: boolean;
}

export function ImagePreview({
  src,
  fileName,
  fileSize,
  onRemove,
  isLoading = false,
}: ImagePreviewProps) {
  return (
    <div
      className="overflow-hidden rounded-xl border"
      style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-surface)" }}
    >
      {/* Image container */}
      <div className="relative aspect-video w-full overflow-hidden bg-checkerboard">
        <Image
          src={src}
          alt={`Preview of uploaded screenshot: ${fileName}`}
          fill
          sizes="(max-width: 768px) 100vw, 800px"
          className="object-contain"
          unoptimized
        />
        {isLoading && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ backgroundColor: "color-mix(in srgb, var(--color-bg) 70%, transparent)" }}
          >
            <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={28} height={28} aria-label="Processing image">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="var(--color-digital)" strokeWidth="4" />
              <path className="opacity-75" fill="var(--color-digital)" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          </div>
        )}
      </div>

      {/* File info + remove */}
      <div
        className="flex items-center justify-between gap-4 px-4 py-3"
        style={{ borderTop: "1px solid var(--color-border)" }}
      >
        <div className="min-w-0">
          <p className="truncate text-sm font-medium" style={{ color: "var(--color-text)" }}>
            {fileName}
          </p>
          {fileSize !== null && (
            <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
              {formatFileSize(fileSize)}
            </p>
          )}
        </div>
        <button
          onClick={onRemove}
          aria-label="Remove image and start over"
          className="shrink-0 rounded-md p-1.5 transition-colors"
          style={{ color: "var(--color-text-secondary)" }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={16} height={16} aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    </div>
  );
}
