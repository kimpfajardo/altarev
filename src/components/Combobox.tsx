import { useMemo, useState, type ReactNode } from "react";
import { cn } from "../lib/cn";
import { Chip } from "./Chip";

export interface ComboboxOption {
  value: string;
  label: string;
}

export function filterOptions(options: ComboboxOption[], query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return options;
  return options.filter((o) => o.label.toLowerCase().includes(q));
}

interface BaseProps {
  options: ComboboxOption[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  emptyMessage?: ReactNode;
}

export type ComboboxProps =
  | (BaseProps & {
      multiple?: false;
      value: string | null;
      onChange: (value: string | null) => void;
    })
  | (BaseProps & {
      multiple: true;
      value: string[];
      onChange: (value: string[]) => void;
    });

export function Combobox(props: ComboboxProps) {
  const {
    options,
    placeholder = "Select…",
    disabled,
    className,
    emptyMessage = "No results",
  } = props;
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const filtered = useMemo(
    () => filterOptions(options, query),
    [options, query],
  );
  const selectedValues = props.multiple
    ? props.value
    : props.value
      ? [props.value]
      : [];
  const labelFor = (v: string) =>
    options.find((o) => o.value === v)?.label ?? v;

  const isSelected = (v: string) => selectedValues.includes(v);

  const commit = (v: string) => {
    if (props.multiple) {
      const set = new Set(props.value);
      if (set.has(v)) set.delete(v);
      else set.add(v);
      props.onChange([...set]);
      setQuery("");
    } else {
      props.onChange(v);
      setQuery("");
      setOpen(false);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const opt = filtered[activeIndex];
      if (opt) commit(opt.value);
    } else if (e.key === "Escape") {
      setOpen(false);
    } else if (
      e.key === "Backspace" &&
      !query &&
      props.multiple &&
      props.value.length
    ) {
      props.onChange(props.value.slice(0, -1));
    }
  };

  const singleSelectedLabel =
    !props.multiple && props.value ? labelFor(props.value) : "";

  return (
    <div className={cn("relative w-full", className)}>
      <div
        className={cn(
          "flex min-h-10 w-full flex-wrap items-center gap-1 rounded-[8px] border border-border bg-surface px-2 py-1 text-sm",
          "focus-within:border-[1.5px] focus-within:border-primary",
          disabled && "pointer-events-none opacity-50",
        )}
        onClick={() => setOpen(true)}
      >
        {props.multiple &&
          props.value.map((v) => (
            <Chip
              key={v}
              size="sm"
              onDismiss={() =>
                props.onChange(props.value.filter((x) => x !== v))
              }
            >
              {labelFor(v)}
            </Chip>
          ))}
        <input
          className="min-w-[60px] flex-1 bg-transparent text-text outline-none placeholder:text-text-muted"
          value={query || (!open ? singleSelectedLabel : "")}
          placeholder={selectedValues.length ? "" : placeholder}
          disabled={disabled}
          role="combobox"
          aria-expanded={open}
          aria-autocomplete="list"
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
            setActiveIndex(0);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 120)}
          onKeyDown={onKeyDown}
        />
        <ChevronDown
          className={cn(
            "size-5 shrink-0 text-text-muted transition-transform",
            open && "rotate-180",
          )}
        />
      </div>

      {open && (
        <ul
          role="listbox"
          className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-[12px] border border-border bg-surface p-1 shadow-lg"
        >
          {filtered.length === 0 ? (
            <li className="px-3 py-2 text-sm text-text-muted">
              {emptyMessage}
            </li>
          ) : (
            filtered.map((opt, i) => (
              <li
                key={opt.value}
                role="option"
                aria-selected={isSelected(opt.value)}
                onMouseEnter={() => setActiveIndex(i)}
                onMouseDown={(e) => {
                  e.preventDefault();
                  commit(opt.value);
                }}
                className={cn(
                  "flex cursor-pointer items-center justify-between rounded-[8px] px-3 py-2 text-sm text-text",
                  i === activeIndex && "bg-hover",
                )}
              >
                {opt.label}
                {isSelected(opt.value) && (
                  <Check className="size-4 text-primary" />
                )}
              </li>
            ))
          )}
        </ul>
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

function Check({ className }: { className?: string }) {
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
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
