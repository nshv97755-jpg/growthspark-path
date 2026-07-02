import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { toast } from "sonner";
import {
  Download,
  Save,
  Lightbulb,
  AlertTriangle,
  ListChecks,
  Hash,
  CalendarDays,
  Target,
  Users,
  Quote,
  TrendingUp,
  Sparkles,
  Copy,
  Plus,
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
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { reportData, sampleAnalysis } from "@/lib/mock";

export const Route = createFileRoute("/dashboard/report")({
  head: () => ({ meta: [{ title: "Premium Report — GrowthPilot" }] }),
  component: ReportPage,
});

const pieColors = ["#3b82f6", "#60a5fa", "#8b5cf6", "#93c5fd"];

async function copyText(text: string, label = "Copied to clipboard") {
  try {
    await navigator.clipboard.writeText(text);
    toast.success(label);
  } catch {
    toast.error("Couldn't copy — try again");
  }
}

function ReportSkeleton() {
  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-card">
        <div className="flex items-center gap-3 text-primary">
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="h-5 w-5" />
          </motion.span>
          <span className="text-sm font-medium text-card-foreground">
            Compiling your growth report…
          </span>
        </div>
        <Skeleton className="mt-5 h-9 w-2/3" />
        <Skeleton className="mt-3 h-4 w-1/2" />
        <div className="mt-6 flex gap-2">
          <Skeleton className="h-9 w-28 rounded-md" />
          <Skeleton className="h-9 w-28 rounded-md" />
        </div>
      </div>
      {[0, 1, 2].map((i) => (
        <div key={i} className="rounded-2xl border border-border bg-card p-6 sm:p-8">
          <div className="mb-5 flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-lg" />
            <Skeleton className="h-5 w-48" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Skeleton className="h-24 rounded-xl" />
            <Skeleton className="h-24 rounded-xl" />
          </div>
        </div>
      ))}
    </div>
  );
}

function ReportPage() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 1100);
    return () => clearTimeout(t);
  }, []);

  if (!ready) return <ReportSkeleton />;

  return <ReportContent />;
}

function ReportContent() {
  return (
    <div className="mx-auto max-w-5xl space-y-8">
      {/* Header */}
      <Reveal>
        <div className="rounded-2xl border border-border bg-card p-8 shadow-card">
          <span className="inline-flex items-center gap-2 rounded-full bg-success/10 px-3 py-1 text-xs font-medium text-success">
            <TrendingUp className="h-3.5 w-3.5" /> Full report unlocked
          </span>
          <h2 className="mt-4 text-3xl font-bold text-card-foreground">
            Growth report for{" "}
            <span className="text-primary">@{sampleAnalysis.username}</span>
          </h2>
          <p className="mt-2 max-w-xl text-muted-foreground">
            Your complete, personalized playbook to break the plateau and scale.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Button size="sm" onClick={() => toast.success("Generating your PDF…")}>
              <Download className="mr-1 h-4 w-4" /> Export PDF
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => toast.success("Report saved to your library")}
            >
              <Save className="mr-1 h-4 w-4" /> Save report
            </Button>
          </div>
        </div>
      </Reveal>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="plan">7-Day Plan</TabsTrigger>
          <TabsTrigger value="ideas">Ideas &amp; Captions</TabsTrigger>
        </TabsList>

        {/* Overview */}
        <TabsContent value="overview" className="mt-6 space-y-8">
          <Section icon={Lightbulb} title="Why You're Not Growing">
            <p className="leading-relaxed text-muted-foreground">
              {reportData.whyNotGrowing}
            </p>
          </Section>

          <Section icon={AlertTriangle} title="Top 5 Mistakes">
            <div className="grid gap-4 sm:grid-cols-2">
              {reportData.mistakes.map((m, i) => (
                <div key={m.title} className="rounded-xl border border-border bg-secondary p-5">
                  <span className="text-2xl font-bold text-primary">0{i + 1}</span>
                  <h4 className="mt-2 font-semibold text-card-foreground">{m.title}</h4>
                  <p className="mt-1 text-sm text-muted-foreground">{m.detail}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section icon={ListChecks} title="Personalized Action Plan">
            <ul className="space-y-3">
              {reportData.recommendations.map((r, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 rounded-lg border border-border bg-secondary px-4 py-3"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                    {i + 1}
                  </span>
                  <span className="text-sm text-card-foreground">{r}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section icon={TrendingUp} title="Growth Forecast">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={reportData.forecast}>
                  <defs>
                    <linearGradient id="repArea" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="month"
                    stroke="#6b7280"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="followers"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    fill="url(#repArea)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              Projected followers (K) over 6 months if you apply the plan.
            </p>
          </Section>
        </TabsContent>

        {/* Content */}
        <TabsContent value="content" className="mt-6 space-y-8">
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
                    <Tooltip />
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
                      <span className="font-medium text-card-foreground">{s.pillar}</span>
                      <span className="text-muted-foreground">— {s.note}</span>
                    </span>
                    <span className="text-sm font-semibold text-card-foreground">{s.share}%</span>
                  </div>
                ))}
              </div>
            </div>
          </Section>

          <Section icon={Hash} title="Hashtag Suggestions">
            <div className="mb-4 flex flex-wrap gap-2">
              {reportData.hashtags.map((h) => (
                <button
                  key={h}
                  onClick={() => copyText(h, `Copied ${h}`)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-3.5 py-1.5 text-sm text-primary transition-colors hover:bg-muted"
                >
                  {h}
                  <Copy className="h-3 w-3" />
                </button>
              ))}
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => copyText(reportData.hashtags.join(" "), "All hashtags copied")}
            >
              <Copy className="mr-1 h-4 w-4" /> Copy all hashtags
            </Button>
          </Section>
        </TabsContent>

        {/* 7-Day Plan */}
        <TabsContent value="plan" className="mt-6 space-y-8">
          <Section icon={CalendarDays} title="7-Day Growth Plan">
            <div className="grid gap-3 sm:grid-cols-2">
              {reportData.weekPlan.map((d) => (
                <div
                  key={d.day}
                  className="flex items-start gap-3 rounded-xl border border-border bg-secondary p-4"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-xs font-bold text-primary-foreground">
                    {d.day}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-card-foreground">{d.task}</p>
                    <span className="mt-1 inline-flex rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
                      {d.goal}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        </TabsContent>

        {/* Ideas & Captions */}
        <TabsContent value="ideas" className="mt-6 space-y-8">
          <ContentIdeasSection />

          <Section icon={Quote} title="10 Viral Caption Ideas">
            <div className="space-y-3">
              {reportData.captions.map((c, i) => (
                <div
                  key={i}
                  className="flex items-start justify-between gap-3 rounded-xl border border-border bg-secondary p-4"
                >
                  <p className="text-sm italic text-card-foreground/90">"{c}"</p>
                  <button
                    onClick={() => copyText(c, "Caption copied")}
                    aria-label="Copy caption"
                    className="shrink-0 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </Section>

          <Section icon={Users} title="Competitor Suggestions">
            <div className="grid gap-4 sm:grid-cols-3">
              {reportData.competitors.map((c) => (
                <div
                  key={c.name}
                  className="rounded-xl border border-border bg-secondary p-5 text-center"
                >
                  <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground">
                    {c.name[1].toUpperCase()}
                  </span>
                  <p className="mt-3 font-medium text-card-foreground">{c.name}</p>
                  <p className="text-sm text-muted-foreground">{c.followers} followers</p>
                  <p className="mt-2 text-xs text-primary">{c.why}</p>
                </div>
              ))}
            </div>
          </Section>
        </TabsContent>
      </Tabs>

      <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-card">
        <h3 className="text-xl font-bold text-card-foreground">Keep your momentum</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Re-analyze monthly to track your progress.
        </p>
        <Button asChild size="lg" className="mt-5">
          <Link to="/dashboard/analyze">Analyze again</Link>
        </Button>
      </div>
    </div>
  );
}

function ContentIdeasSection() {
  const [showAll, setShowAll] = useState(false);
  const ideas = showAll ? reportData.contentIdeas : reportData.contentIdeas.slice(0, 10);

  return (
    <Section icon={Lightbulb} title="30 Content Ideas">
      <div className="grid gap-2 sm:grid-cols-2">
        {ideas.map((idea, i) => (
          <div
            key={i}
            className="flex items-start justify-between gap-2.5 rounded-lg border border-border bg-secondary px-3 py-2 text-sm text-card-foreground"
          >
            <span className="flex items-start gap-2.5">
              <span className="text-xs font-semibold text-primary">
                {String(i + 1).padStart(2, "0")}
              </span>
              {idea}
            </span>
            <button
              onClick={() => copyText(idea, "Idea copied")}
              aria-label="Copy idea"
              className="shrink-0 rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <Copy className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>
      {!showAll && (
        <div className="mt-4 text-center">
          <Button variant="secondary" size="sm" onClick={() => setShowAll(true)}>
            <Plus className="mr-1 h-4 w-4" /> Load {reportData.contentIdeas.length - 10} more ideas
          </Button>
        </div>
      )}
    </Section>
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
      <section className="rounded-2xl border border-border bg-card p-6 shadow-card sm:p-8">
        <div className="mb-5 flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Icon className="h-5 w-5 text-primary" />
          </span>
          <h3 className="text-xl font-semibold text-card-foreground">{title}</h3>
        </div>
        {children}
      </section>
    </Reveal>
  );
}
