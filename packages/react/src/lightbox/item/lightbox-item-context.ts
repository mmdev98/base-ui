"use client";

import { createContext, use } from "react";
import type { LightboxImageStatus, LightboxItemValue } from "../types";

export interface LightboxItemContextValue {
  /** The item, as passed to `items`. */
  item: unknown;
  value: LightboxItemValue;
  index: number;
  active: boolean;
  /** The item's element, which `Lightbox.Image` measures. */
  element: HTMLElement | null;
  /** Loading state of its `Lightbox.Image`. */
  status: LightboxImageStatus;
  setStatus: (status: LightboxImageStatus) => void;
}

export const LightboxItemContext =
  createContext<LightboxItemContextValue | null>(null);

export function useLightboxItemContext(): LightboxItemContextValue {
  const context = use(LightboxItemContext);
  if (!context) {
    throw new Error(
      "Base UI: LightboxItemContext is missing. " +
        "Lightbox.Image, Lightbox.LoadingIndicator and Lightbox.Fallback must be placed within <Lightbox.Item>.",
    );
  }
  return context;
}
