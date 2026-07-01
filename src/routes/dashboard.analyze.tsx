import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import {
  Search,
  Sparkles,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { ScoreRing } from "@/components/score-ring";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { sampleAnalysis, lockedIssues, loadingSteps } from "@/lib/mock";

export const Route = createFileRoute("/dashboard/analyze")({
  head: () => ({ meta: [{ title: "Analyze Profile — GrowthPilot" }] }),
  component: Analyze,
});

type Stage = "idle" | "loading" | "result";

function Analyze() {
  const [stage, setStage] = useState<Stage>("idle");
  const [username, setUsername] = useState("");

  return (
    <div className="mx-auto max-w-5xl">
      <AnimatePresence mode="wait">
        {stage === "idle" && (
          <Idle
            key="idle"
            username={username}
            setUsername={setUsername}
            onStart={() => setStage("loading")}
          />
        )}
        {stage === "loading" && <Loading key="loading" onDone={() => setStage("result")} />}
        {stage === "result" && (
          <Result key="result" username={username} onReset={() => setStage("idle")} />
        )}
      </AnimatePresence>
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
  const totalSteps = loadingSteps.length;

  useEffect(() => {
    if (step >= totalSteps) {
      const t = setTimeout(onDone, 500);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setStep((s) => s + 1), 850);
    return () => clearTimeout(t);
  }, [step, onDone, totalSteps]);

  const progress = Math.min(((step + 1) / totalSteps) * 100, 100);
  const currentStep = loadingSteps[Math.min(step, totalSteps - 1)];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex min-h-[60vh] flex-col items-center justify-center text-center"
    >
      <div className="mb-8 flex h-24 w-24 items-center justify-center">
        <motion.span
          className="text-5xl"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          {currentStep.icon}
        </motion.span>
      </div>

      <div className="h-7 overflow-hidden mb-6">
        <AnimatePresence mode="wait">
          <motion.p
            key={step}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="font-semibold text-card-foreground"
          >
            {currentStep.message}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="mb-3 w-full max-w-sm">
        <div className="mb-2 flex justify-between text-sm">
          <span className="text-muted-foreground">Step {step + 1} of {totalSteps}</span>
          <span className="text-muted-foreground">{Math.round(progress)}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
          <motion.div
            className="h-full rounded-full bg-primary"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <p className="text-xs text-muted-foreground">Usually takes 5-10 seconds</p>
    </motion.div>
  );
}

function Result({ username, onReset }: { username: string; onReset: () => void }) {
  const navigate = useNavigate();
  const handle = username.trim().replace(/^@/, "") || sampleAnalysis.username;
  const a = { ...sampleAnalysis, username: handle, lockedIssues };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-card-foreground">
          Analysis for @{a.username}
        </h2>
        <Button variant="outline" size="sm" onClick={onReset}>
          Analyze another
        </Button>
      </div>

      {/* Profile info */}
      <div className="flex items-center gap-4 rounded-lg border border-border bg-card p-4">
        <img
          src={a.avatar}
          alt={a.username}
          className="h-16 w-16 rounded-lg border border-border object-cover"
        />
        <div>
          <p className="font-semibold text-card-foreground">@{a.username}</p>
          <p className="text-sm text-muted-foreground">{a.niche}</p>
          <div className="mt-2 flex gap-3 text-sm">
            <span className="text-muted-foreground">{a.followers} followers</span>
            <span className="text-muted-foreground">·</span>
            <span className="text-muted-foreground">{a.posts} posts</span>
          </div>
        </div>
      </div>

      {/* Score section */}
      <div className="flex flex-col items-center justify-center gap-6 rounded-lg border border-border bg-card p-8">
        <ScoreRing value={a.growthScore} />
        <span className="inline-flex items-center gap-1.5 rounded-full bg-success/15 px-3 py-1 text-sm font-medium text-success">
          <TrendingUp className="h-4 w-4" /> {a.growthPotential} potential
        </span>
      </div>

      {/* Category breakdown */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="font-semibold text-card-foreground mb-4">Category Breakdown</h3>
        <div className="space-y-4">
          {a.categories.map((c, i) => (
            <div key={c.label}>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="font-medium text-card-foreground">{c.label}</span>
                <span className="text-muted-foreground">{c.value}/100</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-secondary">
                <motion.div
                  className="h-full rounded-full bg-primary"
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

      {/* Growth problems found - NOW FULLY VISIBLE */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="font-semibold text-card-foreground mb-4">
          {a.issuesFound} Growth Problems Found
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          These are holding you back. Solutions are in the full report.
        </p>

        <div className="space-y-2">
          {a.lockedIssues.map((issue, i) => (
            <div
              key={issue}
              className="flex items-start gap-3 rounded-lg bg-secondary/50 p-3"
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                {i + 1}
              </span>
              <span className="text-sm text-card-foreground">{issue}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="rounded-lg bg-primary/5 border border-primary/20 p-6 text-center">
        <h4 className="font-semibold text-primary">Unlock the full diagnosis</h4>
        <p className="mt-2 text-sm text-muted-foreground">
          Get detailed fixes, 30 content ideas, captions, and a 7-day action plan.
        </p>
        <Button
          size="lg"
          className="mt-4 bg-primary text-white hover:bg-[#2563eb]"
          onClick={() => navigate({ to: "/dashboard/report" })}
        >
          See full report <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
}
