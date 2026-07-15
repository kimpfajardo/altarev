import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button, Tooltip } from "../index";

const meta = {
  title: "Altarev/Tooltip",
  component: Tooltip,
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: "Tooltip content",
    children: <Button variant="outline">Hover me</Button>,
  },
};

export const Placements: Story = {
  args: {
    content: "Tooltip content",
    children: <Button variant="outline">Hover me</Button>,
  },
  render: () => (
    <div className="flex flex-wrap gap-12 p-12">
      <Tooltip content="Top tooltip" placement="top">
        <Button variant="outline">Top</Button>
      </Tooltip>
      <Tooltip content="Bottom tooltip" placement="bottom">
        <Button variant="outline">Bottom</Button>
      </Tooltip>
      <Tooltip content="Left tooltip" placement="left">
        <Button variant="outline">Left</Button>
      </Tooltip>
      <Tooltip content="Right tooltip" placement="right">
        <Button variant="outline">Right</Button>
      </Tooltip>
    </div>
  ),
};

export const WithoutPointer: Story = {
  args: {
    content: "No arrow pointer",
    pointer: false,
    placement: "bottom",
    children: <Button variant="outline">Hover me</Button>,
  },
};
