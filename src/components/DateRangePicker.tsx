import { useState, type ReactNode } from "react";
import { type DateRange } from "react-day-picker";
import { cn } from "../lib/cn";
import { Calendar } from "./Calendar";
import { Button } from "./Button";

export interface DateRangePreset {
  label: ReactNode;
  range: () => DateRange;
}

export interface DateRangePickerProps {
  value?: DateRange;
  onApply?: (range: DateRange | undefined) => void;
  presets?: DateRangePreset[];
  numberOfMonths?: number;
  className?: string;
}

const startOfDay = (d: Date) =>
  new Date(d.getFullYear(), d.getMonth(), d.getDate());
const addDays = (d: Date, n: number) => {
  const r = startOfDay(d);
  r.setDate(r.getDate() + n);
  return r;
};
const startOfWeek = (d: Date) => addDays(d, -((d.getDay() + 6) % 7));
const startOfMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth(), 1);
const endOfMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth() + 1, 0);

export interface PresetRanges {
  today: DateRange;
  yesterday: DateRange;
  thisWeek: DateRange;
  lastWeek: DateRange;
  thisMonth: DateRange;
  lastMonth: DateRange;
}

export function presetRanges(now: Date): PresetRanges {
  const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  return {
    today: { from: startOfDay(now), to: startOfDay(now) },
    yesterday: { from: addDays(now, -1), to: addDays(now, -1) },
    thisWeek: { from: startOfWeek(now), to: startOfDay(now) },
    lastWeek: {
      from: addDays(startOfWeek(now), -7),
      to: addDays(startOfWeek(now), -1),
    },
    thisMonth: { from: startOfMonth(now), to: startOfDay(now) },
    lastMonth: { from: startOfMonth(lastMonth), to: endOfMonth(lastMonth) },
  };
}

export const defaultPresets: DateRangePreset[] = [
  { label: "Today", range: () => presetRanges(new Date()).today },
  { label: "Yesterday", range: () => presetRanges(new Date()).yesterday },
  { label: "This week", range: () => presetRanges(new Date()).thisWeek },
  { label: "Last week", range: () => presetRanges(new Date()).lastWeek },
  { label: "This month", range: () => presetRanges(new Date()).thisMonth },
  { label: "Last month", range: () => presetRanges(new Date()).lastMonth },
];

export function DateRangePicker({
  value,
  onApply,
  presets = defaultPresets,
  numberOfMonths = 2,
  className,
}: DateRangePickerProps) {
  const [range, setRange] = useState<DateRange | undefined>(value);

  return (
    <div
      className={cn(
        "inline-flex flex-col overflow-hidden rounded-[12px] bg-surface shadow-[0_0_1px_rgba(0,0,0,0.4),0_6px_6px_-6px_rgba(0,0,0,0.16)]",
        className,
      )}
    >
      <div className="flex">
        <ul className="flex w-40 shrink-0 flex-col gap-1 border-r border-border p-2">
          {presets.map((preset, i) => (
            <li key={i}>
              <button
                type="button"
                onClick={() => setRange(preset.range())}
                className="w-full rounded-[8px] px-3 py-2 text-left text-sm text-text transition-colors hover:bg-hover"
              >
                {preset.label}
              </button>
            </li>
          ))}
        </ul>
        <Calendar
          mode="range"
          numberOfMonths={numberOfMonths}
          selected={range}
          onSelect={setRange}
          className="p-3 shadow-none"
        />
      </div>
      <div className="flex justify-end border-t border-border p-3">
        <Button size="sm" onClick={() => onApply?.(range)}>
          Apply
        </Button>
      </div>
    </div>
  );
}
