import { createContext, useContext, type ReactNode } from "react";
import { cn } from "../lib/cn";
import { Tooltip } from "./Tooltip";

const SidebarContext = createContext<{ collapsed: boolean }>({
  collapsed: false,
});

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  collapsed?: boolean;
  children: ReactNode;
}

export function Sidebar({
  collapsed = false,
  className,
  children,
  ...props
}: SidebarProps) {
  return (
    <SidebarContext.Provider value={{ collapsed }}>
      <nav
        data-collapsed={collapsed || undefined}
        className={cn(
          "flex h-full flex-col gap-4 bg-surface text-text transition-[width] duration-200",
          collapsed ? "w-16 p-2" : "w-[280px] p-6",
          className,
        )}
        {...props}
      >
        {children}
      </nav>
    </SidebarContext.Provider>
  );
}

export interface SidebarSectionProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "title"
> {
  title?: ReactNode;
  divider?: boolean;
  children: ReactNode;
}

export function SidebarSection({
  title,
  divider,
  className,
  children,
  ...props
}: SidebarSectionProps) {
  const { collapsed } = useContext(SidebarContext);
  return (
    <>
      {divider && <hr className="border-t border-border" />}
      <div className={cn("flex flex-col gap-1", className)} {...props}>
        {title && !collapsed && (
          <span className="px-2 text-sm text-text-muted">{title}</span>
        )}
        <div className="flex flex-col gap-1">{children}</div>
      </div>
    </>
  );
}

export interface SidebarItemProps extends Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  "title"
> {
  icon?: ReactNode;
  active?: boolean;
  label: ReactNode;
}

export function SidebarItem({
  icon,
  active,
  label,
  href,
  className,
  ...props
}: SidebarItemProps) {
  const { collapsed } = useContext(SidebarContext);

  const row = (
    <a
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex items-center gap-3 rounded-[8px] px-2 py-2 text-sm transition-colors outline-none focus-visible:outline-2 focus-visible:outline-primary",
        collapsed && "justify-center",
        active
          ? "bg-primary-tint font-bold text-primary"
          : "text-text hover:bg-hover",
        className,
      )}
      {...props}
    >
      {icon && (
        <span className="flex size-6 shrink-0 items-center justify-center [&_svg]:size-6">
          {icon}
        </span>
      )}
      {!collapsed && <span className="flex-1 truncate">{label}</span>}
    </a>
  );

  if (collapsed) {
    return (
      <Tooltip
        content={label}
        placement="right"
        className="w-full [&>a]:w-full"
      >
        {row}
      </Tooltip>
    );
  }
  return row;
}
