import { cn } from "../lib/cn";

export interface QuarterValue {
  year: number;
  quarter: 1 | 2 | 3 | 4;
}

export interface QuarterPickerProps {
  value?: QuarterValue;
  onChange?: (value: QuarterValue) => void;
  year?: number;
  onYearChange?: (year: number) => void;
  className?: string;
}

const quarters = [1, 2, 3, 4] as const;
const monthsOf = (q: number) =>
  ["Jan–Mar", "Apr–Jun", "Jul–Sep", "Oct–Dec"][q - 1];

export function QuarterPicker({
  value,
  onChange,
  year = value?.year ?? new Date().getFullYear(),
  onYearChange,
  className,
}: QuarterPickerProps) {
  return (
    <div
      className={cn(
        "w-[280px] rounded-[12px] bg-surface p-4 text-text",
        className,
      )}
    >
      <div className="mb-2 flex h-10 items-center justify-between">
        <NavButton
          label="Previous year"
          onClick={() => onYearChange?.(year - 1)}
        >
          <path d="m15 18-6-6 6-6" />
        </NavButton>
        <span className="text-sm font-semibold">{year}</span>
        <NavButton label="Next year" onClick={() => onYearChange?.(year + 1)}>
          <path d="m9 18 6-6-6-6" />
        </NavButton>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {quarters.map((q) => {
          const active = value?.year === year && value?.quarter === q;
          return (
            <button
              key={q}
              type="button"
              aria-pressed={active}
              onClick={() => onChange?.({ year, quarter: q })}
              className={cn(
                "flex flex-col items-center justify-center rounded-[8px] py-4 transition-colors",
                active ? "bg-text text-background" : "hover:bg-hover",
              )}
            >
              <span className="text-sm font-semibold">Q{q}</span>
              <span
                className={cn(
                  "text-xs",
                  active ? "text-background/70" : "text-text-muted",
                )}
              >
                {monthsOf(q)}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function NavButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="inline-flex size-8 items-center justify-center rounded-[8px] text-text-muted transition-colors hover:bg-hover hover:text-text"
    >
      <svg
        className="size-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        {children}
      </svg>
    </button>
  );
}
