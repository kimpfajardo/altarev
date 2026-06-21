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

## Dark mode

Theming flips on a `.dark` class anywhere up the tree (typically `<html>` or `<body>`):

```html
<html class="dark"></html>
```

Every color token has a light and dark value; components react automatically.

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
