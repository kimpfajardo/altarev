import { type ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

const container = cva(
  "inline-flex items-center gap-1 rounded-[12px] bg-background p-1",
  {
    variants: {
      size: {
        sm: "h-10",
        md: "h-12",
      },
    },
    defaultVariants: { size: "md" },
  },
);

const segment = cva(
  "inline-flex h-full flex-1 items-center justify-center gap-2 rounded-[8px] px-3 text-sm font-bold whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-text focus-visible:outline-offset-2 [&_svg]:size-5",
  {
    variants: {
      active: {
        true: "bg-surface text-text shadow-sm",
        false: "text-text-muted hover:text-text",
      },
    },
    defaultVariants: { active: false },
  },
);

export interface SegmentedItem {
  value: string;
  label?: ReactNode;
  icon?: ReactNode;
}

export interface SegmentedControlProps
  extends
    VariantProps<typeof container>,
    Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  items: SegmentedItem[];
  value: string;
  onChange: (value: string) => void;
}

export function SegmentedControl({
  items,
  value,
  onChange,
  size = "md",
  className,
  ...props
}: SegmentedControlProps) {
  return (
    <div
      role="tablist"
      className={cn(container({ size }), className)}
      {...props}
    >
      {items.map((item) => {
        const active = item.value === value;
        return (
          <button
            key={item.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(item.value)}
            className={segment({ active })}
          >
            {item.icon}
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
