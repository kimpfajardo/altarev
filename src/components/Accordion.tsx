import { type ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

// ponytail: native <details>/<summary> gives open/close + keyboard + a11y for free.
// Moon's design is just sizing + a rotating chevron on top — no React state needed.

const accordion = cva(
  "group rounded-[8px] bg-surface text-text border border-border [&[open]>summary>svg]:rotate-180",
  {
    variants: {
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-sm",
        xl: "text-md",
      },
    },
    defaultVariants: { size: "md" },
  },
);

// Padding per size — shared by the summary (header) and the content panel.
const PAD = { sm: "p-2", md: "px-3 py-2", lg: "p-3", xl: "p-4" } as const;

const summary = cva(
  // marker:hidden kills the native disclosure triangle; focus ring follows Moon state model.
  "flex cursor-pointer list-none items-center gap-2 font-bold marker:hidden outline-none focus-visible:outline-2 focus-visible:outline-text focus-visible:outline-offset-2",
  {
    variants: { size: PAD },
    defaultVariants: { size: "md" },
  },
);

export interface AccordionProps
  extends
    VariantProps<typeof accordion>,
    Omit<React.DetailsHTMLAttributes<HTMLDetailsElement>, "title"> {
  title: ReactNode;
  /** Optional leading element (icon) before the title. */
  leading?: ReactNode;
  children: ReactNode;
}

export function Accordion({
  size = "md",
  title,
  leading,
  children,
  className,
  ...props
}: AccordionProps) {
  return (
    <details className={cn(accordion({ size }), className)} {...props}>
      <summary className={summary({ size })}>
        {leading}
        <span className="flex-1">{title}</span>
        <ChevronDown />
      </summary>
      <div className="border-t border-border" />
      <div className={PAD[size ?? "md"]}>{children}</div>
    </details>
  );
}

function ChevronDown() {
  return (
    <svg
      className="size-6 shrink-0 transition-transform duration-200 ease-in-out"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
