import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "../lib/cn";

export type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export interface ToastOptions {
  message: ReactNode;
  icon?: ReactNode;
  duration?: number;
  closable?: boolean;
}

interface ToastEntry extends ToastOptions {
  id: number;
}

interface ToastContextValue {
  toast: (options: ToastOptions) => number;
  dismiss: (id: number) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a ToastProvider");
  return ctx;
}

const POSITION_CLASS: Record<ToastPosition, string> = {
  "top-left": "top-4 left-4 items-start",
  "top-center": "top-4 left-1/2 -translate-x-1/2 items-center",
  "top-right": "top-4 right-4 items-end",
  "bottom-left": "bottom-4 left-4 items-start",
  "bottom-center": "bottom-4 left-1/2 -translate-x-1/2 items-center",
  "bottom-right": "bottom-4 right-4 items-end",
};

export interface ToastProviderProps {
  children: ReactNode;
  position?: ToastPosition;
  defaultDuration?: number;
}

export function ToastProvider({
  children,
  position = "bottom-center",
  defaultDuration = 5000,
}: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastEntry[]>([]);
  const counter = useRef(0);

  const dismiss = useCallback((id: number) => {
    setToasts((list) => list.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    (options: ToastOptions) => {
      const id = ++counter.current;
      setToasts((list) => [...list, { ...options, id }]);
      const duration = options.duration ?? defaultDuration;
      if (duration > 0 && !options.closable) {
        setTimeout(() => dismiss(id), duration);
      }
      return id;
    },
    [defaultDuration, dismiss],
  );

  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      {children}
      {typeof document !== "undefined" &&
        createPortal(
          <div
            className={cn(
              "pointer-events-none fixed z-[100] flex flex-col gap-2",
              POSITION_CLASS[position],
            )}
          >
            {toasts.map((t) => (
              <Snackbar
                key={t.id}
                icon={t.icon}
                onClose={t.closable ? () => dismiss(t.id) : undefined}
                className="pointer-events-auto"
              >
                {t.message}
              </Snackbar>
            ))}
          </div>,
          document.body,
        )}
    </ToastContext.Provider>
  );
}

export interface SnackbarProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "children"
> {
  icon?: ReactNode;
  onClose?: () => void;
  children: ReactNode;
}

export function Snackbar({
  icon,
  onClose,
  children,
  className,
  ...props
}: SnackbarProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "flex min-w-48 max-w-sm items-center gap-3 rounded-[8px] bg-surface px-4 py-3 text-sm text-text shadow-lg",
        className,
      )}
      {...props}
    >
      {icon && <span className="shrink-0 [&_svg]:size-5">{icon}</span>}
      <span className="flex-1">{children}</span>
      {onClose && (
        <button
          type="button"
          aria-label="Dismiss"
          onClick={onClose}
          className="-mr-1 inline-flex size-6 shrink-0 items-center justify-center rounded-full text-text-muted hover:bg-hover hover:text-text"
        >
          <svg
            viewBox="0 0 24 24"
            className="size-4"
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
  );
}
