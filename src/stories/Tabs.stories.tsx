import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tabs, TabList, Tab, TabPanel, type TabsProps } from "../index";

const meta = {
  title: "Altarev/Tabs",
  component: Tabs,
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

function TabsDemo({
  type,
  size,
  initial = "overview",
}: {
  type?: TabsProps["type"];
  size?: TabsProps["size"];
  initial?: string;
}) {
  const [value, setValue] = useState(initial);
  const panelClass =
    type === "underline" || type === undefined
      ? "rounded-b-[8px] bg-surface p-4 text-sm text-text"
      : "p-4 text-sm text-text";
  return (
    <Tabs
      value={value}
      onValueChange={setValue}
      type={type}
      size={size}
      className="w-full max-w-xl"
    >
      <TabList>
        <Tab value="overview">Overview</Tab>
        <Tab value="activity">Activity</Tab>
        <Tab value="billing">Billing</Tab>
      </TabList>
      <TabPanel value="overview" className={panelClass}>
        Overview panel
      </TabPanel>
      <TabPanel value="activity" className={panelClass}>
        Activity panel
      </TabPanel>
      <TabPanel value="billing" className={panelClass}>
        Billing panel
      </TabPanel>
    </Tabs>
  );
}

const baseArgs = {
  value: "overview",
  onValueChange: () => undefined,
  children: null,
};

export const Default: Story = {
  args: baseArgs,
  render: () => <TabsDemo />,
};

export const Pill: Story = {
  args: baseArgs,
  render: () => <TabsDemo type="pill" />,
};

export const DefaultType: Story = {
  args: baseArgs,
  render: () => <TabsDemo type="default" initial="activity" />,
};

export const SmallSize: Story = {
  args: baseArgs,
  render: () => <TabsDemo size="sm" />,
};
