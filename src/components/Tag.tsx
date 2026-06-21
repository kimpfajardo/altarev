import { type ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

const tag = cva(
  "inline-flex items-center gap-1 rounded-[4px] bg-background font-bold text-text whitespace-nowrap",
  {
    variants: {
      size: {
        "2xs": "h-4 px-1 text-[10px] [&_svg]:size-3",
        xs: "h-6 px-2 text-xs [&_svg]:size-4",
      },
      uppercase: {
        true: "uppercase",
        false: "",
      },
    },
    defaultVariants: { size: "xs", uppercase: false },
  },
);

export interface TagProps
  extends VariantProps<typeof tag>, React.HTMLAttributes<HTMLSpanElement> {
  leading?: ReactNode;
  trailing?: ReactNode;
}

export function Tag({
  size = "xs",
  uppercase,
  leading,
  trailing,
  className,
  children,
  ...props
}: TagProps) {
  return (
    <span className={cn(tag({ size, uppercase }), className)} {...props}>
      {leading}
      {children}
      {trailing}
    </span>
  );
}
