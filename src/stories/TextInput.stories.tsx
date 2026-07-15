import type { Meta, StoryObj } from "@storybook/react-vite";
import { TextInput } from "../index";

const meta = {
  title: "Altarev/TextInput",
  component: TextInput,
} satisfies Meta<typeof TextInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: "textinput-default",
    label: "Name",
    placeholder: "Company name",
    className: "max-w-xs",
  },
};

export const FloatingLabel: Story = {
  args: {
    id: "textinput-floating",
    label: "Floating label",
    defaultValue: "Revenue",
    floatingLabel: true,
    className: "max-w-xs",
  },
};

export const WithHelperText: Story = {
  args: {
    id: "textinput-helper",
    label: "Email",
    placeholder: "you@example.com",
    helperText: "We will never share your email.",
    className: "max-w-xs",
  },
};

export const WithError: Story = {
  args: {
    id: "textinput-error",
    label: "Email",
    defaultValue: "not-an-email",
    error: "Please enter a valid email address.",
    className: "max-w-xs",
  },
};

export const Disabled: Story = {
  args: {
    id: "textinput-disabled",
    label: "Name",
    defaultValue: "Acme Inc.",
    disabled: true,
    className: "max-w-xs",
  },
};
