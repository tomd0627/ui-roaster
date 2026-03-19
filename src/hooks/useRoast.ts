"use client";

import { useState, useCallback } from "react";
import type { AcceptedMimeType, RoastResult, RoastStatus } from "@/types";
import { ERROR_MESSAGES } from "@/lib/constants";

interface RoastState {
  status: RoastStatus;
  result: RoastResult | null;
  error: string | null;
}

const initialState: RoastState = {
  status: "idle",
  result: null,
  error: null,
};

export interface UseRoastReturn extends RoastState {
  submitRoast: (imageBase64: string, mimeType: AcceptedMimeType) => Promise<void>;
  reset: () => void;
}

export function useRoast(): UseRoastReturn {
  const [state, setState] = useState<RoastState>(initialState);

  const submitRoast = useCallback(
    async (imageBase64: string, mimeType: AcceptedMimeType) => {
      setState({ status: "loading", result: null, error: null });

      try {
        const response = await fetch("/api/roast", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ imageBase64, mimeType }),
        });

        const data: unknown = await response.json();

        if (!response.ok) {
          const errorData = data as { message?: string };
          setState({
            status: "error",
            result: null,
            error: errorData.message ?? ERROR_MESSAGES.GENERIC,
          });
          return;
        }

        const successData = data as { result: RoastResult };
        setState({
          status: "success",
          result: successData.result,
          error: null,
        });
      } catch {
        setState({
          status: "error",
          result: null,
          error: ERROR_MESSAGES.GENERIC,
        });
      }
    },
    []
  );

  const reset = useCallback(() => {
    setState(initialState);
  }, []);

  return { ...state, submitRoast, reset };
}
