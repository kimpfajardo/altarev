import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tag } from "../index";

const meta = {
  title: "Altarev/Tag",
  component: Tag,
} satisfies Meta<typeof Tag>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Label",
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Tag size="2xs">Tiny</Tag>
      <Tag size="xs">Small</Tag>
    </div>
  ),
};

export const Uppercase: Story = {
  args: {
    uppercase: true,
    children: "Beta",
  },
};
