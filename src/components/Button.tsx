import { type ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

export const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-[8px] font-bold whitespace-nowrap transition-colors outline-none focus-visible:outline-2 focus-visible:outline-text focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95",
  {
    variants: {
      variant: {
        fill: "bg-primary text-white hover:brightness-95",
        outline: "border border-primary text-primary hover:bg-primary-tint",
        ghost: "text-primary hover:bg-primary-tint",
        text: "text-primary hover:underline",
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
      { iconOnly: true, size: "xs", class: "size-8" },
      { iconOnly: true, size: "sm", class: "size-8" },
      { iconOnly: true, size: "md", class: "size-10" },
      { iconOnly: true, size: "lg", class: "size-12" },
      { iconOnly: true, size: "xl", class: "size-14" },
    ],
    defaultVariants: {
      variant: "fill",
      size: "md",
      iconOnly: false,
      fullWidth: false,
    },
  },
);

export interface ButtonProps
  extends
    Omit<VariantProps<typeof buttonVariants>, "iconOnly">,
    React.ButtonHTMLAttributes<HTMLButtonElement> {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export function Button({
  variant = "fill",
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
        buttonVariants({ variant, size, fullWidth, iconOnly }),
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
