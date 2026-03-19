"use client";

import { useDropzone } from "react-dropzone";
import { MAX_FILE_SIZE_BYTES } from "@/lib/constants";

interface DropZoneProps {
  onFilesAccepted: (files: File[]) => void;
  isDisabled?: boolean;
}

export function DropZone({ onFilesAccepted, isDisabled = false }: DropZoneProps) {
  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop: onFilesAccepted,
    accept: {
      "image/png": [],
      "image/jpeg": [],
      "image/webp": [],
    },
    maxSize: MAX_FILE_SIZE_BYTES,
    maxFiles: 1,
    disabled: isDisabled,
    multiple: false,
  });

  const borderColor = isDragReject
    ? "var(--color-heat)"
    : isDragActive
      ? "var(--color-digital)"
      : "var(--color-border)";

  const backgroundColor = isDragReject
    ? "var(--color-heat-muted)"
    : isDragActive
      ? "var(--color-digital-muted)"
      : "var(--color-surface)";

  return (
    <div
      {...getRootProps()}
      role="button"
      tabIndex={0}
      aria-label="Upload a UI screenshot. Click or drag and drop a PNG, JPG, or WebP image."
      aria-disabled={isDisabled}
      className="flex cursor-pointer flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed p-10 text-center transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2"
      style={{
        borderColor,
        backgroundColor,
        outlineColor: "var(--color-focus)",
      }}
    >
      <label htmlFor="dropzone-file-input" className="sr-only">
        Upload a UI screenshot (PNG, JPG, or WebP, max 5 MB)
      </label>
      <input {...getInputProps({ id: "dropzone-file-input" })} />

      {/* Upload icon — aria-hidden so screen readers skip the decorative illustration */}
      <div
        className="flex h-14 w-14 items-center justify-center rounded-full"
        style={{ backgroundColor: "var(--color-surface-raised)" }}
        aria-hidden="true"
      >
        {isDragReject ? (
          <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={24} height={24} style={{ color: "var(--color-heat)" }}>
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
        ) : isDragActive ? (
          <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={24} height={24} style={{ color: "var(--color-digital)" }}>
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
        ) : (
          <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={24} height={24} style={{ color: "var(--color-text-secondary)" }}>
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
        )}
      </div>

      <div>
        <p className="text-sm font-medium" style={{ color: "var(--color-text)" }}>
          {isDragReject
            ? "That file type isn't supported"
            : isDragActive
              ? "Drop it like it's hot"
              : "Drop your screenshot here"}
        </p>
        <p className="mt-1 text-xs" style={{ color: "var(--color-text-secondary)" }}>
          {isDragReject
            ? "Only PNG, JPG, and WebP accepted"
            : "or click to browse · PNG, JPG, WebP · max 5 MB"}
        </p>
      </div>
    </div>
  );
}
