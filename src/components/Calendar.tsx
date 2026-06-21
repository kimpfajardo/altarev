import { DayPicker, type DayPickerProps } from "react-day-picker";
import { cn } from "../lib/cn";

export type CalendarProps = DayPickerProps & { className?: string };

export function Calendar({ className, classNames, ...props }: CalendarProps) {
  return (
    <DayPicker
      className={cn(
        "rounded-[12px] bg-surface p-4 text-text [--rdp-day-width:40px] [--rdp-day-height:40px]",
        className,
      )}
      classNames={{
        months: "relative flex flex-col gap-4 sm:flex-row",
        month: "flex flex-col gap-2",
        month_caption: "relative flex h-10 items-center justify-center",
        caption_label: "text-sm font-semibold text-text",
        nav: "absolute inset-x-0 top-0 flex h-10 items-center justify-between px-1",
        button_previous:
          "inline-flex size-8 items-center justify-center rounded-[8px] text-text-muted transition-colors hover:bg-hover hover:text-text disabled:opacity-40",
        button_next:
          "inline-flex size-8 items-center justify-center rounded-[8px] text-text-muted transition-colors hover:bg-hover hover:text-text disabled:opacity-40",
        month_grid: "border-collapse",
        weekdays: "flex",
        weekday:
          "flex size-10 items-center justify-center text-xs font-semibold text-text-muted",
        week: "flex",
        day: "p-0 text-center text-sm",
        day_button:
          "inline-flex size-10 items-center justify-center rounded-full text-text transition-colors hover:bg-hover focus-visible:outline-2 focus-visible:outline-primary aria-selected:font-semibold",
        today: "font-semibold text-primary",
        selected:
          "[&_button]:bg-text [&_button]:text-background [&_button]:hover:bg-text",
        range_start:
          "rounded-l-full bg-primary-tint [&_button]:bg-text [&_button]:text-background",
        range_end:
          "rounded-r-full bg-primary-tint [&_button]:bg-text [&_button]:text-background",
        range_middle:
          "bg-primary-tint [&_button]:rounded-none [&_button]:bg-transparent [&_button]:text-text [&_button]:hover:bg-primary-tint",
        outside: "text-text-muted opacity-50",
        disabled: "text-text-muted opacity-40",
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation, className: cls }) => (
          <ChevronIcon orientation={orientation} className={cls} />
        ),
      }}
      {...props}
    />
  );
}

function ChevronIcon({
  orientation,
  className,
}: {
  orientation?: "up" | "down" | "left" | "right";
  className?: string;
}) {
  const d =
    orientation === "left"
      ? "m15 18-6-6 6-6"
      : orientation === "right"
        ? "m9 18 6-6-6-6"
        : orientation === "up"
          ? "m18 15-6-6-6 6"
          : "m6 9 6 6 6-6";
  return (
    <svg
      className={cn("size-5", className)}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d={d} />
    </svg>
  );
}
