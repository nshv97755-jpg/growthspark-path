import { createFileRoute, Outlet, Link, useRouterState } from "@tanstack/react-router";
import { Bell, Menu } from "lucide-react";
import { useTranslation } from "react-i18next";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { LanguageSelector } from "@/components/language-selector";
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

function DashboardLayout() {
  const { t, i18n } = useTranslation();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const titleMap: Record<string, string> = {
    "/dashboard": t("sidebar.dashboard"),
    "/dashboard/analyze": t("sidebar.analyze"),
    "/dashboard/reports": t("sidebar.reports"),
    "/dashboard/report": t("sidebar.reports"),
    "/dashboard/history": t("sidebar.history"),
    "/dashboard/billing": t("sidebar.billing"),
    "/dashboard/settings": t("sidebar.settings"),
  };
  const title =
    titleMap[pathname] ??
    (pathname
      .split("/")
      .pop()
      ?.replace(/-/g, " ")
      .replace(/^\w/, (c) => c.toUpperCase()) ??
      t("sidebar.dashboard"));
  // reference i18n.language to re-render on language change
  void i18n.language;

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-40 flex items-center justify-between border-b border-border bg-background/70 px-4 py-3 backdrop-blur-xl sm:px-8">
          <div className="flex items-center gap-3">
            <MobileNav />
            <h1 className="font-display text-lg font-semibold capitalize">{title}</h1>
          </div>
          <div className="flex items-center gap-2">
            <LanguageSelector compact />
            <NotificationBell />
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-sm font-semibold text-primary-foreground">
              A
            </span>
          </div>
        </header>
        <main className="min-w-0 flex-1 px-4 py-6 sm:px-8 sm:py-8">
          <Outlet />
        </main>
      </div>
    </div>
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
            <span className="absolute right-1.5 top-1.5 flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-72">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications.map((n, i) => (
          <DropdownMenuItem key={i} className="flex flex-col items-start gap-0.5 py-2.5">
            <span className="flex items-center gap-2 text-sm">
              {n.unread && <span className="h-1.5 w-1.5 rounded-full bg-accent" />}
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
  { key: "sidebar.dashboard", to: "/dashboard" },
  { key: "sidebar.analyze", to: "/dashboard/analyze" },
  { key: "sidebar.reports", to: "/dashboard/reports" },
  { key: "sidebar.history", to: "/dashboard/history" },
  { key: "sidebar.billing", to: "/dashboard/billing" },
  { key: "sidebar.settings", to: "/dashboard/settings" },
] as const;

function MobileNav() {
  const { t } = useTranslation();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open navigation menu">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 bg-sidebar p-5">
        <Logo />
        <nav className="mt-8 flex flex-col gap-1">
          {mobileLinks.map((l) => (
            <SheetClose asChild key={l.to}>
              <Link
                to={l.to}
                activeProps={{ className: "bg-secondary text-foreground" }}
                activeOptions={{ exact: l.to === "/dashboard" }}
                className="rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                {t(l.key)}
              </Link>
            </SheetClose>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
