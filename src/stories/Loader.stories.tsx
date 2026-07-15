import type { Meta, StoryObj } from "@storybook/react-vite";
import { Loader } from "../index";

const meta = {
  title: "Altarev/Loader",
  component: Loader,
} satisfies Meta<typeof Loader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Loader size="2xs" />
      <Loader size="xs" />
      <Loader size="sm" />
      <Loader size="md" />
      <Loader size="lg" />
    </div>
  ),
};

export const CustomColor: Story = {
  args: {
    className: "text-success",
  },
};
