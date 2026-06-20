import {
  Children,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { cn } from "../lib/cn";

export function nextIndex(
  current: number,
  count: number,
  dir: 1 | -1,
  loop: boolean,
) {
  const n = current + dir;
  if (n < 0) return loop ? count - 1 : 0;
  if (n >= count) return loop ? 0 : count - 1;
  return n;
}

export interface CarouselProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "title"
> {
  children: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  seeAllHref?: string;
  arrows?: boolean;
  indicators?: boolean;
  autoSlide?: boolean;
  interval?: number;
  loop?: boolean;
  gap?: number;
}

export function Carousel({
  children,
  title,
  description,
  seeAllHref,
  arrows = true,
  indicators = true,
  autoSlide = false,
  interval = 5000,
  loop = true,
  gap = 16,
  className,
  ...props
}: CarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const items = Children.toArray(children);
  const count = items.length;
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  const scrollToIndex = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const child = track.children[index] as HTMLElement | undefined;
    child?.scrollIntoView({
      behavior: "smooth",
      inline: "start",
      block: "nearest",
    });
  }, []);

  const go = useCallback(
    (dir: 1 | -1) => {
      setActive((cur) => {
        const target = nextIndex(cur, count, dir, loop);
        scrollToIndex(target);
        return target;
      });
    },
    [count, loop, scrollToIndex],
  );

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = Array.prototype.indexOf.call(
              track.children,
              entry.target,
            );
            if (idx >= 0) setActive(idx);
          }
        }
      },
      { root: track, threshold: 0.6 },
    );
    for (const child of Array.from(track.children)) observer.observe(child);
    return () => observer.disconnect();
  }, [count]);

  useEffect(() => {
    if (!autoSlide || count <= 1) return;
    const step = 50;
    let elapsed = 0;
    const id = setInterval(() => {
      elapsed += step;
      setProgress(Math.min(1, elapsed / interval));
      if (elapsed >= interval) {
        elapsed = 0;
        go(1);
      }
    }, step);
    return () => clearInterval(id);
  }, [autoSlide, interval, count, active, go]);

  return (
    <div className={cn("flex flex-col gap-4", className)} {...props}>
      {(title || description || seeAllHref || arrows) && (
        <div className="flex items-end justify-between gap-4">
          <div className="flex flex-col gap-1">
            {title && <h3 className="text-xl font-bold text-text">{title}</h3>}
            {description && (
              <p className="text-sm text-text-muted">{description}</p>
            )}
          </div>
          <div className="flex items-center gap-2">
            {seeAllHref && (
              <a
                href={seeAllHref}
                className="text-sm font-bold text-primary hover:underline"
              >
                See all
              </a>
            )}
            {arrows && (
              <>
                <ArrowButton dir="prev" onClick={() => go(-1)} />
                <ArrowButton dir="next" onClick={() => go(1)} />
              </>
            )}
          </div>
        </div>
      )}

      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ gap }}
      >
        {items.map((child, i) => (
          <div key={i} className="shrink-0 snap-start">
            {child}
          </div>
        ))}
      </div>

      {indicators && count > 1 && (
        <div className="flex justify-center gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === active}
              onClick={() => {
                setActive(i);
                scrollToIndex(i);
              }}
              className="relative size-2 overflow-hidden rounded-full bg-border"
            >
              <span
                className={cn(
                  "absolute inset-0 rounded-full bg-primary transition-transform",
                  i === active ? "scale-100" : "scale-0",
                )}
                style={
                  autoSlide && i === active
                    ? {
                        transform: `scaleX(${progress})`,
                        transformOrigin: "left",
                      }
                    : undefined
                }
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ArrowButton({
  dir,
  onClick,
}: {
  dir: "prev" | "next";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={dir === "prev" ? "Previous" : "Next"}
      onClick={onClick}
      className="flex size-8 items-center justify-center rounded-full border border-border text-text transition-colors hover:bg-hover"
    >
      <svg
        className={cn("size-4", dir === "prev" && "rotate-180")}
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="m6 4 4 4-4 4" />
      </svg>
    </button>
  );
}
