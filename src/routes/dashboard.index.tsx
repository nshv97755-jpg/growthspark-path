import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  TrendingUp,
  Users,
  Activity,
  Sparkles,
  ScanSearch,
} from "lucide-react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { reportData, historyItems } from "@/lib/mock";

export const Route = createFileRoute("/dashboard/")({
  component: Overview,
});

const stats = [
  { label: "Avg Growth Score", value: "73", delta: "+6", icon: TrendingUp },
  { label: "Profiles Analyzed", value: "12", delta: "+3", icon: Users },
  { label: "Issues Detected", value: "47", delta: "fixable", icon: Activity },
  { label: "Reports Generated", value: "5", delta: "+1", icon: Sparkles },
];

function Overview() {
  return (
    <div className="space-y-8">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl glass-strong p-8 shadow-card">
          <div
            className="absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-30 blur-3xl"
            style={{ background: "var(--gradient-brand)" }}
          />
          <p className="text-sm text-muted-foreground">Welcome back, Alex</p>
          <h2 className="mt-1 max-w-lg font-display text-3xl font-bold">
            Ready to find what's holding your growth back?
          </h2>
          <p className="mt-3 max-w-md text-muted-foreground">
            Run a fresh analysis and get an updated Growth Score in under a minute.
          </p>
          <Button asChild variant="hero" size="lg" className="mt-6">
            <Link to="/dashboard/analyze">
              <ScanSearch className="mr-1 h-4 w-4" /> Analyze a profile
            </Link>
          </Button>
        </div>
      </Reveal>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.05}>
            <div className="rounded-2xl glass p-5">
              <div className="flex items-center justify-between">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary">
                  <s.icon className="h-4.5 w-4.5 text-accent" />
                </span>
                <span className="rounded-full bg-success/15 px-2 py-0.5 text-xs font-medium text-success">
                  {s.delta}
                </span>
              </div>
              <p className="mt-4 font-grotesk text-3xl font-bold tracking-tight">{s.value}</p>
              <p className="text-sm text-muted-foreground">{s.label}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Reveal className="lg:col-span-2">
          <div className="h-full rounded-2xl glass p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display text-lg font-semibold">Growth trajectory</h3>
                <p className="text-sm text-muted-foreground">Projected followers (in thousands)</p>
              </div>
              <span className="flex items-center gap-1 text-sm text-success">
                <ArrowUpRight className="h-4 w-4" /> +162%
              </span>
            </div>
            <div className="mt-6 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={reportData.forecast}>
                  <defs>
                    <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#d4a94e" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="#d4a94e" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="month"
                    stroke="#8b8b93"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "#111112",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 12,
                      color: "white",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="followers"
                    stroke="#d4a94e"
                    strokeWidth={3}
                    fill="url(#areaGrad)"
                  />

                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="h-full rounded-2xl glass p-6">
            <h3 className="font-display text-lg font-semibold">Recent analyses</h3>
            <div className="mt-4 space-y-3">
              {historyItems.slice(0, 4).map((h) => (
                <div
                  key={h.username}
                  className="flex items-center justify-between rounded-xl bg-secondary/50 px-3 py-2.5"
                >
                  <div>
                    <p className="text-sm font-medium">{h.username}</p>
                    <p className="text-xs text-muted-foreground">{h.date}</p>
                  </div>
                  <span className="font-display text-lg font-semibold text-gradient">{h.score}</span>
                </div>
              ))}
            </div>
            <Button asChild variant="glass" size="sm" className="mt-4 w-full">
              <Link to="/dashboard/history">View all</Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

