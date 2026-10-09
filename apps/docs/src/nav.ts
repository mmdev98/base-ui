/**
 * Every docs page, in sidebar order. This is the one list the sidebar, the
 * routes, search and llms.txt read. Add a page here and its MDX file in
 * `src/content/pages.ts`.
 */
export interface DocPage {
  /** URL under `/docs`; `""` is `/docs` itself. */
  slug: string;
  title: string;
  description: string;
  /** MDX file under `src/content`. */
  file: string;
  /** Library entry point whose API the page documents (`src/<api>`). */
  api?: string;
  /** Shows a "new" badge next to the title. */
  new?: boolean;
}

export interface DocSection {
  title: string;
  pages: DocPage[];
}

export const sections: DocSection[] = [
  {
    title: "Overview",
    pages: [
      {
        slug: "",
        title: "Introduction",
        description: "Unstyled React components for accessible interfaces.",
        file: "introduction.mdx",
      },
      {
        slug: "quick-start",
        title: "Quick start",
        description:
          "Install the package, render a primitive and style it with its data attributes.",
        file: "quick-start.mdx",
      },
      {
        slug: "changelog",
        title: "Changelog",
        description: "What changed in each release.",
        file: "changelog.mdx",
      },
    ],
  },
  {
    title: "Handbook",
    pages: [
      {
        slug: "handbook/styling",
        title: "Styling",
        description:
          "A guide to styling Base UI components with your preferred styling engine.",
        file: "handbook/styling/index.mdx",
      },
      {
        slug: "handbook/animation",
        title: "Animation",
        description: "A guide to animating Base UI components.",
        file: "handbook/animation/index.mdx",
      },
      {
        slug: "handbook/composition",
        title: "Composition",
        description:
          "A guide to composing Base UI components with your own React components.",
        file: "handbook/composition/index.mdx",
      },
      {
        slug: "handbook/customization",
        title: "Customization",
        description:
          "A guide to customizing the behavior of Base UI components.",
        file: "handbook/customization/index.mdx",
      },
      {
        slug: "handbook/forms",
        title: "Forms",
        description: "A guide to building forms with Base UI components.",
        file: "handbook/forms/index.mdx",
      },
      {
        slug: "handbook/typescript",
        title: "TypeScript",
        description: "A guide to using TypeScript with Base UI.",
        file: "handbook/typescript/index.mdx",
      },
    ],
  },
  {
    title: "Components",
    pages: [
      {
        slug: "components/accordion",
        title: "Accordion",
        description: "A set of collapsible panels with headings.",
        file: "components/accordion/index.mdx",
      },
      {
        slug: "components/alert-dialog",
        title: "Alert Dialog",
        description: "A dialog that requires a user response to proceed.",
        file: "components/alert-dialog/index.mdx",
      },
      {
        slug: "components/autocomplete",
        title: "Autocomplete",
        description: "An input that suggests options as you type.",
        file: "components/autocomplete/index.mdx",
      },
      {
        slug: "components/avatar",
        title: "Avatar",
        description: "An easily stylable avatar component.",
        file: "components/avatar/index.mdx",
      },
      {
        slug: "components/button",
        title: "Button",
        description:
          "A button component that can be rendered as another tag or focusable when disabled.",
        file: "components/button/index.mdx",
      },
      {
        slug: "components/checkbox",
        title: "Checkbox",
        description: "An easily stylable checkbox component.",
        file: "components/checkbox/index.mdx",
      },
      {
        slug: "components/checkbox-group",
        title: "Checkbox Group",
        description: "Provides shared state to a series of checkboxes.",
        file: "components/checkbox-group/index.mdx",
      },
      {
        slug: "components/clipboard",
        title: "Clipboard",
        description:
          "A button that copies a value and shows that it was copied.",
        file: "components/clipboard/index.mdx",
        api: "clipboard",
        new: true,
      },
      {
        slug: "components/collapsible",
        title: "Collapsible",
        description: "A collapsible panel controlled by a button.",
        file: "components/collapsible/index.mdx",
      },
      {
        slug: "components/combobox",
        title: "Combobox",
        description:
          "An input combined with a list of predefined items to select.",
        file: "components/combobox/index.mdx",
      },
      {
        slug: "components/context-menu",
        title: "Context Menu",
        description:
          "A menu that appears at the pointer on right click or long press.",
        file: "components/context-menu/index.mdx",
      },
      {
        slug: "components/dialog",
        title: "Dialog",
        description: "A popup that opens on top of the entire page.",
        file: "components/dialog/index.mdx",
      },
      {
        slug: "components/drawer",
        title: "Drawer",
        description: "A panel that slides in from the edge of the screen.",
        file: "components/drawer/index.mdx",
      },
      {
        slug: "components/field",
        title: "Field",
        description:
          "A component that provides labeling and validation for form controls.",
        file: "components/field/index.mdx",
      },
      {
        slug: "components/fieldset",
        title: "Fieldset",
        description:
          "A native fieldset element with an easily stylable legend.",
        file: "components/fieldset/index.mdx",
      },
      {
        slug: "components/form",
        title: "Form",
        description: "A native form element with consolidated error handling.",
        file: "components/form/index.mdx",
      },
      {
        slug: "components/gallery",
        title: "Gallery",
        description:
          "Thumbnails that open a full-screen image viewer with mobile gestures.",
        file: "components/gallery/index.mdx",
        api: "gallery",
        new: true,
      },
      {
        slug: "components/input",
        title: "Input",
        description:
          "A native input element that automatically works with Field.",
        file: "components/input/index.mdx",
      },
      {
        slug: "components/menu",
        title: "Menu",
        description:
          "A list of actions in a dropdown, enhanced with keyboard navigation.",
        file: "components/menu/index.mdx",
      },
      {
        slug: "components/menubar",
        title: "Menubar",
        description:
          "A menu bar providing commands and options for your application.",
        file: "components/menubar/index.mdx",
      },
      {
        slug: "components/meter",
        title: "Meter",
        description: "A graphical display of a numeric value within a range.",
        file: "components/meter/index.mdx",
      },
      {
        slug: "components/navigation-menu",
        title: "Navigation Menu",
        description: "A collection of links and menus for website navigation.",
        file: "components/navigation-menu/index.mdx",
      },
      {
        slug: "components/number-field",
        title: "Number Field",
        description:
          "A numeric input element with increment and decrement buttons, and a scrub area.",
        file: "components/number-field/index.mdx",
      },
      {
        slug: "components/otp-field",
        title: "OTP Field",
        description:
          "A one-time password input composed of individual character slots.",
        file: "components/otp-field/index.mdx",
      },
      {
        slug: "components/popover",
        title: "Popover",
        description: "An accessible popup anchored to a button.",
        file: "components/popover/index.mdx",
      },
      {
        slug: "components/preview-card",
        title: "Preview Card",
        description:
          "A link that shows a destination preview without interrupting keyboard or screen reader navigation.",
        file: "components/preview-card/index.mdx",
      },
      {
        slug: "components/progress",
        title: "Progress",
        description: "Displays the status of a task that takes a long time.",
        file: "components/progress/index.mdx",
      },
      {
        slug: "components/radio",
        title: "Radio",
        description: "An easily stylable radio button component.",
        file: "components/radio/index.mdx",
      },
      {
        slug: "components/scroll-area",
        title: "Scroll Area",
        description: "A native scroll container with custom scrollbars.",
        file: "components/scroll-area/index.mdx",
      },
      {
        slug: "components/select",
        title: "Select",
        description:
          "A common form component for choosing a predefined value in a dropdown menu.",
        file: "components/select/index.mdx",
      },
      {
        slug: "components/separator",
        title: "Separator",
        description: "A separator element accessible to screen readers.",
        file: "components/separator/index.mdx",
      },
      {
        slug: "components/slider",
        title: "Slider",
        description: "An easily stylable range input.",
        file: "components/slider/index.mdx",
      },
      {
        slug: "components/switch",
        title: "Switch",
        description: "A control that indicates whether a setting is on or off.",
        file: "components/switch/index.mdx",
      },
      {
        slug: "components/tabs",
        title: "Tabs",
        description:
          "A component for toggling between related panels on the same page.",
        file: "components/tabs/index.mdx",
      },
      {
        slug: "components/toast",
        title: "Toast",
        description: "Generates toast notifications.",
        file: "components/toast/index.mdx",
      },
      {
        slug: "components/toggle",
        title: "Toggle",
        description: "A two-state button that can be on or off.",
        file: "components/toggle/index.mdx",
      },
      {
        slug: "components/toggle-group",
        title: "Toggle Group",
        description: "Provides a shared state to a series of toggle buttons.",
        file: "components/toggle-group/index.mdx",
      },
      {
        slug: "components/toolbar",
        title: "Toolbar",
        description: "A container for grouping a set of buttons and controls.",
        file: "components/toolbar/index.mdx",
      },
      {
        slug: "components/tooltip",
        title: "Tooltip",
        description:
          "A popup that appears when an element is hovered or focused, showing a hint for sighted users.",
        file: "components/tooltip/index.mdx",
      },
    ],
  },
  {
    title: "Utils",
    pages: [
      {
        slug: "utils/csp-provider",
        title: "CSP Provider",
        description:
          "Configures CSP-related behavior for inline tags rendered by Base UI components.",
        file: "utils/csp-provider/index.mdx",
      },
      {
        slug: "utils/direction-provider",
        title: "Direction Provider",
        description: "Enables RTL behavior for Base UI components.",
        file: "utils/direction-provider/index.mdx",
      },
      {
        slug: "utils/merge-props",
        title: "mergeProps",
        description: "A utility to merge multiple sets of React props.",
        file: "utils/merge-props/index.mdx",
      },
      {
        slug: "utils/use-render",
        title: "useRender",
        description: "Hook for enabling a render prop in custom components.",
        file: "utils/use-render/index.mdx",
      },
    ],
  },
];

export const pages: DocPage[] = sections.flatMap((section) => section.pages);

export function getPageHref(page: DocPage): string {
  return page.slug ? `/docs/${page.slug}` : "/docs";
}

export function findPage(slug: string): DocPage | undefined {
  return pages.find((page) => page.slug === slug);
}

export function getSection(page: DocPage): DocSection {
  return sections.find((section) => section.pages.includes(page))!;
}

export const SITE = {
  name: "Logic UI",
  packageName: "@logic-ui/react",
  repository: "https://github.com/mmdev98/logic-ui",
};
