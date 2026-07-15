import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Search } from "../index";

const meta = {
  title: "Altarev/Search",
  component: Search,
} satisfies Meta<typeof Search>;

export default meta;

type Story = StoryObj<typeof meta>;

const options = [
  { value: "atlas", label: "Atlas" },
  { value: "nova", label: "Nova" },
  { value: "pulse", label: "Pulse" },
  { value: "signal", label: "Signal" },
];

function ResultsList({ query }: { query: string }) {
  const matches = options.filter((item) =>
    item.label.toLowerCase().includes(query.trim().toLowerCase()),
  );
  return (
    <div className="flex flex-col">
      {matches.map((item) => (
        <button
          key={item.value}
          type="button"
          className="rounded-[8px] px-3 py-2 text-left text-sm text-text hover:bg-hover"
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

function SearchDemo({
  initial,
  open = true,
  loading = false,
  withResults = true,
}: {
  initial: string;
  open?: boolean;
  loading?: boolean;
  withResults?: boolean;
}) {
  const [value, setValue] = useState(initial);
  return (
    <div className="w-80">
      <Search
        value={value}
        onValueChange={setValue}
        open={open}
        loading={loading}
        results={
          withResults && value ? <ResultsList query={value} /> : undefined
        }
      />
    </div>
  );
}

const baseArgs = { value: "", onValueChange: () => undefined };

export const Default: Story = {
  args: baseArgs,
  render: () => <SearchDemo initial="nova" />,
};

export const Empty: Story = {
  args: baseArgs,
  render: () => <SearchDemo initial="zzz" withResults={false} />,
};

export const Loading: Story = {
  args: baseArgs,
  render: () => <SearchDemo initial="nova" loading />,
};

export const Closed: Story = {
  args: baseArgs,
  render: () => <SearchDemo initial="" open={false} />,
};
