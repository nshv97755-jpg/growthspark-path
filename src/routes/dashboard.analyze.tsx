import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import {
  Search,
  Sparkles,
  Lock,
  AlertTriangle,
  TrendingUp,
  Users,
  Image as ImageIcon,
  ArrowRight,
  Check,
  Instagram,
  Loader2,
} from "lucide-react";
import { ScoreRing } from "@/components/score-ring";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useInstagramConnection } from "@/hooks/use-instagram-connection";
import { sampleAnalysis, lockedIssues, loadingMessages } from "@/lib/mock";

export const Route = createFileRoute("/dashboard/analyze")({
  head: () => ({ meta: [{ title: "Analyze Profile — GrowthPilot" }] }),
  component: Analyze,
});

type Stage = "idle" | "loading" | "result";

function Analyze() {
  const [stage, setStage] = useState<Stage>("idle");
  const [username, setUsername] = useState("");
  const [connectOpen, setConnectOpen] = useState(false);
  const { status, connect } = useInstagramConnection();

  // Attempt to start analysis: gate on an Instagram connection.
  const requestStart = () => {
    if (status === "connected") {
      setStage("loading");
    } else {
      setConnectOpen(true);
    }
  };

  const handleConnect = async () => {
    try {
      const c = await connect();
      toast.success(`Instagram connected — @${c.username}`);
      setConnectOpen(false);
      setStage("loading");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Couldn't connect Instagram");
    }
  };

  return (
    <div className="mx-auto max-w-5xl">
      <AnimatePresence mode="wait">
        {stage === "idle" && (
          <Idle
            key="idle"
            username={username}
            setUsername={setUsername}
            onStart={requestStart}
          />
        )}
        {stage === "loading" && <Loading key="loading" onDone={() => setStage("result")} />}
        {stage === "result" && (
          <Result key="result" username={username} onReset={() => setStage("idle")} />
        )}
      </AnimatePresence>

      <Dialog open={connectOpen} onOpenChange={setConnectOpen}>
        <DialogContent className="glass-strong sm:max-w-md">
          <DialogHeader className="items-center text-center">
            <span className="mb-2 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand text-primary-foreground">
              <Instagram className="h-7 w-7" />
            </span>
            <DialogTitle className="font-display text-xl">Connect Instagram</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Connect your Instagram account to generate your personalized growth report.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-2 flex justify-center">
            <Button
              type="button"
              variant="hero"
              size="lg"
              disabled={status === "connecting"}
              onClick={handleConnect}
            >
              {status === "connecting" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Connecting…
                </>
              ) : (
                <>
                  <Instagram className="h-4 w-4" /> Connect Instagram
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Idle({
  username,
  setUsername,
  onStart,
}: {
  username: string;
  setUsername: (v: string) => void;
  onStart: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      className="flex min-h-[60vh] flex-col items-center justify-center text-center"
    >
      <span className="mb-5 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs text-muted-foreground">
        <Sparkles className="h-3.5 w-3.5 text-accent" /> AI Profile Analyzer
      </span>
      <h2 className="max-w-xl font-display text-4xl font-bold sm:text-5xl">
        Analyze any <span className="text-gradient">creator profile</span>
      </h2>
      <p className="mt-3 max-w-md text-muted-foreground">
        Enter an Instagram username and our AI will diagnose exactly what's capping your growth.
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!username.trim()) {
            toast.error("Enter an Instagram username to analyze");
            return;
          }
          onStart();
        }}
        className="mt-9 w-full max-w-xl"
      >
        <div className="flex flex-col items-stretch gap-3 rounded-2xl glass-strong p-2 shadow-card sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter Instagram Username"
              aria-label="Instagram username"
              className="h-12 border-0 bg-transparent pl-11 text-base focus-visible:ring-0"
            />
          </div>
          <Button type="submit" variant="hero" size="lg" className="shrink-0">
            Analyze Profile <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Example: <span className="text-accent">@creatorname</span>
        </p>
      </form>
    </motion.div>
  );
}

function Loading({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step >= loadingMessages.length) {
      const t = setTimeout(onDone, 500);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setStep((s) => s + 1), 850);
    return () => clearTimeout(t);
  }, [step, onDone]);

  const progress = Math.min((step / loadingMessages.length) * 100, 100);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex min-h-[60vh] flex-col items-center justify-center text-center"
    >
      <div className="relative mb-8 flex h-28 w-28 items-center justify-center">
        <span className="absolute inset-0 rounded-full bg-brand opacity-30 blur-2xl animate-pulse-ring" />
        <motion.span
          className="absolute inset-0 rounded-full border-2 border-transparent"
          style={{ borderTopColor: "#00c2a8", borderRightColor: "#c9a227" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
        />
        <Sparkles className="h-9 w-9 text-accent" />
      </div>

      <div className="h-8 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.p
            key={step}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="font-display text-xl font-semibold"
          >
            {loadingMessages[Math.min(step, loadingMessages.length - 1)]}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="mt-6 h-1.5 w-full max-w-sm overflow-hidden rounded-full bg-secondary">
        <motion.div
          className="h-full rounded-full bg-brand"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.6 }}
        />
      </div>
      <p className="mt-3 text-xs text-muted-foreground">This usually takes a few seconds</p>
    </motion.div>
  );
}

function Result({ username, onReset }: { username: string; onReset: () => void }) {
  const navigate = useNavigate();
  const handle = username.trim().replace(/^@/, "") || sampleAnalysis.username;
  const a = { ...sampleAnalysis, username: handle };


  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl font-bold">Free Analysis</h2>
        <Button variant="ghost" size="sm" onClick={onReset}>
          Analyze another
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile card */}
        <div className="rounded-3xl glass p-6 lg:col-span-1">
          <div className="flex items-center gap-4">
            <img
              src={a.avatar}
              alt={a.username}
              className="h-16 w-16 rounded-2xl border border-border"
            />
            <div>
              <p className="font-display text-lg font-semibold">@{a.username}</p>
              <span className="mt-1 inline-flex rounded-full bg-secondary px-2.5 py-0.5 text-xs text-muted-foreground">
                {a.niche}
              </span>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-2 text-center">
            {[
              { l: "Followers", v: a.followers },
              { l: "Following", v: a.following },
              { l: "Posts", v: a.posts },
            ].map((s) => (
              <div key={s.l} className="rounded-xl bg-secondary/50 py-3">
                <p className="font-display text-lg font-bold">{s.v}</p>
                <p className="text-xs text-muted-foreground">{s.l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Score */}
        <div className="flex flex-col items-center justify-center rounded-3xl glass-strong p-6 lg:col-span-1">
          <ScoreRing value={a.growthScore} />
          <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-success/15 px-3 py-1 text-sm font-medium text-success">
            <TrendingUp className="h-4 w-4" /> {a.growthPotential} potential
          </span>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-2 gap-4 lg:col-span-1">
          <MiniStat icon={AlertTriangle} label="Issues Found" value={String(a.issuesFound)} tone="warning" />
          <MiniStat icon={TrendingUp} label="Growth Potential" value={a.growthPotential} tone="success" />
          <MiniStat icon={ImageIcon} label="Top Issue" value={a.topIssue} tone="default" />
          <MiniStat icon={Users} label="Potential Gain" value={a.potentialGain} tone="accent" />
        </div>
      </div>

      {/* Category scores */}
      <div className="rounded-3xl glass p-6">
        <h3 className="font-display text-lg font-semibold">Category scores</h3>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          {a.categories.map((c, i) => (
            <div key={c.label}>
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{c.label}</span>
                <span className="text-muted-foreground">{c.value}/100</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-secondary">
                <motion.div
                  className="h-full rounded-full bg-brand"
                  initial={{ width: 0 }}
                  animate={{ width: `${c.value}%` }}
                  transition={{ duration: 1, delay: 0.2 + i * 0.1 }}
                />
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{c.hint}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Locked issues */}
      <div className="relative overflow-hidden rounded-3xl glass-strong p-6">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-semibold">
            {a.issuesFound} Growth Problems Found
          </h3>
          <span className="flex items-center gap-1.5 text-sm text-warning">
            <Lock className="h-4 w-4" /> Locked
          </span>
        </div>

        <div className="relative mt-5 space-y-3">
          {lockedIssues.map((issue, i) => {
            const revealed = i === 0;
            return (
              <div
                key={issue}
                className="flex items-center justify-between rounded-xl bg-secondary/50 px-4 py-3"
              >
                <span className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-background text-xs font-semibold text-muted-foreground">
                    {i + 1}
                  </span>
                  <span className={`text-sm ${revealed ? "" : "blur-sm select-none"}`}>
                    {revealed ? issue : "███████ ████ ██████"}
                  </span>
                </span>
                {revealed ? (
                  <span className="rounded-full bg-warning/15 px-2 py-0.5 text-xs text-warning">
                    Top issue
                  </span>
                ) : (
                  <Lock className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
            );
          })}

          {/* fade + CTA overlay */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-card to-transparent" />
        </div>

        <div className="relative mt-6 rounded-2xl bg-brand p-6 text-center">
          <h4 className="font-display text-xl font-bold text-primary-foreground">
            Unlock all {a.issuesFound} fixes + your full growth playbook
          </h4>
          <p className="mx-auto mt-2 max-w-md text-sm text-primary-foreground/80">
            Get the complete report: why you're not growing, 30 content ideas, viral captions, a
            7-day plan, and a 6-month forecast.
          </p>
          <ul className="mx-auto mt-4 flex max-w-md flex-wrap justify-center gap-x-5 gap-y-1.5 text-sm text-primary-foreground/90">
            {["Top 5 mistakes", "30 content ideas", "7-day plan", "Growth forecast"].map((f) => (
              <li key={f} className="flex items-center gap-1.5">
                <Check className="h-4 w-4" /> {f}
              </li>
            ))}
          </ul>
          <Button
            size="xl"
            className="mt-6 bg-background text-foreground hover:bg-background/90"
            onClick={() => navigate({ to: "/dashboard/report" })}
          >
            Generate Full Report <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

function MiniStat({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: typeof Users;
  label: string;
  value: string;
  tone: "warning" | "success" | "accent" | "default";
}) {
  const toneClass = {
    warning: "text-warning",
    success: "text-success",
    accent: "text-accent",
    default: "text-foreground",
  }[tone];
  return (
    <div className="rounded-2xl glass p-4">
      <Icon className={`h-5 w-5 ${toneClass}`} />
      <p className="mt-3 font-display text-xl font-bold leading-tight">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}
