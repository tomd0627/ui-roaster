"use client";

import { DropZone } from "./DropZone";
import { ImagePreview } from "./ImagePreview";
import { SamplePicker } from "./SamplePicker";
import type { UseImageUploadReturn } from "@/hooks/useImageUpload";

interface UploadSectionProps {
  upload: UseImageUploadReturn;
  isDisabled?: boolean;
}

export function UploadSection({ upload, isDisabled = false }: UploadSectionProps) {
  const hasImage = upload.status === "selected" || upload.status === "compressing";

  return (
    <div className="flex flex-col gap-4">
      {hasImage && upload.previewUrl ? (
        <ImagePreview
          src={upload.previewUrl}
          fileName={upload.fileName ?? "screenshot"}
          fileSize={upload.fileSize}
          onRemove={upload.reset}
          isLoading={upload.status === "compressing"}
        />
      ) : (
        <>
          <DropZone onFilesAccepted={upload.handleFiles} isDisabled={isDisabled} />
          <SamplePicker
            onSelectSample={upload.loadFromUrl}
            isDisabled={isDisabled}
          />
        </>
      )}

      {/* Validation error */}
      {upload.status === "error" && upload.error && (
        <div
          role="alert"
          className="flex items-start gap-2 rounded-md px-4 py-3 text-sm"
          style={{
            backgroundColor: "var(--color-heat-muted)",
            color: "var(--color-heat)",
            border: "1px solid var(--color-heat)",
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={16} height={16} className="mt-0.5 shrink-0" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          {upload.error}
        </div>
      )}
    </div>
  );
}
