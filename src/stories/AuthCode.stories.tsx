import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { AuthCode } from "../index";

const meta = {
  title: "Altarev/AuthCode",
  component: AuthCode,
} satisfies Meta<typeof AuthCode>;

export default meta;

type Story = StoryObj<typeof meta>;

function AuthCodeDemo({
  initial,
  length,
  error,
  disabled,
}: {
  initial: string;
  length?: number;
  error?: boolean | string;
  disabled?: boolean;
}) {
  const [value, setValue] = useState(initial);
  return (
    <AuthCode
      value={value}
      onChange={setValue}
      length={length}
      error={error}
      disabled={disabled}
    />
  );
}

const baseArgs = { value: "", onChange: () => undefined };

export const Default: Story = {
  args: baseArgs,
  render: () => <AuthCodeDemo initial="123" />,
};

export const Error: Story = {
  args: baseArgs,
  render: () => <AuthCodeDemo initial="1234" error="That code is incorrect." />,
};

export const FourDigits: Story = {
  args: baseArgs,
  render: () => <AuthCodeDemo initial="12" length={4} />,
};

export const Disabled: Story = {
  args: baseArgs,
  render: () => <AuthCodeDemo initial="123456" disabled />,
};
