import { Fragment, type ReactNode } from "react";
import { cn } from "../lib/cn";
import { Popover } from "./Popover";

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
  maxItems?: number;
}

const ELLIPSIS = Symbol("ellipsis");
type Slot = { item: BreadcrumbItem; index: number } | typeof ELLIPSIS;

export function collapseItems(
  items: BreadcrumbItem[],
  maxItems: number | undefined,
): Slot[] {
  const indexed = items.map((item, index) => ({ item, index }));
  if (!maxItems || items.length <= maxItems || items.length <= 2) {
    return indexed;
  }
  const tail = Math.max(1, maxItems - 1);
  return [indexed[0]!, ELLIPSIS, ...indexed.slice(items.length - tail)];
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
  maxItems,
  className,
  ...props
}: BreadcrumbsProps) {
  const sep = separator ?? <ArrowSeparator />;
  const slots = collapseItems(items, maxItems);
  const hidden =
    slots.includes(ELLIPSIS) && maxItems
      ? items.slice(1, items.length - Math.max(1, maxItems - 1))
      : [];

  return (
    <nav aria-label="Breadcrumb" className={className} {...props}>
      <ol className="flex items-center gap-2 text-sm">
        {slots.map((slot, i) => {
          const isLast = i === slots.length - 1;
          return (
            <Fragment key={i}>
              <li className="flex items-center">
                {slot === ELLIPSIS ? (
                  <Popover
                    align="start"
                    trigger={
                      <button
                        type="button"
                        aria-label="Show more"
                        className="rounded-[4px] px-1 text-text-muted hover:text-text focus-visible:outline-2 focus-visible:outline-text focus-visible:outline-offset-2"
                      >
                        …
                      </button>
                    }
                  >
                    <ul className="min-w-32">
                      {hidden.map((h, hi) => (
                        <li key={hi}>
                          <a
                            href={h.href}
                            className="block rounded-[8px] px-3 py-2 text-sm text-text hover:bg-hover"
                          >
                            {h.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </Popover>
                ) : isLast || !slot.item.href ? (
                  <span
                    aria-current={isLast ? "page" : undefined}
                    className={cn(
                      isLast ? "font-bold text-text" : "text-text-muted",
                    )}
                  >
                    {slot.item.label}
                  </span>
                ) : (
                  <a
                    href={slot.item.href}
                    className="text-text-muted hover:text-text hover:underline"
                  >
                    {slot.item.label}
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
