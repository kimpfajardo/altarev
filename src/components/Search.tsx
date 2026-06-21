import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "../lib/cn";
import { Loader } from "./Loader";

export interface SearchProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "results"
> {
  value: string;
  onValueChange: (value: string) => void;
  results?: ReactNode;
  loading?: boolean;
  emptyState?: ReactNode;
  resultsTitle?: ReactNode;
  shortcut?: string;
  mobile?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function Search({
  value,
  onValueChange,
  results,
  loading = false,
  emptyState = "No results",
  resultsTitle = "Search results",
  shortcut = "⌘K",
  mobile = false,
  open: controlledOpen,
  onOpenChange,
  placeholder = "Search…",
  className,
  ...props
}: SearchProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const setOpen = (next: boolean) => {
    if (!isControlled) setUncontrolledOpen(next);
    onOpenChange?.(next);
  };

  useEffect(() => {
    if (!open || mobile) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  });

  const hasResults = Boolean(results);

  const inputRow = (
    <div className="flex h-14 items-center gap-3 px-4">
      {loading ? (
        <Loader size="2xs" className="text-text-muted" />
      ) : (
        <SearchIcon className="size-6 shrink-0 text-text-muted" />
      )}
      <input
        ref={inputRef}
        type="search"
        value={value}
        placeholder={placeholder}
        role="searchbox"
        className="flex-1 bg-transparent text-sm text-text outline-none placeholder:text-text-muted [&::-webkit-search-cancel-button]:hidden"
        onChange={(e) => onValueChange(e.target.value)}
        onFocus={() => setOpen(true)}
        {...props}
      />
      {value ? (
        <button
          type="button"
          aria-label="Clear search"
          onClick={() => {
            onValueChange("");
            inputRef.current?.focus();
          }}
          className="inline-flex size-6 shrink-0 items-center justify-center rounded-full text-text-muted hover:bg-hover hover:text-text"
        >
          <svg
            viewBox="0 0 24 24"
            className="size-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      ) : (
        shortcut && (
          <kbd className="shrink-0 text-xs text-text-muted">{shortcut}</kbd>
        )
      )}
    </div>
  );

  const panel = (
    <>
      <div className="border-t border-border" />
      {hasResults && (
        <div className="px-6 py-3 text-sm font-bold text-text-muted">
          {resultsTitle}
        </div>
      )}
      <div className="max-h-80 overflow-auto p-1">
        {loading ? (
          <div className="flex justify-center py-8">
            <Loader />
          </div>
        ) : hasResults ? (
          results
        ) : (
          <div className="px-3 py-8 text-center text-sm text-text-muted">
            {emptyState}
          </div>
        )}
      </div>
    </>
  );

  if (mobile && open) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col bg-surface">
        <div className="flex items-center">
          <div className="flex-1">{inputRow}</div>
          <button
            type="button"
            aria-label="Close search"
            onClick={() => setOpen(false)}
            className="px-4 text-sm font-bold text-primary"
          >
            Cancel
          </button>
        </div>
        {panel}
      </div>
    );
  }

  return (
    <div ref={rootRef} className={cn("relative w-full", className)}>
      <div className="rounded-[12px] border border-border bg-surface">
        {inputRow}
        {open && panel}
      </div>
    </div>
  );
}

function SearchIcon({ className }: { className?: string }) {
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
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
