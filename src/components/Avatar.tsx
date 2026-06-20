import { type ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

const avatar = cva(
  "relative inline-flex shrink-0 items-center justify-center overflow-visible rounded-full bg-surface font-bold text-text select-none",
  {
    variants: {
      size: {
        xs: "size-6 text-2xs",
        sm: "size-8 text-xs",
        md: "size-10 text-sm",
        lg: "size-12 text-md",
        xl: "size-14 text-md",
        "2xl": "size-16 text-xl",
      },
    },
    defaultVariants: { size: "md" },
  },
);

const badgeCorner = {
  tr: "top-0 right-0",
  tl: "top-0 left-0",
  br: "bottom-0 right-0",
  bl: "bottom-0 left-0",
} as const;

const badgeSize = {
  xs: "size-1 border-2",
  sm: "size-2 border-2",
  md: "size-2 border-2",
  lg: "size-3 border-4",
  xl: "size-3 border-4",
  "2xl": "size-3 border-4",
} as const;

export interface AvatarProps
  extends
    VariantProps<typeof avatar>,
    Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
  src?: string;
  alt?: string;
  children?: ReactNode;
  badge?: keyof typeof badgeCorner;
  badgeColor?: string;
}

export function Avatar({
  size = "md",
  src,
  alt = "",
  children,
  badge,
  badgeColor = "bg-success",
  className,
  ...props
}: AvatarProps) {
  return (
    <span className={cn(avatar({ size }), className)} {...props}>
      {src ? (
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 size-full rounded-full object-cover"
        />
      ) : (
        children
      )}
      {badge && (
        <span
          className={cn(
            "absolute rounded-full border-background",
            badgeCorner[badge],
            badgeSize[size ?? "md"],
            badgeColor,
          )}
        />
      )}
    </span>
  );
}
