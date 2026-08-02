import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  ArrowRight,
  Play,
  Sparkles,
  Search,
  LineChart,
  Lock,
  Zap,
  Target,
  Brain,
  Check,
  Star,
  TrendingUp,
} from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { AuroraBackground } from "@/components/aurora-background";
import { Reveal } from "@/components/reveal";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GrowthPilot — Discover Exactly Why You're Not Growing" },
      {
        name: "description",
        content:
          "AI analyzes your creator profile and gives you a personalized growth strategy. Stop guessing why you're stuck.",
      },
      { property: "og:title", content: "GrowthPilot — Discover Why You're Not Growing" },
      {
        property: "og:description",
        content: "AI analyzes your creator profile and gives you a personalized growth strategy.",
      },
    ],
  }),
  component: Landing,
});

const features = [
  {
    icon: Brain,
    title: "Deep Profile Diagnosis",
    desc: "AI reads your bio, content cadence, and engagement patterns to find what's silently capping your reach.",
  },
  {
    icon: LineChart,
    title: "Growth Score Engine",
    desc: "A single, honest number that tells you exactly where you stand against your niche benchmarks.",
  },
  {
    icon: Target,
    title: "Personalized Strategy",
    desc: "No generic tips. A plan built around your niche, audience, and the formats that actually work for you.",
  },
  {
    icon: Zap,
    title: "30 Content Ideas",
    desc: "Ready-to-shoot ideas, viral caption hooks, and hashtag sets generated for your exact audience.",
  },
  {
    icon: TrendingUp,
    title: "6-Month Forecast",
    desc: "See the trajectory your account can hit once you fix the issues holding it back.",
  },
  {
    icon: Search,
    title: "Competitor Intelligence",
    desc: "Learn what the creators just ahead of you are doing differently — and how to close the gap.",
  },
];

const pricing = [
  {
    name: "Free",
    price: "₹0",
    period: "",
    desc: "See your score and what's holding you back.",
    cta: "Analyze for free",
    highlight: false,
    badge: null,
    tagline: null,
    includes: null,
    features: ["1 AI Report per week", "Basic AI Analysis", "Growth Score", "Limited Report Preview", "Instagram Connection"],
  },
  {
    name: "Pro",
    price: "₹199",
    period: "/month",
    desc: "The full diagnosis and your complete growth playbook.",
    cta: "Start growing",
    highlight: true,
    badge: "Most popular",
    tagline: "💎 Buy Pro. Get More Aura.",
    includes: null,
    features: ["Unlimited AI Reports", "Full AI Report", "PDF Export", "AI Bio Suggestions", "AI Caption Suggestions", "AI Hashtag Suggestions", "Report History", "Priority Processing"],
  },
  {
    name: "God Mode",
    price: "₹399",
    period: "/month",
    desc: "Own the algorithm.",
    cta: "Go God Mode",
    highlight: false,
    badge: null,
    tagline: "💀 Aura is cute. God Mode owns the algorithm.",
    includes: "Everything in Pro, plus:",
    features: ["Competitor Analysis", "Viral Hook Generator", "AI Reel Script Generator", "30-Day Content Calendar", "AI Growth Roadmap", "Fastest AI Processing", "Early Access to New Features", "Future Premium Features Included"],
  },
  {
    name: "Founder's Pass",
    price: "₹1,599",
    period: "One-Time",
    desc: "Own it forever.",
    cta: "Claim Founder",
    highlight: false,
    badge: "🔥 Limited to First 100 Users",
    tagline: "🗿 They rent. You own.",
    includes: "Everything in God Mode, plus:",
    features: ["Lifetime Access", "Lifetime Updates", "Founder Badge", "Priority Support", "Early Access to Every Future Feature"],
  },
];

const testimonials = [
  {
    quote:
      "I'd been stuck at 40K for a year. GrowthPilot found 3 issues in my bio and posting times I never noticed. Up 22K in two months.",
    name: "Maya R.",
    role: "Lifestyle creator",
  },
  {
    quote:
      "This doesn't feel like another AI tool. It feels like a strategist that actually studied my account.",
    name: "Devon K.",
    role: "Tech reviewer",
  },
  {
    quote:
      "The forecast alone paid for itself. I finally knew which formats to double down on.",
    name: "Priya S.",
    role: "Fitness coach",
  },
];

const faqs = [
  {
    q: "How does the analysis work?",
    a: "Our AI evaluates your public profile signals — bio, posting cadence, engagement patterns, niche fit, and format mix — then benchmarks them against top performers in your category to surface what's holding you back.",
  },
  {
    q: "Is the free analysis really free?",
    a: "Yes. You get your full Growth Score, category breakdown, and the number of issues found at no cost. The detailed fixes and your complete playbook are part of the Pro report.",
  },
  {
    q: "Which platforms are supported?",
    a: "We currently focus on Instagram creator profiles, with TikTok and YouTube support rolling out soon.",
  },
  {
    q: "Will this work for my niche?",
    a: "GrowthPilot detects your niche automatically and tailors every recommendation, content idea, and benchmark to it.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Absolutely. Pro is month-to-month with no lock-in. Cancel in one click from your billing settings.",
  },
];

function Landing() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background">
      <SiteNav />

      {/* Hero */}
      <section className="relative px-4 pt-40 pb-24 text-center sm:pt-48">
        <AuroraBackground />
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-border glass px-4 py-1.5 text-xs font-medium text-muted-foreground"
        >
          <Sparkles className="h-3.5 w-3.5 text-accent" />
          AI growth strategist for creators
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="mx-auto max-w-4xl text-balance font-display text-5xl font-bold leading-[1.05] sm:text-7xl"
        >
          Discover Exactly Why <br className="hidden sm:block" />
          <span className="text-gradient">You're Not Growing.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mx-auto mt-6 max-w-2xl text-balance text-lg text-muted-foreground"
        >
          AI analyzes your creator profile and gives you a personalized growth strategy — so you
          stop guessing and start scaling.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Button asChild variant="hero" size="xl">
            <Link to="/dashboard/analyze">
              Analyze Profile <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="glass" size="xl">
            <a href="#preview">
              <Play className="mr-1 h-4 w-4" /> View Demo
            </a>
          </Button>
        </motion.div>

        <p className="mt-5 text-xs text-muted-foreground">
          No credit card required · Free Growth Score in 30 seconds
        </p>
      </section>

      {/* Dashboard Preview */}
      <section id="preview" className="relative px-4 pb-28">
        <Reveal className="mx-auto max-w-5xl">
          <div className="relative rounded-3xl glass-strong p-2 shadow-card">
            <div className="absolute -inset-px -z-10 rounded-3xl bg-brand opacity-[0.12] blur-2xl" />
            <DashboardPreview />
          </div>
        </Reveal>
      </section>

      {/* Features */}
      <section id="features" className="relative px-4 py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-accent">Features</p>
          <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">
            Strategy, not surface-level tips
          </h2>
          <p className="mt-4 text-muted-foreground">
            Every insight is generated for your specific account — the same way a $5k consultant
            would audit it.
          </p>
        </Reveal>

        <div className="mx-auto mt-14 grid max-w-6xl gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.05}>
              <div className="group h-full rounded-2xl glass p-6 transition-all hover:-translate-y-0.5 hover:border-primary/25">
                <span className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand">
                  <f.icon className="h-5 w-5 text-primary-foreground" />
                </span>
                <h3 className="font-display text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="relative px-4 py-24">
        <AuroraBackground className="opacity-50" />
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-accent">Pricing</p>
          <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">Simple, honest pricing</h2>
          <p className="mt-4 text-muted-foreground">
            Start free. Upgrade when you're ready to unlock the full playbook.
          </p>
        </Reveal>

        <div className="mx-auto mt-14 grid max-w-7xl gap-6 lg:grid-cols-4">
          {pricing.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.07}>
              <div
                className={`relative flex h-full flex-col rounded-3xl p-7 ${
                  p.highlight
                    ? "glass-strong ring-1 ring-primary/25"
                    : "glass"
                }`}
              >
                {p.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand px-3 py-1 text-xs font-semibold text-primary-foreground">
                    {p.badge}
                  </span>
                )}
                <h3 className="font-display text-xl font-semibold">{p.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
                <div className="mt-5 flex items-end gap-1">
                  <span className="font-display text-4xl font-bold">{p.price}</span>
                  <span className="mb-1 text-sm text-muted-foreground">{p.period}</span>
                </div>
                <ul className="mt-6 space-y-3 text-sm">
                  {p.includes && (
                    <li className="text-xs font-medium uppercase tracking-wider text-foreground/80">
                      {p.includes}
                    </li>
                  )}
                  {p.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5 text-muted-foreground">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                      {feat}
                    </li>
                  ))}
                </ul>
                {p.tagline && (
                  <p className="mt-5 text-center text-xs font-medium tracking-wide text-accent">
                    {p.tagline}
                  </p>
                )}
                <Button
                  asChild
                  variant={p.highlight ? "hero" : "glass"}
                  size="lg"
                  className={`w-full drop-shadow-[0_0_10px_rgba(212,169,78,0.15)] hover:drop-shadow-[0_0_18px_rgba(212,169,78,0.3)] transition-[filter] duration-300 ${p.tagline ? "mt-3" : "mt-7"}`}
                >
                  <Link to="/auth">{p.cta}</Link>
                </Button>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="relative px-4 py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-accent">Loved by creators</p>
          <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">
            Growth you can actually feel
          </h2>
        </Reveal>
        <div className="mx-auto mt-14 grid max-w-6xl gap-5 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.07}>
              <figure className="flex h-full flex-col rounded-2xl glass p-6">
                <div className="mb-4 flex gap-0.5 text-warning">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <blockquote className="flex-1 text-sm leading-relaxed text-foreground/90">
                  "{t.quote}"
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-xs font-semibold text-primary-foreground">
                    {t.name[0]}
                  </span>
                  <span>
                    <span className="block text-sm font-medium">{t.name}</span>
                    <span className="block text-xs text-muted-foreground">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="relative px-4 py-24">
        <Reveal className="mx-auto max-w-3xl">
          <div className="text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-accent">FAQ</p>
            <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">
              Questions, answered
            </h2>
          </div>
          <Accordion type="single" collapsible className="mt-10 w-full">
            {faqs.map((f, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="mb-3 rounded-2xl glass px-5 last:mb-0"
              >
                <AccordionTrigger className="text-left font-medium hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </section>

      {/* Final CTA */}
      <section className="relative px-4 py-20">
        <Reveal className="mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-3xl glass-strong p-12 text-center shadow-card">
            <AuroraBackground />
            <h2 className="mx-auto max-w-2xl font-display text-4xl font-bold sm:text-5xl">
              Your audience is waiting. Find out what's in the way.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Run a free analysis and get your Growth Score in under a minute.
            </p>
            <Button asChild variant="hero" size="xl" className="mt-8">
              <Link to="/dashboard/analyze">
                Analyze Profile <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Reveal>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-4 py-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
          <Logo />
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground">Features</a>
            <a href="#pricing" className="hover:text-foreground">Pricing</a>
            <a href="#faq" className="hover:text-foreground">FAQ</a>
            <Link to="/auth" className="hover:text-foreground">Sign in</Link>
          </div>
          <p className="text-xs text-muted-foreground">© 2026 GrowthPilot. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function DashboardPreview() {
  return (
    <div className="overflow-hidden rounded-2xl bg-background/80">
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-destructive/70" />
        <span className="h-3 w-3 rounded-full bg-warning/70" />
        <span className="h-3 w-3 rounded-full bg-success/70" />
        <span className="ml-3 text-xs text-muted-foreground">GrowthPilot · @creatorname</span>
      </div>
      <div className="grid gap-4 p-5 sm:grid-cols-3">
        <div className="rounded-xl glass p-5 sm:col-span-1">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Growth Score</p>
          <p className="mt-2 font-display text-5xl font-bold text-gradient">72</p>
          <p className="mt-1 text-xs text-muted-foreground">/ 100 · High potential</p>
          <div className="mt-4 space-y-2.5">
            {[
              { l: "Followers", v: 78 },
              { l: "Engagement", v: 54 },
              { l: "Niche fit", v: 81 },
            ].map((b) => (
              <div key={b.l}>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{b.l}</span>
                  <span>{b.v}</span>
                </div>
                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-secondary">
                  <motion.div
                    className="h-full rounded-full bg-brand"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${b.v}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl glass p-5 sm:col-span-2">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">6-Month Forecast</p>
          <div className="mt-4 flex h-40 items-end gap-2">
            {[48, 53, 61, 72, 88, 104, 126].map((h, i) => (
              <motion.div
                key={i}
                className="flex-1 rounded-t-md bg-brand"
                initial={{ height: 0 }}
                whileInView={{ height: `${(h / 126) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.08 }}
              />
            ))}
          </div>
          <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
            <Lock className="h-3.5 w-3.5" /> 7 growth problems found — unlock the fixes
          </div>
        </div>
      </div>
    </div>
  );
}
