import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button, Popover } from "../index";

const meta = {
  title: "Altarev/Popover",
  component: Popover,
} satisfies Meta<typeof Popover>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    trigger: <Button variant="outline">Open popover</Button>,
    children: (
      <div className="w-56 p-3 text-sm text-text">
        Popover content for visual checking.
      </div>
    ),
  },
};

export const AlignEnd: Story = {
  args: {
    align: "end",
    trigger: <Button variant="outline">Aligned end</Button>,
    children: (
      <div className="w-56 p-3 text-sm text-text">
        This panel is aligned to the end of the trigger.
      </div>
    ),
  },
};

export const RichContent: Story = {
  args: {
    trigger: <Button>Account</Button>,
    children: (
      <div className="flex w-64 flex-col gap-3 p-4">
        <div className="flex flex-col gap-1">
          <span className="text-sm font-bold text-text">Mika Reyes</span>
          <span className="text-xs text-text-muted">mika@altarev.dev</span>
        </div>
        <Button size="sm" variant="outline">
          Manage account
        </Button>
      </div>
    ),
  },
};
