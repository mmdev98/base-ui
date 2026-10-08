# @mmdev98/base-ui

Unstyled React components for accessible interfaces, built on [Base UI](https://base-ui.com).

Not affiliated with MUI or the Base UI team.

```sh
pnpm add @mmdev98/base-ui
```

```tsx
import { Dialog } from "@mmdev98/base-ui/dialog";
import { Clipboard } from "@mmdev98/base-ui/clipboard";

<Clipboard.Root value="Hello">
  <Clipboard.Trigger>
    Copy
    <Clipboard.Indicator>✓</Clipboard.Indicator>
  </Clipboard.Trigger>
</Clipboard.Root>;
```

- Base UI components are re-exported under the same path: `@base-ui/react/dialog` →
  `@mmdev98/base-ui/dialog`.
- Hooks from `@base-ui/utils` (`useControlled`, `useStableCallback`, …) are in
  `@mmdev98/base-ui/utils`.
- Nothing is styled. Style the parts with `className` and their `data-*` attributes
  (`[data-copied]`).

Requires React 19. Base UI (`@base-ui/react` 1.8.0) comes with the package: don't install it
separately, import everything from `@mmdev98/base-ui`.

## License

MIT
