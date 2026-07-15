import type { Meta, StoryObj } from "@storybook/react-vite";
import { Chip } from "../index";

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

const meta = {
  title: "Altarev/Chip",
  component: Chip,
} satisfies Meta<typeof Chip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "North region",
  },
};

export const Dismissible: Story = {
  args: {
    children: "North region",
    onDismiss: () => undefined,
  },
};

export const WithLeadingIcon: Story = {
  args: {
    leading: <CheckIcon />,
    children: "Verified",
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Chip size="sm">Small</Chip>
      <Chip size="md">Medium</Chip>
    </div>
  ),
};
