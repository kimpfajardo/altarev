# altarev

A React + TypeScript + Tailwind CSS v4 component library. 37 accessible, themeable components built on native HTML elements.

## Install

```bash
npm install altarev
```

`react` and `react-dom` (v18+) are peer dependencies.

## Setup

Import the stylesheet once, at the root of your app. **Without this, components render unstyled.**

```ts
import "altarev/styles.css";
```

Then use any component:

```tsx
import { Button, TextInput, Tooltip } from "altarev";

export function Example() {
  return (
    <Tooltip content="Saves your changes">
      <Button>Save</Button>
    </Tooltip>
  );
}
```

The stylesheet ships the full design-token layer (colors, type scale, spacing) as CSS custom properties, so it is self-contained — you do **not** need Tailwind installed in your app to consume altarev.

## Theming — use your own design tokens

Every color in altarev resolves through a CSS custom property at runtime. To re-theme the entire library, **you override the property values. You never touch the component class names.** This is the whole contract:

- **You control the _values_** (the hex codes, the font).
- **altarev controls the _names_** (`--color-primary`, `bg-primary`, …) so every component stays consistent.

### The one rule

> **Declare your overrides in a plain `:root` block, _after_ the `altarev/styles.css` import.**

That's it. altarev's defaults live in a CSS cascade layer (`@layer altarev.tokens`), and by the CSS spec **any un-layered `:root` you write automatically wins** — no `!important`, no specificity tricks, no build config. Order in the file is what matters: your block comes after the import.

### Minimal example

```css
/* your app's global stylesheet, e.g. globals.css */
@import "altarev/styles.css";

:root {
  --color-primary: #e11d48; /* your brand color */
  --color-surface: #fffaf5;
  --color-text: #1a1208;
}
```

That single block retints `bg-primary`, `text-primary`, `border-primary`, the focus rings, and every other primary usage across all 37 components. Same for the other tokens.

> If you import CSS through a bundler instead of a stylesheet, do the same thing in any global CSS that loads after the altarev import:
>
> ```ts
> import "altarev/styles.css";
> import "./theme.css"; // your :root overrides
> ```

### Dark mode

Theming flips on a `.dark` class anywhere up the tree (usually `<html>` or `<body>`):

```html
<html class="dark"></html>
```

Every token ships a light value (`:root`) and a dark value (`.dark`). To override the dark palette too, add a matching un-layered `.dark` block after the import:

```css
@import "altarev/styles.css";

:root {
  --color-primary: #e11d48;
}
.dark {
  --color-primary: #fb7185; /* lighter for dark backgrounds */
}
```

### Every token you can override

Colors (each is a normal CSS color — hex, `rgb()`, `oklch()`, anything):

| Token                                      | Role                                     |
| ------------------------------------------ | ---------------------------------------- |
| `--color-primary`                          | Primary / brand actions, focus rings     |
| `--color-primary-tint`                     | Faded primary (hover fills, range bands) |
| `--color-accent`                           | Secondary accent                         |
| `--color-background`                       | App background                           |
| `--color-surface`                          | Card / panel surface                     |
| `--color-surface-raised`                   | Elevated surface                         |
| `--color-text`                             | Primary text                             |
| `--color-text-muted`                       | Secondary / placeholder text             |
| `--color-border`                           | Borders, dividers                        |
| `--color-overlay`                          | Modal / drawer scrim                     |
| `--color-hover`                            | Generic hover wash                       |
| `--color-success` / `--color-success-tint` | Success status                           |
| `--color-error` / `--color-error-tint`     | Error status                             |
| `--color-warning` / `--color-warning-tint` | Warning status                           |
| `--color-info` / `--color-info-tint`       | Info status                              |
| `--color-input-error`                      | Invalid form field border                |

Typography — override the font with `--font-altarev-sans`:

```css
:root {
  --font-altarev-sans: "Inter", system-ui, sans-serif;
}
```

The type **scale** (`--text-xs` … `--text-8xl`, with line-heights) is part of the architecture and intentionally fixed, so spacing stays consistent across the system. Override font family, not the scale.

### Do / Don't

✅ **Do** override token _values_ in an un-layered `:root` / `.dark` after the import.
✅ **Do** use any valid CSS color syntax (`#hex`, `rgb()`, `hsl()`, `oklch()`).

❌ **Don't** wrap your overrides in `@layer` — that puts them back in competition with altarev's defaults and they may not win. Plain `:root` is what makes it bulletproof.
❌ **Don't** edit or re-map the Tailwind utility names (`bg-primary`, etc.) or the `@theme` block — those are the contract that keeps components consistent. Change the value the name points to instead.
❌ **Don't** rename tokens. A typo like `--color-primry` silently does nothing; the component keeps the default. Copy names from the table above.

## Server Components / Next.js App Router

All components are client components and ship with the `"use client"` directive, so they work when imported directly into Server Components without extra wrapping.

## Date components

`Calendar`, `DateRangePicker`, and `TimePicker` build on [react-day-picker](https://daypicker.dev), which is an **optional** peer dependency. If you use any of them, install it:

```bash
npm install react-day-picker
```

The other 34 components have no such requirement.

## Components

Accordion · Alert · AuthCode · Avatar · Breadcrumbs · Button · Calendar · Carousel · Checkbox · Chip · Combobox · Container · DateRangePicker · Drawer · Dropdown · EmptyState · Loader · Modal · Pagination · Popover · Progress · QuarterPicker · Radio · Search · SegmentedControl · Select · Sidebar · Snackbar · Switch · Table · Tabs · Tag · TextInput · TextInputGroup · Textarea · TimePicker · Tooltip

## License

[MIT](./LICENSE)
