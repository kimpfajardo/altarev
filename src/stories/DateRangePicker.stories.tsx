import { useState } from "react";
import type { DateRange } from "react-day-picker";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { DateRangePicker, presetRanges, type DateRangePreset } from "../index";

const meta = {
  title: "Altarev/DateRangePicker",
  component: DateRangePicker,
} satisfies Meta<typeof DateRangePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

const initialRange: DateRange = {
  from: new Date(2026, 5, 1),
  to: new Date(2026, 5, 15),
};

const fixedNow = new Date(2026, 5, 29);

const fixedPresets: DateRangePreset[] = [
  { label: "Today", range: () => presetRanges(fixedNow).today },
  { label: "Yesterday", range: () => presetRanges(fixedNow).yesterday },
  { label: "This week", range: () => presetRanges(fixedNow).thisWeek },
  { label: "This month", range: () => presetRanges(fixedNow).thisMonth },
  { label: "Last month", range: () => presetRanges(fixedNow).lastMonth },
];

function ControlledDateRangePicker({
  initial,
  numberOfMonths,
}: {
  initial: DateRange | undefined;
  numberOfMonths?: number;
}) {
  const [range, setRange] = useState<DateRange | undefined>(initial);
  return (
    <DateRangePicker
      value={range}
      onApply={setRange}
      presets={fixedPresets}
      numberOfMonths={numberOfMonths}
    />
  );
}

export const Default: Story = {
  render: () => <ControlledDateRangePicker initial={initialRange} />,
};

export const SingleMonth: Story = {
  render: () => (
    <ControlledDateRangePicker initial={initialRange} numberOfMonths={1} />
  ),
};

export const Empty: Story = {
  render: () => <ControlledDateRangePicker initial={undefined} />,
};
