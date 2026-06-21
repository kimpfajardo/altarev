import { createContext, useContext, useId, type ReactNode } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../lib/cn";

type TabsType = "default" | "pill" | "underline";

interface TabsContextValue {
  value: string;
  setValue: (value: string) => void;
  type: TabsType;
  size: "sm" | "md";
  baseId: string;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabs() {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error("Tabs components must be used within <Tabs>");
  return ctx;
}

export interface TabsProps {
  value: string;
  onValueChange: (value: string) => void;
  type?: TabsType;
  size?: "sm" | "md";
  children: ReactNode;
  className?: string;
}

export function Tabs({
  value,
  onValueChange,
  type = "underline",
  size = "md",
  children,
  className,
}: TabsProps) {
  const baseId = useId();
  return (
    <TabsContext.Provider
      value={{ value, setValue: onValueChange, type, size, baseId }}
    >
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
}

const list = cva("flex items-center", {
  variants: {
    type: {
      default: "gap-1",
      pill: "gap-1 rounded-[12px] bg-background p-1",
      underline: "gap-1 border-b border-border",
    },
  },
  defaultVariants: { type: "underline" },
});

export function TabList({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { type } = useTabs();
  return (
    <div role="tablist" className={cn(list({ type }), className)}>
      {children}
    </div>
  );
}

const tab = cva(
  "inline-flex items-center justify-center gap-2 font-bold whitespace-nowrap transition-colors outline-none focus-visible:outline-2 focus-visible:outline-text focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-5",
  {
    variants: {
      type: {
        default: "rounded-[8px] px-3",
        pill: "rounded-[8px] px-3",
        underline: "-mb-px border-b-2 border-transparent px-3",
      },
      size: { sm: "h-8 text-sm", md: "h-10 text-sm" },
      active: { true: "", false: "text-text-muted hover:text-text" },
    },
    compoundVariants: [
      { type: "default", active: true, class: "text-primary" },
      { type: "pill", active: true, class: "bg-surface text-text shadow-sm" },
      { type: "underline", active: true, class: "border-primary text-primary" },
    ],
    defaultVariants: { type: "underline", size: "md", active: false },
  },
);

export interface TabProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "value"
> {
  value: string;
  leading?: ReactNode;
  trailing?: ReactNode;
}

export function Tab({
  value,
  leading,
  trailing,
  children,
  className,
  ...props
}: TabProps) {
  const ctx = useTabs();
  const active = ctx.value === value;
  return (
    <button
      type="button"
      role="tab"
      id={`${ctx.baseId}-tab-${value}`}
      aria-selected={active}
      aria-controls={`${ctx.baseId}-panel-${value}`}
      tabIndex={active ? 0 : -1}
      onClick={() => ctx.setValue(value)}
      onKeyDown={(e) => {
        if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
        const tabs = Array.from(
          e.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>(
            '[role="tab"]',
          ) ?? [],
        );
        const i = tabs.indexOf(e.currentTarget);
        const next = e.key === "ArrowRight" ? tabs[i + 1] : tabs[i - 1];
        next?.focus();
        next?.click();
      }}
      className={cn(tab({ type: ctx.type, size: ctx.size, active }), className)}
      {...props}
    >
      {leading}
      {children}
      {trailing}
    </button>
  );
}

export function TabPanel({
  value,
  children,
  className,
}: {
  value: string;
  children: ReactNode;
  className?: string;
}) {
  const ctx = useTabs();
  if (ctx.value !== value) return null;
  return (
    <div
      role="tabpanel"
      id={`${ctx.baseId}-panel-${value}`}
      aria-labelledby={`${ctx.baseId}-tab-${value}`}
      className={className}
    >
      {children}
    </div>
  );
}
