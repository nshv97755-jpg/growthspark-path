import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  ScanSearch,
  FileText,
  History,
  CreditCard,
  Settings,
  LogOut,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Logo } from "@/components/logo";

export function DashboardSidebar() {
  const { t } = useTranslation();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const nav = [
    { label: t("sidebar.dashboard"), to: "/dashboard", icon: LayoutDashboard, exact: true },
    { label: t("sidebar.analyze"), to: "/dashboard/analyze", icon: ScanSearch, exact: false },
    { label: t("sidebar.reports"), to: "/dashboard/reports", icon: FileText, exact: false },
    { label: t("sidebar.history"), to: "/dashboard/history", icon: History, exact: false },
    { label: t("sidebar.billing"), to: "/dashboard/billing", icon: CreditCard, exact: false },
    { label: t("sidebar.settings"), to: "/dashboard/settings", icon: Settings, exact: false },
  ] as const;

  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-border bg-sidebar px-4 py-5 lg:flex">
      <div className="px-2">
        <Logo />
      </div>

      <nav className="mt-8 flex flex-1 flex-col gap-1">
        {nav.map((item) => {
          const active = item.exact
            ? pathname === item.to
            : pathname.startsWith(item.to);
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
              }`}
            >
              {active && (
                <span className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-brand" />
              )}
              <item.icon className="h-4.5 w-4.5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto rounded-2xl glass p-4">
        <p className="text-xs font-medium text-foreground">{t("common.freePlan")}</p>
        <p className="mt-1 text-xs text-muted-foreground">{t("common.perDay")}</p>
        <Link
          to="/dashboard/billing"
          className="mt-3 block rounded-lg bg-brand px-3 py-2 text-center text-xs font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
        >
          {t("common.upgrade")}
        </Link>
      </div>

      <Link
        to="/"
        className="mt-3 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-secondary/60 hover:text-foreground"
      >
        <LogOut className="h-4.5 w-4.5" /> {t("common.signOut")}
      </Link>
    </aside>
  );
}
