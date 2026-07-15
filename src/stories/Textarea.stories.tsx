import type { Meta, StoryObj } from "@storybook/react-vite";
import { Textarea } from "../index";

const meta = {
  title: "Altarev/Textarea",
  component: Textarea,
} satisfies Meta<typeof Textarea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: "textarea-default",
    label: "Notes",
    placeholder: "Write your notes here",
    className: "max-w-sm",
  },
};

export const WithHelperText: Story = {
  args: {
    id: "textarea-helper",
    label: "Notes",
    defaultValue: "Visual testing copy.",
    helperText: "Helper text",
    className: "max-w-sm",
  },
};

export const WithError: Story = {
  args: {
    id: "textarea-error",
    label: "Notes",
    defaultValue: "Too short",
    error: "Please provide at least 20 characters.",
    className: "max-w-sm",
  },
};

export const Disabled: Story = {
  args: {
    id: "textarea-disabled",
    label: "Notes",
    defaultValue: "These notes cannot be edited.",
    disabled: true,
    className: "max-w-sm",
  },
};
