import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { TimePicker } from "../index";

const meta = {
  title: "Altarev/TimePicker",
  component: TimePicker,
} satisfies Meta<typeof TimePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

function ControlledTimePicker({
  initial,
  minuteStep,
}: {
  initial: { hours: number; minutes: number };
  minuteStep?: number;
}) {
  const [value, setValue] = useState(initial);
  return (
    <TimePicker value={value} onChange={setValue} minuteStep={minuteStep} />
  );
}

export const Default: Story = {
  render: () => <ControlledTimePicker initial={{ hours: 9, minutes: 30 }} />,
};

export const FifteenMinuteStep: Story = {
  render: () => (
    <ControlledTimePicker
      initial={{ hours: 14, minutes: 45 }}
      minuteStep={15}
    />
  ),
};

export const FiveMinuteStep: Story = {
  render: () => (
    <ControlledTimePicker initial={{ hours: 8, minutes: 5 }} minuteStep={5} />
  ),
};
