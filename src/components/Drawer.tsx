import { useEffect, useRef, type ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

const drawer = cva(
  "fixed bg-surface p-1 shadow-lg backdrop:bg-overlay open:flex flex-col m-0",
  {
    variants: {
      side: {
        right: "inset-y-0 right-0 h-full w-[448px] max-w-full rounded-l-[8px]",
        left: "inset-y-0 left-0 h-full w-[448px] max-w-full rounded-r-[8px]",
        top: "inset-x-0 top-0 h-auto max-h-full w-full rounded-b-[8px]",
        bottom: "inset-x-0 bottom-0 h-auto max-h-full w-full rounded-t-[8px]",
      },
    },
    defaultVariants: { side: "right" },
  },
);

export interface DrawerProps
  extends
    VariantProps<typeof drawer>,
    Omit<React.DialogHTMLAttributes<HTMLDialogElement>, "open"> {
  open: boolean;
  onClose?: () => void;
  children: ReactNode;
}

export function Drawer({
  open,
  onClose,
  side = "right",
  className,
  children,
  ...props
}: DrawerProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    else if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      className={cn(drawer({ side }), className)}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose?.();
      }}
      {...props}
    >
      <div
        className="flex size-full flex-col overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </dialog>
  );
}
