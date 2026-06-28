import { createFileRoute } from "@tanstack/react-router";
import { Check, CreditCard, Zap } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/dashboard/billing")({
  head: () => ({ meta: [{ title: "Billing — GrowthPilot" }] }),
  component: Billing,
});

const plans = [
  {
    name: "Pro",
    price: "$29",
    period: "/mo",
    highlight: true,
    features: ["Full premium reports", "30 content ideas + captions", "7-day plan & forecast", "Export PDF & history"],
  },
  {
    name: "Studio",
    price: "$79",
    period: "/mo",
    highlight: false,
    features: ["Everything in Pro", "Up to 15 profiles", "Compare reports", "Team workspace"],
  },
];

function Billing() {
  return (
    <div className="max-w-4xl space-y-6">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl glass-strong p-8 shadow-card">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Current plan</p>
              <h2 className="mt-1 font-display text-3xl font-bold">Free</h2>
              <p className="mt-1 text-sm text-muted-foreground">1 analysis / day · upgrade to unlock full reports</p>
            </div>
            <Button variant="hero" size="lg">
              <Zap className="mr-1 h-4 w-4" /> Upgrade to Pro
            </Button>
          </div>
          <div className="mt-6 h-2 overflow-hidden rounded-full bg-secondary">
            <div className="h-full w-1/3 rounded-full bg-brand" />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">1 of 1 daily analyses used</p>
        </div>
      </Reveal>

      <div className="grid gap-4 sm:grid-cols-2">
        {plans.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.07}>
            <div className={`flex h-full flex-col rounded-3xl p-6 ${p.highlight ? "glass-strong glow" : "glass"}`}>
              <h3 className="font-display text-xl font-semibold">{p.name}</h3>
              <div className="mt-3 flex items-end gap-1">
                <span className="font-display text-4xl font-bold">{p.price}</span>
                <span className="mb-1 text-sm text-muted-foreground">{p.period}</span>
              </div>
              <ul className="mt-5 flex-1 space-y-3 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-muted-foreground">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" /> {f}
                  </li>
                ))}
              </ul>
              <Button variant={p.highlight ? "hero" : "glass"} size="lg" className="mt-6 w-full">
                Choose {p.name}
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
            <Button variant="glass" size="sm">Add card</Button>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
