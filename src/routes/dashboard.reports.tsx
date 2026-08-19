import { createFileRoute, Link } from "@tanstack/react-router";
import { FileText, Download, ArrowRight, Plus } from "lucide-react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { Reveal } from "@/components/reveal";
import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import { historyItems } from "@/lib/mock";

export const Route = createFileRoute("/dashboard/reports")({
  head: () => ({
    meta: [
      { title: "Reports — GrowthPilot" },
      { name: "description", content: "All of your saved GrowthPilot premium reports in one place, ready to review, revisit and act on." },
      { property: "og:title", content: "Reports — GrowthPilot" },
      { property: "og:description", content: "All of your saved GrowthPilot premium reports in one place, ready to review, revisit and act on." },
      { property: "og:url", content: "https://growthspark-path.lovable.app/dashboard/reports" },
    ],
  }),
  component: Reports,
});

function Reports() {
  const { t } = useTranslation();
  const reports = historyItems;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold">{t("pages.reports.title")}</h2>
          <p className="text-sm text-muted-foreground">{t("pages.reports.subtitle")}</p>
        </div>
        <Button asChild variant="hero" size="sm">
          <Link to="/dashboard/analyze">
            <Plus className="mr-1 h-4 w-4" /> {t("common.newReport")}
          </Link>
        </Button>
      </div>

      {reports.length === 0 ? (
        <EmptyState
          icon={FileText}
          title={t("pages.reports.emptyTitle")}
          description={t("pages.reports.emptyDesc")}
          action={
            <Button asChild variant="hero" size="sm">
              <Link to="/dashboard/analyze">
                <Plus className="mr-1 h-4 w-4" /> {t("common.analyzeProfile")}
              </Link>
            </Button>
          }
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reports.map((h, i) => (
            <Reveal key={h.username} delay={i * 0.05}>
              <div className="group flex h-full flex-col rounded-2xl glass p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
                <div className="flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand transition-transform group-hover:scale-105">
                    <FileText className="h-5 w-5 text-primary-foreground" />
                  </span>
                  <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs text-muted-foreground">
                    {h.potential} potential
                  </span>
                </div>
                <p className="mt-4 font-display text-lg font-semibold">{h.username}</p>
                <p className="text-xs text-muted-foreground">Generated {h.date}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-display text-2xl font-bold text-gradient">{h.score}</span>
                  <span className="text-xs text-muted-foreground">/ 100</span>
                </div>
                <div className="mt-5 flex gap-2">
                  <Button asChild variant="glass" size="sm" className="flex-1">
                    <Link to="/dashboard/report">
                      Open <ArrowRight className="ml-1 h-3.5 w-3.5" />
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-lg"
                    aria-label={`Download report for ${h.username}`}
                    onClick={() => toast.success(`Preparing PDF for ${h.username}…`)}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
