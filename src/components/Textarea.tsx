import { useEffect, useRef, type ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

const field = cva(
  "w-full rounded-[8px] border bg-surface px-3 py-2 text-sm text-text outline-none transition-shadow placeholder:text-text-muted disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      invalid: {
        true: "border-[2px] border-[var(--color-input-error)]",
        false:
          "border-border hover:border-text-muted focus:border-[1.5px] focus:border-primary focus:ring-2 focus:ring-primary-tint",
      },
    },
    defaultVariants: { invalid: false },
  },
);

export interface TextareaProps
  extends
    VariantProps<typeof field>,
    React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: ReactNode;
  error?: ReactNode;
  helperText?: ReactNode;
  autoResize?: boolean;
}

export function Textarea({
  invalid,
  label,
  error,
  helperText,
  autoResize = false,
  className,
  id,
  disabled,
  value,
  onChange,
  rows = 3,
  ...props
}: TextareaProps) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const isInvalid = invalid ?? Boolean(error);
  const hint = error ?? helperText;

  const resize = () => {
    const el = ref.current;
    if (!el || !autoResize) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  };

  useEffect(resize, [value, autoResize]);

  return (
    <div className={cn("flex w-full flex-col gap-1", className)}>
      {label && (
        <label htmlFor={id} className="text-sm font-bold text-text">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        id={id}
        rows={rows}
        disabled={disabled}
        value={value}
        aria-invalid={isInvalid || undefined}
        className={cn(
          field({ invalid: isInvalid }),
          autoResize && "resize-none overflow-hidden",
        )}
        onChange={(e) => {
          onChange?.(e);
          resize();
        }}
        {...props}
      />
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
