import type { Meta, StoryObj } from "@storybook/react-vite";
import { Switch } from "../index";

const meta = {
  title: "Altarev/Switch",
  component: Switch,
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Enabled",
  },
};

export const Checked: Story = {
  args: {
    label: "Enabled",
    defaultChecked: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Switch size="2xs" label="2xs" defaultChecked />
      <Switch size="xs" label="xs" defaultChecked />
      <Switch size="sm" label="sm" defaultChecked />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    label: "Disabled",
    defaultChecked: true,
    disabled: true,
  },
};
