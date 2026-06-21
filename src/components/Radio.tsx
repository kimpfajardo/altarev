import { type ReactNode } from "react";
import { cn } from "../lib/cn";

export interface RadioProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  label?: ReactNode;
}

export function Radio({ label, className, disabled, ...props }: RadioProps) {
  const input = (
    <span className="relative inline-flex size-6 shrink-0">
      <input
        type="radio"
        disabled={disabled}
        className={cn(
          "peer size-6 cursor-pointer appearance-none rounded-full border-[1.5px] border-text-muted bg-transparent transition-colors",
          "checked:border-primary",
          "focus-visible:outline-2 focus-visible:outline-text focus-visible:outline-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      />
      <span className="pointer-events-none absolute inset-0 m-auto size-3 scale-0 rounded-full bg-primary transition-transform peer-checked:scale-100" />
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
