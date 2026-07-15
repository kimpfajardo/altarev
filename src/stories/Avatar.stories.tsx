import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar } from "../index";

const meta = {
  title: "Altarev/Avatar",
  component: Avatar,
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "KF",
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Avatar size="xs">XS</Avatar>
      <Avatar size="sm">SM</Avatar>
      <Avatar size="md">MD</Avatar>
      <Avatar size="lg">LG</Avatar>
      <Avatar size="xl">XL</Avatar>
      <Avatar size="2xl">2X</Avatar>
    </div>
  ),
};

export const BadgePositions: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Avatar size="xl" badge="br">
        BR
      </Avatar>
      <Avatar size="xl" badge="tr">
        TR
      </Avatar>
    </div>
  ),
};

export const WithImage: Story = {
  args: {
    size: "xl",
    src: "https://i.pravatar.cc/150?img=12",
    alt: "User portrait",
  },
};
