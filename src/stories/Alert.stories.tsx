import type { Meta, StoryObj } from "@storybook/react-vite";
import { Alert } from "../index";

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
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
  title: "Altarev/Alert",
  component: Alert,
} satisfies Meta<typeof Alert>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Your changes have been saved.",
  },
};

export const Success: Story = {
  args: {
    status: "success",
    variant: "colourful",
    icon: <CheckIcon />,
    children: "The report is ready to download.",
  },
};

export const WarningOutline: Story = {
  args: {
    status: "warning",
    variant: "outline",
    children: "Some fields are still missing.",
  },
};

export const Error: Story = {
  args: {
    status: "error",
    variant: "colourful",
    children: "We could not process your request.",
  },
};

export const Info: Story = {
  args: {
    status: "info",
    variant: "outline",
    children: "A new version is available.",
  },
};
