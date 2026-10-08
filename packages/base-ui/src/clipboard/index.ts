export * as Clipboard from "./index.parts";

export * as ClipboardIndicatorDataAttributes from "./indicator/clipboard-indicator-data-attributes";
export * as ClipboardRootDataAttributes from "./root/clipboard-root-data-attributes";
export * as ClipboardTriggerDataAttributes from "./trigger/clipboard-trigger-data-attributes";

export {
  ClipboardIndicator,
  type ClipboardIndicatorProps,
  type ClipboardIndicatorState,
} from "./indicator/clipboard-indicator";
export {
  ClipboardRoot,
  type ClipboardRootProps,
  type ClipboardRootState,
} from "./root/clipboard-root";
export {
  useClipboardRootContext,
  type ClipboardRootContextValue,
} from "./root/clipboard-root-context";
export {
  ClipboardTrigger,
  type ClipboardTriggerProps,
  type ClipboardTriggerState,
} from "./trigger/clipboard-trigger";
export { CLIPBOARD_DEFAULT_TIMEOUT } from "./constants";
