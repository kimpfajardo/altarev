import { type ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

export const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-[8px] font-bold whitespace-nowrap transition-colors outline-none focus-visible:outline-2 focus-visible:outline-text focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95 hover:brightness-95",
  {
    variants: {
      variant: {
        fill: "",
        outline: "border bg-transparent",
        ghost: "bg-transparent",
        text: "bg-transparent hover:underline hover:brightness-100",
      },
      color: {
        primary: "",
        success: "",
        error: "",
        warning: "",
        info: "",
      },
      size: {
        xs: "h-8 px-3 text-xs",
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 text-sm",
        lg: "h-12 px-5 text-md",
        xl: "h-14 px-6 text-md",
      },
      iconOnly: {
        true: "aspect-square p-0",
        false: "",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    compoundVariants: [
      { variant: "fill", color: "primary", class: "bg-primary text-white" },
      { variant: "fill", color: "success", class: "bg-success text-white" },
      { variant: "fill", color: "error", class: "bg-error text-white" },
      { variant: "fill", color: "warning", class: "bg-warning text-text" },
      { variant: "fill", color: "info", class: "bg-info text-white" },

      {
        variant: "outline",
        color: "primary",
        class: "border-primary text-primary hover:bg-primary-tint",
      },
      {
        variant: "outline",
        color: "success",
        class: "border-success text-success hover:bg-success-tint",
      },
      {
        variant: "outline",
        color: "error",
        class: "border-error text-error hover:bg-error-tint",
      },
      {
        variant: "outline",
        color: "warning",
        class: "border-warning text-warning hover:bg-warning-tint",
      },
      {
        variant: "outline",
        color: "info",
        class: "border-info text-info hover:bg-info-tint",
      },

      {
        variant: "ghost",
        color: "primary",
        class: "text-primary hover:bg-primary-tint",
      },
      {
        variant: "ghost",
        color: "success",
        class: "text-success hover:bg-success-tint",
      },
      {
        variant: "ghost",
        color: "error",
        class: "text-error hover:bg-error-tint",
      },
      {
        variant: "ghost",
        color: "warning",
        class: "text-warning hover:bg-warning-tint",
      },
      {
        variant: "ghost",
        color: "info",
        class: "text-info hover:bg-info-tint",
      },

      { variant: "text", color: "primary", class: "text-primary" },
      { variant: "text", color: "success", class: "text-success" },
      { variant: "text", color: "error", class: "text-error" },
      { variant: "text", color: "warning", class: "text-warning" },
      { variant: "text", color: "info", class: "text-info" },

      { iconOnly: true, size: "xs", class: "size-8" },
      { iconOnly: true, size: "sm", class: "size-8" },
      { iconOnly: true, size: "md", class: "size-10" },
      { iconOnly: true, size: "lg", class: "size-12" },
      { iconOnly: true, size: "xl", class: "size-14" },
    ],
    defaultVariants: {
      variant: "fill",
      color: "primary",
      size: "md",
      iconOnly: false,
      fullWidth: false,
    },
  },
);

export interface ButtonProps
  extends
    Omit<VariantProps<typeof buttonVariants>, "iconOnly">,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export function Button({
  variant = "fill",
  color = "primary",
  size = "md",
  fullWidth = false,
  leftIcon,
  rightIcon,
  className,
  children,
  ...props
}: ButtonProps) {
  const iconOnly = !children && Boolean(leftIcon ?? rightIcon);
  return (
    <button
      className={cn(
        buttonVariants({ variant, color, size, fullWidth, iconOnly }),
        fullWidth && (leftIcon || rightIcon) && "justify-between",
        className,
      )}
      {...props}
    >
      {leftIcon}
      {children}
      {rightIcon}
    </button>
  );
}
