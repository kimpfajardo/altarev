import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Pagination, type PaginationProps } from "../index";

const meta = {
  title: "Altarev/Pagination",
  component: Pagination,
} satisfies Meta<typeof Pagination>;

export default meta;

type Story = StoryObj<typeof meta>;

function ControlledPagination(props: PaginationProps) {
  const [page, setPage] = useState(props.page);
  return <Pagination {...props} page={page} onPageChange={setPage} />;
}

export const Default: Story = {
  args: { page: 4, total: 12, onPageChange: () => undefined },
  render: (args) => <ControlledPagination {...args} />,
};

export const FirstPage: Story = {
  args: { page: 1, total: 12, onPageChange: () => undefined },
  render: (args) => <ControlledPagination {...args} />,
};

export const LastPage: Story = {
  args: { page: 12, total: 12, onPageChange: () => undefined },
  render: (args) => <ControlledPagination {...args} />,
};

export const FewPages: Story = {
  args: { page: 2, total: 5, onPageChange: () => undefined },
  render: (args) => <ControlledPagination {...args} />,
};

export const ManySiblings: Story = {
  args: { page: 10, total: 24, siblings: 2, onPageChange: () => undefined },
  render: (args) => <ControlledPagination {...args} />,
};
