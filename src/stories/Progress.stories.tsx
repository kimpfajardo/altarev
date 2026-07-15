import type { Meta, StoryObj } from "@storybook/react-vite";
import { Progress } from "../index";

const meta = {
  title: "Altarev/Progress",
  component: Progress,
} satisfies Meta<typeof Progress>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 64,
    className: "w-72",
  },
};

export const LinearThick: Story = {
  args: {
    value: 40,
    size: "2xs",
    className: "w-72",
  },
};

export const Circular: Story = {
  args: {
    variant: "circular",
    value: 72,
  },
};

export const CircularLarge: Story = {
  args: {
    variant: "circular",
    value: 25,
    size: "lg",
  },
};
