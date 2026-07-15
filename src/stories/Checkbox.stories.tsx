import type { Meta, StoryObj } from "@storybook/react-vite";
import { Checkbox } from "../index";

const meta = {
  title: "Altarev/Checkbox",
  component: Checkbox,
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Accept terms",
  },
};

export const Checked: Story = {
  args: {
    label: "Checked",
    defaultChecked: true,
  },
};

export const Indeterminate: Story = {
  args: {
    label: "Indeterminate",
    indeterminate: true,
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled",
    defaultChecked: true,
    disabled: true,
  },
};
