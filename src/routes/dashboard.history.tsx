import { createFileRoute, Link } from "@tanstack/react-router";
import { GitCompare, ArrowRight, Search } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { historyItems } from "@/lib/mock";

export const Route = createFileRoute("/dashboard/history")({
  head: () => ({ meta: [{ title: "History — GrowthPilot" }] }),
  component: HistoryPage,
});

function HistoryPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold">Analysis history</h2>
          <p className="text-sm text-muted-foreground">Every profile you've analyzed.</p>
        </div>
        <Button variant="glass" size="sm">
          <GitCompare className="mr-1 h-4 w-4" /> Compare reports
        </Button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search history" className="pl-9" />
      </div>

      <Reveal>
        <div className="overflow-hidden rounded-2xl glass">
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
              {historyItems.map((h) => (
                <tr key={h.username} className="border-b border-border/60 last:border-0 hover:bg-secondary/40">
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
    </div>
  );
}
