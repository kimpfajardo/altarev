import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Calendar } from "../index";

const meta = {
  title: "Altarev/Calendar",
  component: Calendar,
} satisfies Meta<typeof Calendar>;

export default meta;

type Story = StoryObj<typeof meta>;

function ControlledCalendar({
  initial,
  numberOfMonths,
  disabledWeekends,
}: {
  initial: Date;
  numberOfMonths?: number;
  disabledWeekends?: boolean;
}) {
  const [selected, setSelected] = useState<Date | undefined>(initial);
  return (
    <Calendar
      mode="single"
      selected={selected}
      onSelect={setSelected}
      defaultMonth={new Date(2026, 5)}
      numberOfMonths={numberOfMonths}
      disabled={disabledWeekends ? { dayOfWeek: [0, 6] } : undefined}
    />
  );
}

export const Default: Story = {
  render: () => <ControlledCalendar initial={new Date(2026, 5, 29)} />,
};

export const Range: Story = {
  render: () => (
    <Calendar
      mode="range"
      selected={{ from: new Date(2026, 5, 8), to: new Date(2026, 5, 16) }}
      defaultMonth={new Date(2026, 5)}
    />
  ),
};

export const TwoMonths: Story = {
  render: () => (
    <ControlledCalendar initial={new Date(2026, 5, 12)} numberOfMonths={2} />
  ),
};

export const WithDisabledDays: Story = {
  render: () => (
    <ControlledCalendar initial={new Date(2026, 5, 29)} disabledWeekends />
  ),
};
