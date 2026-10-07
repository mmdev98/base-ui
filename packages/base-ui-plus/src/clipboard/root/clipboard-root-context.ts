"use client";

import { createContext, use } from "react";

export interface ClipboardRootContextValue {
  value: string;
  copied: boolean;
  copy: () => Promise<void>;
}

export const ClipboardRootContext =
  createContext<ClipboardRootContextValue | null>(null);

export function useClipboardRootContext(): ClipboardRootContextValue {
  const context = use(ClipboardRootContext);
  if (!context) {
    throw new Error(
      "Base UI Plus: ClipboardRootContext is missing. " +
        "Clipboard parts must be placed within <Clipboard.Root>.",
    );
  }
  return context;
}
