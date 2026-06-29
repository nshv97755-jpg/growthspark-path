import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Download,
  Save,
  GitCompare,
  Lightbulb,
  AlertTriangle,
  ListChecks,
  Hash,
  CalendarDays,
  Target,
  Users,
  Quote,
  TrendingUp,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { reportData, sampleAnalysis } from "@/lib/mock";

export const Route = createFileRoute("/dashboard/report")({
  head: () => ({ meta: [{ title: "Premium Report — GrowthPilot" }] }),
  component: ReportPage,
});

const pieColors = [
  "oklch(0.64 0.21 282)",
  "oklch(0.78 0.14 200)",
  "oklch(0.74 0.16 156)",
  "oklch(0.8 0.16 78)",
];

function ReportPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-8">
      {/* Header */}
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl glass-strong p-8 shadow-card">
          <div
            className="absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-30 blur-3xl"
            style={{ background: "var(--gradient-brand)" }}
          />
          <span className="inline-flex items-center gap-2 rounded-full bg-success/15 px-3 py-1 text-xs font-medium text-success">
            <TrendingUp className="h-3.5 w-3.5" /> Full report unlocked
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold">
            Growth report for <span className="text-gradient">@{sampleAnalysis.username}</span>
          </h2>
          <p className="mt-2 max-w-xl text-muted-foreground">
            Your complete, personalized playbook to break the plateau and scale.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Button variant="hero" size="sm" onClick={() => toast.success("Generating your PDF…")}>
              <Download className="mr-1 h-4 w-4" /> Export PDF
            </Button>
            <Button variant="glass" size="sm" onClick={() => toast.success("Report saved to your library")}>
              <Save className="mr-1 h-4 w-4" /> Save report
            </Button>
            <Button asChild variant="glass" size="sm">
              <Link to="/dashboard/history">
                <GitCompare className="mr-1 h-4 w-4" /> Compare
              </Link>
            </Button>
          </div>
        </div>
      </Reveal>

      {/* Why not growing */}
      <Section icon={Lightbulb} title="Why You're Not Growing">
        <p className="leading-relaxed text-muted-foreground">{reportData.whyNotGrowing}</p>
      </Section>

      {/* Top 5 mistakes */}
      <Section icon={AlertTriangle} title="Top 5 Mistakes">
        <div className="grid gap-4 sm:grid-cols-2">
          {reportData.mistakes.map((m, i) => (
            <div key={m.title} className="rounded-2xl bg-secondary/50 p-5">
              <span className="font-display text-2xl font-bold text-gradient">0{i + 1}</span>
              <h4 className="mt-2 font-semibold">{m.title}</h4>
              <p className="mt-1 text-sm text-muted-foreground">{m.detail}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Recommendations */}
      <Section icon={ListChecks} title="Personalized Recommendations">
        <ul className="space-y-3">
          {reportData.recommendations.map((r, i) => (
            <li key={i} className="flex items-start gap-3 rounded-xl bg-secondary/50 px-4 py-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-semibold text-primary-foreground">
                {i + 1}
              </span>
              <span className="text-sm">{r}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* Content strategy + pie */}
      <Section icon={Target} title="Content Strategy">
        <div className="grid items-center gap-6 sm:grid-cols-2">
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={reportData.strategy}
                  dataKey="share"
                  nameKey="pillar"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={3}
                >
                  {reportData.strategy.map((_, i) => (
                    <Cell key={i} fill={pieColors[i % pieColors.length]} stroke="none" />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "oklch(0.2 0.02 271)",
                    border: "1px solid oklch(0.3 0.02 271)",
                    borderRadius: 12,
                    color: "white",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3">
            {reportData.strategy.map((s, i) => (
              <div key={s.pillar} className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ background: pieColors[i % pieColors.length] }}
                  />
                  <span className="font-medium">{s.pillar}</span>
                  <span className="text-muted-foreground">— {s.note}</span>
                </span>
                <span className="text-sm font-semibold">{s.share}%</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* 7-day plan */}
      <Section icon={CalendarDays} title="7-Day Growth Plan">
        <div className="grid gap-3 sm:grid-cols-2">
          {reportData.weekPlan.map((d) => (
            <div key={d.day} className="flex items-start gap-3 rounded-xl bg-secondary/50 p-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand text-xs font-bold text-primary-foreground">
                {d.day}
              </span>
              <div>
                <p className="text-sm font-medium">{d.task}</p>
                <span className="mt-1 inline-flex rounded-full bg-background px-2 py-0.5 text-xs text-accent">
                  {d.goal}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Growth forecast */}
      <Section icon={TrendingUp} title="Growth Forecast">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={reportData.forecast}>
              <defs>
                <linearGradient id="repArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.78 0.14 200)" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="oklch(0.78 0.14 200)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" stroke="oklch(0.68 0.02 271)" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  background: "oklch(0.2 0.02 271)",
                  border: "1px solid oklch(0.3 0.02 271)",
                  borderRadius: 12,
                  color: "white",
                }}
              />
              <Area type="monotone" dataKey="followers" stroke="oklch(0.78 0.14 200)" strokeWidth={3} fill="url(#repArea)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Projected followers (K) over 6 months if you apply the plan.
        </p>
      </Section>

      {/* 30 content ideas */}
      <Section icon={Lightbulb} title="30 Content Ideas">
        <div className="grid gap-2 sm:grid-cols-2">
          {reportData.contentIdeas.map((idea, i) => (
            <div key={i} className="flex items-start gap-2.5 rounded-lg bg-secondary/40 px-3 py-2 text-sm">
              <span className="text-xs font-semibold text-accent">{String(i + 1).padStart(2, "0")}</span>
              {idea}
            </div>
          ))}
        </div>
      </Section>

      {/* Captions */}
      <Section icon={Quote} title="10 Viral Caption Ideas">
        <div className="space-y-3">
          {reportData.captions.map((c, i) => (
            <div key={i} className="rounded-xl bg-secondary/50 p-4 text-sm italic text-foreground/90">
              "{c}"
            </div>
          ))}
        </div>
      </Section>

      {/* Hashtags */}
      <Section icon={Hash} title="Hashtag Suggestions">
        <div className="flex flex-wrap gap-2">
          {reportData.hashtags.map((h) => (
            <span key={h} className="rounded-full glass px-3.5 py-1.5 text-sm text-accent">
              {h}
            </span>
          ))}
        </div>
      </Section>

      {/* Competitors */}
      <Section icon={Users} title="Competitor Suggestions">
        <div className="grid gap-4 sm:grid-cols-3">
          {reportData.competitors.map((c) => (
            <div key={c.name} className="rounded-2xl bg-secondary/50 p-5 text-center">
              <span className="flex h-12 w-12 mx-auto items-center justify-center rounded-full bg-brand font-semibold text-primary-foreground">
                {c.name[1].toUpperCase()}
              </span>
              <p className="mt-3 font-medium">{c.name}</p>
              <p className="text-sm text-muted-foreground">{c.followers} followers</p>
              <p className="mt-2 text-xs text-accent">{c.why}</p>
            </div>
          ))}
        </div>
      </Section>

      <div className="rounded-3xl glass-strong p-8 text-center">
        <h3 className="font-display text-xl font-bold">Keep your momentum</h3>
        <p className="mt-2 text-sm text-muted-foreground">Re-analyze monthly to track your progress.</p>
        <Button asChild variant="hero" size="lg" className="mt-5">
          <Link to="/dashboard/analyze">Analyze again</Link>
        </Button>
      </div>
    </div>
  );
}

function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Target;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal>
      <section className="rounded-3xl glass p-6 sm:p-8">
        <div className="mb-5 flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand shadow-glow">
            <Icon className="h-5 w-5 text-primary-foreground" />
          </span>
          <h3 className="font-display text-xl font-semibold">{title}</h3>
        </div>
        {children}
      </section>
    </Reveal>
  );
}

