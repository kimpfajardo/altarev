import { useEffect, useRef, type ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

const modal = cva(
  "m-auto w-full rounded-[12px] bg-surface p-0 shadow-lg backdrop:bg-overlay open:flex flex-col",
  {
    variants: {
      size: {
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-4xl",
        xl: "max-w-7xl",
      },
    },
    defaultVariants: { size: "md" },
  },
);

export interface ModalProps
  extends
    VariantProps<typeof modal>,
    Omit<React.DialogHTMLAttributes<HTMLDialogElement>, "open" | "title"> {
  open: boolean;
  onClose?: () => void;
  title?: ReactNode;
  children: ReactNode;
}

export function Modal({
  open,
  onClose,
  size = "md",
  title,
  className,
  children,
  ...props
}: ModalProps) {
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
      className={cn(modal({ size }), className)}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose?.();
      }}
      {...props}
    >
      <div className="flex flex-col" onClick={(e) => e.stopPropagation()}>
        {(title || onClose) && (
          <div className="flex items-center justify-between gap-4 border-b border-border px-6 py-4">
            {title ? (
              <h2 className="text-lg font-bold text-text">{title}</h2>
            ) : (
              <span />
            )}
            {onClose && (
              <button
                type="button"
                aria-label="Close"
                onClick={onClose}
                className="-mr-2 inline-flex size-8 shrink-0 items-center justify-center rounded-full text-text-muted hover:bg-hover hover:text-text focus-visible:outline-2 focus-visible:outline-text focus-visible:outline-offset-2"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="size-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  aria-hidden
                >
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            )}
          </div>
        )}
        <div className="p-6">{children}</div>
      </div>
    </dialog>
  );
}
