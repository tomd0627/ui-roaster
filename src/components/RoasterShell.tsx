"use client";

import { useImageUpload } from "@/hooks/useImageUpload";
import { useRoast } from "@/hooks/useRoast";
import { UploadSection } from "@/components/upload/UploadSection";
import { RoastButton } from "@/components/roast/RoastButton";
import { LoadingRoast } from "@/components/roast/LoadingRoast";
import { RoastOutput } from "@/components/roast/RoastOutput";
import { ERROR_MESSAGES } from "@/lib/constants";

export function RoasterShell() {
  const upload = useImageUpload();
  const roast = useRoast();

  const canRoast = upload.status === "selected" && upload.base64 !== null;
  const isWorking = upload.status === "compressing" || roast.status === "loading";

  const handleRoast = () => {
    if (!canRoast || !upload.base64 || !upload.mimeType) return;
    void roast.submitRoast(upload.base64, upload.mimeType);
  };

  const handleReset = () => {
    upload.reset();
    roast.reset();
  };

  // Show results
  if (roast.status === "success" && roast.result) {
    return (
      <div className="space-y-6">
        {/* Small image thumbnail in results view */}
        {upload.previewUrl && (
          <div
            className="flex items-center gap-3 rounded-lg p-3"
            style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={upload.previewUrl}
              alt="Submitted screenshot thumbnail"
              className="h-12 w-20 rounded object-cover"
            />
            <div>
              <p className="text-xs font-medium" style={{ color: "var(--color-text)" }}>
                {upload.fileName ?? "screenshot"}
              </p>
              <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                Roasted
              </p>
            </div>
          </div>
        )}
        <RoastOutput roast={roast.result} onReset={handleReset} />
      </div>
    );
  }

  // Show loading
  if (roast.status === "loading") {
    return <LoadingRoast />;
  }

  // Show upload form (idle / error states)
  return (
    <div className="space-y-4">
      <UploadSection upload={upload} isDisabled={isWorking} />

      <RoastButton
        onClick={handleRoast}
        isLoading={isWorking}
        isDisabled={!canRoast}
      />

      {/* API error */}
      {roast.status === "error" && roast.error && (
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
          {roast.error ?? ERROR_MESSAGES.GENERIC}
        </div>
      )}
    </div>
  );
}
