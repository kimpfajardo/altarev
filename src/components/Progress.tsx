import { cn } from "../lib/cn";

export function clampPercent(value: number) {
  return Math.max(0, Math.min(100, value));
}

const LINEAR_THICKNESS = {
  "6xs": "h-0.5",
  "5xs": "h-1",
  "4xs": "h-2",
  "3xs": "h-3",
  "2xs": "h-4",
} as const;

const CIRCULAR_SIZE = {
  "2xs": 16,
  xs: 24,
  sm: 32,
  md: 40,
  lg: 48,
} as const;

interface CommonProps {
  value: number;
  className?: string;
  label?: string;
}

export type ProgressProps = CommonProps &
  (
    | { variant?: "linear"; size?: keyof typeof LINEAR_THICKNESS }
    | { variant: "circular"; size?: keyof typeof CIRCULAR_SIZE }
  );

export function Progress({
  value,
  className,
  label = "Progress",
  ...rest
}: ProgressProps) {
  const pct = clampPercent(value);
  const common = {
    role: "progressbar" as const,
    "aria-label": label,
    "aria-valuenow": Math.round(pct),
    "aria-valuemin": 0,
    "aria-valuemax": 100,
  };

  if (rest.variant === "circular") {
    const px = CIRCULAR_SIZE[rest.size ?? "md"];
    const stroke = Math.max(2, Math.round(px / 8));
    const r = (px - stroke) / 2;
    const circumference = 2 * Math.PI * r;
    return (
      <svg
        {...common}
        width={px}
        height={px}
        viewBox={`0 0 ${px} ${px}`}
        className={cn("-rotate-90", className)}
      >
        <circle
          cx={px / 2}
          cy={px / 2}
          r={r}
          fill="none"
          strokeWidth={stroke}
          className="stroke-background"
        />
        <circle
          cx={px / 2}
          cy={px / 2}
          r={r}
          fill="none"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - pct / 100)}
          className="stroke-primary transition-[stroke-dashoffset]"
        />
      </svg>
    );
  }

  const thickness = LINEAR_THICKNESS[rest.size ?? "4xs"];
  return (
    <div
      {...common}
      className={cn(
        "w-full overflow-hidden rounded-full bg-background",
        thickness,
        className,
      )}
    >
      <div
        className="h-full rounded-full bg-primary transition-[width]"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
