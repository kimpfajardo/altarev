import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button, Snackbar, ToastProvider, useToast } from "../index";

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
  title: "Altarev/Snackbar",
  component: Snackbar,
} satisfies Meta<typeof Snackbar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Saved changes",
    onClose: () => undefined,
  },
};

export const WithIcon: Story = {
  args: {
    icon: <CheckIcon />,
    children: "Your report is ready.",
    onClose: () => undefined,
  },
};

export const Persistent: Story = {
  args: {
    children: "Uploading files in the background.",
  },
};

function ToastButton() {
  const { toast } = useToast();
  return (
    <Button
      variant="outline"
      onClick={() =>
        toast({
          message: "Toast from provider",
          icon: <CheckIcon />,
          closable: true,
        })
      }
    >
      Show toast
    </Button>
  );
}

export const FromProvider: Story = {
  args: {
    children: "Toast from provider",
  },
  render: () => (
    <ToastProvider defaultDuration={0}>
      <ToastButton />
    </ToastProvider>
  ),
};
