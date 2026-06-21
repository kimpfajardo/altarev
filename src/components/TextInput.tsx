import { type ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

const field = cva(
  "w-full appearance-none rounded-[8px] border bg-surface text-sm text-text outline-none transition-shadow placeholder:text-text-muted disabled:cursor-not-allowed disabled:opacity-50",
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

export interface TextInputProps
  extends
    VariantProps<typeof field>,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: ReactNode;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  error?: ReactNode;
  helperText?: ReactNode;
  floatingLabel?: boolean;
}

export function TextInput({
  size = "md",
  invalid,
  label,
  leadingIcon,
  trailingIcon,
  error,
  helperText,
  floatingLabel = false,
  className,
  id,
  disabled,
  placeholder,
  ...props
}: TextInputProps) {
  const isInvalid = invalid ?? Boolean(error);
  const hint = error ?? helperText;
  const floating = floatingLabel && Boolean(label);

  return (
    <div className={cn("flex w-full flex-col gap-1", className)}>
      {label && !floating && (
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
        <input
          id={id}
          disabled={disabled}
          placeholder={floating ? " " : placeholder}
          aria-invalid={isInvalid || undefined}
          className={cn(
            field({ size, invalid: isInvalid }),
            "peer",
            leadingIcon && "pl-10",
            trailingIcon && "pr-10",
            floating && "placeholder-shown:[&::placeholder]:opacity-0",
          )}
          {...props}
        />
        {floating && (
          <label
            htmlFor={id}
            className={cn(
              "pointer-events-none absolute left-3 top-0 flex h-full origin-left items-center text-sm text-text-muted transition-all peer-focus:top-0 peer-focus:h-auto peer-focus:-translate-y-1/2 peer-focus:text-xs peer-focus:text-primary peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:h-auto peer-not-placeholder-shown:-translate-y-1/2 peer-not-placeholder-shown:text-xs",
              leadingIcon &&
                "left-10 peer-focus:left-3 peer-not-placeholder-shown:left-3",
              isInvalid && "peer-focus:text-[var(--color-input-error)]",
            )}
          >
            <span className="bg-surface px-1">{label}</span>
          </label>
        )}
        {trailingIcon && (
          <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-text-muted [&_svg]:size-5">
            {trailingIcon}
          </span>
        )}
      </div>
      {hint && (
        <span
          className={cn(
            "px-1 text-xs",
            error ? "text-[var(--color-input-error)]" : "text-text-muted",
          )}
        >
          {hint}
        </span>
      )}
    </div>
  );
}
