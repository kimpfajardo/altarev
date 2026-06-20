import { Fragment, type ReactNode } from "react";
import { cn } from "../lib/cn";

export interface BreadcrumbItem {
  label: ReactNode;
  href?: string;
}

export interface BreadcrumbsProps extends Omit<
  React.HTMLAttributes<HTMLElement>,
  "children"
> {
  items: BreadcrumbItem[];
  separator?: ReactNode;
}

function ArrowSeparator() {
  return (
    <svg
      className="size-4 shrink-0 text-text-muted"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M3 8h9M9 5l3 3-3 3" />
    </svg>
  );
}

export function Breadcrumbs({
  items,
  separator,
  className,
  ...props
}: BreadcrumbsProps) {
  const sep = separator ?? <ArrowSeparator />;
  return (
    <nav aria-label="Breadcrumb" className={className} {...props}>
      <ol className="flex items-center gap-2 text-sm">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <Fragment key={i}>
              <li>
                {isLast || !item.href ? (
                  <span
                    aria-current={isLast ? "page" : undefined}
                    className={cn(
                      isLast ? "font-bold text-text" : "text-text-muted",
                    )}
                  >
                    {item.label}
                  </span>
                ) : (
                  <a
                    href={item.href}
                    className="text-text-muted hover:text-text hover:underline"
                  >
                    {item.label}
                  </a>
                )}
              </li>
              {!isLast && (
                <li aria-hidden className="flex items-center text-text-muted">
                  {sep}
                </li>
              )}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
