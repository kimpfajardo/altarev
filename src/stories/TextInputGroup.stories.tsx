import type { Meta, StoryObj } from "@storybook/react-vite";
import { TextInputGroup, GroupField } from "../index";

const meta = {
  title: "Altarev/TextInputGroup",
  component: TextInputGroup,
} satisfies Meta<typeof TextInputGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    className: "max-w-xl",
    children: (
      <>
        <GroupField placeholder="First name" />
        <GroupField placeholder="Last name" />
        <GroupField select defaultValue="ph">
          <option value="ph">Philippines</option>
          <option value="us">United States</option>
          <option value="jp">Japan</option>
        </GroupField>
      </>
    ),
  },
};

export const Horizontal: Story = {
  args: {
    direction: "horizontal",
    className: "max-w-xl",
    children: (
      <>
        <GroupField placeholder="City" />
        <GroupField placeholder="State" />
        <GroupField placeholder="ZIP" />
      </>
    ),
  },
};

export const WithErrors: Story = {
  args: {
    className: "max-w-xl",
    errors: ["First name is required.", "Last name is required."],
    children: (
      <>
        <GroupField placeholder="First name" invalid />
        <GroupField placeholder="Last name" invalid />
      </>
    ),
  },
};
