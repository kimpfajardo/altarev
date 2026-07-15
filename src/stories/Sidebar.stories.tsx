import type { Meta, StoryObj } from "@storybook/react-vite";
import { Sidebar, SidebarItem, SidebarSection } from "../index";

const meta = {
  title: "Altarev/Sidebar",
  component: Sidebar,
} satisfies Meta<typeof Sidebar>;

export default meta;

type Story = StoryObj<typeof meta>;

function Icon({ path }: { path: string }) {
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
      <path d={path} />
    </svg>
  );
}

const dashboardPath = "M3 13h8V3H3v10Zm10 8h8V3h-8v18ZM3 21h8v-6H3v6Z";
const reportsPath = "M4 19.5V4a2 2 0 0 1 2-2h12v20H6a2 2 0 0 1-2-2.5Z";
const teamPath =
  "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75";

export const Default: Story = {
  args: {
    children: null,
  },
  render: () => (
    <div className="h-[420px] overflow-hidden rounded-[8px] bg-surface">
      <Sidebar>
        <SidebarSection title="Main">
          <SidebarItem
            href="#"
            label="Dashboard"
            active
            icon={<Icon path={dashboardPath} />}
          />
          <SidebarItem
            href="#"
            label="Reports"
            icon={<Icon path={reportsPath} />}
          />
        </SidebarSection>
        <SidebarSection title="Settings" divider>
          <SidebarItem href="#" label="Team" icon={<Icon path={teamPath} />} />
        </SidebarSection>
      </Sidebar>
    </div>
  ),
};

export const Collapsed: Story = {
  args: {
    collapsed: true,
    children: null,
  },
  render: () => (
    <div className="h-[420px] overflow-hidden rounded-[8px] bg-surface">
      <Sidebar collapsed>
        <SidebarSection>
          <SidebarItem
            href="#"
            label="Dashboard"
            active
            icon={<Icon path={dashboardPath} />}
          />
          <SidebarItem
            href="#"
            label="Reports"
            icon={<Icon path={reportsPath} />}
          />
          <SidebarItem href="#" label="Team" icon={<Icon path={teamPath} />} />
        </SidebarSection>
      </Sidebar>
    </div>
  ),
};

export const SideBySide: Story = {
  args: {
    children: null,
  },
  render: () => (
    <div className="flex h-[420px] gap-6 overflow-hidden rounded-[8px] bg-surface">
      <Sidebar>
        <SidebarSection title="Main">
          <SidebarItem
            href="#"
            label="Dashboard"
            active
            icon={<Icon path={dashboardPath} />}
          />
          <SidebarItem
            href="#"
            label="Reports"
            icon={<Icon path={reportsPath} />}
          />
        </SidebarSection>
        <SidebarSection title="Settings" divider>
          <SidebarItem href="#" label="Team" icon={<Icon path={teamPath} />} />
        </SidebarSection>
      </Sidebar>
      <Sidebar collapsed>
        <SidebarSection>
          <SidebarItem
            href="#"
            label="Dashboard"
            active
            icon={<Icon path={dashboardPath} />}
          />
          <SidebarItem
            href="#"
            label="Reports"
            icon={<Icon path={reportsPath} />}
          />
        </SidebarSection>
      </Sidebar>
    </div>
  ),
};
