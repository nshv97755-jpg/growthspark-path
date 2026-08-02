import { createFileRoute } from "@tanstack/react-router";
import { Check, CreditCard, Zap } from "lucide-react";
import { toast } from "sonner";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/dashboard/billing")({
  head: () => ({ meta: [{ title: "Billing — GrowthPilot" }] }),
  component: Billing,
});

const plans = [
  {
    name: "Free",
    price: "₹0",
    period: "",
    highlight: false,
    badge: null,
    tagline: null,
    includes: null,
    cta: "Current Plan",
    features: ["1 AI Report per week", "Basic AI Analysis", "Growth Score", "Limited Report Preview", "Instagram Connection"],
  },
  {
    name: "Pro",
    price: "₹199",
    period: "/month",
    highlight: true,
    badge: "Most Popular",
    tagline: "💎 Buy Pro. Get More Aura.",
    includes: null,
    cta: "Upgrade to Pro",
    features: ["Unlimited AI Reports", "Full AI Report", "PDF Export", "AI Bio Suggestions", "AI Caption Suggestions", "AI Hashtag Suggestions", "Report History", "Priority Processing"],
  },
  {
    name: "God Mode",
    price: "₹399",
    period: "/month",
    highlight: false,
    badge: null,
    tagline: "💀 Aura is cute. God Mode owns the algorithm.",
    includes: "Everything in Pro, plus:",
    cta: "Enter God Mode",
    features: ["Competitor Analysis", "Viral Hook Generator", "AI Reel Script Generator", "30-Day Content Calendar", "AI Growth Roadmap", "Fastest AI Processing", "Early Access to New Features"],
  },
  {
    name: "Founder's Pass",
    price: "₹1,599",
    period: "One-Time",
    highlight: false,
    badge: "🔥 Limited to First 100 Users",
    tagline: "🗿 They rent. You own.",
    includes: "Everything in God Mode, plus:",
    cta: "Claim Lifetime Access",
    features: ["Lifetime Access", "Lifetime Updates", "Founder Badge", "Priority Support", "All Future Premium Features Included"],
  },
];

function Billing() {
  return (
    <div className="max-w-7xl space-y-6">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl glass-strong p-8 shadow-card">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Current plan</p>
              <h2 className="mt-1 font-display text-3xl font-bold">Free</h2>
              <p className="mt-1 text-sm text-muted-foreground">1 AI Report per week · upgrade to unlock full reports</p>
            </div>
            <Button
              variant="hero"
              size="lg"
              onClick={() => toast.success("Pro checkout coming soon — you're on the list!")}
            >
              <Zap className="mr-1 h-4 w-4" /> Upgrade to Pro
            </Button>
          </div>
          <div className="mt-6 h-2 overflow-hidden rounded-full bg-secondary">
            <div className="h-full w-1/3 rounded-full bg-brand" />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">1 of 1 weekly reports used</p>
        </div>
      </Reveal>

      <div className="grid gap-6 lg:grid-cols-4">
        {plans.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.07}>
            <div className={`relative flex h-full flex-col rounded-3xl p-6 ${p.highlight ? "glass-strong glow" : "glass"}`}>
              {p.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand px-3 py-1 text-xs font-semibold text-primary-foreground">
                  {p.badge}
                </span>
              )}
              <h3 className="font-display text-xl font-semibold">{p.name}</h3>
              <div className="mt-3 flex items-end gap-1">
                <span className="font-display text-4xl font-bold">{p.price}</span>
                <span className="mb-1 text-sm text-muted-foreground">{p.period}</span>
              </div>
              <ul className="mt-5 flex-1 space-y-3 text-sm">
                {p.includes && (
                  <li className="text-xs font-medium uppercase tracking-wider text-foreground/80">
                    {p.includes}
                  </li>
                )}
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-muted-foreground">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" /> {f}
                  </li>
                ))}
              </ul>
              {p.tagline && (
                <p className="mt-5 text-center text-xs font-medium tracking-wide text-accent">
                  {p.tagline}
                </p>
              )}
              <Button
                variant={p.highlight ? "hero" : "glass"}
                size="lg"
                className={`w-full drop-shadow-[0_0_10px_rgba(212,169,78,0.15)] hover:drop-shadow-[0_0_18px_rgba(212,169,78,0.3)] transition-[filter] duration-300 ${p.tagline ? "mt-3" : "mt-6"}`}
                onClick={() => toast.success(`${p.name} plan selected — checkout coming soon`)}
              >
                {p.cta}
              </Button>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="rounded-3xl glass p-6">
          <h3 className="font-display text-lg font-semibold">Payment method</h3>
          <div className="mt-4 flex items-center justify-between rounded-2xl bg-secondary/50 p-4">
            <span className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-background">
                <CreditCard className="h-5 w-5 text-accent" />
              </span>
              <span>
                <span className="block text-sm font-medium">No card on file</span>
                <span className="block text-xs text-muted-foreground">Add a card to upgrade</span>
              </span>
            </span>
            <Button variant="glass" size="sm" onClick={() => toast("Card form coming soon")}>Add card</Button>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
