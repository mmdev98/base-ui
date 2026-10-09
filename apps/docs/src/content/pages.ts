import "server-only";
import type { MDXContent } from "mdx/types";

/** Loads each page's MDX, by slug (see `src/nav.ts`). */
export const pageContent: Record<
  string,
  () => Promise<{ default: MDXContent }>
> = {
  "": () => import("./introduction.mdx"),
  "quick-start": () => import("./quick-start.mdx"),
  changelog: () => import("./changelog.mdx"),
  "components/clipboard": () => import("./components/clipboard/index.mdx"),
  "components/gallery": () => import("./components/gallery/index.mdx"),
  "components/accordion": () => import("./components/accordion/index.mdx"),
  "components/alert-dialog": () =>
    import("./components/alert-dialog/index.mdx"),
  "components/autocomplete": () =>
    import("./components/autocomplete/index.mdx"),
  "components/avatar": () => import("./components/avatar/index.mdx"),
  "components/button": () => import("./components/button/index.mdx"),
  "components/checkbox": () => import("./components/checkbox/index.mdx"),
  "components/checkbox-group": () =>
    import("./components/checkbox-group/index.mdx"),
  "components/collapsible": () => import("./components/collapsible/index.mdx"),
  "components/combobox": () => import("./components/combobox/index.mdx"),
  "components/context-menu": () =>
    import("./components/context-menu/index.mdx"),
  "components/dialog": () => import("./components/dialog/index.mdx"),
  "components/drawer": () => import("./components/drawer/index.mdx"),
  "components/field": () => import("./components/field/index.mdx"),
  "components/fieldset": () => import("./components/fieldset/index.mdx"),
  "components/form": () => import("./components/form/index.mdx"),
  "components/input": () => import("./components/input/index.mdx"),
  "components/menu": () => import("./components/menu/index.mdx"),
  "components/menubar": () => import("./components/menubar/index.mdx"),
  "components/meter": () => import("./components/meter/index.mdx"),
  "components/navigation-menu": () =>
    import("./components/navigation-menu/index.mdx"),
  "components/number-field": () =>
    import("./components/number-field/index.mdx"),
  "components/otp-field": () => import("./components/otp-field/index.mdx"),
  "components/popover": () => import("./components/popover/index.mdx"),
  "components/preview-card": () =>
    import("./components/preview-card/index.mdx"),
  "components/progress": () => import("./components/progress/index.mdx"),
  "components/radio": () => import("./components/radio/index.mdx"),
  "components/scroll-area": () => import("./components/scroll-area/index.mdx"),
  "components/select": () => import("./components/select/index.mdx"),
  "components/separator": () => import("./components/separator/index.mdx"),
  "components/slider": () => import("./components/slider/index.mdx"),
  "components/switch": () => import("./components/switch/index.mdx"),
  "components/tabs": () => import("./components/tabs/index.mdx"),
  "components/toast": () => import("./components/toast/index.mdx"),
  "components/toggle": () => import("./components/toggle/index.mdx"),
  "components/toggle-group": () =>
    import("./components/toggle-group/index.mdx"),
  "components/toolbar": () => import("./components/toolbar/index.mdx"),
  "components/tooltip": () => import("./components/tooltip/index.mdx"),
  "handbook/animation": () => import("./handbook/animation/index.mdx"),
  "handbook/composition": () => import("./handbook/composition/index.mdx"),
  "handbook/customization": () => import("./handbook/customization/index.mdx"),
  "handbook/forms": () => import("./handbook/forms/index.mdx"),
  "handbook/styling": () => import("./handbook/styling/index.mdx"),
  "handbook/typescript": () => import("./handbook/typescript/index.mdx"),
  "utils/csp-provider": () => import("./utils/csp-provider/index.mdx"),
  "utils/direction-provider": () =>
    import("./utils/direction-provider/index.mdx"),
  "utils/merge-props": () => import("./utils/merge-props/index.mdx"),
  "utils/use-render": () => import("./utils/use-render/index.mdx"),
};
