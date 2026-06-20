import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "../lib/cn";

export interface CheckboxProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  label?: ReactNode;
  indeterminate?: boolean;
}

export function Checkbox({
  label,
  indeterminate = false,
  className,
  disabled,
  ...props
}: CheckboxProps) {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) ref.current.indeterminate = indeterminate;
  }, [indeterminate]);

  const input = (
    <span className="relative inline-flex size-6 shrink-0">
      <input
        ref={ref}
        type="checkbox"
        disabled={disabled}
        className={cn(
          "peer size-6 cursor-pointer appearance-none rounded-[4px] border-[1.5px] border-text-muted bg-transparent transition-colors",
          "checked:border-primary checked:bg-primary indeterminate:border-primary indeterminate:bg-primary",
          "focus-visible:outline-2 focus-visible:outline-text focus-visible:outline-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      />
      <svg
        className="pointer-events-none absolute inset-0 m-auto hidden size-4 text-white peer-checked:block peer-indeterminate:hidden"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="m3 8 3.5 3.5L13 5" />
      </svg>
      <svg
        className="pointer-events-none absolute inset-0 m-auto hidden size-4 text-white peer-indeterminate:block"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        aria-hidden
      >
        <path d="M4 8h8" />
      </svg>
    </span>
  );

  if (!label) return input;

  return (
    <label
      className={cn(
        "inline-flex items-center gap-2 text-sm text-text",
        disabled && "cursor-not-allowed opacity-50",
      )}
    >
      {input}
      {label}
    </label>
  );
}
