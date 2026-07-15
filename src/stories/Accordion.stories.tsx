import type { Meta, StoryObj } from "@storybook/react-vite";
import { Accordion } from "../index";

const meta = {
  title: "Altarev/Accordion",
  component: Accordion,
} satisfies Meta<typeof Accordion>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Quarter summary",
    className: "w-full max-w-lg",
    children:
      "Revenue and retention moved in the right direction this quarter.",
  },
};

export const Open: Story = {
  args: {
    title: "Quarter summary",
    open: true,
    className: "w-full max-w-lg",
    children:
      "Revenue and retention moved in the right direction this quarter.",
  },
};

export const LargeSize: Story = {
  args: {
    title: "Billing details",
    size: "xl",
    open: true,
    className: "w-full max-w-lg",
    children: "Your plan renews on the first of each month.",
  },
};
