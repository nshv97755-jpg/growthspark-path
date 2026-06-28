import { createFileRoute, Link } from "@tanstack/react-router";
import { FileText, Download, ArrowRight, Plus } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { historyItems } from "@/lib/mock";

export const Route = createFileRoute("/dashboard/reports")({
  head: () => ({ meta: [{ title: "Reports — GrowthPilot" }] }),
  component: Reports,
});

function Reports() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold">Your reports</h2>
          <p className="text-sm text-muted-foreground">Full growth playbooks you've generated.</p>
        </div>
        <Button asChild variant="hero" size="sm">
          <Link to="/dashboard/analyze">
            <Plus className="mr-1 h-4 w-4" /> New report
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {historyItems.map((h, i) => (
          <Reveal key={h.username} delay={i * 0.05}>
            <div className="group flex h-full flex-col rounded-2xl glass p-5 transition-all hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand">
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
                <Button variant="ghost" size="icon" className="rounded-lg">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
