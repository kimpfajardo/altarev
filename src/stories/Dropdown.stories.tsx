import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button, Dropdown, DropdownItem } from "../index";

const meta = {
  title: "Altarev/Dropdown",
  component: Dropdown,
} satisfies Meta<typeof Dropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

function PlusIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export const Default: Story = {
  args: {
    trigger: <Button variant="outline">Dropdown</Button>,
    children: (
      <>
        <DropdownItem selected>Overview</DropdownItem>
        <DropdownItem description="Secondary text">Reports</DropdownItem>
        <DropdownItem disabled>Disabled</DropdownItem>
      </>
    ),
  },
};

export const WithLeadingIcons: Story = {
  args: {
    trigger: <Button>Actions</Button>,
    children: (
      <>
        <DropdownItem leading={<PlusIcon />}>New project</DropdownItem>
        <DropdownItem leading={<PlusIcon />}>New report</DropdownItem>
        <DropdownItem leading={<PlusIcon />}>New team</DropdownItem>
      </>
    ),
  },
};

export const AlignEnd: Story = {
  args: {
    align: "end",
    trigger: <Button variant="outline">Aligned end</Button>,
    children: (
      <>
        <DropdownItem>Edit</DropdownItem>
        <DropdownItem>Duplicate</DropdownItem>
        <DropdownItem>Archive</DropdownItem>
      </>
    ),
  },
};
