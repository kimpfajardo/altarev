import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Combobox, type ComboboxOption } from "../index";

const meta = {
  title: "Altarev/Combobox",
  component: Combobox,
} satisfies Meta<typeof Combobox>;

export default meta;

type Story = StoryObj<typeof meta>;

const options: ComboboxOption[] = [
  { value: "atlas", label: "Atlas" },
  { value: "nova", label: "Nova" },
  { value: "pulse", label: "Pulse" },
  { value: "signal", label: "Signal" },
];

function SingleDemo({
  initial,
  disabled,
  placeholder,
}: {
  initial: string | null;
  disabled?: boolean;
  placeholder?: string;
}) {
  const [value, setValue] = useState<string | null>(initial);
  return (
    <div className="w-80">
      <Combobox
        options={options}
        value={value}
        onChange={setValue}
        disabled={disabled}
        placeholder={placeholder}
      />
    </div>
  );
}

function MultipleDemo({ initial }: { initial: string[] }) {
  const [value, setValue] = useState<string[]>(initial);
  return (
    <div className="w-96">
      <Combobox multiple options={options} value={value} onChange={setValue} />
    </div>
  );
}

const baseArgs = { options, value: null, onChange: () => undefined };

export const Default: Story = {
  args: baseArgs,
  render: () => <SingleDemo initial="nova" />,
};

export const Multiple: Story = {
  args: baseArgs,
  render: () => <MultipleDemo initial={["atlas", "pulse"]} />,
};

export const Empty: Story = {
  args: baseArgs,
  render: () => <SingleDemo initial={null} placeholder="Pick a project" />,
};

export const Disabled: Story = {
  args: baseArgs,
  render: () => <SingleDemo initial="signal" disabled />,
};
