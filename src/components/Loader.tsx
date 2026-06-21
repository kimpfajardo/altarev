import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

const loader = cva(
  "inline-block animate-spin rounded-full border-current border-t-transparent text-primary",
  {
    variants: {
      size: {
        "2xs": "size-4 border-2",
        xs: "size-6 border-2",
        sm: "size-8 border-[3px]",
        md: "size-10 border-4",
        lg: "size-12 border-4",
      },
    },
    defaultVariants: { size: "md" },
  },
);

export interface LoaderProps
  extends
    VariantProps<typeof loader>,
    Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
  label?: string;
}

export function Loader({
  size = "md",
  label = "Loading",
  className,
  ...props
}: LoaderProps) {
  return (
    <span
      role="status"
      aria-label={label}
      className={cn(loader({ size }), className)}
      {...props}
    />
  );
}
