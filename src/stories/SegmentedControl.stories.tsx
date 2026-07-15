import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  SegmentedControl,
  type SegmentedControlProps,
  type SegmentedItem,
} from "../index";

const meta = {
  title: "Altarev/SegmentedControl",
  component: SegmentedControl,
} satisfies Meta<typeof SegmentedControl>;

export default meta;

type Story = StoryObj<typeof meta>;

function CalendarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}

const items: SegmentedItem[] = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
];

const iconItems: SegmentedItem[] = [
  { value: "daily", label: "Daily", icon: <CalendarIcon /> },
  { value: "weekly", label: "Weekly", icon: <CalendarIcon /> },
  { value: "monthly", label: "Monthly", icon: <CalendarIcon /> },
];

function SegmentedDemo({
  items: data,
  initial,
  size,
}: {
  items: SegmentedItem[];
  initial: string;
  size?: SegmentedControlProps["size"];
}) {
  const [value, setValue] = useState(initial);
  return (
    <SegmentedControl
      items={data}
      value={value}
      onChange={setValue}
      size={size}
    />
  );
}

const baseArgs = { items, value: "daily", onChange: () => undefined };

export const Default: Story = {
  args: baseArgs,
  render: () => <SegmentedDemo items={items} initial="daily" />,
};

export const Small: Story = {
  args: baseArgs,
  render: () => <SegmentedDemo items={items} initial="weekly" size="sm" />,
};

export const WithIcons: Story = {
  args: baseArgs,
  render: () => <SegmentedDemo items={iconItems} initial="monthly" />,
};
