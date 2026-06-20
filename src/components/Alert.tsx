import { type ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

const alert = cva(
  "flex items-center gap-3 rounded-[8px] p-4 text-sm [&>svg]:size-6 [&>svg]:shrink-0",
  {
    variants: {
      status: {
        success: "",
        error: "",
        warning: "",
        info: "",
      },
      styleVariant: {
        colourful: "",
        outline: "border",
        generic: "bg-surface text-text",
      },
    },
    compoundVariants: [
      {
        styleVariant: "colourful",
        status: "success",
        class: "bg-success-tint text-success",
      },
      {
        styleVariant: "colourful",
        status: "error",
        class: "bg-error-tint text-error",
      },
      {
        styleVariant: "colourful",
        status: "warning",
        class: "bg-warning-tint text-warning",
      },
      {
        styleVariant: "colourful",
        status: "info",
        class: "bg-info-tint text-info",
      },

      {
        styleVariant: "outline",
        status: "success",
        class: "border-success text-success",
      },
      {
        styleVariant: "outline",
        status: "error",
        class: "border-error text-error",
      },
      {
        styleVariant: "outline",
        status: "warning",
        class: "border-warning text-warning",
      },
      {
        styleVariant: "outline",
        status: "info",
        class: "border-info text-info",
      },
    ],
    defaultVariants: { status: "info", styleVariant: "generic" },
  },
);

export interface AlertProps
  extends
    Omit<VariantProps<typeof alert>, "styleVariant">,
    React.HTMLAttributes<HTMLDivElement> {
  variant?: NonNullable<VariantProps<typeof alert>["styleVariant"]>;

  icon?: ReactNode;

  trailing?: ReactNode;
  children: ReactNode;
}

export function Alert({
  status = "info",
  variant = "generic",
  icon,
  trailing,
  children,
  className,
  ...props
}: AlertProps) {
  return (
    <div
      role="alert"
      className={cn(alert({ status, styleVariant: variant }), className)}
      {...props}
    >
      {icon}
      <span className="flex-1">{children}</span>
      {trailing}
    </div>
  );
}
