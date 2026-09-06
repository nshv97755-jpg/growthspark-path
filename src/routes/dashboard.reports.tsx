import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { FileText, Download, ArrowRight, Plus, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { Reveal } from "@/components/reveal";
import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import { listReportsWithAnalysis, type ReportWithAnalysis } from "@/lib/db";
import { downloadNodeAsPdf } from "@/lib/pdf";

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

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
  } catch {
    return iso;
  }
}

/** Builds a plain, print-friendly offscreen node summarizing a report,
 * used to render a PDF without needing to visit the full report page. */
function buildSummaryNode(report: ReportWithAnalysis): HTMLDivElement {
  const c = (report.content ?? {}) as Record<string, any>;
  const username = report.analysis?.username ?? "unknown";
  const score = report.analysis?.score ?? c.growthScore ?? "—";
  const potential = report.analysis?.potential ?? c.growthPotential ?? "—";

  const node = document.createElement("div");
  node.style.cssText =
    "font-family: Inter, Arial, sans-serif; color: #111; background: #fff; padding: 24px; width: 700px;";

  const list = (items: unknown) =>
    Array.isArray(items)
      ? `<ul style="margin:4px 0 0; padding-left:18px;">${items
          .map((i) => `<li style="margin-bottom:4px;">${escapeHtml(String(i))}</li>`)
          .join("")}</ul>`
      : "";

  node.innerHTML = `
    <h1 style="font-size:22px; margin:0 0 4px;">Growth report — @${escapeHtml(username)}</h1>
    <p style="color:#555; margin:0 0 20px;">Generated ${formatDate(report.created_at)}</p>

    <div style="display:flex; gap:24px; margin-bottom:20px;">
      <div><strong>Growth score:</strong> ${escapeHtml(String(score))}/100</div>
      <div><strong>Potential:</strong> ${escapeHtml(String(potential))}</div>
    </div>

    ${c.whyNotGrowing ? `<h2 style="font-size:16px;">Why you're not growing</h2><p>${escapeHtml(c.whyNotGrowing)}</p>` : ""}
    ${c.mistakes ? `<h2 style="font-size:16px;">Top mistakes</h2>${list(c.mistakes.map((m: any) => m.title ?? m))}` : ""}
    ${c.recommendations ? `<h2 style="font-size:16px;">Recommendations</h2>${list(c.recommendations)}` : ""}
    ${c.contentIdeas ? `<h2 style="font-size:16px;">Content ideas</h2>${list(c.contentIdeas)}` : ""}
    ${c.captions ? `<h2 style="font-size:16px;">Captions</h2>${list(c.captions)}` : ""}
    ${c.hashtags ? `<h2 style="font-size:16px;">Hashtags</h2><p>${escapeHtml((c.hashtags as string[]).join(" "))}</p>` : ""}
  `;
  return node;
}

function escapeHtml(str: string) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function Reports() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [reports, setReports] = useState<ReportWithAnalysis[]>([]);
  const [loading, setLoading] = useState(true);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  useEffect(() => {
    listReportsWithAnalysis().then((rows) => {
      setReports(rows);
      setLoading(false);
    });
  }, []);

  const openReport = (report: ReportWithAnalysis) => {
    sessionStorage.setItem(
      "gp_report",
      JSON.stringify({ username: report.analysis?.username ?? "unknown", data: report.content }),
    );
    navigate({ to: "/dashboard/report" });
  };

  const downloadReport = async (report: ReportWithAnalysis) => {
    setDownloadingId(report.id);
    const toastId = toast.loading("Generating your PDF…");
    const node = buildSummaryNode(report);
    node.style.position = "fixed";
    node.style.left = "-9999px";
    document.body.appendChild(node);
    try {
      await downloadNodeAsPdf(node, `growthpilot-report-${report.analysis?.username ?? report.id}.pdf`);
      toast.success("PDF downloaded", { id: toastId });
    } catch (err) {
      toast.error("Couldn't generate the PDF. Please try again.", { id: toastId });
      console.error("[downloadReport] failed:", err);
    } finally {
      document.body.removeChild(node);
      setDownloadingId(null);
    }
  };

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

      {loading ? (
        <div className="flex min-h-[30vh] items-center justify-center text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />
        </div>
      ) : reports.length === 0 ? (
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
          {reports.map((r, i) => (
            <Reveal key={r.id} delay={i * 0.05}>
              <div className="group flex h-full flex-col rounded-2xl glass p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
                <div className="flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand transition-transform group-hover:scale-105">
                    <FileText className="h-5 w-5 text-primary-foreground" />
                  </span>
                  <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs text-muted-foreground">
                    {r.analysis?.potential ?? "—"} potential
                  </span>
                </div>
                <p className="mt-4 font-display text-lg font-semibold">
                  @{r.analysis?.username ?? "unknown"}
                </p>
                <p className="text-xs text-muted-foreground">Generated {formatDate(r.created_at)}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-display text-2xl font-bold text-gradient">
                    {r.analysis?.score ?? "—"}
                  </span>
                  <span className="text-xs text-muted-foreground">/ 100</span>
                </div>
                <div className="mt-5 flex gap-2">
                  <Button variant="glass" size="sm" className="flex-1" onClick={() => openReport(r)}>
                    Open <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-lg"
                    aria-label={`Download report for ${r.analysis?.username ?? "report"}`}
                    disabled={downloadingId === r.id}
                    onClick={() => downloadReport(r)}
                  >
                    {downloadingId === r.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Download className="h-4 w-4" />
                    )}
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
