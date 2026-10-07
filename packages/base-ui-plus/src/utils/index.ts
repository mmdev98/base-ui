// Hooks and helpers from `@base-ui/utils` that are useful for building
// primitives. `@base-ui/utils` is still 0.x, so only re-export what we rely on.
export { ownerDocument, ownerWindow } from "@base-ui/utils/owner";
export { useAnimationFrame } from "@base-ui/utils/useAnimationFrame";
export {
  useControlled,
  type UseControlledProps,
} from "@base-ui/utils/useControlled";
export { useId } from "@base-ui/utils/useId";
export { useIsoLayoutEffect } from "@base-ui/utils/useIsoLayoutEffect";
export { useMergedRefs } from "@base-ui/utils/useMergedRefs";
export { useStableCallback } from "@base-ui/utils/useStableCallback";
export { Timeout, useTimeout } from "@base-ui/utils/useTimeout";
export { useValueAsRef } from "@base-ui/utils/useValueAsRef";
export {
  visuallyHidden,
  visuallyHiddenInput,
} from "@base-ui/utils/visuallyHidden";
