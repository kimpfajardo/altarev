import type { Meta, StoryObj } from "@storybook/react-vite";
import { Select } from "../index";

const meta = {
  title: "Altarev/Select",
  component: Select,
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: "select-default",
    label: "Plan",
    className: "max-w-xs",
    children: (
      <>
        <option value="starter">Starter</option>
        <option value="pro">Pro</option>
        <option value="enterprise">Enterprise</option>
      </>
    ),
  },
};

export const WithDefaultValue: Story = {
  args: {
    id: "select-default-value",
    label: "Plan",
    defaultValue: "pro",
    className: "max-w-xs",
    children: (
      <>
        <option value="starter">Starter</option>
        <option value="pro">Pro</option>
        <option value="enterprise">Enterprise</option>
      </>
    ),
  },
};

export const WithHelperText: Story = {
  args: {
    id: "select-helper",
    label: "Region",
    defaultValue: "ph",
    helperText: "Choose your billing region.",
    className: "max-w-xs",
    children: (
      <>
        <option value="ph">Philippines</option>
        <option value="us">United States</option>
        <option value="eu">Europe</option>
      </>
    ),
  },
};

export const Disabled: Story = {
  args: {
    id: "select-disabled",
    label: "Plan",
    defaultValue: "enterprise",
    disabled: true,
    className: "max-w-xs",
    children: (
      <>
        <option value="starter">Starter</option>
        <option value="pro">Pro</option>
        <option value="enterprise">Enterprise</option>
      </>
    ),
  },
};
