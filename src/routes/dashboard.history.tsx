import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { GitCompare, ArrowRight, Search, History as HistoryIcon } from "lucide-react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { Reveal } from "@/components/reveal";
import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { listAnalyses } from "@/lib/db";
import { historyItems } from "@/lib/mock";

export const Route = createFileRoute("/dashboard/history")({
  head: () => ({
    meta: [
      { title: "Analysis History — GrowthPilot" },
      { name: "description", content: "Browse every profile analysis you have run in GrowthPilot and track how your growth score changes over time." },
      { property: "og:title", content: "Analysis History — GrowthPilot" },
      { property: "og:description", content: "Browse every profile analysis you have run in GrowthPilot and track how your growth score changes over time." },
      { property: "og:url", content: "https://growthspark-path.lovable.app/dashboard/history" },
    ],
  }),
  component: HistoryPage,
});

function HistoryPage() {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const [items, setItems] = useState(historyItems);

  useEffect(() => {
    let active = true;
    listAnalyses().then((rows) => {
      if (!active || rows.length === 0) return;
      setItems(
        rows.map((r) => ({
          username: `@${r.username}`,
          score: r.score ?? 0,
          potential: r.potential ?? "—",
          date: new Date(r.created_at).toLocaleDateString(undefined, {
            month: "short",
            day: "2-digit",
            year: "numeric",
          }),
        })),
      );
    });
    return () => {
      active = false;
    };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (h) => h.username.toLowerCase().includes(q) || h.potential.toLowerCase().includes(q),
    );
  }, [query, items]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold">{t("pages.history.title")}</h2>
          <p className="text-sm text-muted-foreground">{t("pages.history.subtitle")}</p>
        </div>
        <Button
          variant="glass"
          size="sm"
          onClick={() => toast(t("pages.history.compare") + " — " + t("common.comingSoon"))}
        >
          <GitCompare className="mr-1 h-4 w-4" /> {t("pages.history.compare")}
        </Button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("pages.history.searchPh")}
          className="pl-9"
          aria-label={t("pages.history.searchPh")}
        />
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={HistoryIcon}
          title={t("pages.history.empty")}
          description={`No analyses match "${query}".`}
          action={
            <Button variant="glass" size="sm" onClick={() => setQuery("")}>
              {t("common.close")}
            </Button>
          }
        />
      ) : (
        <Reveal>
          <div className="overflow-x-auto rounded-2xl glass">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="px-5 py-3 font-medium">Profile</th>
                  <th className="px-5 py-3 font-medium">Score</th>
                  <th className="hidden px-5 py-3 font-medium sm:table-cell">Potential</th>
                  <th className="hidden px-5 py-3 font-medium sm:table-cell">Date</th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody>
                {filtered.map((h) => (
                  <tr key={h.username} className="border-b border-border/60 transition-colors last:border-0 hover:bg-secondary/40">
                    <td className="px-5 py-4 font-medium">{h.username}</td>
                    <td className="px-5 py-4">
                      <span className="font-display text-base font-bold text-gradient">{h.score}</span>
                    </td>
                    <td className="hidden px-5 py-4 sm:table-cell">
                      <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs text-muted-foreground">
                        {h.potential}
                      </span>
                    </td>
                    <td className="hidden px-5 py-4 text-muted-foreground sm:table-cell">{h.date}</td>
                    <td className="px-5 py-4 text-right">
                      <Button asChild variant="ghost" size="sm">
                        <Link to="/dashboard/report">
                          View <ArrowRight className="ml-1 h-3.5 w-3.5" />
                        </Link>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      )}
    </div>
  );
}
