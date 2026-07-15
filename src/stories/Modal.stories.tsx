import { useState, type ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button, Modal } from "../index";

const meta = {
  title: "Altarev/Modal",
  component: Modal,
} satisfies Meta<typeof Modal>;

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
      <Button onClick={() => setOpen(true)}>Open modal</Button>
      <Modal open={open} onClose={() => setOpen(false)} title="Modal title">
        <p className="text-sm text-text">Modal body for visual testing.</p>
      </Modal>
    </>
  );
}

function ActionsDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button color="error" onClick={() => setOpen(true)}>
        Delete project
      </Button>
      <Modal open={open} onClose={() => setOpen(false)} title="Delete project">
        <div className="flex flex-col gap-6">
          <p className="text-sm text-text">
            This action cannot be undone. Are you sure you want to delete this
            project?
          </p>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button color="error" onClick={() => setOpen(false)}>
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

function LargeDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open large modal</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        size="lg"
        title="Large modal"
      >
        <p className="text-sm text-text">
          A wider modal for richer content layouts.
        </p>
      </Modal>
    </>
  );
}

function WithoutTitleDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Open modal
      </Button>
      <Modal open={open}>
        <p className="text-sm text-text">
          A modal without a title or close button in the header.
        </p>
      </Modal>
    </>
  );
}

export const Default: Story = {
  args: baseArgs,
  render: () => <DefaultDemo />,
};

export const WithActions: Story = {
  args: baseArgs,
  render: () => <ActionsDemo />,
};

export const Large: Story = {
  args: baseArgs,
  render: () => <LargeDemo />,
};

export const WithoutTitle: Story = {
  args: baseArgs,
  render: () => <WithoutTitleDemo />,
};
