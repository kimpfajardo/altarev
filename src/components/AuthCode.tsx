import { useRef, type ClipboardEvent, type KeyboardEvent } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../lib/cn";

const cell = cva(
  "size-14 w-12 rounded-[8px] border bg-surface text-center text-sm text-text outline-none transition-shadow focus:border-[1.5px] focus:border-primary focus:ring-2 focus:ring-primary-tint",
  {
    variants: {
      error: {
        true: "border-[1.5px] border-[var(--color-input-error)] text-[var(--color-input-error)] focus:border-[var(--color-input-error)] focus:ring-0",
        false: "border-border",
      },
    },
    defaultVariants: { error: false },
  },
);

export function splitCode(raw: string, length: number): string[] {
  const digits = raw.replace(/\D/g, "").slice(0, length).split("");
  return Array.from({ length }, (_, i) => digits[i] ?? "");
}

export interface AuthCodeProps {
  value: string;
  onChange: (code: string) => void;
  length?: number;
  error?: boolean | string;
  disabled?: boolean;
  className?: string;
}

export function AuthCode({
  value,
  onChange,
  length = 6,
  error = false,
  disabled,
  className,
}: AuthCodeProps) {
  const refs = useRef<Array<HTMLInputElement | null>>([]);
  const cells = splitCode(value, length);
  const hasError = Boolean(error);

  const setCharAt = (index: number, char: string) => {
    const next = cells.slice();
    next[index] = char;
    onChange(next.join(""));
  };

  const focusCell = (index: number) => {
    const el = refs.current[Math.max(0, Math.min(index, length - 1))];
    el?.focus();
    el?.select();
  };

  const handleInput = (index: number, raw: string) => {
    const char = raw.replace(/\D/g, "").slice(-1);
    if (!char) return;
    setCharAt(index, char);
    if (index < length - 1) focusCell(index + 1);
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      if (cells[index]) {
        setCharAt(index, "");
      } else if (index > 0) {
        setCharAt(index - 1, "");
        focusCell(index - 1);
      }
    } else if (e.key === "ArrowLeft") {
      focusCell(index - 1);
    } else if (e.key === "ArrowRight") {
      focusCell(index + 1);
    }
  };

  const handlePaste = (index: number, e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "");
    if (!pasted) return;
    const next = cells.slice();
    for (let i = 0; i < pasted.length && index + i < length; i++) {
      next[index + i] = pasted[i]!;
    }
    onChange(next.join(""));
    focusCell(index + pasted.length);
  };

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex gap-2">
        {cells.map((char, i) => (
          <input
            key={i}
            ref={(el) => {
              refs.current[i] = el;
            }}
            value={char}
            disabled={disabled}
            inputMode="numeric"
            autoComplete="one-time-code"
            aria-label={`Digit ${i + 1}`}
            aria-invalid={hasError}
            className={cn(cell({ error: hasError }), "disabled:opacity-50")}
            onChange={(e) => handleInput(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onPaste={(e) => handlePaste(i, e)}
            onFocus={(e) => e.target.select()}
          />
        ))}
      </div>
      {typeof error === "string" && error && (
        <p className="px-2 text-center text-xs text-[var(--color-input-error)]">
          {error}
        </p>
      )}
    </div>
  );
}
