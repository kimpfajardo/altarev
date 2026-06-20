import { type HTMLAttributes } from "react";
import { cn } from "../lib/cn";

export type ContainerProps = HTMLAttributes<HTMLDivElement>;

/** Centered page container — max 1328px (Moon), responsive horizontal gutter. */
export function Container({ className, ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-container px-4 md:px-6 lg:px-8",
        className,
      )}
      {...props}
    />
  );
}
