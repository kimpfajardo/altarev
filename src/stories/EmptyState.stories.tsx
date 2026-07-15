import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button, EmptyState } from "../index";

function InboxIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M22 12h-6l-2 3h-4l-2-3H2" />
      <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11Z" />
    </svg>
  );
}

const meta = {
  title: "Altarev/EmptyState",
  component: EmptyState,
} satisfies Meta<typeof EmptyState>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "No reports yet",
    description: "Create one when you are ready to test the empty screen.",
  },
};

export const WithAction: Story = {
  args: {
    title: "No reports yet",
    description: "Create your first report to get started.",
    children: <Button size="sm">Create report</Button>,
  },
};

export const WithIcon: Story = {
  args: {
    icon: <InboxIcon />,
    title: "Your inbox is empty",
    description: "New messages will appear here.",
    children: <Button size="sm">Refresh</Button>,
  },
};
