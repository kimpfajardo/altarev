import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { QuarterPicker, type QuarterValue } from "../index";

const meta = {
  title: "Altarev/QuarterPicker",
  component: QuarterPicker,
} satisfies Meta<typeof QuarterPicker>;

export default meta;

type Story = StoryObj<typeof meta>;

function ControlledQuarterPicker({
  initialValue,
  initialYear,
}: {
  initialValue: QuarterValue | undefined;
  initialYear: number;
}) {
  const [value, setValue] = useState<QuarterValue | undefined>(initialValue);
  const [year, setYear] = useState(initialYear);
  return (
    <QuarterPicker
      value={value}
      onChange={setValue}
      year={year}
      onYearChange={setYear}
    />
  );
}

export const Default: Story = {
  render: () => (
    <ControlledQuarterPicker
      initialValue={{ year: 2026, quarter: 2 }}
      initialYear={2026}
    />
  ),
};

export const DifferentYearSelected: Story = {
  render: () => (
    <ControlledQuarterPicker
      initialValue={{ year: 2025, quarter: 4 }}
      initialYear={2026}
    />
  ),
};

export const NoSelection: Story = {
  render: () => (
    <ControlledQuarterPicker initialValue={undefined} initialYear={2026} />
  ),
};
