import { type ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

const chip = cva(
  "inline-flex items-center gap-2 bg-surface text-text whitespace-nowrap",
  {
    variants: {
      size: {
        sm: "h-8 rounded-[4px] px-2 text-sm [&_svg]:size-4",
        md: "h-10 rounded-[8px] px-3 text-sm [&_svg]:size-6",
      },
    },
    defaultVariants: { size: "md" },
  },
);

export interface ChipProps
  extends VariantProps<typeof chip>, React.HTMLAttributes<HTMLSpanElement> {
  leading?: ReactNode;
  trailing?: ReactNode;
  onDismiss?: () => void;
}

export function Chip({
  size = "md",
  leading,
  trailing,
  onDismiss,
  className,
  children,
  ...props
}: ChipProps) {
  return (
    <span className={cn(chip({ size }), className)} {...props}>
      {leading}
      {children}
      {onDismiss ? (
        <button
          type="button"
          aria-label="Remove"
          onClick={onDismiss}
          className="-mr-1 inline-flex shrink-0 items-center justify-center rounded-full text-text-muted hover:text-text focus-visible:outline-2 focus-visible:outline-text focus-visible:outline-offset-2"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      ) : (
        trailing
      )}
    </span>
  );
}
