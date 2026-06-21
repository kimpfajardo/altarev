import { useMemo } from "react";
import { cn } from "../lib/cn";

export interface TimePickerProps {
  value?: { hours: number; minutes: number };
  onChange?: (value: { hours: number; minutes: number }) => void;
  minuteStep?: number;
  className?: string;
}

const pad = (n: number) => String(n).padStart(2, "0");

export function TimePicker({
  value,
  onChange,
  minuteStep = 1,
  className,
}: TimePickerProps) {
  const hours = useMemo(() => Array.from({ length: 24 }, (_, i) => i), []);
  const minutes = useMemo(
    () =>
      Array.from(
        { length: Math.ceil(60 / minuteStep) },
        (_, i) => i * minuteStep,
      ),
    [minuteStep],
  );

  const set = (next: Partial<{ hours: number; minutes: number }>) =>
    onChange?.({
      hours: next.hours ?? value?.hours ?? 0,
      minutes: next.minutes ?? value?.minutes ?? 0,
    });

  return (
    <div
      className={cn(
        "flex h-[280px] gap-px overflow-hidden rounded-[16px] bg-background p-1",
        className,
      )}
    >
      <Column
        items={hours}
        selected={value?.hours}
        onSelect={(h) => set({ hours: h })}
        label="Hours"
      />
      <Column
        items={minutes}
        selected={value?.minutes}
        onSelect={(m) => set({ minutes: m })}
        label="Minutes"
      />
    </div>
  );
}

function Column({
  items,
  selected,
  onSelect,
  label,
}: {
  items: number[];
  selected?: number;
  onSelect: (n: number) => void;
  label: string;
}) {
  return (
    <ul
      aria-label={label}
      className="flex w-12 flex-col gap-1 overflow-y-auto scroll-smooth py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {items.map((n) => {
        const active = selected === n;
        return (
          <li key={n} className="flex justify-center">
            <button
              type="button"
              aria-pressed={active}
              onClick={() => onSelect(n)}
              className={cn(
                "flex size-9 items-center justify-center rounded-full text-xs font-semibold transition-colors",
                active ? "bg-text text-background" : "text-text hover:bg-hover",
              )}
            >
              {pad(n)}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
