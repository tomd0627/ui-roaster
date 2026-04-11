"use client";

import { useState, useCallback, useRef } from "react";
import { compressImage } from "@/lib/compress-image";
import {
  ACCEPTED_MIME_TYPES,
  ACCEPTED_MIME_TYPE_LABELS,
  MAX_FILE_SIZE_BYTES,
  MAX_FILE_SIZE_LABEL,
} from "@/lib/constants";
import type { AcceptedMimeType, UploadStatus } from "@/types";

export interface UploadState {
  status: UploadStatus;
  previewUrl: string | null;
  base64: string | null;
  mimeType: AcceptedMimeType | null;
  fileName: string | null;
  fileSize: number | null;
  error: string | null;
}

export interface UseImageUploadReturn extends UploadState {
  handleFiles: (files: File[]) => Promise<void>;
  loadFromUrl: (src: string, label: string) => Promise<void>;
  loadFromBase64: (
    base64: string,
    mimeType: AcceptedMimeType,
    fileName?: string
  ) => Promise<{ base64: string; mimeType: AcceptedMimeType } | null>;
  reset: () => void;
}

const initialState: UploadState = {
  status: "idle",
  previewUrl: null,
  base64: null,
  mimeType: null,
  fileName: null,
  fileSize: null,
  error: null,
};

export function useImageUpload(): UseImageUploadReturn {
  const [state, setState] = useState<UploadState>(initialState);
  const prevPreviewUrl = useRef<string | null>(null);

  const revokePreview = useCallback(() => {
    if (prevPreviewUrl.current) {
      URL.revokeObjectURL(prevPreviewUrl.current);
      prevPreviewUrl.current = null;
    }
  }, []);

  const handleFiles = useCallback(
    async (files: File[]) => {
      const file = files[0];
      if (!file) return;

      // Type validation
      if (!ACCEPTED_MIME_TYPES.includes(file.type as AcceptedMimeType)) {
        setState((prev) => ({
          ...prev,
          status: "error",
          error: `Unsupported file type. Please upload a ${ACCEPTED_MIME_TYPE_LABELS} image.`,
        }));
        return;
      }

      // Size validation
      if (file.size > MAX_FILE_SIZE_BYTES) {
        setState((prev) => ({
          ...prev,
          status: "error",
          error: `File is too large. Maximum size is ${MAX_FILE_SIZE_LABEL}.`,
        }));
        return;
      }

      // Create preview URL
      revokePreview();
      const previewUrl = URL.createObjectURL(file);
      prevPreviewUrl.current = previewUrl;

      setState({
        status: "compressing",
        previewUrl,
        base64: null,
        mimeType: null,
        fileName: file.name,
        fileSize: file.size,
        error: null,
      });

      try {
        const compressed = await compressImage(file);
        setState((prev) => ({
          ...prev,
          status: "selected",
          base64: compressed.base64,
          mimeType: compressed.mimeType,
        }));
      } catch {
        setState((prev) => ({
          ...prev,
          status: "error",
          error: "Failed to process image. Please try a different file.",
        }));
      }
    },
    [revokePreview]
  );

  const loadFromUrl = useCallback(
    async (src: string, label: string) => {
      revokePreview();
      setState({
        status: "compressing",
        previewUrl: src,
        base64: null,
        mimeType: null,
        fileName: label,
        fileSize: null,
        error: null,
      });

      try {
        const response = await fetch(src);
        const blob = await response.blob();
        const file = new File([blob], label, { type: blob.type || "image/jpeg" });
        const compressed = await compressImage(file);

        setState({
          status: "selected",
          previewUrl: src,
          base64: compressed.base64,
          mimeType: compressed.mimeType,
          fileName: label,
          fileSize: blob.size,
          error: null,
        });
      } catch {
        setState((prev) => ({
          ...prev,
          status: "error",
          error: "Failed to load sample image. Please try again.",
        }));
      }
    },
    [revokePreview]
  );

  const loadFromBase64 = useCallback(
    async (
      base64: string,
      mimeType: AcceptedMimeType,
      fileName = "bookmarklet-capture.jpg"
    ): Promise<{ base64: string; mimeType: AcceptedMimeType } | null> => {
      revokePreview();

      try {
        const byteChars = atob(base64);
        const byteArray = new Uint8Array(byteChars.length);
        for (let i = 0; i < byteChars.length; i++) {
          byteArray[i] = byteChars.charCodeAt(i);
        }
        const blob = new Blob([byteArray], { type: mimeType });
        const previewUrl = URL.createObjectURL(blob);
        prevPreviewUrl.current = previewUrl;

        setState({
          status: "compressing",
          previewUrl,
          base64: null,
          mimeType: null,
          fileName,
          fileSize: blob.size,
          error: null,
        });

        const file = new File([blob], fileName, { type: mimeType });
        const compressed = await compressImage(file);

        setState({
          status: "selected",
          previewUrl,
          base64: compressed.base64,
          mimeType: compressed.mimeType,
          fileName,
          fileSize: blob.size,
          error: null,
        });

        return { base64: compressed.base64, mimeType: compressed.mimeType };
      } catch {
        setState((prev) => ({
          ...prev,
          status: "error",
          error: "Failed to load bookmarklet image. Please try again.",
        }));
        return null;
      }
    },
    [revokePreview]
  );

  const reset = useCallback(() => {
    revokePreview();
    setState(initialState);
  }, [revokePreview]);

  return { ...state, handleFiles, loadFromUrl, loadFromBase64, reset };
}
