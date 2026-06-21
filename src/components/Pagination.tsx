import { cn } from "../lib/cn";

export const DOTS = "…";

export function paginationRange(
  current: number,
  total: number,
  siblings = 1,
): (number | typeof DOTS)[] {
  const totalShown = siblings * 2 + 5;
  if (total <= totalShown) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  const left = Math.max(current - siblings, 1);
  const right = Math.min(current + siblings, total);
  const showLeftDots = left > 2;
  const showRightDots = right < total - 1;

  if (!showLeftDots && showRightDots) {
    const len = siblings * 2 + 3;
    return [...Array.from({ length: len }, (_, i) => i + 1), DOTS, total];
  }
  if (showLeftDots && !showRightDots) {
    const len = siblings * 2 + 3;
    return [
      1,
      DOTS,
      ...Array.from({ length: len }, (_, i) => total - len + 1 + i),
    ];
  }
  return [
    1,
    DOTS,
    ...Array.from({ length: right - left + 1 }, (_, i) => left + i),
    DOTS,
    total,
  ];
}

export interface PaginationProps extends Omit<
  React.HTMLAttributes<HTMLElement>,
  "onChange"
> {
  page: number;
  total: number;
  siblings?: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  page,
  total,
  siblings = 1,
  onPageChange,
  className,
  ...props
}: PaginationProps) {
  const range = paginationRange(page, total, siblings);

  return (
    <nav
      aria-label="Pagination"
      className={cn("flex items-center gap-1", className)}
      {...props}
    >
      <PageButton
        aria-label="Previous page"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
      >
        <Chevron dir="left" />
      </PageButton>

      {range.map((item, i) =>
        item === DOTS ? (
          <span key={`dots-${i}`} className="px-2 text-sm text-text-muted">
            {DOTS}
          </span>
        ) : (
          <PageButton
            key={item}
            aria-label={`Page ${item}`}
            aria-current={item === page ? "page" : undefined}
            selected={item === page}
            onClick={() => onPageChange(item)}
          >
            {item}
          </PageButton>
        ),
      )}

      <PageButton
        aria-label="Next page"
        disabled={page >= total}
        onClick={() => onPageChange(page + 1)}
      >
        <Chevron dir="right" />
      </PageButton>
    </nav>
  );
}

function PageButton({
  selected,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { selected?: boolean }) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex size-8 items-center justify-center rounded-[8px] text-sm transition-colors",
        "focus-visible:outline-2 focus-visible:outline-text focus-visible:outline-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        selected
          ? "bg-primary font-bold text-white"
          : "text-text hover:bg-hover",
        className,
      )}
      {...props}
    />
  );
}

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg
      className={cn("size-4", dir === "left" && "rotate-180")}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="m6 4 4 4-4 4" />
    </svg>
  );
}
