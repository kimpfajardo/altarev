import { type ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

const field = cva(
  "w-full appearance-none rounded-[8px] border bg-surface text-sm text-text outline-none transition-shadow disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "h-8 px-2",
        md: "h-10 px-3",
        lg: "h-12 px-3",
        xl: "h-14 px-4",
      },
      invalid: {
        true: "border-[2px] border-[var(--color-input-error)]",
        false:
          "border-border hover:border-text-muted focus:border-[1.5px] focus:border-primary focus:ring-2 focus:ring-primary-tint",
      },
    },
    defaultVariants: { size: "md", invalid: false },
  },
);

export interface SelectProps
  extends
    VariantProps<typeof field>,
    Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  label?: ReactNode;
  leadingIcon?: ReactNode;
  error?: ReactNode;
  helperText?: ReactNode;
}

export function Select({
  size = "md",
  invalid,
  label,
  leadingIcon,
  error,
  helperText,
  className,
  id,
  disabled,
  children,
  ...props
}: SelectProps) {
  const isInvalid = invalid ?? Boolean(error);
  const hint = error ?? helperText;

  return (
    <div className={cn("flex w-full flex-col gap-1", className)}>
      {label && (
        <label htmlFor={id} className="text-sm font-bold text-text">
          {label}
        </label>
      )}
      <div className="relative">
        {leadingIcon && (
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-text-muted [&_svg]:size-5">
            {leadingIcon}
          </span>
        )}
        <select
          id={id}
          disabled={disabled}
          aria-invalid={isInvalid || undefined}
          className={cn(
            field({ size, invalid: isInvalid }),
            leadingIcon && "pl-10",
            "pr-9",
          )}
          {...props}
        >
          {children}
        </select>
        <ChevronDown className="pointer-events-none absolute inset-y-0 right-3 my-auto size-5 text-text-muted" />
      </div>
      {hint && (
        <span
          className={cn(
            "text-xs",
            error ? "text-[var(--color-input-error)]" : "text-text-muted",
          )}
        >
          {hint}
        </span>
      )}
    </div>
  );
}

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg
      className={className}
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
