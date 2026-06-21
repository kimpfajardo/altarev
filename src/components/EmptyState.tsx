import { type ReactNode } from "react";
import { cn } from "../lib/cn";

export interface EmptyStateProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "title"
> {
  icon?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
}

export function EmptyState({
  icon,
  title,
  description,
  children,
  className,
  ...props
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex w-[374px] max-w-full flex-col items-center gap-2 px-4 text-center",
        className,
      )}
      {...props}
    >
      {icon && (
        <div className="flex size-20 items-center justify-center [&_svg]:size-20">
          {icon}
        </div>
      )}
      <div className="flex flex-col gap-2 pb-6 text-text">
        <h2 className="text-2xl font-bold leading-8">{title}</h2>
        {description && (
          <p className="text-base leading-6 text-text">{description}</p>
        )}
      </div>
      {children && (
        <div className="flex items-start justify-center gap-3">{children}</div>
      )}
    </div>
  );
}
