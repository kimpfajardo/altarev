import { type ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";
import { Checkbox } from "./Checkbox";

const cell = cva("px-3 text-left text-sm text-text", {
  variants: {
    size: {
      xs: "h-6",
      sm: "h-8",
      md: "h-10",
      lg: "h-12",
      xl: "h-14",
      "2xl": "h-16",
    },
  },
  defaultVariants: { size: "md" },
});

export function Table({
  className,
  ...props
}: React.TableHTMLAttributes<HTMLTableElement>) {
  return (
    <table
      className={cn("w-full border-collapse text-text", className)}
      {...props}
    />
  );
}

export function TableHead({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead className={cn("border-b border-border", className)} {...props} />
  );
}

export function TableBody(
  props: React.HTMLAttributes<HTMLTableSectionElement>,
) {
  return <tbody {...props} />;
}

export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  zebra?: boolean;
  hover?: boolean;
  selected?: boolean;
}

export function TableRow({
  zebra,
  hover = true,
  selected,
  className,
  ...props
}: TableRowProps) {
  return (
    <tr
      aria-selected={selected || undefined}
      className={cn(
        "border-b border-border",
        zebra && "even:bg-background",
        hover && "hover:bg-hover",
        selected && "bg-primary-tint",
        className,
      )}
      {...props}
    />
  );
}

export interface TableCellProps
  extends
    VariantProps<typeof cell>,
    React.TdHTMLAttributes<HTMLTableCellElement> {
  header?: boolean;
}

export function TableCell({
  size = "md",
  header,
  className,
  ...props
}: TableCellProps) {
  const Tag = header ? "th" : "td";
  return (
    <Tag
      className={cn(
        cell({ size }),
        header && "font-bold text-text-muted",
        className,
      )}
      {...props}
    />
  );
}

export interface TableColumn<T> {
  key: string;
  header: ReactNode;
  cell: (row: T) => ReactNode;
}

export function selectionState(selectedCount: number, total: number) {
  return {
    checked: total > 0 && selectedCount === total,
    indeterminate: selectedCount > 0 && selectedCount < total,
  };
}

export interface DataTableProps<T> extends VariantProps<typeof cell> {
  columns: TableColumn<T>[];
  data: T[];
  rowKey: (row: T) => string;
  zebra?: boolean;
  selectable?: boolean;
  selected?: string[];
  onSelectedChange?: (keys: string[]) => void;
  className?: string;
}

export function DataTable<T>({
  columns,
  data,
  rowKey,
  size = "md",
  zebra,
  selectable,
  selected = [],
  onSelectedChange,
  className,
}: DataTableProps<T>) {
  const allKeys = data.map(rowKey);
  const { checked, indeterminate } = selectionState(
    selected.length,
    allKeys.length,
  );

  const toggleAll = () => onSelectedChange?.(checked ? [] : allKeys);
  const toggleRow = (key: string) =>
    onSelectedChange?.(
      selected.includes(key)
        ? selected.filter((k) => k !== key)
        : [...selected, key],
    );

  return (
    <Table className={className}>
      <TableHead>
        <tr className="border-b border-border">
          {selectable && (
            <TableCell header size={size} className="w-px">
              <Checkbox
                checked={checked}
                indeterminate={indeterminate}
                onChange={toggleAll}
                aria-label="Select all rows"
              />
            </TableCell>
          )}
          {columns.map((col) => (
            <TableCell key={col.key} header size={size}>
              {col.header}
            </TableCell>
          ))}
        </tr>
      </TableHead>
      <TableBody>
        {data.map((row) => {
          const key = rowKey(row);
          const isSelected = selected.includes(key);
          return (
            <TableRow key={key} zebra={zebra} selected={isSelected}>
              {selectable && (
                <TableCell size={size} className="w-px">
                  <Checkbox
                    checked={isSelected}
                    onChange={() => toggleRow(key)}
                    aria-label={`Select row`}
                  />
                </TableCell>
              )}
              {columns.map((col) => (
                <TableCell key={col.key} size={size}>
                  {col.cell(row)}
                </TableCell>
              ))}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
