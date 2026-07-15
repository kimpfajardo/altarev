import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  DataTable,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tag,
  type TableColumn,
} from "../index";

const meta = {
  title: "Altarev/Table",
  component: DataTable,
} satisfies Meta<typeof DataTable>;

export default meta;

type Story = StoryObj<typeof meta>;

interface ProjectRow {
  id: string;
  name: string;
  status: string;
  owner: string;
}

const rows: ProjectRow[] = [
  { id: "a1", name: "Atlas", status: "Active", owner: "Mika" },
  { id: "b2", name: "Nova", status: "Paused", owner: "Sana" },
  { id: "c3", name: "Pulse", status: "Active", owner: "Kim" },
  { id: "d4", name: "Signal", status: "Archived", owner: "Rio" },
];

const columns: TableColumn<ProjectRow>[] = [
  { key: "name", header: "Project", cell: (row) => row.name },
  { key: "status", header: "Status", cell: (row) => <Tag>{row.status}</Tag> },
  { key: "owner", header: "Owner", cell: (row) => row.owner },
];

const baseArgs = {
  columns: [] as TableColumn<unknown>[],
  data: [] as unknown[],
  rowKey: (row: unknown) => String(row),
};

function SelectableDemo() {
  const [selected, setSelected] = useState<string[]>(["a1"]);
  return (
    <div className="w-full overflow-hidden rounded-[8px] bg-surface">
      <DataTable
        columns={columns}
        data={rows}
        rowKey={(row) => row.id}
        selected={selected}
        onSelectedChange={setSelected}
        selectable
        zebra
      />
    </div>
  );
}

function PlainDemo() {
  return (
    <div className="w-full overflow-hidden rounded-[8px] bg-surface">
      <DataTable columns={columns} data={rows} rowKey={(row) => row.id} />
    </div>
  );
}

function CompactDemo() {
  return (
    <div className="w-full overflow-hidden rounded-[8px] bg-surface">
      <DataTable
        columns={columns}
        data={rows}
        rowKey={(row) => row.id}
        size="sm"
        zebra
      />
    </div>
  );
}

function ComposedDemo() {
  return (
    <div className="w-full overflow-hidden rounded-[8px] bg-surface">
      <Table>
        <TableHead>
          <TableRow hover={false}>
            <TableCell header>Project</TableCell>
            <TableCell header>Status</TableCell>
            <TableCell header>Owner</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id} zebra>
              <TableCell>{row.name}</TableCell>
              <TableCell>
                <Tag>{row.status}</Tag>
              </TableCell>
              <TableCell>{row.owner}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export const Default: Story = {
  args: baseArgs,
  render: () => <SelectableDemo />,
};

export const Plain: Story = {
  args: baseArgs,
  render: () => <PlainDemo />,
};

export const Compact: Story = {
  args: baseArgs,
  render: () => <CompactDemo />,
};

export const Composed: Story = {
  args: baseArgs,
  render: () => <ComposedDemo />,
};
