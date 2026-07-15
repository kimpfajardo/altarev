import type { Meta, StoryObj } from "@storybook/react-vite";
import { Breadcrumbs, type BreadcrumbItem } from "../index";

const items: BreadcrumbItem[] = [
  { label: "Home", href: "#" },
  { label: "Workspace", href: "#" },
  { label: "Reports", href: "#" },
  { label: "Quarterly", href: "#" },
  { label: "Current" },
];

const meta = {
  title: "Altarev/Breadcrumbs",
  component: Breadcrumbs,
} satisfies Meta<typeof Breadcrumbs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items,
  },
};

export const Collapsed: Story = {
  args: {
    items,
    maxItems: 3,
  },
};

export const Short: Story = {
  args: {
    items: [{ label: "Home", href: "#" }, { label: "Settings" }],
  },
};
