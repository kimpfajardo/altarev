import { type ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

const bubble = cva(
  "pointer-events-none absolute z-50 w-max max-w-xs rounded-[4px] bg-surface px-3 py-3 text-xs leading-4 text-text opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100",
  {
    variants: {
      placement: {
        top: "bottom-full left-1/2 mb-2 -translate-x-1/2",
        "top-start": "bottom-full left-0 mb-2",
        "top-end": "bottom-full right-0 mb-2",
        bottom: "top-full left-1/2 mt-2 -translate-x-1/2",
        "bottom-start": "top-full left-0 mt-2",
        "bottom-end": "top-full right-0 mt-2",
        left: "right-full top-1/2 mr-2 -translate-y-1/2",
        right: "left-full top-1/2 ml-2 -translate-y-1/2",
      },
      shadow: {
        true: "shadow-[0_0_1px_rgba(0,0,0,0.4),0_6px_6px_-6px_rgba(0,0,0,0.16)]",
        false: "",
      },
    },
    defaultVariants: { placement: "top", shadow: true },
  },
);

const arrow = cva("absolute size-2 rotate-45 bg-surface", {
  variants: {
    placement: {
      top: "bottom-[-4px] left-1/2 -translate-x-1/2",
      "top-start": "bottom-[-4px] left-3",
      "top-end": "bottom-[-4px] right-3",
      bottom: "top-[-4px] left-1/2 -translate-x-1/2",
      "bottom-start": "top-[-4px] left-3",
      "bottom-end": "top-[-4px] right-3",
      left: "right-[-4px] top-1/2 -translate-y-1/2",
      right: "left-[-4px] top-1/2 -translate-y-1/2",
    },
  },
  defaultVariants: { placement: "top" },
});

export interface TooltipProps extends VariantProps<typeof bubble> {
  content: ReactNode;
  pointer?: boolean;
  children: ReactNode;
  className?: string;
}

export function Tooltip({
  content,
  placement = "top",
  shadow = true,
  pointer = true,
  children,
  className,
}: TooltipProps) {
  return (
    <span className={cn("group relative inline-flex", className)}>
      {children}
      <span role="tooltip" className={bubble({ placement, shadow })}>
        {content}
        {pointer && <span className={arrow({ placement })} aria-hidden />}
      </span>
    </span>
  );
}
