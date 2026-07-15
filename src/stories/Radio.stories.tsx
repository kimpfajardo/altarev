import type { Meta, StoryObj } from "@storybook/react-vite";
import { Radio } from "../index";

const meta = {
  title: "Altarev/Radio",
  component: Radio,
} satisfies Meta<typeof Radio>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "radio-default",
    label: "Monthly",
  },
};

export const Checked: Story = {
  args: {
    name: "radio-checked",
    label: "Monthly",
    defaultChecked: true,
  },
};

export const Group: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Radio name="radio-group" label="Monthly" defaultChecked />
      <Radio name="radio-group" label="Annual" />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    name: "radio-disabled",
    label: "Annual",
    disabled: true,
  },
};
