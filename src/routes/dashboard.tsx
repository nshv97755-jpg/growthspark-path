import { createFileRoute, Outlet, Link, useRouterState } from "@tanstack/react-router";
import { Bell, Menu, ChevronRight, User, Settings, CreditCard, LogOut } from "lucide-react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — GrowthPilot" }] }),
  component: DashboardLayout,
});

const notifications = [
  { title: "Your report is ready", time: "2m ago", unread: true },
  { title: "@focusflow analysis completed", time: "1h ago", unread: true },
  { title: "Weekly growth digest available", time: "Yesterday", unread: false },
];

const navItems = [
  { label: "Dashboard", to: "/dashboard", exact: true },
  { label: "Analyze", to: "/dashboard/analyze", exact: false },
  { label: "Reports", to: "/dashboard/reports", exact: false },
  { label: "History", to: "/dashboard/history", exact: false },
  { label: "Billing", to: "/dashboard/billing", exact: false },
] as const;

const pageLabels: Record<string, string> = {
  dashboard: "Dashboard",
  analyze: "Analyze Profile",
  report: "Premium Report",
  reports: "Reports",
  history: "History",
  billing: "Billing",
  settings: "Settings",
};

function labelFor(segment: string) {
  return (
    pageLabels[segment] ??
    segment.replace(/-/g, " ").replace(/^\w/, (c) => c.toUpperCase())
  );
}

function DashboardLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const segments = pathname.split("/").filter(Boolean); // ["dashboard", ...]
  const crumbs = segments.map((seg, i) => ({
    label: labelFor(seg),
    to: "/" + segments.slice(0, i + 1).join("/"),
    isLast: i === segments.length - 1,
  }));

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Top nav */}
      <header className="sticky top-0 z-40 border-b border-border bg-card">
        <div className="mx-auto flex h-[60px] w-full max-w-7xl items-center justify-between px-4 sm:px-8">
          <div className="flex items-center gap-6">
            <MobileNav />
            <Link to="/dashboard" aria-label="GrowthPilot dashboard">
              <Logo />
            </Link>
            <nav className="hidden items-center gap-1 lg:flex">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  activeOptions={{ exact: item.exact }}
                  activeProps={{ className: "text-primary bg-primary/10" }}
                  inactiveProps={{ className: "text-muted-foreground hover:text-foreground hover:bg-secondary" }}
                  className="rounded-md px-3 py-2 text-sm font-medium transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <NotificationBell />
            <UserMenu />
          </div>
        </div>
        {/* Breadcrumbs */}
        <div className="hidden border-t border-border bg-card sm:block">
          <nav
            aria-label="Breadcrumb"
            className="mx-auto flex w-full max-w-7xl items-center gap-1.5 px-4 py-2 text-sm sm:px-8"
          >
            {crumbs.map((c) => (
              <span key={c.to} className="flex items-center gap-1.5">
                {c.isLast ? (
                  <span className="font-medium text-foreground">{c.label}</span>
                ) : (
                  <>
                    <Link to={c.to} className="text-muted-foreground hover:text-foreground">
                      {c.label}
                    </Link>
                    <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                  </>
                )}
              </span>
            ))}
          </nav>
        </div>
      </header>

      {/* Full-width main content */}
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-8 sm:py-8">
        <Outlet />
      </main>
    </div>
  );
}

function UserMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground"
          aria-label="Open user menu"
        >
          A
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>My account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/dashboard/settings">
            <User className="mr-2 h-4 w-4" /> Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/dashboard/billing">
            <CreditCard className="mr-2 h-4 w-4" /> Billing
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/dashboard/settings">
            <Settings className="mr-2 h-4 w-4" /> Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/">
            <LogOut className="mr-2 h-4 w-4" /> Log out
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function NotificationBell() {
  const unread = notifications.filter((n) => n.unread).length;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative rounded-full" aria-label="Notifications">
          <Bell className="h-5 w-5" />
          {unread > 0 && (
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-72">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications.map((n, i) => (
          <DropdownMenuItem key={i} className="flex flex-col items-start gap-0.5 py-2.5">
            <span className="flex items-center gap-2 text-sm">
              {n.unread && <span className="h-1.5 w-1.5 rounded-full bg-primary" />}
              {n.title}
            </span>
            <span className="text-xs text-muted-foreground">{n.time}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const mobileLinks = [
  { label: "Dashboard", to: "/dashboard", exact: true },
  { label: "Analyze Profile", to: "/dashboard/analyze", exact: false },
  { label: "Reports", to: "/dashboard/reports", exact: false },
  { label: "History", to: "/dashboard/history", exact: false },
  { label: "Billing", to: "/dashboard/billing", exact: false },
  { label: "Settings", to: "/dashboard/settings", exact: false },
] as const;

function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open navigation menu">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 bg-card p-5">
        <Logo />
        <nav className="mt-8 flex flex-col gap-1">
          {mobileLinks.map((l) => (
            <SheetClose asChild key={l.to}>
              <Link
                to={l.to}
                activeProps={{ className: "bg-primary/10 text-primary" }}
                activeOptions={{ exact: l.exact }}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                {l.label}
              </Link>
            </SheetClose>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
