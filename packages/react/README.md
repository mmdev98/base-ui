# @logic-ui/react

Unstyled React components for accessible interfaces.

Not affiliated with MUI or the Base UI team.

```sh
pnpm add @logic-ui/react
```

```tsx
import { Dialog } from "@logic-ui/react/dialog";
import { Clipboard } from "@logic-ui/react/clipboard";

<Clipboard.Root value="Hello">
  <Clipboard.Trigger>
    Copy
    <Clipboard.Indicator>✓</Clipboard.Indicator>
  </Clipboard.Trigger>
</Clipboard.Root>;
```

- Base UI components are re-exported under the same path: `@base-ui/react/dialog` →
  `@logic-ui/react/dialog`.
- Hooks from `@base-ui/utils` (`useControlled`, `useStableCallback`, …) are in
  `@logic-ui/react/utils`.
- Nothing is styled. Style the parts with `className` and their `data-*` attributes
  (`[data-copied]`).

Requires React 19. Base UI (`@base-ui/react` 1.8.0) comes with the package: don't install it
separately, import everything from `@logic-ui/react`.

## License

MIT
