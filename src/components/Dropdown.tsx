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
}

export function DropdownItem({
  leading,
  trailing,
  children,
  className,
  onClick,
  disabled,
  ...props
}: DropdownItemProps) {
  const ctx = useContext(DropdownContext);
  return (
    <button
      type="button"
      role="menuitem"
      disabled={disabled}
      onClick={(e) => {
        onClick?.(e);
        ctx?.close();
      }}
      className={cn(
        "flex w-full items-center gap-2 rounded-[8px] px-3 py-2 text-left text-sm text-text",
        "hover:bg-hover focus-visible:bg-hover focus-visible:outline-none",
        "disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      {...props}
    >
      {leading}
      <span className="flex-1">{children}</span>
      {trailing}
    </button>
  );
}
