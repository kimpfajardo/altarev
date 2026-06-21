import {
  Children,
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";
import { cn } from "../lib/cn";

type Direction = "vertical" | "horizontal";

const cellBase =
  "relative flex w-full items-center rounded-[8px] border-[1.5px] border-transparent";
const cellActive =
  "focus-within:z-10 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary-tint";
const cellError =
  "z-10 border-[var(--color-input-error)] focus-within:border-[var(--color-input-error)]";

export interface GroupFieldProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size"
> {
  select?: boolean;
  invalid?: boolean;
  children?: ReactNode;
}

export function GroupField({
  select,
  invalid,
  className,
  children,
  ...props
}: GroupFieldProps) {
  const cell = cn(cellBase, invalid ? cellError : cellActive, className);

  if (select) {
    return (
      <div className={cell}>
        <select
          className="w-full appearance-none bg-transparent px-4 py-4 pr-10 text-base text-text outline-none disabled:cursor-not-allowed disabled:opacity-50"
          {...(props as React.SelectHTMLAttributes<HTMLSelectElement>)}
        >
          {children}
        </select>
        <ChevronDown className="pointer-events-none absolute right-4 size-5 text-text-muted" />
      </div>
    );
  }

  return (
    <div className={cell}>
      <input
        className="w-full bg-transparent px-4 py-4 text-base text-text outline-none placeholder:text-text-muted disabled:cursor-not-allowed disabled:opacity-50"
        {...props}
      />
      {children}
    </div>
  );
}

export interface TextInputGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: Direction;
  errors?: ReactNode[];
  children: ReactNode;
}

export function TextInputGroup({
  direction = "vertical",
  errors,
  className,
  children,
  ...props
}: TextInputGroupProps) {
  const fields = Children.toArray(children).filter(isValidElement);

  return (
    <div className={cn("flex w-full flex-col gap-1", className)} {...props}>
      <div
        className={cn(
          "flex rounded-[8px] border border-border bg-surface",
          direction === "vertical"
            ? "flex-col divide-y divide-border"
            : "flex-row divide-x divide-border",
        )}
      >
        {fields.map((child, i) =>
          cloneElement(child as ReactElement<{ className?: string }>, {
            key: i,
            className: cn(
              "-m-px",
              direction === "horizontal" && "flex-1",
              (child as ReactElement<{ className?: string }>).props.className,
            ),
          }),
        )}
      </div>
      {errors?.filter(Boolean).map((msg, i) => (
        <span key={i} className="px-1 text-xs text-[var(--color-input-error)]">
          {msg}
        </span>
      ))}
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
