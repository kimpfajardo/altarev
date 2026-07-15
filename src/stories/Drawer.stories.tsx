import { useState, type ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button, Drawer } from "../index";

const meta = {
  title: "Altarev/Drawer",
  component: Drawer,
} satisfies Meta<typeof Drawer>;

export default meta;

type Story = StoryObj<typeof meta>;

const baseArgs = {
  open: false,
  children: null as ReactNode,
};

function DefaultDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open drawer</Button>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <div className="flex flex-col gap-4 p-6">
          <h2 className="text-lg font-bold text-text">Drawer title</h2>
          <p className="text-sm text-text">Drawer body for visual testing.</p>
        </div>
      </Drawer>
    </>
  );
}

function LeftDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Open left drawer
      </Button>
      <Drawer open={open} onClose={() => setOpen(false)} side="left">
        <div className="flex flex-col gap-4 p-6">
          <h2 className="text-lg font-bold text-text">Filters</h2>
          <p className="text-sm text-text">
            A drawer sliding in from the left.
          </p>
        </div>
      </Drawer>
    </>
  );
}

function BottomDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Open bottom drawer
      </Button>
      <Drawer open={open} onClose={() => setOpen(false)} side="bottom">
        <div className="flex flex-col gap-4 p-6">
          <h2 className="text-lg font-bold text-text">Quick actions</h2>
          <p className="text-sm text-text">
            A drawer sliding up from the bottom.
          </p>
        </div>
      </Drawer>
    </>
  );
}

function ActionsDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Edit settings</Button>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <div className="flex h-full flex-col gap-4 p-6">
          <h2 className="text-lg font-bold text-text">Edit settings</h2>
          <p className="text-sm text-text">
            Make changes to your workspace settings here.
          </p>
          <div className="mt-auto flex justify-end gap-3">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setOpen(false)}>Save</Button>
          </div>
        </div>
      </Drawer>
    </>
  );
}

export const Default: Story = {
  args: baseArgs,
  render: () => <DefaultDemo />,
};

export const LeftSide: Story = {
  args: baseArgs,
  render: () => <LeftDemo />,
};

export const BottomSide: Story = {
  args: baseArgs,
  render: () => <BottomDemo />,
};

export const WithActions: Story = {
  args: baseArgs,
  render: () => <ActionsDemo />,
};
