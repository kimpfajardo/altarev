import {
  createContext,
  useContext,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";
import { cn } from "../lib/cn";
import { Popover } from "./Popover";

const DropdownContext = createContext<{ close: () => void } | null>(null);

export interface DropdownProps {
  trigger: ReactElement<{
    ref?: React.Ref<HTMLElement>;
    onClick?: (e: React.MouseEvent) => void;
    "aria-expanded"?: boolean;
    "aria-haspopup"?: boolean;
  }>;
  children: ReactNode;
  align?: "start" | "end";
  className?: string;
}

export function Dropdown({
  trigger,
  children,
  align = "start",
  className,
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  return (
    <DropdownContext.Provider value={{ close: () => setOpen(false) }}>
      <Popover
        trigger={trigger}
        open={open}
        onOpenChange={setOpen}
        align={align}
        className={cn("min-w-40", className)}
      >
        <div role="menu" className="flex flex-col">
          {children}
        </div>
      </Popover>
    </DropdownContext.Provider>
  );
}

export interface DropdownItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  leading?: ReactNode;
  trailing?: ReactNode;
  description?: ReactNode;
  selected?: boolean;
}

export function DropdownItem({
  leading,
  trailing,
  description,
  selected,
  children,
  className,
  onClick,
  disabled,
  ...props
}: DropdownItemProps) {
  const ctx = useContext(DropdownContext);
  const end = trailing ?? (selected ? <CheckMark /> : null);
  return (
    <button
      type="button"
      role="menuitem"
      aria-current={selected || undefined}
      disabled={disabled}
      onClick={(e) => {
        onClick?.(e);
        ctx?.close();
      }}
      className={cn(
        "flex w-full gap-2 rounded-[8px] px-3 py-2 text-left text-sm text-text",
        description ? "items-start" : "items-center",
        "hover:bg-hover focus-visible:bg-hover focus-visible:outline-none",
        "disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      {...props}
    >
      {leading && <span className="shrink-0">{leading}</span>}
      <span className="flex flex-1 flex-col">
        <span>{children}</span>
        {description && (
          <span className="text-xs text-text-muted">{description}</span>
        )}
      </span>
      {end && <span className="shrink-0">{end}</span>}
    </button>
  );
}

function CheckMark() {
  return (
    <svg
      className="size-4 text-primary"
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
