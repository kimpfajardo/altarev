import { type ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

const track = cva(
  "peer relative inline-flex shrink-0 cursor-pointer appearance-none items-center rounded-full bg-border transition-colors checked:bg-primary focus-visible:outline-2 focus-visible:outline-text focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: {
        "2xs": "h-4 w-7",
        xs: "h-6 w-11",
        sm: "h-8 w-[60px]",
      },
    },
    defaultVariants: { size: "xs" },
  },
);

const thumb = cva(
  "pointer-events-none absolute left-0.5 rounded-full bg-surface transition-transform",
  {
    variants: {
      size: {
        "2xs": "size-3 peer-checked:translate-x-3",
        xs: "size-5 peer-checked:translate-x-5",
        sm: "size-7 peer-checked:translate-x-7",
      },
    },
    defaultVariants: { size: "xs" },
  },
);

export interface SwitchProps
  extends
    VariantProps<typeof track>,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  label?: ReactNode;
}

export function Switch({
  size = "xs",
  label,
  className,
  disabled,
  ...props
}: SwitchProps) {
  const control = (
    <span className="relative inline-flex">
      <input
        type="checkbox"
        role="switch"
        disabled={disabled}
        className={cn(track({ size }), className)}
        {...props}
      />
      <span className={thumb({ size })} aria-hidden />
    </span>
  );

  if (!label) return control;

  return (
    <label
      className={cn(
        "inline-flex items-center gap-2 text-sm text-text",
        disabled && "cursor-not-allowed opacity-50",
      )}
    >
      {control}
      {label}
    </label>
  );
}
